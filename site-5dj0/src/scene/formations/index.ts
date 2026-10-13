// Construit toutes les formations de la matière, dans l'ordre du parcours.

import { F, FORMATION_COUNT } from '@/config/choreography'
import { projects } from '@/content/projects'
import { mulberry32 } from '@/lib/random'
import { A1, A2, A5, A6, emblemAt } from '../layout'
import { emblemFormation } from './emblems'
import { signalFormations } from './field'
import { latticeFormation } from './lattice'
import { nameFormation } from './name'
import { writeSurface } from './surface'
import { systemsFormation, type SystemsAnchors } from './systems'

export type World = {
  count: number
  formations: Float32Array[]
  /** Rôle de chaque point : (langage a, langage b, nœud a, nœud b). */
  groups: Float32Array
  /** Graines par point : délai, variations, taille. */
  seeds: Float32Array
  systems: SystemsAnchors
  graph: [number, number, number][]
}

export function buildWorld(count: number): World {
  const formations: Float32Array[] = new Array(FORMATION_COUNT)
  formations[F.name] = nameFormation(count, mulberry32(5), [0, 0, 0])
  formations[F.lattice] = latticeFormation(count, mulberry32(13), A1)
  const sys = systemsFormation(count, mulberry32(21), A2)
  formations[F.systems] = sys.data
  const sig = signalFormations(count, mulberry32(34))
  formations[F.field] = sig.field
  formations[F.graph] = sig.graph
  projects.forEach((p, k) => {
    formations[F.emblem(k)] = emblemFormation(count, mulberry32(55 + k), p.emblem, emblemAt(k))
  })
  const surface = new Float32Array(count * 4)
  writeSurface(surface, count, A5, null, 0)
  formations[F.surface] = surface
  formations[F.finale] = nameFormation(count, mulberry32(89), A6)

  const groups = new Float32Array(count * 4)
  for (let i = 0; i < count; i++) {
    groups[i * 4] = sys.groups[i * 2]
    groups[i * 4 + 1] = sys.groups[i * 2 + 1]
    groups[i * 4 + 2] = sig.groups[i * 2]
    groups[i * 4 + 3] = sig.groups[i * 2 + 1]
  }
  const rand = mulberry32(144)
  const seeds = new Float32Array(count * 4)
  for (let i = 0; i < seeds.length; i++) seeds[i] = rand()

  return { count, formations, groups, seeds, systems: sys.anchors, graph: sig.anchors }
}
