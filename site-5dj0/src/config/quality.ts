// Niveaux de qualité : la complexité de la scène suit les capacités de l'appareil.
// Le niveau est estimé au chargement, puis la résolution s'ajuste en continu
// (PerformanceMonitor) si l'appareil peine à tenir la cadence.

export type Tier = 'high' | 'mid' | 'low'

export type QualitySettings = {
  /** Nombre de points de la matière. */
  particles: number
  /** Plage de densité de pixels autorisée. */
  dpr: [number, number]
  /** Résolution de l'environnement lumineux (reflets des lettres). */
  envResolution: number
  /** Ombre de contact sous les lettres. */
  shadows: boolean
  /** Antialiasing matériel. */
  antialias: boolean
}

export const QUALITY: Record<Tier, QualitySettings> = {
  high: { particles: 15000, dpr: [1, 1.75], envResolution: 256, shadows: true, antialias: true },
  mid: { particles: 9000, dpr: [1, 1.4], envResolution: 128, shadows: true, antialias: true },
  low: { particles: 4800, dpr: [0.8, 1.1], envResolution: 64, shadows: false, antialias: false },
}

export function detectTier(): Tier {
  if (typeof window === 'undefined') return 'mid'
  const nav = navigator as Navigator & {
    deviceMemory?: number
    connection?: { saveData?: boolean; effectiveType?: string }
  }
  const memory = nav.deviceMemory ?? 4
  const cores = nav.hardwareConcurrency ?? 4
  const saveData = nav.connection?.saveData === true || /(^|-)2g$/.test(nav.connection?.effectiveType ?? '')
  const small = Math.min(window.innerWidth, window.innerHeight) < 600
  const coarse = window.matchMedia('(pointer: coarse)').matches

  if (saveData || memory <= 2 || cores <= 2) return 'low'
  if (small || coarse || memory <= 4 || cores <= 4) return 'mid'
  return 'high'
}
