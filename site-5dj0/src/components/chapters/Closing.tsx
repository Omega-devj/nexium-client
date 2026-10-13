'use client'

import { useEffect, useRef, useState } from 'react'
import { CHAPTERS } from '@/config/chapters'
import { closing, colophon, links, site } from '@/content/site'
import { useChapter } from '@/director/useChapter'
import { useMotion } from '@/director/motion'
import { useSceneState } from '@/director/useSceneState'
import { pulseLink, rig } from '@/lib/rig'
import { Anchor } from '../Anchor'
import { goToChapter } from '../Ruler'
import { ChapterTag, Words } from '../Words'

const C = CHAPTERS[6]

/**
 * 06 — Retour. La matière revient au nom, les lettres se reconstituent, et l'anneau
 * porte les liens. Survoler un lien envoie une onde à travers la matière.
 */
export function Closing() {
  const ref = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const { mode, setMode } = useMotion()
  const scene = useSceneState()
  const [count, setCount] = useState(0)

  useChapter(6, ref, ({ at, reveal, show, q }) => {
    show(q('[data-tag]'), at(0.05), 0.05)
    reveal(q('[data-title] .w'), at(0.06), 0.14)
    show(q('[data-line]'), at(0.2), 0.1, 16)
    show(q('[data-links]'), at(0.48), 0.1, 0)
    show(q('[data-foot]'), at(0.62), 0.1, 14)
  })

  useEffect(() => {
    if (scene !== 'ready') return
    const id = window.setTimeout(() => setCount(rig.count), 0)
    return () => window.clearTimeout(id)
  }, [scene])

  return (
    <section id={C.id} ref={ref} className="chapter" style={{ height: `calc(var(--u) * ${C.len})` }} aria-labelledby="t-retour">
      <div ref={stage} className="pin text-ink">
        <div className="absolute left-[var(--gutter)] right-[var(--gutter)] top-[calc(var(--gutter)+2.8rem)] md:right-auto md:max-w-[34rem]">
          <div data-tag>
            <ChapterTag index={C.index} title={C.title} />
          </div>
          <h2 id="t-retour" data-title className="t-statement mt-4 text-[1.8rem] md:text-[clamp(2rem,3.2vw,3.2rem)]">
            <Words text={closing.title} />
          </h2>
          <p data-line className="t-body mt-3 max-w-[40ch] text-[color:var(--slate)]">
            {closing.line}
          </p>
        </div>

        <div data-links className="pointer-events-none absolute inset-0">
          <h3 className="sr-only">{closing.linksTitle}</h3>
          <ul className="anchor-set closing-links absolute inset-0">
            {links.map((l, i) => (
              <Anchor key={l.href} as="li" anchor={`link:${i}`} stage={stage} className="is-left">
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ring-link pointer-events-auto"
                  onPointerEnter={() => pulseLink(i)}
                  onFocus={() => pulseLink(i)}
                  onPointerLeave={() => (rig.focus.link = -1)}
                  onBlur={() => (rig.focus.link = -1)}
                  data-cursor="ouvrir"
                >
                  <span className="ring-link-label">{l.label}</span>
                  {l.note ? <span className="t-mono ring-link-note">{l.note} ↗</span> : null}
                </a>
              </Anchor>
            ))}
          </ul>
        </div>

        <footer
          data-foot
          className="absolute bottom-[calc(var(--gutter)+3rem)] left-[var(--gutter)] right-[var(--gutter)] flex flex-col gap-5 md:bottom-[var(--gutter)] md:right-[calc(var(--gutter)+16rem)] md:flex-row md:items-end md:gap-16"
        >
          <button type="button" className="restart t-mono flex items-center gap-3" onClick={() => goToChapter(0, mode === 'reduced')} data-cursor="origine">
            <span aria-hidden className="restart-dot" />
            {closing.restart}
          </button>
          <dl className="t-mono-plain grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5 text-[color:var(--slate)]">
            <dt className="opacity-70">Caractères</dt>
            <dd>{colophon.typefaces}</dd>
            <dt className="opacity-70">Rendu</dt>
            <dd>{colophon.rendering}</dd>
            <dt className="opacity-70">Orchestration</dt>
            <dd>{colophon.orchestration}</dd>
            {count > 0 ? (
              <>
                <dt className="opacity-70">Matière</dt>
                <dd>{count.toLocaleString('fr-FR')} points, une seule scène</dd>
              </>
            ) : null}
            <dt className="opacity-70">Mouvement</dt>
            <dd>
              <button type="button" className="link-line" onClick={() => setMode(mode === 'reduced' ? 'full' : 'reduced')} aria-pressed={mode === 'reduced'}>
                {mode === 'reduced' ? 'réduit — rétablir' : 'complet — réduire'}
              </button>
            </dd>
            <dt className="opacity-70">Nom</dt>
            <dd>{site.name}</dd>
          </dl>
        </footer>
      </div>
    </section>
  )
}
