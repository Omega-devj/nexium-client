// Figures des ouvrages : chaque projet reçoit une forme construite par la matière.
// Une même grammaire (points d'encre, un seul accent vermillon), des structures
// différentes. La forme se choisit dans src/content/projects.ts.

import type { EmblemForm } from '@/content/projects'
import { gauss, onSphere, type Rand } from '@/lib/random'
import { add, type V3 } from '../layout'
import { ACCENT, Writer, rotate, split } from './common'

type Builder = (w: Writer, n: number, rand: Rand, at: (p: V3, size: number) => void) => void

// Une coque ouverte autour d'un noyau : ce qui protège, et ce qui est protégé.
const shell: Builder = (_w, n, rand, at) => {
  const [nShell, nOrbit, nCore] = split(n, [0.7, 0.12, 0.18])
  const aperture: V3 = [0.36, 0.22, 0.9]
  let i = 0
  while (i < nShell) {
    const d = onSphere(rand)
    if (d[0] * aperture[0] + d[1] * aperture[1] + d[2] * aperture[2] > 0.74) continue
    const r = 2.75 + gauss(rand) * 0.03
    at([d[0] * r, d[1] * r, d[2] * r], 0.62)
    i++
  }
  for (let k = 0; k < nOrbit; k++) {
    const a = rand() * Math.PI * 2
    at(rotate([Math.cos(a) * 1.95, gauss(rand) * 0.02, Math.sin(a) * 1.95], [0.5, 0, 0.25]), 0.55)
  }
  for (let k = 0; k < nCore; k++) {
    const d = onSphere(rand)
    const r = Math.cbrt(rand()) * 0.78
    at([d[0] * r, d[1] * r, d[2] * r], ACCENT + 0.85)
  }
}

// Un hyperboloïde réglé : des droites qui passent toutes par un même col.
const hyperboloid: Builder = (_w, n, rand, at) => {
  const [nLines, nWaist] = split(n, [0.86, 0.14])
  const lines = 40
  const h = 3.1
  const top = 2.7
  const twist = 1.15
  for (let k = 0; k < nLines; k++) {
    const family = k % 2 === 0 ? 1 : -1
    const a = ((Math.floor(k / 2) % lines) / lines) * Math.PI * 2
    const t = rand()
    const a0 = a - twist * family
    const a1 = a + twist * family
    const p0: V3 = [Math.cos(a0) * top, -h, Math.sin(a0) * top]
    const p1: V3 = [Math.cos(a1) * top, h, Math.sin(a1) * top]
    at([p0[0] + (p1[0] - p0[0]) * t, p0[1] + (p1[1] - p0[1]) * t, p0[2] + (p1[2] - p0[2]) * t], 0.55)
  }
  const waist = top * Math.cos(twist)
  for (let k = 0; k < nWaist; k++) {
    const a = rand() * Math.PI * 2
    at([Math.cos(a) * waist, gauss(rand) * 0.04, Math.sin(a) * waist], ACCENT + 0.85)
  }
}

// Un nœud torique : une boucle fermée qui ne se défait pas.
const knot: Builder = (_w, n, rand, at) => {
  const p = 2
  const q = 3
  const curve = (t: number): V3 => {
    const a = t * Math.PI * 2
    const r = 1.8 + 0.72 * Math.cos(q * a)
    return [r * Math.cos(p * a), 0.72 * Math.sin(q * a) * 1.4, r * Math.sin(p * a)]
  }
  for (let k = 0; k < n; k++) {
    const t = rand()
    const c = curve(t)
    const tube = 0.3 * Math.sqrt(rand())
    const d = onSphere(rand)
    const accent = t < 0.045
    at([c[0] + d[0] * tube, c[1] + d[1] * tube, c[2] + d[2] * tube], accent ? ACCENT + 0.9 : 0.6)
  }
}

// Des tranches empilées : un objet lu couche par couche, une couche à la fois.
const core: Builder = (_w, n, rand, at) => {
  const slices = 13
  const half = 2.1
  const reading = 8
  for (let k = 0; k < n; k++) {
    const s = k % slices
    const y = (s / (slices - 1)) * 2 * half - half
    const edge = rand() < 0.55
    let x: number
    let z: number
    if (edge) {
      const t = rand() * 2 - 1
      const side = Math.floor(rand() * 4)
      ;[x, z] = side === 0 ? [t, -1] : side === 1 ? [t, 1] : side === 2 ? [-1, t] : [1, t]
    } else {
      x = (rand() * 2 - 1) * 0.6
      z = (rand() * 2 - 1) * 0.6
    }
    at(rotate([x * half, y, z * half], [0, 0.62, 0]), s === reading ? ACCENT + 0.85 : edge ? 0.6 : 0.42)
  }
}

const helix: Builder = (_w, n, rand, at) => {
  for (let k = 0; k < n; k++) {
    const t = rand()
    const strand = k % 2
    const a = t * Math.PI * 7 + strand * Math.PI
    at([Math.cos(a) * 1.6, t * 6.4 - 3.2, Math.sin(a) * 1.6], strand ? 0.6 : 0.5)
  }
}

const wave: Builder = (_w, n, rand, at) => {
  for (let k = 0; k < n; k++) {
    const u = rand() * 2 - 1
    const v = rand() * 2 - 1
    at([u * 3.6, Math.sin(u * 4.2) * 0.9 * Math.cos(v * 1.4), v * 1.6], 0.55)
  }
}

const BUILDERS: Record<EmblemForm, Builder> = { shell, hyperboloid, knot, core, helix, wave }

export function emblemFormation(count: number, rand: Rand, form: EmblemForm, center: V3) {
  const w = new Writer(count)
  const [nForm, nDust] = split(count, [0.93, 0.07])
  const at = (p: V3, size: number) => {
    const q = add(center, p)
    w.push(q[0], q[1], q[2], size)
  }
  BUILDERS[form](w, nForm, rand, at)
  for (let k = 0; k < nDust; k++) {
    at([gauss(rand) * 5, gauss(rand) * 2.6, gauss(rand) * 4 - 1], 0.34)
  }
  w.fill(center)
  return w.data
}
