# Nexium Client — Notes de version

## v203 - Protect et Privacy refaits, le vrai serveur vocal, un son qui ne baisse plus

### Nexium Protect, refait de zero

Certaines protections etaient listees deux fois, et d autres ne faisaient
plus rien sans le dire. La page repart d une seule liste.

- 42 protections, chacune listee une seule fois : le QR code, les caracteres
  invisibles, les noms de fichiers pieges, les campagnes, les fuites de
  webhook, les messages prives d inconnus et les serveurs pieges etaient en
  double, ils sont fusionnes ;
- les protections de liens (loggers d IP, hameconnage, liens masques,
  apercus, telechargements) ne marchaient qu avec l analyse des liens
  allumee. Elles la rallument desormais, et la page dit quand l une d elles
  est en pause ;
- chaque carte montre combien de fois elle a agi, et si elle a passe son
  test, pour de vrai ;
- un tableau de bord anime, une recherche, des filtres par famille, un
  bouton pour tout tester.

### Douze secondes avant les actions graves

Autoriser une application, supprimer ou ceder un serveur, couper la double
authentification, changer d e-mail ou de mot de passe, supprimer ou
desactiver le compte : la requete attend douze secondes, avec un bouton pour
l annuler. Avant, ce reglage ne retenait que l effacement des donnees Nexium.

### Nexium Privacy, avec le meme soin

- 28 reglages regroupes par idee : les trois qui nettoyaient les liens, les
  deux qui coupaient les rapports d erreurs et ceux qui fermaient l adresse
  pendant les appels ne font plus qu une carte chacun ;
- tes dernieres 24 heures et ta semaine en courbes ;
- chaque reglage dit combien de requetes il a arretees.

### Nexium Vocal : la vraie adresse du serveur

L adresse affichee changeait parce qu elle etait devinee par un resolveur
DNS. Elle est maintenant lue dans ce que le serveur vocal annonce lui-meme au
client, avec son port.

- le port UDP, le port de signalisation, le transport, le chiffrement du
  transport et de bout en bout (DAVE), les codecs, le site du serveur ;
- le debit mesure, les pertes et la gigue, personne par personne ;
- ce que Discord voit de toi, masque par defaut.

### Le son

- l enregistrement de clips ouvrait le micro en laissant Chromium regler son
  niveau dans Windows, le meme que celui de Discord : la voix baissait toute
  seule pendant les appels. Il ecoute maintenant sans rien toucher ;
- Krisp reste sur Standard : son module ne demarre que dans l application
  signee par Discord, c est une condition de sa licence que Nexium ne
  contourne pas. Nexium Vocal l explique, et montre la reduction de bruit,
  l echo et le gain reellement actifs ;
- couper le sondage des regions vocales peut envoyer tes appels vers un
  serveur plus lointain : Nexium Vocal le signale et le retablit d un clic.

### Et aussi

- Nexium IA : une interface de chat repensee, des blocs de code avec copie,
  plus de barre blanche dans le panneau ;
- abonnements : un essai gratuit de trois jours, des credits offerts chaque
  mois, des jours offerts a l engagement, et des codes promo a saisir dans
  la page ;
- la page de support a ete refaite ;
- le client est traduit en anglais de bout en bout ;
- les icones de plugins ne recouvrent plus le pseudo ;
- les animations ne disparaissent plus au redemarrage, et le mode securise
  rend ce qu il avait coupe ;
- au premier demarrage, une fenetre raconte ces nouveautes, une fois.

## v202 - Un responsable communication dans l equipe

### L equipe

10348295 rejoint Nexium comme responsable communication. Il apparait dans la
page Team, a cote des autres contributeurs.

- annonces et reseaux : c est lui qui les porte desormais.

## v201 - Un laboratoire, une boite a outils, un ecran d ouverture refait

### Le bac a sable

Un fichier, lu octet par octet. Rien n est jamais execute : on reconnait des
formes, on compte, on compare.

- le type REEL, derriere l extension. Un fichier nomme facture.pdf dont le
  contenu commence par MZ est un executable Windows deguise, et c est le
  constat le plus lourd que cette page puisse produire ;
- l entropie, globale et par blocs. Au-dela de 7,4 le contenu n est pas
  lisible tel quel : normal pour une archive, inhabituel pour un executable ;
- les chaines lisibles, en ASCII et en UTF-16 ;
- les indicateurs : adresses, IP, e-mails, webhooks Discord, chemins Windows,
  clefs de registre, blocs encodes ;
- douze regles de detection, chacune avec sa raison et son poids ;
- la structure : repertoire central des archives (donc detection d une
  archive-bombe AVANT de decompresser, et des chemins qui remontent hors du
  dossier), en-tete PE des executables, sections, date de compilation,
  empaqueteurs.

L analyse tourne dans un fil isole. Quand le navigateur le refuse, elle tourne
sur le fil principal ET LA PAGE LE DIT : annoncer un isolement qu on n a pas
obtenu serait exactement le mensonge que ce client refuse partout ailleurs.

Le score n est jamais un nombre de plus : c est la somme des constats
affiches, chacun avec son poids. Sept niveaux de lecture, du resume au rapport
exportable, et un identifiant unique par analyse.

### La boite a outils

Une vingtaine d outils techniques, sans brides, derriere une porte a cinq
verrous. Cocher quatre engagements sur cinq ne l ouvre pas : on ne peut pas
dire qu on a compris cinq choses d un seul clic.

Ce qui reste sur la machine : base64, hexadecimal, URL, JSON, JWT, empreintes
SHA-1 a SHA-512, UUID, horodatage, comparaison de textes, caracteres
invisibles, generateur de mots de passe et de clefs, mesure de robustesse, age
d un compte Discord.

Ce qui en sort, et qui le dit avant : resolution DNS, journaux de
transparence des certificats, en-tetes HTTP. Chaque usage est consigne sur la
machine, et le journal distingue ce qui est reste de ce qui est parti.

Deux precisions qui comptent :

- le decodeur JWT ne verifie jamais la signature. Verifier demanderait la
  clef, et l envoyer quelque part reviendrait a livrer le jeton ;
- l inspecteur d en-tetes dit ce qu un navigateur n a pas le droit de lire,
  au lieu d afficher un tableau vide.

### L ecran d ouverture

Refait entierement : un horizon en perspective qui defile, trois nappes de
lumiere qui derivent, un champ d etoiles a trois profondeurs, un gyroscope de
cinq anneaux dont deux couches, deux points en orbite, un halo qui respire.
Tout est compose par le processeur graphique.

Deux defauts constates a l usage, et corriges :

- les animations s arretaient vers la fin. La mesure de performance comptait
  les appels de requestAnimationFrame, donc le FIL PRINCIPAL -- celui que
  Discord sature pendant tout son demarrage. Or chaque animation de cet ecran
  est composee par le processeur graphique et n en souffre pas. On lisait huit
  images par seconde pendant que l ecran en affichait soixante, et on coupait
  le decor au pire moment. Le jugement se fait desormais une fois, sur ce que
  la machine annonce ;
- le logo de Discord reapparaissait juste apres. La derniere etape acceptait
  un element qui existe DEJA pendant le chargement de Discord. Elle exige
  maintenant un signal qui n apparait qu avec l interface reelle, cherche
  l ecran de chargement dans tout le document, et demande deux confirmations
  d affilee.

### Le reste

Les boutons Copier des pages Repaire et Vocal etaient inertes. Electron refuse
la permission presse-papier du web sans gestionnaire explicite, et l appel
restait en attente sans jamais lever -- donc sans message d erreur.

Trois bancs neufs : le laboratoire (81 tests), la boite a outils (102), et le
rendu des quatre nouvelles pages. Ils ont sorti quatre defauts reels : trois
expressions regulieres qui cherchaient deux antislashs la ou il n y en a
qu un, et des dates de certificats lues en heure locale, donc decalees d un
jour selon la machine.

## v200 - Ton groupe existe au-dessus de Discord

### Le repaire

Une bande d amis installe Nexium, et elle a un espace commun qui la suit
partout : un fil, des notes, des liens, des sondages, vos rendez-vous. Dans
n importe quel serveur, sans rien creer et sans rien demander a Discord.

Le point qui compte est ailleurs. Le relais qui transporte tout ca ne peut pas
le lire, et ce n est pas une formule. Le code d invitation fabrique TROIS
choses derivees separement :

- l identifiant du canal, envoye : une empreinte du code ;
- le verificateur, envoye aussi : une AUTRE empreinte, qui prouve qu on
  connait le code sans donner de quoi dechiffrer ;
- la cle AES-GCM, qui ne quitte jamais la machine.

Le serveur ne stocke que du chiffre, avec des dates. Quelqu un qui apprendrait
l identifiant du canal ET le verificateur ne lirait toujours rien.

Ce qu on y met :

- le fil, avec une duree de vie au choix : une heure, un jour, trente jours.
  Ce n est pas un affichage, c est le relais qui efface a l echeance ;
- les epingles, pour ce que le groupe ne doit pas perdre de vue ;
- les sondages : une question, jusqu a six options, et revoter remplace son
  vote au lieu d en ajouter un second ;
- les rendez-vous, avec un compte a rebours partage en haut de la page ;
- les notes et les liens, les liens s ouvrant dans le bac a sable ;
- un compteur de non-lus, qui ne compte jamais tes propres messages, et une
  annonce au maximum par minute -- jamais quand la page est sous tes yeux.

Le repaire reste consultable sans reseau. Quitter n efface que ta machine.

### La ligne de secours

Discord tombe plusieurs fois par an et tout le monde devient muet. Les clients
Nexium, eux, continuent de se joindre : le repaire ne passe pas par Discord.

Le coeur de cette fonction n est pas le bandeau, c est le diagnostic. Annoncer
"Discord est tombe" quand c est la connexion de la personne qui a lache serait
un mensonge. Nexium interroge donc DEUX reseaux sans rapport :

- le relais repond et Discord se tait : la panne est chez Discord ;
- les deux se taisent : c est ta connexion, et le client le dit au lieu
  d accuser Discord ;
- Discord repond : rien ne s affiche.

Une panne se confirme sur deux passages avant de s annoncer. Au calme le
client regarde toutes les trois minutes ; des qu un doute apparait, toutes les
trente secondes.

### Nexium Vocal

Discord connait le serveur qui relaie ta voix, ta latence reelle, le codec, le
debit, les paquets perdus. Il n en montre presque rien.

- le serveur vocal, la region, la latence, les participants et leur etat ;
- son adresse, resolue sur demande seulement : cette resolution apprend a un
  tiers dans quelle region tu parles ;
- la latence sur les deux dernieres minutes, en courbe, avec son seuil ;
- une alerte quand ca se degrade -- apres vingt secondes, pas au premier pic,
  et jamais plus d une toutes les deux minutes ;
- les serveurs par ou Discord t a fait passe, avec leur latence moyenne : de
  quoi savoir si ca hache toujours sur le meme ;
- qui a parle et combien de temps, garde en memoire vive et jamais ecrit sur
  le disque -- c est une trace sur les autres, pas sur soi ;
- un rapport copiable de tout ce que la page a lu ;
- l onglet Clips, qui reprend le moteur du best-of.

Une regle tient toute la page : un champ introuvable est marque introuvable.
Un debit plausible mais invente rendrait tout le reste suspect. Les noms de
methodes de Discord changent a chaque refonte, donc chaque valeur est cherchee
sous plusieurs noms connus, et vaut null si aucun ne repond.

### Copier fonctionne

Les boutons Copier des deux pages neuves etaient inertes. Electron refuse la
permission presse-papier du web sans gestionnaire explicite, et l appel restait
en attente sans jamais lever -- donc sans message d erreur. Le reste du client
passait depuis toujours par le pont de Discord. Il y a maintenant un seul
chemin partage, avec un champ cache en dernier recours, et il rend un booleen :
l interface n annonce plus une copie qui n a pas eu lieu.

### Ce que ca change dans le paquet

Le film d annonce est un plan-sequence : une camera traverse neuf stations et
chaque nouveaute se dessine en arrivant au centre, au lieu d etre racontee. Les
films des versions precedentes sont retires -- une annonce deja vue ne revient
jamais.

Quatre bancs neufs :

- le canal chiffre (91 tests, dont la verification que ni le code, ni le
  texte, ni le pseudo ne partent sur le reseau) ;
- la ligne de secours (35) ;
- le vocal en direct (93, surtout consacres a l absence de donnee) ;
- l annonce (26).

Deux defauts trouves par ces bancs : un nom d hote etait "nettoye" avant
resolution, ce qui en faisait un AUTRE nom qu on interrogeait quand meme ; et
deux serveurs vus dans la meme milliseconde se departageaient par hasard.

## v199 - Le profil ne fait plus tomber le client

### Ce qui tombait, et pourquoi

Ouvrir un profil ou un message prive tuait la fenetre. La trace, relue dans le
journal du client :

    Cannot read properties of undefined (reading 'toUpperCase')
        at o (/assets/web.9669a9bae9e1b3c8.js:62:604682)

A cette colonne exacte, l asset de Discord contient son resolveur de badges :

    function o(e){ let t=l[e]; if(null!=t)return t;
                   let n=i.$[e.toUpperCase()]; ... }

Il est arrive avec le dispositif "2026-08-badge-management" de Discord, et il
resout DESORMAIS chaque badge par son identifiant -- y compris ceux qu ajoute
un client tiers. Le notre n en avait pas : avant, personne ne le lui demandait.

Comme la fonction leve pendant le rendu du profil, l arbre React entier
tombait. Et comme le badge ne s installe que pour les deux developpeurs,
personne d autre ne pouvait le signaler.

Le badge porte maintenant un identifiant, et en mode securise -- apres trois
demarrages rapproches -- il ne s installe plus du tout. Mieux vaut un client
sans badge qu un client qui ne s ouvre plus. Un banc rejoue le resolveur de
Discord sur notre badge : c est la seule facon de savoir qu on ne le refera pas.

### Il demarre avec Windows, et on le verifie

Le reglage disait oui. Le registre de Windows, lui, ne contenait rien -- et le
champ que le lanceur ecrit apres coup etait reste vide. L appel d Electron peut
echouer sans rien dire, et c est ce qu il faisait.

Trois changements. En l absence de choix, le client s installe au demarrage :
un client qu il faut penser a lancer est un client qu on oublie. Ensuite, le
lanceur relit le registre, et si l entree n y est pas, il l ecrit lui-meme --
meme geste, meme endroit, memes droits, sans intermediaire. Enfin il rapporte
par quelle voie ca a marche, pour que la page cesse d afficher "en attente".

### Le best-of entend enfin les autres

Une troisieme voie, et celle-la ne demande rien : Discord JOUE la voix des
autres dans la page. Chaque element qui joue expose son flux. Aucune
permission, aucun peripherique, et surtout aucun aller-retour vers le processus
principal -- c est ce chemin-la qui faisait tomber le client en v195.

Elle passe en premier ; a defaut on retombe sur le bouclage, puis sur le micro.
Et un bouton repond enfin a la question : "qu est-ce qu il peut entendre ici ?"
Trois lignes, une par voie, avec ce que chacune donnerait maintenant.

### Qui est parti, qui a change de nom

Deux choses que Discord sait et ne dit jamais. Une carte garde l empreinte de
ta liste d amis et la compare : elle ne devine pas qui a retire qui -- elle ne
peut pas -- mais elle donne la date, et c est ce qui manquait. Elle note aussi
chaque pseudo qu elle voit changer, avec sa date : trois changements en une
semaine, c est un signal.

La premiere visite ne fait qu enregistrer l etat actuel, et le dit : sans ca,
le client annoncerait au premier lancement que toute la liste vient d arriver.

### L annonce, et les bancs

Chaque version a desormais sa propre animation, faite sous Remotion et
embarquee dans le paquet. Celle-ci DESSINE les quatre nouveautes en quatre
temps -- le profil qui se casse puis tient, Nexium qui vient se poser dans la
barre des taches, les voix separees qui se rassemblent en une seule onde, les
noms qu on raye et ceux qui changent. Un gabarit commun rendrait toutes les
annonces interchangeables, donc invisibles.

Trois bancs neufs : le badge (18 tests, dont le resolveur de Discord recopie a
l identique), le demarrage Windows (18), les amis (28). Le banc du demarrage
laissait par ailleurs passer child_process vers le vrai systeme : il ne s en
servait pas, mais la securite etait accidentelle. Elle est explicite.

## v198 - Le captcha de Discord s affiche enfin

### Une protection qui empechait d entrer chez soi

hcaptcha.com n etait dans aucune liste du garde de sortie. Or celui-ci retire
les cadres et les scripts qui viennent d un hote inconnu, et il est allume par
defaut. La fenetre de verification ne pouvait donc jamais s afficher.

Consequence : impossible de se connecter, de changer de mot de passe, ou de
rejoindre certains serveurs. Et rien ne le disait -- la fenetre restait vide.
C est le blocage le plus couteux qu une protection puisse faire : il
n empeche aucune attaque, il empeche l utilisateur d entrer chez lui.

Les fournisseurs que Discord emploie reellement sont desormais connus du garde :
hCaptcha, plus Arkose Labs et FunCaptcha pour certains parcours d inscription.
google.com n est PAS ajoute pour autant -- ouvrir un domaine aussi large pour un
fournisseur que Discord n utilise pas serait un mauvais echange.

Un faux hote qui ressemble a un captcha, lui, reste bloque : hcaptcha.com.evil
n est pas hcaptcha.com. Huit tests le verifient.

### L onglet Vocal disait quelque chose d incomprehensible

Il affichait "aucun peripherique de bouclage sur cette machine (toutes les voix
de l appel)" et s arretait la. C etait le message d erreur brut d une fonction
interne : il ne disait ni ce qu est un peripherique de bouclage, ni pourquoi il
en faut un, ni quoi faire. Et il arrivait apres coup, alors que la reponse est
connue avant meme d essayer.

C est inverse. La page cherche le peripherique des qu on ouvre l onglet :

- trouve, elle le nomme et dit ce qu il donne ;
- pas trouve, elle dit "pour l instant, le clip ne contiendra que ta voix",
  explique en trois gestes quoi activer dans Windows, rappelle que les moments
  a plusieurs restent reperes de toute facon, et propose de rechercher a
  nouveau.

## v197 - Le best-of enregistre toutes les voix de l appel

### Un autre chemin, qui ne passe pas par la ou ca plantait

La v196 avait retire la capture du son de la machine, parce qu elle passait par
la capture d ecran -- et que ce chemin fait tomber le processus principal de
Discord sur ce paquet.

Il en existe un autre, et il n a rien a voir : un peripherique de BOUCLAGE se
presente au navigateur comme un micro ordinaire. On l ouvre avec le meme appel
que pour un vrai micro, donc avec le meme code, qui lui ne plante pas. Aucune
capture d ecran nulle part, et le client n en demande plus une seule.

### Deux formes, et l ordre compte

- LE CABLE, si la sortie de Discord y est deja routee. Sa sortie ne transporte
  alors que l appel : ni ta musique, ni tes notifications. C est le cas propre.
  Un cable dont Discord ne se sert pas est ignore -- sa sortie serait muette, et
  un clip silencieux est pire que pas de clip.
- LE MIXAGE STEREO de Windows, qui renvoie tout ce que la machine joue. L appel
  est dedans, le reste aussi. Ca marche sans rien installer.

Dans les deux cas, le micro est ouvert EN PLUS et melange : un bouclage ne
contient pas ta propre voix, puisque tu ne t entends pas. Sans ce melange, le
clip aurait toutes les voix sauf la tienne.

S il n y a aucun bouclage, on retombe sur le micro seul, sans rien casser, et
la carte explique en trois lignes quoi activer : le Mixage stereo dans les
parametres de son de Windows, ou VB-CABLE, qui est gratuit et plus propre.

### Ce que le banc verifie

Que le mixage est reconnu meme ecrit avec des accents, qu un cable inutilise
est ecarte, qu un cable qui porte vraiment la sortie de Discord passe avant le
mixage, et qu aucune des deux sources ne touche a la capture d ecran.

## v196 - Le best-of n ecoute plus que le micro

### Ce qui faisait tomber le client

Demarrer le best-of pouvait tuer le client entier. Pas la page : le processus
principal.

    A JavaScript error occurred in the main process
    ReferenceError: _processUtils is not defined

L erreur est dans un module de Discord, pas dans Nexium. Elle se declenche
quand la page demande une capture d ecran : Electron passe alors la main au
processus principal, qui appelle une fonction absente de ce paquet. Rien, du
cote de la page, ne permet de le savoir a l avance -- on ne peut ni la lire,
ni la sonder, ni la corriger.

Deux des trois sources du best-of passaient par la : "le son des autres", qui
demande explicitement un partage d ecran, et "le son de la machine", qui prend
le meme chemin de capture. Les deux sont retirees, et le client ne demande plus
aucune capture d ecran nulle part.

### Ce qui reste

Le micro, et il faut le dire franchement : le clip ne contiendra que ta voix.
La carte l ecrit, et elle explique pourquoi les autres sources ont disparu --
une absence expliquee n est pas la meme chose qu un manque.

Ce que ca ne casse pas, et c est l essentiel : le detecteur des GENS ne lit pas
le son. Il lit qui parle dans Discord. Trois personnes qui se coupent la parole
restent reperees exactement comme avant, et tes propres rires restent un bon
signal -- on rit quand le moment est drole.

### Le temoin a fait son travail

Pose en v195 avant chaque ouverture de source et efface des qu elle repond, il
survit au plantage : au demarrage suivant, la source en cause est mise de cote
et il faut insister pour la reessayer. Il nettoie desormais aussi les temoins
qui designent une source retiree depuis.

## v195 - Le best-of du vocal, le sismographe, les gros fichiers, et tes sons partout

### Le best-of du vocal

Pendant un appel, le client garde les trois dernieres minutes en memoire vive,
et rien d autre. Quand un moment fort arrive, il decoupe autour. Si rien
n arrive, le tampon s efface tout seul en tournant.

Deux detecteurs, et c est ce qui separe le gadget de l outil :

- LE SON. Un rire ne se reconnait pas au volume, il se reconnait a sa cadence :
  son enveloppe oscille entre quatre et huit fois par seconde, c est la
  signature des syllabes. On mesure cette oscillation. Une porte qui claque est
  forte et plate, un ventilateur est module et faible : ni l un ni l autre ne
  passe.
- LES GENS. Discord dit qui parle, gratuitement. Trois personnes qui se coupent
  la parole, c est un moment, meme sans rire.

Chaque voie peut declencher seule si elle est franche. Trois sensibilites.

Le clip fait vingt-trois secondes, dont quatorze AVANT le pic : le rire arrive
apres ce qui l a provoque, et c est ca qu on veut garder. Un bouton en fait une
video avec l onde qui defile, prete a poster.

La voix passe par le moteur natif de Discord, pas par le navigateur : on ne
peut donc pas se brancher sur l appel. Trois sources au choix, decrites dans la
carte, et AUCUNE n ouvre de fenetre toute seule -- celle qui passe par le
partage d ecran est marquee comme telle et se choisit a la main. Par defaut,
le micro : le detecteur social lit qui parle dans Discord, pas dans le son,
donc les moments a plusieurs sont reperes quand meme. Et si une source fait
tomber le client, un temoin survit au plantage : elle est mise de cote au
demarrage suivant, et il faut insister pour la reessayer.

### Le sismographe

Clic droit sur un serveur, "Sante du serveur".

Un serveur ne meurt pas d un coup, et ne se fait pas envahir d un coup non plus :
ca se voit sur une courbe, et personne n a cette courbe. Discord garde ses
statistiques pour les proprietaires de gros serveurs.

Le client, lui, voit passer chaque message. Trois chiffres par jour disent tout : combien de messages, combien de personnes differentes, et quelle
part vient de comptes crees il y a moins d une semaine. Plus un releve du nombre
de membres, une fois par heure.

Cinq verdicts, et aucun avant huit jours d observation : cette communaute
s eteint (deux fois moins de messages ET moins de monde), afflux inhabituel de
comptes neufs (la forme d un raid), le serveur se vide, ca pousse, ou rien
d anormal.

Quarante-cinq jours, quarante serveurs, et on jette le reste : une clef de
stockage qui grossit sans fin finit par couter le demarrage a tout le monde.
Rien n est demande a Discord pour construire cette page.

### Les gros fichiers passent

Tu glisses une video de 200 Mo. Le client la reduit pendant que tu continues a
taper, et l envoi part. Les images passent par le canvas, les videos et les sons
sont rejoues et reencodes -- ca prend le temps du fichier, la carte le dit et
laisse annuler.

Deux regles qui comptent autant que le code. Si tu as deja Nitro, ce module ne
fait RIEN : tu paies pour envoyer gros, ce n est pas a nous de degrader ce que
tu envoies. Et on ne touche jamais a un fichier qui passe deja -- un echec de
compression n avale pas l envoi, le fichier part tel quel avec la raison.

La limite suit le niveau d amelioration du serveur. Trois qualites au choix.

### Le soundboard, partout, sans Nitro

Les sons personnalises de Discord demandent Nitro, et jouer un son d un serveur
dans un autre aussi. C est verifie cote serveur : impossible a contourner
proprement. Donc on ne s en sert pas -- on passe par le micro.

Discord ouvre le peripherique d entree lui-meme : on ne peut pas melanger un son
dans le flux, mais on peut lui dire QUEL peripherique ecouter. C est la porte.

- avec un cable audio virtuel installe, le son part dans le cable, le micro
  bascule dessus le temps du son, et revient exactement ou il etait. Les autres
  n entendent QUE le son. C est propre ;
- avec le mixage stereo de Windows, meme mecanique, mais il renvoie tout ce qui
  sort de la machine. On le dit ;
- sans rien, le son ne joue que pour toi, et la carte explique en trois lignes
  quoi activer. On ne fait pas semblant que ca marche.

Vingt-quatre sons, gardes sur ta machine, et les neuf premiers sur Ctrl+Maj+1
a 9 -- jamais quand le curseur est dans un champ de saisie.

### Un onglet Vocal, dans Nexium Auto

Le best-of et le soundboard ont leur page : l interrupteur, la sensibilite, la
source, l etat reel de chacun, et de quoi ouvrir les deux cartes. Nexium Auto
est le bon endroit -- c est la page de ce que le client fait tout seul.

### L annonce

Une fonction que personne ne trouve n existe pas, mais une fenetre au demarrage
est la mauvaise reponse -- on en a retire six pour cette raison. L annonce du
best-of arrive quand tu RACCROCHES, une fois, jamais deux, et un bouton la
rejoue dans l onglet Vocal. L animation est rendue par Remotion et voyage dans
le paquet : elle marche hors ligne et au premier lancement.

Au passage : le bouton "A quoi ca sert ?", present sur toutes les pages, n avait
aucun nom accessible. Un lecteur d ecran annoncait "bouton", et rien d autre.

### Les bancs

Quatre bancs neufs -- le best-of (77 tests, dont la separation rire/parole sur
des signaux fabriques), le sismographe (29), les gros fichiers (38), le
soundboard (35) -- et une page qui monte les cinq modules dans un vrai
navigateur, ouvre chaque carte, verifie que le film de l annonce se decode et
tourne, et echoue a la moindre erreur.

Au passage : la courbe des comptes neufs etait normalisee sur son propre
maximum, donc 3 % du total se lisait comme une invasion. Elle est desormais a
la meme echelle que les messages.

## v194 - Il lit quand tu le lui donnes, il montre avant d agir, et il sait revenir en arriere

### Resumer un salon, enfin

En v193 on a retire "Resumer ce salon" de la palette : aucun outil ne savait le
faire. Lire un salon n a pourtant jamais ete le probleme -- techniquement c est
une ligne. Ce qui manquait, c est le consentement.

Clic droit sur un message, "Lire ce salon avec Nexium IA". Une fenetre s ouvre
et ne resume pas ce qui va partir : elle le MONTRE. Les cinquante derniers
messages, en clair, deja caviardes par les motifs de Protect, avec leur nombre
de caracteres et le prix. Tu lis, tu decides.

Trois verrous, chacun pour une raison differente :

- une permission, qui n allume rien toute seule et ouvre seulement la
  possibilite
- la fenetre, pour cette lecture-la
- un jeton a usage unique, une minute, un salon. L outil n a aucun parametre :
  il ne choisit pas le salon, il ne peut que prendre celui qu on lui tend. Sans
  jeton il repond qu il n a rien, et explique comment lui en donner un

Par defaut les pseudos des autres deviennent des lettres : ils n ont rien
demande, et le sens se garde tres bien avec A, B et moi. La case se decoche, et
l apercu se met a jour sous tes yeux.

### Voir un lien sans l ouvrir

Le bac a sable existait : le relais va chercher la page, le client l inspecte
sans rien executer, et en tire la chaine de redirections, les formulaires et
leur destination, les scripts tiers, la demande de mot de passe. On ne pouvait
l atteindre qu en collant une adresse dans un onglet de reglages -- a l autre
bout du client par rapport au moment du danger.

Il est maintenant la ou la question se pose : au clic droit sur un message qui
contient un lien, et sur le bandeau de lien bloque, a cote de "Ouvrir quand
meme". La fenetre montre le verdict, le chemin reel etape par etape, ce que la
page contient, ses cinq cents premiers caracteres, et en gros la seule chose
qui compte : est-ce qu elle demande un mot de passe.

Le relais rend aussi l age du domaine, lu dans l annuaire public des registres.
"Enregistre il y a onze jours" en face d une page de connexion Discord se passe
de commentaire. Il se lit cote relais, pour la meme raison que la page :
demander cet age depuis ta machine apprendrait a un tiers quel lien tu examines.

### Le plan avant d agir, et la marche arriere

La confirmation par action existait en mode manuel. Son defaut ne se voit qu a
l usage : elle montre l etape 3 apres que 1 et 2 sont faites. On approuve en
aveugle, sans jamais voir la forme de ce qu on autorise.

L assistant ecrit maintenant la suite complete AVANT que rien ne change. Une
carte, une ligne par etape, avec l outil de chacune. Tu decoches, tu valides
une fois. Le plan REMPLACE les confirmations au lieu de s y ajouter : les
etapes validees s enchainent sans plus rien demander.

Ce qui ne change rien n a jamais besoin de plan, et le mode Auto l emporte :
quelqu un qui a choisi "agis sans me demander" a deja repondu a la question.

Avant chaque modification, le client note le geste exact qui la defait -- pas
un instantane du client entier, le geste. C est plus sur, et ca se raconte :
"le reglage noCanvas remis sur eteint". Dis "annule", ou ouvre "Annuler ce que
l assistant a fait" dans la palette. Tout se defait du plus recent au plus
ancien, seule facon de retomber sur l etat de depart quand deux etapes se
recouvrent. Ce qui ne peut pas se defaire le dit : un message envoye ne se
reprend pas.

### Enqueter sur un auteur

Clic droit sur un message. Trois par deux jours, et le menu affiche le compte
restant plutot que de te le faire decouvrir en tombant dessus.

Les pieces existaient, eparpillees dans six modules : l age d un compte se lit
dans son identifiant, les serveurs en commun sont dans les magasins, le
detecteur garde ce qu il a vu, Protect sait classer un lien, le reseau
communautaire compte les signalements d un hote. Aucune n avait jamais ete
rassemblee en reponse a la seule question qu on se pose : est-ce que je peux
faire confiance a ca ?

Un verdict, une balance chiffree, et DEUX colonnes : ce qui inquiete, et ce qui
rassure. Un rapport qui n aligne que les raisons de se mefier fabrique de la
peur, pas du jugement. Tout est local sauf le nombre de signalements. Et si tu
demandes son avis a l assistant, ce qui part ne contient ni pseudo, ni nom de
serveur, ni identifiant : seulement les faits.

### Repondre, et agir, sans relais

Quatre questions avaient deja une reponse locale. C etait une curiosite, ca
devient une voie. Se repondent maintenant sans un octet de reseau ni un credit :
combien de messages cette semaine, a quoi sert un reglage precis (avec le texte
exact du client, et s il est allume), pourquoi ce bandeau est apparu, combien
d outils il a, combien d enquetes il te reste, ce qu il a change.

Et il AGIT sans relais : "mets le mode economie", "annule". Ca passe par le
meme plan et le meme journal inverse que si le modele l avait demande. La bulle
porte la mention "local" : une reponse gratuite qui se ferait passer pour une
reponse du modele serait un mensonge par omission.

Au passage, la reponse locale sur les credits ignorait les credits offerts,
comme la jauge avant la v193 : elle annoncait zero a quelqu un qui en avait
cinq mille.

### Les bancs

Quatre bancs neufs -- l enquete (38), la lecture consentie (35), le plan (57),
le mode sans relais (45) -- et un passage dans un vrai navigateur qui ouvre
chaque carte, la photographie, et echoue a la moindre erreur de console. Le bac
a sable montre enfin sa fenetre dans son banc, et quatre tests de son chemin
reseau qui echouaient depuis longtemps sur un laconique "analyse impossible"
sont repares : il manquait la cle du relais dans le banc.

## v193 - Il parle anglais, et il ne promet plus ce qu il ne fait pas

### Le detecteur de manipulation ne parlait que francais

Les onze procedes reconnus etaient ecrits en francais : "vite", "je suis du
staff", "viens en mp", "nitro gratuit". Deux miettes d anglais trainaient dans
tout le jeu. Or la plupart des arnaques Discord sont en anglais.

Une protection qui ne se declenche pas sur la langue majoritaire de la
plateforme n est pas une protection. Les onze procedes ont donc appris
l anglais, avec le meme travail que pour le francais : des expressions, pas une
traduction mot a mot.

Un corpus de vingt-huit fils etiquetes accompagne desormais le detecteur --
quatorze tentatives reelles, quatorze conversations ordinaires, dans les deux
langues. Il a trouve six defauts qu on ne voyait pas :

- "ouvrir la console" et "coller dans la console" etaient le meme procede, pese
  46. Demander de l aide pour deboguer declenchait donc une alerte a lui seul.
  Ce sont deux procedes distincts : coller garde 46, ouvrir tombe a 20
- le motif de menace contenait "si tu ne", qui attrape une enorme part du
  francais ordinaire
- "tes parents" et "ton entourage" y figuraient aussi : ce sont des objets, pas
  des menaces. "Tu appelles tes parents ce soir ?" scorait 30
- "on se voit" et "tu fais quoi la" comptaient comme de l intimite trop rapide.
  C est ce que deux amis s ecrivent
- "depeche" ne reconnaissait pas "depecher" ni "depechez"
- un fil de chantage pur ne franchissait jamais le seuil : la menace ne compte
  qu une fois, et elle pese 30. La menace CONDITIONNELLE -- "si tu ne reponds
  pas, je publie" -- est devenue un procede a part

Resultat mesure sur le corpus : quatorze tentatives sur quatorze reperees,
quatorze conversations ordinaires sur quatorze restees silencieuses, en
francais comme en anglais. Avant, aucune des huit tentatives anglaises n etait
vue.

### Quatre choses que le client annoncait sans les faire

- Le mode economie ne s allumait jamais. L assistant appelait la fonction de
  reglage avec un seul argument au lieu de deux : rien ne changeait, et il
  annoncait quand meme l avoir fait. Le test qui couvrait ce cas copiait la
  signature fausse -- il verifie maintenant que le mode a bascule
- Les jetons mfa. partaient en clair. Le caviardage ne reconnaissait que
  le jeton Discord en trois parties ; celui des comptes a double
  authentification -- la majorite -- passait intact. Ajoutes avec les cles d API
  courantes, les en-tetes colles dans un message et les IBAN
- La palette proposait "Resumer ce salon", qu aucun outil ne sait faire.
  L utilisateur payait des credits pour un refus, sur une entree que le client
  lui avait proposee. Remplacee par ce qu il sait reellement faire : analyser
  une conversation privee que tu choisis
- La jauge de credits ignorait les credits offerts. Elle montrait le quota
  des sept heures, donc zero en rouge des qu il etait consomme, meme avec des
  milliers de credits en reserve et un assistant qui repondait normalement. Un
  geste commercial qui affiche zero en rouge dit le contraire de ce qu il
  voulait dire

### Nexium IA 2.0 se laisse enfin comprendre

La page disait ce que chaque fonction COUTE, jamais comment on s en sert.
Cocher "le compte rendu vocal" fait apparaitre une carte avec un bouton plus
bas dans la page : rien ne le disait, donc personne ne la trouvait.

- chaque fonction porte maintenant une ligne de plus, qui dit le geste : ce
  qu il reste a faire apres avoir coche, et ou
- celles qui ne demandent rien le disent aussi. "Rien a faire ensuite" est une
  reponse, et c est celle de trois fonctions sur cinq
- sous l interrupteur, une ligne rappelle que les fonctions marquees "a la
  demande" ne partent jamais seules et font apparaitre leur propre carte

Et une description mentait : le compte rendu vocal annoncait qu il "transcrit
un salon vocal", alors que le module s en defend explicitement et n embarque
aucun moteur de transcription. Elle dit maintenant ce qu il fait vraiment --
qui est arrive, qui a parle et combien de temps, et ce qui a ete ecrit.

### Trois outils de plus, sur des donnees que le client comptait deja

- expliquer un reglage : le client garde un texte exact pour chacun de ses
  reglages, mais il etait enferme dans la portee des pages. L assistant pouvait
  donc allumer une protection sans savoir dire ce qu elle fait. Il le lit
  maintenant, au lieu de le deviner a partir du nom
- l alerte de manipulation : le detecteur sait quels procedes il a reconnus
  et ce que chacun cherchait a obtenir. A "pourquoi ce bandeau ?", l assistant
  ne pouvait repondre qu en general. Il rend le score, le seuil et les procedes
  -- jamais un message, jamais un pseudo, jamais un identifiant de salon
- ma semaine : les totaux depuis toujours existaient deja. Personne ne
  demande "combien de messages en tout", on demande "et cette semaine ?"

### L assistant se reprend, et connait ses limites

- un appel d outil malforme par le modele est rejoue une fois avant de rendre
  l erreur. C est transitoire, et c est l utilisateur qui payait le tour rate
- "reglage inconnu : cleanLinks" ne disait pas quoi faire. L erreur rend
  maintenant les cles qui existent
- sa consigne nomme ce qu il ne peut pas faire : lire un salon, lire un
  serveur, envoyer sans l acces d envoi, lire un fichier, naviguer sur le web.
  Il le disait de lui-meme la plupart du temps ; rien ne le garantissait

### Les bancs

- le detecteur de manipulation a le sien, avec son corpus de vingt-huit fils
- l ecran d ouverture a le sien : quatorze tests, qui verifient les trois
  regles annoncees en v191 -- aucune animation ne part d une opacite nulle,
  rien de ce qui bouge n est en SVG, tout le mouvement est derriere la classe
  posee au premier battement reellement peint
- la page de Nexium IA monte desormais les modules 2.0, donc l onglet 2.0 est
  verifie a chaque passage

## v192 - Il repere les arnaques qui n ont pas de lien

### Le detecteur de manipulation

Nexium Protect examinait des adresses. Il ne voyait rien quand quelqu un
manipule en francais correct sans jamais coller de lien -- et c est la
plupart des arnaques qui font mal : le faux support qui reclame ton code a
six chiffres, le vendeur qui veut etre paye en PayPal entre amis, celui qui
te fait coller un code dans la console.

Ce detecteur lit la FORME de l echange, pas son contenu :

- onze procedes reconnus : urgence fabriquee, autorite revendiquee, mise a
  l ecart, dette inventee, appat, demande de donnees, paiement difficile a
  annuler, menace, intimite trop rapide, installation demandee, et le code
  a coller dans la console
- une meme tactique ne compte qu une fois : repeter "vite" cinq fois ne
  declenche rien
- deux procedes distincts dans un meme fil pesent plus que leur somme. Un
  procede isole se defend -- un collegue presse ecrit "depeche toi". Deux,
  beaucoup moins
- "colle ca dans la console" alerte a lui seul : il n existe aucune raison
  honnete de demander ca, et c est comme ca qu un jeton part

Le calcul est entierement local. Des expressions, des compteurs, aucune
requete : il marche pour tout le monde, gratuitement, hors ligne, et il ne
coute rien au relais. Il n examine que les messages prives, et jamais ceux
d un ami -- Discord sait qui sont tes amis, on lui demande.

Verifie sur six vraies tentatives et cinq conversations ordinaires : les six
sont reperees, les cinq restent silencieuses. Un detecteur qui crie au loup
est desinstalle dans la semaine.

### Nexium IA 2.0, en essai

Un assistant qui connait ton monde, qui regarde de lui-meme, et qui ecrit
dans ta facon d ecrire. Les trois coutent du relais : cette branche est donc
reservee au niveau 2 et au-dessus, elle s allume a la main, et elle se
referme d elle-meme si l abonnement s arrete.

Cinq fonctions, cinq cases, et chaque case dit ce qu elle coute :

- le contexte : l assistant sait quels serveurs tu frequentes, a quelle
  heure tu vis et de quoi tu parles, au lieu de repartir de zero a chaque
  question. Il n observe rien de neuf -- il assemble ce que Nexium Stats
  compte deja. Gratuit
- le detecteur de manipulation, ci-dessus. Gratuit
- l IA qui veille : elle regarde d elle-meme et ne parle que quand ca
  compte. Regarder ne coute rien ; un seul appel par jour au maximum
- le repondant : il apprend ta facon d ecrire et propose des brouillons
  dans ton registre. A la demande
- le compte rendu vocal : ce qui s est passe dans une vocale que tu as
  ratee. A la demande

Le budget est la piece maitresse. Une fonction que tu declenches se paye sur
ton quota habituel, comme avant. Une fonction AUTOMATIQUE a son propre
plafond quotidien, plus bas, reglable jusqu a zero : a zero, la veille
continue de regarder et de te prevenir, mais elle n appelle jamais le relais.

Et la page montre le texte exact qui partirait avec tes questions, tel quel,
avec son compteur de caracteres. Une case "envoyer mon contexte" qu on ne
peut pas relire ne se coche pas de bonne foi.

### Ce qui regarde ne coute rien

La veille lit des compteurs que le client tient deja : les fils signales, le
plancher de version, les tickets non lus, le rythme de la semaine. Aucune
requete pour decider s il y a quelque chose a dire.

Presque rien ne merite un appel. "Tu as trois tickets avec une reponse" est
une phrase que le client sait ecrire seul : trois des quatre situations
surveillees donnent un avis purement local. Une seule merite du langage --
une conversation que le detecteur a signalee et a laquelle tu as repondu
quand meme, parce que la le bandeau est deja passe et il n a pas suffi.

Elle n envoie jamais le contenu d un message : ce qui part, c est le nom des
procedes reperes. La demande fait six cents caracteres, aucune conversation
privee ne quitte la machine, et rien de ce qu un inconnu a ecrit n entre
dans la consigne du modele -- envoyer le message lui-meme, ce serait laisser
l arnaqueur ecrire dans le prompt.

### Le repondant

Un assistant qui propose "Bonjour, je vous remercie de votre message" a
quelqu un qui ecrit "slt jsp tkt" ne sert a rien.

Le profil de style se construit tout seul, au fil de l eau, sur les messages
que tu ecris toi : longueur habituelle, majuscules, accents, points, emojis,
abreviations, tutoiement. Une quinzaine de nombres et huit de tes phrases
courtes, gardes sur ta machine, effacables d un bouton. Aucune requete.

La page montre en toutes lettres ce qu il croit savoir de toi. Une fonction
qui apprend sans montrer ce qu elle a appris ne merite pas qu on la laisse
tourner.

Le brouillon, lui, est demande : il se paye sur ton quota habituel, jamais
sur le budget automatique. Et il ne s envoie pas tout seul -- il se copie,
c est toi qui colles.

### Le compte rendu vocal, sans enregistrer personne

Il n enregistre aucune voix et il ne transcrit rien. Ce n est pas un oubli :

- enregistrer une conversation privee sans l accord de ceux qui y
  participent n est pas une option a cocher
- aucun moteur de transcription n existe dans ce client, et en embarquer un
  voudrait dire telecharger des dizaines de mega-octets de modele puis le
  faire tourner en continu : la fin des petites machines
- envoyer l audio a un service de transcription coute, par minute de parole,
  un ordre de grandeur de plus que tout le reste

A la place il repond a la vraie question -- "j ai rate la vocale, il s est
passe quoi ?" -- en notant ce que Discord montre deja a tout le monde : qui
est arrive, qui est parti, qui a parle et combien de temps, et ce qui a ete
ECRIT dans le salon pendant l appel. Un echantillon toutes les deux
secondes, sur la machine, pour rien.

Et il s annonce. Le message part dans le salon AVANT que le releve commence,
et si l annonce ne part pas, le releve ne commence pas. Ce n est pas un
reglage : c est la condition.

### Une case par outil

Sept permissions commandaient trente-sept outils. Accorder "Lire l etat du
client" en ouvrait dix-huit d un coup, dont le coffre de comptes, le journal
de traque et l audit de confidentialite.

Les trente-sept sont maintenant listes, chacun avec sa case, groupes par
permission. Sept d entre eux n etaient affiches nulle part : ceux qui ne
dependent d aucune permission -- les listes de taches, la memoire des
preferences, le catalogue d outils.

La hierarchie se lit dans un sens et un seul : la permission dit le domaine,
la case dit l exception. Une permission fermee ferme tous ses outils ; on ne
peut pas ouvrir un outil sous une permission fermee.

Decocher interdit vraiment. L outil ne part meme pas dans la liste envoyee
au modele, et un second verrou refuse son execution s il etait appele quand
meme. Moins d outils proposes, c est aussi une demande plus petite -- donc
moins de jetons a chaque question.

### Le fil de conversation, refait

Chaque message etait une bande pleine largeur separee de la suivante par un
filet, avec un avatar de vingt-huit pixels et un nom en gras. On lisait un
journal d evenements, pas une conversation -- et la reponse etait indentee
derriere la colonne de l avatar, ce qui lui retirait quarante-trois pixels
de largeur de lecture sur toute sa hauteur.

- ce que tu ecris part a droite, dans une bulle fermee et bornee
- ce que l assistant repond reste a gauche, sans bulle, sur toute la largeur
- l asymetrie dit qui parle : le nom ne s ecrit plus a chaque tour
- les tours sont separes par du vide, pas par un trait
- la reponse s ecrit a la meme encre que ta question. L ecrire plus pale que
  ce qu on a tape soi-meme et qu on ne relit jamais etait a l envers

Le composeur est plus haut, plus rond, et son bouton d envoi se remplit des
qu il y a quelque chose a envoyer.

### Les couleurs du client etaient invisibles

_NXteinte(couleur, alpha) divise l alpha par cent : l argument est un
pourcentage. Quatre-vingt-six appels l ecrivaient en fraction.
_NXteinte(P.mauve, .3) rendait donc trois millemes d opacite au lieu de
trente pour cent. Mesure dans le navigateur, pas suppose : la bordure de la
marque de l assistant sortait a rgba(199,162,238,0.004).

Ce n etait pas un choix. Multipliees par cent, les quatre-vingt-six valeurs
tombent exactement sur le meme jeu que les vingt-huit appels deja corrects :
6, 7, 12, 13, 22, 24, 26, 28, 30, 34, 40. Deux manieres d ecrire la meme
intention, dont une seule marchait.

Les anneaux du tableau de bord, les bordures des cartes de protection, la
rosace derriere le medaillon d abonnement et les pastilles teintees
reapparaissent.

### Une seule fenetre a la fois

A la premiere ouverture, six ecrans pouvaient s afficher ensemble : accueil,
nouvelle generation, annonce de version, ecran de version, mise a jour, fete
d abonnement. On fermait tout sans rien lire -- et on apprenait a fermer les
fenetres de Nexium sans regarder.

Un arbitre laisse passer un ecran, puis impose deux secondes et demie de
repos. A la premiere ouverture, seul l ecran de bienvenue reste : les
annonces des versions precedentes sont marquees comme vues plutot que
rejouees.

### Faire servir ce qui est construit

Une fonction que personne ne trouve n existe pas. Deux leviers, et aucun des
deux n est une annonce au demarrage :

- le point neuf : une entree des reglages qui a change recemment et ou
  tu n es pas repasse porte un point. Il part a la premiere visite, pour
  toujours
- l invitation meritee : une fonction ne se propose qu au moment ou elle
  AURAIT AGI, en disant ce qu elle aurait fait. Quand le detecteur signale
  une conversation et que la branche 2.0 est fermee, il propose de l ouvrir

Trois bornes, parce qu un bon mecanisme d adoption devient une nuisance
exactement comme les autres : une invitation par session, deux fois en tout
pour une fonction donnee, et un refus est definitif. Pas "plus tard" :
jamais. Et jamais a quelqu un qui n y a pas droit -- proposer l inaccessible
serait une publicite, pas une invitation.

## v191 - Un client qui se laisse comprendre

### A quoi ca sert ?

Chaque page porte un bouton qui deplie trois reponses courtes : ce que la
page fait, ce que ca change sur cette machine, et ce que ca ne fait jamais.
La troisieme est la plus utile -- elle dit ou s arrete le client. Dix-sept
pages y repondent, ecrites au meme endroit pour qu on les relise d affilee.

### L ecran d ouverture, refait

Il garde ses cinq etapes reelles, mais il montre desormais l avancement :

- une jauge qui avance par echelle, jamais par largeur : une largeur
  declenche une mise en page, une echelle reste sur la couche de composition
- cinq jalons, un cadran a deux anneaux contrarotatifs, un point en orbite
- l avancement gagne un peu de terrain pendant l attente, sans depasser le
  palier suivant : un ecran fige se lit comme un ecran bloque
- passe six secondes, il dit qu on peut cliquer pour passer

Deux cent trente images par seconde au banc. Sous quarante-cinq il se calme,
sous vingt-quatre le decor mobile part et seul ce qui informe reste.

### Les reglages, reorganises

Six sections courtes au lieu de cinq longues, aucune au-dela de six entrees,
et l abonnement a la sienne, en deuxieme position. Trois titres disent
quelque chose : l abonnement affiche l echeance quand elle approche, le
support le nombre de fils ouverts, la mise a jour qu une version attend.

### Nexium Abonnement, refait

La page repondait par des niveaux. Elle repond maintenant par une carte.

- Trois tours -- Protect, Privacy, IA -- quatre etages chacune : ce qui est
  ouvert est eclaire, le reste porte un cadenas.
- Choisir une offre allume en pointille les etages qu elle ouvrirait, et une
  phrase dit combien : les douze offres s essaient sans rien acheter.
- Les trois offres generales sont trois colonnes hautes : meme liste de
  lignes, prix en grand, prix par jour, et un ruban sur celle du milieu.
- Le nombre de paliers fermes est affiche tel quel : c est exactement ce
  qu un abonnement ouvre.

### La celebration

Quand une offre apparait sur le compte -- offerte ou payee -- une carte
s ouvre : le nom, ce que ca ouvre, l echeance. Eclat, roue de rayons, ondes,
lisere tournant, sillage sur le titre, confettis qui tombent et etincelles
qui montent. Elle ne fete que ce qui vient d apparaitre, jamais la premiere
fois qu on regarde -- sinon tout le monde recevrait des confettis le jour de
la mise a jour. Les particules sont retirees six secondes plus tard :
soixante-et-onze animations tombent a vingt-deux.

### La mise a jour donne envie

L invitation disait "une nouvelle version est prete" et rien d autre. Elle
montre maintenant ce que la version apporte -- les vraies lignes du changelog
publie -- et ce que ca coute : un redemarrage, quelques secondes, les
reglages conserves. Le flou plein ecran a disparu.

### Le support, cote aspect

Le fil est devenu une conversation : figures d auteur, messages consecutifs
groupes, separateurs de jour, heures. La liste est passee en cartes a rail
colore, et les quatre motifs portent enfin leurs icones.

### Nexium demarre avec Windows, pour de vrai

La page decrivait un raccourci que l installateur etait cense poser. Mesure
faite : il n y en avait aucun, ni dans le dossier Demarrage, ni dans la cle
Run. Le reglage etait un texte, pas une fonction.

C est maintenant un interrupteur. La page n a pas acces au disque ; le
lanceur, lui, a l API Electron qui ecrit l entree de session. La page lui
parle par le fichier de reglages, qu il surveille pendant la session : cocher
la case agit tout de suite, sans redemarrer.

- L entree est posee au nom de ton compte seulement, jamais comme service
- Le lanceur relit ce que Windows a REELLEMENT retenu et le renvoie a la
  page : elle affiche un fait verifie, pas une intention
- Si Windows refuse -- strategie de groupe, antivirus -- la page le dit
- Une option pour demarrer reduit dans la barre des taches
- Le dossier des reglages suit la marque interne du client : le lanceur ne
  devine plus de nom, il examine ceux qui portent la bonne structure
- Vingt-neuf essais couvrent la chaine, y compris le cas ou Windows refuse

### Les icones

Les soixante-quatorze icones etaient pleines, dans le gout des bibliotheques
courantes ; tout le reste du client est au trait fin. Elles sont redessinees
sur la meme grille, avec une seconde couche de detail sur la moitie d entre
elles : l echo interieur d un bouclier, l iris d un oeil, les graduations
d une horloge. Les seize icones de la colonne lisent la meme planche.

L epaisseur, elle, etait a l envers. Exprimee sur une grille de vingt-quatre,
elle vaut a l ecran epaisseur fois taille divisee par vingt-quatre : les
petites icones, celles qu on voit partout, recevaient 0,72 pixel de trait a
douze pixels, les grandes 2,22. Sous un pixel, un trait se devine en gris au
lieu de se dessiner. Elle compense maintenant la taille, pour un trait
constant de 1,75 pixel partout -- et huit dessins trop charges pour un trait
gras ont perdu un element : une puce reste une puce avec quatre pattes.

### Ce qui ne rame plus

Trois animations redessinaient au lieu de composer. Invisibles sur une bonne
machine, et exactement ce qui fait ramer un petit portable : un flou anime
sur le titre de chaque page, recalcule a chaque image sur toute la surface du
texte ; une ombre portee qui pulsait en boucle sans fin ; un fond en degrade
qui se deplacait en boucle, repeignant son element a chaque image. Les trois
font la meme chose a l oeil avec les deux seules proprietes que le
compositeur traite seul, et le reflet de l ecran d accueil s arrete apres
trois passages.

Le mode economie, enfin, ne decide plus sur une fiche technique. Le nombre de
coeurs annonce est une promesse ; les images comptees au demarrage sont une
mesure, et elle passe devant, dans les deux sens.

## v190 - Abonnements, tickets, et un client qui s ouvre sur quelque chose

Cette version rassemble le travail des versions 185 a 190. Elle apporte trois
choses neuves -- un ecran d ouverture, un systeme d abonnements, un support par
tickets -- et reprend l esthetique de toutes les pages.

### Le client s ouvre sur quelque chose

Un ecran couvre Discord pendant qu il se prepare : le monogramme, une ligne de
lecture technique, et les cinq etapes reelles du demarrage. La barre n avance
pas sur une minuterie, elle avance sur des faits observes -- le document est
pret, le point de montage existe, il a du contenu, l ecran de chargement de
Discord a disparu, l ossature est en place.

Trois defauts trouves et corriges, chacun mesure avant d y toucher :

- L ecran etait pose puis DEPLACE dans le corps du document, ce qui redemarre
  toutes les animations CSS : elles repartaient de zero au milieu du demarrage.
  Il attend maintenant le corps, et ne bouge plus.
- L arc qui tourne etait un element SVG, et Chromium calcule ces animations sur
  le fil principal -- celui que Discord occupe pour monter son interface. L arc
  se figeait donc exactement a la fin. Le mouvement a quitte le SVG.
- Une trame animee plein ecran et trois nappes floues redessinaient une image
  complete a chaque rafraichissement. Il ne reste que des transformations.

Regle qui en decoule, verifiee par quarante-cinq tests : aucune animation de
cet ecran ne passe par un etat invisible. Fige, il reste entierement lisible.
Il mesure sa propre fluidite et se calme tout seul sous quarante-cinq images
par seconde -- ce qui compte sur un client qui tourne sans carte graphique.

### Les abonnements

Trois offres generales -- Nexium Plus, Pro et Ultra -- et neuf offres par
module a partir d un euro : Nexium IA Plus, Pro et Ultra ; Privacy One, One +
et Extra One ; Security One, One + et Extra One.

- Les comptes connus du serveur AVANT cette version gardent tout, a vie. La
  comparaison se fait en base, entre leur date de premiere venue et la date de
  bascule : rien dans le client ne peut la changer.
- Les administrateurs ne sont pas concernes par les limites.
- Un nouvel utilisateur sans abonnement garde le socle protecteur : liens
  dangereux, hameconnage, fichiers pieges, garde console, coffre anti-vol,
  telemetrie de base. Personne n est jamais moins protege qu avec un Discord
  nu.
- Une page Abonnement dit exactement ce que le compte ouvre, domaine par
  domaine, avec les echeances et les jours restants.

Sur la question du contournement, la reponse est honnete : le fichier du client
est sur la machine de l utilisateur. Deux choses limitent la portee d une
modification. Un reglage verrouille trouve actif est remis au repos au
demarrage, a chaque ouverture de la page concernee, et toutes les cinq minutes.
Et pour Nexium IA, la limite est appliquee par le relais, qui ne repond pas
au-dela du niveau du compte quoi que fasse le client.

### Le support par tickets

Une page Support : tu ouvres un fil, l equipe repond dedans. Les demandes
d abonnement passent par la, avec l offre deja renseignee.

- Un vrai fil, en direct des deux cotes. Le canal de diffusion ne transporte
  qu un signal : jamais le contenu. Chaque cote, prevenu, relit le fil par la
  fonction qui verifie ses droits.
- L acces repose sur un jeton remis a l ouverture, garde sur la machine. Un
  identifiant Discord ne suffit pas a lire le ticket de quelqu un d autre.
- Cote administration, un onglet Tickets avec la file, les etats, et un
  raccourci qui pose l abonnement demande sans quitter le fil.
- Un ticket disparait quinze jours apres son dernier message.

### Le bac a sable, repare

Il ne pouvait pas fonctionner : depuis Discord, lire une page d un autre
domaine est refuse par le navigateur avant meme que la requete parte. Un relais
va la chercher a la place du client.

- La chaine de redirections est affichee : un lien raccourci ne cache plus rien
- Le site inspecte ne voit ni l adresse IP ni le navigateur de l utilisateur
- Les en-tetes de securite de la page sont rapportees
- Les adresses du reseau local sont refusees, y compris apres redirection

### Protect parle moins, protege pareil

Ecrire a quelqu un declenchait une suite de bandeaux. Une conversation peut
etre marquee de confiance, et un mode discret coupe les avis d ambiance
partout. Ce qui est dangereux reste bloque dans les deux cas, et le code a
coller dans la console se dit toujours.

### Nexium IA

Le fil est devenu une colonne unique : une rangee pleine largeur par tour, le
texte sur une colonne de lecture fixe, une figure et un nom pour chaque
interlocuteur. Le panneau flottant s etire par une poignee et retient sa
taille. Des credits peuvent etre offerts a un compte : ils sont depenses avant
le quota, et rendus si la demande echoue.

### L administration

- Offrir des credits Nexium IA a un compte
- Bannir par compte, appareil ou installation, pour une duree ou definitivement
- La session ne se coupe plus : le jeton se renouvelle une minute avant
  l echeance, et une requete refusee pour jeton perime est rejouee une fois
- Les utilisateurs, avec leur derniere venue, leur version, leurs credits
- Rediger une alerte avec Nexium IA : une note en vrac devient un titre et un
  resume, qu un humain relit avant publication
- Les alertes de panne arrivent en une seconde au lieu de deux minutes

### Une seule esthetique

Soixante-dix icones partagees avec leurs animations de survol, une entete
commune a quinze pages, une barre d onglets unique -- neuf barres presque
identiques ont disparu. Tuiles, jauges en arc, courbes tracees au montage,
barres qui poussent, notes colorees, boutons et champs sont desormais des
briques communes.

Tout ce mouvement s efface si le systeme demande moins d animation, ou si le
mode economie est actif : les pages rendent alors exactement la meme chose,
immobile.

### Le reste

- Nexium Auto sait envoyer des messages : dans le salon declencheur, dans un
  salon nomme, ou en message prive. Coupe par defaut, plafonne a six envois par
  heure, et journalise qu il reussisse ou non
- Nexium Sponsor montre ses quatre emplacements tels qu ils apparaissent,
  places libres comprises, avec six avantages dont chacun dit s il est
  automatique ou pose a la main
- Nexium Team n affiche plus l ecoute Spotify
- Nexium Donnees remonte dans la section principale
- Nexium Labo est retire ; son unique essai devient un reglage de Nexium Music
- L accueil : constellation des huit modules, quatre jauges, courbe des
  vingt-quatre heures, et les reglages de demarrage et de mouvement

## v185 - Un ecran d ouverture, et une seule esthetique

### Le client s ouvre sur quelque chose

Un ecran couvre desormais Discord pendant qu il se prepare : le logo, une
barre, et le nom de l etape en cours. La barre n avance pas sur une minuterie
mais sur des faits observes -- le document est pret, le point de montage
existe, il a du contenu, l ecran de chargement de Discord a disparu, l ossature
est en place.

Il s efface une fois et demie apres que le client soit reellement la, pas
avant : la fenetre de Discord n est affichee qu a ce moment-la, et l ancien
compte a rebours partait du chargement du script. Une borne dure de douze
secondes retire l ecran quoi qu il arrive.

Une regle en est sortie, verifiee par vingt-neuf tests : aucune animation de
cet ecran ne passe par un etat invisible. Chromium gele la ligne de temps des
animations tant que la fenetre n a pas ete peinte ; un contenu qui part de
opacity:0 reste donc invisible pour toujours. L etat de repos est l etat
visible, et le mouvement n est ajoute qu a la premiere image reellement peinte.

L animation se coupe depuis l accueil, et se rejoue sans redemarrer.

### Nexium Admin : donner, bannir, rester connecte

- Offrir des credits Nexium IA a un compte. Ils sont depenses avant le
  quota des sept heures, et rendus si la demande echoue -- le relais a ete
  repris pour cela.
- Bannir depuis le client, par compte, par appareil ou par installation,
  pour une duree ou definitivement. Le client interroge maintenant deux
  sources : le fichier du depot et cette table. Un bannissement definitif
  reste reserve au proprietaire.
- La session ne se coupe plus. Le jeton de renouvellement est garde et
  rejoue une minute avant l echeance ; une requete refusee pour cause de jeton
  perime est relancee une fois. Le stockage est brouille avec l identifiant
  d installation -- ce n est pas du chiffrement, et la page le dit.
- Les utilisateurs, avec leur derniere venue, leur version, leurs credits
  et leur etat de bannissement. Chercher, offrir, bannir depuis la fiche.
- Rediger une alerte avec Nexium IA : une note jetee en vrac devient un
  titre, un resume et un niveau. Le modele propose, un humain relit.
- Cinq onglets, un journal d audit qui dit qui a fait quoi.

### Les alertes arrivent en une seconde

La table des alertes est diffusee en direct : une alerte ouverte n attend plus
deux minutes. Le sondage reste en place comme filet, a trente secondes au lieu
de cent vingt, et la liaison se rattrape toute seule si elle tombe.

Le bandeau a ete redessine : pastille coloree par niveau, etat, anciennete,
les deux dernieres mises a jour de l incident, et une pile derriere quand il y
en a plusieurs. Deux boutons de plus : Expliquer ouvre Nexium IA avec la
question deja posee, Plus tard repousse de deux heures.

### Une seule esthetique, partout

- Un jeu de soixante-dix icones partage par toutes les pages, avec leurs
  animations de survol : elles tournent, penchent, sautent ou tremblent selon
  ce qu elles designent.
- Une entete commune : blason anime, anneaux concentriques, chiffres clefs.
  Quinze pages en heritent d un coup.
- Une barre d onglets commune, avec son trait qui glisse, ses icones et ses
  pastilles de compte. Neuf barres presque identiques ont disparu.
- Des briques partagees : tuiles, jauges en arc, courbes tracees au montage,
  barres qui poussent, notes colorees, boutons, champs.
- Tout ce mouvement s efface si le systeme demande moins d animation, ou si le
  mode economie est actif. Les pages rendent alors exactement la meme chose,
  immobile.

### Nexium IA ressemble a ce qu on attend d un chat

Le fil est devenu une colonne unique : une rangee pleine largeur par tour, le
texte sur une colonne de lecture fixe, une figure et un nom pour chaque
interlocuteur. Plus de bulle a droite d un cote et de filet a gauche de l
autre. Le composeur est pose sur le fil, arrondi, avec un degrade qui evite la
coupe nette. Le fil vide propose trois pistes, tirees de l etat reel du client.

### Nexium Auto sait envoyer des messages

Trois actions nouvelles, qui portent le moteur a 25 actions : repondre dans le salon qui a declenche la regle,
ecrire dans un salon nomme, envoyer un message prive. C est la seule chose que
le moteur fait qui parle a quelqu un d autre : elle est donc coupee par
defaut, plafonnee (six envois par heure, vingt-cinq secondes entre deux), et
inscrite au journal qu elle reussisse ou non. Un onglet Envoi montre ce qui est
autorise, ce qui a ete envoye dans l heure, et quelles regles peuvent parler.

### Le reste

- Nexium Sponsor : quatre emplacements montres tels qu ils apparaissent,
  places libres comprises. Six avantages, chacun avec ce qu il est vraiment --
  automatique, ou pose a la main. Trois formules, quatre etapes, six questions.
  Aucun serveur Discord a rejoindre : tout passe par message prive.
- Nexium Team : l ecoute Spotify n est plus affichee. Le reste de l
  activite l est toujours.
- Nexium Donnees remonte dans la section Nexium, juste apres Comptes.
- L accueil : constellation des huit modules, quatre jauges en arc, courbe
  et barres des vingt-quatre heures, tuiles groupees, et les reglages de
  demarrage et de mouvement.
- Nexium Labo est retire. Son unique essai -- l onde detaillee du lecteur
  -- devient un reglage normal de Nexium Music.

## v184 - La page d accueil, illustree

### Une vraie illustration, et qui dit quelque chose

L accueil n avait pour image qu un halo rond derriere le titre. Il porte
maintenant un blason dessine : les memes anneaux concentriques que Privacy et
Protect, un bouclier au centre, et une orbite ou chaque point est un module du
client. Les points s allument selon l etat reel, et l arc mesure la part des
modules qui tournent. Ce n est pas un decor : c est une lecture de plus.

### Les tuiles, groupees et colorees

Dix tuiles identiques, la meme icone grise dans la meme boite grise, ne se
distinguaient que par leur texte.

- Trois groupes selon l intention : te proteger, comprendre ton client,
  t aider au quotidien
- Chaque module porte sa couleur, sur son icone comme sur son chiffre
- Un chiffre a zero reste discret, un chiffre qui compte ressort
- Nexium Comptes et Mise a jour rejoignent la grille : ils en etaient absents

### Ce qui manquait

- La courbe des vingt-quatre dernieres heures. Les donnees existaient dans
  Privacy sans etre montrees ici
- Trois actions rapides : demander a l assistant, verifier un lien, chercher
  une mise a jour
- Le journal des interventions porte une date quand l evenement n est pas du
  jour, comme sur la page des mises a jour

### Sur l optimisation

Mesure faite avant d y toucher, et elle ne dit pas ce qu on esperait : les
trente-sept minuteries permanentes du client coutent 0,0 ms de processeur sur
trois secondes, et la boucle d observation du DOM traite quatre cent mille
noeuds en 1,6 ms. Les ecritures disque sont deja groupees toutes les trois
secondes et differees au repos. Les vingt-quatre abonnements aux modules se
desabonnent tous, et les dix-huit pages ont toutes leur garde-fou de rendu.

Aucun changement d optimisation n a donc ete fait : il n y avait pas de gras a
retirer, et en ajouter un qui ne gagne rien aurait ete du decor.

## v183 - Nexium Comptes, largement etendu

### Les profils de reglages

Un compte de travail et un compte perso n ont pas les memes reglages. Un
profil est une photographie complete du client -- protections, apparence,
automatisations, confidentialite -- que l on capture sous un nom et que l on
retrouve d un clic.

- Capturer, appliquer, mettre a jour, renommer, supprimer
- Exporter un profil en texte, et en importer un : de quoi retrouver sa
  configuration sur une autre machine
- Lier un profil a un compte : il s applique tout seul apres la bascule
- Aucun secret n y entre. Ni jeton, ni coffre, ni phrase. C est pour cela
  qu un profil vit en clair et reste lisible coffre ferme
- A l import, toute cle qui ne commence pas par nexium_ est ecartee, ainsi
  que le coffre et le coffre-fort : un profil recu ne peut rien glisser
  d autre que des reglages

### Le coffre, enfin administrable

- Changer la phrase. C etait impossible : il fallait tout effacer et
  recommencer. Le coffre est rechiffre sur place, sans rien perdre, et
  l ancienne phrase est verifiee avant
- Verrouillage automatique apres un delai sans activite -- cinq minutes a une
  heure, ou jamais. Un coffre ouvert toute la soiree annule l interet de la
  phrase
- Copie de secours : le coffre s exporte, chiffre, et se remet en place. Un
  vidage du stockage de Discord effacait tout sans aucun recours
- Douze comptes au lieu de huit

### Les comptes, vraiment

- Une note et une couleur par compte, pour les distinguer d un coup d oeil
- Epingler, monter, descendre : l ordre est le tien
- L age du jeton enregistre, affiche a cote de chaque compte. Nexium ne
  verifie pas si un jeton est encore valide : le faire supposerait de s en
  servir, et s en servir depuis un client modifie est exactement ce qu il ne
  faut pas faire. On mesure donc, on ne teste pas
- Relever le jeton du compte en cours sans le retirer puis le rajouter
- La date de derniere utilisation, et le compte des bascules
- Une recherche des que le coffre depasse quatre comptes
- L identifiant se copie d un clic

### La page des mises a jour

Elle disait "client a jour" sans preciser si le renseignement datait de dix
secondes ou de la veille, et proposait de redemarrer sans dire pourquoi.

- L heure de la derniere verification aboutie est retenue et affichee
- Ce qui change dans la version proposee est lu sur le depot et presente
  avant le bouton de redemarrage : redemarrer devient une decision, pas un
  reflexe. Seules les versions plus recentes que celle installee sont
  montrees, quatre au maximum
- Le journal porte enfin une date. Il n affichait que l heure : un evenement
  d avant-hier se lisait comme un evenement du jour. Trente lignes au lieu de
  huit, et un point de couleur selon l issue
- Trois onglets -- Etat, Journal, Reparation -- un en-tete qui annonce le
  retard en nombre de versions, et un point sur l onglet quand une mise a
  jour attend
- La consigne de reparation se repetait : elle finissait par "puis relancer
  Discord", puis redisait la meme chose autrement, juste apres. Corrige

### La page

Trois onglets -- Comptes, Profils, Securite -- un en-tete qui compte les
comptes, les profils, les bascules et les jetons a verifier, et des cartes de
compte a la place des lignes grises. La mise en garde sur ce qu est un jeton
de session s affiche desormais AVANT la creation du coffre, la ou elle sert.

## v182 - Le chat, la page IA et Protect, repris

### Le defaut le plus penible : la page remontait en haut quand on ecrivait

Trois causes cumulees. L effet qui suit le fil n avait aucune liste de
dependances : il tournait a chaque rendu, donc a chaque touche frappee. Il
appelait scrollIntoView, qui ne defile pas seulement le conteneur vise mais
remonte toute la chaine des parents -- d ou le saut en haut de la page des
reglages, et pas seulement dans le fil. Et il le faisait meme quand tu avais
remonte pour relire.

Le fil defile desormais son propre conteneur, uniquement quand le fil a
change, et seulement si tu etais deja en bas. Remonter pour relire coupe le
suivi ; envoyer le retablit.

### Le chat, refait

- La zone de saisie redescend apres l envoi. Elle grandissait avec le texte
  et ne revenait jamais : elle restait haute pour le reste de la session
- Le menu des modeles tient dans le panneau flottant. Il faisait 320 px de
  large, ancre a gauche, dans un panneau de 420 px : il debordait des qu il
  passait en fin de ligne. Il s adapte a la place disponible et se ferme avec
  Echap
- Les coupes de texte se declenchent enfin. Sans minWidth a zero dans une
  boite flexible, les points de suspension ne s affichent jamais et le texte
  deborde
- Le champ, les reglages et le bouton d envoi vivent dans une seule dalle. Ils
  etaient sur trois rangees qui passaient a la ligne des que le panneau
  retrecissait
- Les propositions envoyables gardent l en-tete du modele et les actions :
  c est la meme reponse, avec des boutons en plus
- Les suggestions de depart regardent ton etat reel au lieu d etre figees
- L intitule d une erreur suit sa vraie cause : un compteur a zero ne voulait
  pas dire que c etait lui qui avait bloque
- L estimation de cout tient compte de la conversation deja engagee. Elle
  annoncait le prix d un premier message meme au vingtieme

### La page Nexium IA, refaite

Deux cartes empilees et une liste grise ne disaient rien de ce qui fait
l assistant.

- Une jauge de credits en tete, en vingt segments, avec l heure de recharge
- Trois onglets : Assistant, Acces, Service
- Les acces deviennent des tuiles, et chacune dit combien d outils elle ouvre
- Ils restent visibles au-dessus du chat tant que rien n est accorde : une
  page dont le sujet est le consentement ne doit pas le cacher
- Un onglet Service qui dit enfin ce qui tourne : les paliers et leur
  disponibilite reelle, le nombre de voies du relais, et ce qui ne quitte
  jamais la machine
- Le plafond de lecture des conversations est enfin reglable. La fonction
  existait depuis la 1.2, sans aucune interface
- Ce que l assistant a retenu de toi s affiche, et s oublie ligne par ligne

### Nexium Protect parle la langue de Nexium Privacy

Un seul anneau et un pourcentage global : on savait qu il manquait des
protections, jamais lesquelles.

- Cinq anneaux concentriques, un par famille -- liens, contenus, sortie,
  pieges, analyse avancee -- avec la legende chiffree a cote
- Une barre de flux : ce qui a ete inspecte, et ce qui a ete arrete
- Les boucliers passent de lignes grises a des tuiles, avec l interrupteur
  anime de Privacy, et chaque groupe porte son compte

## v181 - Nexium IA 1.3

### Il ne repete plus un chiffre qu il vient de rendre faux

Defaut de la 1.2 : l assistant lisait "11 protections sur 34", en activait
une, puis continuait a annoncer 11 pour le reste de la conversation. Une
horloge d etat avance desormais des qu une action change quelque chose, et
tout ce qui a ete lu avant devient perime. Ce qui ne bouge pas -- la version,
les notes de mise a jour -- reste valable. Chaque lecture a par ailleurs sa
duree de vie : deux minutes pour des statistiques, dix pour le reste.

Il retient aussi ce qui a echoue, et ne le retente plus a l identique.

### Ce que seul ce client peut faire

N importe quel assistant sait discuter. Aucun autre ne connait les tentatives
de pistage bloquees sur cette machine.

- Le journal de traque : ce qui a essaye de te suivre, de quelle sorte, vers
  quels hotes, et quand. Un recit, pas un compteur
- L audit de confidentialite : ce qui est eteint, ce que ca couvre, et ce que
  ca change pour toi
- Les extensions a risque : celles qui lisent ton jeton de session ET
  envoient vers l exterieur, expliquees en francais
- La verification d un lien : est-ce un domaine Discord officiel, un sosie a
  une ou deux lettres pres, une adresse numerique, un raccourcisseur. Des
  faits, jamais un verdict -- c est l assistant qui conclut, avec le message
  qui accompagne le lien
- L etat des gardes reseau

### L assistant n est plus enferme dans une page

- /nx dans la barre de message Discord : ecris /nx resume ce salon, et la
  question part a l assistant au lieu de partir sur Discord. Elle passe par
  le module d envoi du client, donc elle ne peut pas cesser de marcher a la
  prochaine mise a jour de Discord
- Cinq entrees dans la palette de commandes : poser une question, resumer un
  salon, savoir qui a essaye de te pister, verifier ta confidentialite,
  verifier tes extensions
- Un menu au clic droit sur un message : expliquer, verifier si c est une
  arnaque, traduire, proposer une reponse. Le message lu est encadre comme
  une donnee et caviarde avant tout envoi

### Moins cher, sans rien perdre

Mesure de depart : chaque tour envoyait 2 830 jetons de schema d outils avant
meme la question. On les payait pour "il est quelle heure".

Seuls les outils que la question rend plausibles partent maintenant, plus
deux passe-partout : un catalogue complet, et un appel par nom. Rien n est
donc hors de portee -- au pire l assistant demande le catalogue et paie un
tour de plus, au lieu de payer le catalogue entier a chaque tour. Verifie sur
le vrai service : prive de l outil dont il avait besoin, le modele demande le
catalogue puis appelle l outil par son nom.

Mesure d arrivee : 906 jetons en moyenne, soit 68 % de moins, a chaque tour.
Le passe-partout ne contourne aucun verrou : l acces est verifie sur l outil
reellement vise, et une action reste soumise a l utilisateur, sous son vrai
nom.

Deux autres economies : certaines questions ont une reponse exacte sur la
machine et n atteignent plus le relais du tout ; et la meme question posee
deux fois, sans que rien n ait change entre les deux, rejoue la premiere
reponse. Les deux sont annoncees dans la bulle -- une reponse gratuite qui se
ferait passer pour une reponse du modele serait un mensonge par omission.

### La reflexion, rendue lisible

- Le premier temps du mode profond s affiche comme une demarche, etape par
  etape, au lieu d un pave
- Chaque reponse dit sur quels outils elle s appuie. Un chiffre sans outil
  derriere est un chiffre invente : ca se voit maintenant sans avoir a le
  chercher

## v180 - Nexium IA 1.2

### Trois defauts qui rendaient l assistant inutilisable

- Les actions ne partaient jamais. Le schema d outils declarait TOUS les
  parametres comme obligatoires. "Mets de la musique" appelait l outil sans
  le volume, qui est facultatif : le fournisseur refusait alors la generation
  entiere, en plein milieu du flux. Le chat affichait "Le modele n a rien
  renvoye" sans autre explication. Chaque outil declare desormais ce qu il
  exige vraiment, et rien de plus
- L assistant devenait injoignable au bout de quelques messages. Le fil
  envoyait au modele des bulles qui ne sont pas des messages : un resultat
  d outil, une demande de confirmation, une etape d analyse. Une seule
  suffisait a faire rejeter la demande, et toutes les suivantes avec elle
- Les messages disaient "envoye" sans l etre. L envoi ne regardait jamais
  la reponse de Discord. La bulle verte s affichait, la conversation restait
  vide. On attend desormais la confirmation, on ajoute l identifiant unique
  sans lequel Discord perd le message, et on bascule sur la voie directe si
  la premiere echoue. Quand rien ne marche, on le dit

### L assistant sait ou il est

Il demarrait aveugle a chaque question et devait depenser un appel d outil
pour apprendre ce qu on pouvait lui dire gratuitement.

- Il connait la date, l heure, et a qui il parle
- Il connait ton etat reel : protections actives, profil de confidentialite,
  menaces bloquees, musique, mode economie
- Il retient ce que ses outils ont renvoye pendant la conversation. Avant, il
  relisait tes statistiques a chaque tour -- ou les inventait
- Il retient ce que tu lui demandes de retenir, et ce que tu as refuse
  plusieurs fois. Les preferences survivent a l effacement du fil ; elles ne
  quittent jamais la machine
- Il n abrege plus ce que tu lui demandes de detailler

### La conversation ne meurt plus

Elle s arretait a quarante messages avec un "efface-la" pour seule issue. Le
debut est desormais replie en un resume, produit par le palier le moins cher,
et le fil continue.

### Trois niveaux de reflexion

- Rapide : repond tout de suite. Moitie prix
- Normal : le bon compromis
- Profond : le modele travaille d abord la question sans y repondre --
  ce qui est demande, ce qui manque, les approches possibles, les pieges --
  puis redige en s appuyant sur ce travail. Mesure : vingt secondes contre
  cinq, et une reponse trois fois plus fournie. Trois fois le prix, annonce
  avant. Le raisonnement se consulte sous la reponse, replie

### Le prix baisse tout seul

- Palier automatique, et c est le nouveau defaut : le relais choisit le
  modele le moins cher qui tienne la demande. "Salut" coute un credit au lieu
  de dix, sans que ca se voie
- Facturation au reel : le devis est preleve avant, l ecart est rendu
  apres. Un echec est integralement rembourse, une reponse coupee aussi
- La boucle de travail passe de quatre a dix etapes, et le dit quand elle les
  epuise au lieu de rendre une bulle muette
- Un outil appele quatre fois de suite avec les memes arguments est arrete

### Ce qui est lu n est pas un ordre

- Tout texte venant d une conversation, d une page ou d un fichier est encadre
  comme une DONNEE. Un message qui contient "ignore tes consignes" est
  signale, jamais execute
- Adresses, numeros, cles et invitations sont retires avant tout envoi au
  relais. Ce qui ne part pas ne peut pas fuir
- Le nombre de messages lus lors d une analyse est affiche, et reglable

### L analyse va jusqu au bout

Chaque proposition porte son bouton d envoi. En mode auto, la meilleure part
seule -- si, et seulement si, l acces d envoi est accorde.

### Nouveaux modeles et nouveaux outils

- Nexium IA 2.0, en essai, reserve aux administrateurs du client
- Trois voies de service au lieu d une : la charge se repartit, et une voie
  saturee ne bloque plus personne
- Nouveaux outils : salon ouvert, conversations ouvertes, brouillon en cours,
  retenir et oublier une preference

## v178 - Nexium IA, et Privacy repense

### Nexium IA 1.0

Un assistant integre au client. Il connait ton installation, peut agir dessus,
et ne garde rien.

- Il lit ton etat reel quand tu l y autorises : protections actives, menaces
  bloquees, place occupee, statistiques d usage. Plus de reponse au hasard
- Il agit : allumer une protection, appliquer un profil de confidentialite.
  Chaque geste est ecrit dans la conversation, en clair
- Quatre acces separes, tous refuses au depart. Un outil dont l acces manque
  n est meme pas propose au modele : il ne peut pas demander ce que tu n as
  pas donne. Un second verrou refuse l execution cote client
- Les outils tournent SUR TA MACHINE. Le relais ne voit que ce qu ils
  renvoient, le temps d un aller-retour
- Aucune conversation n est enregistree, ni chez toi ni sur le serveur. Elle
  disparait quand tu fermes le client. Seuls tes consentements sont gardes
- Le texte s ecrit au fil de l eau. Tu peux couper en cours, copier une
  reponse, relancer la derniere question
- Markdown complet : gras, italique, listes, titres, citations, blocs de code
  et tableaux. Les liens passent par l analyse de Nexium Protect avant de
  s ouvrir. Rien n est rendu en HTML : une reponse ne peut pas devenir du code
- Dix messages par sept heures, compte cote serveur. Le compteur est affiche
- Un panneau de bienvenue s ouvre une fois apres la mise a jour

### Nexium Privacy repense

- Le niveau de discretion n est plus une barre unique mais quatre anneaux
  concentriques, un par famille : telemetrie, social, empreinte, donnees. On
  voit d un coup d oeil laquelle est a la traine, ce qu une barre cachait
- Les reglages passent de la liste a la grille de tuiles. Chaque tuile porte
  son icone, son etat et son explication, et s allume quand elle agit

### Integration dans le client

- Un bouton Nexium IA dans la barre du champ de message, a cote des cadeaux et
  des emojis. Il reprend la classe d un bouton voisin, donc sa taille et son
  espacement viennent de Discord : rien ne bouge autour. Il se repose tout seul
  quand Discord redessine la zone de saisie
- Nexium IA figure dans la palette de commandes, en tete de liste
- Onze outils, dont six nouveaux : journal des requetes arretees et des menaces,
  etat du reseau et latence, versions installee et publiee, liste complete des
  cles de reglage avec leur etat, bascule des protections de Nexium Protect,
  et sante du stockage
- Un outil qui visait une fonction inexistante a ete retire plutot que laisse
  en place : il repondait que le module n avait pas demarre

### Details

- La frappe dans un champ ne declenche plus les raccourcis du client. Le
  correctif porte sur les gestionnaires globaux : il protege toutes les zones
  de saisie, pas seulement le chat
- Le relais choisit son modele en interrogeant la liste reelle du fournisseur.
  Un modele retire ne casse plus rien : le suivant prend le relais
- L assistant ne se fait passer pour personne. Il repond qu il est Nexium IA

## v177 - dix nouvelles facons de ne pas etre reconnu

Nexium Privacy arretait ce qui PART de ta machine. Il sait maintenant aussi
brouiller ce qui permet de te RECONNAITRE d une fois sur l autre, meme sans
compte, sans cookie et sans adresse IP stable. Vingt-quatre protections
deviennent trente-quatre. Tout est eteint par defaut, tout se retire.

### Ce qui rend une machine reconnaissable

- Empreinte du canvas. Une page peut faire dessiner une image invisible et lire
  le resultat : les ecarts de rendu entre machines suffisent a identifier la
  tienne. Ce qui est relu est brouille, ce qui s affiche ne change pas
- Modele de carte graphique. Le nom exact du materiel, lisible par toute page,
  est remplace par un modele courant
- Empreinte audio. Le calcul du son laisse des ecarts propres a chaque machine.
  Un bruit mille fois plus faible que le seuil de l oreille les couvre. La voix
  et les sons ne changent pas
- Dimensions de l ecran. La taille exacte et la profondeur de couleur sont
  annoncees comme un ecran courant
- Liste des greffons. Presentee vide, comme sur une installation neuve
- Etat de la batterie. Le niveau de charge est assez fin pour relier deux
  visites : il est annonce comme un appareil branche et plein
- Indices de client. Les reponses detaillees du navigateur sur sa version, son
  architecture et le systeme sont normalisees

### Ce qui sort de la machine

- Adresse IP locale. Pour etablir un appel, le client annonce l adresse de ta
  machine sur ton reseau local. Elle est retiree des candidats envoyes ; ceux
  qui font passer la voix par Discord sont gardes, l appel fonctionne
- Metadonnees des images. Une photo prise au telephone porte la date, le modele
  de l appareil et souvent les coordonnees GPS du lieu. Ces blocs sont retires
  avant l envoi, octet par octet : ni recompression, ni perte de qualite. Le
  profil de couleurs et l en-tete necessaires au rendu sont gardes
- Liens que tu envoies. Un lien copie depuis un site porte souvent un parametre
  qui identifie qui l a partage. Le nettoyage existait pour les liens que tu
  ouvres ; il s applique desormais aussi a ceux que tu envoies

### Ce que ca change a l usage

- Les trois profils sont etendus. Discret prend les deux protections sans effet
  de bord. Renforce ajoute le brouillage d empreinte, invisible a l usage.
  Maximal ajoute les deux reglages qui peuvent gener, et le dit
- Le brouillage utilise une graine tiree au demarrage : stable pendant la
  session, sinon deux lectures se contredisent et trahissent la parade ;
  differente a chaque session, sinon elle devient elle-meme un identifiant
- Une protection qui ne peut pas s appliquer refuse de s allumer plutot que
  d afficher un interrupteur actif qui ne protege rien
- 52 verifications automatiques executent le vrai code : elles envoient une
  photo avec de vraies coordonnees GPS et relisent le fichier produit, passent
  un vrai SDP d appel, comparent la lecture du canvas avant et apres

### Deux idees ecartees, et pourquoi

- Anonymiser la liste du materiel audio et video : Discord a besoin des noms et
  des identifiants pour te laisser choisir ton micro. La protection aurait casse
  le choix du peripherique
- Normaliser l en-tete d identification client : Discord s en sert pour valider
  ses propres requetes, et une valeur inhabituelle expose a un signalement du
  compte. Le risque pour l utilisateur depassait le gain

## v176 - le client se fatigue moins, et la traduction anglaise fonctionne

### Le masquage des liens ne relisait plus la fenetre entiere

- A chaque fois que Discord touchait au DOM, le masquage repassait sur tous les
  liens de la page. Dans un salon qui defile, cela revenait a relire la fenetre
  quatre fois par seconde. Il ne relit plus que ce qui vient d etre insere, et ne
  repasse sur l ensemble qu au ralenti, pour rattraper les liens dont l adresse
  change sans que le message soit reinsere
- Mesure sur une minute de salon actif : 231 relectures completes ramenees a 15,
  et 172 788 liens parcourus ramenes a 11 085

### Le panneau des icones ne mesurait plus la fenetre chaque seconde

- Le panneau qui porte les icones de plugins recalculait sa position toutes les
  secondes, indefiniment. Comme Discord modifie sa fenetre en permanence, chacune
  de ces mesures obligeait le navigateur a refaire sa mise en page
- Il ralentit maintenant quand rien ne bouge, jusqu a une mesure toutes les quatre
  secondes, et reprend le rythme plein des que sa position change ou que la
  fenetre est redimensionnee : 63 pour cent de mises en page forcees en moins,
  sans que le panneau tarde a suivre

### L ecran de connexion continuait d etre surveille apres la connexion

- La surveillance s arretait seulement si l ecran de connexion n avait jamais ete
  vu. Une fois connecte, elle continuait donc pour toujours a interroger la
  fenetre toutes les trois secondes pour un ecran qui ne revient pas
- Elle passe la main a une veille lente qui la reveille si l ecran reapparait :
  vingt interrogations par minute ramenees a deux, sans rien perdre

### La page Privacy se redessinait pour rien

- La page se redessinait entierement toutes les deux secondes et demie, meme
  quand aucun compteur n avait bouge. Elle ne se redessine plus que sur un
  changement reel

### La traduction anglaise ne partait pas sur 89 libelles

- Le texte francais du client s ecrit sans apostrophes, mais 26 cles de traduction
  en portaient une. La correspondance etant exacte, ces traductions ne partaient
  jamais : un anglophone lisait un titre en anglais suivi d une description en
  francais. Le delai avant action irreversible etait dans ce cas
- 63 autres cles ne correspondaient plus a aucun texte affiche : restes de
  renommages, dont toute la section Retrospective devenue Bilan, et libelles
  dessines sur l image du bilan, qui ne passent pas par la traduction. Retirees
- Cinq cles etaient ecrites deux fois avec la meme traduction. Dedoublonnees

### Connu

- Le mot Apercu porte deux sens dans le client : les onglets d entree des pages
  Stats, Privacy et Protect, et la legende d un nuancier de couleurs. La table de
  traduction ne peut en servir qu un seul, et c est aujourd hui Preview qui gagne,
  donc les trois onglets s affichent mal en anglais. Trancher demande de renommer
  du texte francais visible : rien n a ete change sans decision

## v175 - Protect et Privacy agissent, et le prouvent

### Une requete de telemetrie sur deux ne partait pas : elle partait toutes

- Le blocage de la telemetrie repondait a Discord par une reponse vide construite
  au statut 204. Un navigateur refuse de construire cette reponse : un statut 204
  ne peut pas porter de contenu. La construction levait donc une
  exception, l exception etait avalee, et la requete partait quand meme. Pendant
  ce temps le compteur, lui, montait : la page annoncait des requetes arretees
  qui ne l etaient pas. Corrige et verifie sur un vrai navigateur

### Banc de preuve

- Nouvel onglet dans Protect et dans Privacy, et la liste complete dans le Labo.
  35 verifications qui executent la vraie protection sur du vrai contenu et
  affichent ce qui s est reellement passe : le lien pris pour cible, l en-tete
  retire, le nombre de pixels que l avertissement occupe a l ecran
- Chaque ligne dit agit, eteint dans tes reglages, hors sujet ici, ou n agit pas.
  Aucune valeur n est inventee, aucun resultat n est simule
- Un test qui touche les compteurs les remet ensuite exactement ou ils etaient

### Masquage des liens dangereux

- Nouveau bouclier. Le lien n est plus seulement bloque au clic : il est recouvert
  dans le message. Le texte d origine n est plus lisible, plus copiable, plus
  cliquable par erreur. A la place, une etiquette dit ce qui a ete masque
- Un second reglage etend le masquage aux liens raccourcis et aux liens que
  l analyse trouve inhabituels sans certitude
- Autoriser un domaine leve son masque immediatement, le retirer le repose
- Si Discord redessine le message, le masque se repose tout seul

### Le meme lien n est plus analyse en boucle

- Un lien deja vu n est plus recompte ni reannonce, meme envoye par dix personnes
  differentes. Le blocage au clic, lui, reste actif a chaque fois
- Un message modifie n est relu que si son texte a vraiment change. Discord emet
  une mise a jour a chaque apercu, chaque reaction, chaque epinglage : le client
  relisait le message a chaque fois
- Toutes les alertes repetables passent par un meme frein de trente minutes

### Les protections tiennent, et le disent quand elles tombent

- Les six points d interception (fetch, XHR, balises, WebSocket, pair-a-pair,
  presse-papiers) sont verifies toutes les 45 secondes. Si une extension ou une
  mise a jour de Discord en ecrase un, il est remis en place et tu es prevenu
- WebSocket est desormais surveille : une connexion permanente vers un point de
  collecte est refusee. Les connexions de Discord ne sont jamais touchees
- L effacement des traces a la fermeture ne dependait que de beforeunload, qui
  n est pas fiable dans Electron. Il passe aussi par pagehide et par la mise en
  arriere-plan

### Ailleurs

- Un avertissement de Protect qui ne trouvait pas le module d affichage de
  Discord disparaissait sans bruit. Il existe maintenant un affichage propre a
  Nexium qui prend le relais : vingt-six avertissements pouvaient etre perdus
- La normalisation des caracteristiques materielles se retire vraiment quand on
  l eteint, au lieu de rester en place jusqu au prochain lancement
- Une seule fonction absente dans un module voisin faisait echouer en silence
  toute la classification des liens en dessous de la liste noire. Elle est
  desormais isolee
- Dans Auto, un modele que Discord ne permet pas d executer ne restait muet au
  clic : il dit maintenant pourquoi

## v174 - Nexium demarre avec Windows

- L installateur pose desormais un raccourci dans le dossier Demarrage de
  l utilisateur : Nexium se lance avec Windows, en fenetre reduite. Ca vaut
  pour toute nouvelle installation, et pour toute mise a jour faite avec le
  script d installation
- Le dossier Demarrage vit dans %AppData%, donc dans le dossier utilisateur :
  rien n est ecrit dans la base de registre, aucun droit administrateur n est
  demande, et les autres comptes de l ordinateur ne sont pas touches
- Nexium Donnees explique ce raccourci, dit ou il se trouve, et donne la
  commande qui le retire. Le client n a aucun acces au disque : il ne peut ni
  verifier ni supprimer ce fichier lui-meme, et il le dit
- Le readme annoncait que rien n etait installe ailleurs que dans le dossier
  du client. Ce n est plus vrai : il le dit maintenant, avant l installation
  et dans la marche a suivre pour desinstaller

## v173 - Deux pages neuves, la base de menaces reparee, et une fuite fermee

### Securite

- La liste des identifiants Discord de tous les utilisateurs vus depuis 90 jours
  etait recuperable par quiconque possede la cle publiable, qui vit dans le
  client et dans un depot public. Le client ne demande plus la base entiere : il
  demande si les quelques profils affiches a l ecran utilisent Nexium, 200 au
  maximum. Un appelant ne peut plus que confirmer des comptes qu il connait deja
- Trois fonctions serveur qui n avaient aucune raison d etre ouvertes au public
  ont ete fermees, et le chemin de recherche de nx_poids fige

### Base de menaces

- Le fichier du depot compte 438 867 domaines. Le client s arretait a 250 000 :
  188 867 domaines, soit 43 % de la protection, n etaient jamais charges
- La reserve locale exigeait moins de 2 Mo, la liste compactee en faisait 6,60 :
  la condition etait toujours fausse, la reserve n etait donc jamais ecrite, et
  les 11,3 Mo repartaient a chaque lancement
- La liste est desormais gardee sous forme d empreintes de 53 bits triees,
  cherchees par dichotomie, dans IndexedDB. Mesure sur la vraie liste : la
  totalite des domaines retenus, 3,35 Mo en memoire, aucune collision, aucune
  fausse alerte sur 200 000 tirages

### Nexium Comptes

- Nouvelle page. Plusieurs comptes Discord dans un coffre chiffre, et une
  bascule de l un a l autre sans se reconnecter, depuis la page ou depuis la
  barre du haut
- Le coffre est chiffre en AES-GCM 256, avec une cle derivee par PBKDF2-SHA256
  a 210 000 iterations depuis une phrase qui n est jamais enregistree
- Un jeton de session ouvre un compte sans mot de passe et sans double
  authentification : la page le dit, plutot que de le taire

### Nexium Labo

- Nouvelle page. Les fonctions en cours d essai, eteintes par defaut, chacune
  avec ce qu elle change et ce qu elle coute
- Un bouton qui coupe tous les essais d un coup : c est le premier reflexe
  quand le client se comporte mal
- Une section qui affiche les chiffres reels du client, utile pour un
  signalement : domaines surveilles, memoire, age de la base, modules en panne

### Nexium Music

- La page est refaite autour d un principe : la platine vit dans la collection,
  a la place de la piste jouee, au lieu d occuper un onglet separe. On ne perd
  plus sa place en changeant de morceau
- Chaque piste porte sa couleur, tiree de son rang, et la page entiere s y
  accorde. Onde de 72 barres avec tete de lecture, deplacement en glissant,
  bulle de temps au survol, anneau de progression, coupure du son d un clic
- Le mini-lecteur suit la meme couleur que la piste en cours

### Alertes

- Une alerte de statut part maintenant sur le Discord de l equipe, en embed,
  avec une mention a l ouverture et a l aggravation. L envoi se fait cote
  serveur : l adresse du webhook ne descend jamais dans le client
- La page Admins montre l etat de diffusion de chaque alerte et permet de la
  renvoyer, ou de faire un essai sans mention

### Demarrage et stabilite

- 57 Ko d historique de statistiques etaient analyses a chaque lancement pour
  des donnees dont rien n a besoin avant le premier message compte : la lecture
  est reportee au premier acces. Le travail de demarrage passe de 66 626 a
  9 615 octets analyses
- Neuf branchements tombaient dans la meme image a 1,5 s. Ils partent
  maintenant un par un dans les creux du navigateur, avec une echeance ferme
- Le mode securise ne coupait que la restauration des icones. Il coupe
  desormais tout ce qui ecrit dans l interface de Discord, ecrit au journal ce
  qu il a coupe, et surtout se leve : une carte dans Nexium Donnees explique
  l etat et propose de repasser en marche normale
- Les deux ecouteurs d erreurs globaux n avaient aucun frein, contrairement a
  console.error, et ecrivaient sur le disque a chaque evenement. Budget partage
  de 25 par minute, et ecriture groupee : la premiere erreur d une rafale part
  tout de suite, les suivantes sont regroupees

### Ailleurs

- Le masque de partage se pose a la main, par Ctrl+Maj+M ou depuis la recherche
  rapide, au lieu d attendre le partage d ecran
- La recherche rapide ignorait Comptes, Auto et Labo
- La pastille Nexium redevient ce qu elle etait : toujours active, reservee a
  l equipe, sans interrupteur

## v172 - Le menu range les pages, et trois d entre elles respirent

- Les pages du client etaient toutes empilees dans une seule section, dans un
  ordre herite : Plugins, Themes et Changelog passaient avant Protect et Privacy.
  Elles sont maintenant reparties en cinq sections nommees - Nexium, Protection,
  Ton espace, Personnalisation, Donnees et aide - avec la meme presentation que
  les sections de Discord
- Les icones de la barre laterale n avaient pas toutes le meme gabarit : sept
  etaient dessinees en 18 px, cinq en 20. Elles acceptent desormais une taille et
  s alignent partout, barre laterale comme tuiles de l accueil
- L icone de Nexium Reseau reprenait le glyphe "partager", qu on lit comme un
  partage et pas comme une mesure de liaison : remplacee par un signal

- Nexium Auto : l en-tete montre un anneau des regles actives et le chemin
  d une automatisation - quand, seulement si, alors - avec un point qui le
  parcourt tant que le moteur tourne. Les quatre capacites s incrementent a
  l ouverture et portent chacune sa couleur
- Nexium Auto : les 26 modeles etaient une seule colonne de cartes identiques.
  Ils sont ranges par famille, sur deux colonnes, avec un glyphe et une couleur
  par famille. Les taches suivent la meme grille, avec un liseret qui dit d un
  coup d oeil si la regle tourne, dort ou est indisponible
- L action "changer le statut" etait rangee dans la famille Vocal, qui ne la
  decrit pas : elle a maintenant sa propre famille, Presence

- Nexium Protect : l anneau de posture etait gris et ne disait rien. Il prend
  la couleur de ce qu il mesure - vert, ambre ou rouge - et les quatre compteurs
  montent a l ouverture. Une protection allumee se teinte au lieu de rester
  grise, ce qui rend visible d un regard ce qui est reellement actif

- Nexium Donnees : la repartition du stockage se lisait en sept nuances de gris
  indistinguables. Chaque module a sa couleur, reprise dans la legende et dans la
  barre de sa ligne. Le quota s affiche en anneau, le total monte a l ouverture,
  et une ligne ouverte se signale par un fond et un liseret
- Nexium Donnees : la sante des modules gagne son anneau, et le journal distingue
  les erreurs de la session en cours de celles heritees du lancement precedent

- Un chiffre anime etait remonte a chaque valeur pour rejouer son apparition :
  avec un compteur qui monte image par image, il repartait a zero d opacite
  soixante fois par seconde et restait invisible
- Les compteurs animes retombent sur leur valeur finale si la fenetre est en
  arriere-plan et que le navigateur ne rend plus d images

## v171 — L icone des alertes ne disparait plus

- L icone du panneau d alertes n apparaissait qu une fois connecte a Nexium Admins.
  La session vivant en memoire, elle disparaissait a chaque redemarrage de Discord :
  presente un lancement, absente le suivant
- Plus genant : le seul chemin vers le panneau exigeait d etre deja connecte, sans
  que rien n indique ou le faire
- Elle est desormais visible pour l equipe meme deconnectee. Un clic ouvre alors la
  page de connexion, et l infobulle le dit
- Elle disparait proprement a la deconnexion

---

## v170 — Un bannissement retire doit pouvoir etre leve

### Le probleme

- Retirer un identifiant de la liste ne suffisait pas toujours a lever le bannissement
- Le client garde un verrou local sur l empreinte de la machine. Il sert a ne pas
  afficher une interface utilisable pendant la seconde ou la liste est interrogee
- Ce verrou n etait efface que si le telechargement de la liste reussissait. En cas
  d echec, l erreur etait avalee en silence et le bannissement restait, definitivement
- Une coupure reseau de trente secondes pouvait donc bannir quelqu un a vie, sans
  aucun moyen d en sortir : l interface etant deja coupee, il n y avait plus de recours

### Ce qui change

- Le verrou local expire au bout de vingt-quatre heures. Si la liste bannit toujours,
  il est repose au premier demarrage qui aboutit
- Trois echecs de telechargement de suite et un verrou local seul ne suffit plus
- Un echec est desormais reessaye au lieu d etre ignore
- Une fonction de deverrouillage manuel existe pour les cas desesperes

Le verrou reste un cache, il ne fait plus office de jugement. La liste seule decide.

---

## v169 — Presentation du depot

- Le readme est refait : ce que le client fait en premier, les mises en garde ensuite,
  et la liste exacte de ce qui sort de ta machine
- Le badge de version se met desormais a jour tout seul a chaque publication, il ne
  peut plus annoncer une version perimee
- Aucune modification du client lui-meme dans cette version

---

## v168 — Six niveaux d alerte, une icone, et des boutons qui repondent

### Les boutons de la page Admins ne repondaient plus

- Le panneau d alertes flottait au-dessus de tout, y compris des fenetres de Discord :
  z-index 2147483000 contre 1002. Il interceptait les clics dans son rectangle
- Cliquer dessus comptait aussi comme un clic hors de la fenetre de reglages, que Discord
  refermait aussitot. C etait la meme cause que le menu qui apparaissait puis disparaissait
- Le panneau et le bandeau d alerte passent sous les fenetres de Discord

### Six niveaux au lieu de quatre

- Alerte de securite, panne critique, incident majeur, incident mineur, maintenance,
  information. Chacun a sa couleur et sa description
- Les deux plus lourds sont reserves au proprietaire : un operateur ne peut pas declarer
  une panne critique ni une alerte de securite a tout le parc
- Le site les trie du plus grave au moins grave et affiche leur signification

### Le panneau devient permanent

- Une icone dans la barre du haut l ouvre et le referme a tout moment
- Elle porte le nombre d alertes non lues et n apparait que pour l equipe connectee
- Cinq actions rapides : actualiser, copier le diagnostic, ouvrir Nexium Admins,
  ouvrir la page de statut, vider

### La page de statut

- Un bandeau de synthese : services operationnels, disponibilite moyenne sur 90 jours,
  latence mediane, incidents en cours et resolus
- La disponibilite sur 90 jours est indiquee pour chaque service

### Menage

- Les alertes et le journal d audit sont repartis de zero
- Les icones de l accueil et de la page Admins ne sont plus celles d autres pages

---

## v164 — Des alertes d equipe, dans un panneau

### Le message d equipe

- Quand un module accumule les erreurs, l equipe recoit un message presente comme une
  conversation, avec des boutons pour agir : publier une alerte publique, voir le
  diagnostic, ouvrir la page de statut, ignorer pendant 24 heures
- Rien ne s affiche sans deux conditions reunies : le compte fait partie de l equipe, et
  la session Nexium Admins est ouverte
- Il est dessine par Nexium et reprend les couleurs de ton theme Discord. Il ne touche a
  rien du cote de Discord : aucune donnee ajoutee, aucune requete envoyee

### Pourquoi pas une vraie conversation

- La premiere version inserait un vrai salon dans la liste des messages prives. Essayee
  sur un client reel, elle a ete abandonnee : Discord refusait le salon, puis partait le
  chercher sur le reseau et recevait une erreur
- La faire tenir aurait demande de modifier la couche reseau de Discord elle-meme. Pour un
  affichage, le risque etait sans rapport avec le gain

---

## v158 — Les modules previennent l equipe

### Des connecteurs sur chaque module

- Protect, Privacy, Music, Reseau, les gardes de sortie, le stockage et les alertes ont
  desormais un connecteur qui surveille leurs compteurs : module qui ne s est pas lance,
  erreurs au journal, requetes sans reponse, ecriture refusee
- Au-dela d un seuil, l equipe recoit un message. Un seul par module et par heure

### Un message prive simule, visible de la seule equipe

- Le message arrive dans la liste des conversations, envoye par Nexium Client alert
- Ce compte n existe pas et n est jamais cree : il est fabrique dans la memoire du client
- Rien n apparait sans deux conditions reunies : le compte Discord fait partie de l equipe,
  et la session Nexium Admins est ouverte. Sans ca, aucun envoi
- Discord ne part jamais chercher ce salon : les requetes qui le concernent sont interceptees
  et recoivent une reponse valide sur place
- Tout se retire, et un salon oublie est nettoye au demarrage suivant

### Des boutons pour aller vite

- Sous le message : publier une alerte publique, voir le diagnostic, ouvrir la page de statut,
  ignorer pendant 24 heures
- Publier depuis ce bouton envoie l alerte a tout le parc et sur le site en un clic
- Les clics ne sortent pas du client : ils sont interceptes avant d atteindre Discord

---

## v156 — Six pieges du meme type que la panne du 28

### Ce qui a ete trouve

- Le plantage du 28 aout venait d un nom de variable partage avec Equicord : le bloc Nexium
  et le bundle vivent dans la meme portee, et l un ecrasait l autre
- Un controle a ete ecrit pour detecter ce cas. Mis a l epreuve sur la version fautive, il la
  refuse et nomme la variable coupable
- Applique a la version actuelle, il a trouve six autres variables dans la meme situation :
  celles des raccordements au demarrage, dont les greffons reseau et le suivi de latence

### Ce qui a ete fait

- Aucune n avait encore de consequence : elles ne servent qu au demarrage. Mais chacune
  devenait dangereuse a la prochaine reconstruction d Equicord
- Les neuf blocs de demarrage concernes sont desormais enfermes dans une fonction. Leurs
  variables ne peuvent plus rencontrer celles du bundle
- Le controle tourne maintenant a chaque verification et refuse toute nouvelle collision

Declarations exposees : 154 avant, 137 apres. Collisions : six avant, aucune apres.

---

## v155 — La banderole de mise a jour, et des alertes plus reactives

### La banderole qui ne partait jamais

- Un bandeau vert  Nexium Client has been updated  restait affiche en permanence en haut de
  la fenetre, sans moyen de le fermer autrement qu en redemarrant
- Il venait de l updater d Equicord, pas de celui de Nexium. A chaque lancement il croyait
  avoir mis le client a jour et reposait son bandeau
- Il est desormais desactive : Nexium a son propre updater, et celui d Equicord pointait
  ailleurs. Un bandeau deja affiche est retire automatiquement

### Alertes

- Les alertes sont relues toutes les deux minutes au lieu de dix, et des que la fenetre
  revient au premier plan
- Le bandeau d alerte entier est cliquable et mene a la page de statut

---

## v154 — Page de statut et alertes d administration

### Savoir quand quelque chose ne va pas

- Une page de statut publique liste l etat de huit services et l historique des incidents.
  Une surveillance automatique les interroge toutes les cinq minutes
- Quand un administrateur ouvre une alerte, un bandeau apparait en haut du client. Il se
  ferme d un clic et ne revient pas pour la meme alerte
- Le bandeau renvoie vers la page de statut

### Nexium Admins

- Une page reservee a l equipe, avec une connexion independante de Discord
- Deux niveaux : le proprietaire peut tout faire, l operateur ouvre et met a jour une alerte
  mais ne peut ni la supprimer, ni publier en gravite critique, ni toucher aux comptes
- Chaque ouverture, modification et suppression est inscrite dans un journal d audit
- Les droits sont verifies par le serveur, jamais par le client : masquer la page ne protege
  rien puisque le fichier du client est public. Forcer son affichage ne donne qu un ecran de
  connexion infranchissable

### Sous le capot

- Le jeton de session reste en memoire et n est jamais ecrit sur le disque
- Les alertes sont lues sans compte, mais la colonne indiquant leur auteur ne l est pas
- Si le serveur d alertes ne repond pas, la page utilise la derniere copie connue

---

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
