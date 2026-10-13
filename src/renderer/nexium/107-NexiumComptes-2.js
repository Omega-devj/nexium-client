function NexiumComptesComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _t=F.useState("comptes");var tab=_t[0];var setTab=_t[1];
var phrase=F.useState("");
var mot=F.useState(null);
var _q=F.useState("");var q=_q[0];var setQ=_q[1];
var _np=F.useState("");var nomProfil=_np[0];var setNomProfil=_np[1];
var _im=F.useState("");var texte=_im[0];var setTexte=_im[1];
var _ed=F.useState(null);var edite=_ed[0];var setEdite=_ed[1];
var _no=F.useState("");var brouillon=_no[0];var setBrouillon=_no[1];
var _pa=F.useState("");var pAnc=_pa[0];var setPAnc=_pa[1];
var _pn=F.useState("");var pNouv=_pn[0];var setPNouv=_pn[1];
F.useEffect(function(){
if(!window._NXCPT)return;
var maj=function(){force();};
_NXCPT.listeners.push(maj);
return function(){try{_NXCPT.listeners=_NXCPT.listeners.filter(function(f){return f!==maj;});}catch(_){}};},[]);
var monte=_NXmounted(F);
var P=_NXpal;
var C=window._NXCPT||null;

function dis(t){try{mot[1](String(t||""));setTimeout(function(){try{mot[1](null);}catch(_){}},5000);}catch(_){}}
function geste(){try{if(C&&C.touche)C.touche();}catch(_){}}
function ouvrir(){try{
if(!C)return;
C.ouvre(phrase[0],function(r){
phrase[1]("");
if(r.err)dis(r.err);
else{geste();dis(r.neuf?_T("Coffre cree. Ajoute maintenant le compte sur lequel tu es."):_T("Coffre ouvert."));}
force();});}catch(_){}}

var TETE=_NXhead(_T("Comptes"),_NXtr("Nexium Comptes"),
_T("Plusieurs comptes Discord dans un coffre chiffre, des profils de reglages, et une bascule de l un a l autre sans se reconnecter."));

if(!C)return i(Kr,null,i("div",{style:{maxWidth:"820px",margin:"0 auto"}},_NXtr(TETE),
_NXcard(i("div",{style:{fontSize:"12.5px",color:_NXpal.warn,lineHeight:1.6}},
_T("Le coffre des comptes n a pas demarre sur ce client.")),{mb:0})));

if(!C.dispo())return i(Kr,null,i("div",{style:{maxWidth:"820px",margin:"0 auto"}},_NXtr(TETE),
_NXcard(i("div",null,
_NXch(_T("Indisponible sur ce client"),_T("La fonction est desactivee, faute de quoi la tenir.")),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.65}},
_T("Garder un jeton sans pouvoir le chiffrer reviendrait a le poser en clair a cote de Discord. Le chiffrement du navigateur ou le stockage de Discord n etant pas accessibles ici, la fonction reste fermee."))),{mb:0}),
_NXfoot(_NXtr("Nexium Comptes \u00b7 rien n est garde en clair"))));

var moi=C.moi();
var n=C.comptes.length;
var profils=C.profils();

var COUL={ivoire:P.acc,vert:_NXpal.ok,bleu:"#8ba3e8",ambre:_NXpal.warn,rose:"#d98aa8",gris:P.sub};
function couleurDe(c){return COUL[(c&&c.col)||""]||P.sub;}
function jour(t){try{
if(!t)return _T("jamais");
var d=Math.floor((Date.now()-t)/86400000);
if(d<=0)return _T("aujourd hui");
if(d===1)return _T("hier");
if(d<30)return _T("il y a")+" "+d+" "+_T("jours");
return _T("il y a")+" "+Math.floor(d/30)+" "+_T("mois");}catch(_){return "";}}

// ------------------------------------------------------------------ le heros
function hero(){
var ouvert=C.ouvert;
var col=ouvert?_NXpal.ok:P.dim;
var vieux=0;
if(ouvert)for(var a=0;a<C.comptes.length;a++)if(C.fraicheur(C.comptes[a]).j>45)vieux++;
return i("div",{"data-nx-lift":"1",style:{position:"relative",overflow:"hidden",
border:"1px solid "+(ouvert?_NXteinte(col,24):P.hair),
borderRadius:"22px",background:"linear-gradient(158deg,"+P.panel+","+P.bg+")",
padding:"25px 24px",marginBottom:"14px"}},
i("div",{style:{position:"relative",display:"flex",alignItems:"center",gap:"20px",flexWrap:"wrap"}},
i("div",{style:{width:"58px",height:"58px",borderRadius:"17px",flexShrink:0,
background:_NXteinte(col,12),border:"1px solid "+_NXteinte(col,28),color:col,
display:"flex",alignItems:"center",justifyContent:"center"}},
i("svg",{viewBox:"0 0 24 24",width:26,height:26,fill:"currentColor","aria-hidden":"true"},
i("path",{d:ouvert
?"M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6a5 5 0 0 0-9.9-1h2.1A3 3 0 0 1 15 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2z"
:"M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-9h-1V6A5 5 0 0 0 7 6v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM9 6a3 3 0 0 1 6 0v2H9V6z"}))),
i("div",{style:{flex:1,minWidth:"200px"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".16em",
textTransform:"uppercase",color:P.faint,marginBottom:"9px"}},_T("Coffre")),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"26px",fontWeight:"800",color:P.txt,
letterSpacing:"-.035em",lineHeight:1.15}},
ouvert?(n?(_NXtr(n)+" "+_T(n>1?"comptes gardes":"compte garde")):_T("Coffre vide"))
:(C.existe()?_T("Coffre ferme"):_T("Aucun coffre"))),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.6,marginTop:"9px"}},
ouvert?(C.st.verrou?(_T("Se referme apres")+" "+_NXtr(C.st.verrou)+" "+_T("minutes sans activite."))
:_T("Reste ouvert jusqu au prochain redemarrage de Discord."))
:(C.existe()?_T("Saisis ta phrase pour lire les comptes gardes.")
:_T("Choisis une phrase : elle protege les jetons, et personne ne peut te la redonner."))))),
ouvert?i("div",{style:{position:"relative",display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:"14px",
marginTop:"22px",paddingTop:"19px",borderTop:"1px solid "+P.line}},
[[String(n)+" / "+C.MAXC,_T("Comptes"),n?P.txt:P.faint],
[String(profils.length),_T("Profils de reglages"),profils.length?P.txt:P.faint],
[String(C.st.bascules||0),_T("Bascules effectuees"),P.txt],
[vieux?String(vieux):"0",_T("Jetons a verifier"),vieux?_NXpal.warn:_NXpal.ok]].map(function(x,k){
return i("div",{key:k},
i("div",{key:"v"+x[0],"data-nx-pop":"1",style:{fontFamily:_NXf.disp,fontSize:"22px",
fontWeight:"800",color:x[2],letterSpacing:"-.04em",lineHeight:1}},_NXtr(x[0])),
i("div",{style:{fontSize:"9.5px",fontWeight:"800",letterSpacing:".13em",
textTransform:"uppercase",color:P.faint,marginTop:"6px"}},_NXtr(x[1])));})):null);}

// --------------------------------------------------------------- la serrure
function serrure(){
return _NXcard(i("div",null,
_NXch(C.existe()?_T("Ouvrir le coffre"):_T("Creer le coffre"),
C.existe()?_T("La meme phrase que la derniere fois.")
:_T("Huit caracteres au minimum. Elle n est jamais enregistree nulle part.")),
i("input",{type:"password",value:phrase[0],placeholder:_T("Phrase du coffre"),
"aria-label":_T("Phrase du coffre"),
onChange:function(e){phrase[1](e.target.value);},
onKeyDown:function(e){if(e.key==="Enter")ouvrir();},
style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,
borderRadius:"11px",padding:"12px 14px",color:P.txt,fontSize:"13px",outline:"none",
marginBottom:"11px",fontFamily:"inherit"}}),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},
_NXbtn(C.existe()?_T("Ouvrir"):_T("Creer le coffre"),ouvrir),
C.existe()?_NXbtn(_T("Tout oublier"),function(){
if(!window.confirm(_T("Effacer le coffre et tous les comptes qu il contient ? C est definitif.")))return;
C.oublie();force();},"danger"):null),
C.existe()?i("div",{style:{marginTop:"13px",paddingTop:"12px",borderTop:"1px solid "+P.line,
fontSize:"11px",color:P.faint,lineHeight:1.65}},
_T("Coffre perdu ? Si tu en as exporte une copie, l onglet Securite permet de la remettre en place.")):null),{mb:12});}

// ------------------------------------------------------------ une carte de compte
function carte(c,rang){
var courant=!!(moi&&moi.id===c.id);
var col=courant?_NXpal.ok:couleurDe(c);
var fr=C.fraicheur(c);
var vieux=fr.j>45,tiede=fr.j>14&&fr.j<=45;
var lie=c.profil?C.trouveProfil(c.profil):null;
var enEdition=edite===c.id;
return i("div",_NXMO.merge({key:c.id,style:{position:"relative",overflow:"hidden",
padding:"14px 15px",borderRadius:"16px",marginBottom:"9px",
background:courant?"linear-gradient(158deg,#131316,#0c0c0e)":P.inset,
border:"1px solid "+(courant?_NXteinte(_NXpal.ok,30):P.line)}},_NXMO.rise((rang%6)+1)),
i("div",{"aria-hidden":"true",style:{position:"absolute",left:0,top:0,bottom:0,
width:"3px",background:col,opacity:courant?1:.6}}),
i("div",{style:{display:"flex",alignItems:"flex-start",gap:"13px"}},
i("div",{style:{width:"40px",height:"40px",borderRadius:"50%",flexShrink:0,
background:"linear-gradient(145deg,"+P.raise+","+P.inset+")",
border:"1px solid "+_NXteinte(col,40),color:col,
display:"flex",alignItems:"center",justifyContent:"center",
fontFamily:_NXf.disp,fontWeight:"800",fontSize:"15px"}},
_NXtr(String(c.pseudo||"?").charAt(0).toUpperCase())),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}},
c.pin?i("span",{title:_T("Epingle"),style:{color:P.acc,fontSize:"11px",flexShrink:0}},"\u2605"):null,
i("div",{style:{fontSize:"13.5px",fontWeight:"700",color:P.txt,
overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",minWidth:0}},
_NXtr(c.pseudo)+(_NXtr(c.tag)||"")),
courant?i("span",{style:{fontSize:"9px",fontWeight:"800",letterSpacing:".1em",
textTransform:"uppercase",color:_NXpal.ok,flexShrink:0}},_T("en cours")):null),
i("div",{style:{display:"flex",alignItems:"center",gap:"9px",flexWrap:"wrap",marginTop:"5px"}},
i("span",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
title:_T("Copier l identifiant"),
onClick:function(){geste();_NXIA&&_NXIA.copie?_NXIA.copie(c.id):null;dis(_T("Identifiant copie."));},
style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint,cursor:"pointer"}},_NXtr(c.id)),
i("span",{title:_T("Age du jeton enregistre"),
style:{fontFamily:_NXf.mono,fontSize:"10px",padding:"1px 7px",borderRadius:"999px",
color:vieux?_NXpal.warn:(tiede?P.sub:_NXpal.ok),
border:"1px solid "+(vieux?_NXteinte(_NXpal.warn,34):P.line)}},
fr.j===0?_T("jeton du jour"):(_T("jeton de")+" "+_NXtr(fr.j)+" "+_T("jours"))),
c.vu?i("span",{style:{fontSize:"10px",color:P.faint}},_T("utilise")+" "+_NXtr(jour(c.vu))):null,
lie?i("span",{title:_T("Profil applique a la bascule"),
style:{fontSize:"10px",color:P.dim,padding:"1px 7px",borderRadius:"999px",
border:"1px solid "+P.line}},"\u2699 "+_NXtr(lie.nom)):null),
(c.note&&!enEdition)?i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"7px",
lineHeight:1.55,overflowWrap:"anywhere"}},_NXtr(c.note)):null,
enEdition?i("div",{style:{marginTop:"10px",paddingTop:"10px",borderTop:"1px solid "+P.line}},
i("input",{value:brouillon,placeholder:_T("Une note pour reconnaitre ce compte"),
"aria-label":_T("Note"),maxLength:120,
onChange:function(e){setBrouillon(e.target.value);},
onKeyDown:function(e){if(e.key==="Enter"){C.note(c.id,brouillon);setEdite(null);force();}},
style:{width:"100%",boxSizing:"border-box",background:P.raise,border:"1px solid "+P.line,
borderRadius:"9px",padding:"9px 11px",color:P.txt,fontSize:"12px",outline:"none",
fontFamily:"inherit",marginBottom:"9px"}}),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"9px"}},
C.COULEURS.map(function(cc){
var on=(c.col||"")===cc;
return i("div",{key:cc,className:"nx-fx",role:"button","aria-label":_NXtr(cc),
"aria-pressed":on?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){geste();C.couleur(c.id,on?"":cc);force();},
style:{width:"20px",height:"20px",borderRadius:"50%",cursor:"pointer",
background:COUL[cc],opacity:on?1:.45,
border:"2px solid "+(on?P.txt:"transparent")}});})),
profils.length?i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"9px"}},
i("span",{style:{fontSize:"10px",color:P.faint,alignSelf:"center",marginRight:"3px"}},
_T("Profil a la bascule")),
[{id:"",nom:_T("aucun")}].concat(profils).map(function(p){
var on=(c.profil||"")===p.id;
return i("div",{key:p.id||"_",className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
"aria-pressed":on?"true":"false",
onClick:function(){geste();C.lieProfil(c.id,p.id);force();},
style:{padding:"5px 11px",borderRadius:"999px",cursor:"pointer",fontSize:"10.5px",
fontWeight:"700",background:on?P.raise:"transparent",
border:"1px solid "+(on?P.edge:P.line),color:on?P.txt:P.dim}},_NXtr(p.nom));})):null,
i("div",{style:{display:"flex",gap:"7px",flexWrap:"wrap"}},
_NXbtn(_T("Enregistrer"),function(){geste();C.note(c.id,brouillon);setEdite(null);force();}),
_NXbtn(_T("Annuler"),function(){setEdite(null);}))):null),
i("div",{style:{display:"flex",flexDirection:"column",gap:"6px",flexShrink:0,alignItems:"flex-end"}},
courant?null:i("div",{className:"nx-fx",role:"button",
"aria-label":_T("Basculer vers")+" "+_NXtr(c.pseudo),tabIndex:0,onKeyDown:_NXkey,
onClick:function(){
geste();
if(!window.confirm(_T("Basculer vers")+" "+_NXtr(c.pseudo)+" ?\n"+_T("Discord va se recharger.")))return;
C.bascule(c.id,function(r){if(r.err)dis(r.err);});},
style:{padding:"7px 14px",borderRadius:"999px",cursor:"pointer",whiteSpace:"nowrap",
fontSize:"11.5px",fontWeight:"800",background:P.acc,color:P.ink}},_T("Basculer")),
courant?_NXbtn(_T("Relever le jeton"),function(){
geste();C.majJeton(c.id,function(r){
if(r.err)dis(r.err);else{dis(_T("Jeton mis a jour."));force();}});}):null,
i("div",{style:{display:"flex",gap:"5px"}},
[[c.pin?"\u2605":"\u2606",_T("Epingler"),function(){geste();C.epingle(c.id);force();}],
["\u2191",_T("Monter"),function(){geste();C.deplace(c.id,-1);force();}],
["\u2193",_T("Descendre"),function(){geste();C.deplace(c.id,1);force();}],
["\u270e",_T("Note et couleur"),function(){geste();setBrouillon(c.note||"");setEdite(enEdition?null:c.id);}],
["\u00d7",_T("Retirer"),function(){
geste();
if(!window.confirm(_T("Retirer")+" "+_NXtr(c.pseudo)+" "+_T("du coffre ?")))return;
C.retire(c.id,function(r){if(r.err)dis(r.err);else force();});}]].map(function(b,k){
return i("div",{key:k,className:"nx-fx",role:"button","aria-label":_NXtr(b[1]),title:_NXtr(b[1]),
tabIndex:0,onKeyDown:_NXkey,onClick:b[2],
style:{width:"26px",height:"26px",borderRadius:"8px",cursor:"pointer",
display:"flex",alignItems:"center",justifyContent:"center",
fontSize:"12px",color:P.faint,border:"1px solid "+P.line}},_NXtr(b[0]));})))));}

// -------------------------------------------------------------- onglet Comptes
function tComptes(){
var L=C.ordonnes();
var f=(q||"").trim().toLowerCase();
if(f)L=L.filter(function(c){
return (String(c.pseudo||"")+" "+String(c.note||"")+" "+c.id).toLowerCase().indexOf(f)>=0;});
return i("div",null,
_NXcard(i("div",null,
_NXch(_T("Tes comptes"),
n?_T("Basculer recharge Discord. Rien n est envoye : le jeton est simplement repose a la place de l actuel.")
:_T("Ajoute le compte sur lequel tu es, connecte-toi ailleurs, puis reviens ajouter le suivant."),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:P.dim}},_NXtr(n)+"/"+_NXtr(C.MAXC))),
n>4?i("input",{value:q,placeholder:_T("Rechercher un compte…"),"aria-label":_T("Rechercher"),
onChange:function(e){setQ(e.target.value);},
style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,
borderRadius:"11px",padding:"10px 13px",color:P.txt,fontSize:"12.5px",outline:"none",
marginBottom:"12px",fontFamily:"inherit"}}):null,
L.length?i("div",{style:{marginBottom:"13px"}},L.map(carte))
:i("div",{style:{fontSize:"12.5px",color:P.dim,lineHeight:1.6,marginBottom:"13px"}},
f?_T("Aucun compte ne correspond."):_T("Le coffre est vide.")),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},
_NXbtn(_T("Ajouter le compte en cours"),function(){
geste();
C.ajoute(function(r){
if(r.err)dis(r.err);
else{dis(r.neuf?_T("Compte ajoute au coffre."):_T("Compte deja present : jeton mis a jour."));force();}});}),
_NXbtn(_T("Fermer le coffre"),function(){C.ferme();force();}))),{mb:12}));}

// -------------------------------------------------------------- onglet Profils
function ligneProfil(p){
var lies=0;
if(C.ouvert)for(var a=0;a<C.comptes.length;a++)if(C.comptes[a].profil===p.id)lies++;
return i("div",{key:p.id,style:{padding:"14px 15px",borderRadius:"15px",marginBottom:"9px",
background:P.inset,border:"1px solid "+P.line}},
i("div",{style:{display:"flex",alignItems:"flex-start",gap:"12px",flexWrap:"wrap"}},
i("div",{style:{flex:1,minWidth:"160px"}},
i("div",{style:{fontSize:"13px",fontWeight:"700",color:P.txt,marginBottom:"4px",
overflowWrap:"anywhere"}},_NXtr(p.nom)),
i("div",{style:{display:"flex",gap:"9px",flexWrap:"wrap",fontFamily:_NXf.mono,
fontSize:"10px",color:P.faint}},
i("span",null,_NXtr(p.n)+" "+_T("reglages")),
i("span",null,_NXtr(jour(p.quand))),
lies?i("span",{style:{color:P.dim}},_NXtr(lies)+" "+_T(lies>1?"comptes lies":"compte lie")):null)),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"}},
_NXbtn(_T("Appliquer"),function(){
geste();
if(!window.confirm(_T("Remplacer tes reglages actuels par ceux du profil")+" \u00ab "+_NXtr(p.nom)+" \u00bb ?"))return;
var r=C.applique(p.id);
if(r.err)dis(r.err);
else dis(_T("Profil applique")+" \u00b7 "+r.n+" "+_T("reglages")+
(r.reste&&r.reste.length?(" \u00b7 "+_T("redemarre Discord pour")+" "+r.reste.join(", ")):""));
force();}),
_NXbtn(_T("Mettre a jour"),function(){
geste();
if(!window.confirm(_T("Ecraser")+" \u00ab "+_NXtr(p.nom)+" \u00bb "+_T("avec tes reglages actuels ?")))return;
var r=C.majProfil(p.id);
dis(r.err||(_T("Profil mis a jour")+" \u00b7 "+r.n+" "+_T("reglages")));force();}),
_NXbtn(_T("Exporter"),function(){
geste();
var t=C.exporteProfil(p.id);
if(!t){dis(_T("Export impossible."));return;}
setTexte(t);setTab("profils");
try{if(window._NXIA&&_NXIA.copie)_NXIA.copie(t);}catch(_){}
dis(_T("Profil copie dans le presse-papier, et affiche ci-dessous."));}),
_NXbtn(_T("Renommer"),function(){
geste();
var t=window.prompt(_T("Nouveau nom du profil"),p.nom);
if(t===null)return;
var r=C.renommeProfil(p.id,t);
if(r.err)dis(r.err);
force();}),
_NXbtn(_T("Supprimer"),function(){
geste();
if(!window.confirm(_T("Supprimer le profil")+" \u00ab "+_NXtr(p.nom)+" \u00bb ?"))return;
C.supprimeProfil(p.id);force();},"danger"))));}

function tProfils(){
return i("div",null,
_NXcard(i("div",null,
_NXch(_T("Profils de reglages"),
_T("Une photographie complete de ton client : protections, apparence, automatisations. Aucun secret n y entre : ni jeton, ni coffre, ni phrase."),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:P.dim}},
_NXtr(profils.length)+"/"+_NXtr(C.PMAX))),
profils.length?i("div",{style:{marginBottom:"14px"}},profils.map(ligneProfil))
:i("div",{style:{fontSize:"12.5px",color:P.dim,lineHeight:1.6,marginBottom:"14px"}},
_T("Aucun profil. Capture ta configuration actuelle pour pouvoir y revenir, ou la retrouver sur une autre machine.")),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},
i("input",{value:nomProfil,placeholder:_T("Nom du nouveau profil"),
"aria-label":_T("Nom du profil"),maxLength:40,
onChange:function(e){setNomProfil(e.target.value);},
onKeyDown:function(e){if(e.key==="Enter"){
var r=C.capture(nomProfil);
if(r.err)dis(r.err);else{dis(_T("Profil capture")+" \u00b7 "+r.n+" "+_T("reglages"));setNomProfil("");}
force();}},
style:{flex:1,minWidth:"180px",background:P.inset,border:"1px solid "+P.line,
borderRadius:"11px",padding:"11px 13px",color:P.txt,fontSize:"12.5px",outline:"none",
fontFamily:"inherit"}}),
_NXbtn(_T("Capturer maintenant"),function(){
geste();
var r=C.capture(nomProfil);
if(r.err)dis(r.err);else{dis(_T("Profil capture")+" \u00b7 "+r.n+" "+_T("reglages"));setNomProfil("");}
force();}))),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Echanger un profil"),
_T("Colle ici un profil exporte pour l ajouter, ou recupere le texte d un export.")),
i("textarea",{value:texte,rows:5,placeholder:_NXtr('{"nexium":"profil",…}'),
"aria-label":_T("Texte du profil"),spellCheck:false,
onChange:function(e){setTexte(e.target.value);},
style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,
borderRadius:"11px",padding:"11px 13px",color:P.sub,fontSize:"11px",outline:"none",
fontFamily:_NXf.mono,resize:"vertical",marginBottom:"10px"}}),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},
_NXbtn(_T("Importer ce texte"),function(){
geste();
var r=C.importeProfil(texte);
if(r.err)dis(r.err);
else{dis(_T("Profil importe")+" \u00ab "+r.nom+" \u00bb \u00b7 "+r.n+" "+_T("reglages"));setTexte("");}
force();}),
texte?_NXbtn(_T("Vider"),function(){setTexte("");}):null),
i("div",{style:{marginTop:"12px",fontSize:"11px",color:P.faint,lineHeight:1.65}},
_T("A l import, toute cle qui ne commence pas par nexium_ est ecartee, ainsi que le coffre et les jetons : un profil recu ne peut pas glisser autre chose que des reglages."))),{mb:12}));}

// ------------------------------------------------------------ onglet Securite
function tSecurite(){
return i("div",null,
_NXcard(i("div",null,
_NXch(_T("Phrase du coffre"),
C.ouvert?_T("Change la phrase sans rien perdre : le coffre est rechiffre sur place.")
:_T("Ouvre le coffre pour pouvoir changer sa phrase.")),
C.ouvert?i("div",null,
i("input",{type:"password",value:pAnc,placeholder:_T("Phrase actuelle"),
"aria-label":_T("Phrase actuelle"),
onChange:function(e){setPAnc(e.target.value);},
style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,
borderRadius:"11px",padding:"11px 13px",color:P.txt,fontSize:"13px",outline:"none",
marginBottom:"9px",fontFamily:"inherit"}}),
i("input",{type:"password",value:pNouv,placeholder:_T("Nouvelle phrase, huit caracteres au minimum"),
"aria-label":_T("Nouvelle phrase"),
onChange:function(e){setPNouv(e.target.value);},
style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,
borderRadius:"11px",padding:"11px 13px",color:P.txt,fontSize:"13px",outline:"none",
marginBottom:"11px",fontFamily:"inherit"}}),
_NXbtn(_T("Changer la phrase"),function(){
geste();
C.changePhrase(pAnc,pNouv,function(r){
setPAnc("");setPNouv("");
dis(r.err||_T("Phrase changee. Le coffre est rechiffre."));force();});}))
:i("div",{style:{fontSize:"12px",color:P.dim,lineHeight:1.6}},
_T("Cette operation demande le coffre ouvert et la phrase actuelle."))),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Verrouillage automatique"),
_T("Un coffre ouvert est un coffre ouvert. Passe ce delai sans activite sur cette page, il se referme.")),
i("div",{style:{display:"flex",gap:"7px",flexWrap:"wrap"}},
[[0,_T("jamais")],[5,"5 min"],[15,"15 min"],[30,"30 min"],[60,"1 h"]].map(function(v){
var on=C.st.verrou===v[0];
return i("div",{key:v[0],className:"nx-fx",role:"button","aria-pressed":on?"true":"false",
tabIndex:0,onKeyDown:_NXkey,
onClick:function(){geste();C.setVerrou(v[0]);force();},
style:{padding:"8px 15px",borderRadius:"999px",cursor:"pointer",
fontFamily:_NXf.mono,fontSize:"11px",fontWeight:"700",
background:on?P.raise:"transparent",
border:"1px solid "+(on?P.edge:P.line),color:on?P.txt:P.dim}},_NXtr(v[1]));})),
C.st.verrou?null:i("div",{style:{marginTop:"11px",fontSize:"11px",color:_NXpal.warn,
lineHeight:1.6}},
_T("Sans verrouillage, le coffre reste ouvert tant que Discord tourne."))),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Copie de secours"),
_T("Le coffre exporte reste chiffre : illisible sans ta phrase. Sans copie, un vidage du stockage de Discord efface tout sans recours.")),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"11px"}},
_NXbtn(_T("Exporter le coffre"),function(){
geste();
var t=C.exporteCoffre();
if(!t){dis(_T("Aucun coffre a exporter."));return;}
setTexte(t);
try{if(window._NXIA&&_NXIA.copie)_NXIA.copie(t);}catch(_){}
dis(_T("Coffre copie dans le presse-papier, et affiche ci-dessous. Il reste chiffre."));}),
_NXbtn(_T("Remettre une copie en place"),function(){
geste();
if(!texte.trim()){dis(_T("Colle d abord le texte de la copie ci-dessous."));return;}
if(!window.confirm(_T("Remplacer le coffre actuel par cette copie ? Les comptes actuellement gardes seront perdus.")))return;
var r=C.importeCoffre(texte);
if(r.err)dis(r.err);else{dis(_T("Copie remise en place. Ouvre-la avec sa propre phrase."));setTexte("");}
force();},"danger")),
i("textarea",{value:texte,rows:5,placeholder:_NXtr('{"nexium":"coffre",…}'),
"aria-label":_T("Texte de la copie"),spellCheck:false,
onChange:function(e){setTexte(e.target.value);},
style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,
borderRadius:"11px",padding:"11px 13px",color:P.sub,fontSize:"11px",outline:"none",
fontFamily:_NXf.mono,resize:"vertical"}})),{mb:12}),
_NXtr(avertissements()));}

// Ce texte se lit avant de confier un premier jeton, pas apres : il
// accompagne donc aussi l ecran de la serrure.
function avertissements(){return _NXcard(i("div",null,
_NXch(_T("Ce que tu confies a cette page"),_T("Autant le dire clairement.")),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.7}},
_T("Un jeton de session ouvre un compte sans mot de passe et sans double authentification. C est pour cette raison que Nexium Protect surveille les fuites de jeton, et c est pour la meme raison que le coffre est chiffre avec une phrase que tu es seul a connaitre.")),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.7,marginTop:"11px"}},
_T("L age affiche a cote de chaque compte est celui du jeton enregistre, mesure ici. Nexium ne verifie pas si un jeton est encore valide : le faire supposerait de s en servir, et s en servir depuis un client modifie est exactement ce qu il ne faut pas faire.")),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.7,marginTop:"11px"}},
_T("La phrase n est enregistree nulle part : si tu l oublies, les comptes gardes sont definitivement illisibles. N ajoute ici que des comptes qui t appartiennent.")),
i("div",{style:{fontSize:"12.5px",color:_NXpal.warn,lineHeight:1.7,marginTop:"11px"}},
_T("Utiliser plusieurs comptes depuis un client modifie accroit le risque de sanction de la part de Discord. C est un choix, pas une recommandation."))),{mb:0});}

// ------------------------------------------------------------------ onglets
var TABS=[["comptes","Comptes"],["profils","Profils"],["securite","Sécurité"]];
function tabbar(){return _NXFX.onglets(TABS,tab,function(k){if(tab!==k){setTab(k);setQ("");}},{col:_NXpal.rose});}

return i(Kr,null,i("div",{style:{maxWidth:"820px",margin:"0 auto",opacity:monte?1:0,
transform:monte?"none":"translateY(6px)",transition:"opacity .32s ease,transform .32s ease"}},
_NXtr(TETE),
_NXtr(hero()),
mot[0]?_NXcard(i("div",{style:{fontSize:"12.5px",color:P.txt,lineHeight:1.6,
overflowWrap:"anywhere"}},_NXtr(mot[0])),{mb:12}):null,
_NXtr(tabbar()),
tab==="comptes"?(C.ouvert?_NXtr(tComptes()):i("div",null,_NXtr(serrure()),_NXtr(avertissements()))):null,
tab==="profils"?_NXtr(tProfils()):null,
tab==="securite"?_NXtr(tSecurite()):null,
_NXfoot(_NXtr("Nexium Comptes \u00b7 chiffre sur cette machine, jamais envoye"))));
}
