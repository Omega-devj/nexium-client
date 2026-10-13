var _NXOUT=window._NXOUT||(window._NXOUT={});
if(!_NXOUT.boot){try{_NXOUT.boot=true;
// La boite a outils.
//
// Les outils hors-ligne ne font sortir aucun octet. Ceux qui vont sur le
// reseau le disent avant, parce qu interroger un resolveur public c est lui
// apprendre ce qu on cherche.
_NXOUT.KEY="nexium_outils";
_NXOUT.VERSIONCGU=1;
_NXOUT.cfg={cgu:0,quand:0,cases:[],histo:[]};
_NXOUT._ecoute=[];

_NXOUT.notify=function(){try{
for(var a=0;a<_NXOUT._ecoute.length;a++){try{_NXOUT._ecoute[a]();}catch(_){}}}catch(_){}};

_NXOUT.load=function(){try{
var r=_NXDB.get(_NXOUT.KEY);
var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")d={};
if(typeof d.cgu!=="number")d.cgu=0;
if(typeof d.quand!=="number")d.quand=0;
if(!d.cases||!d.cases.length)d.cases=[];
if(!d.histo||!d.histo.length)d.histo=[];
_NXOUT.cfg=d;return d;}catch(_){return null;}};
_NXOUT.save=function(){try{_NXDB.set(_NXOUT.KEY,JSON.stringify(_NXOUT.cfg));}catch(_){}};

// --- la porte ---------------------------------------------------------------
// Cinq engagements distincts. Cocher les cinq est le seul moyen d entrer, et
// une seule case decochee referme la porte.
_NXOUT.CASES=[
{k:"propriete",t:"Je n’analyse que ce qui m’appartient, ou ce pour quoi j’ai une autorisation écrite du propriétaire. Un système, un domaine ou un réseau qui n’est pas à moi n’est pas une cible."},
{k:"presomption",t:"Je comprends que l’autorisation ne se présume pas : un site public, un serveur Discord dont je suis membre, la machine d’un ami — aucun des trois ne m’autorise à les sonder."},
{k:"donnees",t:"Je n’utilise pas ces outils pour atteindre des données privées, des identifiants ou des comptes compromis. Nexium n’en fournit aucun et n’en cherchera aucun."},
{k:"trace",t:"Je sais que ces usages sont consignés sur ma machine — date, outil, cible — et que ce journal existe pour ma protection."},
{k:"loi",t:"J’ai conscience que l’usage non autorisé est un délit dans la plupart des pays, indépendamment de l’intention, et que Nexium ne me protège d’aucune conséquence."}];

_NXOUT.PREAMBULE="Ces outils servent à comprendre, diagnostiquer et défendre ce qui t’appartient. Ils ne sont pas bridés : c’est toi qui réponds de ce que tu en fais.";
_NXOUT.CLOTURE="Nexium ne vérifie pas tes autorisations et ne peut pas le faire. Ces outils sont ouverts parce que te les refuser reviendrait à décider à ta place. Ce que tu en fais t’appartient entièrement.";

_NXOUT.ouvert=function(){try{
return _NXOUT.cfg.cgu===_NXOUT.VERSIONCGU;}catch(_){return false;}};

_NXOUT.accepte=function(cases){try{
var a,vu={};
for(a=0;a<(cases||[]).length;a++)vu[cases[a]]=1;
for(a=0;a<_NXOUT.CASES.length;a++)if(!vu[_NXOUT.CASES[a].k])return false;
_NXOUT.cfg.cgu=_NXOUT.VERSIONCGU;
_NXOUT.cfg.quand=Date.now();
_NXOUT.cfg.cases=cases.slice(0);
_NXOUT.save();_NXOUT.notify();
return true;}catch(_){return false;}};

_NXOUT.referme=function(){try{
_NXOUT.cfg.cgu=0;_NXOUT.cfg.quand=0;_NXOUT.cfg.cases=[];
_NXOUT.save();_NXOUT.notify();return true;}catch(_){return false;}};

// Le journal : ce qui a ete lance, quand, sur quoi. Il ne quitte pas la
// machine, et c est ce que promet la quatrieme case.
_NXOUT.MAXHISTO=200;
_NXOUT.trace=function(outil,cible,reseau){try{
_NXOUT.cfg.histo.unshift({o:outil,c:String(cible||"").substring(0,120),
r:!!reseau,q:Date.now()});
if(_NXOUT.cfg.histo.length>_NXOUT.MAXHISTO)_NXOUT.cfg.histo.length=_NXOUT.MAXHISTO;
_NXOUT.save();_NXOUT.notify();return true;}catch(_){return false;}};
_NXOUT.oublie=function(){try{
_NXOUT.cfg.histo=[];_NXOUT.save();_NXOUT.notify();return true;}catch(_){return false;}};

// --- encodage ---------------------------------------------------------------
_NXOUT.versUtf8=function(t){try{return new TextEncoder().encode(String(t));}catch(_){return new Uint8Array(0);}};
_NXOUT.depuisUtf8=function(u){try{return new TextDecoder().decode(u);}catch(_){return "";}};

_NXOUT.b64=function(t){try{
var u=_NXOUT.versUtf8(t),s2="",a;
for(a=0;a<u.length;a++)s2+=String.fromCharCode(u[a]);
return {ok:true,v:btoa(s2)};}catch(e){return {ok:false,e:"encodage impossible"};}};

_NXOUT.deb64=function(t){try{
var x=String(t||"").replace(/\s+/g,"");
var b=atob(x),u=new Uint8Array(b.length),a;
for(a=0;a<b.length;a++)u[a]=b.charCodeAt(a);
return {ok:true,v:_NXOUT.depuisUtf8(u)};}catch(e){
return {ok:false,e:"ce n est pas du base64 valide"};}};

_NXOUT.hex=function(t){try{
var u=_NXOUT.versUtf8(t),s2="",a;
for(a=0;a<u.length;a++)s2+=("0"+u[a].toString(16)).slice(-2);
return {ok:true,v:s2};}catch(_){return {ok:false,e:"encodage impossible"};}};

_NXOUT.dehex=function(t){try{
var x=String(t||"").replace(/[\s:_-]/g,"");
if(x.length%2)return {ok:false,e:"nombre impair de caracteres"};
if(!/^[0-9a-fA-F]*$/.test(x))return {ok:false,e:"ce n est pas de l hexadecimal"};
var u=new Uint8Array(x.length/2),a;
for(a=0;a<u.length;a++)u[a]=parseInt(x.substr(a*2,2),16);
return {ok:true,v:_NXOUT.depuisUtf8(u)};}catch(_){return {ok:false,e:"decodage impossible"};}};

_NXOUT.urlEnc=function(t){try{return {ok:true,v:encodeURIComponent(String(t))};}catch(_){return {ok:false,e:"encodage impossible"};}};
_NXOUT.urlDec=function(t){try{return {ok:true,v:decodeURIComponent(String(t))};}catch(_){
return {ok:false,e:"sequence d echappement invalide"};}};

// --- JSON -------------------------------------------------------------------
_NXOUT.json=function(t,indent){try{
var v=JSON.parse(String(t));
return {ok:true,v:JSON.stringify(v,null,(typeof indent==="number")?indent:2),
noeuds:_NXOUT.compteNoeuds(v),profondeur:_NXOUT.profondeur(v)};}catch(e){
var m=String((e&&e.message)||"");
var p=m.match(/position\s+(\d+)/i);
return {ok:false,e:"JSON invalide"+(p?(" \u00b7 vers le caractere "+p[1]):""),brut:m};}};

_NXOUT.compteNoeuds=function(v){try{
if(v===null||typeof v!=="object")return 1;
var n=1,k;
if(Object.prototype.toString.call(v)==="[object Array]"){
for(k=0;k<v.length;k++)n+=_NXOUT.compteNoeuds(v[k]);return n;}
for(k in v)n+=_NXOUT.compteNoeuds(v[k]);
return n;}catch(_){return 0;}};

_NXOUT.profondeur=function(v,d){try{
d=d||0;
if(d>60||v===null||typeof v!=="object")return d;
var mx=d,k,p;
for(k in v){p=_NXOUT.profondeur(v[k],d+1);if(p>mx)mx=p;}
return mx;}catch(_){return d||0;}};

// --- JWT --------------------------------------------------------------------
// On DECODE, on ne verifie pas. Verifier demanderait la clef ; l envoyer
// quelque part reviendrait a livrer le jeton.
_NXOUT.jwt=function(t){try{
var p=String(t||"").trim().split(".");
if(p.length<2)return {ok:false,e:"ce n est pas un jeton JWT (il faut au moins deux parties)"};
function part(x){
var y=x.replace(/-/g,"+").replace(/_/g,"/");
while(y.length%4)y+="=";
var r=_NXOUT.deb64(y);
if(!r.ok)return null;
try{return JSON.parse(r.v);}catch(_){return null;}}
var tete=part(p[0]),corps=part(p[1]);
if(!tete||!corps)return {ok:false,e:"les parties ne sont pas du JSON encode"};
var out={ok:true,tete:tete,corps:corps,signature:p[2]||"",
verifie:false,note:"Nexium decode ce jeton, il ne verifie pas sa signature : il faudrait la clef, et l envoyer quelque part reviendrait a livrer le jeton."};
if(typeof corps.exp==="number"){
out.expire=new Date(corps.exp*1000).toISOString();
out.perime=(corps.exp*1000)<Date.now();}
if(typeof corps.iat==="number")out.emis=new Date(corps.iat*1000).toISOString();
return out;}catch(_){return {ok:false,e:"jeton illisible"};}};

// --- empreintes -------------------------------------------------------------
_NXOUT.ALGOS=["SHA-1","SHA-256","SHA-384","SHA-512"];
_NXOUT.empreinte=function(donnees,algo){try{
var u=(donnees instanceof Uint8Array)?donnees:_NXOUT.versUtf8(donnees);
return window.crypto.subtle.digest(algo||"SHA-256",u).then(function(b){
var x=new Uint8Array(b),s2="",a;
for(a=0;a<x.length;a++)s2+=("0"+x[a].toString(16)).slice(-2);
return s2;});}catch(e){return Promise.reject(e);}};

_NXOUT.empreintes=function(donnees){try{
var taches=[],a;
for(a=0;a<_NXOUT.ALGOS.length;a++)taches.push(_NXOUT.empreinte(donnees,_NXOUT.ALGOS[a]));
return Promise.all(taches).then(function(L){
var out={},k;
for(k=0;k<_NXOUT.ALGOS.length;k++)out[_NXOUT.ALGOS[k]]=L[k];
return out;});}catch(e){return Promise.reject(e);}};

// --- identifiants, temps ----------------------------------------------------
_NXOUT.uuid=function(){try{
var u=new Uint8Array(16);window.crypto.getRandomValues(u);
u[6]=(u[6]&0x0f)|0x40;u[8]=(u[8]&0x3f)|0x80;
var h="",a;
for(a=0;a<16;a++)h+=("0"+u[a].toString(16)).slice(-2);
return h.substring(0,8)+"-"+h.substring(8,12)+"-"+h.substring(12,16)+"-"+
h.substring(16,20)+"-"+h.substring(20);}catch(_){return "";}};

// Un identifiant Discord porte sa date de naissance dans ses bits de poids
// fort. C est exact, pas estime.
_NXOUT.EPOQUE=1420070400000;
_NXOUT.flocon=function(id){try{
var x=String(id||"").replace(/\D/g,"");
if(x.length<15||x.length>25)return {ok:false,e:"un identifiant Discord fait 17 a 20 chiffres"};
var ms=Math.floor(Number(x)/4194304)+_NXOUT.EPOQUE;
if(!isFinite(ms)||ms<_NXOUT.EPOQUE)return {ok:false,e:"cet identifiant ne porte pas de date valide"};
var d=new Date(ms);
var age=Math.floor((Date.now()-ms)/86400000);
return {ok:true,date:d.toISOString(),jours:age,
lisible:d.toLocaleString("fr-FR"),
note:age<30?"compte tres recent : c est le premier signal d un faux profil":""};}catch(_){
return {ok:false,e:"identifiant illisible"};}};

_NXOUT.temps=function(v){try{
var x=String(v||"").trim();
var n=Number(x);
if(/^\d{9,10}$/.test(x))return {ok:true,ms:n*1000,iso:new Date(n*1000).toISOString(),source:"secondes"};
if(/^\d{12,14}$/.test(x))return {ok:true,ms:n,iso:new Date(n).toISOString(),source:"millisecondes"};
var d=new Date(x);
if(isFinite(d.getTime()))return {ok:true,ms:d.getTime(),iso:d.toISOString(),
unix:Math.floor(d.getTime()/1000),source:"date"};
return {ok:false,e:"format non reconnu (essaie un horodatage unix ou une date ISO)"};}catch(_){
return {ok:false,e:"conversion impossible"};}};

// --- texte ------------------------------------------------------------------
_NXOUT.INVISIBLES=[
{c:"\u200b",n:"espace sans largeur"},{c:"\u200c",n:"non-liant"},
{c:"\u200d",n:"liant"},{c:"\u2060",n:"mot insecable"},
{c:"\ufeff",n:"marque d ordre des octets"},{c:"\u00ad",n:"trait d union conditionnel"},
{c:"\u202e",n:"inversion du sens de lecture"},{c:"\u202d",n:"forcage du sens"}];

_NXOUT.invisibles=function(t){try{
var x=String(t||""),out=[],a,k,n;
for(a=0;a<_NXOUT.INVISIBLES.length;a++){
n=0;
for(k=0;k<x.length;k++)if(x.charAt(k)===_NXOUT.INVISIBLES[a].c)n++;
if(n)out.push({n:_NXOUT.INVISIBLES[a].n,combien:n,
point:"U+"+_NXOUT.INVISIBLES[a].c.charCodeAt(0).toString(16).toUpperCase()});}
return {ok:true,trouves:out,propre:x.replace(/[\u200b\u200c\u200d\u2060\ufeff\u00ad\u202a-\u202e]/g,""),
danger:out.some?out.some(function(z){return /inversion|forcage/.test(z.n);}):false};}catch(_){
return {ok:false,e:"analyse impossible"};}};

// Un diff par lignes, avec la plus longue sous-suite commune.
_NXOUT.diff=function(a,b){try{
var A=String(a||"").split("\n"),B=String(b||"").split("\n");
if(A.length>2000||B.length>2000)return {ok:false,e:"trop de lignes (2000 au maximum)"};
var n=A.length,m=B.length,k,j;
var T=[];
for(k=0;k<=n;k++){T.push(new Array(m+1));for(j=0;j<=m;j++)T[k][j]=0;}
for(k=n-1;k>=0;k--)for(j=m-1;j>=0;j--)
T[k][j]=(A[k]===B[j])?T[k+1][j+1]+1:Math.max(T[k+1][j],T[k][j+1]);
var out=[],i2=0,j2=0,pl=0,mo=0;
while(i2<n&&j2<m){
if(A[i2]===B[j2]){out.push({s:" ",t:A[i2]});i2++;j2++;}
else if(T[i2+1][j2]>=T[i2][j2+1]){out.push({s:"-",t:A[i2]});i2++;mo++;}
else {out.push({s:"+",t:B[j2]});j2++;pl++;}}
while(i2<n){out.push({s:"-",t:A[i2++]});mo++;}
while(j2<m){out.push({s:"+",t:B[j2++]});pl++;}
return {ok:true,lignes:out,ajoutees:pl,retirees:mo,
identiques:out.length-pl-mo};}catch(_){return {ok:false,e:"comparaison impossible"};}};

// --- secrets ----------------------------------------------------------------
_NXOUT.JEUX={
minuscules:"abcdefghijkmnopqrstuvwxyz",
majuscules:"ABCDEFGHJKLMNPQRSTUVWXYZ",
chiffres:"23456789",
symboles:"!#$%&*+-=?@^_~"};

_NXOUT.motDePasse=function(n,opt){try{
opt=opt||{};
var jeu="";
if(opt.minuscules!==false)jeu+=_NXOUT.JEUX.minuscules;
if(opt.majuscules!==false)jeu+=_NXOUT.JEUX.majuscules;
if(opt.chiffres!==false)jeu+=_NXOUT.JEUX.chiffres;
if(opt.symboles)jeu+=_NXOUT.JEUX.symboles;
if(!jeu)return {ok:false,e:"aucun jeu de caracteres choisi"};
var L=Math.max(8,Math.min(128,n||20));
// Rejet du biais : on ne garde que les tirages qui tombent dans un multiple
// entier de la taille du jeu. Un simple modulo favoriserait les premiers
// caracteres.
var out="",u=new Uint8Array(1),seuil=256-(256%jeu.length);
while(out.length<L){
window.crypto.getRandomValues(u);
if(u[0]>=seuil)continue;
out+=jeu.charAt(u[0]%jeu.length);}
return {ok:true,v:out,bits:Math.round(L*(Math.log(jeu.length)/Math.LN2)),jeu:jeu.length};}catch(_){
return {ok:false,e:"generation impossible"};}};

_NXOUT.cle=function(octets,forme){try{
var n=Math.max(8,Math.min(256,octets||32));
var u=new Uint8Array(n);window.crypto.getRandomValues(u);
if(forme==="base64")return {ok:true,v:_NXOUT.b64(_NXOUT.depuisUtf8(u)).v,octets:n};
var h="",a;
for(a=0;a<n;a++)h+=("0"+u[a].toString(16)).slice(-2);
return {ok:true,v:h,octets:n};}catch(_){return {ok:false,e:"generation impossible"};}};

// La robustesse se mesure en bits, pas en etoiles. Et on dit d ou vient le
// chiffre.
_NXOUT.COURANTS=["123456","password","motdepasse","azerty","qwerty","111111",
"123456789","motdepasse1","admin","soleil","bonjour","iloveyou","000000"];

_NXOUT.robustesse=function(mdp){try{
var x=String(mdp||"");
if(!x)return {ok:false,e:"mot de passe vide"};
var jeu=0,notes=[];
if(/[a-z]/.test(x))jeu+=26;
if(/[A-Z]/.test(x))jeu+=26;
if(/[0-9]/.test(x))jeu+=10;
if(/[^A-Za-z0-9]/.test(x))jeu+=33;
var bits=Math.round(x.length*(Math.log(Math.max(2,jeu))/Math.LN2));
if(x.length<12)notes.push("moins de 12 caracteres : la longueur compte plus que la complexite");
if(/^(.)\1+$/.test(x))notes.push("un seul caractere repete");
if(/^\d+$/.test(x))notes.push("uniquement des chiffres");
var bas=x.toLowerCase();
for(var a=0;a<_NXOUT.COURANTS.length;a++)
if(bas===_NXOUT.COURANTS[a]||bas.indexOf(_NXOUT.COURANTS[a])===0){
notes.push("il commence par un mot de passe tres courant : la longueur ne le sauve pas");
bits=Math.min(bits,14);break;}
if(/(.)\1{2,}/.test(x))notes.push("trois fois le meme caractere de suite");
if(/(0123|1234|2345|abcd|azer|qwer)/i.test(bas))notes.push("une suite reconnaissable");
var verdict=bits>=90?"tres solide":(bits>=70?"solide":(bits>=45?"moyen":"faible"));
return {ok:true,bits:bits,jeu:jeu,longueur:x.length,verdict:verdict,notes:notes,
explication:"Le calcul suppose que l attaquant connait le jeu de caracteres utilise ("+jeu+" possibilites) et essaie tout. C est l hypothese prudente."};}catch(_){
return {ok:false,e:"analyse impossible"};}};

// --- reseau -----------------------------------------------------------------
// Chaque outil de cette section sort de la machine. Le nom du domaine part
// chez un tiers : c est dit dans l interface avant le clic.
_NXOUT.DOH="https://cloudflare-dns.com/dns-query";
_NXOUT.CT="https://crt.sh/?output=json&q=";
_NXOUT.TYPESDNS=["A","AAAA","MX","TXT","NS","CNAME","SOA","CAA"];

_NXOUT.hoteValide=function(h){try{
var x=String(h||"").trim().toLowerCase();
if(!x||x.length>253)return false;
return /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)+$/.test(x);}catch(_){return false;}};

_NXOUT.dns=function(nom,type){try{
var h=String(nom||"").trim().toLowerCase();
if(!_NXOUT.hoteValide(h))
return Promise.resolve({ok:false,e:"ce nom n a pas la forme d un domaine : rien n a ete envoye"});
var t=(_NXOUT.TYPESDNS.indexOf(type)>=0)?type:"A";
_NXOUT.trace("dns",h+" "+t,true);
return _NXNETX.go(_NXOUT.DOH+"?name="+encodeURIComponent(h)+"&type="+t,
{method:"GET",headers:{"accept":"application/dns-json"}},10000)
.then(function(r){return r.json();})
.then(function(j){
var L=(j&&j.Answer)||[],out=[],a;
for(a=0;a<L.length;a++)out.push({nom:L[a].name,type:L[a].type,ttl:L[a].TTL,v:L[a].data});
return {ok:true,type:t,domaine:h,reponses:out,
statut:(j&&typeof j.Status==="number")?j.Status:null,
vide:out.length===0};},
function(){return {ok:false,e:"le resolveur n a pas repondu"};});}catch(_){
return Promise.resolve({ok:false,e:"requete impossible"});}};

// Les journaux de transparence : tout certificat public y est inscrit. C est
// de l information publique, et ca raconte l histoire d un domaine.
// Les journaux de transparence rendent des dates sans fuseau. Les lire en
// heure locale les decale d un jour selon la machine -- et cette page sert
// justement a dire "ce domaine date d hier".
_NXOUT.dateUTC=function(x){try{
var t=String(x||"").trim().replace(" ","T");
if(!t)return NaN;
if(!/(Z|[+-]\d{2}:?\d{2})$/.test(t))t+="Z";
return Date.parse(t);}catch(_){return NaN;}};

_NXOUT.certificats=function(domaine){try{
var h=String(domaine||"").trim().toLowerCase();
if(!_NXOUT.hoteValide(h))
return Promise.resolve({ok:false,e:"ce nom n a pas la forme d un domaine : rien n a ete envoye"});
_NXOUT.trace("certificats",h,true);
return _NXNETX.go(_NXOUT.CT+encodeURIComponent(h),{method:"GET"},15000)
.then(function(r){return r.json();})
.then(function(j){
if(!j||!j.length)return {ok:true,domaine:h,certs:[],vide:true};
var out=[],a,vu={};
for(a=0;a<j.length&&out.length<60;a++){
var c=j[a];
var cle=String(c.issuer_name||"")+"|"+String(c.not_before||"");
if(vu[cle])continue;vu[cle]=1;
out.push({emetteur:String(c.issuer_name||"").substring(0,90),
noms:String(c.name_value||"").split("\n").slice(0,6),
debut:c.not_before,fin:c.not_after});}
var premier=null;
for(a=0;a<j.length;a++){
var d=_NXOUT.dateUTC(j[a].not_before);
if(isFinite(d)&&(premier===null||d<premier))premier=d;}
return {ok:true,domaine:h,certs:out,total:j.length,
premier:premier?new Date(premier).toISOString().slice(0,10):null,
note:premier&&(Date.now()-premier)<2592000000?
"le premier certificat connu date de moins d un mois : ce domaine est tres recent":""};},
function(){return {ok:false,e:"le journal de transparence n a pas repondu"};});}catch(_){
return Promise.resolve({ok:false,e:"requete impossible"});}};

// Ce qu un navigateur peut VRAIMENT lire d une reponse HTTP : presque rien,
// sauf si le site l autorise. On le dit au lieu d afficher un tableau vide.
_NXOUT.entetes=function(url){try{
var u=String(url||"").trim();
if(!/^https?:\/\//i.test(u))return Promise.resolve({ok:false,e:"il faut une adresse commencant par http:// ou https://"});
_NXOUT.trace("entetes",u,true);
var t0=Date.now();
return _NXNETX.go(u,{method:"GET"},12000)
.then(function(r){
var lus={},n=0;
try{r.headers.forEach(function(v,k){lus[k]=v;n++;});}catch(_){}
return {ok:true,url:u,statut:r.status,finale:r.url||u,
redirige:!!r.redirected,ms:Date.now()-t0,entetes:lus,combien:n,
limite:"Un navigateur ne lit que les en-tetes qu un site autorise explicitement a lire. Les autres existent mais restent invisibles ici : ce n est pas une absence, c est une regle du navigateur."};},
function(){return {ok:false,e:"le site n a pas repondu, ou il refuse les requetes venant d ici"};});}catch(_){
return Promise.resolve({ok:false,e:"requete impossible"});}};

_NXOUT.etat=function(){try{
return {ouvert:_NXOUT.ouvert(),depuis:_NXOUT.cfg.quand,
traces:_NXOUT.cfg.histo.length};}catch(_){return {ouvert:false};}};

try{_NXOUT.load();}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXOUT");if(window._NXERR)_NXERR.push("module _NXOUT :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXOUT desactive:",_nxE);}catch(_){}}
}
