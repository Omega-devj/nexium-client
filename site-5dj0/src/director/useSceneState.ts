'use client'

import { useSyncExternalStore } from 'react'

export type SceneState = 'pending' | 'ready' | 'fallback'

function subscribe(cb: () => void) {
  const obs = new MutationObserver(cb)
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-scene'] })
  return () => obs.disconnect()
}

const read = (): SceneState => {
  const s = document.documentElement.dataset.scene
  return s === 'ready' || s === 'fallback' ? s : 'pending'
}

/** État de la scène 3D (en attente, prête, ou remplacée par la version statique). */
export function useSceneState(): SceneState {
  return useSyncExternalStore(subscribe, read, () => 'pending')
}
