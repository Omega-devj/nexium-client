// Géométrie 3D du logotype, extrudée depuis les contours générés.
// Les lettres et leurs deux points sont des maillages séparés : les points
// portent l'accent vermillon.

import * as THREE from 'three'
import { mergeGeometries, toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
import { GLYPHS } from '@/lib/glyphs.generated'
import { LOGO_DEPTH, LOGO_SCALE, glyphToWorld } from './layout'

let cache: { letters: THREE.BufferGeometry; dots: THREE.BufferGeometry } | null = null

const BEVEL = 0.035

function ringToPoints(ring: [number, number][]) {
  return ring.map(([x, y]) => new THREE.Vector2(...glyphToWorld(x, y)))
}

/** Géométries partagées (construites une fois, réutilisées par toutes les scènes). */
export function logotypeGeometry() {
  if (cache) return cache
  const depth = LOGO_DEPTH * LOGO_SCALE
  const parts: THREE.BufferGeometry[] = []
  for (const glyph of GLYPHS) {
    const shapes = glyph.polygons.map((poly) => {
      const shape = new THREE.Shape(ringToPoints(poly[0]))
      shape.holes = poly.slice(1).map((ring) => new THREE.Path(ringToPoints(ring)))
      return shape
    })
    const g = new THREE.ExtrudeGeometry(shapes, {
      depth: depth - BEVEL * 2,
      bevelEnabled: true,
      bevelThickness: BEVEL,
      bevelSize: BEVEL * 0.8,
      bevelSegments: 4,
      curveSegments: 1,
    })
    g.translate(0, 0, -depth / 2 + BEVEL)
    parts.push(g.index ? g.toNonIndexed() : g)
  }
  const merged = mergeGeometries(parts, false)!
  // Normales lissées sur les courbes, arêtes vives au-delà de 28° : les biseaux
  // accrochent la lumière sans que les arcs paraissent facettés.
  const letters = toCreasedNormals(merged, THREE.MathUtils.degToRad(28))
  letters.computeBoundingSphere()
  parts.forEach((p) => p.dispose())
  merged.dispose()

  const dotParts = GLYPHS.flatMap((g) => g.dots).map((d) => {
    const s = new THREE.SphereGeometry(d.r * LOGO_SCALE, 48, 32)
    const [x, y] = glyphToWorld(d.x, d.y)
    s.translate(x, y, 0)
    return s
  })
  const dots = mergeGeometries(dotParts, false)!
  dotParts.forEach((p) => p.dispose())

  cache = { letters, dots }
  return cache
}
