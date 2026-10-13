// Les sept chapitres du parcours, de 00 à 06.
// `len` est la hauteur de la section en hauteurs d'écran : la première hauteur sert
// à l'entrée de la section, le reste à la séquence épinglée. Une section sans `len`
// suit la hauteur de son contenu (parcours libre, non épinglé).

import { projects } from '@/content/projects'

export type ChapterId = 'origine' | 'matiere' | 'systemes' | 'signal' | 'ouvrages' | 'laboratoire' | 'retour'

export type Chapter = {
  id: ChapterId
  index: string
  title: string
  len: number | null
}

/** Longueur de la séquence de chaque projet, en hauteurs d'écran. */
export const WORK_LEN = 1.45

export const CHAPTERS: Chapter[] = [
  { id: 'origine', index: '00', title: 'Origine', len: 2.1 },
  { id: 'matiere', index: '01', title: 'Matière', len: 3.0 },
  { id: 'systemes', index: '02', title: 'Systèmes', len: 3.4 },
  { id: 'signal', index: '03', title: 'Signal', len: 3.9 },
  { id: 'ouvrages', index: '04', title: 'Ouvrages', len: 1.4 + WORK_LEN * projects.length },
  { id: 'laboratoire', index: '05', title: 'Laboratoire', len: null },
  { id: 'retour', index: '06', title: 'Retour', len: 2.3 },
]

export const CHAPTER_COUNT = CHAPTERS.length

export const chapterIndex = (id: ChapterId) => CHAPTERS.findIndex((c) => c.id === id)

/**
 * Part de la progression d'un chapitre consacrée à son entrée (la section monte
 * jusqu'au haut de l'écran). Le premier chapitre n'a pas d'entrée.
 */
export function entryShare(i: number) {
  const c = CHAPTERS[i]
  if (i === 0 || !c.len) return 0
  return 1 / c.len
}

/** Convertit une progression « épinglée » (0 → 1) en progression du chapitre. */
export function pinned(i: number, s: number) {
  const e = entryShare(i)
  return e + (1 - e) * s
}
