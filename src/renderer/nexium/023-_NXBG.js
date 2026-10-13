var _NXBG=window._NXBG||(window._NXBG={});
if(!_NXBG.boot){_NXBG.boot=true;
_NXBG.KEY="nexium_bg";
_NXBG.SWATCHES=[
{n:"Par défaut",v:null},
{n:"Ardoise",v:"#1e2124"},
{n:"Encre",v:"#0f1117"},
{n:"Nuit profonde",v:"#000000"},
{n:"Prune",v:"#241b2f"},
{n:"Forêt",v:"#16241d"},
{n:"Océan",v:"#132436"},
{n:"Bordeaux",v:"#2b1518"},
{n:"Sépia",v:"#241f18"},
{n:"Gris clair",v:"#e8eaed"},
{n:"Ivoire",v:"#f6f4ee"},
{n:"Ciel pâle",v:"#e6eef7"}];
_NXBG.cfg=(function(){try{var r=_NXDB.get(_NXBG.KEY);var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")d={};
if(typeof d.color!=="string")d.color="";
if(typeof d.on!=="boolean")d.on=false;
return d;}catch(_){return {color:"",on:false};}})();
_NXBG.save=function(){try{_NXDB.set(_NXBG.KEY,JSON.stringify(_NXBG.cfg));}catch(_){}};
_NXBG.listeners=[];
_NXBG.notify=function(){for(var a=0;a<_NXBG.listeners.length;a++){try{_NXBG.listeners[a]();}catch(_){}}};

_NXBG.rgb=function(hex){try{
var h=String(hex||"").replace("#","").trim();
if(h.length===3)h=h[0]+h[0]+h[1]+h[1]+h[2]+h[2];
if(h.length!==6)return null;
var n=parseInt(h,16);
if(isNaN(n))return null;
return {r:(n>>16)&255,g:(n>>8)&255,b:n&255};}catch(_){return null;}};
_NXBG.lum=function(hex){try{
var c=_NXBG.rgb(hex);if(!c)return 0;
var f=function(v){v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);};
return 0.2126*f(c.r)+0.7152*f(c.g)+0.0722*f(c.b);}catch(_){return 0;}};
_NXBG.contrast=function(a,b){try{
var l1=_NXBG.lum(a),l2=_NXBG.lum(b);
var hi=Math.max(l1,l2),lo=Math.min(l1,l2);
return (hi+0.05)/(lo+0.05);}catch(_){return 1;}};
_NXBG.mix=function(hex,target,amount){try{
var c=_NXBG.rgb(hex),t=_NXBG.rgb(target);
if(!c||!t)return hex;
var m=function(x,y){return Math.round(x+(y-x)*amount);};
var h=function(v){var s=Math.max(0,Math.min(255,v)).toString(16);return s.length<2?"0"+s:s;};
return "#"+h(m(c.r,t.r))+h(m(c.g,t.g))+h(m(c.b,t.b));}catch(_){return hex;}};
_NXBG.readable=function(bg){try{
var white=_NXpal.acc,black=_NXpal.bg;
return (_NXBG.contrast(bg,white)>=_NXBG.contrast(bg,black))?white:black;}catch(_){return _NXpal.acc;}};

_NXBG.palette=function(bg){try{
var light=_NXBG.lum(bg)>0.35;
var txt=_NXBG.readable(bg);
var toward=light?_NXpal.bg:_NXpal.acc;
return {
light:light,
txt:txt,
sub:_NXBG.mix(bg,toward,light?0.58:0.62),
dim:_NXBG.mix(bg,toward,light?0.42:0.45),
faint:_NXBG.mix(bg,toward,light?0.26:0.28),
line:_NXBG.mix(bg,toward,0.12),
hair:_NXBG.mix(bg,toward,0.18),
panel:_NXBG.mix(bg,toward,0.04),
inset:_NXBG.mix(bg,toward,0.08),
acc:txt};}catch(_){return null;}};

_NXBG.apply=function(){try{
var _p=window._NXpal;if(!_p)return;
if(!_NXBG.cfg.on||!_NXBG.cfg.color){
_NXBG.active=false;
try{if(window._NXsyncPal)_NXsyncPal(true);}catch(_){}
_NXBG.style("");
try{_NXBG.uiStyle();}catch(_){}
_NXBG.notify();return;}
var p=_NXBG.palette(_NXBG.cfg.color);
if(!p)return;
_NXBG.active=true;
for(var k in p)_p[k]=p[k];
_NXBG.style(_NXBG.cfg.color);
try{_NXBG.uiStyle();}catch(_){}
try{var M=["_NXM","_NXS","_NXP","_NXNET","_NXCL","_NXUP","_NXLY","_NXPR","_NXSP","_NXV"];
for(var a=0;a<M.length;a++){var o=window[M[a]];if(o&&o.notify)o.notify();}}catch(_){}
_NXBG.notify();}catch(_){}};
_NXBG.style=function(color){try{
var id="nx-bg-style";
var el=_NXBG.el||document.getElementById(id);
if(!color){
if(el){try{el.textContent="";}catch(_){}
try{el.id="nx-bg-style-off";}catch(_){}
try{if(el.parentNode&&el.parentNode.removeChild)el.parentNode.removeChild(el);}catch(_){}}
_NXBG.el=null;return;}
if(!el||el.id!==id){el=document.createElement("style");el.id=id;if(document.head)document.head.appendChild(el);}
_NXBG.el=el;
var p=_NXBG.palette(color);
if(!p)return;
el.textContent=
_NXtr('[class*="standardSidebarView"],[class*="contentColumn"],[class*="sidebarRegion"],[class*="contentRegion"]{background:')+_NXtr(color)+_NXtr(' !important;}')
+_NXtr('[class*="contentRegionScroller"]{background:')+_NXtr(color)+_NXtr(' !important;color:')+_NXtr(p.sub)+';}'
+_NXtr('[class*="standardSidebarView"] [class*="item_"]{color:')+_NXtr(p.sub)+';}'
+_NXtr('[class*="standardSidebarView"] [class*="item_"][class*="selected"]{background:')+_NXtr(p.inset)+_NXtr(';color:')+_NXtr(p.txt)+';}'
+_NXtr('[class*="standardSidebarView"] h1,[class*="standardSidebarView"] h2,[class*="standardSidebarView"] h3{color:')+_NXtr(p.txt)+_NXtr(' !important;}')
+_NXtr('[class*="standardSidebarView"] [class*="header_"]{color:')+_NXtr(p.faint)+';}';
}catch(_){}};
_NXBG.uiStyle=function(){try{
var id="nx-ui-style";
var P=window._NXpal||{};
var el=_NXBG._ui||document.getElementById(id);
if(!el||el.id!==id){el=document.createElement("style");el.id=id;if(document.head)document.head.appendChild(el);}
_NXBG._ui=el;
var line=P.line||"var(--background-modifier-accent)";
var hair=P.hair||"var(--background-modifier-hover)";
var panel=P.panel||"var(--background-secondary)";
var inset=P.inset||"var(--background-secondary-alt)";
var txt=P.txt||"var(--header-primary)";
var sub=P.sub||"var(--text-muted)";
var dim=P.dim||"var(--interactive-normal)";
var acc=P.acc||txt;
el.textContent=_NXtr([
/* --- grille des plugins : cartes plus aerees et lisibles --- */
'.vc-plugins-grid{display:grid !important;grid-template-columns:repeat(auto-fill,minmax(270px,1fr)) !important;gap:14px !important;}',
'.vc-addon-card{background:'+panel+' !important;border:1px solid '+line+' !important;border-radius:14px !important;padding:15px 16px !important;',
'transition:transform .16s ease,border-color .16s ease,box-shadow .16s ease !important;position:relative !important;overflow:hidden !important;}',
'.vc-addon-card:hover{transform:translateY(-2px) !important;border-color:'+hair+' !important;box-shadow:0 8px 26px rgba(0,0,0,.22) !important;}',
'.vc-addon-card-enabled,.vc-addon-card[data-enabled="true"]{border-color:'+hair+' !important;}',
'.vc-addon-header{margin-bottom:8px !important;gap:10px !important;}',
'.vc-addon-name{font-weight:700 !important;font-size:14.5px !important;letter-spacing:-.01em !important;color:'+txt+' !important;}',
'.vc-addon-note,.vc-addon-description{font-size:12.5px !important;line-height:1.55 !important;color:'+sub+' !important;}',
'.vc-addon-author{font-size:11px !important;color:'+dim+' !important;}',
/* --- recherche et filtres --- */
'.vc-settings-tab input[type="text"],.vc-settings-tab input[placeholder]{border-radius:11px !important;border:1px solid '+line+' !important;background:'+inset+' !important;padding:10px 13px !important;font-size:13.5px !important;transition:border-color .16s ease !important;}',
'.vc-settings-tab input[type="text"]:focus,.vc-settings-tab input[placeholder]:focus{border-color:'+dim+' !important;outline:none !important;}',
/* --- interrupteurs --- */
'.vc-plugin-toggle,.vc-form-switch{flex-shrink:0 !important;}',
/* --- boutons d action --- */
'.vc-plugins-action-buttons{gap:9px !important;}',
'.vc-plugins-action-buttons button{border-radius:10px !important;font-weight:700 !important;}',
/* --- separateurs et titres de section --- */
'.vc-settings-tab h5,.vc-settings-tab [class*="formTitle"]{letter-spacing:.06em !important;text-transform:uppercase !important;font-size:11px !important;font-weight:800 !important;color:'+dim+' !important;margin-bottom:10px !important;}',
'.vc-divider{background:'+line+' !important;opacity:1 !important;margin:18px 0 !important;}',
/* --- page des themes --- */
'.vc-settings-theme-card,.vc-settings-theme-info-card{background:'+panel+' !important;border:1px solid '+line+' !important;border-radius:14px !important;padding:15px 16px !important;transition:border-color .16s ease,transform .16s ease !important;}',
'.vc-settings-theme-card:hover{border-color:'+hair+' !important;transform:translateY(-2px) !important;}',
'.vc-settings-theme-links textarea,.vc-settings-tab textarea{border-radius:12px !important;border:1px solid '+line+' !important;background:'+inset+' !important;padding:12px 14px !important;font-size:12.5px !important;line-height:1.6 !important;font-family:ui-monospace,SFMono-Regular,Menlo,monospace !important;}',
'.vc-settings-theme-links textarea:focus,.vc-settings-tab textarea:focus{border-color:'+dim+' !important;outline:none !important;}',
'.vc-settings-theme-author,.vc-settings-theme-version{font-size:11px !important;color:'+dim+' !important;}',
/* --- cartes d avertissement plus douces --- */
'.vc-warning-card,.vc-error-card{border-radius:13px !important;padding:14px 16px !important;line-height:1.55 !important;}',
/* --- lisibilite generale de l onglet --- */
'.vc-settings-tab{padding-bottom:28px !important;}',
'.vc-expandable-card{border-radius:13px !important;border:1px solid '+line+' !important;background:'+panel+' !important;}',
'.vc-expandable-card-header{padding:13px 15px !important;font-weight:700 !important;}',
/* --- accessibilite : focus visible --- */
'.vc-addon-card:focus-visible,.vc-settings-theme-card:focus-visible{outline:2px solid '+acc+' !important;outline-offset:2px !important;}',
/* --- respect de la preference systeme --- */
'@media (prefers-reduced-motion: reduce){.vc-addon-card,.vc-settings-theme-card{transition:none !important;}.vc-addon-card:hover,.vc-settings-theme-card:hover{transform:none !important;}}'
].join("\n"));
}catch(_){}};
_NXBG.set=function(color){try{
_NXBG.cfg.color=color||"";
_NXBG.cfg.on=!!color;
_NXBG.save();_NXBG.apply();}catch(_){}};
try{setTimeout(function(){_NXBG.apply();_NXBG.uiStyle();},2500);setTimeout(function(){_NXBG.uiStyle();},9000);}catch(_){}
}
