'use client'

import { motion } from 'motion/react'
import { useRef } from 'react'
import { CHAPTERS } from '@/config/chapters'
import { labText } from '@/content/lab'
import { useChapter } from '@/director/useChapter'
import { useMotion } from '@/director/motion'
import { Corroboration } from '../lab/Corroboration'
import { FormulaLab } from '../lab/FormulaLab'
import { ChapterTag } from '../Words'

const C = CHAPTERS[5]

/**
 * 05 — Laboratoire. Le seul chapitre en défilement libre : on s'y arrête, on essaie.
 * La première expérience prend la main sur la matière du site ; la seconde se lit
 * sur une feuille posée devant la scène.
 */
export function Lab() {
  const ref = useRef<HTMLElement>(null)
  const { mode } = useMotion()
  useChapter(5, ref, () => {})
  const enter = mode === 'reduced' ? { initial: { opacity: 0 }, whileInView: { opacity: 1 } } : { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 } }

  return (
    <section id={C.id} ref={ref} className="chapter text-ink" aria-labelledby="t-laboratoire">
      <div className="min-h-[calc(var(--u)*0.55)]" aria-hidden />
      <div className="relative flex min-h-[var(--u)] items-end px-[var(--gutter)] pb-[calc(var(--gutter)*1.4)] md:items-center md:pb-0">
        <motion.div {...enter} viewport={{ amount: 0.3, once: false }} transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }} className="lab-panel w-full md:w-[min(31rem,40vw)]">
          <ChapterTag index={C.index} title={C.title} />
          <h2 id="t-laboratoire" className="t-statement mt-4 text-[1.3rem] md:text-[1.6rem]">
            {labText.lead}
          </h2>
          <div className="mt-8">
            <FormulaLab />
          </div>
        </motion.div>
      </div>
      <div className="min-h-[calc(var(--u)*0.25)]" aria-hidden />
      <div className="relative px-[calc(var(--gutter)*0.5)] md:px-[var(--gutter)]">
        <motion.div {...enter} viewport={{ amount: 0.15, once: false }} transition={{ duration: 0.9, ease: [0.2, 0.7, 0.1, 1] }} className="lab-sheet">
          <Corroboration />
        </motion.div>
      </div>
      <div className="min-h-[calc(var(--u)*0.6)]" aria-hidden />
    </section>
  )
}
