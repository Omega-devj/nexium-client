var _NXsaveErr=window._NXsaveErr||(window._NXsaveErr=function(){try{
var ecrire=function(){try{_NXDB.set("nexium_errors",JSON.stringify(_NXERR.slice(-20)));}catch(_){}};
var t=Date.now();
if(t-(_NXsaveErr._at||0)>2000){_NXsaveErr._at=t;ecrire();return;}
if(_NXsaveErr._t)return;
_NXsaveErr._t=setTimeout(function(){_NXsaveErr._t=null;_NXsaveErr._at=Date.now();ecrire();},2000);
}catch(_){}});
try{(function(){var _pe=_NXDB.get("nexium_errors");if(_pe){var _pj=JSON.parse(_pe);if(_pj&&_pj.length){for(var _a=0;_a<_pj.length;_a++)_NXERR.push("[session precedente] "+_pj[_a]);}}})();}catch(_){}
try{if(typeof console!=="undefined"&&console.error&&!console.error.__nx){
var _NXce0=console.error.bind(console);var _NXce=function(){try{return _NXce0.apply(null,arguments);}catch(__){return undefined;}};
var _NXpce=function(){try{
var parts=[];for(var a=0;a<arguments.length&&a<4;a++){var v=arguments[a];
if(v==null)continue;
if(typeof v==="string")parts.push(v);
else if(v&&v.message)parts.push(String(v.message)+(v.stack?(" | "+String(v.stack).split("\n").slice(1,3).join(" | ")):""));
else{try{parts.push(String(v).slice(0,120));}catch(__){}}}
var msg=parts.join(" ").slice(0,300);
if(!msg||msg.length<8)return _NXce.apply(null,arguments);
if(window._NXPATCH&&!_NXPATCH.on)return _NXce.apply(null,arguments);
var _n=Date.now();
if(_n-(_NXERRwin||0)>60000){_NXERRwin=_n;_NXERRn=0;}
if((_NXERRn||0)>=25)return _NXce.apply(null,arguments);
if(/error|erreur|exception|failed|cannot|undefined is not|null is not|removeChild|insertBefore|React/i.test(msg)){
_NXERRn=(_NXERRn||0)+1;
if(!_NXERR.length||_NXERR[_NXERR.length-1]!=="console :: "+msg){
_NXERR.push("console :: "+msg);if(_NXERR.length>20)_NXERR.shift();_NXsaveErr();}}
}catch(__){}
return _NXce.apply(null,arguments);};
_NXpce.__nx=true;console.error=_NXpce;}}catch(_){}
try{if(window.addEventListener){window.addEventListener("error",function(ev){try{var m=(ev&&(ev.message||(ev.error&&ev.error.message)))||"";if(!m)return;if(!_NXbudget())return;_NXERR.push("global :: "+String(m).slice(0,200));if(_NXERR.length>20)_NXERR.shift();_NXsaveErr();}catch(_){}},true);
window.addEventListener("unhandledrejection",function(ev){try{var r=ev&&ev.reason;var m=(r&&(r.message||r))||"";if(!m)return;if(!_NXbudget())return;_NXERR.push("promesse :: "+String(m).slice(0,200));if(_NXERR.length>20)_NXERR.shift();_NXsaveErr();}catch(_){}},true);}}catch(_){}var _NXV=window._NXV||(window._NXV={});
