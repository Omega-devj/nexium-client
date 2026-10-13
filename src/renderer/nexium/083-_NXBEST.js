var _NXBEST=window._NXBEST||(window._NXBEST={});
if(!_NXBEST.boot){try{_NXBEST.boot=true;
// Le best-of du vocal.
_NXBEST.KEY="nexium_best";
_NXBEST.MODID="nx-best-modal";
_NXBEST.HZ=24000;
_NXBEST.TAMPON=180;
_NXBEST.PAS=0.02;
_NXBEST.AVANT=14;
_NXBEST.APRES=9;
_NXBEST.REPOS=18;
_NXBEST.MAXM=24;
_NXBEST.cfg={on:false,sensible:"normale",garde:true};
_NXBEST.etatVoie="";
_NXBEST.session=null;
_NXBEST.moments=[];
_NXBEST.erreur="";
_NXBEST._ecoute=[];

_NXBEST.load=function(){try{
var r=_NXDB.get(_NXBEST.KEY);
var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")d={};
if(typeof d.on!=="boolean")d.on=false;
if(d.sensible!=="basse"&&d.sensible!=="normale"&&d.sensible!=="haute")d.sensible="normale";
if(typeof d.garde!=="boolean")d.garde=true;
// Une valeur gardee qui ne designe plus rien est jetee plutot que de
// pointer dans le vide.
if(d.voie!=="micro"&&d.voie!=="appel"&&d.voie!=="page")d.voie="";
_NXBEST.cfg=d;return d;}catch(_){return _NXBEST.cfg;}};
_NXBEST.save=function(){try{_NXDB.set(_NXBEST.KEY,JSON.stringify(_NXBEST.cfg));}catch(_){}};
_NXBEST.set=function(k,v){try{_NXBEST.cfg[k]=v;_NXBEST.save();_NXBEST.notify();}catch(_){}};
_NXBEST.notify=function(){try{
for(var a=0;a<_NXBEST._ecoute.length;a++){try{_NXBEST._ecoute[a]();}catch(_){}}}catch(_){}};
_NXBEST.SEUILS={basse:{note:0.72,gens:4},normale:{note:0.58,gens:3},haute:{note:0.44,gens:2}};
_NXBEST.seuil=function(){try{
return _NXBEST.SEUILS[_NXBEST.cfg.sensible]||_NXBEST.SEUILS.normale;}catch(_){return _NXBEST.SEUILS.normale;}};

// --- la mesure --------------------------------------------------------------
// Goertzel : l energie a une frequence precise, sans faire une transformee
// entiere. Sur une enveloppe de 1,5 s a 50 Hz, ca coute quelques dizaines
// d operations par frequence.
_NXBEST.goertzel=function(x,f,hz){try{
var n=x.length;
if(!n)return 0;
var w=2*Math.PI*f/hz;
var c=2*Math.cos(w);
var s1=0,s2=0,a;
for(a=0;a<n;a++){var s0=x[a]+c*s1-s2;s2=s1;s1=s0;}
var p=s1*s1+s2*s2-c*s1*s2;
return p>0?Math.sqrt(p)/n:0;}catch(_){return 0;}};

// La part de l energie de l enveloppe qui bat entre 4 et 8 Hz, rapportee a ce
// qui bat entre 1 et 3 Hz. Une parole normale module vers 2-4 Hz ; un rire
// monte franchement plus haut.
_NXBEST.modulation=function(env){try{
var n=env.length;
if(n<20)return 0;
var moy=0,a;
for(a=0;a<n;a++)moy+=env[a];
moy/=n;
var x=[];
for(a=0;a<n;a++)x.push(env[a]-moy);
var hz=1/_NXBEST.PAS;
var haut=0,bas=0;
var FH=[4,5,6,7,8],FB=[1,1.5,2,2.5,3];
for(a=0;a<FH.length;a++)haut+=_NXBEST.goertzel(x,FH[a],hz);
for(a=0;a<FB.length;a++)bas+=_NXBEST.goertzel(x,FB[a],hz);
if(haut+bas<=0)return 0;
return haut/(haut+bas);}catch(_){return 0;}};

_NXBEST.force=function(env){try{
var n=env.length;
if(!n)return 0;
var m=0,a;
for(a=0;a<n;a++)if(env[a]>m)m=env[a];
return m;}catch(_){return 0;}};

// La note d un instant. Deux voies, melangees, plafonnees a 1.
//   - la voie du son : il faut du niveau ET de la modulation. Une des deux
//     seule ne vaut rien : une porte qui claque est forte et plate, un
//     ventilateur est module et faible.
//   - la voie des gens : le nombre de personnes qui parlent en meme temps,
//     rapporte au seuil. Discord nous le donne, c est gratuit et c est exact.
_NXBEST.note=function(env,gens,fond){try{
var f=_NXBEST.force(env);
var base=fond>0?fond:0.02;
var rel=Math.min(1,Math.max(0,(f/(base*4))-0.25));
var mod=_NXBEST.modulation(env);
var son=rel*Math.min(1,Math.max(0,(mod-0.34)/0.38));
var S=_NXBEST.seuil();
var social=Math.min(1,Math.max(0,(gens-1)/Math.max(1,S.gens-1))*0.9);
// Les deux voies doivent pouvoir declencher seules quand elles sont
// franches : un fou rire sans personne qui parle, et trois personnes qui
// se coupent la parole sans rire, sont tous les deux des moments.
var note=Math.min(1,son*0.68+social*0.72);
return {note:note,son:son,social:social,mod:mod,niveau:f};}catch(_){
return {note:0,son:0,social:0,mod:0,niveau:0};}};

_NXBEST.raison=function(d){try{
if(d.son>=0.45&&d.social>=0.45)return "tout le monde rit en meme temps";
if(d.son>=0.45)return "un eclat de rire";
if(d.social>=0.45)return "plusieurs personnes parlent en meme temps";
return "un pic dans la conversation";}catch(_){return "un moment fort";}};

// --- le tampon --------------------------------------------------------------
_NXBEST.anneau=function(secondes){try{
var n=Math.floor(_NXBEST.HZ*secondes);
return {buf:new Int16Array(n),n:n,ecrit:0};}catch(_){return null;}};
_NXBEST.pousse=function(A,f32){try{
if(!A||!f32)return 0;
var a,v;
for(a=0;a<f32.length;a++){
v=f32[a];
if(v>1)v=1;else if(v<-1)v=-1;
A.buf[(A.ecrit+a)%A.n]=(v*32767)|0;}
A.ecrit+=f32.length;
return A.ecrit;}catch(_){return 0;}};
// Decoupe une fenetre finissant `finEch` echantillons apres le debut, de
// `duree` secondes. Rend null si la fenetre est deja sortie du tampon.
_NXBEST.fenetre=function(A,debutEch,duree){try{
if(!A)return null;
var n=Math.floor(_NXBEST.HZ*duree);
if(n<=0)return null;
if(n>A.n)n=A.n;
var d=Math.floor(debutEch);
if(d<0)d=0;
if(A.ecrit-d>A.n)return null;
if(d+n>A.ecrit)n=A.ecrit-d;
if(n<=0)return null;
var out=new Int16Array(n),a;
for(a=0;a<n;a++)out[a]=A.buf[(d+a)%A.n];
return out;}catch(_){return null;}};

// --- le WAV, ecrit a la main ------------------------------------------------
// Quarante-quatre octets d en-tete et les echantillons. Aucun codec, aucune
// bibliotheque, et un fichier qui s ouvre partout.
_NXBEST.wav=function(pcm,hz){try{
var n=pcm.length;
var oct=44+n*2;
var b=new ArrayBuffer(oct);
var v=new DataView(b);
var txt=function(o,t){for(var a=0;a<t.length;a++)v.setUint8(o+a,t.charCodeAt(a));};
txt(0,"RIFF");v.setUint32(4,oct-8,true);txt(8,"WAVE");
txt(12,"fmt ");v.setUint32(16,16,true);
v.setUint16(20,1,true);v.setUint16(22,1,true);
v.setUint32(24,hz,true);v.setUint32(28,hz*2,true);
v.setUint16(32,2,true);v.setUint16(34,16,true);
txt(36,"data");v.setUint32(40,n*2,true);
for(var a=0;a<n;a++)v.setInt16(44+a*2,pcm[a],true);
return b;}catch(_){return null;}};

// --- les moments ------------------------------------------------------------
// Un moment en chasse un autre s ils sont trop proches : on garde le meilleur.
// Sans ca, un fou rire de dix secondes produirait quarante clips identiques.
_NXBEST.retient=function(L,m,repos){try{
var r=(repos===undefined)?_NXBEST.REPOS:repos;
var a;
for(a=0;a<L.length;a++){
if(Math.abs(L[a].t-m.t)>=r)continue;
if(m.note>L[a].note){L[a]=m;return "remplace";}
return "ignore";}
L.push(m);
L.sort(function(x,y){return x.t-y.t;});
if(L.length>_NXBEST.MAXM){
var pire=0;
for(a=1;a<L.length;a++)if(L[a].note<L[pire].note)pire=a;
L.splice(pire,1);
return "pousse";}
return "ajoute";}catch(_){return "ignore";}};

_NXBEST.mmss=function(sec){try{
var s2=Math.max(0,Math.floor(sec));
var m=Math.floor(s2/60);
return m+":"+("0"+(s2%60)).slice(-2);}catch(_){return "0:00";}};

// --- la capture -------------------------------------------------------------
// Discord fait passer la voix par son moteur natif : on ne peut pas se
// brancher sur la connexion. On prend donc ce qui SORT de la machine -- ce
// que tu entends -- et, a defaut, le micro. La carte dit toujours laquelle
// des trois voies a servi : un clip qui ne contient que ta propre voix ne
// doit pas etre presente comme un clip de l appel.
// Deux sources, et aucune ne touche a la capture d ecran -- c est ce chemin
// qui faisait tomber le processus principal de Discord en v195.
//
// Celle qui prend toutes les voix ouvre un peripherique de BOUCLAGE, qui se
// presente au navigateur comme un micro ordinaire. Meme appel, meme code,
// et il ne plante pas. Le micro est melange par-dessus, sans quoi le clip
// aurait toutes les voix sauf la tienne.
// Le micro, ouvert pour ecouter et rien d autre. Sans ces trois reglages,
// Chromium applique son propre gain automatique, qui change le niveau du micro
// dans Windows -- celui dont se sert aussi Discord pour l appel.
_NXBEST.CONTRAINTES={echoCancellation:false,noiseSuppression:false,autoGainControl:false};
_NXBEST.micro=function(){try{
var c={},k;for(k in _NXBEST.CONTRAINTES)c[k]=_NXBEST.CONTRAINTES[k];
return navigator.mediaDevices.getUserMedia({audio:c,video:false});}catch(e){return Promise.reject(e);}};
_NXBEST.VOIES=[
{k:"page",n:"les voix jouees par Discord",auto:true,
 d:"Prend directement ce que Discord fait jouer dans la fenetre. Ne demande aucune permission, aucun peripherique, et ne sort jamais de la page. Ne marche que si la lecture passe par le navigateur.",
 f:function(){
 var L=_NXBEST.mediasActifs();
 if(!L.length)return Promise.reject(new Error("Discord ne joue aucune voix dans la page en ce moment"));
 return _NXBEST.micro()
 .then(function(mic){return {flux:L,plus:mic};},
 function(){return {flux:L,plus:null};});}},
{k:"appel",n:"toutes les voix de l appel",auto:true,
 d:"Passe par un peripherique de bouclage : le mixage stereo de Windows, ou un cable audio virtuel. Ton micro est melange par-dessus, pour que ta voix y soit aussi.",
 f:function(){return _NXBEST.bouclage().then(function(b){
 if(!b)throw new Error("aucune entree de bouclage n est activee sur cette machine");
 _NXBEST.bouclageNom=b.nom;_NXBEST.bouclageNote=b.note;
 return navigator.mediaDevices.getUserMedia(
 {audio:{deviceId:{exact:b.id},echoCancellation:false,noiseSuppression:false,
 autoGainControl:false},video:false})
 .then(function(st){
 return _NXBEST.micro()
 .then(function(mic){return {flux:st,plus:mic};},
 function(){return {flux:st,plus:null};});});});}},
{k:"micro",n:"ton micro",auto:true,
 d:"Le repli quand aucun bouclage n existe. Le clip ne contiendra que ta voix -- mais les moments a plusieurs sont quand meme reperes : Discord dit qui parle, ca ne vient pas du son.",
 f:function(){return _NXBEST.micro();}}];
// Ce qu il faut pour avoir toutes les voix, dit une fois, au bon endroit.
_NXBEST.COMMENT="Un peripherique de bouclage est une entree audio qui renvoie ce que ta machine joue. Le plus simple : ouvre les parametres de son de Windows, onglet Enregistrement, clic droit dans la liste, Afficher les peripheriques desactives, puis active le Mixage stereo. Plus propre : installe VB-CABLE, qui est gratuit, et mets la sortie de Discord dessus.";
_NXBEST.POURQUOI="Pour enregistrer les autres, il en faut un. "+_NXBEST.COMMENT+
" La capture d ecran, elle, n est pas utilisee : c est ce chemin qui faisait tomber le client en v195.";
// Le temoin de tentative. Pose avant d ouvrir, efface des que la source a
// repondu. S il est encore la au demarrage suivant, c est que le client
// n a pas survecu a l ouverture.
_NXBEST.TENTE="nexium_best_tente";
_NXBEST.suspecte="";
_NXBEST.poseTemoin=function(k){try{_NXDB.set(_NXBEST.TENTE,String(k));}catch(_){}};
_NXBEST.oteTemoin=function(){try{_NXDB.del?_NXDB.del(_NXBEST.TENTE):_NXDB.set(_NXBEST.TENTE,"");}catch(_){}};
_NXBEST.litTemoin=function(){try{
var v=_NXDB.get(_NXBEST.TENTE);
_NXBEST.suspecte=(v&&_NXBEST.voieDe(String(v)))?String(v):"";
return _NXBEST.suspecte;}catch(_){return "";}};
_NXBEST.pardonne=function(){try{
_NXBEST.suspecte="";_NXBEST.oteTemoin();_NXBEST.notify();return true;}catch(_){return false;}};
// Les elements de la page qui jouent du son en ce moment. Discord y met la
// voix des autres quand la lecture passe par le navigateur. On ne demande
// rien : ils sont deja la, et ils sont deja en train de jouer.
_NXBEST.mediasActifs=function(){try{
var L=document.querySelectorAll("audio,video"),out=[],a;
for(a=0;a<L.length;a++){
var el=L[a];
try{
if(el.muted)continue;
if(el.paused)continue;
if(el.volume===0)continue;
var st=null;
if(el.srcObject&&el.srcObject.getAudioTracks)st=el.srcObject;
else if(typeof el.captureStream==="function")st=el.captureStream();
else if(typeof el.mozCaptureStream==="function")st=el.mozCaptureStream();
if(!st||!st.getAudioTracks||!st.getAudioTracks().length)continue;
out.push(st);}catch(_){}}
return out;}catch(_){return [];}};

// Le peripherique qui renvoie ce que la machine joue. Il se presente comme
// une entree audio ordinaire : aucun rapport avec la capture d ecran.
_NXBEST.RXCABLE=/(cable|voicemeeter|vb-audio|vb audio|virtual audio|virtual cable|blackhole|soundflower)/i;
_NXBEST.RXMIX=/(mixage st[e\u00e9]r[e\u00e9]o|stereo ?mix|what ?u ?hear|wave ?out|loopback|bouclage)/i;
_NXBEST.sortieDiscord=function(){try{
var ME=_NXcommon().store("MediaEngineStore");
if(ME&&typeof ME.getOutputDeviceId==="function")return String(ME.getOutputDeviceId()||"");
return "";}catch(_){return "";}};
_NXBEST.bouclage=function(){try{
if(!navigator.mediaDevices||!navigator.mediaDevices.enumerateDevices)
return Promise.resolve(null);
return navigator.mediaDevices.enumerateDevices().then(function(L){
var e=[],s2=[],a;
for(a=0;a<L.length;a++){
var d=L[a];
if(!d||!d.deviceId)continue;
if(d.kind==="audioinput")e.push({id:d.deviceId,nom:String(d.label||"")});
else if(d.kind==="audiooutput")s2.push({id:d.deviceId,nom:String(d.label||"")});}
// Le cable ne sert que si Discord joue DEDANS. Sinon sa sortie est muette,
// et un clip silencieux est pire que pas de clip.
var out=_NXBEST.sortieDiscord(),routee=false,b;
for(b=0;b<s2.length;b++)
if(s2[b].id===out&&_NXBEST.RXCABLE.test(s2[b].nom))routee=true;
if(routee)for(a=0;a<e.length;a++)
if(_NXBEST.RXCABLE.test(e[a].nom))
return {id:e[a].id,nom:e[a].nom,genre:"cable",
note:"la sortie de Discord passe par ce cable : le clip ne contiendra que l appel"};
for(a=0;a<e.length;a++)
if(_NXBEST.RXMIX.test(e[a].nom))
return {id:e[a].id,nom:e[a].nom,genre:"mixage",
note:"il renvoie tout ce que joue ta machine : l appel, mais aussi ta musique et tes notifications"};
return null;},function(){return null;});}catch(_){return Promise.resolve(null);}};
_NXBEST.voieDe=function(k){try{
for(var a=0;a<_NXBEST.VOIES.length;a++)if(_NXBEST.VOIES[a].k===k)return _NXBEST.VOIES[a];
return null;}catch(_){return null;}};

// `force` demande une voie precise. Sans elle, on essaie seulement celles
// qui n ouvrent aucune fenetre.
_NXBEST.source=function(force){try{
var L=[],a;
if(force){
var V0=_NXBEST.voieDe(force);
if(!V0)return Promise.reject(new Error("source inconnue : "+force));
L=[V0];}
else for(a=0;a<_NXBEST.VOIES.length;a++)if(_NXBEST.VOIES[a].auto)L.push(_NXBEST.VOIES[a]);
var k=0,dernier="";
// Une voie qui LEVE au lieu de rejeter cassait la chaine : on enveloppe.
var essaie=function(V){try{
if(_NXBEST.suspecte===V.k)
return Promise.reject(new Error("cette source a fait tomber le client la derniere fois"));
_NXBEST.poseTemoin(V.k);
var p=V.f();
if(!p||!p.then){_NXBEST.oteTemoin();return Promise.reject(new Error("source indisponible"));}
// Le temoin tombe des que la source a repondu, quelle que soit la
// reponse : un refus n est pas un plantage.
return p.then(function(x){_NXBEST.oteTemoin();return x;},
function(e){_NXBEST.oteTemoin();throw e;});}
catch(e){_NXBEST.oteTemoin();return Promise.reject(e);}};
var suivant=function(){
if(k>=L.length)
return Promise.reject(new Error(dernier||"aucune source audio n a accepte"));
var V=L[k++];
return essaie(V).then(function(r){
// Une voie rend un flux, plusieurs flux, ou des flux plus le micro.
var brut=(r&&r.flux)?r.flux:r;
var plus=(r&&r.plus)?r.plus:null;
var L2=(brut&&brut.length!==undefined&&!brut.getAudioTracks)?brut:[brut];
var nets=[],q;
for(q=0;q<L2.length;q++)
if(L2[q]&&L2[q].getAudioTracks&&L2[q].getAudioTracks().length)nets.push(L2[q]);
if(plus&&plus.getAudioTracks&&plus.getAudioTracks().length)nets.push(plus);
if(!nets.length)throw new Error("pas de son");
return {flux:nets,voie:V.k,nom:V.n};},function(e){
dernier=String((e&&e.message)||"refuse")+" ("+V.n+")";
return suivant();});};
return suivant();}catch(e){return Promise.reject(e);}};

_NXBEST.parlent=function(){try{
var C=_NXcommon();
var SC=C.store("SelectedChannelStore");
var cid=SC&&SC.getVoiceChannelId&&SC.getVoiceChannelId();
if(!cid)return {n:0,qui:[]};
var VS=C.store("VoiceStateStore");
var SP=C.store("SpeakingStore");
var m=VS&&VS.getVoiceStatesForChannel&&VS.getVoiceStatesForChannel(String(cid));
if(!m||!SP||!SP.isSpeaking)return {n:0,qui:[]};
var qui=[],k;
for(k in m){
if(!m.hasOwnProperty(k))continue;
try{if(SP.isSpeaking(String(k)))qui.push(String(k));}catch(_){}}
return {n:qui.length,qui:qui};}catch(_){return {n:0,qui:[]};}};

_NXBEST.pseudo=function(id){try{
var US=_NXcommon().store("UserStore");
var u=US&&US.getUser&&US.getUser(String(id));
return (u&&(u.globalName||u.global_name||u.username))||"quelqu un";}catch(_){return "quelqu un";}};

_NXBEST.salon=function(){try{
var SC=_NXcommon().store("SelectedChannelStore");
var id=SC&&SC.getVoiceChannelId&&SC.getVoiceChannelId();
return id?String(id):"";}catch(_){return "";}};

_NXBEST.demarre=function(force){try{
if(_NXBEST.session)return Promise.resolve(true);
_NXBEST.erreur="";
_NXBEST.notify();
return _NXBEST.source(force).then(function(src){
var AC=window.AudioContext||window.webkitAudioContext;
if(!AC)throw new Error("ce client n a pas d AudioContext");
var ctx=new AC({sampleRate:_NXBEST.HZ});
// Un bus unique : tous les flux retenus y arrivent -- les voix jouees par
// la page, le bouclage, le micro -- et tout ce qui suit ne voit qu une
// seule source.
var bus=ctx.createGain();
bus.gain.value=1;
var _f;
for(_f=0;_f<src.flux.length;_f++){
try{ctx.createMediaStreamSource(src.flux[_f]).connect(bus);}catch(_){}}
var an=ctx.createAnalyser();
an.fftSize=1024;
an.smoothingTimeConstant=0;
bus.connect(an);
var proc=ctx.createScriptProcessor?ctx.createScriptProcessor(4096,1,1):null;
if(!proc)throw new Error("ce client ne sait pas lire le flux");
bus.connect(proc);
var muet=ctx.createGain();
muet.gain.value=0;
proc.connect(muet);
muet.connect(ctx.destination);
var A=_NXBEST.anneau(_NXBEST.TAMPON);
var S={debut:Date.now(),ctx:ctx,flux:src.flux,proc:proc,anneau:A,
voie:src.voie,voieNom:src.nom,cid:_NXBEST.salon(),avecMicro:src.flux.length>1,
env:[],fond:0.02,dernier:-999,gens:0,quiGens:[]};
proc.onaudioprocess=function(e){try{
var d=e.inputBuffer.getChannelData(0);
_NXBEST.pousse(A,d);}catch(_){}};
_NXBEST.session=S;
_NXBEST.moments=[];
_NXBEST.etatVoie=src.voie;
_NXBEST._t=setInterval(function(){_NXBEST.tour(an);},Math.round(_NXBEST.PAS*1000));
_NXBEST._g=setInterval(function(){try{
var p=_NXBEST.parlent();
S.gens=p.n;
if(p.n)S.quiGens=p.qui;}catch(_){}},250);
_NXBEST.notify();
return true;})
// .then(succes, echec) laisse filer ce que le succes lui-meme leve : une
// erreur d AudioContext partait en rejet non traite, et le bouton restait
// mort sans rien dire.
.catch(function(e){
try{_NXBEST.arrete();}catch(_){}
_NXBEST.erreur=String((e&&e.message)||"aucune source audio");
_NXBEST.notify();
return false;});}catch(e){
_NXBEST.erreur=String(e&&e.message);
_NXBEST.notify();
return Promise.resolve(false);}};

_NXBEST.tour=function(an){try{
var S=_NXBEST.session;
if(!S)return;
var n=an.fftSize;
var buf=new Float32Array(n);
if(an.getFloatTimeDomainData)an.getFloatTimeDomainData(buf);
else return;
var som=0,a;
for(a=0;a<n;a++)som+=buf[a]*buf[a];
var rms=Math.sqrt(som/n);
S.env.push(rms);
var garde=Math.round(1.5/_NXBEST.PAS);
if(S.env.length>garde)S.env.shift();
// Le fond monte vite et descend lentement : on veut comparer a la rumeur
// habituelle de l appel, pas au silence absolu.
S.fond=S.fond*0.995+rms*0.005;
if(S.env.length<garde)return;
var d=_NXBEST.note(S.env,S.gens,S.fond);
var t=(Date.now()-S.debut)/1000;
if(d.note<_NXBEST.seuil().note)return;
if(t-S.dernier<_NXBEST.REPOS)return;
S.dernier=t;
var qui=[];
for(a=0;a<S.quiGens.length&&a<4;a++)qui.push(_NXBEST.pseudo(S.quiGens[a]));
var m={t:t,note:Math.round(d.note*100)/100,raison:_NXBEST.raison(d),
qui:qui,ech:Math.max(0,Math.floor((t-_NXBEST.AVANT)*_NXBEST.HZ)),
duree:_NXBEST.AVANT+_NXBEST.APRES};
_NXBEST.retient(_NXBEST.moments,m);
_NXBEST.notify();}catch(_){}};

_NXBEST.arrete=function(){try{
var S=_NXBEST.session;
if(!S)return false;
try{clearInterval(_NXBEST._t);}catch(_){}
try{clearInterval(_NXBEST._g);}catch(_){}
try{S.proc.onaudioprocess=null;S.proc.disconnect();}catch(_){}
// On n arrete que ce qu on a ouvert. Les flux qui viennent de la page
// appartiennent a Discord : les couper couperait le son de l appel.
try{var _s;for(_s=0;_s<(S.flux||[]).length;_s++){
var fx=S.flux[_s];
if(S.voie==="page"&&_s<(S.flux.length-(S.avecMicro?1:0)))continue;
if(fx&&fx.getTracks)fx.getTracks().forEach(function(x){try{x.stop();}catch(_){}});}}catch(_){}
try{S.ctx.close();}catch(_){}
_NXBEST.dernierAnneau=S.anneau;
_NXBEST.dernierDebut=S.debut;
_NXBEST.session=null;
_NXBEST.notify();
return true;}catch(_){return false;}};

_NXBEST.clip=function(m){try{
var S=_NXBEST.session;
var A=S?S.anneau:_NXBEST.dernierAnneau;
if(!A)return null;
var pcm=_NXBEST.fenetre(A,m.ech,m.duree);
if(!pcm)return null;
var b=_NXBEST.wav(pcm,_NXBEST.HZ);
if(!b)return null;
return {blob:new Blob([b],{type:"audio/wav"}),pcm:pcm,
secondes:pcm.length/_NXBEST.HZ};}catch(_){return null;}};

// --- le clip en video -------------------------------------------------------
// Un fichier son ne se poste pas : ca ne s ecoute pas dans un fil. On peint
// donc l onde sur un canvas pendant que le son joue, et on enregistre les
// deux. Ca dure le temps du clip -- il n y a pas de raccourci.
_NXBEST.rendu=function(m,prog){try{
return new Promise(function(res,rej){
var c=_NXBEST.clip(m);
if(!c){rej(new Error("ce moment est sorti du tampon"));return;}
if(typeof MediaRecorder!=="function"){rej(new Error("ce client ne sait pas enregistrer"));return;}
var P=_NXpal;
var W=1280,H=720;
var cv=document.createElement("canvas");cv.width=W;cv.height=H;
var ctx=cv.getContext("2d");
var AC=window.AudioContext||window.webkitAudioContext;
var ac=new AC();
var buf=ac.createBuffer(1,c.pcm.length,_NXBEST.HZ);
var ch=buf.getChannelData(0),a;
for(a=0;a<c.pcm.length;a++)ch[a]=c.pcm[a]/32768;
var srcN=ac.createBufferSource();
srcN.buffer=buf;
var dest=ac.createMediaStreamDestination();
srcN.connect(dest);
var flux=cv.captureStream(30);
try{flux.addTrack(dest.stream.getAudioTracks()[0]);}catch(_){}
var types=["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"];
var mime="";
for(a=0;a<types.length;a++){try{if(MediaRecorder.isTypeSupported(types[a])){mime=types[a];break;}}catch(_){}}
var rec=new MediaRecorder(flux,mime?{mimeType:mime,videoBitsPerSecond:2500000}:{});
var bouts=[];
rec.ondataavailable=function(e){if(e.data&&e.data.size)bouts.push(e.data);};
rec.onstop=function(){try{
try{ac.close();}catch(_){}
var b=new Blob(bouts,{type:"video/webm"});
res(new File([b],"nexium-best-of.webm",{type:"video/webm",lastModified:Date.now()}));}catch(e2){rej(e2);}};
var t0=0,fini=false;
var N=180;
var onde=new Array(N);
for(a=0;a<N;a++)onde[a]=0;
var pas=Math.max(1,Math.floor(c.pcm.length/N));
for(a=0;a<N;a++){
var mx=0,q;
for(q=a*pas;q<(a+1)*pas&&q<c.pcm.length;q++){
var vv=Math.abs(c.pcm[q]);
if(vv>mx)mx=vv;}
onde[a]=mx/32768;}
var titre=(m.qui&&m.qui.length)?m.qui.slice(0,3).join(", "):"";
var peindre=function(){
if(fini)return;
var t=(ac.currentTime-t0);
var p=Math.min(1,t/c.secondes);
try{if(prog)prog(p);}catch(_){}
ctx.fillStyle="#08080a";ctx.fillRect(0,0,W,H);
var g=ctx.createLinearGradient(0,0,0,H);
g.addColorStop(0,"rgba(255,255,255,.05)");g.addColorStop(1,"rgba(255,255,255,0)");
ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
var bw=W/N;
for(var k=0;k<N;k++){
var h=Math.max(3,onde[k]*H*0.46);
var passe=(k/N)<=p;
ctx.fillStyle=passe?"#e8e8ea":"rgba(232,232,234,.17)";
ctx.fillRect(k*bw+bw*0.18,H/2-h/2,bw*0.64,h);}
ctx.fillStyle="#6c6c74";
ctx.font="600 22px system-ui,sans-serif";
ctx.fillText("NEXIUM  ·  BEST-OF",54,72);
ctx.fillStyle="#f4f4f5";
ctx.font="800 44px system-ui,sans-serif";
ctx.fillText(m.raison,54,H-118);
ctx.fillStyle="#8a8a92";
ctx.font="400 24px system-ui,sans-serif";
ctx.fillText(titre?(titre+"  ·  "+_NXBEST.mmss(m.t)):_NXBEST.mmss(m.t),54,H-72);
if(p>=1){fini=true;setTimeout(function(){try{rec.stop();}catch(_){}},120);return;}
requestAnimationFrame(peindre);};
rec.start(500);
t0=ac.currentTime;
srcN.start();
requestAnimationFrame(peindre);});}catch(e){return Promise.reject(e);}};


// --- la carte ---------------------------------------------------------------
_NXBEST.ferme=function(){try{
var o=document.getElementById(_NXBEST.MODID);
if(o&&o.parentNode)o.parentNode.removeChild(o);}catch(_){}};

_NXBEST.VOIETXT={
page:"les voix que Discord joue dans la fenetre, avec ton micro melange",
appel:"toutes les voix de l appel, par le bouclage, avec ton micro melange",
micro:"ton micro -- le son ne contient que toi, mais les moments a plusieurs sont quand meme reperes"};

_NXBEST.carte=function(){try{
_NXBEST.ferme();
var P=_NXpal;
var esc=function(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
var ov=document.createElement("div");ov.id=_NXBEST.MODID;
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.62);";
var card=document.createElement("div");
card.style.cssText="width:520px;max-width:calc(100vw - 40px);max-height:84vh;display:flex;flex-direction:column;background:"+P.panel+";border:1px solid "+P.line+";border-radius:20px;padding:22px;box-shadow:0 30px 80px rgba(0,0,0,.55);";
var tete=document.createElement("div");
tete.id=_NXBEST.MODID+"-tete";
card.appendChild(tete);
var corps=document.createElement("div");
corps.id=_NXBEST.MODID+"-corps";
corps.style.cssText="overflow-y:auto;margin-top:14px;flex:1 1 auto;";
card.appendChild(corps);
var pied=document.createElement("div");
pied.style.cssText="display:flex;gap:8px;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid "+P.line+";";
var mk=function(txt,style,fn){
var b=document.createElement("div");b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");
b.style.cssText=style;b.textContent=_NXtr(txt);b.onclick=fn;
b.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();fn();}};
return b;};
var sens=document.createElement("div");
sens.id=_NXBEST.MODID+"-sens";
sens.style.cssText="flex:1 1 auto;display:flex;gap:5px;";
pied.appendChild(sens);
pied.appendChild(mk("Fermer","flex:0 0 auto;padding:10px 16px;border-radius:10px;background:"+P.acc+";color:"+P.ink+";font-size:12px;font-weight:700;cursor:pointer;",
function(){_NXBEST.ferme();}));
card.appendChild(pied);
ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)_NXBEST.ferme();};
if(document.body)document.body.appendChild(ov);
_NXBEST.peint();
return true;}catch(_){return false;}};

_NXBEST.peint=function(){try{
var tete=document.getElementById(_NXBEST.MODID+"-tete");
var corps=document.getElementById(_NXBEST.MODID+"-corps");
var sens=document.getElementById(_NXBEST.MODID+"-sens");
if(!tete||!corps)return;
var P=_NXpal;
var esc=function(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
var S=_NXBEST.session;
var actif=!!S;
var voie=S?S.voie:_NXBEST.etatVoie;
tete.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Nexium best-of</div>'
+'<div style="font-size:20px;font-weight:800;color:'+P.txt+';letter-spacing:-.02em;">'
+(actif?"J ecoute l appel":"Les moments de la derniere session")+'</div>'
+'<div style="font-size:11.5px;color:'+P.sub+';margin-top:6px;line-height:1.6;">'
+(actif?("Les trois dernieres minutes restent en memoire vive, et rien d autre. Source : "
+esc(_NXBEST.VOIETXT[voie]||voie)+".")
:(_NXBEST.erreur?("Ca n a pas demarre : "+esc(_NXBEST.erreur)+". Choisis une autre source ci-dessous.")
:"Rien n est enregistre tant que tu n as pas demarre. Ce qui l est ne quitte jamais la machine."))
+'</div>');
var M=_NXBEST.moments;
if(!M.length){
corps.innerHTML=_NXtrHtml('<div style="padding:22px 4px;font-size:12.5px;color:'+P.dim+';line-height:1.6;">'
+(actif?"Aucun moment pour l instant. Il en faut un vrai : un eclat de rire, ou trois personnes qui parlent en meme temps."
:"Aucun moment garde. Demarre pendant un appel.")+'</div>');}
else{
var h='',a;
for(a=M.length-1;a>=0;a--){
var m=M[a];
h+='<div style="display:flex;gap:12px;align-items:center;padding:11px 0;border-top:1px solid '+P.line+';">'
+'<div style="flex:0 0 46px;font-family:'+_NXf.mono+';font-size:12px;color:'+P.faint+';">'+esc(_NXBEST.mmss(m.t))+'</div>'
+'<div style="flex:1 1 auto;min-width:0;">'
+'<div style="font-size:12.5px;font-weight:600;color:'+P.txt+';">'+esc(m.raison)+'</div>'
+'<div style="font-size:10.5px;color:'+P.dim+';margin-top:3px;">'
+(m.qui&&m.qui.length?esc(m.qui.join(", "))+" &middot; ":"")+"note "+m.note+'</div></div>'
+'<div class="nx-fx nx-best-go" data-k="'+a+'" role="button" tabindex="0" style="flex:0 0 auto;padding:7px 12px;border-radius:9px;border:1px solid '+P.line+';color:'+P.sub+';font-size:11.5px;font-weight:700;cursor:pointer;">Ecouter</div>'
+'<div class="nx-fx nx-best-vid" data-k="'+a+'" role="button" tabindex="0" style="flex:0 0 auto;padding:7px 12px;border-radius:9px;background:'+P.acc+';color:'+P.ink+';font-size:11.5px;font-weight:800;cursor:pointer;">En video</div>'
+'</div>';}
corps.innerHTML=_NXtrHtml(h);
var gos=corps.querySelectorAll(".nx-best-go"),b;
for(b=0;b<gos.length;b++)(function(el){
el.onclick=function(){_NXBEST.ecoute(M[parseInt(el.getAttribute("data-k"),10)]);};})(gos[b]);
var vids=corps.querySelectorAll(".nx-best-vid"),c;
for(c=0;c<vids.length;c++)(function(el){
el.onclick=function(){_NXBEST.enVideo(M[parseInt(el.getAttribute("data-k"),10)]);};})(vids[c]);}
if(sens){
sens.innerHTML="";
var mk2=function(k,nom){
var on=_NXBEST.cfg.sensible===k;
var b2=document.createElement("div");
b2.className="nx-fx";b2.setAttribute("role","button");b2.setAttribute("tabindex","0");
b2.style.cssText="padding:7px 11px;border-radius:9px;font-size:11px;font-weight:700;cursor:pointer;"
+"background:"+(on?P.raise:"transparent")+";border:1px solid "+(on?P.edge:P.line)+";color:"+(on?P.pale:P.dim)+";";
b2.textContent=_NXtr(nom);
b2.onclick=function(){_NXBEST.set("sensible",k);_NXBEST.peint();};
return b2;};
sens.appendChild(mk2("basse","Rare"));
sens.appendChild(mk2("normale","Normal"));
sens.appendChild(mk2("haute","Souvent"));
var go=document.createElement("div");
go.className="nx-fx";go.setAttribute("role","button");go.setAttribute("tabindex","0");
go.style.cssText="margin-left:8px;padding:7px 13px;border-radius:9px;font-size:11px;font-weight:800;cursor:pointer;"
+"border:1px solid "+P.line+";color:"+(actif?P.danger:P.pale)+";";
go.textContent=actif?_NXtr("Arreter"):_NXtr("Demarrer");
go.onclick=function(){
if(_NXBEST.session){_NXBEST.arrete();_NXBEST.peint();}
else _NXBEST.demarre(_NXBEST.cfg.voie||null).then(function(){_NXBEST.peint();});};
sens.appendChild(go);}
_NXBEST.peintSources();
}catch(_){}};

// Le choix de la source ne se devine pas : on l affiche, avec ce que chacune
// donne, et laquelle demandera une fenetre.
_NXBEST.peintSources=function(){try{
var corps=document.getElementById(_NXBEST.MODID+"-corps");
if(!corps||_NXBEST.session)return;
var P=_NXpal;
var esc=function(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
var h='<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:'+P.faint+';margin:16px 0 7px;">Ce qu il ecoute</div>';
var a;
for(a=0;a<_NXBEST.VOIES.length;a++){
var V=_NXBEST.VOIES[a];
h+='<div class="nx-fx nx-best-src" data-k="'+esc(V.k)+'" role="button" tabindex="0" '
+'style="display:block;padding:10px 12px;margin-bottom:6px;border-radius:11px;cursor:pointer;'
+'background:'+P.inset+';border:1px solid '+P.line+';">'
+'<div style="font-size:12.5px;font-weight:700;color:'+(_NXBEST.suspecte===V.k?P.faint:P.txt)+';">'+esc(V.n)
+(V.auto?"":' <span style="color:'+P.warn+';font-weight:600;">demande une fenetre</span>')
+(_NXBEST.suspecte===V.k?' <span style="color:'+P.danger+';font-weight:600;">a fait tomber le client</span>':'')+'</div>'
+'<div style="font-size:11px;color:'+P.dim+';margin-top:3px;line-height:1.5;">'+esc(V.d)+'</div></div>';}
h+='<div style="font-size:11px;color:'+P.faint+';line-height:1.6;margin-top:2px;">'+esc(_NXBEST.POURQUOI)+'</div>';
var el=document.createElement("div");
el.innerHTML=_NXtrHtml(h);
corps.appendChild(el);
var S=corps.querySelectorAll(".nx-best-src"),b;
for(b=0;b<S.length;b++)(function(x){
x.onclick=function(){
var k=x.getAttribute("data-k");
if(_NXBEST.suspecte===k){
// Insister est un choix, pas un accident : il faut le faire deux fois.
_NXBEST.pardonne();
try{_NXPR.toast(_NXtr("Source remise en jeu. Reclique dessus pour essayer."),2);}catch(_){}
_NXBEST.peint();return;}
_NXBEST.set("voie",k);
_NXBEST.demarre(k).then(function(){_NXBEST.peint();});};})(S[b]);
}catch(_){}};

_NXBEST.ecoute=function(m){try{
var c=_NXBEST.clip(m);
if(!c){try{_NXPR.toast(_NXtr("Ce moment est sorti du tampon : il a plus de trois minutes."),2);}catch(_){}return false;}
var u=URL.createObjectURL(c.blob);
var a=new Audio(u);
a.onended=function(){try{URL.revokeObjectURL(u);}catch(_){}};
a.play();
return true;}catch(_){return false;}};

_NXBEST.enVideo=function(m){try{
if(_NXBEST._rend){try{_NXPR.toast(_NXtr("Une video est deja en train de se fabriquer."),2);}catch(_){}return false;}
_NXBEST._rend=true;
try{_NXPR.toast(_NXtr("Fabrication du clip : ca dure le temps du clip, une vingtaine de secondes."),1);}catch(_){}
_NXBEST.rendu(m,function(){}).then(function(f){
_NXBEST._rend=false;
_NXBEST.dernierClip=f;
_NXBEST.propose(f);}).catch(function(e){
_NXBEST._rend=false;
try{_NXPR.toast(_NXtr("La video n a pas pu etre fabriquee : ")+((e&&_NXtr(e.message))||_NXtr("erreur")),0);}catch(_){}});
return true;}catch(_){_NXBEST._rend=false;return false;}};

// Une fois le clip pret : l envoyer ici, ou le garder. On passe par le meme
// chemin d envoi que Discord -- donc la compression de _NXFIC s applique si
// le fichier depasse.
_NXBEST.propose=function(f){try{
var P=_NXpal;
var id="nx-best-pret";
var vieux=document.getElementById(id);
if(vieux&&vieux.parentNode)vieux.parentNode.removeChild(vieux);
var ov=document.createElement("div");ov.id=id;
ov.style.cssText="position:fixed;right:18px;bottom:18px;z-index:99999;width:320px;max-width:calc(100vw - 36px);"
+"background:"+P.panel+";border:1px solid "+P.line+";border-radius:16px;padding:16px 17px;box-shadow:0 22px 60px rgba(0,0,0,.55);";
ov.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:5px;">Nexium best-of</div>'
+'<div style="font-size:14px;font-weight:800;color:'+P.txt+';">Ton clip est pret</div>'
+'<div style="font-size:11.5px;color:'+P.dim+';margin-top:5px;">'+Math.round(f.size/1024)+' ko, prêt a poster.</div>');
var ferme=function(){try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}};
var row=document.createElement("div");
row.style.cssText="display:flex;gap:7px;margin-top:12px;";
var mk=function(txt,style,fn){
var b=document.createElement("div");b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");
b.style.cssText=style;b.textContent=_NXtr(txt);b.onclick=fn;return b;};
row.appendChild(mk("Garder","flex:1;text-align:center;padding:9px;border-radius:10px;border:1px solid "+P.line+";color:"+P.sub+";font-size:12px;font-weight:600;cursor:pointer;",
function(){_NXBEST.garde(f);ferme();}));
row.appendChild(mk("Envoyer ici","flex:1;text-align:center;padding:9px;border-radius:10px;background:"+P.acc+";color:"+P.ink+";font-size:12px;font-weight:800;cursor:pointer;",
function(){_NXBEST.envoie(f);ferme();}));
ov.appendChild(row);
if(document.body)document.body.appendChild(ov);
return true;}catch(_){return false;}};

_NXBEST.garde=function(f){try{
var u=URL.createObjectURL(f);
var a=document.createElement("a");
a.href=u;a.download=f.name;
document.body.appendChild(a);a.click();
setTimeout(function(){try{document.body.removeChild(a);URL.revokeObjectURL(u);}catch(_){}},2000);
return true;}catch(_){return false;}};

_NXBEST.envoie=function(f){try{
var C=_NXcommon();
var WP=C.WP;
var M=WP&&WP.findByProps&&WP.findByProps("promptToUpload");
if(!M||typeof M.promptToUpload!=="function"){
try{_NXPR.toast(_NXtr("Je ne trouve pas l envoi de fichier. Utilise Garder."),2);}catch(_){}
return false;}
var SC=C.store("SelectedChannelStore");
var cid=SC&&SC.getChannelId&&SC.getChannelId();
var CS=C.store("ChannelStore");
var ch=cid&&CS&&CS.getChannel&&CS.getChannel(String(cid));
if(!ch){try{_NXPR.toast(_NXtr("Ouvre d abord le salon ou tu veux poster."),2);}catch(_){}return false;}
M.promptToUpload([f],ch,0);
return true;}catch(_){return false;}};

// Rejoindre un vocal demarre l ecoute, si tu l as demande. Le quitter
// l arrete et propose ce qu il a garde.
_NXBEST.veille=function(){try{
var cid=_NXBEST.salon();
var av=_NXBEST._salon||"";
if(cid===av)return;
_NXBEST._salon=cid;
if(cid&&!_NXBEST.session&&_NXBEST.cfg.on)_NXBEST.demarre(_NXBEST.cfg.voie||null);
if(!cid&&_NXBEST.session){
var n=_NXBEST.moments.length;
_NXBEST.arrete();
if(n){try{_NXPR.toast(_NXtr(n)+_NXtr(" moment(s) garde(s) de cet appel. Ouvre le best-of pour les voir."),1);}catch(_){}}}
}catch(_){}};
try{setInterval(function(){if(!document.hidden)_NXBEST.veille();},4000);}catch(_){}

// Ce que Nexium peut reellement entendre ici. On ne devine pas : on regarde.
_NXBEST.diagnostic=function(){try{
var L=_NXBEST.mediasActifs();
var out={page:{n:L.length,
texte:L.length?(L.length+" element(s) de la page jouent du son : les voix de l appel y sont."):
"la page ne joue aucun son -- soit tu n es pas en appel, soit Discord sort directement sur la carte son"},
micro:{ok:true,texte:"toujours disponible, mais ne contient que ta voix"}};
return _NXBEST.bouclage().then(function(b){
out.bouclage=b?{ok:true,nom:b.nom,texte:b.nom+" : "+b.note}
:{ok:false,texte:"aucune entree de bouclage activee sur cette machine"};
return out;},function(){
out.bouclage={ok:false,texte:"la liste des peripheriques n a pas pu etre lue"};
return out;});}catch(e){return Promise.resolve({erreur:String(e&&e.message)});}};

_NXBEST.etat=function(){try{
return {actif:!!_NXBEST.session,voie:_NXBEST.etatVoie,
moments:_NXBEST.moments.length,erreur:_NXBEST.erreur,
sensible:_NXBEST.cfg.sensible,tampon:_NXBEST.TAMPON};}catch(_){return {actif:false};}};

try{_NXBEST.load();_NXBEST.litTemoin();
if(_NXBEST.suspecte)_NXBEST.erreur="La derniere fois, "+
((_NXBEST.voieDe(_NXBEST.suspecte)||{}).n||_NXBEST.suspecte)+
 " a fait tomber le client. Cette source est mise de cote.";
else _NXBEST.oteTemoin();}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXBEST");if(window._NXERR)_NXERR.push("module _NXBEST :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXBEST desactive:",_nxE);}catch(_){}}
}
