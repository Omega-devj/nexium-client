// Palette : une dominante minérale (le calcaire), l'encre, et un seul accent,
// le vermillon des repères de géomètre. Ces valeurs alimentent à la fois la scène 3D
// et les variables CSS (posées sur <html> dans app/layout.tsx).

export const palette = {
  /** Dominante : calcaire clair. */
  chalk: '#ECE8E1',
  /** Calcaire ombré, pour le sol et les surfaces secondaires. */
  chalkDeep: '#DCD6CC',
  /** Encre graphite, pour le texte et la matière de jour. */
  ink: '#141312',
  /** Fond de nuit du chapitre Signal. */
  night: '#0D0D0F',
  /** Accent unique. */
  vermilion: '#FF4D1F',
  /** Neutre froid pour les détails fins. */
  slate: '#6E7376',
  /** Neutre clair pour les détails fins sur fond de nuit. */
  ash: '#8F8B84',
} as const

export const cssVariables = {
  '--chalk': palette.chalk,
  '--chalk-deep': palette.chalkDeep,
  '--ink': palette.ink,
  '--night': palette.night,
  '--vermilion': palette.vermilion,
  '--slate': palette.slate,
  '--ash': palette.ash,
} as const
