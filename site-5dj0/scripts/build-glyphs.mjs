// Construit le logotype 5dj0 à partir de primitives géométriques
// (barres et anneaux d'un même rayon), puis en calcule l'union exacte.
// Le résultat alimente la 3D (extrusion), le favicon, l'image Open Graph
// et la marque affichée dans le DOM : une seule source pour tout le site.
//
//   node scripts/build-glyphs.mjs
//
// Unités : y vers le haut, ligne de base à 0, hauteur de capitale H.

import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import pc from 'polygon-clipping'

const W = 0.32 // graisse du trait
const R = 0.66 // rayon extérieur commun à toutes les panses
const H = 2.0 // hauteur de capitale (5, d, 0, point du j)
const X = 2 * R // hauteur d'x (panse du d, fût du j)
const GAP = 0.22 // approche entre les glyphes
const SEG = 96 // segments par cercle complet

const rad = (d) => (d * Math.PI) / 180

function rect(x0, y0, x1, y1) {
  return [[[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]]
}

function arc(cx, cy, r, a0, a1) {
  const n = Math.max(2, Math.ceil((Math.abs(a1 - a0) / 360) * SEG))
  const pts = []
  for (let i = 0; i <= n; i++) {
    const a = rad(a0 + ((a1 - a0) * i) / n)
    pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r])
  }
  return pts
}

function disk(cx, cy, r) {
  const ring = arc(cx, cy, r, 0, 360)
  ring[ring.length - 1] = ring[0]
  return [ring]
}

// Secteur d'anneau entre a0 et a1 (degrés), coupé radialement.
function annulus(cx, cy, ro, ri, a0, a1) {
  const outer = arc(cx, cy, ro, a0, a1)
  const inner = arc(cx, cy, ri, a1, a0)
  const ring = [...outer, ...inner]
  ring.push(ring[0])
  return [ring]
}

function stadium(x0, y0, w, h, r) {
  const cx = x0 + w / 2
  const top = arc(cx, y0 + h - r, r, 0, 180)
  const bottom = arc(cx, y0 + r, r, 180, 360)
  const ring = [...top, ...bottom]
  ring.push(ring[0])
  return [ring]
}

const union = (...polys) => pc.union(...polys)
const diff = (a, ...b) => pc.difference(a, ...b)

// --- 5 --------------------------------------------------------------------
function five(x) {
  const cx = x + R + 0.02
  const cy = R + 0.02
  const bowl = annulus(cx, cy, R + 0.02, R + 0.02 - W, 166, -136)
  const left = cx + Math.cos(rad(166)) * (R + 0.02)
  // Le fût descend jusqu'à l'extrémité intérieure de la panse : coupe horizontale nette.
  const foot = cy + Math.sin(rad(166)) * (R + 0.02 - W)
  const stem = rect(left, foot, left + W, H)
  const bar = rect(left, H - W, x + 2 * R + 0.06, H)
  return { shape: union(bowl, stem, bar), dots: [] }
}

// --- d --------------------------------------------------------------------
function d(x) {
  const cx = x + R
  const outer = union(disk(cx, R, R), rect(cx, 0, cx + R, R), rect(cx + R - W, R, cx + R, H))
  return { shape: diff(outer, disk(cx, R, R - W)), dots: [] }
}

// --- j --------------------------------------------------------------------
// Le crochet passe sous la panse du d : les deux lettres s'emboîtent.
function j(x) {
  const hr = 0.58
  const stem = rect(x, 0, x + W, X)
  const hook = annulus(x + W - hr, 0, hr, hr - W, 0, -158)
  return { shape: union(stem, hook), dots: [{ x: x + W / 2, y: H - W / 2, r: W / 2 }] }
}

// --- 0 --------------------------------------------------------------------
// Zéro pointé, comme dans les polices de programmation : le point est l'origine.
function zero(x) {
  const w = 2 * R
  const shape = diff(stadium(x, 0, w, H, R), stadium(x + W, W, w - 2 * W, H - 2 * W, R - W))
  return { shape, dots: [{ x: x + R, y: H / 2, r: W / 2 }] }
}

const bboxOf = (multi) => {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (const poly of multi)
    for (const ring of poly)
      for (const [px, py] of ring) {
        minX = Math.min(minX, px)
        maxX = Math.max(maxX, px)
        minY = Math.min(minY, py)
        maxY = Math.max(maxY, py)
      }
  return { minX, maxX, minY, maxY }
}

const g5 = five(0)
const b5 = bboxOf(g5.shape)
const gd = d(b5.maxX + GAP)
const bd = bboxOf(gd.shape)
const gj = j(bd.maxX + GAP)
const bj = bboxOf(gj.shape)
const g0 = zero(bj.maxX + GAP)
const b0 = bboxOf(g0.shape)

const glyphs = [
  { char: '5', ...g5 },
  { char: 'd', ...gd },
  { char: 'j', ...gj },
  { char: '0', ...g0 },
]

const all = bboxOf(glyphs.flatMap((g) => g.shape))
const width = b0.maxX - all.minX
const round = (v) => Math.round(v * 10000) / 10000

// Contours sans le point de fermeture répété, arrondis.
const clean = (ring) => ring.slice(0, -1).map(([px, py]) => [round(px - all.minX), round(py)])

const out = glyphs.map((g) => ({
  char: g.char,
  polygons: g.shape.map((poly) => poly.map(clean)),
  dots: g.dots.map((dot) => ({ x: round(dot.x - all.minX), y: round(dot.y), r: round(dot.r) })),
}))

// Chemin SVG (y vers le bas) pour le DOM, le favicon et l'image OG.
const pad = 0
const svgY = (y) => round(H - y)
const pathOf = (polys) =>
  polys
    .map((poly) => poly.map((ring) => 'M' + ring.map(([px, py]) => `${px} ${svgY(py)}`).join('L') + 'Z').join(''))
    .join('')
const svgPath = out.map((g) => pathOf(g.polygons)).join('')
const dots = out.flatMap((g) => g.dots)

const header = `// Fichier généré par scripts/build-glyphs.mjs — ne pas modifier à la main.
// Logotype 5dj0 : contours (y vers le haut, ligne de base à 0) et points.
`

const ts = `${header}
export type GlyphRing = [number, number][]
export type Glyph = { char: string; polygons: GlyphRing[][]; dots: { x: number; y: number; r: number }[] }

export const GLYPH_METRICS = ${JSON.stringify({ stroke: W, radius: R, capHeight: H, xHeight: X, width: round(width), descender: round(all.minY), pad })} as const

export const GLYPHS: Glyph[] = ${JSON.stringify(out)}

/** Contours en coordonnées SVG (y vers le bas), viewBox "0 0 width capHeight - descender". */
export const LOGO_PATH = ${JSON.stringify(svgPath)}

/** Les deux points du logotype (j et 0), en coordonnées SVG. */
export const LOGO_DOTS = ${JSON.stringify(dots.map((dt) => ({ cx: dt.x, cy: svgY(dt.y), r: dt.r })))}

export const LOGO_VIEWBOX = ${JSON.stringify(`0 0 ${round(width)} ${round(H - all.minY)}`)}
`

const here = dirname(fileURLToPath(import.meta.url))
writeFileSync(join(here, '..', 'src', 'lib', 'glyphs.generated.ts'), ts)

// Aperçu autonome pour vérifier le dessin.
const preview = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.3 -0.3 ${round(width + 0.6)} ${round(H - all.minY + 0.6)}" width="1200"><rect x="-1" y="-1" width="99" height="99" fill="#ECE8E1"/><path d="${svgPath}" fill="#121110" fill-rule="evenodd"/>${dots.map((dt) => `<circle cx="${dt.x}" cy="${svgY(dt.y)}" r="${dt.r}" fill="#FF4D1F"/>`).join('')}<line x1="-1" x2="99" y1="${H}" y2="${H}" stroke="#f00" stroke-width="0.005"/><line x1="-1" x2="99" y1="${H - X}" y2="${H - X}" stroke="#f00" stroke-width="0.005"/></svg>`
writeFileSync(join(here, 'glyph-preview.svg'), preview)

// Favicon : le zéro pointé seul, l'origine du nom.
{
  const zeroGlyph = out[3]
  const xs = zeroGlyph.polygons.flatMap((poly) => poly.flatMap((ring) => ring.map(([px]) => px)))
  const minZ = Math.min(...xs)
  const maxZ = Math.max(...xs)
  const k = 44 / H
  const ox = (64 - (maxZ - minZ) * k) / 2 - minZ * k
  const oy = 10
  const iconPath = zeroGlyph.polygons
    .map((poly) => poly.map((ring) => 'M' + ring.map(([px, py]) => `${round(px * k + ox)} ${round((H - py) * k + oy)}`).join('L') + 'Z').join(''))
    .join('')
  const dot = zeroGlyph.dots[0]
  const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#ECE8E1"/><path d="${iconPath}" fill="#141312" fill-rule="evenodd"/><circle cx="${round(dot.x * k + ox)}" cy="${round((H - dot.y) * k + oy)}" r="${round(dot.r * k * 1.15)}" fill="#FF4D1F"/></svg>\n`
  writeFileSync(join(here, '..', 'src', 'app', 'icon.svg'), icon)
  writeFileSync(join(here, '..', 'src', 'lib', 'icon.generated.ts'), `${header}\nexport const ICON_SVG = ${JSON.stringify(icon.trim())}\n`)
}

console.log('glyphes :', out.map((g) => `${g.char} (${g.polygons.length} poly)`).join(', '), '— largeur', round(width))
