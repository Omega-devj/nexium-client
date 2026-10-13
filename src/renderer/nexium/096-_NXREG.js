var _NXREG=window._NXREG||(window._NXREG={});
if(!_NXREG.boot){try{_NXREG.boot=true;
// Nexium Reglages : ce qui regle le client lui-meme.
_NXREG.KEY="nexium_reglages";
_NXREG.listeners=[];
_NXREG.notify=function(){var L=_NXREG.listeners.slice();for(var a=0;a<L.length;a++){try{L[a]();}catch(_){}}};
_NXREG.cfg=(function(){try{
var r=_NXDB.get(_NXREG.KEY);var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")d={};
if(d.toasts!=="importants")d.toasts="tout";
return d;}catch(_){return {toasts:"tout"};}})();
_NXREG.save=function(){try{_NXDB.set(_NXREG.KEY,JSON.stringify(_NXREG.cfg));}catch(_){}};
_NXREG.set=function(k,v){try{_NXREG.cfg[k]=v;_NXREG.save();_NXREG.notify();}catch(_){}};

// Les confirmations (type 1) peuvent se taire. Les avertissements et les
// dangers passent toujours.
_NXREG.tait=function(type){try{return _NXREG.cfg.toasts==="importants"&&type===1;}catch(_){return false;}};

// ------------------------------------------------------------ la langue
_NXREG.langue=function(){try{
return {choix:_NXI.choix(),active:_NXI.lang,discord:_NXI.suit()};}catch(_){
return {choix:"auto",active:"fr",discord:"fr"};}};
_NXREG.effective=function(l){try{return l==="auto"?_NXI.suit():l;}catch(_){return "fr";}};
_NXREG.redemarre=function(){try{
if(window._NXUP&&_NXUP.relaunch&&_NXUP.relaunch())return true;
try{location.reload();return true;}catch(_){}
return false;}catch(_){return false;}};
// Enregistre, puis redemarre si la langue affichee change vraiment.
_NXREG.changeLangue=function(l){try{
var ch=_NXI.choisir(l);
if(ch===null)return {ok:false};
_NXREG.notify();
if(_NXREG.effective(ch)===_NXI.lang)return {ok:true,redemarre:false};
setTimeout(function(){_NXREG.redemarre();},700);
return {ok:true,redemarre:true};}catch(_){return {ok:false};}};

// ------------------------------------------- transfert d une machine a l autre
// Ce qui ne se transporte pas : l identite de cette installation, ses
// sessions, ses caches serveur. Les reprendre ailleurs ferait passer deux
// machines pour une seule.
_NXREG.JAMAIS=["nexium_ck","nexium_install_id","nexium_install","nexium_admin_session","nexium_admin_garde",
"nexium_device_tag","nexium_boot_guard","nexium_boot_trace","nexium_errors","nexium_identity","nexium_ban_state",
"nexium_abo","nexium_vault","nexium_sessions","nexium_icones_migre_203","nexium_demarrage"];
_NXREG.transportable=function(k){return !!k&&String(k).indexOf("nexium_")===0&&_NXREG.JAMAIS.indexOf(k)<0;};
_NXREG.exporte=function(){try{
var out={nexium:true,version:(window._NXUP&&_NXUP.VERSION)||"?",exportedAt:new Date().toISOString(),data:{}};
var ks=_NXDB.keys()||[];
for(var a=0;a<ks.length;a++){var k=ks[a];
if(!_NXREG.transportable(k))continue;
var v=_NXDB.get(k);if(v===null||v===undefined)continue;
out.data[k]=v;}
return JSON.stringify(out);}catch(_){return "";}};
_NXREG.enregistre=function(){try{
var txt=_NXREG.exporte();if(!txt)return false;
var FM=window.DiscordNative&&DiscordNative.fileManager;
if(FM&&FM.saveWithDialog){
FM.saveWithDialog(new TextEncoder().encode(txt),"nexium-reglages-"+new Date().toISOString().slice(0,10)+".json");
return true;}
return false;}catch(_){return false;}};
// Reprendre un export. Un point de restauration est pose avant d ecrire quoi
// que ce soit : un import rate se defait depuis Nexium Donnees.
_NXREG.importe=function(txt){try{
var o=null;
try{o=JSON.parse(String(txt||"").trim());}catch(_){
return {ok:false,err:"Ce texte n est pas du JSON valide."};}
if(!o||typeof o!=="object"||!o.data||typeof o.data!=="object"||!(o.nexium===true||o._nexium===1))
return {ok:false,err:"Ce n est pas un export de Nexium."};
var cles=[],k;
for(k in o.data){if(Object.prototype.hasOwnProperty.call(o.data,k)&&_NXREG.transportable(k))cles.push(k);}
if(!cles.length)return {ok:false,err:"Cet export ne contient aucun reglage a reprendre."};
var sauve=null;
try{if(window._NXDATA&&_NXDATA.sauvegarder)sauve=_NXDATA.sauvegarder(true);}catch(_){}
var ok=0,ignores=0;
for(var a=0;a<cles.length;a++){var v=o.data[cles[a]];
if(typeof v!=="string"){try{v=JSON.stringify(v);}catch(_){ignores++;continue;}}
if(typeof v!=="string"||v.length>400000){ignores++;continue;}
try{_NXDB.set(cles[a],v);ok++;}catch(_){ignores++;}}
return {ok:ok>0,n:ok,ignores:ignores,sauve:!!sauve,
err:ok?"":"Aucun reglage n a pu etre ecrit."};}catch(_){return {ok:false,err:"Import impossible."};}};
_NXREG.fichier=function(cb){try{
var FM=window.DiscordNative&&DiscordNative.fileManager;
if(!FM||!FM.openFiles){cb({ok:false,err:"L ouverture de fichier n est pas disponible ici : colle le texte a la place."});return;}
FM.openFiles({filters:[{name:"Nexium",extensions:["json"]},{name:"all",extensions:["*"]}]}).then(function(L){try{
var f=L&&L[0];if(!f){cb(null);return;}
cb(_NXREG.importe(new TextDecoder().decode(f.data)));}catch(_){cb({ok:false,err:"Fichier illisible."});}},
function(){cb(null);});}catch(_){cb({ok:false,err:"L ouverture de fichier a echoue."});}};

// Repartir de zero : seulement les reglages, jamais les donnees. Et rien
// n est efface tant que le point de restauration n existe pas.
_NXREG.reinitialise=function(){try{
var sauve=null;
try{if(window._NXDATA&&_NXDATA.sauvegarder)sauve=_NXDATA.sauvegarder(true);}catch(_){}
if(!sauve)return {ok:false,err:"Le point de restauration n a pas pu etre cree : rien n a ete efface."};
var L=(window._NXDATA&&_NXDATA.REGLAGES)||[],n=0;
for(var a=0;a<L.length;a++){try{if(_NXDB.get(L[a])!==null&&_NXDB.get(L[a])!==undefined){_NXDB.del(L[a]);n++;}}catch(_){}}
return {ok:true,n:n};}catch(_){return {ok:false,err:"Echec de la reinitialisation."};}};

// ------------------------------------------------------------ diagnostic
// Ce qu on colle dans un message a ryukuro. Aucun identifiant, aucun pseudo.
_NXREG.diagnostic=function(){try{
var L=[];
L.push("Nexium Client v"+((window._NXUP&&_NXUP.VERSION)||"?"));
try{L.push("Langue : "+_NXI.lang+" (choix : "+_NXI.choix()+", Discord : "+_NXI.suit()+")");}catch(_){}
try{var p=window.DiscordNative&&DiscordNative.process;
L.push("Plateforme : "+(p?(p.platform+" "+(p.arch||"")):navigator.platform));}catch(_){}
try{var V=(window.VencordNative&&VencordNative.native&&VencordNative.native.getVersions)?VencordNative.native.getVersions():{};
L.push("Electron "+(V.electron||"?")+" · Chromium "+(V.chrome||"?"));}catch(_){}
try{if(window._NXHEALTH&&_NXHEALTH.check)_NXHEALTH.check();
var ko=(window._NXHEALTH&&_NXHEALTH.failed)||[];
L.push("Modules en echec : "+(ko.length?ko.join(", "):"aucun"));}catch(_){}
try{var sa=_NXSAFE.etat();L.push("Mode securise : "+(sa.actif?("oui ("+sa.coupes.join(", ")+")"):"non"));}catch(_){}
try{var u=_NXUA.status();
L.push("Icones des plugins : "+(u.enabled?"actives":"coupees")+(u.mounted?", montees":"")+", "+u.registered+" bouton(s)"+(u.raison?(" · "+u.raison):""));}catch(_){}
try{var e=_NXECO.status();L.push("Mode economie : "+(e.actif?"actif":"inactif")+" ("+e.mode+")");}catch(_){}
try{L.push("Stockage : "+(_NXDB.mode==="mem"?"volatile":"persistant")+(_NXDB.fail?", une ecriture a echoue":""));}catch(_){}
try{L.push("Interceptions reseau : "+(_NXPATCH.on?"actives":"coupees"));}catch(_){}
try{var E=(window._NXERR||[]).slice(-8);
L.push("Dernieres erreurs ("+E.length+") :");
for(var a=0;a<E.length;a++)L.push("  - "+String(E[a]).replace(/\d{17,20}/g,"<id>").slice(0,220));}catch(_){}
return L.join("\n");}catch(_){return "";}};

}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXREG");if(window._NXERR)_NXERR.push("module _NXREG :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXREG desactive:",_nxE);}catch(_){}}
}
