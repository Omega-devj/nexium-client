# Nexium Client

Client Discord personnalisé basé sur Equicord, avec des modules maison
(lecteur audio, statistiques, tableau de bord de confidentialité, moniteur
réseau) et une mise à jour automatique depuis ce dépôt.

> ⚠️ **À lire avant d'installer**
> - Ce client **modifie Discord**, ce qui est contraire aux Conditions
>   d'Utilisation de Discord. L'utilisation se fait à vos propres risques
>   (un bannissement de compte est théoriquement possible).
> - Le client **se met à jour automatiquement** : à chaque démarrage, il
>   télécharge la dernière version du code depuis ce dépôt et l'exécute.
>   Vous faites donc confiance au mainteneur pour le code qu'il publiera
>   par la suite, pas seulement pour la version que vous installez aujourd'hui.
> - **Windows uniquement.**

## Pourquoi pas de `setup.exe` ?

Il n'y a pas d'installateur automatique. Tout est **posé manuellement et
visible** : vous voyez chaque fichier que vous placez sur votre ordinateur,
et l'intégralité du code est consultable dans ce dépôt. Rien n'est installé
en arrière-plan ni caché dans votre système. C'est un choix de
**transparence**, pas une garantie de sécurité — un exécutable reste un
exécutable, lancez-le en connaissance de cause.

## Installation (4 étapes)

1. **Téléchargez le code** : bouton vert **`Code` → `Download ZIP`** en haut
   de cette page. Décompressez le `.zip` où vous voulez (par ex. sur le Bureau).
   Vous obtenez un dossier `nexium-client-main`.
2. **Téléchargez l'exécutable** dans l'onglet **[Releases](../../releases)**
   (le `.exe` de lancement de Discord).
3. **Placez le `.exe` à la racine** du dossier `nexium-client-main`,
   à côté des autres fichiers du projet.
4. **Lancez le `.exe`.** Discord démarre avec les mods Nexium actifs.

C'est tout. L'application est prête.

## Mises à jour

Vous n'avez rien à refaire. À chaque lancement, le client récupère
automatiquement la dernière version depuis ce dépôt. Quand une mise à jour
est disponible, la carte **« Client Nexium »** (page *Notes de version* dans
les paramètres Discord) vous propose de **relancer pour l'appliquer**.

## Désinstallation

Fermez Discord et supprimez le dossier `nexium-client-main`. Rien n'est
installé ailleurs sur le système.

## Problèmes fréquents

- **Windows SmartScreen bloque le `.exe`** : « Informations complémentaires »
  → « Exécuter quand même » (l'exécutable n'est pas signé).
- **Discord ne se lance pas** : vérifiez que le `.exe` est bien à la **racine**
  du dossier, au même niveau que les autres fichiers, et pas dans un sous-dossier.
- **Discord classique déjà ouvert** : fermez-le complètement (clic droit sur
  l'icône près de l'horloge → Quitter) avant de lancer celui-ci.

Nexium Client Team
