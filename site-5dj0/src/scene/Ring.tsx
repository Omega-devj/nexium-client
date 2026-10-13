'use client'

import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { RING_RADIUS, ring } from '@/config/choreography'
import { palette } from '@/config/palette'
import { links } from '@/content/site'
import { anchorPoints } from '@/lib/labels'
import { frame } from './frame'

const TICKS = 180
const ink = new THREE.Color(palette.ink)
const ash = new THREE.Color(palette.ash)

/** Angle (radians) de l'ancrage du lien i : les liens descendent le long du flanc gauche. */
export function linkAngle(i: number) {
  return ((160 + i * 22) * Math.PI) / 180
}

/**
 * L'anneau gradué : le fil continu du parcours. Il encadre le nom, ceint la structure,
 * marque le point de vue de l'anamorphose, sert d'ouverture aux ouvrages, puis porte
 * les liens à la fin. Ses graduations tournent avec le scroll : la mesure du chemin.
 */
export function Ring() {
  const group = useRef<THREE.Group>(null)
  const ticks = useRef<THREE.InstancedMesh>(null)
  const tickMat = useRef<THREE.MeshBasicMaterial>(null)
  const tmp = useMemo(() => ({ v: new Array(7).fill(0), p: new THREE.Vector3() }), [])

  const tickGeometry = useMemo(() => new THREE.BoxGeometry(1, 1, 1), [])
  useEffect(() => () => tickGeometry.dispose(), [tickGeometry])

  useEffect(() => {
    const mesh = ticks.current
    if (!mesh) return
    const m = new THREE.Matrix4()
    const q = new THREE.Quaternion()
    const s = new THREE.Vector3()
    const p = new THREE.Vector3()
    for (let i = 0; i < TICKS; i++) {
      const a = (i / TICKS) * Math.PI * 2
      const major = i % 15 === 0
      const mid = i % 5 === 0
      const len = major ? 0.42 : mid ? 0.24 : 0.12
      p.set(Math.cos(a) * (RING_RADIUS - 0.08 - len / 2), Math.sin(a) * (RING_RADIUS - 0.08 - len / 2), 0)
      q.setFromAxisAngle(new THREE.Vector3(0, 0, 1), a)
      s.set(len, major ? 0.022 : 0.012, 0.012)
      m.compose(p, q, s)
      mesh.setMatrixAt(i, m)
    }
    mesh.instanceMatrix.needsUpdate = true
  }, [])

  useFrame(() => {
    const g = group.current
    if (!g) return
    const v = ring.transform.at(frame.G, tmp.v)
    g.position.set(v[0], v[1], v[2])
    g.rotation.set(v[3], v[4], v[5], 'YXZ')
    g.scale.setScalar(v[6])
    if (ticks.current) ticks.current.rotation.z = frame.reduced ? 0 : ring.spin.value(frame.raw)
    if (tickMat.current) tickMat.current.color.lerpColors(ink, ash, frame.night)
    g.updateMatrixWorld()
    // Ancrages des liens sur l'anneau, en coordonnées du monde.
    for (let i = 0; i < links.length; i++) {
      const a = linkAngle(i)
      tmp.p.set(Math.cos(a) * RING_RADIUS, Math.sin(a) * RING_RADIUS, 0).applyMatrix4(g.matrixWorld)
      anchorPoints.set(`link:${i}`, [tmp.p.x, tmp.p.y, tmp.p.z])
    }
  })

  return (
    <group ref={group}>
      <mesh>
        <torusGeometry args={[RING_RADIUS, 0.016, 6, 420]} />
        <meshBasicMaterial color={palette.vermilion} fog />
      </mesh>
      <instancedMesh ref={ticks} args={[tickGeometry, undefined, TICKS]} frustumCulled={false}>
        <meshBasicMaterial ref={tickMat} color={palette.ink} fog />
      </instancedMesh>
    </group>
  )
}
