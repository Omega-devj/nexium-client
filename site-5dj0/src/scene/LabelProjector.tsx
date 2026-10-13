'use client'

import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { families } from '@/content/technologies'
import { anchorPoints, forEachLabel } from '@/lib/labels'
import type { World } from './formations'

/**
 * Projette chaque étiquette du DOM sur son point d'ancrage 3D.
 * N'écrit que `transform` et `data-behind` : la timeline du chapitre garde la main
 * sur l'opacité. Les coordonnées tiennent compte du décalage de la scène épinglée.
 */
export function LabelProjector({ world }: { world: World }) {
  const camera = useThree((s) => s.camera)
  const size = useThree((s) => s.size)
  const tmp = useMemo(() => ({ v: new THREE.Vector3(), tops: new Map<HTMLElement, number>() }), [])

  useEffect(() => {
    world.systems.tech.forEach((p, i) => anchorPoints.set(`tech:${i}`, p))
    families.forEach((f) => anchorPoints.set(`family:${f.id}`, world.systems.family[f.id]))
    world.graph.forEach((p, i) => anchorPoints.set(`graph:${i}`, p))
    document.documentElement.dataset.anchors = 'live'
    return () => {
      delete document.documentElement.dataset.anchors
    }
  }, [world])

  useFrame(() => {
    tmp.tops.clear()
    forEachLabel(({ el, key, stage }) => {
      const p = anchorPoints.get(key)
      if (!p) return
      tmp.v.set(p[0], p[1], p[2]).project(camera)
      const behind = tmp.v.z > 1 || tmp.v.z < -1
      let top = 0
      if (stage) {
        const cached = tmp.tops.get(stage)
        top = cached ?? stage.getBoundingClientRect().top
        if (cached === undefined) tmp.tops.set(stage, top)
      }
      const x = (tmp.v.x * 0.5 + 0.5) * size.width
      const y = (-tmp.v.y * 0.5 + 0.5) * size.height - top
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
      const b = behind ? '1' : '0'
      if (el.dataset.behind !== b) el.dataset.behind = b
    })
  })
  return null
}
