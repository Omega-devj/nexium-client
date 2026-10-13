// Pistes d'animation indexées sur la position globale du parcours (G, de 0 à 7).
// L'état de la scène est une fonction pure de G : à une position de scroll donnée
// correspond toujours la même image, dans un sens comme dans l'autre.

export type Vec = readonly number[]
/** [position G, valeur, arrêt] — `arrêt` force une vitesse nulle sur la clé. */
export type Key = readonly [number, Vec] | readonly [number, Vec, 'stop']

const EPS = 1e-6

export const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v)
export const smoothstep = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a))
  return t * t * (3 - 2 * t)
}
export const smootherstep = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a))
  return t * t * t * (t * (t * 6 - 15) + 10)
}
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/**
 * Spline d'Hermite à tangentes de Catmull-Rom sur des clés non uniformes.
 * Continue en position et en vitesse ; immobile sur les clés de maintien
 * (deux clés consécutives identiques) et sur les clés marquées `stop`.
 */
export class Track {
  readonly dim: number
  private t: Float64Array
  private v: Float64Array
  private m: Float64Array

  constructor(keys: readonly Key[]) {
    const sorted = [...keys].sort((a, b) => a[0] - b[0])
    const n = sorted.length
    this.dim = sorted[0][1].length
    const d = this.dim
    this.t = new Float64Array(n)
    this.v = new Float64Array(n * d)
    this.m = new Float64Array(n * d)
    sorted.forEach((k, i) => {
      this.t[i] = k[0]
      for (let c = 0; c < d; c++) this.v[i * d + c] = k[1][c]
    })
    for (let i = 0; i < n; i++) {
      const stop = sorted[i][2] === 'stop' || i === 0 || i === n - 1
      const holdPrev = i > 0 && this.dist(i, i - 1) < EPS
      const holdNext = i < n - 1 && this.dist(i, i + 1) < EPS
      if (stop || holdPrev || holdNext) continue
      const dt = this.t[i + 1] - this.t[i - 1]
      if (dt <= 0) continue
      for (let c = 0; c < d; c++) this.m[i * d + c] = (this.v[(i + 1) * d + c] - this.v[(i - 1) * d + c]) / dt
    }
  }

  private dist(a: number, b: number) {
    let s = 0
    for (let c = 0; c < this.dim; c++) s += Math.abs(this.v[a * this.dim + c] - this.v[b * this.dim + c])
    return s
  }

  /** Écrit la valeur à la position g dans `out` et le renvoie. */
  at(g: number, out: number[] = new Array(this.dim)) {
    const n = this.t.length
    const d = this.dim
    if (g <= this.t[0]) {
      for (let c = 0; c < d; c++) out[c] = this.v[c]
      return out
    }
    if (g >= this.t[n - 1]) {
      for (let c = 0; c < d; c++) out[c] = this.v[(n - 1) * d + c]
      return out
    }
    let i = 0
    while (i < n - 2 && g > this.t[i + 1]) i++
    const h = this.t[i + 1] - this.t[i]
    const u = h > 0 ? (g - this.t[i]) / h : 1
    const u2 = u * u
    const u3 = u2 * u
    const h00 = 2 * u3 - 3 * u2 + 1
    const h10 = u3 - 2 * u2 + u
    const h01 = -2 * u3 + 3 * u2
    const h11 = u3 - u2
    for (let c = 0; c < d; c++) {
      const p0 = this.v[i * d + c]
      const p1 = this.v[(i + 1) * d + c]
      out[c] = h00 * p0 + h10 * h * this.m[i * d + c] + h01 * p1 + h11 * h * this.m[(i + 1) * d + c]
    }
    return out
  }

  /** Raccourci pour les pistes à une dimension. */
  value(g: number) {
    return this.at(g, scratch)[0]
  }
}

const scratch = [0]

/**
 * Piste scalaire par paliers : la valeur passe d'une clé à la suivante avec une
 * courbe douce et s'immobilise sur chaque clé. Adaptée aux fondus et aux bascules.
 */
export class Steps {
  private keys: readonly (readonly [number, number])[]
  constructor(
    keys: readonly (readonly [number, number])[],
    private ease: 'smooth' | 'linear' = 'smooth',
  ) {
    this.keys = [...keys].sort((a, b) => a[0] - b[0])
  }
  value(g: number) {
    const k = this.keys
    if (g <= k[0][0]) return k[0][1]
    for (let i = 0; i < k.length - 1; i++) {
      if (g <= k[i + 1][0]) {
        const t = this.ease === 'linear' ? clamp((g - k[i][0]) / (k[i + 1][0] - k[i][0] || 1)) : smootherstep(k[i][0], k[i + 1][0], g)
        return lerp(k[i][1], k[i + 1][1], t)
      }
    }
    return k[k.length - 1][1]
  }
}
