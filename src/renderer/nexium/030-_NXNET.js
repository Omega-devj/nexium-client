if(!_NXNET.boot){_NXNET.boot=true;_NXNET.samples=[];_NXNET.count=0;_NXNET.conn=[];_NXNET.listeners=[];
_NXNET.notify=function(){for(var a=0;a<_NXNET.listeners.length;a++){try{_NXNET.listeners[a]();}catch(_){}}};
_NXNET.tnotify=function(){if(_NXNET.nt)return;_NXNET.nt=setTimeout(function(){_NXNET.nt=null;_NXNET.notify();},700);};
_NXNET.KEY="nexium_reseau_v1";
_NXNET.cfg=(function(){var d;try{var raw=_NXDB.get(_NXNET.KEY);d=raw?JSON.parse(raw):null;}catch(e){d=null;}
if(!d||typeof d!=="object")d={};
if(typeof d.seuil!=="number"||d.seuil<50)d.seuil=350;
if(typeof d.historique!=="boolean")d.historique=true;
if(typeof d.inventaire!=="boolean")d.inventaire=true;
return d;})();
_NXNET.save=function(){try{_NXDB.set(_NXNET.KEY,JSON.stringify(_NXNET.cfg));}catch(_){}};
_NXNET.set=function(k,v){try{_NXNET.cfg[k]=v;_NXNET.save();_NXNET.notify();}catch(_){}};
_NXNET.HKEY="nexium_reseau_hist";
_NXNET.hist=(function(){try{var raw=_NXDB.get(_NXNET.HKEY);var d=raw?JSON.parse(raw):null;
if(d&&typeof d==="object"&&d.h&&typeof d.h==="object")return d;}catch(_){}
return {h:{},hotes:{},routes:{},coupures:[],depuis:Date.now()};})();
_NXNET.saveHist=function(){try{if(_NXNET._hs)return;
_NXNET._hs=setTimeout(function(){_NXNET._hs=null;
_NXPERF.repos(function(){try{_NXDB.set(_NXNET.HKEY,JSON.stringify(_NXNET.hist));}catch(_){}});},8000);}catch(_){}};
_NXNET.saveHistNow=function(){try{if(_NXNET._hs){clearTimeout(_NXNET._hs);_NXNET._hs=null;}
_NXDB.set(_NXNET.HKEY,JSON.stringify(_NXNET.hist));}catch(_){}};
_NXNET.pad2=function(n){return n<10?"0"+n:""+n;};
_NXNET.hourKey=function(t){var d=new Date(t||Date.now());
return d.getFullYear()+"-"+_NXNET.pad2(d.getMonth()+1)+"-"+_NXNET.pad2(d.getDate())+"-"+_NXNET.pad2(d.getHours());};
_NXNET.hostOf=function(u){try{
var v=String(u||"");
if(!v)return "";
if(v.charAt(0)==="/")return "discord.com";
var p=v.indexOf("://");
if(p<0)return "";
var r=v.slice(p+3);
var e=r.length;
var c1=r.indexOf("/");if(c1>=0&&c1<e)e=c1;
var c2=r.indexOf("?");if(c2>=0&&c2<e)e=c2;
var c3=r.indexOf("#");if(c3>=0&&c3<e)e=c3;
var h=r.slice(0,e);
var at=h.indexOf("@");if(at>=0)h=h.slice(at+1);
var co=h.lastIndexOf(":");if(co>0&&h.indexOf("]")<0)h=h.slice(0,co);
return h.toLowerCase().replace(/^www\./,"");}catch(_){return "";}};
_NXNET.noteHost=function(u){try{
if(!_NXNET.cfg.inventaire)return;
var h=_NXNET.hostOf(u);
if(!h)return;
var H=_NXNET.hist.hotes||(_NXNET.hist.hotes={});
var e=H[h];
if(!e){e={n:0,at:0};H[h]=e;
var ks=Object.keys(H);
if(ks.length>120){ks.sort(function(x,y){return (H[x].at||0)-(H[y].at||0);});
for(var a=0;a<ks.length-120;a++)delete H[ks[a]];}}
e.n=(e.n||0)+1;e.at=Date.now();
_NXNET.saveHist();}catch(_){}};
_NXNET.route=function(u){try{
var v=String(u||"");
var m=v.match(/\/api\/v\d+(\/[^?#]*)/);
var p=m?m[1]:(v.charAt(0)==="/"?v.split("?")[0]:"");
if(!p)return "";
p=p.replace(/\/\d{6,}/g,"/{id}").replace(/\/[0-9a-f]{16,}/gi,"/{hash}");
var parts=p.split("/");
if(parts.length>6)p=parts.slice(0,6).join("/")+"/…";
return p.slice(0,60);}catch(_){return "";}};
_NXNET.memoRoute=null;_NXNET.memoRouteN=0;
_NXNET.routeCache=function(u){try{
var v=String(u||"");
var q=v.indexOf("?");
var cle=q>=0?v.slice(0,q):v;
if(!_NXNET.memoRoute)_NXNET.memoRoute=Object.create(null);
var hit=_NXNET.memoRoute[cle];
if(hit!==undefined)return hit;
var r=_NXNET.route(v);
if(_NXNET.memoRouteN>400){_NXNET.memoRoute=Object.create(null);_NXNET.memoRouteN=0;}
_NXNET.memoRoute[cle]=r;_NXNET.memoRouteN++;
return r;}catch(_){return "";}};
_NXNET.noteRoute=function(u,ms){try{
var r=_NXNET.routeCache(u);
if(!r)return;
var R2=_NXNET.hist.routes||(_NXNET.hist.routes={});
var e=R2[r];
if(!e){e={n:0,sum:0,max:0};R2[r]=e;
var ks=Object.keys(R2);
if(ks.length>60){ks.sort(function(x,y){return R2[x].n-R2[y].n;});
for(var a=0;a<ks.length-60;a++)delete R2[ks[a]];}}
e.n++;e.sum+=ms;if(ms>e.max)e.max=ms;
_NXNET.saveHist();}catch(_){}};
_NXNET.noteHeure=function(ms){try{
if(!_NXNET.cfg.historique)return;
var k=_NXNET.hourKey();
var H=_NXNET.hist.h||(_NXNET.hist.h={});
var e=H[k];
if(!e){e={n:0,sum:0,max:0,lent:0};H[k]=e;
var ks=Object.keys(H);
if(ks.length>200){ks.sort();for(var a=0;a<ks.length-168;a++)delete H[ks[a]];}}
e.n++;e.sum+=ms;if(ms>e.max)e.max=ms;
if(ms>=_NXNET.cfg.seuil)e.lent++;
_NXNET.saveHist();}catch(_){}};
_NXNET.lents=0;
_NXNET.alerte=function(ms){try{
if(ms>=_NXNET.cfg.seuil)_NXNET.lents++;}catch(_){}};
_NXNET.coupure=function(){try{
var ss=_NXNET.samples||[];
if(ss.length<2)return;
var der=ss[ss.length-1],avd=ss[ss.length-2];
var trou=der.t-avd.t;
if(trou<120000)return;
var C=_NXNET.hist.coupures||(_NXNET.hist.coupures=[]);
C.unshift({t:avd.t,ms:trou});
if(C.length>25)_NXNET.hist.coupures=C.slice(0,25);
_NXNET.saveHist();}catch(_){}};
_NXNET.stats=function(){try{
var ss=_NXNET.samples||[];
if(!ss.length)return {n:0,avg:0,min:0,max:0,p95:0,gigue:0,rpm:0};
var vals=[],sum=0,mn=1e9,mx=0,now=Date.now(),rpm=0;
for(var a=0;a<ss.length;a++){var m=ss[a].ms;vals.push(m);sum+=m;
if(m<mn)mn=m;if(m>mx)mx=m;
if(now-ss[a].t<60000)rpm++;}
var avg=Math.round(sum/vals.length);
vals.sort(function(x,y){return x-y;});
var p95=vals[Math.min(vals.length-1,Math.floor(vals.length*0.95))];
var vs=0;for(var b=0;b<ss.length;b++){var dv=ss[b].ms-avg;vs+=dv*dv;}
return {n:vals.length,avg:avg,min:mn,max:mx,p95:Math.round(p95),
gigue:Math.round(Math.sqrt(vs/vals.length)),rpm:rpm};}catch(_){return {n:0,avg:0,min:0,max:0,p95:0,gigue:0,rpm:0};}};
_NXNET.topHotes=function(n){try{
var H=_NXNET.hist.hotes||{},out=[];
for(var h in H)out.push({h:h,n:H[h].n||0,at:H[h].at||0});
out.sort(function(x,y){return y.n-x.n;});
return out.slice(0,n||12);}catch(_){return [];}};
_NXNET.topRoutes=function(n){try{
var R2=_NXNET.hist.routes||{},out=[];
for(var r in R2){var e=R2[r];
out.push({r:r,n:e.n,moy:e.n?Math.round(e.sum/e.n):0,max:e.max});}
out.sort(function(x,y){return y.moy-x.moy;});
return out.slice(0,n||10);}catch(_){return [];}};
_NXNET.heures=function(n){try{
var out=[],maintenant=new Date();
for(var a=(n||24)-1;a>=0;a--){
var d=new Date(maintenant.getTime()-a*3600000);
var k=_NXNET.hourKey(d.getTime());
var e=(_NXNET.hist.h||{})[k];
out.push({h:d.getHours(),n:(e&&e.n)||0,moy:(e&&e.n)?Math.round(e.sum/e.n):0,max:(e&&e.max)||0,lent:(e&&e.lent)||0});}
return out;}catch(_){return [];}};
_NXNET.ping=function(cb){try{
if(_NXNET.pinging){cb&&cb(null);return;}
_NXNET.pinging=true;_NXNET.notify();
var t0=(typeof performance!=="undefined"&&performance.now)?performance.now():Date.now();
_NXNETX.go("https://discord.com/api/v9/gateway?nx="+Date.now(),{cache:"no-store"},8000)
.then(function(){var ms=((typeof performance!=="undefined"&&performance.now)?performance.now():Date.now())-t0;
_NXNET.pinging=false;_NXNET.dernierPing=Math.round(ms);
_NXNET.sample(ms,"https://discord.com/api/v9/gateway");
_NXNET.notify();cb&&cb(Math.round(ms));})
.catch(function(){_NXNET.pinging=false;_NXNET.dernierPing=null;_NXNET.notify();cb&&cb(null);});
}catch(_){_NXNET.pinging=false;cb&&cb(null);}};
_NXNET.exportCsv=function(){try{
var L=["heure;requetes;latence_moyenne_ms;latence_max_ms;requetes_lentes"];
var H=_NXNET.hist.h||{};
var ks=Object.keys(H).sort();
for(var a=0;a<ks.length;a++){var e=H[ks[a]];
L.push(ks[a]+";"+e.n+";"+(e.n?Math.round(e.sum/e.n):0)+";"+e.max+";"+(e.lent||0));}
var txt=L.join("\n");
try{if(typeof Blob!=="undefined"&&typeof URL!=="undefined"&&URL.createObjectURL){
var b=new Blob([txt],{type:"text/csv;charset=utf-8"});
var u=URL.createObjectURL(b);
var a2=document.createElement("a");
a2.href=u;a2.download="nexium-reseau.csv";
document.body.appendChild(a2);a2.click();
setTimeout(function(){try{document.body.removeChild(a2);URL.revokeObjectURL(u);}catch(_){}},1500);
return true;}}catch(_){}
try{DiscordNative.clipboard.copy(txt);}catch(_){}
return false;}catch(_){return false;}};
_NXNET.reset=function(){try{
_NXNET.samples=[];_NXNET.count=0;_NXNET.lents=0;
_NXNET.hist={h:{},hotes:{},routes:{},coupures:[],depuis:Date.now()};
_NXNET.saveHistNow();_NXNET.notify();}catch(_){}};
_NXNET.sample=function(ms,url){try{_NXNET.count++;var v=Math.round(ms);_NXNET.samples.push({t:Date.now(),ms:v});if(_NXNET.samples.length>240)_NXNET.samples.shift();_NXNET.coupure();_NXNET.noteHeure(v);if(url)_NXNET.noteRoute(url,v);_NXNET.alerte(v);_NXNET.tnotify();}catch(_){}};
_NXNET.logConn=function(type){try{_NXNET.conn.unshift({t:Date.now(),type:type});if(_NXNET.conn.length>40)_NXNET.conn.pop();_NXNET.notify();}catch(_){}};
_NXNET.isApi=function(u){return /discord(app)?\.com\/api\//.test(u)||/^\/api\/v\d+\//.test(u);};
_NXNET.wireConn=function(){try{var C=_NXcommon();var FX=C.C.FluxDispatcher||(C.WP.findByProps&&C.WP.findByProps("subscribe","dispatch","_actionHandlers"));if(!FX||!FX.subscribe){_NXNET.tr=(_NXNET.tr||0)+1;if(_NXNET.tr<25)_NXPERF.amorce(_NXNET.wireConn,1500);return;}FX.subscribe("CONNECTION_OPEN",function(){_NXNET.logConn("Connexion ouverte");});FX.subscribe("RESUMED",function(){_NXNET.logConn("Session reprise");});FX.subscribe("GATEWAY_CONNECTED",function(){_NXNET.logConn("Gateway connectée");});FX.subscribe("CONNECTION_CLOSED",function(){_NXNET.logConn("Connexion fermée");});}catch(_){}};
_NXNET.logConn("Client démarré");_NXNET.wireConn();}
try{(function(){if(window.fetch&&!window.fetch.__nxlat){var _lf=window.fetch.bind(window);var lf=function(input,opts){if(_NXNET.paused)return _lf(input,opts);var u="";try{u=typeof input==="string"?input:(input&&input.url)?input.url:"";}catch(_){}try{if(u)_NXNET.noteHost(u);}catch(_){}if(u&&_NXNET.isApi(u)){var t0=(typeof performance!=="undefined"&&performance.now)?performance.now():Date.now();return _lf(input,opts).then(function(r){try{_NXNET.sample(((typeof performance!=="undefined"&&performance.now)?performance.now():Date.now())-t0,u);}catch(_){}return r;},function(e){throw e;});}return _lf(input,opts);};lf.__nxlat=true;window.fetch=lf;}})();}catch(_){}
try{(function(){var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype;if(XP&&!XP.__nxlat){var _xo=XP.open;XP.open=function(m,u){try{this.__nxlu=u;}catch(_){}return _xo.apply(this,arguments);};var _xs=XP.send;XP.send=function(){try{var self=this;if(self.__nxlu&&_NXNET.isApi(self.__nxlu)){var t0=(typeof performance!=="undefined"&&performance.now)?performance.now():Date.now();self.addEventListener("loadend",function(){try{_NXNET.sample(((typeof performance!=="undefined"&&performance.now)?performance.now():Date.now())-t0,self.__nxlu);}catch(_){}});}}catch(_){}return _xs.apply(this,arguments);};XP.__nxlat=true;}})();}catch(_){}var _NXIA=window._NXIA||(window._NXIA={});
