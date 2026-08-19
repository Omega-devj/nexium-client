# Nexium Client — Notes de version

## v138 — Partage, metadonnees et rappels

### Masque de partage d ecran

- Dans Nexium Protect, onglet Apercu
- Un bouton avant de partager : les messages prives sont floutes, les pseudos masques, la liste des membres cachee
- S active tout seul quand Discord demande le partage d ecran, et se retire quand le partage s arrete
- Chaque element est activable separement, dont un mode radical qui floute aussi le contenu des messages
- Un bandeau discret rappelle en haut de l ecran que le masque est actif
- Indique combien d elements chaque selecteur trouve reellement dans ta fenetre

### Metadonnees des images envoyees

- Complete le garde-fou avant envoi qui verifiait deja le texte : il verifie maintenant aussi tes images
- Previent quand une photo JPEG contient des coordonnees GPS, le modele de ton appareil ou la date de prise de vue
- Lecture locale des 256 premiers kilo-octets du fichier, aucun envoi
- Si le module d envoi de Discord n est pas accessible, la protection se declare indisponible au lieu d echouer en silence

### Faux serveurs officiels

- Complete l analyse de serveur existante, qui reperait deja les noms imitant une marque
- Confronte desormais le nom au badge de verification reel de Discord
- Un serveur qui porte un nom de marque sans badge, ou qui se presente comme officiel sans en avoir un, est signale
- A l inverse, un serveur reellement verifie ou partenaire voit son score de risque baisser

### Bilan de securite partageable

- Carte image facon Retrospective, cote Protect : menaces bloquees, liens analyses, arnaques reperees, exfiltrations, domaines surveilles
- Classement de ce qui a ete arrete, par type
- Genere et telecharge localement

### Rappel sur un message

- Clic droit sur un message puis Me le rappeler
- Choix rapide : 10 minutes, 1 heure, 2 heures, ce soir, demain
- Cree une tache Nexium Auto qui se declenche une fois puis s efface toute seule
- Nouveau declencheur A une date precise, utilisable aussi dans l editeur de taches
- Nexium Auto compte desormais 21 declencheurs et 22 actions

---

## v137 — Retrospective, concentration et bac a sable

### Retrospective partageable

- Nouvel onglet Retro dans Nexium Stats
- Genere une carte image de ton activite : messages, caracteres, temps vocal, reactions, habitudes sur 7 jours et 24 heures, mots et emojis les plus utilises
- Quatre periodes au choix : ce mois-ci, 30 derniers jours, cette annee, depuis le debut
- Apercu avant export, telechargement en PNG, copie directe dans le presse-papiers quand le client le permet
- Tout est calcule et dessine sur ta machine, rien n est envoye

### Mode concentration

- Nouvel onglet Focus dans Nexium Auto
- Sessions minutees facon pomodoro : duree de travail, duree de pause, nombre de cycles
- Masque pendant la session : pastilles de notification, images et videos, liste des membres, serveurs non autorises
- Passe ton statut en ne pas deranger et coupe les messages Nexium pendant que tu travailles
- Liste blanche de serveurs : ne garde que ceux dont tu as besoin
- Un bloc de verification indique combien d elements chaque option trouve reellement, pour reperer tout de suite si Discord a change ses noms de classes
- Historique des sessions et total concentre du jour

### Bac a sable de liens

- Depuis le verificateur de lien de Nexium Protect
- Recupere la page et l inspecte sans rien executer : aucun script lance, aucune image chargee, aucun cadre affiche
- Signale ce qui compte vraiment : champ de mot de passe, domaine vers lequel le formulaire envoie, marque imitee, redirection automatique, champs caches, scripts tiers
- Affiche le titre, la description et le texte visible de la page pour juger sans la visiter
- Ton adresse IP reste visible du site : c est annonce clairement avant de lancer l inspection

---

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
