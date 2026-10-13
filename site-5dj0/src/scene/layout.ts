// Géographie du monde 3D : où se trouve chaque composition.
// Le parcours avance vers -z : l'origine, puis la structure, le réseau, le champ,
// la galerie des ouvrages vers +x, le laboratoire, et le retour au nom.

import { GLYPHS, GLYPH_METRICS } from '@/lib/glyphs.generated'
import { projects } from '@/content/projects'

export type V3 = [number, number, number]

/** Échelle du logotype dans le monde : une unité de glyphe = LOGO_SCALE unités. */
export const LOGO_SCALE = 2.2
/** Épaisseur d'extrusion, en unités de glyphe. */
export const LOGO_DEPTH = 0.56

const M = GLYPH_METRICS

/** Convertit une coordonnée de glyphe en coordonnée monde (logotype centré). */
export function glyphToWorld(gx: number, gy: number): [number, number] {
  return [(gx - M.width / 2) * LOGO_SCALE, (gy - M.capHeight / 2) * LOGO_SCALE]
}

export const FLOOR_Y = (M.descender - M.capHeight / 2) * LOGO_SCALE - 0.7

const zeroDot = GLYPHS[3].dots[0]
/** Centre de la contreforme du zéro : la caméra la traverse au chapitre 01. */
export const ZERO_COUNTER: V3 = [...glyphToWorld(zeroDot.x, zeroDot.y), 0]

export const A0: V3 = [0, 0, 0] // le nom
export const A1: V3 = [1.2, 0.6, -14] // la structure
export const A2: V3 = [0, 0.4, -36] // le réseau des langages
export const A3: V3 = [2, 2.6, -72] // le champ et la figure
/** Point de vue où la figure du champ s'aligne (anamorphose). */
export const VIEWPOINT: V3 = [7.4, 3.8, -50.4]

const WORK_ORIGIN: V3 = [12, 1.1, -94]
const WORK_STEP = 22

/** Position de la figure du projet k. */
export function emblemAt(k: number): V3 {
  return [WORK_ORIGIN[0] + WORK_STEP * k, WORK_ORIGIN[1], WORK_ORIGIN[2] - (k % 2) * 3]
}

const last = emblemAt(Math.max(0, projects.length - 1))
export const A5: V3 = [last[0] + 16, -0.4, last[2] - 20] // le laboratoire
export const A6: V3 = [A5[0] + 4, 0, A5[2] - 30] // le retour

export const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]]
export const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]]
export const scale = (a: V3, s: number): V3 => [a[0] * s, a[1] * s, a[2] * s]
export const len = (a: V3) => Math.hypot(a[0], a[1], a[2])
export const norm = (a: V3): V3 => scale(a, 1 / (len(a) || 1))
export const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]

/** Repère du plan de la figure, perpendiculaire au regard depuis VIEWPOINT. */
export function figureBasis() {
  const forward = norm(sub(A3, VIEWPOINT))
  const right = norm(cross(forward, [0, 1, 0]))
  const up = cross(right, forward)
  return { forward, right, up, distance: len(sub(A3, VIEWPOINT)) }
}

/** Demi-dimensions de la figure dans son plan. */
export const FIGURE_HALF = { x: 8, y: 5.2 }
