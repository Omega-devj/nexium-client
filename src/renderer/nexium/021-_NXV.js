if(!_NXV.boot){_NXV.boot=true;
_NXV.KEY="nexium_vault";
_NXV.cfg=(function(){var d;try{var r=_NXDB.get(_NXV.KEY);d=r?JSON.parse(r):null;}catch(e){d=null;}
if(!d||typeof d!=="object")d={};
if(typeof d.blockExfil!=="boolean")d.blockExfil=true;
if(typeof d.scanThemes!=="boolean")d.scanThemes=true;
if(typeof d.verifyIntegrity!=="boolean")d.verifyIntegrity=true;
if(typeof d.encryptLocal!=="boolean")d.encryptLocal=false;
if(!Array.isArray(d.allowedCss))d.allowedCss=[];
if(typeof d.community!=="boolean")d.community=true;
if(typeof d.deepFiles!=="boolean")d.deepFiles=true;
if(typeof d.giftGuard!=="boolean")d.giftGuard=true;
if(typeof d.sessionGuard!=="boolean")d.sessionGuard=true;
if(typeof d.selfGuard!=="boolean")d.selfGuard=true;
if(typeof d.guildGuard!=="boolean")d.guildGuard=true;
if(typeof d.aftermath!=="boolean")d.aftermath=true;
if(typeof d.auditPlugins!=="boolean")d.auditPlugins=true;
if(typeof d.identityGuard!=="boolean")d.identityGuard=true;
if(typeof d.mediaGuard!=="boolean")d.mediaGuard=true;
if(typeof d.graceDelay!=="boolean")d.graceDelay=true;
return d;})();
_NXV.save=function(){try{_NXDB.set(_NXV.KEY,JSON.stringify(_NXV.cfg));}catch(_){}};
_NXV.stats=(function(){var d;try{var r=_NXDB.get(_NXV.KEY+"_stats");d=r?JSON.parse(r):null;}catch(e){d=null;}
if(!d||typeof d!=="object")d={};
if(typeof d.blocked!=="number")d.blocked=0;
if(typeof d.css!=="number")d.css=0;
if(!Array.isArray(d.log))d.log=[];
return d;})();
_NXV.saveStats=function(){try{_NXDB.set(_NXV.KEY+"_stats",JSON.stringify(_NXV.stats));}catch(_){}};
_NXV.listeners=[];
_NXV.notify=function(){for(var a=0;a<_NXV.listeners.length;a++){try{_NXV.listeners[a]();}catch(_){}}};
_NXV.log=function(kind,detail){try{
_NXV.stats.log.unshift({k:kind,d:String(detail||"").slice(0,160),t:Date.now()});
if(_NXV.stats.log.length>40)_NXV.stats.log=_NXV.stats.log.slice(0,40);
_NXV.saveStats();_NXV.notify();}catch(_){}};

_NXV.SAFE=/(^|\.)(discord\.com|discordapp\.com|discordapp\.net|discord\.gg|discord\.media|discord\.dev|discordstatus\.com|githubusercontent\.com|github\.com|emcoqnvxriyrchmfpunq\.supabase\.co)$/i;
_NXV.hostOf=function(u){try{var h=new URL(String(u),"https://discord.com").hostname.toLowerCase();return h.replace(/^www\./,"");}catch(_){return "";}};
_NXV.isSafeHost=function(h){try{return _NXV.SAFE.test(h||"");}catch(_){return false;}};

_NXV.token=(function(){var _c=null,_at=0;
var lire=function(){var t=null;
try{var W=window.Vencord&&Vencord.Webpack;
var m=W&&W.findByProps&&W.findByProps("getToken");
if(m&&typeof m.getToken==="function")t=m.getToken();}catch(_){}
if(!t){try{var raw=window.localStorage&&window.localStorage.getItem("token");if(raw)t=String(raw).replace(/^"|"$/g,"");}catch(_){}}
return (t&&String(t).length>20)?String(t):null;};
var fn=function(){try{
var now=Date.now();
if(_c&&(now-_at)<15000)return _c;
_c=lire();_at=now;
return _c;}catch(_){return null;}};
fn.oublier=function(){try{_c=null;_at=0;}catch(_){}};
return fn;})();
_NXV.forgetToken=function(){try{if(_NXV.token&&_NXV.token.oublier)_NXV.token.oublier();}catch(_){}};
try{document.addEventListener("visibilitychange",function(){try{if(document.hidden)_NXV.forgetToken();}catch(_){}});}catch(_){}
try{setInterval(function(){try{if(document.hidden)_NXV.forgetToken();}catch(_){}},60000);}catch(_){}

_NXV.RXTK=/(mfa\.[\w-]{20,})|([\w-]{23,28}\.[\w-]{6}\.[\w-]{27,38})/;
_NXV.RXPWD=/("password"\s*:\s*"[^"]{6,})|(&password=)|("new_password")/i;
_NXV.RXKEY=/(sk_live_[A-Za-z0-9]{20,})|(xox[baprs]-[\w-]{12,})|(gh[pousr]_[A-Za-z0-9]{30,})|(AIza[\w-]{30,})/;
_NXV.findSecret=(function(){var _s=null,_at=0;
var bati=function(){var out=[];
var t=null;try{t=_NXV.token();}catch(_){}
if(t&&t.length>20){
out.push([t,"jeton de session"]);
try{var e=encodeURIComponent(t);if(e!==t)out.push([e,"jeton encode en URL"]);}catch(_){}
try{if(window.btoa){var b=btoa(t).replace(/=+$/,"");if(b.length>20)out.push([b,"jeton encode en base64"]);}}catch(_){}
try{var r=t.split("").reverse().join("");out.push([r,"jeton inverse"]);}catch(_){}
try{var np=t.replace(/[.\-_]/g,"");if(np!==t&&np.length>20)out.push([np,"jeton recompose"]);}catch(_){}
if(t.length>=40){out.push([t.slice(0,26),"fragment de jeton"]);out.push([t.slice(-26),"fragment de jeton"]);}}
try{var ck=document.cookie;if(ck&&ck.length>30)out.push([ck.slice(0,40),"cookies de session"]);}catch(_){}
return out;};
var fn=function(hay){try{
if(!hay)return null;
var h=String(hay);
if(h.length<20)return null;
if(h.length>60000)h=h.slice(0,60000);
var now=Date.now();
if(!_s||(now-_at)>15000){_s=bati();_at=now;}
for(var a=0;a<_s.length;a++){var sg=_s[a];if(sg[0]&&h.indexOf(sg[0])>=0)return sg[1];}
if(_NXV.RXTK.test(h))return "jeton Discord";
if(_NXV.RXPWD.test(h))return "mot de passe";
if(_NXV.RXKEY.test(h))return "cle d API";
return null;}catch(_){return null;}};
fn.oublier=function(){try{_s=null;_at=0;}catch(_){}};
return fn;})();
_NXV.scanPayload=function(body){try{
if(!body)return null;
var s="";
if(typeof body==="string")s=body;
else if(typeof FormData!=="undefined"&&body instanceof FormData){try{var p=[];body.forEach(function(v,k){p.push(String(k)+"="+String(v).slice(0,400));});s=p.join("&");}catch(_){}}
else if(typeof URLSearchParams!=="undefined"&&body instanceof URLSearchParams){try{s=body.toString();}catch(_){s="";}}
else if(typeof Blob!=="undefined"&&body instanceof Blob)return null;
else if(body&&body.buffer&&typeof body.byteLength==="number"){try{
var u8=new Uint8Array(body.buffer||body);
var lim=u8.length<8192?u8.length:8192;var cs=[];
for(var q=0;q<lim;q++)cs.push(String.fromCharCode(u8[q]));
s=cs.join("");}catch(_){s="";}}
else if(body&&typeof body==="object"){try{s=JSON.stringify(body);}catch(_){s="";}}
if(!s)return null;
return _NXV.findSecret(s.slice(0,60000));}catch(_){return null;}};

_NXV.headerLeak=function(init){try{
if(!init||!init.headers)return null;
var h=init.headers;var vals=[];
try{if(typeof Headers!=="undefined"&&h instanceof Headers){h.forEach(function(v,k){vals.push(String(k)+": "+String(v));});}
else if(Array.isArray(h)){for(var a=0;a<h.length;a++)vals.push(String(h[a][0])+": "+String(h[a][1]));}
else{for(var k in h)vals.push(String(k)+": "+String(h[k]));}}catch(_){}
for(var b=0;b<vals.length;b++){if(_NXV.findSecret(vals[b]))return "jeton dans les en-tetes";}
return null;}catch(_){return null;}};

_NXV.urlLeak=function(u){try{
var s=String(u||"");
if(s.length<48)return null;
var i1=s.indexOf("?"),i2=s.indexOf("#");
var cut=i1<0?i2:(i2<0?i1:(i1<i2?i1:i2));
if(cut<0)cut=s.indexOf("/",9);
if(cut<0)return null;
var tail=s.slice(cut);
if(tail.length<24)return null;
var w=_NXV.findSecret(tail);
if(w)return w+" dans l adresse";
var d=null;try{d=decodeURIComponent(tail);}catch(_){d=null;}
if(d&&d!==tail){w=_NXV.findSecret(d);if(w)return w+" dans l adresse";}
try{var brut=tail.replace(/^[\/?#]+/,"");
if(brut.length>=40&&brut.length<9000&&/^[A-Za-z0-9+\/=_-]+$/.test(brut)&&window.atob){
var dec=atob(brut.replace(/-/g,"+").replace(/_/g,"/"));
w=_NXV.findSecret(dec);
if(w)return w+" encode dans l adresse";}}catch(_){}
return null;}catch(_){return null;}};

_NXV.deny=function(host,what,where){try{
_NXV.stats.blocked=(_NXV.stats.blocked||0)+1;
try{if(!Array.isArray(_NXV.stats.exfil))_NXV.stats.exfil=[];
_NXV.stats.exfil.unshift({h:String(host||"").slice(0,90),w:String(what||"").slice(0,60),o:String(where||"").slice(0,20),t:Date.now()});
if(_NXV.stats.exfil.length>30)_NXV.stats.exfil=_NXV.stats.exfil.slice(0,30);}catch(_){}
_NXV.log("exfil",what+" vers "+host+(where?(" ("+where+")"):""));
_NXV.saveStats();
if(!_NXV._lastAlert||(Date.now()-_NXV._lastAlert)>8000){_NXV._lastAlert=Date.now();
try{setTimeout(function(){_NXV.aftermath({why:"Une tentative d envoi de ton "+what+" vers "+host+" a ete bloquee."});},900);}catch(_){}
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("BLOQUE : une tentative d envoi de ton ")+_NXtr(what)+_NXtr(" vers ")+_NXtr(host)+_NXtr(" a ete stoppee. Change ton mot de passe si tu as colle du code recemment."),0);}catch(_){}}
try{if(window._NXPR){_NXPR.stats.blocked=(_NXPR.stats.blocked||0)+1;_NXPR.logThreat("exfil",what+" vers "+host);_NXPR.saveStats();}}catch(_){}
}catch(_){}};

_NXV.inspectOut=function(url,init){try{
return _NXV.urlLeak(url)||_NXV.headerLeak(init)||_NXV.scanPayload(init&&init.body);}catch(_){return null;}};
_NXV.checkOut=function(url,init,where){try{
if(!_NXV.cfg.blockExfil)return false;
var h=_NXV.hostOf(url);
if(!h||_NXV.isSafeHost(h))return false;
var what=_NXV.inspectOut(url,init);
if(!what)return false;
_NXV.deny(h,what,where);
return true;}catch(_){return false;}};
}
_NXV.RXCSSURL=/url\(\s*['"]?(https?:\/\/[^'")\s]+)/gi;
_NXV.RXIMPORT=/@import\s+(?:url\(\s*)?['"]?(https?:\/\/[^'")\s;]+)/gi;
_NXV.cssSources=function(){try{
var out=[];var W=window.Vencord&&Vencord.Webpack;
try{var qs=_NXDB.ls&&_NXDB.ls.getItem?null:null;}catch(_){}
try{var V=window.Vencord;
if(V&&V.Settings&&V.Settings.plain){var s=V.Settings.plain;
if(s.themeLinks&&s.themeLinks.length)for(var a=0;a<s.themeLinks.length;a++)out.push({n:"lien de theme",v:String(s.themeLinks[a]),link:true});}
if(V&&V.QuickCss&&typeof V.QuickCss==="string")out.push({n:"QuickCSS",v:V.QuickCss});}catch(_){}
try{var el=document.getElementById("vencord-custom-css")||document.getElementById("vencord-quickcss");
if(el&&el.textContent)out.push({n:"QuickCSS",v:String(el.textContent)});}catch(_){}
try{var sts=document.querySelectorAll?document.querySelectorAll("style[id*='vencord'],style[id*='theme'],style[id*='equicord']"):[];
for(var b=0;b<sts.length&&b<12;b++){var t=sts[b].textContent||"";if(t.length>40)out.push({n:sts[b].id||"theme",v:t});}}catch(_){}
return out;}catch(_){return [];}};
_NXV.scanCss=function(){try{
if(!_NXV.cfg.scanThemes)return [];
var found=[],seen=Object.create(null);
var srcs=_NXV.cssSources();
for(var a=0;a<srcs.length;a++){
var s=srcs[a];var txt=String(s.v||"");
if(s.link){var h0=_NXV.hostOf(txt);if(h0&&!seen["L"+h0]){seen["L"+h0]=1;found.push({t:"lien",h:h0,u:txt,src:s.n,imp:true});}continue;}
var m;
_NXV.RXIMPORT.lastIndex=0;
while((m=_NXV.RXIMPORT.exec(txt))){var h=_NXV.hostOf(m[1]);
if(h&&!seen["I"+h]){seen["I"+h]=1;found.push({t:"import",h:h,u:m[1],src:s.n,imp:true});}}
_NXV.RXCSSURL.lastIndex=0;
while((m=_NXV.RXCSSURL.exec(txt))){var h2=_NXV.hostOf(m[1]);
if(!h2||seen["U"+h2])continue;seen["U"+h2]=1;
found.push({t:"ressource",h:h2,u:m[1],src:s.n,imp:false});}}
_NXV.css=found;
var risky=found.filter(function(f){return !_NXV.isSafeHost(f.h)&&_NXV.cfg.allowedCss.indexOf(f.h)<0;});
_NXV.cssRisky=risky;
if(risky.length&&!_NXV._cssWarned){_NXV._cssWarned=true;
_NXV.stats.css=risky.length;_NXV.saveStats();
_NXV.log("css",risky.length+" source(s) externe(s) dans tes themes : "+risky.slice(0,3).map(function(f){return f.h;}).join(", "));
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Tes themes chargent ")+_NXtr(risky.length)+_NXtr(" ressource(s) externe(s) : ton IP est transmise a ces serveurs. Voir Nexium Protect."),0);}catch(_){}}
_NXV.notify();
return found;}catch(_){return [];}};
_NXV.blockCssHost=function(h){try{
if(!h)return;
if(!_NXV._cssBlocked)_NXV._cssBlocked=Object.create(null);
_NXV._cssBlocked[h]=1;
var id="nx-css-guard";
var st=document.getElementById(id);
if(!st){st=document.createElement("style");st.id=id;if(document.head)document.head.appendChild(st);}
var rules=[];
for(var k in _NXV._cssBlocked)rules.push('[style*="'+k+'"]{background-image:none !important;}');
st.textContent=_NXtr(rules.join("\n"));
_NXV.log("css","ressource bloquee : "+h);
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Ressource ")+_NXtr(h)+_NXtr(" bloquee. Redemarre pour un effet complet."),1);}catch(_){}
}catch(_){}};
_NXV.allowCss=function(h){try{
if(_NXV.cfg.allowedCss.indexOf(h)<0)_NXV.cfg.allowedCss.push(h);
_NXV.save();_NXV._cssWarned=false;_NXV.scanCss();}catch(_){}};

_NXV.SUMURL="https://raw.githubusercontent.com/Omega-devj/nexium-client/refs/heads/main/resources/equicord/renderer.js.nxsum";
_NXV.sum=function(t){try{var h=5381,a=0,n=t.length;for(;a<n;a++)h=(((h<<5)+h)^t.charCodeAt(a))|0;return "nx"+(h>>>0).toString(16)+"-"+n;}catch(_){return null;}};
_NXV.integrity={state:"inconnu"};
_NXV.checkIntegrity=function(){try{
if(!_NXV.cfg.verifyIntegrity){_NXV.integrity={state:"desactive"};_NXV.notify();return;}
var RAW="https://raw.githubusercontent.com/Omega-devj/nexium-client/refs/heads/main/resources/equicord/renderer.js";
Promise.all([
_NXNETX.go(_NXV.SUMURL,{cache:"no-store"}).then(function(r){return r&&r.ok?r.text():null;}).catch(function(){return null;}),
_NXNETX.go(RAW,{cache:"no-store"}).then(function(r){return r&&r.ok?r.text():null;}).catch(function(){return null;})
]).then(function(res){
var pub=res[0],ref=res[1];
if(!pub||!ref){_NXV.integrity={state:"injoignable"};_NXV.notify();return;}
pub=pub.trim();
var refSum=_NXV.sum(ref);
var refV=(ref.match(/_NXUP\.VERSION="(\d+)"/)||[])[1]||null;
var myV=_NXUP.VERSION;
if(refV&&myV&&parseInt(refV,10)!==parseInt(myV,10)){
_NXV.integrity={state:"version differente",repo:refV,local:myV};_NXV.notify();return;}
if(refSum!==pub){_NXV.integrity={state:"reference incoherente"};_NXV.notify();return;}
_NXV.integrity={state:"conforme",sum:pub,at:Date.now()};
_NXV.notify();
}).catch(function(){_NXV.integrity={state:"injoignable"};_NXV.notify();});
}catch(_){}};

_NXV.ck=function(){try{
var k=_NXDB.get("nexium_ck");
if(k&&k.length>=16)return k;
var s="";var c="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
for(var a=0;a<24;a++)s+=c.charAt(Math.floor(Math.random()*c.length));
_NXDB.set("nexium_ck",s);return s;}catch(_){return "nexium-default-key-fallback";}};
_NXV.enc=function(txt){try{
var k=_NXV.ck(),s=String(txt),out=[];
for(var a=0;a<s.length;a++){var v=(s.charCodeAt(a)^k.charCodeAt(a%k.length))&0xFFFF;out.push(("000"+v.toString(16)).slice(-4));}
return "NXE2:"+out.join("");}catch(_){return txt;}};
_NXV.dec=function(txt){try{
var s=String(txt||"");
if(s.indexOf("NXE2:")!==0)return s;
var h=s.slice(5),k=_NXV.ck(),out=[];
for(var a=0,b=0;a+4<=h.length;a+=4,b++){var v=parseInt(h.substr(a,4),16);out.push(String.fromCharCode(v^k.charCodeAt(b%k.length)));}
return out.join("");}catch(_){return txt;}};
_NXV.SECRET=["nexium_stats_v1","nexium_protect_v1_stats","nexium_reports","nexium_errors","nexium_quarantine","nexium_privacy_v1"];
_NXV.applyEncryption=function(on){try{
_NXV.cfg.encryptLocal=!!on;_NXV.save();
var ks=_NXDB.keys();
for(var a=0;a<ks.length;a++){var k=ks[a];
if(_NXV.SECRET.indexOf(k)<0)continue;
var v=(_NXV.rawGet?_NXV.rawGet(k):null);if(!v)continue;
var isEnc=String(v).indexOf("NXE2:")===0;
if(on&&!isEnc){if(_NXV.rawSet)_NXV.rawSet(k,_NXV.enc(v));}
else if(!on&&isEnc){if(_NXV.rawSet)_NXV.rawSet(k,_NXV.dec(v));}}
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(on?_NXtr("Donnees locales chiffrees."):_NXtr("Chiffrement desactive."),1);}catch(_){}
_NXV.notify();}catch(_){}};
_NXV.CAPI="https://emcoqnvxriyrchmfpunq.supabase.co/functions/v1/community";
_NXV.comm=Object.create(null);_NXV.commN=0;_NXV.commAt=0;
_NXV.hostInfo=Object.create(null);
_NXV.loadCommunity=function(force){try{
if(!_NXV.cfg.community)return;
if(!force&&_NXV.commAt&&(Date.now()-_NXV.commAt)<10800000)return;
if(_NXV._cBusy)return;_NXV._cBusy=true;
try{var raw=_NXDB.get("nexium_community");
if(raw&&!force){var j=JSON.parse(raw);
if(j&&j.items&&(Date.now()-j.at)<10800000){_NXV.setCommunity(j.items);_NXV._cBusy=false;return;}}}catch(_){}
_NXNETX.go(_NXV.CAPI,{method:"POST",headers:{"Content-Type":"application/json","x-nexium-key":_NXPR.CKEY,"apikey":_NXPR.CKEY,"Authorization":"Bearer "+_NXPR.CKEY},body:JSON.stringify({action:"list"})})
.then(function(r){return r.json();}).then(function(j){_NXV._cBusy=false;
if(j&&j.ok&&Array.isArray(j.items)){_NXV.setCommunity(j.items);
try{_NXDB.set("nexium_community",JSON.stringify({at:Date.now(),items:j.items}));}catch(_){}}})
.catch(function(){_NXV._cBusy=false;
try{var r2=_NXDB.get("nexium_community");if(r2){var j2=JSON.parse(r2);if(j2&&j2.items)_NXV.setCommunity(j2.items);}}catch(_){}});
}catch(_){_NXV._cBusy=false;}};
_NXV.setCommunity=function(items){try{
var m=Object.create(null),n=0;
for(var a=0;a<items.length;a++){var it=items[a];
var h=it&&(it.h||it);if(!h)continue;
m[String(h)]={n:(it.n||3),k:(it.k||"other")};n++;}
_NXV.comm=m;_NXV.commN=n;_NXV.commAt=Date.now();
try{if(window._NXPR){_NXPR.cache=Object.create(null);_NXPR.cacheN=0;}}catch(_){}
_NXV.notify();}catch(_){}};
_NXV.commHit=function(h){try{
if(!_NXV.cfg.community||!h)return null;
var p=h,g=0;
while(p&&g<8){if(_NXV.comm[p])return _NXV.comm[p];var k=p.indexOf(".");if(k<0)break;p=p.slice(k+1);g++;}
return null;}catch(_){return null;}};
_NXV.askHost=function(h,cb){try{
if(!h)return;
if(_NXV.hostInfo[h]!==undefined){cb&&cb(_NXV.hostInfo[h]);return;}
_NXNETX.go(_NXV.CAPI,{method:"POST",headers:{"Content-Type":"application/json","x-nexium-key":_NXPR.CKEY,"apikey":_NXPR.CKEY,"Authorization":"Bearer "+_NXPR.CKEY},body:JSON.stringify({action:"host",host:h})})
.then(function(r){return r.json();}).then(function(j){
var n=(j&&j.ok)?(j.reporters||0):0;
_NXV.hostInfo[h]=n;cb&&cb(n);_NXV.notify();})
.catch(function(){_NXV.hostInfo[h]=0;cb&&cb(0);});
}catch(_){}};

_NXV.RXBIDI=/[\u202A-\u202E\u2066-\u2069\u200F\u200E]/;
_NXV.ARCH={zip:1,rar:1,"7z":1,gz:1,tar:1,bz2:1,xz:1};
_NXV.checkFileName=function(name){try{
var n=String(name||"");
if(_NXV.RXBIDI.test(n)){
var clean=n.replace(_NXV.RXBIDI,"");
var rev=clean.split("").reverse().join("");
var real=null;
var m=clean.match(/\.([a-z0-9]{1,5})$/i);
var m2=rev.match(/^([a-z0-9]{1,5})\./i);
if(m2)real=m2[1].toLowerCase();
return {bidi:true,shown:n,real:real};}
return null;}catch(_){return null;}};
_NXV.checkArchive=function(url,name,cb){try{
var ex=String(name||"").toLowerCase().match(/\.([a-z0-9]{1,5})$/);
ex=ex?ex[1]:"";
if(!_NXV.ARCH[ex]){cb&&cb(null);return;}
_NXNETX.go(url,{method:"GET",headers:{Range:"bytes=0-3999"},cache:"no-store"})
.then(function(r){if(!r||!(r.ok||r.status===206))throw 0;return r.arrayBuffer();})
.then(function(buf){
var b=new Uint8Array(buf);
var res={enc:false,exe:null};
if(ex==="zip"){
for(var a=0;a+30<b.length;a++){
if(b[a]===0x50&&b[a+1]===0x4B&&b[a+2]===0x03&&b[a+3]===0x04){
var flag=b[a+6]|(b[a+7]<<8);
if(flag&0x01)res.enc=true;
var nl=b[a+26]|(b[a+27]<<8);
if(nl>0&&nl<200&&a+30+nl<=b.length){
var nm="";for(var c=0;c<nl;c++)nm+=String.fromCharCode(b[a+30+c]);
if(/\.(exe|scr|bat|cmd|vbs|js|jar|msi|ps1|com|pif|hta|lnk|dll)$/i.test(nm))res.exe=nm;}
}}}
else if(ex==="rar"){if(b[10]&&(b[10]&0x80))res.enc=true;}
else if(ex==="7z"){res.enc=false;}
cb&&cb(res);})
.catch(function(){cb&&cb(null);});
}catch(_){cb&&cb(null);}};
_NXV.inspectFile=function(att,name,isDM){try{
if(!_NXV.cfg.deepFiles)return;
var bidi=_NXV.checkFileName(name);
if(bidi){
_NXV.log("fichier","nom trompeur (inversion) : "+String(name).slice(0,60));
try{if(window._NXPR){_NXPR.stats.blocked=(_NXPR.stats.blocked||0)+1;_NXPR.logThreat("file","nom inverse : "+(bidi.real?("vrai type ."+bidi.real):"caracteres d inversion"));_NXPR.saveStats();
_NXPR.toast(_NXtr("DANGER : le nom de ce fichier utilise des caracteres d inversion pour cacher sa vraie extension")+(bidi.real?(" (."+_NXtr(bidi.real)+")"):"")+_NXtr(". Ne l ouvre pas."),0);}}catch(_){}
return;}
var u=att&&(att.url||att.proxy_url);if(!u)return;
_NXV.checkArchive(u,name,function(r){try{
if(!r)return;
if(r.enc){_NXV.log("fichier","archive chiffree : "+String(name).slice(0,60));
if(window._NXPR){_NXPR.logThreat("file","archive protegee par mot de passe : "+name);_NXPR.saveStats();
_NXPR.toast(_NXtr("Archive protegee par mot de passe (")+_NXtr(name)+_NXtr(") : aucun antivirus ne peut l analyser. Methode classique de diffusion de virus."),0);}return;}
if(r.exe){_NXV.log("fichier","executable dans une archive : "+r.exe);
if(window._NXPR){_NXPR.stats.blocked=(_NXPR.stats.blocked||0)+1;_NXPR.logThreat("file","archive contenant "+r.exe);_NXPR.saveStats();
_NXPR.toast(_NXtr("DANGER : l archive ")+_NXtr(name)+_NXtr(" contient un executable (")+_NXtr(r.exe)+_NXtr("). Ne l ouvre pas."),0);}}
}catch(_){}});
}catch(_){}};

_NXV.RXGIFT=/(discord\.gift|discord(?:app)?\.com\/gifts?)\/([a-zA-Z0-9]{8,64})/gi;
_NXV.giftSeen=Object.create(null);
_NXV.checkGift=function(txt){try{
if(!_NXV.cfg.giftGuard)return;
var s=String(txt||"");
_NXV.RXGIFT.lastIndex=0;var m,n=0;
while((m=_NXV.RXGIFT.exec(s))&&n<3){n++;
var code=m[2];
if(_NXV.giftSeen[code])continue;_NXV.giftSeen[code]=1;
(function(cd){
_NXNETX.go("https://discord.com/api/v10/entitlements/gift-codes/"+cd+"?with_application=false&with_subscription_plan=true",{cache:"no-store"})
.then(function(r){
if(r&&r.ok)return null;
return r?r.status:0;})
.then(function(bad){
if(bad===null)return;
_NXV.log("cadeau","code invalide : "+cd.slice(0,12));
if(window._NXPR){_NXPR.stats.scams=(_NXPR.stats.scams||0)+1;_NXPR.logThreat("gift","faux lien de cadeau Nitro");_NXPR.saveStats();
_NXPR.toast(_NXtr("Ce lien de cadeau Nitro n existe pas : c est une arnaque. Ne saisis jamais tes identifiants sur la page qu il ouvre."),0);}})
.catch(function(){});
})(code);}
// faux domaines imitant discord.gift
var fake=s.match(/https?:\/\/[^\s]*(?:disc[o0]rd|dlscord)[a-z0-9.\-]*(?:gift|nitro)[^\s]*/gi)||[];
if(fake.length){
var h=_NXPR.host(fake[0]);
if(h&&!_NXPR.RXREAL.test(h)){
_NXV.log("cadeau","faux domaine de cadeau : "+h);
if(window._NXPR){_NXPR.stats.blocked=(_NXPR.stats.blocked||0)+1;_NXPR.logThreat("gift","faux domaine Nitro : "+h);_NXPR.saveStats();
_NXPR.toast(_NXtr("Faux lien Nitro : ")+_NXtr(h)+_NXtr(" n est pas un domaine Discord officiel."),0);}}}
}catch(_){}};

_NXV.SKEY="nexium_sessions";
_NXV.sessions=(function(){try{var r=_NXDB.get(_NXV.SKEY);var d=r?JSON.parse(r):null;return (d&&typeof d==="object")?d:{};}catch(_){return {};}})();
_NXV.onSessions=function(e){try{
if(!_NXV.cfg.sessionGuard)return;
var list=(e&&(e.sessions||e.session_infos))||null;
if(!list||!list.length)return;
var seen=_NXV.sessions||{};var news=[];
for(var a=0;a<list.length;a++){var s=list[a]||{};
var id=String(s.id_hash||s.session_id_hash||s.session_id||"");
if(!id)continue;
var cl=(s.client_info)||{};
var sig=(cl.os||"?")+" / "+(cl.client||"?")+(cl.location?(" / "+cl.location):"");
if(!seen[id]){news.push({id:id,sig:sig});}
seen[id]=sig;}
_NXV.sessions=seen;
try{_NXDB.set(_NXV.SKEY,JSON.stringify(seen));}catch(_){}
if(news.length&&_NXV._sInit){
for(var b=0;b<news.length;b++){
_NXV.log("session","nouvelle session : "+news[b].sig);
if(window._NXPR)_NXPR.toast(_NXtr("Nouvelle connexion detectee sur ton compte : ")+_NXtr(news[b].sig)+_NXtr(". Si ce n est pas toi, change ton mot de passe immediatement."),0);}}
_NXV._sInit=true;_NXV.notify();
}catch(_){}};

_NXV.RXIP=/\b(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)\b/;
_NXV.RXPHONE=/(^|[^\d\w])(?:\+\d{1,3}[ .\-]?\d(?:[ .\-]?\d){6,12}|0[1-9](?:[ .\-]?\d{2}){4})([^\d]|$)/;
_NXV.RXMAIL=/[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}/i;
_NXV.RXIBAN=/\b[A-Z]{2}\d{2}[\sA-Z0-9]{10,30}\b/;
_NXV.RXADDR=/\b\d{1,4}\s+(?:rue|avenue|av\.|boulevard|bd|impasse|chemin|allee|allée|place|route|quai)\s+[a-zà-ÿ]/i;
_NXV.RXCARD=/(^|[^\d])((?:\d{4}[ \-]){3}\d{4}|\d{16})([^\d]|$)/;
_NXV.selfScan=function(txt){try{
if(!_NXV.cfg.selfGuard)return null;
var s=String(txt||"");if(s.length<6)return null;
if(_NXV.RXCARD.test(s))return "un numero de carte bancaire";
var mib=s.match(_NXV.RXIBAN);
if(mib&&String(mib[0]).replace(/\D/g,"").length>=10)return "un IBAN";
if(_NXV.RXIP.test(s)&&!/\b(?:127\.0\.0\.1|0\.0\.0\.0|192\.168\.|10\.\d|255\.255)/.test(s))return "une adresse IP";
if(_NXV.RXADDR.test(s))return "une adresse postale";
if(_NXV.RXMAIL.test(s))return "une adresse e-mail";
var ph=s.match(_NXV.RXPHONE);
if(ph&&ph[0].replace(/\D/g,"").length>=9&&!/\d{4}-\d{2}-\d{2}/.test(s))return "un numero de telephone";
return null;}catch(_){return null;}};
_NXV.confirmSend=function(what,cb){try{
if(document.getElementById("nx-self-modal")){cb(false);return;}
var P=_NXpal;
var ov=document.createElement("div");ov.id="nx-self-modal";
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.6);backdrop-filter:blur(6px);";
var card=document.createElement("div");
card.style.cssText="width:430px;max-width:calc(100vw - 40px);background:"+P.panel+";border:1px solid "+P.line+";border-radius:20px;padding:24px;box-shadow:0 30px 80px rgba(0,0,0,.5);";
card.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Nexium Protect</div>'
+'<div style="font-size:19px;font-weight:800;color:'+P.txt+';margin-bottom:10px;">Information personnelle detectee</div>'
+'<div style="font-size:13px;color:'+P.sub+';line-height:1.6;">Ton message semble contenir <b style="color:'+P.txt+'">'+what+'</b>. Une fois envoye, tu ne peux plus le reprendre.</div>');
var row=document.createElement("div");row.style.cssText="display:flex;gap:9px;margin-top:18px;";
function mk(t,st,fn){var b=document.createElement("div");b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");b.style.cssText=st;b.textContent=_NXtr(t);b.onclick=fn;b.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();fn();}};return b;}
var close=function(ok){try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}cb(ok);};
row.appendChild(mk("Ne pas envoyer","flex:1;text-align:center;padding:12px;border-radius:11px;background:"+P.acc+";color:"+(P.light?"#fff":_NXpal.ink)+";font-size:13px;font-weight:800;cursor:pointer;",function(){close(false);}));
row.appendChild(mk("Envoyer quand meme","flex:1;text-align:center;padding:12px;border-radius:11px;background:transparent;border:1px solid "+P.line+";color:"+P.sub+";font-size:13px;font-weight:600;cursor:pointer;",function(){close(true);}));
card.appendChild(row);ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)close(false);};
if(!document.body){cb(true);return;}
document.body.appendChild(ov);
}catch(_){cb(true);}};

_NXV.RXVERIF=/(verif|verify|verification|captcha|authentif|acces|access|entrer|unlock|debloquer)/i;
_NXV.RXOAUTH=/(oauth2\/authorize|autoriser l application|authorize the app|connecte ton compte|connect your account)/i;
_NXV.guildSeen=Object.create(null);
_NXV.MASKID="nx-share-mask";
_NXV.MASKSEL={
dms:'[class*="privateChannels"],[data-list-id="private-channels"]',
names:'[class*="nameTag"],[class*="username"],[class*="usernameContainer"]',
members:'[class*="membersWrap"]',
content:'[id^="message-content-"],[class*="messageContent"]',
avatars:'[class*="avatar"] img,[class*="wrapper"] > svg foreignObject img'
};
_NXV.maskCfg=function(){try{
var raw=_NXDB.get("nexium_sharemask");var d=raw?JSON.parse(raw):null;
if(!d||typeof d!=="object")d={};
if(typeof d.auto!=="boolean")d.auto=true;
if(typeof d.dms!=="boolean")d.dms=true;
if(typeof d.names!=="boolean")d.names=true;
if(typeof d.members!=="boolean")d.members=true;
if(typeof d.content!=="boolean")d.content=false;
return d;}catch(_){return {auto:true,dms:true,names:true,members:true,content:false};}};
_NXV.mcfg=_NXV.maskCfg();
_NXV.maskSave=function(){try{_NXDB.set("nexium_sharemask",JSON.stringify(_NXV.mcfg));}catch(_){}};
_NXV.maskCount=function(){try{
var o={};for(var k in _NXV.MASKSEL){try{o[k]=document.querySelectorAll(_NXV.MASKSEL[k]).length;}catch(_){o[k]=0;}}
return o;}catch(_){return {};}};
_NXV.maskCss=function(){try{
var c=_NXV.mcfg,out=[];
if(c.dms)out.push(_NXV.MASKSEL.dms+"{filter:blur(9px)!important;}");
if(c.names)out.push(_NXV.MASKSEL.names+"{filter:blur(5px)!important;}");
if(c.members)out.push(_NXV.MASKSEL.members+"{display:none!important;}");
if(c.content)out.push(_NXV.MASKSEL.content+"{filter:blur(5px)!important;}");
out.push('#'+_NXV.MASKID+'-tag{position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:2147483000;'
+'padding:6px 14px;border-radius:99px;background:rgba(11,11,12,.92);border:1px solid #2a2a30;'
+'color:#e6c48a;font:700 11px system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;pointer-events:none;}');
return out.join("\n");}catch(_){return "";}};
_NXV.maskBascule=function(){try{
if(_NXV.maskActive){_NXV.maskOff();return false;}
_NXV.maskOn("demande");return true;}catch(_){return false;}};
_NXV.maskOn=function(why){try{
if(_NXV.maskActive)return;
_NXV.maskActive=true;
var el=document.getElementById(_NXV.MASKID);
if(!el){el=document.createElement("style");el.id=_NXV.MASKID;if(document.head)document.head.appendChild(el);}
el.textContent=_NXV.maskCss();
if(!document.getElementById(_NXV.MASKID+"-tag")&&document.body){
var t=document.createElement("div");t.id=_NXV.MASKID+"-tag";
t.textContent=_NXtr("Masque de partage actif");
document.body.appendChild(t);}
_NXV.log("masque","masque de partage active"+(why?" ("+why+")":""));
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Masque de partage actif : MP floutes, pseudos masques."),1);}catch(_){}
}catch(_){}};
_NXV.maskOff=function(){try{
if(!_NXV.maskActive)return;
_NXV.maskActive=false;
var el=document.getElementById(_NXV.MASKID);if(el&&el.parentNode)el.parentNode.removeChild(el);
var t=document.getElementById(_NXV.MASKID+"-tag");if(t&&t.parentNode)t.parentNode.removeChild(t);
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Masque de partage retire."),1);}catch(_){}
}catch(_){}};
_NXV.maskToggle=function(){try{if(_NXV.maskActive)_NXV.maskOff();else _NXV.maskOn("manuel");}catch(_){}};
_NXV.maskSet=function(k,v){try{_NXV.mcfg[k]=!!v;_NXV.maskSave();
if(_NXV.maskActive){var el=document.getElementById(_NXV.MASKID);if(el)el.textContent=_NXV.maskCss();}
if(_NXV.notify)_NXV.notify();}catch(_){}};
_NXV.EXIFGPS=0x8825;
_NXV.exifRead=function(buf){try{
var v=new DataView(buf);
if(v.byteLength<4)return null;
if(v.getUint16(0)!==0xFFD8)return {type:"non-jpeg"};
var off=2,len=v.byteLength;
while(off<len-4){
if(v.getUint8(off)!==0xFF){off++;continue;}
var marker=v.getUint8(off+1);
if(marker===0xD8||marker===0x01||(marker>=0xD0&&marker<=0xD7)){off+=2;continue;}
if(marker===0xDA)break;
var size=v.getUint16(off+2);
if(marker===0xE1){
var base=off+4;
var tag="";for(var a=0;a<4;a++)tag+=String.fromCharCode(v.getUint8(base+a));
if(tag==="Exif"){
var t0=base+6;
var le=v.getUint16(t0)===0x4949;
var ifd=v.getUint32(t0+4,le);
var p=t0+ifd;
if(p+2>len)return {exif:true};
var n=v.getUint16(p,le);p+=2;
var out={exif:true,gps:false,marque:"",modele:"",date:""};
for(var b=0;b<n&&p+12<=len;b++,p+=12){
var t=v.getUint16(p,le);
var typ=v.getUint16(p+2,le);
var cnt=v.getUint32(p+4,le);
var val=v.getUint32(p+8,le);
if(t===_NXV.EXIFGPS){out.gps=true;continue;}
if((t===0x010F||t===0x0110||t===0x0132)&&typ===2&&cnt>0&&cnt<80){
var sp=(cnt<=4)?(p+8):(t0+val),str="";
for(var c=0;c<cnt-1&&sp+c<len;c++){var ch=v.getUint8(sp+c);if(ch)str+=String.fromCharCode(ch);}
str=str.trim();
if(t===0x010F)out.marque=str;else if(t===0x0110)out.modele=str;else out.date=str;}}
return out;}}
off+=2+size;}
return {exif:false};}catch(_){return null;}};
_NXV.exifVerdict=function(info,nom){try{
if(!info)return null;
if(info.type==="non-jpeg")return null;
if(!info.exif)return null;
var why=[];
if(info.gps)why.push("des coordonnees GPS");
if(info.marque||info.modele)why.push("le modele de l appareil ("+((info.marque+" "+info.modele).trim())+")");
if(info.date)why.push("la date de prise de vue");
if(!why.length)return null;
return {grave:!!info.gps,pourquoi:why,nom:nom||"cette image"};}catch(_){return null;}};
_NXV.exifScan=function(file,cb){try{
if(!file||!file.name||!/\.(jpe?g)$/i.test(file.name)){cb&&cb(null);return;}
if(typeof FileReader!=="function"){cb&&cb(null);return;}
var fr=new FileReader();
fr.onload=function(){try{cb&&cb(_NXV.exifVerdict(_NXV.exifRead(fr.result),file.name));}catch(_){cb&&cb(null);}};
fr.onerror=function(){cb&&cb(null);};
fr.readAsArrayBuffer(file.slice(0,Math.min(file.size,262144)));
}catch(_){cb&&cb(null);}};
_NXV.uploaderMod=function(){try{
var C=(window.Vencord&&Vencord.Webpack&&Vencord.Webpack.Common)||{};
if(C.CloudUploader&&typeof C.CloudUploader.uploadFiles==="function")return C.CloudUploader;
var W=(window.Vencord&&Vencord.Webpack)||null;
if(W&&W.findByProps){var m=W.findByProps("uploadFiles");if(m&&typeof m.uploadFiles==="function")return m;}
return null;}catch(_){return null;}};
_NXV.exifReady=function(){return !!_NXV.uploaderMod();};
_NXV.wireUpload=function(){try{
if(_NXV._upWired)return;
var M=_NXV.uploaderMod();
if(!M){if((_NXV._upTry=(_NXV._upTry||0)+1)<20)setTimeout(_NXV.wireUpload,3000);return;}
if(M.uploadFiles.__nx){_NXV._upWired=true;return;}
var orig=M.uploadFiles.bind(M);
var patched=function(payload){try{
if(_NXV.cfg.selfGuard&&payload&&payload.uploads&&payload.uploads.length){
for(var a=0;a<payload.uploads.length&&a<6;a++){
var f=payload.uploads[a]&&(payload.uploads[a].item&&payload.uploads[a].item.file||payload.uploads[a].file);
if(f)_NXV.exifScan(f,function(v){try{if(!v)return;
_NXV.log("exif",v.nom+" contient "+v.pourquoi.join(", "));
if(window._NXPR){_NXPR.logThreat("exif",v.nom+" : "+v.pourquoi[0]);_NXPR.saveStats();}
_NXV.exifWarn(v);}catch(_){}});}}}catch(_){}
return orig.apply(M,arguments);};
patched.__nx=true;M.uploadFiles=patched;_NXV._upWired=true;}catch(_){}};
_NXV.exifWarn=function(v){try{
if(!v)return;
var msg=v.nom+" contient "+v.pourquoi.join(", ")+(v.grave?" — ta position exacte peut en etre deduite.":".");
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr(msg),0);}catch(_){}
try{if(window._NXAU&&_NXAU.notifSys)_NXAU.notifSys("Nexium — metadonnees d image",msg);}catch(_){}
}catch(_){}};
_NXV.officialClaim=function(name){try{
var n=String(name||"").toLowerCase();
if(!/(officiel|official|support|staff|hq|verified|verifie)/.test(n))return false;
for(var a=0;a<_NXPR.BRANDS.length;a++){if(n.indexOf(_NXPR.BRANDS[a])>=0)return true;}
return false;}catch(_){return false;}};
_NXV.guildBadge=function(g){try{
var f=(g&&(g.features||g.guildFeatures))||null;
if(!f)return "";
var has=function(x){try{
if(typeof f.has==="function")return f.has(x);
if(Array.isArray(f))return f.indexOf(x)>=0;
return !!f[x];}catch(_){return false;}};
if(has("VERIFIED"))return "verifie";
if(has("PARTNERED"))return "partenaire";
return "";}catch(_){return "";}};
_NXV.checkGuild=function(gid){try{
if(!_NXV.cfg.guildGuard||!gid)return;
if(_NXV.guildSeen[gid])return;_NXV.guildSeen[gid]=1;
var C=_NXcommon();
var GS=C.store("GuildStore"),CS=C.store("ChannelStore");
var g=GS&&GS.getGuild&&GS.getGuild(gid);
if(!g)return;
var risk=0,why=[];
try{var created=Number((BigInt(String(gid))>>22n)+1420070400000n);
var days=Math.floor((Date.now()-created)/86400000);
if(days>=0&&days<14){risk+=2;why.push("serveur cree il y a "+days+" jour"+(days>1?"s":""));}}catch(_){}
try{var mc=g.memberCount||g.member_count;
if(typeof mc==="number"&&mc<30){risk+=1;why.push("seulement "+mc+" membres");}}catch(_){}
var chans=[];
try{if(CS&&CS.getMutableGuildChannelsForGuild){var mm=CS.getMutableGuildChannelsForGuild(gid);for(var k in mm)chans.push(mm[k]);}
else if(CS&&CS.getChannels){var o=CS.getChannels(gid);if(o&&o.SELECTABLE)for(var a=0;a<o.SELECTABLE.length;a++)chans.push(o.SELECTABLE[a].channel);}}catch(_){}
var verif=0,total=0;
for(var b=0;b<chans.length;b++){var ch=chans[b];if(!ch||!ch.name)continue;total++;
if(_NXV.RXVERIF.test(String(ch.name)))verif++;
var topic=String(ch.topic||"");
if(_NXV.RXOAUTH.test(topic)){risk+=3;why.push("un salon demande une autorisation d application");}}
if(total>0&&total<=4&&verif>0){risk+=3;why.push("serveur reduit a un salon de verification");}
else if(verif>0&&total<=8){risk+=1;why.push("salon de verification present");}
try{var brand=0;var nm=String(g.name||"").toLowerCase();
for(var c=0;c<_NXPR.BRANDS.length;c++){if(nm.indexOf(_NXPR.BRANDS[c])>=0){brand=1;break;}}
if(brand){risk+=2;why.push("nom imitant une marque connue");}
try{var badge=_NXV.guildBadge(g);
if(brand&&!badge){risk+=3;why.push("aucun badge officiel malgre un nom de marque");}
if(_NXV.officialClaim(g.name)&&!badge){risk+=4;why.push("se presente comme officiel sans badge Discord");}
if(badge){risk-=3;why.push("serveur "+badge+" par Discord");}}catch(_){}
if(/nitro|giveaway|gratuit|free|airdrop|cadeau|recompense/.test(nm)){risk+=2;why.push("nom oriente arnaque");}}catch(_){}
if(risk>=4){
_NXV.log("serveur",(g.name||gid)+" - "+why.slice(0,3).join(", "));
if(window._NXPR){_NXPR.stats.scams=(_NXPR.stats.scams||0)+1;_NXPR.logThreat("guild",(g.name||gid)+" : "+why.slice(0,2).join(", "));_NXPR.saveStats();
_NXPR.toast(_NXtr("Serveur potentiellement piege : ")+(_NXtr(g.name)||_NXtr("ce serveur"))+" ("+_NXtr(why.slice(0,2).join(", "))+_NXtr("). N autorise aucune application et ne colle aucun code."),0);}}
}catch(_){}};
try{
var _og=_NXDB.get,_os=_NXDB.set;
_NXV.rawGet=function(k){try{return _og.call(_NXDB,k);}catch(_){return null;}};
_NXV.rawSet=function(k,v){try{return _os.call(_NXDB,k,v);}catch(_){return false;}};
_NXDB.get=function(k){var v=_og.call(_NXDB,k);
try{if(v&&String(v).indexOf("NXE2:")===0)return _NXV.dec(v);}catch(_){}
return v;};
_NXDB.set=function(k,v){
try{if(_NXV.cfg.encryptLocal&&_NXV.SECRET.indexOf(k)>=0)return _os.call(_NXDB,k,_NXV.enc(v));}catch(_){}
return _os.call(_NXDB,k,v);};
}catch(_){}
try{
setTimeout(function(){_NXV.scanCss();},14000);
setTimeout(function(){_NXV.loadCommunity();},9000);
setInterval(function(){if(!document.hidden)_NXV.loadCommunity();},10800000);
setTimeout(function(){_NXV.checkIntegrity();},22000);
setInterval(function(){if(!document.hidden)_NXV.scanCss();},1800000);
}catch(_){}var _NXI=window._NXI||(window._NXI={});
