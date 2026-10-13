function NexiumHomeComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
F.useEffect(function(){
var vivant=true,att=null;
var maj=function(){try{if(!vivant||att)return;att=setTimeout(function(){att=null;if(vivant)force();},500);}catch(_){}};
var mods=["_NXPR","_NXGD","_NXP","_NXNET","_NXABO"];
for(var a=0;a<mods.length;a++){try{var o=window[mods[a]];if(o&&o.listeners)o.listeners.push(maj);}catch(_){}}
var id=setInterval(function(){try{if(typeof document==="undefined"||!document.hidden)maj();}catch(_){}},3000);
return function(){vivant=false;
try{if(att)clearTimeout(att);}catch(_){}
try{clearInterval(id);}catch(_){}
for(var b=0;b<mods.length;b++){try{var o2=window[mods[b]];
if(o2&&o2.listeners)o2.listeners=o2.listeners.filter(function(f){return f!==maj;});}catch(_){}}};},[]);
var monte=_NXmounted(F);
var P=_NXpal;
var PR=window._NXPR,G=window._NXGD,PV=window._NXP,NT=window._NXNET,V=window._NXV,DA=window._NXDATA;
var menaces=((PR&&PR.stats&&PR.stats.blocked)||0);
var sorties=(G&&G.total)?G.total():0;
var vues=((PV&&PV.stats&&PV.stats.seen)||0);
var arretees=((PV&&PV.stats&&PV.stats.blocked)||0);
var analyses=((PR&&PR.stats&&PR.stats.scanned)||0);
var sante=(DA&&DA.sante)?DA.sante():{total:0,vivants:0,morts:[],erreurs:0};
var lat=(NT&&NT.stats)?NT.stats():{avg:0,n:0};
var ver=(window._NXUP&&_NXUP.VERSION)||"?";
var pctSante=sante.total?Math.round(sante.vivants/sante.total*100):100;
var pctFiltre=vues?Math.round(arretees/vues*100):0;
var tout=menaces+sorties+arretees;
var alerte=sante.morts.length>0;
var etatC=alerte?P.warn:(tout>0?P.ok:P.info);
var etatT=alerte?_T("Attention requise"):(tout>0?_T("Protection active"):_T("En veille"));

function aller(cle,nom){try{
if(window._NXCP&&_NXCP.ouvrir){_NXCP.ouvrir(cle,nom);return;}
if(window._NXPR&&_NXPR.toast)_NXPR.toast(_T("Ouvre les reglages Discord, puis la section Nexium."),1);
}catch(_){}}

// ---------------------------------------------------------- la constellation
// Le bouclier au centre, les modules en orbite. Chaque point est un module
// reel du client : allume s il tourne, eteint sinon. Ce n est pas un decor.
function constellation(){
var C=110,R0=88;
var mods=[
{n:"Protect",on:!!(PR&&PR.boot),c:P.danger},
{n:"Privacy",on:!!(PV&&PV.boot),c:P.ok},
{n:"Gardes",on:!!(G&&G.cfg&&G.cfg.egressGuard),c:P.info},
{n:"Reseau",on:!!(NT&&NT.boot),c:P.warn},
{n:"Coffre",on:!!(V&&V.boot),c:P.rose},
{n:"Assistant",on:!!(window._NXIA&&_NXIA.boot),c:P.mauve},
{n:"Comptes",on:!!(window._NXCPT&&_NXCPT.boot),c:P.cyan},
{n:"Donnees",on:!!(DA&&DA.boot),c:P.lime}];
var an=_NXFX.anime();
var pts=mods.map(function(m,k){
var ang=(-90+k*(360/mods.length))*Math.PI/180;
return {x:C+Math.cos(ang)*R0,y:C+Math.sin(ang)*R0,on:m.on,c:m.c,n:m.n,k:k};});
var circ=2*Math.PI*(R0-22);
return i("div",{style:{position:"relative",width:"100%",maxWidth:"228px",flexShrink:0}},
an?i("div",{"data-nx-halo":"1","aria-hidden":"true",style:{position:"absolute",inset:"6%",
borderRadius:"50%",background:"radial-gradient(circle,"+_NXteinte(etatC,16)+",transparent 68%)",
pointerEvents:"none"}}):null,
i("svg",{viewBox:"0 0 "+(C*2)+" "+(C*2),width:"100%",height:"100%",role:"img",
"aria-label":_T("Etat des modules du client"),style:{display:"block",position:"relative"}},
i("circle",_NXFX.fusion({cx:C,cy:C,r:R0+11,fill:"none",stroke:_NXteinte(etatC,14),
strokeWidth:1,strokeDasharray:"2 8"},
an?{"data-nx-spin":"1",style:{transformOrigin:"50% 50%",animationDuration:"52s"}}:{})),
i("circle",{cx:C,cy:C,r:R0,fill:"none",stroke:P.line,strokeWidth:1}),
i("circle",{cx:C,cy:C,r:R0-44,fill:_NXteinte(etatC,5),stroke:P.hair,strokeWidth:1}),
i("circle",{cx:C,cy:C,r:R0-22,fill:"none",stroke:P.line,strokeWidth:1,opacity:.6}),
i("circle",_NXFX.fusion({cx:C,cy:C,r:R0-22,fill:"none",stroke:etatC,strokeWidth:2.5,
strokeLinecap:"round",transform:"rotate(-90 "+C+" "+C+")",
strokeDasharray:circ.toFixed(1),
strokeDashoffset:(circ*(1-(monte?pctSante/100:0))).toFixed(1)},
an?{"data-nx-ring":"1"}:{})),
i("g",{transform:"translate("+(C-26)+","+(C-30)+")",fill:"none",stroke:etatC,
strokeWidth:2.2,strokeLinejoin:"round",strokeLinecap:"round"},
i("path",{d:"M26 2 4 10v18c0 14 9.4 26 22 30 12.6-4 22-16 22-30V10L26 2z"}),
i("path",{d:"M15 30l8 8 15-16"})),
pts.map(function(p){
return i("g",{key:"m"+p.k},
i("line",{x1:C,y1:C,x2:p.x,y2:p.y,stroke:p.on?_NXteinte(p.c,16):P.line,strokeWidth:1,
opacity:monte?1:0,style:{transition:"opacity .6s ease "+(200+p.k*70)+"ms"}}),
p.on?i("circle",_NXFX.fusion({cx:p.x,cy:p.y,r:10,fill:"none",stroke:p.c,strokeWidth:1,
opacity:monte?.3:0,style:{transition:"opacity .6s ease "+(340+p.k*70)+"ms"}},
an?{"data-nx-breathe":"1"}:{})):null,
i("circle",{cx:p.x,cy:p.y,r:p.on?5.5:3.5,fill:p.on?p.c:P.line,
opacity:monte?(p.on?1:.55):0,
style:{transition:"opacity .5s ease "+(260+p.k*70)+"ms"}},
i("title",null,_NXtr(p.n)+" · "+(p.on?_T("actif"):_T("inactif")))));})));}

// ------------------------------------------------- la courbe des 24 dernieres h
function heures(){
var H=[];
try{
var st=(PV&&PV.stats)||{};
var maintenant=new Date();
for(var h=23;h>=0;h--){
var d=new Date(maintenant.getTime()-h*3600000);
var cle=d.getFullYear()+"-"+PV.pad(d.getMonth()+1)+"-"+PV.pad(d.getDate())+"-"+PV.pad(d.getHours());
var e=(st.hours&&st.hours[cle])||{seen:0,blocked:0};
H.push({h:d.getHours(),s:e.seen||0,b:e.blocked||0});}
}catch(_){return null;}
return H.length?H:null;}

function courbe(){
var H=heures();
if(!H)return null;
var total=0,a;
for(a=0;a<H.length;a++)total+=H[a].b;
return i("div",{style:{marginTop:"4px"}},
i("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"baseline",
gap:"12px",marginBottom:"12px",flexWrap:"wrap"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".14em",
textTransform:"uppercase",color:P.faint}},_T("Les vingt-quatre dernieres heures")),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:total?P.ok:P.dim}},
total?(_NXn(total)+" "+_T("arretees")):_T("rien a signaler"))),
_NXFX.courbe(H.map(function(e){return e.s;}),P.info,54,{plein:.18}),
i("div",{style:{marginTop:"8px"}},
_NXFX.barres(H.map(function(e){return {v:e.b,t:e.h+"h · "+e.b+" "+_T("arretees"),hi:e.b>0};}),P.ok,26)),
i("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px",
fontFamily:_NXf.mono,fontSize:"9.5px",color:P.faint,letterSpacing:".04em"}},
i("span",null,_NXtr("-24 h")),
i("span",null,_T("vues")+" / "+_T("arretees")),
i("span",null,_T("maintenant"))));}

// ------------------------------------------------------------ actions rapides
function actions(){
var A=[
{n:_T("Demander a l assistant"),ic:"etincelle",c:P.mauve,f:function(){
try{if(window._NXIA&&_NXIA.ouvrirPanneau){_NXIA.ouvrirPanneau();return;}}catch(_){}
aller("equicord_ia","Nexium IA");}},
{n:_T("Verifier un lien"),ic:"lien",c:P.danger,f:function(){aller("equicord_protect","Nexium Protect");}},
{n:_T("Chercher une mise a jour"),ic:"maj",c:P.info,hv:"tourne",f:function(){
try{if(window._NXUP&&!_NXUP.busy)_NXUP.check();}catch(_){}
aller("equicord_updater",_T("Mise a jour"));}},
{n:_T("Voir ce qui est stocke"),ic:"base",c:P.lime,f:function(){aller("equicord_data","Nexium Donnees");}}];
return i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},
A.map(function(x,k){
return i("div",_NXFX.fusion({key:k,className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:x.f,"data-nx-lift":"1",
style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"9px 14px",
borderRadius:"11px",cursor:"pointer",background:P.inset,
border:"1px solid "+P.line,color:P.pale,fontSize:"12px",fontWeight:"700"}},
_NXFX.a({"data-nx-rise":String(k+1)})),
_NXFX.ico(x.ic,15,{col:x.c,hv:x.hv||"saute"}),
i("span",null,_NXtr(x.n)));}));}

// ------------------------------------------------------------------ les tuiles
var GROUPES=[
{n:_T("Te proteger"),ic:"bouclier",c:P.danger,l:[
{k:"equicord_protect",n:"Nexium Protect",d:_T("Liens, arnaques, fichiers"),ic:"bouclierOk",
c:P.danger,v:_NXn(menaces),u:_T("bloquees"),hv:"secoue"},
{k:"equicord_privacy",n:"Nexium Privacy",d:_T("Ce qui sort de ta machine"),ic:"oeilBarre",
c:P.ok,v:_NXn(arretees),u:_T("arretees"),hv:"penche"},
{k:"equicord_comptes",n:"Nexium Comptes",d:_T("Coffre chiffre et profils"),ic:"comptes",
c:P.rose,v:_NXn(((window._NXCPT&&_NXCPT.comptes)||[]).length),u:_T("comptes"),hv:"saute"}]},
{n:_T("Comprendre ton client"),ic:"graphe",c:P.info,l:[
{k:"equicord_network",n:"Nexium Reseau",d:_T("Latence et hotes contactes"),ic:"reseau",
c:P.warn,v:lat.n?(lat.avg+" ms"):"—",u:_T("moyenne"),hv:"pousse"},
{k:"equicord_stats",n:"Nexium Stats",d:_T("Ton usage, en local"),ic:"graphe",
c:P.info,v:_NXn((window._NXS&&_NXS.data&&_NXS.data.msgCount)||0),u:_T("messages"),hv:"saute"},
{k:"equicord_data",n:"Nexium Donnees",d:_T("Stockage, sauvegardes, sante"),ic:"base",
c:P.lime,v:(DA&&DA.fmtTaille)?DA.fmtTaille(DA.total()):"—",u:_T("stockes"),hv:"penche"},
{k:"equicord_updater",n:_T("Mise a jour"),d:_T("Version, notes et reparation"),ic:"maj",
c:P.cyan,v:"v"+ver,u:"",hv:"tourne"}]},
{n:_T("T aider au quotidien"),ic:"etincelle",c:P.mauve,l:[
{k:"equicord_ia",n:"Nexium IA",d:_T("Un assistant qui connait ton client"),ic:"etincelle",
c:P.mauve,v:_NXn((window._NXIA&&_NXIA.nbCaps)?_NXIA.nbCaps():0),u:_T("acces"),hv:"secoue"},
{k:"equicord_music",n:"Nexium Music",d:_T("Lecteur et playlist"),ic:"note",
c:P.rose,v:_NXn(((window._NXM&&_NXM.cfg&&_NXM.cfg.tracks)||[]).length),u:_T("pistes"),hv:"saute"},
{k:"equicord_auto",n:"Nexium Auto",d:_T("Automatisations et messages"),ic:"eclair",
c:P.warn,v:_NXn((((window._NXAU&&_NXAU.data&&_NXAU.data.tasks)||[]).length)||0),u:_T("regles"),hv:"penche"},
{k:"equicord_team",n:"Nexium Team",d:_T("Qui construit le client"),ic:"equipe",
c:P.sub,v:"",u:"",hv:"saute"},
{k:"equicord_sponsor",n:"Nexium Sponsor",d:_T("Soutenir le client"),ic:"coeur",
c:P.rose,v:"",u:"",hv:"secoue"}]}];

function tuile(t){
var vif=!!(t.v&&t.v!=="0"&&t.v!=="—");
return _NXFX.tuile({key:t.k,icone:t.ic,col:t.c,hv:t.hv,halo:vif,ruban:vif,
titre:_NXtr(t.n),texte:_NXtr(t.d),onClick:function(){aller(t.k,t.n);},
droite:_NXFX.ico("chevron",14,{col:P.faint,hv:"pousse"}),
bas:t.v?i("div",{style:{display:"flex",alignItems:"baseline",gap:"5px"}},
i("span",{style:{fontFamily:_NXf.disp,fontSize:"18px",fontWeight:"800",
color:vif?t.c:P.faint,letterSpacing:"-.03em",fontVariantNumeric:"tabular-nums"}},_NXtr(t.v)),
t.u?i("span",{style:{fontSize:"10px",color:P.faint}},_NXtr(t.u)):null):null});}

// --------------------------------------------------- demarrage et apparence
function reglagesVisuels(){
var B=window._NXBOOT,MO=window._NXMO;
return _NXcard(i("div",null,
_NXch(_T("Demarrage et mouvement"),
_T("Ce que tu vois quand le client s ouvre, et combien il bouge ensuite.")),
_NXFX.grille([
_NXFX.tuile({key:"b",icone:"lecture",col:P.acc,rang:1,hv:"pousse",
titre:_T("Animation d ouverture"),
sous:(B&&B.veut())?_T("active"):_T("desactivee"),
texte:_T("Un ecran couvre le client pendant qu il se prepare, et s efface des qu il est pret."),
bas:i("div",{style:{display:"flex",gap:"7px",flexWrap:"wrap"}},
_NXFX.bouton({t:(B&&B.veut())?_T("Desactiver"):_T("Activer"),petit:true,creux:true,col:P.sub,
onClick:function(){try{B.set(!B.veut());force();}catch(_){}}}),
_NXFX.bouton({t:_T("Revoir"),icone:"maj",hv:"tourne",petit:true,col:P.acc,plein:true,
onClick:function(){try{B.rejoue();}catch(_){}}}))}),
_NXFX.tuile({key:"m",icone:"etincelle",col:P.mauve,rang:2,hv:"secoue",
titre:_T("Animations des pages"),
sous:(MO&&MO.on)?_T("actives"):_T("coupees"),
texte:_T("Les entrees, les survols et les jauges. Le systeme peut aussi les couper de son cote."),
bas:_NXFX.bouton({t:(MO&&MO.on)?_T("Couper"):_T("Remettre"),petit:true,creux:true,col:P.sub,
onClick:function(){try{MO.set(!MO.on);force();}catch(_){}}})}),
_NXFX.tuile({key:"e",icone:"batterie",col:P.lime,rang:3,hv:"saute",
titre:_T("Mode economie"),
sous:(window._NXECO&&_NXECO.actif())?_T("actif"):_T("au repos"),
texte:_T("Sur une machine modeste, le client se fait plus discret : moins de mouvement, moins de reseau."),
bas:_NXFX.bouton({t:_T("Regler"),petit:true,creux:true,col:P.sub,
onClick:function(){aller("equicord_data","Nexium Donnees");}})})],250)),{mb:12});}

var etatDirect=(window._NXSTATUS&&_NXSTATUS.etatDirect)?_NXSTATUS.etatDirect():{};

return i(Kr,null,i("div",{style:{maxWidth:"860px",margin:"0 auto"}},
// ----------------------------------------------------------------- l entete
i("div",_NXFX.fusion({style:{position:"relative",marginBottom:"22px"}},_NXFX.a({"data-nx-fade":"1"})),
i("div",{"aria-hidden":"true",style:{position:"absolute",left:"-80px",top:"-90px",
width:"460px",height:"260px",pointerEvents:"none",
background:"radial-gradient(50% 62% at 10% 40%,"+_NXteinte(etatC,10)+",transparent 72%)"}}),
i("div",{style:{position:"relative",display:"flex",alignItems:"center",gap:"26px",flexWrap:"wrap"}},
_NXtr(constellation()),
i("div",{style:{flex:1,minWidth:"260px"}},
i("div",_NXFX.fusion({style:{display:"flex",alignItems:"center",gap:"9px",marginBottom:"10px"}},
_NXFX.a({"data-nx-slidel":"1"})),
i("span",_NXFX.fusion({style:{width:"7px",height:"7px",borderRadius:"50%",background:etatC,
boxShadow:"0 0 12px "+_NXteinte(etatC,60)}},_NXFX.a({"data-nx-dot":"1"}))),
i("span",{style:{fontSize:"10.5px",fontWeight:"800",letterSpacing:".22em",
color:P.sub,textTransform:"uppercase"}},_NXtr(etatT)),
i("span",{style:{marginLeft:"4px",fontFamily:_NXf.mono,fontSize:"10px",color:P.faint,
border:"1px solid "+P.hair,borderRadius:"99px",padding:"1px 8px"}},_NXtr("v")+_NXtr(ver))),
i("div",_NXFX.fusion({style:{fontFamily:_NXf.disp,fontSize:"38px",fontWeight:"800",color:P.txt,
letterSpacing:"-.04em",lineHeight:1.02}},_NXFX.a({"data-nx-blurin":"1"})),_NXtr("Nexium Client")),
i("div",{style:{fontSize:"13.5px",color:P.sub,marginTop:"12px",lineHeight:1.65,maxWidth:"430px"}},
_T("Tout ce que le client fait pour toi, sur une seule page. Rien ne quitte cette machine sans que tu le saches.")),
i("div",{style:{marginTop:"18px"}},_NXtr(actions())))),
i("div",{style:{position:"relative",height:"1px",marginTop:"24px",
background:"linear-gradient(90deg,"+_NXteinte(etatC,34)+","+P.hair+" 34%,transparent)"}})),

(window._NXABO&&_NXABO.banniere)?_NXABO.banniere({ou:"accueil",maj:force}):null,
// -------------------------------------------------------------- les jauges
_NXcard(i("div",null,
_NXch(_T("Ou en est le client"),_T("Quatre mesures, prises maintenant, sur cette machine.")),
i("div",{style:{display:"flex",gap:"18px",flexWrap:"wrap",justifyContent:"space-around",
alignItems:"center"}},
i("div",_NXFX.fusion({style:{textAlign:"center"}},_NXFX.a({"data-nx-rise":"1"})),
_NXFX.jauge(pctSante,alerte?P.warn:P.ok,116,pctSante+"%",_T("Modules")),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"9px"}},
sante.total?(_NXtr(sante.vivants)+" / "+_NXtr(sante.total)+" "+_T("en service")):_T("inconnu"))),
i("div",_NXFX.fusion({style:{textAlign:"center"}},_NXFX.a({"data-nx-rise":"2"})),
_NXFX.jauge(Math.min(100,menaces?100:(analyses?12:0)),P.danger,116,_NXn(menaces),_T("Menaces")),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"9px"}},
_NXn(analyses)+" "+_T("liens analyses"))),
i("div",_NXFX.fusion({style:{textAlign:"center"}},_NXFX.a({"data-nx-rise":"3"})),
_NXFX.jauge(pctFiltre,P.ok,116,pctFiltre+"%",_T("Filtre")),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"9px"}},
_NXn(arretees)+" / "+_NXn(vues)+" "+_T("requetes"))),
i("div",_NXFX.fusion({style:{textAlign:"center"}},_NXFX.a({"data-nx-rise":"4"})),
_NXFX.jauge(lat.n?Math.max(4,100-Math.min(100,lat.avg/8)):0,
(lat.avg&&lat.avg>400)?P.warn:P.info,116,lat.n?(lat.avg+""):"—",_T("Latence")),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"9px"}},
lat.n?(_NXn(lat.n)+" "+_T("mesures")):_T("aucune mesure")))),
i("div",{style:{marginTop:"22px",paddingTop:"20px",borderTop:"1px solid "+P.line}},_NXtr(courbe()))),{mb:12}),

alerte?_NXFX.note({col:P.warn,icone:"alerte",titre:_T("Des modules ne tournent pas"),
texte:_NXtr(sante.morts.slice(0,4).join(", "))+
(sante.morts.length>4?(" … "+(sante.morts.length-4)+" "+_T("de plus")):"")+
" — "+_T("le detail est dans Nexium Donnees."),
droite:_NXFX.bouton({t:_T("Voir"),petit:true,creux:true,col:P.warn,
onClick:function(){aller("equicord_data","Nexium Donnees");}})}):null,

// -------------------------------------------------------------- les tuiles
GROUPES.map(function(g,k){
return _NXcard(i("div",{key:g.n},
i("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"15px"}},
_NXFX.pastille(g.ic,{col:g.c,taille:30,hv:"penche"}),
i("div",{style:{fontSize:"11px",fontWeight:"800",letterSpacing:".14em",
color:P.dim,textTransform:"uppercase"}},_NXtr(g.n)),
i("div",{style:{flex:1,height:"1px",background:P.line}})),
_NXFX.grille(g.l.map(tuile),238)),{mb:12});}),

_NXtr(reglagesVisuels()),

// ------------------------------------------------------------------ le pied
_NXcard(i("div",null,
_NXch(_T("En un coup d oeil"),_T("Ce que le client sait de lui-meme a cet instant.")),
i("div",{style:{display:"flex",gap:"26px",flexWrap:"wrap"}},
_NXFX.chiffre({k:_T("Menaces bloquees"),v:_NXn(menaces),col:menaces?P.danger:P.faint,rang:1}),
_NXFX.chiffre({k:_T("Sorties arretees"),v:_NXn(sorties),col:sorties?P.info:P.faint,rang:2}),
_NXFX.chiffre({k:_T("Requetes filtrees"),v:_NXn(arretees),col:arretees?P.ok:P.faint,rang:3}),
_NXFX.chiffre({k:_T("Alertes en direct"),v:etatDirect.ouvert?_T("oui"):_T("non"),
col:etatDirect.ouvert?P.ok:P.faint,rang:4}),
_NXFX.chiffre({k:_T("Version"),v:"v"+ver,rang:5}))),{mb:0}),
_NXfoot(_NXtr("Nexium Client v")+_NXtr(ver)+" · "+_T("tout est calcule et garde sur cette machine"))));
}
