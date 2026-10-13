var _NXDB=window._NXDB||(window._NXDB={});
if(!_NXDB.boot){try{_NXDB.boot=true;
_NXDB.mode="mem";
_NXDB.ls=(function(){
try{var dd=Object.getOwnPropertyDescriptor(window,"localStorage");if(dd&&dd.get){var l0=dd.get.call(window);if(l0&&typeof l0.getItem==="function"){l0.setItem("__nxdb","1");l0.removeItem("__nxdb");_NXDB.mode="ls";return l0;}}}catch(_){}
try{if(typeof window.localStorage!=="undefined"&&window.localStorage&&typeof window.localStorage.getItem==="function"){window.localStorage.setItem("__nxdb","1");window.localStorage.removeItem("__nxdb");_NXDB.mode="ls";return window.localStorage;}}catch(_){}
try{if(typeof document!=="undefined"&&document.createElement){var fr=document.createElement("iframe");fr.style.display="none";(document.head||document.documentElement||document.body).appendChild(fr);var l1=fr.contentWindow&&fr.contentWindow.localStorage;if(l1&&typeof l1.getItem==="function"){l1.setItem("__nxdb","1");l1.removeItem("__nxdb");_NXDB.frame=fr;_NXDB.mode="iframe";return l1;}}}catch(_){}
var mem={};_NXDB.mode="mem";return {getItem:function(k){return Object.prototype.hasOwnProperty.call(mem,k)?mem[k]:null;},setItem:function(k,v){mem[k]=String(v);},removeItem:function(k){delete mem[k];},key:function(n){return Object.keys(mem)[n]||null;},_m:mem};
})();
_NXDB.get=function(k){try{return _NXDB.ls.getItem(k);}catch(_){return null;}};
_NXDB.fail=null;_NXDB.set=function(k,v){try{_NXDB.ls.setItem(k,v);if(_NXDB.fail){_NXDB.fail=null;}return true;}catch(e){try{_NXDB.fail={key:k,at:Date.now(),msg:(e&&(e.name||e.message))||"erreur"};}catch(_){}return false;}};
_NXDB.del=function(k){try{_NXDB.ls.removeItem(k);}catch(_){}};
_NXDB.keys=function(){var out=[];try{if(_NXDB.ls._m)return Object.keys(_NXDB.ls._m);var n=_NXDB.ls.length||0;for(var a=0;a<n;a++){var k=_NXDB.ls.key(a);if(k)out.push(k);}}catch(_){}return out;};
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXDB");if(window._NXERR)_NXERR.push("module _NXDB :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXDB desactive:",_nxE);}catch(_){}}
}// Traduire a l affichage. Sans effet en francais ; en anglais, le texte
// est cherche dans le dictionnaire et rendu tel quel s il n y est pas. Tout
// ce qui s affiche dans le bloc passe par ici : un texte charge au demarrage
// est traduit au moment ou il s affiche.
var _NXtr=function(x){try{
return (typeof x==="string"&&x&&window._NXI&&_NXI.lang==="en"&&_NXI.t)?_NXI.t(x):x;}catch(_){return x;}};
// Les textes entre balises d un innerHTML, morceau par morceau.
var _NXtrHtml=function(h){try{
if(typeof h!=="string"||!(window._NXI&&_NXI.lang==="en"))return h;
return h.replace(/>([^<>]+)</g,function(m,t){
var c=t.replace(/^\s+|\s+$/g,"");if(!c)return m;
var r=_NXtr(c);return r===c?m:(">"+t.replace(c,r)+"<");});}catch(_){return h;}};
