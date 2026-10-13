'use client'

import { useRef } from 'react'
import { CHAPTERS } from '@/config/chapters'
import { identity, site } from '@/content/site'
import { useChapter } from '@/director/useChapter'
import { Mark } from '../Mark'
import { ChapterTag } from '../Words'

const C = CHAPTERS[0]

/**
 * 00 — Origine. Le nom 5dj0 est la scène : des lettres monumentales, vernies, sous une
 * lumière qui suit le pointeur. Le DOM ne garde que le strict nécessaire, en marge.
 */
export function Origin() {
  const ref = useRef<HTMLElement>(null)
  useChapter(0, ref, ({ hide, q }) => {
    hide(q('[data-hint]'), 0.03, 0.2, -8)
    hide(q('[data-line]'), 0.42, 0.4, -36)
    hide(q('[data-meta]'), 0.5, 0.35, -16)
  })

  return (
    <section id={C.id} ref={ref} className="chapter" style={{ height: `calc(var(--u) * ${C.len})` }} aria-labelledby="t-origine">
      <div className="pin">
        <h1 id="t-origine" className="sr-only">
          {site.name} — {site.shortDescription}
        </h1>

        {/* Logotype plat : visible jusqu'à ce que les lettres 3D prennent le relais. */}
        <div className="hero-mark absolute inset-0 flex items-center justify-center" aria-hidden>
          <Mark className="hero-mark-svg text-ink" />
        </div>

        <div
          data-meta
          className="absolute left-[var(--gutter)] top-[calc(var(--gutter)+2.6rem)] max-w-[15rem] text-ink md:top-[calc(var(--gutter)+3rem)]"
        >
          <ChapterTag index={C.index} title={C.title} />
          <p className="t-mono-plain mt-3 text-[color:var(--slate)]">
            x 0 · y 0 · z 0
            <br />
            sept états d’une même matière
          </p>
        </div>

        <p
          data-line
          className="t-statement absolute bottom-[calc(var(--gutter)+3.2rem)] left-[var(--gutter)] max-w-[19ch] text-[1.45rem] text-ink md:bottom-[var(--gutter)] md:max-w-[22ch] md:text-[2.05rem]"
        >
          {identity.heroLine}
        </p>

        <div data-hint className="absolute bottom-[var(--gutter)] right-[var(--gutter)] hidden items-center gap-4 text-ink md:flex md:right-[calc(var(--gutter)+5.5rem)]">
          <span className="t-mono">{identity.heroHint}</span>
          <span className="scroll-cue" aria-hidden />
        </div>

        <p className="fallback-note t-mono-plain absolute bottom-[calc(var(--gutter)*0.6)] left-[var(--gutter)] text-[color:var(--slate)]">
          Rendu 3D indisponible sur cet appareil : version statique, contenu complet.
        </p>
      </div>
    </section>
  )
}
