if(!_NXCPT.boot){try{_NXCPT.boot=true;
_NXCPT.KEY="nexium_comptes";
_NXCPT.listeners=[];
_NXCPT.cle=null;_NXCPT.sel=null;_NXCPT.ouvert=false;_NXCPT.comptes=[];
_NXCPT.notify=function(){for(var a=0;a<_NXCPT.listeners.length;a++){try{_NXCPT.listeners[a]();}catch(_){}}};
_NXCPT.dispo=function(){try{
return !!(window.crypto&&crypto.subtle&&crypto.subtle.deriveKey&&window.TextEncoder&&_NXDB.ls&&_NXDB.ls.setItem);}catch(_){return false;}};
_NXCPT.b64=function(buf){try{
var b=new Uint8Array(buf),t="",a;
for(a=0;a<b.length;a++)t+=String.fromCharCode(b[a]);
return btoa(t);}catch(_){return "";}};
_NXCPT.deb64=function(t){try{
var c=atob(String(t||"")),b=new Uint8Array(c.length),a;
for(a=0;a<c.length;a++)b[a]=c.charCodeAt(a);
return b;}catch(_){return new Uint8Array(0);}};
_NXCPT.coffre=function(){try{
var r=_NXDB.get(_NXCPT.KEY);if(!r)return null;
var j=JSON.parse(r);
if(!j||!j.sel||!j.iv||!j.d)return null;
return j;}catch(_){return null;}};
_NXCPT.existe=function(){return !!_NXCPT.coffre();};
_NXCPT.derive=function(phrase,sel){
return crypto.subtle.importKey("raw",new TextEncoder().encode(String(phrase)),{name:"PBKDF2"},false,["deriveKey"])
.then(function(k){return crypto.subtle.deriveKey(
{name:"PBKDF2",salt:sel,iterations:210000,hash:"SHA-256"},k,
{name:"AES-GCM",length:256},false,["encrypt","decrypt"]);});};
_NXCPT.ecrit=function(cb){try{
if(!_NXCPT.cle||!_NXCPT.sel){if(cb)cb({err:"Le coffre est ferme."});return;}
var iv=crypto.getRandomValues(new Uint8Array(12));
var clair=new TextEncoder().encode(JSON.stringify(_NXCPT.comptes));
crypto.subtle.encrypt({name:"AES-GCM",iv:iv},_NXCPT.cle,clair).then(function(d){
var ok=_NXDB.set(_NXCPT.KEY,JSON.stringify({v:1,sel:_NXCPT.b64(_NXCPT.sel),iv:_NXCPT.b64(iv),d:_NXCPT.b64(d)}));
_NXCPT.notify();
if(cb)cb(ok?{ok:true}:{err:"L ecriture a ete refusee par le stockage."});
}).catch(function(){if(cb)cb({err:"Le chiffrement a echoue."});});
}catch(_){if(cb)cb({err:"Erreur interne."});}};
_NXCPT.ouvre=function(phrase,cb){try{
if(!_NXCPT.dispo()){cb({err:"Ce client ne fournit pas le chiffrement necessaire."});return;}
var p=String(phrase||"");
if(p.length<8){cb({err:"La phrase doit faire au moins 8 caracteres."});return;}
var v=_NXCPT.coffre();
if(!v){
var sel=crypto.getRandomValues(new Uint8Array(16));
_NXCPT.derive(p,sel).then(function(k){
_NXCPT.cle=k;_NXCPT.sel=sel;_NXCPT.comptes=[];_NXCPT.ouvert=true;
_NXCPT.ecrit(function(r){cb(r.err?r:{ok:true,neuf:true});});
}).catch(function(){cb({err:"Le chiffrement a echoue."});});
return;}
var sel2=_NXCPT.deb64(v.sel),iv=_NXCPT.deb64(v.iv),d=_NXCPT.deb64(v.d);
_NXCPT.derive(p,sel2).then(function(k){
return crypto.subtle.decrypt({name:"AES-GCM",iv:iv},k,d).then(function(clair){
var L=JSON.parse(new TextDecoder().decode(clair));
_NXCPT.comptes=(L&&L.length!==undefined)?L:[];
_NXCPT.cle=k;_NXCPT.sel=sel2;_NXCPT.ouvert=true;
_NXCPT.notify();cb({ok:true});});
}).catch(function(){cb({err:"Phrase incorrecte."});});
}catch(_){cb({err:"Erreur interne."});}};
_NXCPT.ferme=function(){try{
_NXCPT.cle=null;_NXCPT.sel=null;_NXCPT.comptes=[];_NXCPT.ouvert=false;
_NXCPT.notify();}catch(_){}};
_NXCPT.oublie=function(){try{
_NXDB.del(_NXCPT.KEY);_NXCPT.ferme();}catch(_){}};
_NXCPT.jetonCourant=function(){try{
var WP=_NXcommon().WP;
var m=WP&&WP.findByProps&&WP.findByProps("getToken");
if(m&&typeof m.getToken==="function"){var t=m.getToken();if(t)return String(t);}}catch(_){}
try{var r=_NXDB.ls&&_NXDB.ls.getItem&&_NXDB.ls.getItem("token");
if(r)return JSON.parse(r);}catch(_){}
return null;};
_NXCPT.moi=function(){try{
var US=_NXcommon().store("UserStore");
var u=US&&US.getCurrentUser&&US.getCurrentUser();
if(!u||!u.id)return null;
return {id:String(u.id),pseudo:String(u.username||u.globalName||u.id),
tag:u.discriminator&&u.discriminator!=="0"?("#"+u.discriminator):""};}catch(_){return null;}};
_NXCPT.trouve=function(id){try{
for(var a=0;a<_NXCPT.comptes.length;a++)if(_NXCPT.comptes[a].id===String(id))return _NXCPT.comptes[a];}catch(_){}return null;};
_NXCPT.ajoute=function(cb){try{
if(!_NXCPT.ouvert){cb({err:"Ouvre le coffre avant d ajouter un compte."});return;}
var moi=_NXCPT.moi();
if(!moi){cb({err:"Compte Discord introuvable : attends que le client soit charge."});return;}
var j=_NXCPT.jetonCourant();
if(!j){cb({err:"Le jeton de session n a pas pu etre lu sur ce client."});return;}
if(_NXCPT.comptes.length>=_NXCPT.MAXC){cb({err:_NXCPT.MAXC+" comptes au maximum."});return;}
var d=_NXCPT.trouve(moi.id);
if(d){d.pseudo=moi.pseudo;d.tag=moi.tag;d.j=j;d.a=Date.now();}
else _NXCPT.comptes.push({id:moi.id,pseudo:moi.pseudo,tag:moi.tag,j:j,a:Date.now()});
_NXCPT.ecrit(function(r){cb(r.err?r:{ok:true,neuf:!d});});
}catch(_){cb({err:"Erreur interne."});}};
_NXCPT.retire=function(id,cb){try{
if(!_NXCPT.ouvert){cb({err:"Le coffre est ferme."});return;}
var out=[],a;
for(a=0;a<_NXCPT.comptes.length;a++)if(_NXCPT.comptes[a].id!==String(id))out.push(_NXCPT.comptes[a]);
_NXCPT.comptes=out;
_NXCPT.ecrit(cb||function(){});}catch(_){if(cb)cb({err:"Erreur interne."});}};
_NXCPT.bascule=function(id,cb){try{
cb=cb||function(){};
if(!_NXCPT.ouvert){cb({err:"Le coffre est ferme."});return;}
var c=_NXCPT.trouve(id);
if(!c||!c.j){cb({err:"Compte introuvable dans le coffre."});return;}
var moi=_NXCPT.moi();
if(moi&&moi.id===c.id){cb({err:"Tu es deja sur ce compte."});return;}
if(!_NXDB.ls||!_NXDB.ls.setItem){cb({err:"Le stockage de Discord est inaccessible."});return;}
try{_NXDB.ls.setItem("token",JSON.stringify(c.j));}catch(_){cb({err:"Le jeton n a pas pu etre pose."});return;}
// Le profil lie ne peut pas s appliquer ici : Discord va recharger. On le
// laisse en attente, et le module le reprend au demarrage suivant.
try{if(c.profil&&_NXCPT.trouveProfil(c.profil))_NXDB.set(_NXCPT.ENATT,String(c.profil));}catch(_){}
try{c.vu=Date.now();_NXCPT.st.bascules=(_NXCPT.st.bascules||0)+1;_NXCPT.sauveSt();
_NXCPT.ecrit(function(){});}catch(_){}
cb({ok:true});
setTimeout(function(){try{location.reload();}catch(_){}},400);
}catch(_){cb({err:"Erreur interne."});}};
// ============================================================ les profils
// Un profil est une photographie des reglages du client. Il ne contient
// AUCUN secret : ni jeton, ni coffre, ni phrase. C est pour cela qu il vit
// en clair et reste lisible meme coffre ferme -- et qu il peut s exporter
// sans precaution particuliere.
_NXCPT.PKEY="nexium_profils";
_NXCPT.PMAX=12;
// Ce qui n a rien a faire dans un profil, quoi qu il arrive.
_NXCPT.INTERDIT={nexium_comptes:1,nexium_vault:1,nexium_profils:1,
nexium_boot_guard:1,nexium_sauvegardes:1,nexium_badge_users:1,nexium_ban_state:1};
_NXCPT.clesProfil=function(){try{
var vu={},out=[];
var pousse=function(k){
if(!k||String(k).indexOf("nexium_")!==0)return;
if(_NXCPT.INTERDIT[k]||vu[k])return;
vu[k]=1;out.push(k);};
// La liste tenue par Nexium Donnees fait foi ; on complete par les cles
// d apparence et de confort, qui font partie d un profil pour un humain.
try{if(window._NXDATA&&_NXDATA.REGLAGES)
for(var a=0;a<_NXDATA.REGLAGES.length;a++)pousse(_NXDATA.REGLAGES[a]);}catch(_){}
var sup=["nexium_skin","nexium_bg","nexium_eco","nexium_motion","nexium_labo",
"nexium_restore_icons","nexium_ia","nexium_accueil","nexium_patches"];
for(var b=0;b<sup.length;b++)pousse(sup[b]);
return out;}catch(_){return [];}};

_NXCPT.profils=function(){try{
var r=_NXDB.get(_NXCPT.PKEY);
var L=r?JSON.parse(r):null;
return (L&&L.length!==undefined)?L:[];}catch(_){return [];}};
_NXCPT.sauveProfils=function(L){try{
_NXDB.set(_NXCPT.PKEY,JSON.stringify(L||[]));
_NXCPT.notify();
return true;}catch(_){return false;}};

_NXCPT.capture=function(nom){try{
var L=_NXCPT.profils();
if(L.length>=_NXCPT.PMAX)return {err:_NXCPT.PMAX+" profils au maximum."};
var t=String(nom||"").trim().slice(0,40);
if(!t)return {err:"Donne un nom a ce profil."};
for(var a=0;a<L.length;a++)if(L[a].nom.toLowerCase()===t.toLowerCase())
return {err:"Un profil porte deja ce nom."};
var cles=_NXCPT.clesProfil(),data={},n=0;
for(var b=0;b<cles.length;b++){
var v=null;try{v=_NXDB.get(cles[b]);}catch(_){v=null;}
if(v===null||v===undefined)continue;
data[cles[b]]=v;n++;}
if(!n)return {err:"Aucun reglage a capturer."};
L.push({id:"p"+Date.now().toString(36)+Math.floor(Math.random()*999).toString(36),
nom:t,quand:Date.now(),n:n,data:data});
_NXCPT.sauveProfils(L);
return {ok:true,n:n};}catch(_){return {err:"Erreur interne."};}};

_NXCPT.trouveProfil=function(id){try{
var L=_NXCPT.profils();
for(var a=0;a<L.length;a++)if(L[a].id===String(id))return L[a];
return null;}catch(_){return null;}};

// Reappliquer un profil : on ecrit les cles, puis on demande a chaque module
// de se relire. Ce qui ne sait pas se relire attendra le prochain demarrage,
// et on le dit plutot que de faire croire que tout est deja en place.
_NXCPT.rechargeModules=function(){try{
var reste=[];
var essaie=function(nom,f){try{
var o=window[nom];
if(o&&typeof o[f]==="function"){o[f]();return true;}}catch(_){}
return false;};
if(!essaie("_NXPR","reload"))reste.push("Protect");
try{if(window._NXP){
var r=_NXDB.get("nexium_privacy_v1");
if(r)_NXP.cfg=JSON.parse(r);
if(_NXP.appliquerTout)_NXP.appliquerTout();
if(_NXP.notify)_NXP.notify();}}catch(_){reste.push("Privacy");}
var visuels=[["_NXSKIN","apply"],["_NXBG","apply"],["_NXECO","apply"],
["_NXMO","apply"],["_NXFO","apply"]];
for(var a=0;a<visuels.length;a++){
try{var o=window[visuels[a][0]];
if(o&&o.KEY){var v=_NXDB.get(o.KEY);
if(v&&o.cfg!==undefined){try{o.cfg=JSON.parse(v);}catch(_){}}}
if(o&&typeof o[visuels[a][1]]==="function")o[visuels[a][1]]();}catch(_){}}
try{if(window._NXIA&&_NXIA.notify)_NXIA.notify();}catch(_){}
return reste;}catch(_){return [];}};

_NXCPT.applique=function(id){try{
var p=_NXCPT.trouveProfil(id);
if(!p||!p.data)return {err:"Profil introuvable."};
var n=0,k;
for(k in p.data){
if(!Object.prototype.hasOwnProperty.call(p.data,k))continue;
if(_NXCPT.INTERDIT[k])continue;
try{if(_NXDB.set(k,p.data[k]))n++;}catch(_){}}
var reste=_NXCPT.rechargeModules();
_NXCPT.notify();
return {ok:true,n:n,reste:reste};}catch(_){return {err:"Erreur interne."};}};

_NXCPT.majProfil=function(id){try{
var L=_NXCPT.profils(),p=null;
for(var a=0;a<L.length;a++)if(L[a].id===String(id))p=L[a];
if(!p)return {err:"Profil introuvable."};
var cles=_NXCPT.clesProfil(),data={},n=0;
for(var b=0;b<cles.length;b++){
var v=null;try{v=_NXDB.get(cles[b]);}catch(_){v=null;}
if(v===null||v===undefined)continue;
data[cles[b]]=v;n++;}
p.data=data;p.n=n;p.quand=Date.now();
_NXCPT.sauveProfils(L);
return {ok:true,n:n};}catch(_){return {err:"Erreur interne."};}};

_NXCPT.renommeProfil=function(id,nom){try{
var t=String(nom||"").trim().slice(0,40);
if(!t)return {err:"Nom vide."};
var L=_NXCPT.profils(),vu=false;
for(var a=0;a<L.length;a++){
if(L[a].id!==String(id)&&L[a].nom.toLowerCase()===t.toLowerCase())
return {err:"Un profil porte deja ce nom."};
if(L[a].id===String(id)){L[a].nom=t;vu=true;}}
if(!vu)return {err:"Profil introuvable."};
_NXCPT.sauveProfils(L);
return {ok:true};}catch(_){return {err:"Erreur interne."};}};

_NXCPT.supprimeProfil=function(id){try{
var L=_NXCPT.profils(),out=[];
for(var a=0;a<L.length;a++)if(L[a].id!==String(id))out.push(L[a]);
_NXCPT.sauveProfils(out);
// Un compte qui pointait dessus ne doit pas garder un lien mort.
if(_NXCPT.ouvert){
var bouge=false;
for(var b=0;b<_NXCPT.comptes.length;b++)
if(_NXCPT.comptes[b].profil===String(id)){delete _NXCPT.comptes[b].profil;bouge=true;}
if(bouge)_NXCPT.ecrit(function(){});}
return {ok:true};}catch(_){return {err:"Erreur interne."};}};

_NXCPT.exporteProfil=function(id){try{
var p=_NXCPT.trouveProfil(id);
if(!p)return "";
return JSON.stringify({nexium:"profil",v:1,nom:p.nom,quand:p.quand,data:p.data},null,1);
}catch(_){return "";}};
_NXCPT.importeProfil=function(txt){try{
var j=JSON.parse(String(txt||""));
if(!j||j.nexium!=="profil"||!j.data)return {err:"Ce texte n est pas un profil Nexium."};
var L=_NXCPT.profils();
if(L.length>=_NXCPT.PMAX)return {err:_NXCPT.PMAX+" profils au maximum."};
var nom=String(j.nom||"Profil importe").slice(0,40),base=nom,k=2;
var pris=function(x){for(var a=0;a<L.length;a++)if(L[a].nom.toLowerCase()===x.toLowerCase())return true;return false;};
while(pris(nom)){nom=base+" "+k;k++;}
var data={},n=0,key;
for(key in j.data){
if(!Object.prototype.hasOwnProperty.call(j.data,key))continue;
// Un profil importe ne peut pas glisser une cle interdite : c est le seul
// endroit ou des donnees viennent de l exterieur.
if(String(key).indexOf("nexium_")!==0||_NXCPT.INTERDIT[key])continue;
if(typeof j.data[key]!=="string")continue;
data[key]=j.data[key];n++;}
if(!n)return {err:"Ce profil ne contient aucun reglage exploitable."};
L.push({id:"p"+Date.now().toString(36)+Math.floor(Math.random()*999).toString(36),
nom:nom,quand:Date.now(),n:n,data:data});
_NXCPT.sauveProfils(L);
return {ok:true,nom:nom,n:n};}catch(_){return {err:"Texte illisible."};}};

// ============================================================ les comptes
_NXCPT.MAXC=12;
_NXCPT.majCompte=function(id,f){try{
if(!_NXCPT.ouvert)return {err:"Le coffre est ferme."};
var c=_NXCPT.trouve(id);
if(!c)return {err:"Compte introuvable."};
f(c);
_NXCPT.ecrit(function(){});
return {ok:true};}catch(_){return {err:"Erreur interne."};}};
_NXCPT.note=function(id,txt){
return _NXCPT.majCompte(id,function(c){
var t=String(txt||"").trim().slice(0,120);
if(t)c.note=t;else delete c.note;});};
_NXCPT.COULEURS=["ivoire","vert","bleu","ambre","rose","gris"];
_NXCPT.couleur=function(id,col){
return _NXCPT.majCompte(id,function(c){
if(_NXCPT.COULEURS.indexOf(col)>=0)c.col=col;else delete c.col;});};
_NXCPT.lieProfil=function(id,pid){
return _NXCPT.majCompte(id,function(c){
if(pid&&_NXCPT.trouveProfil(pid))c.profil=String(pid);else delete c.profil;});};
_NXCPT.epingle=function(id){
return _NXCPT.majCompte(id,function(c){c.pin=!c.pin;});};
_NXCPT.deplace=function(id,sens){try{
if(!_NXCPT.ouvert)return {err:"Le coffre est ferme."};
var L=_NXCPT.comptes,ix=-1;
for(var a=0;a<L.length;a++)if(L[a].id===String(id))ix=a;
if(ix<0)return {err:"Compte introuvable."};
var cible=ix+(sens<0?-1:1);
if(cible<0||cible>=L.length)return {ok:true};
var t=L[ix];L[ix]=L[cible];L[cible]=t;
_NXCPT.ecrit(function(){});
return {ok:true};}catch(_){return {err:"Erreur interne."};}};
// L ordre d affichage : les epingles d abord, l ordre choisi ensuite.
_NXCPT.ordonnes=function(){try{
var L=_NXCPT.comptes.slice();
var pin=[],reste=[];
for(var a=0;a<L.length;a++)(L[a].pin?pin:reste).push(L[a]);
return pin.concat(reste);}catch(_){return _NXCPT.comptes||[];}};

// Un jeton ne se verifie pas sans s en servir, et s en servir depuis un
// client modifie est exactement ce qu il ne faut pas faire. On mesure donc
// son age : c est honnete, local, et sans risque.
_NXCPT.JOUR=86400000;
_NXCPT.age=function(c){try{
var d=Date.now()-((c&&c.a)||0);
return Math.max(0,Math.floor(d/_NXCPT.JOUR));}catch(_){return 0;}};
_NXCPT.fraicheur=function(c){try{
var j=_NXCPT.age(c);
if(j<=14)return {etat:"frais",j:j};
if(j<=45)return {etat:"a verifier",j:j};
return {etat:"probablement perime",j:j};}catch(_){return {etat:"inconnu",j:0};}};
_NXCPT.majJeton=function(id,cb){try{
cb=cb||function(){};
if(!_NXCPT.ouvert){cb({err:"Le coffre est ferme."});return;}
var moi=_NXCPT.moi();
if(!moi||moi.id!==String(id)){cb({err:"Bascule d abord sur ce compte : on ne peut relever que le jeton en cours."});return;}
var j=_NXCPT.jetonCourant();
if(!j){cb({err:"Le jeton de session n a pas pu etre lu."});return;}
var c=_NXCPT.trouve(id);
if(!c){cb({err:"Compte introuvable."});return;}
c.j=j;c.a=Date.now();c.pseudo=moi.pseudo;c.tag=moi.tag;
_NXCPT.ecrit(function(r){cb(r.err?r:{ok:true});});}catch(_){cb({err:"Erreur interne."});}};

// ============================================================ le coffre
_NXCPT.SKEY="nexium_comptes_st";
_NXCPT.st=(function(){try{
var r=_NXDB.get(_NXCPT.SKEY);var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")d={};
if(typeof d.bascules!=="number")d.bascules=0;
if(typeof d.verrou!=="number")d.verrou=15;
return d;}catch(_){return {bascules:0,verrou:15};}})();
_NXCPT.sauveSt=function(){try{_NXDB.set(_NXCPT.SKEY,JSON.stringify(_NXCPT.st));}catch(_){}};

// Changer la phrase : impossible jusqu ici autrement qu en effacant tout.
_NXCPT.changePhrase=function(ancienne,nouvelle,cb){try{
cb=cb||function(){};
if(!_NXCPT.ouvert){cb({err:"Ouvre le coffre avant de changer sa phrase."});return;}
var np=String(nouvelle||"");
if(np.length<8){cb({err:"La nouvelle phrase doit faire au moins 8 caracteres."});return;}
// On verifie l ancienne en la rederivant sur le sel courant : sans cela,
// quiconque passe devant un coffre ouvert pourrait le reverrouiller.
_NXCPT.derive(String(ancienne||""),_NXCPT.sel).then(function(k){
var v=_NXCPT.coffre();
if(!v){cb({err:"Coffre introuvable."});return;}
return crypto.subtle.decrypt({name:"AES-GCM",iv:_NXCPT.deb64(v.iv)},k,_NXCPT.deb64(v.d))
.then(function(){
var sel=crypto.getRandomValues(new Uint8Array(16));
return _NXCPT.derive(np,sel).then(function(k2){
_NXCPT.cle=k2;_NXCPT.sel=sel;
_NXCPT.ecrit(function(r){cb(r.err?r:{ok:true});});});});
}).catch(function(){cb({err:"Phrase actuelle incorrecte."});});
}catch(_){cb({err:"Erreur interne."});}};

// Le coffre exporte reste chiffre : c est le meme bloc, illisible sans la
// phrase. Sans cela, un vidage du stockage de Discord effacait tout sans
// aucun recours.
_NXCPT.exporteCoffre=function(){try{
var v=_NXCPT.coffre();
if(!v)return "";
return JSON.stringify({nexium:"coffre",v:1,quand:Date.now(),coffre:v},null,1);
}catch(_){return "";}};
_NXCPT.importeCoffre=function(txt){try{
var j=JSON.parse(String(txt||""));
if(!j||j.nexium!=="coffre"||!j.coffre)return {err:"Ce texte n est pas un coffre Nexium."};
var c=j.coffre;
if(!c.sel||!c.iv||!c.d)return {err:"Coffre incomplet."};
_NXDB.set(_NXCPT.KEY,JSON.stringify({v:1,sel:c.sel,iv:c.iv,d:c.d}));
_NXCPT.ferme();
return {ok:true};}catch(_){return {err:"Texte illisible."};}};

// Verrouillage automatique. Un coffre ouvert est un coffre ouvert : le
// laisser ainsi toute la soiree annule l interet de la phrase.
_NXCPT.geste=Date.now();
_NXCPT.touche=function(){try{_NXCPT.geste=Date.now();}catch(_){}};
_NXCPT.setVerrou=function(min){try{
var n=parseInt(min,10);
if(!(n===0||(n>=1&&n<=240)))return false;
_NXCPT.st.verrou=n;_NXCPT.sauveSt();_NXCPT.notify();
return true;}catch(_){return false;}};
_NXCPT.veille=function(){try{
if(!_NXCPT.ouvert)return;
var m=_NXCPT.st.verrou;
if(!m)return;
if((Date.now()-_NXCPT.geste)<m*60000)return;
_NXCPT.ferme();
try{if(window._NXPR&&_NXPR.toast)
_NXPR.toast(_NXtr("Coffre des comptes referme apres ")+_NXtr(m)+_NXtr(" minutes sans activite."),1);}catch(_){}
}catch(_){}};
try{setInterval(_NXCPT.veille,30000);}catch(_){}

// Un profil lie a un compte s applique APRES le rechargement : la bascule
// recharge Discord, donc rien de ce qu on ferait maintenant ne survivrait.
_NXCPT.ENATT="nexium_profil_attente";
try{setTimeout(function(){try{
var pid=_NXDB.get(_NXCPT.ENATT);
if(!pid)return;
_NXDB.del(_NXCPT.ENATT);
var r=_NXCPT.applique(pid);
if(r&&r.ok&&window._NXPR&&_NXPR.toast)
_NXPR.toast(_NXtr("Profil applique : ")+_NXtr(r.n)+_NXtr(" reglage(s) restaures."),1);
}catch(_){}},4000);}catch(_){}

_NXCPT.Icone=function(){return i("svg",{viewBox:"0 0 24 24",width:20,height:20,fill:"currentColor","aria-hidden":"true"},i("path",{d:"M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm0 2c-3.33 0-6 1.34-6 3v2h9.35A5.98 5.98 0 0 1 11 15.5c0-.52.07-1.02.19-1.5H9zm9 .5-1.15 1.15L18 17H14v2h4l-1.15 1.15L18 21.5l3-3-3-3z"}));};
_NXCPT.HB=function(){try{
var V=window.Vencord;
return (V&&V.Api&&V.Api.HeaderBar)||null;}catch(_){return null;}};
_NXCPT.autres=function(){try{
if(!_NXCPT.ouvert)return [];
var moi=_NXCPT.moi(),out=[],a;
for(a=0;a<_NXCPT.comptes.length;a++){
var c=_NXCPT.comptes[a];
if(!moi||c.id!==moi.id)out.push(c);}
return out;}catch(_){return [];}};
_NXCPT.suivant=function(){try{
var L=_NXCPT.autres();
return L.length?L[0]:null;}catch(_){return null;}};
_NXCPT.barre=function(){try{
var HB=_NXCPT.HB();
if(!HB||typeof HB.addHeaderBarButton!=="function"||!HB.HeaderBarButton){
_NXCPT._bt=(_NXCPT._bt||0)+1;
if(_NXCPT._bt<40)setTimeout(_NXCPT.barre,1500);
return false;}
if(_NXCPT._barre)return true;
_NXCPT._barre=true;
HB.addHeaderBarButton("nexium-comptes",function(){try{
var L=_NXCPT.autres();
if(!L.length)return null;
var suiv=L[0];
return i(HB.HeaderBarButton,{
icon:_NXCPT.Icone,
tooltip:(L.length===1)
?("Basculer vers "+suiv.pseudo)
:("Changer de compte \u2014 "+L.length+" disponibles"),
"aria-label":_NXtr("Changer de compte Nexium"),
onClick:function(){try{
if(L.length>1){_NXCP.ouvrir("equicord_comptes","Nexium Comptes");return;}
if(!window.confirm(_NXtr("Basculer vers ")+_NXtr(suiv.pseudo)+_NXtr(" ?\nDiscord va se recharger.")))return;
_NXCPT.bascule(suiv.id,function(){});}catch(_){}}});}catch(_){return null;}},6);
return true;}catch(_){return false;}};
_NXCPT.rafraichisBarre=function(){try{
var HB=_NXCPT.HB();
if(HB&&typeof HB.removeHeaderBarButton==="function"&&_NXCPT._barre){
HB.removeHeaderBarButton("nexium-comptes");
_NXCPT._barre=false;
_NXCPT.barre();}}catch(_){}};
try{setTimeout(_NXCPT.barre,6500);
_NXCPT.listeners.push(function(){try{_NXCPT.rafraichisBarre();}catch(_){}});}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXCPT");if(window._NXERR)_NXERR.push("module _NXCPT :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXCPT desactive:",_nxE);}catch(_){}}
}
