'use client'

import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { palette } from '@/config/palette'
import type { Steps } from '@/lib/tracks'
import { GLYPHS } from '@/lib/glyphs.generated'
import { FLOOR_Y, LOGO_DEPTH, LOGO_SCALE, glyphToWorld, type V3 } from './layout'
import { logotypeGeometry } from './logotype'
import { dissolveField, simplex3 } from './shaders/noise'
import { frame } from './frame'

type Uniforms = { uDissolve: { value: number }; uEdge: { value: THREE.Color } }

/**
 * Greffe la dissolution sur un matériau physique : un fragment disparaît quand le
 * champ de dissolution passe sous le seuil, avec un liseré vermillon à la frontière.
 * Le même champ décide, dans le shader de la matière, où les points apparaissent.
 */
function withDissolve<T extends THREE.Material>(material: T, uniforms: Uniforms) {
  material.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms)
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vLocal;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvLocal = position;')
    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>\nvarying vec3 vLocal;\nuniform float uDissolve;\nuniform vec3 uEdge;\n${simplex3}\n${dissolveField}`,
      )
      .replace(
        '#include <clipping_planes_fragment>',
        `#include <clipping_planes_fragment>
        float dField = dissolveField(vLocal);
        if (uDissolve > 0.0001 && dField < uDissolve) discard;`,
      )
      .replace(
        '#include <emissivemap_fragment>',
        `#include <emissivemap_fragment>
        float dEdge = (1.0 - smoothstep(uDissolve, uDissolve + 0.03, dField)) * step(0.0001, uDissolve);
        totalEmissiveRadiance += uEdge * dEdge * 1.6;`,
      )
  }
  material.customProgramCacheKey = () => 'dissolve'
  return material
}

/** Ombre de contact peinte une fois sur un canevas, d'après l'empreinte des lettres. */
function shadowTexture() {
  const W = 1024
  const H = 384
  const extent = { x: 28, z: 10.5 }
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')!
  const toPx = (x: number, z: number): [number, number] => [((x / extent.x) + 0.5) * W, ((z / extent.z) + 0.5) * H]
  const depth = LOGO_DEPTH * LOGO_SCALE

  // Occlusion d'ensemble, très diffuse.
  // (ellipse aplatie : le dégradé est dessiné dans un repère écrasé verticalement)
  ctx.save()
  ctx.translate(W / 2, H / 2)
  ctx.scale(1, 0.4)
  const g = ctx.createRadialGradient(0, 0, 0, 0, 0, W * 0.4)
  g.addColorStop(0, 'rgba(0,0,0,0.16)')
  g.addColorStop(0.6, 'rgba(0,0,0,0.06)')
  g.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(-W / 2, -H / 0.8, W, H / 0.4)
  ctx.restore()

  // Chaque glyphe : plus il descend près du sol, plus son ombre est dense et nette.
  for (const glyph of GLYPHS) {
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    for (const poly of glyph.polygons)
      for (const [x, y] of poly[0]) {
        const [wx, wy] = glyphToWorld(x, y)
        minX = Math.min(minX, wx)
        maxX = Math.max(maxX, wx)
        minY = Math.min(minY, wy)
      }
    const gap = Math.max(0.2, minY - FLOOR_Y)
    const [x0, z0] = toPx(minX + 0.15, -depth / 2)
    const [x1, z1] = toPx(maxX - 0.15, depth / 2)
    ctx.save()
    ctx.filter = `blur(${Math.round(gap * 9)}px)`
    ctx.fillStyle = `rgba(0,0,0,${Math.min(0.62, 0.5 / gap)})`
    ctx.fillRect(x0, z0, x1 - x0, z1 - z0)
    ctx.restore()
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return { tex, extent }
}

export function Monolith({ anchor, dissolve, visibleFrom, visibleTo }: { anchor: V3; dissolve: Steps; visibleFrom: number; visibleTo: number }) {
  const group = useRef<THREE.Group>(null)
  const shadow = useRef<THREE.Mesh>(null)
  const { letters, dots } = logotypeGeometry()

  const { letterMat, dotMat, uniforms, shadowMap } = useMemo(() => {
    const uniforms: Uniforms = { uDissolve: { value: 0 }, uEdge: { value: new THREE.Color(palette.vermilion) } }
    const letterMat = withDissolve(
      new THREE.MeshPhysicalMaterial({
        color: palette.ink,
        roughness: 0.24,
        metalness: 0.62,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        envMapIntensity: 1.5,
        side: THREE.DoubleSide,
      }),
      uniforms,
    )
    const dotMat = withDissolve(
      new THREE.MeshPhysicalMaterial({
        color: palette.vermilion,
        emissive: palette.vermilion,
        emissiveIntensity: 0.42,
        roughness: 0.26,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        side: THREE.DoubleSide,
      }),
      uniforms,
    )
    return { letterMat, dotMat, uniforms, shadowMap: shadowTexture() }
  }, [])

  useEffect(
    () => () => {
      letterMat.dispose()
      dotMat.dispose()
      shadowMap.tex.dispose()
    },
    [letterMat, dotMat, shadowMap],
  )

  useFrame(() => {
    const G = frame.G
    const d = dissolve.value(G)
    uniforms.uDissolve.value = d
    const visible = G >= visibleFrom && G <= visibleTo && d < 0.999
    if (group.current) group.current.visible = visible
    if (shadow.current) {
      const m = shadow.current.material as THREE.MeshBasicMaterial
      m.opacity = (1 - d) * (1 - frame.night)
      shadow.current.visible = visible
    }
  })

  return (
    <>
      <group ref={group} position={anchor}>
        <mesh geometry={letters} material={letterMat} />
        <mesh geometry={dots} material={dotMat} />
      </group>
      <mesh ref={shadow} position={[anchor[0], FLOOR_Y + 0.01, anchor[2]]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[shadowMap.extent.x, shadowMap.extent.z]} />
        <meshBasicMaterial map={shadowMap.tex} transparent depthWrite={false} fog />
      </mesh>
    </>
  )
}
