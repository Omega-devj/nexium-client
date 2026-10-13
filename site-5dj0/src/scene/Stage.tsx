'use client'

import { PerformanceMonitor } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
import { matter } from '@/config/choreography'
import { QUALITY, type Tier } from '@/config/quality'
import { buildWorld } from './formations'
import { A0, A6 } from './layout'
import { Atmosphere, Lights } from './Atmosphere'
import { CameraRig } from './CameraRig'
import { Driver } from './Driver'
import { LabelProjector } from './LabelProjector'
import { Matter } from './Matter'
import { Monolith } from './Monolith'
import { Ring } from './Ring'

type Props = {
  tier: Tier
  onReady: () => void
  onLost: () => void
}

/** Signale que la première image est réellement affichée. */
function ReadySignal({ onReady }: { onReady: () => void }) {
  const frames = useRef(0)
  const done = useRef(false)
  useFrame(() => {
    if (done.current) return
    frames.current++
    if (frames.current === 3) {
      done.current = true
      onReady()
    }
  })
  return null
}

function World({ tier, onReady }: { tier: Tier; onReady: () => void }) {
  const quality = QUALITY[tier]
  const world = useMemo(() => buildWorld(quality.particles), [quality.particles])
  return (
    <>
      <Driver />
      <CameraRig />
      <Atmosphere />
      <Lights resolution={quality.envResolution} />
      <Monolith anchor={A0} dissolve={matter.dissolveOrigin} visibleFrom={0} visibleTo={1.6} />
      <Monolith anchor={A6} dissolve={matter.dissolveFinale} visibleFrom={5.8} visibleTo={7.01} />
      <Ring />
      <Matter world={world} />
      <LabelProjector world={world} />
      <ReadySignal onReady={onReady} />
    </>
  )
}

/** Canevas WebGL persistant : une seule scène pour tout le parcours. */
export default function Stage({ tier, onReady, onLost }: Props) {
  const quality = QUALITY[tier]
  const [dpr, setDpr] = useState(quality.dpr[1])
  const lostRef = useRef(onLost)
  useEffect(() => {
    lostRef.current = onLost
  }, [onLost])

  return (
    <Canvas
      className="stage-canvas"
      dpr={dpr}
      flat
      gl={{ antialias: quality.antialias, alpha: false, powerPreference: 'high-performance', stencil: false }}
      camera={{ fov: 34, near: 0.05, far: 260, position: [0, -1.25, 17.5] }}
      events={undefined}
      onCreated={({ gl }) => {
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault()
          lostRef.current()
        })
      }}
      aria-hidden
    >
      <PerformanceMonitor
        onDecline={() => setDpr((d) => Math.max(quality.dpr[0], Math.round((d - 0.25) * 100) / 100))}
        onIncline={() => setDpr((d) => Math.min(quality.dpr[1], Math.round((d + 0.15) * 100) / 100))}
        flipflops={4}
      />
      <World tier={tier} onReady={onReady} />
    </Canvas>
  )
}
