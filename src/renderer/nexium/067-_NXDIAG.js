var _NXDIAG=window._NXDIAG||(window._NXDIAG={});
if(!_NXDIAG.boot){try{_NXDIAG.boot=true;
_NXDIAG.flags={};_NXDIAG.warned=false;
// Les indices qu on trouve dans le journal. "touche" dit ce qu il faudrait
// verifier pour savoir si l indice a un effet.
_NXDIAG.RULES=[
{k:"modules",rx:/Module updater is not available|DISCORD_NATIVE_MODULES_INSTALL/i,t:"Le gestionnaire de modules de Discord ne repond pas",touche:"voix"},
{k:"overlay",rx:/failed loading overlay module|failed ensuring discord_overlay/i,t:"Le module overlay de Discord ne s est pas charge",touche:"overlay"},
{k:"paths",rx:/is not an allowed app path/i,t:"Discord a refuse un chemin d application",touche:""},
{k:"zod",rx:/reading '_zod'|_zod/i,t:"Une donnee de Discord n a pas passe sa validation",touche:""}];
_NXDIAG.indices={};
_NXDIAG.tests={};
_NXDIAG.KO=0;
// Ce qui marche vraiment, mesure maintenant.
_NXDIAG.verifie=function(){try{
var T={voix:null,natifs:null,at:Date.now()};
try{var C=window.Vencord&&Vencord.Webpack&&Vencord.Webpack.Common;
var M=C&&C.MediaEngineStore;
if(M&&typeof M.isSupported==="function")T.voix=!!M.isSupported();}catch(_){}
try{var N=window.DiscordNative&&DiscordNative.nativeModules;
if(window.DiscordNative)T.natifs=!!(N&&(typeof N.requireModule==="function"||typeof N.ensureModule==="function"));}catch(_){}
_NXDIAG.tests=T;
return T;}catch(_){return {};}};
// Le verdict d un indice : "confirme" (effet reel), "sans effet" (verifie,
// tout marche) ou "a surveiller" (rien ne permet de trancher).
_NXDIAG.verdict=function(r){try{
var T=_NXDIAG.tests||{};
if(r.touche==="voix"){
if(T.voix===true&&T.natifs!==false)return {v:"sans effet",d:"Le moteur vocal de Discord fonctionne : cette ligne du journal est sans consequence."};
if(T.voix===false||T.natifs===false)return {v:"confirme",d:"Le moteur vocal de Discord ne peut pas demarrer : les appels ne marcheront pas."};
return {v:"a surveiller",d:"Le moteur vocal n a pas encore pu etre interroge."};}
if(r.touche==="overlay")return {v:"a surveiller",d:"Seul l overlay en jeu est concerne, et seulement si tu l utilises. Le reste de Discord n est pas touche."};
return {v:"sans effet",d:"Discord l ecrit dans son journal sur une installation modifiee. Aucun effet constate."};}catch(_){return {v:"a surveiller",d:""};}};
_NXDIAG.scan=function(force){try{
var _now=Date.now();
if(!force&&_NXDIAG._at&&(_now-_NXDIAG._at)<30000)return _NXDIAG.flags;
_NXDIAG._at=_now;
var J=(window._NXERR||[]);
for(var a=0;a<J.length;a++){var line=String(J[a]);
for(var b=0;b<_NXDIAG.RULES.length;b++){var r=_NXDIAG.RULES[b];
if(r.rx.test(line))_NXDIAG.indices[r.k]=r;}}
_NXDIAG.verifie();
_NXDIAG.flags={};
var confirme=false;
for(var k in _NXDIAG.indices){var ru=_NXDIAG.indices[k];var vd=_NXDIAG.verdict(ru);
_NXDIAG.flags[k]=ru.t+" ("+vd.v+")";
if(vd.v==="confirme")confirme=true;}
// Un seul releve ne suffit pas : il faut que l effet tienne deux passages.
_NXDIAG.KO=confirme?(_NXDIAG.KO+1):0;
_NXDIAG.broken=_NXDIAG.KO>=2;
if(_NXDIAG.broken&&!_NXDIAG.warned){_NXDIAG.warned=true;
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Le moteur vocal de Discord ne demarre pas : les appels ne marcheront pas. Le detail est dans Nexium Donnees."),0);}catch(_){}}
return _NXDIAG.flags;}catch(_){return {};}};
_NXDIAG.list=function(){try{var out=[];for(var k in _NXDIAG.flags)out.push(_NXDIAG.flags[k]);return out;}catch(_){return [];}};
// Pour la page : chaque indice avec son verdict.
_NXDIAG.detail=function(){try{
var out=[];for(var k in _NXDIAG.indices){var r=_NXDIAG.indices[k];var vd=_NXDIAG.verdict(r);
out.push({k:k,t:r.t,v:vd.v,d:vd.d});}
return out;}catch(_){return [];}};
try{setTimeout(function(){_NXDIAG.scan(true);},20000);setInterval(function(){if(!document.hidden)_NXDIAG.scan();},120000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXDIAG");if(window._NXERR)_NXERR.push("module _NXDIAG :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXDIAG desactive:",_nxE);}catch(_){}}
}var _NXHEALTH=window._NXHEALTH||(window._NXHEALTH={});
if(!_NXHEALTH.init){try{_NXHEALTH.init=true;
_NXHEALTH.MODS=[["_NXREG","reglages"],["_NXOUT","boite a outils"],["_NXLAB","laboratoire"],["_NXLIVE","vocal en direct"],["_NXCANAL","repaire"],["_NXSOS","ligne de secours"],["_NXGD","gardes de sortie"],["_NXDB","stockage"],["_NXM","musique"],["_NXS","statistiques"],["_NXP","confidentialite"],["_NXNET","reseau"],["_NXCL","changelog"],["_NXUP","mise a jour"],["_NXLY","presence"],["_NXPR","protect"],["_NXSP","sponsor"],["_NXUA","icones"],["_NXCP","recherche rapide"],["_NXBADGE","badge"],["_NXBAN","bannissement"],["_NXlogin","ecran de connexion"],["_NXWelcome","accueil"],["_NXDIAG","diagnostic"],["_NXSTATUS","alertes de statut"],["_NXADMIN","administration"],["_NXMP","message d equipe"],["_NXCONN","connecteurs"],["_NXENQ","enquete"],["_NXLEC","lecture consentie"],["_NXPLAN","plan et marche arriere"],["_NXSIS","sismographe"],["_NXFIC","gros fichiers"],["_NXBEST","best-of du vocal"],["_NXSON","soundboard"],["_NXPOP","annonces"],["_NXAMIS","amis et pseudos"]];
_NXHEALTH.isolated=["_NXREG","_NXOUT","_NXLAB","_NXLIVE","_NXCANAL","_NXSOS","_NXENQ","_NXLEC","_NXPLAN","_NXSIS","_NXFIC","_NXBEST","_NXSON","_NXPOP","_NXAMIS","_NXMP","_NXCONN","_NXSTATUS","_NXADMIN","_NXDB","_NXP","_NXSP","_NXUA","_NXBAN","_NXDIAG","_NXHEALTH","_NXSAFE","_NXBADGE","_NXWelcome","_NXlogin","_NXGD","_NXDATA"];
_NXHEALTH.check=function(){try{
var ko=[];
try{var F=window._NXFAIL||[];for(var f=0;f<F.length;f++){var lab=F[f];
for(var g=0;g<_NXHEALTH.MODS.length;g++)if(_NXHEALTH.MODS[g][0]===F[f])lab=_NXHEALTH.MODS[g][1];
if(ko.indexOf(lab)<0)ko.push(lab);}}catch(_){}
for(var a=0;a<_NXHEALTH.MODS.length;a++){var m=_NXHEALTH.MODS[a];
var o=window[m[0]];
if(!o||(o.boot!==true&&o.init!==true&&m[0]!=="_NXDB"))ko.push(m[1]);}
_NXHEALTH.failed=ko;
if(ko.length&&!_NXHEALTH._once){_NXHEALTH._once=ko.join(",");setTimeout(function(){_NXHEALTH.check();},15000);return ko;}
if(ko.length&&_NXHEALTH._once!==ko.join(",")){_NXHEALTH._once=ko.join(",");return ko;}
if(ko.length){
try{if(window._NXERR){_NXERR.push("sante :: modules non demarres : "+ko.join(", "));if(window._NXsaveErr)_NXsaveErr();}}catch(_){}
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr(ko.length)+_NXtr(" module(s) Nexium n ont pas demarre. Voir Nexium Donnees."),0);}catch(_){}}
return ko;}catch(_){return [];}};
try{setTimeout(function(){_NXHEALTH.check();},18000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXHEALTH");if(window._NXERR)_NXERR.push("module _NXHEALTH :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXHEALTH desactive:",_nxE);}catch(_){}}
}var _NXSAFE=window._NXSAFE||(window._NXSAFE={});
