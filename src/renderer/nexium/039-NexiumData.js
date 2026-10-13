var NexiumDataIcon=function(p){p=p||{};var z=p.width||p.height||20;return (window._NXFX&&_NXFX.svg)?_NXFX.svg("base",z):null;};
function NexiumDataComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _t0=F.useState("stockage");var tab=_t0[0];var setTab=_t0[1];
var _f0=F.useState("");var flt=_f0[0];var setFlt=_f0[1];
var _o0=F.useState("");var ouvert=_o0[0];var setOuvert=_o0[1];
var _q0=F.useState(null);var quota=_q0[0];var setQuota=_q0[1];
F.useEffect(function(){
var vivant=true;
var maj=function(){if(vivant)force();};
try{if(window._NXSKIN)_NXSKIN.listeners.push(maj);}catch(_){}
try{if(window._NXECO)_NXECO.listeners.push(maj);}catch(_){}
try{if(window._NXDATA)_NXDATA.listeners.push(maj);}catch(_){}
try{if(window._NXDATA)_NXDATA.quota(function(q){if(vivant)setQuota(q||{indisponible:true});});}catch(_){}
return function(){vivant=false;
try{if(window._NXSKIN)_NXSKIN.listeners=_NXSKIN.listeners.filter(function(f){return f!==maj;});}catch(_){}
try{if(window._NXECO)_NXECO.listeners=_NXECO.listeners.filter(function(f){return f!==maj;});}catch(_){}
try{if(window._NXDATA)_NXDATA.listeners=_NXDATA.listeners.filter(function(f){return f!==maj;});}catch(_){}};},[]);
var monte=_NXmounted(F);
var cTotal=_NXcount(F,(function(){try{return _NXDATA.total();}catch(_){return 0;}})(),900);
var P=_NXpal;
var D=window._NXDATA;
if(!D)return i(Kr,null,i("div",{style:{maxWidth:"660px",margin:"0 auto"}},
_NXhead(_T("Données"),_NXtr("Nexium Données"),_T("Stockage local du client.")),
_NXcard(i("div",{style:{fontSize:"12.5px",color:_NXpal.warn,lineHeight:1.6}},
_T("Le module de gestion des donnees n a pas demarre sur ce client.")),{mb:0})));
var toutes=D.cles();
var total=0;for(var a0=0;a0<toutes.length;a0++)total+=toutes[a0].taille;
var maxT=toutes.length?toutes[0].taille:1;
var vues=toutes;
var fq=(flt||"").trim().toLowerCase();
if(fq)vues=toutes.filter(function(r){return (r.libelle+" "+r.k).toLowerCase().indexOf(fq)>=0;});
function effacer(k){try{
if(k==="nexium_stats_v1"&&window._NXS&&_NXS.reset){_NXS.reset();return;}
if(k==="nexium_privacy_stats_v1"&&window._NXP&&_NXP.resetStats){_NXP.resetStats();return;}
if(k==="nexium_reseau_hist"&&window._NXNET&&_NXNET.reset){_NXNET.reset();return;}
}catch(_){}
try{_NXDB.del(k);}catch(_){}}
function grand2(v,lab,sub,c){return i("div",{style:{flex:1,minWidth:"96px"}},
i("div",{key:"d"+v,"data-nx-pop":"1",style:{fontFamily:_NXf.disp,fontSize:"25px",fontWeight:"800",
color:c||P.txt,letterSpacing:"-.04em",lineHeight:1,fontVariantNumeric:"tabular-nums"}},_NXtr(v)),
i("div",{style:{fontSize:"11px",color:P.sub,marginTop:"6px",fontWeight:"600"}},_NXtr(lab)),
sub?i("div",{style:{fontSize:"10px",color:P.faint,marginTop:"2px"}},_NXtr(sub)):null);}
var TABS=[["stockage",_T("Stockage"),"base",toutes.length],
["sauvegardes",_T("Sauvegardes"),"boite",(D.sauvegardes()||[]).length],
["sante",_T("Santé"),"pouls",""],
["apparence",_T("Apparence"),"baguette",""]];
function tabbar(){return _NXFX.onglets(TABS,tab,function(k){
if(tab!==k){setTab(k);setOuvert("");}},{col:P.lime});}
function tStockage(){
var teintes=[P.info,P.ok,P.mauve,P.warn,P.cyan,P.rose,P.lime];
var rang={};
for(var r0=0;r0<toutes.length&&r0<7;r0++)rang[toutes[r0].k]=teintes[r0];
return i("div",null,
i("div",{"data-nx-lift":"1",style:{position:"relative",overflow:"hidden",border:"1px solid "+P.hair,
borderRadius:"22px",background:"linear-gradient(158deg,"+P.panel+","+P.bg+")",padding:"25px 24px",marginBottom:"14px"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"22px",flexWrap:"wrap",marginBottom:"16px"}},
i("div",{style:{flex:1,minWidth:"180px"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".16em",textTransform:"uppercase",
color:P.faint,marginBottom:"9px"}},_T("Occupe sur cette machine")),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"40px",fontWeight:"800",
color:P.txt,letterSpacing:"-.045em",lineHeight:1,fontVariantNumeric:"tabular-nums"}},_NXtr(D.fmtTaille(cTotal)))),
(quota&&!quota.indisponible)?_NXring(quota.pct,quota.pct>=80?_NXpal.danger:(quota.pct>=50?_NXpal.warn:_NXpal.ok),
82,quota.pct+"%",_T("du quota")):null),
total>0?i("div",null,
i("div",{style:{display:"flex",height:"14px",borderRadius:"7px",overflow:"hidden",background:P.line,marginBottom:"12px"}},
toutes.slice(0,7).map(function(r,k){
return i("div",{key:r.k,title:_NXtr(r.libelle)+" · "+_NXtr(D.fmtTaille(r.taille)),
style:{width:(monte?(r.taille/total*100):0)+"%",background:teintes[k],
transition:"width .7s cubic-bezier(.22,.8,.28,1)",transitionDelay:(k*40)+"ms"}});})),
i("div",{style:{display:"flex",flexWrap:"wrap",gap:"9px 16px"}},
toutes.slice(0,7).map(function(r,k){
return i("div",{key:r.k,style:{display:"flex",alignItems:"center",gap:"7px"}},
i("span",{style:{width:"8px",height:"8px",borderRadius:"2px",background:teintes[k],flexShrink:0}}),
i("span",{style:{fontSize:"11px",color:P.dim}},_NXtr(r.libelle)));}))):null,
i("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap",marginTop:"20px",paddingTop:"18px",borderTop:"1px solid "+P.line}},
_NXtr(grand2(toutes.length,_T("Modules"))),
_NXtr(grand2(_NXDB.mode==="mem"?_T("Volatile"):_T("Persistant"),_T("Stockage"),null,
_NXDB.mode==="mem"?_NXpal.warn:_NXpal.ok)),
toutes.length?_NXtr(grand2(D.fmtTaille(maxT),_T("Plus gros"),toutes[0].libelle)):null,
_NXtr(grand2(D.sauvegardes().length,_T("Sauvegardes"))))),
_NXDB.mode==="mem"?_NXcard(i("div",{style:{fontSize:"12.5px",color:_NXpal.warn,lineHeight:1.6}},
_T("Le stockage persistant est indisponible dans cet environnement : tes reglages seront perdus a la fermeture.")),{mb:12}):null,
_NXDB.fail?_NXcard(i("div",null,
i("div",{style:{fontSize:"14px",fontWeight:"800",color:_NXpal.danger,marginBottom:"6px"}},_T("Sauvegarde impossible")),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.6}},
_T("Une ecriture a echoue. Le disque est peut-etre plein, ou le quota du navigateur atteint."))),{mb:12}):null,
_NXcard(i("div",null,
_NXch(_T("Contenu détaillé"),_T("Chaque module range ses donnees separement. Ouvre une ligne pour voir exactement ce qu elle contient."),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:P.dim}},_NXtr(vues.length)+"/"+_NXtr(toutes.length))),
i("div",{style:{position:"relative",marginBottom:"12px"}},
i("input",{value:flt,onChange:function(e){setFlt(e.target.value);},placeholder:_T("Filtrer les donnees…"),
spellCheck:false,"aria-label":_T("Filtrer les donnees"),
style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,borderRadius:"11px",
padding:"11px 13px",color:P.txt,fontSize:"12.5px",outline:"none",fontFamily:"inherit"}}),
flt?i("div",{className:"nx-fx",role:"button","aria-label":_T("Effacer le filtre"),tabIndex:0,onKeyDown:_NXkey,
onClick:function(){setFlt("");},
style:{position:"absolute",right:"11px",top:"10px",color:P.faint,fontSize:"14px",cursor:"pointer",lineHeight:1}},_NXtr("\u00d7")):null),
vues.length?vues.map(function(r,k,arr){
var op=ouvert===r.k;
return i("div",{key:r.k,style:{borderBottom:k===arr.length-1?"none":"1px solid "+P.line}},
i("div",{className:"nx-fx",role:"button","aria-label":_NXtr(r.libelle),"aria-expanded":op?"true":"false",
tabIndex:0,onKeyDown:_NXkey,onClick:function(){setOuvert(op?"":r.k);},
style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px 10px 12px 12px",cursor:"pointer",
borderRadius:"10px",marginLeft:"-12px",marginRight:"-10px",
background:op?P.inset:"transparent",borderLeft:"2px solid "+(op?(rang[r.k]||P.mute):"transparent")}},
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}},
i("span",{style:{fontSize:"13px",fontWeight:"600",color:P.txt}},_NXtr(r.libelle)),
r.reglage?i("span",{style:{fontSize:"9px",fontWeight:"700",letterSpacing:".08em",textTransform:"uppercase",
color:P.faint,border:"1px solid "+P.line,borderRadius:"99px",padding:"2px 6px"}},_T("reglage")):null),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint,marginTop:"3px"}},_NXtr(r.k))),
i("div",{style:{width:"64px",flexShrink:0}},
i("div",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:P.sub,textAlign:"right",
fontVariantNumeric:"tabular-nums"}},_NXtr(D.fmtTaille(r.taille))),
i("div",{style:{marginTop:"5px"}},
i("div",{style:{height:"3px",borderRadius:"99px",background:P.line,overflow:"hidden"}},
i("div",{style:{height:"100%",borderRadius:"99px",background:rang[r.k]||P.mute,
width:(monte?Math.max(3,r.taille/maxT*100):0)+"%",transition:"width .6s cubic-bezier(.22,.8,.28,1)"}})))),
i("span",{"aria-hidden":"true",style:{flexShrink:0,color:P.faint,fontSize:"11px",
transform:op?"rotate(90deg)":"none",transition:"transform .2s ease"}},"\u203a")),
op?i("div",{style:{paddingBottom:"14px"}},
i("pre",{style:{margin:"0 0 11px",padding:"12px 13px",background:P.inset,border:"1px solid "+P.line,
borderRadius:"10px",fontFamily:_NXf.mono,fontSize:"10.5px",color:P.sub,lineHeight:1.6,
maxHeight:"260px",overflow:"auto",whiteSpace:"pre-wrap",wordBreak:"break-word"}},
(D.lire(r.k)||_T("(vide)")).slice(0,20000)),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},
_NXbtn(_T("Copier"),function(){
try{DiscordNative.clipboard.copy(D.lire(r.k)||"");
if(window._NXPR&&_NXPR.toast)_NXPR.toast(_T("Copie dans le presse-papiers."),1);}catch(_){}}),
_NXbtn(_T("Effacer cette donnee"),function(){
if(window.confirm(_T("Effacer")+" \u00ab "+_NXtr(r.libelle)+" \u00bb ?")){effacer(r.k);setOuvert("");force();}}))):null);})
:i("div",{style:{fontSize:"12.5px",color:P.dim,lineHeight:1.6}},_T("Aucune donnee ne correspond a ce filtre."))),{mb:12}),
_NXtr(carteDemarrage()),
_NXcard(i("div",null,_NXch(_T("Tout exporter, tout effacer"),
_T("L export rassemble reglages et compteurs de tous les modules dans un seul fichier.")),
i("div",{style:{display:"flex",gap:"9px",flexWrap:"wrap"}},
_NXbtn(_T("Exporter tout"),function(){try{if(window._NXV&&_NXV.exportAll)_NXV.exportAll();}catch(_){}},true),
_NXbtn(_T("Tout effacer"),function(){
if(window.confirm(_T("Effacer toutes les donnees Nexium de cette machine ? Cette action est definitive.")))
{try{if(window._NXV&&_NXV.purgeAll)_NXV.purgeAll();}catch(_){}force();}}))),{mb:0}));}
// ------------------------------------------------- demarrer avec Windows
// Avant, cette carte decrivait un raccourci que l installateur etait cense
// poser -- il n existait pas -- et disait que le client ne pouvait ni le
// verifier ni le retirer. C est maintenant un reglage, applique par le
// lanceur, et dont l etat affiche est celui que Windows a reellement retenu.
function carteDemarrage(){
var D=window._NXDEM;
if(!D)return null;
var dg=D.diagnostic();
var cfg=D.lis()||{avecWindows:false,reduit:true};
var e=D.etat();
var COUL={actif:P.ok,coupe:P.dim,attente:P.warn,refuse:P.danger,
inconnu:P.faint,indisponible:P.faint,horsWindows:P.faint};
var col=COUL[dg.code]||P.faint;
var vivant=(dg.code!=="horsWindows"&&dg.code!=="indisponible");
return _NXcard(i("div",null,
_NXch(_T("Demarrage avec Windows"),
_T("Nexium s ouvre avec ta session, reduit dans la barre des taches.")),
i("div",{style:{display:"flex",alignItems:"center",gap:"13px",padding:"14px 15px",
borderRadius:"14px",background:_NXteinte(col,7),
border:"1px solid "+_NXteinte(col,26),marginBottom:"14px",flexWrap:"wrap"}},
_NXFX.pastille(dg.code==="actif"?"check":(dg.code==="refuse"?"alerte":
(dg.code==="attente"?"horloge":"puce")),{col:col,taille:34,halo:dg.code==="actif"}),
i("div",{style:{flex:1,minWidth:"210px"}},
i("div",{style:{fontSize:"13px",fontWeight:"700",color:P.txt}},
dg.code==="actif"?_T("Actif"):(dg.code==="coupe"?_T("Coupe"):
(dg.code==="refuse"?_T("Refuse par Windows"):
(dg.code==="attente"?_T("En attente du lanceur"):
(dg.code==="inconnu"?_T("Jamais demande"):_T("Indisponible")))))),
i("div",{style:{fontSize:"12px",color:P.sub,marginTop:"4px",lineHeight:1.55}},_NXtr(dg.texte))),
vivant?_NXFX.bouton({t:cfg.avecWindows?_T("Desactiver"):_T("Activer"),
icone:cfg.avecWindows?"croix":"check",plein:!cfg.avecWindows,creux:cfg.avecWindows,
col:cfg.avecWindows?P.sub:P.acc,
onClick:function(){D.set(!cfg.avecWindows,cfg.reduit);force();}}):null),
vivant&&cfg.avecWindows?i("div",{style:{display:"flex",alignItems:"center",gap:"11px",
padding:"11px 14px",borderRadius:"12px",background:P.inset,
border:"1px solid "+P.line,marginBottom:"13px",flexWrap:"wrap"}},
i("span",{style:{display:"flex",color:P.dim}},_NXFX.svg("moins",15)),
i("div",{style:{flex:1,minWidth:"190px"}},
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.txt}},_T("Demarrer reduit")),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"3px",lineHeight:1.5}},
_T("La fenetre ne s ouvre pas au premier plan : le client attend dans la barre des taches."))),
_NXFX.bouton({t:cfg.reduit?_T("Oui"):_T("Non"),petit:true,creux:true,
col:cfg.reduit?P.ok:P.sub,
onClick:function(){D.set(cfg.avecWindows,!cfg.reduit);force();}})):null,
i("div",{style:{fontSize:"12px",color:P.sub,lineHeight:1.7}},
_T("Le reglage est applique par le lanceur, qui ecrit une entree a ton nom d utilisateur seulement. Les autres comptes de l ordinateur ne sont pas touches, et rien n est installe comme service.")),
e&&e.chemin?i("div",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint,
lineHeight:1.6,marginTop:"11px",padding:"10px 12px",background:P.inset,
border:"1px solid "+P.line,borderRadius:"9px",wordBreak:"break-all"}},
_NXtr("HKCU\\...\\CurrentVersion\\Run")+_NXtr(String.fromCharCode(10))+
(_NXtr(e.nom)||_NXtr("Nexium Client"))+" = "+_NXtr(e.chemin)+(e.reduit?_NXtr(" --start-minimized"):"")):null,
e&&e.quand?i("div",{style:{fontSize:"11px",color:P.faint,marginTop:"9px"}},
_T("Dernier passage du lanceur")+" : "+
_NXtr(new Date(e.quand).toLocaleString("fr-FR"))):null),{mb:12});}

function tSauvegardes(){
var L=D.sauvegardes();
return i("div",null,
_NXcard(i("div",null,
_NXch(_T("Sauvegarde automatique"),_T("Une copie de tes reglages est gardee ici, sans jamais quitter la machine.")),
[["auto",_T("Sauvegarder tout seul"),_T("Une copie est prise au demarrage si la derniere date de plus de quelques jours.")]].map(function(o){
var on=!!D.cfg[o[0]];
return i("div",{key:o[0],className:"nx-fx",role:"button","aria-label":_NXtr(o[1]),"aria-pressed":on?"true":"false",
tabIndex:0,onKeyDown:_NXkey,onClick:function(){D.set(o[0],!on);force();},
style:{display:"flex",alignItems:"flex-start",gap:"13px",padding:"13px 0",cursor:"pointer",
borderBottom:"1px solid "+P.line}},
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"13.5px",fontWeight:"600",color:on?P.txt:P.sub}},_NXtr(o[1])),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"4px",lineHeight:1.55}},_NXtr(o[2]))),
i("div",{"data-nx-sw":"1","aria-hidden":"true",style:{width:"38px",height:"22px",borderRadius:"11px",flexShrink:0,
marginTop:"1px",background:on?P.txt:"transparent",border:"1px solid "+(on?P.txt:P.faint)}},
i("div",{style:{width:"14px",height:"14px",borderRadius:"50%",margin:"3px",
background:on?_NXpal.ink:P.faint,transform:on?"translateX(16px)":"none"}})));}),
i("div",{style:{paddingTop:"14px"}},
i("div",{style:{fontSize:"10px",fontWeight:"700",letterSpacing:".09em",textTransform:"uppercase",
color:P.dim,marginBottom:"8px"}},_T("Frequence")),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"}},
[1,3,7,14].map(function(j){
var on=D.cfg.jours===j;
return i("div",{key:j,className:"nx-fx",role:"button","aria-label":_NXtr(j)+" "+_T("jours"),
"aria-pressed":on?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){D.set("jours",j);force();},
style:{padding:"8px 14px",borderRadius:"10px",cursor:"pointer",fontFamily:_NXf.mono,fontSize:"11.5px",
background:on?P.inset:"transparent",border:"1px solid "+(on?P.txt:P.line),color:on?P.txt:P.sub}},
j===1?_T("chaque jour"):(_NXtr(j)+_NXtr(" j")));}))),
i("div",{style:{display:"flex",gap:"9px",marginTop:"16px",flexWrap:"wrap"}},
_NXbtn(_T("Sauvegarder maintenant"),function(){
var e=D.sauvegarder(false);
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(e?_T("Sauvegarde enregistree."):_T("Sauvegarde impossible : trop volumineuse."),e?1:0);}catch(_){}
force();},true))),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Copies disponibles"),_T("De la plus recente a la plus ancienne."),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:P.dim}},_NXtr(L.length)+"/"+_NXtr(D.cfg.max))),
L.length?L.map(function(e,k,arr){
var d=new Date(e.t);
return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap",padding:"13px 0",
borderBottom:k===arr.length-1?"none":"1px solid "+P.line}},
i("div",{style:{width:"7px",height:"7px",borderRadius:"50%",flexShrink:0,
background:k===0?_NXpal.ok:P.faint}}),
i("div",{style:{flex:1,minWidth:"140px"}},
i("div",{style:{fontSize:"12.5px",color:P.txt,fontWeight:"600"}},
_NXtr(d.toLocaleDateString())+" "+("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2)),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint,marginTop:"3px"}},
_NXtr(e.n)+" "+_T("modules")+" · "+_NXtr(D.fmtTaille(e.taille))+" · "+(e.auto?_T("automatique"):_T("manuelle")))),
_NXbtn(_T("Restaurer"),function(){
if(window.confirm(_T("Restaurer cette sauvegarde ? Tes reglages actuels seront remplaces."))){
var n=D.restaurer(k);
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr(n)+" "+_T("module(s) restaure(s). Redemarre Discord pour tout appliquer."),1);}catch(_){}
force();}}),
_NXbtn(_T("Supprimer"),function(){D.supprimerSauvegarde(k);force();}));})
:i("div",{style:{fontSize:"12.5px",color:P.dim,lineHeight:1.6}},
_T("Aucune copie pour l instant. La premiere sera prise automatiquement, ou tout de suite si tu le demandes."))),{mb:12}),
_NXcard(i("div",{style:{fontSize:"11.5px",color:P.dim,lineHeight:1.65}},
_T("Une sauvegarde ne contient que tes reglages, jamais tes statistiques ni tes journaux. Elle reste sur cette machine : pour la deplacer, utilise Exporter tout dans l onglet Stockage.")),{mb:0}));}
function tSante(){
var S=D.sante();
var E=(window._NXERR||[]);
var diag=(window._NXDIAG&&_NXDIAG.detail)?_NXDIAG.detail():[];
var pct=S.total?Math.round(S.vivants/S.total*100):100;
return i("div",null,
i("div",{"data-nx-lift":"1",style:{border:"1px solid "+P.hair,borderRadius:"22px",
background:"linear-gradient(158deg,"+P.panel+","+P.bg+")",padding:"25px 24px",marginBottom:"14px"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"20px",flexWrap:"wrap",marginBottom:"16px"}},
_NXring(pct,pct===100?_NXpal.ok:(pct>=60?_NXpal.warn:_NXpal.danger),82,pct+"%",_T("en marche")),
i("div",{style:{flex:1,minWidth:"170px"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".16em",textTransform:"uppercase",
color:P.faint,marginBottom:"9px"}},_T("Modules en fonctionnement")),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"38px",fontWeight:"800",
color:pct===100?_NXpal.ok:_NXpal.warn,letterSpacing:"-.045em",lineHeight:1,
fontVariantNumeric:"tabular-nums"}},_NXtr(S.vivants)+" / "+_NXtr(S.total)),
i("div",{style:{fontSize:"13px",color:P.sub,fontWeight:"600",marginTop:"8px"}},
_T(pct===100?"Tout tourne":"Certains modules n ont pas demarre")))),
i("div",{style:{display:"flex",gap:"3px",flexWrap:"wrap"}},
_NXtr((function(){var out=[];
for(var k=0;k<S.total;k++){
out.push(i("div",{key:k,style:{width:"14px",height:"5px",borderRadius:"2px",
background:k<S.vivants?_NXpal.ok:_NXpal.warn,
opacity:monte?1:0,transition:"opacity .3s ease",transitionDelay:(k*18)+"ms"}}));}
return out;})())),
S.morts.length?i("div",{style:{marginTop:"16px",paddingTop:"14px",borderTop:"1px solid "+P.line,
fontSize:"12px",color:_NXpal.warn,lineHeight:1.6}},
_T("N ont pas demarre")+" : "+_NXtr(S.morts.join(", "))):null),
_NXtr((function(){try{
var S=(window._NXSAFE&&_NXSAFE.etat)?_NXSAFE.etat():null;
if(!S||!S.actif)return null;
return _NXcard(i("div",null,
i("div",{style:{display:"flex",alignItems:"center",gap:"9px",marginBottom:"8px",flexWrap:"wrap"}},
i("span",{"data-nx-dot":"1","aria-hidden":"true",style:{width:"7px",height:"7px",borderRadius:"50%",
background:_NXpal.warn,flexShrink:0}}),
i("div",{style:{fontSize:"14px",fontWeight:"800",color:_NXpal.warn}},_T("Mode securise actif"))),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.65,marginBottom:"11px"}},
_T("Discord a redemarre trois fois en peu de temps. Nexium a coupe de lui-meme ce qui touche a l affichage, pour ecarter la cause la plus probable.")),
S.coupes.length?i("div",{style:{marginBottom:"13px"}},
S.coupes.map(function(c,k){
return i("div",{key:k,style:{fontSize:"12px",color:P.dim,lineHeight:1.7}},"\u2022 "+_NXtr(c));})):null,
i("div",{style:{fontSize:"12px",color:P.dim,lineHeight:1.65,marginBottom:"13px"}},
_T("Si le client se tient tranquille, tu peux revenir en marche normale. Si les plantages reprennent, laisse le mode actif et copie le journal ci-dessous.")),
_NXbtn(_T("Repasser en marche normale"),function(){try{
if(_NXSAFE.leve()){
if(window._NXPR&&_NXPR.toast)_NXPR.toast(_T("Marche normale retablie. Redemarre Discord pour tout reactiver."),1);
force();}}catch(_){}},true)),{mb:12,glow:"rgba(217,164,65,.12)"});
}catch(_){return null;}})()),
diag.length?_NXtr((function(){
var grave=diag.filter(function(x){return x.v==="confirme";}).length>0;
var COL={"confirme":_NXpal.danger,"a surveiller":_NXpal.warn,"sans effet":_NXpal.ok};
var tst=(window._NXDIAG&&_NXDIAG.tests)||{};
return _NXcard(i("div",null,
_NXch(grave?_T("Un composant de Discord ne marche pas"):_T("Remarques sur l installation de Discord"),
grave?_T("Un effet reel a ete constate, deux fois de suite. Le detail et la solution sont ci-dessous."):
_T("Discord a ecrit ces lignes dans son journal. Chacune a ete verifiee sur ce qui marche vraiment : rien ne demande d agir."),
_NXFX.bouton({t:_T("Reverifier"),icone:"maj",petit:true,creux:true,col:P.sub,
onClick:function(){try{_NXDIAG.scan(true);}catch(_){}force();}})),
diag.map(function(x,k){
return _NXFX.rangee({key:x.k,premier:!k,icone:x.v==="confirme"?"alerte":(x.v==="sans effet"?"check":"info"),
col:COL[x.v]||P.sub,titre:_T(x.t),texte:_T(x.d),
droite:_NXFX.badge(_T(x.v),COL[x.v]||P.sub,{})});}),
i("div",{style:{fontSize:"11px",color:P.faint,lineHeight:1.6,marginTop:"12px"}},
_T("Moteur vocal")+" : "+(tst.voix===true?_T("fonctionne"):(tst.voix===false?_T("ne demarre pas"):_T("non interroge")))+
" · "+_T("pont natif")+" : "+(tst.natifs===true?_T("present"):(tst.natifs===false?_T("absent"):_T("non interroge")))),
grave?i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.6,marginTop:"11px"}},
_T("Solution : ferme Discord et reinstalle le client Nexium a partir d une copie complete du dossier.")):null),
{mb:12,glow:grave?"rgba(214,72,72,.12)":null});})()):null,
_NXcard(i("div",null,
_NXch(_T("Journal des erreurs"),_T("Les erreurs internes rencontrees par Nexium depuis le demarrage."),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:E.length?_NXpal.warn:P.faint}},_NXtr(E.length)+"")),
E.length?i("div",null,
i("div",{style:{maxHeight:"260px",overflowY:"auto",marginBottom:"12px"}},
E.slice().reverse().slice(0,20).map(function(m,k){
var vieille=String(m).indexOf("[session precedente]")===0;
return i("div",{key:k,style:{fontSize:"10.5px",color:vieille?P.dim:P.sub,fontFamily:_NXf.mono,padding:"9px 11px",
background:P.inset,border:"1px solid "+P.line,borderRadius:"9px",marginBottom:"5px",
borderLeft:"2px solid "+(vieille?P.faint:_NXpal.warn),
lineHeight:1.6,wordBreak:"break-word"}},String(m).slice(0,400));})),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},
_NXbtn(_T("Copier le journal"),function(){
try{DiscordNative.clipboard.copy(E.join("\n\n"));
if(window._NXPR&&_NXPR.toast)_NXPR.toast(_T("Journal copie."),1);}catch(_){}}),
_NXbtn(_T("Vider"),function(){try{window._NXERR.length=0;}catch(_){}force();})))
:i("div",{style:{fontSize:"12.5px",color:P.dim,lineHeight:1.6}},
_T("Aucune erreur enregistree. Tout va bien."))),{mb:12}),
_NXcard(i("div",null,_NXch(_T("Version installée")),
i("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap"}},
_NXtr(grand2("v"+((window._NXUP&&_NXUP.VERSION)||"?"),_T("Nexium Client"))),
_NXtr(grand2(_NXn(((window._NXPR&&_NXPR.remote&&_NXPR.remote.n)||0)),_T("Domaines en base"))),
_NXtr(grand2(((window._NXNETX&&_NXNETX.timeouts)||0),_T("Delais depasses"),_T("depuis le demarrage"))))),{mb:0}));}
function tApparence(){
var S=window._NXSKIN,E2=window._NXECO;
function bascule(lab,desc,on,onClick,last){
return i("div",{className:"nx-fx",role:"button","aria-label":_NXtr(lab),"aria-pressed":on?"true":"false",
tabIndex:0,onKeyDown:_NXkey,onClick:onClick,
style:{display:"flex",alignItems:"flex-start",gap:"13px",padding:"13px 0",cursor:"pointer",
borderBottom:last?"none":"1px solid "+P.line}},
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"13.5px",fontWeight:"600",color:on?P.txt:P.sub}},_NXtr(lab)),
desc?i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"4px",lineHeight:1.55}},_NXtr(desc)):null),
i("div",{"data-nx-sw":"1","aria-hidden":"true",style:{width:"38px",height:"22px",borderRadius:"11px",flexShrink:0,
marginTop:"1px",background:on?P.txt:"transparent",border:"1px solid "+(on?P.txt:P.faint)}},
i("div",{style:{width:"14px",height:"14px",borderRadius:"50%",margin:"3px",
background:on?_NXpal.ink:P.faint,transform:on?"translateX(16px)":"none"}})));}
function puce(lab,on,onClick){
return i("div",{key:lab,className:"nx-fx",role:"button","aria-label":_NXtr(lab),"aria-pressed":on?"true":"false",
tabIndex:0,onKeyDown:_NXkey,onClick:onClick,
style:{padding:"8px 13px",borderRadius:"10px",cursor:"pointer",fontSize:"11.5px",fontWeight:"600",
background:on?P.inset:"transparent",border:"1px solid "+(on?P.txt:P.line),color:on?P.txt:P.sub}},_NXtr(lab));}
function famille(titre,opts,cur,cle){
return i("div",{style:{paddingTop:"14px"}},
i("div",{style:{fontSize:"10px",fontWeight:"700",letterSpacing:".09em",textTransform:"uppercase",
color:P.dim,marginBottom:"8px"}},_NXtr(titre)),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"}},
opts.map(function(o){return puce(o[1],cur===o[0],function(){S.set(cle,o[0]);force();});})));}
return i("div",null,
S?_NXcard(i("div",null,
_NXch(_T("Apparence Nexium"),_T("Habille Discord aux couleurs du client : fonds, accents, typographie et coins.")),
_NXtr(bascule(_T("Appliquer le theme Nexium"),
_T("Actif par defaut. Decoche pour retrouver l apparence d origine de Discord."),
S.cfg.on,function(){S.set("on",!S.cfg.on);force();},!S.cfg.on)),
S.cfg.on?_NXtr(famille(_T("Fond"),[["encre",_T("Encre")],["graphite",_T("Graphite")],["papier",_T("Papier")]],S.cfg.variante,"variante")):null,
S.cfg.on?_NXtr(famille(_T("Accent"),[["ivoire",_T("Ivoire")],["cendre",_T("Cendre")],["braise",_T("Braise")],["discord",_T("Aucun")]],S.cfg.accent,"accent")):null,
S.cfg.on?_NXtr(famille(_T("Typographie"),[["defaut",_T("Origine")],["grotesque",_T("Grotesque")],["editoriale",_T("Editoriale")]],S.cfg.police,"police")):null,
S.cfg.on?_NXtr(famille(_T("Coins"),[["arrondi",_T("Arrondis")],["doux",_T("Doux")],["net",_T("Nets")]],S.cfg.coins,"coins")):null,
S.cfg.on?_NXtr(famille(_T("Signature"),[["discrete",_T("Discrete")],["affirmee",_T("Affirmee")],["totale",_T("Totale")]],S.cfg.intensite,"intensite")):null,
S.cfg.on?i("div",{style:{paddingTop:"14px"}},
_NXtr(bascule(_T("Images sobres"),_T("Desature les bannieres pour garder une lecture monochrome."),
S.cfg.sobre,function(){S.set("sobre",!S.cfg.sobre);force();},true))):null,
_NXtr((function(){var st=S.status();
return i("div",{style:{marginTop:"14px",paddingTop:"13px",borderTop:"1px solid "+P.line,
fontSize:"11.5px",color:st.applique?P.dim:_NXpal.warn,lineHeight:1.6}},
st.applique?(_T("Theme applique")
+((st.manquants&&st.manquants.length)?(" · "+_T("elements Discord introuvables")+" : "+_NXtr(st.manquants.join(", "))):""))
:(_T("Theme non applique")+" : "+(_NXtr(st.pourquoi)||"?")));})()),
i("div",{style:{marginTop:"14px"}},
_NXbtn(_T("Revoir l ecran d accueil"),function(){try{if(window._NXWEL)_NXWEL.rejouer();}catch(_){}}),
_NXbtn(_T("Revoir les nouveautes de la version"),function(){try{if(window._NXPOP)_NXPOP.rejoue();}catch(_){}}))),{mb:12}):null,
(window._NXPERF&&_NXPERF.releve)?_NXcard(i("div",null,
_NXch(_T("Fluidite"),_T("Ce que Nexium coute vraiment sur ta machine, mesure en direct depuis le demarrage, et ce qui ralentit Discord autour de lui.")),
_NXtr((function(){
var r=_NXPERF.releve()||{depuis:1,nexiumMs:0,part:0,modules:[],longues:{n:0,ms:0,pire:0,recentes:0},suivi:"",sources:[],cadres:0};
var dg=_NXPERF.diagnostic(),f=_NXPERF.derniere,min=Math.max(1,Math.round(r.depuis/60000));
var fmt=function(v){v=v||0;return v>=100?String(Math.round(v)):(v>=10?v.toFixed(1):v.toFixed(2));};
var tuile=function(t,v,sous,col){return i("div",{"data-nx-rise":"",style:{flex:"1 1 150px",minWidth:"140px",padding:"12px 14px",borderRadius:"12px",background:P.inset,border:"1px solid "+P.line}},
i("div",{style:{fontSize:"10.5px",letterSpacing:".08em",textTransform:"uppercase",color:P.sub}},t),
i("div",{style:{fontSize:"22px",fontWeight:700,color:col||P.txt,margin:"4px 0 2px",fontVariantNumeric:"tabular-nums"}},v),
i("div",{style:{fontSize:"11.5px",color:P.dim,lineHeight:1.5}},sous));};
var titre=function(t){return i("div",{style:{fontSize:"11px",letterSpacing:".08em",textTransform:"uppercase",color:P.sub,margin:"16px 0 6px"}},t);};
var ligne=function(a,b,col){return i("div",{style:{display:"flex",justifyContent:"space-between",gap:"12px",padding:"7px 0",borderTop:"1px solid "+P.line,fontSize:"12.5px"}},
i("span",{style:{color:P.dim,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},a),
i("span",{style:{color:col||P.txt,fontVariantNumeric:"tabular-nums",textAlign:"right",flexShrink:0}},b));};
var part=r.part*100;
var bloc=r.suivi?String(r.longues.n):"?";
var blocSous=r.suivi?(r.longues.n?(_T("taches de plus de 50 ms")+" · "+_T("pire")+" "+Math.round(r.longues.pire)+" ms · "+r.longues.recentes+" "+_T("ces 5 dernieres minutes")):_T("aucune tache de plus de 50 ms")):_T("ce client ne permet pas de les compter");
var M=r.modules.slice(0,7),S=r.sources.slice(0,5),out=[];
out.push(i("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap"}},
tuile(_T("Part de Nexium"),fmt(part)+" %",_T("du temps ecoule depuis")+" "+min+" min"+" · "+fmt(r.nexiumMs)+" ms "+_T("de calcul"),part<1?P.ok:(part<3?P.warn:P.danger)),
tuile(_T("Blocages"),bloc,blocSous,r.longues.recentes>5?P.warn:null),
tuile(_T("Images par seconde"),f?String(f.ips):"—",f?((f.lents?(f.lents+" "+_T("images lentes")+" · "+_T("pire")+" "+f.pire+" ms"):_T("aucune image lente"))+(f.cachee?" · "+_T("fenetre cachee pendant la mesure"):"")):_T("lance une mesure de 5 secondes"),f?(f.ips>=50?P.ok:(f.ips>=30?P.warn:P.danger)):null)));
out.push(i("div",{style:{marginTop:"10px"}},
_NXbtn(_NXPERF._fl?_T("Mesure en cours..."):_T("Mesurer 5 secondes"),function(){try{if(_NXPERF.fluidite(5000,function(){force();}))force();}catch(_){}})));
out.push(titre(_T("Ce qui a bloque l interface")));
if(r.suivi!=="loaf")out.push(i("div",{style:{fontSize:"12px",color:P.dim,lineHeight:1.6}},_T("Le detail par script n est pas fourni par cette version de Discord.")));
else if(!S.length)out.push(i("div",{style:{fontSize:"12px",color:P.dim,lineHeight:1.6}},_T("Aucune image bloquee depuis le demarrage.")));
else for(var a=0;a<S.length;a++)out.push(ligne(S[a].nom,S[a].n+" "+_T("fois")+" · "+fmt(S[a].ms)+" ms",S[a].nom==="Nexium"?P.warn:null));
out.push(titre(_T("Nexium, partie par partie")));
if(!M.length)out.push(i("div",{style:{fontSize:"12px",color:P.dim,lineHeight:1.6}},_T("Rien n a encore tourne.")));
else for(var b=0;b<M.length;b++)out.push(ligne(M[b].nom,M[b].n+" "+_T("appels")+" · "+fmt(M[b].ms)+" ms · max "+fmt(M[b].max)+" ms",M[b].max>50?P.warn:null));
out.push(titre(_T("Reglages qui pesent")));
if(!dg.lu)out.push(i("div",{style:{fontSize:"12px",color:P.dim,lineHeight:1.6}},_T("Les reglages du client sont illisibles d ici.")));
else{
if(!dg.points.length)out.push(i("div",{style:{fontSize:"12px",color:P.ok,lineHeight:1.6}},_T("Rien a signaler dans les reglages du client.")));
for(var c=0;c<dg.points.length;c++)(function(p){
var fait=!!p.fait;
out.push(i("div",{"data-nx-rise":"",style:{marginTop:"8px",padding:"12px 14px",borderRadius:"12px",border:"1px solid "+(p.grave?_NXteinte(P.warn,45):P.line),background:p.grave?_NXteinte(P.warn,7):"transparent"}},
i("div",{style:{fontSize:"13px",fontWeight:600,color:p.grave?P.warn:P.txt}},p.titre),
i("div",{style:{fontSize:"12px",color:P.dim,lineHeight:1.6,margin:"4px 0 8px"}},p.texte),
fait?i("div",{style:{fontSize:"12px",color:P.ok}},_T("Applique. Pris en compte au prochain demarrage de Discord.")):
_NXbtn(p.action,function(){try{_NXPERF.corrige(p.id);force();}catch(_){}})));})(dg.points[c]);
var corr=false;try{for(var kc in (_NXPERF.corriges||{}))corr=true;}catch(_){}
if(corr)out.push(i("div",{style:{marginTop:"10px"}},_NXbtn(_T("Redemarrer Discord maintenant"),function(){try{setTimeout(function(){try{if(window._NXUP&&_NXUP.relaunch&&_NXUP.relaunch())return;location.reload();}catch(_){}},900);}catch(_){}})));
out.push(i("div",{style:{fontSize:"11.5px",color:P.sub,marginTop:"10px"}},dg.plugins+" "+_T("plugins Equicord actifs, hors bibliotheques internes.")));}
return i("div",null,out);})())),{mb:12}):null,
E2?_NXcard(i("div",null,
_NXch(_T("Performances"),_T("Allege le client sur les machines modestes.")),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"6px"}},
_NXtr(puce(_T("Automatique"),E2.cfg.mode==="auto",function(){E2.set("mode","auto");force();})),
_NXtr(puce(_T("Toujours allege"),E2.cfg.mode==="on",function(){E2.set("mode","on");force();})),
_NXtr(puce(_T("Jamais"),E2.cfg.mode==="off",function(){E2.set("mode","off");force();}))),
i("div",{style:{paddingTop:"8px"}},
_NXtr(bascule(_T("Couper les animations"),_T("En mode Toujours allege seulement. L automatique n y touche jamais."),
E2.cfg.legerAnim,function(){E2.set("legerAnim",!E2.cfg.legerAnim);force();})),
_NXtr(bascule(_T("Alleger la mesure reseau"),_T("Cesse de chronometrer chaque requete : c est le poste le plus couteux."),
E2.cfg.legerReseau,function(){E2.set("legerReseau",!E2.cfg.legerReseau);force();})),
_NXtr(bascule(_T("Alleger les images"),_T("Met en pause les animations d images et retire les flous d arriere-plan."),
E2.cfg.legerImages,function(){E2.set("legerImages",!E2.cfg.legerImages);force();})),
_NXtr(bascule(_T("Suspendre en arriere-plan"),_T("Arrete les boucles Nexium quand la fenetre n est pas visible."),
E2.cfg.pauseCachee,function(){E2.set("pauseCachee",!E2.cfg.pauseCachee);force();})),
(window._NXPERF&&_NXPERF.choixGpu)?_NXtr(bascule(_T("Accélération matérielle"),
(function(){var g=_NXPERF.gpu();return _T("La carte graphique dessine Discord : images fluides, animations à vitesse normale. Pris en compte au prochain démarrage.")+" "+
(g.active===true?_T("Active en ce moment."):(g.active===false?_T("Coupée en ce moment."):""));})(),
_NXPERF.choixGpu(),function(){_NXPERF.poseGpu(!_NXPERF.choixGpu());force();},true)):null),
_NXtr((function(){var st=E2.status();
return i("div",{style:{marginTop:"14px",paddingTop:"13px",borderTop:"1px solid "+P.line,
fontSize:"11.5px",color:P.dim,lineHeight:1.6}},
(st.coeurs?(_NXtr(st.coeurs)+" "+_T("coeurs")):_T("coeurs inconnus"))
+(st.memoire?(" · "+_NXtr(st.memoire)+" "+_T("Go de memoire")):"")
+" · "+(st.detecteFaible?_T("machine modeste detectee"):_T("machine confortable"))
+" · "+(st.actif?_T("mode allege actif"):_T("mode allege inactif")));})())),{mb:12}):null,
(window._NXMO)?_NXcard(i("div",null,
_NXch(_T("Animations Nexium"),_T("Les transitions des pages Nexium, independamment du reste de Discord.")),
_NXtr(bascule(_T("Animer les pages Nexium"),
_T("Cascades, jauges qui se remplissent et compteurs qui reagissent. Le reglage systeme de mouvement reduit reste prioritaire."),
_NXMO.on,function(){_NXMO.set(!_NXMO.on);force();},true)),
_NXtr((function(){var c=[];try{for(var k in _NXMO.coupes)if(_NXMO.coupes[k])c.push(k==="eco"?_T("le mode Toujours allege"):_T("le mode securise"));}catch(_){}
return (c.length&&_NXMO.on)?i("div",{style:{marginTop:"10px",fontSize:"11.5px",color:P.warn,lineHeight:1.6}},
_T("Coupees pour cette session par")+" "+_NXtr(c.join(", "))+"."):null;})())),{mb:0}):null);}
return i(Kr,null,i("div",{style:{maxWidth:"660px",margin:"0 auto"}},
_NXhead(_T("Données"),_NXtr("Nexium Données"),_T("Tout ce que Nexium garde sur cette machine, et rien d autre. Rien n est synchronise, rien n est envoye : tu peux ouvrir chaque ligne pour verifier.")),
_NXtr(tabbar()),
i("div",{key:tab,"data-nx-panel":"1"},
tab==="stockage"?_NXtr(tStockage()):tab==="sauvegardes"?_NXtr(tSauvegardes()):tab==="sante"?_NXtr(tSante()):_NXtr(tApparence())),
_NXfoot(_NXtr("Nexium Données · stockage local, clés nexium_*"))));

}var _NXNG=window._NXNG||(window._NXNG={});
