# Nexium Client — Notes de version

## v153 — La vraie cause du plantage general

### Un nom de variable en commun avec Equicord

- Ouvrir un serveur ou un message prive faisait tomber le client entier sur l ecran de
  plantage de Discord. Barre de serveurs vide, liste de conversations vide, plus rien
- Le journal d erreurs de Nexium gardait la fonction d origine de console.error dans une
  variable nommee _ce. Le zod embarque d Equicord declare _ce au meme niveau de portee,
  pour $ZodUnknown, et l ecrase
- A partir de la, chaque appel a console.error appelait un constructeur zod avec le texte
  du message. Toute ecriture dans la console levait une exception
- Elle tombait au pire endroit : dans le rattrapage d erreur de React. Une erreur benigne,
  que React aurait absorbee seul, detruisait l arbre entier de l interface
- Les trois variables passent dans l espace de noms : _NXce, _NXce0, _NXpce
- Verifie : plus aucune declaration de premier niveau du bloc Nexium hors de _NX*

Mesure sur un client reel, sans correctif en memoire : 0 serveur, 0 message, ecran de
plantage present, puis 18 serveurs, 30 messages, ecran de plantage absent.

Pourquoi maintenant et chez tout le monde : Discord a change de build, la minification
d Equicord a reattribue le nom _ce, et la collision est apparue chez tous les clients
le meme jour.

---

## v152 — Le client ne se saborde plus sur une erreur

### Le plantage general

- Ouvrir un serveur ou un message prive faisait tomber tout le client sur l ecran de
  plantage de Discord. Plus de barre de serveurs, plus de liste de conversations, plus rien
- La cause : le journal d erreurs de Nexium remplace console.error, et renvoyait vers la
  fonction d origine sans filet. Quand Discord lui passait un objet dont la lecture echoue,
  l exception repartait depuis ce renvoi
- Elle tombait au pire endroit : dans le rattrapage d erreur de React. Une erreur benigne,
  que React aurait absorbee seul, detruisait l arbre entier de l interface
- Le renvoi est desormais protege. Une ligne de journal ne peut plus emporter le client

Mesure avant / apres sur le meme client : 0 serveur, 0 message, ecran de plantage present
puis 18 serveurs, 10 messages, ecran de plantage absent.

---

## v151 — Correctifs de la NEW Gen

### Deux bugs bloquants

- Envoyer un message pouvait figer la barre de saisie. La garde avant-envoi rendait une fausse
  reponse d API : Discord restait en suspens et il fallait relancer le client
- Elle se declenchait en plus pour rien : un identifiant Discord etait pris pour un numero de
  telephone, et seize chiffres consecutifs pour une carte bancaire
- Cliquer une tuile de la page d accueil menait a un ecran gris. La navigation appelait le premier
  module venu exportant une fonction nommee open, au lieu du routeur de reglages

### Ce qui a ete resserre

- Le telephone exige desormais une vraie forme, la carte exactement seize chiffres non colles a
  d autres, l IBAN au moins dix chiffres
- Une requete Discord dont l adresse contenait sentry.io n importe ou etait prise pour de la
  telemetrie et bloquee : la reconnaissance se fait maintenant sur l hote
- La modale d avertissement repond sur tous les chemins, meme quand elle ne peut pas s afficher
- Un filet d une minute laisse partir le message plutot que de bloquer la saisie

### Confort

- Les notifications de latence reseau sont retirees : elles interrompaient sans rien apporter.
  Un compteur de requetes lentes les remplace dans la page Reseau
- Zeo et le bloc Support quittent la page Team

### Menage

- Un echantillonneur de performance jamais branche a ete retire

---

## v150 — Nexium NEW Gen

### Onze protections qui n existaient pas

- Gardien des webhooks : un envoi par webhook Discord passe par discord.com, donc rien ne le filtrait
- Pare-feu sortant : aucune donnee ne part vers un serveur inconnu sans ton accord, en trois postures
- Anti-balise invisible : image d un pixel, WebSocket et flux permanent sont coupes
- Gardien du DOM : scripts, cadres et formulaires injectes sont retires avant de servir
- Anti-charge utile : le code qu un theme ou un greffon veut executer est lu avant, et refuse s il vole
- Caracteres invisibles : un message peut en cacher des dizaines pour dissimuler un lien ou te marquer
- Adresses de portefeuille : signalees a la reception, et detournement du presse-papiers detecte
- Liens prives d inconnus : un lien recu d un compte hors de tes amis demande confirmation
- Fuite de webhook : tu es prevenu avant de coller l adresse complete d un webhook
- Vagues coordonnees : trois comptes recents qui postent le meme message, c est une campagne
- Noms de fichiers truques : double extension et sens de lecture inverse

### L anti-exfiltration reconnait le jeton meme deguise

- Encode en URL, en base64, inverse, recompose sans ses points, ou coupe en deux
- L adresse de la requete est enfin inspectee : un jeton en parametre sortait sans un bruit
- Corps binaires, formulaires et parametres d URL couverts
- Mots de passe et cles d API rejoignent la liste des secrets surveilles
- supabase.co n est plus autorise en entier : seul le projet Nexium l est
- Le jeton ne reste plus pose sur une variable globale

### Failles corrigees

- La chaine de mise a jour n avait jamais fonctionne : le controle exigeait dix marqueurs qui n ont jamais existe qu en deux exemplaires
- Un domaine de la base de menaces echappait au blocage s il etait servi sur un port inhabituel
- Autoriser un domaine autorisait aussi tout domaine qui le contenait
- Le lanceur sait desormais se mettre a jour lui-meme, avec retour arriere automatique
- Le journal des requetes bloquees de Nexium Privacy ne s est jamais rempli : un compteur ecrasait la liste

### Vie privee : vingt-quatre reglages et des heures discretes

- Onze familles de requetes reconnues et blocables, dont tests A/B, detection de jeux, contacts, affinites, recommandations et sondage vocal
- Frappe silencieuse, accuses de lecture, inactivite et partage de l activite en cours
- En-tetes de suivi retires, empreinte materielle normalisee, serveurs STUN etrangers ecartes
- Noms de fichiers anonymises a l envoi, liens copies nettoyes, traces purgees a la fermeture
- Trois profils d ensemble, et des heures discretes qui basculent toutes seules
- Un bilan de la semaine et un journal complet de ce qui a ete arrete

### Onze pages refaites

- Un accueil qui devient un vrai tableau de bord, avec acces direct a tout le client
- Protect : anneau de protection, vitrines des nouveautes, journal des sorties
- Privacy : jauge segmentee, barre de flux, histogramme des vingt-quatre heures
- Reseau : trace de latence, inventaire des hotes contactes, routes les plus lentes, mesure a la demande
- Stats : calendrier de constance, rythme de journee, objectifs, export CSV
- Donnees : inspecteur de contenu, sauvegardes automatiques, tableau de sante
- Music : disque qui tourne, forme d onde, playlist cherchable, minuterie, touches media du clavier
- Theme : apercu en direct, cinq ambiances pretes
- Team, Sponsor et journal des versions entierement redessines
- Icones revues : Privacy ne porte plus le meme bouclier que Protect

### Performances

- Classification des requetes : une seule expression au lieu de douze, 1,6 fois plus rapide
- 162 400 recherches dans les stores de Discord remplacees par deux
- Les tableaux de reglages ne sont plus reconstruits a chaque rendu
- Les ecritures sur disque attendent un temps mort
- Un panneau complet se redessine en moins d une milliseconde

---

## v146 — Cinq gardes de sortie et un Protect refait

### Cinq protections inedites

- Gardien des webhooks : un envoi par webhook Discord passe par discord.com, donc aucune protection ne le filtrait. Il est desormais arrete, et le webhook peut etre approuve au cas par cas
- Pare-feu sortant : les serveurs hors Discord et hors Nexium ne recoivent plus rien sans ton accord
- Trois postures au choix, Guide par defaut : la lecture passe, ce qui emporte des donnees est arrete
- Anti-balise invisible : une image d un pixel, un WebSocket ou un flux permanent suffisaient a faire sortir un jeton sans aucune requete visible. Les trois voies sont coupees
- Gardien du DOM : scripts, cadres et formulaires inseres dans la fenetre depuis l exterieur sont retires avant de servir. Tes themes, eux, sont seulement signales, jamais casses
- Anti-charge utile : le code qu un theme, un greffon ou un script injecte veut faire executer est lu avant, et refuse quand il lit ton jeton pour le faire sortir

### L anti-exfiltration reconnait le jeton meme deguise

- Le jeton est repere encode en URL, en base64, inverse, recompose sans ses points, et jusqu a un fragment de vingt-six caracteres
- L adresse de la requete est enfin inspectee : jusqu ici seuls le corps et les en-tetes l etaient, un jeton en parametre d URL sortait sans un bruit
- Les corps binaires, les FormData et les URLSearchParams sont couverts
- Les mots de passe et les cles d API rejoignent la liste des secrets surveilles
- supabase.co n est plus autorise en entier : seul le projet Nexium l est. N importe qui pouvait ouvrir un projet gratuit et s en servir comme sortie
- Le jeton ne reste plus pose sur une variable globale : il vit dans une fermeture, quinze secondes, et il est oublie des que la fenetre passe en arriere-plan

### Deux contournements corriges

- Un domaine de la base de menaces echappait au blocage s il etait servi sur un port inhabituel : grabify.link:8443 passait, grabify.link non. Les adresses IP brutes avec port aussi
- Autoriser un domaine autorisait aussi tout domaine qui le contenait : approuver exemple.fr ouvrait la porte a exemple.fr.piege.tld

### Nexium Protect a une nouvelle interface

- L en-tete devient un anneau de protection qui se remplit a l ouverture, avec un halo qui respire et des compteurs qui s animent quand un chiffre bouge
- Les cinq nouveautes ont leur vitrine en tete d Apercu, avec leur compteur de blocages et la posture du pare-feu
- Les onglets ont un soulignement qui glisse, et Journal porte une pastille quand la quarantaine n est pas vide
- Les cartes arrivent en cascade au changement d onglet
- Nouveau volet Journal : sorties arretees, hotes inconnus rencontres, hotes approuves
- Le niveau de protection compte desormais 28 protections au lieu de 23

### Sous le capot

- Les tableaux de boucliers ne sont plus reconstruits a chaque rendu : un panneau complet se redessine en moins d une milliseconde
- Les evenements de blocage sont amortis avant de redessiner l interface, une rafale ne fait plus clignoter la page
- Les gardes coutent trente nanosecondes sur un avatar Discord et moins d une microseconde sur une requete
- Le composant se desabonne enfin de Nexium Coffre-fort en se fermant
- Toutes les animations respectent le reglage de mouvement et le mode reduit du systeme

### Correction d affichage

- Dans la modale de lien bloque, l encadre qui montre l adresse avait perdu son fond, sa bordure et sa police : une concatenation avalee par des apostrophes. Une longue adresse debordait de la carte

---

## v145 — Ecran de premier lancement

### Le client se presente enfin

- Au tout premier demarrage, Nexium affichait le journal des versions : un changelog brut, illisible pour qui decouvre le client
- Il ouvre maintenant un accueil en quatre volets, ferme d un clic et rejouable a volonte

### Ce que raconte l accueil

- Discord, repris en main : ce que Nexium est, en trois phrases
- Ton client, ton allure : le fond, l accent et la signature se choisissent la, et la fenetre change derriere en direct
- Ce qui est arrete avant toi : liens pieges, faux serveurs, jeton colle par erreur, metadonnees des photos, masque de partage
- Rien ne part d ici : hotes contactes affiches et mesures, donnees calculees en local, aucune analytique
- Les deux derniers volets ouvrent directement Nexium Protect et Nexium Reseau

### Details

- La carte reprend les couleurs du theme choisi : le changement se voit sur l accueil lui-meme
- Si le theme est coupe, le volet apparence le dit au lieu d afficher des reglages morts
- Un bouton Revoir l ecran d accueil est ajoute dans Nexium Donnees
- La mise a jour d une version a l autre continue d afficher le journal des versions, comme avant

---

## v144 — Signature Nexium et badges etrangers

### Les badges d autres clients disparaissent

- Les badges donateur et contributeur de Vencord et d Equicord ne sont plus affiches nulle part
- Ni sur les profils, ni en chat, ni dans l editeur de disposition des badges
- Le client ne va plus chercher la liste des donateurs sur badges.vencord.dev au demarrage ni toutes les trente minutes
- Un hote sortant de moins, visible dans Nexium Reseau
- Les badges Discord d origine, eux, restent intacts

### Trois niveaux de signature visuelle

- Le reglage Apparence Nexium remplace le trait de signature par une intensite a trois crans
- Discrete : couleurs, typographie et coins seulement
- Affirmee : filet d accent en haut de la fenetre, indicateur de serveur en trait fin, separateurs reduits a un filet
- Affirmee, suite : lisere d accent sur les messages et les mentions, filet au-dessus de la saisie, categories en capitales espacees
- Totale : ajoute le sigle NEXIUM dans la barre de titre et un filigrane discret au fond de la fenetre
- Anneau de focus et selection de texte passent a l accent choisi
- Les reglages d avant sont repris automatiquement

### Ces retouches se signalent quand Discord change

- Chaque couche structurelle compte les elements qu elle vise reellement
- Les reglages nomment les cibles introuvables au lieu de laisser croire que tout va bien

---

## v143 — Identite visuelle et menage

### Apparence Nexium

- Nouveau reglage dans Nexium Donnees : le client habille desormais Discord a ses propres couleurs
- Trois fonds au choix : Encre, Graphite et Papier, ce dernier en clair
- Quatre accents : Ivoire, Cendre, Braise, ou aucun pour garder celui de Discord
- Trois typographies : celle d origine, une grotesque, ou une editoriale a empattements pour les titres
- Trois familles de coins : arrondis, doux ou nets
- Un trait de signature d un pixel tout en haut de la fenetre, et un mode images sobres qui desature les bannieres
- Le theme passe par les variables de couleur de Discord, pas par des noms de classes : il survit aux mises a jour du client
- Une sonde verifie que les variables ont bien pris et le dit dans les reglages au lieu d echouer en silence
- Actif par defaut ; le decocher rend a Discord son apparence d origine a l identique

### Le client ne se presente plus sous un autre nom

- Toutes les mentions visibles d Equicord, NanoCord, Vencord, Vesktop et Equibop deviennent Nexium Client
- Les onglets, la palette de commandes, les informations de version et le presse-papier de debogage portent le nom du client
- Les greffons internes sont renommes Nexium, avec reprise automatique de leurs reglages existants
- Les liens de version et de depot pointent desormais vers le depot Nexium

### Barre de serveurs en haut

- Fonctionnalite retiree : reglage, module et traductions
- Le rendu reposait sur des suppositions de noms de classes Discord et n a jamais tenu
- La liste des serveurs retrouve la colonne de gauche d origine

---

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
