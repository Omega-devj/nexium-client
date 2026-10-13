// Générateur pseudo-aléatoire déterministe : la matière a toujours la même forme
// d'une visite à l'autre, ce qui rend le parcours reproductible.

export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export type Rand = ReturnType<typeof mulberry32>

/** Tirage gaussien (Box-Muller). */
export function gauss(rand: Rand) {
  const u = Math.max(1e-9, rand())
  const v = rand()
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

/** Point uniforme sur la sphère unité. */
export function onSphere(rand: Rand): [number, number, number] {
  const z = rand() * 2 - 1
  const a = rand() * Math.PI * 2
  const r = Math.sqrt(1 - z * z)
  return [r * Math.cos(a), z, r * Math.sin(a)]
}
