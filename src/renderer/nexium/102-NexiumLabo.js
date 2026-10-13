var NexiumLaboIcon=function(p){p=p||{};var z=p.width||p.height||20;return (window._NXFX&&_NXFX.svg)?_NXFX.svg("loupe",z):null;};
function NexiumLaboComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _p=F.useState("complet");var profil=_p[0];var setProfil=_p[1];
var _d=F.useState(null);var dossier=_d[0];var setDossier=_d[1];
var _av=F.useState("");var avis=_av[0];var setAvis=_av[1];
var _ou=F.useState({});var ouverts=_ou[0];var setOuverts=_ou[1];
var _su=F.useState(false);var survol=_su[0];var setSurvol=_su[1];
var _fi=F.useState("");var filtre=_fi[0];var setFiltre=_fi[1];

F.useEffect(function(){
if(!window._NXLAB)return;
var maj=function(){force();};
_NXLAB._ecoute.push(maj);
return function(){try{
_NXLAB._ecoute=_NXLAB._ecoute.filter(function(f){return f!==maj;});}catch(_){}};},[]);

var P=_NXpal;
var L=window._NXLAB||null;

function dis(t){try{setAvis(String(t||""));setTimeout(function(){try{setAvis("");}catch(_){}},5000);}catch(_){}}
function bascule(k){try{var o={},x;for(x in ouverts)o[x]=ouverts[x];o[k]=!o[k];setOuverts(o);}catch(_){}}
function copie(t,quoi){try{
_NXpresse(t).then(function(ok){dis(ok?(quoi+" copie."):"La copie a echoue sur ce client.");});}catch(_){}}

var TETE=_NXhead(_NXtr("Bac a sable"),_NXtr("Nexium Bac a sable"),
_NXtr("Un fichier, lu octet par octet. Rien n est execute : on reconnait des formes, on compte, on compare \u2014 et on dit ce qu on n a pas pu faire."));

if(!L)return i(Kr,null,i("div",{style:{maxWidth:"880px",margin:"0 auto"}},_NXtr(TETE),
_NXcard(i("div",{style:{fontSize:"12.5px",color:P.warn}},_NXtr("Le laboratoire n a pas demarre sur ce client.")),{mb:0})));

function lance(nom,tampon){
setDossier(null);
dis("Analyse en cours...");
L.analyse(nom,tampon,profil,function(){force();})
.then(function(d){setDossier(d);dis("");},function(e){dis(String((e&&e.message)||e));});}

function prendFichier(f){
if(!f)return;
try{
if(f.arrayBuffer)f.arrayBuffer().then(function(b){lance(f.name,b);},function(){dis("Lecture impossible.");});
else{
var fr=new FileReader();
fr.onload=function(){lance(f.name,fr.result);};
fr.onerror=function(){dis("Lecture impossible.");};
fr.readAsArrayBuffer(f);}}catch(_){dis("Lecture impossible.");}}

// ------------------------------------------------------------- le depot
function depot(){
var actif=!!L.encours;
return i("div",{
onDragOver:function(e){e.preventDefault();if(!survol)setSurvol(true);},
onDragLeave:function(){setSurvol(false);},
onDrop:function(e){e.preventDefault();setSurvol(false);
try{var f=e.dataTransfer&&e.dataTransfer.files&&e.dataTransfer.files[0];prendFichier(f);}catch(_){}},
style:{position:"relative",overflow:"hidden",borderRadius:"22px",
border:"1px "+(survol?"solid":"dashed")+" "+_NXteinte(survol?P.mauve:P.faint,survol?46:26),
background:survol?_NXteinte(P.mauve,8):"radial-gradient(120% 150% at 50% -30%,"+_NXteinte(P.mauve,7)+" 0%,"+P.panel+" 55%,"+P.bg+" 100%)",
padding:"30px 24px",marginBottom:"14px",textAlign:"center"}},
i("div",{style:{display:"flex",justifyContent:"center",marginBottom:"14px",
transform:survol?"scale(1.06)":"scale(1)"}},
_NXFX.blason("loupe",survol?P.mauve:P.dim,66)),
i("div",{style:{fontSize:"16px",fontWeight:"800",color:P.txt,letterSpacing:"-.01em"}},
actif?_NXtr("Analyse en cours"):_NXtr("Depose un fichier ici")),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.7,margin:"7px auto 18px",maxWidth:"430px"}},
actif?_NXtr("Les etapes s affichent au fur et a mesure.")
:_NXtr("Ou choisis-le. Il ne quitte jamais cette machine : tout se lit en memoire, et rien n est envoye nulle part.")),
i("div",{style:{display:"flex",gap:"9px",justifyContent:"center",flexWrap:"wrap"}},
i("label",{style:{display:"inline-flex",alignItems:"center",gap:"7px",cursor:"pointer",
padding:"9px 16px",borderRadius:"10px",fontSize:"12.5px",fontWeight:"700",
background:P.acc,color:P.ink,border:"1px solid "+P.acc}},
_NXtr("Choisir un fichier"),
i("input",{type:"file",style:{display:"none"},
onChange:function(e){try{prendFichier(e.target.files&&e.target.files[0]);}catch(_){}}})),
i("div",{style:{display:"flex",gap:"5px",alignItems:"center"}},
[["rapide","Rapide"],["complet","Complet"]].map(function(p2,k){
var on=profil===p2[0];
return i("div",{key:k,role:"button",tabIndex:0,"aria-label":_NXtr("Profil ")+_NXtr(p2[1]),
onKeyDown:_NXkey,onClick:function(){setProfil(p2[0]);},
style:{cursor:"pointer",padding:"9px 14px",borderRadius:"10px",fontSize:"12px",
fontWeight:on?"700":"400",color:on?P.txt:P.sub,
background:on?P.raise:"transparent",border:"1px solid "+(on?P.edge:P.hair)}},_NXtr(p2[1]));}))),
i("div",{style:{marginTop:"14px",fontSize:"11.5px",color:P.dim}},
_NXtr(L.PROFILS[profil].length)+_NXtr(" module(s) \u00b7 ")+
_NXtr(L.PROFILS[profil].map(function(k){return L.NOMS[k];}).join(" \u00b7 "))));}

// ------------------------------------------------------------- le direct
function direct(){
var d=L.encours;
if(!d)return null;
return _NXcard(i("div",null,
_NXch(_NXtr("Journal de l analyse"),_NXtr(d.id)),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"11.5px",lineHeight:1.9}},
d.etapes.map(function(e,k){
return i("div",{key:k,style:{display:"flex",gap:"10px",color:P.sub}},
i("span",{style:{color:P.ok}},"\u2713"),
i("span",{style:{flex:1}},_NXtr(e.n)),
i("span",{style:{color:P.dim}},_NXtr(e.ms)+_NXtr(" ms")),
i("span",{style:{color:P.dim,width:"66px",textAlign:"right"}},_NXtr(e.trouves)+_NXtr(" constat(s)")));}),
i("div",{style:{display:"flex",gap:"10px",color:P.mauve}},
i("span",null,"\u25cf"),i("span",null,_NXtr("en cours..."))))),{mb:12});}

// ------------------------------------------------------------- les niveaux
function pastilleRisque(d){
var n=L.niveau(d.score);
var col=n.k==="danger"?P.danger:(n.k==="attention"?P.warn:(n.k==="tiede"?P.info:P.ok));
return i("div",{style:{display:"flex",alignItems:"center",gap:"16px",flexWrap:"wrap"}},
i("div",{style:{position:"relative",width:"86px",height:"86px",flex:"0 0 auto",
borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
border:"2px solid "+_NXteinte(col,46),background:_NXteinte(col,10)}},
i("div",{style:{textAlign:"center"}},
i("div",{style:{fontSize:"25px",fontWeight:"800",color:col,fontFamily:_NXf.mono,lineHeight:1}},
_NXtr(String(d.score))),
i("div",{style:{fontSize:"9px",color:P.dim,marginTop:"2px"}},_NXtr("sur 100")))),
i("div",{style:{flex:1,minWidth:"200px"}},
i("div",{style:{fontSize:"17px",fontWeight:"800",color:P.txt}},_NXtr(n.n)),
i("div",{style:{fontSize:"12.5px",color:P.sub,marginTop:"4px",lineHeight:1.65}},
_NXtr("Ce nombre est la somme des constats ci-dessous. Chacun porte son poids : rien n est devine.")),
i("div",{style:{display:"flex",gap:"7px",marginTop:"10px",flexWrap:"wrap"}},
i("span",{style:{padding:"3px 9px",borderRadius:"999px",fontSize:"10.5px",
border:"1px solid "+_NXteinte(d.isole?P.ok:P.warn,30),
background:_NXteinte(d.isole?P.ok:P.warn,9),color:d.isole?P.ok:P.warn}},
d.isole?_NXtr("isole (Worker)"):_NXtr("fil principal")),
i("span",{style:{padding:"3px 9px",borderRadius:"999px",fontSize:"10.5px",
border:"1px solid "+P.hair,color:P.sub}},_NXtr(d.duree)+_NXtr(" ms")),
i("span",{style:{padding:"3px 9px",borderRadius:"999px",fontSize:"10.5px",
border:"1px solid "+P.hair,color:P.sub}},_NXtr(d.profil)),
d.interrompu?i("span",{style:{padding:"3px 9px",borderRadius:"999px",fontSize:"10.5px",
border:"1px solid "+_NXteinte(P.warn,30),color:P.warn}},_NXtr("interrompue")):null)));}

function volet(k,titre,sous,contenu,forceOuvert){
var on=(ouverts[k]===undefined)?!!forceOuvert:ouverts[k];
return i("div",{style:{border:"1px solid "+P.hair,borderRadius:"14px",
background:P.inset,marginBottom:"9px",overflow:"hidden"}},
i("div",{role:"button",tabIndex:0,"aria-label":_NXtr(titre),onKeyDown:_NXkey,
onClick:function(){bascule(k);},
style:{display:"flex",alignItems:"center",gap:"11px",padding:"13px 15px",cursor:"pointer"}},
i("span",{style:{fontSize:"11px",color:P.dim,width:"9px",flex:"0 0 auto",
transform:on?"rotate(90deg)":"none",display:"inline-block"}},"\u276f"),
i("div",{style:{flex:1}},
i("div",{style:{fontSize:"13px",fontWeight:"700",color:P.txt}},_NXtr(titre)),
sous?i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"2px"}},_NXtr(sous)):null)),
on?i("div",{style:{padding:"0 15px 15px",borderTop:"1px solid "+P.hair}},_NXtr(contenu)):null);}

function ligneConstat(c,k){
var col=c.n===2?P.danger:(c.n===1?P.warn:P.dim);
return i("div",{key:k,style:{display:"flex",gap:"11px",alignItems:"flex-start",
padding:"10px 0",borderBottom:"1px solid "+P.hair}},
i("span",{style:{width:"7px",height:"7px",borderRadius:"50%",marginTop:"6px",
flex:"0 0 auto",background:col}}),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{display:"flex",alignItems:"center",gap:"9px",flexWrap:"wrap"}},
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.txt}},_NXtr(c.t)),
c.p?i("span",{style:{fontSize:"10.5px",color:col,fontFamily:_NXf.mono}},"+"+_NXtr(c.p)):null,
i("span",{style:{fontSize:"10px",color:P.dim}},_NXtr(L.NOMS[c.m])||_NXtr(c.m))),
c.d?i("div",{style:{fontSize:"12px",color:P.sub,lineHeight:1.6,marginTop:"4px",
whiteSpace:"pre-wrap",wordBreak:"break-word"}},_NXtr(String(c.d))):null));}

function resultats(){
var d=dossier||L.dernier;
if(!d)return null;
var pese=[],graves=[],verifier=[],tout=d.constats,a;
for(a=0;a<tout.length;a++){
if(tout[a].p)pese.push(tout[a]);
if(tout[a].n===2)graves.push(tout[a]);
else if(tout[a].n===1)verifier.push(tout[a]);}
var av=[],prof=null,chaines=[],iocs=[];
for(a=0;a<tout.length;a++){
if(tout[a].profil)prof=tout[a].profil;
if(tout[a].chaines)chaines=chaines.concat(tout[a].chaines);
if(tout[a].indicateurs)iocs.push(tout[a].indicateurs);}
var conseils=L.conseils(d);
var q=filtre.toLowerCase();
var filtres=q?tout.filter(function(c){
return (c.t+" "+(c.d||"")).toLowerCase().indexOf(q)>=0;}):tout;

return i("div",null,
_NXcard(i("div",null,
i("div",{style:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px",flexWrap:"wrap"}},
i("div",{style:{flex:1,minWidth:"180px"}},
i("div",{style:{fontSize:"14px",fontWeight:"800",color:P.txt,wordBreak:"break-all"}},_NXtr(d.nom)),
i("div",{style:{fontSize:"11.5px",color:P.dim,fontFamily:_NXf.mono,marginTop:"3px"}},
_NXtr(d.id)+" \u00b7 "+_NXtr(d.taille)+_NXtr(" octets"))),
i("div",null,_NXbtn(_NXtr("Copier le rapport"),function(){copie(L.rapport(d),"Le rapport");},"acc")),
i("div",null,_NXbtn(_NXtr("Enregistrer"),function(){try{
var t2=L.rapport(d);
if(window.DiscordNative&&DiscordNative.fileManager&&DiscordNative.fileManager.saveWithDialog){
DiscordNative.fileManager.saveWithDialog(new TextEncoder().encode(t2),d.id+".txt");
dis("Rapport enregistre.");}
else copie(t2,"Le rapport");}catch(_){dis("Enregistrement impossible.");}},"ghost"))),
_NXtr(pastilleRisque(d)),
d.note?i("div",{style:{marginTop:"14px",padding:"11px 13px",borderRadius:"11px",
border:"1px solid "+_NXteinte(P.warn,26),background:_NXteinte(P.warn,7),
fontSize:"12px",color:P.warn,lineHeight:1.6}},_NXtr(d.note)):null),{mb:12}),

_NXtr(volet("l1","1 \u00b7 Resume",pese.length+" constat(s) pesent dans le score",
i("div",null,
pese.length?pese.map(ligneConstat)
:i("div",{style:{fontSize:"12.5px",color:P.dim,padding:"12px 0"}},
_NXtr("Aucun constat ne pese. Le score est de 0 \u2014 ce qui ne prouve rien, seulement que rien de connu n a ete reconnu."))),true)),

_NXtr(volet("l2","2 \u00b7 Resultats techniques",tout.length+" constat(s) au total",
i("div",null,
i("div",{style:{margin:"12px 0"}},
_NXFX.champ({k:_NXtr("Filtrer"),v:filtre,ph:_NXtr("un mot"),serre:true,
onChange:function(e){setFiltre(e.target.value);}})),
filtres.map(ligneConstat)))),

_NXtr(volet("l3","3 \u00b7 Indicateurs suspects",graves.length?(graves.length+" element(s)"):"aucun",
i("div",null,
graves.length?graves.map(ligneConstat)
:i("div",{style:{fontSize:"12.5px",color:P.dim,padding:"12px 0"}},
_NXtr("Rien n a atteint le niveau le plus grave."))))),

_NXtr(volet("l4","4 \u00b7 Details avances",
(chaines.length?chaines.length+" chaine(s)":"")+(prof?" \u00b7 profil d entropie":""),
i("div",null,
prof?i("div",{style:{margin:"12px 0"}},
i("div",{style:{fontSize:"11.5px",color:P.dim,marginBottom:"7px"}},
_NXtr("Entropie par bloc \u2014 au-dela de 7,4 le contenu n est pas lisible tel quel")),
i("div",{style:{display:"flex",alignItems:"flex-end",gap:"2px",height:"56px"}},
prof.map(function(v,k){
return i("div",{key:k,title:_NXtr(String(v)),style:{flex:1,minWidth:"3px",
height:Math.max(2,Math.round(v/8*56))+"px",borderRadius:"2px",
background:v>7.4?_NXteinte(P.warn,70):_NXteinte(P.ok,52)}});}))):null,
iocs.length?iocs.map(function(g,k){
return i("div",{key:k,style:{marginTop:"12px"}},
i("div",{style:{fontSize:"11.5px",color:P.pale,marginBottom:"5px"}},
_NXtr(g.liste.length)+" "+_NXtr(g.genre)),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:P.sub,
maxHeight:"140px",overflowY:"auto",lineHeight:1.7,wordBreak:"break-all"}},
_NXtr(g.liste.slice(0,60).join("\n"))));}):null,
chaines.length?i("div",{style:{marginTop:"14px"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"9px",marginBottom:"6px"}},
i("div",{style:{flex:1,fontSize:"11.5px",color:P.pale}},_NXtr("Chaines lisibles")),
_NXbtn(_NXtr("Copier"),function(){copie(chaines.join("\n"),"Les chaines");},"ghost")),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:P.sub,
maxHeight:"220px",overflowY:"auto",lineHeight:1.7,wordBreak:"break-all",
border:"1px solid "+P.hair,borderRadius:"10px",padding:"10px 12px"}},
_NXtr(chaines.slice(0,400).join("\n")))):null))),

_NXtr(volet("l5","5 \u00b7 Elements a verifier",verifier.length?(verifier.length+" point(s)"):"aucun",
i("div",null,
verifier.length?verifier.map(ligneConstat)
:i("div",{style:{fontSize:"12.5px",color:P.dim,padding:"12px 0"}},_NXtr("Rien en suspens."))))),

_NXtr(volet("l6","6 \u00b7 Recommandations",conseils.length+" conseil(s)",
i("div",null,conseils.map(function(c,k){
return i("div",{key:k,style:{padding:"11px 0",borderBottom:"1px solid "+P.hair}},
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.txt}},_NXtr(c.t)),
i("div",{style:{fontSize:"12px",color:P.sub,lineHeight:1.65,marginTop:"4px"}},_NXtr(c.d)));})),true)),

_NXtr(volet("l7","7 \u00b7 Rapport","texte brut, collable ailleurs",
i("div",{style:{marginTop:"12px"}},
i("div",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:P.sub,lineHeight:1.7,
whiteSpace:"pre-wrap",maxHeight:"320px",overflowY:"auto",
border:"1px solid "+P.hair,borderRadius:"10px",padding:"12px 13px"}},
_NXtr(L.rapport(d)))))));}

// ------------------------------------------------------------- l historique
function historique(){
if(!L.histo.length)return null;
return _NXcard(i("div",null,
_NXch(_NXtr("Analyses precedentes"),_NXtr(L.histo.length)+_NXtr(" gardee(s) sur cette machine")),
i("div",{style:{display:"flex",flexDirection:"column",gap:"7px"}},
L.histo.slice(0,12).map(function(h,k){
var col=h.niveau==="danger"?P.danger:(h.niveau==="attention"?P.warn:(h.niveau==="tiede"?P.info:P.ok));
return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"11px",
border:"1px solid "+P.hair,borderRadius:"11px",padding:"10px 12px"}},
i("span",{style:{width:"7px",height:"7px",borderRadius:"50%",flex:"0 0 auto",background:col}}),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"12.5px",color:P.txt,overflow:"hidden",
textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(h.nom)),
i("div",{style:{fontSize:"10.5px",color:P.dim,fontFamily:_NXf.mono}},_NXtr(h.id))),
i("div",{style:{fontSize:"12px",color:col,fontFamily:_NXf.mono}},_NXtr(h.score)),
h.isole?null:i("span",{style:{fontSize:"10px",color:P.warn}},_NXtr("non isole")));})),
i("div",{style:{marginTop:"13px"}},
_NXbtn(_NXtr("Oublier l historique"),function(){L.oublie();dis("Historique efface.");},"danger"))),{mb:0});}

return i(Kr,null,i("div",{style:{maxWidth:"880px",margin:"0 auto"}},
_NXtr(TETE),
avis?_NXcard(i("div",{style:{fontSize:"12.5px",color:P.ok}},_NXtr(avis)),{mb:12}):null,
_NXtr(depot()),
_NXtr(direct()),
_NXtr(resultats()),
(dossier||L.dernier)?i("div",{style:{height:"12px"}}):null,
_NXtr(historique()),
_NXfoot(_NXtr("Nexium Bac a sable \u00b7 rien n est execute : on lit des octets"))));
}

