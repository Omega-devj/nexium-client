var _NXDEM=window._NXDEM||(window._NXDEM={});
if(!_NXDEM.boot){try{_NXDEM.boot=true;
// Demarrer avec Windows.
//
// Le renderer n a pas acces au disque : il ne peut ni ecrire dans la base de
// registre ni poser un raccourci. Le processus principal, lui, a l API
// Electron qui fait exactement cela. Il faut donc un canal entre les deux, et
// il n en existe qu un seul : les reglages Vencord, que le preload sait
// ecrire et que le lanceur sait relire.
//
//   la page  ->  reglages Vencord  ->  le lanceur  ->  cle Run de Windows
//
// Le lanceur surveille ce fichier pendant la session : cocher la case agit
// tout de suite. Et il reecrit a cote ce que Windows a REELLEMENT retenu, si
// bien que la page affiche un fait verifie plutot qu une intention.
//
// Le choix de l utilisateur est garde en double, ici, dans le stockage du
// client : les reglages Vencord peuvent etre reecrits par Vencord lui-meme a
// partir de sa copie en memoire, ce qui effacerait notre miroir. On le repose
// donc a chaque demarrage.
_NXDEM.CLE="NexiumDemarrage";
_NXDEM.KEY="nexium_demarrage";
_NXDEM.listeners=[];
_NXDEM.notify=function(){for(var a=0;a<_NXDEM.listeners.length;a++){try{_NXDEM.listeners[a]();}catch(_){}}};

_NXDEM.dispo=function(){try{
return !!(window.VencordNative&&VencordNative.settings
&&typeof VencordNative.settings.get==="function"
&&typeof VencordNative.settings.set==="function");}catch(_){return false;}};
_NXDEM.windows=function(){try{
if(window.DiscordNative&&DiscordNative.process&&DiscordNative.process.platform)
return DiscordNative.process.platform==="win32";
return /win/i.test(String(navigator.platform||""));}catch(_){return false;}};

// Le choix, garde par le client lui-meme.
_NXDEM.lis=function(){try{
var r=_NXDB.get(_NXDEM.KEY);
var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")return null;
if(typeof d.avecWindows!=="boolean")return null;
return {avecWindows:!!d.avecWindows,reduit:d.reduit!==false};}catch(_){return null;}};

// Ce que le lanceur a rapporte au dernier passage.
_NXDEM.etat=function(){try{
if(!_NXDEM.dispo())return null;
var s=VencordNative.settings.get();
var c=s&&s.plugins&&s.plugins[_NXDEM.CLE];
return (c&&c.etat)?c.etat:null;}catch(_){return null;}};

// Le miroir dans les reglages Vencord : la seule chose que le lanceur lira.
_NXDEM.miroir=function(cfg){try{
if(!_NXDEM.dispo())return false;
var s=VencordNative.settings.get();
if(!s||typeof s!=="object")return false;
if(!s.plugins)s.plugins={};
var prec=s.plugins[_NXDEM.CLE]||{};
// Ne pas ecrire pour rien : chaque ecriture reveille le guetteur du lanceur.
if(prec.avecWindows===cfg.avecWindows&&prec.reduit===cfg.reduit)return true;
s.plugins[_NXDEM.CLE]={avecWindows:!!cfg.avecWindows,reduit:cfg.reduit!==false,
etat:prec.etat||null};
VencordNative.settings.set(s);
return true;}catch(_){return false;}};

_NXDEM.set=function(avecWindows,reduit){try{
var cfg={avecWindows:!!avecWindows,reduit:reduit!==false};
_NXDB.set(_NXDEM.KEY,JSON.stringify(cfg));
var ok=_NXDEM.miroir(cfg);
_NXDEM.notify();
return ok;}catch(_){return false;}};

// Une reponse honnete a "est-ce que ca marche ?".
//   inconnu   : rien n a encore ete demande
//   attente   : demande, mais le lanceur n a pas encore repondu
//   actif     : Windows a retenu l entree
//   coupe     : l entree a bien ete retiree
//   refuse    : demande, mais Windows n en a pas voulu
_NXDEM.diagnostic=function(){try{
if(!_NXDEM.windows())return {code:"horsWindows",
texte:"Ce reglage n existe que sur Windows."};
if(!_NXDEM.dispo())return {code:"indisponible",
texte:"Le pont vers le lanceur n est pas la sur ce client."};
var c=_NXDEM.lis();
if(!c)return {code:"inconnu",texte:"Rien n a encore ete demande."};
var e=_NXDEM.etat();
if(!e||typeof e.applique!=="boolean")return {code:"attente",
texte:"Demande enregistree. Le lanceur l appliquera dans un instant."};
if(c.avecWindows&&e.demande===true&&e.applique===true)return {code:"actif",
texte:"Verifie : Windows lance Nexium a l ouverture de ta session."};
if(!c.avecWindows&&e.demande===false&&e.applique===false)return {code:"coupe",
texte:"Verifie : plus aucune entree de demarrage."};
if(c.avecWindows&&e.applique===false)return {code:"refuse",
texte:"Windows a refuse l entree de demarrage. Une strategie de groupe ou un antivirus peut l interdire."};
return {code:"attente",
texte:"La demande a change depuis le dernier passage du lanceur."};}catch(_){
return {code:"inconnu",texte:""};}};

// A chaque ouverture : on repose le miroir. Si Vencord l a efface en
// reecrivant ses reglages, le lanceur le retrouve au demarrage suivant.
try{setTimeout(function(){try{
var c=_NXDEM.lis();
if(c)_NXDEM.miroir(c);}catch(_){}},7000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXDEM");if(window._NXERR)_NXERR.push("module _NXDEM :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXDEM desactive:",_nxE);}catch(_){}}
}
