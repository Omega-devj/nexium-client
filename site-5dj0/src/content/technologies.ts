// Chapitre 02 — Systèmes.
// Sept langages répartis en trois familles, chacune avec sa figure dans l'espace :
// la surface (un plan), le moteur (un volume), le liant (une hélice).
// Les textes décrivent le rôle du langage, jamais un niveau de maîtrise.

export type FamilyId = 'surface' | 'moteur' | 'liant'

export type Family = {
  id: FamilyId
  name: string
  figure: string
  text: string
}

export type Technology = {
  id: string
  name: string
  family: FamilyId
  role: string
}

export type Relation = {
  from: string
  to: string
  /** Ce qui relie réellement les deux langages. */
  reason: string
}

export const families: Family[] = [
  {
    id: 'surface',
    name: 'La surface',
    figure: 'plan',
    text: 'Ce qui se voit et se touche : structure, forme, comportement.',
  },
  {
    id: 'moteur',
    name: 'Le moteur',
    figure: 'volume',
    text: 'Ce qui doit être compilé, typé, au plus près de la machine.',
  },
  {
    id: 'liant',
    name: 'Le liant',
    figure: 'hélice',
    text: 'Ce qui relie, automatise, et se glisse à l’intérieur d’autres programmes.',
  },
]

export const technologies: Technology[] = [
  { id: 'html', name: 'HTML', family: 'surface', role: 'La structure : ce qu’un document déclare être.' },
  { id: 'css', name: 'CSS', family: 'surface', role: 'La forme : comment la structure se présente, se mesure et s’adapte.' },
  { id: 'js', name: 'JavaScript', family: 'surface', role: 'Le comportement du web, et le langage du client Nexium. Il touche aussi au liant.' },
  { id: 'cpp', name: 'C++', family: 'moteur', role: 'Compilé, explicite sur la mémoire : pour ce qui ne doit rien coûter de trop.' },
  { id: 'csharp', name: 'C#', family: 'moteur', role: 'Typé et outillé, sur .NET : pour les applications et les outils qui durent.' },
  { id: 'python', name: 'Python', family: 'liant', role: 'Analyser, automatiser, prototyper vite et lisiblement.' },
  { id: 'lua', name: 'Lua', family: 'liant', role: 'Minuscule et embarquable : le script qu’un programme hôte accueille.' },
]

export const relations: Relation[] = [
  { from: 'html', to: 'css', reason: 'structure et présentation' },
  { from: 'html', to: 'js', reason: 'le DOM' },
  { from: 'css', to: 'js', reason: 'styles pilotés par le script' },
  { from: 'js', to: 'python', reason: 'langages dynamiques d’outillage' },
  { from: 'js', to: 'lua', reason: 'deux langages de script embarqués' },
  { from: 'lua', to: 'cpp', reason: 'Lua s’intègre à un hôte C/C++' },
  { from: 'python', to: 'cpp', reason: 'extensions natives' },
  { from: 'cpp', to: 'csharp', reason: 'interopérabilité native' },
]

export const systemsText = {
  title: 'Systèmes',
  lead: 'Sept langages, trois manières de tenir.',
  hint: 'Survolez ou parcourez au clavier un langage pour voir ce qui le relie aux autres.',
} as const
