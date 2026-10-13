var _NXLIVE=window._NXLIVE||(window._NXLIVE={});
if(!_NXLIVE.boot){try{_NXLIVE.boot=true;
// Le vocal en direct.
//
// Discord connait le serveur qui relaie ta voix, ta latence reelle, le codec,
// le debit, les paquets perdus. Il n en montre presque rien.
//
// Une regle tient toute la page : on n affiche que ce qu on a VRAIMENT lu. Un
// champ introuvable est marque introuvable. Un debit invente serait pire que
// pas de debit -- on ne pourrait plus croire le reste.
_NXLIVE.KEY="nexium_vocal";
_NXLIVE.cfg={resoudIP:false,alertes:true,seuilPing:150,seuilPerte:2,serveurs:{}};
_NXLIVE.MAXPINGS=90;
// La session vit en memoire vive. Qui a parle combien de temps ne s ecrit
// nulle part : ce serait une trace sur les autres, pas sur soi.
_NXLIVE.session={debut:0,hote:"",salon:""};
_NXLIVE.parole={};
_NXLIVE.pings=[];
_NXLIVE.derniere=null;
_NXLIVE.ip="";
_NXLIVE.ipHote="";
_NXLIVE.ipErreur="";
_NXLIVE.stats=null;
_NXLIVE._ecoute=[];

_NXLIVE.notify=function(){try{
for(var a=0;a<_NXLIVE._ecoute.length;a++){try{_NXLIVE._ecoute[a]();}catch(_){}}}catch(_){}};

_NXLIVE.load=function(){try{
var r=_NXDB.get(_NXLIVE.KEY);
var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")d={};
if(typeof d.resoudIP!=="boolean")d.resoudIP=false;
if(typeof d.alertes!=="boolean")d.alertes=true;
if(typeof d.seuilPing!=="number"||!(d.seuilPing>=40&&d.seuilPing<=600))d.seuilPing=150;
if(typeof d.seuilPerte!=="number"||!(d.seuilPerte>=0&&d.seuilPerte<=50))d.seuilPerte=2;
if(!d.serveurs||typeof d.serveurs!=="object")d.serveurs={};
_NXLIVE.cfg=d;return d;}catch(_){return null;}};
_NXLIVE.save=function(){try{_NXDB.set(_NXLIVE.KEY,JSON.stringify(_NXLIVE.cfg));}catch(_){}};
_NXLIVE.set=function(k,v){try{_NXLIVE.cfg[k]=v;_NXLIVE.save();_NXLIVE.notify();}catch(_){}};

// Discord renomme ses methodes a chaque refonte. On essaie donc plusieurs
// noms connus et on prend le premier qui rend quelque chose, au lieu de
// dependre d une seule signature qui cassera.
_NXLIVE.essaie=function(obj,noms,arg){try{
if(!obj)return undefined;
for(var a=0;a<noms.length;a++){
try{
var f=obj[noms[a]];
if(typeof f!=="function")continue;
var v=(arg===undefined)?f.call(obj):f.call(obj,arg);
if(v!==undefined&&v!==null&&v!=="")return v;}catch(_){}}
return undefined;}catch(_){return undefined;}};

_NXLIVE.magasin=function(n){try{return _NXcommon().store(n);}catch(_){return null;}};

_NXLIVE.rtc=function(){try{
return _NXLIVE.magasin("RTCConnectionStore")||_NXLIVE.magasin("VoiceConnectionStore")||null;}catch(_){return null;}};

_NXLIVE.moteur=function(){try{
var M=_NXLIVE.magasin("MediaEngineStore");
return (M&&M.getMediaEngine&&M.getMediaEngine())||null;}catch(_){return null;}};

// Les connexions vivantes du moteur, quelle que soit la forme du conteneur.
_NXLIVE.connexions=function(){try{
var m=_NXLIVE.moteur();
if(!m)return [];
var c=m.connections;
if(!c)return [];
if(typeof c.forEach==="function"&&typeof c.length!=="number"){
var out=[];c.forEach(function(x){out.push(x);});return out;}
if(typeof c.length==="number")return Array.prototype.slice.call(c);
return [];}catch(_){return [];}};

// Les statistiques arrivent parfois en promesse, parfois d un coup. On accepte
// les deux et on range le resultat quand il vient.
_NXLIVE.demandeStats=function(){try{
var L=_NXLIVE.connexions();
if(!L.length)return false;
var c=L[0];
var v=_NXLIVE.essaie(c,["getStats","getEncryptionStats","getDebugInfo"]);
if(v===undefined)return false;
if(v&&typeof v.then==="function"){
v.then(function(x){try{_NXLIVE.stats=x||null;_NXLIVE.mesureDebit(_NXLIVE.stats);_NXLIVE.notify();}catch(_){}},function(){});
return true;}
_NXLIVE.stats=v;_NXLIVE.mesureDebit(v);return true;}catch(_){return false;}};

// Parcourt un objet inconnu a la recherche d une clef, sans s y perdre.
_NXLIVE.cherche=function(obj,clefs,profMax){try{
var vus=[],file=[{o:obj,p:0}],a,b;
while(file.length){
var t=file.shift();
if(!t.o||typeof t.o!=="object"||t.p>(profMax||3))continue;
for(a=0;a<vus.length;a++)if(vus[a]===t.o)break;
if(a<vus.length)continue;
vus.push(t.o);
if(vus.length>220)break;
for(var k in t.o){
try{
var v=t.o[k];
for(b=0;b<clefs.length;b++)
if(k.toLowerCase()===clefs[b]&&(typeof v==="string"||typeof v==="number"))return v;
if(v&&typeof v==="object")file.push({o:v,p:t.p+1});}catch(_){}}}
return undefined;}catch(_){return undefined;}};

_NXLIVE.enAppel=function(){try{
var R2=_NXLIVE.rtc();
var cid=_NXLIVE.essaie(R2,["getChannelId"]);
return !!cid;}catch(_){return false;}};

// La somme d une clef numerique partout ou elle apparait : les octets et les
// paquets sont ranges flux par flux, on veut le total.
_NXLIVE.somme=function(obj,clefs,profMax){try{
var vus=[],file=[{o:obj,p:0}],tot=0,trouve=false,a,b;
while(file.length){
var t=file.shift();
if(!t.o||typeof t.o!=="object"||t.p>(profMax||5))continue;
for(a=0;a<vus.length;a++)if(vus[a]===t.o)break;
if(a<vus.length)continue;
vus.push(t.o);
if(vus.length>400)break;
for(var k in t.o){try{
var v=t.o[k];
for(b=0;b<clefs.length;b++)if(k.toLowerCase()===clefs[b]&&typeof v==="number"&&isFinite(v)){tot+=v;trouve=true;}
if(v&&typeof v==="object")file.push({o:v,p:t.p+1});}catch(_){}}}
return trouve?tot:null;}catch(_){return null;}};

// La reception, personne par personne : un conteneur dont les clefs sont les
// identifiants des gens du salon. Discord range ainsi ses flux entrants.
_NXLIVE.parPersonne=function(S,ids){try{
if(!S||!ids||!ids.length)return {};
var vus=[],file=[{o:S,p:0}],a;
while(file.length){
var t=file.shift();
if(!t.o||typeof t.o!=="object"||t.p>4)continue;
for(a=0;a<vus.length;a++)if(vus[a]===t.o)break;
if(a<vus.length)continue;
vus.push(t.o);
if(vus.length>300)break;
var n=0;for(a=0;a<ids.length;a++)if(Object.prototype.hasOwnProperty.call(t.o,ids[a]))n++;
if(n&&n>=Math.min(2,ids.length)){
var out={};
for(a=0;a<ids.length;a++){var x=t.o[ids[a]];if(!x)continue;
var perdus=_NXLIVE.somme(x,["packetslost","packetlost"],4);
var recus=_NXLIVE.somme(x,["packetsreceived","packetreceived"],4);
var gigue=_NXLIVE.cherche(x,["jitter","jitterbuffer"],4);
if(perdus!==null||recus!==null)out[ids[a]]={perdus:perdus,recus:recus,
perte:(perdus!==null&&recus)?Math.round(perdus*1000/Math.max(1,perdus+recus))/10:null,
gigue:(typeof gigue==="number")?gigue:null};}
return out;}
for(var k in t.o){try{var v=t.o[k];if(v&&typeof v==="object")file.push({o:v,p:t.p+1});}catch(_){}}}
return {};}catch(_){return {};}};

// Le debit reel, calcule entre deux releves des compteurs d octets. Un debit
// ne se lit pas : il se mesure.
_NXLIVE.debits={entrant:null,sortant:null};
_NXLIVE.histoDebit=[];
_NXLIVE._octets=null;
_NXLIVE.mesureDebit=function(S){try{
if(!S)return false;
var recu=_NXLIVE.somme(S,["bytesreceived"],5);
var envoye=_NXLIVE.somme(S,["bytessent"],5);
if(recu===null&&envoye===null)return false;
var now=Date.now(),p=_NXLIVE._octets;
_NXLIVE._octets={t:now,recu:recu,envoye:envoye};
if(!p||now-p.t<800||now-p.t>30000)return false;
var dt=(now-p.t)/1000;
var e=(recu!==null&&p.recu!==null&&recu>=p.recu)?Math.round((recu-p.recu)*8/dt/100)/10:null;
var s2=(envoye!==null&&p.envoye!==null&&envoye>=p.envoye)?Math.round((envoye-p.envoye)*8/dt/100)/10:null;
_NXLIVE.debits={entrant:e,sortant:s2};
_NXLIVE.histoDebit.push({t:now,e:e||0,s:s2||0});
if(_NXLIVE.histoDebit.length>60)_NXLIVE.histoDebit.shift();
return true;}catch(_){return false;}};

// Le nom d un peripherique, plutot que son identifiant.
_NXLIVE.nomPeripherique=function(liste,id){try{
if(!liste||!id)return null;
var x=liste[id];
if(x&&x.name)return String(x.name);
for(var k in liste){var y=liste[k];if(y&&(y.id===id)&&y.name)return String(y.name);}
return null;}catch(_){return null;}};

// Ce que Discord dit du salon lui-meme : son debit, sa region, sa limite.
_NXLIVE.salonInfo=function(cid,gid){try{
var CS=_NXLIVE.magasin("ChannelStore"),GS=_NXLIVE.magasin("GuildStore");
var c=cid?_NXLIVE.essaie(CS,["getChannel"],cid):null;
var g=gid?_NXLIVE.essaie(GS,["getGuild"],gid):null;
if(!c&&!g)return null;
return {nom:(c&&c.name)?String(c.name):null,
serveur:(g&&g.name)?String(g.name):null,
debit:(c&&typeof c.bitrate==="number")?c.bitrate:null,
region:c?(c.rtcRegion||c.rtc_region||null):null,
limite:(c&&typeof c.userLimit==="number")?c.userLimit:((c&&typeof c.user_limit==="number")?c.user_limit:null)};}catch(_){return null;}};

// Le chiffrement : de bout en bout si Discord l annonce (DAVE), sinon le mode
// de chiffrement du transport s il apparait dans les statistiques.
_NXLIVE.chiffrement=function(R2,S){try{
var sf=_NXLIVE.essaie(R2,["getSecureFramesState"]);
if(sf!==undefined&&sf!==null){
var etat=(typeof sf==="object")?(sf.state||sf.status||sf.version||sf.protocolVersion):sf;
var v=(typeof sf==="object")?(sf.version||sf.protocolVersion||null):null;
var actif=(typeof sf==="object")?!!(sf.enabled||sf.active||(v&&v>0)||/active|enabled|ready|established/i.test(String(etat||""))):!!sf;
return {bout:actif,texte:actif?("DAVE"+(v?(" v"+v):"")):String(etat||""),mode:null};}
var mode=S?_NXLIVE.cherche(S,["mode","encryptionmode","cipher"],4):null;
if(mode)return {bout:false,texte:String(mode),mode:String(mode)};
return null;}catch(_){return null;}};

// --- la connexion vocale, lue a la source --------------------------------------
// Discord ne donne qu un nom d hote. L adresse ou partent vraiment les paquets,
// c est le serveur vocal qui l annonce au client, dans le premier message de
// la connexion (op 2), avec le port UDP. On ecoute cette annonce sans rien
// modifier : un ecouteur de plus sur la socket, et c est tout.
//
// Resoudre le nom par un DNS public donnait une autre adresse que celle du
// serveur media, et pas toujours la meme : d ou les adresses qui changeaient.
//
// Le message suivant (op 4) porte aussi la cle de chiffrement de la session.
// On n en lit que le mode, les codecs et la version de DAVE ; la cle n est
// jamais recopiee nulle part.
_NXLIVE.voix={};
_NXLIVE.ipValide=function(x){try{
var s2=String(x||"");
var m=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(s2);
if(m){for(var a=1;a<5;a++)if(parseInt(m[a],10)>255)return false;return true;}
return s2.length<=45&&/^[0-9a-f:]+$/i.test(s2)&&s2.split(":").length>2;}catch(_){return false;}};
_NXLIVE.privee=function(x){try{
var s2=String(x||"");
return /^(10\.|127\.|0\.|169\.254\.|192\.168\.)/.test(s2)||/^172\.(1[6-9]|2\d|3[01])\./.test(s2)||/^(::1$|fe80:|fc|fd)/i.test(s2);}catch(_){return false;}};
_NXLIVE.portValide=function(p){return typeof p==="number"&&p>0&&p<65536&&Math.floor(p)===p;};
_NXLIVE.nomHote=function(h){try{return String(h||"").toLowerCase().replace(/:\d+$/,"").replace(/\.$/,"");}catch(_){return "";}};
_NXLIVE.VILLES={ams:"Amsterdam",arn:"Stockholm",atl:"Atlanta",bcn:"Barcelone",bog:"Bogota",bom:"Bombay",bru:"Bruxelles",
cdg:"Paris",cph:"Copenhague",den:"Denver",dfw:"Dallas",dub:"Dublin",dus:"Dusseldorf",dxb:"Dubai",eze:"Buenos Aires",ewr:"Newark",
fco:"Rome",fra:"Francfort",gru:"Sao Paulo",hel:"Helsinki",hkg:"Hong Kong",hnd:"Tokyo",iad:"Washington",icn:"Seoul",ist:"Istanbul",
jnb:"Johannesburg",lax:"Los Angeles",lhr:"Londres",lim:"Lima",lis:"Lisbonne",mad:"Madrid",mia:"Miami",mrs:"Marseille",
mxp:"Milan",nrt:"Tokyo",ord:"Chicago",osl:"Oslo",phx:"Phoenix",prg:"Prague",scl:"Santiago",sea:"Seattle",sin:"Singapour",
sjc:"San Jose",syd:"Sydney",tlv:"Tel Aviv",vie:"Vienne",waw:"Varsovie",yyz:"Toronto",zrh:"Zurich"};
_NXLIVE.site=function(hote){try{
var m=/^c-([a-z]{3})(\d{1,3})-/.exec(_NXLIVE.nomHote(hote));
if(!m)return null;
return {code:(m[1]+m[2]).toUpperCase(),ville:_NXLIVE.VILLES[m[1]]||null};}catch(_){return null;}};
_NXLIVE.RXVOIX=/^wss?:\/\/([a-z0-9\-\.]+\.discord\.media)(?::(\d+))?(?:\/[^?#]*)?(?:\?([^#]*))?/i;
_NXLIVE.RXOP=/"op"\s*:\s*(\d+)\s*[,}]/;

_NXLIVE.lisVoix=function(e,j,sortant){try{
if(!e||!j||typeof j!=="object")return false;
var d=j.d;
if(!d||typeof d!=="object")return false;
if(!sortant&&j.op===2){
if(_NXLIVE.ipValide(d.ip))e.ip=String(d.ip);
if(_NXLIVE.portValide(d.port))e.port=d.port;
if(typeof d.ssrc==="number")e.ssrc=d.ssrc;
if(d.modes&&typeof d.modes.length==="number")
e.modes=Array.prototype.slice.call(d.modes,0,16).map(function(x){return String(x).substring(0,60);});}
else if(!sortant&&j.op===4){
if(typeof d.mode==="string")e.mode=d.mode.substring(0,60);
if(typeof d.audio_codec==="string")e.codecAudio=d.audio_codec.substring(0,24);
if(typeof d.video_codec==="string")e.codecVideo=d.video_codec.substring(0,24);
if(typeof d.dave_protocol_version==="number")e.dave=d.dave_protocol_version;}
else if(!sortant&&j.op===8){
if(typeof d.heartbeat_interval==="number")e.battement=Math.round(d.heartbeat_interval);}
else if(sortant&&j.op===1){
if(typeof d.protocol==="string")e.protocole=d.protocol.substring(0,16);
var p=d.data||{};
if(_NXLIVE.ipValide(p.address))e.monIp=String(p.address);
if(_NXLIVE.portValide(p.port))e.monPort=p.port;}
else return false;
e.maj=Date.now();
_NXLIVE.notify();
return true;}catch(_){return false;}};

_NXLIVE.ecouteVoix=function(ws,url){try{
var m=_NXLIVE.RXVOIX.exec(String(url||""));
if(!m||!ws||typeof ws.addEventListener!=="function")return false;
var ver=/(?:^|&)v=(\d+)/.exec(m[3]||"");
var e={hote:_NXLIVE.nomHote(m[1]),portSignal:m[2]?parseInt(m[2],10):443,
version:ver?parseInt(ver[1],10):null,ouvert:Date.now(),ferme:0,maj:0,
ip:null,port:null,ssrc:null,modes:[],mode:null,protocole:null,
codecAudio:null,codecVideo:null,dave:null,battement:null,monIp:null,monPort:null};
_NXLIVE.voix[e.hote]=e;
// Quatre connexions suffisent : l appel et quelques partages d ecran.
var cles=[],k;
for(k in _NXLIVE.voix)cles.push(k);
if(cles.length>4){
cles.sort(function(a,b){return _NXLIVE.voix[a].ouvert-_NXLIVE.voix[b].ouvert;});
delete _NXLIVE.voix[cles[0]];}
ws.addEventListener("message",function(ev){try{
var x=ev&&ev.data;
if(typeof x!=="string"||x.length>65536)return;
var o=_NXLIVE.RXOP.exec(x);
if(!o||(o[1]!=="2"&&o[1]!=="4"&&o[1]!=="8"))return;
_NXLIVE.lisVoix(e,JSON.parse(x),false);}catch(_){}});
ws.addEventListener("close",function(){try{e.ferme=Date.now();_NXLIVE.notify();}catch(_){}});
var envoi=ws.send;
if(typeof envoi==="function")ws.send=function(x){
try{if(typeof x==="string"&&x.length<65536){
var o=_NXLIVE.RXOP.exec(x);
if(o&&o[1]==="1")_NXLIVE.lisVoix(e,JSON.parse(x),true);}}catch(_){}
return envoi.apply(ws,arguments);};
return true;}catch(_){return false;}};

// Un Proxy plutot qu une fonction de remplacement : les gardes reseau posees
// avant verifient leurs marques sur window.WebSocket, et un Proxy les laisse
// passer telles quelles.
_NXLIVE.poseEcoute=function(){try{
if(_NXLIVE._pose)return true;
var W0=window.WebSocket;
if(typeof W0!=="function"||typeof Proxy!=="function"||typeof Reflect!=="object")return false;
window.WebSocket=new Proxy(W0,{construct:function(t,a,nt){
var ws=Reflect.construct(t,a,nt);
try{if(a&&a.length&&/\.discord\.media/i.test(String(a[0])))_NXLIVE.ecouteVoix(ws,String(a[0]));}catch(_){}
return ws;}});
_NXLIVE._pose=true;
return true;}catch(_){return false;}};

// La connexion de l appel en cours : celle du serveur que Discord nomme. Sans
// nom, la plus recente encore ouverte. Jamais celle d un partage d ecran a la
// place de l appel.
_NXLIVE.voixCourante=function(hote){try{
var h=_NXLIVE.nomHote(hote),k,best=null;
if(h)return _NXLIVE.voix[h]||null;
for(k in _NXLIVE.voix){var e=_NXLIVE.voix[k];
if(e.ferme)continue;
if(!best||e.ouvert>best.ouvert)best=e;}
return best;}catch(_){return null;}};

_NXLIVE.fluxAnnexes=function(principal){try{
var out=[],k;
for(k in _NXLIVE.voix){var e=_NXLIVE.voix[k];
if(e===principal||e.ferme)continue;
out.push({hote:e.hote,ip:e.ip,port:e.port});}
return out;}catch(_){return [];}};

// Nexium lance en plein appel a rate l annonce. On cherche alors une clef
// `ip` publique dans l objet de connexion de Discord, et on dit d ou elle
// vient : ce n est pas la meme certitude.
_NXLIVE.lisConnexion=function(R2){try{
var c=_NXLIVE.essaie(R2,["getRTCConnection"]);
if(!c||typeof c!=="object")return null;
var vus=[],file=[{o:c,p:0}],a;
while(file.length){
var t=file.shift();
if(!t.o||typeof t.o!=="object"||t.p>3)continue;
for(a=0;a<vus.length;a++)if(vus[a]===t.o)break;
if(a<vus.length)continue;
vus.push(t.o);
if(vus.length>200)break;
var ip=null;
try{ip=t.o.ip;}catch(_){}
if(ip&&_NXLIVE.ipValide(ip)&&!_NXLIVE.privee(ip)){
var pt=null;try{pt=t.o.port;}catch(_){}
return {ip:String(ip),port:_NXLIVE.portValide(pt)?pt:null};}
for(var k in t.o){try{var v=t.o[k];if(v&&typeof v==="object"&&!v.nodeType)file.push({o:v,p:t.p+1});}catch(_){}}}
return null;}catch(_){return null;}};

// L instantane. Chaque champ vaut soit une valeur lue, soit null.
_NXLIVE.lit=function(){try{
var R2=_NXLIVE.rtc();
var cid=_NXLIVE.essaie(R2,["getChannelId"])||null;
var gid=_NXLIVE.essaie(R2,["getGuildId"])||null;
var hote=_NXLIVE.essaie(R2,["getHostname","getEndpoint"])||null;
var ping=_NXLIVE.essaie(R2,["getLastPing","getPing"]);
var moy=_NXLIVE.essaie(R2,["getAveragePing"]);
var qual=_NXLIVE.essaie(R2,["getQuality"]);
var etat=_NXLIVE.essaie(R2,["getState","getConnectionState"]);
var region=_NXLIVE.essaie(R2,["getRegion"]);
var perteS=_NXLIVE.essaie(R2,["getOutboundLossRate"]);

if(!hote&&_NXLIVE.stats)hote=_NXLIVE.cherche(_NXLIVE.stats,["hostname","endpoint"],3)||null;
if(!region&&_NXLIVE.stats)region=_NXLIVE.cherche(_NXLIVE.stats,["region"],3)||null;

var X=cid?_NXLIVE.voixCourante(hote):null;
if(!hote&&X)hote=X.hote;
var cx=(cid&&!(X&&X.ip))?_NXLIVE.lisConnexion(R2):null;
var ipServ=(X&&X.ip)?X.ip:(cx?cx.ip:null);
var portServ=(X&&X.ip)?X.port:(cx?cx.port:null);

var S=_NXLIVE.stats;
var codec=S?(_NXLIVE.cherche(S,["codec","audiocodec"],3)||null):null;
if(!codec&&X&&X.codecAudio)codec=X.codecAudio;
var debit=S?(_NXLIVE.cherche(S,["bitrate","audiobitrate","targetbitrate"],3)||null):null;
var perte=S?(_NXLIVE.cherche(S,["packetloss","packetslost","loss"],3)||null):null;
var gigue=S?(_NXLIVE.cherche(S,["jitter"],3)||null):null;
var adresse=S?(_NXLIVE.cherche(S,["address","remoteaddress","ip","remoteip"],3)||null):null;

var gens=[];
try{
var VS=_NXLIVE.magasin("VoiceStateStore");
var etats=cid?_NXLIVE.essaie(VS,["getVoiceStatesForChannel"],cid):null;
if(etats)for(var k in etats){try{
var e=etats[k];
if(!e)continue;
gens.push({id:String(e.userId||k),
mute:!!(e.selfMute||e.mute),sourd:!!(e.selfDeaf||e.deaf),
video:!!e.selfVideo,flux:!!e.selfStream});}catch(_){}}}catch(_){}
var ids=[],a;
for(a=0;a<gens.length;a++)ids.push(gens[a].id);
var pq={recus:S?_NXLIVE.somme(S,["packetsreceived"],5):null,
envoyes:S?_NXLIVE.somme(S,["packetssent"],5):null,
perdus:S?_NXLIVE.somme(S,["packetslost"],5):null};
var pers=(cid&&S)?_NXLIVE.parPersonne(S,ids):{};
// Deux valeurs que Discord ne range pas toujours telles quelles, mais qui se
// deduisent de compteurs lus : on les calcule, on ne les invente pas.
if(perte===null&&pq.perdus!==null&&pq.recus!==null&&(pq.recus+pq.perdus)>0)
perte=Math.round(pq.perdus*1000/(pq.recus+pq.perdus))/10;
if(gigue===null){var tg=0,ng=0,kg;
for(kg in pers)if(pers[kg]&&typeof pers[kg].gigue==="number"){tg+=pers[kg].gigue;ng++;}
if(ng)gigue=Math.round(tg*10/ng)/10;}

var mo=_NXLIVE.moteur();
var audio=null;
try{
var ME=_NXLIVE.magasin("MediaEngineStore");
if(ME){
var ent=_NXLIVE.essaie(ME,["getInputDeviceId"])||null;
var sor=_NXLIVE.essaie(ME,["getOutputDeviceId"])||null;
var modeS=_NXLIVE.essaie(ME,["getMode"]);
var opts=_NXLIVE.essaie(ME,["getModeOptions"]);
audio={entree:ent,sortie:sor,
nomEntree:_NXLIVE.nomPeripherique(_NXLIVE.essaie(ME,["getInputDevices"]),ent),
nomSortie:_NXLIVE.nomPeripherique(_NXLIVE.essaie(ME,["getOutputDevices"]),sor),
modeTexte:modeS==="PUSH_TO_TALK"?"Appuyer pour parler":(modeS==="VOICE_ACTIVITY"?"Detection de la voix":(modeS?String(modeS):null)),
seuil:(opts&&typeof opts.threshold==="number")?opts.threshold:null,
seuilAuto:!!(opts&&opts.autoThreshold),
volEntree:_NXLIVE.essaie(ME,["getInputVolume"]),
volSortie:_NXLIVE.essaie(ME,["getOutputVolume"]),
muet:!!_NXLIVE.essaie(ME,["isSelfMute","isMute"]),
sourd:!!_NXLIVE.essaie(ME,["isSelfDeaf","isDeaf"]),
antibruit:_NXLIVE.essaie(ME,["getNoiseSuppression"]),
krisp:_NXLIVE.essaie(ME,["getNoiseCancellation"]),
krispDispo:_NXLIVE.essaie(ME,["isNoiseCancellationSupported","isNoiseCancellationEnabled"]),
echo:_NXLIVE.essaie(ME,["getEchoCancellation"]),
gain:_NXLIVE.essaie(ME,["getAutomaticGainControl"])};}}catch(_){}

// Le chiffrement : la version de DAVE annoncee par le serveur fait foi ; a
// defaut, ce que le magasin de connexion en dit.
var ch=null;
if(X&&typeof X.dave==="number")
ch={bout:X.dave>0,texte:X.dave>0?("DAVE v"+X.dave):"non negocie",mode:X.mode||null};
else{ch=cid?_NXLIVE.chiffrement(R2,S):null;
if(X&&X.mode){if(!ch)ch={bout:false,texte:X.mode,mode:X.mode};else if(!ch.mode)ch.mode=X.mode;}}

return {dispo:!!R2,
enAppel:!!cid,
salon:cid,guilde:gid,
hote:hote||null,
adresse:adresse!==undefined?adresse:null,
ip:_NXLIVE.ip||null,
serveurIp:ipServ||null,
serveurPort:portServ||null,
sourceIp:(X&&X.ip)?"serveur":(cx?"connexion":null),
connexion:X?{portSignal:X.portSignal,version:X.version,battement:X.battement,protocole:X.protocole,
mode:X.mode,modes:X.modes,ssrc:X.ssrc,dave:X.dave,codecAudio:X.codecAudio,codecVideo:X.codecVideo,ferme:X.ferme}:null,
toi:(X&&X.monIp)?{ip:X.monIp,port:X.monPort}:null,
flux:cid?_NXLIVE.fluxAnnexes(X):[],
ping:(typeof ping==="number")?ping:null,
pingMoyen:(typeof moy==="number")?moy:null,
qualite:(qual===undefined)?null:qual,
etat:(etat===undefined)?null:etat,
region:region||null,
site:_NXLIVE.site(hote),
codec:codec,debit:debit,perte:perte,gigue:gigue,
perteSortante:(typeof perteS==="number"&&isFinite(perteS))?perteS:null,
paquets:pq,
debits:cid?_NXLIVE.debits:{entrant:null,sortant:null},
personnes:pers,
salonInfo:cid?_NXLIVE.salonInfo(cid,gid):null,
chiffrement:ch,
gens:gens,moteur:!!mo,audio:audio,
statsLues:!!S};}catch(_){return {dispo:false,enAppel:false,gens:[],paquets:{},debits:{},personnes:{}};}};

// --- l adresse du serveur ---------------------------------------------------
// Discord donne un nom d hote, pas une adresse. La resoudre demande d aller
// interroger un resolveur public : ca se fait sur demande, jamais tout seul,
// parce que ca apprend a ce resolveur dans quelle region tu parles.
_NXLIVE.DOH="https://cloudflare-dns.com/dns-query?type=A&name=";

// Nettoyer un nom douteux en retirant les caracteres genants le transforme en
// un autre nom, qu on interrogerait quand meme. On exige donc la forme d un
// nom d hote, et on refuse le reste sans rien envoyer.
_NXLIVE.hoteValide=function(h){try{
var x=String(h||"");
if(!x||x.length>253)return false;
return /^[a-z0-9]([a-z0-9\-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9\-]{0,61}[a-z0-9])?)+$/.test(x);}catch(_){return false;}};

_NXLIVE.resoutIP=function(hote){try{
var h=String(hote||"").trim().toLowerCase();
if(!h){_NXLIVE.ipErreur="Aucun nom de serveur a resoudre.";_NXLIVE.notify();return Promise.resolve("");}
if(!_NXLIVE.hoteValide(h)){
_NXLIVE.ipErreur="Ce nom de serveur n a pas une forme valide : rien n a ete envoye.";
_NXLIVE.notify();return Promise.resolve("");}
_NXLIVE.ipErreur="";_NXLIVE.ipHote=h;_NXLIVE.notify();
return _NXNETX.go(_NXLIVE.DOH+encodeURIComponent(h),
{method:"GET",headers:{"accept":"application/dns-json"}},9000)
.then(function(r){return r.json();})
.then(function(j){
var A=(j&&j.Answer)||[],a;
for(a=0;a<A.length;a++)
if(A[a]&&A[a].type===1&&/^\d+\.\d+\.\d+\.\d+$/.test(String(A[a].data||""))){
_NXLIVE.ip=String(A[a].data);_NXLIVE.notify();return _NXLIVE.ip;}
_NXLIVE.ipErreur="Le resolveur n a rendu aucune adresse pour ce serveur.";
_NXLIVE.notify();return "";},
function(){_NXLIVE.ipErreur="Le resolveur n a pas repondu.";_NXLIVE.notify();return "";});
}catch(_){_NXLIVE.ipErreur="Resolution impossible sur ce client.";return Promise.resolve("");}};

_NXLIVE.oublieDebit=function(){try{
_NXLIVE.debits={entrant:null,sortant:null};_NXLIVE.histoDebit=[];_NXLIVE._octets=null;return true;}catch(_){return false;}};
_NXLIVE.oublieIP=function(){try{
_NXLIVE.ip="";_NXLIVE.ipHote="";_NXLIVE.ipErreur="";_NXLIVE.notify();return true;}catch(_){return false;}};

// --- la latence dans le temps ----------------------------------------------
// Un ping affiche seul ne dit pas s il vient de monter. La courbe, si.
_NXLIVE.moyennePing=function(){try{
var L=_NXLIVE.pings,a,t=0;
if(!L.length)return null;
for(a=0;a<L.length;a++)t+=L[a].v;
return Math.round(t/L.length);}catch(_){return null;}};

_NXLIVE.bornesPing=function(){try{
var L=_NXLIVE.pings,a,mn=null,mx=null;
for(a=0;a<L.length;a++){
if(mn===null||L[a].v<mn)mn=L[a].v;
if(mx===null||L[a].v>mx)mx=L[a].v;}
return {min:mn,max:mx};}catch(_){return {min:null,max:null};}};

// --- les serveurs par ou on est passe ---------------------------------------
_NXLIVE.noteServeur=function(v){try{
if(!v||!v.hote)return false;
var S=_NXLIVE.cfg.serveurs||(_NXLIVE.cfg.serveurs={});
var e=S[v.hote];
if(!e){e={vus:0,somme:0,n:0,region:"",dernier:0,ordre:0};S[v.hote]=e;}
e.vus=(e.vus||0)+1;
// L horloge ne suffit pas a dire lequel est le plus recent : deux
// serveurs touches dans la meme milliseconde seraient a egalite.
_NXLIVE._ordre=(_NXLIVE._ordre||0)+1;
e.ordre=_NXLIVE._ordre;
if(typeof v.ping==="number"){e.somme=(e.somme||0)+v.ping;e.n=(e.n||0)+1;}
if(v.region)e.region=String(v.region).substring(0,40);
if(v.serveurIp&&v.sourceIp)e.ip=String(v.serveurIp).substring(0,45);
e.dernier=Date.now();
// On n ecrit pas a chaque battement : trente secondes suffisent, et le
// stockage n est pas fait pour etre martele.
if(!_NXLIVE._ecritA||(Date.now()-_NXLIVE._ecritA)>30000){
_NXLIVE._ecritA=Date.now();
_NXLIVE.elague();
_NXLIVE.save();}
return true;}catch(_){return false;}};

// Vingt serveurs suffisent : au-dela, on jette les plus anciens.
_NXLIVE.elague=function(){try{
var S=_NXLIVE.cfg.serveurs||{},k,L=[];
for(k in S)L.push([k,S[k].ordre||0,S[k].dernier||0]);
if(L.length<=20)return false;
L.sort(function(a,b){return (b[2]-a[2])||(b[1]-a[1]);});
var neuf={},a;
for(a=0;a<20;a++)neuf[L[a][0]]=S[L[a][0]];
_NXLIVE.cfg.serveurs=neuf;
return true;}catch(_){return false;}};

_NXLIVE.serveurs=function(){try{
var S=_NXLIVE.cfg.serveurs||{},k,L=[];
for(k in S){var e=S[k];
L.push({hote:k,vus:e.vus||0,region:e.region||"",ip:e.ip||"",dernier:e.dernier||0,
ordre:e.ordre||0,ping:(e.n?Math.round(e.somme/e.n):null)});}
L.sort(function(a,b){return ((b.dernier||0)-(a.dernier||0))||((b.ordre||0)-(a.ordre||0));});
return L;}catch(_){return [];}};

_NXLIVE.oublieServeurs=function(){try{
_NXLIVE.cfg.serveurs={};_NXLIVE.save();_NXLIVE.notify();return true;}catch(_){return false;}};

// --- qui parle, et combien ---------------------------------------------------
_NXLIVE.parlent=function(ids){try{
var SP=_NXLIVE.magasin("SpeakingStore");
if(!SP)return [];
var out=[],a;
for(a=0;a<(ids||[]).length;a++){
var v=_NXLIVE.essaie(SP,["isSpeaking","getSpeakingFlags"],ids[a]);
if(v)out.push(ids[a]);}
return out;}catch(_){return [];}};

_NXLIVE.noteParole=function(v,secondes){try{
if(!v||!v.gens||!v.gens.length)return false;
var ids=[],a;
for(a=0;a<v.gens.length;a++)ids.push(v.gens[a].id);
var P=_NXLIVE.parlent(ids);
for(a=0;a<P.length;a++)
_NXLIVE.parole[P[a]]=(_NXLIVE.parole[P[a]]||0)+(secondes||3);
return true;}catch(_){return false;}};

_NXLIVE.classement=function(){try{
var k,L=[];
for(k in _NXLIVE.parole)L.push({id:k,secondes:Math.round(_NXLIVE.parole[k])});
L.sort(function(a,b){return b.secondes-a.secondes;});
return L;}catch(_){return [];}};

_NXLIVE.dureeSession=function(){try{
if(!_NXLIVE.session.debut)return 0;
return Math.round((Date.now()-_NXLIVE.session.debut)/1000);}catch(_){return 0;}};

_NXLIVE.mmss=function(sec){try{
var s2=Math.max(0,Math.round(sec||0));
var h=Math.floor(s2/3600),m=Math.floor((s2%3600)/60),r=s2%60;
if(h)return h+" h "+(m<10?"0":"")+m;
return m+" min "+(r<10?"0":"")+r;}catch(_){return "";}};

// --- l alerte qualite -------------------------------------------------------
// Elle ne se declenche pas au premier soubresaut : un pic isole n est pas une
// degradation, et une alerte qui crie pour rien finit ignoree.
_NXLIVE.surveille=function(v){try{
if(!_NXLIVE.cfg.alertes||!v)return false;
var mauvais="";
var m=_NXLIVE.moyennePing();
if(typeof m==="number"&&m>_NXLIVE.cfg.seuilPing&&_NXLIVE.pings.length>=4)
mauvais="ta latence tient "+m+" ms depuis un moment";
var p=parseFloat(v.perte);
if(!mauvais&&isFinite(p)&&p>_NXLIVE.cfg.seuilPerte)
mauvais="Discord perd "+p+" % des paquets";
if(!mauvais){_NXLIVE._mauvaisDepuis=0;return false;}
if(!_NXLIVE._mauvaisDepuis)_NXLIVE._mauvaisDepuis=Date.now();
if((Date.now()-_NXLIVE._mauvaisDepuis)<20000)return false;
if(_NXLIVE._criA&&(Date.now()-_NXLIVE._criA)<120000)return false;
_NXLIVE._criA=Date.now();
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Vocal : ")+_NXtr(mauvais)+".",2);}catch(_){}
return true;}catch(_){return false;}};

// --- le rapport -------------------------------------------------------------
// De quoi coller dans un message quand on demande de l aide, sans avoir a
// retaper ce que la page affiche.
_NXLIVE.rapport=function(){try{
var v=_NXLIVE.lit();
var b=_NXLIVE.bornesPing();
var c=v.connexion||{};
var db=v.debits||{};
var pq=v.paquets||{};
var L=["Nexium Vocal - etat de l appel"];
var dit=function(k,x){L.push("  "+k+" : "+((x===null||x===undefined||x==="")?"introuvable":x));};
dit("serveur vocal",v.hote);
dit("adresse du serveur media",v.serveurIp?(v.serveurIp+(v.serveurPort?":"+v.serveurPort:"")+
(v.sourceIp==="serveur"?" (annoncee par le serveur)":" (lue dans la connexion)")):
(_NXLIVE.ip?(_NXLIVE.ip+" (resolue par DNS, peut differer)"):null));
dit("region",v.region);
dit("site",v.site?(v.site.code+(v.site.ville?" ("+v.site.ville+")":"")):null);
dit("transport",c.protocole?String(c.protocole).toUpperCase():null);
dit("chiffrement du transport",c.mode);
dit("bout en bout",v.chiffrement?v.chiffrement.texte:null);
dit("codec",v.codec);
dit("latence",(typeof v.ping==="number")?(v.ping+" ms"):null);
dit("latence moyenne",(_NXLIVE.moyennePing()!==null)?(_NXLIVE.moyennePing()+" ms"):null);
dit("latence min/max",(b.min===null)?null:(b.min+" / "+b.max+" ms"));
dit("debit mesure",(db.entrant!==null&&db.entrant!==undefined)||(db.sortant!==null&&db.sortant!==undefined)?
((db.entrant===null?"?":db.entrant)+" kb/s entrant, "+(db.sortant===null?"?":db.sortant)+" kb/s sortant"):null);
dit("paquets perdus",(pq.perdus!==null&&pq.perdus!==undefined)?pq.perdus:v.perte);
dit("gigue",v.gigue);
dit("participants",v.gens.length);
dit("duree de l appel",_NXLIVE.session.debut?_NXLIVE.mmss(_NXLIVE.dureeSession()):null);
L.push("  ton adresse publique n est jamais incluse dans ce rapport");
L.push("  releve par Nexium, rien n est invente : un champ introuvable l est vraiment");
return L.join("\n");}catch(_){return "Nexium Vocal - rapport indisponible";}};

// --- le battement -----------------------------------------------------------
// Separe de la veille : il ne touche pas au reseau et doit continuer meme
// quand la fenetre est en arriere-plan, sinon la duree de l appel et le temps
// de parole seraient faux des qu on change de fenetre.
_NXLIVE.PAS=3;
_NXLIVE.tic=function(){try{
if(!_NXLIVE.enAppel()){
if(_NXLIVE.session.debut)_NXLIVE.cloture();
return;}
var v=_NXLIVE.lit();
if(!_NXLIVE.session.debut){
_NXLIVE.session={debut:Date.now(),hote:v.hote||"",salon:v.salon||""};
_NXLIVE.parole={};_NXLIVE.pings=[];_NXLIVE._mauvaisDepuis=0;}
if(typeof v.ping==="number"){
_NXLIVE.pings.push({t:Date.now(),v:v.ping});
if(_NXLIVE.pings.length>_NXLIVE.MAXPINGS)_NXLIVE.pings.shift();}
_NXLIVE.noteServeur(v);
_NXLIVE.noteParole(v,_NXLIVE.PAS);
_NXLIVE.surveille(v);
_NXLIVE.notify();}catch(_){}};

_NXLIVE.cloture=function(){try{
_NXLIVE.derniere={debut:_NXLIVE.session.debut,fin:Date.now(),
hote:_NXLIVE.session.hote,
duree:_NXLIVE.dureeSession(),
pingMoyen:_NXLIVE.moyennePing(),
classement:_NXLIVE.classement()};
_NXLIVE.session={debut:0,hote:"",salon:""};
_NXLIVE.parole={};_NXLIVE.pings=[];
_NXLIVE.oublieDebit();
_NXLIVE.save();_NXLIVE.notify();
return true;}catch(_){return false;}};

// --- la veille --------------------------------------------------------------
_NXLIVE.veille=function(){try{
if(typeof document!=="undefined"&&document.hidden)return;
if(!_NXLIVE.enAppel()){
if(_NXLIVE.stats){_NXLIVE.stats=null;_NXLIVE.notify();}
if(_NXLIVE.ip)_NXLIVE.oublieIP();
_NXLIVE.oublieDebit();
return;}
_NXLIVE.demandeStats();
_NXLIVE.notify();}catch(_){}};

_NXLIVE.etat=function(){try{
var v=_NXLIVE.lit();
return {dispo:v.dispo,enAppel:v.enAppel,hote:v.hote,ping:v.ping,
pingMoyen:_NXLIVE.moyennePing(),
duree:_NXLIVE.dureeSession(),
serveursConnus:_NXLIVE.serveurs().length,
participants:v.gens.length,statsLues:v.statsLues};}catch(_){return {dispo:false};}};

try{_NXLIVE.load();
_NXLIVE.poseEcoute();
setInterval(_NXLIVE.tic,_NXLIVE.PAS*1000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXLIVE");if(window._NXERR)_NXERR.push("module _NXLIVE :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXLIVE desactive:",_nxE);}catch(_){}}
}
