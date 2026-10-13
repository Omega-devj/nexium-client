'use client'

import { Environment, Lightformer } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { atmosphere } from '@/config/choreography'
import { palette } from '@/config/palette'
import { rig } from '@/lib/rig'
import { A6, FLOOR_Y } from './layout'
import { frame } from './frame'

const chalk = new THREE.Color(palette.chalk)
const night = new THREE.Color(palette.night)
const groundDay = new THREE.Color(palette.chalkDeep)
const groundNight = new THREE.Color('#141416')

/** Fond, brouillard et sol : la lumière du jour bascule vers la nuit au chapitre Signal. */
export function Atmosphere() {
  const scene = useThree((s) => s.scene)
  const ground = useRef<THREE.Mesh>(null)
  const state = useMemo(() => {
    const bg = new THREE.Color(palette.chalk)
    const fog = new THREE.Fog(bg.clone(), 16, 64)
    return { bg, fog }
  }, [])

  useFrame(() => {
    const G = frame.G
    state.bg.lerpColors(chalk, night, frame.night)
    scene.background = state.bg
    state.fog.color.copy(state.bg)
    state.fog.near = atmosphere.fogNear.value(G) * frame.dolly
    state.fog.far = atmosphere.fogFar.value(G) * frame.dolly
    scene.fog = state.fog
    const g = ground.current
    if (g) {
      const m = g.material as THREE.MeshBasicMaterial
      m.color.lerpColors(groundDay, groundNight, frame.night)
      m.opacity = atmosphere.ground.value(G)
      g.visible = m.opacity > 0.01
    }
  }, -4)

  return (
    <mesh ref={ground} rotation-x={-Math.PI / 2} position={[0, FLOOR_Y, -80]} renderOrder={-1}>
      <planeGeometry args={[600, 600]} />
      <meshBasicMaterial color={palette.chalkDeep} transparent depthWrite fog />
    </mesh>
  )
}

/**
 * Éclairage des lettres : un environnement sombre traversé de bandes lumineuses
 * (reflets nets sur le vernis), et une lumière qui suit le pointeur.
 */
export function Lights({ resolution }: { resolution: number }) {
  const key = useRef<THREE.DirectionalLight>(null)
  const smooth = useRef({ x: 0, y: 0 })
  useFrame((_, delta) => {
    const l = key.current
    if (!l) return
    const ease = 1 - Math.exp(-Math.min(delta, 0.1) * 2)
    const tx = frame.reduced || !rig.pointer.active ? 0 : rig.pointer.x
    const ty = frame.reduced || !rig.pointer.active ? 0 : rig.pointer.y
    smooth.current.x += (tx - smooth.current.x) * ease
    smooth.current.y += (ty - smooth.current.y) * ease
    // La lumière accompagne les lettres de l'origine, puis celles du retour.
    const a = frame.G > 5.5 ? A6 : [0, 0, 0]
    l.position.set(a[0] + smooth.current.x * 14, a[1] + 7 + smooth.current.y * 6, a[2] + 12)
    l.target.position.set(a[0], a[1], a[2])
    l.target.updateMatrixWorld()
  })
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight ref={key} intensity={1.6} position={[0, 7, 12]} />
      <Environment resolution={resolution} frames={1}>
        <color attach="background" args={['#18181a']} />
        <Lightformer form="rect" intensity={2.4} position={[0, 7, 3]} rotation-x={Math.PI / 2} scale={[22, 0.7, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[-10, 1, 4]} rotation-y={Math.PI / 2} scale={[0.6, 9, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[10, 1, 4]} rotation-y={-Math.PI / 2} scale={[0.6, 9, 1]} />
        <Lightformer form="rect" intensity={0.35} position={[0, 0, 14]} scale={[16, 7, 1]} />
        <Lightformer form="rect" intensity={0.9} color={palette.vermilion} position={[6, -3, 6]} rotation-y={-0.6} scale={[4, 0.35, 1]} />
      </Environment>
    </>
  )
}
