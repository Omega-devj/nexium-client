var _NXVEIL=window._NXVEIL||(window._NXVEIL={});
if(!_NXVEIL.boot){try{_NXVEIL.boot=true;
// L IA qui veille.
//
// Un assistant qui attend qu on lui parle ne sert qu a ceux qui savent quoi
// demander. Celui-la regarde de lui-meme -- et c est exactement pour ca qu il
// est dangereux : une veille mal reglee bavarde, agace, et vide un quota
// d API en une matinee.
//
// Trois regles tiennent tout le module :
//
//   1. REGARDER NE COUTE RIEN. La ronde ne lit que des compteurs deja tenus
//      par le client : les fils signales par le detecteur, le plancher de
//      version, les tickets non lus, le rythme calcule par le contexte. Aucune
//      requete, jamais, pour decider s il y a quelque chose a dire.
//
//   2. PRESQUE RIEN NE MERITE UN APPEL. "Tu as trois tickets avec une reponse"
//      est une phrase que le client sait ecrire seul. Trois des quatre
//      situations surveillees donnent donc un avis purement local, gratuit.
//      Une seule merite du langage : un fil que le detecteur a signale et
//      auquel tu as repondu quand meme. La, deux phrases de jugement valent
//      mieux qu un bandeau de plus.
//
//   3. UNE FOIS PAR JOUR AU MAXIMUM, et le compteur est celui du budget
//      automatique de la branche 2.0 -- pas ton quota de questions. Quand le
//      plafond est atteint, la veille se tait jusqu au lendemain. Elle
//      n insiste pas, elle ne rattrape pas son retard.
//
// Et elle n envoie JAMAIS le contenu d un message. Ce qui part, c est le nom
// des procedes reperes -- "urgence fabriquee, autorite revendiquee" -- et la
// vue du contexte. Trois consequences : la demande est minuscule, aucune
// conversation privee ne quitte la machine, et rien de ce qu un inconnu a
// ecrit n entre dans la consigne du modele. Ce dernier point n est pas un
// detail : envoyer le message lui-meme, ce serait laisser l arnaqueur ecrire
// dans le prompt.
_NXVEIL.KEY="nexium_veille";
_NXVEIL.KJOUR="nexium_veille_jour";
_NXVEIL.PERIODE=1800000;     // une ronde toutes les 30 minutes
_NXVEIL.PREMIERE=20000;      // la premiere, 20 s apres le demarrage
_NXVEIL.REPOSAVIS=43200000;  // 12 h avant de redire la meme chose
_NXVEIL.MAXJOUR=1;           // un appel au relais par jour, au plus
_NXVEIL.MAXAVIS=12;
_NXVEIL.listeners=[];
_NXVEIL.notify=function(){for(var a=0;a<_NXVEIL.listeners.length;a++){try{_NXVEIL.listeners[a]();}catch(_){}}};

// Chaque situation surveillee a sa case. "tout doit etre a cocher" : une veille
// qu on ne peut pas borner est une veille qu on finit par couper en entier.
_NXVEIL.cfg=(function(){try{
var r=_NXDB.get(_NXVEIL.KEY);var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")d={};
if(typeof d.manip!=="boolean")d.manip=true;
if(typeof d.client!=="boolean")d.client=true;
if(typeof d.tickets!=="boolean")d.tickets=true;
// Le rythme parle de ta vie, pas de ton client. Il est donc ferme par defaut :
// c est a toi de decider si tu veux qu on te fasse remarquer tes nuits.
if(typeof d.rythme!=="boolean")d.rythme=false;
// Sans cette case, la veille reste entierement gratuite et muette au relais.
if(typeof d.relais!=="boolean")d.relais=true;
return d;}catch(_){return {manip:true,client:true,tickets:true,rythme:false,relais:true};}})();
_NXVEIL.save=function(){try{_NXDB.set(_NXVEIL.KEY,JSON.stringify(_NXVEIL.cfg));}catch(_){}};
_NXVEIL.set=function(k,v){try{_NXVEIL.cfg[k]=!!v;_NXVEIL.save();_NXVEIL.notify();}catch(_){}};
// La veille entiere depend de la branche 2.0 : sa case maitresse est la-bas.
_NXVEIL.actif=function(){try{
return !!(window._NXIA2&&_NXIA2.on("veille"));}catch(_){return false;}};

// ------------------------------------------------------------- la memoire
// Ce dont on a deja parle, et quand. Persistant : redemarrer le client ne doit
// pas rendre a la veille le droit de tout repeter.
_NXVEIL.KDITS="nexium_veille_dits";
_NXVEIL.dits=(function(){try{
var r=_NXDB.get(_NXVEIL.KDITS);var d=r?JSON.parse(r):null;
return (d&&typeof d==="object")?d:{};}catch(_){return {};}})();
_NXVEIL.noteDit=function(cle){try{
_NXVEIL.dits[cle]=Date.now();
// On ne garde que ce qui est encore frais, sinon le trousseau grossit sans fin.
var k,n=0;
for(k in _NXVEIL.dits){
if((Date.now()-_NXVEIL.dits[k])>(7*86400000))delete _NXVEIL.dits[k];else n++;}
if(n>60)_NXVEIL.dits={};
_NXDB.set(_NXVEIL.KDITS,JSON.stringify(_NXVEIL.dits));}catch(_){}};
_NXVEIL.dejaDit=function(cle,repos){try{
var q=_NXVEIL.dits[cle];
if(!q)return false;
return (Date.now()-q)<(repos||_NXVEIL.REPOSAVIS);}catch(_){return false;}};

// ---------------------------------------------------------- le compteur du jour
_NXVEIL.jour=function(){try{
var d=new Date();
return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();}catch(_){return "0";}};
_NXVEIL.parleTotal=function(){try{
var r=_NXDB.get(_NXVEIL.KJOUR);var d=r?JSON.parse(r):null;
if(!d||d.j!==_NXVEIL.jour())return 0;
return parseInt(d.n,10)||0;}catch(_){return 0;}};
_NXVEIL.peutParler=function(){try{
if(!_NXVEIL.cfg.relais)return false;
if(_NXVEIL.parleTotal()>=_NXVEIL.MAXJOUR)return false;
// Le budget automatique de la branche 2.0 a le dernier mot.
return !!(window._NXIA2&&_NXIA2.reste()>0);}catch(_){return false;}};
_NXVEIL.noteParle=function(){try{
_NXDB.set(_NXVEIL.KJOUR,JSON.stringify({j:_NXVEIL.jour(),n:_NXVEIL.parleTotal()+1}));
}catch(_){}};

// ------------------------------------------------------------- ce qu on voit
// Les fils que le detecteur a signales fort, et auxquels tu as repondu. C est
// la seule situation ou une phrase de l assistant sert encore a quelque chose :
// le bandeau est deja passe, et il n a pas suffi.
_NXVEIL.filsChauds=function(){try{
if(!window._NXMAN||!_NXMAN.fils)return [];
var out=[],k;
for(k in _NXMAN.fils){
var f=_NXMAN.fils[k];
if(!f||!f.tactiques||!f.tactiques.length)continue;
if(f.score<_NXMAN.SEUIL_FORT)continue;
if(!f.repondu)continue;
out.push(f);}
out.sort(function(a,b){return b.score-a.score;});
return out;}catch(_){return [];}};

// La ronde. Elle rend une liste d avis, classes par poids. Tout est lu dans des
// compteurs deja tenus : la ronde entiere coute quelques microsecondes.
_NXVEIL.regarde=function(){try{
var out=[];

if(_NXVEIL.cfg.manip){
var ch=_NXVEIL.filsChauds(),i;
for(i=0;i<ch.length&&i<3;i++){
var f=ch[i],noms=[],a;
for(a=0;a<f.tactiques.length&&a<4;a++)noms.push(f.tactiques[a].n);
// Le poids baisse d un cran par fil : le plus grave passe devant, mais
// les autres restent dans la liste et sortiront aux rondes suivantes.
out.push({k:"manip",cle:"manip:"+f.id,poids:100-i,fil:f,vautUnMot:true,
titre:"Une conversation a laquelle tu as repondu",
texte:"Nexium y a repere "+noms.join(", ").toLowerCase()+
". Tu as repondu depuis.",procedes:noms});}}

if(_NXVEIL.cfg.client){
try{if(window._NXUP&&_NXUP.obsolete()){
out.push({k:"version",cle:"version:"+(_NXUP.plancher||0),poids:80,
titre:"Ton client est en dessous du plancher",
texte:"Une version minimale a ete posee par l equipe. Tant que tu n as pas "+
"mis a jour, certaines choses ne repondront plus."});}}catch(_){}
// Un client dont toutes les protections sont fermees n est plus protege, et
// c est le genre de chose qu on decouvre trop tard.
try{var n=0,k2;
for(k2 in _NXPR.cfg)if(_NXPR.cfg[k2]===true)n++;
if(n===0)out.push({k:"protect",cle:"protect",poids:70,
titre:"Aucune protection active",
texte:"Toutes les protections sont fermees. Le client ne verifie plus rien "+
"pour toi."});}catch(_){}}

if(_NXVEIL.cfg.tickets){
try{if(window._NXTK){
var nl=_NXTK.nonLus();
if(nl.length)out.push({k:"tickets",cle:"tickets:"+nl.length,poids:60,
titre:(nl.length===1?"Une reponse t attend":(nl.length+" reponses t attendent")),
texte:"L equipe a repondu sur "+(nl.length===1?"ton ticket":"tes tickets")+
". Personne ne relancera a ta place."});}}catch(_){}}

if(_NXVEIL.cfg.rythme){
try{var R=window._NXCTX&&_NXCTX.rythme();
if(R&&R.tranche==="la nuit")out.push({k:"rythme",cle:"rythme:nuit",poids:20,
titre:"Tu vis surtout la nuit",
texte:"L essentiel de ton activite tombe entre minuit et six heures. "+
"C est une observation, pas un reproche."});}catch(_){}}

out.sort(function(a,b){return b.poids-a.poids;});
return out;}catch(_){return [];}};

// -------------------------------------------------------------- ce qu on dit
_NXVEIL.avis=[];
_NXVEIL.montre=function(av){try{
_NXVEIL.avis.unshift({k:av.k,titre:av.titre,texte:av.texte,quand:Date.now(),mot:av.mot||""});
if(_NXVEIL.avis.length>_NXVEIL.MAXAVIS)_NXVEIL.avis.length=_NXVEIL.MAXAVIS;
_NXVEIL.noteDit(av.cle);
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr(av.titre)+" : "+_NXtr(av.texte),0);}catch(_){}
_NXVEIL.notify();}catch(_){}};

// L unique appel. Deux phrases, un modele rapide, et le nom des procedes --
// jamais un mot de la conversation.
_NXVEIL.CONSIGNE="Tu es la veille de Nexium. Tu ecris deux phrases en francais, "+
"sans preambule, sans liste, sans alarmisme. Tu parles a la personne concernee.";
_NXVEIL.mot=function(av){try{
if(!window._NXIA||!_NXIA.URL)return Promise.resolve("");
if(!_NXVEIL.peutParler())return Promise.resolve("");
// On reserve AVANT d appeler. Si le reseau tombe, l unite est perdue pour la
// journee : c est voulu. Un echec qui ne coute rien se reessaie en boucle, et
// une boucle de reessais est exactement ce qu on ne peut pas se permettre.
if(!_NXIA2.depense(1))return Promise.resolve("");
_NXVEIL.noteParle();
var ctx="";
try{if(window._NXCTX)ctx=_NXCTX.resume();}catch(_){}
var dem="Dans une conversation privee, Nexium a repere ces procedes : "+
(av.procedes||[]).join(", ")+". La personne a quand meme repondu a son "+
"interlocuteur. Dis-lui ce que cet interlocuteur cherche a obtenir, et la "+
"seule chose a ne surtout pas faire maintenant."+
(ctx?(" Pour situer, sans le commenter : "+ctx):"");
var corps={palier:"B",reflexion:"rapide",moi:_NXIA.moi(),
messages:[{role:"system",content:_NXVEIL.CONSIGNE},{role:"user",content:dem}]};
return _NXNETX.go(_NXIA.URL,{method:"POST",
headers:{"Content-Type":"application/json"},body:JSON.stringify(corps)},12000)
.then(function(r){return r.text();})
.then(function(txt){
var j=null;try{j=JSON.parse(txt);}catch(_){}
return String((j&&j.content)||"").trim().slice(0,400);})
.then(null,function(){return "";});}catch(_){return Promise.resolve("");}};

// ------------------------------------------------------------------ la ronde
_NXVEIL.ronde=function(){try{
if(!_NXVEIL.actif())return;
// Jamais par-dessus un voile : la veille est la derniere chose qui doit
// s inviter pendant un ecran d accueil ou une mise a jour.
try{if(window._NXQ&&!_NXQ.libre())return;}catch(_){}
var L=_NXVEIL.regarde(),a;
for(a=0;a<L.length;a++){
var av=L[a];
if(_NXVEIL.dejaDit(av.cle))continue;
// Une situation qui merite du langage, et le droit de le payer.
if(av.vautUnMot&&_NXVEIL.peutParler()){
_NXVEIL.mot(av).then(function(m){try{
if(m)av.mot=m;
_NXVEIL.montre(av);}catch(_){}});
return;}
_NXVEIL.montre(av);
return;}            // un seul avis par ronde, quoi qu il arrive
}catch(_){}};

_NXVEIL.etat=function(){try{
return {actif:_NXVEIL.actif(),cfg:_NXVEIL.cfg,
vus:_NXVEIL.regarde().length,avis:_NXVEIL.avis.length,
parleAujourdhui:_NXVEIL.parleTotal(),plafond:_NXVEIL.MAXJOUR,
peutParler:_NXVEIL.peutParler()};}catch(_){return {};}};

_NXVEIL.demarre=function(){try{
_NXVEIL.ronde();
if(!_NXVEIL._minuterie)_NXVEIL._minuterie=setInterval(_NXVEIL.ronde,_NXVEIL.PERIODE);
}catch(_){}};
try{setTimeout(_NXVEIL.demarre,_NXVEIL.PREMIERE);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXVEIL");if(window._NXERR)_NXERR.push("module _NXVEIL :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXVEIL desactive:",_nxE);}catch(_){}}
}
