// Chapitre 03 — Signal : OSINT et analyse.
// La figure est entièrement synthétique : aucun cas réel, aucun résultat d'enquête.

export const signalText = {
  title: 'Signal',
  /** Vue d'en haut : les points semblent dispersés. */
  scattered: 'L’information publique est abondante, et presque toujours éparse.',
  /** La caméra atteint le point de vue où la figure apparaît. */
  aligned: 'Le travail consiste à trouver l’angle où elle prend sens.',
  /** La caméra s'éloigne : la figure tient, parce qu'elle a été vérifiée. */
  holds: 'Puis à vérifier que ce sens tient, quel que soit l’angle.',
  /** Mention obligatoire sur la figure. */
  synthetic: 'Figure de démonstration — données synthétiques',
} as const

/** Principes de méthode affichés à la fin du chapitre. */
export const principles = [
  { name: 'Sources ouvertes', text: 'Seulement ce qui est publiquement et légalement consultable.' },
  { name: 'Corroboration', text: 'Un fait isolé reste une hypothèse tant qu’une source indépendante ne le confirme pas.' },
  { name: 'Traçabilité', text: 'Chaque conclusion garde le chemin qui y mène.' },
  { name: 'Retenue', text: 'L’analyse sert à comprendre, pas à exposer des personnes.' },
] as const

export type GraphNode = {
  id: string
  label: string
  /** Position dans la figure plane, de -1 à 1. */
  x: number
  y: number
  /** Profondeur prise par le nœud quand la figure devient un volume, de -1 à 1. */
  depth: number
  /** Le nœud central (l'hypothèse) est mis en valeur. */
  core?: boolean
}

/** Types génériques de sources publiques ; aucune donnée réelle. */
export const graphNodes: GraphNode[] = [
  { id: 'h', label: 'hypothèse', x: 0.02, y: 0.02, depth: 0, core: true },
  { id: 'a', label: 'archive', x: -0.74, y: 0.52, depth: 0.7 },
  { id: 'r', label: 'registre', x: -0.86, y: -0.3, depth: -0.4 },
  { id: 'c', label: 'carte', x: -0.34, y: -0.78, depth: 0.9 },
  { id: 'p', label: 'photographie', x: 0.36, y: 0.74, depth: -0.8 },
  { id: 'u', label: 'publication', x: 0.86, y: 0.28, depth: 0.5 },
  { id: 't', label: 'horodatage', x: 0.66, y: -0.6, depth: -0.6 },
  { id: 'm', label: 'témoignage', x: -0.22, y: 0.88, depth: -0.2 },
]

export const graphEdges: [string, string][] = [
  ['h', 'a'],
  ['h', 'r'],
  ['h', 'c'],
  ['h', 'p'],
  ['h', 'u'],
  ['h', 't'],
  ['a', 'r'],
  ['a', 'm'],
  ['m', 'p'],
  ['p', 't'],
  ['u', 't'],
  ['r', 'c'],
]
