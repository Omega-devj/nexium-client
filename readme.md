<div align="center">

# Nexium Client

**Client Discord personnalisé, basé sur Equicord**

![Officiel](https://img.shields.io/badge/dépôt-officiel-ff4b23?style=flat-square)
![Windows](https://img.shields.io/badge/plateforme-Windows-2b2b2b?style=flat-square)
![Licence](https://img.shields.io/badge/licence-open--source-2b2b2b?style=flat-square)
![Maintenu par](https://img.shields.io/badge/maintenu%20par-Nexium%20Collective-2b2b2b?style=flat-square)

[Site officiel](https://nexium-client.netlify.app/) · [Releases](../../releases) · [Signaler un problème](../../issues)

</div>

---

> ### ✅ Dépôt officiel
> Développé et maintenu par **Nexium Collective**.
> Seul site de référence : **[nexium-client.netlify.app](https://nexium-client.netlify.app/)**.
> Aucun autre dépôt, site ou canal ne représente ce projet. En cas de doute sur une
> copie, un fork ou un lien reçu ailleurs, revenez toujours vérifier ici avant de
> télécharger quoi que ce soit.

---

## Installation en une commande

Ouvrez **PowerShell** (touche Windows → tapez `powershell` → Entrée) et collez :

```powershell
irm https://raw.githubusercontent.com/Omega-devj/nexium-client/main/install-nexium.ps1 | iex
```

Le script ferme Discord s'il tourne, télécharge le client, récupère le lanceur,
place tout au bon endroit, crée un raccourci sur le Bureau et propose de démarrer.
**Aucun droit administrateur n'est demandé.**

<details>
<summary><b>Installation manuelle (si vous préférez tout poser vous-même)</b></summary>

<br>

1. **Téléchargez le code** — bouton vert **`Code` → `Download ZIP`** en haut de cette
   page. Décompressez-le où vous voulez. Vous obtenez `nexium-client-main`.
2. **Téléchargez le lanceur** dans l'onglet **[Releases](../../releases)** (le `.exe`).
3. **Placez le `.exe` à la racine** de `nexium-client-main`, à côté des autres fichiers
   — surtout pas dans un sous-dossier.
4. **Lancez le `.exe`.**

</details>

---

## Sommaire

- [Ce que contient le client](#ce-que-contient-le-client)
- [À lire avant d'installer](#-à-lire-avant-dinstaller)
- [Vie privée : ce qui sort de votre machine](#vie-privée--ce-qui-sort-de-votre-machine)
- [Mises à jour](#mises-à-jour)
- [Raccourcis et astuces](#raccourcis-et-astuces)
- [En cas de problème](#en-cas-de-problème)
- [Désinstallation](#désinstallation)
- [FAQ](#faq)
- [Équipe et support](#équipe-et-support)

---

## Ce que contient le client

### 🛡️ Nexium Protect — sécurité en temps réel

| Protection | Détail |
|---|---|
| **Liens piégés** | Blocage avant ouverture des loggers d'IP, sites d'hameçonnage et domaines trompeurs, avec une base de menaces mise à jour à distance |
| **Détection intelligente** | Repère les domaines inconnus qui imitent une marque, utilisent une extension à risque ou des mots-clés d'arnaque — sans dépendre d'une liste |
| **Liens masqués** | Détecte quand le texte affiché cache une destination différente |
| **Aperçus et invitations** | Analyse les liens des aperçus, et signale les serveurs créés récemment ou au nom suspect |
| **Pièces jointes** | Vérifie le **contenu réel** du fichier : un `.exe` renommé en `.png` est détecté |
| **Fuites de secrets** | Alerte si un jeton ou un webhook apparaît dans un message — y compris si c'est vous qui venez de le publier |
| **Usurpation d'amis** | Signale un compte au pseudo identique à un de vos contacts, avec avatar copié |
| **Vagues de messages privés** | Détecte les campagnes d'arnaque (mêmes messages, comptes différents) |
| **Protection console** | Avertit contre l'arnaque « colle ce code dans la console » |

Trois profils au choix : **Strict**, **Équilibré**, **Minimal**.

### Les autres modules

| Module | Fonction |
|---|---|
| 🔒 **Nexium Privacy** | Blocage de la télémétrie Discord, indice d'anonymat, journal des requêtes bloquées |
| 📊 **Nexium Stats** | Statistiques d'activité, **stockées uniquement sur votre machine** |
| 🎧 **Nexium Music** | Lecteur intégré avec playlist et mini-lecteur déplaçable |
| 📡 **Nexium Réseau** | Latence, gigue et stabilité de la connexion |
| 💾 **Nexium Données** | Contrôle de tout ce qui est stocké, export/import des réglages, journal d'erreurs |
| 🔄 **Nexium Mise à jour** | Version installée, journal, retour arrière |

Le tout suit **votre thème Discord** (clair, sombre, thèmes personnalisés et QuickCSS).

---

## ⚠️ À lire avant d'installer

- Ce client **modifie Discord**, ce qui va à l'encontre des Conditions d'Utilisation
  de Discord. L'utilisation se fait **à vos risques** — un bannissement de compte
  reste théoriquement possible.
- Le client **se met à jour automatiquement** : à chaque démarrage il télécharge la
  dernière version du code depuis ce dépôt et l'exécute. Vous faites donc confiance
  au mainteneur **pour le code qu'il publiera à l'avenir**, pas seulement pour la
  version installée aujourd'hui.
- **Windows uniquement.**
- Le `.exe` n'est **pas signé numériquement** : Windows SmartScreen et certains
  antivirus le signaleront. C'est attendu pour ce type d'outil, mais c'est à vous
  d'en juger.

---

## Vie privée : ce qui sort de votre machine

Autant être précis plutôt que de promettre « zéro donnée » :

**Ce qui est envoyé**

| Quoi | Quand | Contenu |
|---|---|---|
| Enregistrement du client | À chaque démarrage, une fois par heure max | Votre identifiant Discord et la version du client |
| Signalement de menace | **Uniquement si vous cliquez sur « Signaler »** | Le domaine signalé, son type, votre identifiant et pseudo Discord |

L'enregistrement sert à savoir qui utilise le client (badge, statistiques d'adoption).
Le signalement alimente la base de menaces communautaire.

**Ce qui n'est jamais envoyé**

- Aucun message, aucun contenu de conversation
- Aucun jeton, mot de passe ou information de connexion
- Aucune statistique d'usage : **Nexium Stats reste 100 % local**
- Aucune régie publicitaire, aucun traceur tiers

**Ce qui est téléchargé** (sans rien envoyer) : la base de menaces, la liste blanche,
la liste de bannissement et les mises à jour du client.

> Vous pouvez tout vérifier : le code est intégralement lisible dans ce dépôt, et la
> page **Nexium Données** vous montre exactement ce qui est stocké chez vous.

---

## Mises à jour

Rien à refaire : à chaque lancement, le client récupère la dernière version et
l'applique **avant** de démarrer Discord — un seul redémarrage suffit.

Trois filets de sécurité :

- **Sauvegarde automatique** de la version précédente avant chaque mise à jour
- **Auto-réparation** : si le fichier installé est corrompu, la sauvegarde est
  restaurée toute seule au démarrage
- **Retour arrière** : bouton *« Revenir à la version précédente »* dans
  Nexium Mise à jour, ou création manuelle d'un fichier vide `.nexium-restore`
  dans `resources/equicord`

**Pour désactiver les mises à jour automatiques** (utile pour tester des
modifications locales) : créez un fichier vide nommé **`.nexium-dev`** dans
`resources/equicord`. Vos fichiers ne seront plus écrasés. Supprimez-le pour
réactiver.

---

## Raccourcis et astuces

| Raccourci | Effet |
|---|---|
| **Ctrl + Maj + N** | Recherche rapide Nexium : ouvrir une page, activer une protection, vérifier les mises à jour, exporter les réglages… |
| Clic sur un lien dangereux | Fenêtre d'alerte avec *Ne pas ouvrir / Ouvrir quand même / Toujours autoriser* |

Toutes les pages sont **navigables au clavier** (Tab, Entrée, Échap) et respectent le
réglage système « réduire les animations ».

---

## En cas de problème

### Le client se comporte mal, plante ou rame

1. **Ctrl + Maj + N** → *Désactiver la restauration des icônes de plugins*
   (c'est la seule fonction qui intervient dans l'interface de Discord).
2. Ouvrez **Nexium Données → Journal des erreurs** → *Copier tout*, et joignez-le à
   votre [issue](../../issues). Les erreurs de la session précédente y figurent
   aussi, même après un plantage.
3. Si Discord redémarre plusieurs fois d'affilée, le **mode sécurisé** s'active tout
   seul et coupe les fonctions à risque.

### « Installation Discord incomplète » apparaît dans Nexium Données

Des composants de Discord n'ont pas pu se charger (modules natifs, overlay). Cela
provoque des plantages **qui ne viennent pas de Nexium**. Dans ce cas :

1. Fermez Discord.
2. `Windows + R` → `%AppData%` → renommez le dossier `discord` en `discord_old`
   (renommer, pas supprimer : on peut revenir en arrière).
3. Relancez et reconnectez-vous.

### Savoir si un problème vient de Nexium ou de Discord

1. Fermez Discord.
2. Renommez `resources/equicord/renderer.js` en `renderer.js.off`.
3. Créez un fichier vide `resources/equicord/.nexium-dev`.
4. Relancez et reproduisez le problème.

Si le problème persiste, il ne vient pas de Nexium. Pensez à tout remettre ensuite.

### Autres

| Problème | Solution |
|---|---|
| **SmartScreen bloque le `.exe`** | « Informations complémentaires » → « Exécuter quand même » |
| **Le `.exe` ne démarre pas** | Vérifiez qu'il est bien à la **racine** du dossier, pas dans un sous-dossier |
| **Discord classique déjà ouvert** | Fermez-le complètement (clic droit sur l'icône près de l'horloge → Quitter) |
| **Rien ne se met à jour** | Ouvrez `resources/equicord/.nexium-update.log` : il indique à chaque lancement *« MIS À JOUR »*, *« à jour »* ou l'erreur rencontrée |

---

## Désinstallation

Fermez Discord et supprimez le dossier du client. **Rien n'est installé ailleurs sur
le système** (ni base de registre, ni service, ni fichier caché).

Pour effacer aussi vos réglages Nexium : **Nexium Données → Tout effacer** avant de
supprimer le dossier.

---

## FAQ

<details>
<summary><b>🔒 Sécurité et confiance</b></summary>

<br>

**Est-ce que c'est un virus ?**
Non. Le `.exe` relance Discord avec du code supplémentaire injecté. Il n'est pas
signé numériquement (la signature coûte cher et peu de projets communautaires la
paient), ce qui déclenche des alertes automatiques de Windows — sans que cela
signifie que le fichier est malveillant.

**Pourquoi mon antivirus le signale ?**
Modifier Discord (patch de fichiers, exécutable non signé) correspond à des
comportements que les antivirus surveillent, même légitimes. C'est un faux positif
classique pour ce type d'outil.

**Comment être sûr de télécharger la bonne version ?**
Seul ce dépôt et **[nexium-client.netlify.app](https://nexium-client.netlify.app/)**
font foi. Si vous avez trouvé le client ailleurs, revenez vérifier ici avant
d'installer.

**Le code est-il vérifiable ?**
Entièrement. Rien n'est compilé en boîte noire : chaque fichier posé sur votre
machine est lisible, et le code complet est dans ce dépôt.

**Le client vérifie-t-il son intégrité ?**
Oui. Chaque mise à jour est validée avant d'être appliquée (taille, marqueurs
internes, somme de contrôle optionnelle). Un fichier tronqué ou corrompu est refusé
et la version précédente conservée.

</details>

<details>
<summary><b>🛡️ Compte et risques</b></summary>

<br>

**Est-ce que je risque un bannissement ?**
En théorie oui : modifier le client va à l'encontre des Conditions d'Utilisation de
Discord. En pratique, les bannissements pour ce seul motif restent rares, mais le
risque n'est **jamais nul**.

**Est-ce que ça casse mon Discord existant ?**
Non. Le client fonctionne en parallèle et ne modifie pas votre installation Discord
officielle. Compte, serveurs et réglages restent intacts.

**Puis-je revenir au Discord normal ?**
À tout moment : fermez cette version et rouvrez votre Discord habituel.

</details>

<details>
<summary><b>⚙️ Fonctionnement technique</b></summary>

<br>

**Comment fonctionne la mise à jour automatique ?**
Au lancement, le client télécharge la dernière version publiée, la vérifie, puis
l'applique **avant** de démarrer Discord. Un seul redémarrage suffit.

**Puis-je désactiver les mises à jour ?**
Oui : créez un fichier vide `.nexium-dev` dans `resources/equicord`. Utile pour
tester vos propres modifications sans qu'elles soient écrasées.

**Compatible avec Vencord ou BetterDiscord ?**
Nexium est un client autonome. Faire tourner plusieurs clients modifiés en parallèle
n'est pas recommandé et provoque des conflits.

**Mac ou Linux ?**
Non, Windows uniquement pour le moment.

**Le client ralentit-il Discord ?**
Non. La vérification des liens prend environ **2,5 microsecondes** par lien, la base
de menaces est chargée par tranches pour ne jamais figer l'interface, et les
minuteries se suspendent quand Discord est en arrière-plan.

</details>

<details>
<summary><b>🕵️ Vie privée</b></summary>

<br>

**Mes statistiques sont-elles envoyées quelque part ?**
Non. **Nexium Stats est entièrement local** : les données restent sur votre machine
et vous pouvez tout consulter ou effacer depuis Nexium Données.

**Qu'est-ce qui est envoyé, alors ?**
Uniquement votre identifiant Discord au démarrage (pour le registre des
utilisateurs), et le contenu d'un signalement si vous en faites un. Le détail complet
est dans la section [Vie privée](#vie-privée--ce-qui-sort-de-votre-machine).

**Quelqu'un peut-il voir mon token ?**
Le client ne fait que ce que le code publié ici décrit — c'est précisément pourquoi
tout reste visible plutôt que caché dans un installateur. Nexium va plus loin : il
**vous alerte** si un jeton ou un webhook apparaît dans un message.

**Le moniteur réseau m'espionne-t-il ?**
C'est l'inverse : il vous montre les requêtes émises par le client pour que vous
gardiez un œil dessus.

</details>

<details>
<summary><b>🧩 Installation et utilisation</b></summary>

<br>

**Dois-je refaire l'installation à chaque mise à jour ?**
Non, une seule fois. Ensuite tout est automatique.

**Le script d'installation demande-t-il des droits administrateur ?**
Non. Tout est installé dans votre dossier utilisateur.

**Comment mettre à jour le lanceur lui-même ?**
Relancez le script d'installation : il conserve vos réglages et remplace le reste.

**Comment tout supprimer proprement ?**
Fermez Discord et supprimez le dossier du client. Rien n'est installé ailleurs.

</details>

---

## Équipe et support

| | |
|---|---|
| **5dj0** | Créateur et développeur principal |
| **kikou** | Développeur C++ / Lua / Luau |
| **Zeo** | Communication et visibilité |
| **Ps9chotik** | Support technique — écrivez-lui en message privé |

Un bug, une question, une idée ? Ouvrez une **[issue](../../issues)**, ou retrouvez
la communauté depuis la page **Nexium Sponsor** du client.

---

<div align="center">

**Nexium Collective** · [nexium-client.netlify.app](https://nexium-client.netlify.app/)

Gratuit et open-source.

</div>
