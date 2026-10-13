// Étiquettes ancrées dans l'espace 3D.
// Les étiquettes sont de vrais éléments du DOM (boutons, liens), placés dans l'ordre
// de lecture du document. La scène calcule chaque image leur position à l'écran et
// n'écrit que leur `transform` : l'opacité reste à la timeline du chapitre.

export type V3 = [number, number, number]

type Entry = { el: HTMLElement; key: string; stage: HTMLElement | null }

const entries = new Set<Entry>()

/** Points d'ancrage dans le monde, renseignés par la scène. */
export const anchorPoints = new Map<string, V3>()

export function registerLabel(el: HTMLElement, key: string, stage: HTMLElement | null) {
  const entry = { el, key, stage }
  entries.add(entry)
  return () => {
    entries.delete(entry)
  }
}

export function forEachLabel(cb: (entry: Entry) => void) {
  entries.forEach(cb)
}

export function hasLabels() {
  return entries.size > 0
}
