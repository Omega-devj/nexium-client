'use client'

import { LayoutGroup, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { corroborationLab as lab } from '@/content/lab'
import { useMotion } from '@/director/motion'

type Mode = 'naive' | 'strict'

/** Nombre de confirmations d'une affirmation selon la règle choisie. */
function support(sourceIds: string[], enabled: Set<string>, mode: Mode) {
  const active = sourceIds.filter((s) => enabled.has(s))
  if (mode === 'naive') return { count: active.length, active }
  const families = new Set(active.map((id) => lab.sources.find((s) => s.id === id)!.family))
  return { count: families.size, active }
}

/**
 * Expérience 2 — Corroboration. Cinq sources fictives, cinq affirmations. Deux sources
 * de la même famille (un article et le billet qui le reprend) ne comptent que pour une.
 * Changer la règle de comptage, ou écarter une source, montre ce qui tient vraiment.
 */
export function Corroboration() {
  const [mode, setMode] = useState<Mode>('naive')
  const [enabled, setEnabled] = useState<Set<string>>(() => new Set(lab.sources.map((s) => s.id)))
  const { mode: motionMode } = useMotion()
  const reduced = motionMode === 'reduced'

  const results = useMemo(
    () =>
      lab.claims.map((c) => {
        const s = support(c.sources, enabled, mode)
        return { claim: c, ...s, holds: s.count >= lab.threshold }
      }),
    [enabled, mode],
  )
  const summary = useMemo(() => {
    const count = (m: Mode) => lab.claims.filter((c) => support(c.sources, enabled, m).count >= lab.threshold).length
    return { naive: count('naive'), strict: count('strict') }
  }, [enabled])

  const toggle = (id: string) =>
    setEnabled((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const familyOf = (id: string) => lab.sources.find((s) => s.id === id)!.family
  const plural = (n: number, w: string) => `${n} ${w}${n > 1 ? 's' : ''}`

  return (
    <div className="corroboration">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="t-monument text-[clamp(2.6rem,9vw,3.6rem)] md:text-[clamp(3rem,4.4vw,4.6rem)]">{lab.name}</h3>
          <p className="t-body mt-3 max-w-[52ch]">{lab.intent}</p>
        </div>
        <p className="t-mono flex items-center gap-2 md:text-right">
          <span aria-hidden className="inline-block h-[6px] w-[6px] border border-current" />
          {lab.disclaimer}
        </p>
      </div>

      <div className="mt-8 inline-flex border border-current" role="radiogroup" aria-label="Règle de comptage">
        {(['naive', 'strict'] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            role="radio"
            aria-checked={mode === m}
            onClick={() => setMode(m)}
            className={`t-mono px-4 py-2 transition-colors ${mode === m ? 'bg-ink text-chalk' : ''}`}
            data-cursor="compter"
          >
            {lab.modes[m]}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-10 md:grid-cols-[minmax(16rem,0.8fr)_1.6fr]">
        <fieldset>
          <legend className="t-mono mb-3 opacity-70">Sources — cliquer pour écarter</legend>
          <ul className="space-y-2">
            {lab.sources.map((s) => {
              const on = enabled.has(s.id)
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(s.id)}
                    className={`source-chip w-full text-left ${on ? '' : 'is-off'}`}
                    data-cursor={on ? 'écarter' : 'reprendre'}
                  >
                    <span className="t-mono w-7 shrink-0 text-vermilion">{s.id.toUpperCase()}</span>
                    <span className="t-body grow leading-tight">
                      {s.name}
                      {s.note ? <span className="t-mono-plain block opacity-60">{s.note}</span> : null}
                    </span>
                    <span className="t-mono shrink-0 opacity-60">{s.family}</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </fieldset>

        <div>
          <p className="t-mono mb-3 opacity-70">Affirmations — seuil : {lab.threshold} confirmations</p>
          <LayoutGroup>
            <ul className="space-y-3">
              {results.map(({ claim, count, active, holds }) => {
                const fams = Array.from(new Set(active.map(familyOf)))
                return (
                  <motion.li layout={!reduced} key={claim.id} className={`claim-row ${holds ? 'holds' : ''}`}>
                    <p className="t-body">{claim.text}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="flex items-center gap-1" aria-label={`Sources : ${active.join(', ') || 'aucune'}`}>
                        {claim.sources.map((id) => {
                          const on = enabled.has(id)
                          const shared = mode === 'strict' && on && active.filter((a) => familyOf(a) === familyOf(id)).length > 1
                          return (
                            <span key={id} className={`src-tag t-mono ${on ? '' : 'is-off'} ${shared ? 'is-shared' : ''}`}>
                              {id.toUpperCase()}
                            </span>
                          )
                        })}
                      </span>
                      <span className="t-mono-plain opacity-70">
                        {mode === 'naive' ? plural(count, 'source') : `${plural(count, 'famille')} indépendante${count > 1 ? 's' : ''}`}
                        {mode === 'strict' && fams.length < active.length ? ' (reprise écartée)' : ''}
                      </span>
                      <motion.span
                        key={holds ? 'y' : 'n'}
                        initial={reduced ? false : { opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="t-mono ml-auto flex items-center gap-2"
                      >
                        <span aria-hidden className={`inline-block h-[8px] w-[8px] rounded-full ${holds ? 'bg-vermilion' : 'border border-current'}`} />
                        {holds ? 'établie' : 'hypothèse'}
                      </motion.span>
                    </div>
                  </motion.li>
                )
              })}
            </ul>
          </LayoutGroup>
          <p className="t-statement mt-6 text-[1.15rem]" aria-live="polite">
            En comptant chaque source : {plural(summary.naive, 'affirmation')} établie{summary.naive > 1 ? 's' : ''}. En ne comptant
            que les sources indépendantes : {summary.strict}.
          </p>
        </div>
      </div>
    </div>
  )
}
