# Plan de refonte de Nexium

Objectif : un client qui **ne casse plus** quand Discord se met à jour, qui a **sa
propre identité** au lieu de ressembler à Vencord ou Equicord, et qu'on peut faire
évoluer sans peur.

---

## 1. En bref

| Aujourd'hui | Demain |
|---|---|
| Ça casse à chaque mise à jour de Discord | Réparé en moins de 48 h, souvent avant que les utilisateurs le voient |
| On modifie à la main un fichier de 6 Mo | On modifie de petits fichiers, un outil assemble le reste |
| Ça ressemble à Equicord avec des pages Nexium en plus | Une seule identité, de l'icône jusqu'au dernier menu |
| 27 entrées dans les réglages, en français et en anglais mélangés | Une dizaine d'entrées claires, dans une seule langue à la fois |
| Une erreur sur `main` part chez tout le monde | Rien ne part sans être testé et signé |
| Windows seulement | Windows, puis macOS et Linux |

---

## 2. Pourquoi ça casse aujourd'hui

Nexium repose sur **Equicord**, qui modifie Discord pendant qu'il tourne : il cherche
des morceaux précis du code de Discord et les remplace. Quand Discord change ces
morceaux, la recherche échoue et la fonction casse.

L'équipe d'Equicord corrige ces casses en continu. Mais Nexium embarque une copie
**figée** d'Equicord (version 1.14.13.1), alors que l'actuelle est la 1.15.11.0. Nexium
ne reçoit donc aucune de leurs corrections.

Et on ne peut pas simplement remplacer la copie : des modifications Nexium ont été
faites **directement dedans**, à la main. Les reprendre une à une à chaque mise à jour
est impossible.

**La solution :** séparer proprement Equicord et Nexium, pour récupérer chaque version
d'Equicord en une commande.

---

## 3. Les étapes

### Étape 1 : ne plus prendre de risques *(1 semaine)*

Aujourd'hui, tout ce qui est poussé sur `main` arrive chez tous les utilisateurs au
lancement suivant. Une faute de frappe suffit à casser tout le monde.

- [ ] **Un canal « stable » à part.** Les clients lisent les mises à jour sur une branche
  `stable`. On travaille sur `main`, et on publie quand c'est prêt.
- [ ] **Des mises à jour signées.** Une signature numérique prouve que la mise à jour
  vient bien de toi. Même si quelqu'un volait l'accès au GitHub, il ne pourrait pas
  envoyer de code aux utilisateurs.
- [ ] **Des tests automatiques sur GitHub.** À chaque envoi, GitHub vérifie tout seul
  que rien n'est cassé. Les tests existent déjà en partie (`outils/tests/`).
- [ ] **Protéger le compte** : double authentification obligatoire.
- [ ] **Récupérer tout le serveur dans le dépôt.** Quatre fonctions Supabase sur six
  n'existent que sur le serveur, et la base de données n'est pas sauvegardée dans le
  code. Si le projet Supabase disparaît, elles disparaissent avec.

### Étape 2 : se rebrancher sur Equicord à jour *(2 à 3 semaines)* : règle les bugs

- [ ] **Faire la liste des modifications faites à la main.** On reconstruit la version
  1.14.13.1 d'Equicord telle quelle et on la compare à celle de Nexium : chaque
  différence est une modification Nexium. On obtient une liste complète, sans rien
  deviner.
- [ ] **Repartir de la dernière version d'Equicord**, et y ajouter Nexium à part, dans
  son propre dossier.
- [ ] **Transformer chaque module Nexium en vrai plugin**, en commençant par la base
  (stockage, traductions, erreurs), puis Protect et Privacy, puis les pages.
- [ ] **Un test chaque nuit contre le vrai Discord.** Equicord fournit un outil qui
  vérifie toutes les modifications contre la version actuelle de Discord. S'il trouve
  une casse, on est prévenu avant les utilisateurs.
- [ ] **Une mise à jour d'Equicord chaque semaine**, proposée automatiquement.

### Étape 3 : un code qu'on peut faire évoluer *(environ 6 semaines, en continu)*

- [ ] Passer le code en **TypeScript** : l'éditeur signale les erreurs avant même de
  lancer le client.
- [ ] **Découper les fichiers géants.** L'IA fait 240 Ko, Protect 143 Ko. Objectif :
  aucun fichier au-delà de 800 lignes.
- [ ] **Tester la logique importante** : détection des liens piégés, détecteur
  d'arnaques, masquage des jetons, bac à sable.
- [ ] **Mesurer la vitesse avant chaque publication** : temps de démarrage, mémoire.

### Étape 4 : une installation de vrai logiciel *(2 à 3 semaines)*

- [ ] **Un installateur classique** (« Suivant, Suivant, Terminer ») au lieu d'une
  commande PowerShell.
- [ ] **Un exécutable signé** : plus d'alerte rouge de Windows. C'est gratuit pour les
  projets open source (SignPath).
- [ ] **macOS et Linux.**
- [ ] **Ne plus distribuer le code de Discord.** Aujourd'hui, le dépôt contient des
  fichiers de Discord (`resources/modules/`). Discord ne l'autorise pas, et c'est inutile
  avec la nouvelle base (voir le choix B plus bas).
- [ ] **Sortir les gros fichiers du dépôt** (DLL, `.exe`) : ils vont dans les
  « Releases » de GitHub. Le dépôt devient léger.

### Étape 5 : un serveur propre *(2 semaines, en parallèle)*

- [ ] Un serveur de test séparé : on n'essaie plus rien sur le vrai.
- [ ] Les **abonnements gérés par le serveur uniquement**. Le code étant public, un
  verrou dans le client se retire facilement ; un verrou sur le serveur, non.
- [ ] Une **politique de confidentialité** claire : ce qui est gardé, combien de temps,
  et qui le reçoit (par exemple Groq pour l'IA). Plus un bouton « supprimer mes
  données ».

---

## 4. Fonctionnalités

### Ce qu'on garde et qu'on met en avant

Ce qui rend Nexium unique, et qu'aucun autre client n'a :

- **Protect** (liens piégés, détecteur d'arnaques, 12 secondes pour annuler) ;
- **Privacy**, avec son journal qui montre chaque blocage ;
- le **Repaire chiffré** et la **ligne de secours** quand Discord tombe ;
- le **best-of vocal** ;
- l'**IA qui montre avant d'agir**.

### Ce qu'on simplifie

- **27 entrées dans les réglages → une dizaine**, regroupées par besoin :

  | Nouvelle entrée | Ce qu'elle regroupe |
  |---|---|
  | Accueil | l'accueil actuel |
  | Protection | Protect, Privacy, Réseau, Bac à sable, Outils |
  | Vocal | Nexium Vocal, best-of, soundboard |
  | Mon groupe | Repaire, ligne de secours |
  | Assistant | Nexium IA |
  | Mon activité | Stats, Comptes, Amis, Sismographe |
  | Automatisations | Auto, Music |
  | Apparence | thèmes, extensions, animations |
  | Mon compte | Abonnement, Support |
  | Réglages | Mise à jour, Données, Démarrage, À propos |

- **388 plugins Equicord → une sélection d'environ 40**, triés et décrits en français.
  Les autres restent disponibles dans un coin « avancé », masqué par défaut.
- **Retirer les outils de développeur** de l'interface (Patch Helper, éditeur de
  correctifs).
- **Un premier lancement guidé** : trois questions (protection forte ou légère ? IA
  oui ou non ? démarrer avec Windows ?), et le client est réglé.

### Ce qu'on ajoute

- **Une page « Santé du client »** : quand Discord casse une fonction, la page le dit,
  désactive seule la fonction en cause, et la réactive quand le correctif arrive. Plus
  de client qui plante sans explication.
- **Un mode panique** : un raccourci qui masque tout d'un coup (messages, serveurs,
  pseudos). L'idée existe déjà en partie (`Ctrl + Maj + M`) : on la complète.
- **La synchronisation des réglages** entre deux PC, chiffrée comme le Repaire.
- **Un canal bêta** pour les volontaires, qui reçoivent les nouveautés une semaine avant
  les autres.

---

## 5. Esthétique : ne plus ressembler à Vencord ou Equicord

### Ce qui trahit Equicord aujourd'hui

- **Le menu de la fenêtre** s'appelle « NanoCord », avec « À propos de NanoCord » et
  « Réparer NanoCord ».
- **Des fenêtres d'Equicord** : « NanoCord QuickCSS Editor », « NanoCord Host
  Permissions ».
- **Des pages entières reprises telles quelles** : Plugins, Themes, Backup & Restore,
  avec le style d'Equicord (396 styles `vc-`) et des titres en anglais.
- **Le dossier des réglages** sur le PC s'appelle `NanoCord`.
- **Des noms en anglais au milieu du français** : Changelog, Team, Sponsor, Backup &
  Restore.

### Ce qu'on fait

1. **Une identité écrite noir sur blanc**, dans un fichier `docs/IDENTITE.md` :
   - le logo et ses variantes ;
   - les couleurs : l'or sur fond anthracite de la bannière actuelle, plus 3 couleurs
     d'accent maximum ;
   - une seule police ;
   - les icônes au trait fin (déjà redessinées en v191) ;
   - les règles de mouvement : animations courtes, coupées en mode économie.
2. **Refaire les pages reprises d'Equicord** avec les briques Nexium (cartes, tuiles,
   en-têtes) :
   - Plugins devient « Extensions », en cartes, par catégories en français ;
   - Themes devient « Apparence » ;
   - Backup & Restore passe dans « Réglages » ;
   - Team et Sponsor deviennent « À propos ».
3. **Effacer chaque trace de NanoCord** : le menu de la fenêtre, les fenêtres, les
   messages d'erreur, le dossier des réglages (avec une migration automatique, pour ne
   perdre aucun réglage).
4. **Un thème Nexium pour Discord lui-même**, activé par défaut : touches dorées,
   coins arrondis, barre latérale Nexium. On reconnaît Nexium au premier coup d'œil,
   même hors des pages Nexium. Il ne passe que par les variables de couleur de Discord,
   pour ne pas casser à chaque mise à jour.
5. **Une langue par écran** : tout en français, ou tout en anglais, jamais mélangé.
6. **Des écrans d'erreur et d'attente à l'image de Nexium**, au lieu des messages
   techniques bruts.

---

## 6. Les choix à faire (avec ma recommandation)

**A. Comment construire le client**
- **Recommandé :** une copie d'Equicord qu'on met à jour chaque semaine, avec Nexium à
  part dans son propre dossier.
- Garder le système actuel : c'est lui qui casse.

**B. Ce que l'utilisateur lance**
- **Recommandé à terme : notre propre application**, basée sur *Equibop* (la version
  d'Equicord qui ouvre Discord comme un site, dans sa propre fenêtre).
  - Pour : aucun fichier de Discord à distribuer, Windows, macOS et Linux, installateur
    et mises à jour standards.
  - Contre : la réduction de bruit Krisp et la détection des jeux de Discord
    disparaissent.
- Garder le client actuel le temps de la transition.
- Une 3ᵉ voie, en option : se greffer sur le Discord officiel déjà installé (comme
  l'installateur d'Equicord). Krisp continue de marcher, mais une mise à jour de Discord
  peut retirer la greffe.

**C. Les abonnements**
- **Recommandé :** ne faire payer que ce qui coûte vraiment côté serveur (l'IA, les
  relais, le stockage du Repaire). Tout ce qui tourne sur le PC reste gratuit : avec un
  code public, ce serait de toute façon facile à débloquer.

---

## 7. Calendrier

| Semaines | Ce qui est fait | Ce que voient les utilisateurs |
|---|---|---|
| 1 | Étape 1 | Rien, mais plus de mise à jour cassée |
| 2 à 4 | Étape 2 | **Beaucoup moins de bugs** après les mises à jour de Discord |
| 3 à 6 | Esthétique (points 1 à 3) | Un client qui ne ressemble plus à Equicord |
| 5 à 10 | Étape 3, fonctionnalités | Réglages simplifiés, page Santé, premier lancement guidé |
| 6 à 8 | Étape 4 | Installateur classique, plus d'alerte Windows, puis macOS et Linux |
| 5 et 6 | Étape 5 | Politique de confidentialité, « supprimer mes données » |

À temps plein. À mi-temps, compter le double.

---

## 8. Ce que je fais ensuite, dans l'ordre

1. Les **tests automatiques sur GitHub**.
2. Le **canal stable et les mises à jour signées** : c'est le préalable à tout le
   reste.
3. La **liste des modifications faites à la main** dans Equicord.
4. La **copie d'Equicord à jour**, avec la base de Nexium portée dessus, puis Protect et
   Privacy.
5. L'**identité visuelle** (`docs/IDENTITE.md`), puis les pages Extensions et
   Apparence.

---

## 9. Petit lexique

| Mot | Ce que ça veut dire |
|---|---|
| **Equicord** | Le projet open source sur lequel Nexium est construit. Il modifie Discord pendant qu'il tourne. |
| **Patch** | Une modification précise du code de Discord (« remplace ceci par cela »). C'est ce qui casse quand Discord change. |
| **Bundle** | Un gros fichier qui regroupe tout le code, prêt à être exécuté. `renderer.js` en est un. |
| **Signature** | Une preuve mathématique qu'un fichier vient bien de toi et n'a pas été modifié. |
| **Canal stable** | La version que reçoivent les utilisateurs, séparée de celle sur laquelle on travaille. |
| **Tests automatiques** | Des vérifications que GitHub lance tout seul à chaque envoi de code. |
