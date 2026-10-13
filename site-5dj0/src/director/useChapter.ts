'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useLayoutEffect, type RefObject } from 'react'
import { CHAPTERS, pinned } from '@/config/chapters'
import { rig } from '@/lib/rig'
import { useMotion } from './motion'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.config({ ignoreMobileResize: true })
}

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/** `?instant` dans l'adresse : scroll sans lissage, pour inspecter une position exacte. */
const instant = () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('instant')

type Targets = gsap.TweenTarget

const FOCUSABLE = 'a, button, input, select, textarea, [tabindex]'

/**
 * Propriété d'opacité à animer : un bloc qui contient des éléments interactifs est
 * aussi rendu invisible au clavier (autoAlpha) ; un texte seul garde opacity, pour
 * rester lisible par les lecteurs d'écran avant même d'être révélé.
 */
function alphaKey(targets: Targets): 'autoAlpha' | 'opacity' {
  const els = gsap.utils.toArray<Element>(targets)
  return els.some((el) => el.matches(FOCUSABLE) || el.querySelector(FOCUSABLE)) ? 'autoAlpha' : 'opacity'
}

export type ChapterTools = {
  tl: gsap.core.Timeline
  root: HTMLElement
  reduced: boolean
  /** Position dans la timeline d'une progression « épinglée » s (0 → 1). */
  at: (s: number) => number
  /** Sélection limitée au chapitre. */
  q: (selector: string) => Element[]
  /** Révèle des mots masqués (montée depuis le bas du masque). */
  reveal: (targets: Targets, start: number, duration: number, stagger?: number) => void
  /** Apparition simple, avec un léger glissement. */
  show: (targets: Targets, start: number, duration: number, y?: number) => void
  /** Disparition, avec un léger glissement vers le haut. */
  hide: (targets: Targets, start: number, duration: number, y?: number) => void
}

/**
 * Chaque chapitre possède une timeline GSAP scrubbée par le scroll de sa section.
 * Elle porte, dans une même horloge, la progression du chapitre lue par la scène 3D
 * (rig.chapters[i].v) et les animations du DOM : la 3D et le texte ne peuvent pas
 * se désynchroniser. Durée de la timeline : exactement 1.
 */
export function useChapter(index: number, ref: RefObject<HTMLElement | null>, build: (t: ChapterTools) => void) {
  const { mode } = useMotion()
  useIsoLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    const reduced = mode === 'reduced'
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: index === 0 ? 'top top' : 'top bottom',
          end: 'bottom bottom',
          scrub: reduced || instant() ? true : 0.85,
          invalidateOnRefresh: true,
        },
      })
      const progress = rig.chapters[index]
      tl.fromTo(progress, { v: 0 }, { v: 1, duration: 1 }, 0)

      const clampWindow = (start: number, duration: number) => {
        const s = Math.max(0, Math.min(1, start))
        return [s, Math.max(0.001, Math.min(duration, 1 - s))] as const
      }
      const tools: ChapterTools = {
        tl,
        root,
        reduced,
        at: (s) => (CHAPTERS[index].len ? pinned(index, s) : s),
        q: (selector) => gsap.utils.toArray<Element>(selector, root),
        reveal: (targets, start, duration, stagger = 0.012) => {
          const [s, d] = clampWindow(start, duration)
          if (reduced) {
            gsap.set(targets, { opacity: 0 })
            tl.to(targets, { opacity: 1, duration: d }, s)
            return
          }
          const els = gsap.utils.toArray<Element>(targets)
          const st = Math.min(stagger, (d * 0.6) / Math.max(1, els.length))
          // État initial posé explicitement : un fromTo en cascade ne pré-rend que sa première cible.
          gsap.set(els, { yPercent: 108, rotate: 2 })
          tl.to(els, { yPercent: 0, rotate: 0, duration: d - st * (els.length - 1), stagger: st, ease: 'power3.out' }, s)
        },
        show: (targets, start, duration, y = 24) => {
          const [s, d] = clampWindow(start, duration)
          const k = alphaKey(targets)
          tl.fromTo(targets, { [k]: 0, y: reduced ? 0 : y }, { [k]: 1, y: 0, duration: d, ease: 'power2.out' }, s)
        },
        hide: (targets, start, duration, y = -24) => {
          const [s, d] = clampWindow(start, duration)
          tl.to(targets, { [alphaKey(targets)]: 0, y: reduced ? 0 : y, duration: d, ease: 'power2.in' }, s)
        },
      }
      build(tools)
    }, root)
    return () => ctx.revert()
    // build est une fonction de construction stable par chapitre.
  }, [index, mode])
}
