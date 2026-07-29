<div align="center">

# Nexium Client

**Client Discord personnalisé basé sur Equicord**

![Officiel](https://img.shields.io/badge/d%C3%A9p%C3%B4t-officiel-ff4b23?style=flat-square)
![Windows](https://img.shields.io/badge/plateforme-Windows-2b2b2b?style=flat-square)
![Maintenu par](https://img.shields.io/badge/maintenu%20par-Nexium%20Collective-2b2b2b?style=flat-square)

[Site officiel](https://nexium-client.netlify.app/) · [Releases](../../releases) · [Signaler un problème](../../issues)

</div>

---

> ### ✅ Ceci est le dépôt officiel de Nexium Client
> Développé et maintenu par **Nexium Collective**. Le site de référence est
> **[nexium-client.netlify.app](https://nexium-client.netlify.app/)** — c'est le seul lien officiel.
> Aucun autre dépôt, page ou canal ne représente ce projet. En cas de doute
> sur l'authenticité d'une copie, d'un fork ou d'un site tiers, vérifiez
> toujours ici avant de télécharger quoi que ce soit.

---

## Sommaire

- [Présentation](#présentation)
- [À lire avant d'installer](#à-lire-avant-dinstaller)
- [Pourquoi pas de setup.exe ?](#pourquoi-pas-de-setupexe-)
- [Installation](#installation-4-étapes)
- [Mises à jour](#mises-à-jour)
- [Désinstallation](#désinstallation)
- [Problèmes fréquents](#problèmes-fréquents)
- [FAQ](#faq)

---

## Présentation

Nexium Client ajoute à Discord des modules maison développés en interne :

| Module | Fonction |
|---|---|
| 🎧 Lecteur audio | Lecture intégrée directement dans le client |
| 📊 Statistiques | Suivi de votre activité |
| 🔒 Tableau de bord de confidentialité | Contrôle des données et permissions |
| 📡 Moniteur réseau | Visibilité sur les requêtes réseau du client |

Le client se met à jour automatiquement depuis **ce dépôt**, qui reste la
seule source de vérité pour le code publié.

---

## ⚠️ À lire avant d'installer

- Ce client **modifie Discord**, ce qui est contraire aux Conditions
  d'Utilisation de Discord. L'utilisation se fait à vos propres risques
  (un bannissement de compte est théoriquement possible).
- Le client **se met à jour automatiquement** : à chaque démarrage, il
  télécharge la dernière version du code depuis ce dépôt officiel et
  l'exécute. Vous faites donc confiance au mainteneur pour le code qu'il
  publiera par la suite, pas seulement pour la version installée aujourd'hui.
- **Windows uniquement.**

---

## Pourquoi pas de `setup.exe` ?

Il n'y a pas d'installateur automatique. Tout est **posé manuellement et
visible** : vous voyez chaque fichier que vous placez sur votre ordinateur,
et l'intégralité du code est consultable dans ce dépôt. Rien n'est installé
en arrière-plan ni caché dans votre système. C'est un choix de
**transparence**, pas une garantie de sécurité — un exécutable reste un
exécutable, lancez-le en connaissance de cause.

---

## Installation (4 étapes)

1. **Téléchargez le code** — bouton vert **`Code` → `Download ZIP`** en haut
   de cette page. Décompressez le `.zip` où vous voulez (par ex. sur le
   Bureau). Vous obtenez un dossier `nexium-client-main`.
2. **Téléchargez l'exécutable** dans l'onglet **[Releases](../../releases)**
   (le `.exe` de lancement de Discord).
3. **Placez le `.exe` à la racine** du dossier `nexium-client-main`, à côté
   des autres fichiers du projet.
4. **Lancez le `.exe`.** Discord démarre avec les mods Nexium actifs.

C'est tout. L'application est prête.

---

## Mises à jour

Vous n'avez rien à refaire. À chaque lancement, le client récupère
automatiquement la dernière version depuis ce dépôt officiel. Quand une
mise à jour est disponible, la carte **« Client Nexium »** (page *Notes de
version* dans les paramètres Discord) vous propose de **relancer pour
l'appliquer**.

---

## Désinstallation

Fermez Discord et supprimez le dossier `nexium-client-main`. Rien n'est
installé ailleurs sur le système.

---

## Problèmes fréquents

| Problème | Solution |
|---|---|
| **Windows SmartScreen bloque le `.exe`** | Cliquez « Informations complémentaires » → « Exécuter quand même » (l'exécutable n'est pas signé). |
| **Discord ne se lance pas** | Vérifiez que le `.exe` est bien à la **racine** du dossier, au même niveau que les autres fichiers, et pas dans un sous-dossier. |
| **Discord classique déjà ouvert** | Fermez-le complètement (clic droit sur l'icône près de l'horloge → Quitter) avant de lancer celui-ci. |

---

## FAQ

### 🔒 Sécurité & confiance

**Est-ce que c'est un virus ?**
Non. C'est un client Discord modifié : le `.exe` relance simplement Discord
avec du code supplémentaire injecté. Le fait qu'il ne soit pas signé
numériquement (signer coûte de l'argent et n'est pas fait par la plupart
des projets communautaires) déclenche des alertes automatiques de Windows,
mais ça ne veut pas dire que le fichier est malveillant.

**Pourquoi mon antivirus ou Windows SmartScreen le signale ?**
Les modifications de Discord (patch de fichiers, exécutable non signé)
correspondent à des comportements que les antivirus surveillent par
défaut, même quand ils sont légitimes. C'est un faux positif classique
pour ce type d'outil, pas une preuve de danger.

**Comment être sûr que je télécharge la bonne version et pas une copie piégée ?**
Le seul dépôt officiel est celui-ci, et le seul site de référence est
**[nexium-client.netlify.app](https://nexium-client.netlify.app/)**. Si
vous avez trouvé le client ailleurs (autre site, lien Discord, forum),
revenez toujours vérifier ici avant d'installer quoi que ce soit.

**Le code est-il vérifiable ?**
Oui, entièrement. Rien n'est compilé en boîte noire à l'installation :
chaque fichier posé sur votre machine est visible, et le code source
complet est consultable dans ce dépôt. Vous pouvez l'inspecter avant de
lancer quoi que ce soit.

### 🛡️ Compte & risques

**Est-ce que je risque un bannissement de mon compte Discord ?**
En théorie oui, puisque modifier le client va à l'encontre des Conditions
d'Utilisation de Discord — c'est écrit noir sur blanc plus haut, on ne
vous le cache pas. En pratique, les bans pour l'usage d'un client modifié
seul (sans autre comportement abusif) restent rares, mais le risque
n'est jamais nul.

**Est-ce que ça peut casser mon Discord ?**
Non : le `.exe` ne modifie pas votre installation Discord existante. Il
lance une version parallèle avec les mods actifs. Vous gardez votre
compte, vos serveurs et vos réglages intacts.

**Puis-je revenir au Discord normal facilement ?**
Oui, à tout moment. Fermez simplement cette version et rouvrez votre
Discord habituel (ou réinstallez-le depuis discord.com si besoin). Rien
n'est remplacé de façon permanente.

### 🕵️ Vie privée

**Est-ce que le client envoie mes données quelque part ?**
Non : zéro télémétrie. Aucune donnée de statistiques d'usage n'est
renvoyée vers un serveur externe.

**Est-ce que quelqu'un peut voir mon token ou mon mot de passe ?**
Le client ne fait rien d'autre que ce que le code publié dans ce dépôt
décrit — c'est justement pour ça que tout est laissé visible plutôt que
caché dans un installateur. Si vous voulez une certitude totale, c'est
consultable ligne par ligne avant de lancer quoi que ce soit.

**Le module "moniteur réseau" m'espionne-t-il, moi ?**
Non, c'est l'inverse : il vous montre les requêtes réseau émises par le
client, pour que ce soit vous qui gardiez un œil dessus — pas pour
collecter quoi que ce soit de votre côté.

### ⚙️ Fonctionnement technique

**Comment fonctionne la mise à jour automatique ?**
À chaque lancement, le `.exe` va chercher la dernière version du code sur
ce dépôt officiel et l'applique avant de démarrer Discord. Vous n'avez
jamais besoin de retélécharger quoi que ce soit manuellement.

**Puis-je désactiver les mises à jour automatiques ?**
Non, ce n'est pas une option pour l'instant : le fonctionnement du client
dépend de la synchronisation avec ce dépôt à chaque démarrage.

**Est-ce compatible avec Vencord, BetterDiscord ou d'autres mods ?**
Nexium Client est basé sur Nexium Mods (une version beaucoup plus complète qu'equicord) mais reste un client autonome. Faire
tourner plusieurs clients modifiés en parallèle n'est pas recommandé et
peut provoquer des conflits.

**Ça fonctionne sur Mac ou Linux ?**
Non, uniquement sur Windows pour le moment.

### 🧩 Installation & utilisation

**J'ai fait une erreur, comment tout supprimer proprement ?**
Fermez Discord, supprimez le dossier `nexium-client-main` (qui contient
le `.exe` et tous les fichiers du projet). C'est tout : rien n'est
installé ailleurs sur le système.

**Le `.exe` ne se lance pas, que faire ?**
Vérifiez d'abord qu'il est bien à la racine du dossier `nexium-client-main`
et pas dans un sous-dossier. Voir aussi la section
[Problèmes fréquents](#problèmes-fréquents) ci-dessus.

**Dois-je refaire les 4 étapes d'installation à chaque mise à jour ?**
Non, une seule fois. Ensuite le client se met à jour tout seul au
lancement.

### 💬 Support & communauté

**Le projet est-il toujours maintenu ?**
Oui, activement, par la Nexium Collective — c'est justement pour ça que
les mises à jour sont automatiques.

**Où signaler un bug ou poser une question ?**
Dans l'onglet **[Issues](../../issues)** de ce dépôt.

**Est-ce gratuit ?**
Oui, entièrement gratuit et open-source.

---

<div align="center">

**Nexium Client Team**

</div>
