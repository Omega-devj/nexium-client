var _NXADOPT=window._NXADOPT||(window._NXADOPT={});
if(!_NXADOPT.boot){try{_NXADOPT.boot=true;
// Faire servir ce qui est construit.
//
// Le probleme est mesurable et il est genant : le detecteur de manipulation,
// la carte du contexte, le veilleur, le repondant -- tout ca existe, et rien
// de tout ca ne se declenche tant que personne ne coche une case dans un
// onglet que personne n ouvre. Du code parfait que personne n utilise ne vaut
// pas un code moyen qu on trouve.
//
// La reponse habituelle est une fenetre au demarrage. C est la mauvaise
// reponse, et on vient justement d en retirer six : une annonce a l ouverture
// arrive au moment ou l utilisateur veut lire ses messages, elle parle d une
// chose dont il n a pas besoin maintenant, et elle se fait fermer sans etre
// lue. Pire, elle apprend a fermer les fenetres de Nexium sans regarder.
//
// Deux leviers ici, et aucun des deux n est une annonce.
//
//   1. LE POINT NEUF. Une entree qui a change recemment et ou tu n es pas
//      retourne depuis porte un point dans la colonne des reglages. Il
//      disparait a la premiere visite, pour toujours. Ca ne coupe la parole a
//      personne, ca se voit au moment ou on cherche quelque chose, et ca dit
//      une chose vraie : "quelque chose a bouge ici depuis ta version, et tu
//      n y es pas repasse".
//
//   2. L INVITATION MERITEE. Une fonction ne se propose qu au moment ou elle
//      AURAIT AGI, en disant ce qu elle aurait fait. "Nexium a repere trois
//      procedes dans cette conversation ; la branche 2.0 peut te dire ce que
//      cette personne cherche" se lit au moment ou ca compte. La meme phrase
//      dans un onglet de reglages ne veut rien dire.
//
// Et trois bornes, parce qu un bon mecanisme d adoption devient une nuisance
// exactement comme les autres :
//   - une invitation par session, jamais deux ;
//   - deux fois en tout pour une invitation donnee, puis plus jamais ;
//   - un refus est definitif. Pas "plus tard" : jamais.
_NXADOPT.KEY="nexium_adoption";
_NXADOPT.KVUS="nexium_pages_vues";
_NXADOPT.FENETRE=2;     // "recent" veut dire : pose dans l une des 2 dernieres versions
_NXADOPT.MAXPROP=2;     // deux invitations pour une meme fonction, en tout
_NXADOPT.listeners=[];
_NXADOPT.notify=function(){for(var a=0;a<_NXADOPT.listeners.length;a++){try{_NXADOPT.listeners[a]();}catch(_){}}};

_NXADOPT.cfg=(function(){try{
var r=_NXDB.get(_NXADOPT.KEY);var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")d={};
if(typeof d.points!=="boolean")d.points=true;
// La case qui coupe tout. Elle existe parce qu un mecanisme d adoption qu on
// ne peut pas eteindre finit par etre subi.
if(typeof d.invitations!=="boolean")d.invitations=true;
if(!d.prop||typeof d.prop!=="object")d.prop={};    // combien de fois proposee
if(!d.refus||typeof d.refus!=="object")d.refus={}; // refusee, donc terminee
return d;}catch(_){return {points:true,invitations:true,prop:{},refus:{}};}})();
_NXADOPT.save=function(){try{_NXDB.set(_NXADOPT.KEY,JSON.stringify(_NXADOPT.cfg));}catch(_){}};
_NXADOPT.set=function(k,v){try{_NXADOPT.cfg[k]=!!v;_NXADOPT.save();_NXADOPT.notify();}catch(_){}};

// ------------------------------------------------------- 1. le point neuf
// La version ou chaque entree est apparue. Une entree absente de cette table
// n est jamais neuve : on ne met pas de point sur ce qui a toujours ete la.
// Les cles sont celles des entrees reelles de la colonne, relevees dans le
// registre -- pas devinees. Une cle qui n existe pas ne ferait rien de
// visible, et le point ne serait jamais retire.
_NXADOPT.NEUFS={
"equicord_ultra":204,
"equicord_reglages":203,
"equicord_labo":201,
"equicord_outils":201,
"equicord_vocal":200,
"equicord_repaire":200,
"equicord_ia":192,
"equicord_abo":203,
"equicord_ticket":203
};
_NXADOPT.vus=(function(){try{
var r=_NXDB.get(_NXADOPT.KVUS);var d=r?JSON.parse(r):null;
return (d&&typeof d==="object")?d:{};}catch(_){return {};}})();
_NXADOPT.version=function(){try{
return parseInt((window._NXUP&&_NXUP.VERSION)||"0",10)||0;}catch(_){return 0;}};
// Une entree est neuve si elle est recente ET jamais ouverte. Les deux
// conditions comptent : sans la seconde le point ne partirait jamais, sans la
// premiere une page ignoree depuis deux ans en porterait un pour toujours.
// La version a laquelle une entree a ete vue. Une trace d avant la v203 est
// un horodatage : elle vaut, au plus tard, la v202.
_NXADOPT.vuPour=function(cle){try{
var x=_NXADOPT.vus[cle];if(!x)return 0;
if(typeof x==="string"&&x.charAt(0)==="v")return parseInt(x.slice(1),10)||0;
return 202;}catch(_){return 0;}};
_NXADOPT.estNeuf=function(cle){try{
if(!_NXADOPT.cfg.points)return false;
var v=_NXADOPT.NEUFS[cle];
if(!v)return false;
if(_NXADOPT.vus[cle]&&_NXADOPT.vuPour(cle)>=v)return false;
var moi=_NXADOPT.version();
if(!moi)return true;
return (moi-v)<=_NXADOPT.FENETRE;}catch(_){return false;}};
_NXADOPT.marque=function(cle){try{
if(!cle)return false;
var mv=_NXADOPT.version()||0;
if(_NXADOPT.vus[cle]&&_NXADOPT.vuPour(cle)>=Math.max(mv,_NXADOPT.NEUFS[cle]||0))return false;
_NXADOPT.vus[cle]="v"+Math.max(mv,_NXADOPT.NEUFS[cle]||0);
_NXDB.set(_NXADOPT.KVUS,JSON.stringify(_NXADOPT.vus));
_NXADOPT.notify();
return true;}catch(_){return false;}};
// Le titre tel qu il s affiche dans la colonne. Un point, pas un mot : "NEW"
// en capitales crie, un point se remarque sans hausser le ton.
_NXADOPT.POINT=String.fromCharCode(0x2022);
_NXADOPT.titre=function(cle,base){try{
var b=String(base||"");
return _NXADOPT.estNeuf(cle)?(b+"  "+_NXADOPT.POINT):b;}catch(_){return String(base||"");}};
_NXADOPT.combienNeufs=function(){try{
var n=0,k;
for(k in _NXADOPT.NEUFS)if(_NXADOPT.estNeuf(k))n++;
return n;}catch(_){return 0;}};

// --------------------------------------------------- 2. l invitation meritee
_NXADOPT.unePar=false;      // une seule par session, remise a zero au demarrage
_NXADOPT.encours=null;
// Peut-on proposer ceci, maintenant ?
_NXADOPT.peut=function(k){try{
if(!_NXADOPT.cfg.invitations)return false;
if(_NXADOPT.unePar)return false;              // deja parle cette session
if(_NXADOPT.cfg.refus[k])return false;        // un refus est definitif
if((_NXADOPT.cfg.prop[k]||0)>=_NXADOPT.MAXPROP)return false;
// Jamais par-dessus autre chose.
try{if(window._NXQ&&!_NXQ.libre())return false;}catch(_){}
return true;}catch(_){return false;}};

// Proposer quelque chose dont on n a pas le droit serait une publicite, pas une
// invitation. On ne propose la branche 2.0 qu a ceux qui y ont acces.
_NXADOPT.eligible2=function(){try{
return !!(window._NXIA2&&_NXIA2.eligible());}catch(_){return false;}};

_NXADOPT.noteProp=function(k){try{
_NXADOPT.cfg.prop[k]=(_NXADOPT.cfg.prop[k]||0)+1;
_NXADOPT.unePar=true;_NXADOPT.save();}catch(_){}};
_NXADOPT.refuse=function(k){try{
_NXADOPT.cfg.refus[k]=Date.now();_NXADOPT.save();
_NXADOPT.encours=null;_NXADOPT.notify();}catch(_){}};
_NXADOPT.oublie=function(k){try{
delete _NXADOPT.cfg.refus[k];delete _NXADOPT.cfg.prop[k];
_NXADOPT.save();_NXADOPT.notify();}catch(_){}};

// Montrer. Une carte, pas un voile : elle ne prend pas l ecran, elle ne bloque
// rien, et elle s en va si on l ignore.
_NXADOPT.montre=function(inv){try{
if(!_NXADOPT.peut(inv.k))return false;
_NXADOPT.noteProp(inv.k);
_NXADOPT.encours={k:inv.k,titre:inv.titre,texte:inv.texte,
bouton:inv.bouton||"Activer",quand:Date.now(),faire:inv.faire||null};
_NXADOPT.notify();
// Faute de carte a l ecran, on passe par le canal qui existe : mieux vaut une
// phrase vue qu une belle carte que personne n a ecrite.
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr(inv.titre)+" "+_NXtr(inv.texte),0);}catch(_){}
return true;}catch(_){return false;}};
_NXADOPT.accepte=function(){try{
var e=_NXADOPT.encours;
if(!e)return false;
if(e.faire)e.faire();
_NXADOPT.encours=null;_NXADOPT.notify();
return true;}catch(_){return false;}};

// ----------------------------------------------------------- les moments
// Le detecteur vient de signaler une conversation, et la branche 2.0 est
// fermee. C est le seul instant ou expliquer ce que 2.0 apporte a un sens :
// il y a une vraie conversation, un vrai score, et un vrai service a rendre.
_NXADOPT.momentManip=function(f){try{
if(!f||!f.tactiques||!f.tactiques.length)return false;
if(!_NXADOPT.eligible2())return false;
if(window._NXIA2&&_NXIA2.on("manip"))return false;   // deja active : rien a dire
var n=f.tactiques.length;
return _NXADOPT.montre({k:"ia2-manip",
titre:"Nexium a repere "+n+" procede"+(n>1?"s":"")+" dans cette conversation.",
texte:"La branche 2.0 peut te dire en deux phrases ce que cette personne "+
"cherche a obtenir, et quoi ne pas repondre.",
bouton:"Activer Nexium IA 2.0",
faire:function(){try{_NXIA2.set("actif",true);
if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Nexium IA 2.0 est active. ")+
_NXtr("Tu peux choisir quoi lui autoriser dans Nexium IA."),0);}catch(_){}}});}catch(_){return false;}};

// Une page a de l aide que personne n a jamais depliee. On le dit une fois,
// a la troisieme visite : au premier passage on explore, au troisieme on
// cherche vraiment quelque chose.
_NXADOPT.visites={};
_NXADOPT.momentAide=function(cle,nom){try{
_NXADOPT.visites[cle]=(_NXADOPT.visites[cle]||0)+1;
if(_NXADOPT.visites[cle]!==3)return false;
if(!window._NXAIDES||!_NXAIDES[cle])return false;
return _NXADOPT.montre({k:"aide:"+cle,
titre:"Cette page a une explication courte.",
texte:"Le bouton en haut de "+(nom||"la page")+" deplie trois phrases : "+
"ce qu elle fait, ce que ca change chez toi, et ce qu elle ne fait jamais.",
bouton:"Compris"});}catch(_){return false;}};

_NXADOPT.etat=function(){try{
return {points:_NXADOPT.cfg.points,invitations:_NXADOPT.cfg.invitations,
neufs:_NXADOPT.combienNeufs(),encours:!!_NXADOPT.encours,
propositions:_NXADOPT.cfg.prop,refus:_NXADOPT.cfg.refus};}catch(_){return {};}};
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXADOPT");if(window._NXERR)_NXERR.push("module _NXADOPT :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXADOPT desactive:",_nxE);}catch(_){}}
}
