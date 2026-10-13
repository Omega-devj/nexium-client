var _NXDATA=window._NXDATA||(window._NXDATA={});
if(!_NXDATA.boot){try{_NXDATA.boot=true;
_NXDATA.KEY="nexium_sauvegardes";
_NXDATA.CFGKEY="nexium_donnees_v1";
_NXDATA.cfg=(function(){var d;try{var raw=_NXDB.get(_NXDATA.CFGKEY);d=raw?JSON.parse(raw):null;}catch(e){d=null;}
if(!d||typeof d!=="object")d={};
if(typeof d.auto!=="boolean")d.auto=true;
if(typeof d.jours!=="number"||d.jours<1)d.jours=3;
if(typeof d.max!=="number"||d.max<1)d.max=3;
return d;})();
_NXDATA.save=function(){try{_NXDB.set(_NXDATA.CFGKEY,JSON.stringify(_NXDATA.cfg));}catch(_){}};
_NXDATA.set=function(k,v){try{_NXDATA.cfg[k]=v;_NXDATA.save();_NXDATA.notify();}catch(_){}};
_NXDATA.listeners=[];
_NXDATA.notify=function(){for(var a=0;a<_NXDATA.listeners.length;a++){try{_NXDATA.listeners[a]();}catch(_){}}};
_NXDATA.LABELS={"nexium_langue":"Langue","nexium_reglages":"Reglages du client","nexium_stats_v1":"Statistiques d usage","nexium_privacy_v1":"Confidentialite — reglages","nexium_privacy_stats_v1":"Confidentialite — compteurs","nexium_music_v1":"Lecteur audio","nexium_protect_v1":"Protect — reglages","nexium_protect_v1_stats":"Protect — compteurs","nexium_gardes_v1":"Gardes de sortie — reglages","nexium_gardes_v1_stats":"Gardes de sortie — compteurs","nexium_coffre_v1":"Coffre-fort","nexium_reseau_v1":"Reseau — reglages","nexium_reseau_hist":"Reseau — historique","nexium_donnees_v1":"Donnees — reglages","nexium_sauvegardes":"Sauvegardes","nexium_errors":"Journal des erreurs","nexium_quarantine":"Quarantaine","nexium_reports":"Signalements","nexium_changelog_v1":"Journal des versions","nexium_skin_v1":"Apparence","nexium_focus_v1":"Concentration","nexium_auto_v1":"Automatisations","nexium_motion":"Animations","nexium_eco_v1":"Performances","nexium_install":"Identifiant d installation","nexium_allowlist":"Liste de confiance","nexium_community":"Signalements communautaires","nexium_sharemask":"Masque de partage","nexium_boot_guard":"Garde de demarrage","nexium_welcome":"Ecran d accueil"};
_NXDATA.libelle=function(k){return _NXDATA.LABELS[k]||k;};
_NXDATA.REGLAGES=["nexium_privacy_v1","nexium_protect_v1","nexium_gardes_v1","nexium_coffre_v1","nexium_reseau_v1","nexium_donnees_v1","nexium_skin_v1","nexium_focus_v1","nexium_auto_v1","nexium_motion","nexium_eco_v1","nexium_music_v1","nexium_sharemask",
"nexium_skin","nexium_bg","nexium_eco","nexium_boot_anim","nexium_langue","nexium_reglages","nexium_restore_icons","nexium_adoption"];
_NXDATA.cles=function(){try{
var out=[],ks=_NXDB.keys()||[];
for(var a=0;a<ks.length;a++){var k=ks[a];
if(!k||String(k).indexOf("nexium_")!==0)continue;
var v="";try{v=_NXDB.get(k)||"";}catch(_){}
out.push({k:k,taille:v.length,libelle:_NXDATA.libelle(k),reglage:_NXDATA.REGLAGES.indexOf(k)>=0});}
out.sort(function(x,y){return y.taille-x.taille;});
return out;}catch(_){return [];}};
_NXDATA.total=function(){try{
var L=_NXDATA.cles(),n=0;
for(var a=0;a<L.length;a++)n+=L[a].taille;
return n;}catch(_){return 0;}};
_NXDATA.fmtTaille=function(n){try{
if(n>=1048576)return (n/1048576).toFixed(2)+" Mo";
if(n>=1024)return (n/1024).toFixed(1)+" Ko";
return n+" o";}catch(_){return "0 o";}};
_NXDATA.lire=function(k){try{
var v=_NXDB.get(k);
if(v===null||v===undefined)return null;
try{return JSON.stringify(JSON.parse(v),null,2);}catch(_){return String(v);}}catch(_){return null;}};
_NXDATA.quota=function(cb){try{
if(!navigator.storage||typeof navigator.storage.estimate!=="function"){cb(null);return;}
navigator.storage.estimate().then(function(e){
cb({utilise:e.usage||0,dispo:e.quota||0,
pct:(e.quota?Math.min(100,Math.round((e.usage||0)/e.quota*100)):0)});}).catch(function(){cb(null);});
}catch(_){cb(null);}};
_NXDATA.sauvegardes=function(){try{
var raw=_NXDB.get(_NXDATA.KEY);
var d=raw?JSON.parse(raw):null;
return (d&&Array.isArray(d.list))?d.list:[];}catch(_){return [];}};
_NXDATA.ecrireSauvegardes=function(L){try{_NXDB.set(_NXDATA.KEY,JSON.stringify({list:L}));}catch(_){}};
_NXDATA.sauvegarder=function(auto){try{
var data={};
for(var a=0;a<_NXDATA.REGLAGES.length;a++){
var k=_NXDATA.REGLAGES[a];
var v=null;try{v=_NXDB.get(k);}catch(_){}
if(v!==null&&v!==undefined)data[k]=v;}
var txt=JSON.stringify(data);
if(txt.length>240000)return null;
var L=_NXDATA.sauvegardes();
if(L.length&&L[0].txt===txt){L[0].t=Date.now();_NXDATA.ecrireSauvegardes(L);return L[0];}
var e={t:Date.now(),n:Object.keys(data).length,taille:txt.length,auto:!!auto,txt:txt};
L.unshift(e);
var max=_NXDATA.cfg.max||3;
if(L.length>max)L=L.slice(0,max);
_NXDATA.ecrireSauvegardes(L);
_NXDATA.notify();
return e;}catch(_){return null;}};
_NXDATA.restaurer=function(idx){try{
var L=_NXDATA.sauvegardes();
var e=L[idx];
if(!e||!e.txt)return 0;
var d=JSON.parse(e.txt),n=0;
for(var k in d){try{_NXDB.set(k,d[k]);n++;}catch(_){}}
return n;}catch(_){return 0;}};
_NXDATA.supprimerSauvegarde=function(idx){try{
var L=_NXDATA.sauvegardes();
L.splice(idx,1);
_NXDATA.ecrireSauvegardes(L);
_NXDATA.notify();}catch(_){}};
_NXDATA.autoSiBesoin=function(){try{
if(!_NXDATA.cfg.auto)return;
var L=_NXDATA.sauvegardes();
var der=L.length?(L[0].t||0):0;
var delai=(_NXDATA.cfg.jours||3)*86400000;
if(Date.now()-der<delai)return;
_NXDATA.sauvegarder(true);}catch(_){}};
_NXDATA.sante=function(){try{
var mods=(window._NXHEALTH&&_NXHEALTH.MODS)||[];
var ko=(window._NXHEALTH&&_NXHEALTH.failed)||[];
var fail=(window._NXFAIL||[]);
var vivants=0;
for(var a=0;a<mods.length;a++){var o=window[mods[a][0]];
if(o&&(o.boot===true||o.init===true||mods[a][0]==="_NXDB"))vivants++;}
return {total:mods.length,vivants:vivants,
morts:ko.slice(0),modulesEnEchec:fail.slice(0),
erreurs:((window._NXERR||[]).length)};}catch(_){return {total:0,vivants:0,morts:[],modulesEnEchec:[],erreurs:0};}};
try{setTimeout(function(){_NXDATA.autoSiBesoin();},25000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXDATA");if(window._NXERR)_NXERR.push("module _NXDATA :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXDATA desactive:",_nxE);}catch(_){}}
}
