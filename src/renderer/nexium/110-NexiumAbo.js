var NexiumAboIcon=function(p){p=p||{};var z=p.width||p.height||20;return (window._NXFX&&_NXFX.svg)?_NXFX.svg("etoile",z):null;};
function NexiumAboComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
F.useEffect(function(){
if(!window._NXABO)return;
_NXABO.listeners.push(force);
_NXABO.charge(true);
_NXABO.catalogue();
return function(){try{_NXABO.listeners=_NXABO.listeners.filter(function(f){return f!==force;});}catch(_){}};},[]);
var P=_NXpal;
var onglet=F.useState(null);
// L offre dont on regarde l effet sur la carte d acces. Rien n est achete :
// c est un calque pose sur l etat reel.
var apercu=F.useState(null);
var duree=F.useState(1);
var ami=F.useState("");
var essaiBusy=F.useState(false);
var faq=F.useState(-1);
var codeP=F.useState(""),codeBusy=F.useState(false),codeRes=F.useState(null);
var an=_NXFX.anime();
var A=window._NXABO;

if(!A)return i(Kr,null,i("div",{style:{maxWidth:"760px",margin:"0 auto"}},
_NXFX.entete({cle:_T("Abonnement"),titre:_NXtr("Nexium Abonnement"),icone:"etoile",col:P.warn,
texte:_T("Le module d abonnement n a pas demarre sur ce client.")}),
_NXfoot(_NXtr("Nexium Abonnement"))));

var res=A.resume();
var niv={ia:A.niveau("ia"),pr:A.niveau("pr"),pv:A.niveau("pv")};
var mesOffres=A.offres();
var prochaine=A.prochaine();
var libre=A.libre();
var cat=A.CAT||[];
var E=A.essai();
var enc=A.enEssai();
var credits=A.credits();
var gen=[],z0;
for(z0=0;z0<cat.length;z0++)if(cat[z0].famille==="general")gen.push(cat[z0]);
gen.sort(function(a,b){return (a.rang||0)-(b.rang||0);});
var ENG=[{m:1,j:30,o:0}];
try{var EL=A.engagement();
for(z0=0;z0<EL.length;z0++){var ej=parseInt(EL[z0].jours,10),eo=parseInt(EL[z0].offerts,10);
if(ej>0)ENG.push({m:Math.max(1,Math.round(ej/30)),j:ej,o:eo>0?eo:0});}}catch(_){}
var choix=ENG[0];
for(z0=0;z0<ENG.length;z0++)if(ENG[z0].m===duree[0])choix=ENG[z0];
var tab=onglet[0]||((libre||mesOffres.length)?"moi":"offres");

function prixFr(v){try{
var n=parseFloat(v);if(!isFinite(n))return String(v);
var s=(Math.round(n*100)/100).toFixed(2).replace(".00","");
return s.replace(".",",");}catch(_){return String(v);}}
function parJour(v){try{
var n=parseFloat(v);
if(!isFinite(n)||n<=0)return "";
var c=Math.round((n/30)*100);
if(c<1)return "";
return _T("soit")+" "+(c<100?(c+" "+_T("centimes")):(prixFr(c/100)+" "+_T("euros")))+" "+_T("par jour");}catch(_){return "";}}
function offreDe(cle){for(var y=0;y<cat.length;y++)if(cat[y].offre===cle)return cat[y];return null;}
function mienne(cle){try{
for(var y=0;y<mesOffres.length;y++)if(mesOffres[y].offre===cle)return mesOffres[y];
return null;}catch(_){return null;}}
function avis(t,ty){try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr(t),ty===undefined?1:ty);}catch(_){}}
function aller(k){try{if(window._NXCP&&_NXCP.goto&&_NXCP.goto(k))return;}catch(_){}}

// Ouvrir un ticket, deja rempli : l offre, la duree en jours exacte (celle
// qui declenche les jours offerts cote serveur), et le destinataire d un
// cadeau. La demande arrive dans la file de l equipe.
function ticket(o,opt){try{
opt=opt||{};
var c=opt.duree||choix;
var nom=o?o.nom:_T("un abonnement");
var sujet=o?(_T("Abonnement")+" : "+o.nom+(c.m>1?(" · "+c.m+" "+_T("mois")):"")):_T("Demande d abonnement");
var message="";
if(opt.ami){
sujet=_T("Cadeau")+" : "+nom+" "+_T("pour")+" "+opt.ami;
message=_T("Je veux offrir")+" "+nom+" ("+c.m+" "+_T("mois")+", "+c.j+" "+_T("jours")+") "+_T("au compte Discord")+" "+opt.ami+". ";}
else if(o){message=_T("Je veux prendre")+" "+nom+" "+_T("pour")+" "+c.m+" "+_T("mois")+" ("+c.j+" "+_T("jours")+"). ";}
if(o&&c.o)message+=_T("Avec l engagement, le serveur ajoute")+" "+c.o+" "+_T("jours offerts")+". ";
if(window._NXTK){
_NXTK.pre={categorie:"abonnement",offre:o?o.nom:null,sujet:sujet,message:message};
if(window._NXCP)_NXCP.ouvrir("equicord_ticket","Nexium Ticket");
return;}
_NXpresse("5dj0");
avis(_T("Pseudo copie : 5dj0"));}catch(_){}}

function essayer(){
if(essaiBusy[0])return;
essaiBusy[1](true);
A.essaie(function(r){
essaiBusy[1](false);
if(r&&r.ok){
var o=offreDe(r.offre),nom=o?o.nom:"Nexium Pro";
try{if(window._NXFETE&&_NXFETE.montre)_NXFETE.montre({nom:nom,cle:r.offre,expire:r.expire_le||null,
titre:_T("Ton essai commence"),
sous:_T("Tout ce que l offre ouvre est actif, tout de suite. L essai s arrete seul : rien a payer, rien a annuler.")});}catch(_){}
avis(_T("Essai active")+" : "+nom+" · "+r.jours+" "+_T("jours"),1);
onglet[1]("moi");}
else avis((r&&r.raison)||_T("Essai impossible."),2);
force();});}

// Ce que chaque niveau ouvre, domaine par domaine : la meme grille que celle
// appliquee par le client et par le relais.
var PALIERS={
pr:[[0,_T("Le socle"),_T("Liens dangereux, hameconnage, fichiers pieges, garde console, coffre anti-vol.")],
[1,_T("Les pieges"),_T("Caracteres invisibles, adresses de portefeuille, liens prives d inconnus, fuite de webhook, vagues coordonnees, noms de fichiers truques, demandes de scan de QR code.")],
[2,_T("L avance"),_T("Autorisations d application, schemas executables, inversion du sens de lecture, liens vers une IP brute, demande de code de verification.")],
[3,_T("La sortie"),_T("Pare-feu sortant, gardien des webhooks, anti-balise invisible, gardien du DOM.")]],
pv:[[0,_T("La telemetrie"),_T("Mesure d usage, rapports de plantage, moisson, analytique, promotions.")],
[1,_T("Les signaux sociaux"),_T("Frappe silencieuse, accuses de lecture, inactivite, affinites, contacts, evenements, partage d activite.")],
[2,_T("L empreinte"),_T("Canvas, carte graphique, audio, ecran, greffons, batterie, indices de client, IP locale, materiel, STUN, tests A/B.")],
[3,_T("Les donnees"),_T("Metadonnees des images, liens envoyes nettoyes, noms de fichiers anonymises, presse-papiers, purge a la fermeture.")]],
ia:[[0,_T("Rapide"),_T("Nexium IA 0.9, reflexion rapide et normale, 30 credits par tranche de sept heures.")],
[1,_T("Plus"),_T("Ajoute Nexium IA 1.0 et 1.0.2, et porte la reserve a 100 credits.")],
[2,_T("Pro"),_T("Ajoute Nexium IA 1.2, l analyse de conversation, et porte la reserve a 200 credits.")],
[3,_T("Ultra"),_T("Ajoute la reflexion profonde en deux temps, et porte la reserve a 400 credits.")]]};
var DOMS=[["pr","Nexium Protect","bouclierOk",P.danger],
["pv","Nexium Privacy","oeilBarre",P.ok],
["ia","Nexium IA","etincelle",P.mauve]];
var fermes=0,ouverts=0,_z;
for(_z=0;_z<DOMS.length;_z++){var _n=niv[DOMS[_z][0]];ouverts+=Math.min(3,_n);fermes+=3-Math.min(3,_n);}

// La couleur de chaque palier general, partout dans la page.
function teinteRang(r){return r===3?P.warn:(r===2?P.mauve:P.cyan);}
var ACCROCHES={1:_T("L essentiel, un cran au-dessus"),2:_T("Le meilleur equilibre"),3:_T("Tout Nexium, sans reglage ferme")};
var POINTS={
1:[_T("Protect, Privacy et IA au niveau 1"),_T("100 credits IA toutes les 7 heures"),_T("Nexium IA 1.0 et 1.0.2"),_T("Les pieges des messages et les signaux sociaux coupes")],
2:[_T("Les trois modules au niveau 2"),_T("200 credits IA toutes les 7 heures"),_T("Nexium IA 1.2 et l analyse de conversation"),_T("Le bac a sable et l empreinte brouillee")],
3:[_T("Les trois modules au maximum"),_T("400 credits IA toutes les 7 heures"),_T("La reflexion profonde, tous les modeles"),_T("Le pare-feu sortant et la purge des donnees")]};

// ------------------------------------------------------------------ le style
var CSS=".nxab{position:relative}"+
".nxab-aurora{position:absolute;inset:-35%;pointer-events:none;"+
"background:radial-gradient(38% 48% at 18% 30%,"+_NXteinte(P.mauve,34)+",transparent 62%),"+
"radial-gradient(34% 44% at 82% 18%,"+_NXteinte(P.info,28)+",transparent 62%),"+
"radial-gradient(44% 52% at 62% 92%,"+_NXteinte(P.rose||P.danger,20)+",transparent 62%);}"+
".nxab-anim .nxab-aurora{animation:nxabDrift 16s ease-in-out infinite alternate}"+
"@keyframes nxabDrift{0%{transform:translate3d(-4%,-2%,0) rotate(0deg)}100%{transform:translate3d(4%,3%,0) rotate(7deg)}}"+
".nxab-shine{position:absolute;inset:0;pointer-events:none;border-radius:inherit;"+
"background:linear-gradient(112deg,transparent 32%,rgba(255,255,255,.20) 46%,transparent 60%);background-size:260% 100%;background-position:130% 0}"+
".nxab-anim .nxab-shine{animation:nxabShine 6s ease-in-out infinite}"+
"@keyframes nxabShine{0%{background-position:130% 0}55%,100%{background-position:-60% 0}}"+
".nxab-anim .nxab-float{animation:nxabFloat 7s ease-in-out infinite}"+
"@keyframes nxabFloat{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-9px) rotate(-2deg)}}"+
".nxab-grad{background:linear-gradient(92deg,"+P.txt+" 10%,"+P.mauve+" 55%,"+P.info+");"+
"-webkit-background-clip:text;background-clip:text;color:transparent}"+
".nxab-card{transition:transform .28s cubic-bezier(.22,1,.36,1),box-shadow .28s ease,border-color .28s ease}"+
".nxab-anim .nxab-card:hover{transform:translateY(-5px)}"+
".nxab-anim .nxab-pulse{animation:nxabPulse 2.4s ease-in-out infinite}"+
"@keyframes nxabPulse{0%,100%{box-shadow:0 0 0 0 "+_NXteinte(P.mauve,40)+"}50%{box-shadow:0 0 0 8px "+_NXteinte(P.mauve,0)+"}}"+
"@media (prefers-reduced-motion:reduce){.nxab-aurora,.nxab-shine,.nxab-float,.nxab-pulse{animation:none!important}}";

// ---------------------------------------------------------- la carte membre
// Une carte, comme une carte de membre : l offre, le titulaire, l echeance.
// Sans offre, elle est la, grisee, avec un cadenas : c est ce qui l allume.
function titulaire(){try{
var U=_NXcommon().store("UserStore");var u=U&&U.getCurrentUser&&U.getCurrentUser();
return (u&&(u.global_name||u.username))||_T("Toi");}catch(_){return _T("Toi");}}
function carteMembre(){
var o=null,r=0;
for(var y=0;y<mesOffres.length;y++){if(!o||(mesOffres[y].rang||0)>r){o=mesOffres[y];r=mesOffres[y].rang||0;}}
var eteinte=!o&&!libre;
var col=libre?(res.etat==="admin"?P.warn:P.lime):(o?teinteRang(o.famille==="general"?r:1):P.faint);
var nom=libre?(res.etat==="admin"?_T("Compte d equipe"):_T("Membre des debuts")):(o?o.nom:_T("Ta carte Nexium"));
var j=o?A.jours(o.expire_le):null;
var echeance=libre?_T("a vie"):(o?(o.expire_le?(new Date(o.expire_le)).toLocaleDateString():_T("a vie")):"—");
return i("div",{className:an?"nxab-float":"",style:{position:"relative",width:"300px",maxWidth:"100%",aspectRatio:"1.6",
borderRadius:"20px",overflow:"hidden",flexShrink:0,
background:eteinte?("linear-gradient(140deg,"+P.raise+","+P.inset+")"):
("linear-gradient(140deg,"+_NXteinte(col,62)+" 0%,"+_NXteinte(col,20)+" 46%,"+P.bg+" 100%)"),
border:"1px solid "+(eteinte?P.line:_NXteinte(col,55)),
boxShadow:eteinte?"none":("0 26px 60px "+_NXteinte(col,26)+",inset 0 1px 0 rgba(255,255,255,.18)"),
filter:eteinte?"grayscale(1)":"none",opacity:eteinte?.72:1}},
i("div",{"aria-hidden":"true",style:{position:"absolute",inset:0,
backgroundImage:"repeating-linear-gradient(135deg,"+_NXteinte(P.txt,4)+" 0 1px,transparent 1px 9px)"}}),
eteinte?null:i("div",{className:"nxab-shine","aria-hidden":"true"}),
i("div",{style:{position:"relative",height:"100%",boxSizing:"border-box",padding:"18px 20px",
display:"flex",flexDirection:"column",justifyContent:"space-between"}},
i("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",color:P.txt}},
i("svg",{viewBox:"0 0 100 100",width:18,height:18,fill:"none",stroke:"currentColor",strokeWidth:10,strokeLinecap:"square","aria-hidden":"true"},
i("path",{d:"M28 72 V28 L72 72 V28"})),
i("span",{style:{fontSize:"11px",fontWeight:"900",letterSpacing:".32em"}},_NXtr("NEXIUM"))),
eteinte?_NXFX.svg("cadenas",16):
i("span",{style:{fontSize:"9.5px",fontWeight:"900",letterSpacing:".16em",padding:"3px 9px",borderRadius:"99px",
background:_NXteinte(P.txt,14),color:P.txt,textTransform:"uppercase"}},
(o&&o.essai)?_T("essai"):(libre?_T("a vie"):_T("membre")))),
i("div",null,
i("div",{style:{fontFamily:_NXf.disp,fontSize:"22px",fontWeight:"800",color:P.txt,letterSpacing:"-.03em",lineHeight:1.1}},_NXtr(nom)),
eteinte?i("div",{style:{fontSize:"11.5px",color:P.sub,marginTop:"5px"}},_T("S allume des ta premiere offre.")):null),
i("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:"10px"}},
i("div",{style:{minWidth:0}},
i("div",{style:{fontSize:"8.5px",letterSpacing:".2em",color:P.dim,textTransform:"uppercase",fontWeight:"800"}},_T("Titulaire")),
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.txt,marginTop:"3px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"150px"}},_NXtr(titulaire()))),
i("div",{style:{textAlign:"right"}},
i("div",{style:{fontSize:"8.5px",letterSpacing:".2em",color:P.dim,textTransform:"uppercase",fontWeight:"800"}},_T("Valable jusqu au")),
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.txt,marginTop:"3px",fontFamily:_NXf.mono}},_NXtr(echeance))))));}

// ------------------------------------------------------------------- le heros
function heros(){
var abonne=libre||mesOffres.length>0;
return i("div",{className:"nxab-card",style:{position:"relative",overflow:"hidden",borderRadius:"28px",
padding:"32px 30px",marginBottom:"18px",border:"1px solid "+_NXteinte(P.mauve,28),
background:"linear-gradient(150deg,"+_NXteinte(P.mauve,10)+","+P.panel+" 55%,"+P.bg+")"}},
i("div",{className:"nxab-aurora","aria-hidden":"true"}),
i("div",{"aria-hidden":"true",style:{position:"absolute",inset:0,pointerEvents:"none",
backgroundImage:"linear-gradient("+_NXteinte(P.txt,4)+" 1px,transparent 1px),linear-gradient(90deg,"+_NXteinte(P.txt,4)+" 1px,transparent 1px)",
backgroundSize:"42px 42px",
maskImage:"radial-gradient(60% 80% at 80% 20%,#000,transparent 75%)",
WebkitMaskImage:"radial-gradient(60% 80% at 80% 20%,#000,transparent 75%)"}}),
i("div",{style:{position:"relative",display:"flex",alignItems:"center",gap:"28px",flexWrap:"wrap"}},
i("div",{style:{flex:"1 1 300px",minWidth:"260px"}},
i("div",{style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"5px 12px",borderRadius:"99px",
background:_NXteinte(P.mauve,14),border:"1px solid "+_NXteinte(P.mauve,34),
fontSize:"10px",fontWeight:"900",letterSpacing:".2em",color:P.mauve,textTransform:"uppercase"}},
_NXFX.svg("etoile",12),_T("Nexium Premium")),
i("div",{className:"nxab-grad",style:{fontFamily:_NXf.disp,fontSize:"38px",fontWeight:"800",letterSpacing:"-.045em",
lineHeight:1.02,marginTop:"16px"}},
abonne?(enc?_T("Ton essai est en cours."):_T("Tout Nexium, pour toi.")):_T("Debloque tout Nexium.")),
i("div",{style:{fontSize:"14px",color:P.sub,marginTop:"12px",lineHeight:1.65,maxWidth:"440px"}},
abonne?_NXtr(res.texte):_T("Des protections qui coupent avant de prevenir, une vie privee plus fine, et un assistant plus capable. Des credits IA offerts chaque mois, et rien ne se renouvelle tout seul.")),
i("div",{style:{display:"flex",gap:"9px",flexWrap:"wrap",marginTop:"20px"}},
(E&&E.dispo&&!libre)?i("div",{className:an?"nxab-pulse":"",style:{borderRadius:"12px"}},
_NXFX.bouton({t:essaiBusy[0]?_T("Activation…"):(_T("Essayer")+" "+(_NXtr((offreDe(E.offre)||{}).nom)||_NXtr("Nexium Pro"))+" · "+_NXtr(E.jours)+" "+_T("jours gratuits")),
icone:"cadeau",plein:true,col:P.mauve,off:essaiBusy[0],onClick:essayer})):null,
libre?null:_NXFX.bouton({t:abonne?_T("Prolonger ou changer"):_T("Voir les offres"),icone:"etoile",
plein:!(E&&E.dispo),creux:!!(E&&E.dispo),col:P.acc,onClick:function(){onglet[1]("offres");}}),
_NXFX.bouton({t:_T("Les avantages"),icone:"cadeau",creux:true,col:P.sub,onClick:function(){onglet[1]("avantages");}})),
i("div",{style:{display:"flex",gap:"18px",flexWrap:"wrap",marginTop:"22px"}},
DOMS.map(function(d){var n=niv[d[0]];
return i("div",{key:d[0],style:{display:"flex",alignItems:"center",gap:"8px"}},
i("div",{style:{display:"flex",gap:"3px"}},[1,2,3].map(function(k){
return i("span",{key:k,style:{width:"14px",height:"5px",borderRadius:"3px",
background:n>=k?d[3]:_NXteinte(P.txt,10)}});})),
i("span",{style:{fontSize:"11px",color:P.sub,fontWeight:"700"}},_NXtr(d[1].replace("Nexium ",""))));}))),
_NXtr(carteMembre())));}

// ---------------------------------------------------------------- l essai
function bandeauEssai(){
if(libre)return null;
if(enc){
var j=A.jours(enc.expire_le);
return i("div",{style:{position:"relative",overflow:"hidden",display:"flex",alignItems:"center",gap:"16px",flexWrap:"wrap",
padding:"18px 20px",borderRadius:"18px",marginBottom:"16px",
border:"1px solid "+_NXteinte(P.info,40),
background:"linear-gradient(110deg,"+_NXteinte(P.info,15)+","+_NXteinte(P.mauve,8)+" 60%,"+P.panel+")"}},
_NXFX.blason("horloge",P.info,52),
i("div",{style:{flex:"1 1 240px"}},
i("div",{style:{fontSize:"10px",fontWeight:"900",letterSpacing:".18em",textTransform:"uppercase",color:P.info}},_T("Essai en cours")),
i("div",{style:{fontSize:"17px",fontWeight:"800",color:P.txt,marginTop:"5px"}},
_NXtr(enc.nom)+(j===null?"":(" · "+_NXtr(j)+" "+_T("jour(s) restant(s)")))),
i("div",{style:{fontSize:"12px",color:P.sub,marginTop:"5px",lineHeight:1.6}},
_T("A la fin de l essai, ton client revient au socle sans rien effacer. Pour garder tout ca, prends l offre : les credits offerts arrivent avec."))),
_NXFX.bouton({t:_T("Garder")+" "+_NXtr(enc.nom),icone:"etoile",plein:true,col:P.info,
onClick:function(){ticket(offreDe(enc.offre));}}));}
return null;}

// ------------------------------------------------------------ la duree
function selecteurDuree(){
if(ENG.length<2)return null;
return i("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px",flexWrap:"wrap",margin:"4px 0 22px"}},
i("div",{role:"radiogroup","aria-label":_T("Duree"),style:{display:"inline-flex",padding:"5px",gap:"4px",borderRadius:"15px",
background:P.inset,border:"1px solid "+P.line}},
ENG.map(function(x){var on=x.m===choix.m;
return i("div",{key:x.m,className:"nx-fx",role:"radio","aria-checked":on?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){duree[1](x.m);},
style:{display:"flex",alignItems:"center",gap:"7px",padding:"9px 16px",borderRadius:"11px",cursor:"pointer",
background:on?P.raise:"transparent",boxShadow:on?"0 4px 14px rgba(0,0,0,.35)":"none",
color:on?P.txt:P.sub,fontSize:"12.5px",fontWeight:on?"800":"600",
transition:an?"background .2s ease,color .2s ease":"none"}},
_NXtr(x.m)+" "+_T("mois"),
x.o?i("span",{style:{fontSize:"10px",fontWeight:"900",padding:"2px 7px",borderRadius:"99px",
background:_NXteinte(P.ok,18),color:P.ok}},"+"+_NXtr(x.o)+" "+_T("j")):null);})),
choix.o?i("span",{style:{fontSize:"11.5px",color:P.ok,fontWeight:"700"}},
"+"+_NXtr(choix.o)+" "+_T("jours offerts, ajoutes par le serveur")):null);}

// ---------------------------------------------------------- une offre
function carteOffre(o){
var m=mienne(o.offre);
var col=teinteRang(o.rang);
var vedette=o.rang===2;
var prixMois=parseFloat(o.prix)||0;
var total=prixMois*choix.m;
var bonus=(parseInt(o.bonus_credits,10)||0)*choix.m;
var essaiIci=E&&E.dispo&&!libre&&E.offre===o.offre;
var ruban=m?(m.essai?_T("Essai"):_T("Actif")):(vedette?_T("Le plus choisi"):(o.rang===3?_T("Le plus complet"):null));
return i("div",{key:o.offre,className:"nxab-card",style:{position:"relative",flex:"1 1 236px",minWidth:"220px",
display:"flex",flexDirection:"column",padding:"28px 22px 22px",borderRadius:"24px",overflow:"hidden",
background:"linear-gradient(172deg,"+_NXteinte(col,vedette?20:12)+","+P.inset+" 58%)",
border:"1px solid "+(m?_NXteinte(P.ok,50):_NXteinte(col,vedette?56:28)),
boxShadow:vedette?("0 28px 64px "+_NXteinte(col,22)):"none"}},
vedette?i("div",{className:"nxab-shine","aria-hidden":"true"}):null,
ruban?i("div",{style:{position:"absolute",top:"14px",right:"14px",padding:"4px 10px",borderRadius:"99px",
background:m?P.ok:col,color:P.ink,fontSize:"9px",fontWeight:"900",letterSpacing:".12em",textTransform:"uppercase"}},_NXtr(ruban)):null,
i("div",{style:{position:"relative",display:"flex",alignItems:"center",gap:"10px"}},
_NXFX.pastille(o.rang===3?"couronne":(o.rang===2?"etoile":"etincelle"),{col:col,taille:34,halo:vedette}),
i("div",null,
i("div",{style:{fontSize:"16px",fontWeight:"800",color:P.txt,letterSpacing:"-.02em"}},_NXtr(o.nom)),
i("div",{style:{fontSize:"11.5px",color:P.sub,marginTop:"2px"}},_NXtr(ACCROCHES[o.rang])||""))),
i("div",{style:{position:"relative",display:"flex",alignItems:"baseline",gap:"6px",marginTop:"22px"}},
i("span",{style:{fontFamily:_NXf.disp,fontSize:"44px",fontWeight:"800",color:P.txt,letterSpacing:"-.05em",lineHeight:1}},
_NXtr(prixFr(total))+" "+_NXtr(String.fromCharCode(0x20AC))),
i("span",{style:{fontSize:"12px",color:P.dim}},choix.m>1?(_T("pour")+" "+_NXtr(choix.m)+" "+_T("mois")):("/ "+(_NXtr(o.periode)||_T("mois"))))),
i("div",{style:{fontSize:"11px",color:P.faint,marginTop:"7px",fontFamily:_NXf.mono,minHeight:"14px"}},
choix.m>1?(_NXtr(prixFr(prixMois))+" "+_NXtr(String.fromCharCode(0x20AC))+" / "+_T("mois")+(choix.o?(" · +"+_NXtr(choix.o)+" "+_T("jours offerts")):"")):_NXtr(parJour(prixMois))),
bonus>0?i("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"16px",padding:"10px 12px",borderRadius:"12px",
background:_NXteinte(P.mauve,12),border:"1px solid "+_NXteinte(P.mauve,30)}},
i("span",{style:{display:"flex",color:P.mauve}},_NXFX.svg("cadeau",15)),
i("span",{style:{fontSize:"12px",color:P.txt,fontWeight:"700"}},"+"+_NXtr(bonus)+" "+_T("credits Nexium IA offerts"))):null,
i("div",{style:{height:"1px",background:P.line,margin:"18px 0 8px"}}),
i("div",{style:{flex:1}},
(POINTS[o.rang]||[]).map(function(p,k){
return i("div",{key:k,style:{display:"flex",alignItems:"flex-start",gap:"9px",padding:"7px 0"}},
i("span",{style:{display:"flex",color:col,marginTop:"1px",flexShrink:0}},_NXFX.svg("check",14)),
i("span",{style:{fontSize:"12.5px",color:P.pale,lineHeight:1.45}},_NXtr(p)));})),
i("div",{style:{marginTop:"18px",display:"flex",flexDirection:"column",gap:"8px"}},
m?i("div",{style:{textAlign:"center",fontSize:"12px",color:P.ok,fontWeight:"700",padding:"6px 0"}},
A.jours(m.expire_le)===null?_T("sans echeance"):(_NXtr(A.jours(m.expire_le))+" "+_T("jour(s) restant(s)"))):null,
_NXFX.bouton({t:m?_T("Prolonger"):(_T("Choisir")+" "+_NXtr(o.nom.replace("Nexium ",""))),icone:m?"maj":"etoile",large:true,
plein:vedette||!!essaiIci,creux:!(vedette||essaiIci),col:vedette?col:(essaiIci?P.acc:col),onClick:function(){ticket(o);}}),
essaiIci?_NXFX.bouton({t:essaiBusy[0]?_T("Activation…"):(_T("Essayer")+" "+_NXtr(E.jours)+" "+_T("jours gratuitement")),
icone:"cadeau",large:true,creux:true,col:P.mauve,off:essaiBusy[0],onClick:essayer}):null));}

// --------------------------------------------------------- la comparaison
var LIGNES=[[_T("Nexium Protect"),["1 / 3","2 / 3","3 / 3"]],[_T("Nexium Privacy"),["1 / 3","2 / 3","3 / 3"]],
[_T("Nexium IA"),["1 / 3","2 / 3","3 / 3"]],[_T("Credits IA toutes les 7 heures"),["100","200","400"]],
[_T("Modeles ouverts"),[_T("trois"),_T("quatre"),_T("tous")]],
[_T("Bac a sable et empreinte"),[false,true,true]],[_T("Pare-feu sortant"),[false,false,true]],
[_T("Reflexion profonde"),[false,false,true]]];
function comparatif(){
if(!gen.length)return null;
return _NXcard(i("div",null,
_NXch(_T("Comparer ligne par ligne"),_T("Les trois offres generales, sur ce qu elles ouvrent vraiment.")),
i("div",{style:{overflowX:"auto"}},
i("div",{style:{minWidth:"460px"}},
i("div",{style:{display:"grid",gridTemplateColumns:"1.6fr repeat("+gen.length+",1fr)",gap:"0",
borderBottom:"1px solid "+P.line,paddingBottom:"10px",marginBottom:"4px"}},
i("div",null),
gen.map(function(o){return i("div",{key:o.offre,style:{textAlign:"center",fontSize:"12px",fontWeight:"800",
color:teinteRang(o.rang)}},_NXtr(o.nom.replace("Nexium ","")));})),
LIGNES.map(function(l,k){
return i("div",{key:k,style:{display:"grid",gridTemplateColumns:"1.6fr repeat("+gen.length+",1fr)",
alignItems:"center",padding:"10px 0",borderTop:k?"1px solid "+_NXteinte(P.txt,5):"none"}},
i("div",{style:{fontSize:"12px",color:P.sub}},_NXtr(l[0])),
gen.map(function(o,y){var v=l[1][Math.min(2,(o.rang||1)-1)];
return i("div",{key:y,style:{textAlign:"center",fontSize:"12px",fontWeight:"700",fontFamily:_NXf.mono,
color:v===false?P.faint:P.txt,display:"flex",justifyContent:"center"}},
v===true?i("span",{style:{display:"flex",color:teinteRang(o.rang)}},_NXFX.svg("check",14)):
(v===false?i("span",{style:{display:"flex"}},_NXFX.svg("croix",12)):_NXtr(v)));}));})))),{mb:12});}

// ------------------------------------------------------------- a la carte
var FAM=[["securite","Nexium Security",_T("Les pieges, les gardes avancees, puis le pare-feu sortant."),"bouclierOk",P.danger,"pr"],
["privacy","Nexium Privacy",_T("Les signaux sociaux, l empreinte, puis l hygiene des donnees."),"oeilBarre",P.ok,"pv"],
["ia","Nexium IA",_T("Des paliers plus capables, et une reserve de credits plus large."),"etincelle",P.mauve,"ia"]];
function aLaCarte(){
var lignes=FAM.map(function(f){
var L=[],y;for(y=0;y<cat.length;y++)if(cat[y].famille===f[0])L.push(cat[y]);
L.sort(function(a,b){return (a.rang||0)-(b.rang||0);});
return [f,L];}).filter(function(x){return x[1].length;});
if(!lignes.length)return null;
return _NXcard(i("div",null,
_NXch(_T("A la carte"),_T("Un seul domaine t interesse ? Il se prend seul, des un euro par mois.")),
lignes.map(function(x,k){var f=x[0],n=niv[f[5]];
return i("div",{key:f[0],style:{display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap",
padding:"14px 0",borderTop:k?"1px solid "+P.line:"none"}},
_NXFX.pastille(f[3],{col:f[4],taille:34,halo:n>0}),
i("div",{style:{flex:"1 1 200px",minWidth:0}},
i("div",{style:{fontSize:"13.5px",fontWeight:"800",color:P.txt}},_NXtr(f[1])),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"3px",lineHeight:1.5}},_NXtr(f[2]))),
i("div",{style:{display:"flex",gap:"7px",flexWrap:"wrap"}},
x[1].map(function(o){var m=mienne(o.offre),deja=n>=o.rang;
return i("div",{key:o.offre,className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){if(!m)ticket(o);},title:_NXtr(o.nom),
style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",padding:"8px 12px",borderRadius:"12px",
cursor:m?"default":"pointer",minWidth:"62px",
background:m?_NXteinte(P.ok,12):(deja?_NXteinte(f[4],8):P.inset),
border:"1px solid "+(m?_NXteinte(P.ok,45):(deja?_NXteinte(f[4],30):P.line))}},
i("span",{style:{fontSize:"9px",fontWeight:"900",letterSpacing:".12em",color:deja?f[4]:P.faint,textTransform:"uppercase"}},
_T("niveau")+" "+_NXtr(o.rang)),
i("span",{style:{fontSize:"13px",fontWeight:"800",color:P.txt,fontFamily:_NXf.mono}},
_NXtr(prixFr(o.prix))+" "+_NXtr(String.fromCharCode(0x20AC))));})));})),{mb:12});}

// ---------------------------------------------------------------- offrir
function cadeau(){
if(!gen.length)return null;
var qui=ami[0].trim();
return i("div",{className:"nxab-card",style:{position:"relative",overflow:"hidden",borderRadius:"22px",padding:"22px",
marginBottom:"12px",border:"1px solid "+_NXteinte(P.rose||P.mauve,32),
background:"linear-gradient(130deg,"+_NXteinte(P.rose||P.mauve,12)+","+P.panel+" 60%)"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"14px",marginBottom:"14px",flexWrap:"wrap"}},
_NXFX.blason("cadeau",P.rose||P.mauve,50),
i("div",{style:{flex:"1 1 220px"}},
i("div",{style:{fontSize:"16px",fontWeight:"800",color:P.txt}},_T("Offrir Nexium a un ami")),
i("div",{style:{fontSize:"12px",color:P.sub,marginTop:"4px",lineHeight:1.6}},
_T("Donne son pseudo, choisis l offre : l equipe l active sur son compte, et il recoit les credits offerts comme s il l avait prise lui-meme.")))),
i("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"flex-end"}},
i("div",{style:{flex:"1 1 200px"}},_NXFX.champ({k:_T("Pseudo Discord de ton ami"),v:ami[0],ph:_NXtr("yannis"),serre:true,icone:"equipe",
onChange:function(e){ami[1](e.target.value);}})),
i("div",{style:{display:"flex",gap:"7px",flexWrap:"wrap",marginBottom:"8px"}},
gen.map(function(o){return i("div",{key:o.offre},_NXFX.bouton({t:_T("Offrir")+" "+_NXtr(o.nom.replace("Nexium ","")),
icone:"cadeau",petit:true,creux:true,col:teinteRang(o.rang),off:!qui,
onClick:function(){if(qui)ticket(o,{ami:qui});}}));}))));}

// ------------------------------------------------------------ un code promo
function utiliseCode(){
var v=String(codeP[0]||"").trim();
if(v.length<6||codeBusy[0])return;
codeBusy[1](true);codeRes[1](null);
A.utiliseCode(v,function(r){
codeBusy[1](false);codeRes[1](r||{ok:false});
if(r&&r.ok){codeP[1]("");
try{if(window._NXFETE&&r.genre==="abo")_NXFETE.montre({nom:r.nom||r.offre,cle:r.offre,expire:r.expire_le||null,
titre:_T("Code accepte"),sous:_T("Voila ce qu il ouvre sur ce client.")});}catch(_){}}});}
function codePromo(){
var v=codeP[0],r=codeRes[0];
var col=P.lime||P.ok;
return i("div",{className:"nxab-card",style:{position:"relative",overflow:"hidden",borderRadius:"22px",padding:"20px 22px",marginBottom:"12px",
border:"1px solid "+_NXteinte(col,30),background:"linear-gradient(130deg,"+_NXteinte(col,10)+","+P.panel+" 60%)"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap"}},
_NXFX.blason("jeton",col,46),
i("div",{style:{flex:"1 1 220px"}},
i("div",{style:{fontSize:"15px",fontWeight:"800",color:P.txt}},_T("Tu as un code ?")),
i("div",{style:{fontSize:"12px",color:P.sub,marginTop:"3px",lineHeight:1.6}},
_T("Un code Nexium ajoute des jours d abonnement ou des credits a ton compte, tout de suite."))),
i("div",{style:{display:"flex",gap:"8px",flex:"1 1 300px",alignItems:"flex-end"}},
i("div",{style:{flex:1}},_NXFX.champ({v:v,ph:_NXtr("NX-XXXXXXXX"),serre:true,mono:true,icone:"cle",
onChange:function(e){codeP[1](String(e.target.value||"").toUpperCase());codeRes[1](null);},
onKeyDown:function(e){if(e.key==="Enter")utiliseCode();}})),
i("div",{style:{marginBottom:"8px"}},_NXFX.bouton({t:codeBusy[0]?_T("Verification..."):_T("Utiliser"),icone:"check",plein:true,col:col,
off:codeBusy[0]||String(v||"").trim().length<6,onClick:utiliseCode})))),
r?i("div",{style:{marginTop:"10px",display:"flex",alignItems:"center",gap:"8px",fontSize:"12.5px",fontWeight:"700",color:r.ok?P.ok:P.warn}},
_NXFX.svg(r.ok?"check":"alerte",15),
r.ok?(r.genre==="abo"?(_T("Code accepte")+" : "+(_NXtr(r.nom)||_NXtr(r.offre))+", +"+_NXtr(r.jours)+" "+_T("jours"))
:(_T("Code accepte")+" : +"+_NXtr(r.credits)+" "+_T("credits Nexium IA"))):_NXtr(r.raison||"Code refuse.")):null);}

// ----------------------------------------------------- ce qu il a deja fait
function bilan(){
var pr=(window._NXPR&&_NXPR.stats)||{},pv=(window._NXP&&_NXP.stats)||{},gd=(window._NXGD&&_NXGD.stats)||{};
var sorties=(gd.webhook||0)+(gd.egress||0)+(gd.beacon||0)+(gd.dom||0)+(gd.payload||0);
var L=[[_T("Menaces bloquees"),pr.blocked||0,P.danger,"bouclierOk"],[_T("Liens analyses"),pr.scanned||0,P.info,"lien"],
[_T("Pistages arretes"),pv.blocked||0,P.ok,"oeilBarre"],[_T("Sorties coupees"),sorties,P.warn,"reseau"]];
if(credits!==null)L.push([_T("Credits IA offerts"),credits,P.mauve,"etincelle"]);
return _NXcard(i("div",null,
_NXch(_T("Ce que Nexium a deja fait pour toi"),_T("Compte sur cette machine, depuis l installation. Chaque palier de plus ajoute des protections a celles-ci.")),
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:"10px"}},
L.map(function(x,k){return i("div",{key:k,style:{padding:"14px",borderRadius:"14px",background:P.inset,border:"1px solid "+P.line}},
i("div",{style:{display:"flex",color:x[2],marginBottom:"10px"}},_NXFX.svg(x[3],16)),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"24px",fontWeight:"800",color:P.txt,letterSpacing:"-.03em",fontVariantNumeric:"tabular-nums"}},_NXtr(String(x[1]))),
i("div",{style:{fontSize:"10.5px",color:P.dim,marginTop:"4px",fontWeight:"700"}},_NXtr(x[0])));}))),{mb:12});}

// --------------------------------------------------------- la carte d acces
var ETAGES={
pr:[[0,_T("Le socle"),"bouclier"],[1,_T("Les pieges"),"cible"],[2,_T("L avance"),"baguette"],[3,_T("La sortie"),"reseau"]],
pv:[[0,_T("La telemetrie"),"oeilBarre"],[1,_T("Les signaux"),"equipe"],[2,_T("L empreinte"),"puce"],[3,_T("Les donnees"),"base"]],
ia:[[0,_T("Rapide"),"eclair"],[1,_T("Plus"),"etincelle"],[2,_T("Pro"),"couches"],[3,_T("Ultra"),"robot"]]};
function vise(cle){try{
if(!cle)return null;
var g=(window._NXFETE&&_NXFETE.devine)?_NXFETE.devine(cle):null;
if(!g)return null;
var r={ia:niv.ia,pr:niv.pr,pv:niv.pv};
if(g.famille==="general"){r.ia=Math.max(r.ia,g.rang);r.pr=Math.max(r.pr,g.rang);r.pv=Math.max(r.pv,g.rang);}
else if(g.famille==="ia")r.ia=Math.max(r.ia,g.rang);
else if(g.famille==="privacy")r.pv=Math.max(r.pv,g.rang);
else if(g.famille==="securite")r.pr=Math.max(r.pr,g.rang);
return r;}catch(_){return null;}}
function tour(d,k){
var cle=d[0],col=d[3],n=niv[cle];
var cible=apercu[0]?vise(apercu[0]):null;
var nc=cible?cible[cle]:n;
var hauts=ETAGES[cle].slice().reverse();
return i("div",{key:cle,style:{flex:"1 1 190px",minWidth:"176px",display:"flex",flexDirection:"column"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"9px",marginBottom:"11px"}},
_NXFX.pastille(d[2],{col:col,taille:26,halo:n>0}),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"12px",fontWeight:"800",color:P.txt}},_NXtr(d[1])),
i("div",{style:{fontSize:"10px",color:P.dim,fontFamily:_NXf.mono,marginTop:"2px"}},
_NXtr(n)+" / 3"+((nc>n)?(" "+_NXtr(String.fromCharCode(0x2192))+" "+_NXtr(nc)+" / 3"):"")))),
hauts.map(function(e,y){
var ouvert=n>=e[0],promis=!ouvert&&nc>=e[0];
var c=ouvert?col:(promis?P.warn:P.faint);
return i("div",{key:y,style:{display:"flex",alignItems:"center",gap:"9px",padding:"9px 11px",marginBottom:"5px",borderRadius:"11px",
background:ouvert?_NXteinte(col,8):(promis?_NXteinte(P.warn,7):"transparent"),
border:"1px "+(promis?"dashed":"solid")+" "+(ouvert?_NXteinte(col,28):(promis?_NXteinte(P.warn,42):P.line)),
opacity:ouvert||promis?1:.55}},
i("span",{style:{display:"flex",flexShrink:0,color:c}},_NXFX.svg(ouvert||promis?e[2]:"cadenas",14)),
i("span",{style:{flex:1,minWidth:0,fontSize:"11.5px",fontWeight:ouvert?"700":"600",color:ouvert?P.txt:(promis?P.pale:P.dim)}},_NXtr(e[1])),
promis?i("span",{style:{fontSize:"9.5px",fontWeight:"900",color:P.warn,fontFamily:_NXf.mono}},"+1"):
(ouvert?i("span",{style:{display:"flex",color:_NXteinte(col,75)}},_NXFX.svg("check",12)):null));}));}
function carteAcces(){
var cible=apercu[0]?vise(apercu[0]):null;
var gagne=cible?((cible.ia-niv.ia)+(cible.pr-niv.pr)+(cible.pv-niv.pv)):0;
var o=apercu[0]?offreDe(apercu[0]):null;
return _NXcard(i("div",null,
_NXch(_T("La carte de tes acces"),
_T("Ton client, etage par etage. Ce qui est eclaire est ouvert ; ce qui porte un cadenas ne l est pas encore. Choisis une offre pour voir ce qu elle allumerait."),
apercu[0]?_NXFX.bouton({t:_T("Arreter l apercu"),petit:true,creux:true,col:P.sub,icone:"croix",onClick:function(){apercu[1](null);}}):null),
cat.length?i("div",{style:{display:"flex",gap:"7px",flexWrap:"wrap",margin:"2px 0 18px"}},
cat.map(function(c){var on=apercu[0]===c.offre;
var col=c.famille==="ia"?P.mauve:(c.famille==="privacy"?P.ok:(c.famille==="securite"?P.danger:teinteRang(c.rang)));
return i("div",{key:c.offre,className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){apercu[1](on?null:c.offre);},
style:{display:"inline-flex",alignItems:"center",gap:"6px",padding:"5px 11px",borderRadius:"99px",cursor:"pointer",
background:on?_NXteinte(col,16):P.inset,border:"1px solid "+(on?_NXteinte(col,50):P.line),
color:on?P.txt:P.sub,fontSize:"11px",fontWeight:on?"800":"600"}},
_NXtr(c.nom.replace("Nexium ","")));})):null,
i("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap",alignItems:"flex-start"}},DOMS.map(tour)),
o?i("div",{style:{marginTop:"16px",padding:"13px 15px",borderRadius:"13px",border:"1px dashed "+_NXteinte(P.warn,42),
background:_NXteinte(P.warn,6),display:"flex",alignItems:"center",gap:"11px",flexWrap:"wrap"}},
i("span",{style:{flex:1,minWidth:"200px",fontSize:"12.5px",color:P.pale,lineHeight:1.55}},
gagne>0?(_NXtr(o.nom)+" "+_T("allumerait")+" "+_NXtr(gagne)+" "+(gagne>1?_T("etages de plus dans ton client."):_T("etage de plus dans ton client."))):
(_NXtr(o.nom)+" "+_T("n ajouterait rien : ces etages sont deja ouverts chez toi."))),
gagne>0?_NXFX.bouton({t:_T("Choisir cette offre"),petit:true,plein:true,col:P.acc,icone:"etoile",onClick:function(){ticket(o);}}):null):
i("div",{style:{marginTop:"14px",fontSize:"11.5px",color:P.faint}},
fermes?(_NXtr(fermes)+" "+(fermes>1?_T("etages encore eteints sur 9."):_T("etage encore eteint sur 9."))):
_T("Les neuf etages sont ouverts. Il n y a plus rien a allumer."))),{mb:12});}

function domaine(d,k){
var cle=d[0],col=d[3],n=niv[cle];
return i("div",{key:cle,style:{padding:"16px",borderRadius:"16px",background:P.inset,border:"1px solid "+P.line}},
i("div",{style:{display:"flex",alignItems:"center",gap:"11px",marginBottom:"12px"}},
_NXFX.pastille(d[2],{col:col,taille:30,halo:n>0}),
i("div",{style:{flex:1,minWidth:0,fontSize:"13px",fontWeight:"700",color:P.txt}},_NXtr(d[1])),
_NXFX.badge(n>=3?_T("complet"):(n>0?(_T("niveau")+" "+_NXtr(n)):_T("socle")),n>=3?P.ok:(n>0?col:P.faint))),
PALIERS[cle].map(function(p,y){var ouvert=n>=p[0];
return i("div",{key:y,style:{display:"flex",gap:"10px",alignItems:"flex-start",padding:"8px 0",
borderTop:y?"1px solid "+P.line:"none",opacity:ouvert?1:.5}},
i("div",{style:{flexShrink:0,marginTop:"2px",color:ouvert?col:P.faint,display:"flex"}},_NXFX.svg(ouvert?"check":"cadenas",13)),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"12px",fontWeight:"700",color:ouvert?P.txt:P.dim}},_NXtr(p[1])),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"3px",lineHeight:1.5}},_NXtr(p[2]))));}));}

// --------------------------------------------------------------- les onglets
function ongletOffres(){
return i("div",null,
_NXtr(bandeauEssai()),
i("div",{style:{textAlign:"center",margin:"8px 0 6px"}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:"26px",fontWeight:"800",color:P.txt,letterSpacing:"-.035em"}},_T("Choisis ton Nexium")),
i("div",{style:{fontSize:"12.5px",color:P.sub,marginTop:"6px"}},
_T("Tu payes une fois, pour la duree choisie. Rien ne se renouvelle tout seul."))),
_NXtr(selecteurDuree()),
gen.length?i("div",{style:{display:"flex",gap:"14px",flexWrap:"wrap",alignItems:"stretch",marginBottom:"16px"}},
gen.map(carteOffre)):
_NXFX.vide({icone:"nuage",titre:_T("Catalogue indisponible"),
texte:_T("Les offres n ont pas pu etre lues. Elles reviendront a la prochaine connexion."),
action:_NXFX.bouton({t:_T("Reessayer"),icone:"maj",petit:true,creux:true,col:P.sub,onClick:function(){A.catAt=0;A.catalogue();}})}),
_NXtr(cadeau()),
_NXtr(codePromo()),
_NXtr(comparatif()),
_NXtr(aLaCarte()),
_NXtr(carteAcces()),
_NXFX.note({col:P.info,icone:"info",titre:_T("Comment souscrire"),
texte:_T("Tu choisis l offre, un ticket s ouvre deja rempli, et l equipe te repond dans le meme fil. Des que c est regle, l offre s allume sur ton compte, avec ses credits offerts."),
droite:_NXFX.bouton({t:_T("Ouvrir un ticket"),petit:true,icone:"courrier",col:P.acc,plein:true,onClick:function(){ticket(null);}})}));}

function ongletMoi(){
return i("div",null,
_NXtr(bandeauEssai()),
_NXtr(codePromo()),
_NXtr(bilan()),
_NXcard(i("div",null,
_NXch(_T("Ce que tu as en cours"),
mesOffres.length?(_NXtr(mesOffres.length)+" "+_T("abonnement(s) actif(s)")):_T("Aucun abonnement en cours."),
i("div",{style:{display:"flex",gap:"7px",flexWrap:"wrap"}},
mesOffres.length?_NXFX.bouton({t:_T("Revoir l annonce"),icone:"cadeau",petit:true,creux:true,col:P.mauve,
onClick:function(){try{var o=mesOffres[mesOffres.length-1];
if(window._NXFETE)_NXFETE.montre({nom:o.nom,cle:o.offre,expire:o.expire_le||null,
titre:_T("Ton abonnement"),sous:_T("Voila ce qu il ouvre sur ce client.")});}catch(_){}}}):null,
_NXFX.bouton({t:_T("Rafraichir"),icone:"maj",hv:"tourne",petit:true,creux:true,col:P.sub,onClick:function(){A.charge(true);}}))),
mesOffres.length?mesOffres.map(function(o,k){
var j=A.jours(o.expire_le),urgent=(j!==null&&j<=5);
return _NXFX.rangee({key:o.offre,premier:k===0,
icone:o.famille==="ia"?"etincelle":(o.famille==="privacy"?"oeilBarre":(o.famille==="securite"?"bouclierOk":"etoile")),
col:urgent?P.warn:P.ok,titre:_NXtr(o.nom)+(o.essai?(" · "+_T("essai")):""),
texte:o.expire_le?(_T("jusqu au")+" "+_NXtr((new Date(o.expire_le)).toLocaleDateString())+" · "+_NXtr(j)+" "+_T("jour(s) restant(s)")):_T("sans echeance"),
droite:_NXFX.bouton({t:_T("Prolonger"),petit:true,creux:true,col:urgent?P.warn:P.sub,onClick:function(){ticket(offreDe(o.offre));}})});}):
_NXFX.vide({icone:"etoile",titre:_T("Pas encore d abonnement"),
texte:libre?_T("Et tu n en as pas besoin : ton compte a deja tout."):_T("Le socle protecteur reste actif. Un abonnement ouvre les protections avancees."),
action:libre?null:_NXFX.bouton({t:_T("Voir les offres"),icone:"etoile",petit:true,plein:true,col:P.acc,onClick:function(){onglet[1]("offres");}})})),{mb:12}),
_NXtr(carteAcces()),
_NXcard(i("div",null,
_NXch(_T("Le detail, palier par palier"),_NXtr(ouverts)+" "+_T("paliers ouverts sur")+" 9"+(fermes?(" · "+_NXtr(fermes)+" "+_T("encore fermes")):"")),
_NXFX.grille(DOMS.map(domaine),248)),{mb:12}),
A.pionnier()?_NXFX.note({col:P.lime,icone:"couronne",titre:_T("Tu etais la avant"),
texte:_T("Ton compte etait connu du serveur avant la mise en place des abonnements. Tout est ouvert, sans echeance et sans rien payer. Cela ne se retire pas.")}):null,
A.admin()?_NXFX.note({col:P.warn,icone:"cle",titre:_T("Compte d equipe"),
texte:_T("Les limites d abonnement ne s appliquent pas aux administrateurs du client.")}):null);}

function ongletAvantages(){
var bmin=0,bmax=0;
for(var y=0;y<gen.length;y++){var b=parseInt(gen[y].bonus_credits,10)||0;if(!bmin||b<bmin)bmin=b;if(b>bmax)bmax=b;}
var engTxt=ENG.slice(1).map(function(x){return "+"+x.o+" "+_T("jours pour")+" "+x.m+" "+_T("mois");}).join(", ");
var AV=[
["etincelle",P.mauve,_T("Des credits IA offerts, chaque mois"),
bmax?(_T("De")+" +"+bmin+" "+_T("a")+" +"+bmax+" "+_T("credits Nexium IA verses a chaque mois pris. Ils passent avant ton quota, et ne disparaissent pas a l echeance.")):
_T("Des credits Nexium IA verses a chaque mois pris.")],
["horloge",P.ok,_T("Des jours offerts en t engageant"),
engTxt?(engTxt+". "+_T("Ajoutes par le serveur au moment ou l offre est posee.")):_T("Selon la duree choisie.")],
["cadeau",P.info,_T("Un essai gratuit"),
(E?(E.jours+" "+_T("jours de")+" "+((offreDe(E.offre)||{}).nom||"Nexium Pro")+", "):"")+_T("une fois par compte et par appareil, pour ceux qui n ont jamais eu d abonnement. Rien a payer, rien a annuler.")],
["equipe",P.rose||P.mauve,_T("Offrir a un ami"),_T("Donne son pseudo : l offre s allume sur son compte, avec ses credits offerts.")],
["maj",P.cyan,_T("Aucune reconduction"),_T("Tu payes une fois, pour la duree choisie. Rien ne se renouvelle ni ne se preleve tout seul.")],
["bouclierOk",P.danger,_T("Le socle reste gratuit"),_T("Liens dangereux, hameconnage, fichiers pieges, garde console : actifs pour tout le monde, abonne ou pas.")]];
return i("div",null,
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:"12px",marginBottom:"14px"}},
AV.map(function(a,k){return i("div",{key:k,className:"nxab-card",style:{padding:"20px",borderRadius:"20px",
background:"linear-gradient(160deg,"+_NXteinte(a[1],10)+","+P.inset+" 60%)",border:"1px solid "+_NXteinte(a[1],26)}},
_NXFX.pastille(a[0],{col:a[1],taille:38,halo:true}),
i("div",{style:{fontSize:"14.5px",fontWeight:"800",color:P.txt,marginTop:"14px",letterSpacing:"-.01em"}},_NXtr(a[2])),
i("div",{style:{fontSize:"12px",color:P.sub,marginTop:"7px",lineHeight:1.6}},_NXtr(a[3])));})),
_NXcard(i("div",null,
_NXch(_T("Ce que chaque palier ajoute"),_T("Trois domaines, quatre etages chacun. Le premier est gratuit.")),
_NXFX.grille(DOMS.map(domaine),248)),{mb:0}));}

var QUESTIONS=[
[_T("Comment marche l essai gratuit ?"),
_T("Une fois par compte Discord et par appareil, si tu n as jamais eu d abonnement : l offre s ouvre tout de suite, pour quelques jours. Rien a payer, rien a annuler. A la fin, le client revient au socle et tes reglages restent en place.")],
[_T("C est quoi les credits offerts ?"),
_T("Chaque offre verse des credits Nexium IA sur ton compte, pour chaque mois pris. Ils sont depenses avant ton quota habituel, et ils restent meme apres l echeance.")],
[_T("Pourquoi m engager sur plusieurs mois ?"),
_T("Des jours offerts, ajoutes par le serveur au moment ou l offre est posee, et les credits offerts sont verses pour chaque mois.")],
[_T("Suis-je moins protege sans abonnement ?"),
_T("Non. Le socle reste actif pour tout le monde : liens dangereux, hameconnage, fichiers pieges, garde console, coffre anti-vol, telemetrie de base. Un compte sans abonnement est protege ; il l est simplement moins finement qu un compte abonne.")],
[_T("Comment on paie ?"),
_T("Tu ouvres un ticket depuis la page Support : l equipe repond dans le fil et convient du paiement avec toi. Il n y a ni page de paiement ni prelevement automatique : tu payes une fois, pour la duree choisie, et l abonnement s arrete de lui-meme a la date prevue.")],
[_T("Que se passe-t-il a l expiration ?"),
_T("Les protections au-dela de ton niveau se remettent au repos, et la page te le dit. Rien n est efface : si tu reprends un abonnement, tout revient tel que tu l avais regle.")],
[_T("Pourquoi certains ont tout gratuitement ?"),
_T("Parce qu ils utilisaient le client avant que les abonnements existent. Cette promesse-la est inscrite dans la base : leur date de premiere venue est comparee a la date de bascule, et rien dans le client ne peut la changer.")],
[_T("Puis-je forcer une protection sans payer ?"),
_T("Le fichier du client est sur ta machine, donc oui, techniquement. Deux choses limitent la portee : un reglage verrouille trouve actif est remis au repos au demarrage et toutes les cinq minutes ; et pour Nexium IA, la limite est appliquee par le relais, qui ne repondra pas au-dela de ton niveau quoi que fasse le client.")]];
function ongletQuestions(){
return _NXcard(i("div",null,
_NXch(_T("Questions"),_T("Ce qui revient le plus souvent.")),
QUESTIONS.map(function(q,k){var ouvert=faq[0]===k;
return i("div",{key:k,style:{borderTop:k?"1px solid "+P.line:"none"}},
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,"aria-expanded":ouvert?"true":"false",
onClick:function(){faq[1](ouvert?-1:k);},
style:{display:"flex",alignItems:"center",gap:"12px",padding:"15px 2px",cursor:"pointer"}},
i("div",{style:{flex:1,fontSize:"13.5px",fontWeight:"700",color:P.txt}},_NXtr(q[0])),
i("span",{style:{display:"flex",color:P.faint,transform:ouvert?"rotate(45deg)":"none",transition:an?"transform .2s ease":"none"}},_NXFX.svg("plus",14))),
ouvert?i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.7,padding:"0 2px 16px"}},_NXtr(q[1])):null);})),{mb:0});}

var TABS=[["offres",_T("Les offres"),"jeton",(!libre&&fermes>0)?String(fermes):""],
["moi",_T("Mon offre"),"etoile",""],
["avantages",_T("Avantages"),"cadeau",""],
["questions",_T("Questions"),"question",""]];

return i(Kr,null,i("div",{className:"nxab"+(an?" nxab-anim":""),style:{maxWidth:"920px",margin:"0 auto"}},
i("style",null,CSS),
_NXtr(heros()),
_NXFX.onglets(TABS,tab,function(k){onglet[1](k);},{col:P.mauve}),
tab==="offres"?_NXtr(ongletOffres()):
tab==="moi"?_NXtr(ongletMoi()):
tab==="avantages"?_NXtr(ongletAvantages()):_NXtr(ongletQuestions()),
_NXfoot(_NXtr("Nexium Abonnement ")+_NXtr(String.fromCharCode(0xB7))+" "+
(A.err?_T("etat lu depuis la derniere reponse connue"):_T("etat verifie sur le serveur")))));
}
