var _NXPERF=window._NXPERF||(window._NXPERF={});
_NXPERF.repos=_NXPERF.repos||function(fn){try{
if(typeof requestIdleCallback==="function"){requestIdleCallback(fn,{timeout:4000});return;}
setTimeout(fn,120);}catch(_){try{fn();}catch(__){}}};
_NXPERF.file=_NXPERF.file||[];
_NXPERF.tourne=false;
_NXPERF.vide=function(){try{
if(_NXPERF.tourne||!_NXPERF.file.length)return;
_NXPERF.tourne=true;
_NXPERF.repos(function(){
_NXPERF.tourne=false;
var f=_NXPERF.file.shift();
if(f){try{f();}catch(_){}}
if(_NXPERF.file.length)_NXPERF.vide();});}catch(_){_NXPERF.tourne=false;}};
_NXPERF.amorce=function(fn,delai){try{
if(typeof fn!=="function")return;
setTimeout(function(){_NXPERF.file.push(fn);_NXPERF.vide();},delai||0);
}catch(_){try{setTimeout(fn,delai||0);}catch(__){}}};
_NXPERF.stats=_NXPERF.stats||Object.create(null);
_NXPERF.t0=_NXPERF.t0||Date.now();
_NXPERF.longues=_NXPERF.longues||[];
_NXPERF.cadres=_NXPERF.cadres||[];
_NXPERF.horloge=function(){try{if(window.performance&&performance.now)return performance.now();}catch(_){}return Date.now();};
_NXPERF.mesure=function(nom,fn){
if(typeof fn!=="function"||fn.__nxm)return fn;
var w=function(){var t=_NXPERF.horloge();
try{return fn.apply(this,arguments);}
finally{try{var d=_NXPERF.horloge()-t;
var e=_NXPERF.stats[nom]||(_NXPERF.stats[nom]={n:0,ms:0,max:0});
e.n++;e.ms+=d;if(d>e.max)e.max=d;}catch(_){}}};
w.__nxm=true;w.__nxo=fn;
return w;};
_NXPERF.garde=function(L,x,max){L.push(x);if(L.length>max)L.splice(0,L.length-max);};
_NXPERF.observe=function(){try{
if(_NXPERF._obs)return true;
if(typeof PerformanceObserver!=="function")return false;
var types=PerformanceObserver.supportedEntryTypes||[];
if(types.indexOf("longtask")>=0){
new PerformanceObserver(function(l){try{var E=l.getEntries();
for(var a=0;a<E.length;a++)_NXPERF.garde(_NXPERF.longues,{t:Date.now(),d:E[a].duration},400);}catch(_){}})
.observe({type:"longtask",buffered:true});
_NXPERF._obs="longtask";}
if(types.indexOf("long-animation-frame")>=0){
new PerformanceObserver(function(l){try{var E=l.getEntries();
for(var a=0;a<E.length;a++){var e=E[a],S=[],sc=e.scripts||[];
for(var b=0;b<sc.length&&b<6;b++){var x=sc[b];
S.push({d:x.duration||0,src:String(x.sourceURL||""),fn:String(x.sourceFunctionName||""),inv:String(x.invoker||"")});}
_NXPERF.garde(_NXPERF.cadres,{t:Date.now(),d:e.duration||0,b:e.blockingDuration||0,s:S},200);}}catch(_){}})
.observe({type:"long-animation-frame",buffered:true});
_NXPERF._obs="loaf";}
return !!_NXPERF._obs;}catch(_){return false;}};
_NXPERF.nomScript=function(x){try{
var u=x.src||"",f=x.fn||"",v=x.inv||"";
if(/(^|[.\s])_NX/.test(f)||/_NX[A-Z]/.test(v))return "Nexium";
if(/WebpackModule/i.test(u))return "Module Discord modifie par un plugin";
if(/discord(app)?\.com\/assets|discord\.com\/assets/i.test(u))return "Discord";
if(/renderer|equicord|vencord|nanocord|nexium/i.test(u))return "Client (Equicord et Nexium)";
if(!u)return v?String(v).slice(0,48):"Origine non communiquee";
return u.split("?")[0].split("/").pop().slice(0,48)||"Origine non communiquee";}catch(_){return "Origine non communiquee";}};
_NXPERF.releve=function(){try{
var now=Date.now(),dur=Math.max(1,now-_NXPERF.t0),mods=[],tot=0,k,a,b;
for(k in _NXPERF.stats){var e=_NXPERF.stats[k];tot+=e.ms;mods.push({nom:k,n:e.n,ms:e.ms,max:e.max});}
mods.sort(function(x,y){return y.ms-x.ms;});
var L=_NXPERF.longues,lm=0,lp=0,l5=0;
for(a=0;a<L.length;a++){lm+=L[a].d;if(L[a].d>lp)lp=L[a].d;if(now-L[a].t<300000)l5++;}
var src=Object.create(null),C=_NXPERF.cadres;
for(a=0;a<C.length;a++)for(b=0;b<C[a].s.length;b++){var x=C[a].s[b],cle=_NXPERF.nomScript(x);
var o=src[cle]||(src[cle]={nom:cle,n:0,ms:0});o.n++;o.ms+=x.d;}
var S=[];for(k in src)S.push(src[k]);
S.sort(function(x,y){return y.ms-x.ms;});
return {depuis:dur,nexiumMs:tot,part:tot/dur,modules:mods,
longues:{n:L.length,ms:lm,pire:lp,recentes:l5},suivi:_NXPERF._obs||"",sources:S.slice(0,6),cadres:C.length};}catch(_){return null;}};
_NXPERF.fluidite=function(ms,fin){try{
if(_NXPERF._fl)return false;
var raf=window.requestAnimationFrame;
if(typeof raf!=="function")return false;
var t0=_NXPERF.horloge(),der=t0,n=0,lents=0,pire=0;
_NXPERF._fl=true;
var pas=function(){try{
var t=_NXPERF.horloge(),d=t-der;der=t;
if(n>0){if(d>50)lents++;if(d>pire)pire=d;}
n++;
if(t-t0<ms){raf(pas);return;}
_NXPERF._fl=false;
_NXPERF.derniere={ips:Math.round((n-1)*1000/Math.max(1,t-t0)),lents:lents,pire:Math.round(pire),cachee:!!document.hidden,quand:Date.now()};
if(fin)fin(_NXPERF.derniere);}catch(_){_NXPERF._fl=false;}};
raf(pas);
return true;}catch(_){_NXPERF._fl=false;return false;}};
// L acceleration materielle, constatee et non supposee : un contexte WebGL
// est demande une fois ; s il manque, ou s il est rendu par SwiftShader, la
// carte graphique ne dessine pas Discord.
_NXPERF.gpu=function(){try{
if(_NXPERF._gpu)return _NXPERF._gpu;
var r={active:null,rendu:""};
try{var c=document.createElement("canvas");
var g=c.getContext&&(c.getContext("webgl")||c.getContext("experimental-webgl"));
if(!g){r.active=false;r.rendu="aucun contexte graphique";}
else{var x=g.getExtension&&g.getExtension("WEBGL_debug_renderer_info");
r.rendu=String((x&&g.getParameter(x.UNMASKED_RENDERER_WEBGL))||g.getParameter(g.RENDERER)||"");
r.active=!/swiftshader|llvmpipe|software|basic render/i.test(r.rendu);
try{var l=g.getExtension("WEBGL_lose_context");if(l)l.loseContext();}catch(_){}}}catch(_){}
_NXPERF._gpu=r;return r;}catch(_){return {active:null,rendu:""};}};
// Le choix de l utilisateur, ecrit la ou le lanceur le lit au demarrage.
_NXPERF.choixGpu=function(){try{
var S=_NXPERF.reglages();var c=S&&S.plugins&&S.plugins.NexiumGpu;
return !(c&&c.desactive===true);}catch(_){return true;}};
_NXPERF.poseGpu=function(actif){try{
var v={desactive:!actif};
try{if(window.Vencord&&Vencord.Settings&&Vencord.Settings.plugins){Vencord.Settings.plugins.NexiumGpu=v;}}catch(_){}
try{if(window.VencordNative&&VencordNative.settings&&VencordNative.settings.get){
var s2=VencordNative.settings.get();if(s2&&typeof s2==="object"){if(!s2.plugins)s2.plugins={};s2.plugins.NexiumGpu=v;VencordNative.settings.set(s2);}}}catch(_){}
_NXPERF.corriges=_NXPERF.corriges||{};_NXPERF.corriges.gpu=Date.now();
return true;}catch(_){return false;}};
_NXPERF.reglages=function(){try{if(window.Vencord&&Vencord.Settings&&typeof Vencord.Settings==="object")return Vencord.Settings;}catch(_){}
try{if(window.VencordNative&&VencordNative.settings&&VencordNative.settings.get)return VencordNative.settings.get();}catch(_){}
return null;};
_NXPERF.diagnostic=function(){try{
var S=_NXPERF.reglages();
if(!S)return {lu:false,points:[],plugins:0};
var pl=S.plugins||{},actifs=0,R=[],k;
for(k in pl){try{if(pl[k]&&pl[k].enabled===true&&!/API$/.test(k))actifs++;}catch(_){}}
var C=_NXPERF.corriges||{},deux=false;
try{deux=!!(pl.MessageLogger&&pl.MessageLogger.enabled===true&&pl.MessageLoggerEnhanced&&pl.MessageLoggerEnhanced.enabled===true);}catch(_){}
var G=_NXPERF.gpu();
var D=[{id:"gpu",actif:G.active===false&&!C.gpu,grave:true,
titre:"Accélération matérielle coupée",
texte:"Discord est dessiné par le processeur, sans la carte graphique ("+(G.rendu||"rendu logiciel")+"). C’est ce qui fait tomber les images et ralentit les animations.",
action:"La rallumer"},
{id:"devtools",actif:S.enableReactDevtools===true,grave:true,
titre:"Outils de developpement React actifs",
texte:"Une extension de debogage est chargee dans Discord et suit chaque mise a jour de l interface. Elle ne sert qu a developper des plugins.",
action:"Couper les outils React"},
{id:"journaux",actif:deux,grave:false,
titre:"Deux journaux de messages actifs en meme temps",
texte:"MessageLogger et MessageLoggerEnhanced enregistrent chacun les memes suppressions et modifications.",
action:"Garder MessageLoggerEnhanced seul"}];
for(k=0;k<D.length;k++){if(D[k].actif||C[D[k].id]){D[k].fait=!D[k].actif;R.push(D[k]);}}
var reste=0;for(k=0;k<R.length;k++)if(!R[k].fait)reste++;
return {lu:true,points:R,reste:reste,plugins:actifs};}catch(_){return {lu:false,points:[],plugins:0};}};
_NXPERF.corrige=function(id){try{
var S=_NXPERF.reglages();
if(!S)return false;
if(id==="gpu")return _NXPERF.poseGpu(true);
if(id==="devtools")S.enableReactDevtools=false;
else if(id==="journaux"){if(!S.plugins||!S.plugins.MessageLogger)return false;S.plugins.MessageLogger.enabled=false;}
else return false;
var vivant=false;
try{vivant=!!(window.Vencord&&Vencord.Settings===S);}catch(_){}
if(!vivant){try{VencordNative.settings.set(S);}catch(_){return false;}}
_NXPERF.corriges=_NXPERF.corriges||{};
_NXPERF.corriges[id]=Date.now();
return true;}catch(_){return false;}};
if(!_NXPERF.boot){try{_NXPERF.boot=true;
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXPERF");}catch(_){}}
}
