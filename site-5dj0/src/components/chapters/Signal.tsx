'use client'

import { useRef } from 'react'
import { CHAPTERS } from '@/config/chapters'
import { graphNodes, principles, signalText } from '@/content/signal'
import { useChapter } from '@/director/useChapter'
import { rig } from '@/lib/rig'
import { Anchor } from '../Anchor'
import { FallbackGraph } from '../FallbackGraph'
import { ChapterTag, Words } from '../Words'

const C = CHAPTERS[3]

/**
 * 03 — Signal. Vu d'en haut, un nuage. La caméra cherche l'angle : la figure apparaît
 * (anamorphose). Puis elle s'éloigne, et la figure tient, parce que les points ont
 * réellement rejoint leur place. Trouver un motif, puis vérifier qu'il tient.
 */
export function Signal() {
  const ref = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)

  useChapter(3, ref, ({ at, reveal, show, hide, q }) => {
    show(q('[data-tag]'), at(0.0), 0.04)
    show(q('[data-badge]'), at(0.02), 0.05, 0)
    const lines = q('[data-line]')
    const windows: [number, number][] = [
      [0.02, 0.27],
      [0.37, 0.58],
      [0.65, 0.83],
    ]
    lines.forEach((el, i) => {
      const [a, b] = windows[i]
      reveal(el.querySelectorAll('.w'), at(a), at(a + 0.08) - at(a))
      hide(el, at(b), at(b + 0.04) - at(b), -20)
    })
    show(q('[data-graph]'), at(0.76), 0.05, 0)
    show(q('[data-principle]'), at(0.84), 0.06, 18)
    hide(q('[data-fade]'), at(0.965), 0.03, -24)
  })

  return (
    <section id={C.id} ref={ref} className="chapter" style={{ height: `calc(var(--u) * ${C.len})` }} aria-labelledby="t-signal">
      <div ref={stage} className="pin text-chalk">
        <div data-fade className="absolute left-[var(--gutter)] top-[calc(var(--gutter)+2.8rem)]">
          <div data-tag>
            <ChapterTag index={C.index} title={C.title} />
          </div>
          <h2 id="t-signal" className="sr-only">
            {signalText.title}
          </h2>
        </div>

        <p
          data-fade
          data-badge
          className="t-mono absolute left-[var(--gutter)] top-[calc(var(--gutter)+4.6rem)] flex items-center gap-2 md:left-auto md:right-[calc(var(--gutter)+5.5rem)] md:top-[calc(var(--gutter)+2.8rem)]"
        >
          <span aria-hidden className="inline-block h-[6px] w-[6px] border border-current" />
          {signalText.synthetic}
        </p>

        <div className="absolute left-[var(--gutter)] right-[var(--gutter)] top-[30%] md:right-auto md:top-[38%] md:w-[min(40rem,44vw)]">
          {[signalText.scattered, signalText.aligned, signalText.holds].map((line, i) => (
            <p key={i} data-line className="t-statement absolute left-0 top-0 text-[1.7rem] md:text-[clamp(1.9rem,3vw,3.1rem)]">
              <Words text={line} />
            </p>
          ))}
        </div>

        <div data-fade className="absolute inset-0">
          <div className="fallback-only absolute bottom-[22%] right-[calc(var(--gutter)+7.5rem)] w-[min(40rem,44vw)] text-chalk">
            <FallbackGraph />
          </div>
          <ul data-graph className="anchor-set graph-labels absolute inset-0" aria-label={signalText.synthetic}>
            {graphNodes.map((n, i) => (
              <Anchor key={n.id} as="li" anchor={`graph:${i}`} stage={stage}>
                <button
                  type="button"
                  className={`graph-label t-mono ${n.core ? 'is-core' : ''}`}
                  onPointerEnter={() => (rig.focus.graph = i)}
                  onPointerLeave={() => (rig.focus.graph = -1)}
                  onFocus={() => (rig.focus.graph = i)}
                  onBlur={() => (rig.focus.graph = -1)}
                  data-cursor="relier"
                >
                  {n.label}
                </button>
              </Anchor>
            ))}
          </ul>

          <ol className="absolute bottom-[calc(var(--gutter)+3rem)] left-[var(--gutter)] right-[var(--gutter)] grid grid-cols-2 gap-x-6 gap-y-4 md:bottom-[var(--gutter)] md:right-[calc(var(--gutter)+5.5rem)] md:grid-cols-4 md:gap-8">
            {principles.map((p, i) => (
              <li key={p.name} data-principle className="border-t border-[color:color-mix(in_oklab,var(--chalk)_30%,transparent)] pt-3">
                <p className="t-mono flex gap-2">
                  <span className="text-vermilion">{String(i + 1).padStart(2, '0')}</span>
                  {p.name}
                </p>
                <p className="t-mono-plain mt-2 hidden text-[color:var(--ash)] sm:block">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
