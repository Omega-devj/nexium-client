// Chorégraphie de la scène : chaque piste associe une position du parcours (G)
// à une valeur. G = 0 en haut de page, G = 7 à la fin ; le chapitre i couvre [i, i+1].
// La caméra, la matière, l'anneau, la lumière et la nuit sont tous lus ici.

import { CHAPTERS, WORK_LEN, entryShare, pinned } from '@/config/chapters'
import { projects, type WorkLayout } from '@/content/projects'
import { Steps, Track, type Key } from '@/lib/tracks'
import {
  A1,
  A2,
  A3,
  A5,
  A6,
  VIEWPOINT,
  ZERO_COUNTER,
  add,
  emblemAt,
  figureBasis,
  scale,
  type V3,
} from '@/scene/layout'

const at = (i: number, s: number) => i + pinned(i, s)
const enter = (i: number, a: number) => i + entryShare(i) * a

const n = projects.length
const WORKS = CHAPTERS.findIndex((c) => c.id === 'ouvrages')

/** Fenêtre [début, fin] de G occupée par le projet k. */
export function workWindow(k: number): [number, number] {
  const pinnedLen = (CHAPTERS[WORKS].len ?? 1) - 1
  const s0 = (0.4 + WORK_LEN * k) / pinnedLen
  const s1 = (0.4 + WORK_LEN * (k + 1)) / pinnedLen
  return [at(WORKS, s0), at(WORKS, Math.min(1, s1))]
}

const inWork = (k: number, q: number) => {
  const [a, b] = workWindow(k)
  return a + (b - a) * q
}

// --- Index des formations de la matière --------------------------------------
export const F = {
  name: 0,
  lattice: 1,
  systems: 2,
  field: 3,
  graph: 4,
  emblem: (k: number) => 5 + k,
  surface: 5 + n,
  finale: 6 + n,
} as const
export const FORMATION_COUNT = 7 + n

// --- Caméra -------------------------------------------------------------------
const Z = ZERO_COUNTER
const thru = Z[1] + 0.86
const V = VIEWPOINT
const fb = figureBasis()

const camPos: Key[] = [
  [0, [0, -1.25, 17.5], 'stop'],
  [0.5, [0.9, -0.95, 15.1]],
  [1.0, [2.7, -0.25, 10.8]],
  [enter(1, 0.62), [Z[0], thru, 5.2]],
  [enter(1, 0.95), [Z[0], thru, 0.1]],
  [at(1, 0.12), [Z[0] - 0.5, thru + 0.25, -3.4]],
  [at(1, 0.45), [6.4, 2.3, -3.2]],
  [at(1, 0.96), [-2.8, 2.6, -2.6]],
  [enter(2, 0.5), [1.3, 0.9, -10.6]],
  [enter(2, 1.0), [1.1, 1.5, -18.8]],
  [at(2, 0.2), [4.4, 3.8, -19.6]],
  [at(2, 0.96), [-7.2, 2.4, -21.2]],
  [enter(3, 0.6), [-2.5, 15.5, -56]],
  [at(3, 0.03), [-1, 25, -64.5], 'stop'],
  [at(3, 0.3), [10.5, 12.8, -46.5]],
  [at(3, 0.44), V, 'stop'],
  [at(3, 0.56), V, 'stop'],
  [at(3, 0.8), [-11.5, 6.6, -55.5]],
  [at(3, 1.0), [-20.5, 10.8, -62.5]],
  [enter(4, 1.0), [-1.5, 5.2, -80.5]],
]
const camTarget: Key[] = [
  [0, [0, 0.2, 0]],
  [0.5, [0.3, 0.15, 0]],
  [1.0, [1.7, 0.2, 0]],
  [enter(1, 0.62), [Z[0], thru, 0]],
  [enter(1, 0.95), [Z[0], thru - 0.1, -6]],
  [at(1, 0.12), [Z[0] - 1.4, thru, -10.5]],
  [at(1, 0.45), A1],
  [at(1, 0.96), A1],
  [enter(2, 0.5), [0.9, 0.8, -21]],
  [enter(2, 1.0), add(A2, [0, 0.4, 0])],
  [at(2, 0.2), A2],
  [at(2, 0.96), A2],
  [enter(3, 0.6), A3],
  [at(3, 0.03), A3],
  [at(3, 1.0), A3],
  [enter(4, 1.0), add(emblemAt(0), [-3, 0, 0])],
]

// Cadrage par décentrement de l'objectif : la cible apparaît en (x, y) de l'écran,
// [x, y] pour un écran large, [x, y] pour un écran étroit.
type Shift = [number, number, number, number]
const SHIFTS: Record<WorkLayout, Shift> = {
  monument: [-0.32, 0.24, 0, 0.3],
  column: [0.36, 0.02, 0, 0.3],
  split: [-0.42, 0.02, 0, 0.32],
  margin: [0.34, 0.08, 0, 0.3],
}
const shift: Key[] = [
  [0, [0, 0, 0, 0.12]],
  [1.0, [0, 0, 0, 0.12]],
  [enter(1, 0.5), [0, 0, 0, 0]],
  [at(1, 0.3), [0, 0, 0, 0]],
  [at(1, 0.55), [0.2, 0, 0, 0.18]],
  [at(1, 0.96), [0.2, 0, 0, 0.18]],
  [enter(2, 0.8), [0, 0, 0, 0]],
  [at(2, 0.2), [0.1, -0.06, 0, 0.08]],
  [at(2, 0.96), [0.1, -0.06, 0, 0.08]],
  [enter(3, 0.6), [0, 0, 0, 0]],
  [at(3, 0.58), [0, 0, 0, 0]],
  [at(3, 0.7), [0.24, 0, 0, 0.16]],
  [at(3, 1.0), [0.2, 0.02, 0, 0.16]],
]

const fovKeys: [number, number][] = [
  [0, 34],
  [1.0, 36],
  [enter(1, 0.9), 44],
  [at(1, 0.2), 40],
  [at(1, 0.96), 38],
  [at(2, 0.2), 36],
  [at(3, 0.03), 42],
  [at(3, 0.44), 36],
  [at(3, 0.56), 36],
  [at(3, 1.0), 38],
]
// Cadrage sur écran étroit : largeur de champ minimale à garantir (degrés), et part
// obtenue en reculant la caméra plutôt qu'en ouvrant l'angle. Pendant la traversée du
// zéro et au point de vue de l'anamorphose, la caméra ne doit pas bouger : seul
// l'angle s'ouvre.
const hfovKeys: [number, number][] = [
  [0, 40],
  [1.0, 40],
  [enter(1, 0.4), 0],
  [at(1, 0.2), 0],
  [at(1, 0.45), 44],
  [at(2, 0.2), 52],
  [at(2, 0.96), 52],
  [at(3, 0.03), 48],
  [at(3, 0.3), 46],
  [at(3, 0.42), 42],
  [at(3, 0.58), 42],
  [at(3, 0.8), 46],
  [enter(4, 1.0), 40],
]
const dollyKeys: [number, number][] = [
  [0, 1],
  [1.0, 1],
  [enter(1, 0.4), 0],
  [at(1, 0.2), 0],
  [at(1, 0.45), 1],
  [at(3, 0.3), 1],
  [at(3, 0.42), 0],
  [at(3, 0.58), 0],
  [at(3, 0.72), 1],
]
const rollKeys: Key[] = [
  [0, [0]],
  [enter(1, 0.4), [0]],
  [enter(1, 0.95), [-0.06]],
  [at(1, 0.4), [0.03]],
  [at(1, 0.9), [0]],
]

projects.forEach((p, k) => {
  const E = emblemAt(k)
  // Pendant le projet, la caméra tourne lentement autour de la figure, qui reste en place à l'écran.
  const side = k % 2 === 0 ? 1 : -1
  const orbit = (a: number, r: number, h: number): V3 => add(E, [Math.sin(a * side) * r, h, Math.cos(a * side) * r])
  camPos.push([inWork(k, 0.24), orbit(-0.2, 13.4, 1.0)])
  camPos.push([inWork(k, 0.9), orbit(0.16, 12.9, 0.5)])
  camTarget.push([inWork(k, 0.24), E])
  camTarget.push([inWork(k, 0.9), E])
  shift.push([inWork(k, 0.2), SHIFTS[p.layout]])
  shift.push([inWork(k, 0.92), SHIFTS[p.layout]])
  fovKeys.push([inWork(k, 0.24), 34])
})

camPos.push([5.14, add(A5, [-3.4, 11.2, 20.5])], [5.92, add(A5, [4.2, 9.8, 19.8])])
camTarget.push([5.14, add(A5, [0, -0.6, 0])], [5.92, add(A5, [0, -0.6, 0])])
shift.push([5.1, [0.27, 0.02, 0, 0.3]], [5.92, [0.27, 0.02, 0, 0.3]])
fovKeys.push([5.14, 36], [5.92, 36])

camPos.push(
  [enter(6, 1.0), add(A6, [-3, 4.8, 31])],
  [at(6, 0.62), add(A6, [-0.6, 2.9, 26.6]), 'stop'],
  [at(6, 1.0), add(A6, [0, 2.6, 26])],
)
camTarget.push([enter(6, 1.0), add(A6, [0, 0.4, 0])], [at(6, 1.0), add(A6, [0, 0.3, 0])])
shift.push([enter(6, 0.6), [0, 0, 0, 0.18]], [at(6, 1.0), [0, -0.04, 0, 0.26]])
fovKeys.push([enter(6, 1.0), 36], [at(6, 1.0), 34])

export const camera = {
  position: new Track(camPos),
  target: new Track(camTarget),
  shift: new Track(shift),
  fov: new Steps(fovKeys),
  hfov: new Steps(hfovKeys),
  dolly: new Steps(dollyKeys),
  roll: new Track(rollKeys),
}

// --- Matière --------------------------------------------------------------------
const formationKeys: [number, number][] = [
  [0, F.name],
  [1.02, F.name],
  [1.76, F.lattice],
  [enter(2, 0.12), F.lattice],
  [enter(2, 0.95), F.systems],
  [enter(3, 0.12), F.systems],
  [enter(3, 0.98), F.field],
  [at(3, 0.58), F.field],
  [at(3, 0.76), F.graph],
  [enter(4, 0.3), F.graph],
  [inWork(0, 0.22), F.emblem(0)],
]
for (let k = 1; k < n; k++) {
  formationKeys.push([inWork(k, 0.0), F.emblem(k - 1)], [inWork(k, 0.22), F.emblem(k)])
}
formationKeys.push([5.0, F.emblem(n - 1)], [5.14, F.surface], [6.02, F.surface], [enter(6, 0.98), F.finale])

/** Paramètres de chaque transition, indexés par la formation de départ. */
export type Transition = { flight: number; lift: number; spread: number; sweep: boolean }
export const transitions: Transition[] = Array.from({ length: FORMATION_COUNT }, (_, i) => {
  // Étalement fort : chaque point part quand sa portion de lettre se dissout.
  if (i === F.name) return { flight: 2.4, lift: 0.6, spread: 2.0, sweep: true }
  if (i === F.lattice) return { flight: 1.6, lift: 1.4, spread: 0.55, sweep: false }
  if (i === F.systems) return { flight: 3.2, lift: 3.4, spread: 0.6, sweep: false }
  if (i === F.field) return { flight: 0.2, lift: 0, spread: 0.55, sweep: false }
  if (i === F.graph) return { flight: 2.6, lift: 1.6, spread: 0.6, sweep: false }
  if (i === F.surface) return { flight: 2.6, lift: 2.4, spread: 0.6, sweep: false }
  return { flight: 1.9, lift: 1.1, spread: 0.55, sweep: false }
})

/** Point d'ancrage de chaque formation (sert au champ de dissolution des lettres). */
export const formationAnchor = (i: number): V3 => (i === F.finale ? A6 : [0, 0, 0])

export const matter = {
  formation: new Steps(formationKeys),
  /** Dissolution des lettres de l'origine (0 = pleines, 1 = dissoutes). */
  dissolveOrigin: new Steps(
    [
      [0, 0],
      [1.02, 0],
      [1.5, 1],
    ],
    'linear',
  ),
  /** Lettres du retour : elles se reconstituent. */
  dissolveFinale: new Steps([
    [0, 1],
    [at(6, 0.12), 1],
    [at(6, 0.72), 0],
  ]),
  /** Force de répulsion du pointeur sur la matière. */
  pointer: new Steps([
    [0, 1],
    [1.0, 0.4],
    [at(1, 0.4), 0.7],
    [at(3, 0.3), 0.5],
    [at(3, 0.4), 0.05],
    [at(3, 0.6), 0.05],
    [at(3, 0.75), 0.5],
    [5.0, 0.8],
    [5.14, 0.25],
    [6.0, 0.25],
    [enter(6, 1), 1],
  ]),
  techHighlight: new Steps([
    [enter(2, 0.9), 0],
    [at(2, 0.22), 1],
    [at(2, 0.95), 1],
    [enter(3, 0.4), 0],
  ]),
  graphHighlight: new Steps([
    [at(3, 0.74), 0],
    [at(3, 0.84), 1],
    [at(3, 1.0), 1],
    [enter(4, 0.5), 0],
  ]),
}

// --- Atmosphère -----------------------------------------------------------------
export const atmosphere = {
  /** 0 = jour (calcaire), 1 = nuit (encre). */
  night: new Steps([
    [0, 0],
    [3.02, 0],
    [enter(3, 0.85), 1],
    [at(3, 1.0), 1],
    [enter(4, 0.8), 0],
  ]),
  fogNear: new Steps([
    [0, 16],
    [1.0, 10],
    [at(1, 0.3), 12],
    [at(3, 0.0), 22],
    [at(3, 1.0), 22],
    [enter(4, 1), 14],
    [enter(6, 1), 18],
  ]),
  fogFar: new Steps([
    [0, 64],
    [1.0, 48],
    [at(1, 0.3), 54],
    [at(3, 0.0), 90],
    [at(3, 1.0), 90],
    [enter(4, 1), 58],
    [enter(6, 1), 70],
  ]),
  ground: new Steps([
    [0, 1],
    [3.05, 1],
    [enter(3, 0.9), 0],
    [at(3, 1.0), 0],
    [enter(4, 0.9), 1],
  ]),
  /** Amplitude de la parallaxe du pointeur sur la caméra. */
  parallax: new Steps([
    [0, 1],
    [1.0, 0.6],
    [enter(1, 0.5), 0.1],
    [at(1, 0.15), 0.1],
    [at(1, 0.4), 0.6],
    [at(3, 0.32), 0.6],
    [at(3, 0.42), 0.06],
    [at(3, 0.58), 0.06],
    [at(3, 0.72), 0.6],
    [5.1, 0.35],
    [6.0, 0.35],
    [enter(6, 1), 1],
  ]),
}

// --- Anneau ---------------------------------------------------------------------
export const RING_RADIUS = 7.6

/** Rotation (ordre YXZ) qui oriente le plan de l'anneau face à la direction donnée. */
function facing(dir: V3): [number, number, number] {
  const [x, y, z] = dir
  return [Math.asin(Math.max(-1, Math.min(1, y))), Math.atan2(-x, -z), 0]
}

const aperture = add(V, scale(fb.forward, 6.2))
const [arx, ary] = facing(fb.forward)

const ringKeys: Key[] = [
  [0, [0, 0.4, -5, 0.05, 0, 0.16, 1]],
  [1.0, [0, 0.4, -5, 0.14, -0.26, 0.3, 1]],
  [at(1, 0.42), [...add(A1, [0, -4.2, 0]), Math.PI / 2 - 0.16, 0, 0.1, 1.05]],
  [at(1, 0.96), [...add(A1, [0, -4.2, 0]), Math.PI / 2 - 0.08, 0, -0.08, 1.1]],
  [at(2, 0.2), [...add(A2, [0, -2.6, 0]), Math.PI / 2 - 0.12, 0, 0.08, 1.45]],
  [at(2, 0.96), [...add(A2, [0, -2.6, 0]), Math.PI / 2 - 0.05, 0, -0.06, 1.5]],
  [at(3, 0.26), [...aperture, arx, ary, 0, 0.36]],
  [at(3, 0.56), [...aperture, arx, ary, 0, 0.36]],
  [at(3, 0.92), [...add(A3, [0, -5.2, 0]), Math.PI / 2 - 0.22, 0.2, 0, 1.75]],
]
projects.forEach((_, k) => {
  const E = emblemAt(k)
  const tilt = k % 2 === 0 ? 0.12 : -0.14
  ringKeys.push([inWork(k, 0.24), [...add(E, [0, 0, -3.2]), 0, 0, tilt, 0.6]])
  ringKeys.push([inWork(k, 0.9), [...add(E, [0, 0, -3.2]), 0, 0, tilt + 0.05, 0.62]])
})
ringKeys.push(
  [5.14, [...add(A5, [0, -1.6, 0]), Math.PI / 2, 0, 0, 1.02]],
  [5.92, [...add(A5, [0, -1.6, 0]), Math.PI / 2, 0, 0.2, 1.02]],
  [enter(6, 1.0), [...add(A6, [0, 0.4, -2.2]), 0.05, 0, 0.12, 1]],
  [at(6, 1.0), [...add(A6, [0, 0.4, -2.2]), 0.02, 0, 0.06, 1]],
)

export const ring = {
  transform: new Track(ringKeys),
  /** Rotation des graduations le long de l'anneau. */
  spin: new Steps([
    [0, 0],
    [7, Math.PI * 4],
  ]),
}


// --- Mouvement réduit -------------------------------------------------------------
// Quand le visiteur demande moins de mouvement, la caméra ne voyage plus : chaque
// séquence est montrée dans sa composition de repos, et l'on passe de l'une à
// l'autre par un fondu. [début, fin, repos], en G.
export const segments: [number, number, number][] = (() => {
  const list: [number, number, number][] = [
    [0, 1, 0.3],
    [1, 2, at(1, 0.8)],
    [2, 3, at(2, 0.6)],
    [3, 4, at(3, 0.9)],
    [4, workWindow(0)[0], enter(4, 1)],
  ]
  projects.forEach((_, k) => {
    const [a, b] = workWindow(k)
    list.push([a, k === n - 1 ? 5 : b, inWork(k, 0.55)])
  })
  list.push([5, 6, 5.5], [6, 7, at(6, 0.9)])
  return list
})()
