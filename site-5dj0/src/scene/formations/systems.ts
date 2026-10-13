// Formation « systèmes » : trois figures pour trois familles de langages
// (un plan pour la surface, un volume pour le moteur, une hélice pour le liant),
// sept nœuds et les relations qui les unissent.

import { relations, technologies, type FamilyId } from '@/content/technologies'
import { gauss, type Rand } from '@/lib/random'
import { add, type V3 } from '../layout'
import { Writer, quadBezier, rotate, split } from './common'

export type SystemsAnchors = {
  tech: V3[]
  family: Record<FamilyId, V3>
}

const PLANE = { center: [-6.4, -0.5, 0.8] as V3, rot: [-0.55, 0.6, 0.12] as V3, half: 2.9 }
const CUBE = { center: [6.3, 0.3, -0.6] as V3, rot: [0.45, 0.62, 0.1] as V3, half: 1.95 }
const HELIX = { center: [0.2, 0, -3.2] as V3, radius: 1.3, y0: -3.2, y1: 5.0, turns: 3.25 }

const planePoint = (u: number, v: number): V3 => add(PLANE.center, rotate([u * PLANE.half, v * PLANE.half, 0], PLANE.rot))
const cubePoint = (x: number, y: number, z: number): V3 =>
  add(CUBE.center, rotate([x * CUBE.half, y * CUBE.half, z * CUBE.half], CUBE.rot))
const helixPoint = (t: number, offset = 0): V3 => {
  const a = t * HELIX.turns * Math.PI * 2
  const r = HELIX.radius + offset
  return [HELIX.center[0] + Math.cos(a) * r, HELIX.y0 + (HELIX.y1 - HELIX.y0) * t, HELIX.center[2] + Math.sin(a) * r]
}

const NODE_LOCAL: Record<string, () => V3> = {
  html: () => planePoint(-0.6, 0.55),
  css: () => planePoint(0.55, 0.62),
  js: () => planePoint(0.68, -0.6),
  cpp: () => cubePoint(1, 1, -1),
  csharp: () => cubePoint(-1, -1, 1),
  python: () => helixPoint(0.8),
  lua: () => helixPoint(0.3),
}

export function systemsFormation(count: number, rand: Rand, anchor: V3) {
  const w = new Writer(count)
  // Rôle de chaque point dans cette formation : (nœud a, nœud b), -1 si aucun.
  const groups = new Float32Array(count * 2).fill(-1)
  const tech = technologies.map((t) => add(anchor, NODE_LOCAL[t.id]()))
  const at = (p: V3, size: number, ga = -1, gb = -1) => {
    const i = w.written
    if (w.push(p[0], p[1], p[2], size)) {
      groups[i * 2] = ga
      groups[i * 2 + 1] = gb
    }
  }

  const [nPlane, nCube, nHelix, nNodes, nEdges, nDust] = split(count, [0.16, 0.17, 0.16, 0.17, 0.26, 0.08])

  // Le plan : une nappe de lignes régulières.
  const lines = 15
  for (let i = 0; i < nPlane; i++) {
    const line = i % (lines * 2)
    const t = rand() * 2 - 1
    const c = ((line % lines) / (lines - 1)) * 2 - 1
    const [u, v] = line < lines ? [t, c] : [c, t]
    at(add(anchor, planePoint(u, v)), 0.58)
  }
  // Le volume : douze arêtes et une trame intérieure plus discrète.
  const corners: V3[] = []
  for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) corners.push([x, y, z])
  const cubeEdges: [V3, V3][] = []
  for (let a = 0; a < 8; a++)
    for (let b = a + 1; b < 8; b++) {
      const d = corners[a].reduce((s, v, k) => s + Math.abs(v - corners[b][k]), 0)
      if (d === 2) cubeEdges.push([corners[a], corners[b]])
    }
  for (let i = 0; i < nCube; i++) {
    if (i < nCube * 0.72) {
      const [a, b] = cubeEdges[i % 12]
      const t = rand()
      at(add(anchor, cubePoint(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t)), 0.7)
    } else {
      const g = () => (Math.floor(rand() * 3) - 1) * 0.5
      at(add(anchor, cubePoint(g() + gauss(rand) * 0.02, g() + gauss(rand) * 0.02, (rand() * 2 - 1) * 0.9)), 0.4)
    }
  }
  // L'hélice : un ruban qui monte en tournant.
  for (let i = 0; i < nHelix; i++) {
    const t = rand()
    const p = helixPoint(t, (rand() - 0.5) * 0.18)
    at(add(anchor, [p[0], p[1] + (rand() - 0.5) * 0.42, p[2]]), 0.6)
  }
  // Les nœuds : une coque et un cœur, assez denses pour se lire comme des points.
  const per = Math.floor(nNodes / tech.length)
  for (let i = 0; i < nNodes; i++) {
    const k = Math.min(tech.length - 1, Math.floor(i / per))
    const shell = rand() < 0.55
    const r = shell ? 0.42 : Math.abs(gauss(rand)) * 0.14
    const a = rand() * Math.PI * 2
    const z = rand() * 2 - 1
    const s = Math.sqrt(1 - z * z)
    at(add(tech[k], [Math.cos(a) * s * r, z * r, Math.sin(a) * s * r]), shell ? 0.66 : 1.1, k, k)
  }
  // Les relations : des arcs tendus d'un nœud à l'autre.
  const idx = (id: string) => technologies.findIndex((t) => t.id === id)
  const lengths = relations.map((r) => Math.hypot(...tech[idx(r.from)].map((v, k) => v - tech[idx(r.to)][k])))
  const total = lengths.reduce((a, b) => a + b, 0)
  let e = 0
  let acc = 0
  for (let i = 0; i < nEdges; i++) {
    while (e < relations.length - 1 && i >= ((acc + lengths[e]) / total) * nEdges) {
      acc += lengths[e]
      e++
    }
    const r = relations[e]
    const a = tech[idx(r.from)]
    const b = tech[idx(r.to)]
    const mid: V3 = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + 1.1 + lengths[e] * 0.08, (a[2] + b[2]) / 2 - 0.8]
    const p = quadBezier(a, mid, b, 0.06 + rand() * 0.88)
    const j = 0.035
    at([p[0] + gauss(rand) * j, p[1] + gauss(rand) * j, p[2] + gauss(rand) * j], 0.5, idx(r.from), idx(r.to))
  }
  for (let i = 0; i < nDust; i++) {
    at(add(anchor, [(rand() - 0.5) * 26, (rand() - 0.5) * 12 + 0.6, (rand() - 0.5) * 14 - 1]), 0.36)
  }
  w.fill(anchor)

  const familyCenter: Record<FamilyId, V3> = {
    surface: add(anchor, add(planePoint(0.15, 1), [0, 0.35, 0])),
    moteur: add(anchor, add(CUBE.center, [0, CUBE.half * 1.7 + 0.6, 0])),
    liant: add(anchor, [HELIX.center[0] + HELIX.radius + 1.4, HELIX.y0 + (HELIX.y1 - HELIX.y0) * 0.66, HELIX.center[2]]),
  }
  const anchors: SystemsAnchors = { tech, family: familyCenter }
  return { data: w.data, groups, anchors }
}
