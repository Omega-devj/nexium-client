var _NXCANAL=window._NXCANAL||(window._NXCANAL={});
if(!_NXCANAL.boot){try{_NXCANAL.boot=true;
// Le repaire, et la ligne de secours : un canal prive entre clients Nexium.
//
// Le relais ne peut rien lire, et ce n est pas une promesse en l air. Le code
// d invitation donne TROIS choses derivees separement :
//   - l identifiant du canal, envoye : une empreinte du code ;
//   - le verificateur, envoye aussi : une AUTRE empreinte, qui prouve qu on
//     connait le code sans donner de quoi dechiffrer ;
//   - la cle AES-GCM, qui ne quitte jamais cette machine.
//
// Supabase ne stocke que du chiffre. C est ce qui permet de dire que personne
// ne peut fermer ce groupe : il n y a rien a fermer, et rien a lire.
_NXCANAL.URL="https://emcoqnvxriyrchmfpunq.supabase.co/functions/v1/repaire";
_NXCANAL.KEY="nexium_repaire";
_NXCANAL.KEYE="nexium_repaire_etat";
_NXCANAL.MAXFIL=200;
_NXCANAL.MAXNOTES=60;
_NXCANAL.MAXMARQUES=60;
_NXCANAL.VIEMSG=2592000;
_NXCANAL.VIEPRESENCE=240;
_NXCANAL.MAXTEXTE=1400;

_NXCANAL.cfg={code:"",nom:"",pseudo:"",moi:"",vu:"",lu:0};
_NXCANAL.etat={fil:[],notes:[],marques:[],membres:[],sondages:[],votes:[],events:[]};
_NXCANAL.erreur="";
_NXCANAL.occupe=false;
_NXCANAL.dernierEchange=0;
_NXCANAL.illisibles=0;
_NXCANAL._ecoute=[];
_NXCANAL._cles={};

_NXCANAL.notify=function(){try{
for(var a=0;a<_NXCANAL._ecoute.length;a++){try{_NXCANAL._ecoute[a]();}catch(_){}}}catch(_){}};

_NXCANAL.load=function(){try{
var r=_NXDB.get(_NXCANAL.KEY);
var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")d={};
if(typeof d.code!=="string")d.code="";
if(typeof d.nom!=="string")d.nom="";
if(typeof d.pseudo!=="string")d.pseudo="";
if(typeof d.moi!=="string"||!d.moi)d.moi=_NXCANAL.jeton();
if(typeof d.vu!=="string")d.vu="";
if(typeof d.lu!=="number")d.lu=0;
_NXCANAL.cfg=d;
var e=_NXDB.get(_NXCANAL.KEYE);
var t=e?JSON.parse(e):null;
if(!t||typeof t!=="object")t={};
_NXCANAL.etat={fil:(t.fil&&t.fil.length)?t.fil:[],
notes:(t.notes&&t.notes.length)?t.notes:[],
marques:(t.marques&&t.marques.length)?t.marques:[],
membres:(t.membres&&t.membres.length)?t.membres:[],
sondages:(t.sondages&&t.sondages.length)?t.sondages:[],
votes:(t.votes&&t.votes.length)?t.votes:[],
events:(t.events&&t.events.length)?t.events:[]};
return d;}catch(_){return null;}};

_NXCANAL.save=function(){try{_NXDB.set(_NXCANAL.KEY,JSON.stringify(_NXCANAL.cfg));}catch(_){}};
// Le miroir local : un repaire reste lisible sans reseau, et c est tout
// l interet quand la ligne de secours sert justement parce que rien ne va.
_NXCANAL.saveEtat=function(){try{_NXDB.set(_NXCANAL.KEYE,JSON.stringify(_NXCANAL.etat));}catch(_){}};

_NXCANAL.vide=function(){
return {fil:[],notes:[],marques:[],membres:[],sondages:[],votes:[],events:[]};};
_NXCANAL.actif=function(){try{return !!_NXCANAL.cfg.code;}catch(_){return false;}};

_NXCANAL.jeton=function(){try{
var u=new Uint8Array(8);window.crypto.getRandomValues(u);
return _NXCANAL.hex(u.buffer);}catch(_){return String(Date.now());}};

_NXCANAL.hex=function(buf){try{
var u=new Uint8Array(buf),s2="",a,h;
for(a=0;a<u.length;a++){h=u[a].toString(16);if(h.length<2)h="0"+h;s2+=h;}
return s2;}catch(_){return "";}};

// --- le code d invitation ---------------------------------------------------
_NXCANAL.nouveauCode=function(){try{
var u=new Uint8Array(10);window.crypto.getRandomValues(u);
var h=_NXCANAL.hex(u.buffer),a,p=[];
for(a=0;a<h.length;a+=4)p.push(h.substring(a,a+4));
return "nx-"+p.join("-");}catch(_){return "";}};

// Un code recopie a la main arrive avec des espaces, des majuscules, parfois
// un retour a la ligne. On le ramene toujours a la meme forme AVANT de deriver
// quoi que ce soit, sinon deux personnes n ouvrent pas le meme repaire.
_NXCANAL.normalise=function(code){try{
return String(code||"").toLowerCase().replace(/[^a-z0-9-]/g,"");}catch(_){return "";}};

_NXCANAL.codeValide=function(code){try{
var c=_NXCANAL.normalise(code);
return c.length>=12&&c.length<=64;}catch(_){return false;}};

// --- les derivations --------------------------------------------------------
_NXCANAL.sha=function(txt){try{
return window.crypto.subtle.digest("SHA-256",new TextEncoder().encode(String(txt)))
.then(function(b){return _NXCANAL.hex(b);});}catch(e){return Promise.reject(e);}};

_NXCANAL.canal=function(code){return _NXCANAL.sha("nx-canal|"+_NXCANAL.normalise(code));};
_NXCANAL.verif=function(code){return _NXCANAL.sha("nx-verif|"+_NXCANAL.normalise(code));};

_NXCANAL.cle=function(code){try{
var c=_NXCANAL.normalise(code);
if(_NXCANAL._cles[c])return Promise.resolve(_NXCANAL._cles[c]);
var enc=new TextEncoder();
return window.crypto.subtle.importKey("raw",enc.encode(c),"PBKDF2",false,["deriveKey"])
.then(function(base){
return window.crypto.subtle.deriveKey(
{name:"PBKDF2",salt:enc.encode("nexium-repaire"),iterations:210000,hash:"SHA-256"},
base,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);})
.then(function(k){_NXCANAL._cles[c]=k;return k;});}catch(e){return Promise.reject(e);}};

// --- chiffrer, dechiffrer ---------------------------------------------------
_NXCANAL.b64=function(u8){try{
var s2="",a;
for(a=0;a<u8.length;a++)s2+=String.fromCharCode(u8[a]);
return btoa(s2);}catch(_){return "";}};
_NXCANAL.deb64=function(t){try{
var b=atob(String(t)),u=new Uint8Array(b.length),a;
for(a=0;a<b.length;a++)u[a]=b.charCodeAt(a);
return u;}catch(_){return new Uint8Array(0);}};

_NXCANAL.scelle=function(cle,objet){try{
var iv=new Uint8Array(12);window.crypto.getRandomValues(iv);
var clair=new TextEncoder().encode(JSON.stringify(objet));
return window.crypto.subtle.encrypt({name:"AES-GCM",iv:iv},cle,clair)
.then(function(c){
var ch=new Uint8Array(c),tout=new Uint8Array(iv.length+ch.length);
tout.set(iv);tout.set(ch,iv.length);
return _NXCANAL.b64(tout);});}catch(e){return Promise.reject(e);}};

_NXCANAL.descelle=function(cle,charge){try{
var tout=_NXCANAL.deb64(charge);
if(tout.length<13)return Promise.reject(new Error("charge trop courte"));
var iv=tout.subarray(0,12),corps=tout.subarray(12);
return window.crypto.subtle.decrypt({name:"AES-GCM",iv:iv},cle,corps)
.then(function(p){return JSON.parse(new TextDecoder().decode(p));});}catch(e){return Promise.reject(e);}};

// --- le relais --------------------------------------------------------------
// Ce que le relais repond, dit en francais. Un message d erreur qui recopie
// une reponse HTTP ne sert a personne.
_NXCANAL.DITS={inconnu:"Ce repaire n existe pas encore. Verifie le code, ou cree-le.",
refuse:"Ce code ne correspond pas a ce repaire.",
debit:"Trop d envois d un coup. Laisse passer une minute.",
plein:"Ce repaire est plein. Efface d anciennes notes pour faire de la place."};

_NXCANAL.appel=function(corps){try{
return _NXNETX.go(_NXCANAL.URL,{method:"POST",
headers:{"Content-Type":"application/json"},body:JSON.stringify(corps)},20000)
.then(function(r){
return r.json().then(function(j){return {code:r.status,j:j};},
function(){return {code:r.status,j:null};});});}catch(e){return Promise.reject(e);}};

_NXCANAL.dit=function(rep){try{
var raison=(rep&&rep.j&&rep.j.raison)||"";
if(_NXCANAL.DITS[raison])return _NXCANAL.DITS[raison];
if(rep&&rep.code===0)return "Le relais ne repond pas.";
return "Le relais a refuse la demande.";}catch(_){return "Le relais a refuse la demande.";}};

// Resout code + verificateur + cle, puis passe la main.
_NXCANAL.avec=function(fn){try{
var code=_NXCANAL.cfg.code;
if(!code)return Promise.reject(new Error("aucun repaire"));
return Promise.all([_NXCANAL.canal(code),_NXCANAL.verif(code),_NXCANAL.cle(code)])
.then(function(t){return fn(t[0],t[1],t[2]);});}catch(e){return Promise.reject(e);}};

_NXCANAL.id=function(prefixe){try{
return prefixe+":"+Date.now().toString(36)+"-"+Math.random().toString(36).substring(2,8);}catch(_){
return prefixe+":"+String(Date.now());}};

// --- ouvrir, rejoindre, quitter ---------------------------------------------
_NXCANAL.rejoint=function(code,cree,pseudo){try{
var c=_NXCANAL.normalise(code);
if(!_NXCANAL.codeValide(c)){_NXCANAL.erreur="Ce code est trop court pour etre un code de repaire.";
_NXCANAL.notify();return Promise.resolve(false);}
_NXCANAL.occupe=true;_NXCANAL.erreur="";_NXCANAL.notify();
return Promise.all([_NXCANAL.canal(c),_NXCANAL.verif(c)]).then(function(t){
return _NXCANAL.appel({action:"ouvre",canal:t[0],verificateur:t[1],cree:!!cree});})
.then(function(rep){
_NXCANAL.occupe=false;
if(!rep||!rep.j||rep.j.ok!==true){_NXCANAL.erreur=_NXCANAL.dit(rep);_NXCANAL.notify();return false;}
_NXCANAL.cfg.code=c;
if(typeof pseudo==="string"&&pseudo)_NXCANAL.cfg.pseudo=pseudo.substring(0,40);
if(!_NXCANAL.cfg.moi)_NXCANAL.cfg.moi=_NXCANAL.jeton();
_NXCANAL.cfg.vu="";_NXCANAL.cfg.lu=0;
_NXCANAL.etat=_NXCANAL.vide();
_NXCANAL.save();_NXCANAL.saveEtat();_NXCANAL.notify();
_NXCANAL.synchro();
return true;},
function(){_NXCANAL.occupe=false;_NXCANAL.erreur="Le relais ne repond pas.";_NXCANAL.notify();return false;});
}catch(_){_NXCANAL.occupe=false;return Promise.resolve(false);}};

// Quitter n efface que cette machine : le repaire continue sans toi, et on le
// dit clairement dans l interface.
_NXCANAL.quitte=function(){try{
_NXCANAL.cfg.code="";_NXCANAL.cfg.nom="";_NXCANAL.cfg.vu="";_NXCANAL.cfg.lu=0;
_NXCANAL.etat=_NXCANAL.vide();
_NXCANAL._cles={};
_NXCANAL.save();_NXCANAL.saveEtat();_NXCANAL.notify();
return true;}catch(_){return false;}};

// --- poser du contenu -------------------------------------------------------
_NXCANAL.pose=function(objets){try{
if(!objets||!objets.length)return Promise.resolve(false);
return _NXCANAL.avec(function(canal,verif,cle){
var taches=[],a;
for(a=0;a<objets.length;a++)(function(o){
taches.push(_NXCANAL.scelle(cle,o.corps).then(function(ch){
return {cle:o.cle,charge:ch,vie:o.vie||_NXCANAL.VIEMSG};}));})(objets[a]);
return Promise.all(taches).then(function(prets){
return _NXCANAL.appel({action:"pose",canal:canal,verificateur:verif,objets:prets});});})
.then(function(rep){
if(!rep||!rep.j||rep.j.ok!==true){_NXCANAL.erreur=_NXCANAL.dit(rep);_NXCANAL.notify();return false;}
_NXCANAL.erreur="";_NXCANAL.dernierEchange=Date.now();
return true;},
function(){_NXCANAL.erreur="Le relais ne repond pas.";_NXCANAL.notify();return false;});
}catch(_){return Promise.resolve(false);}};

_NXCANAL.disMoi=function(){try{
return (_NXCANAL.cfg.pseudo||"").substring(0,40)||"quelqu un";}catch(_){return "quelqu un";}};

// Une duree de vie au choix. Le relais efface tout seul a l echeance, donc
// "ephemere" n est pas un affichage : l objet cesse d exister.
_NXCANAL.DUREES=[{k:"1h",n:"1 heure",v:3600},
{k:"1j",n:"1 jour",v:86400},
{k:"30j",n:"30 jours",v:2592000}];

_NXCANAL.dis=function(texte,vie){try{
var t=String(texte||"").substring(0,_NXCANAL.MAXTEXTE);
if(!t.replace(/\s/g,""))return Promise.resolve(false);
var v=(typeof vie==="number"&&vie>=60)?Math.floor(vie):_NXCANAL.VIEMSG;
var cle=_NXCANAL.id("f");
var corps={qui:_NXCANAL.disMoi(),moi:_NXCANAL.cfg.moi,texte:t,quand:Date.now(),vie:v};
// On l affiche tout de suite : attendre le reseau pour voir son propre
// message donne l impression que rien ne marche.
_NXCANAL.fusionne([{cle_objet:cle,corps:corps}]);
_NXCANAL.cfg.lu=Date.now();_NXCANAL.save();
return _NXCANAL.pose([{cle:cle,corps:corps,vie:v}]);}catch(_){return Promise.resolve(false);}};

_NXCANAL.ecritNote=function(cle,titre,corps){try{
var k=cle||_NXCANAL.id("n");
var o={qui:_NXCANAL.disMoi(),moi:_NXCANAL.cfg.moi,
titre:String(titre||"").substring(0,80),
corps:String(corps||"").substring(0,_NXCANAL.MAXTEXTE),quand:Date.now()};
_NXCANAL.fusionne([{cle_objet:k,corps:o}]);
return _NXCANAL.pose([{cle:k,corps:o,vie:_NXCANAL.VIEMSG}]);}catch(_){return Promise.resolve(false);}};

_NXCANAL.ecritMarque=function(cle,url,titre){try{
var k=cle||_NXCANAL.id("m");
var o={qui:_NXCANAL.disMoi(),moi:_NXCANAL.cfg.moi,
url:String(url||"").substring(0,400),
titre:String(titre||"").substring(0,120),quand:Date.now()};
_NXCANAL.fusionne([{cle_objet:k,corps:o}]);
return _NXCANAL.pose([{cle:k,corps:o,vie:_NXCANAL.VIEMSG}]);}catch(_){return Promise.resolve(false);}};

// Epingler : on repose le MEME objet avec un drapeau. Pas de nouvelle boite
// a synchroniser, et l epingle suit le message partout.
_NXCANAL.epingle=function(m,oui){try{
if(!m||!m.cle)return Promise.resolve(false);
var corps={qui:m.qui,moi:m.moi,texte:m.texte,quand:m.quand,vie:m.vie,pin:!!oui};
_NXCANAL.fusionne([{cle_objet:m.cle,corps:corps}]);
return _NXCANAL.pose([{cle:m.cle,corps:corps,vie:m.vie||_NXCANAL.VIEMSG}]);}catch(_){
return Promise.resolve(false);}};

_NXCANAL.epingles=function(){try{
var out=[],a,L=_NXCANAL.etat.fil;
for(a=0;a<L.length;a++)if(L[a].pin)out.push(L[a]);
return out;}catch(_){return [];}};

// --- les sondages ---------------------------------------------------------
_NXCANAL.creeSondage=function(question,options){try{
var q=String(question||"").substring(0,140);
var L=[],a;
for(a=0;a<(options||[]).length;a++){
var o=String(options[a]||"").substring(0,60);
if(o.replace(/\s/g,""))L.push(o);}
if(!q.replace(/\s/g,"")||L.length<2)return Promise.resolve(false);
if(L.length>6)L=L.slice(0,6);
var cle=_NXCANAL.id("s");
var corps={qui:_NXCANAL.disMoi(),moi:_NXCANAL.cfg.moi,question:q,options:L,quand:Date.now()};
_NXCANAL.fusionne([{cle_objet:cle,corps:corps}]);
return _NXCANAL.pose([{cle:cle,corps:corps,vie:_NXCANAL.VIEMSG}]);}catch(_){
return Promise.resolve(false);}};

// La cle du vote est deterministe : la meme personne qui revote remplace son
// vote au lieu d en ajouter un second.
_NXCANAL.cleVote=function(sid){try{
return "v:"+String(sid||"").replace(/^s:/,"")+"-"+(_NXCANAL.cfg.moi||"x");}catch(_){return "";}};

_NXCANAL.vote=function(sid,choix){try{
if(!sid)return Promise.resolve(false);
var n=parseInt(choix,10);
if(!(n>=0))return Promise.resolve(false);
var cle=_NXCANAL.cleVote(sid);
if(!cle)return Promise.resolve(false);
var corps={sid:String(sid),choix:n,moi:_NXCANAL.cfg.moi,quand:Date.now()};
_NXCANAL.fusionne([{cle_objet:cle,corps:corps}]);
return _NXCANAL.pose([{cle:cle,corps:corps,vie:_NXCANAL.VIEMSG}]);}catch(_){
return Promise.resolve(false);}};

_NXCANAL.resultats=function(sid){try{
var S=null,a;
for(a=0;a<_NXCANAL.etat.sondages.length;a++)
if(_NXCANAL.etat.sondages[a].cle===sid)S=_NXCANAL.etat.sondages[a];
if(!S)return null;
var n=(S.options||[]).length,c=[],total=0,mien=-1;
for(a=0;a<n;a++)c.push(0);
for(a=0;a<_NXCANAL.etat.votes.length;a++){
var v=_NXCANAL.etat.votes[a];
if(!v||v.sid!==sid)continue;
var k=parseInt(v.choix,10);
if(!(k>=0&&k<n))continue;
c[k]++;total++;
if(v.moi&&_NXCANAL.cfg.moi&&v.moi===_NXCANAL.cfg.moi)mien=k;}
return {compte:c,total:total,mien:mien,options:S.options||[],question:S.question};}catch(_){
return null;}};

// --- les evenements -------------------------------------------------------
_NXCANAL.creeEvent=function(titre,quand){try{
var t=String(titre||"").substring(0,100);
var q=Number(quand);
if(!t.replace(/\s/g,"")||!(q>0))return Promise.resolve(false);
var cle=_NXCANAL.id("e");
var corps={qui:_NXCANAL.disMoi(),moi:_NXCANAL.cfg.moi,titre:t,date:q,quand:Date.now()};
_NXCANAL.fusionne([{cle_objet:cle,corps:corps}]);
// L evenement disparait tout seul un jour apres l heure prevue.
var vie=Math.max(3600,Math.min(2592000,Math.round((q-Date.now())/1000)+86400));
return _NXCANAL.pose([{cle:cle,corps:corps,vie:vie}]);}catch(_){
return Promise.resolve(false);}};

// Le prochain rendez-vous, s il n est pas passe.
_NXCANAL.prochain=function(){try{
var best=null,a,L=_NXCANAL.etat.events,n=Date.now();
for(a=0;a<L.length;a++){
if(!L[a]||!(L[a].date>n))continue;
if(!best||L[a].date<best.date)best=L[a];}
return best;}catch(_){return null;}};

// --- les non-lus ----------------------------------------------------------
_NXCANAL.nonLus=function(){try{
var n=0,a,L=_NXCANAL.etat.fil,lu=_NXCANAL.cfg.lu||0;
for(a=0;a<L.length;a++){
var m=L[a];
if(!m||!(m.quand>lu))continue;
if(m.moi&&_NXCANAL.cfg.moi&&m.moi===_NXCANAL.cfg.moi)continue;
n++;}
return n;}catch(_){return 0;}};

_NXCANAL.marqueLu=function(){try{
_NXCANAL.cfg.lu=Date.now();_NXCANAL.save();_NXCANAL.notify();return true;}catch(_){return false;}};

_NXCANAL.efface=function(cles){try{
if(!cles||!cles.length)return Promise.resolve(false);
_NXCANAL.retire(cles);
return _NXCANAL.avec(function(canal,verif){
return _NXCANAL.appel({action:"efface",canal:canal,verificateur:verif,cles:cles});})
.then(function(rep){return !!(rep&&rep.j&&rep.j.ok===true);},function(){return false;});
}catch(_){return Promise.resolve(false);}};

// La presence a une cle stable par machine : elle se remplace au lieu de
// s empiler, et elle expire toute seule en quatre minutes.
_NXCANAL.signale=function(){try{
if(!_NXCANAL.actif())return Promise.resolve(false);
var k="p:"+(_NXCANAL.cfg.moi||"inconnu").substring(0,60);
return _NXCANAL.pose([{cle:k,corps:{qui:_NXCANAL.disMoi(),moi:_NXCANAL.cfg.moi,quand:Date.now()},
vie:_NXCANAL.VIEPRESENCE}]);}catch(_){return Promise.resolve(false);}};

// --- lire -------------------------------------------------------------------
_NXCANAL.retire=function(cles){try{
var dedans=function(k){for(var a=0;a<cles.length;a++)if(cles[a]===k)return true;return false;};
var garde=function(L){var out=[],a;for(a=0;a<L.length;a++)if(!dedans(L[a].cle))out.push(L[a]);return out;};
_NXCANAL.etat.fil=garde(_NXCANAL.etat.fil);
_NXCANAL.etat.notes=garde(_NXCANAL.etat.notes);
_NXCANAL.etat.marques=garde(_NXCANAL.etat.marques);
_NXCANAL.etat.sondages=garde(_NXCANAL.etat.sondages);
_NXCANAL.etat.events=garde(_NXCANAL.etat.events);
_NXCANAL.saveEtat();_NXCANAL.notify();}catch(_){}};

_NXCANAL.range=function(L,max){try{
L.sort(function(a,b){return (a.quand||0)-(b.quand||0);});
if(L.length>max)L=L.slice(L.length-max);
return L;}catch(_){return L;}};

// Fusionner plutot que remplacer : une cle deja connue est mise a jour, les
// autres restent. Le relais peut donc renvoyer deux fois la meme ligne sans
// qu on affiche un doublon.
_NXCANAL.fusionne=function(objets){try{
var a,o,k,corps,liste,b,trouve;
for(a=0;a<objets.length;a++){
o=objets[a];k=String(o.cle_objet||"");corps=o.corps;
if(!k||!corps)continue;
var pref=k.charAt(0);
if(pref==="p"){liste=_NXCANAL.etat.membres;}
else if(pref==="n"){liste=_NXCANAL.etat.notes;}
else if(pref==="m"){liste=_NXCANAL.etat.marques;}
else if(pref==="s"){liste=_NXCANAL.etat.sondages;}
else if(pref==="v"){liste=_NXCANAL.etat.votes;}
else if(pref==="e"){liste=_NXCANAL.etat.events;}
else{liste=_NXCANAL.etat.fil;}
trouve=-1;
for(b=0;b<liste.length;b++)if(liste[b].cle===k){trouve=b;break;}
corps.cle=k;
if(trouve>=0)liste[trouve]=corps;else liste.push(corps);}
_NXCANAL.etat.fil=_NXCANAL.range(_NXCANAL.etat.fil,_NXCANAL.MAXFIL);
_NXCANAL.etat.notes=_NXCANAL.range(_NXCANAL.etat.notes,_NXCANAL.MAXNOTES);
_NXCANAL.etat.marques=_NXCANAL.range(_NXCANAL.etat.marques,_NXCANAL.MAXMARQUES);
_NXCANAL.etat.membres=_NXCANAL.range(_NXCANAL.etat.membres,40);
_NXCANAL.etat.sondages=_NXCANAL.range(_NXCANAL.etat.sondages,20);
_NXCANAL.etat.votes=_NXCANAL.range(_NXCANAL.etat.votes,400);
_NXCANAL.etat.events=_NXCANAL.range(_NXCANAL.etat.events,20);
_NXCANAL.saveEtat();_NXCANAL.notify();
return true;}catch(_){return false;}};

_NXCANAL.synchro=function(){try{
if(!_NXCANAL.actif())return Promise.resolve(false);
if(_NXCANAL._enCours)return Promise.resolve(false);
_NXCANAL._enCours=true;
return _NXCANAL.avec(function(canal,verif,cle){
return _NXCANAL.appel({action:"lis",canal:canal,verificateur:verif,depuis:_NXCANAL.cfg.vu||""})
.then(function(rep){
if(!rep||!rep.j||rep.j.ok!==true){_NXCANAL.erreur=_NXCANAL.dit(rep);return false;}
var L=rep.j.objets||[],taches=[],a;
for(a=0;a<L.length;a++)(function(ligne){
taches.push(_NXCANAL.descelle(cle,ligne.charge)
.then(function(corps){return {cle_objet:ligne.cle_objet,corps:corps};},
function(){_NXCANAL.illisibles++;return null;}));})(L[a]);
return Promise.all(taches).then(function(rendus){
var bons=[],b;
for(b=0;b<rendus.length;b++)if(rendus[b])bons.push(rendus[b]);
var avant=_NXCANAL.nonLus();
if(bons.length)_NXCANAL.fusionne(bons);
var apres=_NXCANAL.nonLus();
if(apres>avant)_NXCANAL.previens(apres-avant,apres);
if(rep.j.maintenant)_NXCANAL.cfg.vu=rep.j.maintenant;
_NXCANAL.save();
_NXCANAL.erreur="";_NXCANAL.dernierEchange=Date.now();
_NXCANAL.notify();
return true;});});})
.then(function(v){_NXCANAL._enCours=false;return v;},
function(){_NXCANAL._enCours=false;
_NXCANAL.erreur="Le relais ne repond pas.";_NXCANAL.notify();return false;});
}catch(_){_NXCANAL._enCours=false;return Promise.resolve(false);}};

// Qui est la, maintenant : une presence vaut quatre minutes, on n affiche pas
// quelqu un parti depuis une heure comme s il ecoutait.
_NXCANAL.presents=function(){try{
var out=[],a,L=_NXCANAL.etat.membres,lim=Date.now()-_NXCANAL.VIEPRESENCE*1000;
for(a=0;a<L.length;a++)if((L[a].quand||0)>lim)out.push(L[a]);
return out;}catch(_){return [];}};

// Prevenir, sans harceler : une seule annonce par minute, et rien quand on a
// la page du repaire sous les yeux -- on y voit deja arriver le message.
_NXCANAL.previens=function(neufs,total){try{
if(!neufs)return false;
if(_NXCANAL._page)return false;
if(_NXCANAL._prevenuA&&(Date.now()-_NXCANAL._prevenuA)<60000)return false;
_NXCANAL._prevenuA=Date.now();
var t=total>1?(total+" messages non lus dans ton repaire")
:"Un nouveau message dans ton repaire";
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr(t),1);}catch(_){}
return true;}catch(_){return false;}};

_NXCANAL.etatLisible=function(){try{
return {actif:_NXCANAL.actif(),
messages:_NXCANAL.etat.fil.length,
notes:_NXCANAL.etat.notes.length,
marques:_NXCANAL.etat.marques.length,
sondages:_NXCANAL.etat.sondages.length,
events:_NXCANAL.etat.events.length,
epingles:_NXCANAL.epingles().length,
nonLus:_NXCANAL.nonLus(),
presents:_NXCANAL.presents().length,
illisibles:_NXCANAL.illisibles,
erreur:_NXCANAL.erreur};}catch(_){return {actif:false};}};

// La veille : on ne bat que si un repaire existe, et jamais quand la fenetre
// est cachee -- un client en arriere-plan n a rien a synchroniser.
_NXCANAL.veille=function(){try{
if(!_NXCANAL.actif())return;
if(typeof document!=="undefined"&&document.hidden)return;
_NXCANAL.synchro();
if(!_NXCANAL._presenceAt||(Date.now()-_NXCANAL._presenceAt)>120000){
_NXCANAL._presenceAt=Date.now();_NXCANAL.signale();}}catch(_){}};

try{_NXCANAL.load();
setInterval(_NXCANAL.veille,20000);
setTimeout(function(){_NXCANAL.veille();},9000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXCANAL");if(window._NXERR)_NXERR.push("module _NXCANAL :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXCANAL desactive:",_nxE);}catch(_){}}
}
