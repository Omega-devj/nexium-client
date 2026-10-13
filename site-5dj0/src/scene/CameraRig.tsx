'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'
import { atmosphere, camera as track } from '@/config/choreography'
import { rig } from '@/lib/rig'
import { frame } from './frame'

const DEG = Math.PI / 180

/**
 * La caméra suit la chorégraphie : position, cible, focale, roulis et décentrement
 * sont lus sur les pistes à la position G. Le pointeur ajoute une parallaxe amortie,
 * en surcouche, sans jamais modifier la trajectoire.
 */
export function CameraRig() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera
  const size = useThree((s) => s.size)
  const tmp = useMemo(
    () => ({
      pos: [0, 0, 0],
      target: [0, 0, 0],
      shift: [0, 0, 0, 0],
      roll: [0],
      p: new THREE.Vector3(),
      t: new THREE.Vector3(),
      right: new THREE.Vector3(),
      up: new THREE.Vector3(),
      fwd: new THREE.Vector3(),
      px: 0,
      py: 0,
    }),
    [],
  )

  useFrame((_, delta) => {
    const G = frame.G
    track.position.at(G, tmp.pos)
    track.target.at(G, tmp.target)
    tmp.p.fromArray(tmp.pos)
    tmp.t.fromArray(tmp.target)

    const aspect = size.width / Math.max(1, size.height)
    let fov = track.fov.value(G)

    // Écran étroit : garantir une largeur de champ minimale, en reculant si permis.
    const hfov = track.hfov.value(G)
    frame.dolly = 1
    if (hfov > 0) {
      const needed = 2 * Math.atan(Math.tan((hfov * DEG) / 2) / aspect) / DEG
      if (needed > fov) {
        const dolly = track.dolly.value(G)
        const k = Math.min(1.8, Math.tan((needed * DEG) / 2) / Math.tan((fov * DEG) / 2))
        const kk = 1 + (k - 1) * dolly
        tmp.p.sub(tmp.t).multiplyScalar(kk).add(tmp.t)
        frame.dolly = kk
        const reached = 2 * Math.atan(Math.tan((needed * DEG) / 2) / kk) / DEG
        fov = Math.max(fov, reached)
      }
    }

    // Parallaxe du pointeur, amortie, dans le repère de la caméra.
    const reduced = frame.reduced
    const amp = reduced ? 0 : atmosphere.parallax.value(G)
    const ease = 1 - Math.exp(-Math.min(delta, 0.1) * 2.6)
    tmp.px += ((rig.pointer.active ? rig.pointer.x : 0) - tmp.px) * ease
    tmp.py += ((rig.pointer.active ? rig.pointer.y : 0) - tmp.py) * ease
    tmp.fwd.subVectors(tmp.t, tmp.p).normalize()
    tmp.right.crossVectors(tmp.fwd, THREE.Object3D.DEFAULT_UP).normalize()
    tmp.up.crossVectors(tmp.right, tmp.fwd)
    const dist = tmp.p.distanceTo(tmp.t)
    const k = Math.min(1, dist / 14)
    tmp.p.addScaledVector(tmp.right, tmp.px * 0.62 * amp * k).addScaledVector(tmp.up, tmp.py * 0.36 * amp * k)
    tmp.t.addScaledVector(tmp.right, tmp.px * 0.12 * amp * k)

    camera.position.copy(tmp.p)
    camera.lookAt(tmp.t)
    track.roll.at(G, tmp.roll)
    camera.rotateZ(tmp.roll[0])

    if (Math.abs(camera.fov - fov) > 1e-3) camera.fov = fov
    camera.near = 0.05
    camera.far = 260

    // Décentrement de l'objectif : la cible apparaît à l'endroit voulu de l'écran.
    track.shift.at(G, tmp.shift)
    const narrow = aspect < 0.85
    const sx = narrow ? tmp.shift[2] : tmp.shift[0]
    const sy = narrow ? tmp.shift[3] : tmp.shift[1]
    const w = size.width
    const h = size.height
    camera.setViewOffset(w, h, (-sx * w) / 2, (sy * h) / 2, w, h)
    camera.updateProjectionMatrix()

    rig.camera.x = camera.position.x
    rig.camera.y = camera.position.y
    rig.camera.z = camera.position.z
    rig.camera.fov = fov
  }, -5)

  return null
}
