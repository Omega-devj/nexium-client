// Chapitre 04 — Ouvrages.
// Chaque projet reçoit une figure (formée par la matière du site) et une mise en page.
// Les quatre entrées ci-dessous décrivent Nexium et trois de ses modules, d'après le
// readme public du dépôt Omega-devj/nexium-client. Remplacez-les ou ajoutez les vôtres :
// le nombre de projets, la caméra et la longueur du chapitre s'adaptent seuls.

/** Figures disponibles, calculées dans src/scene/formations/emblems.ts. */
export type EmblemForm = 'shell' | 'hyperboloid' | 'knot' | 'core' | 'helix' | 'wave'

/** Compositions disponibles, définies dans src/components/chapters/Works.tsx. */
export type WorkLayout = 'monument' | 'column' | 'split' | 'margin'

export type ProjectLink = { label: string; href: string }

export type Project = {
  id: string
  title: string
  /** Nature du projet, en deux ou trois mots. */
  kind: string
  /** Une phrase qui dit ce que fait le projet. */
  summary: string
  /** Deux à quatre précisions concrètes. */
  details: string[]
  role: string
  stack: string[]
  status: string
  links: ProjectLink[]
  emblem: EmblemForm
  layout: WorkLayout
}

const repo = 'https://github.com/Omega-devj/nexium-client'

export const projects: Project[] = [
  {
    id: 'nexium',
    title: 'Nexium Client',
    kind: 'Client Discord',
    summary:
      'Discord, repris en main : un client qui protège, rend la carte graphique à l’application et dit tout ce qu’il fait.',
    details: [
      'Installé par une seule commande PowerShell, sans droits administrateur, à côté du Discord habituel.',
      'Une mise à jour n’est appliquée que si elle passe tous les contrôles — version, taille, modules attendus, somme de contrôle. Sinon, la version installée reste en place.',
      'Basé sur Equicord, publié sous licence GPL-3.0.',
    ],
    role: 'Création et développement principal, avec l’équipe Nexium',
    stack: ['JavaScript', 'Electron', 'CSS', 'PowerShell'],
    status: 'actif',
    links: [
      { label: 'Code source', href: repo },
      { label: 'Site officiel', href: 'https://nexium-client.netlify.app/' },
      { label: 'Notes de version', href: `${repo}/blob/main/CHANGELOG.md` },
    ],
    emblem: 'shell',
    layout: 'monument',
  },
  {
    id: 'protect',
    title: 'Protect',
    kind: 'Module de Nexium',
    summary:
      'Un lien piégé ne s’ouvre pas : chaque lien est analysé sur la machine, avant le clic, contre une base de domaines malveillants tenue à jour.',
    details: [
      'Voir un lien sans l’ouvrir : chaîne de redirections, formulaires, âge du domaine.',
      'Un fichier renommé est reconnu à son contenu réel, pas à son nom.',
      'Les arnaques sans lien sont détectées en français comme en anglais, sans rien envoyer nulle part.',
    ],
    role: 'Module du client Nexium',
    stack: ['JavaScript'],
    status: 'actif',
    links: [{ label: 'Présentation dans le dépôt', href: `${repo}#readme` }],
    emblem: 'hyperboloid',
    layout: 'column',
  },
  {
    id: 'repaire',
    title: 'Le Repaire',
    kind: 'Espace de groupe chiffré',
    summary:
      'Un fil, des notes, des liens et des rendez-vous partagés au-dessus de Discord, que le relais qui les transporte ne peut pas lire.',
    details: [
      'Le code d’invitation produit une clé AES-GCM qui ne quitte jamais la machine : le serveur ne stocke que du chiffré.',
      'Les messages s’effacent à l’échéance choisie — une heure, un jour, trente jours.',
      'Quand Discord tombe, une ligne de secours permet aux clients de continuer à se joindre.',
    ],
    role: 'Module du client Nexium',
    stack: ['JavaScript', 'AES-GCM'],
    status: 'actif',
    links: [],
    emblem: 'knot',
    layout: 'split',
  },
  {
    id: 'bac-a-sable',
    title: 'Bac à sable',
    kind: 'Analyse de fichiers',
    summary:
      'Un fichier lu octet par octet, sans jamais être exécuté : type réel, entropie, structure des exécutables et des archives.',
    details: [
      'Une archive-bombe est détectée avant d’être décompressée.',
      'Douze règles de détection, appliquées sur la machine.',
    ],
    role: 'Module du client Nexium',
    stack: ['JavaScript'],
    status: 'actif',
    links: [],
    emblem: 'core',
    layout: 'margin',
  },
]

export const worksText = {
  title: 'Ouvrages',
  lead: 'Des outils qui se tiennent : ce qu’ils font, comment, et avec quoi.',
} as const
