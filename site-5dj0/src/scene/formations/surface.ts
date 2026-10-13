// Formation « surface » du laboratoire : une grille de points dont la hauteur
// est donnée par la fonction écrite par le visiteur.

import type { V3 } from '../layout'

export const SURFACE_HALF = 6.2
export const SURFACE_HEIGHT = 2.1

export function surfaceLayout(count: number) {
  const side = Math.floor(Math.sqrt(count))
  return { side, used: side * side }
}

/** Recalcule les hauteurs de la grille ; renvoie false si rien n'a changé. */
export function writeSurface(
  data: Float32Array,
  count: number,
  center: V3,
  fn: ((x: number, y: number, t: number) => number) | null,
  t: number,
) {
  const { side, used } = surfaceLayout(count)
  for (let j = 0; j < side; j++) {
    for (let i = 0; i < side; i++) {
      const k = j * side + i
      const x = (i / (side - 1)) * 2 - 1
      const y = (j / (side - 1)) * 2 - 1
      let v = fn ? fn(x, y, t) : 0
      v = Math.max(-1.25, Math.min(1.25, v))
      const o = k * 4
      data[o] = center[0] + x * SURFACE_HALF
      data[o + 1] = center[1] + v * SURFACE_HEIGHT
      data[o + 2] = center[2] + y * SURFACE_HALF
      // Les sommets les plus hauts portent l'accent : on lit la forme comme une carte.
      data[o + 3] = v > 0.78 ? 10.75 : 0.62
    }
  }
  for (let k = used; k < count; k++) {
    const o = k * 4
    data[o] = center[0]
    data[o + 1] = center[1]
    data[o + 2] = center[2]
    data[o + 3] = 0
  }
}
