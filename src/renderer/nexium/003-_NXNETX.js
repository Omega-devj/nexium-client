var _NXNETX=window._NXNETX||(window._NXNETX={});
if(!_NXNETX.boot){try{_NXNETX.boot=true;
_NXNETX.MS=15000;
_NXNETX.timeouts=0;
_NXNETX.go=function(u,o,ms){
var to=null;
try{
var opt=o||{};var t=(typeof ms==="number"&&ms>0)?ms:_NXNETX.MS;
var o2=null,c=null;
try{if(typeof AbortController==="function"&&!opt.signal){c=new AbortController();o2={};for(var k in opt)o2[k]=opt[k];o2.signal=c.signal;}}catch(_){o2=null;c=null;}
if(o2&&c){
to=setTimeout(function(){try{_NXNETX.timeouts++;c.abort();}catch(_){}},t);
return fetch(u,o2).then(function(r){try{clearTimeout(to);}catch(_){}return r;},function(e){try{clearTimeout(to);}catch(_){}throw e;});
}
return Promise.race([fetch(u,opt),new Promise(function(_r,rj){to=setTimeout(function(){_NXNETX.timeouts++;rj(new Error("nx-timeout"));},t);})]);
}catch(e){try{if(to)clearTimeout(to);}catch(_){}return Promise.reject(e);}
};
_NXNETX.tries={};
_NXNETX.DELAYS=[20000,60000,180000,420000];
_NXNETX.ok=function(k){try{_NXNETX.tries[k]=0;}catch(_){}};
_NXNETX.retry=function(k,fn,max){try{
if(typeof fn!=="function")return;
var n=_NXNETX.tries[k]||0;var mx=(typeof max==="number")?max:_NXNETX.DELAYS.length;
if(n>=mx)return;
_NXNETX.tries[k]=n+1;
var d=_NXNETX.DELAYS[n]||_NXNETX.DELAYS[_NXNETX.DELAYS.length-1];
setTimeout(function(){try{if(!document.hidden)fn();else _NXNETX.retry(k,fn,max);}catch(_){}},d);
}catch(_){}};
_NXNETX.status=function(){return {timeouts:_NXNETX.timeouts,tries:_NXNETX.tries};};
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXNETX");if(window._NXERR)_NXERR.push("module _NXNETX :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXNETX desactive:",_nxE);}catch(_){}}
}
