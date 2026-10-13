'use client'

import { useRef } from 'react'
import { CHAPTERS } from '@/config/chapters'
import { identity } from '@/content/site'
import { useChapter } from '@/director/useChapter'
import { ChapterTag, Words } from '../Words'

const C = CHAPTERS[1]

/**
 * 01 — Matière. La caméra traverse le zéro ; derrière, les lettres se défont en points
 * qui se recomposent en charpente. Le texte arrive quand la structure se forme.
 */
export function MatterChapter() {
  const ref = useRef<HTMLElement>(null)
  useChapter(1, ref, ({ at, reveal, show, hide, q }) => {
    show(q('[data-tag]'), at(0.1), 0.05)
    reveal(q('[data-statement] .w'), at(0.12), 0.12)
    show(q('[data-paragraph]'), at(0.2), 0.08, 14)
    q('[data-facet]').forEach((el, i) => {
      reveal(el.querySelectorAll('.w'), at(0.26 + i * 0.09), 0.1)
      show(el.querySelectorAll('[data-facet-text]'), at(0.3 + i * 0.09), 0.08, 12)
    })
    show(q('[data-anchor-fact]'), at(0.24), 0.08, 10)
    hide(q('[data-fade]'), at(0.9), 0.08, -40)
  })

  return (
    <section id={C.id} ref={ref} className="chapter" style={{ height: `calc(var(--u) * ${C.len})` }} aria-labelledby="t-matiere">
      <div className="pin text-ink">
        <div data-fade className="absolute left-[var(--gutter)] right-[var(--gutter)] top-[calc(var(--gutter)+2.8rem)] md:right-auto md:max-w-[min(46rem,52vw)]">
          <div data-tag>
            <ChapterTag index={C.index} title={C.title} />
          </div>
          <h2 id="t-matiere" data-statement className="t-statement mt-5 text-[1.5rem] md:text-[clamp(1.6rem,2.5vw,2.6rem)]">
            <Words text={identity.statement} />
          </h2>
          <p data-paragraph className="t-body mt-5 hidden max-w-[46ch] text-[color:var(--slate)] sm:block">
            {identity.paragraph}
          </p>
          <p data-anchor-fact className="t-mono mt-5 inline-flex items-center gap-2">
            <span aria-hidden className="inline-block h-[6px] w-[6px] rounded-full bg-vermilion" />
            {identity.anchor}
          </p>
        </div>

        <ul data-fade className="absolute bottom-[calc(var(--gutter)+3.5rem)] left-[var(--gutter)] right-[var(--gutter)] md:bottom-[calc(var(--gutter)*1.2)] md:right-auto">
          {identity.facets.map((f) => (
            <li key={f.verb} data-facet className="flex flex-col gap-1 md:flex-row md:items-end md:gap-6">
              <span className="t-monument text-[clamp(3.2rem,14vw,5rem)] md:text-[clamp(4rem,7.6vw,8.6rem)]">
                <Words text={f.verb} />
              </span>
              <span data-facet-text className="t-mono-plain max-w-[26ch] pb-[0.5em] text-[color:var(--slate)]">
                {f.text}
              </span>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
