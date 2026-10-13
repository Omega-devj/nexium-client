var _NXthemeCB=window._NXthemeCB||(window._NXthemeCB=[]);
try{(function(){setTimeout(_NXsyncPal,600);
if(typeof MutationObserver!=="undefined"&&document.documentElement){
var _cle=function(){try{var el=document.documentElement,bd=document.body;var m=(((el&&el.className)||"")+" "+((bd&&bd.className)||"")).match(/(^|\s)(theme-[\w-]+|custom-theme[\w-]*|visual-refresh[\w-]*|nx-skin|nx-sig-[\w-]+)(?=\s|$)/g);return m?m.join(""):"";}catch(_){return "?";}};var _vu=_cle();var _tmo=new MutationObserver(function(){var c=_cle();if(c===_vu)return;_vu=c;_NXsyncPal();});
_tmo.observe(document.documentElement,{attributes:true,attributeFilter:["class"]});
if(document.body)_tmo.observe(document.body,{attributes:true,attributeFilter:["class"]});}
})();}catch(_){}
var _NXfxStyle=function(){try{if(document.getElementById("nx-fx-style"))return;var s=document.createElement("style");s.id="nx-fx-style";s.textContent=_NXtr(".nx-fx:focus-visible{outline:2px solid currentColor;outline-offset:2px;border-radius:10px;}.nx-fx:focus:not(:focus-visible){outline:none;}@media (prefers-reduced-motion: reduce){#nx-welcome,#nx-welcome *,#nx-update-modal *,#nx-version-screen *,#nx-blocked-modal *{animation:none!important;transition:none!important;}}");if(document.head)document.head.appendChild(s);}catch(_){}};
try{setTimeout(_NXfxStyle,300);}catch(_){}
var _NXSCHEMA=1;
var _NXmig=function(d,name){try{if(!d||typeof d!=="object")return d;if(d._sv===_NXSCHEMA)return d;d._sv=_NXSCHEMA;}catch(_){}return d;};
