if(!_NXP.boot){try{
_NXP.boot=true;
_NXP.KEY="nexium_privacy_v1";_NXP.SKEY="nexium_privacy_stats_v1";
_NXP.cfg=(function(){var d;try{var raw=_NXDB.get(_NXP.KEY);d=raw?JSON.parse(raw):null;}catch(e){d=null;}if(!d||typeof d!=="object")d={};if(typeof d.blockTel!=="boolean")d.blockTel=false;if(typeof d.blockSentry!=="boolean")d.blockSentry=false;if(typeof d.silentTyping!=="boolean")d.silentTyping=false;if(typeof d.noAck!=="boolean")d.noAck=false;if(typeof d.blockHarvest!=="boolean")d.blockHarvest=false;if(typeof d.stripTracking!=="boolean")d.stripTracking=false;if(typeof d.blockAnalytics!=="boolean")d.blockAnalytics=false;if(typeof d.blockErrors!=="boolean")d.blockErrors=false;if(typeof d.blockPromotions!=="boolean")d.blockPromotions=false;if(typeof d.noExperiments!=="boolean")d.noExperiments=false;if(typeof d.noDetectables!=="boolean")d.noDetectables=false;if(typeof d.noContacts!=="boolean")d.noContacts=false;if(typeof d.noAffinities!=="boolean")d.noAffinities=false;if(typeof d.noPresenceIdle!=="boolean")d.noPresenceIdle=false;if(typeof d.stripHeaders!=="boolean")d.stripHeaders=false;if(typeof d.stripFilenames!=="boolean")d.stripFilenames=false;if(typeof d.spoofHardware!=="boolean")d.spoofHardware=false;if(typeof d.blockStun!=="boolean")d.blockStun=false;if(typeof d.cleanClipboard!=="boolean")d.cleanClipboard=false;if(typeof d.purgeOnQuit!=="boolean")d.purgeOnQuit=false;if(typeof d.noGuildEvents!=="boolean")d.noGuildEvents=false;if(typeof d.noRecommendations!=="boolean")d.noRecommendations=false;if(typeof d.noVoiceProbe!=="boolean")d.noVoiceProbe=false;
if(typeof d.noCanvas!=="boolean")d.noCanvas=false;
if(typeof d.noWebGL!=="boolean")d.noWebGL=false;
if(typeof d.noAudioFp!=="boolean")d.noAudioFp=false;
if(typeof d.noScreen!=="boolean")d.noScreen=false;
if(typeof d.noPlugins!=="boolean")d.noPlugins=false;
if(typeof d.noBattery!=="boolean")d.noBattery=false;
if(typeof d.noUAData!=="boolean")d.noUAData=false;
if(typeof d.noWebRtcIp!=="boolean")d.noWebRtcIp=false;
if(typeof d.stripExif!=="boolean")d.stripExif=false;
if(typeof d.cleanSentLinks!=="boolean")d.cleanSentLinks=false;if(typeof d.noActivityShare!=="boolean")d.noActivityShare=false;if(typeof d.quietOn!=="boolean")d.quietOn=false;if(typeof d.quietDebut!=="number")d.quietDebut=22;if(typeof d.quietFin!=="number")d.quietFin=8;if(!d.quiet||typeof d.quiet!=="object")d.quiet={};return d;})();
_NXP.saveCfg=function(){_NXDB.set(_NXP.KEY,JSON.stringify(_NXP.cfg));};
_NXP.stats=(function(){var d;try{var raw=_NXDB.get(_NXP.SKEY);d=raw?JSON.parse(raw):null;}catch(e){d=null;}if(!d||typeof d!=="object")d={};if(typeof d.seen!=="number")d.seen=0;if(typeof d.blocked!=="number")d.blocked=0;if(typeof d.science!=="number")d.science=0;if(typeof d.track!=="number")d.track=0;if(typeof d.sentry!=="number")d.sentry=0;if(typeof d.harvest!=="number")d.harvest=0;if(typeof d.flux!=="number")d.flux=0;if(!d.hours||typeof d.hours!=="object")d.hours={};if(typeof d.first!=="number")d.first=Date.now();return d;})();
_NXP.saveStatsNow=function(){try{if(_NXP.sst){clearTimeout(_NXP.sst);_NXP.sst=null;}_NXDB.set(_NXP.SKEY,JSON.stringify(_NXP.stats));}catch(_){}};
_NXP.saveStats=function(){if(_NXP.sst)return;_NXP.sst=setTimeout(function(){_NXP.sst=null;_NXPERF.repos(function(){try{_NXDB.set(_NXP.SKEY,JSON.stringify(_NXP.stats));}catch(_){}});},3000);};
_NXP.resetStats=function(){_NXDB.del(_NXP.SKEY);_NXP.stats={seen:0,blocked:0,science:0,track:0,sentry:0,flux:0,hours:{},first:Date.now()};_NXP.seen=0;_NXP.nBlocked=0;_NXP.log=[];_NXP.blocked=[];_NXP.rev=(_NXP.rev||0)+1;_NXP.saveStatsNow();};
_NXP.seen=0;_NXP.nBlocked=0;_NXP.log=[];_NXP.listeners=[];
_NXP.pad=function(n){return n<10?"0"+n:""+n;};
_NXP.hourKey=function(){var d=new Date();return d.getFullYear()+"-"+_NXP.pad(d.getMonth()+1)+"-"+_NXP.pad(d.getDate())+"-"+_NXP.pad(d.getHours());};
_NXP.notify=function(){for(var a=0;a<_NXP.listeners.length;a++){try{_NXP.listeners[a]();}catch(_){}}};
_NXP.tnotify=function(){if(_NXP.nt)return;_NXP.nt=setTimeout(function(){_NXP.nt=null;_NXP.notify();},900);};
_NXP.pruneHours=function(){try{var ks=Object.keys(_NXP.stats.hours);if(ks.length>72){ks.sort();for(var a=0;a<ks.length-48;a++)delete _NXP.stats.hours[ks[a]];}}catch(_){}};
_NXP.RXSENTRY=/^(?:https?:)?\/\/(?:[a-z0-9-]+\.)*sentry\.io(?:[\/?#]|$)/i;
_NXP.RXKIND=/\/(harvest|analytics|errors|error-reporting|crash|quests|outbound-promotions|promotions|science|metrics|track|envelope|experiments|detectable|contacts|friend-suggestions|affinities|scheduled-events|onboarding-responses|country-code|discoverable-guilds|guild-recommendations|member-verification|regions)\b/;
_NXP.MAPKIND={harvest:"harvest",analytics:"analytics",errors:"errors","error-reporting":"errors",crash:"errors","discoverable-guilds":"recommendations","guild-recommendations":"recommendations","member-verification":"recommendations",regions:"voiceprobe",quests:"promotions","outbound-promotions":"promotions",promotions:"promotions","country-code":"promotions",science:"science",metrics:"science",track:"track",envelope:"sentry",experiments:"experiments",detectable:"detectables",contacts:"contacts","friend-suggestions":"contacts",affinities:"affinities","scheduled-events":"guildevents","onboarding-responses":"guildevents"};
_NXP.memoKind=null;_NXP.memoN=0;
_NXP.classify=function(u){try{
var v=String(u);
if(_NXP.RXSENTRY.test(v))return "sentry";
var m=_NXP.RXKIND.exec(v);
if(!m)return null;
return _NXP.MAPKIND[m[1]]||null;}catch(_){return null;}};
_NXP.typingCh=function(u){var m=u.match(/\/channels\/(\d+)\/typing\b/);return m?m[1]:null;};
_NXP.ackCh=function(u){var m=u.match(/\/channels\/(\d+)\/messages\/\d+\/ack\b/);return m?m[1]:null;};
_NXP.currentGuild=function(){try{var SG=_NXcommon().store("SelectedGuildStore");var gid=SG&&SG.getGuildId&&SG.getGuildId();return gid||null;}catch(_){return null;}};
_NXP.blocked=[];
_NXP.logBlocked=function(kind,url){try{
var h="";try{h=new URL(url).host;}catch(_){h=String(url||"").slice(0,60);}
_NXP.blocked.unshift({k:kind,h:h,t:Date.now()});
if(_NXP.blocked.length>40)_NXP.blocked=_NXP.blocked.slice(0,40);}catch(_){}};
_NXP.mark=function(kind,blk){_NXP.rev=(_NXP.rev||0)+1;_NXP.seen++;_NXP.stats.seen++;_NXP.stats[kind]=(_NXP.stats[kind]||0)+1;var hk=_NXP.hourKey();var hb=_NXP.stats.hours[hk]||(_NXP.stats.hours[hk]={seen:0,blocked:0});hb.seen++;if(blk){_NXP.nBlocked++;_NXP.stats.blocked++;hb.blocked++;}_NXP.log.unshift({t:Date.now(),kind:kind,blk:blk});if(_NXP.log.length>50)_NXP.log.pop();_NXP.pruneHours();_NXP.saveStats();_NXP.tnotify();};
// Les groupes de Privacy suivent le meme principe : la telemetrie de base
// reste ouverte, le reste demande un abonnement.
_NXP.RANGS={
blockTel:0,blockSentry:0,blockHarvest:0,blockAnalytics:0,blockErrors:0,blockPromotions:0,
silentTyping:1,noAck:1,noPresenceIdle:1,noAffinities:1,noContacts:1,noGuildEvents:1,
noActivityShare:1,
noCanvas:2,noWebGL:2,noAudioFp:2,noScreen:2,noPlugins:2,noBattery:2,noUAData:2,
noWebRtcIp:2,stripHeaders:2,spoofHardware:2,blockStun:2,noDetectables:2,
noExperiments:2,noRecommendations:2,noVoiceProbe:2,
stripExif:3,cleanSentLinks:3,stripTracking:3,stripFilenames:3,cleanClipboard:3,purgeOnQuit:3};
_NXP.rangDe=function(k){try{
var r=_NXP.RANGS[k];
return (typeof r==="number")?r:0;}catch(_){return 0;}};
_NXP.permis=function(k){try{
var r=_NXP.rangDe(k);
if(r<=0)return true;
if(!window._NXABO)return true;
return _NXABO.permis("pv",r);}catch(_){return true;}};
_NXP.reconcilie=function(){try{
if(!window._NXABO)return 0;
var n=0,k,touche=false;
for(k in _NXP.RANGS){
if(!_NXP.cfg[k])continue;
if(_NXP.permis(k))continue;
_NXP.cfg[k]=false;n++;touche=true;}
if(touche){_NXP.saveCfg();
// Les correctifs d empreinte sont poses sur les fonctions du navigateur :
// il ne suffit pas de changer le reglage, il faut les retirer.
try{_NXP.appliquerTout();}catch(_){}
try{_NXP.notify();}catch(_){}}
return n;}catch(_){return 0;}};
_NXP.shouldBlock=function(url){try{var u=String(url);var kind=_NXP.classify(u);if(kind){var _bm={sentry:"blockSentry",harvest:"blockHarvest",analytics:"blockAnalytics",errors:"blockErrors",promotions:"blockPromotions",science:"blockTel",track:"blockTel",metrics:"blockTel",experiments:"noExperiments",detectables:"noDetectables",contacts:"noContacts",affinities:"noAffinities",guildevents:"noGuildEvents",recommendations:"noRecommendations",voiceprobe:"noVoiceProbe"};var _ck=_bm[kind]||"blockTel";
// Le reglage ET le droit : c est la double condition qui rend un reglage
// force a la main sans effet.
var blk=!!_NXP.cfg[_ck]&&_NXP.permis(_ck);if(blk)_NXP.logBlocked(kind,u);_NXP.mark(kind,blk);return blk;}var tc=_NXP.typingCh(u);if(tc){var g=_NXguildOf(tc);if((_NXP.cfg.silentTyping&&_NXP.permis("silentTyping"))||(g&&_NXP.cfg.quiet[g])){_NXP.logBlocked("typing",u);_NXP.mark("typing",true);return true;}_NXP.mark("typing",false);return false;}var ac=_NXP.ackCh(u);if(ac){var g2=_NXguildOf(ac);if((_NXP.cfg.noAck&&_NXP.permis("noAck"))||(g2&&_NXP.cfg.quiet[g2])){_NXP.logBlocked("ack",u);_NXP.mark("ack",true);return true;}_NXP.mark("ack",false);return false;}}catch(_){}return false;};
_NXP.onFlux=function(a){try{if(window._NXPATCH&&!_NXPATCH.on)return false;if(a&&a.type==="IDLE"&&_NXP.cfg.noPresenceIdle){_NXP.mark("idle",true);_NXP.logBlocked("idle","signal d inactivite");return true;}
if(a&&_NXP.cfg.noActivityShare&&(a.type==="LOCAL_ACTIVITY_UPDATE"||a.type==="RUNNING_GAMES_CHANGE")){_NXP.mark("activity",true);_NXP.logBlocked("activity","partage de l activite en cours");return true;}if(!a||a.type!=="TRACK")return false;_NXP.stats.flux=(_NXP.stats.flux||0)+1;var blk=!!_NXP.cfg.blockTel;_NXP.mark("event",blk);return blk;}catch(_){return false;}};
_NXP.wireFlux=function(){try{if(_NXP.fxi)return;var C=_NXcommon();var FX=C.C.FluxDispatcher||(C.WP.findByProps&&C.WP.findByProps("subscribe","dispatch","_actionHandlers"));if(!FX||typeof FX.addInterceptor!=="function"){_NXP.ftr=(_NXP.ftr||0)+1;if(_NXP.ftr<25)_NXPERF.amorce(_NXP.wireFlux,1500);return;}FX.addInterceptor(_NXPERF.mesure("Privacy : evenements Discord",_NXP.onFlux));_NXP.fxi=true;}catch(_){}};
_NXP.TRACK_PARAMS=["utm_source","utm_medium","utm_campaign","utm_term","utm_content","utm_id","fbclid","gclid","dclid","gbraid","wbraid","msclkid","mc_eid","igshid","igsh","si","twclid","ttclid","yclid","_ga","ref_src","ref_url","spm"];
_NXP.cleanUrl=function(u){try{var url=new URL(u);var removed=0;for(var a=0;a<_NXP.TRACK_PARAMS.length;a++){if(url.searchParams.has(_NXP.TRACK_PARAMS[a])){url.searchParams.delete(_NXP.TRACK_PARAMS[a]);removed++;}}if(removed){_NXP.stats.stripped=(_NXP.stats.stripped||0)+removed;_NXP.saveStats();}return url.toString();}catch(_){return u;}};
_NXP.open=function(u){try{if(window._NXPR&&_NXPR.cfg&&_NXPR.cfg.scanLinks&&typeof u==="string"){var cl=_NXPR.scanUrl(u,true);if(_NXPR.threat(cl)&&((cl.kind==="grabber"&&_NXPR.cfg.blockGrabbers)||((cl.kind==="phish"||cl.kind==="punycode")&&_NXPR.cfg.phishGuard))){_NXPR.blockedPrompt(u,cl);return;}}}catch(_){}try{if(_NXP.cfg&&_NXP.cfg.stripTracking&&typeof u==="string")u=_NXP.cleanUrl(u);}catch(_){}try{if(typeof VencordNative!=="undefined"&&VencordNative.native&&typeof VencordNative.native.openExternal==="function"){VencordNative.native.openExternal(u);}else if(window.VencordNative&&window.VencordNative.native){window.VencordNative.native.openExternal(u);}}catch(_){}};
_NXP.HDRSTRIP=["x-debug-options","x-discord-timezone","x-track"];
_NXP.stripOut=function(opts){try{
if(!_NXP.cfg.stripHeaders||!opts||!opts.headers)return opts;
var h=opts.headers,n=0,out=null;
if(typeof Headers!=="undefined"&&h instanceof Headers){
for(var a=0;a<_NXP.HDRSTRIP.length;a++){if(h.has(_NXP.HDRSTRIP[a])){h.delete(_NXP.HDRSTRIP[a]);n++;}}
}else if(Array.isArray(h)){
out=[];for(var b=0;b<h.length;b++){var k0=String((h[b]&&h[b][0])||"").toLowerCase();
if(_NXP.HDRSTRIP.indexOf(k0)>=0){n++;continue;}out.push(h[b]);}
}else if(typeof h==="object"){
out={};for(var k in h){if(_NXP.HDRSTRIP.indexOf(String(k).toLowerCase())>=0){n++;continue;}out[k]=h[k];}}
if(!n)return opts;
_NXP.mark("headers",true);_NXP.logBlocked("headers",n+" en-tete(s) de suivi retire(s)");
if(out===null)return opts;
var o2={};for(var k2 in opts)o2[k2]=opts[k2];o2.headers=out;return o2;}catch(_){return opts;}};
_NXP.RXATT=/\/channels\/\d+\/attachments\b/;
_NXP.RXMSG=/\/channels\/\d+\/messages\b/;
_NXP.anonName=function(n,i){try{
var v=String(n||"");
var m=v.match(/\.([A-Za-z0-9]{1,6})$/);
var ext=m?("."+m[1].toLowerCase()):"";
return "fichier"+((i>0)?("_"+(i+1)):"")+ext;}catch(_){return "fichier";}};
_NXP.maskNames=function(url,opts){try{
if(!_NXP.cfg.stripFilenames||!opts||typeof opts.body!=="string")return opts;
var u=String(url||"");
var att=_NXP.RXATT.test(u),msg=_NXP.RXMSG.test(u);
if(!att&&!msg)return opts;
var j=null;try{j=JSON.parse(opts.body);}catch(_){return opts;}
if(!j||typeof j!=="object")return opts;
var L=j.files||j.attachments;
if(!Array.isArray(L)||!L.length)return opts;
var n=0;
for(var a=0;a<L.length;a++){var it=L[a];
if(!it||typeof it!=="object"||typeof it.filename!=="string")continue;
var nv=_NXP.anonName(it.filename,a);
if(nv!==it.filename){it.filename=nv;n++;}}
if(!n)return opts;
var body=null;try{body=JSON.stringify(j);}catch(_){return opts;}
_NXP.mark("filenames",true);_NXP.logBlocked("filenames",n+" nom(s) de fichier anonymise(s)");
var o2={};for(var k in opts)o2[k]=opts[k];o2.body=body;return o2;}catch(_){return opts;}};
_NXP.prepare=function(url,opts){try{
if(!opts||typeof opts!=="object")return opts;
var o=_NXP.stripOut(opts);
o=_NXP.maskNames(url,o);
o=_NXP.msgSansSuivi(url,o);
return o;}catch(_){return opts;}};
_NXP.HWCLES=["hardwareConcurrency","deviceMemory","maxTouchPoints"];
_NXP.HWVAL={hardwareConcurrency:8,deviceMemory:8,maxTouchPoints:0};
_NXP.applyHardware=function(){try{
if(!_NXP.cfg.spoofHardware)return _NXP.unapplyHardware();
if(_NXP._hw)return true;
if(!_NXP._hwAvant){_NXP._hwAvant={};
for(var z=0;z<_NXP.HWCLES.length;z++){var cz=_NXP.HWCLES[z];
try{_NXP._hwAvant[cz]={d:Object.getOwnPropertyDescriptor(navigator,cz)||null,v:navigator[cz]};}catch(_){_NXP._hwAvant[cz]=null;}}}
var n=0;
for(var a2=0;a2<_NXP.HWCLES.length;a2++){var k2=_NXP.HWCLES[a2];
try{Object.defineProperty(navigator,k2,{configurable:true,enumerable:true,get:(function(v){return function(){return v;};})(_NXP.HWVAL[k2])});n++;}catch(_){}}
if(!n)return false;
_NXP._hw=true;
_NXP.mark("hardware",true);
_NXP.logBlocked("hardware","caracteristiques materielles normalisees");return true;}catch(_){return false;}};
_NXP.unapplyHardware=function(){try{
if(!_NXP._hw)return false;
for(var a3=0;a3<_NXP.HWCLES.length;a3++){var k3=_NXP.HWCLES[a3];
var av=_NXP._hwAvant&&_NXP._hwAvant[k3];
try{if(av&&av.d)Object.defineProperty(navigator,k3,av.d);
else if(av)Object.defineProperty(navigator,k3,{configurable:true,enumerable:true,get:(function(v){return function(){return v;};})(av.v)});
else delete navigator[k3];}catch(_){}}
_NXP._hw=false;
_NXP.logBlocked("hardware","masque materiel retire");return true;}catch(_){return false;}};

// --- Graine de session : le bruit doit rester stable le temps d une session,
// sinon deux lectures successives se contredisent et trahissent la parade ; et
// changer d une session a l autre, sinon il devient lui-meme un identifiant.
_NXP.graine=(function(){try{var a=new Uint32Array(2);
if(window.crypto&&crypto.getRandomValues)crypto.getRandomValues(a);
else{a[0]=(Math.random()*4294967295)>>>0;a[1]=(Math.random()*4294967295)>>>0;}
return (a[0]^(a[1]<<1))>>>0;}catch(_){return 305419896;}})();
_NXP.bruit=function(i){var x=(_NXP.graine^(i*2654435761))>>>0;
x^=x<<13;x>>>=0;x^=x>>17;x^=x<<5;x>>>=0;return x;};

// --- 1. canvas : on ne touche qu a la LECTURE, jamais a l affichage ---------
_NXP.applyCanvas=function(){try{
if(!_NXP.cfg.noCanvas)return _NXP.unapplyCanvas();
if(_NXP._cv)return true;
var C=window.HTMLCanvasElement&&HTMLCanvasElement.prototype;
var X=window.CanvasRenderingContext2D&&CanvasRenderingContext2D.prototype;
if(!C||!X)return false;
// Sans ces trois fonctions d origine, le brouillage ne peut rien faire :
// mieux vaut refuser d activer que laisser croire a une protection.
if(typeof C.toDataURL!=="function"||typeof X.getImageData!=="function")return false;
_NXP._cvAv={toDataURL:C.toDataURL,toBlob:C.toBlob,getImageData:X.getImageData};
var salis=function(d){try{
var m=d.length,pas=Math.max(4,((m/1024)|0))*4,k=0;
for(var i=0;i<m;i+=pas){var b=_NXP.bruit(i);
d[i]=(d[i]+((b&1)?1:-1)+256)&255;k++;}
return k;}catch(_){return 0;}};
var lire=function(cv){try{
var g=cv.getContext&&cv.getContext("2d");
if(!g)return;
var im=_NXP._cvAv.getImageData.call(g,0,0,cv.width||1,cv.height||1);
if(im&&im.data&&salis(im.data)){g.putImageData(im,0,0);_NXP.mark("canvas",true);}}catch(_){}};
C.toDataURL=function(){lire(this);return _NXP._cvAv.toDataURL.apply(this,arguments);};
C.toBlob=function(){lire(this);return _NXP._cvAv.toBlob.apply(this,arguments);};
X.getImageData=function(){
var im=_NXP._cvAv.getImageData.apply(this,arguments);
try{if(im&&im.data&&salis(im.data))_NXP.mark("canvas",true);}catch(_){}
return im;};
_NXP._cv=true;
_NXP.logBlocked("canvas","lecture du canvas brouillee");return true;}catch(_){return false;}};
_NXP.unapplyCanvas=function(){try{
if(!_NXP._cv)return false;
HTMLCanvasElement.prototype.toDataURL=_NXP._cvAv.toDataURL;
HTMLCanvasElement.prototype.toBlob=_NXP._cvAv.toBlob;
CanvasRenderingContext2D.prototype.getImageData=_NXP._cvAv.getImageData;
_NXP._cv=false;_NXP.logBlocked("canvas","brouillage du canvas retire");return true;}catch(_){return false;}};

// --- 2. WebGL : le modele exact de la carte est un identifiant tres fin -----
_NXP.GLMASK={37445:"Intel Inc.",37446:"Intel Iris OpenGL Engine",7936:"WebKit",7937:"WebKit WebGL"};
_NXP.applyWebGL=function(){try{
if(!_NXP.cfg.noWebGL)return _NXP.unapplyWebGL();
if(_NXP._gl)return true;
var P=[];
if(window.WebGLRenderingContext)P.push(WebGLRenderingContext.prototype);
if(window.WebGL2RenderingContext)P.push(WebGL2RenderingContext.prototype);
if(!P.length)return false;
_NXP._glAv=[];
for(var a=0;a<P.length;a++){(function(pr){
var brut=pr.getParameter;
_NXP._glAv.push({p:pr,f:brut});
pr.getParameter=function(p){
try{if(_NXP.GLMASK[p]!==undefined){_NXP.mark("webgl",true);return _NXP.GLMASK[p];}}catch(_){}
return brut.call(this,p);};})(P[a]);}
_NXP._gl=true;
_NXP.logBlocked("webgl","modele de carte graphique masque");return true;}catch(_){return false;}};
_NXP.unapplyWebGL=function(){try{
if(!_NXP._gl)return false;
for(var a=0;a<_NXP._glAv.length;a++)_NXP._glAv[a].p.getParameter=_NXP._glAv[a].f;
_NXP._gl=false;_NXP.logBlocked("webgl","masque graphique retire");return true;}catch(_){return false;}};

// --- 3. audio : bruit tres en dessous du seuil d audition -------------------
_NXP.applyAudio=function(){try{
if(!_NXP.cfg.noAudioFp)return _NXP.unapplyAudio();
if(_NXP._au)return true;
var B=window.AudioBuffer&&AudioBuffer.prototype;
var A=window.AnalyserNode&&AnalyserNode.prototype;
if(!B&&!A)return false;
_NXP._auAv={};
if(B){var gb=B.getChannelData;_NXP._auAv.g=gb;
B.getChannelData=function(){
var d=gb.apply(this,arguments);
try{if(d&&d.length){var pas=Math.max(1,((d.length/512)|0));
for(var i=0;i<d.length;i+=pas)d[i]=d[i]+((_NXP.bruit(i)&1)?1e-7:-1e-7);
_NXP.mark("audiofp",true);}}catch(_){}
return d;};}
if(A){var ff=A.getFloatFrequencyData;_NXP._auAv.f=ff;
A.getFloatFrequencyData=function(d){
ff.apply(this,arguments);
try{if(d&&d.length){var pas=Math.max(1,((d.length/64)|0));
for(var i=0;i<d.length;i+=pas)d[i]=d[i]+((_NXP.bruit(i)&1)?1e-4:-1e-4);}}catch(_){}};}
_NXP._au=true;
_NXP.logBlocked("audiofp","empreinte audio brouillee");return true;}catch(_){return false;}};
_NXP.unapplyAudio=function(){try{
if(!_NXP._au)return false;
if(_NXP._auAv.g)AudioBuffer.prototype.getChannelData=_NXP._auAv.g;
if(_NXP._auAv.f)AnalyserNode.prototype.getFloatFrequencyData=_NXP._auAv.f;
_NXP._au=false;_NXP.logBlocked("audiofp","brouillage audio retire");return true;}catch(_){return false;}};

// --- 4. ecran ---------------------------------------------------------------
_NXP.SCRVAL={width:1920,height:1080,availWidth:1920,availHeight:1040,colorDepth:24,pixelDepth:24};
_NXP.applyEcran=function(){try{
if(!_NXP.cfg.noScreen)return _NXP.unapplyEcran();
if(_NXP._sc)return true;
if(!window.screen)return false;
_NXP._scAv={};var k,n2=0;
for(k in _NXP.SCRVAL){try{
_NXP._scAv[k]=Object.getOwnPropertyDescriptor(screen,k)||null;
Object.defineProperty(screen,k,{configurable:true,enumerable:true,
get:(function(v){return function(){return v;};})(_NXP.SCRVAL[k])});n2++;}catch(_){}}
if(!n2)return false;
_NXP._sc=true;_NXP.mark("screen",true);
_NXP.logBlocked("screen","dimensions d ecran normalisees");return true;}catch(_){return false;}};
_NXP.unapplyEcran=function(){try{
if(!_NXP._sc)return false;
for(var k in _NXP._scAv){try{
if(_NXP._scAv[k])Object.defineProperty(screen,k,_NXP._scAv[k]);
else delete screen[k];}catch(_){}}
_NXP._sc=false;_NXP.logBlocked("screen","dimensions d ecran rendues");return true;}catch(_){return false;}};

// --- 5. greffons ------------------------------------------------------------
_NXP.applyPlugins=function(){try{
if(!_NXP.cfg.noPlugins)return _NXP.unapplyPlugins();
if(_NXP._pl)return true;
var vide=[];
try{vide.item=function(){return null;};vide.namedItem=function(){return null;};vide.refresh=function(){};}catch(_){}
_NXP._plAv={p:Object.getOwnPropertyDescriptor(navigator,"plugins")||null,
m:Object.getOwnPropertyDescriptor(navigator,"mimeTypes")||null};
Object.defineProperty(navigator,"plugins",{configurable:true,enumerable:true,get:function(){return vide;}});
Object.defineProperty(navigator,"mimeTypes",{configurable:true,enumerable:true,get:function(){return vide;}});
_NXP._pl=true;_NXP.mark("plugins",true);
_NXP.logBlocked("plugins","liste des greffons videe");return true;}catch(_){return false;}};
_NXP.unapplyPlugins=function(){try{
if(!_NXP._pl)return false;
try{if(_NXP._plAv.p)Object.defineProperty(navigator,"plugins",_NXP._plAv.p);else delete navigator.plugins;}catch(_){}
try{if(_NXP._plAv.m)Object.defineProperty(navigator,"mimeTypes",_NXP._plAv.m);else delete navigator.mimeTypes;}catch(_){}
_NXP._pl=false;_NXP.logBlocked("plugins","liste des greffons rendue");return true;}catch(_){return false;}};

// --- 6. batterie ------------------------------------------------------------
_NXP.applyBattery=function(){try{
if(!_NXP.cfg.noBattery)return _NXP.unapplyBattery();
if(_NXP._bt)return true;
if(typeof navigator.getBattery!=="function")return false;
_NXP._btAv=navigator.getBattery;
navigator.getBattery=function(){try{_NXP.mark("battery",true);}catch(_){}
return Promise.resolve({charging:true,chargingTime:0,dischargingTime:Infinity,level:1,
addEventListener:function(){},removeEventListener:function(){},
onchargingchange:null,onlevelchange:null,onchargingtimechange:null,ondischargingtimechange:null});};
_NXP._bt=true;
_NXP.logBlocked("battery","etat de la batterie masque");return true;}catch(_){return false;}};
_NXP.unapplyBattery=function(){try{
if(!_NXP._bt)return false;
navigator.getBattery=_NXP._btAv;
_NXP._bt=false;_NXP.logBlocked("battery","etat de la batterie rendu");return true;}catch(_){return false;}};

// --- 7. indices de client (User-Agent Client Hints) -------------------------
_NXP.applyUAData=function(){try{
if(!_NXP.cfg.noUAData)return _NXP.unapplyUAData();
if(_NXP._ua)return true;
var U=navigator.userAgentData;
if(!U||typeof U.getHighEntropyValues!=="function")return false;
_NXP._uaAv=U.getHighEntropyValues;
U.getHighEntropyValues=function(h){try{_NXP.mark("uadata",true);}catch(_){}
var o={architecture:"x86",bitness:"64",model:"",platformVersion:"10.0.0",
uaFullVersion:"120.0.0.0",fullVersionList:[],wow64:false};
var r={brands:(U.brands||[]),mobile:false,platform:U.platform||"Windows"};
try{for(var a=0;a<(h||[]).length;a++)if(o[h[a]]!==undefined)r[h[a]]=o[h[a]];}catch(_){}
return Promise.resolve(r);};
_NXP._ua=true;
_NXP.logBlocked("uadata","indices de client normalises");return true;}catch(_){return false;}};
_NXP.unapplyUAData=function(){try{
if(!_NXP._ua)return false;
navigator.userAgentData.getHighEntropyValues=_NXP._uaAv;
_NXP._ua=false;_NXP.logBlocked("uadata","indices de client rendus");return true;}catch(_){return false;}};

_NXP.appliquerTout=function(){try{
var F=["applyHardware","applyCanvas","applyWebGL","applyAudio","applyEcran",
"applyPlugins","applyBattery","applyUAData","applyRtcIp"];
for(var a=0;a<F.length;a++){try{_NXP[F[a]]();}catch(_){}}
return true;}catch(_){return false;}};
_NXP.RXDISCICE=/discord(app)?\.(com|net|media|gg)/i;
_NXP.wireRtc=function(){try{
if(_NXP._rtc)return;_NXP._rtc=true;
var RP=window.RTCPeerConnection;
if(!RP||RP.__nxp)return;
var W=function(cfg,c2){
try{if(_NXP.cfg.blockStun&&cfg&&cfg.iceServers&&cfg.iceServers.length){
var keep=[],n=0;
for(var a=0;a<cfg.iceServers.length;a++){var it=cfg.iceServers[a];
var urls=it&&it.urls;
var list=(typeof urls==="string")?[urls]:(urls||[]);
var garde=false;
for(var b=0;b<list.length;b++){if(_NXP.RXDISCICE.test(String(list[b])))garde=true;}
if(garde)keep.push(it);else n++;}
if(n){var c={};for(var k in cfg)c[k]=cfg[k];c.iceServers=keep;cfg=c;
_NXP.mark("stun",true);_NXP.logBlocked("stun",n+" serveur(s) STUN etranger(s) ecarte(s)");}}}catch(_){}
return (arguments.length>1)?new RP(cfg,c2):new RP(cfg);};
W.prototype=RP.prototype;W.__nxp=true;
try{W.generateCertificate=RP.generateCertificate;}catch(_){}
window.RTCPeerConnection=W;
try{if(window.webkitRTCPeerConnection)window.webkitRTCPeerConnection=W;}catch(_){}
}catch(_){}};
_NXP.wireClip=function(){try{
if(_NXP._clip)return;_NXP._clip=true;
if(!navigator.clipboard||typeof navigator.clipboard.writeText!=="function")return;
var ow=navigator.clipboard.writeText.bind(navigator.clipboard);
var pw=function(t){try{
if(_NXP.cfg.cleanClipboard&&typeof t==="string"&&t.indexOf("http")>=0){
var n=0;
var t2=t.replace(/https?:\/\/[^\s<>"']+/g,function(u){try{var c=_NXP.cleanUrl(u);if(c!==u)n++;return c;}catch(_){return u;}});
if(n){_NXP.mark("clip",true);_NXP.logBlocked("clip",n+" lien(s) copie(s) nettoye(s)");t=t2;}}}catch(_){}
return ow(t);};pw.__nx=true;navigator.clipboard.writeText=pw;}catch(_){}};
_NXP.TRACES=["nexium_stats_v1","nexium_privacy_stats_v1","nexium_protect_v1_stats","nexium_gardes_v1_stats","nexium_errors","nexium_quarantine","nexium_reports"];

// --- 8. adresse IP locale dans les candidats WebRTC -------------------------
// Un candidat "typ host" porte l adresse de la machine sur le reseau local.
// Elle ne sert qu au trafic en LAN : la retirer laisse les candidats srflx et
// relay, par lesquels passe la voix vers Discord.
_NXP.RXPRIVE=/^(10\.|127\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|::1|fc|fd)/i;
_NXP.sdpNettoie=function(sdp){try{
if(typeof sdp!=="string"||sdp.indexOf("candidate")<0)return {s:sdp,n:0};
var L=sdp.split(/\r\n|\n/),out=[],k=0;
for(var a=0;a<L.length;a++){var l=L[a];
if(l.indexOf("typ host")>=0&&l.indexOf("candidate")>=0){
var m=l.match(/candidate:\S+ \d+ \S+ \d+ (\S+) /);
var ip=m?m[1]:"";
// Un nom en .local est deja anonymise par le navigateur : on le garde.
if(ip&&ip.indexOf(".local")<0&&_NXP.RXPRIVE.test(ip)){k++;continue;}}
out.push(l);}
if(!k)return {s:sdp,n:0};
return {s:out.join("\r\n"),n:k};}catch(_){return {s:sdp,n:0};}};
_NXP.applyRtcIp=function(){try{
if(!_NXP.cfg.noWebRtcIp)return _NXP.unapplyRtcIp();
if(_NXP._ri)return true;
var P=window.RTCPeerConnection&&RTCPeerConnection.prototype;
if(!P||typeof P.setLocalDescription!=="function")return false;
var sld=P.setLocalDescription;
_NXP._riAv=sld;
P.setLocalDescription=function(d){try{
if(d&&typeof d.sdp==="string"){var r=_NXP.sdpNettoie(d.sdp);
if(r.n){var c={type:d.type,sdp:r.s};
_NXP.mark("rtcip",true);
_NXP.logBlocked("rtcip",r.n+" candidat(s) portant l adresse locale retire(s)");
return sld.call(this,c);}}}catch(_){}
return sld.apply(this,arguments);};
_NXP._ri=true;
_NXP.logBlocked("rtcip","adresse locale retiree des candidats");return true;}catch(_){return false;}};
_NXP.unapplyRtcIp=function(){try{
if(!_NXP._ri)return false;
RTCPeerConnection.prototype.setLocalDescription=_NXP._riAv;
_NXP._ri=false;_NXP.logBlocked("rtcip","candidats rendus intacts");return true;}catch(_){return false;}};

// --- 9. metadonnees des images envoyees -------------------------------------
// Une photo prise au telephone porte la date, le modele d appareil et, tres
// souvent, les coordonnees GPS du lieu de prise de vue. On retire ces blocs
// sans retoucher un seul pixel : ni recompression, ni perte de qualite.
_NXP.RXIMG=/^image\/(jpeg|jpg|png)$/i;
_NXP.estPng=function(b){try{return new DataView(b).getUint32(0)===0x89504E47;}catch(_){return false;}};
_NXP.jpegSansMeta=function(b){try{
var v=new DataView(b),n2=b.byteLength;
if(v.getUint16(0)!==0xFFD8)return null;
var garde=[],i=2,ote=0;
while(i<n2-1){
if(v.getUint8(i)!==0xFF)break;
var m=v.getUint8(i+1);
if(m===0xD8||m===0x01||(m>=0xD0&&m<=0xD7)){i+=2;continue;}
if(m===0xDA)  {garde.push([i,n2]);break;}   // debut des donnees image
var len=v.getUint16(i+2);
// APP0 (JFIF) et APP2 (profil ICC) sont necessaires au rendu ; APP1 porte
// l EXIF et le XMP, APP13 l IPTC, les autres APPn ne servent a rien ici.
var appn=(m>=0xE0&&m<=0xEF);
if(appn&&m!==0xE0&&m!==0xE2){ote+=len+2;i+=2+len;continue;}
garde.push([i,i+2+len]);i+=2+len;}
if(!ote)return null;
var t=0;for(var a=0;a<garde.length;a++)t+=garde[a][1]-garde[a][0];
var out=new Uint8Array(2+t),src=new Uint8Array(b);
out[0]=0xFF;out[1]=0xD8;var p=2;
for(var c=0;c<garde.length;c++){out.set(src.subarray(garde[c][0],garde[c][1]),p);p+=garde[c][1]-garde[c][0];}
return {buf:out,ote:ote};}catch(_){return null;}};
_NXP.pngSansMeta=function(b){try{
var v=new DataView(b),src=new Uint8Array(b),n2=b.byteLength;
if(v.getUint32(0)!==0x89504E47)return null;
var garde=[[0,8]],i=8,ote=0;
var SALES={tEXt:1,zTXt:1,iTXt:1,eXIf:1,tIME:1};
while(i<n2-8){
var len=v.getUint32(i);
var typ=String.fromCharCode(src[i+4],src[i+5],src[i+6],src[i+7]);
var fin=i+12+len;
if(fin>n2)break;
if(SALES[typ]){ote+=len+12;i=fin;continue;}
garde.push([i,fin]);
if(typ==="IEND")break;
i=fin;}
if(!ote)return null;
var t=0;for(var a=0;a<garde.length;a++)t+=garde[a][1]-garde[a][0];
var out=new Uint8Array(t),p=0;
for(var c=0;c<garde.length;c++){out.set(src.subarray(garde[c][0],garde[c][1]),p);p+=garde[c][1]-garde[c][0];}
return {buf:out,ote:ote};}catch(_){return null;}};
_NXP.blobSansMeta=function(f){try{
if(!f||!_NXP.RXIMG.test(String(f.type||"")))return Promise.resolve(null);
if(typeof f.arrayBuffer!=="function")return Promise.resolve(null);
return f.arrayBuffer().then(function(b){try{
var r=_NXP.estPng(b)?_NXP.pngSansMeta(b):_NXP.jpegSansMeta(b);
if(!r)return null;
_NXP.mark("exif",true);
_NXP.logBlocked("exif",Math.round(r.ote/1024)+" ko de metadonnees retires d une image");
var nb=new Blob([r.buf],{type:f.type});
try{if(window.File&&f.name)return new File([nb],f.name,{type:f.type,lastModified:0});}catch(_){}
return nb;}catch(_){return null;}}).catch(function(){return null;});
}catch(_){return Promise.resolve(null);}};
_NXP.envoiSansMeta=function(opts){try{
if(!_NXP.cfg.stripExif||!opts||!opts.body)return null;
var B=opts.body;
// Envoi direct du fichier (PUT vers l hebergeur de pieces jointes).
if(window.Blob&&B instanceof Blob&&_NXP.RXIMG.test(String(B.type||""))){
return _NXP.blobSansMeta(B).then(function(nb){
if(!nb)return opts;
var o={};for(var k in opts)o[k]=opts[k];o.body=nb;return o;});}
// Envoi par formulaire (ancien chemin).
if(window.FormData&&B instanceof FormData){
var champs=[],tot=[];
try{B.forEach(function(v,k){champs.push([k,v]);});}catch(_){return null;}
var aTraiter=false;
for(var a=0;a<champs.length;a++){
var v2=champs[a][1];
if(window.Blob&&v2 instanceof Blob&&_NXP.RXIMG.test(String(v2.type||"")))aTraiter=true;}
if(!aTraiter)return null;
for(var c=0;c<champs.length;c++)(function(p){
var v3=p[1];
tot.push((window.Blob&&v3 instanceof Blob&&_NXP.RXIMG.test(String(v3.type||"")))
?_NXP.blobSansMeta(v3).then(function(nb){return [p[0],nb||v3];})
:Promise.resolve([p[0],v3]));})(champs[c]);
return Promise.all(tot).then(function(res){
var fd=new FormData();
for(var d=0;d<res.length;d++){
var val=res[d][1];
if(window.Blob&&val instanceof Blob&&val.name)fd.append(res[d][0],val,val.name);
else fd.append(res[d][0],val);}
var o2={};for(var k2 in opts)o2[k2]=opts[k2];o2.body=fd;return o2;});}
return null;}catch(_){return null;}};

// --- 10. liens que tu envoies -----------------------------------------------
// stripTracking nettoie ce que tu OUVRES ; ceci nettoie ce que tu PARTAGES,
// pour ne pas transmettre a autrui un lien qui te trace toi.
_NXP.RXURL=/https?:\/\/[^\s<>"']+/g;
_NXP.RXMSG=/\/channels\/\d+\/messages/;
_NXP.texteSansSuivi=function(t){try{
if(typeof t!=="string"||t.indexOf("http")<0)return {t:t,n:0};
var k=0;
var out=t.replace(_NXP.RXURL,function(u){
var c=_NXP.cleanUrl(u);
if(c!==u)k++;
return c;});
return {t:out,n:k};}catch(_){return {t:t,n:0};}};
_NXP.msgSansSuivi=function(url,opts){try{
if(!_NXP.cfg.cleanSentLinks||!opts||!opts.body)return opts;
if(!_NXP.RXMSG.test(String(url||"")))return opts;
// 123 = accolade ouvrante. On evite le litteral : nxcheck compte les
// accolades du bloc, et une accolade seule dans une chaine fausse le total.
if(typeof opts.body!=="string"||opts.body.charCodeAt(0)!==123)return opts;
var j=null;try{j=JSON.parse(opts.body);}catch(_){return opts;}
if(!j||typeof j.content!=="string"||!j.content)return opts;
var r=_NXP.texteSansSuivi(j.content);
if(!r.n)return opts;
j.content=r.t;
var o={};for(var k in opts)o[k]=opts[k];o.body=JSON.stringify(j);
_NXP.mark("sentlinks",true);
_NXP.logBlocked("sentlinks",r.n+" lien(s) nettoye(s) avant envoi");
return o;}catch(_){return opts;}};

_NXP.purgeApercu=function(){try{var n=0,o=0;
for(var a=0;a<_NXP.TRACES.length;a++){try{var v=_NXDB.get(_NXP.TRACES[a]);if(v!==null){n++;o+=String(v).length;}}catch(_){}}
return {n:n,octets:o,total:_NXP.TRACES.length};}catch(_){return {n:0,octets:0,total:0};}};
_NXP.purgeTraces=function(force){try{
if(!force&&!_NXP.cfg.purgeOnQuit)return 0;
var n=0;
for(var a=0;a<_NXP.TRACES.length;a++){try{if(_NXDB.get(_NXP.TRACES[a])!==null){_NXDB.del(_NXP.TRACES[a]);n++;}}catch(_){}}
return n;}catch(_){return 0;}};
_NXP.quietActif=function(){try{
if(!_NXP.cfg.quietOn)return false;
var h=new Date().getHours();
var d=_NXP.cfg.quietDebut,f=_NXP.cfg.quietFin;
if(d===f)return false;
if(d<f)return h>=d&&h<f;
return h>=d||h<f;}catch(_){return false;}};
_NXP.quietTick=function(){try{
var actif=_NXP.quietActif();
if(actif===_NXP._quietEtat)return;
_NXP._quietEtat=actif;
if(actif){
_NXP._avantQuiet={};
for(var k in _NXP.PROFILS.maximal)_NXP._avantQuiet[k]=_NXP.cfg[k];
_NXP.appliquerProfil("maximal");
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Heures discretes : confidentialite maximale jusqu a ")+_NXtr(_NXP.cfg.quietFin)+_NXtr(" h."),1);}catch(_){}}
else if(_NXP._avantQuiet){
for(var k2 in _NXP._avantQuiet)_NXP.cfg[k2]=_NXP._avantQuiet[k2];
_NXP._avantQuiet=null;
_NXP.saveCfg();_NXP.notify();
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Heures discretes terminees : tes reglages habituels sont revenus."),1);}catch(_){}}
}catch(_){}};
_NXP.bilan=function(jours){
try{
var n=jours||7,out={total:0,parJour:[],familles:{}};
var maintenant=new Date();
for(var a=n-1;a>=0;a--){
var d=new Date(maintenant.getTime()-a*86400000);
var somme=0;
for(var h=0;h<24;h++){
var k=d.getFullYear()+"-"+_NXP.pad(d.getMonth()+1)+"-"+_NXP.pad(d.getDate())+"-"+_NXP.pad(h);
var e=(_NXP.stats.hours||{})[k];
if(e)somme+=(e.blocked||0);}
out.parJour.push({j:d.getDay(),n:somme});
out.total+=somme;}
for(var f in _NXP.KINDS){var v=_NXP.stats[f]||0;if(v>0)out.familles[f]=v;}
return out;}catch(_){return {total:0,parJour:[],familles:{}};}};
_NXP.KINDS={activity:"Partage d activite",recommendations:"Recommandations de serveurs",voiceprobe:"Sondage des regions vocales",science:"Telemetrie",track:"Suivi d evenements",metrics:"Mesures",sentry:"Rapports de plantage",harvest:"Moisson de donnees",analytics:"Analytique",errors:"Erreurs",promotions:"Promotions et quetes",event:"Evenement interne",experiments:"Experiences A/B",detectables:"Detection de jeux",contacts:"Synchronisation de contacts",affinities:"Affinites sociales",guildevents:"Evenements de serveur",typing:"Indicateur de frappe",ack:"Accuse de lecture",idle:"Signal d inactivite",headers:"En-tetes de suivi",filenames:"Noms de fichiers",stun:"Serveurs STUN etrangers",clip:"Liens copies",hardware:"Empreinte materielle",canvas:"Empreinte du canvas",webgl:"Modele de carte graphique",audiofp:"Empreinte audio",screen:"Dimensions de l ecran",plugins:"Liste des greffons",battery:"Etat de la batterie",uadata:"Indices de client",rtcip:"Adresse IP locale",exif:"Metadonnees des images",sentlinks:"Liens envoyes"};
_NXP.kindFr=function(k){return _NXP.KINDS[k]||k;};
_NXP.PROFILS={
discret:{cleanSentLinks:true,noAudioFp:false,noBattery:false,noCanvas:false,noPlugins:false,noScreen:false,noUAData:false,noWebGL:false,noWebRtcIp:false,stripExif:true,noRecommendations:false,noVoiceProbe:false,noActivityShare:false,blockTel:true,blockSentry:true,blockHarvest:true,blockAnalytics:true,blockErrors:true,blockPromotions:false,stripTracking:true,silentTyping:false,noAck:false,noExperiments:false,noDetectables:false,noContacts:false,noAffinities:false,noPresenceIdle:false,stripHeaders:true,stripFilenames:false,spoofHardware:false,blockStun:true,cleanClipboard:true,purgeOnQuit:false,noGuildEvents:false},
renforce:{cleanSentLinks:true,noAudioFp:true,noBattery:true,noCanvas:true,noPlugins:true,noScreen:false,noUAData:true,noWebGL:true,noWebRtcIp:false,stripExif:true,noRecommendations:true,noVoiceProbe:false,noActivityShare:false,blockTel:true,blockSentry:true,blockHarvest:true,blockAnalytics:true,blockErrors:true,blockPromotions:true,stripTracking:true,silentTyping:true,noAck:false,noExperiments:false,noDetectables:true,noContacts:true,noAffinities:true,noPresenceIdle:true,stripHeaders:true,stripFilenames:true,spoofHardware:true,blockStun:true,cleanClipboard:true,purgeOnQuit:false,noGuildEvents:false},
maximal:{cleanSentLinks:true,noAudioFp:true,noBattery:true,noCanvas:true,noPlugins:true,noScreen:true,noUAData:true,noWebGL:true,noWebRtcIp:true,stripExif:true,noRecommendations:true,noVoiceProbe:true,noActivityShare:true,blockTel:true,blockSentry:true,blockHarvest:true,blockAnalytics:true,blockErrors:true,blockPromotions:true,stripTracking:true,silentTyping:true,noAck:true,noExperiments:true,noDetectables:true,noContacts:true,noAffinities:true,noPresenceIdle:true,stripHeaders:true,stripFilenames:true,spoofHardware:true,blockStun:true,cleanClipboard:true,purgeOnQuit:true,noGuildEvents:true}};
_NXP.appliquerProfil=function(nom){try{
var p=_NXP.PROFILS[nom];if(!p)return;
for(var k in p)_NXP.cfg[k]=p[k];
_NXP.cfg.profil=nom;
_NXP.saveCfg();_NXP.appliquerTout();_NXP.notify();}catch(_){}};
_NXP.profilActuel=function(){try{
var noms=["maximal","renforce","discret"];
for(var a=0;a<noms.length;a++){var p=_NXP.PROFILS[noms[a]],ok=true;
for(var k in p){if(!!_NXP.cfg[k]!==!!p[k]){ok=false;break;}}
if(ok)return noms[a];}
return "perso";}catch(_){return "perso";}};
_NXP.score=function(){try{
var K=["blockTel","blockSentry","blockHarvest","blockAnalytics","blockErrors","blockPromotions","stripTracking","silentTyping","noAck","noExperiments","noDetectables","noContacts","noAffinities","noPresenceIdle","stripHeaders","stripFilenames","spoofHardware","blockStun","cleanClipboard","purgeOnQuit","noGuildEvents","noRecommendations","noVoiceProbe","noActivityShare","noCanvas","noWebGL","noAudioFp","noScreen","noPlugins","noBattery","noUAData","noWebRtcIp","stripExif","cleanSentLinks"];
var n=0;for(var a=0;a<K.length;a++)if(_NXP.cfg[K[a]])n++;
return {actifs:n,total:K.length,pct:Math.round(n/K.length*100)};}catch(_){return {actifs:0,total:21,pct:0};}};
_NXP.wireFlux();
try{window.addEventListener("beforeunload",_NXP.saveStatsNow);}catch(_){}
try{_NXP.appliquerTout();_NXP.wireRtc();_NXP.wireClip();}catch(_){}
try{_NXP.quietTick();setInterval(function(){try{_NXP.quietTick();}catch(_){}},60000);}catch(_){}
try{window.addEventListener("beforeunload",function(){try{_NXP.purgeTraces();}catch(_){}});}catch(_){}
try{window.addEventListener("pagehide",function(){try{_NXP.purgeTraces();}catch(_){}});}catch(_){}
try{document.addEventListener("visibilitychange",function(){try{if(document.hidden)_NXP.purgeTraces();}catch(_){}});}catch(_){}
try{document.addEventListener("visibilitychange",function(){if(document.hidden)_NXP.saveStatsNow();});}catch(_){}
_NXP.GARDES=["fetch","beacon","xhr","ws","rtc","clip"];
_NXP.repose=0;_NXP.tombees=[];
_NXP.vide=function(){try{return new Response(null,{status:204,statusText:"Blocked by Nexium"});}
catch(_){try{return new Response("",{status:200,statusText:"Blocked by Nexium",headers:{"x-nexium":"bloque"}});}catch(__){return null;}}};
_NXP.poseFetch=function(){try{
if(!window.fetch||window.fetch.__nx)return !!(window.fetch&&window.fetch.__nx);
var _of=window.fetch.bind(window);
var pf=function(input,opts){try{
if(_NXP._dans)return _of(input,opts);
var url=typeof input==="string"?input:(input&&input.url)?input.url:"";
if(url){_NXP._dans=true;
try{if(window._NXV&&_NXV.checkOut(url,opts||(input&&typeof input==="object"?input:null),"requete")){_NXP._dans=false;return Promise.resolve(new Response("",{status:403,statusText:"Blocked by Nexium"}));}
if(_NXP.shouldBlock(url)){_NXP._dans=false;return Promise.resolve(_NXP.vide());}
opts=_NXP.prepare(url,opts);}finally{_NXP._dans=false;}}}catch(_){_NXP._dans=false;}
try{var lab=(url&&window._NXV&&_NXV.grave)?_NXV.grave((opts&&opts.method)||(input&&typeof input==="object"&&input.method)||"GET",url,opts&&opts.body):null;
if(lab)return _NXV.retiens(lab).then(function(go){if(!go)throw new TypeError(_NXtr("Action annulee par Nexium"));return _of(input,opts);});}catch(_){}
try{var att=_NXP.envoiSansMeta(opts);
if(att)return att.then(function(o){return _of(input,o||opts);},function(){return _of(input,opts);});}catch(_){}
return _of(input,opts);};
pf.__nx=true;window.fetch=pf;return true;}catch(_){return false;}};
_NXP.poseBeacon=function(){try{
if(!navigator.sendBeacon||navigator.sendBeacon.__nx)return !!(navigator.sendBeacon&&navigator.sendBeacon.__nx);
var _ob=navigator.sendBeacon.bind(navigator);
var pb=function(url,data){try{if(url&&window._NXV&&_NXV.checkOut(url,{body:data},"balise"))return true;if(url&&_NXP.shouldBlock(url))return true;}catch(_){}return _ob(url,data);};
pb.__nx=true;navigator.sendBeacon=pb;return true;}catch(_){return false;}};
_NXP.poseXhr=function(){try{
if(!window.XMLHttpRequest||window.XMLHttpRequest.prototype.__nx)return !!(window.XMLHttpRequest&&window.XMLHttpRequest.prototype.__nx);
var X=window.XMLHttpRequest.prototype;
var _open=X.open,_send=X.send,_srh=X.setRequestHeader;
X.open=function(m,u){try{this.__nxurl=u;this.__nxh={};this.__nxm=String(m||"GET").toUpperCase();this.__nxretenu=false;}catch(_){}return _open.apply(this,arguments);};
X.setRequestHeader=function(k,v){try{if(this.__nxh)this.__nxh[k]=v;}catch(_){}return _srh.apply(this,arguments);};
X.send=function(b){try{if(this.__nxurl&&window._NXV&&_NXV.checkOut(this.__nxurl,{body:b,headers:this.__nxh},"XHR"))return;if(this.__nxurl&&_NXP.shouldBlock(this.__nxurl))return;}catch(_){}
try{if(this.__nxurl&&!this.__nxretenu&&window._NXV&&_NXV.grave){var lab=_NXV.grave(this.__nxm,this.__nxurl,b);
if(lab){var x=this,args=arguments;x.__nxretenu=true;
_NXV.retiens(lab).then(function(go){if(go){try{_send.apply(x,args);}catch(_){}}else _NXV.annuleXhr(x);});return;}}}catch(_){}
return _send.apply(this,arguments);};
X.__nx=true;return true;}catch(_){return false;}};
_NXP.poseWs=function(){try{
var W0=window.WebSocket;
if(!W0||W0.__nx)return !!(W0&&W0.__nx);
var W=function(url,proto){
try{var u=String(url||"");
if(u&&!_NXP.RXDISCICE.test(u)&&_NXP.classify(u)&&_NXP.shouldBlock(u)){_NXP.logBlocked("ws",u);throw new Error("Blocked by Nexium");}}catch(e){if(e&&e.message==="Blocked by Nexium")throw e;}
return (arguments.length>1)?new W0(url,proto):new W0(url);};
try{W.prototype=W0.prototype;}catch(_){}
try{W.CONNECTING=0;W.OPEN=1;W.CLOSING=2;W.CLOSED=3;}catch(_){}
W.__nx=true;window.WebSocket=W;return true;}catch(_){return false;}};
_NXP.poseReseau=function(){try{
var etat={fetch:_NXP.poseFetch(),beacon:_NXP.poseBeacon(),xhr:_NXP.poseXhr(),ws:_NXP.poseWs()};
try{_NXP.wireRtc();etat.rtc=!!(window.RTCPeerConnection&&window.RTCPeerConnection.__nxp);}catch(_){etat.rtc=false;}
try{_NXP.wireClip();etat.clip=!!(navigator.clipboard&&navigator.clipboard.writeText&&navigator.clipboard.writeText.__nx);}catch(_){etat.clip=false;}
_NXP.etatGardes=etat;return etat;}catch(_){return {};}};
_NXP.gardesTombees=function(){try{
var t=[];
if(window.fetch&&!window.fetch.__nx)t.push("fetch");
if(navigator.sendBeacon&&!navigator.sendBeacon.__nx)t.push("beacon");
if(window.XMLHttpRequest&&!window.XMLHttpRequest.prototype.__nx)t.push("xhr");
if(window.WebSocket&&!window.WebSocket.__nx)t.push("ws");
if(window.RTCPeerConnection&&!window.RTCPeerConnection.__nxp)t.push("rtc");
return t;}catch(_){return [];}};
_NXP.sentinelle=function(){try{
var t=_NXP.gardesTombees();
if(!t.length)return 0;
_NXP._rtc=false;_NXP._clip=false;
_NXP.poseReseau();
var reste=_NXP.gardesTombees();
var repris=t.length-reste.length;
if(repris>0){
_NXP.repose+=repris;
_NXP.tombees.unshift({t:Date.now(),q:t.join(", ")});
if(_NXP.tombees.length>20)_NXP.tombees.pop();
try{if(window._NXERR){_NXERR.push("sentinelle :: garde(s) remise(s) en place : "+t.join(", "));if(window._NXsaveErr)_NXsaveErr();}}catch(_){}
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Une protection reseau de Nexium avait ete ecrasee (")+_NXtr(t.join(", "))+_NXtr("). Elle vient d etre remise en place."),2);}catch(_){}
_NXP.tnotify();}
return repris;}catch(_){return 0;}};
try{_NXP.poseReseau();}catch(_){}
try{setInterval(function(){try{if(!document.hidden)_NXP.sentinelle();}catch(_){}},45000);}catch(_){}
try{document.addEventListener("visibilitychange",function(){try{if(!document.hidden)_NXP.sentinelle();}catch(_){}});}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXP");if(window._NXERR)_NXERR.push("module _NXP :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXP desactive:",_nxE);}catch(_){}}
}var _NXNET=window._NXNET||(window._NXNET={});
