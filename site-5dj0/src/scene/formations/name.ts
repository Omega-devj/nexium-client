// Formation « nom » : la matière épouse la surface des lettres 5dj0.
// Les points posés sur les lettres sont marqués SURFACE : ils restent invisibles
// tant que la lettre est pleine, et apparaissent là où elle se dissout.

import * as THREE from 'three'
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js'
import { gauss, type Rand } from '@/lib/random'
import { logotypeGeometry } from '../logotype'
import type { V3 } from '../layout'
import { ACCENT, SURFACE, Writer, split } from './common'

export function nameFormation(count: number, rand: Rand, anchor: V3) {
  const { letters, dots } = logotypeGeometry()
  const w = new Writer(count)
  const [nLetters, nDots, nDust] = split(count, [0.885, 0.04, 0.075])

  const p = new THREE.Vector3()
  const nrm = new THREE.Vector3()
  const sample = (geometry: THREE.BufferGeometry, n: number, flag: number, size: number) => {
    // setRandomGenerator existe dans three mais manque aux types : échantillonnage déterministe.
    const base = new MeshSurfaceSampler(new THREE.Mesh(geometry)) as MeshSurfaceSampler & {
      setRandomGenerator(fn: () => number): MeshSurfaceSampler
    }
    const sampler = base.setRandomGenerator(rand).build()
    for (let i = 0; i < n; i++) {
      sampler.sample(p, nrm)
      p.addScaledVector(nrm, 0.018)
      w.push(p.x + anchor[0], p.y + anchor[1], p.z + anchor[2], flag + size)
    }
  }
  sample(letters, nLetters, SURFACE, 0.82)
  sample(dots, nDots, SURFACE + ACCENT, 0.9)

  // Poussière libre autour des lettres : la matière est déjà là avant le premier scroll.
  for (let i = 0; i < nDust; i++) {
    const r = 6.5 + Math.abs(gauss(rand)) * 3.2
    const a = rand() * Math.PI * 2
    const x = Math.cos(a) * r * 1.25
    const y = gauss(rand) * 2.2 + 0.3
    const z = Math.sin(a) * r * 0.55 - 1.5
    w.push(x + anchor[0], y + anchor[1], z + anchor[2], 0.42 + rand() * 0.25)
  }
  w.fill(anchor)
  return w.data
}
