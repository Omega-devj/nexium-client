// Formation « structure » : les lettres dissoutes se recomposent en une charpente
// régulière, que la caméra traverse pour rejoindre le réseau.

import { gauss, type Rand } from '@/lib/random'
import type { V3 } from '../layout'
import { ACCENT, Writer, rotate, split } from './common'

export function latticeFormation(count: number, rand: Rand, center: V3) {
  const w = new Writer(count)
  const nx = 5
  const ny = 4
  const nz = 4
  const step = 2.3
  const rot: V3 = [0.12, 0.42, 0.06]
  const half: V3 = [((nx - 1) * step) / 2, ((ny - 1) * step) / 2, ((nz - 1) * step) / 2]
  const node = (i: number, j: number, k: number): V3 => [i * step - half[0], j * step - half[1], k * step - half[2]]

  const edges: [V3, V3][] = []
  const nodes: V3[] = []
  for (let i = 0; i < nx; i++)
    for (let j = 0; j < ny; j++)
      for (let k = 0; k < nz; k++) {
        nodes.push(node(i, j, k))
        if (i < nx - 1) edges.push([node(i, j, k), node(i + 1, j, k)])
        if (j < ny - 1) edges.push([node(i, j, k), node(i, j + 1, k)])
        if (k < nz - 1) edges.push([node(i, j, k), node(i, j, k + 1)])
      }

  const [nEdges, nNodes, nDust] = split(count, [0.7, 0.22, 0.08])
  const put = (p: V3, size: number) => {
    const r = rotate(p, rot)
    w.push(r[0] + center[0], r[1] + center[1], r[2] + center[2], size)
  }

  for (let i = 0; i < nEdges; i++) {
    const [a, b] = edges[i % edges.length]
    const t = rand()
    put([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t], 0.62)
  }
  // Le nœud le plus proche du centre porte l'accent : le point zéro a survécu.
  const centerNode = nodes.reduce((best, n) => (Math.hypot(...n) < Math.hypot(...best) ? n : best), nodes[0])
  for (let i = 0; i < nNodes; i++) {
    const n = i < nNodes * 0.08 ? centerNode : nodes[Math.floor(rand() * nodes.length)]
    const s = 0.11
    put([n[0] + gauss(rand) * s, n[1] + gauss(rand) * s, n[2] + gauss(rand) * s], n === centerNode ? ACCENT + 0.9 : 0.7)
  }
  for (let i = 0; i < nDust; i++) {
    put([(rand() - 0.5) * 16, (rand() - 0.5) * 11, (rand() - 0.5) * 12], 0.4)
  }
  w.fill(center)
  return w.data
}
