// Outils communs aux formations : chaque formation est un tableau de N points
// (x, y, z, w), où w encode la taille et les drapeaux (voir shaders/matter.ts).

import type { V3 } from '../layout'

export const SURFACE = 20
export const ACCENT = 10

export class Writer {
  readonly data: Float32Array
  private i = 0
  constructor(readonly count: number) {
    this.data = new Float32Array(count * 4)
  }
  get written() {
    return this.i
  }
  get remaining() {
    return this.count - this.i
  }
  push(x: number, y: number, z: number, w: number) {
    if (this.i >= this.count) return false
    const o = this.i * 4
    this.data[o] = x
    this.data[o + 1] = y
    this.data[o + 2] = z
    this.data[o + 3] = w
    this.i++
    return true
  }
  /** Complète avec des points invisibles posés près d'un point donné. */
  fill(at: V3) {
    while (this.i < this.count) this.push(at[0], at[1], at[2], 0)
  }
}

/** Répartit `total` points entre des parts proportionnelles aux poids donnés. */
export function split(total: number, weights: number[]) {
  const sum = weights.reduce((a, b) => a + b, 0)
  const out = weights.map((w) => Math.floor((w / sum) * total))
  let rest = total - out.reduce((a, b) => a + b, 0)
  for (let i = 0; rest > 0; i = (i + 1) % out.length, rest--) out[i]++
  return out
}

/** Rotation d'Euler (ordre XYZ) appliquée à un vecteur. */
export function rotate([x, y, z]: V3, [ax, ay, az]: V3): V3 {
  const cx = Math.cos(ax)
  const sx = Math.sin(ax)
  const cy = Math.cos(ay)
  const sy = Math.sin(ay)
  const cz = Math.cos(az)
  const sz = Math.sin(az)
  // X
  let y1 = y * cx - z * sx
  let z1 = y * sx + z * cx
  // Y
  const x2 = x * cy + z1 * sy
  z1 = -x * sy + z1 * cy
  // Z
  const x3 = x2 * cz - y1 * sz
  y1 = x2 * sz + y1 * cz
  return [x3, y1, z1]
}

export const quadBezier = (a: V3, c: V3, b: V3, t: number): V3 => {
  const u = 1 - t
  return [
    u * u * a[0] + 2 * u * t * c[0] + t * t * b[0],
    u * u * a[1] + 2 * u * t * c[1] + t * t * b[1],
    u * u * a[2] + 2 * u * t * c[2] + t * t * b[2],
  ]
}
