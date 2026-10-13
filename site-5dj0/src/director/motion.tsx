'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { rig, type MotionMode } from '@/lib/rig'

const KEY = '5dj0:motion'

type MotionContext = { mode: MotionMode; setMode: (m: MotionMode) => void; userSet: boolean }

const Ctx = createContext<MotionContext>({ mode: 'full', setMode: () => {}, userSet: false })

function readInitial(): { mode: MotionMode; userSet: boolean } {
  if (typeof window === 'undefined') return { mode: 'full', userSet: false }
  let stored: string | null = null
  try {
    stored = localStorage.getItem(KEY)
  } catch {
    stored = null
  }
  if (stored === 'full' || stored === 'reduced') return { mode: stored, userSet: true }
  return { mode: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'reduced' : 'full', userSet: false }
}

/**
 * Préférence de mouvement : celle du système par défaut, ou celle choisie sur le site
 * (mémorisée sur cet appareil). Le mode réduit garde toute l'information mais remplace
 * les voyages de caméra et les envols de matière par des fondus.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ mode: MotionMode; userSet: boolean }>({ mode: 'full', userSet: false })

  useEffect(() => {
    const initial = readInitial()
    // Synchronisation avec une préférence qui n'existe que côté navigateur.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(initial)
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => {
      setState((s) => (s.userSet ? s : { mode: mq.matches ? 'reduced' : 'full', userSet: false }))
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    rig.motion = state.mode
    document.documentElement.dataset.motion = state.mode
  }, [state.mode])

  const setMode = useCallback((mode: MotionMode) => {
    try {
      localStorage.setItem(KEY, mode)
    } catch {
      // Stockage indisponible (navigation privée) : le choix vaut pour cette visite.
    }
    setState({ mode, userSet: true })
  }, [])

  return <Ctx.Provider value={{ mode: state.mode, setMode, userSet: state.userSet }}>{children}</Ctx.Provider>
}

export const useMotion = () => useContext(Ctx)
