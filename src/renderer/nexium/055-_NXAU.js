var _NXAU=window._NXAU||(window._NXAU={});
if(!_NXAU.boot){try{_NXAU.boot=true;
_NXAU.KEY="nexium_auto_v1";
_NXAU.MAXLOG=80;
_NXAU.MAXNOTES=60;
_NXAU.listeners=[];
_NXAU.notify=function(){for(var a=0;a<_NXAU.listeners.length;a++){try{_NXAU.listeners[a]();}catch(_){}}};
_NXAU._seq=0;
_NXAU.uid=function(){var id;var guard=0;
do{_NXAU._seq=(_NXAU._seq+1)%1000000;
id="t"+Date.now().toString(36)+"-"+_NXAU._seq.toString(36)+Math.floor(Math.random()*46656).toString(36);
guard++;}while(guard<50&&_NXAU.data&&_NXAU.byId&&_NXAU.byId(id));
return id;};
_NXAU.load=function(){var d;try{var raw=_NXDB.get(_NXAU.KEY);d=raw?JSON.parse(raw):null;}catch(_){d=null;}
if(!d||typeof d!=="object")d={};
if(typeof d.on!=="boolean")d.on=true;
if(!Array.isArray(d.tasks))d.tasks=[];
if(!Array.isArray(d.log))d.log=[];
if(!Array.isArray(d.notes))d.notes=[];
if(!d.counters||typeof d.counters!=="object")d.counters={};
if(typeof d.lastDay!=="string")d.lastDay="";
// L envoi de messages : coupe par defaut, et plafonne. Une automatisation
// qui parle a ta place peut te faire exclure d un serveur en trois minutes.
if(!d.envoi||typeof d.envoi!=="object")d.envoi={};
if(typeof d.envoi.on!=="boolean")d.envoi.on=false;
if(typeof d.envoi.parHeure!=="number")d.envoi.parHeure=6;
if(typeof d.envoi.mini!=="number")d.envoi.mini=25;
if(!Array.isArray(d.envoi.faits))d.envoi.faits=[];
for(var a=0;a<d.tasks.length;a++){var t=d.tasks[a];
if(!t.id)t.id=_NXAU.uid();
if(typeof t.on!=="boolean")t.on=true;
if(!t.trig||typeof t.trig!=="object")t.trig={k:"boot"};
if(!t.act||typeof t.act!=="object")t.act={k:"toast",v:""};
if(!t.cond||typeof t.cond!=="object")t.cond={};
if(typeof t.runs!=="number")t.runs=0;}
return d;};
_NXAU.data=_NXAU.load();
_NXAU.save=function(){try{_NXDB.set(_NXAU.KEY,JSON.stringify(_NXAU.data));}catch(_){}};
_NXAU.dayKey=function(t){var d=new Date(t||Date.now());var m=d.getMonth()+1,j=d.getDate();return d.getFullYear()+"-"+(m<10?"0"+m:m)+"-"+(j<10?"0"+j:j);};
_NXAU.hhmm=function(d){return ("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);};

_NXAU.TRIG=[
{k:"time",g:"Temps",n:"A une heure fixe",d:"Chaque jour a l heure choisie.",arg:"time",ph:"08:30"},
{k:"every",g:"Temps",n:"Toutes les N minutes",d:"Repete a intervalle regulier tant que le client tourne.",arg:"num",ph:"60"},
{k:"boot",g:"Temps",n:"Au demarrage du client",d:"Une seule fois, peu apres le lancement."},
{k:"once",g:"Temps",n:"A une date precise",d:"Une seule fois, puis la tache s efface.",arg:"num",ph:"horodatage"},
{k:"firstOfDay",g:"Temps",n:"Premier lancement du jour",d:"La premiere fois que tu ouvres Discord dans la journee."},
{k:"dm",g:"Messages",n:"Message prive recu",d:"Quand quelqu un t ecrit en prive."},
{k:"mention",g:"Messages",n:"Quand on te mentionne",d:"Ton compte est mentionne dans un message."},
{k:"keyword",g:"Messages",n:"Mot-cle repere",d:"Un message recu contient ce mot ou cette expression.",arg:"text",ph:"recrutement"},
{k:"from",g:"Messages",n:"Message d une personne",d:"Un message d un pseudo ou d un identifiant precis.",arg:"text",ph:"kikou"},
{k:"link",g:"Messages",n:"Lien recu",d:"Un message recu contient une adresse web."},
{k:"attach",g:"Messages",n:"Piece jointe recue",d:"Un message recu contient un fichier."},
{k:"threat",g:"Messages",n:"Menace bloquee",d:"Nexium Protect vient de bloquer quelque chose."},
{k:"voiceJoin",g:"Presence",n:"Entree en vocal",d:"Tu rejoins un salon vocal."},
{k:"voiceLeave",g:"Presence",n:"Sortie de vocal",d:"Tu quittes un salon vocal."},
{k:"guildJoin",g:"Presence",n:"Nouveau serveur rejoint",d:"Tu viens de rejoindre un serveur."},
{k:"friendReq",g:"Presence",n:"Demande d ami recue",d:"Quelqu un t envoie une demande d ami."},
{k:"idle",g:"Presence",n:"Apres une inactivite",d:"Aucune frappe ni clic depuis N minutes.",arg:"num",ph:"15"},
{k:"active",g:"Presence",n:"Retour d activite",d:"Tu reviens apres une periode d inactivite."},
{k:"focus",g:"Presence",n:"Discord au premier plan",d:"La fenetre Discord reprend le focus."},
{k:"blur",g:"Presence",n:"Discord en arriere-plan",d:"Tu quittes la fenetre Discord."},
{k:"stat",g:"Temps",n:"Seuil de messages atteint",d:"Tu as envoye N messages aujourd hui.",arg:"num",ph:"100"}
];
_NXAU.ACT=[
{k:"toast",g:"Prevenir",n:"Message dans Discord",d:"Un bandeau discret en bas de Discord.",arg:"text",ph:"Rappel"},
{k:"notify",g:"Prevenir",n:"Notification systeme",d:"Une notification hors de Discord.",arg:"text",ph:"C est l heure de la pause"},
{k:"sound",g:"Prevenir",n:"Signal sonore",d:"Un bip court, sans fichier externe."},
{k:"log",g:"Prevenir",n:"Ecrire dans le journal",d:"Trace horodatee, sans rien afficher.",arg:"text",ph:"point de controle"},
{k:"clip",g:"Texte",n:"Copier un texte",d:"Place un texte dans le presse-papiers.",arg:"text",ph:"texte a coller"},
{k:"draft",g:"Texte",n:"Preparer une reponse",d:"Copie une reponse toute prete et te previent : tu n as plus qu a coller.",arg:"text",ph:"Je te reponds des que possible."},
{k:"copyLink",g:"Texte",n:"Copier le dernier lien",d:"Copie la derniere adresse recue dans un message."},
{k:"note",g:"Texte",n:"Enregistrer un memo",d:"Ajoute une note horodatee dans le carnet Nexium.",arg:"text",ph:"{auteur} : {contenu}"},
{k:"notes",g:"Texte",n:"Copier le carnet",d:"Copie toutes les notes dans le presse-papiers."},
{k:"summary",g:"Bilan",n:"Resume d activite du jour",d:"Messages, mots et temps vocal du jour."},
{k:"digest",g:"Bilan",n:"Bilan des automatisations",d:"Ce que le moteur a declenche aujourd hui."},
{k:"export",g:"Donnees",n:"Exporter les reglages Nexium",d:"Copie une sauvegarde complete dans le presse-papiers."},
{k:"purge",g:"Donnees",n:"Purger les donnees anciennes",d:"Efface les journaux Nexium plus vieux que N jours.",arg:"num",ph:"90"},
{k:"counter",g:"Memoire",n:"Incrementer un compteur",d:"Ajoute 1 a un compteur nomme, reutilisable comme condition.",arg:"text",ph:"mp_recus"},
{k:"resetCounter",g:"Memoire",n:"Remettre un compteur a zero",d:"Repart de zero sur le compteur nomme.",arg:"text",ph:"mp_recus"},
{k:"chain",g:"Enchainement",n:"Declencher une autre tache",d:"Execute une autre tache dans la foulee.",arg:"task"},
{k:"toggleTask",g:"Enchainement",n:"Activer ou couper une tache",d:"Bascule une autre tache.",arg:"task"},
{k:"snooze",g:"Enchainement",n:"Mettre une tache en veille",d:"Suspend une tache pendant N minutes.",arg:"tasknum"},
{k:"mute",g:"Vocal",n:"Couper le micro",d:"Bascule le micro sur muet."},
{k:"deafen",g:"Vocal",n:"Couper le son",d:"Bascule la sortie audio sur muet."},
{k:"status",g:"Presence",n:"Changer le statut",d:"En ligne, absent, ne pas deranger ou invisible.",arg:"status"},
{k:"open",g:"Donnees",n:"Ouvrir un lien",d:"Ouvre une adresse dans le navigateur.",arg:"text",ph:"https://"},
{k:"reply",g:"Envoyer",n:"Repondre dans le salon",d:"Envoie un message dans le salon qui a declenche la regle. Demande l autorisation d envoi.",arg:"text",ph:"Je reviens dans un instant."},
{k:"send",g:"Envoyer",n:"Envoyer dans un salon",d:"Envoie un message dans un salon precis. Ecris : identifiant du salon | texte.",arg:"text",ph:"123456789012345678 | Bonjour"},
{k:"dm",g:"Envoyer",n:"Envoyer un message prive",d:"Ouvre la conversation privee avec un compte et lui ecrit. Ecris : identifiant du compte | texte.",arg:"text",ph:"123456789012345678 | Bonjour"}
];
_NXAU.STATUS=[["online","En ligne"],["idle","Absent"],["dnd","Ne pas deranger"],["invisible","Invisible"]];
_NXAU.OPS=[[">=","au moins"],["<=","au plus"],["==","exactement"]];
_NXAU.trigDef=function(k){for(var a=0;a<_NXAU.TRIG.length;a++)if(_NXAU.TRIG[a].k===k)return _NXAU.TRIG[a];return null;};
_NXAU.actDef=function(k){for(var a=0;a<_NXAU.ACT.length;a++)if(_NXAU.ACT[a].k===k)return _NXAU.ACT[a];return null;};
_NXAU.groups=function(list){var out=[],seen={};for(var a=0;a<list.length;a++){var g=list[a].g||"Autre";if(!seen[g]){seen[g]=1;out.push(g);}}return out;};

_NXAU.wp=function(){try{return (window.Vencord&&Vencord.Webpack)||null;}catch(_){return null;}};
_NXAU.voiceMod=function(){try{var W=_NXAU.wp();if(!W||!W.findByProps)return null;return W.findByProps("toggleSelfMute")||null;}catch(_){return null;}};
_NXAU.statusMod=function(){try{
var W=_NXAU.wp();if(!W)return null;
if(_NXAU._sm!==undefined)return _NXAU._sm;
var m=null;
try{if(W.findByProps)m=W.findByProps("updateRemoteSettings")||null;}catch(_){}
if(!m){try{if(W.find)m=W.find(function(x){return x&&typeof x.updateSetting==="function"&&typeof x.getSetting==="function"&&typeof x.useSetting==="function";})||null;}catch(_){}}
_NXAU._sm=m;return m;}catch(_){return null;}};
_NXAU.audioCtx=function(){try{
var AC=window.AudioContext||window.webkitAudioContext;
if(typeof AC!=="function")return null;
if(!_NXAU._ac)_NXAU._ac=new AC();
return _NXAU._ac;}catch(_){return null;}};
// ------------------------------------------------------------- les envois
_NXAU.MSG=[["reply","dans le salon qui a declenche"],["send","dans un salon nomme"],["dm","en message prive"]];
_NXAU.estEnvoi=function(k){return k==="reply"||k==="send"||k==="dm";};
_NXAU.envoiPret=function(){try{
return !!(window._NXIA&&_NXIA.envoiReel&&_NXAU.data.envoi&&_NXAU.data.envoi.on);}catch(_){return false;}};
// Le plafond : au plus N envois par heure, et jamais deux coup sur coup.
_NXAU.envoiPlace=function(){try{
var E=_NXAU.data.envoi,now=Date.now();
E.faits=(E.faits||[]).filter(function(t){return (now-t)<3600000;});
if(E.faits.length>=Math.max(1,E.parHeure))
return {non:"plafond atteint : "+E.faits.length+" envoi(s) dans l heure"};
if(E.faits.length&&(now-E.faits[E.faits.length-1])<(Math.max(5,E.mini)*1000))
return {non:"trop rapproche du precedent envoi"};
return {ok:true};}catch(_){return {non:"etat d envoi illisible"};}};
_NXAU.envoiNote=function(){try{
var E=_NXAU.data.envoi;E.faits=(E.faits||[]);E.faits.push(Date.now());
if(E.faits.length>40)E.faits=E.faits.slice(-40);
_NXAU.save();}catch(_){}};
// Le salon prive d un compte : on prend celui qui existe deja, sinon on le
// fait ouvrir par Discord. Aucune invitation, aucun contournement.
_NXAU.salonPrive=function(uid){try{
var W=_NXAU.wp();if(!W||!W.findByProps)return Promise.resolve(null);
var id=String(uid||"").replace(/[^0-9]/g,"");
if(!/^[0-9]{15,25}$/.test(id))return Promise.resolve(null);
var PS=null;try{PS=W.findByProps("getDMFromUserId");}catch(_){}
try{var deja=PS&&PS.getDMFromUserId&&PS.getDMFromUserId(id);if(deja)return Promise.resolve(deja);}catch(_){}
var CA=null;try{CA=W.findByProps("openPrivateChannel");}catch(_){}
if(!CA||typeof CA.openPrivateChannel!=="function")return Promise.resolve(null);
try{return Promise.resolve(CA.openPrivateChannel(id)).then(function(r){
try{if(typeof r==="string"&&r)return r;
var c=PS&&PS.getDMFromUserId&&PS.getDMFromUserId(id);
return c||null;}catch(_){return null;}},function(){return null;});
}catch(_){return Promise.resolve(null);}}catch(_){return Promise.resolve(null);}};
// Le salon vise selon l action. Rend une promesse d identifiant, ou null.
_NXAU.cible=function(task,ctx){try{
var k=(task.act&&task.act.k)||"";
var v=String((task.act&&task.act.v)||"").trim();
if(k==="reply"){
var c=(ctx&&(ctx.channelId||ctx.cid))||"";
if(!c&&window._NXIA&&_NXIA.salonCourant)c=_NXIA.salonCourant()||"";
return Promise.resolve(c||null);}
if(k==="send"){
// "salon | texte" : la premiere partie designe le salon.
var sp=_NXAU.splitArg(v);
var id=String(sp.a||"").replace(/[^0-9]/g,"");
return Promise.resolve(/^[0-9]{15,25}$/.test(id)?id:null);}
if(k==="dm"){
var sp2=_NXAU.splitArg(v);
return _NXAU.salonPrive(sp2.a);}
return Promise.resolve(null);}catch(_){return Promise.resolve(null);}};
_NXAU.probe=function(k){try{
if(_NXAU.estEnvoi(k))return !!(window._NXIA&&_NXIA.envoiReel);
if(k==="notify")return typeof Notification==="function";
if(k==="toast")return !!(window._NXPR&&_NXPR.toast);
if(k==="clip"||k==="draft"||k==="export"||k==="copyLink"||k==="notes")return !!(window.DiscordNative&&DiscordNative.clipboard&&DiscordNative.clipboard.copy);
if(k==="summary")return !!(window._NXS&&_NXS.data);
if(k==="sound")return !!(window.AudioContext||window.webkitAudioContext);
if(k==="mute"||k==="deafen")return !!_NXAU.voiceMod();
if(k==="status")return !!_NXAU.statusMod();
if(k==="open")return !!(window.VencordNative&&VencordNative.native&&VencordNative.native.openExternal);
return true;}catch(_){return false;}};

_NXAU.jot=function(taskName,msg,bad){try{
_NXAU.data.log.unshift({t:Date.now(),n:String(taskName||"").slice(0,50),m:String(msg||"").slice(0,120),e:!!bad});
if(_NXAU.data.log.length>_NXAU.MAXLOG)_NXAU.data.log=_NXAU.data.log.slice(0,_NXAU.MAXLOG);
_NXAU.save();_NXAU.notify();}catch(_){}};
_NXAU.getCounter=function(n){try{return _NXAU.data.counters[String(n||"").trim()]||0;}catch(_){return 0;}};
_NXAU.bumpCounter=function(n,by){try{
var k=String(n||"").trim();if(!k)return 0;
_NXAU.data.counters[k]=(_NXAU.data.counters[k]||0)+(typeof by==="number"?by:1);
_NXAU.save();_NXAU.notify();return _NXAU.data.counters[k];}catch(_){return 0;}};
_NXAU.setCounter=function(n,v){try{
var k=String(n||"").trim();if(!k)return;
_NXAU.data.counters[k]=v|0;_NXAU.save();_NXAU.notify();}catch(_){}};
_NXAU.delCounter=function(n){try{delete _NXAU.data.counters[n];_NXAU.save();_NXAU.notify();}catch(_){}};
_NXAU.addNote=function(txt){try{
_NXAU.data.notes.unshift({t:Date.now(),m:String(txt||"").slice(0,220)});
if(_NXAU.data.notes.length>_NXAU.MAXNOTES)_NXAU.data.notes=_NXAU.data.notes.slice(0,_NXAU.MAXNOTES);
_NXAU.save();_NXAU.notify();}catch(_){}};
_NXAU.delNote=function(idx){try{_NXAU.data.notes.splice(idx,1);_NXAU.save();_NXAU.notify();}catch(_){}};
_NXAU.clearNotes=function(){try{_NXAU.data.notes=[];_NXAU.save();_NXAU.notify();}catch(_){}};

_NXAU.inWindow=function(c,now){try{
if(!c)return true;
if(Array.isArray(c.days)&&c.days.length){var wd=(now.getDay()+6)%7;if(c.days.indexOf(wd)<0)return false;}
if(c.from&&c.to){var cur=_NXAU.hhmm(now);
if(c.from<=c.to){if(cur<c.from||cur>c.to)return false;}
else{if(cur<c.from&&cur>c.to)return false;}}
return true;}catch(_){return true;}};
_NXAU.myStatus=function(){try{
var st=_NXcommon().store("PresenceStore");
var us=_NXcommon().store("UserStore");
var me=us&&us.getCurrentUser&&us.getCurrentUser();
if(st&&me&&st.getStatus)return st.getStatus(me.id)||"";}catch(_){}return "";};
_NXAU.inVoice=function(){try{
var vs=_NXcommon().store("VoiceStateStore");
var us=_NXcommon().store("UserStore");
var me=us&&us.getCurrentUser&&us.getCurrentUser();
if(vs&&me&&vs.getVoiceStateForUser){var v=vs.getVoiceStateForUser(me.id);return !!(v&&v.channelId);}}catch(_){}
return !!_NXAU._voiceCh;};
_NXAU.dayCount=function(t){try{
var dk=_NXAU.dayKey();
if(t._day!==dk){t._day=dk;t._dayN=0;}
return t._dayN||0;}catch(_){return 0;}};
_NXAU.allow=function(task,ctx){try{
if(!_NXAU.data.on||!task||!task.on)return false;
if(task.snoozeUntil&&Date.now()<task.snoozeUntil)return false;
var c=task.cond||{};
var now=new Date();
if(!_NXAU.inWindow(c,now))return false;
if(c.dmOnly&&ctx&&ctx.isDM===false)return false;
if(c.guild){var g=String((ctx&&ctx.guild)||"").toLowerCase();if(g.indexOf(String(c.guild).toLowerCase())<0)return false;}
if(c.notDnd&&_NXAU.myStatus()==="dnd")return false;
if(c.voice==="in"&&!_NXAU.inVoice())return false;
if(c.voice==="out"&&_NXAU.inVoice())return false;
if(c.gap){var g2=parseInt(c.gap,10)||0;if(g2>0&&task.last&&(Date.now()-task.last)<g2*60000)return false;}
if(c.maxDay){var mx=parseInt(c.maxDay,10)||0;if(mx>0&&_NXAU.dayCount(task)>=mx)return false;}
if(c.counter&&c.counter.n){
var cur=_NXAU.getCounter(c.counter.n);var v=parseInt(c.counter.v,10)||0;var op=c.counter.op||">=";
if(op===">="&&!(cur>=v))return false;
if(op==="<="&&!(cur<=v))return false;
if(op==="=="&&!(cur===v))return false;}
return true;}catch(_){return false;}};

_NXAU.lastLink="";
_NXAU.text=function(task,ctx){try{
var v=String((task.act&&task.act.v)||"");
var now=new Date();
ctx=ctx||{};
v=v.replace(/\{heure\}/g,_NXAU.hhmm(now));
v=v.replace(/\{date\}/g,_NXAU.dayKey());
v=v.replace(/\{tache\}/g,task.name||"");
v=v.replace(/\{auteur\}/g,ctx.author||"");
v=v.replace(/\{contenu\}/g,String(ctx.content||"").slice(0,140));
v=v.replace(/\{salon\}/g,ctx.channel||"");
v=v.replace(/\{serveur\}/g,ctx.guild||"");
v=v.replace(/\{lien\}/g,ctx.link||_NXAU.lastLink||"");
v=v.replace(/\{compteur:([^}]{1,40})\}/g,function(_m,n){return String(_NXAU.getCounter(n));});
return v;}catch(_){return "";}};
_NXAU.notifSys=function(title,body){try{
if(typeof Notification!=="function")return false;
if(Notification.permission==="granted"){new Notification(title,{body:body,silent:false});return true;}
if(Notification.permission!=="denied"){Notification.requestPermission().then(function(p){try{if(p==="granted")new Notification(title,{body:body});}catch(_){}});return true;}
return false;}catch(_){return false;}};
_NXAU.copy=function(t){try{if(window.DiscordNative&&DiscordNative.clipboard&&DiscordNative.clipboard.copy){DiscordNative.clipboard.copy(String(t));return true;}}catch(_){}return false;};
_NXAU.beep=function(){try{
var ac=_NXAU.audioCtx();if(!ac)return false;
if(ac.state==="suspended"&&ac.resume)ac.resume();
var o=ac.createOscillator(),g=ac.createGain();
o.type="sine";o.frequency.value=880;
g.gain.setValueAtTime(0.0001,ac.currentTime);
g.gain.exponentialRampToValueAtTime(0.09,ac.currentTime+0.02);
g.gain.exponentialRampToValueAtTime(0.0001,ac.currentTime+0.28);
o.connect(g);g.connect(ac.destination);
o.start();o.stop(ac.currentTime+0.3);
return true;}catch(_){return false;}};
_NXAU.summary=function(){try{
var S=window._NXS;if(!S||!S.data)return "Statistiques indisponibles.";
var dk=S.dayKey?S.dayKey(Date.now()):null;
var msgs=(dk&&S.data.daily&&S.data.daily[dk])||0;
var chars=(dk&&S.data.dailyChars&&S.data.dailyChars[dk])||0;
var voice=(dk&&S.data.voiceDaily&&S.data.voiceDaily[dk])||0;
return msgs+" message(s), "+chars+" caractere(s), "+Math.round(voice/60)+" min en vocal.";}catch(_){return "Statistiques indisponibles.";}};
_NXAU.digest=function(){try{
var dk=_NXAU.dayKey(),n=0,names={};
for(var a=0;a<_NXAU.data.log.length;a++){var e=_NXAU.data.log[a];
if(_NXAU.dayKey(e.t)!==dk)continue;n++;names[e.n]=(names[e.n]||0)+1;}
if(!n)return "Aucune automatisation declenchee aujourd hui.";
var parts=[];for(var k in names)parts.push(k+" ×"+names[k]);
return n+" execution(s) aujourd hui : "+parts.slice(0,5).join(", ")+".";}catch(_){return "Bilan indisponible.";}};
_NXAU.exportAll=function(){try{
var obj={_nexium:1,at:Date.now(),data:{}};
var ks=_NXDB.keys();
for(var a=0;a<ks.length;a++){if(ks[a]&&ks[a].indexOf("nexium_")===0)obj.data[ks[a]]=_NXDB.get(ks[a]);}
return _NXAU.copy(JSON.stringify(obj))?Object.keys(obj.data).length:-1;}catch(_){return -1;}};
_NXAU.purge=function(days){try{
var d=parseInt(days,10);if(!(d>0))d=90;
var cut=Date.now()-d*86400000,n=0;
try{if(window._NXPR&&_NXPR.stats&&Array.isArray(_NXPR.stats.recent)){var b1=_NXPR.stats.recent.length;
_NXPR.stats.recent=_NXPR.stats.recent.filter(function(r){return r&&r.t>cut;});n+=b1-_NXPR.stats.recent.length;_NXPR.saveStats();}}catch(_){}
try{if(window._NXPR&&Array.isArray(_NXPR.quar)){var b2=_NXPR.quar.length;
_NXPR.quar=_NXPR.quar.filter(function(r){return r&&r.t>cut;});n+=b2-_NXPR.quar.length;_NXPR.saveQuar();}}catch(_){}
try{if(window._NXV&&_NXV.stats&&Array.isArray(_NXV.stats.log)){var b3=_NXV.stats.log.length;
_NXV.stats.log=_NXV.stats.log.filter(function(r){return r&&r.t>cut;});n+=b3-_NXV.stats.log.length;if(_NXV.saveStats)_NXV.saveStats();}}catch(_){}
var b4=_NXAU.data.log.length;
_NXAU.data.log=_NXAU.data.log.filter(function(r){return r&&r.t>cut;});n+=b4-_NXAU.data.log.length;
var b5=_NXAU.data.notes.length;
_NXAU.data.notes=_NXAU.data.notes.filter(function(r){return r&&r.t>cut;});n+=b5-_NXAU.data.notes.length;
_NXAU.save();
return n;}catch(_){return 0;}};
_NXAU.setStatus=function(v){try{
var m=_NXAU.statusMod();if(!m)return false;
if(typeof m.updateSetting==="function"){m.updateSetting(String(v));return true;}
if(typeof m.updateRemoteSettings==="function"){m.updateRemoteSettings({status:String(v)});return true;}
return false;}catch(_){return false;}};
_NXAU.voice=function(which){try{
var m=_NXAU.voiceMod();if(!m)return false;
if(which==="deafen"&&typeof m.toggleSelfDeaf==="function"){m.toggleSelfDeaf();return true;}
if(which==="mute"&&typeof m.toggleSelfMute==="function"){m.toggleSelfMute();return true;}
return false;}catch(_){return false;}};
_NXAU.openUrl=function(u){try{
var s=String(u||"");if(!/^https?:\/\//i.test(s))return false;
if(window.VencordNative&&VencordNative.native&&VencordNative.native.openExternal){VencordNative.native.openExternal(s);return true;}
return false;}catch(_){return false;}};
_NXAU.findTask=function(ref){try{
var r=String(ref||"").trim();if(!r)return null;
var t=_NXAU.byId(r);if(t)return t;
var low=r.toLowerCase();
for(var a=0;a<_NXAU.data.tasks.length;a++){if(String(_NXAU.data.tasks[a].name||"").toLowerCase()===low)return _NXAU.data.tasks[a];}
for(var b=0;b<_NXAU.data.tasks.length;b++){if(String(_NXAU.data.tasks[b].name||"").toLowerCase().indexOf(low)>=0)return _NXAU.data.tasks[b];}
return null;}catch(_){return null;}};
_NXAU.splitArg=function(v){var s=String(v||"");var i=s.lastIndexOf(":");
if(i<0)return {a:s.trim(),b:""};
return {a:s.slice(0,i).trim(),b:s.slice(i+1).trim()};};

_NXAU.perform=function(task,ctx,depth){try{
var k=(task.act&&task.act.k)||"toast";
var txt=_NXAU.text(task,ctx);
var nm=task.name||"Tache";
depth=depth||0;
if(!_NXAU.probe(k)){_NXAU.jot(nm,"action indisponible sur ce client : "+k,true);return false;}
if(k==="toast"){if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr(txt)||_NXtr(nm),1);_NXAU.jot(nm,"message affiche");return true;}
if(k==="notify"){var okn=_NXAU.notifSys("Nexium Auto — "+nm,txt||nm);_NXAU.jot(nm,okn?"notification envoyee":"notification refusee par le systeme",!okn);return okn;}
if(k==="sound"){var okb=_NXAU.beep();_NXAU.jot(nm,okb?"signal sonore":"son indisponible",!okb);return okb;}
if(k==="log"){_NXAU.jot(nm,txt||"execute");return true;}
if(k==="clip"){var okc=_NXAU.copy(txt);_NXAU.jot(nm,okc?"texte copie":"copie impossible",!okc);return okc;}
if(k==="draft"){var okd=_NXAU.copy(txt);
if(okd){_NXAU.notifSys("Nexium Auto — reponse prete",txt.slice(0,120));try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Reponse copiee : tu n as plus qu a la coller."),1);}catch(_){}}
_NXAU.jot(nm,okd?"reponse preparee dans le presse-papiers":"copie impossible",!okd);return okd;}
if(k==="copyLink"){var L=(ctx&&ctx.link)||_NXAU.lastLink||"";
if(!L){_NXAU.jot(nm,"aucun lien recu pour l instant",true);return false;}
var okl=_NXAU.copy(L);_NXAU.jot(nm,okl?("lien copie : "+L.slice(0,60)):"copie impossible",!okl);return okl;}
if(k==="note"){_NXAU.addNote(txt||nm);_NXAU.jot(nm,"memo enregistre");return true;}
if(k==="notes"){
if(!_NXAU.data.notes.length){_NXAU.jot(nm,"carnet vide",true);return false;}
var body=_NXAU.data.notes.map(function(n){return new Date(n.t).toISOString()+" | "+n.m;}).join("\n");
var okN=_NXAU.copy(body);_NXAU.jot(nm,okN?(_NXAU.data.notes.length+" note(s) copiee(s)"):"copie impossible",!okN);return okN;}
if(k==="summary"){var s=_NXAU.summary();_NXAU.notifSys("Nexium Auto — resume du jour",s);try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr(s),1);}catch(_){}_NXAU.jot(nm,s);return true;}
if(k==="digest"){var g=_NXAU.digest();_NXAU.notifSys("Nexium Auto — bilan",g);try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr(g),1);}catch(_){}_NXAU.jot(nm,g);return true;}
if(k==="export"){var cnt=_NXAU.exportAll();_NXAU.jot(nm,cnt>=0?("sauvegarde copiee : "+cnt+" cle(s)"):"export impossible",cnt<0);return cnt>=0;}
if(k==="purge"){var n=_NXAU.purge((task.act&&task.act.v)||90);_NXAU.jot(nm,n+" entree(s) purgee(s)");return true;}
if(k==="counter"){var cn=(task.act&&task.act.v)||"compteur";var nv=_NXAU.bumpCounter(cn,1);_NXAU.jot(nm,"compteur "+cn+" = "+nv);return true;}
if(k==="resetCounter"){var rn=(task.act&&task.act.v)||"compteur";_NXAU.setCounter(rn,0);_NXAU.jot(nm,"compteur "+rn+" remis a zero");return true;}
if(k==="chain"){
if(depth>=3){_NXAU.jot(nm,"enchainement trop profond, arrete",true);return false;}
var tgt=_NXAU.findTask((task.act&&task.act.v)||"");
if(!tgt){_NXAU.jot(nm,"tache a enchainer introuvable",true);return false;}
if(tgt.id===task.id){_NXAU.jot(nm,"une tache ne peut pas s enchainer sur elle-meme",true);return false;}
_NXAU.jot(nm,"enchaine vers "+(tgt.name||tgt.id));
return _NXAU.perform(tgt,ctx,depth+1);}
if(k==="toggleTask"){
var tg=_NXAU.findTask((task.act&&task.act.v)||"");
if(!tg){_NXAU.jot(nm,"tache a basculer introuvable",true);return false;}
tg.on=!tg.on;_NXAU.save();_NXAU.notify();
_NXAU.jot(nm,(tg.name||tg.id)+(tg.on?" activee":" coupee"));return true;}
if(k==="snooze"){
var sp=_NXAU.splitArg((task.act&&task.act.v)||"");
var st=_NXAU.findTask(sp.a);
if(!st){_NXAU.jot(nm,"tache a mettre en veille introuvable",true);return false;}
var mins=parseInt(sp.b,10)||30;
st.snoozeUntil=Date.now()+mins*60000;_NXAU.save();_NXAU.notify();
_NXAU.jot(nm,(st.name||st.id)+" en veille "+mins+" min");return true;}
if(k==="mute"||k==="deafen"){var okv=_NXAU.voice(k);_NXAU.jot(nm,okv?(k==="mute"?"micro bascule":"son bascule"):"commande vocale indisponible",!okv);return okv;}
if(k==="status"){var oks=_NXAU.setStatus((task.act&&task.act.v)||"dnd");_NXAU.jot(nm,oks?("statut change : "+((task.act&&task.act.v)||"dnd")):"changement de statut indisponible",!oks);return oks;}
if(k==="open"){var oko=_NXAU.openUrl(txt||(task.act&&task.act.v)||"");_NXAU.jot(nm,oko?"lien ouvert":"adresse invalide",!oko);return oko;}
if(_NXAU.estEnvoi(k)){
if(!_NXAU.envoiPret()){_NXAU.jot(nm,"envoi de messages non autorise : active-le dans l onglet Envoi",true);return false;}
var pl=_NXAU.envoiPlace();
if(!pl.ok){_NXAU.jot(nm,pl.non,true);return false;}
// Pour "send" et "dm", le texte suit la barre verticale ; pour "reply", il
// est pris tel quel apres substitution des variables.
var corps=txt;
if(k!=="reply"){var sp3=_NXAU.splitArg(String((task.act&&task.act.v)||""));
corps=_NXAU.text({act:{k:k,v:sp3.b}},ctx)||sp3.b;}
corps=String(corps||"").trim();
if(!corps){_NXAU.jot(nm,"aucun texte a envoyer",true);return false;}
if(corps.length>1800)corps=corps.slice(0,1800);
_NXAU.cible(task,ctx).then(function(cid){
if(!cid){_NXAU.jot(nm,"destinataire introuvable",true);return;}
_NXAU.envoiNote();
_NXIA.envoiReel(cid,corps).then(function(r){
if(r&&r.erreur){_NXAU.jot(nm,"envoi refuse : "+r.erreur,true);return;}
_NXAU.jot(nm,"message envoye"+(r&&r.ou?(" dans "+r.ou):"")+" : "+corps.slice(0,60));
},function(){_NXAU.jot(nm,"envoi impossible",true);});
});
// L envoi est asynchrone : la tache est comptee comme lancee, et le
// journal dira si le message est reellement parti.
_NXAU.jot(nm,"envoi demande");
return true;}
_NXAU.jot(nm,"action inconnue : "+k,true);return false;}catch(e){try{_NXAU.jot(task&&task.name,"erreur : "+((e&&e.message)||"inconnue"),true);}catch(_){}return false;}};
_NXAU.run=function(task,ctx){try{
if(!task)return false;
task.runs=(task.runs||0)+1;task.last=Date.now();
var dk=_NXAU.dayKey();
if(task._day!==dk){task._day=dk;task._dayN=0;}
task._dayN=(task._dayN||0)+1;
var r=_NXAU.perform(task,ctx||{},0);
_NXAU.save();_NXAU.notify();
return r;}catch(_){return false;}};
_NXAU.testRun=function(id){try{
var t=_NXAU.byId(id);if(!t)return false;
_NXAU.jot(t.name,"declenchement manuel");
return _NXAU.perform(t,{manual:true,author:"toi",content:"test",channel:"test",guild:"test"},0);}catch(_){return false;}};
_NXAU.byId=function(id){for(var a=0;a<_NXAU.data.tasks.length;a++)if(_NXAU.data.tasks[a].id===id)return _NXAU.data.tasks[a];return null;};
_NXAU.add=function(t){try{
var task={id:_NXAU.uid(),name:(t&&t.name)||"Nouvelle tache",on:true,
trig:(t&&t.trig)||{k:"boot"},act:(t&&t.act)||{k:"toast",v:""},cond:(t&&t.cond)||{},runs:0,last:0};
_NXAU.data.tasks.unshift(task);_NXAU.save();_NXAU.notify();return task;}catch(_){return null;}};
_NXAU.remove=function(id){try{
_NXAU.data.tasks=_NXAU.data.tasks.filter(function(t){return t.id!==id;});
_NXAU.save();_NXAU.notify();}catch(_){}};
_NXAU.toggle=function(id){try{var t=_NXAU.byId(id);if(!t)return;t.on=!t.on;if(t.on){t._done=false;t.snoozeUntil=0;}_NXAU.save();_NXAU.notify();}catch(_){}};
_NXAU.update=function(id,patch){try{
var t=_NXAU.byId(id);if(!t||!patch)return;
for(var k in patch)t[k]=patch[k];
t._done=false;t._lastFire=0;t.snoozeUntil=0;
_NXAU.save();_NXAU.notify();}catch(_){}};
_NXAU.duplicate=function(id){try{
var t=_NXAU.byId(id);if(!t)return null;
return _NXAU.add({name:(t.name||"Tache")+" (copie)",trig:JSON.parse(JSON.stringify(t.trig)),act:JSON.parse(JSON.stringify(t.act)),cond:JSON.parse(JSON.stringify(t.cond))});}catch(_){return null;}};
_NXAU.setOn=function(v){try{_NXAU.data.on=!!v;_NXAU.save();_NXAU.notify();}catch(_){}};
_NXAU.clearLog=function(){try{_NXAU.data.log=[];_NXAU.save();_NXAU.notify();}catch(_){}};

_NXAU.TPL=[
{name:"Ne pas deranger la nuit",trig:{k:"time",v:"23:00"},act:{k:"status",v:"dnd"},cond:{}},
{name:"Retour en ligne le matin",trig:{k:"time",v:"08:00"},act:{k:"status",v:"online"},cond:{days:[0,1,2,3,4]}},
{name:"Absent apres 15 min d inactivite",trig:{k:"idle",v:"15"},act:{k:"status",v:"idle"},cond:{}},
{name:"De retour, en ligne",trig:{k:"active"},act:{k:"status",v:"online"},cond:{}},
{name:"Pause ecran toutes les heures",trig:{k:"every",v:"60"},act:{k:"notify",v:"Pause : leve les yeux de l ecran une minute."},cond:{from:"09:00",to:"19:00"}},
{name:"Resume du soir",trig:{k:"time",v:"21:00"},act:{k:"summary",v:""},cond:{}},
{name:"Bilan des automatisations",trig:{k:"time",v:"22:00"},act:{k:"digest",v:""},cond:{}},
{name:"Bonjour du jour",trig:{k:"firstOfDay"},act:{k:"toast",v:"Bonjour. Nous sommes le {date}."},cond:{}},
{name:"Sauvegarde hebdomadaire",trig:{k:"time",v:"20:00"},act:{k:"export",v:""},cond:{days:[6]}},
{name:"Menage des vieux journaux",trig:{k:"every",v:"1440"},act:{k:"purge",v:"90"},cond:{}},
{name:"Alerte menace bloquee",trig:{k:"threat"},act:{k:"notify",v:"Nexium Protect vient de bloquer une menace."},cond:{}},
{name:"Veille mot-cle",trig:{k:"keyword",v:"recrutement"},act:{k:"notify",v:"Mot-cle repere : {contenu}"},cond:{}},
{name:"Reponse prete hors horaires",trig:{k:"dm"},act:{k:"draft",v:"Je ne suis pas dispo la, je te reponds des que possible."},cond:{from:"20:00",to:"08:00",maxDay:"3"}},
{name:"Micro coupe a l arrivee",trig:{k:"boot"},act:{k:"mute",v:""},cond:{}},
{name:"Rappel de fin de journee",trig:{k:"time",v:"18:30"},act:{k:"toast",v:"Fin de journee : pense a couper."},cond:{days:[0,1,2,3,4]}},
{name:"Ne pas deranger en vocal",trig:{k:"voiceJoin"},act:{k:"status",v:"dnd"},cond:{}},
{name:"En ligne en quittant le vocal",trig:{k:"voiceLeave"},act:{k:"status",v:"online"},cond:{}},
{name:"Journal des nouveaux serveurs",trig:{k:"guildJoin"},act:{k:"note",v:"Serveur rejoint : {serveur}"},cond:{}},
{name:"Signal sur demande d ami",trig:{k:"friendReq"},act:{k:"sound",v:""},cond:{}},
{name:"Compter les messages prives",trig:{k:"dm"},act:{k:"counter",v:"mp_recus"},cond:{}},
{name:"Alerte au 10e message prive",trig:{k:"dm"},act:{k:"notify",v:"Deja {compteur:mp_recus} messages prives aujourd hui."},cond:{counter:{n:"mp_recus",op:">=",v:"10"},maxDay:"1"}},
{name:"Memo des liens recus",trig:{k:"link"},act:{k:"note",v:"{auteur} dans {salon} : {lien}"},cond:{gap:"1"}},
{name:"Signal sur piece jointe en prive",trig:{k:"attach"},act:{k:"sound",v:""},cond:{dmOnly:true}},
{name:"Silence quand tu pars",trig:{k:"blur"},act:{k:"mute",v:""},cond:{voice:"in",gap:"5"}},
{name:"Cap des 100 messages",trig:{k:"stat",v:"100"},act:{k:"toast",v:"100 messages envoyes aujourd hui."},cond:{}},
{name:"Mention notee et sonnee",trig:{k:"mention"},act:{k:"chain",v:"Signal sur demande d ami"},cond:{gap:"2"}}
];
_NXAU.addTemplate=function(idx){try{
var tp=_NXAU.TPL[idx];if(!tp)return null;
var t=_NXAU.add({name:tp.name,trig:{k:tp.trig.k,v:tp.trig.v||""},act:{k:tp.act.k,v:tp.act.v||""},cond:JSON.parse(JSON.stringify(tp.cond||{}))});
if(t)_NXAU.jot(t.name,"tache ajoutee depuis un modele");
return t;}catch(_){return null;}};

_NXAU.lastAct=Date.now();
_NXAU.wasIdle=false;
_NXAU.markActive=function(){try{
var wasIdle=(Date.now()-_NXAU.lastAct)>=300000;
_NXAU.lastAct=Date.now();
if(wasIdle)_NXAU.fireEvent("active",{});}catch(_){}};
_NXAU.idleMin=function(){return Math.floor((Date.now()-_NXAU.lastAct)/60000);};
_NXAU.dueTime=function(t,now){try{
var v=String((t.trig&&t.trig.v)||"");
if(!/^\d{1,2}:\d{2}$/.test(v))return false;
var cur=_NXAU.hhmm(now);
if(cur!==(v.length===4?("0"+v):v))return false;
var stamp=now.toDateString()+" "+cur;
if(t._stamp===stamp)return false;
t._stamp=stamp;return true;}catch(_){return false;}};
_NXAU.dueEvery=function(t,now){try{
var m=parseInt((t.trig&&t.trig.v)||"0",10);
if(!(m>0))return false;
if(!t._lastFire){t._lastFire=now.getTime();return false;}
if(now.getTime()-t._lastFire<m*60000)return false;
t._lastFire=now.getTime();return true;}catch(_){return false;}};
_NXAU.dueIdle=function(t){try{
var m=parseInt((t.trig&&t.trig.v)||"0",10);
if(!(m>0))return false;
if(_NXAU.idleMin()<m){t._idled=false;return false;}
if(t._idled)return false;
t._idled=true;return true;}catch(_){return false;}};
_NXAU.dueOnce=function(t){try{
var at=parseInt((t.trig&&t.trig.v)||"0",10);
if(!(at>0))return false;
if(Date.now()<at)return false;
if(t._fired)return false;
t._fired=true;
setTimeout(function(){try{_NXAU.remove(t.id);}catch(_){}},1500);
return true;}catch(_){return false;}};
_NXAU.dueStat=function(t){try{
var n=parseInt((t.trig&&t.trig.v)||"0",10);
if(!(n>0))return false;
var S=window._NXS;if(!S||!S.data||!S.dayKey)return false;
var dk=S.dayKey(Date.now());
var cur=(S.data.daily&&S.data.daily[dk])||0;
if(cur<n){return false;}
if(t._statDay===dk)return false;
t._statDay=dk;return true;}catch(_){return false;}};
_NXAU.fireEvent=function(kind,ctx){try{
if(!_NXAU.data.on)return 0;
var n=0,L=_NXAU.data.tasks;
for(var a=0;a<L.length;a++){var t=L[a];
if(!t.on||!t.trig||t.trig.k!==kind)continue;
if(!_NXAU.allow(t,ctx))continue;
_NXAU.run(t,ctx||{});n++;}
return n;}catch(_){return 0;}};
_NXAU.tick=function(){try{
if(!_NXAU.data.on)return;
var now=new Date();
var L=_NXAU.data.tasks;
for(var a=0;a<L.length;a++){var t=L[a];
if(!t.on)continue;
var k=t.trig&&t.trig.k,due=false;
if(k==="time")due=_NXAU.dueTime(t,now);
else if(k==="every")due=_NXAU.dueEvery(t,now);
else if(k==="idle")due=_NXAU.dueIdle(t);
else if(k==="stat")due=_NXAU.dueStat(t);
else if(k==="once")due=_NXAU.dueOnce(t);
if(!due)continue;
if(!_NXAU.allow(t))continue;
_NXAU.run(t,{});}
}catch(_){}};
_NXAU.bootRun=function(){try{
if(!_NXAU.data.on)return;
var L=_NXAU.data.tasks;
for(var a=0;a<L.length;a++){var t=L[a];
if(!t.on||!t.trig||t.trig.k!=="boot"||t._done)continue;
t._done=true;
if(!_NXAU.allow(t))continue;
_NXAU.run(t,{});}
var dk=_NXAU.dayKey();
if(_NXAU.data.lastDay!==dk){_NXAU.data.lastDay=dk;_NXAU.save();_NXAU.fireEvent("firstOfDay",{});}
}catch(_){}};
_NXAU.onThreat=function(kind,detail){try{_NXAU.fireEvent("threat",{kind:kind,content:detail||""});}catch(_){}};
_NXAU.chanInfo=function(cid){try{
var C=_NXcommon();
var CS=C.store("ChannelStore");
var ch=CS&&CS.getChannel&&CS.getChannel(cid);
if(!ch)return {isDM:false,channel:"",guild:""};
var isDM=(ch.type===1||ch.type===3);
var gname="";
try{var GS=C.store("GuildStore");var g=ch.guild_id&&GS&&GS.getGuild&&GS.getGuild(ch.guild_id);if(g)gname=g.name||"";}catch(_){}
return {isDM:isDM,channel:ch.name||(isDM?"message prive":""),guild:gname};}catch(_){return {isDM:false,channel:"",guild:""};}};
_NXAU.onMsg=function(e){try{
if(!_NXAU.data.on)return;
var m=e&&e.message;if(!m)return;
var me=null;try{me=_NXcommon().store("UserStore").getCurrentUser();}catch(_){}
if(me&&m.author&&m.author.id===me.id)return;
var ci=_NXAU.chanInfo(m.channel_id);
var content=String(m.content||"");
var low=content.toLowerCase();
var mentioned=false;
try{if(me&&Array.isArray(m.mentions)){for(var z=0;z<m.mentions.length;z++){if(m.mentions[z]&&m.mentions[z].id===me.id){mentioned=true;break;}}}
if(!mentioned&&me&&(content.indexOf("<@"+me.id+">")>=0||content.indexOf("<@!"+me.id+">")>=0))mentioned=true;}catch(_){}
var author=(m.author&&(m.author.global_name||m.author.username))||"";
var authorId=(m.author&&m.author.id)||"";
var link="";try{var lm=content.match(/https?:\/\/[^\s<>"')]+/i);if(lm){link=lm[0];_NXAU.lastLink=link;}}catch(_){}
var hasAtt=!!(m.attachments&&m.attachments.length);
var ctx={isDM:ci.isDM,channel:ci.channel,guild:ci.guild,author:author,content:content,link:link};
var L=_NXAU.data.tasks;
for(var a=0;a<L.length;a++){var t=L[a];
if(!t.on||!t.trig)continue;
var k=t.trig.k,fire=false;
if(k==="dm")fire=ci.isDM;
else if(k==="mention")fire=mentioned;
else if(k==="link")fire=!!link;
else if(k==="attach")fire=hasAtt;
else if(k==="keyword"){var w=String(t.trig.v||"").trim().toLowerCase();fire=!!(w&&low.indexOf(w)>=0);}
else if(k==="from"){var who=String(t.trig.v||"").trim().toLowerCase();
fire=!!(who&&(authorId===who||author.toLowerCase().indexOf(who)>=0));}
if(!fire)continue;
if(!_NXAU.allow(t,ctx))continue;
var gap=(k==="dm")?20000:5000;
if(t._lastMsg&&(Date.now()-t._lastMsg)<gap)continue;
t._lastMsg=Date.now();
_NXAU.run(t,ctx);}
}catch(_){}};
_NXAU.onVoice=function(e){try{
if(!_NXAU.data.on)return;
var me=null;try{me=_NXcommon().store("UserStore").getCurrentUser();}catch(_){}
if(!me)return;
var arr=(e&&e.voiceStates)||[];
for(var a=0;a<arr.length;a++){var v=arr[a];
if(!v||v.userId!==me.id)continue;
var was=_NXAU._voiceCh||null;
var now=v.channelId||null;
if(was===now)continue;
_NXAU._voiceCh=now;
var gname="";try{var GS=_NXcommon().store("GuildStore");var g=v.guildId&&GS&&GS.getGuild&&GS.getGuild(v.guildId);if(g)gname=g.name||"";}catch(_){}
if(now&&!was)_NXAU.fireEvent("voiceJoin",{guild:gname,channel:""});
else if(!now&&was)_NXAU.fireEvent("voiceLeave",{guild:gname,channel:""});}
}catch(_){}};
_NXAU.onGuild=function(e){try{
var g=e&&e.guild;if(!g)return;
if(_NXAU._bootAt&&(Date.now()-_NXAU._bootAt)<20000)return;
_NXAU.fireEvent("guildJoin",{guild:g.name||"",content:g.name||""});}catch(_){}};
_NXAU.onRelation=function(e){try{
var r=e&&e.relationship;if(!r)return;
if(r.type!==3)return;
var who=(r.user&&(r.user.global_name||r.user.username))||"";
_NXAU.fireEvent("friendReq",{author:who,content:who});}catch(_){}};
_NXAU.onFocus=function(){try{_NXAU.fireEvent("focus",{});}catch(_){}};
_NXAU.onBlur=function(){try{_NXAU.fireEvent("blur",{});}catch(_){}};
_NXAU.wire=function(){try{
if(_NXAU._wired)return;
var C=_NXcommon();
var FX=C.C.FluxDispatcher||(C.WP.findByProps&&C.WP.findByProps("subscribe","dispatch","_actionHandlers"));
if(!FX||!FX.subscribe){_NXAU.tries=(_NXAU.tries||0)+1;if(_NXAU.tries<25)_NXPERF.amorce(_NXAU.wire,1500);return;}
FX.subscribe("MESSAGE_CREATE",_NXPERF.mesure("Auto : messages",_NXAU.onMsg));
FX.subscribe("VOICE_STATE_UPDATES",_NXPERF.mesure("Auto : vocal",_NXAU.onVoice));
FX.subscribe("GUILD_CREATE",_NXPERF.mesure("Auto : serveurs",_NXAU.onGuild));
FX.subscribe("RELATIONSHIP_ADD",_NXPERF.mesure("Auto : amis",_NXAU.onRelation));
_NXAU._wired=true;
}catch(_){}};
_NXAU.hookThreats=function(){try{
if(_NXAU._hooked)return;
if(!window._NXPR||typeof _NXPR.logThreat!=="function"){_NXAU.htries=(_NXAU.htries||0)+1;if(_NXAU.htries<25)_NXPERF.amorce(_NXAU.hookThreats,1500);return;}
var orig=_NXPR.logThreat;
_NXPR.logThreat=function(kind,detail){try{orig.apply(_NXPR,arguments);}catch(_){}try{_NXAU.onThreat(kind,detail);}catch(_){}};
_NXAU._hooked=true;}catch(_){}};
_NXAU.status=function(){try{
var on=0,snoozed=0;
for(var a=0;a<_NXAU.data.tasks.length;a++){var t=_NXAU.data.tasks[a];
if(t.on)on++;
if(t.snoozeUntil&&Date.now()<t.snoozeUntil)snoozed++;}
var miss=[];for(var b=0;b<_NXAU.ACT.length;b++){if(!_NXAU.probe(_NXAU.ACT[b].k))miss.push(_NXAU.ACT[b].k);}
return {moteur:_NXAU.data.on,taches:_NXAU.data.tasks.length,actives:on,enVeille:snoozed,
branche:!!_NXAU._wired,menaces:!!_NXAU._hooked,
declencheurs:_NXAU.TRIG.length,actions:_NXAU.ACT.length,modeles:_NXAU.TPL.length,
compteurs:Object.keys(_NXAU.data.counters).length,notes:_NXAU.data.notes.length,
indisponibles:miss};}catch(_){return {};}};
_NXAU.selfCheck=function(){try{
var need=["load","save","perform","run","tick","bootRun","onMsg","onVoice","onGuild","onRelation","onThreat","onFocus","onBlur","fireEvent","allow","inWindow","text","probe","addTemplate","findTask","bumpCounter","addNote","purge","digest","summary","duplicate","snoozeCheck"];
var miss=[];
for(var a=0;a<need.length;a++)if(typeof _NXAU[need[a]]!=="function")miss.push(need[a]);
return miss;}catch(_){return ["selfCheck"];}};
_NXAU.snoozeCheck=function(){try{
var n=0,L=_NXAU.data.tasks;
for(var a=0;a<L.length;a++){var t=L[a];
if(t.snoozeUntil&&Date.now()>=t.snoozeUntil){t.snoozeUntil=0;n++;}}
if(n){_NXAU.save();_NXAU.notify();}
return n;}catch(_){return 0;}};
try{
["keydown","mousedown","wheel"].forEach(function(ev){try{window.addEventListener(ev,_NXAU.markActive,{passive:true,capture:true});}catch(_){}});
try{window.addEventListener("focus",_NXAU.onFocus);}catch(_){}
try{window.addEventListener("blur",_NXAU.onBlur);}catch(_){}
}catch(_){}
try{
_NXAU._bootAt=Date.now();
_NXAU.wire();
_NXAU.hookThreats();
setTimeout(_NXAU.bootRun,12000);
_NXAU.iv=setInterval(function(){try{if(_NXAU.eco)return;_NXAU.snoozeCheck();_NXAU.tick();}catch(_){}},30000);
}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXAU");if(window._NXERR)_NXERR.push("module _NXAU :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXAU desactive:",_nxE);}catch(_){}}
}
