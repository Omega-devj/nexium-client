'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { formulaLab } from '@/content/lab'
import { useSceneState } from '@/director/useSceneState'
import { useMotion } from '@/director/motion'
import { ExprError, compile } from '@/lib/expr'
import { rig } from '@/lib/rig'

type Status = { ok: true; usesTime: boolean } | { ok: false; message: string; at: number }

function apply(expr: string): Status {
  try {
    const { fn, usesTime } = compile(expr)
    rig.lab.fn = fn
    rig.lab.usesTime = usesTime
    rig.lab.version++
    return { ok: true, usesTime }
  } catch (e) {
    if (e instanceof ExprError) return { ok: false, message: e.message, at: e.at }
    return { ok: false, message: 'expression invalide', at: 0 }
  }
}

/**
 * Rendu de secours sans WebGL : la même grille, projetée à plat sur un canevas 2D.
 */
function FlatPlot({ reduced }: { reduced: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const c = canvas.current
    const ctx = c?.getContext('2d')
    if (!c || !ctx) return
    const side = 46
    let raf = 0
    let drawnVersion = -1
    let drawnWidth = 0
    const draw = (time: number) => {
      const t = reduced ? 0 : time / 1000
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = c.clientWidth
      const h = c.clientHeight
      if (c.width !== Math.round(w * dpr)) {
        c.width = Math.round(w * dpr)
        c.height = Math.round(h * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)
      const fn = rig.lab.fn
      for (let j = 0; j < side; j++)
        for (let i = 0; i < side; i++) {
          const x = (i / (side - 1)) * 2 - 1
          const y = (j / (side - 1)) * 2 - 1
          const v = Math.max(-1.25, Math.min(1.25, fn ? fn(x, y, t) : 0))
          // Projection isométrique simple.
          const px = w / 2 + (x - y) * w * 0.3
          const py = h * 0.55 + (x + y) * h * 0.16 - v * h * 0.2
          ctx.fillStyle = v > 0.78 ? '#FF4D1F' : 'rgba(20,19,18,0.8)'
          ctx.fillRect(px, py, 1.6, 1.6)
        }
      drawnVersion = rig.lab.version
      drawnWidth = w
    }
    const loop = (time: number) => {
      raf = requestAnimationFrame(loop)
      const animate = !reduced && rig.lab.usesTime
      if (animate || drawnVersion !== rig.lab.version || drawnWidth !== c.clientWidth) draw(time)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reduced])
  return <canvas ref={canvas} className="mt-6 aspect-[4/3] w-full" aria-hidden />
}

/** Expérience 1 — Forme écrite : une fonction de x et y donne sa forme à la matière. */
export function FormulaLab() {
  const id = useId()
  const [expr, setExpr] = useState<string>(formulaLab.presets[0].expr)
  const [status, setStatus] = useState<Status>({ ok: true, usesTime: true })
  const scene = useSceneState()
  const { mode } = useMotion()

  useEffect(() => {
    const t = window.setTimeout(() => setStatus(apply(expr)), 140)
    return () => window.clearTimeout(t)
  }, [expr])

  const active = formulaLab.presets.find((p) => p.expr === expr)?.name

  return (
    <div className="formula-lab">
      <h3 className="t-monument text-[clamp(2.6rem,9vw,3.6rem)] md:text-[clamp(3rem,4.4vw,4.6rem)]">{formulaLab.name}</h3>
      <p className="t-body mt-3 max-w-[38ch]">{formulaLab.intent}</p>

      <label htmlFor={id} className="t-mono mt-6 block">
        f(x, y, t) =
      </label>
      <div className={`formula-field mt-2 ${status.ok ? '' : 'has-error'}`}>
        <input
          id={id}
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          inputMode="text"
          maxLength={240}
          aria-invalid={!status.ok}
          aria-describedby={`${id}-status ${id}-syntax`}
          className="t-mono-plain w-full bg-transparent py-3 text-[0.95rem] outline-none"
        />
      </div>
      <p id={`${id}-status`} className="t-mono-plain mt-2 min-h-[1.5em]" aria-live="polite">
        {status.ok ? (
          <span className="text-[color:var(--slate)]">
            {scene === 'fallback'
              ? 'Rendu à plat ci-dessous.'
              : `La matière suit cette fonction${rig.count ? ` : ${rig.count.toLocaleString('fr-FR')} points` : ''}${status.usesTime ? ', recalculés à chaque image' : ''}.`}
          </span>
        ) : (
          <span className="text-vermilion">
            Position {status.at + 1} : {status.message}.
          </span>
        )}
      </p>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Exemples de fonctions">
        {formulaLab.presets.map((p) => (
          <button
            key={p.name}
            type="button"
            aria-pressed={active === p.name}
            onClick={() => setExpr(p.expr)}
            className="chip t-mono"
            data-cursor="essayer"
          >
            {p.name}
          </button>
        ))}
      </div>
      <p id={`${id}-syntax`} className="t-mono-plain mt-5 max-w-[46ch] text-[color:var(--slate)]">
        {formulaLab.syntax}
      </p>
      {scene === 'fallback' ? <FlatPlot reduced={mode === 'reduced'} /> : null}
    </div>
  )
}
