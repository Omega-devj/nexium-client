# Plan de refonte de Nexium Client

> **But :** passer d'un client qui casse à chaque mise à jour de Discord et qui se
> modifie à la main dans un fichier de 6 Mo, à un projet qu'on construit depuis ses
> sources, qu'on teste automatiquement, qu'on publie signé, et qu'on remet à niveau
> en moins de 48 heures quand Discord change.

---

## 1. Où on en est

| Élément | État actuel | Problème |
|---|---|---|
| **Base Equicord** | 1.14.13.1, figée dans `renderer.js` et `patcher.js` | L'amont en est à **1.15.11.0**. Les correctifs (« patches ») ciblent un Discord ancien : chaque mise à jour de Discord en casse de nouveaux. **C'est la cause principale des bugs.** |
| **Code Nexium** | ~2,8 Mo, 112 modules `window._NXxx`, ES5, sans import ni type | Depuis la PR #7, découpé dans `src/renderer/`. Mais toujours collé dans un bundle compilé, avec des retouches faites à la main *dans* le code compilé d'Equicord. |
| **Construction** | `outils/construire-renderer.js` concatène des morceaux | Impossible de mettre à jour Equicord sans tout refaire à la main. |
| **Tests** | Les « bancs » cités dans le CHANGELOG ne sont pas dans le dépôt | Personne d'autre ne peut les lancer, et aucune CI ne les fait tourner. |
| **Mises à jour** | Chaque client exécute ce qui est sur `main` au démarrage | Fusionner = déployer chez tout le monde. Somme djb2 publiée au même endroit que le fichier : protège de la corruption, pas d'un compte compromis. |
| **Distribution** | `Nexium.exe` de 177 Mo non signé, Electron « NanoCord » portable, binaires et modules de Discord commités dans git | Alertes SmartScreen ; dépôt lourd ; **le code propriétaire de Discord (`resources/modules/discord_*`) est redistribué publiquement**. |
| **Backend** | Supabase : 2 fonctions sur 6 dans le dépôt, SQL non versionné | `users`, `community`, `report`, `repaire` et toutes les fonctions SQL (abonnements, tickets, bannissements) n'existent que sur le serveur. |
| **Licence** | GPL-3.0 ajoutée (PR #7), code désobfusqué | Les verrous d'abonnement côté client sont contournables par nature (le CHANGELOG v190 le reconnaît). |
| **Plateformes** | Windows uniquement | Le portable embarque des DLL Windows. |

---

## 2. À quoi ressemble « un projet sérieux »

Chaque critère est vérifiable :

1. **Reproductible** : `git clone` puis `pnpm build` produisent exactement ce que reçoivent les utilisateurs.
2. **À jour** : base Equicord à moins de deux semaines de l'amont, et aucun patch cassé sur le Discord stable du jour (vérifié par la CI).
3. **Testé** : chaque PR passe lint, types, tests unitaires, tests des patches et tests du lanceur. Rien ne part en production sans CI verte.
4. **Publié proprement** : un canal `stable` distinct de `main`, des mises à jour **signées** (ed25519), un exécutable **signé**, des notes de version générées.
5. **Backend versionné** : toutes les fonctions et toutes les migrations SQL dans le dépôt, avec un projet de préproduction.
6. **Clair juridiquement** : GPL respectée, aucun code de Discord redistribué, politique de confidentialité qui nomme les sous-traitants de l'IA (Groq, et Google pour les administrateurs).
7. **Documenté** : guide de contribution, architecture, procédure de publication, politique de sécurité.

---

## 3. Les décisions à prendre d'abord

### Décision A : comment Nexium vit à côté d'Equicord

| Option | Pour | Contre |
|---|---|---|
| **A1. Fork d'Equicord, Nexium dans `src/nexiumplugins/`** *(recommandé)* | On garde la chaîne de build, les types et les outils de test des patches d'Equicord. Une mise à jour amont = un `git merge` de leur tag. | Il faut porter les 112 modules en plugins Equicord, un par un. |
| A2. Nexium en « userplugins » sur un Equicord non modifié | Aucune divergence avec l'amont | Les retouches de l'interface Equicord (sections des réglages, page des notes de version) deviennent difficiles. |
| A3. Garder le bundle et y recoller Nexium | Rien à porter | C'est la situation actuelle : elle casse à chaque mise à jour. |

### Décision B : la coquille (ce que l'utilisateur lance)

| Option | Pour | Contre |
|---|---|---|
| B1. Garder le portable « NanoCord » actuel | Rien à changer à court terme | Redistribue le code de Discord ; 177 Mo ; Windows seul ; Krisp bloqué (sa licence exige l'appli signée par Discord). |
| B2. Injection dans le Discord officiel (comme l'installateur d'Equicord) | Discord se met à jour seul ; Krisp marche ; aucun binaire de Discord redistribué | Une mise à jour de Discord peut retirer l'injection (il faut un « réparer ») ; ça touche l'installation officielle, ce que le README promet de ne pas faire. |
| **B3. Coquille Electron propre, sur la base d'Equibop** *(recommandé à terme)* | Aucun code de Discord ; **Windows, macOS, Linux** ; installateur et mises à jour standards (electron-builder, electron-updater) ; signature de code ; la voix passe par WebRTC dans la page, donc le best-of peut lire les voix sans passer par le moteur natif de Discord. | Pas de modules natifs Discord : détection des jeux limitée, Krisp absent. Certaines fonctions de Nexium Vocal sont à réécrire. |

**Recommandation :** A1 tout de suite, car c'est ce qui règle les bugs. B1 pendant la transition, puis B3. On garde B2 comme option « avancée » si des utilisateurs tiennent à Krisp.

### Décision C : le modèle d'abonnement

Avec un code GPL lisible, un verrou côté client ne protège rien. Les fonctions payantes doivent coûter **côté serveur** (IA, relais, stockage du Repaire), et les fonctions purement locales doivent rester gratuites. Le relais de l'IA applique déjà ce principe ; il faut l'étendre et retirer les verrous locaux.

---

## 4. Les phases

### Phase 0 : sécuriser l'existant *(1 semaine)*

But : arrêter de prendre des risques en production, avant de toucher au reste.

- [ ] Relire et fusionner la PR #7 ; déployer `sbx` (`supabase functions deploy sbx`).
- [ ] **Protéger `main`** : 2FA obligatoire sur le compte, branche protégée, fusion uniquement par PR.
- [ ] **Séparer « fusionner » et « déployer »** : lanceur v8 qui lit les mises à jour sur une branche `stable` (ou les Releases GitHub) au lieu de `main`. On publie en avançant `stable`, jamais par accident.
- [ ] **Signer les mises à jour** : paire de clés ed25519, clé publique dans le lanceur v8, clé privée uniquement dans les secrets de la CI. Le lanceur refuse un `renderer.js` ou un `index.js` non signé. Transition : la v8 arrive encore par l'ancien canal ; toutes les publications suivantes sont signées.
- [ ] **CI GitHub Actions** sur chaque PR :
  - `construire-renderer.js --verifier` ;
  - `node --check` sur tous les JS ;
  - analyse PowerShell de l'installateur ;
  - `tsc` sur les fonctions Supabase ;
  - les tests de `outils/tests/`.
- [ ] Rapatrier les **bancs** cités dans le CHANGELOG (badge, canal chiffré, ligne de secours, vocal, laboratoire…) dans `outils/tests/`, et les brancher sur la CI.
- [ ] Rapatrier le **backend** : `supabase functions download` pour `users`, `community`, `report`, `repaire`, et `supabase db pull` pour obtenir les migrations SQL (tables, fonctions RPC, règles RLS).
- [ ] Audit des règles RLS et des fonctions RPC : toute fonction qui prend un identifiant Discord doit vérifier un jeton, pas croire l'identifiant (déjà fait pour les tickets, à généraliser).
- [ ] `SECURITY.md` : comment signaler une faille.

**Fini quand :** une PR ne peut plus casser la production sans avoir été testée et signée.

### Phase 1 : se rebrancher sur Equicord à jour *(2 à 3 semaines)* : règle les bugs

But : plus aucun patch cassé, et une mise à jour amont qui prend une heure au lieu d'une semaine.

1. [ ] **Inventorier les retouches faites à la main.** Construire Equicord `v1.14.13.1` depuis l'amont (le tag existe) et comparer avec `src/renderer/000-equicord-tete.js` et `999-equicord-queue.js`. Chaque différence est une retouche Nexium (renommage NanoCord, sections des réglages, page des notes de version remplacée, badges…). On obtient une liste exhaustive, au lieu de la deviner.
2. [ ] **Créer le fork** : Equicord `v1.15.11.0` comme base, Nexium dans `src/nexiumplugins/`. Les retouches de l'étape 1 deviennent des plugins ou des patches propres, jamais des modifications du code compilé.
3. [ ] **Porter les modules**, du socle vers les pages :
   - le socle : `_NXDB` (stockage), `_NXI` (traduction), `_NXERR`, `_NXPERF`, `_NXNETX` ;
   - puis Protect (`_NXPR`), Privacy (`_NXP`), les gardes de sortie (`_NXV`, `_NXGD`) ;
   - puis les pages, une par une.

   Chaque module devient un fichier TypeScript avec des `import` à la place de `window._NXxx`. React passe par `@webpack/common` au lieu de `F.useState`.
4. [ ] **Traductions** : passer de clés « phrase française » (449 Ko dans `_NXI`) à des clés stables, avec un fichier par langue. Ça permet d'ajouter d'autres langues sans toucher au code.
5. [ ] **Compatibilité avec les clients installés** : tant qu'un lanceur v6 ou v7 tourne quelque part, le `renderer.js` produit doit garder `_NXUP.VERSION="N"` et vingt lignes `var _NXxx=window._NXxx||`. Le lanceur v8 (phase 0) remplace ce contrôle par la signature, ce qui libère le format.
6. [ ] **Test des patches en CI** : `pnpm buildReporter` d'Equicord, lancé chaque nuit contre le Discord stable. Un patch cassé ouvre une issue automatiquement.
7. [ ] **Synchronisation amont** : une action hebdomadaire ouvre une PR « Equicord vX → vY ». La CI dit ce qui casse.

**Fini quand :** `pnpm build` produit le client complet, et le rapport des patches est vide sur le Discord du jour.

### Phase 2 : qualité du code Nexium *(continu, environ 6 semaines)*

- [ ] TypeScript strict, ESLint et Prettier : enfin possibles, puisque le format du fichier n'est plus imposé par le lanceur.
- [ ] Découper les modules géants :
  - `_NXIA` (158 Ko) et `NexiumIA` (83 Ko) ;
  - `_NXPR` (143 Ko) ;
  - `_NXI` (451 Ko, surtout le dictionnaire) ;
  - `NexiumAdmin` (80 Ko).

  Cible : aucun fichier au-delà de 800 lignes.
- [ ] Un seul système de composants : les briques communes existent déjà (tuiles, jauges, entêtes). On les sort dans `src/nexiumplugins/_ui/`, typées et documentées.
- [ ] Tests unitaires sur la logique pure :
  - classement des liens et base de menaces ;
  - détecteur de manipulation, avec son corpus FR/EN de 28 fils ;
  - caviardage des jetons, bac à sable de fichiers, sismographe.
- [ ] Budget de performance mesuré en CI : temps de démarrage, mémoire, coût par module. La carte « Fluidité » le mesure déjà côté client ; on le fait aussi avant de publier.
- [ ] Accessibilité : noms accessibles, navigation clavier, « réduire les animations ». Le CHANGELOG montre que c'était fait au cas par cas ; on l'automatise (axe-core dans les tests de rendu).

### Phase 3 : une distribution professionnelle *(2 à 3 semaines)*

- [ ] **Coquille B3** : fork d'Equibop renommé Nexium, avec electron-builder pour un installateur NSIS (Windows), DMG (macOS), AppImage/deb (Linux).
- [ ] **Signature de code** Windows : SignPath Foundation (gratuit pour l'open source) ou Azure Trusted Signing. Fin des alertes SmartScreen à terme.
- [ ] **Mises à jour de l'application** par electron-updater depuis les Releases GitHub ; mises à jour du code Nexium par le canal signé de la phase 0.
- [ ] **Sortir les binaires de git** : DLL, `.pak`, modules Discord, `Nexium.exe`. Ils ne vivent plus que dans les Releases. Nettoyer l'historique (`git filter-repo`) pour alléger le dépôt.
- [ ] **Ne plus redistribuer le code de Discord** : la coquille B3 n'en a pas besoin.
- [ ] Installateur PowerShell gardé pour la transition, mais qui **vérifie le SHA-256** de ce qu'il télécharge (GitHub le publie pour chaque fichier de Release).
- [ ] Paquets `winget` et `scoop`.
- [ ] Deux canaux : `stable` et `beta`, avec un interrupteur dans le client.

### Phase 4 : un backend propre *(2 semaines, en parallèle des phases 2 et 3)*

- [ ] Projet Supabase de préproduction (branches Supabase) ; on ne teste plus en production.
- [ ] Migrations SQL versionnées et relues comme du code ; tests des RPC avec `pgTAP`.
- [ ] Tests `deno test` pour chaque fonction ; `sbx` a déjà son test de filtrage réseau.
- [ ] Limites de débit côté base, pas en mémoire d'instance (celles de `sbx` sont remises à zéro à chaque instance).
- [ ] Rotation des clés (Groq, Gemini) et alerte de consommation.
- [ ] Abonnements : paiement par un prestataire (Stripe ou Lemon Squeezy) avec webhooks ; les droits ne sont décidés **que** côté serveur.
- [ ] **RGPD** :
  - politique de confidentialité publique, qui nomme les destinataires des questions posées à l'IA : Groq, et Google pour l'essai réservé aux administrateurs ;
  - durées de conservation écrites (tickets : 15 jours, déjà en place) ;
  - une fonction « supprimer toutes mes données ».

### Phase 5 : produit et communauté *(continu)*

- [ ] `CONTRIBUTING.md`, modèles d'issue et de PR, `CODEOWNERS`, code de conduite.
- [ ] `docs/ARCHITECTURE.md` : le schéma de démarrage, les modules, les flux réseau. L'analyse faite pour la PR #7 sert de base.
- [ ] Feuille de route publique (GitHub Projects).
- [ ] Notes de version générées à partir des commits ; l'animation par version reste un plus.
- [ ] Un serveur de test et des testeurs bêta inscrits sur le canal `beta`.

---

## 5. Calendrier indicatif

| Semaines | Phase | Livrable visible |
|---|---|---|
| 1 | 0 | `main` protégé, CI verte, mises à jour signées, `sbx` déployé |
| 2–4 | 1 | Client construit depuis le fork Equicord 1.15.11.0, zéro patch cassé |
| 5–10 | 2 | Code Nexium en TypeScript, découpé, testé |
| 6–8 | 3 | Installateur signé Windows, puis macOS et Linux |
| 5–6 | 4 | Backend versionné, préproduction, politique de confidentialité |
| ensuite | 5 | Documentation, contributions, canal bêta |

Les durées supposent une personne à temps plein ; à mi-temps, compter le double.

---

## 6. Ce que je fais ensuite, dans l'ordre

1. **CI GitHub Actions** avec les vérifications qui existent déjà (build, tests, syntaxe).
2. **Lanceur v8** : canal `stable` et signature ed25519. C'est le préalable à tout le reste, puisque c'est lui qui décide de ce qui s'exécute chez les utilisateurs.
3. **Inventaire des retouches** dans le bundle (comparaison avec Equicord 1.14.13.1 reconstruit depuis l'amont).
4. **Fork Equicord 1.15.11.0** avec le socle Nexium porté (`_NXDB`, `_NXI`, `_NXERR`), puis Protect et Privacy.
5. **Rapatriement du backend** (fonctions et migrations), dès que tu me donnes accès au projet Supabase.

---

## 7. Risques

| Risque | Probabilité | Parade |
|---|---|---|
| Bannissement de comptes par Discord (conditions d'utilisation) | Faible mais réelle | Le dire clairement (c'est fait dans le README) ; pas d'automatisation agressive (envois de messages plafonnés, déjà en place). |
| Compromission du compte GitHub, donc code malveillant chez tous les clients | Faible, impact maximal | Phase 0 : 2FA, branche protégée, signature des mises à jour avec une clé hors du dépôt. |
| Le portage casse des fonctions existantes | Moyenne | Porter module par module, tests avant/après, canal bêta. |
| Equicord change d'API entre deux versions | Moyenne | Synchronisation hebdomadaire plutôt que des sauts de six mois. |
| Plaintes liées à la redistribution du code de Discord | Faible | Phase 3 : ne plus le distribuer. |
| Abonnements contournés (code GPL) | Certaine pour les verrous locaux | Décision C : ne faire payer que ce qui coûte côté serveur. |
