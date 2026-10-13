'use client'

import { useRef } from 'react'
import { CHAPTERS } from '@/config/chapters'
import { workWindow } from '@/config/choreography'
import { projects, worksText, type Project } from '@/content/projects'
import { useChapter } from '@/director/useChapter'
import { ChapterTag, Words } from '../Words'

const INDEX = 4
const C = CHAPTERS[INDEX]
const pad = (n: number) => String(n).padStart(2, '0')

function Meta({ p }: { p: Project }) {
  return (
    <dl data-part className="work-meta t-mono-plain grid grid-cols-[6.5rem_1fr] gap-x-4 gap-y-1">
      <dt className="opacity-60">Rôle</dt>
      <dd>{p.role}</dd>
      <dt className="opacity-60">Technologies</dt>
      <dd>{p.stack.join(' · ')}</dd>
      <dt className="opacity-60">Statut</dt>
      <dd className="flex items-center gap-2">
        <span aria-hidden className="inline-block h-[6px] w-[6px] rounded-full bg-vermilion" />
        {p.status}
      </dd>
    </dl>
  )
}

function Links({ p }: { p: Project }) {
  if (p.links.length === 0) return null
  return (
    <ul data-part className="work-links flex flex-wrap gap-x-6 gap-y-2">
      {p.links.map((l) => (
        <li key={l.href}>
          <a className="link-line t-mono" href={l.href} target="_blank" rel="noopener noreferrer" data-cursor="ouvrir">
            {l.label} ↗
          </a>
        </li>
      ))}
    </ul>
  )
}

/**
 * Une composition par mise en page : le titre monumental en pied de page, en colonne
 * verticale, en demi-page ou en marge. La figure 3D occupe la place laissée libre
 * (la caméra décentre son objectif en conséquence, voir config/choreography.ts).
 */
function Work({ p, k }: { p: Project; k: number }) {
  const index = `${pad(k + 1)} / ${pad(projects.length)}`
  const title = (
    <h3 id={`work-${p.id}`} data-title className="work-title t-monument">
      <Words text={p.title} />
    </h3>
  )
  const body = (
    <>
      <p data-part className="work-summary t-statement">
        {p.summary}
      </p>
      <ul data-part className="work-details t-body space-y-2">
        {p.details.map((d) => (
          <li key={d} className="flex gap-3">
            <span aria-hidden className="mt-[0.7em] inline-block h-px w-3 shrink-0 bg-current opacity-60" />
            <span>{d}</span>
          </li>
        ))}
      </ul>
      <Meta p={p} />
      <Links p={p} />
    </>
  )
  return (
    <article data-work={k} className={`work work-${p.layout}`} aria-labelledby={`work-${p.id}`}>
      <p data-part className="work-index t-mono">
        <span className="text-vermilion">{index}</span> · {p.kind}
      </p>
      {p.layout === 'margin' ? (
        <span aria-hidden className="work-ghost t-monument">
          {pad(k + 1)}
        </span>
      ) : null}
      {title}
      <div className="work-body">{body}</div>
    </article>
  )
}

/** 04 — Ouvrages. Les projets défilent latéralement ; la matière passe d'une figure à l'autre. */
export function Works() {
  const ref = useRef<HTMLElement>(null)
  useChapter(INDEX, ref, ({ at, reveal, show, hide, q }) => {
    const [w0] = workWindow(0)
    const local = (g: number) => g - INDEX
    show(q('[data-intro-tag]'), at(0), 0.02)
    reveal(q('[data-intro] .w'), at(0), 0.03)
    hide(q('[data-intro-all]'), local(w0) + 0.02, 0.025, -30)
    projects.forEach((_, k) => {
      const [a, b] = workWindow(k).map(local)
      const span = b - a
      const el = q(`[data-work="${k}"]`)[0]
      if (!el) return
      show(el, a + span * 0.17, span * 0.05, 0)
      reveal(el.querySelectorAll('[data-title] .w'), a + span * 0.17, span * 0.12)
      show(el.querySelectorAll('[data-part]'), a + span * 0.24, span * 0.14, 18)
      const last = k === projects.length - 1
      hide(el, last ? 0.965 : a + span * 0.86, last ? 0.03 : span * 0.09, -30)
    })
  })

  return (
    <section id={C.id} ref={ref} className="chapter" style={{ height: `calc(var(--u) * ${C.len})` }} aria-labelledby="t-ouvrages">
      <div className="pin text-ink">
        <div data-intro-all className="absolute left-[var(--gutter)] top-[calc(var(--gutter)+2.8rem)] max-w-[40rem]">
          <div data-intro-tag>
            <ChapterTag index={C.index} title={C.title} />
          </div>
          <h2 id="t-ouvrages" data-intro className="t-monument mt-4 text-[clamp(3.4rem,12vw,5rem)] md:text-[clamp(4rem,7vw,7.5rem)]">
            <Words text={worksText.title} />
          </h2>
          <p data-intro className="t-statement mt-3 text-[1.15rem] md:text-[1.5rem]">
            <Words text={worksText.lead} />
          </p>
        </div>
        {projects.map((p, k) => (
          <Work key={p.id} p={p} k={k} />
        ))}
      </div>
    </section>
  )
}
