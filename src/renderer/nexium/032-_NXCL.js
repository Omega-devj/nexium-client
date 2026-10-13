var _NXCL=window._NXCL||(window._NXCL={});
if(!_NXCL.boot){_NXCL.boot=true;_NXCL.KEY="nexium_changelog_v1";
_NXCL.URL="https://raw.githubusercontent.com/Omega-devj/changelog-client-nexium/refs/heads/main/changelog.txt";
_NXCL.st=(function(){try{var raw=_NXDB.get(_NXCL.KEY);var d=raw?JSON.parse(raw):null;if(d&&typeof d==="object"&&typeof d.text==="string")return d;}catch(_){}return {hash:"",text:"",ts:0};})();
_NXCL.save=function(){_NXDB.set(_NXCL.KEY,JSON.stringify(_NXCL.st));};
_NXCL.listeners=[];
_NXCL.notify=function(){for(var a=0;a<_NXCL.listeners.length;a++){try{_NXCL.listeners[a]();}catch(_){}}};
_NXCL.hash=function(s){var h=5381;for(var a=0;a<s.length;a++)h=(((h<<5)+h)^s.charCodeAt(a))|0;return String(h>>>0);};
_NXCL.toast=function(msg){try{var T=window.Vencord&&Vencord.Webpack&&Vencord.Webpack.Common&&Vencord.Webpack.Common.Toasts;if(T&&T.show)T.show({message:msg,id:T.genId(),type:T.Type.MESSAGE,options:{position:T.Position.BOTTOM}});}catch(_){}};
_NXCL.refresh=function(){if(_NXCL.busy)return;_NXCL.busy=true;_NXCL.err=false;_NXCL.notify();
try{_NXNETX.go(_NXCL.URL+"?nx="+Date.now(),{cache:"no-store"}).then(function(r){if(!r||!r.ok)throw new Error("http");return r.text();}).then(function(txt){txt=String(txt||"");var h=_NXCL.hash(txt);var changed=!!_NXCL.st.hash&&h!==_NXCL.st.hash;_NXCL.st={hash:h,text:txt,ts:Date.now()};_NXCL.save();_NXCL.busy=false;if(changed)_NXCL.toast("Nexium — le changelog vient d'être mis à jour");_NXCL.notify();}).catch(function(){_NXCL.busy=false;_NXCL.err=true;_NXCL.notify();});}catch(_){_NXCL.busy=false;_NXCL.err=true;_NXCL.notify();}};
setTimeout(function(){_NXCL.refresh();},4000);
_NXCL.iv=setInterval(function(){if(typeof document==="undefined"||!document.hidden)_NXCL.refresh();},1800000);
}
