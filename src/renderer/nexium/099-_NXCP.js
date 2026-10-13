var _NXCP=window._NXCP||(window._NXCP={});
if(!_NXCP.boot){_NXCP.boot=true;
_NXCP.el=null;_NXCP.q="";_NXCP.sel=0;
_NXCP.routeur=function(){try{
var W=window.Vencord&&Vencord.Webpack;
if(!W||!W.findByProps)return null;
if(_NXCP._rt&&(Date.now()-_NXCP._rtAt)<60000)return _NXCP._rt;
var m=null;
try{m=W.findByProps("open","saveAccountChanges");}catch(_){m=null;}
if(m&&typeof m.open!=="function")m=null;
_NXCP._rt=m;_NXCP._rtAt=Date.now();
return m;}catch(_){return null;}};
// Ouvrir une page de reglages depuis n importe ou.
//
// Poser la section ne suffit pas : si la fenetre de reglages est fermee --
// le cas quand on clique depuis le salon -- il ne se passe rien du tout.
// Il faut l OUVRIR. C est ce que fait openUserSettings, qui prend la section
// en argument et s occupe des deux.
_NXCP.modale=function(){try{
if(_NXCP._md&&(Date.now()-_NXCP._mdAt)<60000)return _NXCP._md;
var W=window.Vencord&&Vencord.Webpack;
var m=null;
try{if(W&&W.findByProps)m=W.findByProps("openUserSettings","USER_SETTINGS_MODAL_KEY");}catch(_){m=null;}
if(m&&typeof m.openUserSettings!=="function")m=null;
_NXCP._md=m;_NXCP._mdAt=Date.now();
return m;}catch(_){return null;}};
_NXCP.goto=function(key){try{
if(!key||typeof key!=="string")return false;
var M=_NXCP.modale();
if(M){try{M.openUserSettings(key);return true;}catch(_){}}
var r=_NXCP.routeur();
if(r&&typeof r.open==="function"){try{r.open(key);return true;}catch(_){}}
try{
var C=_NXcommon();
var FX=C.C.FluxDispatcher||(C.WP.findByProps&&C.WP.findByProps("subscribe","dispatch","_actionHandlers"));
if(FX&&typeof FX.dispatch==="function"){
// En dernier recours : ouvrir la fenetre, puis poser la section.
try{FX.dispatch({type:"USER_SETTINGS_MODAL_OPEN"});}catch(_){}
FX.dispatch({type:"USER_SETTINGS_MODAL_SET_SECTION",section:key});
return true;}}catch(_){}
return false;}catch(_){return false;}};
_NXCP.ouvrir=function(key,nom){try{
if(_NXCP.goto(key))return true;
try{if(window._NXPR&&_NXPR.toast)
_NXPR.toast(_NXtr("Ouvre les reglages Discord, puis ")+(_NXtr(nom)||_NXtr("la section Nexium"))+_NXtr(" dans la colonne de gauche."),1);}catch(_){}
return false;}catch(_){return false;}};
_NXCP.items=function(){
var L=[];
var pages=[["equicord_reglages","Nexium Réglages","Langue, démarrage, sauvegarde, diagnostic"],["equicord_ia","Nexium IA","Assistant, reglages, diagnostic"],["equicord_protect","Nexium Protect","Sécurité, liens, menaces"],["equicord_privacy","Nexium Privacy","Télémétrie et anonymat"],["equicord_stats","Nexium Stats","Statistiques d'usage"],["equicord_music","Nexium Music","Lecteur et playlist"],["equicord_comptes","Nexium Comptes","Plusieurs comptes, bascule rapide"],["equicord_auto","Nexium Auto","Automatisations et mode focus"],["equicord_network","Nexium Réseau","Latence et stabilité"],["equicord_data","Nexium Données","Stockage, export, import"],["equicord_updater","Nexium Mise à jour","Version et journal"],["equicord_team","Nexium Team","L'équipe"],["equicord_sponsor","Nexium Sponsor","Partenariat"],["equicord_changelog","Changelog","Notes de version"]];
for(var a=0;a<pages.length;a++){(function(p){L.push({t:p[1],d:p[2],g:"Pages",run:function(){if(!_NXCP.goto(p[0]))_NXPR.toast(_NXtr("Ouvre les réglages Discord puis « ")+_NXtr(p[1])+" »",1);}});})(pages[a]);}
// L assistant depuis la palette : poser une question sans changer de page.
try{if(window._NXIA){
var demandes=[
["Demander a Nexium IA","Poser une question, depuis n importe ou",""],
["Resumer une conversation privee","Tape @ dans le champ, choisis la personne : il lit les 25 derniers messages",""],
["Qui a essaye de me pister","Le detail des tentatives bloquees aujourd hui","Raconte-moi ce qui a essaye de me pister recemment, en detail."],
["Annuler ce que l assistant a fait","Remettre les reglages qu il a changes comme ils etaient","!annuler"],
["Best-of du vocal","Les moments forts de l appel, decoupes tout seuls","!bestof"],
["Soundboard","Tes sons dans n importe quel vocal, sans Nitro","!son"],
["Tes amis, et ce qui a bouge","Qui n est plus la, qui a change de pseudo","!amis"],
["Verifier ma confidentialite","Ce qui est eteint, et pourquoi ca compte","Fais le tour de mes protections : lesquelles sont eteintes, et lesquelles comptent le plus pour moi."],
["Verifier mes extensions","Les extensions qui touchent au jeton de session","Y a-t-il des extensions a risque installees ? Explique-moi ce qu elles font."]];
for(var q=0;q<demandes.length;q++){(function(d){
L.push({t:d[0],d:d[1],g:"Nexium IA",run:function(){
if(d[2]==="!amis"){try{if(window._NXAMIS&&_NXAMIS.boot)_NXAMIS.carte();
else if(window._NXPR)_NXPR.toast(_NXtr("Le suivi des amis n est pas disponible sur ce client."),1);}catch(_){}return;}
if(d[2]==="!son"){try{if(window._NXSON&&_NXSON.boot)_NXSON.carte();
else if(window._NXPR)_NXPR.toast(_NXtr("Le soundboard n est pas disponible sur ce client."),1);}catch(_){}return;}
if(d[2]==="!bestof"){try{if(window._NXBEST&&_NXBEST.boot)_NXBEST.carte();
else if(window._NXPR)_NXPR.toast(_NXtr("Le best-of n est pas disponible sur ce client."),1);}catch(_){}return;}
if(d[2]==="!annuler"){try{if(window._NXPLAN&&_NXPLAN.boot)_NXPLAN.modaleAnnuler();
else if(window._NXPR)_NXPR.toast(_NXtr("La marche arriere n est pas disponible sur ce client."),1);}catch(_){}return;}
if(d[2])_NXIA.demandeIci(d[2]);
else{try{_NXIA.ouvrirPanneau();}catch(_){}}}});})(demandes[q]);}
}}catch(_){}
try{if(window._NXV&&_NXV.maskBascule)L.push({
t:_NXV.maskActive?"Masque de partage : le retirer":"Masque de partage : le poser",
d:_NXV.maskActive?"Messages prives, pseudos et membres sont masques (Ctrl+Maj+M)"
:"Masque les messages prives, les pseudos et la liste des membres (Ctrl+Maj+M)",
g:"Confidentialite",
run:function(){try{_NXV.maskBascule();}catch(_){}}});}catch(_){}
// Les reglages de Protect et de Privacy, tels que les pages les declarent.
// Chaque entree sait basculer le reglage, et sait aussi ou il habite : un
// resultat mene toujours quelque part.
try{
var SOURCES=[
[SH_LIENS,"pr","Liens"],[SH_CONTENU,"pr","Contenu"],[SH_PIEGES,"pr","Pieges"],
[SH_AVANCE,"pr","Avance"],[SH_SORTIE,"pr","Sortie"],
[PV_TELE,"pv","Telemetrie"],[PV_SOCIAL,"pv","Signaux sociaux"],
[PV_EMPREINTE,"pv","Empreinte"],[PV_DONNEES,"pv","Donnees"]];
for(var g=0;g<SOURCES.length;g++){
var tab=SOURCES[g][0],dm=SOURCES[g][1],fam=SOURCES[g][2];
if(!tab||!tab.length)continue;
for(var h=0;h<tab.length;h++){(function(r,dm,fam){
if(!r||!r.k||!r.t)return;
var M=dm==="pr"?window._NXPR:window._NXP;
if(!M||!M.cfg)return;
var page=dm==="pr"?"equicord_protect":"equicord_privacy";
var nomPage=dm==="pr"?"Nexium Protect":"Nexium Privacy";
var on=!!M.cfg[r.k];
// Un reglage que l abonnement ne permet pas n est pas cache : il mene a la
// page des offres, ce qui est plus utile qu un interrupteur qui ne bouge pas.
var ferme=false;
try{ferme=!!(M.permis&&!M.permis(r.k));}catch(_){}
var MID=String.fromCharCode(0xB7);
L.push({
t:(ferme?"":(on?"Desactiver ":"Activer "))+r.t,
d:nomPage+" "+MID+" "+fam+
(ferme?(" "+MID+" ferme sans abonnement"):"")+
(r.d?(" "+MID+" "+String(r.d).slice(0,90)):""),
g:dm==="pr"?"Protection":"Confidentialite",
run:function(){try{
if(ferme){_NXCP.ouvrir("equicord_abo","Nexium Abonnement");return;}
M.cfg[r.k]=!M.cfg[r.k];
if(M.saveCfg)M.saveCfg();
if(M.appliquerTout)try{M.appliquerTout();}catch(_){}
if(M.notify)M.notify();
if(window._NXPR&&_NXPR.toast)
_NXPR.toast(_NXtr(r.t)+(M.cfg[r.k]?_NXtr(" active"):_NXtr(" desactive")),1);}catch(_){}}});
// Et une seconde entree qui mene simplement au reglage, sans y toucher :
// on cherche souvent pour lire, pas pour basculer.
L.push({t:r.t,d:"Ouvrir "+nomPage+" "+MID+" "+fam,
g:"Reglages",run:function(){_NXCP.ouvrir(page,nomPage);}});
})(tab[h],dm,fam);}}
}catch(_){}
L.push({t:"Vérifier les mises à jour",d:"Interroge le dépôt maintenant",g:"Actions",run:function(){try{_NXUP.check();_NXPR.toast(_NXtr("Vérification en cours…"),1);}catch(_){}}});
L.push({t:"Exporter mes réglages Nexium",d:"Copie dans le presse-papiers",g:"Actions",run:function(){try{var o={_nexium:1,at:Date.now(),data:{}};var ks=_NXDB.keys();for(var a=0;a<ks.length;a++){if(ks[a].indexOf("nexium_")===0)o.data[ks[a]]=_NXDB.get(ks[a]);}DiscordNative.clipboard.copy(JSON.stringify(o));_NXPR.toast(_NXtr("Réglages copiés"),1);}catch(_){}}});
L.push({t:"Recharger la liste de menaces",d:"Met à jour la protection des liens",g:"Actions",run:function(){try{_NXPR.loadRemote(true);_NXPR.toast(_NXtr("Liste de menaces en cours de mise à jour…"),1);}catch(_){}}});
L.push({t:(_NXUA.enabled()?"Désactiver":"Activer")+" la restauration des icônes de plugins",d:(function(){var s=_NXUA.status();return s.registered+" bouton(s) enregistré(s)"+(s.mounted?" · actives":"")+(s.failed?" · échec":"");})(),g:"Actions",run:function(){_NXUA.setEnabled(!_NXUA.enabled());_NXPR.toast(_NXUA.enabled()?_NXtr("Restauration des icônes activée"):_NXtr("Restauration des icônes désactivée"),1);}});
L.push({t:(_NXPATCH.on?"Désactiver":"Réactiver")+" les interceptions réseau",d:"À utiliser en cas de conflit ou de ralentissement",g:"Actions",run:function(){_NXPATCH.set(!_NXPATCH.on);_NXPR.toast(_NXPATCH.on?_NXtr("Interceptions réactivées"):_NXtr("Interceptions désactivées (redémarre pour un effet complet)"),1);}});
L.push({t:"Redémarrer Discord",d:"Redémarrage complet",g:"Actions",run:function(){try{DiscordNative.processUtils.restart();}catch(_){}}});
return L;};
_NXCP.close=function(){try{if(_NXCP.el&&_NXCP.el.parentNode)_NXCP.el.parentNode.removeChild(_NXCP.el);}catch(_){}_NXCP.el=null;_NXCP.q="";_NXCP.sel=0;};
// Les accents ne doivent pas empecher de trouver : "telemetrie" et
// "telemetrie" menent au meme endroit.
_NXCP.plat=function(x){try{
var t=String(x||"").toLowerCase();
if(t.normalize)t=t.normalize("NFD").replace(/[\u0300-\u036f]/g,"");
return t;}catch(_){return String(x||"").toLowerCase();}};
_NXCP.MAX=40;
_NXCP.filtered=function(){
var q=_NXCP.plat(_NXCP.q).trim();
var all=_NXCP.items();
if(!q)return all.slice(0,9);
var mots=q.split(/\s+/);
var out=[],a,b;
for(a=0;a<all.length&&out.length<_NXCP.MAX;a++){
var it=all[a];
var foin=_NXCP.plat(it.t+" "+it.d+" "+it.g);
var tous=true;
for(b=0;b<mots.length;b++){var mo=mots[b];if(!mo)continue;
if(foin.indexOf(mo)>=0)continue;
if(mo.length>3&&mo.charAt(mo.length-1)==="s"&&foin.indexOf(mo.slice(0,-1))>=0)continue;
tous=false;break;}
if(!tous)continue;
// Ce qui commence par la recherche passe devant ce qui la contient.
it._rang=_NXCP.plat(it.t).indexOf(mots[0])===0?0:1;
out.push(it);}
out.sort(function(x,y){return (x._rang||0)-(y._rang||0);});
return out;};
_NXCP.render=function(){try{
if(!_NXCP.el)return;var P=_NXpal;var list=_NXCP.filtered();
if(_NXCP.sel>=list.length)_NXCP.sel=Math.max(0,list.length-1);
var box=_NXCP.el.querySelector?_NXCP.el.querySelector("#nx-cp-list"):null;
if(!box)return;var esc=function(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
var html="";
if(!list.length)html='<div style="padding:18px;text-align:center;color:'+P.dim+';font-size:13px;">Aucun résultat</div>';
for(var a=0;a<list.length;a++){var it=list[a];var on=a===_NXCP.sel;
html+='<div data-i="'+a+'" style="display:flex;align-items:center;gap:11px;padding:10px 14px;cursor:pointer;background:'+(on?(P.light?_NXpal.acc:_NXpal.raise):"transparent")+';border-left:2px solid '+(on?P.acc:"transparent")+';">'
+'<div style="flex:1;min-width:0;"><div style="font-size:13.5px;font-weight:600;color:'+P.txt+';">'+esc(it.t)+'</div>'
+'<div style="font-size:11px;color:'+P.dim+';margin-top:1px;">'+esc(it.d)+'</div></div>'
+'<div style="font-size:9.5px;letter-spacing:.1em;text-transform:uppercase;color:'+P.faint+';flex-shrink:0;">'+esc(it.g)+'</div></div>';}
box.innerHTML=_NXtrHtml(html);
}catch(_){}};
_NXCP.open=function(){try{
if(_NXCP.el){_NXCP.close();return;}
var P=_NXpal;
var ov=document.createElement("div");ov.id="nx-command-palette";
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:flex-start;justify-content:center;padding-top:14vh;background:rgba(0,0,0,"+(P.light?".28":".55")+");backdrop-filter:blur(5px);";
var card=document.createElement("div");
card.style.cssText="width:560px;max-width:calc(100vw - 40px);background:"+(P.light?_NXpal.acc:"linear-gradient(168deg,#141416,#0b0b0c)")+";border:1px solid "+P.line+";border-radius:16px;overflow:hidden;box-shadow:0 30px 90px rgba(0,0,0,"+(P.light?".22":".6")+");";
var top=document.createElement("div");top.style.cssText="display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid "+P.line+";";
top.innerHTML=_NXtrHtml('<span style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';">Nexium</span>');
var inp=document.createElement("input");
inp.placeholder=_NXtr("Rechercher une page ou une action…");
inp.style.cssText="flex:1;background:transparent;border:none;outline:none;color:"+P.txt+";font-size:15px;";
top.appendChild(inp);
var list=document.createElement("div");list.id="nx-cp-list";list.style.cssText="max-height:46vh;overflow-y:auto;";
var foot=document.createElement("div");foot.style.cssText="padding:9px 16px;border-top:1px solid "+P.line+";font-size:10.5px;color:"+P.faint+";display:flex;gap:14px;";
foot.innerHTML=_NXtrHtml("<span>↑↓ naviguer</span><span>⏎ ouvrir</span><span>Échap fermer</span>");
card.appendChild(top);card.appendChild(list);card.appendChild(foot);ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)_NXCP.close();};
list.onclick=function(e){try{var t=e.target;var d=0;while(t&&d<5){if(t.getAttribute&&t.getAttribute("data-i")!=null){var idx=parseInt(t.getAttribute("data-i"),10);var L=_NXCP.filtered();if(L[idx]){_NXCP.close();L[idx].run();}return;}t=t.parentElement;d++;}}catch(_){}};
inp.oninput=function(){_NXCP.q=inp.value;_NXCP.sel=0;_NXCP.render();};
inp.onkeydown=function(e){try{
if(e.key==="Escape"){e.preventDefault();_NXCP.close();return;}
if(e.key==="ArrowDown"){e.preventDefault();_NXCP.sel++;_NXCP.render();return;}
if(e.key==="ArrowUp"){e.preventDefault();_NXCP.sel=Math.max(0,_NXCP.sel-1);_NXCP.render();return;}
if(e.key==="Enter"){e.preventDefault();var L=_NXCP.filtered();var it=L[_NXCP.sel];if(it){_NXCP.close();it.run();}return;}
}catch(_){}};
if(document.body)document.body.appendChild(ov);_NXCP.el=ov;_NXCP.render();
try{inp.focus();}catch(_){}
}catch(_){}};
try{document.addEventListener("keydown",function(e){try{
if(_NXsaisie(e)&&!(e.ctrlKey||e.metaKey))return;
if((e.ctrlKey||e.metaKey)&&e.shiftKey&&(e.key==="N"||e.key==="n")){e.preventDefault();e.stopPropagation();_NXCP.open();}
if((e.ctrlKey||e.metaKey)&&e.shiftKey&&(e.key==="M"||e.key==="m")){
e.preventDefault();e.stopPropagation();
try{if(window._NXV&&_NXV.maskBascule)_NXV.maskBascule();}catch(_){}}
}catch(_){}},true);}catch(_){}
}
// La page Nexium Ultra Fast. Des trainees de vitesse dans l en-tete, un code
// barre des images dessine en direct pendant la mesure, un eclair quand un
// levier s enclenche, et la frappe decomposee en ses trois temps.
