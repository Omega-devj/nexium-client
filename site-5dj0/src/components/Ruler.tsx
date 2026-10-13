'use client'

import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { CHAPTERS, CHAPTER_COUNT } from '@/config/chapters'
import { scenePosition } from '@/director/shell'
import { useMotion } from '@/director/motion'
import { rig, timelinePosition } from '@/lib/rig'

/** Fait défiler jusqu'au début de la séquence épinglée d'un chapitre. */
export function goToChapter(i: number, reduced: boolean) {
  const el = document.getElementById(CHAPTERS[i].id)
  if (!el) return
  // La séquence épinglée commence quand le haut de la section atteint le haut de l'écran.
  const u = window.innerHeight
  const top = el.getBoundingClientRect().top + window.scrollY + (i === 0 ? 0 : u * 0.02)
  window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' })
}

const fmt = (v: number) => (v < 0 ? '−' : '') + Math.abs(v).toFixed(2)

/**
 * La règle du parcours : sept graduations, une par état de la matière. Le curseur
 * vermillon suit la position exacte du scroll ; une graduation mène à son chapitre.
 * En dessous, la position réelle de la caméra : le scroll la déplace, on le lit.
 */
export function Ruler() {
  const marker = useRef<HTMLSpanElement>(null)
  const readout = useRef<HTMLParagraphElement>(null)
  const list = useRef<HTMLOListElement>(null)
  const { mode } = useMotion()

  useEffect(() => {
    let active = -1
    let frameCount = 0
    const tick = () => {
      const g = timelinePosition()
      const ratio = Math.min(1, g / CHAPTER_COUNT)
      if (marker.current) marker.current.style.setProperty('--p', ratio.toFixed(4))
      const idx = Math.min(CHAPTER_COUNT - 1, Math.floor(g + 0.02))
      if (idx !== active && list.current) {
        active = idx
        list.current.querySelectorAll('li').forEach((li, i) => {
          li.dataset.state = i < idx ? 'past' : i === idx ? 'current' : 'next'
        })
      }
      if (++frameCount % 4 === 0 && readout.current) {
        const c = rig.camera
        const text =
          c.fov > 0
            ? `cam ${fmt(c.x)} ${fmt(c.y)} ${fmt(c.z)} · ${c.fov.toFixed(0)}° · G ${scenePosition().toFixed(2)}`
            : `G ${g.toFixed(2)}`
        if (readout.current.textContent !== text) readout.current.textContent = text
      }
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [])

  return (
    <nav aria-label="Chapitres" className="ruler pointer-events-none fixed z-30 text-fg transition-colors duration-700">
      <div className="ruler-track" aria-hidden>
        <span ref={marker} className="ruler-marker" />
      </div>
      <ol ref={list} className="ruler-list">
        {CHAPTERS.map((c, i) => (
          <li key={c.id} data-state={i === 0 ? 'current' : 'next'} style={{ ['--i' as string]: i }}>
            <button
              type="button"
              className="ruler-tick pointer-events-auto"
              onClick={() => goToChapter(i, mode === 'reduced')}
              aria-label={`${c.index} — ${c.title}`}
            >
              <span className="t-mono ruler-index">{c.index}</span>
              <span className="t-mono ruler-title">{c.title}</span>
              <span className="ruler-dash" aria-hidden />
            </button>
          </li>
        ))}
      </ol>
      <p ref={readout} className="t-mono-plain ruler-readout" aria-hidden>
        G 0.00
      </p>
    </nav>
  )
}
