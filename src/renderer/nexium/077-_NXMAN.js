var _NXMAN=window._NXMAN||(window._NXMAN={});
if(!_NXMAN.boot){try{_NXMAN.boot=true;
// Le detecteur de manipulation.
//
// Protect examine des LIENS. Il ne voit rien quand quelqu un te manipule en
// francais correct sans jamais coller d adresse -- et c est la majorite des
// arnaques qui font mal. Ce module lit la FORME de l echange : l urgence,
// l autorite revendiquee, l isolement, la reciprocite, l escalade.
//
// Deux etages, et c est volontaire :
//
//   1. Le calcul du score est entierement local. Des expressions, des
//      compteurs, aucune requete. Il marche pour tout le monde, gratuitement,
//      hors ligne, et il ne coute rien au relais.
//   2. L explication par l assistant -- "voila ce que cette personne est en
//      train de faire" -- est un bouton. C est l utilisateur qui la demande,
//      donc elle se paye sur son quota habituel, pas sur le budget
//      automatique.
//
// Et il ne regarde que les messages PRIVES, et jamais ceux d un ami :
// examiner toutes les conversations de tous les serveurs serait couteux,
// inutile et indiscret, et soupconner ses propres amis serait pire.
_NXMAN.KEY="nexium_manip";
_NXMAN.SEUIL=45;          // au-dela, on previent
_NXMAN.SEUIL_FORT=70;     // au-dela, on insiste
_NXMAN.MAXFILS=40;
_NXMAN.listeners=[];
_NXMAN.notify=function(){for(var a=0;a<_NXMAN.listeners.length;a++){try{_NXMAN.listeners[a]();}catch(_){}}};

_NXMAN.cfg=(function(){try{
var r=_NXDB.get(_NXMAN.KEY);var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")d={};
if(typeof d.on!=="boolean")d.on=true;
if(typeof d.bandeau!=="boolean")d.bandeau=true;
return d;}catch(_){return {on:true,bandeau:true};}})();
_NXMAN.save=function(){try{_NXDB.set(_NXMAN.KEY,JSON.stringify(_NXMAN.cfg));}catch(_){}};
_NXMAN.set=function(k,v){try{_NXMAN.cfg[k]=!!v;_NXMAN.save();_NXMAN.notify();}catch(_){}};

// Sans accents et sans ponctuation : "dépêche-toi" et "depeche toi" sont la
// meme tentative.
_NXMAN.plat=function(x){try{
var t=String(x||"").toLowerCase();
if(t.normalize)t=t.normalize("NFD").replace(/[̀-ͯ]/g,"");
return t.replace(/[^a-z0-9@:\/\. ]+/g," ").replace(/\s+/g," ");}catch(_){
return String(x||"").toLowerCase();}};

// Les tactiques. Chacune porte un poids, un nom lisible, et ce qu elle
// cherche a obtenir -- parce qu un avertissement qui ne dit pas POURQUOI ne
// sert a rien.
_NXMAN.TACTIQUES=[
{k:"urgence",p:18,n:"Urgence fabriquee",
q:"T empecher de reflechir en te donnant une limite de temps.",
re:/\b(vite|urgent|urgence|depeche(r|z|s)?|rapidement|tout de suite|maintenant ou jamais|dans (5|10|15|cinq|dix) minutes|avant ce soir|derniere chance|il ne reste que|expire|quick|hurry|asap|right now|last chance|expires|act now|limited time|running out|only (5|10|15|five|ten) minutes|before (tonight|midnight))\b/},
{k:"autorite",p:22,n:"Autorite revendiquee",
q:"Te faire obeir en se presentant comme quelqu un d officiel.",
re:/\b(je (suis|fais partie|travaille pour) (du |de la |de l |d |un |une |le |la |l )?(staff|equipe|admin|administrateur|moderateur|modo|support|dev|developpeur|securite|verification)|equipe (discord|de discord|officielle)|support officiel|agent discord|verification du compte|i (am|m) (from |part of |with |on )?(the )?(staff|team|admin|administrator|moderator|support|security)|discord (staff|team|support|security|safety)|official support|account verification|system message|automated message from discord)\b/},
{k:"isolement",p:20,n:"Mise a l ecart",
q:"Te couper des gens qui pourraient te dire que c est une arnaque.",
re:/\b(viens en (mp|prive|dm)|passe en (mp|prive|dm)|supprime (ce |le )?message|n en parle a personne|reste entre nous|ne dis rien a|efface (la|ca) apres|come to (my )?(dm|dms)|dm me|move to (dm|dms)|delete (this|the) message|don t tell anyone|keep (this|it) between us|delete it after)\b/},
{k:"reciprocite",p:14,n:"Dette inventee",
q:"Te faire sentir redevable pour obtenir un service.",
re:/\b(je t ai (aide|rendu service|donne)|apres tout ce que|tu me dois|c est normal que tu|je t avais|renvoie l ascenseur|i helped you|after all i|you owe me|return the favor|returning the favor)\b/},
{k:"appat",p:20,n:"Appat",
q:"T attirer avec un gain qui n existe pas.",
re:/\b(nitro gratuit|nitro offert|tu as gagne|t as gagne|cadeau gratuit|giveaway|steam (gift|cadeau)|code promo|1 mois gratuit|clef gratuite|jeu gratuit|free nitro|nitro (gift|giveaway)|you (have|ve) won|you won a|free (steam|game|key|gift)|claim your (prize|gift|nitro|reward)|promo code|1 month free|redeem this)\b/},
{k:"donnees",p:26,n:"Demande de donnees personnelles",
q:"Obtenir de quoi te voler ton compte ou te retrouver.",
re:/\b(ton (numero|adresse|nom de famille|telephone)|ta (date de naissance|localisation|ville|photo de)|code (a )?(6|six) chiffres|code de verification|envoie (moi )?le code|ton mot de passe|ton token|ton jeton|your (phone|number|address|last name|full name|birth date|location)|date of birth|(6|six) digit code|verification code|send (me )?the code|your password|your token|2fa code|backup code)\b/},
{k:"paiement",p:24,n:"Paiement difficile a annuler",
q:"Etre paye par un moyen qu on ne peut pas recuperer.",
re:/\b(paysafe|paysafecard|carte cadeau|gift card|paypal (amis|entre amis|friends)|sans protection|crypto|bitcoin|usdt|ltc|virement instantane|transcash|paypal (friends|family)|friends and family|no protection|western union|wire transfer|steam (card|wallet)|cashapp|venmo|zelle|gift cards)\b/},
{k:"menace",p:30,n:"Menace",
q:"Obtenir par la peur ce qu on ne donnerait pas autrement.",
re:/\b(je vais (publier|tout envoyer|le dire|diffuser)|j ai des (captures|screens|photos)|tu vas le regretter|je balance|te ruiner|(envoyer|montrer|dire) (ca |tout )?a (tes|ta|ton) (parents|famille|copine|copain|patron)|i (will|m going to|ll) (post|leak|send|tell|expose|share)|i have (screenshots|screens|pics|photos) of you|you (will|ll) regret|i (will|ll) dox|ruin your)\b/},
{k:"chantage",p:22,n:"Menace conditionnelle",
q:"Te forcer a obeir en te disant ce qui arrivera si tu refuses.",
re:/\b(si tu (ne |n )?(me )?(reponds|repond|donnes|envoies|paies|fais|obeis) pas|sinon je (vais|publie|balance|envoie|le dis)|si tu refuses|if you (do not|dont|don t) (answer|reply|pay|send)|(or|otherwise) i (will|ll) (post|leak|send|tell|expose|share|report))\b/},
{k:"intimite",p:20,n:"Intimite trop rapide",
q:"Creer un lien en quelques minutes pour obtenir ensuite.",
re:/\b(tu me plais|t es (mignon|mignonne|beau|belle)|envoie (une |ta )?photo|t es seul|webcam|snap|i like you|you re (cute|pretty|handsome|hot)|send (me )?(a )?(pic|picture|photo|selfie|nude)|are you (alone|single)|add me on snap)\b/},
{k:"installe",p:22,n:"Installation demandee",
q:"Te faire executer un programme que tu n as pas choisi.",
re:/\b(telecharge (ce|le|mon|mes)|installe (ce|le|mon)|lance le (fichier|programme|.exe)|desactive (ton |l )?antivirus|download (this|the|my)|install (this|the|my)|run (the |this )?(file|program|exe|setup|installer)|disable (your )?(antivirus|defender)|turn off (your )?antivirus|open the attachment)\b/},
{k:"console",p:46,n:"Code a coller dans la console",
q:"Voler ton compte. Un code colle dans la console envoie ton jeton, et il n y a aucune autre raison de le demander.",
re:/\b(colle (ca|ceci|ce code|le code|ce script)|copie colle ce|paste (this|it|the code)|copy and paste this|copy paste this)\b/},
{k:"devtools",p:20,n:"Ouverture de la console demandee",
q:"Ouvrir la console n est pas une arnaque en soi : c est ce qu on demande d y coller qui l est.",
re:/\b(ouvr(e|ir|es) (la |ta )?console|dans (la|ta) console|console (de |du )?(discord|navigateur)|ctrl\s*\+?\s*shift\s*\+?\s*i|(appuie sur|touche) f12|devtools|inspecter l element|open (the |your )?console|in (the|your) console|(browser|discord) console|press f12|inspect element)\b/}];

// ---------------------------------------------------------------- les fils
_NXMAN.fils={};
_NXMAN.fil=function(id){try{
if(!_NXMAN.fils[id])_NXMAN.fils[id]={id:id,score:0,vus:{},n:0,debut:Date.now(),
dernier:0,tactiques:[],alerte:0};
return _NXMAN.fils[id];}catch(_){return null;}};
_NXMAN.oublieVieux=function(){try{
var ids=[],k;
for(k in _NXMAN.fils)ids.push(k);
if(ids.length<=_NXMAN.MAXFILS)return;
ids.sort(function(a,b){return (_NXMAN.fils[a].dernier||0)-(_NXMAN.fils[b].dernier||0);});
for(var a=0;a<ids.length-_NXMAN.MAXFILS;a++)delete _NXMAN.fils[ids[a]];}catch(_){}};

// Le coeur : ce qu un message ajoute au score d un fil.
// Une meme tactique ne compte qu une fois -- sinon repeter "vite" cinq fois
// suffirait a declencher, et ce serait un mauvais signal.
_NXMAN.examine=function(id,texte,meta){try{
if(!_NXMAN.cfg.on)return null;
var f=_NXMAN.fil(id);
if(!f)return null;
var t=_NXMAN.plat(texte);
if(!t||t.length<3)return null;
f.n++;f.dernier=Date.now();
var a;
for(a=0;a<_NXMAN.TACTIQUES.length;a++){
var T=_NXMAN.TACTIQUES[a];
if(f.vus[T.k])continue;
if(!T.re.test(t))continue;
f.vus[T.k]=1;
f.score+=T.p;f.nt=(f.nt||0)+1;
f.tactiques.push({k:T.k,n:T.n,q:T.q,a:Date.now()});}
// Un procede seul se defend : un collegue presse ecrit "depeche toi".
// Deux procedes distincts dans le meme fil, beaucoup moins. Trois, plus
// du tout. La combinaison compte donc pour elle-meme.
if((f.nt||0)>=2&&!f.vus["_duo"]){f.vus["_duo"]=1;f.score+=8;}
if((f.nt||0)>=3&&!f.vus["_trio"]){f.vus["_trio"]=1;f.score+=8;}
// Les signaux de forme, qui ne sont pas des mots.
if(meta){
// Quelqu un qui ecrit le premier, sans historique, et beaucoup.
if(meta.inconnu&&f.n>=4&&!f.vus["_flot"]){
f.vus["_flot"]=1;f.score+=10;
f.tactiques.push({k:"flot",n:"Beaucoup de messages d un inconnu",
q:"Occuper la conversation pour que tu suives sans reflechir.",a:Date.now()});}
// Un compte tout neuf qui engage la conversation.
if(meta.jeune&&!f.vus["_jeune"]){
f.vus["_jeune"]=1;f.score+=12;
f.tactiques.push({k:"jeune",n:"Compte tres recent",
q:"Un compte cree il y a peu, qui ecrit en premier.",a:Date.now()});}
// Un lien apres une tactique : la combinaison est pire que la somme.
if(meta.lien&&f.tactiques.length&&!f.vus["_lien"]){
f.vus["_lien"]=1;f.score+=14;
f.tactiques.push({k:"lien",n:"Lien apres une mise en condition",
q:"Le lien arrive une fois que tu es presse ou mis en confiance.",a:Date.now()});}}
if(f.score>100)f.score=100;
_NXMAN.oublieVieux();
if(f.score>=_NXMAN.SEUIL&&f.alerte<f.score){
f.alerte=f.score;
_NXMAN.notify();
return f;}
return null;}catch(_){return null;}};

// Ce qu on montre. Local, gratuit, et sans jamais citer le message.
_NXMAN.resume=function(f){try{
if(!f||!f.tactiques.length)return null;
var L=[],a;
for(a=0;a<f.tactiques.length&&a<4;a++)L.push(f.tactiques[a].n);
return {score:f.score,fort:f.score>=_NXMAN.SEUIL_FORT,
tactiques:f.tactiques.slice(0,4),
titre:f.score>=_NXMAN.SEUIL_FORT
?"Cette conversation a la forme d une arnaque"
:"Cette conversation merite ton attention",
liste:L};}catch(_){return null;}};

// L explication par l assistant. Demandee par l utilisateur, donc payee sur
// son quota -- jamais sur le budget automatique.
_NXMAN.demandeLecture=function(id){try{
if(!window._NXIA||!_NXIA.demandeIci)return false;
var f=_NXMAN.fils[id];
if(!f)return false;
var noms=[],a;
for(a=0;a<f.tactiques.length;a++)noms.push(f.tactiques[a].n);
_NXIA.demandeIci("Dans la conversation que je regarde, Nexium a repere ces "+
"procedes : "+noms.join(", ")+". Explique-moi en trois phrases ce que cette "+
"personne cherche a obtenir, et ce que je devrais repondre ou ne pas repondre.");
return true;}catch(_){return false;}};

_NXMAN.etat=function(){try{
var n=0,chauds=0,k;
for(k in _NXMAN.fils){n++;if(_NXMAN.fils[k].score>=_NXMAN.SEUIL)chauds++;}
return {actif:_NXMAN.cfg.on,fils:n,signales:chauds,
tactiques:_NXMAN.TACTIQUES.length};}catch(_){return {};}};

// --------------------------------------------------------------- le crochet
// On se greffe sur l observateur de Protect au lieu d ouvrir un second
// abonnement : un seul passage par message, quoi qu il arrive.
_NXMAN.branche=function(){try{
if(_NXMAN._branche)return;
if(!window._NXPR||typeof _NXPR.onMsg!=="function"){
_NXMAN._essais=(_NXMAN._essais||0)+1;
if(_NXMAN._essais<25)setTimeout(_NXMAN.branche,1500);
return;}
var avant=_NXPR.onMsg;
_NXPR.onMsg=function(e){
try{avant.apply(_NXPR,arguments);}catch(_){}
try{_NXMAN.onMsg(e);}catch(_){}};
_NXMAN._branche=true;}catch(_){}};

_NXMAN.moi=function(){try{
var US=_NXcommon().store("UserStore");
var u=US&&US.getCurrentUser&&US.getCurrentUser();
return (u&&u.id)?String(u.id):"";}catch(_){return "";}};

// L age d un identifiant Discord se lit dedans : les 22 bits de poids fort
// sont un horodatage. Pas besoin d interroger quoi que ce soit.
// Un ami n est pas un suspect. Sans ce controle, "tu fais quoi la"
// envoye par un copain comptait comme une approche, et quatre messages
// d affilee comme un flot : le detecteur devenait une nuisance. Discord
// sait deja qui sont tes amis, on lui demande.
// 1 ami, 2 bloque, 3 demande recue, 4 demande envoyee, 0 rien.
_NXMAN.relation=function(id){try{
var RS=_NXcommon().store("RelationshipStore");
if(!RS)return -1;
if(RS.getRelationshipType)return RS.getRelationshipType(String(id))|0;
if(RS.isFriend)return RS.isFriend(String(id))?1:0;
return -1;}catch(_){return -1;}};
// -1 signifie "je n ai pas pu savoir". Dans le doute on examine : rater
// une arnaque coute plus cher qu une alerte de trop.
_NXMAN.ami=function(id){return _NXMAN.relation(id)===1;};

_NXMAN.EPOQUE=1420070400000;
_NXMAN.jeune=function(id){try{
var n=parseInt(String(id||""),10);
if(!isFinite(n)||n<=0)return false;
var quand=Math.floor(n/4194304)+_NXMAN.EPOQUE;
return (Date.now()-quand)<(21*86400000);}catch(_){return false;}};

_NXMAN.onMsg=function(e){try{
if(!_NXMAN.cfg.on)return;
var m=e&&e.message;
if(!m||!m.author)return;
var moi=_NXMAN.moi();
if(!moi)return;
// Ce que j ecris ne me vise pas. Mais repondre a un fil deja signale est
// en soi une information : le bandeau n a pas suffi.
if(String(m.author.id)===moi){try{
var fr=_NXMAN.fils[String(m.channel_id)];
if(fr&&fr.score>=_NXMAN.SEUIL){fr.repondu=(fr.repondu||0)+1;fr.repondA=Date.now();}
}catch(_){}return;}
if(m.author.bot)return;
if(_NXMAN.ami(m.author.id))return;    // un ami n est pas examine
// Messages prives seulement : c est la que la manipulation se joue, et
// examiner tous les serveurs couterait cher pour rien.
var prive=false;
try{var CS=_NXcommon().store("ChannelStore");
var c=CS&&CS.getChannel&&CS.getChannel(m.channel_id);
prive=!!(c&&(c.type===1||c.type===3));}catch(_){prive=!e.guildId;}
if(!prive)return;
var texte=String(m.content||"");
var meta={inconnu:_NXMAN.relation(m.author.id)<=0,
jeune:_NXMAN.jeune(m.author.id),
lien:/https?:\/\//i.test(texte)};
var f=_NXMAN.examine(String(m.channel_id),texte,meta);
// Le seul instant ou expliquer la branche 2.0 a un sens : il y a une vraie
// conversation, un vrai score, et un service a rendre tout de suite.
try{if(f&&window._NXADOPT)_NXADOPT.momentManip(f);}catch(_){}
if(f&&_NXMAN.cfg.bandeau){
try{if(window._NXPR&&_NXPR.toast){
var r=_NXMAN.resume(f);
if(r)_NXPR.toast(_NXtr(r.titre)+" : "+_NXtr(r.liste.join(", ")),0);}}catch(_){}}
}catch(_){}};

try{setTimeout(_NXMAN.branche,4000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXMAN");if(window._NXERR)_NXERR.push("module _NXMAN :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXMAN desactive:",_nxE);}catch(_){}}
}
