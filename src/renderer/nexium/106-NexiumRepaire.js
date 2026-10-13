var NexiumRepaireIcon=function(p){p=p||{};var z=p.width||p.height||20;return (window._NXFX&&_NXFX.svg)?_NXFX.svg("couches",z):null;};
function NexiumRepaireComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _t=F.useState("fil");var tab=_t[0];var setTab=_t[1];
var _m=F.useState("");var msg=_m[0];var setMsg=_m[1];
var _dv=F.useState("30j");var duree=_dv[0];var setDuree=_dv[1];
var _cj=F.useState("");var codeJoint=_cj[0];var setCodeJoint=_cj[1];
var _ps=F.useState("");var pseudoSaisi=_ps[0];var setPseudoSaisi=_ps[1];
var _nt=F.useState("");var noteTitre=_nt[0];var setNoteTitre=_nt[1];
var _nc=F.useState("");var noteCorps=_nc[0];var setNoteCorps=_nc[1];
var _lu=F.useState("");var lienUrl=_lu[0];var setLienUrl=_lu[1];
var _lt=F.useState("");var lienTitre=_lt[0];var setLienTitre=_lt[1];
var _sq=F.useState("");var sondQ=_sq[0];var setSondQ=_sq[1];
var _so=F.useState("");var sondO=_so[0];var setSondO=_so[1];
var _et=F.useState("");var evTitre=_et[0];var setEvTitre=_et[1];
var _eq=F.useState("");var evQuand=_eq[0];var setEvQuand=_eq[1];
var _av=F.useState("");var avis=_av[0];var setAvis=_av[1];
var _vu=F.useState(false);var codeVu=_vu[0];var setCodeVu=_vu[1];

F.useEffect(function(){
if(!window._NXCANAL)return;
var maj=function(){force();};
_NXCANAL._ecoute.push(maj);
if(window._NXSOS)_NXSOS._ecoute.push(maj);
// Tant que la page est ouverte, pas de notification : on voit deja arriver.
_NXCANAL._page=true;
try{_NXCANAL.synchro();_NXCANAL.marqueLu();}catch(_){}
var iv=setInterval(function(){try{_NXCANAL.veille();_NXCANAL.marqueLu();}catch(_){}},6000);
return function(){try{
clearInterval(iv);
_NXCANAL._page=false;
_NXCANAL._ecoute=_NXCANAL._ecoute.filter(function(f){return f!==maj;});
if(window._NXSOS)_NXSOS._ecoute=_NXSOS._ecoute.filter(function(f){return f!==maj;});}catch(_){}};},[]);

var P=_NXpal;
var C=window._NXCANAL||null;
var S=window._NXSOS||null;

// Un etat ecrit par une version anterieure n a pas les boites ajoutees
// depuis. On les remet avant de rendre : une page de reglages qui leve
// emporte tout le panneau, pas seulement elle.
try{if(C&&C.vide&&C.etat){var _nv=C.vide(),_nk;
for(_nk in _nv)if(!C.etat[_nk])C.etat[_nk]=_nv[_nk];}}catch(_){}

function dis(t){try{setAvis(String(t||""));setTimeout(function(){try{setAvis("");}catch(_){}},4500);}catch(_){}}
// La copie passe par le pont de Discord : l API web est refusee dans ce
// client. Et on n annonce la copie que si elle a vraiment eu lieu.
function copie(t,quoi){try{
_NXpresse(t).then(function(ok){
dis(ok?(quoi+" copie."):"La copie a echoue sur ce client.");});}catch(_){
dis("La copie a echoue sur ce client.");}}

function heure(t){try{
var d=new Date(t||0),h=d.getHours(),m=d.getMinutes();
return (h<10?"0":"")+h+":"+(m<10?"0":"")+m;}catch(_){return "";}}
function jourDe(t){try{
var d=new Date(t||0),n=new Date();
var mm=function(x){return new Date(x.getFullYear(),x.getMonth(),x.getDate()).getTime();};
var e=Math.round((mm(n)-mm(d))/86400000);
if(e<=0)return "aujourd hui";
if(e===1)return "hier";
if(e<7)return "il y a "+e+" jours";
return d.getDate()+"/"+(d.getMonth()+1);}catch(_){return "";}}
function depuis(t){try{
var e=Math.round((Date.now()-(t||0))/60000);
if(e<1)return "a l instant";
if(e<60)return "il y a "+e+" min";
if(e<1440)return "il y a "+Math.round(e/60)+" h";
return jourDe(t);}catch(_){return "";}}
// Combien de temps il reste : un message ephemere doit le dire, sinon
// "ephemere" n est qu une promesse.
function reste(t,vie){try{
if(!vie||vie>=2592000)return "";
var s2=Math.round((t+vie*1000-Date.now())/1000);
if(s2<=0)return "expire";
if(s2<3600)return "reste "+Math.max(1,Math.round(s2/60))+" min";
if(s2<86400)return "reste "+Math.round(s2/3600)+" h";
return "reste "+Math.round(s2/86400)+" j";}catch(_){return "";}}
function versDate(txt){try{
var x=String(txt||"").trim();
if(!x)return 0;
var m=x.match(/^(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?\s+(\d{1,2})[h:](\d{2})$/);
if(m){
var n=new Date();
var an=m[3]?parseInt(m[3],10):n.getFullYear();
if(an<100)an+=2000;
var d=new Date(an,parseInt(m[2],10)-1,parseInt(m[1],10),
parseInt(m[4],10),parseInt(m[5],10),0,0);
return isFinite(d.getTime())?d.getTime():0;}
var h=x.match(/^(\d{1,2})[h:](\d{2})$/);
if(h){
var j=new Date();
j.setHours(parseInt(h[1],10),parseInt(h[2],10),0,0);
if(j.getTime()<Date.now())j.setDate(j.getDate()+1);
return j.getTime();}
return 0;}catch(_){return 0;}}
function comptePour(t){try{
var s2=Math.round(((t||0)-Date.now())/1000);
if(s2<=0)return "c est maintenant";
var j=Math.floor(s2/86400),h=Math.floor((s2%86400)/3600),m=Math.floor((s2%3600)/60);
if(j)return "dans "+j+" j "+h+" h";
if(h)return "dans "+h+" h "+(m<10?"0":"")+m;
return "dans "+m+" min";}catch(_){return "";}}

var TEINTES=[P.mauve,P.ok,P.info,P.warn,P.rose,P.cyan,P.lime];
function teinteDe(nom){try{
var x=String(nom||"?"),h=0,a2;
for(a2=0;a2<x.length;a2++)h=(h*31+x.charCodeAt(a2))>>>0;
return TEINTES[h%TEINTES.length]||P.mauve;}catch(_){return P.mauve;}}
function initiales(nom){try{
var x=String(nom||"?").replace(/[^A-Za-z0-9 ]/g,"").trim();
if(!x)return "?";
var p2=x.split(/\s+/);
if(p2.length>1)return (p2[0].charAt(0)+p2[1].charAt(0)).toUpperCase();
return x.substring(0,2).toUpperCase();}catch(_){return "?";}}
function pastille(nom,taille,anneau){
var z=taille||30;
var col=teinteDe(nom);
return i("div",{style:{width:z+"px",height:z+"px",borderRadius:"50%",flex:"0 0 auto",
display:"flex",alignItems:"center",justifyContent:"center",
fontSize:Math.round(z*0.36)+"px",fontWeight:"800",letterSpacing:".02em",
color:col,background:_NXteinte(col,14),
border:"1px solid "+_NXteinte(col,anneau?46:26),
boxShadow:anneau?("0 0 0 2px "+_NXteinte(col,12)):"none"}},_NXtr(initiales(nom)));}

function vide(icone,titre,sous){
return i("div",{style:{textAlign:"center",padding:"30px 18px"}},
i("div",{style:{display:"flex",justifyContent:"center",marginBottom:"14px",opacity:.85}},
_NXFX.blason(icone,P.dim,60)),
i("div",{style:{fontSize:"13.5px",fontWeight:"700",color:P.pale}},_NXtr(titre)),
i("div",{style:{fontSize:"12.5px",color:P.dim,marginTop:"5px",lineHeight:1.6,
maxWidth:"330px",margin:"5px auto 0"}},_NXtr(sous)));}

var TETE=_NXhead(_NXtr("Repaire"),_NXtr("Nexium Repaire"),
_NXtr("Un espace a toi et tes amis, pose par-dessus Discord. Le relais ne peut rien y lire, et personne ne peut le fermer."));

if(!C)return i(Kr,null,i("div",{style:{maxWidth:"820px",margin:"0 auto"}},_NXtr(TETE),
_NXcard(i("div",{style:{fontSize:"12.5px",color:P.warn,lineHeight:1.6}},
_NXtr("Le repaire n a pas demarre sur ce client.")),{mb:0})));

// ------------------------------------------------------------- l entree
function entree(){
return i(Kr,null,i("div",{style:{maxWidth:"820px",margin:"0 auto"}},_NXtr(TETE),
i("div",{"data-nx-lift":"1",style:{position:"relative",overflow:"hidden",
border:"1px solid "+_NXteinte(P.mauve,20),borderRadius:"24px",
background:"radial-gradient(120% 140% at 50% -20%,"+_NXteinte(P.mauve,9)+" 0%,"+P.panel+" 46%,"+P.bg+" 100%)",
padding:"34px 26px 28px",marginBottom:"14px"}},
i("div",{style:{maxWidth:"440px",margin:"0 auto"}},
i("div",{style:{display:"flex",justifyContent:"center",marginBottom:"18px"}},
_NXFX.blason("couches",P.mauve,80)),
i("div",{style:{textAlign:"center",fontSize:"19px",fontWeight:"800",color:P.txt,
letterSpacing:"-.01em"}},_NXtr("Cree ton repaire")),
i("div",{style:{textAlign:"center",fontSize:"13px",color:P.sub,lineHeight:1.72,
margin:"9px 0 24px"}},
_NXtr("Un fil, des notes, des liens, des sondages et vos rendez-vous \u2014 dans n importe quel serveur, et meme quand Discord tombe. Donne le code a tes amis, c est tout.")),
_NXFX.champ({k:_NXtr("Ton nom dans le repaire"),icone:"comptes",v:pseudoSaisi,ph:_NXtr("comment les autres te verront"),
onChange:function(e){setPseudoSaisi(e.target.value);}}),
i("div",{style:{marginTop:"14px"}},
_NXbtn(C.occupe?_NXtr("Creation..."):_NXtr("Creer un repaire"),function(){
var c=C.nouveauCode();
if(!c){dis("Impossible de tirer un code sur ce client.");return;}
C.rejoint(c,true,pseudoSaisi).then(function(v){
if(v){setCodeVu(true);setTab("reglages");dis("Repaire cree. Le code t attend dans Reglages.");}});},"acc")))),
_NXcard(i("div",null,
_NXch(_NXtr("Rejoindre un repaire"),_NXtr("Colle le code que quelqu un t a donne.")),
_NXFX.champ({k:_NXtr("Code du repaire"),icone:"cle",v:codeJoint,ph:_NXtr("nx-0000-0000-0000-0000-0000"),
onChange:function(e){setCodeJoint(e.target.value);},
onKeyDown:function(e){if(e.key==="Enter")C.rejoint(codeJoint,false,pseudoSaisi);}}),
i("div",{style:{marginTop:"12px"}},
_NXbtn(C.occupe?_NXtr("Connexion..."):_NXtr("Rejoindre"),function(){
C.rejoint(codeJoint,false,pseudoSaisi);},"ghost")),
C.erreur?i("div",{style:{marginTop:"14px",padding:"11px 13px",borderRadius:"11px",
border:"1px solid "+_NXteinte(P.danger,28),background:_NXteinte(P.danger,8),
fontSize:"12.5px",color:P.danger,lineHeight:1.6}},_NXtr(C.erreur)):null,
avis?i("div",{style:{marginTop:"12px",fontSize:"12.5px",color:P.ok}},_NXtr(avis)):null),{mb:0}),
_NXfoot(_NXtr("Nexium Repaire \u00b7 le relais ne stocke que du chiffre"))));}

if(!C.actif())return entree();

// ------------------------------------------------------------- le heros
var presents=C.presents();
var moiNom=C.cfg.pseudo||"toi";
var rdv=C.prochain();
function hero(){
var frais=C.dernierEchange&&(Date.now()-C.dernierEchange)<45000;
return i("div",{style:{position:"relative",marginBottom:"14px"}},
i("div",{style:{position:"absolute",left:"16px",right:"16px",top:"-9px",height:"26px",
borderRadius:"20px",border:"1px solid "+P.hair,background:P.inset,opacity:.5}}),
i("div",{style:{position:"absolute",left:"8px",right:"8px",top:"-4px",height:"26px",
borderRadius:"21px",border:"1px solid "+P.line,background:P.panel,opacity:.75}}),
i("div",{"data-nx-lift":"1",style:{position:"relative",overflow:"hidden",
border:"1px solid "+_NXteinte(P.mauve,24),borderRadius:"22px",
background:"radial-gradient(120% 160% at 12% -30%,"+_NXteinte(P.mauve,11)+" 0%,"+P.panel+" 52%,"+P.bg+" 100%)",
padding:"22px 24px"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"17px",flexWrap:"wrap"}},
_NXFX.blason("couches",P.mauve,52),
i("div",{style:{flex:1,minWidth:"190px"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"9px",flexWrap:"wrap"}},
i("div",{style:{fontSize:"17px",fontWeight:"800",color:P.txt,letterSpacing:"-.01em"}},
_NXtr("Ton repaire")),
i("span",{style:{display:"inline-flex",alignItems:"center",gap:"5px",
padding:"3px 9px",borderRadius:"999px",fontSize:"10.5px",
border:"1px solid "+_NXteinte(frais?P.ok:P.dim,30),
background:_NXteinte(frais?P.ok:P.dim,9),color:frais?P.ok:P.dim}},
i("span",{style:{width:"5px",height:"5px",borderRadius:"50%",
background:frais?P.ok:P.dim}}),frais?_NXtr("a jour"):_NXtr("hors ligne"))),
i("div",{style:{fontSize:"12.5px",color:P.sub,marginTop:"4px"}},
presents.length===0?_NXtr("toi seul pour l instant")
:(presents.length===1?_NXtr("1 personne presente"):_NXtr(presents.length)+_NXtr(" personnes presentes")))),
i("div",{style:{display:"flex",alignItems:"center"}},
presents.slice(0,5).map(function(m,k){
return i("div",{key:k,style:{marginLeft:k?"-8px":"0",position:"relative",zIndex:9-k}},
_NXtr(pastille(m.qui,34,true)));}),
presents.length>5?i("div",{style:{marginLeft:"-8px",width:"34px",height:"34px",
borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
fontSize:"11px",color:P.sub,background:P.inset,border:"1px solid "+P.hair}},
"+"+(presents.length-5)):null)),
rdv?i("div",{style:{marginTop:"16px",display:"flex",alignItems:"center",gap:"11px",
padding:"11px 13px",borderRadius:"12px",
border:"1px solid "+_NXteinte(P.warn,26),background:_NXteinte(P.warn,8)}},
_NXFX.svg("calendrier",15),
i("div",{style:{flex:1,fontSize:"12.5px",color:P.pale}},_NXtr(String(rdv.titre||""))),
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.warn}},_NXtr(comptePour(rdv.date)))):null,
i("div",{style:{display:"flex",gap:"20px",marginTop:"18px",paddingTop:"15px",
borderTop:"1px solid "+P.hair,flexWrap:"wrap"}},
[["messages",C.etat.fil.length],["notes",C.etat.notes.length],
["liens",C.etat.marques.length],["sondages",C.etat.sondages.length]]
.map(function(p2,k){
return i("div",{key:k},
i("div",{style:{fontSize:"17px",fontWeight:"800",color:P.txt,fontFamily:_NXf.mono}},
_NXtr(String(p2[1]))),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"1px"}},_NXtr(p2[0])));}))));}

// ------------------------------------------------------------- le fil
function bulle(m,k,dernierJour){
var moi=m.moi&&C.cfg.moi&&m.moi===C.cfg.moi;
var nom=moi?moiNom:String(m.qui||"quelqu un");
var col=teinteDe(nom);
var r=reste(m.quand,m.vie);
return i("div",{style:{display:"flex",gap:"10px",alignItems:"flex-start",
flexDirection:moi?"row-reverse":"row",marginBottom:"7px"}},
_NXtr(pastille(nom,28,false)),
i("div",{style:{maxWidth:"76%",display:"flex",flexDirection:"column",
alignItems:moi?"flex-end":"flex-start"}},
i("div",{style:{fontSize:"10.5px",color:P.dim,marginBottom:"3px",
display:"flex",gap:"7px",alignItems:"center",flexDirection:moi?"row-reverse":"row"}},
i("span",{style:{color:_NXteinte(col,80)}},moi?_NXtr("toi"):_NXtr(nom)),
i("span",null,_NXtr(heure(m.quand))),
r?i("span",{style:{color:P.warn}},_NXtr(r)):null,
m.pin?i("span",{style:{color:P.mauve}},_NXtr("epingle")):null),
i("div",{style:{display:"flex",gap:"7px",alignItems:"center",
flexDirection:moi?"row-reverse":"row"}},
i("div",{style:{padding:"9px 13px",
borderRadius:moi?"14px 14px 4px 14px":"14px 14px 14px 4px",
fontSize:"12.5px",lineHeight:1.58,whiteSpace:"pre-wrap",wordBreak:"break-word",
background:moi?_NXteinte(P.mauve,15):P.inset,
border:"1px solid "+(m.pin?_NXteinte(P.mauve,40):(moi?_NXteinte(P.mauve,26):P.hair)),
color:P.pale}},_NXtr(String(m.texte||""))),
i("div",{role:"button",tabIndex:0,"aria-label":m.pin?_NXtr("Retirer l epingle"):_NXtr("Epingler ce message"),
onKeyDown:_NXkey,
onClick:function(){C.epingle(m,!m.pin);dis(m.pin?"Epingle retiree.":"Message epingle.");},
style:{cursor:"pointer",opacity:m.pin?1:.4,flex:"0 0 auto",
color:m.pin?P.mauve:P.dim,display:"flex",alignItems:"center"}},
_NXFX.svg("etoile",13)))));}

function vueFil(){
var L=C.etat.fil;
var pins=C.epingles();
var dernierJour="";
return i("div",null,
pins.length?_NXcard(i("div",null,
_NXch(_NXtr("Epingle"),_NXtr("Ce que le groupe ne doit pas perdre de vue.")),
i("div",{style:{display:"flex",flexDirection:"column",gap:"4px"}},
pins.slice(-3).map(function(m,k){return i("div",{key:k},_NXtr(bulle(m,k,"")));}))),{mb:12}):null,
_NXcard(i("div",null,
_NXch(_NXtr("Le fil"),_NXtr("Il vit hors de Discord : ni serveur, ni salon, rien a fermer.")),
L.length===0?_NXtr(vide("courrier","Rien encore",
"Ecris le premier message. Tes amis le verront des qu ils ouvriront leur client."))
:i("div",{style:{maxHeight:"350px",overflowY:"auto",display:"flex",
flexDirection:"column",gap:"3px",padding:"4px 2px"}},
L.map(function(m,k){
var j=jourDe(m.quand);
var neuf=j!==dernierJour;
if(neuf)dernierJour=j;
return i("div",{key:k},
neuf?i("div",{style:{display:"flex",alignItems:"center",gap:"10px",
margin:"14px 0 10px"}},
i("div",{style:{flex:1,height:"1px",background:P.hair}}),
i("div",{style:{fontSize:"10.5px",color:P.dim,letterSpacing:".05em"}},_NXtr(j)),
i("div",{style:{flex:1,height:"1px",background:P.hair}})):null,
_NXtr(bulle(m,k,j)));}))),{mb:12}),
_NXcard(i("div",null,
_NXFX.champ({k:_NXtr("Ecrire"),icone:"envoi",v:msg,ph:_NXtr("ton message"),
onChange:function(e){setMsg(e.target.value);},
onKeyDown:function(e){if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();envoie();}}}),
i("div",{style:{marginTop:"12px",display:"flex",gap:"9px",alignItems:"center",flexWrap:"wrap"}},
_NXbtn(_NXtr("Envoyer"),function(){envoie();},"acc"),
i("div",{style:{display:"flex",gap:"5px",alignItems:"center"}},
i("span",{style:{fontSize:"11.5px",color:P.dim,marginRight:"3px"}},_NXtr("s efface apres")),
C.DUREES.map(function(d,k){
var on=duree===d.k;
return i("div",{key:k,role:"button",tabIndex:0,"aria-label":_NXtr("Duree : ")+_NXtr(d.n),
onKeyDown:_NXkey,onClick:function(){setDuree(d.k);},
style:{cursor:"pointer",padding:"4px 9px",borderRadius:"8px",fontSize:"11px",
fontWeight:on?"700":"400",
color:on?P.ink:P.sub,background:on?P.acc:"transparent",
border:"1px solid "+(on?P.acc:P.hair)}},_NXtr(d.k));}))),
i("div",{style:{marginTop:"10px",fontSize:"11.5px",color:P.dim,display:"flex",
alignItems:"center",gap:"6px"}},
_NXFX.svg("cadenas",12),
_NXtr("chiffre sur cette machine avant de partir \u00b7 le relais efface a l echeance"))),{mb:0}));

function envoie(){
if(!msg)return;
var d=null,k;
for(k=0;k<C.DUREES.length;k++)if(C.DUREES[k].k===duree)d=C.DUREES[k];
C.dis(msg,d?d.v:undefined);
setMsg("");}}

// ------------------------------------------------------------- les sondages
function vueSondages(){
var L=C.etat.sondages;
return i("div",null,
_NXcard(i("div",null,
_NXch(_NXtr("Les sondages"),_NXtr("Decider a plusieurs sans y passer la soiree.")),
L.length===0?_NXtr(vide("graphe","Aucun sondage",
"Ou on joue ce soir ? A quelle heure ? Deux clics et tout le monde repond."))
:i("div",{style:{display:"flex",flexDirection:"column",gap:"12px"}},
L.slice().reverse().map(function(sd,k){
var r=C.resultats(sd.cle);
if(!r)return null;
return i("div",{key:k,style:{border:"1px solid "+P.hair,borderRadius:"14px",
background:P.inset,padding:"14px 15px"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"11px"}},
i("div",{style:{flex:1,fontSize:"13.5px",fontWeight:"700",color:P.txt}},
_NXtr(String(r.question||""))),
i("div",{style:{fontSize:"10.5px",color:P.dim}},
_NXtr(String(sd.qui||""))+" \u00b7 "+_NXtr(depuis(sd.quand))),
_NXbtn(_NXtr("Effacer"),function(){C.efface([sd.cle]);},"ghost")),
i("div",{style:{display:"flex",flexDirection:"column",gap:"7px"}},
r.options.map(function(o,j){
var n=r.compte[j]||0;
var pc=r.total?Math.round(n*100/r.total):0;
var mien=r.mien===j;
return i("div",{key:j,role:"button",tabIndex:0,
"aria-label":_NXtr("Voter pour ")+_NXtr(o),onKeyDown:_NXkey,
onClick:function(){C.vote(sd.cle,j);dis("Vote enregistre.");},
style:{position:"relative",overflow:"hidden",cursor:"pointer",
border:"1px solid "+(mien?_NXteinte(P.mauve,42):P.hair),
borderRadius:"10px",padding:"9px 12px"}},
i("div",{style:{position:"absolute",left:0,top:0,bottom:0,
width:pc+"%",background:_NXteinte(mien?P.mauve:P.sub,mien?14:8)}}),
i("div",{style:{position:"relative",display:"flex",alignItems:"center",gap:"9px"}},
i("span",{style:{width:"6px",height:"6px",borderRadius:"50%",flex:"0 0 auto",
background:mien?P.mauve:P.faint}}),
i("span",{style:{flex:1,fontSize:"12.5px",color:mien?P.txt:P.pale}},_NXtr(String(o))),
i("span",{style:{fontSize:"11.5px",color:P.dim,fontFamily:_NXf.mono}},
_NXtr(n)+" \u00b7 "+_NXtr(pc)+" %")));})),
i("div",{style:{marginTop:"9px",fontSize:"11px",color:P.dim}},
r.total===0?_NXtr("personne n a encore vote")
:(r.total===1?_NXtr("1 vote"):_NXtr(r.total)+_NXtr(" votes"))));}))),{mb:12}),
_NXcard(i("div",null,
_NXch(_NXtr("Poser une question"),_NXtr("Une option par ligne, deux au minimum.")),
_NXFX.champ({k:_NXtr("Question"),icone:"question",v:sondQ,ph:_NXtr("on joue a quoi ce soir ?"),
onChange:function(e){setSondQ(e.target.value);}}),
_NXFX.champ({k:_NXtr("Options"),icone:"liste",v:sondO,ph:_NXtr("separe par des virgules"),
onChange:function(e){setSondO(e.target.value);}}),
i("div",{style:{marginTop:"11px"}},
_NXbtn(_NXtr("Lancer le sondage"),function(){
var O=String(sondO||"").split(",");
C.creeSondage(sondQ,O).then(function(v){
if(v){setSondQ("");setSondO("");dis("Sondage lance.");}
else dis("Il faut une question et au moins deux options.");});},"acc"))),{mb:12}),
_NXcard(i("div",null,
_NXch(_NXtr("Les rendez-vous"),_NXtr("Le compte a rebours s affiche en haut de la page.")),
C.etat.events.length===0?i("div",{style:{fontSize:"12.5px",color:P.dim,padding:"12px 0"}},
_NXtr("Aucun rendez-vous."))
:i("div",{style:{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"14px"}},
C.etat.events.slice().sort(function(x,y){return x.date-y.date;}).map(function(ev,k){
var passe=ev.date<Date.now();
return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"11px",
border:"1px solid "+P.hair,borderRadius:"12px",padding:"10px 13px",
opacity:passe?.5:1}},
_NXFX.svg("calendrier",14),
i("div",{style:{flex:1}},
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.txt}},_NXtr(String(ev.titre||""))),
i("div",{style:{fontSize:"11px",color:P.dim}},
_NXtr(new Date(ev.date).toLocaleString("fr-FR")))),
i("div",{style:{fontSize:"12px",color:passe?P.dim:P.warn,fontWeight:"700"}},
passe?_NXtr("passe"):_NXtr(comptePour(ev.date))),
_NXbtn(_NXtr("Effacer"),function(){C.efface([ev.cle]);},"ghost"));})),
_NXFX.champ({k:_NXtr("Quoi"),icone:"calendrier",v:evTitre,ph:_NXtr("soiree jeux"),
onChange:function(e){setEvTitre(e.target.value);}}),
_NXFX.champ({k:_NXtr("Quand"),icone:"horloge",v:evQuand,ph:_NXtr("21h00  ou  24/12 20h30"),
onChange:function(e){setEvQuand(e.target.value);}}),
i("div",{style:{marginTop:"11px"}},
_NXbtn(_NXtr("Poser le rendez-vous"),function(){
var t=versDate(evQuand);
if(!t){dis("Je ne comprends pas cette heure. Essaie 21h00, ou 24/12 20h30.");return;}
C.creeEvent(evTitre,t).then(function(v){
if(v){setEvTitre("");setEvQuand("");dis("Rendez-vous pose.");}
else dis("Il faut un intitule et une heure.");});},"acc"))),{mb:0}));}

// ------------------------------------------------------------- les notes
function vueNotes(){
var L=C.etat.notes;
return i("div",null,
_NXcard(i("div",null,
_NXch(_NXtr("Les notes"),_NXtr("Ce que le groupe doit retrouver : un code, une adresse, une date.")),
L.length===0?_NXtr(vide("note","Aucune note",
"Le wifi, l heure du rendez-vous, l adresse : ce qu on redemande toujours."))
:i("div",{style:{display:"flex",flexDirection:"column",gap:"9px"}},
L.map(function(n,k){
var col=teinteDe(n.titre||"note");
return i("div",{key:k,style:{position:"relative",borderRadius:"13px",
border:"1px solid "+P.hair,background:P.inset,padding:"12px 14px 12px 17px",
overflow:"hidden"}},
i("div",{style:{position:"absolute",left:0,top:0,bottom:0,width:"3px",
background:_NXteinte(col,70)}}),
i("div",{style:{display:"flex",alignItems:"center",gap:"10px"}},
i("div",{style:{flex:1,fontSize:"13px",fontWeight:"700",color:P.txt}},
_NXtr(String(n.titre||"sans titre"))),
i("div",{style:{fontSize:"10.5px",color:P.dim}},
_NXtr(String(n.qui||""))+" \u00b7 "+_NXtr(depuis(n.quand))),
n.corps?_NXbtn(_NXtr("Copier"),function(){copie(n.corps,"La note");},"ghost"):null,
_NXbtn(_NXtr("Effacer"),function(){C.efface([n.cle]);},"ghost")),
n.corps?i("div",{style:{marginTop:"7px",fontSize:"12.5px",color:P.sub,
lineHeight:1.65,whiteSpace:"pre-wrap",wordBreak:"break-word"}},
_NXtr(String(n.corps))):null);}))),{mb:12}),
_NXcard(i("div",null,
_NXch(_NXtr("Ajouter une note"),""),
_NXFX.champ({k:_NXtr("Titre"),icone:"note",v:noteTitre,ph:_NXtr("le wifi"),
onChange:function(e){setNoteTitre(e.target.value);}}),
_NXFX.champ({k:_NXtr("Contenu"),icone:"crayon",v:noteCorps,ph:_NXtr("ce qu il faut retenir"),
onChange:function(e){setNoteCorps(e.target.value);}}),
i("div",{style:{marginTop:"11px"}},
_NXbtn(_NXtr("Ajouter"),function(){
if(!noteTitre&&!noteCorps){dis("Une note vide ne sert a personne.");return;}
C.ecritNote(null,noteTitre,noteCorps);setNoteTitre("");setNoteCorps("");},"acc"))),{mb:0}));}

// ------------------------------------------------------------- les liens
function domaine(u){try{
var m=String(u||"").replace(/^https?:\/\//i,"").split("/")[0];
return m||String(u||"");}catch(_){return String(u||"");}}

function vueLiens(){
var L=C.etat.marques;
return i("div",null,
_NXcard(i("div",null,
_NXch(_NXtr("Les liens"),_NXtr("Ils s ouvrent dans le bac a sable de Nexium, jamais directement.")),
L.length===0?_NXtr(vide("lien","Aucun lien",
"La video, le document, le serveur : ce qu on se renvoie dix fois."))
:i("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}},
L.map(function(m,k){
var d=domaine(m.url);
var col=teinteDe(d);
return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"12px",
border:"1px solid "+P.hair,background:P.inset,borderRadius:"13px",padding:"11px 13px"}},
i("div",{style:{width:"32px",height:"32px",borderRadius:"9px",flex:"0 0 auto",
display:"flex",alignItems:"center",justifyContent:"center",
fontSize:"13px",fontWeight:"800",color:col,
background:_NXteinte(col,13),border:"1px solid "+_NXteinte(col,26)}},
_NXtr(String(d.charAt(0)||"?").toUpperCase())),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.txt,
overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},
_NXtr(String(m.titre||d))),
i("div",{style:{fontSize:"11px",color:P.dim,overflow:"hidden",
textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(d))),
_NXbtn(_NXtr("Voir"),function(){try{
if(window._NXPR&&_NXPR.sandbox)_NXPR.sandbox(String(m.url||""),function(){});
else copie(m.url,"Le lien");}catch(_){}},"ghost"),
_NXbtn(_NXtr("Copier"),function(){copie(m.url,"Le lien");},"ghost"),
_NXbtn(_NXtr("Effacer"),function(){C.efface([m.cle]);},"ghost"));}))),{mb:12}),
_NXcard(i("div",null,
_NXch(_NXtr("Ajouter un lien"),""),
_NXFX.champ({k:_NXtr("Titre"),icone:"lien",v:lienTitre,ph:_NXtr("la video"),
onChange:function(e){setLienTitre(e.target.value);}}),
_NXFX.champ({k:_NXtr("Adresse"),icone:"globe",v:lienUrl,ph:_NXtr("https://"),
onChange:function(e){setLienUrl(e.target.value);}}),
i("div",{style:{marginTop:"11px"}},
_NXbtn(_NXtr("Ajouter"),function(){
if(!lienUrl){dis("Il faut une adresse.");return;}
C.ecritMarque(null,lienUrl,lienTitre);setLienUrl("");setLienTitre("");},"acc"))),{mb:0}));}

// ------------------------------------------------------------- le secours
function vueSecours(){
var e=S?S.etatLisible():{verdict:"inconnu",phrase:"La ligne de secours n a pas demarre."};
var coul=e.verdict==="tout-va-bien"?P.ok:(e.verdict==="discord"?P.warn:(e.verdict==="toi"?P.danger:P.dim));
return i("div",null,
_NXcard(i("div",null,
_NXch(_NXtr("Etat de Discord"),_NXtr("Verifie en interrogeant deux reseaux differents.")),
i("div",{style:{position:"relative",overflow:"hidden",borderRadius:"16px",
border:"1px solid "+_NXteinte(coul,26),padding:"18px 18px",
background:"radial-gradient(120% 180% at 8% -40%,"+_NXteinte(coul,12)+" 0%,"+P.inset+" 60%)"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"13px"}},
i("span",{style:{width:"11px",height:"11px",borderRadius:"50%",flex:"0 0 auto",
background:coul,boxShadow:"0 0 0 4px "+_NXteinte(coul,12)}}),
i("div",{style:{flex:1}},
i("div",{style:{fontSize:"13.5px",color:P.txt,lineHeight:1.55,fontWeight:"600"}},_NXtr(e.phrase)),
e.depuis?i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"4px"}},_NXtr(e.depuis)):null))),
i("div",{style:{marginTop:"14px"}},
_NXbtn(_NXtr("Verifier maintenant"),function(){
if(!S){dis("La ligne de secours n a pas demarre.");return;}
dis("Diagnostic en cours...");
S.verifie(true).then(function(v){
dis(v==="tout-va-bien"?"Discord repond.":"Diagnostic termine.");});},"acc"))),{mb:12}),
_NXcard(i("div",null,
_NXch(_NXtr("Comment on le sait"),_NXtr("Sans ca, on ne ferait que deviner.")),
i("div",{style:{display:"flex",gap:"11px",marginBottom:"14px",flexWrap:"wrap"}},
[["Discord",P.info],["le relais Nexium",P.mauve]].map(function(p2,k){
return i("div",{key:k,style:{flex:1,minWidth:"150px",padding:"12px 13px",
borderRadius:"12px",border:"1px solid "+P.hair,background:P.inset}},
i("div",{style:{fontSize:"11px",color:P.dim,marginBottom:"4px"}},_NXtr("on interroge")),
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:p2[1]}},_NXtr(p2[0])));})),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.75}},
_NXtr("Les deux ne partagent ni serveurs ni reseau. Si le relais repond et que Discord se tait, la panne est chez Discord : ce n est pas toi. Si les deux se taisent, c est ta connexion, et le client te le dit au lieu d accuser Discord."),
i("br"),i("br"),
_NXtr("Quand la panne est confirmee, un bandeau apparait en haut et t amene ici. Ton fil continue : il ne passe pas par Discord."))),{mb:0}));}

// ------------------------------------------------------------- les reglages
function vueReglages(){
return i("div",null,
_NXcard(i("div",null,
_NXch(_NXtr("Le code du repaire"),_NXtr("Qui a ce code lit tout. Ne le donne qu a ceux que tu invites.")),
i("div",{style:{position:"relative",borderRadius:"14px",padding:"18px 18px",
border:"1px dashed "+_NXteinte(P.mauve,34),background:_NXteinte(P.mauve,6),
textAlign:"center"}},
i("div",{style:{fontFamily:_NXf.mono,fontSize:"16px",color:P.txt,
letterSpacing:".08em",wordBreak:"break-all",lineHeight:1.5}},
codeVu?_NXtr(C.cfg.code):_NXtr("nx-\u2022\u2022\u2022\u2022-\u2022\u2022\u2022\u2022-\u2022\u2022\u2022\u2022-\u2022\u2022\u2022\u2022-\u2022\u2022\u2022\u2022")),
i("div",{style:{display:"flex",gap:"9px",justifyContent:"center",marginTop:"14px"}},
_NXbtn(codeVu?_NXtr("Masquer"):_NXtr("Afficher"),function(){setCodeVu(!codeVu);},"ghost"),
_NXbtn(_NXtr("Copier"),function(){copie(C.cfg.code,"Le code");},"acc"))),
i("div",{style:{marginTop:"11px",fontSize:"11.5px",color:P.dim,lineHeight:1.65,
display:"flex",gap:"8px",alignItems:"flex-start"}},
i("span",{style:{flex:"0 0 auto",marginTop:"1px"}},_NXFX.svg("cadenas",12)),
i("span",null,_NXtr("Ce code ne quitte jamais ta machine : c est lui qui fabrique la cle de chiffrement. Le relais n en voit que des empreintes.")))),{mb:12}),
_NXcard(i("div",null,
_NXch(_NXtr("Ton nom dans le repaire"),_NXtr("Les autres ne voient que celui-la.")),
i("div",{style:{display:"flex",alignItems:"center",gap:"13px",marginBottom:"13px"}},
_NXtr(pastille(pseudoSaisi||C.cfg.pseudo||"?",40,true)),
i("div",{style:{flex:1}},
_NXFX.champ({k:_NXtr("Nom"),icone:"comptes",v:pseudoSaisi||C.cfg.pseudo,ph:_NXtr("ton nom"),
onChange:function(e){setPseudoSaisi(e.target.value);}}))),
_NXbtn(_NXtr("Enregistrer"),function(){
C.cfg.pseudo=String(pseudoSaisi||"").substring(0,40);C.save();C.signale();
dis("Nom enregistre.");},"acc")),{mb:12}),
_NXcard(i("div",null,
_NXch(_NXtr("Quitter"),_NXtr("N efface que cette machine.")),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.7,marginBottom:"13px"}},
_NXtr("Le repaire continue sans toi, et tes amis gardent tout. Si tu reviens avec le meme code, tu retrouves le fil.")),
_NXbtn(_NXtr("Quitter ce repaire"),function(){
C.quitte();setCodeVu(false);dis("Tu as quitte le repaire.");},"danger")),{mb:0}));}

var contenu=tab==="fil"?vueFil():(tab==="sondages"?vueSondages():
(tab==="notes"?vueNotes():(tab==="liens"?vueLiens():
(tab==="secours"?vueSecours():vueReglages()))));

var nl=C.nonLus();
return i(Kr,null,i("div",{style:{maxWidth:"820px",margin:"0 auto"}},
_NXtr(TETE),
_NXtr(hero()),
C.erreur?_NXcard(i("div",{style:{fontSize:"12.5px",color:P.warn,lineHeight:1.6}},_NXtr(C.erreur)),{mb:12}):null,
avis?_NXcard(i("div",{style:{fontSize:"12.5px",color:P.ok,lineHeight:1.6}},_NXtr(avis)),{mb:12}):null,
_NXtabs([{id:"fil",label:nl?("Fil ("+nl+")"):"Fil"},{id:"sondages",label:"Sondages"},
{id:"notes",label:"Notes"},{id:"liens",label:"Liens"},
{id:"secours",label:"Secours"},{id:"reglages",label:"Reglages"}],tab,setTab),
_NXtr(contenu),
_NXfoot(_NXtr("Nexium Repaire \u00b7 chiffre de bout en bout, hors de Discord"))));
}
