var NexiumProtectIcon=function(p){p=p||{};var z=p.width||p.height||20;return (window._NXFX&&_NXFX.svg)?_NXFX.svg("bouclierOk",z):null;};
var SH_LIENS=[
{k:"maskLinks",ic:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zM2 4.27 3.28 3 21 20.73 19.73 22 2 4.27z",t:"Masquage des liens dangereux",d:"Recouvre le lien dans le message : il n est plus lisible, plus copiable, plus cliquable par erreur. C est la seule protection qui agit avant meme que tu decides quoi que ce soit."},
{k:"maskSuspect",ic:"M12 2 2 7v7c0 5 3.5 8.5 10 10 6.5-1.5 10-5 10-10V7L12 2zm1 15h-2v-2h2v2zm0-4h-2V8h2v5z",t:"Masquer aussi les liens douteux",d:"Etend le masquage aux liens raccourcis et a ceux que l analyse trouve inhabituels sans certitude. Plus sur, plus bavard."},
{k:"scanLinks",ic:"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",t:"Scanner de liens",d:"Analyse chaque lien reçu et t avertit avant l ouverture d un site piégé."},
{k:"blockGrabbers",ic:"M12 2L2 7v7c0 5 3.5 8.5 10 10 6.5-1.5 10-5 10-10V7L12 2zm3 11h-2v2h-2v-2H9v-2h2V9h2v2h2v2z",t:"Protection anti-doxxing / IP",d:"Bloque les loggers d IP (grabify, iplogger…) utilisés pour te géolocaliser."},
{k:"phishGuard",ic:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",t:"Anti-hameçonnage",d:"Détecte les faux Discord/Steam et les domaines trompeurs (dlscord, punycode…)."},
{k:"scamAlerts",ic:"M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",t:"Alertes anti-arnaque",d:"Repère les messages d arnaque : faux Nitro, dons crypto, cadeaux piégés."},
{k:"warnAccounts",ic:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",t:"Vigilance comptes suspects",d:"Signale les messages privés venant de comptes très récents."},
{k:"consoleGuard",ic:"M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",t:"Protection console",d:"Avertit contre les arnaques « colle ce code dans la console » qui volent ton compte."},
{k:"heuristics",ic:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",t:"Détection intelligente",d:"Repère les domaines inconnus qui imitent une marque ou utilisent une extension à risque."}];
var SH_CONTENU=[
{k:"scanFiles",ic:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z",t:"Analyse des fichiers",d:"Vérifie le contenu réel des pièces jointes : un .exe renommé en .png est détecté."},
{k:"scanDownloads",ic:"M5 20h14v-2H5v2zM19 9h-4V3H9v6H5l7 7 7-7z",t:"Blocage des téléchargements",d:"Bloque les liens pointant vers un exécutable, sauf depuis une source de confiance."},
{k:"scanMasked",ic:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z",t:"Liens masqués trompeurs",d:"Détecte quand le texte affiché cache une destination différente."},
{k:"scanEmbeds",ic:"M21 3H3v18h18V3zm-2 16H5V5h14v14zM7 10h10v2H7z",t:"Aperçus de liens",d:"Analyse les adresses contenues dans les aperçus (embeds)."},
{k:"scanEdits",ic:"M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",t:"Messages modifiés",d:"Réanalyse un message édité après envoi : le piège classique."},
{k:"scanInvites",ic:"M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2z",t:"Invitations de serveur",d:"Vérifie l âge, la taille et le nom des serveurs proposés."},
{k:"scanImpostor",ic:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",t:"Usurpation d amis",d:"Alerte si un compte imite le pseudo et l avatar d un de tes contacts."},
{k:"scanWaves",ic:"M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z",t:"Vagues de messages privés",d:"Détecte les campagnes : même message envoyé par plusieurs comptes."},
{k:"qrGuard",ic:"M3 11h8V3H3v8zm2-6h4v4H5V5zM3 21h8v-8H3v8zm2-6h4v4H5v-4zM13 3v8h8V3h-8zm6 6h-4V5h4v4zM13 13h2v2h-2zM17 13h2v2h-2zM15 15h2v2h-2zM13 17h2v2h-2zM17 17h2v2h-2z",t:"Arnaque au QR code",d:"Avertit quand on te demande de scanner un QR code de connexion."},
{k:"scanStatus",ic:"M17 7h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.71 0-3.1-1.39-3.1-3.1S5.29 8.8 7 8.8h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9zM8 11h8v2H8z",t:"Liens dans les statuts",d:"Analyse les liens présents dans les statuts personnalisés."},
{k:"clipGuard",ic:"M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z",t:"Surveillance du presse-papiers",d:"Prévient si un jeton ou un webhook se retrouve dans ton presse-papiers."}];
var SH_AVANCE=[
{k:"oauthGuard",ic:"M12.65 10A5.99 5.99 0 0 0 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6a5.99 5.99 0 0 0 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z",t:"Autorisations d application",d:"Analyse les liens OAuth2 et alerte sur les portées dangereuses : ajout de bot, webhook, permissions administrateur."},
{k:"schemeGuard",ic:"M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",t:"Schémas d URI exécutables",d:"Bloque les liens javascript:, vbscript:, file: et data:text/html, qui exécutent du code au lieu d ouvrir une page."},
{k:"bidiGuard",ic:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",t:"Caractères invisibles et inversion",d:"Repère les caractères masqués et l inversion du sens de lecture, qui font afficher autre chose que le vrai lien."},
{k:"ipGuard",ic:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",t:"Liens vers une adresse IP",d:"Signale les liens qui pointent vers une adresse IP brute au lieu d un nom de domaine."},
{k:"codeGuard",ic:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 12h-2v-2h2v2zm0-4h-2V6h2v4z",t:"Demande de code de vérification",d:"Alerte quand on te réclame un code à 6 chiffres, un code 2FA ou un code de secours."}];
var VA_COFFRE=[
{k:"blockExfil",ic:"M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 12c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z",t:"Blocage de l exfiltration",d:"Toute requête sortante contenant ton jeton, ton mot de passe ou tes cookies vers un domaine non-Discord est bloquée."},
{k:"scanThemes",ic:"M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z",t:"Analyse des thèmes",d:"Repère les ressources externes chargées par tes thèmes et QuickCSS, qui exposent ton adresse IP.",a:function(on){try{V._cssWarned=false;V.scanCss();}catch(_){}}},
{k:"verifyIntegrity",ic:"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z",t:"Vérification d intégrité",d:"Compare ton fichier client à la version publiée sur le dépôt officiel pour détecter toute altération locale.",a:function(on){try{if(on)V.checkIntegrity();}catch(_){}}},
{k:"community",ic:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",t:"Base communautaire partagée",d:"Bloque les domaines signalés par au moins 3 utilisateurs Nexium.",a:function(on){try{if(on)V.loadCommunity(true);else{V.comm=Object.create(null);V.commN=0;}_NXPR.cache=Object.create(null);}catch(_){}}}];
var VA_DEFENSE=[
{k:"selfGuard",ic:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",t:"Garde-fou avant envoi",d:"Prévient avant d envoyer un message contenant ton IP, une adresse, un téléphone, un e-mail, un IBAN ou une carte bancaire."},
{k:"guildGuard",ic:"M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-9 10H8v-2h3v2zm5-4H8v-2h8v2z",t:"Détection de serveur piégé",d:"Analyse les serveurs que tu rejoins : salon de vérification imposé, demande d autorisation d application, nom imitant une marque."},
{k:"deepFiles",ic:"M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4h2V2H6c-2.21 0-4 1.79-4 4v12c0 2.21 1.79 4 4 4h14v-8h-2zm-2-2v4h4v-4h-4z",t:"Fichiers doublement piégés",d:"Détecte les archives protégées par mot de passe, celles contenant un exécutable, et les noms utilisant l inversion de texte."},
{k:"giftGuard",ic:"M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z",t:"Faux cadeaux Nitro",d:"Vérifie la validité réelle des codes cadeau et repère les faux domaines imitant discord.gift."},
{k:"sessionGuard",ic:"M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z",t:"Surveillance des connexions",d:"Alerte quand une nouvelle session apparaît sur ton compte depuis un autre appareil."},
{k:"encryptLocal",ic:"M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z",t:"Chiffrement des données locales",d:"Chiffre tes statistiques, journaux et signalements dans le stockage local.",x:function(){try{V.applyEncryption(!V.cfg.encryptLocal);force();}catch(_){}}}];
var VA_REACTION=[
{k:"aftermath",ic:"M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",t:"Guide après incident",d:"Après un blocage, affiche les étapes concrètes à suivre avec accès direct aux réglages Discord."},
{k:"auditPlugins",ic:"M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z",t:"Audit des plugins",d:"Analyse le code des plugins installés : accès au jeton, envois vers l extérieur, code obfusqué.",a:function(on){try{if(on){V._plWarned=false;V.auditPlugins();}else V.plugins=[];}catch(_){}}},
{k:"identityGuard",ic:"M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm7-6.5l1.5 1.5L23 6.5 21.5 5 19 7.5z",t:"Surveillance de l identité",d:"Alerte si l e-mail, le téléphone ou la double authentification de ton compte changent."},
{k:"mediaGuard",ic:"M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z",t:"Caméra et partage d écran",d:"Prévient si un script ou un plugin ouvre la caméra, le micro ou le partage d écran sans que tu aies cliqué."},
{k:"graceDelay",ic:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z",t:"Délai avant les actions graves",d:"Autoriser une application, supprimer ou céder un serveur, couper la double authentification, changer d e-mail ou de mot de passe, supprimer le compte : la requête attend 12 secondes, le temps de l annuler."}];
var SH_PIEGES=[
{k:"unicodeGuard",m:"unicode",ic:"M12 4.5C7 4.5 2.7 7.6 1 12c1.7 4.4 6 7.5 11 7.5s9.3-3.1 11-7.5c-1.7-4.4-6-7.5-11-7.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",t:"Caracteres invisibles",d:"Un message peut cacher des dizaines de caracteres de largeur nulle : pour dissimuler un lien, contourner un filtre, ou marquer ta copie d un texte."},
{k:"cryptoGuard",m:"crypto",ic:"M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21a4.03 4.03 0 0 0-3.25-3.85V3h-3v2.16c-1.97.43-3.55 1.7-3.55 3.66 0 2.34 1.94 3.5 4.76 4.18 2.53.6 3.04 1.5 3.04 2.44 0 .7-.5 1.81-2.7 1.81-2.06 0-2.87-.92-2.98-2.1H5.32c.12 2.03 1.64 3.17 3.48 3.55V21h3v-2.15c1.98-.37 3.55-1.52 3.55-3.6 0-2.88-2.47-3.87-4.55-4.35z",t:"Adresses de portefeuille",d:"Signale une adresse crypto recue, et surtout : si tu en colles une differente de celle que tu avais copiee, un logiciel l a remplacee en chemin."},
{k:"dmLinkGuard",m:"dmlink",ic:"M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-3 9h-4v4h-2v-4H7V9h4V5h2v4h4v2z",t:"Liens prives d inconnus",d:"Un lien recu en message prive d un compte qui n est pas dans tes amis demande une confirmation. Ferme la porte d entree la plus utilisee."},
{k:"leakGuard",m:"leak",ic:"M18 8h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6zm3 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4z",t:"Fuite de webhook",d:"Si tu t appretes a coller l adresse complete d un webhook dans un message, Nexium te previent : n importe qui pourra ecrire dans ce salon."},
{k:"raidGuard",m:"raid",ic:"M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",t:"Vagues coordonnees",d:"Trois comptes crees recemment qui postent le meme message dans un serveur : c est une campagne, pas une coincidence."},
{k:"nameGuard",m:"nom",ic:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 15h-2v-2h2v2zm0-4h-2V9h2v4zm0-6V3.5L18.5 9H13z",t:"Noms de fichiers truques",d:"Une double extension, ou le sens de lecture inverse pour faire passer un executable pour une image. Les deux ruses les plus vieilles, toujours efficaces."}];
var SH_SORTIE=[
{k:"webhookGuard",m:"webhook",ic:"M20 6h-8l-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-8 11-4-4h2.5V9h3v4H16l-4 4z",t:"Gardien des webhooks",d:"Bloque l envoi de tes donnees par webhook Discord. C est la sortie preferee des voleurs de compte : elle passe par discord.com, donc rien ne la filtrait jusqu ici.",e:"envoi(s) arrete(s)"},
{k:"egressGuard",m:"egress",ic:"M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6a2 2 0 0 1 2 2v1h1v5H9v-5h1V9a2 2 0 0 1 2-2zm0 1.5a.5.5 0 0 0-.5.5v1h1V9a.5.5 0 0 0-.5-.5z",t:"Pare-feu sortant",d:"Aucune donnee ne quitte le client vers un serveur inconnu sans ton accord. Les hotes de Discord, de Nexium et ceux que tu approuves passent, les autres sont arretes et listes.",e:"sortie(s) bloquee(s)"},
{k:"beaconGuard",m:"beacon",ic:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z",t:"Anti-balise invisible",d:"Une image d un pixel, un WebSocket ou un flux permanent suffisent a faire sortir un jeton sans aucune requete visible. Ces trois voies sont desormais surveillees et coupees.",e:"balise(s) coupee(s)"},
{k:"domGuard",m:"dom",ic:"M9.4 16.6 4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0 4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z",t:"Gardien du DOM",d:"Surveille en continu ce qui est insere dans la fenetre Discord et retire scripts, cadres et formulaires venus d ailleurs avant qu ils ne servent. Tes themes, eux, sont seulement signales.",e:"element(s) retire(s)"},
{k:"payloadGuard",m:"payload",ic:"M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 9h10v2H7V9zm0 4h7v2H7v-2z",t:"Anti-charge utile",d:"Lit le code qu un theme, un greffon ou un script injecte veut faire executer, et le refuse quand il fait ce que fait un voleur : lire ton jeton et le faire sortir.",e:"code(s) refuse(s)"}];
(function(){try{window._NXCAT=window._NXCAT||{};
var G=[SH_LIENS,SH_CONTENU,SH_AVANCE,SH_PIEGES,SH_SORTIE,VA_COFFRE,VA_DEFENSE,VA_REACTION],a,b;
for(a=0;a<G.length;a++)for(b=0;b<G[a].length;b++)
window._NXCAT[G[a][b].k]={t:G[a][b].t,d:G[a][b].d,module:"protect"};}catch(_){}})();
// Le catalogue de Protect, une protection par carte.
//
// L ancienne page listait certaines protections deux fois (les gardes de
// sortie et les pieges, dans l apercu ET dans les boucliers), et en separait
// d autres qui faisaient la meme chose sous deux noms : le QR code, les
// caracteres invisibles, les noms de fichiers truques, les vagues de messages,
// les fuites de webhook, les messages prives d inconnus, les serveurs pieges.
// Ici, une carte peut piloter plusieurs clefs du moteur : le moteur ne change
// pas, seule la facon de le presenter.
//
//   k    : les clefs pilotees, [source, clef] -- pr = _NXPR, v = _NXV, g = _NXGD
//   opt  : un reglage secondaire, montre quand la carte est allumee
//   dep  : la carte n agit que si l analyse des liens tourne
//   cpt  : ce qui compte ses interventions reelles
//   pv   : les preuves de _NXPRV qui la verifient pour de vrai
var _NXPROTFAM=[
["liens","Liens","lien","info","Ce que Nexium examine avant que tu cliques."],
["arnaques","Arnaques","alerte","warn","Les pieges qui passent par un message, pas par un lien."],
["fichiers","Fichiers","dossier","cyan","Ce qui se cache dans une piece jointe."],
["sortie","Ce qui sort","televerse","ok","Ce qui voudrait quitter ton client sans toi."],
["compte","Ton compte","cadenas","mauve","Ce qui touche a ton compte lui-meme."],
["client","Le client","bouclierOk","rose","L integrite de Nexium et de ce que tu y ajoutes."]];
var _NXPROTCAT=[
{id:"analyse",f:"liens",ic:"loupe",t:"Analyse des liens",
d:"Chaque lien recu est examine avant que tu cliques : base de menaces, forme du domaine, redirections. Les autres protections de liens s appuient dessus.",
k:[["pr","scanLinks"]],cpt:[["pr","scanned"]],cl:"lien(s) analyse(s)",pv:["pr_clic","pr_avert","pr_base"],socle:true},
{id:"masque",f:"liens",ic:"oeilBarre",t:"Masquage des liens dangereux",
d:"Le lien piege est recouvert dans le message : illisible, impossible a copier ou a cliquer par erreur.",
k:[["pr","maskLinks"]],opt:[["pr","maskSuspect","Masquer aussi les liens douteux : raccourcis, inhabituels"]],dep:true,pv:["pr_masquage"]},
{id:"loggers",f:"liens",ic:"cible",t:"Loggers d IP",
d:"Grabify, iplogger et leurs clones servent a te geolocaliser en un clic. Ils sont bloques avant l ouverture.",
k:[["pr","blockGrabbers"]],dep:true,cpt:[["type","grabber"]],pv:["pr_classe"]},
{id:"hamecon",f:"liens",ic:"drapeau",t:"Hameconnage et faux domaines",
d:"Faux Discord, faux Steam, domaines en punycode, marques imitees, extensions a risque.",
k:[["pr","phishGuard"],["pr","heuristics"]],dep:true,cpt:[["type","phish"],["type","punycode"],["type","suspect"]]},
{id:"trompeurs",f:"liens",ic:"lien",t:"Liens au texte trompeur",
d:"Le texte affiche annonce une adresse, le lien en ouvre une autre. Nexium montre la vraie destination.",
k:[["pr","scanMasked"]],dep:true,cpt:[["type","masked"]],pv:["pr_masque"]},
{id:"invisibles",f:"liens",ic:"oeil",t:"Caracteres invisibles et inversion",
d:"Caracteres de largeur nulle, sens de lecture inverse, alphabets melanges : ce qui fait afficher autre chose que le vrai texte.",
k:[["pr","bidiGuard"],["pr","unicodeGuard"]],cpt:[["type","bidi"],["pr","unicode"]],pv:["pr_invisible"]},
{id:"scheme",f:"liens",ic:"terminal",t:"Liens qui executent du code",
d:"javascript:, vbscript:, file:, data:text/html : ces liens lancent du code au lieu d ouvrir une page.",
k:[["pr","schemeGuard"]],cpt:[["type","scheme"]],pv:["pr_scheme"]},
{id:"ipbrute",f:"liens",ic:"globe",t:"Liens vers une adresse IP",
d:"Un lien qui vise une adresse IP brute plutot qu un nom de domaine cache presque toujours quelque chose.",
k:[["pr","ipGuard"]],cpt:[["type","rawip"]],pv:["pr_ip"]},
{id:"oauth",f:"liens",ic:"cle",t:"Autorisations d application",
d:"Un lien d autorisation qui veut ajouter un bot, un webhook ou des droits d administrateur est signale avant que tu acceptes.",
k:[["pr","oauthGuard"]],cpt:[["type","oauth"]],pv:["pr_oauth"]},
{id:"telech",f:"liens",ic:"telecharge",t:"Telechargements d executables",
d:"Un lien qui telecharge un .exe, un .scr, un .bat ou equivalent est bloque, sauf depuis une source de confiance.",
k:[["pr","scanDownloads"]],dep:true,cpt:[["type","download"]]},
{id:"partout",f:"liens",ic:"couches",t:"Apercus, modifications et statuts",
d:"L analyse ne s arrete pas au texte : les apercus de liens, les messages modifies apres coup et les statuts personnalises passent aussi.",
k:[["pr","scanEmbeds"],["pr","scanEdits"],["pr","scanStatus"]],dep:true},

{id:"arnaque",f:"arnaques",ic:"alerte",t:"Messages d arnaque",
d:"Faux Nitro, dons de crypto, faux concours, faux support : les tournures des arnaques connues sont reperees.",
k:[["pr","scamAlerts"]],cpt:[["type","scam"]],pv:["pr_arnaque"]},
{id:"cadeau",f:"arnaques",ic:"cadeau",t:"Codes cadeau verifies",
d:"Un lien de cadeau Nitro est verifie aupres de Discord : un code qui n existe pas, ou un faux domaine discord.gift, est denonce.",
k:[["v","giftGuard"]],cpt:[["type","gift"]]},
{id:"code",f:"arnaques",ic:"jeton",t:"Demandes de code",
d:"Quelqu un te reclame un code a six chiffres, un code de double authentification ou de secours : Nexium t arrete avant que tu reponds.",
k:[["pr","codeGuard"]],cpt:[["type","code"]]},
{id:"console",f:"arnaques",ic:"terminal",t:"Arnaque a la console",
d:"Colle ce code dans la console : la methode la plus simple pour voler un compte. Le message et la console portent un avertissement.",
k:[["pr","consoleGuard"]],cpt:[["type","selfxss"]],pv:["pr_console","pr_veille"]},
{id:"qr",f:"arnaques",ic:"grille",t:"Arnaque au QR code",
d:"Un message qui te demande de scanner un QR code de connexion est signale. Le QR code de l ecran de connexion, lui, reste toujours disponible.",
k:[["pr","qrGuard"]],cpt:[["type","qr"]]},
{id:"inconnus",f:"arnaques",ic:"courrier",t:"Messages prives d inconnus",
d:"Un compte cree il y a quelques jours qui t ecrit, ou un lien envoye par quelqu un qui n est pas ton ami : tu es prevenu avant d ouvrir.",
k:[["pr","warnAccounts"],["pr","dmLinkGuard"]],cpt:[["type","account"],["pr","dmlink"]]},
{id:"usurpation",f:"arnaques",ic:"comptes",t:"Usurpation d amis",
d:"Un compte qui copie le pseudo et l avatar d un de tes contacts est demasque.",
k:[["pr","scanImpostor"]]},
{id:"vagues",f:"arnaques",ic:"reseau",t:"Campagnes coordonnees",
d:"Le meme message envoye par plusieurs comptes recents, en prive ou dans un serveur : c est une campagne, pas une coincidence.",
k:[["pr","scanWaves"],["pr","raidGuard"]],cpt:[["pr","raid"]]},
{id:"serveurs",f:"arnaques",ic:"drapeau",t:"Serveurs pieges",
d:"Les invitations sont verifiees, et les serveurs que tu rejoins aussi : verification imposee, demande d autorisation, marque imitee.",
k:[["pr","scanInvites"],["v","guildGuard"]],cpt:[["type","invite"],["type","guild"]]},
{id:"crypto",f:"arnaques",ic:"jeton",t:"Adresses de portefeuille",
d:"Une adresse crypto recue est signalee, et si celle que tu colles differe de celle que tu avais copiee, un logiciel l a remplacee en chemin.",
k:[["pr","cryptoGuard"]],cpt:[["pr","crypto"]]},

{id:"fichiers",f:"fichiers",ic:"dossier",t:"Contenu reel des pieces jointes",
d:"Le debut du fichier est lu : un .exe renomme en .png est reconnu, quel que soit son nom.",
k:[["pr","scanFiles"]],cpt:[["type","file"]],pv:["pr_fichier","pr_piece"]},
{id:"noms",f:"fichiers",ic:"boite",t:"Noms et archives pieges",
d:"Double extension, nom ecrit a l envers, archive protegee par mot de passe ou qui contient un executable : les ruses pour faire ouvrir un virus.",
k:[["pr","nameGuard"],["v","deepFiles"]],cpt:[["pr","nom"]]},

{id:"exfil",f:"sortie",ic:"cadenas",t:"Ton jeton ne sort pas",
d:"Toute requete qui emporte ton jeton, ton mot de passe ou tes cookies vers un domaine qui n est pas Discord est bloquee.",
k:[["v","blockExfil"]],cpt:[["v","blocked"]],cl:"envoi(s) bloque(s)"},
{id:"webhook",f:"sortie",ic:"lien",t:"Gardien des webhooks",
d:"L envoi de tes donnees par webhook Discord est bloque. C est la sortie preferee des voleurs de compte : elle passe par discord.com, donc rien d autre ne la filtre.",
k:[["g","webhookGuard"]],cpt:[["g","webhook"]],cl:"envoi(s) arrete(s)",pv:["pr_sortie"]},
{id:"egress",f:"sortie",ic:"bouclier",t:"Pare-feu sortant",
d:"Aucune donnee ne part vers un serveur inconnu sans ton accord. Les hotes de Discord, de Nexium et ceux que tu approuves passent.",
k:[["g","egressGuard"]],cpt:[["g","egress"]],cl:"sortie(s) bloquee(s)",posture:true},
{id:"balise",f:"sortie",ic:"eclair",t:"Anti-balise invisible",
d:"Une image d un pixel, un WebSocket ou un flux permanent suffisent a faire sortir un jeton sans requete visible. Les trois voies sont surveillees.",
k:[["g","beaconGuard"]],cpt:[["g","beacon"]],cl:"balise(s) coupee(s)"},
{id:"dom",f:"sortie",ic:"code",t:"Gardien de la fenetre",
d:"Scripts, cadres et formulaires venus d ailleurs sont retires de la fenetre Discord avant de servir. Tes themes sont seulement signales.",
k:[["g","domGuard"]],cpt:[["g","dom"]],cl:"element(s) retire(s)"},
{id:"charge",f:"sortie",ic:"puce",t:"Anti-charge utile",
d:"Le code qu un theme, un plugin ou un script veut executer est lu, et refuse quand il fait ce que fait un voleur : lire ton jeton et le faire sortir.",
k:[["g","payloadGuard"]],cpt:[["g","payload"]],cl:"code(s) refuse(s)"},
{id:"fuite",f:"sortie",ic:"copie",t:"Fuite de jeton ou de webhook",
d:"Un jeton ou un webhook dans ton presse-papiers, ou sur le point d etre colle dans un message : tu es prevenu avant qu il parte.",
k:[["pr","clipGuard"],["pr","leakGuard"]],cpt:[["type","secret"],["pr","leak"]],pv:["pr_secret","pr_webhook"]},
{id:"envoi",f:"sortie",ic:"envoi",t:"Garde-fou avant envoi",
d:"Avant d envoyer un message qui contient ton IP, une adresse, un telephone, un e-mail, un IBAN ou une carte bancaire, Nexium demande confirmation.",
k:[["v","selfGuard"]]},

{id:"delai",f:"compte",ic:"horloge",t:"Delai avant les actions graves",
d:"Autoriser une application, supprimer ou ceder un serveur, couper la double authentification, changer d e-mail ou de mot de passe, supprimer le compte : la requete attend 12 secondes, le temps de l annuler.",
k:[["v","graceDelay"]],cpt:[["type","delai"]],cl:"action(s) annulee(s)",neuf:true},
{id:"sessions",f:"compte",ic:"puce",t:"Nouvelles connexions",
d:"Quand une session s ouvre sur ton compte depuis un autre appareil, tu le sais tout de suite.",
k:[["v","sessionGuard"]]},
{id:"identite",f:"compte",ic:"comptes",t:"Surveillance de l identite",
d:"Si l e-mail, le telephone ou la double authentification de ton compte changent, l alerte tombe.",
k:[["v","identityGuard"]],cpt:[["type","identity"]]},
{id:"media",f:"compte",ic:"image",t:"Camera et partage d ecran",
d:"Si un script ou un plugin ouvre la camera, le micro ou le partage d ecran sans que tu aies clique, tu es prevenu.",
k:[["v","mediaGuard"]],cpt:[["type","media"]]},
{id:"apres",f:"compte",ic:"livre",t:"Guide apres incident",
d:"Apres un blocage grave, Nexium affiche les etapes a suivre et ouvre directement les bons reglages de Discord.",
k:[["v","aftermath"]]},

{id:"integrite",f:"client",ic:"bouclierOk",t:"Integrite du client",
d:"Ton fichier client est compare a la version publiee : une modification locale se voit.",
k:[["v","verifyIntegrity"]]},
{id:"themes",f:"client",ic:"baguette",t:"Themes qui exposent ton IP",
d:"Les ressources externes chargees par tes themes et ton QuickCSS sont reperees : chacune apprend ton adresse IP.",
k:[["v","scanThemes"]]},
{id:"plugins",f:"client",ic:"puce",t:"Audit des plugins",
d:"Le code des plugins installes est lu : acces au jeton, envois vers l exterieur, code obfusque.",
k:[["v","auditPlugins"]]},
{id:"communaute",f:"client",ic:"equipe",t:"Base communautaire",
d:"Les domaines signales par au moins trois utilisateurs Nexium sont bloques.",
k:[["v","community"]]},
{id:"chiffrement",f:"client",ic:"cadenas",t:"Chiffrement des donnees locales",
d:"Tes statistiques, journaux et signalements sont chiffres sur le disque.",
k:[["v","encryptLocal"]]}];

// Lire et ecrire une clef, quelle que soit sa source.
