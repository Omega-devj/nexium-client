'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { F, FORMATION_COUNT, atmosphere, formationAnchor, matter, transitions } from '@/config/choreography'
import { palette } from '@/config/palette'
import { anchorPoints } from '@/lib/labels'
import { rig } from '@/lib/rig'
import type { World } from './formations'
import { writeSurface } from './formations/surface'
import { A5 } from './layout'
import { matterFragment, matterVertex } from './shaders/matter'
import { frame } from './frame'

const ink = new THREE.Color(palette.ink)
const chalk = new THREE.Color(palette.chalk)
const nightBg = new THREE.Color(palette.night)

/**
 * La matière : un seul nuage de points pour tout le site. À chaque image, la piste
 * « formation » donne un nombre f ; la partie entière choisit la paire de formations
 * (départ, arrivée), la partie fractionnaire le mélange entre les deux.
 */
export function Matter({ world }: { world: World }) {
  const gl = useThree((s) => s.gl)
  const size = useThree((s) => s.size)
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera

  const { geometry, material, attrs, state } = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(world.count * 3), 3))
    const attrs = world.formations.map((f) => new THREE.BufferAttribute(f, 4))
    attrs[F.surface].setUsage(THREE.DynamicDrawUsage)
    geometry.setAttribute('aFrom', attrs[0])
    geometry.setAttribute('aTo', attrs[1])
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(world.seeds, 4))
    geometry.setAttribute('aGroup', new THREE.BufferAttribute(world.groups, 4))
    geometry.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 1e5)

    const material = new THREE.ShaderMaterial({
      vertexShader: matterVertex,
      fragmentShader: matterFragment,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      uniforms: {
        uMix: { value: 0 },
        uTime: { value: 0 },
        uSpread: { value: 0.5 },
        uFlight: { value: 1 },
        uLift: { value: 1 },
        uSweep: { value: 0 },
        uFromAnchor: { value: new THREE.Vector3() },
        uToAnchor: { value: new THREE.Vector3() },
        uGateFrom: { value: 0 },
        uGateTo: { value: 0 },
        uDissolveFrom: { value: 0 },
        uDissolveTo: { value: 0 },
        uPointer: { value: new THREE.Vector2(9, 9) },
        uPointerStrength: { value: 0 },
        uAspect: { value: 1 },
        uSize: { value: 0.052 },
        uScale: { value: 800 },
        uAmbient: { value: 0.035 },
        uHiTech: { value: -1 },
        uHiTechW: { value: 0 },
        uHiGraph: { value: -1 },
        uHiGraphW: { value: 0 },
        uPulseOrigin: { value: new THREE.Vector3() },
        uPulseAge: { value: -1 },
        uFogNear: { value: 16 },
        uFogFar: { value: 64 },
        uMaxPoint: { value: 20 },
        uInk: { value: ink.clone() },
        uAccent: { value: new THREE.Color(palette.vermilion) },
        uFogColor: { value: chalk.clone() },
        uOpacity: { value: 0.92 },
      },
    })
    const state = {
      pair: 0,
      surfaceVersion: -1,
      surfaceUsesTime: false,
      px: 9,
      py: 9,
      fog: new THREE.Color(),
    }
    return { geometry, material, attrs, state }
  }, [world])

  useEffect(() => {
    rig.count = world.count
    return () => {
      // Libère toutes les formations envoyées à la carte graphique, pas seulement la paire courante.
      for (let i = 0; i < attrs.length; i += 2) {
        geometry.setAttribute('aFrom', attrs[i])
        if (attrs[i + 1]) geometry.setAttribute('aTo', attrs[i + 1])
        geometry.dispose()
      }
      material.dispose()
    }
  }, [geometry, material, attrs, world.count])

  useFrame(() => {
    const G = frame.G
    const u = material.uniforms

    // Paire de formations et mélange.
    const f = matter.formation.value(G)
    let i = Math.floor(f)
    let m = f - i
    if (i >= FORMATION_COUNT - 1) {
      i = FORMATION_COUNT - 2
      m = 1
    }
    if (i !== state.pair) {
      geometry.setAttribute('aFrom', attrs[i])
      geometry.setAttribute('aTo', attrs[i + 1])
      state.pair = i
    }
    const tr = transitions[i]
    u.uMix.value = m
    u.uSpread.value = tr.spread
    u.uFlight.value = frame.reduced ? 0 : tr.flight
    u.uLift.value = frame.reduced ? 0 : tr.lift
    u.uSweep.value = tr.sweep ? 1 : 0

    // Points posés sur les lettres : visibles seulement là où la lettre est dissoute.
    u.uGateFrom.value = i === F.name || i === F.finale ? 1 : 0
    u.uGateTo.value = i + 1 === F.finale || i + 1 === F.name ? 1 : 0
    ;(u.uFromAnchor.value as THREE.Vector3).fromArray(formationAnchor(i))
    ;(u.uToAnchor.value as THREE.Vector3).fromArray(formationAnchor(i + 1))
    u.uDissolveFrom.value = i === F.name ? matter.dissolveOrigin.value(G) : matter.dissolveFinale.value(G)
    u.uDissolveTo.value = matter.dissolveFinale.value(G)

    // Surface du laboratoire : recalculée quand la fonction change, ou à chaque image si elle dépend de t.
    if (i === F.surface || i + 1 === F.surface) {
      const changed = rig.lab.version !== state.surfaceVersion
      if (changed || (state.surfaceUsesTime && !frame.reduced)) {
        writeSurface(world.formations[F.surface], world.count, A5, rig.lab.fn, frame.time)
        attrs[F.surface].needsUpdate = true
        state.surfaceVersion = rig.lab.version
        state.surfaceUsesTime = rig.lab.usesTime
      }
    }

    // Couleurs : encre sur calcaire le jour, calcaire sur encre la nuit.
    // Bascule rapide autour de la mi-nuit : la matière ne prend jamais la couleur du fond.
    const n = frame.night
    const flip = n <= 0.42 ? 0 : n >= 0.58 ? 1 : ((n - 0.42) / 0.16) ** 2 * (3 - 2 * ((n - 0.42) / 0.16))
    ;(u.uInk.value as THREE.Color).lerpColors(ink, chalk, flip)
    state.fog.lerpColors(chalk, nightBg, frame.night)
    ;(u.uFogColor.value as THREE.Color).copy(state.fog)
    u.uFogNear.value = atmosphere.fogNear.value(G) * frame.dolly
    u.uFogFar.value = atmosphere.fogFar.value(G) * frame.dolly

    // Pointeur, amorti, en coordonnées normalisées de l'écran.
    if (!rig.pointer.active) {
      state.px = 9
      state.py = 9
    } else if (state.px > 5) {
      state.px = rig.pointer.x
      state.py = rig.pointer.y
    } else {
      state.px += (rig.pointer.x - state.px) * 0.18
      state.py += (rig.pointer.y - state.py) * 0.18
    }
    ;(u.uPointer.value as THREE.Vector2).set(state.px, state.py)
    u.uPointerStrength.value = frame.reduced ? 0 : matter.pointer.value(G)
    u.uAspect.value = size.width / Math.max(1, size.height)

    // Taille des points en unités du monde, convertie en pixels réels.
    const fovRad = (camera.fov * Math.PI) / 180
    u.uScale.value = (size.height * gl.getPixelRatio()) / (2 * Math.tan(fovRad / 2))
    u.uMaxPoint.value = 14 * gl.getPixelRatio()

    u.uTime.value = frame.time
    u.uAmbient.value = frame.reduced ? 0 : 0.035

    u.uHiTech.value = rig.focus.tech
    u.uHiTechW.value = matter.techHighlight.value(G)
    u.uHiGraph.value = rig.focus.graph
    u.uHiGraphW.value = matter.graphHighlight.value(G)

    const origin = rig.focus.link >= 0 ? anchorPoints.get(`link:${rig.focus.link}`) : undefined
    if (origin) (u.uPulseOrigin.value as THREE.Vector3).fromArray(origin)
    u.uPulseAge.value = frame.reduced ? -1 : performance.now() / 1000 - rig.focus.pulseAt
  })

  return <points geometry={geometry} material={material} frustumCulled={false} renderOrder={2} />
}
