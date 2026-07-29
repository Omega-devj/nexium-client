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

<div align="center">

**Nexium Client Team**

</div>
