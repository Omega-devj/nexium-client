var _NXCTX=window._NXCTX||(window._NXCTX={});
if(!_NXCTX.boot){try{_NXCTX.boot=true;
// La carte de ton monde.
//
// A chaque question, l assistant repartait de zero : il ne savait pas quels
// serveurs tu frequentes, a quelle heure tu vis, de quoi tu parles, ni dans
// quel etat est ton client. Il repondait donc juste mais hors sol.
//
// Ce module n observe RIEN de nouveau. Tout ce qu il lit est deja compte par
// Nexium Stats depuis des mois -- serveurs, salons, mots recurrents, rythme
// de la semaine -- et par les modules de protection. Il assemble, il ne
// collecte pas. C est important : ajouter un observateur sur chaque message
// recu serait la chose la plus couteuse qu on puisse faire sur une petite
// machine, et ce serait inutile.
//
// Et il ne part jamais en entier. `resume()` produit quelques centaines de
// caracteres -- pas la carte, une vue de la carte.
_NXCTX.KEY="nexium_contexte";
_NXCTX.MAXRESUME=700;

// Les mots trop courants pour dire quoi que ce soit de toi.
_NXCTX.VIDES=("le la les un une des de du au aux et ou mais donc or ni car que "+
"qui quoi dont ou a en y il elle ils elles on nous vous je tu me te se ce cet "+
"cette ces mon ma mes ton ta tes son sa ses notre nos votre vos leur leurs "+
"pas plus moins tres bien mal tout tous toute toutes meme aussi alors "+
"comme pour par sur sous dans avec sans chez vers entre est sont etait "+
"ete avoir etre fait faire dit dire va vais vas ok oui non merci bonjour "+
"salut voila juste quand si deja encore jamais toujours peut peux "+
"http https www com fr gg discord").split(" ");

_NXCTX.motVide=function(m){try{
if(!m||m.length<4)return true;
if(/^\\d+$/.test(m))return true;
for(var a=0;a<_NXCTX.VIDES.length;a++)if(_NXCTX.VIDES[a]===m)return true;
return false;}catch(_){return true;}};

// Les n premieres cles d un objet {cle: nombre}, par valeur decroissante.
_NXCTX.tete=function(obj,n,filtre){try{
var L=[],k;
for(k in obj){
if(!obj.hasOwnProperty(k))continue;
if(filtre&&!filtre(k))continue;
var v=obj[k];
if(typeof v!=="number"||v<=0)continue;
L.push([k,v]);}
L.sort(function(x,y){return y[1]-x[1];});
return L.slice(0,n||5);}catch(_){return [];}};

// ------------------------------------------------------------------ les lieux
_NXCTX.lieux=function(){try{
var S=window._NXS;
if(!S||!S.data)return {serveurs:[],salons:[]};
return {serveurs:_NXCTX.tete(S.data.guilds,5),
salons:_NXCTX.tete(S.data.channels,5)};}catch(_){return {serveurs:[],salons:[]};}};

// ----------------------------------------------------------------- le rythme
// `heat` est une grille de sept jours. On en tire deux choses lisibles : le
// jour le plus charge, et la tranche horaire ou tu vis.
_NXCTX.JOURS=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
_NXCTX.rythme=function(){try{
var S=window._NXS;
if(!S||!S.data||!S.data.heat||!S.data.heat.length)return null;
var H=S.data.heat,j,h;
var parJour=[],parHeure=[];
for(j=0;j<H.length;j++){
var lig=H[j]||[],tot=0;
for(h=0;h<lig.length;h++){
var v=lig[h]||0;tot+=v;
parHeure[h]=(parHeure[h]||0)+v;}
parJour.push(tot);}
var mj=0,mh=0,a;
for(a=0;a<parJour.length;a++)if(parJour[a]>parJour[mj])mj=a;
for(a=0;a<parHeure.length;a++)if((parHeure[a]||0)>(parHeure[mh]||0))mh=a;
var total=0;for(a=0;a<parJour.length;a++)total+=parJour[a];
if(!total)return null;
// Nuit, matin, apres-midi, soir : quatre mots valent mieux qu un histogramme.
var tranche=mh<6?"la nuit":(mh<12?"le matin":(mh<18?"l apres-midi":"le soir"));
return {jour:_NXCTX.JOURS[mj]||"",heure:mh,tranche:tranche};}catch(_){return null;}};

// ----------------------------------------------------------------- les sujets
_NXCTX.sujets=function(n){try{
var S=window._NXS;
if(!S||!S.data||!S.data.words)return [];
return _NXCTX.tete(S.data.words,n||8,function(m){return !_NXCTX.motVide(String(m).toLowerCase());})
.map(function(x){return x[0];});}catch(_){return [];}};

// ------------------------------------------------------------------- toi
_NXCTX.client=function(){try{
var o={version:(window._NXUP&&_NXUP.VERSION)||"",protect:0,privacy:0,abo:null};
try{var c=_NXPR.cfg,k;for(k in c)if(c[k]===true)o.protect++;}catch(_){}
try{var p=_NXP.cfg,k2;for(k2 in p)if(p[k2]===true)o.privacy++;}catch(_){}
try{if(window._NXABO){var e=_NXABO.courant();
if(e)o.abo={pionnier:!!e.pionnier,admin:!!e.admin,
niveaux:e.niveaux||null,offres:(e.offres||[]).length};}}catch(_){}
try{var S=window._NXS;if(S&&S.data){
o.messages=S.data.msgCount||0;
o.vocal=Math.round((S.data.voice||0)/60);}}catch(_){}
return o;}catch(_){return {};}};

// --------------------------------------------------------------- la vue
// Ce qui part reellement avec une question. Court, factuel, et sans un seul
// contenu de message : des noms de lieux, des mots frequents, des nombres.
_NXCTX.resume=function(){try{
if(window._NXIA2&&!_NXIA2.on("contexte"))return "";
var L=_NXCTX.lieux(),R=_NXCTX.rythme(),S=_NXCTX.sujets(6),C=_NXCTX.client();
var out=[];
if(L.serveurs.length)
out.push("Serveurs frequentes : "+L.serveurs.map(function(x){return x[0];}).join(", ")+".");
if(L.salons.length)
out.push("Salons habituels : "+L.salons.map(function(x){return x[0];}).join(", ")+".");
if(R)out.push("Plutot actif "+R.tranche+", surtout le "+R.jour+".");
if(S.length)out.push("Mots qui reviennent : "+S.join(", ")+".");
var etat=[];
if(C.version)etat.push("client v"+C.version);
if(C.protect)etat.push(C.protect+" protections actives");
if(C.privacy)etat.push(C.privacy+" reglages de confidentialite actifs");
if(C.messages)etat.push(C.messages+" messages comptes");
if(etat.length)out.push("Etat : "+etat.join(", ")+".");
if(C.abo){
if(C.abo.pionnier)out.push("Compte des debuts : tout est ouvert.");
else if(C.abo.admin)out.push("Compte d equipe.");
else if(C.abo.niveaux)out.push("Niveaux : IA "+C.abo.niveaux.ia+
", Protect "+C.abo.niveaux.pr+", Privacy "+C.abo.niveaux.pv+".");}
var t=out.join(" ");
return t.length>_NXCTX.MAXRESUME?t.slice(0,_NXCTX.MAXRESUME-1)+String.fromCharCode(0x2026):t;
}catch(_){return "";}};

// Ce que la page montre : la meme chose, mais en morceaux affichables.
_NXCTX.carte=function(){try{
return {lieux:_NXCTX.lieux(),rythme:_NXCTX.rythme(),
sujets:_NXCTX.sujets(10),client:_NXCTX.client(),
resume:_NXCTX.resume(),taille:_NXCTX.resume().length};}catch(_){return {};}};

// Tout effacer. La carte n est qu une lecture de Nexium Stats : l oubli
// veritable passe donc par la remise a zero des statistiques, et on le dit.
_NXCTX.source=function(){return "Nexium Stats";};
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXCTX");if(window._NXERR)_NXERR.push("module _NXCTX :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXCTX desactive:",_nxE);}catch(_){}}
}
