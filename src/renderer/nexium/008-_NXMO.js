var _NXMO=window._NXMO||(window._NXMO={});
if(!_NXMO.boot){try{_NXMO.boot=true;
_NXMO.ID="nx-motion";
_NXMO.KEY="nexium_motion";
_NXMO.on=(function(){try{
var v=_NXDB.get(_NXMO.KEY);
if(v==="0"&&!_NXDB.get("nexium_motion_v2")){v="1";try{_NXDB.set(_NXMO.KEY,"1");}catch(_){}}
try{_NXDB.set("nexium_motion_v2","1");}catch(_){}
return v===null||v===undefined?true:v==="1";}catch(_){return true;}})();
_NXMO.reduced=function(){try{
return !!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches);}catch(_){return false;}};
// Les coupures de session : le mode allege, le mode securise. Elles ne
// touchent jamais au reglage de l utilisateur et meurent avec la session.
_NXMO.coupes={};
_NXMO.actif=function(){try{
if(!_NXMO.on||_NXMO.reduced())return false;
for(var k in _NXMO.coupes)if(_NXMO.coupes[k])return false;
return true;}catch(_){return false;}};
_NXMO.coupe=function(raison,oui){try{
if(oui)_NXMO.coupes[raison]=true;else delete _NXMO.coupes[raison];
_NXMO.apply();}catch(_){}};
_NXMO.CSS=[
'@keyframes nx-rise{from{opacity:0;transform:translate3d(0,10px,0)}to{opacity:1;transform:none}}',
'@keyframes nx-fade{from{opacity:0}to{opacity:1}}',
'@keyframes nx-sheen{from{transform:translate3d(-100%,0,0)}to{transform:translate3d(220%,0,0)}}',
'@keyframes nx-pulse{0%,100%{opacity:.35;transform:scale(1)}50%{opacity:1;transform:scale(1.35)}}',
'@keyframes nx-ia-point{0%,80%,100%{opacity:.25;transform:translateY(0)}40%{opacity:1;transform:translateY(-3px)}}',
'@keyframes nx-ia-curseur{0%,50%{opacity:1}51%,100%{opacity:0}}',
'@keyframes nx-ia-monte{from{opacity:0;transform:translate3d(0,12px,0) scale(.98)}to{opacity:1;transform:none}}',
'.nx-anim [data-nx-rise]{animation:nx-rise .34s cubic-bezier(.22,.8,.28,1) both}',
'.nx-anim [data-nx-rise="1"]{animation-delay:.02s}',
'.nx-anim [data-nx-rise="2"]{animation-delay:.05s}',
'.nx-anim [data-nx-rise="3"]{animation-delay:.08s}',
'.nx-anim [data-nx-rise="4"]{animation-delay:.11s}',
'.nx-anim [data-nx-rise="5"]{animation-delay:.14s}',
'.nx-anim [data-nx-rise="6"]{animation-delay:.17s}',
'.nx-anim [data-nx-fade]{animation:nx-fade .26s ease both}',
'.nx-anim .nx-fx{transition:transform .16s cubic-bezier(.22,.8,.28,1),opacity .16s ease,border-color .16s ease,background-color .16s ease}',
'.nx-anim .nx-fx:hover{transform:translate3d(0,-1px,0)}',
'.nx-anim .nx-fx:active{transform:translate3d(0,0,0) scale(.985);opacity:.9}',
'.nx-anim [data-nx-lift]{transition:transform .2s cubic-bezier(.22,.8,.28,1),border-color .2s ease}',
'.nx-anim [data-nx-lift]:hover{transform:translate3d(0,-2px,0)}',
'.nx-anim [data-nx-tab]{transition:color .16s ease}',
'.nx-anim [data-nx-ink]{transition:transform .26s cubic-bezier(.22,.8,.28,1),width .26s cubic-bezier(.22,.8,.28,1)}',
'.nx-anim [data-nx-sw]{transition:background-color .18s ease,border-color .18s ease}',
'.nx-anim [data-nx-sw] > *{transition:transform .2s cubic-bezier(.34,1.4,.5,1),background-color .18s ease}',
'.nx-anim [data-nx-bar] > *{transition:transform .5s cubic-bezier(.22,.8,.28,1);transform-origin:left center}',
'.nx-anim [data-nx-skel]{position:relative;overflow:hidden}',
'.nx-anim [data-nx-skel]::after{content:"";position:absolute;inset:0;transform:translate3d(-100%,0,0);'
+'background:linear-gradient(90deg,transparent,rgba(255,255,255,.045),transparent);animation:nx-sheen 1.5s linear infinite}',
'.nx-anim [data-nx-dot]{animation:nx-pulse 2.4s ease-in-out infinite}',
'@keyframes nx-breathe{0%,100%{opacity:.34}50%{opacity:.9}}',
'@keyframes nx-shine{0%{transform:translate3d(-130%,0,0)}100%{transform:translate3d(330%,0,0)}}',
'@keyframes nx-pop{from{opacity:0;transform:translate3d(0,4px,0) scale(.94)}to{opacity:1;transform:none}}',
'@keyframes nx-swipe{from{opacity:0;transform:translate3d(0,6px,0)}to{opacity:1;transform:none}}',
'.nx-anim [data-nx-pop]{animation:nx-pop .3s cubic-bezier(.22,.8,.28,1) both}',
'.nx-anim [data-nx-breathe]{animation:nx-breathe 3.6s ease-in-out infinite;will-change:opacity}',
'.nx-anim [data-nx-shine]{position:relative;overflow:hidden;}','.nx-anim [data-nx-shine]::after{content:"";position:absolute;top:0;bottom:0;left:0;width:42%;pointer-events:none;transform:translate3d(-130%,0,0);will-change:transform;background:linear-gradient(100deg,transparent,rgba(255,255,255,.42),transparent);animation:nx-shine 3.4s linear infinite}',
'.nx-anim [data-nx-panel]{animation:nx-swipe .26s cubic-bezier(.22,.8,.28,1) both}',
'.nx-anim [data-nx-ring]{transition:stroke-dashoffset .9s cubic-bezier(.22,.8,.28,1),stroke .3s ease}',
'.nx-anim [data-nx-panel] > * > *{animation:nx-rise .36s cubic-bezier(.22,.8,.28,1) both}',
'.nx-anim [data-nx-panel] > * > *:nth-child(1){animation-delay:.01s}',
'.nx-anim [data-nx-panel] > * > *:nth-child(2){animation-delay:.05s}',
'.nx-anim [data-nx-panel] > * > *:nth-child(3){animation-delay:.09s}',
'.nx-anim [data-nx-panel] > * > *:nth-child(4){animation-delay:.13s}',
'.nx-anim [data-nx-panel] > * > *:nth-child(5){animation-delay:.17s}',
'.nx-anim [data-nx-panel] > * > *:nth-child(6){animation-delay:.21s}',
'.nx-anim [data-nx-panel] > * > *:nth-child(n+7){animation-delay:.25s}',
'.nx-anim [data-nx-tile]{transition:transform .22s cubic-bezier(.22,.8,.28,1),border-color .22s ease,background-color .22s ease}',
'.nx-anim [data-nx-tile]:hover{transform:translate3d(0,-3px,0)}',
'@keyframes nx-spin{to{transform:rotate(360deg)}}',
'@keyframes nx-eq{0%,100%{transform:scaleY(.28)}50%{transform:scaleY(1)}}',
'.nx-anim [data-nx-spin]{animation:nx-spin 9s linear infinite;will-change:transform}',
'[data-nx-spin][data-nx-halt]{animation-play-state:paused}',
'.nx-anim [data-nx-eq] > i{animation:nx-eq .9s ease-in-out infinite;transform-origin:bottom center}',
'.nx-anim [data-nx-eq] > i:nth-child(2){animation-delay:.18s}',
'.nx-anim [data-nx-eq] > i:nth-child(3){animation-delay:.36s}',
'.nx-anim [data-nx-eq] > i:nth-child(4){animation-delay:.54s}',
'@keyframes nx-scan{0%{transform:translate3d(-40%,0,0)}100%{transform:translate3d(460%,0,0)}}',
'@keyframes nx-grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}',
'@keyframes nx-run{0%{transform:translate3d(0,0,0);opacity:0}14%{opacity:1}86%{opacity:1}100%{transform:translate3d(var(--nx-run,40px),0,0);opacity:0}}',
'@keyframes nx-halo{0%,100%{opacity:.18;transform:scale(1)}50%{opacity:.42;transform:scale(1.12)}}',
'.nx-anim [data-nx-scan]{animation:nx-scan 3.4s cubic-bezier(.5,0,.5,1) infinite;will-change:transform}',
'.nx-anim [data-nx-grow]{animation:nx-grow .7s cubic-bezier(.22,.8,.28,1) both;transform-origin:left center}',
'.nx-anim [data-nx-grow="1"]{animation-delay:.04s}',
'.nx-anim [data-nx-grow="2"]{animation-delay:.08s}',
'.nx-anim [data-nx-grow="3"]{animation-delay:.12s}',
'.nx-anim [data-nx-grow="4"]{animation-delay:.16s}',
'.nx-anim [data-nx-grow="5"]{animation-delay:.2s}',
'.nx-anim [data-nx-grow="6"]{animation-delay:.24s}',
'.nx-anim [data-nx-run]{animation:nx-run 2.6s cubic-bezier(.45,0,.55,1) infinite}',
'.nx-anim [data-nx-halo]{animation:nx-halo 4.2s ease-in-out infinite;will-change:opacity,transform}',
'@keyframes nx-float{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-3px,0)}}',
'@keyframes nx-bob{0%,100%{transform:translate3d(0,0,0) rotate(0)}25%{transform:translate3d(0,-2px,0) rotate(-5deg)}75%{transform:translate3d(0,1px,0) rotate(5deg)}}',
'@keyframes nx-beat{0%,100%{transform:scale(1)}14%{transform:scale(1.17)}28%{transform:scale(1)}42%{transform:scale(1.1)}56%{transform:scale(1)}}',
'@keyframes nx-swing{0%,100%{transform:rotate(0)}20%{transform:rotate(10deg)}40%{transform:rotate(-8deg)}60%{transform:rotate(5deg)}80%{transform:rotate(-2deg)}}',
'@keyframes nx-wob{0%,100%{transform:rotate(0) scale(1)}30%{transform:rotate(-7deg) scale(1.07)}70%{transform:rotate(7deg) scale(1.07)}}',
'@keyframes nx-draw{from{stroke-dashoffset:var(--nx-len,140)}to{stroke-dashoffset:0}}',
'@keyframes nx-orbit{from{transform:rotate(0) translateX(var(--nx-r,7px)) rotate(0)}to{transform:rotate(360deg) translateX(var(--nx-r,7px)) rotate(-360deg)}}',
'@keyframes nx-tick{0%{transform:scale(.35);opacity:0}60%{transform:scale(1.2);opacity:1}100%{transform:scale(1);opacity:1}}',
'@keyframes nx-glow{0%,100%{opacity:.62;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}',
'@keyframes nx-shake{0%,100%{transform:translate3d(0,0,0)}20%{transform:translate3d(-2px,0,0)}40%{transform:translate3d(2px,0,0)}60%{transform:translate3d(-1px,0,0)}80%{transform:translate3d(1px,0,0)}}',
'@keyframes nx-zoom{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:none}}',
'@keyframes nx-slidel{from{opacity:0;transform:translate3d(-14px,0,0)}to{opacity:1;transform:none}}',
'@keyframes nx-slider{from{opacity:0;transform:translate3d(14px,0,0)}to{opacity:1;transform:none}}',
'@keyframes nx-blurin{from{opacity:0;transform:translateY(9px) scale(.984)}to{opacity:1;transform:none}}',
'@keyframes nx-wave{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-5px,0)}}',
'@keyframes nx-dash{to{stroke-dashoffset:-64}}',
'@keyframes nx-ripple{0%{transform:scale(.55);opacity:.45}100%{transform:scale(2.2);opacity:0}}',
'@keyframes nx-marquee{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}',
'@keyframes nx-sheen2{0%{transform:translate3d(-130%,0,0) rotate(16deg)}100%{transform:translate3d(340%,0,0) rotate(16deg)}}',
'@keyframes nx-drift{0%{transform:translate3d(0,0,0)}50%{transform:translate3d(6px,-8px,0)}100%{transform:translate3d(0,0,0)}}',
'@keyframes nx-flip{from{transform:rotateY(-90deg);opacity:0}to{transform:none;opacity:1}}',
'@keyframes nx-stroke{0%{stroke-dashoffset:var(--nx-len,140);opacity:0}12%{opacity:1}100%{stroke-dashoffset:0;opacity:1}}',
'.nx-anim [data-nx-float]{animation:nx-float 3.4s ease-in-out infinite;will-change:transform}',
'.nx-anim [data-nx-bob]{animation:nx-bob 4.2s ease-in-out infinite;will-change:transform}',
'.nx-anim [data-nx-beat]{animation:nx-beat 2.6s ease-in-out infinite;will-change:transform}',
'.nx-anim [data-nx-swing]{animation:nx-swing 3.8s ease-in-out infinite;transform-origin:top center}',
'.nx-anim [data-nx-glow]{animation:nx-glow 3.2s ease-in-out infinite}',
'.nx-anim [data-nx-shake]{animation:nx-shake .5s ease-in-out}',
'.nx-anim [data-nx-zoom]{animation:nx-zoom .3s cubic-bezier(.22,.8,.28,1) both}',
'.nx-anim [data-nx-slidel]{animation:nx-slidel .34s cubic-bezier(.22,.8,.28,1) both}',
'.nx-anim [data-nx-slider]{animation:nx-slider .34s cubic-bezier(.22,.8,.28,1) both}',
'.nx-anim [data-nx-blurin]{animation:nx-blurin .5s ease both}',
'.nx-anim [data-nx-drift]{animation:nx-drift 14s ease-in-out infinite;will-change:transform}',
'.nx-anim [data-nx-flip]{animation:nx-flip .4s cubic-bezier(.22,.8,.28,1) both}',
'.nx-anim [data-nx-trace]{stroke-dasharray:var(--nx-len,140);animation:nx-stroke 1.5s cubic-bezier(.5,0,.2,1) both}',
'.nx-anim [data-nx-dashy]{stroke-dasharray:6 6;animation:nx-dash 3.4s linear infinite}',
'.nx-anim [data-nx-marquee] > *{animation:nx-marquee 26s linear infinite}',
'.nx-anim [data-nx-ripple]{animation:nx-ripple 2.6s cubic-bezier(.2,.7,.4,1) infinite}',
'.nx-anim [data-nx-sheen]{position:relative;overflow:hidden}',
'.nx-anim [data-nx-sheen]::after{content:"";position:absolute;top:-60%;bottom:-60%;width:34%;'
+'background:linear-gradient(90deg,transparent,rgba(255,255,255,.09),transparent);animation:nx-sheen2 4.6s ease-in-out infinite;pointer-events:none}',
'[data-nx-ico]{display:inline-flex;align-items:center;justify-content:center}',
'.nx-anim [data-nx-ico]{transition:transform .3s cubic-bezier(.34,1.45,.5,1),color .2s ease}',
'.nx-anim [data-nx-lift]:hover [data-nx-ico],.nx-anim [data-nx-tile]:hover [data-nx-ico],.nx-anim .nx-fx:hover [data-nx-ico]{transform:scale(1.16)}',
'.nx-anim [data-nx-tile]:hover [data-nx-ico="tourne"],.nx-anim [data-nx-lift]:hover [data-nx-ico="tourne"]{transform:rotate(90deg) scale(1.1)}',
'.nx-anim [data-nx-tile]:hover [data-nx-ico="penche"],.nx-anim [data-nx-lift]:hover [data-nx-ico="penche"]{transform:rotate(-9deg) scale(1.16)}',
'.nx-anim [data-nx-tile]:hover [data-nx-ico="saute"],.nx-anim [data-nx-lift]:hover [data-nx-ico="saute"]{transform:translate3d(0,-3px,0) scale(1.12)}',
'.nx-anim [data-nx-tile]:hover [data-nx-ico="secoue"],.nx-anim [data-nx-lift]:hover [data-nx-ico="secoue"]{animation:nx-wob .55s ease-in-out}',
'.nx-anim [data-nx-tile]:hover [data-nx-ico="pousse"],.nx-anim [data-nx-lift]:hover [data-nx-ico="pousse"]{transform:translate3d(3px,0,0) scale(1.1)}',
'.nx-anim [data-nx-rise="7"]{animation-delay:.2s}',
'.nx-anim [data-nx-rise="8"]{animation-delay:.23s}',
'.nx-anim [data-nx-rise="9"]{animation-delay:.26s}',
'.nx-anim [data-nx-rise="10"]{animation-delay:.29s}',
'.nx-anim [data-nx-rise="11"]{animation-delay:.32s}',
'.nx-anim [data-nx-rise="12"]{animation-delay:.35s}',
'.nx-anim [data-nx-souligne]{position:relative}',
'.nx-anim [data-nx-souligne]::after{content:"";position:absolute;left:0;right:0;bottom:-3px;height:1px;'
+'background:currentColor;transform:scaleX(0);transform-origin:left center;transition:transform .26s cubic-bezier(.22,.8,.28,1)}',
'.nx-anim [data-nx-souligne]:hover::after{transform:scaleX(1)}',
'.nx-anim [data-nx-carte]{transition:transform .26s cubic-bezier(.22,.8,.28,1),box-shadow .26s ease,border-color .26s ease}',
'.nx-anim [data-nx-carte]:hover{transform:translate3d(0,-2px,0);box-shadow:0 10px 30px rgba(0,0,0,.32)}',
'.nx-anim [data-nx-appui]:active{transform:scale(.975)}',
'[data-nx-defile]{scroll-behavior:smooth}',
'[data-nx-rise],[data-nx-fade]{animation:none}',
'@media (prefers-reduced-motion: reduce){.nx-anim *{animation:none!important;transition:none!important}}'
].join("\n");
_NXMO.apply=function(){try{
var el=document.getElementById(_NXMO.ID);
if(!el){el=document.createElement("style");el.id=_NXMO.ID;}
var tete=document.head||document.documentElement;
if(tete&&!el.parentNode)tete.appendChild(el);
if(el.textContent!==_NXtr(_NXMO.CSS))el.textContent=_NXtr(_NXMO.CSS);
var root=document.documentElement;
if(!root||!root.classList)return;
if(_NXMO.actif())root.classList.add("nx-anim");
else root.classList.remove("nx-anim");}catch(_){}};
_NXMO.set=function(v){try{
_NXMO.on=!!v;
try{_NXDB.set(_NXMO.KEY,v?"1":"0");}catch(_){}
_NXMO.apply();}catch(_){}};
_NXMO.status=function(){try{
return {actif:_NXMO.on,effectif:_NXMO.actif(),coupes:Object.keys(_NXMO.coupes),systemeReduit:_NXMO.reduced(),
applique:!!(document.documentElement&&document.documentElement.classList&&document.documentElement.classList.contains("nx-anim")),
feuille:!!document.getElementById(_NXMO.ID)};}catch(_){return {};}};
_NXMO.rise=function(n){return _NXMO.actif()?{"data-nx-rise":String(n||0)}:{};};
_NXMO.merge=function(base,extra){try{
var o={};for(var k in base)o[k]=base[k];
if(extra)for(var k2 in extra)o[k2]=extra[k2];
return o;}catch(_){return base||{};}};
try{(function(){_NXMO.apply();
var garde=function(){try{
var r=document.documentElement;
if(!r||!r.classList)return;
var el=document.getElementById(_NXMO.ID);
if(!el||!el.parentNode||_NXMO.actif()!==r.classList.contains("nx-anim"))_NXMO.apply();}catch(_){}};
try{document.addEventListener("DOMContentLoaded",garde);}catch(_){}
try{setTimeout(garde,1500);setTimeout(garde,6000);}catch(_){}
try{if(window.MutationObserver&&document.documentElement)
new MutationObserver(garde).observe(document.documentElement,{attributes:true,attributeFilter:["class"]});}catch(_){}
if(window.matchMedia){var mq=window.matchMedia("(prefers-reduced-motion: reduce)");
if(mq.addEventListener)mq.addEventListener("change",function(){_NXMO.apply();});
else if(mq.addListener)mq.addListener(function(){_NXMO.apply();});}
})();}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXMO");if(window._NXERR)_NXERR.push("module _NXMO :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXMO desactive:",_nxE);}catch(_){}}
}
