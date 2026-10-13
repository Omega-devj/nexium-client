// Identité, textes et liens du site.
// Tout ce qui est affiché vient d'ici ou des fichiers voisins de src/content :
// modifier ces valeurs suffit, aucun composant n'a besoin d'être touché.

export type ExternalLink = {
  /** Texte du lien, tel qu'affiché. */
  label: string
  /** Adresse complète. Un lien sans adresse n'est pas affiché. */
  href: string
  /** Précision courte, affichée en petit à côté du lien. */
  note?: string
}

export const site = {
  name: '5dj0',
  /** Adresse publique, lue depuis NEXT_PUBLIC_SITE_URL (voir .env.example). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  locale: 'fr_FR',
  lang: 'fr',
  title: '5dj0 — une seule matière',
  description:
    "5dj0 conçoit du logiciel, construit ses propres outils et lit l'information publique avec méthode. Une expérience interactive en sept états d'une même matière.",
  shortDescription: 'Développement, outils, analyse de l’information publique.',
} as const

/** Textes de l'ouverture et du chapitre « Matière ». */
export const identity = {
  /** Ligne de présentation de l'ouverture. */
  heroLine: 'Développement logiciel, outils et analyse de l’information publique.',
  /** Invitation discrète à faire défiler. */
  heroHint: 'Faire défiler pour réorganiser la matière',
  /** Grande phrase du chapitre 01. */
  statement:
    '5dj0 écrit du logiciel, construit ses propres outils et lit l’information publique avec méthode.',
  /** Paragraphe d'accompagnement du chapitre 01. */
  paragraph:
    'Le même geste revient partout : prendre une matière brute — des instructions, des fichiers, des traces publiques — et la réorganiser jusqu’à ce qu’elle tienne.',
  /** Trois verbes, trois facettes. */
  facets: [
    { verb: 'Écrire', text: 'des programmes lisibles, qui font ce qu’ils annoncent.' },
    { verb: 'Outiller', text: 'construire l’instrument quand il n’existe pas.' },
    { verb: 'Analyser', text: 'relier des fragments publics, puis vérifier que le lien tient.' },
  ],
  /** Fait confirmé, affiché comme repère concret. */
  anchor: 'Créateur et développeur principal de Nexium.',
} as const

/**
 * Liens de la fin du parcours, posés sur l'anneau.
 * Seuls des liens réels et vérifiés figurent ici. Ajoutez vos profils
 * (GitHub, Discord, e-mail…) en suivant le même format.
 */
export const links: ExternalLink[] = [
  { label: 'Nexium — code source', href: 'https://github.com/Omega-devj/nexium-client', note: 'GitHub' },
  { label: 'Nexium — site officiel', href: 'https://nexium-client.netlify.app/', note: 'netlify.app' },
  { label: 'État des services Nexium', href: 'https://omega-devj.github.io/status-nexium/', note: 'statut public' },
]

/** Textes de la fin du parcours. */
export const closing = {
  title: 'Retour au point zéro',
  line: 'La matière reprend sa première forme. Rien n’a été ajouté en chemin : tout a été réorganisé.',
  linksTitle: 'Liens',
  restart: 'Revenir à l’origine',
} as const

/** Colophon : informations réelles sur la fabrication du site. */
export const colophon = {
  typefaces: 'Archivo, Martian Mono',
  rendering: 'Three.js, React Three Fiber, GLSL',
  orchestration: 'GSAP ScrollTrigger, Motion',
} as const
