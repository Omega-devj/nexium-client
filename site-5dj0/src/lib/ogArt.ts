// Visuels générés au build (image Open Graph, icône Apple) à partir du logotype.

import { palette } from '@/config/palette'
import { GLYPH_METRICS, LOGO_DOTS, LOGO_PATH, LOGO_VIEWBOX } from '@/lib/glyphs.generated'

export const LOGO_RATIO = (GLYPH_METRICS.capHeight - GLYPH_METRICS.descender) / GLYPH_METRICS.width

/** Le logotype en image SVG encodée, utilisable dans ImageResponse. */
export function logoDataUri(ink: string = palette.ink) {
  const dots = LOGO_DOTS.map((d) => `<circle cx='${d.cx}' cy='${d.cy}' r='${d.r}' fill='${palette.vermilion}'/>`).join('')
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${LOGO_VIEWBOX}'><path d='${LOGO_PATH}' fill='${ink}' fill-rule='evenodd'/>${dots}</svg>`
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

/** Anneau gradué, comme dans la scène. */
export function ringDataUri(size: number) {
  const r = size / 2 - 4
  const c = size / 2
  const ticks = Array.from({ length: 120 }, (_, i) => {
    const a = (i / 120) * Math.PI * 2
    const len = i % 10 === 0 ? 22 : i % 5 === 0 ? 12 : 6
    const x1 = c + Math.cos(a) * (r - 4)
    const y1 = c + Math.sin(a) * (r - 4)
    const x2 = c + Math.cos(a) * (r - 4 - len)
    const y2 = c + Math.sin(a) * (r - 4 - len)
    return `<line x1='${x1.toFixed(1)}' y1='${y1.toFixed(1)}' x2='${x2.toFixed(1)}' y2='${y2.toFixed(1)}' stroke='${palette.ink}' stroke-width='${i % 10 === 0 ? 2 : 1}'/>`
  }).join('')
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${size} ${size}'><circle cx='${c}' cy='${c}' r='${r}' fill='none' stroke='${palette.vermilion}' stroke-width='3'/>${ticks}</svg>`
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}
