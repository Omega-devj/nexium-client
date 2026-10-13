'use client'

import { motion, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { useMotion } from '@/director/motion'

/**
 * Curseur discret : un point d'encre et un cercle qui s'ouvre sur les éléments
 * interactifs, avec leur intention (« ouvrir », « origine »…). Absent sur les écrans
 * tactiles ; le curseur du système revient dans les champs de saisie.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [label, setLabel] = useState('')
  const [hot, setHot] = useState(false)
  const [visible, setVisible] = useState(false)
  const { mode } = useMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 520, damping: 42, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 520, damping: 42, mass: 0.6 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setEnabled(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const root = document.documentElement
    if (!enabled) {
      delete root.dataset.cursor
      return
    }
    root.dataset.cursor = 'on'
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = (e.target as Element | null)?.closest('a, button, input, textarea, [data-cursor]')
      const isText = target?.matches('input, textarea') ?? false
      setHot(!!target && !isText)
      setLabel(target && !isText ? (target.getAttribute('data-cursor') ?? (target.matches('a') ? 'ouvrir' : '')) : '')
      if (isText) setVisible(false)
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    root.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      root.removeEventListener('pointerleave', leave)
      delete root.dataset.cursor
    }
  }, [enabled, x, y])

  if (!enabled) return null
  const reduced = mode === 'reduced'
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-50" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div
        className="cursor-ring"
        style={{ x: reduced ? x : sx, y: reduced ? y : sy }}
        animate={{ scale: hot ? 1 : 0.42, opacity: hot ? 1 : 0.55 }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
      >
        {label ? <span className="cursor-label t-mono">{label}</span> : null}
      </motion.div>
    </div>
  )
}
