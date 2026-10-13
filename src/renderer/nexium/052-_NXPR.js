if(!_NXPR.boot){_NXPR.boot=true;_NXPR.KEY="nexium_protect_v1";
_NXPR.cfg=(function(){var d;try{var raw=_NXDB.get(_NXPR.KEY);d=raw?JSON.parse(raw):null;}catch(e){d=null;}if(!d||typeof d!=="object")d={};
if(typeof d.scanLinks!=="boolean")d.scanLinks=true;if(typeof d.blockGrabbers!=="boolean")d.blockGrabbers=true;if(typeof d.scamAlerts!=="boolean")d.scamAlerts=true;if(typeof d.warnAccounts!=="boolean")d.warnAccounts=true;
// Le mode discret : les avis d ambiance se taisent, les blocages restent.
if(typeof d.discret!=="boolean")d.discret=false;if(typeof d.phishGuard!=="boolean")d.phishGuard=true;if(typeof d.consoleGuard!=="boolean")d.consoleGuard=true;if(!Array.isArray(d.allow))d.allow=[];if(typeof d.heuristics!=="boolean")d.heuristics=true;if(typeof d.hThreshold!=="number")d.hThreshold=5;if(typeof d.hBlock!=="boolean")d.hBlock=false;if(typeof d.profile!=="string")d.profile="equilibre";
if(typeof d.scanFiles!=="boolean")d.scanFiles=true;
if(typeof d.scanDownloads!=="boolean")d.scanDownloads=true;
if(typeof d.scanInvites!=="boolean")d.scanInvites=true;
if(typeof d.scanImpostor!=="boolean")d.scanImpostor=true;
if(typeof d.scanWaves!=="boolean")d.scanWaves=true;
if(typeof d.scanMasked!=="boolean")d.scanMasked=true;
if(typeof d.scanEmbeds!=="boolean")d.scanEmbeds=true;
if(typeof d.scanEdits!=="boolean")d.scanEdits=true;
if(typeof d.scanStatus!=="boolean")d.scanStatus=true;
if(typeof d.qrGuard!=="boolean")d.qrGuard=true;
if(typeof d.clipGuard!=="boolean")d.clipGuard=true;
if(typeof d.noRegistry!=="boolean")d.noRegistry=false;
if(typeof d.oauthGuard!=="boolean")d.oauthGuard=true;
if(typeof d.schemeGuard!=="boolean")d.schemeGuard=true;
if(typeof d.bidiGuard!=="boolean")d.bidiGuard=true;
if(typeof d.ipGuard!=="boolean")d.ipGuard=true;
if(typeof d.codeGuard!=="boolean")d.codeGuard=true;
if(typeof d.unicodeGuard!=="boolean")d.unicodeGuard=true;
if(typeof d.cryptoGuard!=="boolean")d.cryptoGuard=true;
if(typeof d.dmLinkGuard!=="boolean")d.dmLinkGuard=false;
if(typeof d.leakGuard!=="boolean")d.leakGuard=true;
if(typeof d.raidGuard!=="boolean")d.raidGuard=true;
if(typeof d.nameGuard!=="boolean")d.nameGuard=true;if(typeof d.maskLinks!=="boolean")d.maskLinks=true;if(typeof d.maskSuspect!=="boolean")d.maskSuspect=false;d.qrLoginGuard=false;d.passkeyGuard=false;
return d;})();
_NXPR.reload=function(){try{var r=_NXDB.get(_NXPR.KEY);if(r)_NXPR.cfg=JSON.parse(r);var s=_NXDB.get(_NXPR.KEY+"_stats");if(s)_NXPR.stats=JSON.parse(s);_NXPR.notify();}catch(_){}};
_NXPR.saveCfg=function(){try{_NXDB.set(_NXPR.KEY,JSON.stringify(_NXPR.cfg));}catch(_){}};_NXPR.saveCfg();
_NXPR.stats=(function(){var d;try{var raw=_NXDB.get(_NXPR.KEY+"_stats");d=raw?JSON.parse(raw):null;}catch(e){d=null;}if(!d)d={};if(typeof d.scanned!=="number")d.scanned=0;if(typeof d.blocked!=="number")d.blocked=0;if(typeof d.scams!=="number")d.scams=0;if(typeof d.accounts!=="number")d.accounts=0;if(typeof d.safe!=="number")d.safe=0;
if(typeof d.oauth!=="number")d.oauth=0;if(typeof d.scheme!=="number")d.scheme=0;
if(typeof d.bidi!=="number")d.bidi=0;if(typeof d.rawip!=="number")d.rawip=0;if(typeof d.code!=="number")d.code=0;
if(!Array.isArray(d.recent))d.recent=[];return d;})();
_NXPR.saveStats=function(){try{_NXDB.set(_NXPR.KEY+"_stats",JSON.stringify(_NXPR.stats));}catch(_){}};
_NXPR.listeners=[];_NXPR.notify=function(){for(var a=0;a<_NXPR.listeners.length;a++){try{_NXPR.listeners[a]();}catch(_){}}};
_NXPR.blockedPrompt=function(url,cl){try{
if(document.getElementById("nx-blocked-modal"))return;
var ov=document.createElement("div");ov.id="nx-blocked-modal";
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.62);backdrop-filter:blur(6px);";
var card=document.createElement("div");
card.style.cssText="width:420px;max-width:calc(100vw - 40px);background:"+_NXpal.panel+";border:1px solid #3a2626;border-radius:20px;padding:24px;box-shadow:0 30px 80px rgba(0,0,0,.55);";
var kind=(cl&&cl.kind==="download")?("telechargement direct "+((cl.ext||"").toUpperCase())):(cl&&cl.kind==="grabber"?"logger d IP (doxxing)":(cl&&cl.kind==="punycode"?"domaine trompeur":"hameconnage"));
var esc=function(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
var P0=_NXpal;
card.innerHTML=_NXtrHtml('<div style="display:flex;align-items:center;gap:11px;margin-bottom:14px;"><div style="width:38px;height:38px;border-radius:12px;background:#d6484a;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:20px;flex-shrink:0;">!</div><div><div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#8a8a92;">Nexium Protect</div><div style="font-size:19px;font-weight:800;color:#f4f4f5;">Lien bloqué</div></div></div>'
+'<div style="font-size:13px;color:#b8b8be;line-height:1.6;margin-bottom:12px;">Ce lien a été identifié comme <b>'+kind+'</b>. Il peut voler ton adresse IP ou tes identifiants.</div>'
+'<div style="font-size:11px;color:'+P0.dim+';background:'+P0.inset+';border:1px solid '+P0.line+';border-radius:10px;padding:10px 12px;margin-bottom:18px;font-family:monospace;word-break:break-all;line-height:1.5;">'+esc(String(url).slice(0,160))+'</div>');
var row=document.createElement("div");row.style.cssText="display:flex;gap:9px;flex-wrap:wrap;";
function mk(txt,style,fn){var b=document.createElement("div");b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");b.style.cssText=style;b.textContent=_NXtr(txt);b.onclick=fn;b.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();fn();}};return b;}
var close=function(){try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}};
row.appendChild(mk("Ne pas ouvrir","flex:1.4;text-align:center;padding:12px;border-radius:11px;background:#e8e8ea;color:#0a0a0a;font-size:13px;font-weight:800;cursor:pointer;",close));
row.appendChild(mk("Ouvrir quand même","flex:1;text-align:center;padding:12px;border-radius:11px;background:transparent;border:1px solid #3a2626;color:#e79a9a;font-size:12px;font-weight:700;cursor:pointer;",function(){close();try{if(typeof VencordNative!=="undefined"&&VencordNative.native&&VencordNative.native.openExternal)VencordNative.native.openExternal(url);else if(window.VencordNative&&window.VencordNative.native)window.VencordNative.native.openExternal(url);}catch(_){}}));
row.appendChild(mk("Voir sans ouvrir","flex:1 0 100%;text-align:center;padding:10px;border-radius:11px;background:transparent;border:1px solid #26262b;color:#9a9aa0;font-size:12px;font-weight:600;cursor:pointer;",function(){close();try{_NXPR.sbxModale(url);}catch(_){}}));
if(cl&&cl.host)row.appendChild(mk("Signaler cette menace","flex:1 0 100%;text-align:center;padding:10px;border-radius:11px;background:transparent;border:1px solid #26262b;color:#9a9aa0;font-size:12px;font-weight:600;cursor:pointer;",function(){close();_NXPR.reportPrompt(cl);}));
if(cl&&cl.host)row.appendChild(mk("Toujours autoriser "+cl.host,"flex:1 0 100%;text-align:center;padding:10px;border-radius:11px;background:transparent;border:1px solid #26262b;color:#9a9aa0;font-size:12px;font-weight:600;cursor:pointer;",function(){_NXPR.allowHost(cl.host);close();try{if(typeof VencordNative!=="undefined"&&VencordNative.native&&VencordNative.native.openExternal)VencordNative.native.openExternal(url);}catch(_){}}));
card.appendChild(row);ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)close();};
if(document.body)document.body.appendChild(ov);
try{if(window._NXV&&cl&&cl.host){
var _sh=function(n){try{if(!n||n<2)return;
var bb=document.createElement("div");
bb.style.cssText="margin-top:12px;padding:10px 12px;border-radius:10px;background:rgba(214,72,72,.12);border:1px solid rgba(214,72,72,.28);font-size:12px;color:#e6b0b0;font-weight:600;";
bb.textContent=_NXtr(n)+_NXtr(" personnes ont deja signale ce lien.");
if(card&&card.appendChild)card.appendChild(bb);}catch(_){}};
if(cl.comm&&cl.comm>=2)_sh(cl.comm);else _NXV.askHost(cl.host,_sh);}}catch(_){}
}catch(_){}};
_NXPR.TOASTCSS=["@keyframes nxAvIn{from{opacity:0;transform:translate3d(0,14px,0) scale(.97)}to{opacity:1;transform:none}}","@keyframes nxAvOut{from{opacity:1;transform:none}to{opacity:0;transform:translate3d(0,10px,0) scale(.98)}}","#nx-avert{position:fixed;left:50%;bottom:26px;transform:translateX(-50%);z-index:99998;","display:flex;flex-direction:column;align-items:center;gap:8px;pointer-events:none;max-width:min(560px,calc(100vw - 40px))}","#nx-avert .nx-av{pointer-events:auto;display:flex;align-items:flex-start;gap:11px;padding:12px 15px;border-radius:13px;","background:rgba(14,14,17,.97);border:1px solid #26262b;box-shadow:0 18px 44px rgba(0,0,0,.5);","font-size:12.5px;line-height:1.55;color:#e4e4e8;animation:nxAvIn .34s cubic-bezier(.16,1,.3,1) both;cursor:pointer}","#nx-avert .nx-av.nx-out{animation:nxAvOut .22s ease forwards}","#nx-avert .nx-av i{flex-shrink:0;width:7px;height:7px;border-radius:50%;margin-top:6px;background:#8a8a92}","#nx-avert .nx-av.nx-d i{background:#d6484a}#nx-avert .nx-av.nx-d{border-color:#3a2626}","#nx-avert .nx-av.nx-w i{background:#e6c48a}#nx-avert .nx-av.nx-o i{background:#8fd19e}","#nx-avert .nx-av b{display:block;font-size:9.5px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#6c6c74;margin-bottom:3px}","@media (prefers-reduced-motion: reduce){#nx-avert .nx-av{animation:none}}"].join("");_NXPR.toastDom=function(m,type){try{if(!document||!document.body)return false;if(!document.getElementById("nx-avert-style")){var st=document.createElement("style");st.id="nx-avert-style";st.textContent=_NXtr(_NXPR.TOASTCSS);(document.head||document.body).appendChild(st);}var box=document.getElementById("nx-avert");if(!box){box=document.createElement("div");box.id="nx-avert";box.setAttribute("role","status");box.setAttribute("aria-live","polite");document.body.appendChild(box);}while(box.childNodes.length>3){try{box.removeChild(box.firstChild);}catch(_){break;}}var cls=(type===0)?"nx-d":(type===1?"nx-o":(type===2?"nx-w":"nx-w"));var el=document.createElement("div");el.className="nx-av "+cls;var pt=document.createElement("i");el.appendChild(pt);var txt=document.createElement("div");var tit=document.createElement("b");tit.textContent=(type===0)?_NXtr("Nexium - danger"):_NXtr("Nexium");txt.appendChild(tit);var cor=document.createElement("span");cor.textContent=_NXtr(String(m||""));txt.appendChild(cor);el.appendChild(txt);var vif=(type===0);var pars=function(){try{if(el.parentNode){el.className+=" nx-out";setTimeout(function(){try{if(el.parentNode)el.parentNode.removeChild(el);}catch(_){}},230);}}catch(_){}};el.onclick=pars;box.appendChild(el);setTimeout(pars,vif?12000:6500);_NXPR.toastVoie="nexium";_NXPR.toastN=(_NXPR.toastN||0)+1;_NXPR.toastLast=Date.now();return true;}catch(_){return false;}};_NXPR.toastDiscord=function(m,type){try{var C=_NXcommon().C;if(!C||!C.Toasts||typeof C.Toasts.show!=="function"||typeof C.Toasts.genId!=="function")return false;C.Toasts.show({message:m,id:C.Toasts.genId(),type:(type!=null?type:2),options:{position:C.Toasts.Position?C.Toasts.Position.BOTTOM:1}});_NXPR.toastVoie="discord";_NXPR.toastN=(_NXPR.toastN||0)+1;_NXPR.toastLast=Date.now();return true;}catch(_){return false;}};_NXPR.toast=function(m,type){try{m=_NXtr(m);}catch(_){}try{if(window._NXREG&&_NXREG.tait&&_NXREG.tait(type))return true;}catch(_){}try{if(window._NXPRV&&_NXPRV.muet){_NXPRV.avertis.push(String(m));return true;}}catch(_){}try{if(_NXPR.toastForce!=="dom"&&_NXPR.toastDiscord(m,type))return true;}catch(_){}try{return _NXPR.toastDom(m,type);}catch(_){}try{console.warn("[Nexium]",m);}catch(_){}return false;};
_NXPR.GRABBERS=["grabify.link","grabify.icu","grabify","iplogger.org","iplogger.com","iplogger.ru","iplogger.co","iplogger.io","iplogger.info","iploggers.com","2no.co","iplis.ru","yip.su","blasze.tk","blasze.com","ps3cfw.com","02ip.ru","ipgrabber.ru","ipgraber.ru","lovebird.guru","catsnthings.fun","catsnthing.com","dogesec.com","curiouscat.club","joinmy.site","bmwforum.co","leancoding.co","spottyfly.com","stopify.co","yotoo.co","gaming-at-home.com","freegiftcards.co","screenshot.host","imgvid.com","imgur.com.re","quickmessage.us","trackurl.com","whatstheirip.com","urlto.me","urlz.fr","ipgrab.io","grabip.net","ipgun.net","ip-tracker.org","1o.gl","c.grabify.link","fortnight.space","fortnitchat.site","freegiftcards.co","headshot.monster","opple.info","1337.plus","ps5cfw.com","xn--iplogger","yandex-team.co","discörd.com","grabifyip.com"];
_NXPR.SHORTENERS=["bit.ly","tinyurl.com","cutt.ly","rebrand.ly","is.gd","t.co","goo.gl","ow.ly","shorturl.at","rb.gy","tiny.cc","t.ly","short.io","soo.gd","clck.ru","v.gd","x.co","po.st","qr.ae","1url.com","adf.ly","shorte.st","bc.vc","linktr.ee","lnkd.in","tr.im","u.to","cutt.us","short.gy"];
_NXPR.SCAM=[/free\s*nitro/i,/nitro\s*(gift|free|giveaway)/i,/discord\s*nitro.*(claim|free|gift)/i,/steam\s*(gift|community).*(nitro|free)/i,/claim\s*your\s*(free|prize|nitro|gift)/i,/(you|u)\s*(won|win)\s/i,/airdrop/i,/double\s*your\s*(crypto|btc|eth|money)/i,/(free|1000)\s*(robux|vbucks|v-bucks)/i,/@everyone.*(free|nitro|gift|claim)/i,/gift.*discord.*\/nitro/i,/verify.*(wallet|seed|phrase)/i,/(login|connect).*(qr|scan).*(discord|token)/i];
_NXPR.host=function(u){try{return new URL(u).hostname.toLowerCase().replace(/^www\./,"");}catch(_){return "";}};
_NXPR.suffixe=function(h,d){try{
if(!h||!d)return false;
if(h===d)return true;
var n=d.length+1;
return h.length>n-1&&h.slice(-n)==="."+d;}catch(_){return false;}};
_NXPR.isAllowed=function(h){try{
if(!h)return false;
var L=_NXPR.cfg.allow||[];
for(var a=0;a<L.length;a++){if(_NXPR.suffixe(h,L[a]))return true;}}catch(_){}
return false;};
_NXPR.allowHost=function(h){try{if(!h)return;if(!Array.isArray(_NXPR.cfg.allow))_NXPR.cfg.allow=[];if(_NXPR.cfg.allow.indexOf(h)<0)_NXPR.cfg.allow.push(h);_NXPR.cache=Object.create(null);_NXPR.cacheN=0;_NXPR.saveCfg();try{_NXPR.masqueRefaire();}catch(_){}_NXPR.notify();}catch(_){}};
_NXPR.unallowHost=function(h){try{setTimeout(function(){try{_NXPR.masqueRefaire();}catch(_){}},0);_NXPR.cfg.allow=(_NXPR.cfg.allow||[]).filter(function(x){return x!==h;});_NXPR.cache=Object.create(null);_NXPR.cacheN=0;_NXPR.saveCfg();_NXPR.notify();}catch(_){}};
_NXPR.removeThreat=function(idx){try{_NXPR.stats.recent.splice(idx,1);_NXPR.saveStats();_NXPR.notify();}catch(_){}};
_NXPR.clearThreats=function(){try{_NXPR.stats.recent=[];_NXPR.saveStats();_NXPR.notify();}catch(_){}};
_NXPR.BLOCKLIST_URL="https://raw.githubusercontent.com/Omega-devj/blacklist-url-nexium-client/refs/heads/main/blocklist.txt";
_NXPR.idxG=null;_NXPR.idxS=null;_NXPR.remote={n:0,at:0};
_NXPR.buildIndex=function(){try{
var g=Object.create(null),s=Object.create(null),a;
for(a=0;a<_NXPR.GRABBERS.length;a++){var gd=String(_NXPR.GRABBERS[a]||"").toLowerCase();if(gd&&gd.indexOf(".")>0)g[gd]=1;else if(gd)g[gd]=2;}
for(a=0;a<_NXPR.SHORTENERS.length;a++){var sd=String(_NXPR.SHORTENERS[a]||"").toLowerCase();if(sd)s[sd]=1;}
_NXPR.idxG=g;_NXPR.idxS=s;_NXPR.cache=Object.create(null);_NXPR.cacheN=0;
}catch(_){_NXPR.idxG=Object.create(null);_NXPR.idxS=Object.create(null);}};
_NXPR.hit=function(h,idx){try{var p=h;var guard=0;while(p&&guard<8){
if(idx[p])return true;
if(idx===_NXPR.idxG&&_NXPR.dansR(p))return true;
var k=p.indexOf(".");if(k<0)break;p=p.slice(k+1);guard++;}}catch(_){}return false;};
_NXPR.CHANNEL="1532064749662109850";
_NXPR.rep=(function(){var d;try{var r=_NXDB.get("nexium_reports");d=r?JSON.parse(r):null;}catch(e){d=null;}
if(!d||typeof d!=="object")d={};if(!Array.isArray(d.sent))d.sent=[];if(typeof d.last!=="number")d.last=0;if(typeof d.total!=="number")d.total=0;if(!Array.isArray(d.queue))d.queue=[];return d;})();
_NXPR.saveRep=function(){try{_NXDB.set("nexium_reports",JSON.stringify(_NXPR.rep));}catch(_){}};
_NXPR.canReport=function(host){var n=Date.now();
var last=_NXPR.rep.last||0;
if(n-last<7200000){var mins=Math.ceil((7200000-(n-last))/60000);
return {ok:false,why:"Un seul signalement toutes les 2 h. Reessaie dans "+mins+" min."};}
for(var a=0;a<_NXPR.rep.sent.length;a++){if(_NXPR.rep.sent[a].h===host)return {ok:false,why:"Tu as deja signale ce domaine."};}
return {ok:true};};
_NXPR.nextSlotMin=function(){try{var n=Date.now(),last=_NXPR.rep.last||0;
if(n-last>=7200000)return 0;return Math.ceil((7200000-(n-last))/60000);}catch(_){return 0;}};
_NXPR.kindFr=function(k){if(k==="unicode")return "Caracteres invisibles";if(k==="crypto")return "Adresse de portefeuille";if(k==="clipper")return "Detournement de portefeuille";if(k==="leak")return "Fuite de webhook";if(k==="dmlink")return "Lien prive d un inconnu";if(k==="raid")return "Vague coordonnee";if(k==="nom")return "Nom de fichier truque";if(k==="download")return "Telechargement dangereux";return k==="grabber"?"Logger d IP / doxxing":k==="phish"?"Hameconnage":k==="punycode"?"Domaine trompeur":k==="short"?"Lien raccourci":k==="suspect"?"Suspect (heuristique)":k==="scam"?"Message d arnaque":k==="file"?"Fichier dangereux":k==="secret"?"Fuite de secret":k==="account"?"Compte suspect":k==="selfxss"?"Arnaque console":(k||"Inconnu");};
_NXPR.buildReport=function(entry,note){
var host=(entry&&(entry.host||entry.d))||"";
var kind=(entry&&(entry.k||entry.kind))||"suspect";
var L=[];
L.push("**Signalement Nexium Protect**");
L.push("Domaine : `"+String(host).slice(0,180).replace(/`/g,"'")+"`");
L.push("Type : "+_NXPR.kindFr(kind));
L.push("Detection : "+((entry&&entry.heur)?"heuristique":"base de menaces"));
if(entry&&entry.score)L.push("Score : "+entry.score);
if(entry&&entry.resolved)L.push("Redirige vers : `"+String(entry.resolved).slice(0,150).replace(/`/g,"'")+"`");
if(entry&&entry.why&&entry.why.length)L.push("Motifs : "+entry.why.slice(0,3).join(" ; ").slice(0,300));
if(note)L.push("Note : "+String(note).slice(0,300).replace(/`/g,"'"));
L.push("_Nexium v"+_NXUP.VERSION+"_");
return L.join("\n");};
_NXPR.API="https://emcoqnvxriyrchmfpunq.supabase.co/functions/v1/report";
_NXPR.CKEY="sb_publishable_mhLyot9Dv_VCtWpCbYpngg_evMB79C3";
_NXPR.installId=function(){try{
var v=_NXDB.get("nexium_install");
if(v&&v.length>=8)return v;
var s="nx";var chars="abcdefghijklmnopqrstuvwxyz0123456789";
for(var a=0;a<22;a++)s+=chars.charAt(Math.floor(Math.random()*chars.length));
_NXDB.set("nexium_install",s);return s;}catch(_){return "nx000000000000000000000000";}};
_NXPR.me=function(){try{var u=_NXcommon().store("UserStore").getCurrentUser();
if(u&&u.id)return {id:String(u.id),name:String(u.globalName||u.global_name||u.username||"")};}catch(_){}return null;};
_NXPR.sendVia=function(entry,note,cb){try{
var who=_NXPR.me();
var payload={
reporter_id:who?who.id:null,
reporter_name:who?who.name:null,
install:_NXPR.installId(),
host:(entry&&(entry.host||entry.d))||"",
kind:(entry&&(entry.k||entry.kind))||"other",
score:(entry&&entry.score)||null,
resolved:(entry&&entry.resolved)||null,
reasons:(entry&&entry.why&&entry.why.length)?entry.why.slice(0,4).join(" ; "):null,
note:note||null,
version:_NXUP.VERSION};
_NXNETX.go(_NXPR.API,{method:"POST",headers:{"Content-Type":"application/json","x-nexium-key":_NXPR.CKEY,"apikey":_NXPR.CKEY,"Authorization":"Bearer "+_NXPR.CKEY},body:JSON.stringify(payload)})
.then(function(r){return r.json().then(function(j){return {s:r.status,j:j};}).catch(function(){return {s:r.status,j:null};});})
.then(function(o){
if(o.j&&o.j.ok===true){cb(true,(o.j.relayed?"relaye":"enregistre"),0,o.j);return;}
cb(false,"refus",o.s,o.j);})
.catch(function(){cb(false,"reseau",0,null);});
}catch(_){cb(false,"erreur",0,null);}};
_NXPR.explain=function(st,j){
try{if(j&&j.reason)return String(j.reason);}catch(_){}
if(st===401)return "cle client refusee";
if(st===429)return "limite de signalements atteinte";
if(st===0)return "serveur de signalement injoignable";
if(st>=500)return "erreur du serveur de signalement";
return "signalement refuse";};
_NXPR.queueAdd=function(entry,note){try{
_NXPR.rep.queue=_NXPR.rep.queue||[];
_NXPR.rep.queue.push({e:entry,n:note||"",t:Date.now(),tries:0});
if(_NXPR.rep.queue.length>20)_NXPR.rep.queue=_NXPR.rep.queue.slice(-20);
_NXPR.saveRep();_NXPR.notify();}catch(_){}};
_NXPR.queueFlush=function(){try{
var q=_NXPR.rep.queue||[];if(!q.length||_NXPR.flushing)return;
_NXPR.flushing=true;var item=q[0];
_NXPR.sendVia(item.e,item.n,function(ok,via,st,j){
_NXPR.flushing=false;
if(ok){_NXPR.rep.queue.shift();_NXPR.rep.total=(_NXPR.rep.total||0)+1;
_NXPR.rep.sent.unshift({h:(item.e&&(item.e.host||item.e.d))||"",t:Date.now(),via:via});
if(_NXPR.rep.sent.length>60)_NXPR.rep.sent=_NXPR.rep.sent.slice(0,60);
_NXPR.rep.lastErr=null;_NXPR.saveRep();_NXPR.notify();
if((_NXPR.rep.queue||[]).length)setTimeout(_NXPR.queueFlush,5000);}
else{item.tries=(item.tries||0)+1;_NXPR.rep.lastErr=_NXPR.explain(st,j);
if(item.tries>=6||(j&&j.reason&&/deja signale/.test(String(j.reason))))_NXPR.rep.queue.shift();
_NXPR.saveRep();_NXPR.notify();}});
}catch(_){_NXPR.flushing=false;}};
_NXPR.report=function(entry,note,cb){try{
var host=(entry&&(entry.host||entry.d))||"";
var chk=_NXPR.canReport(host);
if(!chk.ok){_NXPR.toast(_NXtr(chk.why),1);cb&&cb(false);return;}
_NXPR.sending=true;_NXPR.notify();
_NXPR.sendVia(entry,note,function(ok,via,st,j){
_NXPR.sending=false;
if(ok){_NXPR.rep.last=Date.now();_NXPR.rep.total=(_NXPR.rep.total||0)+1;
_NXPR.rep.sent.unshift({h:host,t:Date.now(),via:via});
if(_NXPR.rep.sent.length>60)_NXPR.rep.sent=_NXPR.rep.sent.slice(0,60);
_NXPR.rep.lastErr=null;_NXPR.saveRep();
var others=(j&&typeof j.others==="number")?j.others:0;
_NXPR.toast(_NXtr("Menace signalee")+(others>0?(_NXtr(" - deja signalee par ")+_NXtr(others)+_NXtr(" autre(s) utilisateur(s)")):"")+_NXtr(". Merci !"),1);}
else{_NXPR.rep.lastErr=_NXPR.explain(st,j);
var perm=(st===429&&j&&j.reason&&/deja signale|limite|2 h/.test(String(j.reason)));if(perm)_NXPR.rep.last=Date.now();
if(!perm)_NXPR.queueAdd(entry,note);
_NXPR.saveRep();
_NXPR.toast(_NXtr("Signalement non transmis : ")+_NXPR.explain(st,j)+(perm?"":_NXtr(" - reessai automatique.")),0);}
_NXPR.notify();cb&&cb(ok);});
}catch(_){cb&&cb(false);}};
_NXPR.reportPrompt=function(entry){try{
if(document.getElementById("nx-report-modal"))return;
var P=_NXpal;var host=(entry&&(entry.host||entry.d))||"";
var ov=document.createElement("div");ov.id="nx-report-modal";
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,"+(P.light?".3":".62")+");backdrop-filter:blur(6px);";
var card=document.createElement("div");
card.style.cssText="width:430px;max-width:calc(100vw - 40px);background:"+(P.light?_NXpal.acc:"linear-gradient(165deg,#121214,#0b0b0c)")+";border:1px solid "+P.line+";border-radius:20px;padding:24px;box-shadow:0 30px 80px rgba(0,0,0,.5);";
var esc=function(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
var _w=_NXPR.me();var noPerso=_w?("ton compte Discord ("+_w.id+") sera visible dans le signalement"):"compte Discord non identifie";
card.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Nexium Protect</div>'
+'<div style="font-size:20px;font-weight:800;color:'+P.txt+';margin-bottom:10px;">Signaler cette menace</div>'
+'<div style="font-size:12.5px;color:'+P.sub+';line-height:1.6;margin-bottom:13px;">Le domaine sera publie dans le salon de signalement du serveur Nexium, depuis ton compte.</div>'
+'<div style="font-size:11.5px;color:'+P.dim+';font-family:monospace;background:'+(P.light?_NXpal.acc:_NXpal.panel)+';border:1px solid '+P.line+';border-radius:10px;padding:10px 12px;margin-bottom:6px;word-break:break-all;">'+esc(host.slice(0,120))+'</div>'
+'<div style="font-size:11px;color:'+P.faint+';margin-bottom:14px;">Type : '+esc(_NXPR.kindFr((entry&&(entry.k||entry.kind))||"suspect"))+' - '+noPerso+'</div>');
var ta=document.createElement("textarea");
ta.placeholder=_NXtr("Contexte (facultatif) : ou l as-tu vu ?");
ta.style.cssText="width:100%;box-sizing:border-box;height:64px;resize:none;background:"+(P.light?_NXpal.acc:_NXpal.panel)+";border:1px solid "+P.line+";border-radius:10px;padding:10px 12px;color:"+P.txt+";font-size:12.5px;outline:none;font-family:inherit;margin-bottom:14px;";
card.appendChild(ta);
var row=document.createElement("div");row.style.cssText="display:flex;gap:9px;";
function mk(t,st,fn){var b=document.createElement("div");b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");b.style.cssText=st;b.textContent=_NXtr(t);b.onclick=fn;b.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();fn();}};return b;}
var close=function(){try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}};
row.appendChild(mk("Annuler","flex:1;text-align:center;padding:12px;border-radius:11px;background:transparent;border:1px solid "+P.line+";color:"+P.sub+";font-size:13px;font-weight:600;cursor:pointer;",close));
var sb=mk("Envoyer","flex:1.5;text-align:center;padding:12px;border-radius:11px;background:"+P.acc+";color:"+(P.light?"#fff":_NXpal.ink)+";font-size:13px;font-weight:800;cursor:pointer;",function(){sb.textContent=_NXtr("Envoi...");_NXPR.report(entry,ta.value,function(){close();});});
row.appendChild(sb);card.appendChild(row);ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)close();};
if(document.body)document.body.appendChild(ov);
try{ta.focus();}catch(_){}
}catch(_){}};
_NXPR.ALLOWLIST_URL="https://raw.githubusercontent.com/Omega-devj/blacklist-url-nexium-client/refs/heads/main/allowlist.txt";
_NXPR.remoteAllow=null;_NXPR.allowRemote={n:0,at:0};
_NXPR.loadAllow=function(){try{
_NXNETX.go(_NXPR.ALLOWLIST_URL+"?nx="+Date.now(),{cache:"no-store"}).then(function(r){if(!r||!r.ok)throw 0;return r.text();}).then(function(t){
var L=_NXPR.parseList(t);var m=Object.create(null);for(var a=0;a<L.length;a++)m[L[a]]=1;
_NXPR.remoteAllow=m;_NXPR.allowRemote={n:L.length,at:Date.now()};
try{_NXNETX.ok("allow");}catch(_){}
try{_NXDB.set("nexium_allowlist",JSON.stringify({at:Date.now(),txt:L.join("\n")}));}catch(_){}
_NXPR.cache=Object.create(null);_NXPR.cacheN=0;_NXPR.notify();
}).catch(function(){try{var r=_NXDB.get("nexium_allowlist");if(r){var j=JSON.parse(r);var L2=String(j.txt||"").split("\n");var m2=Object.create(null);for(var b=0;b<L2.length;b++)if(L2[b])m2[L2[b]]=1;_NXPR.remoteAllow=m2;_NXPR.allowRemote={n:L2.length,at:j.at,stale:true};}}catch(_){}
try{_NXNETX.retry("allow",_NXPR.loadAllow);}catch(_){}});
}catch(_){}};
_NXPR.TLDRISK={"tk":1,"ml":1,"ga":1,"cf":1,"gq":1,"top":1,"xyz":1,"click":1,"link":1,"rest":1,"cyou":1,"icu":1,"sbs":1,"cfd":1,"quest":1,"monster":1,"buzz":1,"work":1,"fit":1,"loan":1,"mom":1,"lol":1,"beauty":1,"skin":1,"bond":1};
_NXPR.FREEHOST=["pages.dev","workers.dev","web.app","firebaseapp.com","netlify.app","glitch.me","repl.co","replit.app","weebly.com","blogspot.com","github.io","000webhostapp.com","wixsite.com","herokuapp.com","vercel.app","surge.sh","gitbook.io","framer.app","carrd.co","notion.site","itch.io","serveo.net","ngrok.io","ngrok-free.app","trycloudflare.com"];
_NXPR.OFFICIAL={"steamcommunity.com":1,"steampowered.com":1,"valvesoftware.com":1,"steamstatic.com":1,"roblox.com":1,"rbxcdn.com":1,"epicgames.com":1,"unrealengine.com":1,"fortnite.com":1,"paypal.com":1,"paypal.me":1,"paypalobjects.com":1,"playvalorant.com":1,"riotgames.com":1,"leagueoflegends.com":1,"minecraft.net":1,"mojang.com":1,"twitch.tv":1,"twitchcdn.net":1,"jtvnw.net":1,"telegram.org":1,"t.me":1,"telegram.me":1,"binance.com":1,"metamask.io":1,"opensea.io":1,"coinbase.com":1,"nitrado.net":1};
_NXPR.isOfficial=function(h){try{return _NXPR.hit(h,_NXPR.OFFICIAL);}catch(_){return false;}};
_NXPR.BRANDS=["discord","steam","nitro","roblox","epicgames","fortnite","paypal","valorant","riotgames","minecraft","twitch","telegram","binance","metamask","opensea","coinbase"];
_NXPR.heuristic=function(url,h){try{
var score=0,why=[];
if(_NXPR.isOfficial(h))return {score:0,why:[],official:true};
var parts=h.split(".");var tld=parts[parts.length-1];
if(_NXPR.TLDRISK[tld]){score+=2;why.push("extension ."+tld+" souvent utilisee pour l arnaque");}
var brand=null,subst=false;
for(var a=0;a<_NXPR.BRANDS.length;a++){var b=_NXPR.BRANDS[a];
if(h.indexOf(b)>=0){brand=b;break;}
var loose=b.replace(/o/g,"[o0]").replace(/i/g,"[i1l]").replace(/e/g,"[e3]").replace(/a/g,"[a4]").replace(/s/g,"[s5]");
try{if(new RegExp(loose).test(h)){brand=b;subst=true;break;}}catch(_){}}
if(subst){score+=3;why.push("imite la marque "+brand+" avec des caracteres substitues");}
if(brand&&!_NXPR.RXREAL.test(h)){
var onFree=false;for(var f=0;f<_NXPR.FREEHOST.length;f++){if(h.indexOf(_NXPR.FREEHOST[f])>=0){onFree=true;break;}}
if(onFree){score+=4;why.push("page "+brand+" hebergee sur un service gratuit");}
else if(!subst){score+=2;why.push("contient la marque "+brand+" sans etre un domaine officiel");}}
var sub=parts.slice(0,-2).join(".");
if(sub.length>28){score+=1;why.push("sous-domaine anormalement long");}
if((h.match(/-/g)||[]).length>=4){score+=1;why.push("nombre inhabituel de tirets");}
if(/\d{5,}/.test(h)){score+=1;why.push("longue suite de chiffres dans le domaine");}
var low=String(url||"").toLowerCase();
if(/(login|signin|verify|verification|claim|free-?nitro|gift|giveaway|airdrop|connect-?wallet|seed-?phrase)/.test(low)){score+=2;why.push("mots-cles d hameconnage dans l adresse");}
return {score:score,why:why};}catch(_){return {score:0,why:[]};}};
var _NXPall={scanFiles:true,scanDownloads:true,scanInvites:true,scanImpostor:true,scanWaves:true,scanMasked:true,scanEmbeds:true,scanEdits:true,scanStatus:true,qrGuard:true,clipGuard:true,oauthGuard:true,schemeGuard:true,bidiGuard:true,ipGuard:true,codeGuard:true};
var _NXPmin={scanFiles:true,scanDownloads:true,scanInvites:false,scanImpostor:false,scanWaves:false,scanMasked:true,scanEmbeds:false,scanEdits:false,scanStatus:false,qrGuard:true,clipGuard:false,oauthGuard:true,schemeGuard:true,bidiGuard:false,ipGuard:true,codeGuard:true};
_NXPR.PROFILES={
strict:Object.assign({scanLinks:true,blockGrabbers:true,phishGuard:true,scamAlerts:true,warnAccounts:true,consoleGuard:true,heuristics:true,hThreshold:3,hBlock:true,maskLinks:true,maskSuspect:true},_NXPall),
equilibre:Object.assign({scanLinks:true,blockGrabbers:true,phishGuard:true,scamAlerts:true,warnAccounts:true,consoleGuard:true,heuristics:true,hThreshold:5,hBlock:false,maskLinks:true,maskSuspect:false},_NXPall),
minimal:Object.assign({scanLinks:true,blockGrabbers:true,phishGuard:true,scamAlerts:false,warnAccounts:false,consoleGuard:false,heuristics:false,hThreshold:6,hBlock:false,maskLinks:false,maskSuspect:false},_NXPmin)};
_NXPR.applyProfile=function(name){try{var p=_NXPR.PROFILES[name];if(!p)return;for(var k in p)_NXPR.cfg[k]=p[k];_NXPR.cfg.profile=name;_NXPR.cache=Object.create(null);_NXPR.cacheN=0;_NXPR.saveCfg();_NXPR.notify();}catch(_){}};
_NXPR.parseLine=function(L){
if(!L)return null;
L=L.trim().toLowerCase();
if(!L||L.charAt(0)==="#"||L.charAt(0)===";"||L.charAt(0)==="!")return null;
if(L.indexOf("||")===0)L=L.slice(2).split("^")[0];
else if(/^(0\.0\.0\.0|127\.0\.0\.1)\s+/.test(L))L=L.replace(/^\S+\s+/,"");
L=L.replace(/^https?:\/\//,"").replace(/^www\./,"");
var sl=L.indexOf("/");if(sl>=0)L=L.slice(0,sl);
var co=L.indexOf(":");if(co>=0)L=L.slice(0,co);
var at=L.indexOf("@");if(at>=0)L=L.slice(at+1);
L=L.trim();
if(!L||L.length>120||L.indexOf(".")<=0)return null;
if(/[^a-z0-9.\-_]/.test(L))return null;
return L;};
_NXPR.parseListChunked=function(t,cb){try{
var lines=String(t||"").split(/\r?\n/);
var seen=Object.create(null),out=[],idx=0,STEP=4000;
var step=function(){try{
var end=Math.min(idx+STEP,lines.length);
for(;idx<end;idx++){var d=_NXPR.parseLine(lines[idx]);
if(d&&!seen[d]){seen[d]=1;out.push(d);}}
if(idx<lines.length){setTimeout(step,0);return;}
cb(out);}catch(_){cb(out);}};
setTimeout(step,0);}catch(_){cb([]);}};
_NXPR.parseList=function(t){try{
var seen=Object.create(null),out=[],lines=String(t||"").split(/\r?\n/);
for(var a=0;a<lines.length;a++){
var L=lines[a];
if(!L)continue;
L=L.trim().toLowerCase();
if(!L||L.charAt(0)==="#"||L.charAt(0)===";"||L.charAt(0)==="!")continue;
if(L.indexOf("||")===0)L=L.slice(2).split("^")[0];
else if(/^(0\.0\.0\.0|127\.0\.0\.1)\s+/.test(L))L=L.replace(/^\S+\s+/,"");
L=L.replace(/^https?:\/\//,"").replace(/^www\./,"");
var sl=L.indexOf("/");if(sl>=0)L=L.slice(0,sl);
var co=L.indexOf(":");if(co>=0)L=L.slice(0,co);
var at=L.indexOf("@");if(at>=0)L=L.slice(at+1);
L=L.trim();
if(!L||L.length>120||L.indexOf(".")<=0)continue;
if(/[^a-z0-9.\-_]/.test(L))continue;
if(seen[L])continue;seen[L]=1;out.push(L);}
return out;}catch(_){return [];}};
_NXPR.hache53=function(t){try{
var h1=2166136261,h2=16777619,a,c;
for(a=0;a<t.length;a++){c=t.charCodeAt(a);
h1=((h1^c)>>>0)*16777619>>>0;
h2=((h2^c)>>>0)*2246822519>>>0;}
return (h1>>>11)*4294967296+h2;}catch(_){return 0;}};
_NXPR.empreintes=null;
_NXPR.empreintesDe=function(L){
var f=new Float64Array(L.length);
for(var a=0;a<L.length;a++)f[a]=_NXPR.hache53(L[a]);
f.sort();
return f;};
_NXPR.dansR=function(d){try{
var f=_NXPR.empreintes;
if(!f||!f.length)return false;
var v=_NXPR.hache53(d),lo=0,hi=f.length-1,m,x;
while(lo<=hi){m=(lo+hi)>>1;x=f[m];
if(x===v)return true;
if(x<v)lo=m+1;else hi=m-1;}
return false;}catch(_){return false;}};
_NXPR.pose=function(buf,n,meta){try{
_NXPR.empreintes=new Float64Array(buf);
meta=meta||{};
_NXPR.remote={n:n||_NXPR.empreintes.length,at:meta.at||Date.now(),
cached:!!meta.cached,stale:!!meta.stale,unchanged:!!meta.unchanged,
bytes:_NXPR.empreintes.byteLength};
_NXPR.cache=Object.create(null);_NXPR.cacheN=0;
return true;}catch(_){return false;}};
_NXPR.idb=function(cb){try{
if(_NXPR._db){cb(_NXPR._db);return;}
if(typeof indexedDB==="undefined"){cb(null);return;}
var rq=indexedDB.open("nexium",1);
rq.onupgradeneeded=function(){try{
if(!rq.result.objectStoreNames.contains("cache"))rq.result.createObjectStore("cache");}catch(_){}};
rq.onsuccess=function(){_NXPR._db=rq.result;cb(_NXPR._db);};
rq.onerror=function(){cb(null);};
rq.onblocked=function(){cb(null);};}catch(_){cb(null);}};
_NXPR.idbLit=function(k,cb){try{
_NXPR.idb(function(db){
if(!db){cb(null);return;}
try{var r=db.transaction("cache","readonly").objectStore("cache").get(k);
r.onsuccess=function(){cb(r.result||null);};
r.onerror=function(){cb(null);};}catch(_){cb(null);}});}catch(_){cb(null);}};
_NXPR.idbEcrit=function(k,v){try{
_NXPR.idb(function(db){
if(!db)return;
try{db.transaction("cache","readwrite").objectStore("cache").put(v,k);}catch(_){}});}catch(_){}};
_NXPR.loadRemote=function(force){try{
if(!_NXPR.idxG)_NXPR.buildIndex();
if(_NXPR.loading)return;
_NXPR.loading=true;_NXPR.notify();
_NXPR.idbLit("blocklist",function(cache){try{
var aBuf=!!(cache&&cache.buf);
if(aBuf&&!force&&(Date.now()-(cache.at||0))<21600000){
_NXPR.pose(cache.buf,cache.n,{at:cache.at,cached:true});
_NXPR.loading=false;_NXPR.notify();return;}
var hdr={};
try{var et=_NXDB.get("nexium_blocklist_etag");if(et&&aBuf)hdr["If-None-Match"]=et;}catch(_){}
_NXNETX.go(_NXPR.BLOCKLIST_URL,{cache:"no-store",headers:hdr},45000).then(function(r){
if(r&&r.status===304){
_NXPR.loading=false;
if(aBuf){_NXPR.pose(cache.buf,cache.n,{at:Date.now(),cached:true,unchanged:true});
_NXPR.idbEcrit("blocklist",{at:Date.now(),n:cache.n,buf:cache.buf});}
_NXPR.notify();throw {skip:true};}
if(!r||!r.ok)throw 0;
try{var ne=r.headers&&r.headers.get&&r.headers.get("etag");if(ne)_NXDB.set("nexium_blocklist_etag",ne);}catch(_){}
return r.text();}).then(function(t){
_NXPR.parseListChunked(t,function(out){
_NXPR.loading=false;
if(!out.length){_NXPR.remote={n:0,at:Date.now(),err:"liste vide ou illisible"};_NXPR.notify();return;}
var f=_NXPR.empreintesDe(out);
_NXPR.pose(f.buffer,out.length,{at:Date.now()});
_NXPR.idbEcrit("blocklist",{at:Date.now(),n:out.length,buf:f.buffer});
try{_NXDB.del("nexium_blocklist");}catch(_){}
try{_NXNETX.ok("block");}catch(_){}
_NXPR.notify();});
}).catch(function(err){if(err&&err.skip)return;
_NXPR.loading=false;
if(aBuf)_NXPR.pose(cache.buf,cache.n,{at:cache.at,stale:true});
else _NXPR.remote={n:0,at:Date.now(),err:"depot injoignable"};
try{_NXNETX.retry("block",function(){_NXPR.loadRemote(true);});}catch(_){}
_NXPR.notify();});
}catch(_){_NXPR.loading=false;_NXPR.notify();}});
}catch(_){_NXPR.loading=false;}};
_NXPR.commHit=function(h){try{
if(!window._NXV||typeof _NXV.commHit!=="function")return null;
return _NXV.commHit(h)||null;}catch(_){return null;}};
_NXPR.classify=function(u){try{
if(!_NXPR.idxG)_NXPR.buildIndex();
var h=_NXPR.host(u);if(!h)return null;
var cc=_NXPR.cache[h];if(cc!==undefined)return cc;
var res;
if(_NXPR.isAllowed(h)||(_NXPR.remoteAllow&&_NXPR.hit(h,_NXPR.remoteAllow)))res={kind:"ok",host:h,allowed:true};
else if(_NXPR.hit(h,_NXPR.idxG))res={kind:"grabber",host:h};
else if(_NXPR.commHit(h)){var _ci=_NXPR.commHit(h);res={kind:(_ci.k==="other"?"phish":_ci.k),host:h,comm:_ci.n};}
else if(h.indexOf("xn--")>=0)res={kind:"punycode",host:h};
else if(_NXPR.RXFAKE.test(h))res={kind:"phish",host:h};
else if(h.indexOf("discord")>=0&&!_NXPR.RXREAL.test(h))res={kind:"phish",host:h};
else if(_NXPR.idxS[h])res={kind:"short",host:h};
else{res={kind:"ok",host:h};
if(_NXPR.cfg.heuristics){var hr=_NXPR.heuristic(u,h);
if(hr.score>=(_NXPR.cfg.hThreshold||5)){res={kind:_NXPR.cfg.hBlock?"phish":"suspect",host:h,heur:true,score:hr.score,why:hr.why};}}}
if(_NXPR.cacheN>800){_NXPR.cache=Object.create(null);_NXPR.cacheN=0;}
_NXPR.cache[h]=res;_NXPR.cacheN++;
return res;}catch(_){return null;}};
_NXPR.RXREAL=/^(discord\.com|discord\.gg|discordapp\.com|discordapp\.net|discord\.media|discordstatus\.com|discord\.new|dis\.gd|support\.discord\.com|cdn\.discordapp\.com|media\.discordapp\.net|images-ext-\d+\.discordapp\.net)$/;
_NXPR.RXFAKE=/(dlscord|discrod|discvrd|dlscordapp|discordgift|discordnitro|discord-nitro|discordapp-|steamcommunlty|steamcomunity|steamcommnity|steampowered-)/;
_NXPR.threat=function(cl){return cl&&(cl.kind==="grabber"||cl.kind==="phish"||cl.kind==="punycode");};_NXPR.suspicious=function(cl){return cl&&(cl.kind==="short"||cl.kind==="suspect");};
_NXPR.logThreat=function(kind,detail){try{try{var PT=_NXPR.stats.parType||(_NXPR.stats.parType={});PT[kind]=(PT[kind]||0)+1;}catch(_){}_NXPR.stats.recent.unshift({k:kind,d:detail,t:Date.now()});if(_NXPR.stats.recent.length>25)_NXPR.stats.recent=_NXPR.stats.recent.slice(0,25);_NXPR.saveStats();_NXPR.notify();}catch(_){}};
_NXPR.dits=Object.create(null);_NXPR._ditsN=0;
_NXPR.dejaDit=function(cle,ms){try{
var t=Date.now(),v=_NXPR.dits[cle];
if(v&&(t-v)<(ms||600000))return true;
if(++_NXPR._ditsN>400){_NXPR.dits=Object.create(null);_NXPR._ditsN=1;}
_NXPR.dits[cle]=t;return false;}catch(_){return false;}};
_NXPR.vus=Object.create(null);_NXPR._vusN=0;
_NXPR.dejaVu=function(cle){try{
if(_NXPR.vus[cle])return true;
if(++_NXPR._vusN>600){_NXPR.vus=Object.create(null);_NXPR._vusN=1;}
_NXPR.vus[cle]=1;return false;}catch(_){return false;}};
_NXPR.scanUrl=function(u,announce){
if(!_NXPR.cfg.scanLinks)return {kind:"ok"};
var cl=_NXPR.classify(u);if(!cl)return {kind:"ok"};
var neuf=!_NXPR.dejaVu("u:"+String(u).slice(0,300));
if(neuf){_NXPR.stats.scanned++;}
if(_NXPR.threat(cl)){
if((cl.kind==="grabber"&&_NXPR.cfg.blockGrabbers)||((cl.kind==="phish"||cl.kind==="punycode")&&_NXPR.cfg.phishGuard)){
if(neuf){_NXPR.stats.blocked++;_NXPR.logThreat(cl.kind,cl.host);}
if(announce&&!_NXPR.dejaDit("t:"+cl.kind+":"+cl.host,1800000))
_NXPR.toast(_NXtr("Lien dangereux bloque (")+(cl.kind==="grabber"?_NXtr("logger d IP"):_NXtr("hameconnage"))+") : "+_NXtr(cl.host),0);}}
else if(_NXPR.suspicious(cl)){
if(neuf)_NXPR.logThreat("short",cl.host);
if(announce&&!_NXPR.dejaDit("s:"+cl.host,1800000))
_NXPR.toast(_NXtr("Lien raccourci : la destination est masquee (")+_NXtr(cl.host)+")",2);}
if(neuf)_NXPR.saveStats();
return cl;};
_NXPR.protectedFor=function(kind){if(kind==="grabber")return !!_NXPR.cfg.blockGrabbers;if(kind==="phish"||kind==="punycode")return !!_NXPR.cfg.phishGuard;if(kind==="short")return !!_NXPR.cfg.scanLinks;return true;};
_NXPR.finish=function(cb,r){try{_NXPR.stats.scanned++;if(r.verdict==="danger"){r.blocked=_NXPR.protectedFor(r.kind);if(r.blocked)_NXPR.stats.blocked++;_NXPR.logThreat(r.kind,r.host||r.resolved||"lien");}else if(r.verdict==="warn"){r.blocked=false;_NXPR.logThreat("short",r.host||"lien raccourci");}_NXPR.saveStats();_NXPR.notify();}catch(_){}cb&&cb(r);};
_NXPR.deepScan=function(u,cb){if(!_NXPR.cfg.scanLinks){cb&&cb({verdict:"off"});return;}var base=_NXPR.classify(u);if(_NXPR.threat(base)){_NXPR.finish(cb,{verdict:"danger",kind:base.kind,host:base.host,resolved:null});return;}
try{_NXNETX.go(u,{method:"GET",redirect:"follow",mode:"cors",cache:"no-store"}).then(function(r){var fin=(r&&r.url)||u;var fc=_NXPR.classify(fin);var host=_NXPR.host(fin);if(_NXPR.threat(fc)){_NXPR.finish(cb,{verdict:"danger",kind:fc.kind,host:host,resolved:(host!==(base&&base.host)?fin:null)});}else if(_NXPR.suspicious(base)&&host&&base&&host!==base.host){_NXPR.finish(cb,{verdict:"ok",kind:"ok",host:host,resolved:fin,wasShort:true});}else if(_NXPR.suspicious(base)||_NXPR.suspicious(fc)){_NXPR.finish(cb,{verdict:"warn",kind:"short",host:(base&&base.host)||host,resolved:(host!==(base&&base.host)?fin:null)});}else{_NXPR.finish(cb,{verdict:"ok",kind:"ok",host:host,resolved:(host!==(base&&base.host)?fin:null)});}}).catch(function(){if(_NXPR.suspicious(base))_NXPR.finish(cb,{verdict:"warn",kind:"short",host:base.host,resolved:null});else _NXPR.finish(cb,{verdict:(base&&base.kind==="ok")?"ok":"warn",kind:(base&&base.kind)||"unknown",host:base&&base.host,resolved:null});});}
catch(_){if(_NXPR.suspicious(base))_NXPR.finish(cb,{verdict:"warn",kind:"short",host:base.host,resolved:null});else _NXPR.finish(cb,{verdict:"ok",kind:"ok",host:base&&base.host,resolved:null});}};
_NXPR.scanText=function(txt){try{if(!txt)return;var s=String(txt);if(s.length>4000)s=s.slice(0,4000);var low=s.toLowerCase();var hasLink=low.indexOf("http")>=0;var hasBait=/nitro|gift|free|gratuit|claim|airdrop|crypto|robux|vbucks|steam|verify|qr|cadeau|gagn/.test(low);if(!hasLink&&!hasBait)return;var urls=hasLink?(s.match(/https?:\/\/[^\s<>"')]+/gi)||[]):[];for(var a=0;a<urls.length;a++){_NXPR.scanUrl(urls[a],true);
var f=_NXPR.fileLink(urls[a]);
if(f&&!f.trusted&&!_NXPR.dejaDit("dl:"+f.host+":"+f.ext,1800000)){_NXPR.logThreat("download",f.ext.toUpperCase()+" depuis "+f.host);_NXPR.saveStats();
_NXPR.toast(_NXtr("Lien de telechargement direct (")+_NXtr(f.ext.toUpperCase())+_NXtr(") depuis ")+_NXtr(f.host)+_NXtr(" : n ouvre pas ce fichier."),0);}}if(_NXPR.cfg.scamAlerts&&hasBait){for(var b=0;b<_NXPR.SCAM.length;b++){if(_NXPR.SCAM[b].test(s)){
if(_NXPR.dejaVu("m:"+_NXPR.hache53(s.slice(0,200))))break;
_NXPR.stats.scams++;_NXPR.logThreat("scam",s.slice(0,60));
_NXPR.toast(_NXtr("Message d arnaque : ce texte reprend mot pour mot une escroquerie connue. N ouvre aucun lien qu il contient."),0);break;}}}}catch(_){}};
_NXPR.RXTOKEN=/(mfa\.[\w-]{20,})|([\w-]{23,28}\.[\w-]{6}\.[\w-]{27,38})/;
_NXPR.RXHOOK=/discord(?:app)?\.com\/api\/(?:v\d+\/)?webhooks\//i;
_NXPR.RXSELFXSS=/(localStorage(?:\.getItem)?\(?["']?token)|(document\.body\.appendChild\(document\.createElement\(["']iframe)|(webpackChunkdiscord_app)|(\.push\(\[\[.*\],\{.*:\(?function)/i;
_NXPR.BADEXT=["exe","scr","bat","cmd","com","pif","vbs","vbe","js","jse","jar","msi","ps1","hta","cpl","reg","lnk","apk","dll","sh"];
_NXPR.ARCHEXT=["zip","rar","7z"];
_NXPR.extOf=function(n){try{var m=String(n||"").toLowerCase().match(/\.([a-z0-9]{1,5})$/);return m?m[1]:"";}catch(_){return "";}};
_NXPR.SIGS=[{b:[0x4D,0x5A],t:"executable Windows",bad:true},{b:[0x7F,0x45,0x4C,0x46],t:"executable Linux",bad:true},{b:[0xCF,0xFA,0xED,0xFE],t:"executable macOS",bad:true},{b:[0x50,0x4B,0x03,0x04],t:"archive ZIP",kind:"arch"},{b:[0x52,0x61,0x72,0x21],t:"archive RAR",kind:"arch"},{b:[0x37,0x7A,0xBC,0xAF],t:"archive 7z",kind:"arch"},{b:[0x89,0x50,0x4E,0x47],t:"image PNG",kind:"img"},{b:[0xFF,0xD8,0xFF],t:"image JPEG",kind:"img"},{b:[0x47,0x49,0x46,0x38],t:"image GIF",kind:"img"},{b:[0x25,0x50,0x44,0x46],t:"document PDF",kind:"doc"},{b:[0x52,0x49,0x46,0x46],t:"media RIFF",kind:"media"},{b:[0x1A,0x45,0xDF,0xA3],t:"video WebM",kind:"media"}];
_NXPR.matchSig=function(bytes){try{for(var a=0;a<_NXPR.SIGS.length;a++){var s=_NXPR.SIGS[a],ok=true;
for(var b=0;b<s.b.length;b++){if(bytes[b]!==s.b[b]){ok=false;break;}}
if(ok)return s;}}catch(_){}return null;};
_NXPR.EXTKIND={png:"img",jpg:"img",jpeg:"img",gif:"img",webp:"img",bmp:"img",pdf:"doc",txt:"doc",mp4:"media",webm:"media",mkv:"media",mp3:"media",wav:"media",ogg:"media",zip:"arch",rar:"arch"};
_NXPR.deepFile=function(url,name,cb){try{
if(!url){cb(null);return;}
_NXNETX.go(url,{method:"GET",headers:{Range:"bytes=0-15"},cache:"no-store"}).then(function(r){
if(!r||!(r.ok||r.status===206))throw 0;return r.arrayBuffer();}).then(function(buf){
var bytes=new Uint8Array(buf);var sig=_NXPR.matchSig(bytes);
if(!sig){cb(null);return;}
var ex=_NXPR.extOf(name);var claimed=_NXPR.EXTKIND[ex]||null;
var real=sig.bad?"exe":(sig.kind||null);
cb({sig:sig,real:real,claimed:claimed,mismatch:!!(claimed&&real&&claimed!==real)});
}).catch(function(){cb(null);});}catch(_){cb(null);}};
_NXPR.verifyFile=function(att,fname){try{
if(!att)return;var u=att.url||att.proxy_url;if(!u)return;
_NXPR.deepFile(u,fname,function(res){try{
if(!res)return;
if(res.sig&&res.sig.bad){_NXPR.stats.blocked=(_NXPR.stats.blocked||0)+1;_NXPR.logThreat("file","contenu reel: "+res.sig.t+" ("+fname+")");_NXPR.saveStats();
_NXPR.toast(_NXtr("DANGER : ")+_NXtr(fname)+_NXtr(" est en realite un ")+_NXtr(res.sig.t)+_NXtr(", malgre son extension. Ne l ouvre pas."),0);return;}
if(res.mismatch){_NXPR.logThreat("file","extension trompeuse: "+fname+" = "+res.sig.t);_NXPR.saveStats();
_NXPR.toast(_NXtr("Extension trompeuse : ")+_NXtr(fname)+_NXtr(" est en realite un ")+_NXtr(res.sig.t)+".",0);}
}catch(_){}});}catch(_){}};
_NXPR.scanAttachments=function(m,isDM){try{
if(!_NXPR.cfg.scanFiles)return;var A=m&&m.attachments;if(!A||!A.length)return;
for(var a=0;a<A.length;a++){var nm=A[a]&&(A[a].filename||A[a].name)||"";var ex=_NXPR.extOf(nm);
_NXPR.verifyFile(A[a],nm);
try{if(window._NXV)_NXV.inspectFile(A[a],nm,isDM);}catch(_){}
if(_NXPR.BADEXT.indexOf(ex)>=0){_NXPR.stats.blocked=(_NXPR.stats.blocked||0)+1;_NXPR.logThreat("file",nm);_NXPR.saveStats();
_NXPR.toast(_NXtr("Fichier potentiellement dangereux recu : ")+_NXtr(nm)+_NXtr(" - n ouvre pas ce fichier."),0);}
else if(isDM&&_NXPR.ARCHEXT.indexOf(ex)>=0){_NXPR.logThreat("file",nm);_NXPR.toast(_NXtr("Archive recue en message prive (")+_NXtr(nm)+_NXtr(") - prudence avant d ouvrir."),1);}}
}catch(_){}};
_NXPR.scanSecrets=function(txt,mine){try{
if(!_NXPR.cfg.scamAlerts)return;var s=String(txt||"");if(s.length<20)return;
if(_NXPR.RXHOOK.test(s)){_NXPR.logThreat("secret",mine?"webhook publie par toi":"webhook dans un message");
_NXPR.toast(mine?_NXtr("Tu viens de publier une URL de webhook Discord - supprime le message et regenere-le."):_NXtr("Ce message contient une URL de webhook Discord."),0);return;}
if(_NXPR.RXTOKEN.test(s)){_NXPR.logThreat("secret",mine?"jeton publie par toi":"jeton dans un message");
_NXPR.toast(mine?_NXtr("Ce message ressemble a un jeton Discord. Supprime-le et change ton mot de passe."):_NXtr("Ce message contient ce qui ressemble a un jeton de compte."),0);return;}
if(_NXPR.cfg.consoleGuard&&_NXPR.RXSELFXSS.test(s)){_NXPR.logThreat("selfxss","code a coller dans la console");
_NXPR.toast(_NXtr("Ce message contient du code a coller dans la console : arnaque classique de vol de compte. Ne le colle jamais."),0);}
}catch(_){}};
_NXPR.warnedUsers=Object.create(null);_NXPR._wuN=0;
_NXPR.warnAccount=function(uid,days){try{
if(_NXPR.warnedUsers[uid])return;_NXPR.warnedUsers[uid]=1;if(++_NXPR._wuN>300){_NXPR.warnedUsers=Object.create(null);_NXPR._wuN=0;}
_NXPR.stats.accounts=(_NXPR.stats.accounts||0)+1;_NXPR.logThreat("account","compte cree il y a "+days+" j");_NXPR.saveStats();
_NXPR.avis("Message prive d un compte tres recent ("+days+" jour"+(days>1?"s":"")+"). Mefie-toi des demandes inhabituelles.",0);
}catch(_){}};
_NXPR.consoleWarn=function(){try{
if(!_NXPR.cfg.consoleGuard||_NXPR._cw)return;_NXPR._cw=true;
var big="font-size:38px;font-weight:800;color:#d6484a;-webkit-text-stroke:1px #000;";
var small="font-size:15px;color:#f4f4f5;";
console.log("%cSTOP !",big);
console.log("%cSi quelqu un t a demande de coller quelque chose ici, c est une arnaque : tu lui donnerais l acces a ton compte Discord.",small);
console.log("%cNexium Protect surveille cette console. Ne colle jamais de code que tu ne comprends pas.",small);
}catch(_){}};
_NXPR.onPaste=function(e){try{
if(!_NXPR.cfg.consoleGuard)return;
var t="";try{t=(e.clipboardData||window.clipboardData).getData("text")||"";}catch(_){}
if(!t||t.length<40)return;
if(_NXPR.RXSELFXSS.test(t)){
// Du code a coller dans la console : c est l arnaque qui vide un compte.
// Celle-la se dit toujours, meme en mode discret.
_NXPR.logThreat("selfxss","collage de code intercepte");
_NXPR.toast(_NXtr("Tu viens de coller du code destine a la console. Si quelqu un te l a demande, c est une tentative de vol de compte."),0);return;}
if(_NXPR.RXHOOK.test(t)||_NXPR.RXTOKEN.test(t)){
_NXPR.logThreat("secret","collage d un secret");
_NXPR.avis("Ce que tu viens de coller ressemble a un jeton ou a un webhook. Verifie avant d envoyer.",2);}
}catch(_){}};
_NXPR.scanEmbeds=function(m){try{
if(!_NXPR.cfg.scanLinks||!_NXPR.cfg.scanEmbeds)return;var E=m&&m.embeds;if(!E||!E.length)return;
for(var a=0;a<E.length&&a<8;a++){var em=E[a]||{};
var urls=[em.url,em.author&&em.author.url,em.thumbnail&&em.thumbnail.url,em.image&&em.image.url,em.video&&em.video.url];
for(var b=0;b<urls.length;b++){var u=urls[b];if(!u||typeof u!=="string")continue;
if(u.indexOf("discordapp")>=0||u.indexOf("discord.com/assets")>=0)continue;
var cl=_NXPR.classify(u);if(!cl)continue;
if(_NXPR.threat(cl)){_NXPR.stats.blocked=(_NXPR.stats.blocked||0)+1;_NXPR.logThreat(cl.kind,"apercu: "+cl.host);_NXPR.saveStats();
if(!_NXPR.dejaDit("ap:"+cl.host,1800000))_NXPR.toast(_NXtr("Apercu de lien dangereux (")+_NXtr(cl.host)+_NXtr("). Ne l ouvre pas."),0);return;}
if(cl.kind==="suspect"){_NXPR.logThreat("suspect","apercu: "+cl.host);_NXPR.saveStats();
if(!_NXPR.dejaDit("aps:"+cl.host,1800000))_NXPR.avis("Apercu de lien suspect ("+cl.host+").",2);return;}}}
}catch(_){}};
_NXPR.scanMasked=function(txt){try{
if(!_NXPR.cfg.scanLinks||!_NXPR.cfg.scanMasked)return;var s=String(txt||"");if(s.indexOf("](")<0)return;
var re=/\[([^\]]{1,120})\]\((https?:\/\/[^\s)]{1,300})\)/gi,m;
while((m=re.exec(s))){
var label=m[1].trim(),target=m[2];var th=_NXPR.host(target);if(!th)continue;
var cl=_NXPR.classify(target);
if(cl&&_NXPR.threat(cl)){_NXPR.logThreat(cl.kind,"lien masque: "+cl.host);_NXPR.saveStats();
if(!_NXPR.dejaDit("lm:"+cl.host,1800000))_NXPR.toast(_NXtr("Lien masque dangereux : le texte cache ")+_NXtr(cl.host),0);return;}
var lm=label.match(/(?:https?:\/\/)?([a-z0-9.\-]+\.[a-z]{2,})/i);
if(lm){var lh=String(lm[1]).toLowerCase().replace(/^www\./,"");
if(lh!==th&&th.indexOf(lh)<0&&lh.indexOf(th)<0){
_NXPR.logThreat("masked",lh+" -> "+th);_NXPR.saveStats();
if(!_NXPR.dejaDit("lt:"+lh+">"+th,1800000))_NXPR.avis("Lien trompeur : affiche "+lh+" mais mene vers "+th,0);return;}}}
}catch(_){}};
_NXPR.RXINV=/(?:discord\.gg|discord(?:app)?\.com\/invite)\/([a-z0-9\-]{2,25})/gi;
_NXPR.invSeen=Object.create(null);_NXPR._invN=0;
_NXPR.checkInvite=function(cd){try{
if(!cd||_NXPR.invSeen[cd])return;_NXPR.invSeen[cd]=1;if(++_NXPR._invN>400){_NXPR.invSeen=Object.create(null);_NXPR._invN=0;}
var handle=function(inv){try{
if(!inv||!inv.guild)return;var g=inv.guild;var risk=0,why=[];
try{var created=Number((BigInt(g.id)>>22n)+1420070400000n);var days=Math.floor((Date.now()-created)/86400000);
if(days>=0&&days<7){risk+=3;why.push("serveur cree il y a "+days+" jour"+(days>1?"s":""));}
else if(days>=0&&days<30){risk+=1;why.push("serveur recent ("+days+" jours)");}}catch(_){}
var mem=inv.approximate_member_count;
if(typeof mem==="number"){if(mem<20){risk+=2;why.push("seulement "+mem+" membres");}else if(mem<100){risk+=1;why.push(mem+" membres");}}
var nm=String(g.name||"").toLowerCase();
for(var b=0;b<_NXPR.BRANDS.length;b++){if(nm.indexOf(_NXPR.BRANDS[b])>=0){risk+=2;why.push("nom imitant "+_NXPR.BRANDS[b]);break;}}
if(/nitro|giveaway|free|gratuit|airdrop|cadeau|recompense/.test(nm)){risk+=2;why.push("nom oriente arnaque");}
if(risk>=4){_NXPR.stats.scams=(_NXPR.stats.scams||0)+1;_NXPR.logThreat("invite",(g.name||cd)+" - "+why.slice(0,2).join(", "));_NXPR.saveStats();
_NXPR.toast(_NXtr("Invitation suspecte (")+(_NXtr(g.name)||_NXtr(cd))+") : "+_NXtr(why.slice(0,2).join(", "))+".",0);}
}catch(_){}};
var W=window.Vencord&&Vencord.Webpack;
var R=W&&W.findByProps&&W.findByProps("resolveInvite");
if(R&&typeof R.resolveInvite==="function"){Promise.resolve(R.resolveInvite(cd,"Nexium Protect")).then(function(res){handle((res&&(res.invite||res))||null);}).catch(function(){});}
else{_NXNETX.go("https://discord.com/api/v10/invites/"+cd+"?with_counts=true",{cache:"no-store"}).then(function(r){return r&&r.ok?r.json():null;}).then(handle).catch(function(){});}
}catch(_){}};
_NXPR.scanInvites=function(txt){try{
if(!_NXPR.cfg.scamAlerts||!_NXPR.cfg.scanInvites)return;var s=String(txt||"");
_NXPR.RXINV.lastIndex=0;var m,n=0;
while((m=_NXPR.RXINV.exec(s))&&n<4){n++;if(m[1]&&m[1]!==_NXSP.CODE)_NXPR.checkInvite(m[1]);}
}catch(_){}};
_NXPR.edits=Object.create(null);_NXPR._editsN=0;
_NXPR.onMsgUpdate=function(e){try{
var m=e&&e.message;if(!m)return;
var _c=(typeof m.content==="string")?m.content:"";
if(m.id){var _k="e:"+m.id;var _h=_NXPR.hache53(_c);
if(_NXPR.edits[_k]===_h)return;
if(++_NXPR._editsN>500){_NXPR.edits=Object.create(null);_NXPR._editsN=1;}
_NXPR.edits[_k]=_h;}
var me=null;try{me=_NXcommon().store("UserStore").getCurrentUser();}catch(_){}
var mine=!!(me&&m.author&&m.author.id===me.id);
var content=m.content;
if(typeof content==="string"&&content){
_NXPR.scanSecrets(content,mine);
if(!mine){
var before=(_NXPR.stats.blocked||0)+(_NXPR.stats.scams||0)+(_NXPR.stats.recent||[]).length;
_NXPR.scanText(content);_NXPR.scanMasked(content);_NXPR.scanInvites(content);
var after=(_NXPR.stats.blocked||0)+(_NXPR.stats.scams||0)+(_NXPR.stats.recent||[]).length;
if(after>before)_NXPR.toast(_NXtr("Ce message a ete MODIFIE apres envoi pour y ajouter du contenu dangereux."),0);}}
if(!mine&&_NXPR.cfg.scanEdits)_NXPR.scanEmbeds(m);
}catch(_){}};
_NXPR.norm=function(s){try{return String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]/g,"");}catch(_){return String(s||"").toLowerCase();}};
_NXPR.friendNames=function(){try{
if(_NXPR._fn&&(Date.now()-_NXPR._fnAt)<600000)return _NXPR._fn;
var out=[];var C=_NXcommon();
var RS=C.store("RelationshipStore");var US=C.store("UserStore");
var rel=RS&&(RS.getFriendIDs?RS.getFriendIDs():null);
if(rel&&rel.length){for(var a=0;a<rel.length&&a<400;a++){
var u=US&&US.getUser&&US.getUser(rel[a]);
if(u){out.push({id:String(rel[a]),n:_NXPR.norm(u.globalName||u.global_name||u.username||""),av:u.avatar||null});}}}
_NXPR._fn=out;_NXPR._fnAt=Date.now();return out;}catch(_){return [];}};
_NXPR.impSeen=Object.create(null);_NXPR._impN=0;
_NXPR.checkImpostor=function(author){try{
if(!_NXPR.cfg.scanImpostor||!author||!author.id)return;
var uid=String(author.id);
if(_NXPR.impSeen[uid])return;
var friends=_NXPR.friendNames();if(!friends.length)return;
for(var a=0;a<friends.length;a++){if(friends[a].id===uid)return;}
var nm=_NXPR.norm(author.globalName||author.global_name||author.username||"");
if(nm.length<3)return;
for(var b=0;b<friends.length;b++){
var f=friends[b];
if(!f.n||f.n.length<3)continue;
var same=(f.n===nm);
var close=(!same&&f.n.length>=4&&(nm.indexOf(f.n)>=0||f.n.indexOf(nm)>=0));
if(!same&&!close)continue;
var sameAvatar=!!(f.av&&author.avatar&&String(f.av)===String(author.avatar));
var days=999;try{var cr=Number((BigInt(uid)>>22n)+1420070400000n);days=Math.floor((Date.now()-cr)/86400000);}catch(_){}
var risk=(same?3:1)+(sameAvatar?3:0)+(days<30?2:0);
if(risk>=4){
_NXPR.impSeen[uid]=1;if(++_NXPR._impN>300){_NXPR.impSeen=Object.create(null);_NXPR._impN=0;}
_NXPR.stats.accounts=(_NXPR.stats.accounts||0)+1;
_NXPR.logThreat("account","usurpation possible de "+(author.username||nm));
_NXPR.saveStats();
_NXPR.toast(_NXtr("Attention : ce compte imite un de tes amis")+(sameAvatar?_NXtr(" (meme avatar)"):"")+(days<30?_NXtr(", et il a ")+_NXtr(days)+_NXtr(" jours"):"")+_NXtr(". Verifie avant de repondre."),0);
return;}}
}catch(_){}};
_NXPR.dmWave=[];
_NXPR.checkWave=function(author,content){try{
if(!_NXPR.cfg.scanWaves||!author||!author.id)return;
var sig=_NXPR.norm(content).slice(0,80);
if(sig.length<12)return;
var now=Date.now();
_NXPR.dmWave=_NXPR.dmWave.filter(function(x){return now-x.t<1800000;});
_NXPR.dmWave.push({s:sig,u:String(author.id),t:now});
if(_NXPR.dmWave.length>60)_NXPR.dmWave=_NXPR.dmWave.slice(-60);
var users=Object.create(null),n=0;
for(var a=0;a<_NXPR.dmWave.length;a++){var it=_NXPR.dmWave[a];
if(it.s===sig&&!users[it.u]){users[it.u]=1;n++;}}
if(n>=3&&!_NXPR.waveAlert){
_NXPR.waveAlert=true;setTimeout(function(){_NXPR.waveAlert=false;},600000);
_NXPR.stats.scams=(_NXPR.stats.scams||0)+1;
_NXPR.logThreat("scam","vague de MP identiques ("+n+" comptes)");_NXPR.saveStats();
_NXPR.toast(_NXtr("Campagne d arnaque en cours : ")+_NXtr(n)+_NXtr(" comptes differents t ont envoye le meme message prive."),0);}
}catch(_){}};
_NXPR.QRWORDS=/(scan|scanne|scanner|flash|qr\s?code|code\s?qr|connexion rapide|login qr)/i;
_NXPR.qrSeen=0;
_NXPR.checkQR=function(m,isDM){try{
if(!_NXPR.cfg.qrGuard)return;
var txt=String((m&&m.content)||"").toLowerCase();
var hasImg=false;
try{var A=m&&m.attachments;if(A)for(var a=0;a<A.length;a++){var n=String((A[a].filename||A[a].name||"")).toLowerCase();if(/\.(png|jpg|jpeg|webp|gif)$/.test(n)){hasImg=true;break;}}
if(!hasImg&&m&&m.embeds)for(var b=0;b<m.embeds.length;b++){if(m.embeds[b]&&(m.embeds[b].image||m.embeds[b].thumbnail)){hasImg=true;break;}}}catch(_){}
var words=_NXPR.QRWORDS.test(txt);
if(!words)return;
if(!hasImg&&!isDM)return;
var now=Date.now();
if(now-(_NXPR.qrSeen||0)<120000)return;_NXPR.qrSeen=now;
_NXPR.stats.scams=(_NXPR.stats.scams||0)+1;
_NXPR.logThreat("qr","demande de scan de QR code");_NXPR.saveStats();
_NXPR.toast(_NXtr("Ne scanne JAMAIS un QR code de connexion envoye par quelqu un : il donne un acces complet a ton compte."),0);
}catch(_){}};
_NXPR.statusSeen=Object.create(null);_NXPR._stN=0;
_NXPR.scanStatusOf=function(u){try{
if(!_NXPR.cfg.scanStatus||!u||!u.id)return;
var key=String(u.id);
var txt="";
try{var acts=(u.activities)||[];for(var a=0;a<acts.length;a++){var x=acts[a];if(x&&x.type===4){txt=String(x.state||"");break;}}}catch(_){}
if(!txt&&u.bio)txt=String(u.bio);
if(!txt||txt.length<8)return;
if(_NXPR.statusSeen[key]===txt)return;
_NXPR.statusSeen[key]=txt;if(++_NXPR._stN>300){_NXPR.statusSeen=Object.create(null);_NXPR._stN=0;}
var urls=txt.match(/https?:\/\/[^\s]{4,200}/gi)||[];
for(var b=0;b<urls.length;b++){
var cl=_NXPR.classify(urls[b]);
if(cl&&_NXPR.threat(cl)){
_NXPR.stats.blocked=(_NXPR.stats.blocked||0)+1;
_NXPR.logThreat(cl.kind,"statut de "+(u.username||key)+" : "+cl.host);_NXPR.saveStats();
_NXPR.toast(_NXtr("Lien dangereux dans le statut de ")+(_NXtr(u.username)||_NXtr("un utilisateur"))+" ("+_NXtr(cl.host)+").",0);return;}}
}catch(_){}};
_NXPR.onPresence=function(e){try{
if(!_NXPR.cfg.scanStatus)return;
var u=e&&(e.user||e);
if(!u||!u.id)return;
if(e&&e.activities)u={id:u.id,username:u.username,activities:e.activities};
_NXPR.scanStatusOf(u);}catch(_){}};
_NXPR.clipTimer=null;_NXPR.clipLast="";
_NXPR.checkClip=function(){try{
if(!_NXPR.cfg.clipGuard)return;
if(!navigator.clipboard||!navigator.clipboard.readText)return;
if(document.hidden)return;
navigator.clipboard.readText().then(function(t){try{
t=String(t||"");
if(!t||t.length<40||t===_NXPR.clipLast)return;
_NXPR.clipLast=t;
if(_NXPR.RXTOKEN.test(t)||_NXPR.RXHOOK.test(t)){
_NXPR.logThreat("secret","secret detecte dans le presse-papiers");_NXPR.saveStats();
_NXPR.toast(_NXtr("Attention : ton presse-papiers contient un jeton ou un webhook. Ne le colle nulle part."),0);}
}catch(_){}}).catch(function(){});
}catch(_){}};
_NXPR.moi=function(){
if(_NXPR._moi)return _NXPR._moi;
try{var u=_NXcommon().store("UserStore");
u=u&&u.getCurrentUser&&u.getCurrentUser();
_NXPR._moi=(u&&u.id)?String(u.id):null;}catch(_){}
return _NXPR._moi;};
_NXPR.oublierMoi=function(){try{_NXPR._moi=null;_NXPR._dmc=null;_NXPR._dmn=0;}catch(_){}};
try{setInterval(function(){try{if(!document.hidden)_NXPR.oublierMoi();}catch(_){}},120000);}catch(_){}
// --------------------------------------------------- confiance et discretion
_NXPR.CONF="nexium_protect_confiance";
_NXPR.confiance=(function(){try{
var r=_NXDB.get(_NXPR.CONF);var d=r?JSON.parse(r):null;
return (d&&typeof d==="object")?d:{};}catch(_){return {};}})();
_NXPR.sauveConfiance=function(){try{_NXDB.set(_NXPR.CONF,JSON.stringify(_NXPR.confiance));}catch(_){}};
_NXPR.estConfie=function(cid){try{
if(!cid)return false;
return !!_NXPR.confiance[String(cid)];}catch(_){return false;}};
_NXPR.confie=function(cid,nom){try{
if(!cid)return false;
var L=[],k;for(k in _NXPR.confiance)L.push(k);
if(L.length>=60){L.sort(function(x,y){return _NXPR.confiance[x].a-_NXPR.confiance[y].a;});
delete _NXPR.confiance[L[0]];}
_NXPR.confiance[String(cid)]={a:Date.now(),n:String(nom||"").slice(0,60)};
_NXPR.sauveConfiance();return true;}catch(_){return false;}};
_NXPR.dementi=function(cid){try{
delete _NXPR.confiance[String(cid)];_NXPR.sauveConfiance();return true;}catch(_){return false;}};
// Le salon ouvert a cet instant. Un clic sur un lien ne dit pas d ou il
// vient : c est le seul moyen de savoir si la conversation est de confiance.
_NXPR.salonActuel=function(){try{
var W=window.Vencord&&Vencord.Webpack;
if(!_NXPR._sc){try{_NXPR._sc=(W&&W.findStore&&W.findStore("SelectedChannelStore"))||
(W&&W.findByProps&&W.findByProps("getLastSelectedChannelId"))||null;}catch(_){_NXPR._sc=null;}}
var S=_NXPR._sc;
return (S&&S.getChannelId&&S.getChannelId())||"";}catch(_){return "";}};
// Un avis d ambiance : utile, mais jamais vital. Il se tait dans une
// conversation de confiance et en mode discret. Les blocages, eux, passent
// par _NXPR.toast directement et ne sont jamais concernes.
_NXPR.avis=function(m,type,cid){try{
if(_NXPR.cfg.discret)return false;
var c=cid||_NXPR.salonActuel();
if(c&&_NXPR.estConfie(c))return false;
return _NXPR.toast(_NXtr(m),type);}catch(_){return false;}};
// ------------------------------------------------------ ce qui est ouvert
// Chaque groupe de boucliers demande un rang d abonnement. Le socle -- liens,
// contenu, coffre anti-vol -- reste ouvert a tout le monde : personne ne doit
// se retrouver moins protege qu avec un Discord nu.
_NXPR.RANGS={
maskLinks:0,maskSuspect:0,scanLinks:0,blockGrabbers:0,phishGuard:0,scamAlerts:0,
warnAccounts:0,consoleGuard:0,heuristics:0,
scanFiles:0,scanDownloads:0,scanMasked:0,scanEmbeds:0,scanEdits:0,scanInvites:0,
scanImpostor:0,scanWaves:0,qrGuard:0,scanStatus:0,clipGuard:0,
unicodeGuard:1,cryptoGuard:1,dmLinkGuard:1,leakGuard:1,raidGuard:1,nameGuard:1,
oauthGuard:2,schemeGuard:2,bidiGuard:2,ipGuard:2,codeGuard:2,
webhookGuard:3,egressGuard:3,beaconGuard:3,domGuard:3};
_NXPR.rangDe=function(k){try{
var r=_NXPR.RANGS[k];
return (typeof r==="number")?r:0;}catch(_){return 0;}};
_NXPR.permis=function(k){try{
var r=_NXPR.rangDe(k);
if(r<=0)return true;
if(!window._NXABO)return true;
return _NXABO.permis("pr",r);}catch(_){return true;}};
// Un reglage verrouille qui se retrouve actif est remis a zero. C est la
// seule chose que le client puisse faire seul contre une modification
// manuelle -- et elle est refaite sans arret.
_NXPR.reconcilie=function(){try{
if(!window._NXABO)return 0;
var n=0,k;
for(k in _NXPR.RANGS){
if(!_NXPR.cfg[k])continue;
if(_NXPR.permis(k))continue;
_NXPR.cfg[k]=false;n++;}
if(n){_NXPR.saveCfg();try{_NXPR.notify();}catch(_){}}
return n;}catch(_){return 0;}};
_NXPR.estDM=function(cid){try{
if(!cid)return false;
if(!_NXPR._dmc)_NXPR._dmc=Object.create(null);
var v=_NXPR._dmc[cid];
if(v!==undefined)return v;
var CS=_NXcommon().store("ChannelStore");
var ch=CS&&CS.getChannel&&CS.getChannel(cid);
v=!!(ch&&(ch.type===1||ch.type===3));
if(_NXPR._dmn>500){_NXPR._dmc=Object.create(null);_NXPR._dmn=0;}
_NXPR._dmc[cid]=v;_NXPR._dmn=(_NXPR._dmn||0)+1;
return v;}catch(_){return false;}};
_NXPR.onMsg=function(e){try{
if(!e||!e.message)return;var m=e.message;
var content=m.content||"";
try{if(m.id){if(++_NXPR._editsN>500){_NXPR.edits=Object.create(null);_NXPR._editsN=1;}
_NXPR.edits["e:"+m.id]=_NXPR.hache53(content);}}catch(_){}
var hasAtt=!!(m.attachments&&m.attachments.length),hasEmb=!!(m.embeds&&m.embeds.length);
if(!hasAtt&&!hasEmb&&content.length<12&&content.indexOf("http")<0)return;
var moi=_NXPR.moi();
var mine=!!(moi&&m.author&&m.author.id===moi);
var isDM=_NXPR.estDM(m.channel_id);
_NXPR.scanSecrets(content,mine);
if(mine){try{_NXPR.scanNouveau(m,content,true,isDM,null);}catch(_){}return;}
_NXPR.scanText(content);
_NXPR.scanExtra(content,isDM);
_NXPR.scanMasked(content);
_NXPR.scanInvites(content);
try{if(window._NXV)_NXV.checkGift(content);}catch(_){}
_NXPR.scanEmbeds(m);
_NXPR.scanAttachments(m,isDM);
_NXPR.checkQR(m,isDM);
// Dans une conversation marquee de confiance, on cesse de commenter le
// correspondant : c est deja quelqu un de connu. L analyse du CONTENU, elle,
// continue -- un ami dont le compte est vole envoie de vrais pieges.
if(isDM&&m.author&&!_NXPR.estConfie(m.channel_id)){
_NXPR.checkImpostor(m.author);_NXPR.checkWave(m.author,content);}
try{_NXPR.scanNouveau(m,content,mine,isDM,_NXguildOf(m.channel_id));}catch(_){}
if(_NXPR.cfg.warnAccounts&&isDM&&m.author&&m.author.id&&!_NXPR.estConfie(m.channel_id)){try{
var created=(BigInt(m.author.id)>>22n)+1420070400000n;
var ageD=Math.floor((Date.now()-Number(created))/86400000);
if(ageD<7&&ageD>=0)_NXPR.warnAccount(m.author.id,ageD);
}catch(_){}}
}catch(_){}};
_NXPR.RXINVIS2=/[\u200B\u200C\u200D\u200E\u200F\u2060\u2061\u2062\u2063\u2064\uFEFF\u180E]/g;
_NXPR.scanUnicode=function(txt){try{
if(!_NXPR.cfg.unicodeGuard)return null;
var t=String(txt||"");
if(t.length<6)return null;
_NXPR.RXINVIS2.lastIndex=0;
var m=t.match(_NXPR.RXINVIS2);
if(!m||m.length<4)return null;
var visible=t.replace(_NXPR.RXINVIS2,"");
if(visible.length&&(m.length/t.length)<0.04&&m.length<12)return null;
_NXPR.stats.unicode=(_NXPR.stats.unicode||0)+1;
_NXPR.logThreat("unicode",m.length+" caracteres invisibles caches dans un message");
_NXPR.saveStats();
return {n:m.length,visible:visible.slice(0,90)};}catch(_){return null;}};
_NXPR.RXWALLET=/(?:^|[\s(<:])((?:bc1[a-z0-9]{25,62})|(?:[13][a-km-zA-HJ-NP-Z1-9]{25,34})|(?:0x[a-fA-F0-9]{40})|(?:T[A-Za-z1-9]{33})|(?:4[0-9AB][0-9a-zA-Z]{93}))(?:$|[\s)>.,!?])/;
_NXPR.MOTSCRYPTO=/(envoie|envoyer|transfere|transfert|paie|payer|depot|deposer|adresse|wallet|portefeuille|投)/i;
_NXPR.scanCrypto=function(txt,mine){try{
if(!_NXPR.cfg.cryptoGuard)return null;
var t=String(txt||"");
if(t.length<26||t.indexOf(" ")<0&&t.length<26)return null;
var m=t.match(_NXPR.RXWALLET);
if(!m)return null;
var adr=m[1];
if(mine){
try{if(_NXPR.clipLast&&_NXPR.clipLast.indexOf(adr)<0){
var mc=String(_NXPR.clipLast).match(_NXPR.RXWALLET);
if(mc&&mc[1]&&mc[1]!==adr){
_NXPR.stats.clipper=(_NXPR.stats.clipper||0)+1;
_NXPR.logThreat("clipper","adresse de portefeuille differente de celle copiee");
_NXPR.saveStats();
return {kind:"clipper",adr:adr,copiee:mc[1]};}}}catch(_){}
return null;}
_NXPR.stats.crypto=(_NXPR.stats.crypto||0)+1;
_NXPR.logThreat("crypto","adresse de portefeuille recue : "+adr.slice(0,14)+"\u2026");
_NXPR.saveStats();
return {kind:"recue",adr:adr};}catch(_){return null;}};
_NXPR.RXWHLEAK=/discord(?:app)?\.com\/api\/(?:v\d+\/)?webhooks\/\d{15,25}\/[\w-]{40,}/i;
_NXPR.scanLeak=function(txt,mine){try{
if(!_NXPR.cfg.leakGuard)return null;
if(!mine)return null;
var t=String(txt||"");
if(t.indexOf("webhooks/")<0)return null;
if(!_NXPR.RXWHLEAK.test(t))return null;
_NXPR.stats.leak=(_NXPR.stats.leak||0)+1;
_NXPR.logThreat("leak","adresse complete d un webhook Discord dans un message sortant");
_NXPR.saveStats();
return true;}catch(_){return null;}};
_NXPR.amis=null;
_NXPR.estAmi=function(id){try{
if(!id)return false;
if(!_NXPR.amis||(Date.now()-_NXPR.amisAt)>120000){
_NXPR.amis=Object.create(null);_NXPR.amisAt=Date.now();
var RS=_NXcommon().store("RelationshipStore");
var R2=RS&&RS.getRelationships&&RS.getRelationships();
if(R2)for(var k in R2){if(R2[k]===1)_NXPR.amis[k]=1;}}
return !!_NXPR.amis[id];}catch(_){return true;}};
_NXPR.dmLiens=Object.create(null);
_NXPR.scanDmLink=function(txt,isDM,auteur){try{
if(!_NXPR.cfg.dmLinkGuard)return null;
if(!isDM||!auteur||!auteur.id)return null;
var t=String(txt||"");
if(t.indexOf("http")<0)return null;
if(_NXPR.estAmi(auteur.id))return null;
var u=(t.match(/https?:\/\/[^\s<>"']+/)||[])[0];
if(!u)return null;
var h=_NXPR.host(u);
if(!h||_NXPR.isOfficial(h)||_NXPR.isAllowed(h))return null;
if(_NXPR.dmLiens[h])return null;
_NXPR.dmLiens[h]=1;
_NXPR.stats.dmlink=(_NXPR.stats.dmlink||0)+1;
_NXPR.logThreat("dmlink","lien en prive d un compte hors de tes amis : "+h);
_NXPR.saveStats();
return {host:h,url:u,auteur:(auteur.global_name||auteur.username||auteur.id)};}catch(_){return null;}};
_NXPR.vagues=Object.create(null);
_NXPR.scanRaid=function(m,gid,contenu){try{
if(!_NXPR.cfg.raidGuard)return null;
if(!gid||!m||!m.author||!m.author.id)return null;
var t=String(contenu||"").trim().toLowerCase().replace(/\s+/g," ");
if(t.length<14)return null;
var age=null;
try{age=Math.floor((Date.now()-Number((BigInt(m.author.id)>>22n)+1420070400000n))/86400000);}catch(_){}
if(age===null||age>14)return null;
var e=_NXPR.vagues[gid];
var now=Date.now();
if(!e||(now-e.t)>180000){e={t:now,msgs:{}};_NXPR.vagues[gid]=e;}
var cle=t.slice(0,60);
var g=e.msgs[cle]||(e.msgs[cle]={n:0,ids:{}});
if(g.ids[m.author.id])return null;
g.ids[m.author.id]=1;g.n++;
if(g.n<3)return null;
if(g.alerte)return null;
g.alerte=true;
_NXPR.stats.raid=(_NXPR.stats.raid||0)+1;
_NXPR.logThreat("raid",g.n+" comptes recents postent le meme message dans ce serveur");
_NXPR.saveStats();
return {n:g.n,extrait:t.slice(0,70)};}catch(_){return null;}};
_NXPR.RXRTL=/[\u202A-\u202E\u2066-\u2069]/;
_NXPR.DBLEXT=/\.(jpg|jpeg|png|gif|webp|mp4|pdf|txt|doc|docx|mp3|zip)\s*\.(exe|scr|bat|cmd|com|pif|vbs|js|jar|msi|ps1|hta|apk|lnk)$/i;
_NXPR.scanNom=function(nom){try{
if(!_NXPR.cfg.nameGuard)return null;
var n=String(nom||"");
if(n.length<5)return null;
if(_NXPR.RXRTL.test(n)){
_NXPR.stats.nom=(_NXPR.stats.nom||0)+1;
_NXPR.logThreat("nom","nom de fichier avec inversion du sens de lecture : "+n.replace(_NXPR.RXRTL,"").slice(0,50));
_NXPR.saveStats();
return {kind:"rtl",nom:n};}
if(_NXPR.DBLEXT.test(n)){
_NXPR.stats.nom=(_NXPR.stats.nom||0)+1;
_NXPR.logThreat("nom","double extension trompeuse : "+n.slice(0,50));
_NXPR.saveStats();
return {kind:"double",nom:n};}
return null;}catch(_){return null;}};
_NXPR.scanNouveau=function(m,contenu,mine,isDM,gid){try{
var r;
r=_NXPR.scanUnicode(contenu);
if(r&&!mine)_NXPR.toast(_NXtr("Message contenant ")+_NXtr(r.n)+_NXtr(" caracteres invisibles : quelque chose y est cache."),0);
r=_NXPR.scanCrypto(contenu,mine);
if(r&&r.kind==="clipper")_NXPR.blockedPrompt(r.adr,{kind:"clipper",host:r.adr.slice(0,18)});
else if(r&&!mine)_NXPR.toast(_NXtr("Adresse de portefeuille recue. Ne l utilise que si tu l as demandee."),0);
if(_NXPR.scanLeak(contenu,mine))
_NXPR.toast(_NXtr("Ce message contient l adresse complete d un webhook : n importe qui pourra ecrire dans ce salon."),0);
r=_NXPR.scanDmLink(contenu,isDM,m&&m.author);
if(r)_NXPR.toast(_NXtr("Lien en prive de la part de ")+_NXtr(r.auteur)+_NXtr(", qui n est pas dans tes amis (")+_NXtr(r.host)+").",0);
if(!mine&&gid){r=_NXPR.scanRaid(m,gid,contenu);
if(r)_NXPR.toast(_NXtr("Vague detectee : ")+_NXtr(r.n)+_NXtr(" comptes recents postent le meme message ici."),0);}
if(!mine){try{var A=(m&&m.attachments)||[];
for(var a=0;a<A.length&&a<6;a++){
var rn=_NXPR.scanNom(A[a]&&(A[a].filename||A[a].name));
if(rn)_NXPR.toast(rn.kind==="rtl"
?_NXtr("Nom de fichier truque : le sens de lecture est inverse pour cacher la vraie extension.")
:_NXtr("Nom de fichier a double extension : ce n est pas l image qu il pretend etre."),0);}}catch(_){}}
}catch(_){}};
_NXPR.anchorOf=function(t){try{var d=0;while(t&&d<8){if(t.tagName==="A"&&(t.href||(t.getAttribute&&t.getAttribute("href"))))return t;t=t.parentElement;d++;}}catch(_){}return null;};
_NXPR.hrefOf=function(a){try{var h=(a&&(a.href||a.getAttribute("href")))||"";h=String(h);return /^https?:/i.test(h)?h:"";}catch(_){return "";}};
_NXPR.DLEXT={exe:1,scr:1,bat:1,cmd:1,com:1,pif:1,vbs:1,vbe:1,jse:1,jar:1,msi:1,ps1:1,hta:1,cpl:1,reg:1,lnk:1,apk:1,dll:1,sh:1,run:1,bin:1,iso:1,img:1,msc:1,wsf:1,scf:1};
_NXPR.fileLink=function(u){try{
var s=String(u||"").split("#")[0].split("?")[0];
var m=s.match(/\.([a-z0-9]{1,5})$/i);
if(!m)return null;
var ext=m[1].toLowerCase();
if(!_NXPR.DLEXT[ext])return null;
var h=_NXPR.host(u);
var trusted=false;
try{trusted=_NXPR.isOfficial(h)||_NXPR.isAllowed(h)||(_NXPR.remoteAllow&&_NXPR.hit(h,_NXPR.remoteAllow))||/^(github\.com|objects\.githubusercontent\.com|raw\.githubusercontent\.com|cdn\.discordapp\.com|media\.discordapp\.net)$/.test(h||"");}catch(_){}
return {ext:ext,host:h,trusted:trusted};}catch(_){return null;}};
_NXPR.QKEY="nexium_quarantine";
_NXPR.quar=(function(){try{var r=_NXDB.get(_NXPR.QKEY);var d=r?JSON.parse(r):null;return Array.isArray(d)?d:[];}catch(_){return [];}})();
_NXPR.saveQuar=function(){try{_NXDB.set(_NXPR.QKEY,JSON.stringify(_NXPR.quar.slice(0,30)));}catch(_){}};
_NXPR.addQuar=function(url,cl){try{
var h=(cl&&cl.host)||_NXPR.host(url)||"";
for(var a=0;a<_NXPR.quar.length;a++){if(_NXPR.quar[a].u===url){_NXPR.quar[a].t=Date.now();_NXPR.quar[a].n=(_NXPR.quar[a].n||1)+1;_NXPR.saveQuar();_NXPR.notify();return;}}
_NXPR.quar.unshift({u:String(url).slice(0,300),h:h,k:(cl&&cl.kind)||"other",t:Date.now(),n:1});
if(_NXPR.quar.length>30)_NXPR.quar=_NXPR.quar.slice(0,30);
_NXPR.saveQuar();_NXPR.notify();}catch(_){}};
_NXPR.delQuar=function(idx){try{_NXPR.quar.splice(idx,1);_NXPR.saveQuar();_NXPR.notify();}catch(_){}};
_NXPR.clearQuar=function(){try{_NXPR.quar=[];_NXPR.saveQuar();_NXPR.notify();}catch(_){}};
_NXPR.openQuar=function(url){try{
if(typeof VencordNative!=="undefined"&&VencordNative.native&&VencordNative.native.openExternal)VencordNative.native.openExternal(url);
else if(window.VencordNative&&window.VencordNative.native)window.VencordNative.native.openExternal(url);}catch(_){}};
_NXPR.blocksKind=function(cl){if(!cl)return false;if(cl.kind==="grabber")return !!_NXPR.cfg.blockGrabbers;if(cl.kind==="phish"||cl.kind==="punycode")return !!_NXPR.cfg.phishGuard;return false;};
_NXPR.bumpSafe=function(){try{_NXPR.stats.safe=(_NXPR.stats.safe||0)+1;if(_NXPR._st)return;_NXPR._st=setTimeout(function(){_NXPR._st=null;_NXPR.saveStats();_NXPR.notify();},5000);}catch(_){}};
_NXPR.onClickCapture=function(e){try{
if(!_NXPR.cfg.scanLinks)return;
var a=_NXPR.anchorOf(e&&e.target);if(!a)return;
var href=_NXPR.hrefOf(a);if(!href)return;
var cl=_NXPR.classify(href);if(!cl)return;
var fl=_NXPR.cfg.scanDownloads?_NXPR.fileLink(href):null;
if(fl&&!fl.trusted&&!_NXPR.threat(cl)){
try{e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();}catch(_){}
_NXPR.stats.scanned=(_NXPR.stats.scanned||0)+1;_NXPR.stats.blocked=(_NXPR.stats.blocked||0)+1;
_NXPR.logThreat("download",fl.ext.toUpperCase()+" depuis "+fl.host);_NXPR.saveStats();
_NXPR.addQuar(href,{kind:"download",host:fl.host});
_NXPR.blockedPrompt(href,{kind:"download",host:fl.host,ext:fl.ext});return;}
if(_NXPR.threat(cl)&&_NXPR.blocksKind(cl)){
try{e.preventDefault();e.stopPropagation();if(e.stopImmediatePropagation)e.stopImmediatePropagation();}catch(_){}
_NXPR.stats.scanned=(_NXPR.stats.scanned||0)+1;_NXPR.stats.blocked=(_NXPR.stats.blocked||0)+1;_NXPR.logThreat(cl.kind,cl.host);_NXPR.saveStats();
_NXPR.addQuar(href,cl);
_NXPR.blockedPrompt(href,cl);return;}
_NXPR.stats.scanned=(_NXPR.stats.scanned||0)+1;
if(cl.kind==="suspect"){_NXPR.logThreat("suspect",cl.host);_NXPR.saveStats();
var r1=(cl.why&&cl.why.length)?cl.why[0]:"signaux inhabituels";
_NXPR.avis("Lien suspect ("+cl.host+") : "+r1+". Verifie avant de continuer.",0);return;}
if(cl.kind==="short"){_NXPR.bumpSafe();
_NXPR.avis("Lien raccourci : destination masquee ("+cl.host+")",1);return;}
_NXPR.bumpSafe();
}catch(_){}};
_NXPR.RXOAUTH=/https?:\/\/(?:[\w-]+\.)?discord(?:app)?\.com\/(?:api\/)?oauth2\/authorize\?[^\s<>"')]+/gi;
_NXPR.OAUTHRISK={"bot":"ajouter un bot a tes serveurs","webhook.incoming":"creer un webhook dans tes salons","guilds.join":"te faire rejoindre des serveurs","gdm.join":"t ajouter a des groupes prives","connections":"lire tes comptes lies","email":"lire ton adresse e-mail","messages.read":"lire tes messages","relationships.read":"lire ta liste d amis","applications.entitlements":"lire tes achats"};
_NXPR.oauthInfo=function(u){try{
var q=String(u||"").split("?")[1]||"";
var out={scopes:[],perms:"0",admin:false,risky:[]};
var parts=q.split("&");
for(var a=0;a<parts.length;a++){
var eq=parts[a].indexOf("=");if(eq<0)continue;
var k="",v="";
try{k=decodeURIComponent(parts[a].slice(0,eq));v=decodeURIComponent(parts[a].slice(eq+1).replace(/\+/g," "));}catch(_){continue;}
if(k==="scope"){var sc=v.split(/[\s,]+/);for(var b=0;b<sc.length;b++)if(sc[b])out.scopes.push(sc[b].toLowerCase());}
if(k==="permissions")out.perms=String(v||"0").replace(/[^0-9]/g,"")||"0";}
for(var c=0;c<out.scopes.length;c++){if(_NXPR.OAUTHRISK[out.scopes[c]]&&out.risky.indexOf(out.scopes[c])<0)out.risky.push(out.scopes[c]);}
try{if(typeof BigInt==="function")out.admin=((BigInt(out.perms)&8n)===8n);else out.admin=((parseInt(out.perms,10)&8)===8);}catch(_){}
return out;}catch(_){return null;}};
_NXPR.scanOAuth=function(txt){try{
if(!_NXPR.cfg.oauthGuard)return null;
var s=String(txt||"");
if(s.toLowerCase().indexOf("oauth2/authorize")<0)return null;
_NXPR.RXOAUTH.lastIndex=0;
var m,found=null;
while((m=_NXPR.RXOAUTH.exec(s))){
var inf=_NXPR.oauthInfo(m[0]);
if(!inf)continue;
if(!inf.risky.length&&!inf.admin)continue;
found={url:m[0],info:inf};break;}
if(!found)return null;
var why=[];
if(found.info.admin)why.push("permissions administrateur");
for(var a=0;a<found.info.risky.length&&a<3;a++)why.push(_NXPR.OAUTHRISK[found.info.risky[a]]);
_NXPR.stats.oauth=(_NXPR.stats.oauth||0)+1;
_NXPR.logThreat("oauth",why.join(" ; ").slice(0,90));
_NXPR.saveStats();
_NXPR.toast(_NXtr("Autorisation d application a portee dangereuse : ")+_NXtr(why.join(", "))+_NXtr(". N autorise pas."),0);
return found;}catch(_){return null;}};
_NXPR.RXSCHEME=/(?:^|[\s(<\[|"'])((?:javascript|vbscript|jar|file|about|chrome|data)\s*:[^\s<>"')\]]{4,})/gi;
_NXPR.SCHEMEBAD={javascript:1,vbscript:1,jar:1,file:1,about:1,chrome:1};
_NXPR.RXDATABAD=/^data\s*:\s*(?:text\/html|image\/svg\+xml|application\/(?:x-)?(?:javascript|ecmascript))/i;
_NXPR.scanScheme=function(txt){try{
if(!_NXPR.cfg.schemeGuard)return null;
var s=String(txt||"");
if(!/(?:javascript|vbscript|jar|file|about|chrome|data)\s*:/i.test(s))return null;
_NXPR.RXSCHEME.lastIndex=0;
var m,hit=null;
while((m=_NXPR.RXSCHEME.exec(s))){
var raw=m[1];
var sch=raw.split(":")[0].trim().toLowerCase();
if(sch==="data"){if(!_NXPR.RXDATABAD.test(raw))continue;}
else if(!_NXPR.SCHEMEBAD[sch])continue;
hit={scheme:sch,raw:raw.slice(0,120)};break;}
if(!hit)return null;
_NXPR.stats.scheme=(_NXPR.stats.scheme||0)+1;
_NXPR.logThreat("scheme",hit.scheme+" : "+hit.raw.slice(0,50));
_NXPR.saveStats();
_NXPR.toast(_NXtr("Lien a schema executable (")+_NXtr(hit.scheme)+_NXtr(":) : ne le colle nulle part, il execute du code."),0);
return hit;}catch(_){return null;}};
_NXPR.RXBIDI=/[\u202A-\u202E\u2066-\u2069]/;
_NXPR.RXINVIS=/[\u200B\u200C\u200E\u200F\u2060-\u2064\u206A-\u206F\uFEFF\u180E]/;
_NXPR.RXNONLAT=/[\u0400-\u04FF\u0370-\u03FF\u0530-\u058F\u0590-\u05FF]/;
_NXPR.rawHost=function(u){try{
var t=String(u||"").replace(/^[a-z]+:\/\//i,"");
t=t.split(/[\/?#]/)[0];
var at=t.indexOf("@");if(at>=0)t=t.slice(at+1);
var co=t.lastIndexOf(":");if(co>0&&t.indexOf("]")<0)t=t.slice(0,co);
return t;}catch(_){return "";}};
_NXPR.mixedScript=function(h){try{
var t=String(h||"");
return _NXPR.RXNONLAT.test(t)&&/[a-z]/i.test(t);}catch(_){return false;}};
_NXPR.scanBidi=function(txt){try{
if(!_NXPR.cfg.bidiGuard)return null;
var s=String(txt||"");if(!s)return null;
var why=null;
if(_NXPR.RXBIDI.test(s))why="inversion du sens de lecture";
if(!why){
var urls=s.match(/https?:\/\/[^\s<>"')]+/gi)||[];
for(var a=0;a<urls.length&&!why;a++){
if(_NXPR.RXINVIS.test(urls[a]))why="caracteres invisibles dans un lien";
else{var h=_NXPR.rawHost(urls[a]);if(h&&_NXPR.mixedScript(h))why="alphabets melanges dans "+h;}}}
if(!why)return null;
_NXPR.stats.bidi=(_NXPR.stats.bidi||0)+1;
_NXPR.logThreat("bidi",why);
_NXPR.saveStats();
_NXPR.toast(_NXtr("Contenu trompeur : ")+_NXtr(why)+_NXtr(". Le texte affiche ne correspond pas au texte reel."),0);
return {why:why};}catch(_){return null;}};
_NXPR.RXIP4=/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
_NXPR.isRawIp=function(h){try{
var t=String(h||"");
if(!t)return false;
if(t.charAt(0)==="["&&t.indexOf("]")>0)return true;
var m=t.match(_NXPR.RXIP4);
if(!m)return false;
for(var a=1;a<=4;a++){var n=parseInt(m[a],10);if(!(n>=0&&n<=255))return false;}
return true;}catch(_){return false;}};
_NXPR.scanRawIp=function(txt){try{
if(!_NXPR.cfg.ipGuard)return null;
var s=String(txt||"");
if(s.indexOf("http")<0)return null;
var urls=s.match(/https?:\/\/[^\s<>"')]+/gi)||[];
var hit=null;
for(var a=0;a<urls.length;a++){var h=_NXPR.host(urls[a]);if(h&&_NXPR.isRawIp(h)){hit=h;break;}}
if(!hit)return null;
_NXPR.stats.rawip=(_NXPR.stats.rawip||0)+1;
_NXPR.logThreat("rawip",hit);
_NXPR.saveStats();
_NXPR.toast(_NXtr("Lien vers une adresse IP brute (")+_NXtr(hit)+_NXtr(") : aucun service legitime ne partage ses liens ainsi."),0);
return {host:hit};}catch(_){return null;}};
_NXPR.CODEPAT=[
/code\s+(?:a|\u00e0)\s+(?:6|six)\s+chiffres/i,
/code\s+de\s+(?:v\u00e9rification|verification|secours|sauvegarde|r\u00e9cup\u00e9ration|recuperation)/i,
/(?:verification|backup|recovery|login|security)\s+code/i,
/(?:envoie|envoi|donne|passe|transmets|balance|dis)[^.\n]{0,45}\bcode\b/i,
/(?:send|give|share|paste|tell)[^.\n]{0,45}\bcode\b/i,
/\bcode\b[^.\n]{0,45}(?:que|qu')\s*(?:discord|je|tu|on)[^.\n]{0,35}(?:envoy|re\u00e7u|recu)/i,
/\b(?:2fa|otp|mfa)\b[^.\n]{0,30}\bcode\b|\bcode\b[^.\n]{0,30}\b(?:2fa|otp|mfa)\b/i
];
_NXPR.scanCode=function(txt,isDM){try{
if(!_NXPR.cfg.codeGuard)return null;
var s=String(txt||"");
if(s.length<10)return null;
if(!/\bcode\b|\b2fa\b|\botp\b|\bmfa\b/i.test(s))return null;
var hit=false;
for(var a=0;a<_NXPR.CODEPAT.length;a++){if(_NXPR.CODEPAT[a].test(s)){hit=true;break;}}
if(!hit)return null;
_NXPR.stats.code=(_NXPR.stats.code||0)+1;
_NXPR.logThreat("code",s.slice(0,60));
_NXPR.saveStats();
_NXPR.toast(_NXtr("On te demande un code de verification. Ni Discord ni son support ne demandent jamais ca : ne le donne a personne."),0);
return {dm:!!isDM};}catch(_){return null;}};
_NXPR.scanExtra=function(content,isDM){try{
_NXPR.scanOAuth(content);
_NXPR.scanScheme(content);
_NXPR.scanBidi(content);
_NXPR.scanRawIp(content);
_NXPR.scanCode(content,isDM);
}catch(_){}};
_NXPR.SBXBRANDS=[["discord",/discord|nitro|dsc\b/i],["steam",/steam|csgo|cs2/i],["roblox",/roblox|robux/i],["epic",/epic\s*games|fortnite|vbucks/i],["crypto",/wallet|seed\s*phrase|metamask|binance|ledger/i]];
_NXPR.sbxHost=function(u){try{
var t=String(u||"").replace(/^[a-z]+:\/\//i,"").split(/[\/?#]/)[0];
var at=t.indexOf("@");if(at>=0)t=t.slice(at+1);
return t.toLowerCase();}catch(_){return "";}};
_NXPR.sbxAnalyse=function(html,finalUrl,baseUrl){try{
var out={host:_NXPR.sbxHost(finalUrl||baseUrl),finalUrl:finalUrl||baseUrl,redirige:false,
titre:"",desc:"",texte:"",formulaires:0,motDePasse:false,champsCaches:0,
destinations:[],scripts:[],iframes:0,metaRefresh:null,marques:[],alertes:[],score:0};
out.redirige=!!(finalUrl&&baseUrl&&_NXPR.sbxHost(finalUrl)!==_NXPR.sbxHost(baseUrl));
var doc=null;
try{doc=new DOMParser().parseFromString(String(html||""),"text/html");}catch(_){}
if(!doc)return out;
try{out.titre=String((doc.title||"")).trim().slice(0,140);}catch(_){}
try{var md=doc.querySelector('meta[name="description"],meta[property="og:description"]');
if(md)out.desc=String(md.getAttribute("content")||"").trim().slice(0,220);}catch(_){}
try{var mr=doc.querySelector('meta[http-equiv]');
if(mr&&/refresh/i.test(mr.getAttribute("http-equiv")||"")){out.metaRefresh=String(mr.getAttribute("content")||"").slice(0,160);}}catch(_){}
try{var body=doc.body?String(doc.body.textContent||""):"";
out.texte=body.replace(/\s+/g," ").trim().slice(0,600);}catch(_){}
try{var forms=doc.querySelectorAll("form");out.formulaires=forms.length;
for(var a=0;a<forms.length&&a<12;a++){
var act=forms[a].getAttribute("action")||"";
if(act&&/^https?:\/\//i.test(act)){var h=_NXPR.sbxHost(act);if(h&&out.destinations.indexOf(h)<0)out.destinations.push(h);}}}catch(_){}
try{out.motDePasse=!!doc.querySelector('input[type="password"]');}catch(_){}
try{out.champsCaches=doc.querySelectorAll('input[type="hidden"]').length;}catch(_){}
try{var sc=doc.querySelectorAll("script[src]");
for(var b=0;b<sc.length&&b<40;b++){var s2=sc[b].getAttribute("src")||"";
if(/^https?:\/\//i.test(s2)){var h2=_NXPR.sbxHost(s2);if(h2&&h2!==out.host&&out.scripts.indexOf(h2)<0)out.scripts.push(h2);}}}catch(_){}
try{out.iframes=doc.querySelectorAll("iframe").length;}catch(_){}
var blob=(out.titre+" "+out.desc+" "+out.texte).toLowerCase();
for(var c=0;c<_NXPR.SBXBRANDS.length;c++){if(_NXPR.SBXBRANDS[c][1].test(blob))out.marques.push(_NXPR.SBXBRANDS[c][0]);}
var officiel=false;try{officiel=_NXPR.isOfficial&&_NXPR.isOfficial(out.host);}catch(_){}
if(out.motDePasse){out.score+=4;out.alertes.push("la page demande un mot de passe");}
if(out.motDePasse&&out.marques.length&&!officiel){out.score+=4;out.alertes.push("elle imite "+out.marques[0]+" sans en etre le domaine officiel");}
if(out.destinations.length){
for(var d=0;d<out.destinations.length;d++){
if(out.destinations[d]!==out.host){out.score+=3;out.alertes.push("le formulaire envoie vers "+out.destinations[d]);break;}}}
if(out.redirige){out.score+=1;out.alertes.push("redirection vers "+out.host);}
if(out.metaRefresh){out.score+=2;out.alertes.push("redirection automatique programmee");}
if(out.champsCaches>=6){out.score+=1;out.alertes.push(out.champsCaches+" champs caches");}
if(out.scripts.length>=6){out.score+=1;out.alertes.push(out.scripts.length+" domaines de scripts externes");}
if(out.iframes>=3){out.score+=1;out.alertes.push(out.iframes+" cadres imbriques");}
out.verdict=out.score>=6?"danger":out.score>=3?"suspect":"neutre";
return out;}catch(_){return {host:"",alertes:[],score:0,verdict:"neutre",scripts:[],destinations:[],marques:[]};}};
_NXPR.SBX="https://emcoqnvxriyrchmfpunq.supabase.co/functions/v1/sbx";
// L inspection directe, depuis le client. Elle ne reussit que sur les sites
// qui autorisent la lecture par n importe qui : c est le repli, pas la voie
// normale.
_NXPR.sbxDirect=function(url,cb){try{
_NXNETX.go(url,{method:"GET",redirect:"follow",mode:"cors",cache:"no-store",
headers:{"Accept":"text/html"}},14000)
.then(function(r){
if(!r)throw 0;
var fin=(r.url||url);
var ct="";try{ct=(r.headers&&r.headers.get&&r.headers.get("content-type"))||"";}catch(_){}
if(ct&&ct.indexOf("text/html")<0&&ct.indexOf("text/plain")<0){
cb({erreur:"la reponse n est pas une page web ("+ct.split(";")[0]+")",
host:_NXPR.sbxHost(fin),finalUrl:fin});return null;}
return r.text().then(function(t){
var res=_NXPR.sbxAnalyse(String(t||"").slice(0,400000),fin,url);
res.voie="directe";
cb(res);return null;});})
.catch(function(){cb({erreur:"page injoignable, et le relais n a pas repondu",
host:_NXPR.sbxHost(url),finalUrl:url});});
}catch(_){cb({erreur:"analyse impossible"});}};

_NXPR.sandbox=function(url,cb){try{
if(!url||!/^https?:\/\//i.test(url)){cb&&cb({erreur:"adresse invalide"});return;}
var fini=false;
var rendre=function(r){if(fini)return;fini=true;
try{if(r&&!r.erreur)_NXPR.logThreat("sandbox",r.host+" : "+(r.alertes&&r.alertes[0]||r.verdict||"inspecte"));}catch(_){}
cb&&cb(r);};
_NXNETX.go(_NXPR.SBX,{method:"POST",cache:"no-store",
headers:{"Content-Type":"application/json",apikey:_NXSTATUS.CLE},
body:JSON.stringify({url:url})},25000)
.then(function(r){if(!r)throw 0;return r.json();})
.then(function(j){
if(!j||(!j.ok&&!j.erreur))throw 0;
if(j.erreur&&!j.ok){
// Le relais a repondu, mais le site n a rien donne : inutile de retenter
// en direct, le navigateur ferait moins bien.
rendre({erreur:j.erreur,host:_NXPR.sbxHost(url),finalUrl:(j.finalUrl||url),
chaine:j.chaine||[],voie:"relais"});return null;}
var res=_NXPR.sbxAnalyse(String(j.html||""),j.finalUrl||url,url);
res.voie="relais";
res.statut=j.statut;
res.type=j.type;
res.taille=j.taille;
res.tronquee=!!j.tronquee;
res.ms=j.ms;
res.entetes=j.entetes||null;
res.domaine=j.domaine||null;
// La chaine de redirections : c est elle qui trahit un raccourcisseur.
res.chaine=[];
try{for(var a=0;a<(j.chaine||[]).length;a++){
var e=j.chaine[a];
res.chaine.push({url:e.url,host:_NXPR.sbxHost(e.url),statut:e.statut});}}catch(_){}
if(res.chaine.length>1){
res.redirige=true;
var dep=res.chaine[0].host,arr=res.chaine[res.chaine.length-1].host;
if(dep&&arr&&dep!==arr){
res.alertes=res.alertes||[];
res.alertes.unshift("redirige "+dep+" vers "+arr);
res.score=(res.score||0)+1;}}
try{if(j.entetes&&j.entetes.csp===false&&res.motDePasse){
res.alertes=res.alertes||[];
res.alertes.push("page de mot de passe sans politique de securite");
res.score=(res.score||0)+1;}}catch(_){}
rendre(res);return null;})
.catch(function(){
// Le relais n a pas repondu : on tente quand meme depuis le client.
if(fini)return;
_NXPR.sbxDirect(url,rendre);});
}catch(_){cb&&cb({erreur:"analyse impossible"});}};
_NXPR.SBXID="nx-sbx-modal";
_NXPR.sbxFerme=function(){try{
var o=document.getElementById(_NXPR.SBXID);
if(o&&o.parentNode)o.parentNode.removeChild(o);}catch(_){}};
_NXPR.sbxOuvre=function(url){try{
if(typeof VencordNative!=="undefined"&&VencordNative.native&&VencordNative.native.openExternal)
VencordNative.native.openExternal(url);
else if(window.VencordNative&&window.VencordNative.native&&window.VencordNative.native.openExternal)
window.VencordNative.native.openExternal(url);}catch(_){}};
_NXPR.sbxLigne=function(t,v,P){try{
if(v===null||v===undefined||v==="")return "";
return '<div style="display:flex;gap:10px;padding:5px 0;font-size:11.5px;line-height:1.5;">'
+'<div style="flex:0 0 120px;color:'+P.faint+';">'+t+'</div>'
+'<div style="flex:1 1 auto;color:'+P.mid+';word-break:break-all;">'+v+'</div></div>';}catch(_){return "";}};
_NXPR.sbxPeint=function(r,url){try{
var corps=document.getElementById(_NXPR.SBXID+"-corps");
var pied=document.getElementById(_NXPR.SBXID+"-pied");
if(!corps)return;
var P=_NXpal;
var esc=function(x){return String(x===null||x===undefined?"":x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
if(!r||r.erreur){
corps.innerHTML=_NXtrHtml('<div style="padding:14px 15px;border-radius:13px;background:'+P.inset+';border:1px solid '+P.line+';">'
+'<div style="font-size:14px;font-weight:800;color:'+P.warn+';">La page n a pas pu etre lue</div>'
+'<div style="font-size:12px;color:'+P.dim+';margin-top:6px;line-height:1.6;">'+esc((r&&r.erreur)||"inconnu")+'</div></div>'
+((r&&r.chaine&&r.chaine.length>1)?_NXPR.sbxChaine(r.chaine,P,esc):""));
if(pied)pied.style.display="flex";
return;}
var coul=r.verdict==="danger"?P.red:r.verdict==="suspect"?P.warn:P.ok;
var titre=r.verdict==="danger"?"Page dangereuse":r.verdict==="suspect"?"Page suspecte":"Rien d alarmant dans la page";
var h='<div style="padding:14px 15px;border-radius:13px;background:'+P.inset+';border:1px solid '+coul+';">'
+'<div style="font-size:17px;font-weight:800;color:'+coul+';letter-spacing:-.02em;">'+esc(titre)+'</div>'
+'<div style="font-size:12px;color:'+P.sub+';margin-top:6px;font-family:'+_NXf.mono+';word-break:break-all;">'+esc(r.host||"")+'</div>';
if(r.motDePasse)
h+='<div style="margin-top:11px;padding:10px 12px;border-radius:10px;background:rgba(214,72,72,.12);border:1px solid rgba(214,72,72,.3);font-size:12.5px;font-weight:700;color:'+P.danger+';">Cette page demande un mot de passe.</div>';
h+='</div>';
if(r.alertes&&r.alertes.length){
h+='<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:'+P.faint+';margin:15px 0 6px;">Ce qui a ete releve</div>';
var a;
for(a=0;a<r.alertes.length&&a<8;a++)
h+='<div style="display:flex;gap:9px;align-items:flex-start;padding:6px 0;border-top:1px solid '+P.line+';">'
+'<div style="width:5px;height:5px;border-radius:50%;background:'+P.warn+';margin-top:6px;flex:0 0 auto;"></div>'
+'<div style="font-size:12px;color:'+P.mid+';line-height:1.55;">'+esc(r.alertes[a])+'</div></div>';}
h+=_NXPR.sbxChaine(r.chaine,P,esc);
h+='<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:'+P.faint+';margin:15px 0 4px;">Ce que contient la page</div>';
h+=_NXPR.sbxLigne("titre",esc(r.titre)||'<span style="color:'+P.faint+';">aucun</span>',P);
if(r.desc)h+=_NXPR.sbxLigne("description",esc(r.desc),P);
if(r.domaine&&r.domaine.age)h+=_NXPR.sbxLigne("age du domaine",esc(r.domaine.age)
+(r.domaine.registrar?(' <span style="color:'+P.faint+';">via '+esc(r.domaine.registrar)+'</span>'):""),P);
h+=_NXPR.sbxLigne("mot de passe",r.motDePasse?'<b style="color:'+P.danger+';">demande</b>':"non demande",P);
h+=_NXPR.sbxLigne("formulaires",String(r.formulaires||0)
+((r.destinations&&r.destinations.length)?(" vers "+esc(r.destinations.join(", "))):""),P);
if(r.champsCaches)h+=_NXPR.sbxLigne("champs caches",String(r.champsCaches),P);
if(r.scripts&&r.scripts.length)h+=_NXPR.sbxLigne("scripts tiers",esc(r.scripts.slice(0,8).join(", ")),P);
if(r.iframes)h+=_NXPR.sbxLigne("cadres imbriques",String(r.iframes),P);
if(r.marques&&r.marques.length)h+=_NXPR.sbxLigne("imite",esc(r.marques.join(", ")),P);
if(r.texte)
h+='<div style="margin-top:12px;padding:11px 12px;background:'+P.inset+';border:1px solid '+P.line+';border-radius:11px;'
+'font-size:11.5px;color:'+P.sub+';line-height:1.65;max-height:170px;overflow:auto;white-space:pre-wrap;">'+esc(r.texte)+'</div>';
var pieds=[];
if(r.voie)pieds.push(r.voie==="relais"?"recuperee par le relais, ton adresse IP n a pas ete exposee":"recuperee directement par le client");
if(r.statut)pieds.push("reponse "+r.statut);
if(r.taille)pieds.push(Math.round(r.taille/1024)+" ko"+(r.tronquee?" (tronquee)":""));
if(r.ms)pieds.push(r.ms+" ms");
if(pieds.length)
h+='<div style="margin-top:12px;font-size:10.5px;color:'+P.faint+';line-height:1.6;">'+esc(pieds.join(" - "))+'</div>';
corps.innerHTML=_NXtrHtml(h);
if(pied)pied.style.display="flex";}catch(_){}};
_NXPR.sbxChaine=function(ch,P,esc){try{
if(!ch||ch.length<2)return "";
var h='<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:'+P.faint+';margin:15px 0 6px;">Le chemin reel ('+ch.length+' etapes)</div>';
var a;
for(a=0;a<ch.length&&a<8;a++)
h+='<div style="display:flex;gap:9px;align-items:baseline;padding:4px 0;font-family:'+_NXf.mono+';font-size:11px;">'
+'<div style="flex:0 0 auto;color:'+P.faint+';">'+(a+1)+'.</div>'
+'<div style="flex:1 1 auto;color:'+(a===ch.length-1?P.txt:P.dim)+';word-break:break-all;">'+esc(ch[a].host||ch[a].url)+'</div>'
+'<div style="flex:0 0 auto;color:'+P.faint+';">'+esc(ch[a].statut||"")+'</div></div>';
return h;}catch(_){return "";}};
_NXPR.sbxModale=function(url){try{
if(!url)return false;
if(!/^https?:\/\//i.test(url))url="https://"+url;
if(document.getElementById(_NXPR.SBXID))return false;
var P=_NXpal;
var esc=function(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
var ov=document.createElement("div");ov.id=_NXPR.SBXID;
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.62);";
var card=document.createElement("div");
card.style.cssText="width:540px;max-width:calc(100vw - 40px);max-height:84vh;display:flex;flex-direction:column;background:"+P.panel+";border:1px solid "+P.line+";border-radius:20px;padding:22px;box-shadow:0 30px 80px rgba(0,0,0,.55);";
var tete=document.createElement("div");
tete.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Nexium Protect</div>'
+'<div style="font-size:20px;font-weight:800;color:'+P.txt+';letter-spacing:-.02em;">Voir sans ouvrir</div>'
+'<div style="font-size:11px;color:'+P.dim+';margin-top:5px;line-height:1.6;">Le relais recupere la page, le client l inspecte ici. Rien n est execute : aucun script, aucune image, aucun cadre. Le site ne voit ni ton adresse IP ni ton navigateur.</div>'
+'<div style="margin-top:10px;padding:9px 11px;border-radius:10px;background:'+P.inset+';border:1px solid '+P.line+';font-family:'+_NXf.mono+';font-size:11px;color:'+P.dim+';word-break:break-all;line-height:1.5;">'+esc(String(url).slice(0,200))+'</div>');
card.appendChild(tete);
var corps=document.createElement("div");
corps.id=_NXPR.SBXID+"-corps";
corps.style.cssText="overflow-y:auto;margin-top:14px;flex:1 1 auto;";
corps.innerHTML=_NXtrHtml('<div style="padding:22px 4px;font-size:12.5px;color:'+P.dim+';">Inspection en cours...</div>');
card.appendChild(corps);
var pied=document.createElement("div");
pied.id=_NXPR.SBXID+"-pied";
pied.style.cssText="display:none;gap:8px;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid "+P.line+";";
var mk=function(txt,style,fn){
var b=document.createElement("div");b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");
b.style.cssText=style;b.textContent=_NXtr(txt);b.onclick=fn;
b.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();fn();}};
return b;};
pied.appendChild(mk("Signaler","flex:0 0 auto;padding:9px 14px;border-radius:10px;border:1px solid "+P.line+";color:"+P.sub+";font-size:12px;font-weight:600;cursor:pointer;",
function(){_NXPR.sbxFerme();try{_NXV.reportUrl(url);}catch(_){}}));
var espace=document.createElement("div");espace.style.cssText="flex:1 1 auto;";
pied.appendChild(espace);
pied.appendChild(mk("Ouvrir quand meme","flex:0 0 auto;padding:9px 14px;border-radius:10px;border:1px solid "+P.line+";color:"+P.soft+";font-size:12px;font-weight:600;cursor:pointer;",
function(){_NXPR.sbxFerme();_NXPR.sbxOuvre(url);}));
pied.appendChild(mk("Fermer","flex:0 0 auto;padding:9px 16px;border-radius:10px;background:"+P.acc+";color:"+P.ink+";font-size:12px;font-weight:700;cursor:pointer;",
function(){_NXPR.sbxFerme();}));
card.appendChild(pied);
ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)_NXPR.sbxFerme();};
if(document.body)document.body.appendChild(ov);
_NXPR.sandbox(url,function(r){_NXPR.sbxPeint(r,url);});
return true;}catch(_){return false;}};
// Plusieurs liens dans un message : on demande lequel, plutot que de deviner.
_NXPR.sbxChoisir=function(urls){try{
if(!urls||!urls.length)return false;
if(urls.length===1)return _NXPR.sbxModale(urls[0]);
if(document.getElementById("nx-sbxpick-modal"))return false;
var P=_NXpal;
var ov=document.createElement("div");ov.id="nx-sbxpick-modal";
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.6);";
var card=document.createElement("div");
card.style.cssText="width:460px;max-width:calc(100vw - 40px);max-height:70vh;overflow-y:auto;background:"+P.panel+";border:1px solid "+P.line+";border-radius:20px;padding:22px;";
card.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Nexium Protect</div>'
+'<div style="font-size:18px;font-weight:800;color:'+P.txt+';margin-bottom:12px;">Quel lien veux-tu voir sans l ouvrir ?</div>');
var ferme=function(){try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}};
var a;
for(a=0;a<urls.length;a++){(function(u){
var b=document.createElement("div");b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");
b.style.cssText="padding:10px 12px;margin-bottom:6px;border-radius:10px;background:"+P.inset+";border:1px solid "+P.line+";font-size:11.5px;font-family:"+_NXf.mono+";color:"+P.sub+";cursor:pointer;word-break:break-all;";
b.textContent=String(u).slice(0,140);
b.onclick=function(){ferme();_NXPR.sbxModale(u);};
card.appendChild(b);})(urls[a]);}
var ann=document.createElement("div");ann.className="nx-fx";ann.setAttribute("role","button");ann.setAttribute("tabindex","0");
ann.style.cssText="margin-top:8px;text-align:center;padding:11px;border-radius:11px;border:1px solid "+P.line+";color:"+P.sub+";font-size:13px;font-weight:600;cursor:pointer;";
ann.textContent=_NXtr("Annuler");
ann.onclick=ferme;
card.appendChild(ann);ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)ferme();};
if(document.body)document.body.appendChild(ov);
return true;}catch(_){return false;}};
_NXPR.sbxDepuisMessage=function(msg){try{
var urls=[];
try{if(window._NXV&&_NXV.extractUrls)urls=_NXV.extractUrls(msg&&msg.content)||[];}catch(_){}
try{if(msg&&msg.embeds)for(var a=0;a<msg.embeds.length;a++){
var u=msg.embeds[a]&&msg.embeds[a].url;
if(u&&urls.indexOf(u)<0)urls.push(u);}}catch(_){}
if(!urls.length){try{_NXPR.toast(_NXtr("Aucun lien a inspecter dans ce message."),1);}catch(_){}return false;}
return _NXPR.sbxChoisir(urls.slice(0,8));}catch(_){return false;}};
_NXPR.CRITICAL=["classify","scanText","scanMasked","scanInvites","scanEmbeds","scanAttachments","scanSecrets","verifyFile","deepFile","matchSig","warnAccount","checkImpostor","checkWave","consoleWarn","onPaste","onMsg","onMsgUpdate","onClickCapture","report","loadRemote","parseList","buildIndex","heuristic","applyProfile","oauthInfo","scanOAuth","scanScheme","scanBidi","isRawIp","scanRawIp","scanCode","scanExtra","rawHost","mixedScript","sandbox","sbxDirect","sbxAnalyse","sbxHost","sbxModale","sbxPeint","sbxDepuisMessage","masqueScan","masqueUn","masqueVerdict","masqueVeille"];
_NXPR.selfCheck=function(final){try{
var miss=[];
for(var a=0;a<_NXPR.CRITICAL.length;a++){var f=_NXPR.CRITICAL[a];
if(typeof _NXPR[f]!=="function")miss.push(f);}
var rx=["RXTOKEN","RXHOOK","RXSELFXSS","RXREAL","RXFAKE","RXINV","RXOAUTH","RXSCHEME","RXBIDI","RXINVIS","RXIP4"];
for(var b=0;b<rx.length;b++){if(!(_NXPR[rx[b]] instanceof RegExp))miss.push(rx[b]);}
if(!miss.length){_NXPR.missing=[];_NXPR._scOK=true;return [];}
if(!final){_NXPR._scPend=miss;return miss;}
if(!_NXPR._scPend||_NXPR._scPend.length!==miss.length){_NXPR.missing=[];return [];}
_NXPR.missing=miss;
var msg="Nexium Protect incomplet : "+miss.length+" element(s) manquant(s) - "+miss.slice(0,6).join(", ");
try{if(window._NXERR){_NXERR.push("selfCheck :: "+msg);if(window._NXsaveErr)_NXsaveErr();}}catch(_){}
try{console.warn("[Nexium]",msg);}catch(_){}
try{_NXPR.toast(_NXtr("Nexium Protect est incomplet (")+_NXtr(miss.length)+_NXtr(" fonctions manquantes). Va dans Nexium Donnees > Journal des erreurs."),0);}catch(_){}
return miss;}catch(_){return [];}};
try{setTimeout(function(){_NXPR.selfCheck(false);},8000);setTimeout(function(){_NXPR.selfCheck(true);},20000);}catch(_){}
_NXV.ctxWired=false;
_NXV.extractUrls=function(txt){try{
var s=String(txt||"");var out=[];
var m=s.match(/https?:\/\/[^\s<>"']{4,300}/gi)||[];
for(var a=0;a<m.length&&out.length<6;a++){var u=m[a].replace(/[),.\]]+$/,"");if(out.indexOf(u)<0)out.push(u);}
var md=s.match(/\]\((https?:\/\/[^\s)]{4,300})\)/gi)||[];
for(var b=0;b<md.length&&out.length<8;b++){var u2=md[b].replace(/^\]\(|\)$/g,"");if(out.indexOf(u2)<0)out.push(u2);}
return out;}catch(_){return [];}};
_NXV.reportFromMessage=function(msg){try{
var urls=_NXV.extractUrls(msg&&msg.content);
try{if(msg&&msg.embeds)for(var a=0;a<msg.embeds.length;a++){var u=msg.embeds[a]&&msg.embeds[a].url;if(u&&urls.indexOf(u)<0)urls.push(u);}}catch(_){}
try{if(msg&&msg.attachments)for(var b=0;b<msg.attachments.length;b++){var f=msg.attachments[b];if(f&&f.url&&urls.length<8)urls.push(f.url);}}catch(_){}
if(!urls.length){if(window._NXPR)_NXPR.toast(_NXtr("Aucun lien a signaler dans ce message."),1);return;}
if(urls.length===1){_NXV.reportUrl(urls[0]);return;}
_NXV.pickUrl(urls);}catch(_){}};
_NXV.reportUrl=function(url){try{
var cl=_NXPR.classify(url)||{kind:"suspect",host:_NXPR.host(url)};
_NXPR.reportPrompt({k:cl.kind==="ok"?"suspect":cl.kind,host:cl.host,kind:cl.kind,score:cl.score,why:cl.why});
}catch(_){}};
_NXV.pickUrl=function(urls){try{
if(document.getElementById("nx-pick-modal"))return;
var P=_NXpal;
var ov=document.createElement("div");ov.id="nx-pick-modal";
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.6);backdrop-filter:blur(6px);";
var card=document.createElement("div");
card.style.cssText="width:460px;max-width:calc(100vw - 40px);max-height:70vh;overflow-y:auto;background:"+P.panel+";border:1px solid "+P.line+";border-radius:20px;padding:22px;";
card.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Nexium Protect</div>'
+'<div style="font-size:18px;font-weight:800;color:'+P.txt+';margin-bottom:12px;">Quel lien veux-tu signaler ?</div>');
var esc=function(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
for(var a=0;a<urls.length;a++){(function(u){
var b=document.createElement("div");b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");
b.style.cssText="padding:10px 12px;margin-bottom:6px;border-radius:10px;background:"+P.inset+";border:1px solid "+P.line+";font-size:11.5px;font-family:monospace;color:"+P.sub+";cursor:pointer;word-break:break-all;";
b.textContent=String(u).slice(0,140);
b.onclick=function(){try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}_NXV.reportUrl(u);};
card.appendChild(b);})(urls[a]);}
var cancel=document.createElement("div");cancel.className="nx-fx";cancel.setAttribute("role","button");cancel.setAttribute("tabindex","0");
cancel.style.cssText="margin-top:8px;text-align:center;padding:11px;border-radius:11px;border:1px solid "+P.line+";color:"+P.sub+";font-size:13px;font-weight:600;cursor:pointer;";
cancel.textContent=_NXtr("Annuler");
cancel.onclick=function(){try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}};
card.appendChild(cancel);ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov&&ov.parentNode)ov.parentNode.removeChild(ov);};
if(document.body)document.body.appendChild(ov);
}catch(_){}};
try{_NXV.wireUpload();}catch(_){}
_NXV.remindPrompt=function(msg){try{
if(document.getElementById("nx-remind-modal"))return;
var P=_NXpal;
var ov=document.createElement("div");ov.id="nx-remind-modal";
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.62);backdrop-filter:blur(6px);";
var card=document.createElement("div");
card.style.cssText="width:400px;max-width:calc(100vw - 40px);background:"+P.panel+";border:1px solid "+P.line+";border-radius:20px;padding:24px;box-shadow:0 30px 80px rgba(0,0,0,.55);";
var who="";try{who=(msg&&msg.author&&(msg.author.global_name||msg.author.username))||"";}catch(_){}
var apercu="";try{apercu=String((msg&&msg.content)||"").slice(0,90);}catch(_){}
var esc=function(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
card.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Nexium Auto</div>'
+'<div style="font-size:19px;font-weight:800;color:'+P.txt+';letter-spacing:-.02em;margin-bottom:10px;">Me le rappeler</div>'
+(who?('<div style="font-size:12px;color:'+P.dim+';margin-bottom:4px;">message de '+esc(who)+'</div>'):"")
+(apercu?('<div style="font-size:12px;color:'+P.sub+';line-height:1.55;margin-bottom:16px;">'+esc(apercu)+'</div>'):'<div style="height:8px;"></div>'));
var row=document.createElement("div");
row.style.cssText="display:flex;gap:7px;flex-wrap:wrap;";
var mk=function(label,mins){
var b=document.createElement("div");
b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("aria-label",_NXtr(label));b.setAttribute("tabindex","0");
b.style.cssText="padding:9px 14px;border-radius:10px;border:1px solid "+P.line+";color:"+P.sub+";font-size:12px;font-weight:700;cursor:pointer;";
b.textContent=_NXtr(label);
b.onclick=function(){try{_NXV.remindMake(msg,mins,who,apercu);}catch(_){}try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}};
return b;};
row.appendChild(mk("10 min",10));row.appendChild(mk("1 h",60));row.appendChild(mk("2 h",120));
row.appendChild(mk("Ce soir",-1));row.appendChild(mk("Demain",-2));
card.appendChild(row);
var cancel=document.createElement("div");
cancel.className="nx-fx";cancel.setAttribute("role","button");cancel.setAttribute("aria-label",_NXtr("Annuler"));cancel.setAttribute("tabindex","0");
cancel.style.cssText="margin-top:14px;text-align:center;padding:9px;border-radius:10px;color:"+P.faint+";font-size:12px;cursor:pointer;";
cancel.textContent=_NXtr("Annuler");
cancel.onclick=function(){try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}};
card.appendChild(cancel);
ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov&&ov.parentNode)ov.parentNode.removeChild(ov);};
if(document.body)document.body.appendChild(ov);
}catch(_){}};
_NXV.remindWhen=function(mins){try{
var d=new Date();
if(mins===-1){d.setHours(20,0,0,0);if(d.getTime()<=Date.now())d.setTime(Date.now()+3600000);return d.getTime();}
if(mins===-2){d.setDate(d.getDate()+1);d.setHours(9,0,0,0);return d.getTime();}
return Date.now()+Math.max(1,mins)*60000;}catch(_){return Date.now()+3600000;}};
_NXV.remindMake=function(msg,mins,who,apercu){try{
if(!window._NXAU||!_NXAU.add){try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Le moteur d automatisation n est pas disponible."),0);}catch(_){}return;}
var at=_NXV.remindWhen(mins);
var nom="Rappel"+(who?" — "+who:"");
var texte=(who?(who+" : "):"")+(apercu||"message mis de cote");
var t=_NXAU.add({name:nom,trig:{k:"once",v:String(at)},act:{k:"notify",v:texte},cond:{}});
if(t){
try{_NXAU.jot(nom,"rappel programme pour "+new Date(at).toLocaleString());}catch(_){}
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Rappel programme : ")+new Date(at).toLocaleTimeString().slice(0,5)+".",1);}catch(_){}}
}catch(_){}};
_NXV.wireCtx=function(){try{
if(_NXV.ctxWired)return;
var API=(window.Vencord&&Vencord.Api&&Vencord.Api.ContextMenu)||null;
var C=(window.Vencord&&Vencord.Webpack&&Vencord.Webpack.Common)||null;
if(!API||typeof API.addContextMenuPatch!=="function"||!C||!C.Menu){
if((_NXV._ctxTry=(_NXV._ctxTry||0)+1)<25)setTimeout(_NXV.wireCtx,2500);return;}
var Menu=C.Menu;
API.addContextMenuPatch("message",function(children,props){try{
if(!props||!props.message)return;
var msg=props.message;
var has=false;
try{has=_NXV.extractUrls(msg.content).length>0||(msg.embeds&&msg.embeds.length)||(msg.attachments&&msg.attachments.length);}catch(_){}
children.push(i(Menu.MenuSeparator,{key:"nx-sep"}));
try{children.push(i(Menu.MenuItem,{key:"nx-remind",id:"nx-remind",label:"Me le rappeler",
action:function(){try{_NXV.remindPrompt(msg);}catch(_){}}}));}catch(_){}
if(!has)return;
children.push(i(Menu.MenuItem,{
key:"nx-report",id:"nx-report",
label:"Signaler un lien a Nexium",
color:"danger",
action:function(){try{_NXV.reportFromMessage(msg);}catch(_){}}
}));}catch(_){}});
_NXV.ctxWired=true;
}catch(e){try{if(window._NXERR)_NXERR.push("menu contextuel :: "+((e&&e.message)||"erreur"));}catch(_){}}};
try{setTimeout(_NXV.wireCtx,6000);}catch(_){}
_NXV.openSettings=function(section){try{
var W=window.Vencord&&Vencord.Webpack;
var names=["ACCOUNT","SESSIONS","AUTHORIZED_APPS","PRIVACY_AND_SAFETY"];
var m=null;
try{m=W&&W.findByProps&&(W.findByProps("open","saveAccountChanges")||W.findByProps("setSection")||W.findByProps("open"));}catch(_){}
if(m){
try{if(typeof m.open==="function"){m.open(section);return true;}}catch(_){}
try{if(typeof m.setSection==="function"){m.setSection(section);return true;}}catch(_){}}
return false;}catch(_){return false;}};
_NXV.aftermath=function(ctx){try{
if(!_NXV.cfg.aftermath)return;
if(document.getElementById("nx-after"))return;
var P=_NXpal;
var ov=document.createElement("div");ov.id="nx-after";
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.66);backdrop-filter:blur(7px);";
var card=document.createElement("div");
card.style.cssText="width:480px;max-width:calc(100vw - 40px);max-height:80vh;overflow-y:auto;background:"+P.panel+";border:1px solid "+P.line+";border-radius:20px;padding:26px;box-shadow:0 30px 90px rgba(0,0,0,.55);";
var esc=function(s){return String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
card.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Nexium Protect</div>'
+'<div style="font-size:21px;font-weight:800;color:'+P.txt+';letter-spacing:-.02em;margin-bottom:8px;">Que faire maintenant ?</div>'
+'<div style="font-size:13px;color:'+P.sub+';line-height:1.6;margin-bottom:16px;">'+esc(ctx&&ctx.why||"Une tentative de vol de tes identifiants a ete bloquee.")+' Rien n a ete transmis, mais si tu as colle du code ou installe un plugin recemment, suis ces etapes.</div>');
var steps=[
{n:"1",t:"Change ton mot de passe",d:"Cela invalide aussi ton jeton de session actuel.",s:"ACCOUNT"},
{n:"2",t:"Deconnecte les autres appareils",d:"Verifie la liste des sessions actives et revoque celles que tu ne reconnais pas.",s:"SESSIONS"},
{n:"3",t:"Active la double authentification",d:"Empeche toute connexion meme avec ton mot de passe.",s:"ACCOUNT"},
{n:"4",t:"Verifie les applications autorisees",d:"Retire les applications tierces que tu ne reconnais pas.",s:"AUTHORIZED_APPS"}];
for(var a=0;a<steps.length;a++){(function(st){
var row=document.createElement("div");
row.style.cssText="display:flex;gap:12px;padding:12px;border-radius:12px;background:"+P.inset+";border:1px solid "+P.line+";margin-bottom:8px;align-items:flex-start;";
var num=document.createElement("div");
num.style.cssText="width:24px;height:24px;border-radius:50%;background:"+P.acc+";color:"+(P.light?"#fff":_NXpal.ink)+";font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;";
num.textContent=_NXtr(st.n);
var txt=document.createElement("div");txt.style.cssText="flex:1;min-width:0;";
txt.innerHTML=_NXtrHtml('<div style="font-size:13.5px;font-weight:700;color:'+P.txt+';">'+esc(st.t)+'</div><div style="font-size:12px;color:'+P.dim+';margin-top:2px;line-height:1.5;">'+esc(st.d)+'</div>');
var go=document.createElement("div");go.className="nx-fx";go.setAttribute("role","button");go.setAttribute("tabindex","0");
go.style.cssText="flex-shrink:0;font-size:11px;font-weight:700;color:"+P.sub+";cursor:pointer;padding:6px 11px;border:1px solid "+P.line+";border-radius:8px;";
go.textContent=_NXtr("Ouvrir");
go.onclick=function(){try{
var ok=_NXV.openSettings(st.s);
if(!ok&&window._NXPR)_NXPR.toast(_NXtr("Ouvre les parametres Discord > Mon compte pour cette etape."),1);}catch(_){}};
go.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();go.onclick();}};
row.appendChild(num);row.appendChild(txt);row.appendChild(go);card.appendChild(row);})(steps[a]);}
var close=document.createElement("div");close.className="nx-fx";close.setAttribute("role","button");close.setAttribute("tabindex","0");
close.style.cssText="margin-top:14px;text-align:center;padding:12px;border-radius:11px;background:"+P.acc+";color:"+(P.light?"#fff":_NXpal.ink)+";font-size:13.5px;font-weight:800;cursor:pointer;";
close.textContent=_NXtr("J ai compris");
close.onclick=function(){try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}};
close.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();close.onclick();}};
card.appendChild(close);ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov&&ov.parentNode)ov.parentNode.removeChild(ov);};
if(document.body)document.body.appendChild(ov);
_NXV.log("guide","guide post-incident affiche");
}catch(_){}};

_NXV.PLUGKEY="nexium_plugin_audit";
_NXV.RXPTOKEN=/(getToken|localStorage\s*\[\s*["']token|localStorage\.token|\.token\s*\)|authorization["'\s:]+)/i;
_NXV.RXPEVAL=/(eval\s*\(|new\s+Function\s*\(|atob\s*\(\s*["'][A-Za-z0-9+/=]{40,}|\\x[0-9a-f]{2}\\x[0-9a-f]{2}\\x[0-9a-f]{2})/i;
_NXV.RXPFETCH=/(?:fetch|XMLHttpRequest|sendBeacon|axios)\s*\(?\s*["'`](https?:\/\/[^"'`\s]+)/gi;
_NXV.RXPHOOK=/discord(?:app)?\.com\/api\/(?:v\d+\/)?webhooks\//i;
_NXV.pluginSources=function(){try{
var out=[];
var V=window.Vencord;
try{if(V&&V.Plugins&&V.Plugins.plugins){var P=V.Plugins.plugins;
for(var k in P){var p=P[k];if(!p)continue;
var src="";
try{src=Object.keys(p).map(function(f){var v=p[f];return (typeof v==="function")?String(v):"";}).join("\n");}catch(_){}
try{if(p.patches)src+="\n"+JSON.stringify(p.patches);}catch(_){}
if(src.length>40)out.push({n:String(p.name||k),v:src,ext:!!(p.userPlugin||p.external)});}}}catch(_){}
return out;}catch(_){return [];}};
_NXV.auditPlugins=function(){try{
if(!_NXV.cfg.auditPlugins)return [];
var res=[];var srcs=_NXV.pluginSources();
for(var a=0;a<srcs.length;a++){
var p=srcs[a];var src=p.v;var flags=[],hosts=[];
if(_NXV.RXPHOOK.test(src))flags.push("envoi vers un webhook Discord");
var tk=_NXV.RXPTOKEN.test(src);
_NXV.RXPFETCH.lastIndex=0;var m;
while((m=_NXV.RXPFETCH.exec(src))){
var h=_NXV.hostOf(m[1]);
if(!h||_NXV.isSafeHost(h))continue;
if(hosts.indexOf(h)<0)hosts.push(h);}
if(hosts.length&&tk)flags.push("acces au jeton + envoi vers "+hosts.slice(0,2).join(", "));
else if(hosts.length)flags.push("envoi vers "+hosts.slice(0,2).join(", "));
else if(tk)flags.push("accede au jeton de session");
if(_NXV.RXPEVAL.test(src))flags.push("code obfusque ou execution dynamique");
if(flags.length)res.push({n:p.n,f:flags,h:hosts,risk:(tk&&hosts.length)?3:(flags.length>1?2:1)});}
res.sort(function(x,y){return y.risk-x.risk;});
_NXV.plugins=res;
var high=res.filter(function(r){return r.risk>=3;});
if(high.length&&!_NXV._plWarned){_NXV._plWarned=true;
_NXV.log("plugin",high.length+" plugin(s) a risque eleve : "+high.slice(0,2).map(function(r){return r.n;}).join(", "));
try{if(window._NXPR)_NXPR.toast(_NXtr("Attention : ")+_NXtr(high.length)+_NXtr(" plugin(s) accedent a ton jeton ET envoient des donnees vers l exterieur. Voir Nexium Protect."),0);}catch(_){}}
_NXV.notify();
return res;}catch(_){return [];}};

_NXV.IKEY="nexium_identity";
_NXV.ident=(function(){try{var r=_NXDB.get(_NXV.IKEY);var d=r?JSON.parse(r):null;return (d&&typeof d==="object")?d:null;}catch(_){return null;}})();
_NXV.checkIdentity=function(){try{
if(!_NXV.cfg.identityGuard)return;
var u=null;try{u=_NXcommon().store("UserStore").getCurrentUser();}catch(_){}
if(!u||!u.id)return;
var cur={id:String(u.id),
email:u.email?String(u.email).replace(/^(.).*(@.*)$/,"$1***$2"):null,
phone:u.phone?String(u.phone).slice(-4):null,
mfa:!!(u.mfaEnabled||u.mfa_enabled)};
var prev=_NXV.ident;
if(!prev||prev.id!==cur.id){_NXV.ident=cur;try{_NXDB.set(_NXV.IKEY,JSON.stringify(cur));}catch(_){}return;}
var alerts=[];
if(prev.email&&cur.email&&prev.email!==cur.email)alerts.push("l adresse e-mail de ton compte a change");
if(prev.phone!==cur.phone&&(prev.phone||cur.phone))alerts.push("le numero de telephone de ton compte a change");
if(prev.mfa===true&&cur.mfa===false)alerts.push("la double authentification a ete DESACTIVEE");
if(alerts.length){
for(var a=0;a<alerts.length;a++)_NXV.log("identite",alerts[a]);
try{if(window._NXPR){_NXPR.stats.blocked=(_NXPR.stats.blocked||0)+1;_NXPR.logThreat("identity",alerts.join(" ; "));_NXPR.saveStats();}}catch(_){}
_NXV.aftermath({why:"ALERTE : "+alerts.join(", ")+". Si ce n est pas toi, ton compte est compromis."});}
_NXV.ident=cur;try{_NXDB.set(_NXV.IKEY,JSON.stringify(cur));}catch(_){}
}catch(_){}};

_NXV.lastInput=0;
_NXV.noteInput=function(){try{_NXV.lastInput=Date.now();}catch(_){}};
_NXV.checkMedia=function(kind){try{
if(!_NXV.cfg.mediaGuard)return;
var gap=Date.now()-(_NXV.lastInput||0);
if(gap<3000)return;
_NXV.log("media",kind+" active sans action de ta part");
try{if(window._NXPR){_NXPR.logThreat("media",kind+" active sans interaction");_NXPR.saveStats();
_NXPR.toast(_NXtr("ATTENTION : ")+_NXtr(kind)+_NXtr(" vient d etre active sans que tu aies clique. Verifie tes plugins immediatement."),0);}}catch(_){}
}catch(_){}};
_NXV.wireMedia=function(){try{
if(_NXV._mediaWired)return;_NXV._mediaWired=true;
try{document.addEventListener("mousedown",_NXV.noteInput,{capture:true,passive:true});
document.addEventListener("keydown",_NXV.noteInput,{capture:true,passive:true});}catch(_){}
try{
var md=navigator.mediaDevices;
if(md&&md.getUserMedia&&!md.getUserMedia.__nx){
var og=md.getUserMedia.bind(md);
var pg=function(c){try{
if(_NXV.cfg.mediaGuard){var w=(c&&c.video)?"la camera":"le micro";_NXV.checkMedia(w);}}catch(_){}
return og(c);};
pg.__nx=true;md.getUserMedia=pg;}
if(md&&md.getDisplayMedia&&!md.getDisplayMedia.__nx){
var od=md.getDisplayMedia.bind(md);
var pd=function(c){try{if(_NXV.cfg.mediaGuard)_NXV.checkMedia("le partage d ecran");}catch(_){}
try{if(_NXV.mcfg&&_NXV.mcfg.auto)_NXV.maskOn("partage d ecran detecte");}catch(_){}
try{var p2=od(c);if(p2&&p2.then)return p2.then(function(st){try{
if(st&&st.getTracks)st.getTracks().forEach(function(tr){try{tr.addEventListener("ended",function(){try{if(_NXV.mcfg&&_NXV.mcfg.auto)_NXV.maskOff();}catch(_){}});}catch(_){}});
}catch(_){}return st;},function(e){try{if(_NXV.mcfg&&_NXV.mcfg.auto)_NXV.maskOff();}catch(_){}throw e;});return p2;}catch(_){}
return od(c);};
pd.__nx=true;md.getDisplayMedia=pd;}
}catch(_){}}catch(_){}};

_NXV.pending=null;
_NXV.gracePeriod=function(label,seconds,run){try{
if(!_NXV.cfg.graceDelay){run();return;}
if(document.getElementById("nx-grace"))return;
var P=_NXpal;var left=seconds||12;var timer=null;
var ov=document.createElement("div");ov.id="nx-grace";
ov.style.cssText="position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:99999;background:"+P.panel+";border:1px solid "+P.line+";border-radius:14px;padding:14px 18px;box-shadow:0 18px 50px rgba(0,0,0,.5);display:flex;align-items:center;gap:14px;min-width:340px;";
var txt=document.createElement("div");txt.style.cssText="flex:1;min-width:0;";
var esc=function(s){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
txt.innerHTML=_NXtrHtml('<div style="font-size:13px;font-weight:700;color:'+P.txt+';">'+esc(label)+'</div><div id="nx-grace-c" style="font-size:11.5px;color:'+P.dim+';margin-top:2px;">Execution dans '+left+' s</div>');
var cancel=document.createElement("div");cancel.className="nx-fx";cancel.setAttribute("role","button");cancel.setAttribute("tabindex","0");
cancel.style.cssText="flex-shrink:0;padding:9px 16px;border-radius:10px;background:"+P.acc+";color:"+(P.light?"#fff":_NXpal.ink)+";font-size:12.5px;font-weight:800;cursor:pointer;";
cancel.textContent=_NXtr("Annuler");
var done=function(ok){try{if(timer)clearInterval(timer);}catch(_){}try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}
if(ok){try{run();}catch(_){}}else{_NXV.log("delai","action annulee : "+label);
try{if(window._NXPR)_NXPR.toast(_NXtr("Action annulee."),1);}catch(_){}}};
cancel.onclick=function(){done(false);};
cancel.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();done(false);}};
ov.appendChild(txt);ov.appendChild(cancel);
if(document.body)document.body.appendChild(ov);
timer=setInterval(function(){try{
left--;
var el=document.getElementById("nx-grace-c");
if(el)el.textContent=_NXtr("Execution dans ")+_NXtr(left)+_NXtr(" s");
if(left<=0)done(true);}catch(_){}},1000);
}catch(_){try{run();}catch(__){}}};

// --- le delai avant les actions graves -------------------------------------------
// Il ne retenait que l effacement des donnees Nexium : rien de ce qu un voleur
// fait faire. Il retient maintenant les requetes de Discord qui engagent le
// compte, douze secondes, le temps de les annuler. C est la parade a la
// pression classique : "vite, autorise ce bot", "vite, cede-moi le serveur".
_NXV.DELAI=12;
_NXV.RXAPI=/^(?:https?:)?\/\/(?:[a-z0-9\-]+\.)?discord(?:app)?\.com\/api\/(?:v\d+\/)?|^\/api\/(?:v\d+\/)?/i;
_NXV.GRAVES=[
["POST",/^oauth2\/authorize(?:[?#]|$)/,"Autoriser une application sur ton compte"],
["DELETE",/^guilds\/\d+\/?(?:[?#]|$)/,"Supprimer un serveur"],
["POST",/^guilds\/\d+\/delete\/?(?:[?#]|$)/,"Supprimer un serveur"],
["PATCH",/^guilds\/\d+\/?(?:[?#]|$)/,"Ceder la propriete d un serveur",/"owner_id"\s*:/],
["POST",/^users\/@me\/mfa\/(?:totp|sms)\/disable\/?(?:[?#]|$)/,"Couper la double authentification"],
["POST",/^users\/@me\/delete\/?(?:[?#]|$)/,"Supprimer ton compte"],
["POST",/^users\/@me\/disable\/?(?:[?#]|$)/,"Desactiver ton compte"],
["PATCH",/^users\/@me\/?(?:[?#]|$)/,"Changer ton e-mail ou ton mot de passe",/"(?:new_password|email)"\s*:/]];
_NXV.grave=function(methode,url,corps){try{
if(!_NXV.cfg||!_NXV.cfg.graceDelay)return null;
if(window._NXPRV&&_NXPRV.encours)return null;
var u=String(url||"");
var m=_NXV.RXAPI.exec(u);
if(!m)return null;
var chemin=u.substring(m[0].length);
var me=String(methode||"GET").toUpperCase();
var b=(typeof corps==="string")?corps:"";
for(var a=0;a<_NXV.GRAVES.length;a++){var g=_NXV.GRAVES[a];
if(g[0]!==me||!g[1].test(chemin))continue;
if(g[3]&&!g[3].test(b))continue;
return g[2];}
return null;}catch(_){return null;}};

// La retenue elle-meme : un compte a rebours, un seul bouton. Pas de "passer
// quand meme" -- toute la protection tient dans ces douze secondes. Si
// l affichage echoue, l action passe : Nexium ne doit jamais casser Discord.
_NXV.retenues=[];
_NXV.retiens=function(label,secondes){return new Promise(function(fin){try{
if(!document.body){fin(true);return;}
var P=_NXpal;var reste=secondes||_NXV.DELAI;var fini=false;var minuteur=null;
var ov=document.createElement("div");
ov.setAttribute("role","alertdialog");
ov.setAttribute("aria-live","assertive");
ov.setAttribute("data-nx-retenue","1");
var place=function(){try{for(var a=0;a<_NXV.retenues.length;a++)_NXV.retenues[a].style.bottom=(24+a*92)+"px";}catch(_){}};
ov.style.cssText="position:fixed;left:50%;transform:translateX(-50%);z-index:99999;box-sizing:border-box;"
+"width:min(460px,calc(100vw - 32px));background:"+P.panel+";border:1px solid "+_NXteinte(P.warn,42)+";border-radius:16px;"
+"padding:14px 16px;box-shadow:0 20px 60px rgba(0,0,0,.55);display:flex;align-items:center;gap:14px;"
+"font-family:var(--font-primary),system-ui,sans-serif;";
var rond=document.createElement("div");
rond.style.cssText="flex-shrink:0;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;"
+"font:800 15px var(--font-code),ui-monospace,monospace;color:"+P.warn+";border:2px solid "+_NXteinte(P.warn,55)+";";
rond.textContent=_NXtr(String(reste));
var txt=document.createElement("div");txt.style.cssText="flex:1;min-width:0;";
var t1=document.createElement("div");t1.style.cssText="font-size:13px;font-weight:800;color:"+P.txt+";";
t1.textContent=_NXtr(label);
var t2=document.createElement("div");t2.style.cssText="font-size:11.5px;color:"+P.sub+";margin-top:3px;line-height:1.45;";
t2.textContent=_NXtr("Nexium retient cette action quelques secondes. Si ce n est pas toi qui l as demandee, annule.");
txt.appendChild(t1);txt.appendChild(t2);
var non=document.createElement("div");
non.setAttribute("role","button");non.setAttribute("tabindex","0");
non.style.cssText="flex-shrink:0;padding:10px 16px;border-radius:11px;background:"+P.warn+";color:"+P.ink+";font-size:12.5px;font-weight:800;cursor:pointer;";
non.textContent=_NXtr("Annuler");
var clos=function(go){if(fini)return;fini=true;
try{clearInterval(minuteur);}catch(_){}
try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}
try{_NXV.retenues=_NXV.retenues.filter(function(x){return x!==ov;});place();}catch(_){}
try{_NXV.log("delai",(go?"action laissee passer : ":"action annulee : ")+label);}catch(_){}
if(!go){try{if(window._NXPR){_NXPR.logThreat("delai","action annulee : "+label);_NXPR.saveStats();
_NXPR.toast(_NXtr("Action annulee : ")+_NXtr(label)+".",1);}}catch(_){}}
fin(!!go);};
non.onclick=function(){clos(false);};
non.onkeydown=function(e){try{if(e.key==="Enter"||e.key===" "){e.preventDefault();clos(false);}}catch(_){}};
ov.appendChild(rond);ov.appendChild(txt);ov.appendChild(non);
_NXV.retenues.push(ov);
document.body.appendChild(ov);place();
try{if(non.focus)non.focus();}catch(_){}
minuteur=setInterval(function(){try{reste--;rond.textContent=_NXtr(String(Math.max(0,reste)));
if(reste<=0)clos(true);}catch(_){clos(true);}},1000);
}catch(_){fin(true);}});};

// Une requete XHR annulee avant son envoi ne previent personne : Discord
// attendrait sa reponse pour toujours. On la termine donc en echec reseau,
// ce que son client HTTP sait traiter.
_NXV.annuleXhr=function(x){try{
try{Object.defineProperty(x,"readyState",{value:4,configurable:true});}catch(_){}
try{Object.defineProperty(x,"status",{value:0,configurable:true});}catch(_){}
try{Object.defineProperty(x,"responseText",{value:"",configurable:true});}catch(_){}
var ev=function(t){try{return new ProgressEvent(t);}catch(_){}
try{var e=document.createEvent("Event");e.initEvent(t,false,false);return e;}catch(__){}return null;};
var L=["readystatechange","error","loadend"];
for(var a=0;a<L.length;a++){var e=ev(L[a]);if(e){try{x.dispatchEvent(e);}catch(_){}}}
return true;}catch(_){return false;}};

_NXV.exportAll=function(){try{
var out={nexium:true,version:_NXUP.VERSION,exportedAt:new Date().toISOString(),data:{}};
var ks=_NXDB.keys();
for(var a=0;a<ks.length;a++){var k=ks[a];
if(!k||k.indexOf("nexium_")!==0)continue;
if(k==="nexium_ck")continue;
var v=_NXDB.get(k);
try{out.data[k]=JSON.parse(v);}catch(_){out.data[k]=v;}}
var txt=JSON.stringify(out,null,2);
try{var d=new TextEncoder().encode(txt);
DiscordNative.fileManager.saveWithDialog(d,"nexium-mes-donnees-"+new Date().toISOString().slice(0,10)+".json");
if(window._NXPR)_NXPR.toast(_NXtr("Export pret : choisis ou enregistrer le fichier."),1);return;}catch(_){}
try{DiscordNative.clipboard.copy(txt);if(window._NXPR)_NXPR.toast(_NXtr("Donnees copiees dans le presse-papiers."),1);}catch(_){}
}catch(_){}};
_NXV.purgeAll=function(){try{
if(!window.confirm(_NXtr("Supprimer TOUTES les donnees Nexium ?\n\nStatistiques, journaux, signalements, quarantaine, listes et reglages seront effaces definitivement.")))return;
if(_NXV.cfg&&_NXV.cfg.graceDelay&&_NXV.gracePeriod){_NXV.gracePeriod("Suppression de toutes les donnees Nexium",12,function(){_NXV.purgeRun();});return;}
_NXV.purgeRun();}catch(_){}};
_NXV.purgeRun=function(){try{
var n=0;
try{if(window._NXS&&_NXS.reset){_NXDB.set(_NXS.KEY+"_wipe",String(Date.now()));_NXS.reset();n++;}}catch(_){}
try{if(window._NXPR){
_NXPR.stats={blocked:0,scanned:0,scams:0,accounts:0,safe:0,recent:[]};
_NXPR.quar=[];_NXPR.rep={sent:[],last:0,total:0,queue:[]};
_NXPR.cache=Object.create(null);_NXPR.cacheN=0;
_NXPR.saveStats&&_NXPR.saveStats();_NXPR.saveQuar&&_NXPR.saveQuar();_NXPR.saveRep&&_NXPR.saveRep();n++;}}catch(_){}
try{if(window._NXP){
for(var _sk in (_NXP.stats||{})){if(typeof _NXP.stats[_sk]==="number")_NXP.stats[_sk]=0;}
_NXP.blocked=[];n++;}}catch(_){}
try{if(window._NXV){_NXV.stats={blocked:0,css:0,log:[]};_NXV.saveStats();n++;}}catch(_){}
try{if(window._NXERR)_NXERR.length=0;}catch(_){}
var ks=_NXDB.keys();
for(var a=0;a<ks.length;a++){var k=ks[a];
if(k&&k.indexOf("nexium_")===0&&k!=="nexium_install"){_NXDB.del(k);n++;}}
try{if(window._NXPR&&_NXPR.notify)_NXPR.notify();if(window._NXV)_NXV.notify();}catch(_){}
window.alert(_NXtr("Donnees Nexium supprimees (")+_NXtr(n)+_NXtr(" elements). Redemarre Discord pour terminer."));
try{setTimeout(function(){try{DiscordNative.window.close&&0;}catch(_){}},50);}catch(_){}
}catch(_){}};
try{
setTimeout(function(){_NXV.wireMedia();},8000);
setTimeout(function(){_NXV.auditPlugins();},18000);
setTimeout(function(){_NXV.checkIdentity();},25000);
setInterval(function(){if(!document.hidden)_NXV.checkIdentity();},600000);
}catch(_){}
_NXV.wireSend=function(){try{
if(_NXV._sendWired)return;
var C=(window.Vencord&&Vencord.Webpack&&Vencord.Webpack.Common)||null;
var MA=C&&C.MessageActions;
if(!MA||typeof MA.sendMessage!=="function"){if((_NXV._swTry=(_NXV._swTry||0)+1)<20)setTimeout(_NXV.wireSend,3000);return;}
if(MA.sendMessage.__nx){_NXV._sendWired=true;return;}
var orig=MA.sendMessage.bind(MA);
var patched=function(ch,msg){
try{
if(_NXV.cfg.selfGuard&&msg&&typeof msg.content==="string"&&!msg.__nxok){
var what=_NXV.selfScan(msg.content);
if(what){
var args=Array.prototype.slice.call(arguments);
return new Promise(function(res,rej){
var repondu=false;
var fini=function(ok){
if(repondu)return;
repondu=true;
if(!ok){
try{_NXV.log("envoi","envoi annule : "+what);}catch(_){}
res({ok:false,status:0,body:null,nexium:"annule"});
return;}
try{msg.__nxok=true;
Promise.resolve(orig.apply(null,args)).then(res,rej);}
catch(e){rej(e);}};
try{setTimeout(function(){fini(true);},60000);}catch(_){}
try{_NXV.confirmSend(what,fini);}catch(_){fini(true);}
});}}
}catch(_){}
return orig.apply(null,arguments);};
patched.__nx=true;
try{MA.sendMessage=patched;_NXV._sendWired=true;}catch(_){}
}catch(_){}};
try{setTimeout(_NXV.wireSend,7000);}catch(_){}
_NXPR.MASQUECSS=[
"a.nx-masque{position:relative!important;display:inline-block!important;vertical-align:baseline!important;",
"color:transparent!important;text-decoration:none!important;font-size:0!important;",
"background:rgba(214,72,74,.13)!important;border:1px solid rgba(214,72,74,.42)!important;",
"border-radius:6px!important;padding:1px 8px 1px 21px!important;cursor:not-allowed!important;",
"max-width:100%!important;overflow:hidden!important;white-space:nowrap!important}",
"a.nx-masque>*{display:none!important}",
"a.nx-masque::before{content:\"\";position:absolute;left:7px;top:50%;width:8px;height:8px;",
"margin-top:-4px;border-radius:2px;background:#d6484a}",
"a.nx-masque::after{content:attr(data-nx-masque);font-size:11.5px;font-weight:700;",
"color:#e79a9a;letter-spacing:-.005em;line-height:1.5}",
"a.nx-masque.nx-masque-doux{background:rgba(230,196,138,.11)!important;border-color:rgba(230,196,138,.38)!important}",
"a.nx-masque.nx-masque-doux::before{background:#e6c48a}",
"a.nx-masque.nx-masque-doux::after{color:#d8c79a}"
].join("");
_NXPR.masquePose=function(){try{
if(document.getElementById("nx-masque-style"))return true;
if(!document.head&&!document.body)return false;
var st=document.createElement("style");
st.id="nx-masque-style";
st.textContent=_NXtr(_NXPR.MASQUECSS);
(document.head||document.body).appendChild(st);
return true;}catch(_){return false;}};
_NXPR.masqueTexte=function(cl){try{
if(cl.kind==="grabber")return "Logger d IP masque par Nexium";
if(cl.kind==="punycode")return "Domaine trompeur masque par Nexium";
if(cl.kind==="phish")return "Hameconnage masque par Nexium";
if(cl.kind==="suspect")return "Lien suspect masque par Nexium";
if(cl.kind==="short")return "Lien raccourci masque par Nexium";
return "Lien masque par Nexium";}catch(_){return "Lien masque par Nexium";}};
_NXPR.masqueVerdict=function(href){try{
var cl=_NXPR.classify(href);
if(!cl)return null;
if(_NXPR.threat(cl)&&_NXPR.blocksKind(cl))return cl;
if(_NXPR.cfg.maskSuspect&&(cl.kind==="suspect"||cl.kind==="short"))return cl;
return null;}catch(_){return null;}};
_NXPR.masqueUn=function(el){try{
var href=_NXPR.hrefOf(el);
if(!href)return 0;
if(el.getAttribute("data-nx-vu")===href){
var et=el.getAttribute("data-nx-masque");
if(!et)return 0;
if(el.classList&&!el.classList.contains("nx-masque")){
el.classList.add("nx-masque");
if(et.indexOf("suspect")>=0||et.indexOf("raccourci")>=0)el.classList.add("nx-masque-doux");
el.setAttribute("title",_NXtr(_NXPR.masqueTitre));
return 1;}
return 0;}
el.setAttribute("data-nx-vu",href);
var cl=_NXPR.masqueVerdict(href);
if(!cl){
if(el.classList&&el.classList.contains("nx-masque")){
el.classList.remove("nx-masque");el.classList.remove("nx-masque-doux");
el.removeAttribute("data-nx-masque");
try{if(el.getAttribute("title")===_NXPR.masqueTitre)el.removeAttribute("title");}catch(_){}}
return 0;}
el.setAttribute("data-nx-masque",_NXPR.masqueTexte(cl));
el.setAttribute("title",_NXtr(_NXPR.masqueTitre));
if(el.classList){el.classList.add("nx-masque");
if(cl.kind==="suspect"||cl.kind==="short")el.classList.add("nx-masque-doux");
else el.classList.remove("nx-masque-doux");}
return 1;}catch(_){return 0;}};
_NXPR.masqueTitre="Nexium a masque ce lien. Clique pour savoir pourquoi.";
_NXPR.masqueN=0;
_NXPR.masqueScan=function(racine){try{
if(!_NXPR.cfg.scanLinks||!_NXPR.cfg.maskLinks)return 0;
_NXPR.masquePose();
var r=racine&&racine.querySelectorAll?racine:document;
var L=r.querySelectorAll("a[href]");
var n=0;
for(var a=0;a<L.length&&a<600;a++)n+=_NXPR.masqueUn(L[a]);
if(n){_NXPR.masqueN+=n;_NXPR.notify();}
return n;}catch(_){return 0;}};
_NXPR.masqueVague=function(){try{
if(!_NXPR.cfg.scanLinks||!_NXPR.cfg.maskLinks){_NXPR._mq=null;return 0;}
if(document.hidden){_NXPR._mq=null;_NXPR._mdebord=true;return 0;}
var Q=_NXPR._mq;_NXPR._mq=null;
var deborde=_NXPR._mdebord;_NXPR._mdebord=false;
var now=Date.now();
if(deborde||!_NXPR._mfull||(now-_NXPR._mfull)>15000){_NXPR._mfull=now;return _NXPR.masqueScan();}
if(!Q||!Q.length)return 0;
var t=0;
for(var a=0;a<Q.length;a++){try{
var nd=Q[a];
if(nd.nodeName==="A")t+=_NXPR.masqueUn(nd);
if(nd.querySelectorAll)t+=_NXPR.masqueScan(nd);
}catch(_){}}
return t;}catch(_){return 0;}};
_NXPR.masqueRefaire=function(){try{
var L=document.querySelectorAll("a[data-nx-vu]");
for(var a=0;a<L.length;a++){try{L[a].removeAttribute("data-nx-vu");}catch(_){}}
return _NXPR.masqueScan();}catch(_){return 0;}};
_NXPR.masqueTout=function(){try{
var L=document.querySelectorAll("a.nx-masque");
for(var a=0;a<L.length;a++){try{
L[a].classList.remove("nx-masque");L[a].classList.remove("nx-masque-doux");
L[a].removeAttribute("data-nx-masque");L[a].removeAttribute("data-nx-vu");
if(L[a].getAttribute("title")===_NXPR.masqueTitre)L[a].removeAttribute("title");}catch(_){}}
return L.length;}catch(_){return 0;}};
_NXPR.masqueVeille=function(){try{
if(_NXPR._mo)return true;
if(!window.MutationObserver||!document.body)return false;
_NXPR._mo=new MutationObserver(function(list){
try{var Q=_NXPR._mq||(_NXPR._mq=[]);
for(var a=0;a<list.length;a++){var ad=list[a].addedNodes;
if(!ad||!ad.length)continue;
for(var b=0;b<ad.length;b++){var nd=ad[b];
if(nd&&nd.nodeType===1){if(Q.length<240)Q.push(nd);else _NXPR._mdebord=true;}}}}catch(_){}
if(_NXPR._mt)return;
_NXPR._mt=setTimeout(function(){_NXPR._mt=null;_NXPR.masqueVague();},260);});
_NXPR._mo.observe(document.body,{childList:true,subtree:true});
_NXPR.masqueScan();
return true;}catch(_){return false;}};
_NXPR.wireDom=function(){try{
if(_NXPR._dom)return;_NXPR._dom=true;
document.addEventListener("click",_NXPR.onClickCapture,true);
document.addEventListener("auxclick",_NXPR.onClickCapture,true);
document.addEventListener("paste",_NXPR.onPaste,true);
}catch(_){}};
try{_NXPR.wireDom();}catch(_){}
// Toutes les cinq minutes : un reglage verrouille ne reste pas actif.
try{setInterval(function(){try{if(_NXPR.reconcilie)_NXPR.reconcilie();}catch(_){}
try{if(window._NXP&&_NXP.reconcilie)_NXP.reconcilie();}catch(_){}},300000);}catch(_){}
try{_NXPERF.amorce(function(){try{if(!_NXPR.masqueVeille())setTimeout(_NXPR.masqueVeille,4000);}catch(_){}},1200);}catch(_){}
try{setTimeout(function(){_NXPR.consoleWarn();},2500);
setTimeout(function(){_NXPR.loadRemote();_NXPR.loadAllow();},4000);
setInterval(function(){if(!document.hidden){_NXPR.loadRemote(true);_NXPR.loadAllow();}},21600000);
setInterval(function(){if(!document.hidden&&_NXPR.checkClip)_NXPR.checkClip();},20000);
setTimeout(function(){if(_NXPR.queueFlush)_NXPR.queueFlush();},14000);
setInterval(function(){if(!document.hidden&&_NXPR.queueFlush)_NXPR.queueFlush();},180000);}catch(_){}
_NXPR.wire=function(){try{var C=_NXcommon();var FX=C.C.FluxDispatcher||(C.WP.findByProps&&C.WP.findByProps("subscribe","dispatch","_actionHandlers"));if(!FX||!FX.subscribe){_NXPR.tries=(_NXPR.tries||0)+1;if(_NXPR.tries<25)_NXPERF.amorce(_NXPR.wire,1500);return;}FX.subscribe("MESSAGE_CREATE",_NXPERF.mesure("Protect : messages recus",_NXPR.onMsg));FX.subscribe("MESSAGE_UPDATE",_NXPERF.mesure("Protect : messages modifies",_NXPR.onMsgUpdate));FX.subscribe("PRESENCE_UPDATE",_NXPERF.mesure("Protect : statuts",_NXPR.onPresence));_NXPR.abonne=true;
try{FX.subscribe("CHANNEL_SELECT",function(e){try{if(e&&e.guildId&&window._NXV)_NXV.checkGuild(e.guildId);}catch(_){}});
FX.subscribe("GUILD_CREATE",function(e){try{var g=e&&e.guild;if(g&&g.id&&window._NXV)setTimeout(function(){_NXV.checkGuild(g.id);},4000);}catch(_){}});
FX.subscribe("SESSIONS_REPLACE",function(e){try{if(window._NXV)_NXV.onSessions(e);}catch(_){}});}catch(_){}}catch(_){}};
_NXPR.wire();
}
