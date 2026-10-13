// État partagé entre le scroll, la scène 3D et l'interface.
// Un simple objet muté en place : aucune donnée ne passe par l'état React,
// rien ne provoque de rendu à 60 images par seconde.
//
// Règle unique : chaque propriété n'a qu'un seul propriétaire.
//   - chapters[i].v  → la timeline GSAP du chapitre i (scroll scrubbé)
//   - pointer        → l'écouteur de pointeur
//   - focus          → les étiquettes interactives du DOM
//   - lab            → le panneau du laboratoire
//   - camera         → la scène (lecture seule pour le DOM)

import { CHAPTER_COUNT } from '@/config/chapters'

export type MotionMode = 'full' | 'reduced'

export const rig = {
  chapters: Array.from({ length: CHAPTER_COUNT }, () => ({ v: 0 })),
  pointer: { x: 0, y: 0, active: false },
  focus: {
    /** Index du langage survolé dans le chapitre Systèmes, -1 sinon. */
    tech: -1,
    /** Index du nœud survolé dans la figure du chapitre Signal, -1 sinon. */
    graph: -1,
    /** Index du lien survolé à la fin du parcours, -1 sinon. */
    link: -1,
    /** Horodatage (secondes, performance.now) du dernier survol de lien : onde dans la matière. */
    pulseAt: -10,
  },
  lab: {
    /** Fonction compilée par le laboratoire ; null tant qu'aucune n'est valide. */
    fn: null as null | ((x: number, y: number, t: number) => number),
    usesTime: false,
    version: 0,
  },
  camera: { x: 0, y: 0, z: 0, fov: 0 },
  motion: 'full' as MotionMode,
  /** Nombre de points de la matière, une fois la scène construite. */
  count: 0,
}

/** Position globale dans le parcours : somme des progressions, de 0 à CHAPTER_COUNT. */
export function timelinePosition() {
  let g = 0
  for (const c of rig.chapters) g += c.v
  return g
}

/** Survol d'un lien de la fin : une onde part de son ancrage à travers la matière. */
export function pulseLink(i: number) {
  rig.focus.link = i
  rig.focus.pulseAt = performance.now() / 1000
}
