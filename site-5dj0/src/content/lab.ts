// Chapitre 05 — Laboratoire.
// Deux expériences : une fonction qui donne sa forme à la matière du site,
// et un exercice de corroboration sur un cas entièrement fictif.

export const labText = {
  title: 'Laboratoire',
  lead: 'Deux expériences, chacune avec une intention et une règle.',
} as const

export const formulaLab = {
  name: 'Forme écrite',
  intent: 'Écrire une fonction de x et de y : la matière du site la prend pour forme, point par point, en temps réel.',
  syntax: 'Variables x, y (de −1 à 1) et t (le temps). Opérations + − * / ^, fonctions sin, cos, tan, abs, sqrt, exp, log, min, max, floor, sign, atan, pow, mod.',
  presets: [
    { name: 'Onde', expr: 'sin(3*x - t) * cos(2*y) * 0.6' },
    { name: 'Ricochet', expr: 'sin(7*sqrt(x*x + y*y) - 2*t) / (1 + 4*sqrt(x*x + y*y))' },
    { name: 'Selle', expr: '(x*x - y*y) * 0.8' },
    { name: 'Pyramide', expr: '0.9 - max(abs(x), abs(y)) * 1.2' },
    { name: 'Interférence', expr: '0.35*sin(6*x + t) + 0.35*sin(6*y - 1.3*t)' },
  ],
} as const

export type CaseSource = {
  id: string
  name: string
  /** Sources d'une même famille ne comptent que pour une : l'une reprend l'autre. */
  family: string
  note?: string
}

export type CaseClaim = {
  id: string
  text: string
  sources: string[]
}

export const corroborationLab = {
  name: 'Corroboration',
  intent:
    'Une affirmation compte comme établie quand deux sources indépendantes la portent. Compter les reprises comme des confirmations donne un résultat faux : l’exercice le rend visible.',
  disclaimer: 'Cas fictif, sources et affirmations inventées pour l’exercice.',
  threshold: 2,
  sources: [
    { id: 's1', name: 'Avis officiel archivé', family: 'avis' },
    { id: 's2', name: 'Article de presse locale', family: 'presse' },
    { id: 's3', name: 'Billet de blog', family: 'presse', note: 'reprend l’article' },
    { id: 's4', name: 'Photographie publiée', family: 'photo' },
    { id: 's5', name: 'Message de forum', family: 'forum' },
  ] as CaseSource[],
  claims: [
    { id: 'c1', text: 'L’événement a eu lieu un mardi.', sources: ['s2', 's3', 's5'] },
    { id: 'c2', text: 'Les travaux ont duré six mois.', sources: ['s1', 's2'] },
    { id: 'c3', text: 'La photographie date du jour même.', sources: ['s4'] },
    { id: 'c4', text: 'L’accès a été fermé pour raison de sécurité.', sources: ['s2', 's3'] },
    { id: 'c5', text: 'Le lieu photographié correspond à l’avis.', sources: ['s1', 's4'] },
  ] as CaseClaim[],
  modes: {
    naive: 'Compter chaque source',
    strict: 'Compter les sources indépendantes',
  },
} as const
