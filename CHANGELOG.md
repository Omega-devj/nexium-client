# Nexium Client — Notes de version

## v136 — Automatisation et bannissement

### Nexium Auto s'agrandit

- 20 declencheurs au lieu de 8, ranges en trois familles : Temps, Messages, Presence
- Nouveaux declencheurs de temps : premier lancement du jour, seuil de messages atteint
- Nouveaux declencheurs de messages : message d une personne precise, lien recu, piece jointe recue
- Nouveaux declencheurs de presence : entree et sortie de vocal, nouveau serveur rejoint, demande d ami, retour d activite, fenetre au premier plan ou en arriere-plan
- 22 actions au lieu de 12
- Enchainement : une tache peut en declencher une autre, avec une garde qui coupe les boucles
- Compteurs nommes : une tache incremente, une autre teste le seuil. Exemple : alerte au dixieme message prive de la journee
- Une tache peut activer, couper ou mettre en veille une autre tache
- Carnet de memos, signal sonore, copie du dernier lien recu, bilan des automatisations du jour
- Nouvelles conditions : ecart minimal entre deux executions, maximum par jour, nom de serveur, en vocal ou hors vocal, pas en ne pas deranger, seuil de compteur
- Variables dans les textes : heure, date, tache, auteur, contenu, salon, serveur, lien, compteur
- 26 modeles prets a l emploi au lieu de 12
- Nouvel onglet Memoire pour les compteurs et le carnet
- Recherche ajoutee sur les taches et sur les modeles

### Bannissement

- Le bannissement ne repose plus uniquement sur l identifiant Discord
- L appareil est reconnu par une empreinte materielle, insensible au changement de compte
- L installation est reconnue par un marqueur persistant, restaure s il est partiellement efface
- Changer de compte Discord ne rend plus l acces au client
- Le verrou tient aussi hors ligne
- La liste de bannissement accepte trois formats : identifiant Discord, empreinte d appareil, marqueur d installation. L ancien format reste valable
- L ecran de blocage affiche le motif et les references, avec un bouton pour les copier

### Corrections

- Les identifiants de taches pouvaient entrer en collision quand plusieurs modeles etaient ajoutes dans la meme milliseconde, ce qui cassait l edition, la suppression et l enchainement
- Les mentions etaient cherchees dans le texte converti en minuscules ; la forme avec point d exclamation n etait pas reconnue

---

## v135 — Protection, reseau et interface

### Icones des plugins tiers

- Les icones ne sortent plus de la fenetre et ne recouvrent plus le panneau utilisateur
- Une bande est reservee sous le panneau ; si elle ne peut pas etre creee, les icones se placent au-dessus plutot que par-dessus le texte
- Reactiver l option apres une desactivation automatique relance reellement le module

### Cinq nouvelles protections

- Autorisations d application : analyse des liens OAuth2 et alerte sur les portees dangereuses, ajout de bot, webhook, permissions administrateur
- Schemas d URI executables : blocage des liens javascript, vbscript, file et data html qui executent du code
- Caracteres invisibles et inversion du sens de lecture, qui font afficher autre chose que le vrai lien
- Liens pointant vers une adresse IP brute au lieu d un nom de domaine
- Demande de code de verification : alerte quand on te reclame un code a six chiffres, un code 2FA ou un code de secours

### Reseau

- Tous les appels reseau ont desormais un delai maximal. Un serveur muet ne laisse plus une page bloquee sur chargement
- Reprise progressive apres un echec pour la base de menaces, la liste de confiance et les sponsors, a 20 secondes, 1 minute, 3 minutes puis 7 minutes
- La reprise est reportee quand la fenetre est en arriere-plan, au lieu d etre perdue

### Nexium Protect refait

- Page reorganisee en cinq onglets : Apercu, Boucliers, Coffre-fort, Journal, Base
- Recherche dans les boucliers et dans le coffre-fort
- Presentation monochrome, lignes separees par des filets au lieu de blocs empiles
- Accessibilite : intitules sur tous les boutons, etats annonces sur les interrupteurs et les onglets

### Nouvelle page Nexium Auto

- Moteur d automatisation local : un declencheur, des conditions, une action
- Aucun message n est jamais envoye a ta place

### Mise a jour

- Une version locale plus recente que le depot est desormais annoncee comme telle, au lieu d afficher client a jour

---

## Format de la liste de bannissement

Fichier ban du depot bl-client-nexium. Une entree par ligne.

- 123456789012345678 pour un compte Discord
- fp deux-points suivi de l empreinte pour un appareil
- in deux-points suivi du marqueur pour une installation
- Les lignes commencant par un diese ou un point-virgule sont ignorees
