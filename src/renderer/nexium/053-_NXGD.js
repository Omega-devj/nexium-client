var _NXGD=window._NXGD||(window._NXGD={});
if(!_NXGD.boot){try{_NXGD.boot=true;
_NXGD.KEY="nexium_gardes_v1";
_NXGD.cfg=(function(){var d;try{var raw=_NXDB.get(_NXGD.KEY);d=raw?JSON.parse(raw):null;}catch(e){d=null;}
if(!d||typeof d!=="object")d={};
if(typeof d.webhookGuard!=="boolean")d.webhookGuard=true;
if(typeof d.egressGuard!=="boolean")d.egressGuard=true;
if(d.egressMode!=="ouvert"&&d.egressMode!=="guide"&&d.egressMode!=="verrouille")d.egressMode="guide";
if(typeof d.beaconGuard!=="boolean")d.beaconGuard=true;
if(typeof d.domGuard!=="boolean")d.domGuard=true;
if(typeof d.payloadGuard!=="boolean")d.payloadGuard=true;
if(!Array.isArray(d.approuves))d.approuves=[];
if(!Array.isArray(d.webhooksOk))d.webhooksOk=[];
return d;})();
_NXGD.save=function(){try{_NXDB.set(_NXGD.KEY,JSON.stringify(_NXGD.cfg));}catch(_){}};
_NXGD.stats=(function(){var d;try{var raw=_NXDB.get(_NXGD.KEY+"_stats");d=raw?JSON.parse(raw):null;}catch(e){d=null;}
if(!d||typeof d!=="object")d={};
var K=["webhook","egress","beacon","dom","payload"];
for(var a=0;a<K.length;a++)if(typeof d[K[a]]!=="number")d[K[a]]=0;
if(!Array.isArray(d.recent))d.recent=[];
if(!d.hotes||typeof d.hotes!=="object")d.hotes={};
return d;})();
_NXGD.saveStats=function(){try{_NXDB.set(_NXGD.KEY+"_stats",JSON.stringify(_NXGD.stats));}catch(_){}};
_NXGD.saveSoon=function(){try{if(_NXGD._st)return;_NXGD._st=setTimeout(function(){_NXGD._st=null;_NXPERF.repos(function(){try{_NXGD.saveStats();}catch(_){}});},3000);}catch(_){}};
_NXGD.listeners=[];
_NXGD.notify=function(){for(var a=0;a<_NXGD.listeners.length;a++){try{_NXGD.listeners[a]();}catch(_){}}};
_NXGD.tnotify=function(){try{if(_NXGD._nt)return;_NXGD._nt=setTimeout(function(){_NXGD._nt=null;_NXGD.notify();},600);}catch(_){}};
_NXGD.compte=function(k){try{_NXGD.stats[k]=(_NXGD.stats[k]||0)+1;}catch(_){}};
_NXGD.log=function(kind,detail,host){try{
_NXGD.stats.recent.unshift({k:kind,d:String(detail||"").slice(0,150),h:String(host||"").slice(0,90),t:Date.now()});
if(_NXGD.stats.recent.length>40)_NXGD.stats.recent=_NXGD.stats.recent.slice(0,40);
_NXGD.saveSoon();_NXGD.tnotify();
try{if(window._NXPR&&_NXPR.logThreat){_NXPR.stats.blocked=(_NXPR.stats.blocked||0)+1;_NXPR.logThreat(kind==="webhook"?"exfil":kind,String(detail||"").slice(0,110));_NXPR.saveStats();}}catch(_){}
}catch(_){}};
_NXGD.total=function(){try{return (_NXGD.stats.webhook||0)+(_NXGD.stats.egress||0)+(_NXGD.stats.beacon||0)+(_NXGD.stats.dom||0)+(_NXGD.stats.payload||0);}catch(_){return 0;}};
_NXGD.hostOf=function(u){try{
var v=String(u||"");
if(!v||v.length<5)return "";
if(v.indexOf(":")<0)return "";
var c=v.charAt(0);
if(c!=="h"&&c!=="w"&&c!=="f")return "";
var h=new URL(v,"https://discord.com").hostname.toLowerCase();
return h.replace(/^www\./,"");}catch(_){return "";}};
// Les fournisseurs de captcha. Sans eux, la fenetre de verification ne
// s affiche pas : le garde du DOM retire son cadre et son script avant
// qu ils ne chargent, et on ne peut plus ni se connecter ni changer de mot
// de passe. Une protection qui empeche d entrer chez soi est un defaut,
// pas une protection.
_NXGD.DNS=["cloudflare-dns.com"];
_NXGD.CAPTCHA=["hcaptcha.com","arkoselabs.com","arkoselabs.cn","funcaptcha.com","recaptcha.net"];
_NXGD.BASE=["discord.com","discordapp.com","discordapp.net","discord.gg","discord.media","discord.dev","discordstatus.com","discord.app","discordcdn.com","dis.gd",
"hcaptcha.com","arkoselabs.com","arkoselabs.cn","funcaptcha.com","recaptcha.net",
"cloudflare-dns.com","crt.sh",
"githubusercontent.com","github.com","github.io","githubassets.com",
"jsdelivr.net","unpkg.com","cdnjs.cloudflare.com",
"emcoqnvxriyrchmfpunq.supabase.co",
"googleapis.com","gstatic.com","storage.googleapis.com","googleusercontent.com",
"equicord.org","vencord.dev","vendicated.dev","mantikafasi.dev","creations.works","ayaka.one","exampleuser.workers.dev","keiran0.workers.dev",
"spotify.com","scdn.co","spotifycdn.com","spotify-lyrics-api-pi.vercel.app","lrclib.net","last.fm","tidal.com","music.apple.com","mzstatic.com","deezer.com","stats.fm",
"tenor.com","giphy.com","imgur.com","pixeldrain.com","line.me",
"sentry.io","cloudflare.com","cloudflareinsights.com",
"wikipedia.org","wikimedia.org","reddit.com","redd.it","youtube.com","youtu.be","ytimg.com","twitch.tv","twitter.com","x.com","twimg.com",
"steamcommunity.com","steampowered.com","steamstatic.com","akamaihd.net",
"localhost","127.0.0.1"];
_NXGD.idx=null;_NXGD.memo=null;_NXGD.memoN=0;
_NXGD.buildIndex=function(){try{
var m=Object.create(null),a;
for(a=0;a<_NXGD.BASE.length;a++)m[_NXGD.BASE[a]]=1;
var L=_NXGD.cfg.approuves||[];
for(a=0;a<L.length;a++){var v=String(L[a]||"").toLowerCase();if(v)m[v]=2;}
_NXGD.idx=m;_NXGD.memo=Object.create(null);_NXGD.memoN=0;}catch(_){_NXGD.idx=Object.create(null);_NXGD.memo=Object.create(null);}};
_NXGD.connu=function(h){try{
if(!h)return true;
if(!_NXGD.idx)_NXGD.buildIndex();
var v=_NXGD.memo[h];
if(v!==undefined)return v;
var p=h,g=0,r=false;
while(p&&g<8){if(_NXGD.idx[p]){r=true;break;}var k=p.indexOf(".");if(k<0)break;p=p.slice(k+1);g++;}
if(_NXGD.memoN>500){_NXGD.memo=Object.create(null);_NXGD.memoN=0;}
_NXGD.memo[h]=r;_NXGD.memoN++;
return r;}catch(_){return true;}};
_NXGD.approuver=function(h){try{
if(!h)return;
if(!Array.isArray(_NXGD.cfg.approuves))_NXGD.cfg.approuves=[];
if(_NXGD.cfg.approuves.indexOf(h)<0)_NXGD.cfg.approuves.push(h);
_NXGD.save();_NXGD.buildIndex();_NXGD.notify();}catch(_){}};
_NXGD.retirer=function(h){try{
_NXGD.cfg.approuves=(_NXGD.cfg.approuves||[]).filter(function(x){return x!==h;});
_NXGD.save();_NXGD.buildIndex();_NXGD.notify();}catch(_){}};
_NXGD.oublierHote=function(h){try{delete _NXGD.stats.hotes[h];_NXGD.saveStats();_NXGD.notify();}catch(_){}};
_NXGD.viderJournal=function(){try{_NXGD.stats.recent=[];_NXGD.stats.hotes={};_NXGD.saveStats();_NXGD.notify();}catch(_){}};
_NXGD.set=function(k,v){try{_NXGD.cfg[k]=v;_NXGD.save();_NXGD.buildIndex();_NXGD.notify();}catch(_){}};
_NXGD.toggle=function(k){try{_NXGD.set(k,!_NXGD.cfg[k]);}catch(_){}};
_NXGD.noteHote=function(h,ou){try{
var e=_NXGD.stats.hotes[h];
if(!e){e={n:0,at:0,ou:""};_NXGD.stats.hotes[h]=e;}
e.n=(e.n||0)+1;e.at=Date.now();e.ou=String(ou||"").slice(0,20);
var ks=Object.keys(_NXGD.stats.hotes);
if(ks.length>60){for(var a=0;a<ks.length-60;a++)delete _NXGD.stats.hotes[ks[a]];}
_NXGD.saveSoon();}catch(_){}};
_NXGD.alerte=function(titre,texte,detail,actions){try{
if(!document.body)return;
if(document.getElementById("nx-gd-modal"))return;
var P=_NXpal;
var ov=document.createElement("div");
ov.id="nx-gd-modal";
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,"+(P.light?".34":".64")+");animation:nx-fade .18s ease both;";
var card=document.createElement("div");
card.style.cssText="width:430px;max-width:calc(100vw - 40px);background:"+P.panel+";border:1px solid "+P.hair+";border-radius:20px;padding:24px;box-shadow:0 30px 80px rgba(0,0,0,.55);animation:nx-rise .26s cubic-bezier(.22,.8,.28,1) both;";
var esc=function(x){return String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
card.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:7px;">Nexium Protect</div>'
+'<div style="font-size:19px;font-weight:800;color:'+P.txt+';margin-bottom:9px;letter-spacing:-.02em;">'+esc(titre)+'</div>'
+'<div style="font-size:12.5px;color:'+P.sub+';line-height:1.62;margin-bottom:13px;">'+esc(texte)+'</div>'
+(detail?('<div style="font-size:11px;color:'+P.dim+';background:'+P.inset+';border:1px solid '+P.line+';border-radius:10px;padding:10px 12px;margin-bottom:16px;font-family:monospace;word-break:break-all;line-height:1.5;">'+esc(detail)+'</div>'):''));
var row=document.createElement("div");
row.style.cssText="display:flex;gap:9px;flex-wrap:wrap;";
var close=function(){try{if(ov.parentNode)ov.parentNode.removeChild(ov);}catch(_){}};
var mk=function(txt,st,fn){var b=document.createElement("div");b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");b.style.cssText=st;b.textContent=_NXtr(txt);
b.onclick=function(){try{if(fn)fn();}catch(_){}close();};
b.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();b.click();}};
return b;};
row.appendChild(mk("Compris","flex:1.3;text-align:center;padding:12px;border-radius:11px;background:"+P.acc+";color:"+(P.light?"#fff":_NXpal.ink)+";font-size:13px;font-weight:800;cursor:pointer;",null));
if(actions&&actions.length){for(var a=0;a<actions.length;a++){(function(ac){
row.appendChild(mk(ac[0],"flex:1 0 100%;text-align:center;padding:10px;border-radius:11px;background:transparent;border:1px solid "+P.line+";color:"+P.dim+";font-size:11.5px;font-weight:700;cursor:pointer;",ac[1]));})(actions[a]);}}
card.appendChild(row);ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)close();};
document.body.appendChild(ov);}catch(_){}};
_NXGD.RXDISC=/^(?:https?|wss?):\/\/(?:[a-z0-9-]+\.)*(?:discord\.com|discordapp\.com|discordapp\.net|discord\.gg|discord\.media)(?:[\/?#]|$)/i;
_NXGD.chezDiscord=function(u){try{
if(!u)return false;
var c=u.charAt(0);
if(c==="/"||c==="#"||c==="?")return true;
return _NXGD.RXDISC.test(u);}catch(_){return false;}};
_NXGD.RXWH=/\/api(\/v\d+)?\/webhooks\/\d{15,25}\/[\w-]{40,}/i;
_NXGD.webhookId=function(u){try{var m=String(u||"").match(/webhooks\/(\d{15,25})/);return m?m[1]:"";}catch(_){return "";}};
_NXGD.webhook=function(url,init,ou){try{
if(!_NXGD.cfg.webhookGuard)return false;
var u=String(url||"");
if(u.indexOf("webhooks/")<0)return false;
if(!_NXGD.RXWH.test(u))return false;
var id=_NXGD.webhookId(u);
if(id&&(_NXGD.cfg.webhooksOk||[]).indexOf(id)>=0)return false;
var fuite=null;
try{if(window._NXV&&_NXV.inspectOut)fuite=_NXV.inspectOut(u,init);}catch(_){}
_NXGD.compte("webhook");
_NXGD.log("webhook","envoi vers un webhook Discord bloque"+(fuite?(" - contenait "+fuite):"")+" ("+ou+")",_NXGD.hostOf(u));
_NXGD.alerte("Envoi par webhook bloque",
"Un webhook Discord vient d etre utilise depuis ton client pour envoyer des donnees vers un salon qui n est pas le tien. C est la sortie la plus courante des voleurs de compte : elle passe par discord.com, donc les protections classiques la laissent filer."+(fuite?(" Cet envoi contenait "+fuite+"."):""),
"webhook "+(id||"identifiant masque"),
[["Autoriser ce webhook (je sais ce que je fais)",function(){try{if(!id)return;
if(!Array.isArray(_NXGD.cfg.webhooksOk))_NXGD.cfg.webhooksOk=[];
if(_NXGD.cfg.webhooksOk.indexOf(id)<0)_NXGD.cfg.webhooksOk.push(id);
_NXGD.save();_NXGD.notify();}catch(_){}}]]);
return true;}catch(_){return false;}};
_NXGD.porteur=function(url,init){try{
var m="GET";
try{if(init&&init.method)m=String(init.method).toUpperCase();}catch(_){}
if(m!=="GET"&&m!=="HEAD")return true;
try{if(init&&init.body)return true;}catch(_){}
var u=String(url||"");
var i1=u.indexOf("?"),i2=u.indexOf("#");
var cut=i1<0?i2:(i2<0?i1:(i1<i2?i1:i2));
if(cut>=0&&(u.length-cut)>40)return true;
return false;}catch(_){return true;}};
_NXGD._asked=null;
_NXGD.demander=function(h,ou){try{
if(!_NXGD._asked)_NXGD._asked=Object.create(null);
if(_NXGD._asked[h])return;
_NXGD._asked[h]=1;
_NXGD.alerte("Sortie vers un hote inconnu",
"Ton client a tente d envoyer des donnees vers un serveur qui ne fait partie ni de Discord ni de Nexium. La requete a ete arretee. Si tu ne reconnais pas ce nom, laisse-la bloquee.",
h+"  ("+(ou||"requete")+")",
[["Approuver "+h+" definitivement",function(){_NXGD.approuver(h);}]]);}catch(_){}};
_NXGD.egress=function(url,ou,init){try{
if(!_NXGD.cfg.egressGuard)return false;
var mode=_NXGD.cfg.egressMode;
if(mode==="ouvert")return false;
if(_NXGD.chezDiscord(String(url||"")))return false;
var h=_NXGD.hostOf(url);
if(!h)return false;
if(_NXGD.connu(h))return false;
if(mode==="guide"&&!_NXGD.porteur(url,init)){
_NXGD.noteHote(h,ou);
return false;}
_NXGD.compte("egress");
_NXGD.noteHote(h,ou);
_NXGD.log("egress",(mode==="verrouille"?"hote non approuve bloque":"envoi vers un hote inconnu bloque")+" ("+ou+")",h);
_NXGD.demander(h,ou);
return true;}catch(_){return false;}};
_NXGD.balise=function(url,quoi){try{
if(!_NXGD.cfg.beaconGuard)return false;
var s=String(url||"");
if(s.length<14)return false;
var c=s.charAt(0);
if(c!=="h"&&c!=="w")return false;
if(_NXGD.chezDiscord(s))return false;
var h=_NXGD.hostOf(s);
if(!h)return false;
if(_NXGD.connu(h))return false;
var fuite=null;
try{if(window._NXV&&_NXV.cfg&&_NXV.cfg.blockExfil&&_NXV.urlLeak)fuite=_NXV.urlLeak(s);}catch(_){}
if(!fuite&&_NXGD.cfg.egressMode!=="verrouille")return false;
_NXGD.compte("beacon");
_NXGD.log("balise",(fuite?(fuite+" via une "+quoi):("balise "+quoi+" vers un hote inconnu"))+" bloquee",h);
if(fuite)_NXGD.alerte("Balise invisible bloquee",
"Une "+quoi+" sans affichage tentait de faire sortir "+fuite+". C est la methode discrete : pas de requete visible, juste une ressource chargee depuis un serveur etranger.",h);
return true;}catch(_){return false;}};
_NXGD.PAY=[
{rx:/\/api\/(v\d+\/)?webhooks\/\d{10,}/i,t:"envoi vers un webhook Discord",f:2},
{rx:/webpackChunkdiscord_app/,t:"acces aux modules internes de Discord",f:1},
{rx:/getToken\s*\(/,t:"lecture du jeton de session",f:1},
{rx:/localStorage[\s\S]{0,40}["']token["']/i,t:"lecture du jeton dans le stockage local",f:1},
{rx:/document\.cookie/i,t:"lecture des cookies de session",f:1},
{rx:/(fetch|XMLHttpRequest|sendBeacon)\s*\(/,t:"envoi reseau",f:0},
{rx:/atob\s*\(|Function\s*\(\s*["'`]/,t:"code masque",f:0}];
_NXGD.pesePayload=function(txt){try{
var s=String(txt||"");
if(s.length<40||s.length>8000)return null;
var hits=[],fort=0,a;
for(a=0;a<_NXGD.PAY.length;a++){var p=_NXGD.PAY[a];
if(p.rx.test(s)){hits.push(p.t);if(p.f>fort)fort=p.f;}}
if(!hits.length)return null;
var bloquer=(fort===2)||(fort===1&&hits.length>=2);
return {bloquer:bloquer,pourquoi:hits.slice(0,3).join(", "),n:hits.length};}catch(_){return null;}};
_NXGD.refusPayload=function(via,r){try{
_NXGD.compte("payload");
_NXGD.log("charge","code refuse ("+via+") : "+r.pourquoi,"");
_NXGD.alerte("Code malveillant arrete",
"Un morceau de code injecte dans ton client a ete refuse avant execution. Il faisait ce que fait un voleur de compte : lire ton jeton et le faire sortir.",
r.pourquoi);}catch(_){}};
_NXGD.domScan=function(n){try{
if(!n||n.nodeType!==1)return;
var t=n.nodeName;
if(t!=="SCRIPT"&&t!=="IFRAME"&&t!=="LINK"&&t!=="FORM"&&t!=="OBJECT"&&t!=="EMBED")return;
var u="",quoi="",geste="retirer";
if(t==="SCRIPT"){u=n.getAttribute("src")||"";quoi="script";}
else if(t==="IFRAME"){u=n.getAttribute("src")||"";quoi="cadre";}
else if(t==="FORM"){u=n.getAttribute("action")||"";quoi="formulaire";geste="neutraliser";}
else if(t==="LINK"){var rel=String(n.getAttribute("rel")||"").toLowerCase();
if(rel.indexOf("preload")<0&&rel.indexOf("prefetch")<0&&rel.indexOf("preconnect")<0&&rel.indexOf("stylesheet")<0)return;
u=n.getAttribute("href")||"";
if(rel.indexOf("stylesheet")>=0){quoi="feuille de style";geste="signaler";}
else{quoi="ressource "+rel;}}
else {u=n.getAttribute("data")||n.getAttribute("src")||"";quoi="objet";}
if(!u){
if(t!=="SCRIPT")return;
var txt=n.textContent||"";
var r=_NXGD.pesePayload(txt);
if(!r||!r.bloquer)return;
try{if(n.parentNode)n.parentNode.removeChild(n);}catch(_){}
_NXGD.compte("dom");
_NXGD.log("dom","script injecte retire avant execution : "+r.pourquoi,"");
_NXGD.alerte("Script retire de la fenetre",
"Un script a ete insere dans Discord depuis l exterieur et retire avant qu il ne s execute.",r.pourquoi);
return;}
var c0=u.charAt(0);
if(c0==="/"||c0==="#"||u.indexOf("data:")===0||u.indexOf("blob:")===0)return;
var h=_NXGD.hostOf(u);
if(!h||_NXGD.connu(h))return;
if(geste==="signaler"){
if(_NXGD._css&&_NXGD._css[h])return;
if(!_NXGD._css)_NXGD._css=Object.create(null);
_NXGD._css[h]=1;
_NXGD.log("dom","feuille de style chargee depuis un hote externe : "+h,h);
return;}
if(geste==="retirer"){try{if(n.parentNode)n.parentNode.removeChild(n);}catch(_){}}
else{try{n.removeAttribute("action");}catch(_){}}
_NXGD.compte("dom");
_NXGD.log("dom",quoi+" externe "+(geste==="retirer"?"retire":"neutralise")+" : "+h,h);
_NXGD.alerte(geste==="retirer"?"Element etranger retire":"Element etranger neutralise",
"Un "+quoi+" pointant vers un serveur inconnu a ete insere dans la fenetre Discord. Nexium l a "+(geste==="retirer"?"retire":"desamorce")+" avant qu il ne serve.",h);
}catch(_){}};
_NXGD.wireDom=function(){try{
if(_NXGD._mo)return;
if(typeof MutationObserver!=="function")return;
var cible=document.documentElement||document.body;
if(!cible){_NXPERF.amorce(_NXGD.wireDom,1500);return;}
var ob=new MutationObserver(function(list){
try{if(!_NXGD.cfg.domGuard){try{ob.disconnect();_NXGD._mo=null;}catch(_){}return;}
for(var a=0;a<list.length;a++){
var ad=list[a].addedNodes;
if(!ad||!ad.length)continue;
for(var b=0;b<ad.length;b++)_NXGD.domScan(ad[b]);}}catch(_){}});
ob.observe(cible,{childList:true,subtree:true});
_NXGD._mo=ob;}catch(_){}};
_NXGD.wireBalise=function(){try{
if(_NXGD._bal)return;_NXGD._bal=true;
try{if(window.HTMLImageElement&&HTMLImageElement.prototype){
var D=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,"src");
if(D&&D.set&&D.get&&D.configurable){
Object.defineProperty(HTMLImageElement.prototype,"src",{configurable:true,enumerable:!!D.enumerable,get:D.get,
set:function(v){try{if(_NXGD.balise(v,"image"))return;}catch(_){}return D.set.call(this,v);}});}}}catch(_){}
try{var WS=window.WebSocket;
if(WS&&!WS.__nxgd){
var W2=function(u,p){
if(_NXGD.balise(u,"connexion WebSocket"))throw new Error("Nexium a bloque cette connexion");
return arguments.length>1?new WS(u,p):new WS(u);};
W2.prototype=WS.prototype;W2.__nxgd=true;
try{W2.CONNECTING=WS.CONNECTING;W2.OPEN=WS.OPEN;W2.CLOSING=WS.CLOSING;W2.CLOSED=WS.CLOSED;}catch(_){}
window.WebSocket=W2;}}catch(_){}
try{var ES=window.EventSource;
if(ES&&!ES.__nxgd){
var E2=function(u,c){
if(_NXGD.balise(u,"connexion permanente"))throw new Error("Nexium a bloque ce flux");
return arguments.length>1?new ES(u,c):new ES(u);};
E2.prototype=ES.prototype;E2.__nxgd=true;
window.EventSource=E2;}}catch(_){}
}catch(_){}};
_NXGD.wirePayload=function(){try{
if(_NXGD._pay)return;_NXGD._pay=true;
try{var OF=window.Function;
if(OF&&!OF.__nxgd){
var F2=function(){
try{if(_NXGD.cfg.payloadGuard&&arguments.length){
var src=String(arguments[arguments.length-1]||"");
var r=_NXGD.pesePayload(src);
if(r&&r.bloquer){_NXGD.refusPayload("Function",r);return function(){};}}}catch(_){}
var A=Array.prototype.slice.call(arguments);
return new (OF.prototype.bind.apply(OF,[null].concat(A)))();};
F2.prototype=OF.prototype;F2.__nxgd=true;
window.Function=F2;}}catch(_){}
try{var OT=window.setTimeout,OI=window.setInterval;
if(OT&&!OT.__nxgd){
var T2=function(f,d){
try{if(_NXGD.cfg.payloadGuard&&typeof f==="string"){
var r=_NXGD.pesePayload(f);
if(r&&r.bloquer){_NXGD.refusPayload("setTimeout",r);return 0;}}}catch(_){}
return OT.apply(window,arguments);};
T2.__nxgd=true;window.setTimeout=T2;}
if(OI&&!OI.__nxgd){
var I2=function(f,d){
try{if(_NXGD.cfg.payloadGuard&&typeof f==="string"){
var r2=_NXGD.pesePayload(f);
if(r2&&r2.bloquer){_NXGD.refusPayload("setInterval",r2);return 0;}}}catch(_){}
return OI.apply(window,arguments);};
I2.__nxgd=true;window.setInterval=I2;}}catch(_){}
try{if(document.write&&!document.write.__nxgd){
var OW=document.write;
var W3=function(t){
try{if(_NXGD.cfg.payloadGuard){
var r3=_NXGD.pesePayload(String(t||""));
if(r3&&r3.bloquer){_NXGD.refusPayload("document.write",r3);return;}}}catch(_){}
return OW.apply(document,arguments);};
W3.__nxgd=true;document.write=W3;}}catch(_){}
}catch(_){}};
_NXGD.bloque=function(url,init,ou){try{
if(_NXGD.webhook(url,init,ou))return true;
if(_NXGD.egress(url,ou,init))return true;
return false;}catch(_){return false;}};
_NXGD.wireNet=function(){try{
if(_NXGD._net)return;_NXGD._net=true;
try{if(window.fetch&&!window.fetch.__nxgd){
var of=window.fetch.bind(window);
var f2=function(input,opts){
try{var url=typeof input==="string"?input:(input&&input.url)?input.url:"";
if(url){
var init=opts||(input&&typeof input==="object"?input:null);
if(_NXGD.bloque(url,init,"requete"))return Promise.resolve(new Response("",{status:403,statusText:"Blocked by Nexium"}));}}catch(_){}
return of(input,opts);};
f2.__nxgd=true;window.fetch=f2;}}catch(_){}
try{if(navigator.sendBeacon&&!navigator.sendBeacon.__nxgd){
var ob2=navigator.sendBeacon.bind(navigator);
var b2=function(url,data){
try{if(url&&_NXGD.bloque(url,{body:data,method:"POST"},"balise"))return true;}catch(_){}
return ob2(url,data);};
b2.__nxgd=true;navigator.sendBeacon=b2;}}catch(_){}
try{(function(){var XP=window.XMLHttpRequest&&window.XMLHttpRequest.prototype;
if(XP&&!XP.__nxgd){
var xo=XP.open,xs=XP.send;
XP.open=function(m,u){try{this.__nxgm=m;this.__nxgu=u;}catch(_){}return xo.apply(this,arguments);};
XP.send=function(b){try{
if(this.__nxgu&&_NXGD.bloque(this.__nxgu,{body:b,method:this.__nxgm},"XHR"))return;}catch(_){}
return xs.apply(this,arguments);};
XP.__nxgd=true;}})();}catch(_){}
}catch(_){}};
_NXGD.status=function(){try{
return {webhook:!!_NXGD.cfg.webhookGuard,egress:!!_NXGD.cfg.egressGuard,mode:_NXGD.cfg.egressMode,
balise:!!_NXGD.cfg.beaconGuard,dom:!!_NXGD.cfg.domGuard,charge:!!_NXGD.cfg.payloadGuard,
reseau:!!_NXGD._net,observateur:!!_NXGD._mo,hooks:!!_NXGD._bal,
approuves:(_NXGD.cfg.approuves||[]).length,total:_NXGD.total()};}catch(_){return {};}};
_NXGD.buildIndex();
_NXGD.wireNet();
_NXGD.wireBalise();
_NXGD.wirePayload();
try{setTimeout(_NXGD.wireDom,1200);}catch(_){}
try{window.addEventListener("beforeunload",function(){try{_NXGD.saveStats();}catch(_){}});}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXGD");if(window._NXERR)_NXERR.push("module _NXGD :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXGD desactive:",_nxE);}catch(_){}}
}
