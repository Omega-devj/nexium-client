'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { rig, timelinePosition } from '@/lib/rig'
import { frame, nightAt, reducedPosition } from './frame'

/** Lit la position du parcours et prépare l'état d'image, avant tout le reste. */
export function Driver() {
  const gl = useThree((s) => s.gl)
  useFrame((_, delta) => {
    const g = timelinePosition()
    frame.raw = g
    frame.reduced = rig.motion === 'reduced'
    if (frame.reduced) {
      const r = reducedPosition(g)
      frame.G = r.G
      frame.veil = r.veil
    } else {
      frame.G = g
      frame.veil = 1
      frame.time += Math.min(delta, 0.1)
    }
    frame.night = nightAt(frame.G)
    const opacity = frame.veil.toFixed(3)
    if (gl.domElement.style.opacity !== opacity) gl.domElement.style.opacity = opacity
  }, -10)
  return null
}
