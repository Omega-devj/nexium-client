# 5dj0 — une seule matière

Site de 5dj0 : une expérience web interactive où **le scroll pilote une scène 3D persistante**.

Tout le site est fait d'une seule matière — un nuage de 4 800 à 15 000 points selon l'appareil — que le défilement réorganise : le nom, une charpente, un réseau de langages, un champ de données, les figures des projets, une surface programmable, puis le nom à nouveau. Rien n'apparaît de nulle part : chaque état est une réorganisation du précédent. C'est le geste commun au développement (réorganiser des instructions) et à l'analyse de l'information publique (réorganiser des faits).

## Le parcours

| | Chapitre | Ce que fait le scroll |
|---|---|---|
| 00 | **Origine** | Le nom 5dj0 en lettres extrudées, vernies, sous une lumière qui suit le pointeur. La caméra s'approche. |
| 01 | **Matière** | La caméra traverse la contreforme du zéro pointé. Les lettres se dissolvent du 5 vers le 0 ; chaque point part quand sa portion de lettre disparaît, et la matière se recompose en charpente. |
| 02 | **Systèmes** | La caméra traverse la charpente. Trois figures pour trois familles de langages — un plan (la surface : HTML, CSS, JavaScript), un volume (le moteur : C++, C#), une hélice (le liant : Python, Lua) — reliées par leurs relations réelles. Survol ou clavier : les relations s'allument dans la matière. |
| 03 | **Signal** | Nuit. Vu d'en haut, un nuage. La caméra cherche l'angle : au point de vue exact, les points s'alignent et une figure apparaît (anamorphose). Puis la caméra s'éloigne et la figure **tient**, parce que les points ont réellement rejoint leur place : trouver un motif, puis vérifier qu'il résiste à tous les angles. Données synthétiques, signalées comme telles. |
| 04 | **Ouvrages** | Travelling latéral. Chaque projet a sa figure (coque et noyau, hyperboloïde réglé, nœud torique, tranches lues une à une) et sa mise en page (titre monumental, colonne verticale, demi-page, marge). |
| 05 | **Laboratoire** | Parcours libre. *Forme écrite* : une fonction de x, y et t donne sa forme à la matière, en temps réel. *Corroboration* : un cas fictif où compter les reprises comme des confirmations donne un résultat faux. |
| 06 | **Retour** | La matière reforme le nom, les lettres pleines se reconstituent, l'anneau porte les liens. Survoler un lien envoie une onde dans la matière. |

L'anneau gradué vermillon est le fil continu : il encadre le nom, ceint la charpente, marque le point de vue de l'anamorphose, sert d'ouverture aux projets, puis porte les liens. La règle à droite de l'écran suit la position exacte du parcours et affiche la position réelle de la caméra.

## Démarrer

Node.js 20.9 ou plus récent.

```bash
cd site-5dj0
npm install
npm run dev        # http://localhost:3000
```

Production :

```bash
npm run build
npm start
```

Site entièrement statique (GitHub Pages, Netlify sans adaptateur, tout hébergeur de fichiers) :

```bash
STATIC_EXPORT=1 npm run build   # → out/
```

Vérifications :

```bash
npm run typecheck
npm run lint
```

Copiez `.env.example` en `.env.local` et renseignez `NEXT_PUBLIC_SITE_URL` avec l'adresse publique : elle sert aux URL absolues (Open Graph, canonical, sitemap). Sans elle, les métadonnées pointent vers `http://localhost:3000`.

## Modifier le contenu

Tout le texte affiché vient de `src/content/`. Aucun composant n'a besoin d'être touché.

| Fichier | Contenu |
|---|---|
| `site.ts` | Nom, titre, description SEO, textes d'identité, **liens de la fin**, colophon |
| `projects.ts` | Les ouvrages : titre, nature, résumé, précisions, rôle, technologies, statut, liens, `emblem` (figure), `layout` (composition) |
| `technologies.ts` | Familles, langages, relations entre langages |
| `signal.ts` | Textes du chapitre Signal, principes de méthode, figure synthétique (nœuds, arêtes) |
| `lab.ts` | Textes et exemples du laboratoire, cas fictif de corroboration |

**Ajouter un projet** : ajoutez une entrée dans `projects.ts`. Figures disponibles : `shell`, `hyperboloid`, `knot`, `core`, `helix`, `wave` (`src/scene/formations/emblems.ts`). Compositions : `monument`, `column`, `split`, `margin`. La longueur du chapitre, la trajectoire de la caméra et le cadrage s'adaptent seuls au nombre de projets.

**Ajouter un lien** (GitHub, Discord, e-mail…) : ajoutez `{ label, href, note }` à `links` dans `site.ts`. Les liens descendent le long du flanc gauche de l'anneau ; sur mobile, ils forment une liste.

Le contenu fourni ne contient que des informations vérifiables : les quatre ouvrages décrivent Nexium et trois de ses modules d'après le readme public de ce dépôt (où 5dj0 figure comme créateur et développeur principal), et les liens pointent vers le dépôt, le site officiel et la page d'état de Nexium. Aucun compte personnel ni moyen de contact n'a été inventé.

## Architecture

```
src/
  content/      textes, projets, langages, données synthétiques
  config/
    chapters.ts      les sept chapitres et leur longueur
    choreography.ts  toutes les pistes de la scène, indexées sur le parcours
    palette.ts       couleurs (partagées par la 3D et le CSS)
    quality.ts       niveaux de qualité selon l'appareil
  director/     orchestration : timelines GSAP par chapitre, mouvement, pointeur
  scene/        la scène React Three Fiber
    formations/      les états de la matière (nom, charpente, réseau, champ, figures…)
    shaders/         GLSL de la matière et du champ de dissolution
  components/   l'interface : chapitres, règle, curseur, laboratoire
  lib/          pistes d'animation, état partagé, compilateur d'expressions, glyphes
scripts/
  build-glyphs.mjs   construit le logotype (et le favicon) par union de primitives
```

### Un seul propriétaire par propriété

1. Chaque chapitre a **une timeline GSAP scrubbée** par le scroll de sa section (`director/useChapter.ts`). Elle porte dans la même horloge la progression du chapitre lue par la scène (`rig.chapters[i].v`) et les animations du DOM : texte et 3D ne peuvent pas se désynchroniser.
2. La position globale `G` (de 0 à 7) est la somme des progressions. **L'état de la scène est une fonction pure de G** : caméra (splines d'Hermite sur clés non uniformes), formation de la matière, dissolution des lettres, anneau, nuit, brouillard (`config/choreography.ts`). Arrêter le scroll arrête la scène ; remonter la ramène exactement à l'état précédent.
3. Le pointeur n'ajoute qu'une couche amortie (parallaxe, lumière, répulsion de la matière) sans toucher la trajectoire.
4. Motion ne gère que les transitions d'interface (fiches, laboratoire, curseur).

Les sections épinglées utilisent `position: sticky` ; le chapitre Laboratoire est en défilement libre.

### La matière

Un seul objet `THREE.Points`. Chaque formation est un tableau de N points (position + taille + drapeaux) envoyé une fois à la carte graphique ; à chaque image, la piste « formation » choisit la paire (départ, arrivée) et le mélange entre les deux. Le shader (`scene/shaders/matter.ts`) échelonne les départs, courbe les trajectoires dans un champ de bruit, gère la répulsion du pointeur, les surbrillances, le brouillard. Le même champ de dissolution est évalué dans le shader des lettres et dans celui de la matière : un point devient visible exactement là où la lettre disparaît.

L'anamorphose du chapitre Signal (`scene/formations/field.ts`) pose chaque point sur le rayon qui part du point de vue et traverse la figure ; la figure finale garde chaque point sur son rayon, ce qui la rend identique vue du point de vue et cohérente vue d'ailleurs.

### Le logotype

`scripts/build-glyphs.mjs` dessine 5, d, j et 0 à partir de barres et d'anneaux d'un même rayon, calcule leur union exacte et écrit `src/lib/glyphs.generated.ts` (contours pour l'extrusion 3D et le SVG), `src/app/icon.svg` (favicon : le zéro pointé) et `src/lib/icon.generated.ts`. Après une modification du dessin :

```bash
node scripts/build-glyphs.mjs
```

## Performance et accessibilité

- La scène 3D est chargée après le premier affichage (import dynamique, environ 280 ko gzip), le reste du site d'abord (environ 290 ko gzip).
- Niveau de qualité estimé au chargement (mémoire, cœurs, taille d'écran, économie de données) : nombre de points, densité de pixels, résolution des reflets. La résolution baisse ensuite seule si la cadence chute (`PerformanceMonitor`).
- Ressources graphiques libérées au démontage (géométries, matériaux, toutes les formations, textures).
- **Mouvement réduit** : la préférence du système est respectée, et un réglage « Mouvement » (en haut à droite et dans le colophon) permet de la changer ; le choix est mémorisé sur l'appareil. En mode réduit, la caméra ne voyage plus : chaque séquence est montrée dans sa composition de repos, avec un fondu entre deux séquences.
- **Sans WebGL** (ou si le contexte graphique est perdu) : version statique complète — logotype SVG, fond jour/nuit, liste des langages, figure synthétique en SVG, laboratoire en rendu à plat.
- Clavier : lien d'évitement, règle des chapitres en boutons, langages et nœuds focalisables, champs et boutons du laboratoire. Les blocs interactifs invisibles sont retirés de l'ordre de tabulation ; les textes restent lisibles par les lecteurs d'écran avant d'être révélés.
- Curseur personnalisé discret, absent sur écran tactile ; le curseur du système revient dans les champs de saisie.
- Mobile : cadrage adapté (la caméra recule ou ouvre l'angle selon la séquence), compositions empilées, règle horizontale, étiquettes secondaires masquées.

## Débogage

Ajoutez `?instant` à l'adresse pour désactiver le lissage du scrub : la scène correspond alors exactement à la position de défilement, ce qui facilite l'inspection d'une position précise.

## Points connus

- React Three Fiber 9.8 crée une `THREE.Clock`, que three 0.186 signale comme dépréciée : un avertissement apparaît dans la console, il vient de la bibliothèque et n'a pas d'effet.
- En export statique, l'image Open Graph est écrite sans extension (`out/opengraph-image`). Certains hébergeurs la servent alors sans type MIME ; un déploiement avec serveur Next.js (`npm start`) n'est pas concerné.

## Licence

Ce dossier fait partie du dépôt `nexium-client` et suit sa licence (voir `../LICENSE`).
