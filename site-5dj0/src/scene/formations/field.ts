// Formations « champ » et « figure » du chapitre Signal.
//
// Le champ est une anamorphose : chaque point est posé, à une profondeur au hasard,
// sur le rayon qui part du point de vue VIEWPOINT et traverse un point de la figure.
// Vu de n'importe où, c'est un nuage ; vu de VIEWPOINT, la figure apparaît.
//
// La figure garde chaque point sur son rayon mais le ramène près du plan : depuis
// VIEWPOINT, rien ne bouge ; vue d'ailleurs, la figure tient. C'est la différence
// entre un motif aperçu sous un seul angle et un lien vérifié.

import { graphEdges, graphNodes } from '@/content/signal'
import { gauss, type Rand } from '@/lib/random'
import { A3, FIGURE_HALF, FLOOR_Y, VIEWPOINT, add, figureBasis, len, scale, sub, type V3 } from '../layout'
import { ACCENT, Writer, split } from './common'

/** Écart relatif de profondeur d'un nœud quand la figure devient un volume. */
const DEPTH_SPAN = 0.24

export function signalFormations(count: number, rand: Rand) {
  const field = new Writer(count)
  const graph = new Writer(count)
  const groups = new Float32Array(count * 2).fill(-1)
  const { right, up } = figureBasis()

  const onPlane = (x: number, y: number): V3 => add(add(A3, scale(right, x * FIGURE_HALF.x)), scale(up, y * FIGURE_HALF.y))
  const nodeIndex = (id: string) => graphNodes.findIndex((n) => n.id === id)

  const put = (planePoint: V3, depth: number, jitter: number, size: number, ga: number, gb: number) => {
    const toPoint = sub(planePoint, VIEWPOINT)
    const d0 = len(toPoint)
    const dir = scale(toPoint, 1 / d0)
    // Profondeur dans le champ : loin devant ou loin derrière le plan, sans passer sous le sol.
    let dMax = d0 * 2.1
    if (dir[1] < 0) dMax = Math.min(dMax, (FLOOR_Y + 0.5 - VIEWPOINT[1]) / dir[1])
    const dMin = Math.min(d0 * 0.32, dMax * 0.8)
    const df = dMin + (dMax - dMin) * Math.pow(rand(), 0.9)
    const dg = d0 * (1 + depth * DEPTH_SPAN) + gauss(rand) * jitter
    const i = field.written
    const pf = add(VIEWPOINT, scale(dir, df))
    const pg = add(VIEWPOINT, scale(dir, dg))
    field.push(pf[0], pf[1], pf[2], size)
    graph.push(pg[0], pg[1], pg[2], size)
    groups[i * 2] = ga
    groups[i * 2 + 1] = gb
  }

  const [nNodes, nEdges, nNoise] = split(count, [0.4, 0.45, 0.15])

  // Nœuds : le nœud central compte double et porte l'accent.
  const weights = graphNodes.map((n) => (n.core ? 2 : 1))
  const wsum = weights.reduce((a, b) => a + b, 0)
  let k = 0
  let bound = (weights[0] / wsum) * nNodes
  for (let i = 0; i < nNodes; i++) {
    while (i >= bound && k < graphNodes.length - 1) {
      k++
      bound += (weights[k] / wsum) * nNodes
    }
    const node = graphNodes[k]
    const s = node.core ? 0.05 : 0.04
    const p = onPlane(node.x + gauss(rand) * s, node.y + gauss(rand) * s * 1.4)
    put(p, node.depth, 0.18, node.core ? ACCENT + 1.0 : 0.95, k, k)
  }

  // Arêtes : réparties selon leur longueur dans la figure.
  const lengths = graphEdges.map(([a, b]) => {
    const na = graphNodes[nodeIndex(a)]
    const nb = graphNodes[nodeIndex(b)]
    return Math.hypot((na.x - nb.x) * FIGURE_HALF.x, (na.y - nb.y) * FIGURE_HALF.y)
  })
  const total = lengths.reduce((a, b) => a + b, 0)
  let e = 0
  let acc = (lengths[0] / total) * nEdges
  for (let i = 0; i < nEdges; i++) {
    while (i >= acc && e < graphEdges.length - 1) {
      e++
      acc += (lengths[e] / total) * nEdges
    }
    const ia = nodeIndex(graphEdges[e][0])
    const ib = nodeIndex(graphEdges[e][1])
    const a = graphNodes[ia]
    const b = graphNodes[ib]
    const t = 0.08 + rand() * 0.84
    const j = 0.006
    const p = onPlane(a.x + (b.x - a.x) * t + gauss(rand) * j, a.y + (b.y - a.y) * t + gauss(rand) * j * 1.5)
    put(p, a.depth + (b.depth - a.depth) * t, 0.04, 0.55, ia, ib)
  }

  // Bruit : des points qui ne s'alignent jamais. Toute donnée réelle en contient.
  for (let i = 0; i < nNoise; i++) {
    const p: V3 = [A3[0] + (rand() - 0.5) * 44, FLOOR_Y + 0.6 + rand() * 15, A3[2] + (rand() - 0.5) * 40]
    const i0 = field.written
    field.push(p[0], p[1], p[2], 0.5)
    const q = add(A3, [gauss(rand) * 7, gauss(rand) * 3.5, gauss(rand) * 5])
    graph.push(q[0], q[1], q[2], 0.32)
    groups[i0 * 2] = -1
  }
  field.fill(A3)
  graph.fill(A3)

  const anchors = graphNodes.map((n) => {
    const p = onPlane(n.x, n.y)
    const dir = scale(sub(p, VIEWPOINT), 1 / len(sub(p, VIEWPOINT)))
    return add(VIEWPOINT, scale(dir, len(sub(p, VIEWPOINT)) * (1 + n.depth * DEPTH_SPAN)))
  })
  return { field: field.data, graph: graph.data, groups, anchors }
}
