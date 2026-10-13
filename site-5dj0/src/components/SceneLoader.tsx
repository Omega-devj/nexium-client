'use client'

import dynamic from 'next/dynamic'
import { Component, useCallback, useEffect, useState, type ReactNode } from 'react'
import { detectTier, type Tier } from '@/config/quality'

const Stage = dynamic(() => import('@/scene/Stage'), { ssr: false })

class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch() {
    this.props.onError()
  }
  render() {
    return this.state.failed ? null : this.props.children
  }
}

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    const gl = c.getContext('webgl2') ?? c.getContext('webgl')
    if (!gl) return false
    ;(gl as WebGLRenderingContext).getExtension('WEBGL_lose_context')?.loseContext()
    return true
  } catch {
    return false
  }
}

/**
 * Charge la scène 3D après le premier affichage, quand le navigateur est disponible.
 * Sans WebGL, ou si le contexte graphique est perdu, le site bascule sur sa version
 * statique : tout le contenu reste présent et lisible.
 */
export function SceneLoader() {
  const [state, setState] = useState<'idle' | 'webgl' | 'fallback'>('idle')
  const [tier, setTier] = useState<Tier>('mid')

  const fallback = useCallback(() => {
    setState('fallback')
    document.documentElement.dataset.scene = 'fallback'
  }, [])

  useEffect(() => {
    if (!hasWebGL()) {
      const id = window.setTimeout(fallback, 0)
      return () => window.clearTimeout(id)
    }
    const start = () => {
      setTier(detectTier())
      setState('webgl')
    }
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(start, { timeout: 700 })
      return () => (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(id)
    }
    const id = window.setTimeout(start, 120)
    return () => window.clearTimeout(id)
  }, [fallback])

  const ready = useCallback(() => {
    document.documentElement.dataset.scene = 'ready'
  }, [])

  return (
    <div className="stage-layer" aria-hidden>
      {state === 'webgl' ? (
        <SceneBoundary onError={fallback}>
          <Stage tier={tier} onReady={ready} onLost={fallback} />
        </SceneBoundary>
      ) : null}
    </div>
  )
}
