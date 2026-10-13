var _NXlogin=window._NXlogin||(window._NXlogin={});
if(!_NXlogin.boot){try{_NXlogin.boot=true;
_NXlogin.CSS=[
"@keyframes nxLogIn{from{opacity:0;transform:translate3d(0,-12px,0)}to{opacity:1;transform:none}}",
"@keyframes nxLogUp{from{opacity:0;transform:translate3d(0,10px,0)}to{opacity:1;transform:none}}",
"@keyframes nxSheen{0%{background-position:-140% 0}100%{background-position:240% 0}}",
"@keyframes nxHalo{0%,100%{opacity:.34}50%{opacity:.92}}",
"@keyframes nxBip{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:1;transform:scale(1.5)}}",
"#nx-welcome{position:fixed;top:0;left:0;right:0;z-index:2000;display:flex;flex-direction:column;",
"align-items:center;pointer-events:none;padding-top:22px;user-select:none}",
"#nx-welcome > *{animation:nxLogIn .78s cubic-bezier(.16,1,.3,1) both}",
"#nx-welcome > *:nth-child(2){animation-delay:.08s}",
"#nx-welcome > *:nth-child(3){animation-delay:.17s}",
"#nx-welcome > *:nth-child(4){animation-delay:.26s}",
"#nx-welcome > *:nth-child(5){animation-delay:.34s}",
"#nx-welcome .nx-kick{display:flex;align-items:center;gap:9px;font-size:9.5px;font-weight:800;",
"letter-spacing:.36em;text-transform:uppercase;color:rgba(190,190,198,.62);padding-left:.36em}",
"#nx-welcome .nx-kick i{display:block;width:18px;height:1px;background:rgba(190,190,198,.32)}",
"#nx-welcome .nx-brand{margin-top:11px;font-family:var(--font-display),'Bricolage Grotesque','gg sans',sans-serif;",
"font-size:44px;font-weight:800;letter-spacing:.055em;line-height:1;padding-left:.055em;",
"background:linear-gradient(100deg,#ffffff,#b9b9c4 28%,#ffffff 50%,#b9b9c4 72%,#ffffff);",
"background-size:220% 100%;-webkit-background-clip:text;background-clip:text;",
"-webkit-text-fill-color:transparent;color:transparent;animation:nxSheen 7s linear 3}",
"#nx-welcome .nx-sub{margin-top:12px;font-size:13px;color:rgba(168,168,178,.82);letter-spacing:-.005em}",
"#nx-welcome .nx-row{margin-top:14px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center}",
"#nx-welcome .nx-chip{display:flex;align-items:center;gap:7px;padding:5px 12px;border-radius:99px;",
"border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.035);",
"font-size:10.5px;font-weight:700;color:rgba(196,196,204,.85);letter-spacing:.02em}",
"#nx-welcome .nx-chip b{font-family:var(--font-code),'JetBrains Mono',ui-monospace,monospace;font-weight:600;color:rgba(232,232,238,.95)}",
"#nx-welcome .nx-bip{width:6px;height:6px;border-radius:50%;background:#57f287;flex-shrink:0;animation:nxBip 2.6s ease-in-out infinite}",
"#nx-foot{position:fixed;left:0;right:0;bottom:20px;z-index:2000;display:flex;flex-direction:column;",
"align-items:center;gap:9px;pointer-events:none;user-select:none;",
"animation:nxLogUp .9s cubic-bezier(.16,1,.3,1) .5s both}",
"#nx-foot .nx-mots{display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:center;",
"font-size:10px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(150,150,160,.5)}",
"#nx-foot .nx-mots span{display:flex;align-items:center;gap:14px}",
"#nx-foot .nx-mots em{font-style:normal;width:3px;height:3px;border-radius:50%;background:rgba(150,150,160,.32)}",
"#nx-foot .nx-note{font-size:11px;color:rgba(140,140,150,.55);letter-spacing:.01em}",
".nx-login-glow{position:fixed;left:0;top:0;right:0;bottom:0;z-index:0;pointer-events:none;",
"background:radial-gradient(58% 42% at 50% 8%, rgba(126,116,190,.13), transparent 62%),",
"radial-gradient(46% 38% at 50% 100%, rgba(72,84,138,.10), transparent 62%);",
"animation:nxHalo 7s ease-in-out infinite}",
"@media (prefers-reduced-motion: reduce){#nx-welcome *,#nx-welcome,#nx-foot,.nx-login-glow{animation:none!important}}",
"@media (max-height: 720px){#nx-foot{display:none}#nx-welcome .nx-row{display:none}}"
].join("");
_NXlogin.injectStyle=function(){try{
if(document.getElementById("nx-login-style"))return;
var s=document.createElement("style");
s.id="nx-login-style";
s.textContent=_NXtr(_NXlogin.CSS);
if(document.head)document.head.appendChild(s);}catch(_){}};
// v204 : le QR code et les cles d acces ne sont plus jamais caches a la
// connexion. Certains comptes ne peuvent entrer que par la ; un client qui
// les retirait laissait ces comptes dehors.
_NXlogin.cfg=function(){return {qr:false,passkey:false};};
_NXlogin.SELQR='[class*="qrLogin"],[class*="qrCode"],[class*="QRLogin"]';
_NXlogin.MOTSCLE=/(cl[ée]s?\s*d[' \u2019]?acc[èe]s|passkey|cl[ée]\s*de\s*s[ée]curit[ée]|security\s*key|windows\s*hello|touch\s*id|face\s*id)/i;
_NXlogin.trouve={qr:0,passkey:0};
_NXlogin.styleGarde=function(){try{
var id="nx-login-guard";
var on=_NXlogin.cfg();
var vieux=document.getElementById(id);
if(!on.qr){if(vieux&&vieux.parentNode)vieux.parentNode.removeChild(vieux);return;}
if(vieux)return;
var st=document.createElement("style");
st.id=id;
st.textContent=_NXtr(_NXlogin.SELQR)+_NXtr("{display:none!important}");
if(document.head)document.head.appendChild(st);}catch(_){}};
_NXlogin.conteneur=function(el){try{
var n=el,d=0;
while(n&&d<5){
var p=n.parentElement;
if(!p)break;
var r=p.getBoundingClientRect?p.getBoundingClientRect():null;
if(r&&r.height>0&&r.height<260&&r.width>0&&r.width<560)return p;
n=p;d++;}
return el;}catch(_){return el;}};
_NXlogin.coupePasskey=function(){try{
var on=_NXlogin.cfg();
if(!on.passkey){_NXlogin.trouve.passkey=0;
try{var cc=document.querySelectorAll('[data-nx-coupe]');
for(var z=0;z<cc.length;z++){cc[z].removeAttribute("data-nx-coupe");cc[z].style.removeProperty("display");}}catch(_){}
return;}
var n=0;
var cand=document.querySelectorAll('button,a,[role="button"],[class*="passkey"],[class*="Passkey"],[class*="webauthn"]');
for(var a=0;a<cand.length&&a<400;a++){
var el=cand[a];
if(el.getAttribute&&el.getAttribute("data-nx-coupe"))continue;
var t="";
try{t=(el.textContent||"")+" "+(el.getAttribute("aria-label")||"")+" "+(el.className&&el.className.baseVal!==undefined?el.className.baseVal:(el.className||""));}catch(_){}
if(t.length>160)continue;
if(!_NXlogin.MOTSCLE.test(t))continue;
var cible=_NXlogin.conteneur(el);
try{cible.setAttribute("data-nx-coupe","1");
cible.style.setProperty("display","none","important");}catch(_){}
n++;}
try{_NXlogin.trouve.passkey=document.querySelectorAll('[data-nx-coupe]').length;}
catch(_){_NXlogin.trouve.passkey=n;}}catch(_){}};
_NXlogin.avis=function(){try{
var on=_NXlogin.cfg();
if(!on.qr&&!on.passkey){var v=document.getElementById("nx-login-avis");
if(v&&v.parentNode)v.parentNode.removeChild(v);return;}
if(document.getElementById("nx-login-avis"))return;
var boite=document.querySelector('[class*="authBox"],[class*="AuthBox"],[class*="authBoxContainer"]');
if(!boite)return;
var quoi=(on.qr&&on.passkey)?"Le QR code et les cl\u00e9s d\u2019acc\u00e8s sont d\u00e9sactiv\u00e9s"
:(on.qr?"La connexion par QR code est d\u00e9sactiv\u00e9e":"Les cl\u00e9s d\u2019acc\u00e8s sont d\u00e9sactiv\u00e9es");
var pourquoi=on.qr
?"Un QR code de connexion donne un acc\u00e8s complet \u00e0 ton compte \u00e0 qui le scanne. C\u2019est la premi\u00e8re m\u00e9thode de vol de compte sur Discord : on te demande de scanner sous un pr\u00e9texte, et la session part."
:"Un client modifi\u00e9 ne peut pas garantir l\u2019origine d\u2019une demande de cl\u00e9 d\u2019acc\u00e8s. Nexium pr\u00e9f\u00e8re fermer cette porte.";
var d=document.createElement("div");
d.id="nx-login-avis";
d.setAttribute("role","note");
d.style.cssText="position:absolute;left:0;right:0;top:100%;margin-top:12px;"
+"padding:14px 16px;border-radius:12px;box-sizing:border-box;"
+"border:1px solid rgba(87,242,135,.24);background:rgba(87,242,135,.055);"
+"font-family:var(--font-primary),system-ui,sans-serif;"
+"animation:nxLogUp .5s cubic-bezier(.16,1,.3,1) .25s both;";
try{var pos=window.getComputedStyle(boite).position;
if(pos==="static")boite.style.position="relative";}catch(_){}
var esc=function(x){return String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
d.innerHTML=_NXtrHtml('<div style="display:flex;align-items:center;gap:9px;margin-bottom:7px;">'
+'<svg viewBox="0 0 24 24" width="15" height="15" fill="#57f287" aria-hidden="true"><path d="M12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm-1.06 13.54L7.4 12l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41-5.64 5.66z"/></svg>'
+'<div style="font-size:12.5px;font-weight:700;color:#57f287;letter-spacing:-.01em;">'+esc(quoi)+'</div></div>'
+'<div style="font-size:12px;color:rgba(181,186,193,.9);line-height:1.62;">'+esc(pourquoi)+'</div>'
+'<div style="font-size:10.5px;color:rgba(150,150,160,.7);margin-top:8px;">'
+'Nexium Protect \u203a Boucliers \u2014 si tu en as vraiment besoin, tu peux le r\u00e9activer.</div>');
try{boite.appendChild(d);}catch(_){}}catch(_){}};
_NXlogin.garde=function(){try{
_NXlogin.styleGarde();
_NXlogin.coupePasskey();
_NXlogin.avis();
try{_NXlogin.trouve.qr=document.querySelectorAll(_NXlogin.SELQR).length;}catch(_){_NXlogin.trouve.qr=0;}
}catch(_){}};
_NXlogin.status=function(){try{
var on=_NXlogin.cfg();
return {surLaPageDeConnexion:_NXlogin.isLogin(),
qrCoupe:on.qr,qrTrouve:_NXlogin.trouve.qr,
passkeyCoupe:on.passkey,passkeyTrouve:_NXlogin.trouve.passkey,
avis:!!document.getElementById("nx-login-avis")};}catch(_){return {};}};
_NXlogin.isLogin=function(){try{
return !!document.querySelector('[class*="authBox"],[class*="AuthBox"],[class*="authBoxContainer"],[class*="qrLogin"]');}catch(_){return false;}};
_NXlogin.arretees=function(){try{
var n=0;
try{n+=(window._NXPR&&_NXPR.stats&&_NXPR.stats.blocked)||0;}catch(_){}
try{n+=(window._NXGD&&_NXGD.total)?_NXGD.total():0;}catch(_){}
try{n+=(window._NXP&&_NXP.stats&&_NXP.stats.blocked)||0;}catch(_){}
return n;}catch(_){return 0;}};
_NXlogin.nombre=function(v){try{
if(v>=1000000)return (v/1000000).toFixed(1).replace(/\.0$/,"")+" M";
if(v>=1000)return (v/1000).toFixed(1).replace(/\.0$/,"")+" k";
return String(v);}catch(_){return String(v);}};
_NXlogin.esc=function(x){return String(x).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
_NXlogin.mount=function(){try{
if(!_NXlogin.isLogin()){_NXlogin.unmount();return;}
_NXlogin.seen=true;
_NXlogin.injectStyle();
_NXlogin.garde();
if(!document.getElementById("nx-login-glow")){
var g=document.createElement("div");
g.id="nx-login-glow";g.className="nx-login-glow";
if(document.body)document.body.appendChild(g);}
if(!document.getElementById("nx-welcome")){
var ver=(window._NXUP&&_NXUP.VERSION)?("v"+_NXUP.VERSION):"";
var n=_NXlogin.arretees();
var b=document.createElement("div");
b.id="nx-welcome";
b.setAttribute("aria-hidden","true");
b.innerHTML=_NXtrHtml("<div class='nx-kick'><i></i>Environnement protégé<i></i></div>"
+"<div class='nx-brand'>NEXIUM</div>"
+"<div class='nx-sub'>Ton Discord, repris en main.</div>"
+"<div class='nx-row'>"
+"<span class='nx-chip'><span class='nx-bip'></span>Protection active</span>"
+(ver?("<span class='nx-chip'><b>"+_NXlogin.esc(ver)+"</b></span>"):"")
+(n>0?("<span class='nx-chip'><b>"+_NXlogin.esc(_NXlogin.nombre(n))+"</b> déjà arrêtées ici</span>"):"")
+"</div>");
if(document.body)document.body.appendChild(b);}
if(!document.getElementById("nx-foot")){
var f=document.createElement("div");
f.id="nx-foot";
f.setAttribute("aria-hidden","true");
f.innerHTML=_NXtrHtml("<div class='nx-mots'><span>Liens piégés<em></em>Télémétrie<em></em>Exfiltration</span></div>"
+"<div class='nx-note'>arrêtés avant toi, sur cette machine</div>");
if(document.body)document.body.appendChild(f);}
}catch(_){}};
_NXlogin.unmount=function(){try{
["nx-welcome","nx-foot","nx-login-glow","nx-login-guard","nx-login-avis"].forEach(function(id){
var e=document.getElementById(id);
if(e&&e.parentNode)e.parentNode.removeChild(e);});}catch(_){}};
_NXlogin.tick=function(){try{if(document.hidden)return;_NXlogin.mount();}catch(_){}};
try{
_NXlogin.t0=Date.now();
setTimeout(_NXlogin.tick,400);setTimeout(_NXlogin.tick,1200);
_NXlogin.veille=function(){try{
if(_NXlogin.vv)return;
_NXlogin.vv=setInterval(function(){try{
if(document.hidden)return;
if(!_NXlogin.isLogin())return;
clearInterval(_NXlogin.vv);_NXlogin.vv=null;_NXlogin.rapide();
}catch(_){}},30000);}catch(_){}};
_NXlogin.rapide=function(){try{
if(_NXlogin.iv)return;
_NXlogin.iv=setInterval(function(){try{
if(_NXlogin.seen&&!_NXlogin.isLogin()){
clearInterval(_NXlogin.iv);_NXlogin.iv=null;_NXlogin.unmount();_NXlogin.veille();return;}
if(Date.now()-_NXlogin.t0>150000&&!_NXlogin.seen){
clearInterval(_NXlogin.iv);_NXlogin.iv=null;_NXlogin.veille();return;}
_NXlogin.tick();}catch(_){}},3000);}catch(_){}};
_NXlogin.rapide();}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXlogin");if(window._NXERR)_NXERR.push("module _NXlogin :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXlogin desactive:",_nxE);}catch(_){}}

}var _NXWelcome=window._NXWelcome||(window._NXWelcome={});
