// État d'image partagé par les composants de la scène, calculé une fois par image
// par <Driver /> avant tous les autres (priorité négative).

import { segments } from '@/config/choreography'
import { atmosphere } from '@/config/choreography'
import { smoothstep } from '@/lib/tracks'

export const frame = {
  /** Position du parcours utilisée pour la scène. */
  G: 0,
  /** Position réelle (mode réduit : G est figé sur la composition de repos). */
  raw: 0,
  /** Temps d'ambiance, figé en mouvement réduit. */
  time: 0,
  night: 0,
  reduced: false,
  /** Opacité du canevas : 1, sauf pendant les fondus du mode réduit. */
  veil: 1,
  /** Recul de la caméra sur écran étroit (1 = aucun) : le brouillard s'étire d'autant. */
  dolly: 1,
}

/** En mouvement réduit : composition de repos et fondu au passage d'une séquence. */
export function reducedPosition(g: number) {
  for (const [a, b, rest] of segments) {
    if (g >= a && g < b) {
      const w = Math.min(0.05, (b - a) * 0.25)
      const fadeIn = a === 0 ? 1 : smoothstep(a, a + w, g)
      const fadeOut = b >= 7 ? 1 : 1 - smoothstep(b - w, b, g)
      return { G: rest, veil: Math.min(fadeIn, fadeOut) }
    }
  }
  const last = segments[segments.length - 1]
  return { G: last[2], veil: 1 }
}

export function nightAt(g: number) {
  return atmosphere.night.value(g)
}
