'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect } from 'react'
import { rig, timelinePosition } from '@/lib/rig'
import { nightAt, reducedPosition } from '@/scene/frame'

/**
 * Unité de hauteur des sections (--u) : la hauteur de la fenêtre au chargement,
 * mise à jour quand la largeur change ou quand la hauteur varie franchement
 * (rotation), mais pas quand la barre d'adresse d'un mobile se replie.
 */
export function useViewportUnit() {
  useEffect(() => {
    let w = window.innerWidth
    let h = window.innerHeight
    const apply = () => document.documentElement.style.setProperty('--u', `${h}px`)
    apply()
    const onResize = () => {
      const nw = window.innerWidth
      const nh = window.innerHeight
      if (nw !== w || Math.abs(nh - h) / h > 0.22) {
        w = nw
        h = nh
        apply()
        ScrollTrigger.refresh()
      }
    }
    window.addEventListener('resize', onResize)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => window.removeEventListener('resize', onResize)
  }, [])
}

/** Position du pointeur, en coordonnées normalisées (-1 → 1), pour la scène. */
export function usePointer() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return
      rig.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      rig.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
      rig.pointer.active = true
    }
    const onLeave = () => {
      rig.pointer.active = false
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
    }
  }, [])
}

/** Position du parcours telle que la scène l'affiche (mode réduit compris). */
export function scenePosition() {
  const g = timelinePosition()
  return rig.motion === 'reduced' ? reducedPosition(g).G : g
}

/**
 * Le DOM suit la lumière de la scène : fond de page et couleur des éléments fixes
 * basculent avec la nuit. Fonctionne aussi sans WebGL.
 */
export function useAtmosphereSync() {
  useEffect(() => {
    const root = document.documentElement
    let last = -1
    let lastNight = ''
    let lastPast = ''
    const tick = () => {
      const g = scenePosition()
      const night = Math.round(nightAt(g) * 100) / 100
      if (night !== last) {
        root.style.setProperty('--night-amount', String(night))
        last = night
      }
      const n = night > 0.5 ? '1' : '0'
      if (n !== lastNight) {
        root.dataset.night = n
        lastNight = n
      }
      const past = timelinePosition() > 0.7 ? '1' : '0'
      if (past !== lastPast) {
        root.dataset.past = past
        lastPast = past
      }
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])
}
