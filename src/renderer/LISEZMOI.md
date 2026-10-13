# Sources de `renderer.js`

`resources/equicord/renderer.js` est le fichier que chaque client télécharge au
démarrage. Il est désormais **construit** à partir de ce dossier : on ne le
modifie plus à la main.

| Fichier | Contenu |
|---|---|
| `000-equicord-tete.js` | Début du bundle Equicord (minifié) |
| `nexium/NNN-nom.js` | Le code Nexium, un fichier par module (`_NXPR` = Protect, `_NXP` = Privacy, `_NXIA` = IA, `_NXUP` = mises à jour…) ou par page (`NexiumProtect`, `NexiumVocal`…) |
| `999-equicord-queue.js` | Fin du bundle Equicord, avec les retouches Nexium (sections des réglages, etc.) |

Le numéro en tête de fichier fixe l'ordre de concaténation : ne le change pas
sans raison, l'ordre d'exécution en dépend.

## Modifier, puis publier

```sh
# 1. modifier un ou plusieurs fichiers de src/renderer/
# 2. reconstruire renderer.js et sa somme de contrôle
node outils/construire-renderer.js
# 3. pour publier une nouvelle version aux clients
node outils/construire-renderer.js --bump
# vérifier que renderer.js correspond bien aux sources
node outils/construire-renderer.js --verifier
```

Le lanceur des clients exige certains marqueurs à l'identique, au caractère
près : `_NXUP.VERSION="204"` (sans espace), et au moins vingt lignes de la
forme `var _NXxxx=window._NXxxx||`. Un formateur de code qui ajouterait des
espaces ferait refuser la mise à jour chez tout le monde : n'en passe pas sur
ces fichiers. Le build refuse de produire un fichier que le lanceur rejetterait.

Les fichiers gardent leurs fins de ligne CRLF d'origine (voir `.gitattributes`).
