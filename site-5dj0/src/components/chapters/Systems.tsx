'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useRef, useState } from 'react'
import { CHAPTERS } from '@/config/chapters'
import { families, relations, systemsText, technologies } from '@/content/technologies'
import { useChapter } from '@/director/useChapter'
import { useMotion } from '@/director/motion'
import { rig } from '@/lib/rig'
import { Anchor } from '../Anchor'
import { ChapterTag, Words } from '../Words'

const C = CHAPTERS[2]

/**
 * 02 — Systèmes. Trois figures (plan, volume, hélice) pour trois familles de langages.
 * Chaque langage est un vrai bouton : survol ou focus clavier allument ses relations
 * dans la matière, et la fiche en bas de l'écran dit ce qui les relie.
 */
export function Systems() {
  const ref = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(-1)
  const { mode } = useMotion()

  useChapter(2, ref, ({ at, reveal, show, hide, q }) => {
    show(q('[data-tag]'), at(0.0), 0.04)
    reveal(q('[data-title] .w'), at(0.0), 0.08)
    reveal(q('[data-lead] .w'), at(0.05), 0.08)
    show(q('[data-labels]'), at(0.12), 0.08, 0)
    show(q('[data-panel]'), at(0.16), 0.08, 16)
    hide(q('[data-fade]'), at(0.92), 0.07, -30)
  })

  const focus = (i: number) => {
    rig.focus.tech = i
    setActive(i)
  }
  const blur = () => {
    rig.focus.tech = -1
    setActive(-1)
  }

  const tech = active >= 0 ? technologies[active] : null
  const links = tech ? relations.filter((r) => r.from === tech.id || r.to === tech.id) : []
  const nameOf = (id: string) => technologies.find((t) => t.id === id)?.name ?? id

  return (
    <section id={C.id} ref={ref} className="chapter" style={{ height: `calc(var(--u) * ${C.len})` }} aria-labelledby="t-systemes">
      <div ref={stage} className="pin text-ink">
        <div data-fade className="absolute left-[var(--gutter)] top-[calc(var(--gutter)+2.8rem)] max-w-[34rem]">
          <div data-tag>
            <ChapterTag index={C.index} title={C.title} />
          </div>
          <h2 id="t-systemes" data-title className="t-monument mt-4 text-[clamp(3.4rem,12vw,5rem)] md:text-[clamp(4rem,7vw,7.5rem)]">
            <Words text={systemsText.title} />
          </h2>
          <p data-lead className="t-statement mt-3 text-[1.15rem] md:text-[1.5rem]">
            <Words text={systemsText.lead} />
          </p>
        </div>

        <div data-fade className="absolute inset-0">
          <div data-labels className="anchor-set systems-labels absolute inset-0">
            {technologies.map((t, i) => (
              <Anchor key={t.id} anchor={`tech:${i}`} stage={stage}>
                <button
                  type="button"
                  className={`tech-label ${active === i ? 'is-active' : ''}`}
                  onPointerEnter={() => focus(i)}
                  onPointerLeave={blur}
                  onFocus={() => focus(i)}
                  onBlur={blur}
                  aria-describedby="systems-panel"
                  data-cursor="relier"
                >
                  <span className="tech-dot" aria-hidden />
                  <span className="tech-name">{t.name}</span>
                </button>
              </Anchor>
            ))}
            {families.map((f) => (
              <Anchor key={f.id} anchor={`family:${f.id}`} stage={stage} className="family-label">
                <div>
                  <span className="t-mono block">{f.name}</span>
                  <span className="t-mono-plain block text-[color:var(--slate)]">{f.figure}</span>
                </div>
              </Anchor>
            ))}
          </div>

          <div
            data-panel
            id="systems-panel"
            aria-live="polite"
            className="systems-panel absolute bottom-[calc(var(--gutter)+3.2rem)] left-[var(--gutter)] right-[var(--gutter)] md:bottom-[var(--gutter)] md:right-auto md:w-[min(30rem,38vw)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              {tech ? (
                <motion.div
                  key={tech.id}
                  initial={mode === 'reduced' ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.2, 0.7, 0.1, 1] }}
                >
                  <p className="t-mono text-[color:var(--slate)]">{families.find((f) => f.id === tech.family)?.name}</p>
                  <p className="mt-1 text-[1.6rem] font-semibold [font-variation-settings:'wdth'_80]">{tech.name}</p>
                  <p className="t-body mt-1 max-w-[40ch]">{tech.role}</p>
                  <ul className="mt-3 space-y-1">
                    {links.map((r) => (
                      <li key={r.from + r.to} className="t-mono-plain flex gap-2">
                        <span className="text-vermilion">→</span>
                        <span>{nameOf(r.from === tech.id ? r.to : r.from)}</span>
                        <span className="text-[color:var(--slate)]">· {r.reason}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ) : (
                <motion.div key="families" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                  <ul className="space-y-2">
                    {families.map((f) => (
                      <li key={f.id} className="grid grid-cols-[7.5rem_1fr] gap-3">
                        <span className="t-mono">{f.name}</span>
                        <span className="t-mono-plain text-[color:var(--slate)]">{f.text}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="t-mono-plain mt-3 hidden opacity-70 md:block">{systemsText.hint}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
