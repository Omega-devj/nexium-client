if(!_NXECO.boot){try{_NXECO.boot=true;
_NXECO.KEY="nexium_eco";
_NXECO.listeners=[];
_NXECO.notify=function(){for(var a=0;a<_NXECO.listeners.length;a++){try{_NXECO.listeners[a]();}catch(_){}}};
_NXECO.machine=function(){try{
var n=window.navigator||{};
return {coeurs:n.hardwareConcurrency||0,memoire:n.deviceMemory||0};}catch(_){return {coeurs:0,memoire:0};}};
// Les images par seconde comptees par l ecran d ouverture, au dernier
// demarrage. Zero quand la mesure n a pas eu lieu -- ecran desactive,
// fenetre jamais peinte -- et on retombe alors sur les caracteristiques
// declarees.
_NXECO.fpsDemarrage=function(){try{
var t=JSON.parse(_NXDB.get("nexium_boot_trace")||"null");
return (t&&typeof t.fps==="number"&&t.fps>0)?t.fps:0;}catch(_){return 0;}};
_NXECO.faible=function(){try{
// La mesure passe avant la fiche technique, dans les deux sens : elle peut
// declarer faible une machine bien dotee, et laisser tranquille une petite
// machine qui s en sort tres bien.
var f=_NXECO.fpsDemarrage();
if(f&&f<45)return true;
if(f&&f>=90)return false;
var m=_NXECO.machine();
if(m.coeurs&&m.coeurs<=4)return true;
if(m.memoire&&m.memoire<=4)return true;
return false;}catch(_){return false;}};
_NXECO.load=function(){var d;try{var raw=_NXDB.get(_NXECO.KEY);d=raw?JSON.parse(raw):null;}catch(_){d=null;}
if(!d||typeof d!=="object")d={};
if(typeof d.mode!=="string")d.mode="auto";
if(typeof d.legerReseau!=="boolean")d.legerReseau=true;
if(typeof d.legerAnim!=="boolean")d.legerAnim=true;
if(typeof d.legerImages!=="boolean")d.legerImages=true;
if(typeof d.pauseCachee!=="boolean")d.pauseCachee=true;
return d;};
_NXECO.cfg=_NXECO.load();
_NXECO.save=function(){try{_NXDB.set(_NXECO.KEY,JSON.stringify(_NXECO.cfg));}catch(_){}};
_NXECO.actif=function(){try{
if(_NXECO.cfg.mode==="on")return true;
if(_NXECO.cfg.mode==="off")return false;
return _NXECO.faible();}catch(_){return false;}};
_NXECO.coupeAnim=function(){try{return _NXECO.cfg.mode==="on"&&!!_NXECO.cfg.legerAnim;}catch(_){return false;}};
_NXECO.LOURD=["_NXNET"];
_NXECO.detachNet=function(on){try{
var N=window._NXNET;if(!N)return false;
if(on){
if(N.iv){try{clearInterval(N.iv);}catch(_){}N._ivOff=true;N.iv=null;}
N.paused=true;return true;}
N.paused=false;return true;}catch(_){return false;}};
_NXECO.STYLEID="nx-eco-style";
_NXECO.css=function(){try{
var out=[];
if(_NXECO.cfg.legerImages){
out.push('[class*="imageWrapper"] video,[class*="embedVideo"] video{animation-play-state:paused!important;}');
out.push('img[src*=".gif"],[class*="gif"] canvas{image-rendering:auto;}');}
out.push('[class*="wrapper"] [class*="spine"],[class*="blobContainer"]::before{transition:none!important;}');
out.push('*{backdrop-filter:none!important;-webkit-backdrop-filter:none!important;}');
return out.join("\n");}catch(_){return "";}};
_NXECO.apply=function(){try{
var on=_NXECO.actif();
_NXECO.applique=on;
try{if(window._NXMO&&_NXMO.coupe)_NXMO.coupe("eco",_NXECO.coupeAnim());}catch(_){}
try{if(_NXECO.cfg.legerReseau)_NXECO.detachNet(on);}catch(_){}
var el=document.getElementById(_NXECO.STYLEID);
if(!on){if(el&&el.parentNode)el.parentNode.removeChild(el);_NXECO.notify();return;}
if(!el){el=document.createElement("style");el.id=_NXECO.STYLEID;if(document.head)document.head.appendChild(el);}
el.textContent=_NXECO.css();
_NXECO.notify();}catch(_){}};
_NXECO.set=function(k,v){try{_NXECO.cfg[k]=v;_NXECO.save();_NXECO.apply();}catch(_){}};
_NXECO.hidden=function(){try{
if(!_NXECO.cfg.pauseCachee)return;
var cache=document.hidden;
var mods=["_NXM","_NXS","_NXCL","_NXLY","_NXUP","_NXUA","_NXAU","_NXNET"];
for(var a=0;a<mods.length;a++){var m=window[mods[a]];if(!m)continue;m.eco=cache;}
}catch(_){}};
_NXECO.status=function(){try{
var m=_NXECO.machine();
return {mode:_NXECO.cfg.mode,actif:_NXECO.actif(),detecteFaible:_NXECO.faible(),
coeurs:m.coeurs,memoire:m.memoire,fps:_NXECO.fpsDemarrage(),
feuille:!!document.getElementById(_NXECO.STYLEID),
animations:!!(window._NXMO&&_NXMO.actif&&_NXMO.actif()),
reseauAllege:!!(window._NXNET&&_NXNET.paused)};}catch(_){return {};}};
try{
setTimeout(_NXECO.apply,1200);
document.addEventListener("visibilitychange",_NXECO.hidden);
}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXECO");if(window._NXERR)_NXERR.push("module _NXECO :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXECO desactive:",_nxE);}catch(_){}}
}
