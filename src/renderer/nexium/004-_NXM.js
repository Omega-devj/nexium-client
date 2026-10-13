var _NXM=window._NXM||(window._NXM={});
if(!_NXM.boot){
_NXM.boot=true;_NXM.KEY="nexium_music_v1";
_NXM.SRC="https://raw.githubusercontent.com/Omega-devj/music-client-nexium/refs/heads/main/music.txt";
_NXM.remoteBusy=false;_NXM.remoteErr=false;_NXM.remoteLoaded=false;
_NXM.cfg=(function(){var d;try{var raw=_NXDB.get(_NXM.KEY);d=raw?JSON.parse(raw):null;}catch(e){d=null;}if(!d||typeof d!=="object")d={};if(!Array.isArray(d.tracks))d.tracks=[];d.tracks=d.tracks.filter(function(t){return t&&t.url;});if(typeof d.vol!=="number"||d.vol<0||d.vol>1)d.vol=0.7;if(typeof d.shuffle!=="boolean")d.shuffle=false;if(typeof d.repeat!=="boolean")d.repeat=false;if(typeof d.popup!=="boolean")d.popup=true;if(typeof d.idx!=="number"||d.idx<0)d.idx=0;if(typeof d.px!=="number")d.px=null;if(typeof d.py!=="number")d.py=null;if(typeof d.reprise!=="boolean")d.reprise=true;if(typeof d.pos!=="number"||d.pos<0)d.pos=0;if(typeof d.compact!=="boolean")d.compact=false;if(typeof d.opacite!=="number"||d.opacite<0.3||d.opacite>1)d.opacite=1;if(typeof d.medias!=="boolean")d.medias=true;return d;})();
_NXM.save=function(){_NXDB.set(_NXM.KEY,JSON.stringify(_NXM.cfg));};
_NXM.save();
_NXM.parse=function(txt){var out=[];var seen={};var lines=String(txt||"").split(/\r?\n/);for(var a=0;a<lines.length;a++){var l=lines[a].trim();if(!l||l.charAt(0)==="#")continue;var title="",url="";var sep=l.indexOf("|");if(sep<0)sep=l.indexOf(";");if(sep>=0){title=l.slice(0,sep).trim();url=l.slice(sep+1).trim();}else{url=l;}if(!/^https?:\/\//.test(url))continue;if(seen[url])continue;seen[url]=1;if(!title){try{var fn=url.split("/").pop().split("?")[0];title=decodeURIComponent(fn)||("Piste "+(out.length+1));}catch(_){title="Piste "+(out.length+1);}}out.push({title:title,url:url});}return out;};
_NXM.loadRemote=function(){if(_NXM.remoteBusy)return;_NXM.remoteBusy=true;_NXM.remoteErr=false;_NXM.notify&&_NXM.notify();try{_NXNETX.go(_NXM.SRC+"?nx="+Date.now(),{cache:"no-store"}).then(function(r){if(!r||!r.ok)throw new Error("http");return r.text();}).then(function(t){var list=_NXM.parse(t);_NXM.remoteBusy=false;_NXM.remoteLoaded=true;_NXM.remoteEmpty=(!list||!list.length);_NXM.cfg.tracks=list;if(_NXM.idx>=list.length)_NXM.idx=Math.max(0,list.length-1);_NXM.cfg.idx=_NXM.idx;_NXM.save();_NXM.notify&&_NXM.notify();}).catch(function(){_NXM.remoteBusy=false;_NXM.remoteErr=true;_NXM.notify&&_NXM.notify();});}catch(_){_NXM.remoteBusy=false;_NXM.remoteErr=true;_NXM.notify&&_NXM.notify();}};
_NXM.audio=null;_NXM.idx=Math.min(_NXM.cfg.idx,Math.max(0,_NXM.cfg.tracks.length-1));_NXM.playing=false;_NXM.progress=0;_NXM.dur=0;_NXM.listeners=[];_NXM.fails=0;_NXM.err={};_NXM.remain=false;
_NXM.notify=function(){if(_NXM._nt)return;
_NXM._nt=setTimeout(function(){_NXM._nt=null;
var cache=false;try{cache=(typeof document!=="undefined"&&document.hidden);}catch(_){}
for(var a=0;a<_NXM.listeners.length;a++){try{
var f=_NXM.listeners[a];
if(cache&&f!==_NXM.renderUI)continue;
f();}catch(_){}}},250);};
_NXM.get=function(){if(_NXM.audio)return _NXM.audio;var a=new Audio();a.volume=_NXM.cfg.vol;a.addEventListener("timeupdate",function(){_NXM.progress=a.currentTime;
if((_NXM._tp=(_NXM._tp||0)+1)%20===0)_NXM.memoPos();
_NXM.notify();});a.addEventListener("durationchange",function(){_NXM.dur=a.duration||0;_NXM.notify();});a.addEventListener("ended",function(){_NXM.next(true);});a.addEventListener("play",function(){_NXM.playing=true;_NXM.fails=0;delete _NXM.err[_NXM.idx];_NXM.mediaSession();_NXM.notify();});a.addEventListener("pause",function(){_NXM.playing=false;_NXM.memoPos();try{if(navigator.mediaSession)navigator.mediaSession.playbackState="paused";}catch(_){}_NXM.notify();});a.addEventListener("error",function(){
_NXM.err[_NXM.idx]=true;_NXM.fails++;_NXM.playing=false;
if(_NXM.fails<_NXM.cfg.tracks.length){_NXM.load(_NXM.prochaineVivante(_NXM.idx));}
else{_NXM.notify();}});_NXM.audio=a;return a;};
_NXM.load=function(idx,reprendre){var t=_NXM.cfg.tracks[idx];if(!t)return;
var memePiste=(idx===_NXM.idx);
_NXM.idx=idx;_NXM.cfg.idx=idx;
if(!memePiste)_NXM.cfg.pos=0;
_NXM.save();
var a=_NXM.get();a.src=t.url;
if(reprendre&&_NXM.cfg.reprise&&_NXM.cfg.pos>0){
var p=_NXM.cfg.pos;
var poser=function(){try{a.currentTime=p;}catch(_){}a.removeEventListener("loadedmetadata",poser);};
a.addEventListener("loadedmetadata",poser);}
a.play().catch(function(){});
_NXM.appear();_NXM.mediaSession();_NXM.notify();};
_NXM.toggle=function(){if(!_NXM.cfg.tracks.length)return;var a=_NXM.get();if(!a.src){_NXM.load(_NXM.idx);return;}if(a.paused)a.play().catch(function(){});else a.pause();_NXM.appear();};
_NXM.sac=[];
_NXM.tirer=function(){try{
var n=_NXM.cfg.tracks.length;
if(n<2)return 0;
var dispo=[];
for(var a=0;a<_NXM.sac.length;a++){var v=_NXM.sac[a];
if(v!==_NXM.idx&&!_NXM.err[v]&&v<n)dispo.push(v);}
if(!dispo.length){
_NXM.sac=[];
for(var b=0;b<n;b++)if(b!==_NXM.idx&&!_NXM.err[b])_NXM.sac.push(b);
if(!_NXM.sac.length){for(var c=0;c<n;c++)if(c!==_NXM.idx)_NXM.sac.push(c);}
dispo=_NXM.sac.slice(0);}
var k=Math.floor(Math.random()*dispo.length);
var choix=dispo[k];
_NXM.sac=_NXM.sac.filter(function(x){return x!==choix;});
return choix;}catch(_){return (_NXM.idx+1)%Math.max(1,_NXM.cfg.tracks.length);}};
_NXM.prochaineVivante=function(dep){try{
var n=_NXM.cfg.tracks.length;
for(var a=1;a<=n;a++){var k=(dep+a)%n;if(!_NXM.err[k])return k;}
return (dep+1)%n;}catch(_){return 0;}};
_NXM.next=function(auto){var n=_NXM.cfg.tracks.length;if(!n)return;
if(auto&&_NXM.cfg.repeat){_NXM.load(_NXM.idx);return;}
var ni;if(_NXM.cfg.shuffle&&n>1){ni=_NXM.tirer();}else ni=(_NXM.idx+1)%n;_NXM.load(ni);};
_NXM.prev=function(){var n=_NXM.cfg.tracks.length;if(!n)return;var a=_NXM.get();if(a.currentTime>3){a.currentTime=0;return;}_NXM.load((_NXM.idx-1+n)%n);};
_NXM.seek=function(frac){var a=_NXM.get();if(_NXM.dur)a.currentTime=Math.max(0,Math.min(1,frac))*_NXM.dur;};
_NXM.setVol=function(v){v=Math.max(0,Math.min(1,v));_NXM.cfg.vol=v;if(_NXM.audio)_NXM.audio.volume=v;_NXM.save();_NXM.notify();};
_NXM.setFlag=function(k){_NXM.cfg[k]=!_NXM.cfg[k];_NXM.save();_NXM.notify();};
_NXM.fmt=function(s){s=Math.floor(s||0);var m=Math.floor(s/60),x=s%60;return m+":"+(x<10?"0"+x:x);};
_NXM.SVG={play:"M8 5v14l11-7z",pause:"M6 5h4v14H6zM14 5h4v14h-4z",prev:"M6 6h2v12H6zm3.5 6 8.5 6V6z",next:"M16 6h2v12h-2zM6 18l8.5-6L6 6z",note:"M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z",close:"M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z",shuf:"M17 3l4 4-4 4V8h-3l-2 2-1.5-1.5L12 6h2V5l3-2zM3 7h4l2 2-1.5 1.5L6 9H3V7zm14 7 4 4-4 4v-3h-2l-3-3 1.5-1.5L14 16h3v-2zM3 15h4l3 3-1.5 1.5L6 17H3v-2z",rep:"M7 7h9V4l5 5-5 5v-3H9v3H7V7zm10 10H8v3l-5-5 5-5v3h11v4z"};
_NXM.svg=function(d,sz){return '<svg viewBox="0 0 24 24" width="'+(sz||18)+'" height="'+(sz||18)+'" fill="currentColor"><path d="'+d+'"/></svg>';};
_NXM.clampPos=function(x,y){var W=window.innerWidth||1280,H=window.innerHeight||720;var w=(_NXM.ui&&_NXM.ui.w.offsetWidth)||268;var h=(_NXM.ui&&_NXM.ui.w.offsetHeight)||170;return [Math.max(8,Math.min(W-w-8,x)),Math.max(8,Math.min(H-h-8,y))];};
_NXM.setPos=function(x,y){if(!_NXM.ui)return;var p=_NXM.clampPos(x,y);_NXM.ui.w.style.left=p[0]+"px";_NXM.ui.w.style.top=p[1]+"px";_NXM.ui.w.style.right="auto";_NXM.ui.w.style.bottom="auto";_NXM.cfg.px=p[0];_NXM.cfg.py=p[1];_NXM.save();};
_NXM.resetPos=function(){if(!_NXM.ui)return;_NXM.ui.w.style.left="auto";_NXM.ui.w.style.top="auto";_NXM.ui.w.style.right="20px";_NXM.ui.w.style.bottom="20px";_NXM.cfg.px=null;_NXM.cfg.py=null;_NXM.save();};
_NXM.buildUI=function(){try{if(typeof document==="undefined"||!document.body)return;if(_NXM.ui&&document.getElementById("nx-miniplayer"))return;var disp=(window._NXf&&_NXf.disp)||"system-ui,sans-serif";var mono=(window._NXf&&_NXf.mono)||"monospace";
var w=document.createElement("div");w.id="nx-miniplayer";w.style.cssText="position:fixed;right:20px;bottom:20px;width:"+(_NXM.cfg.compact?208:268)+"px;z-index:99999;background:#15130f;border:1px solid rgba(239,232,220,.12);border-radius:14px;padding:12px 14px 12px;box-shadow:0 18px 44px rgba(0,0,0,.5);font-family:"+disp+";color:#efe8dc;box-sizing:border-box;display:none;";w.style.display="none";
try{w.style.opacity=String(_NXM.cfg.opacite);}catch(_){}
var head=document.createElement("div");head.style.cssText="display:flex;align-items:center;gap:11px;margin-bottom:11px;cursor:grab;";
var disc=document.createElement("div");disc.style.cssText="width:34px;height:34px;border-radius:2px;background:#d8c9a6;display:flex;align-items:center;justify-content:center;color:#17140f;flex-shrink:0;transition:background-color .3s;";disc.innerHTML=_NXtrHtml(_NXM.svg(_NXM.SVG.note,18));
var meta=document.createElement("div");meta.style.cssText="flex:1;min-width:0;";
var ttl=document.createElement("div");ttl.style.cssText="font-family:'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif;font-size:14.5px;font-weight:400;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;";
var sub=document.createElement("div");sub.style.cssText="font-size:11px;font-variant-numeric:tabular-nums;color:#978f83;margin-top:2px;letter-spacing:.04em;";
meta.appendChild(ttl);meta.appendChild(sub);
var close=document.createElement("div");close.style.cssText="cursor:pointer;color:#978f83;flex-shrink:0;display:flex;padding:2px;";close.innerHTML=_NXtrHtml(_NXM.svg(_NXM.SVG.close,14));close.onclick=function(e){e.stopPropagation();_NXM.setPopup(false);};
head.appendChild(disc);head.appendChild(meta);head.appendChild(close);
var bar=document.createElement("div");bar.style.cssText="height:3px;background:rgba(239,232,220,.16);border-radius:99px;overflow:hidden;cursor:pointer;margin-bottom:5px;";
var fill=document.createElement("div");fill.style.cssText="height:100%;width:0%;background:#d8c9a6;border-radius:99px;transition:width .25s linear;";bar.appendChild(fill);
bar.onclick=function(e){var r=bar.getBoundingClientRect();_NXM.seek((e.clientX-r.left)/r.width);};
var time=document.createElement("div");time.style.cssText="display:flex;justify-content:space-between;font-size:11px;font-variant-numeric:tabular-nums;color:#978f83;margin-bottom:11px;";
var t1=document.createElement("span");var t2=document.createElement("span");t2.style.cursor="pointer";t2.onclick=function(){_NXM.remain=!_NXM.remain;_NXM.renderUI();};time.appendChild(t1);time.appendChild(t2);
var ctr=document.createElement("div");ctr.style.cssText="display:flex;align-items:center;justify-content:center;gap:10px;";
function mk(d,big){var b=document.createElement("div");b.style.cssText="display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;"+(big?"width:38px;height:38px;border-radius:50%;background:#efe8dc;color:#17140f;":"width:30px;height:30px;color:#b9b1a4;border-radius:50%;");b.innerHTML=_NXtrHtml(_NXM.svg(d,big?20:17));return b;}
var bPrev=mk(_NXM.SVG.prev,false);bPrev.onclick=function(){_NXM.prev();};
var bPlay=mk(_NXM.SVG.play,true);bPlay.onclick=function(){_NXM.toggle();};
var bNext=mk(_NXM.SVG.next,false);bNext.onclick=function(){_NXM.next();};
ctr.appendChild(bPrev);ctr.appendChild(bPlay);ctr.appendChild(bNext);
var row2=document.createElement("div");row2.style.cssText="display:flex;align-items:center;gap:8px;margin-top:11px;";
function tg(d){var b=document.createElement("div");b.style.cssText="display:flex;align-items:center;justify-content:center;cursor:pointer;width:22px;height:22px;color:#978f83;flex-shrink:0;transition:color .15s;";b.innerHTML=_NXtrHtml(_NXM.svg(d,14));return b;}
var bShuf=tg(_NXM.SVG.shuf);bShuf.onclick=function(){_NXM.setFlag("shuffle");_NXM.renderUI();};
var bRep=tg(_NXM.SVG.rep);bRep.onclick=function(){_NXM.setFlag("repeat");_NXM.renderUI();};
var vbar=document.createElement("div");vbar.style.cssText="flex:1;height:4px;background:rgba(239,232,220,.16);border-radius:99px;overflow:hidden;cursor:pointer;";
var vfill=document.createElement("div");vfill.style.cssText="height:100%;width:70%;background:#efe8dc;border-radius:99px;transition:width .15s ease;";
vbar.appendChild(vfill);
vbar.onclick=function(e){var r=vbar.getBoundingClientRect();_NXM.setVol((e.clientX-r.left)/r.width);_NXM.renderUI();};
var vpct=document.createElement("div");vpct.style.cssText="font-size:11px;font-variant-numeric:tabular-nums;color:#978f83;width:30px;text-align:right;flex-shrink:0;letter-spacing:.04em;";
row2.appendChild(bShuf);row2.appendChild(bRep);row2.appendChild(vbar);row2.appendChild(vpct);
w.appendChild(head);w.appendChild(bar);
if(!_NXM.cfg.compact)w.appendChild(time);
w.appendChild(ctr);
if(!_NXM.cfg.compact)w.appendChild(row2);
document.body.appendChild(w);
w.addEventListener("wheel",function(e){try{e.preventDefault();e.stopPropagation();_NXM.setVol(_NXM.cfg.vol+(e.deltaY<0?0.05:-0.05));_NXM.renderUI();}catch(_){}},{passive:false});
head.addEventListener("dblclick",function(){_NXM.resetPos();});
(function(){var dragging=false,ox=0,oy=0;head.addEventListener("mousedown",function(e){dragging=true;var r=w.getBoundingClientRect();ox=e.clientX-r.left;oy=e.clientY-r.top;head.style.cursor="grabbing";e.preventDefault();});window.addEventListener("mousemove",function(e){if(!dragging)return;var p=_NXM.clampPos(e.clientX-ox,e.clientY-oy);w.style.left=p[0]+"px";w.style.top=p[1]+"px";w.style.right="auto";w.style.bottom="auto";});window.addEventListener("mouseup",function(e){if(!dragging)return;dragging=false;head.style.cursor="grab";try{_NXM.setPos(e.clientX-ox,e.clientY-oy);}catch(_){}});})();
_NXM.ui={w:w,ttl:ttl,sub:sub,fill:fill,t1:t1,t2:t2,bPlay:bPlay,disc:disc,bShuf:bShuf,bRep:bRep,vfill:vfill,vpct:vpct};
if(typeof _NXM.cfg.px==="number"&&typeof _NXM.cfg.py==="number")_NXM.setPos(_NXM.cfg.px,_NXM.cfg.py);
_NXM.renderUI();
if(_NXM.listeners.indexOf(_NXM.renderUI)<0)_NXM.listeners.push(_NXM.renderUI);}catch(_){}};
_NXM.renderUI=function(){try{var u=_NXM.ui;if(!u)return;var cur=_NXM.cfg.tracks[_NXM.idx]||{title:"\u2014"};var d=_NXM.decoupe(cur.title),e=_NXM.etiquette(cur.title),ko=!!_NXM.err[_NXM.idx];u.ttl.textContent=_NXtr(d.t);u.sub.textContent=ko?_NXtr("Source injoignable"):((d.a?_NXtr(d.a)+" \u00b7 ":"")+(_NXM.playing?_NXtr("en lecture"):_NXtr("en pause")));u.bPlay.innerHTML=_NXtrHtml(_NXM.svg(_NXM.playing?_NXM.SVG.pause:_NXM.SVG.play,20));u.disc.style.background=ko?"#3a2a2a":e.fond;u.disc.style.color=ko?"#e79a9a":e.encre;var pct=_NXM.dur>0?Math.min(100,_NXM.progress/_NXM.dur*100):0;u.fill.style.background=ko?"#e79a9a":e.fond;u.fill.style.width=pct+"%";u.t1.textContent=_NXM.fmt(_NXM.progress);u.t2.textContent=(_NXM.remain&&_NXM.dur>0?"-"+_NXM.fmt(Math.max(0,_NXM.dur-_NXM.progress)):_NXM.fmt(_NXM.dur));u.bShuf.style.color=_NXM.cfg.shuffle?"#efe8dc":"#5f594f";u.bRep.style.color=_NXM.cfg.repeat?"#efe8dc":"#5f594f";u.vfill.style.background=_NXM.cfg.vol?"#efe8dc":"#5f594f";u.vfill.style.width=(_NXM.cfg.vol*100)+"%";u.vpct.textContent=_NXtr(Math.round(_NXM.cfg.vol*100));}catch(_){}};
_NXM.mediaSession=function(){try{
if(!_NXM.cfg.medias)return;
if(typeof navigator==="undefined"||!navigator.mediaSession)return;
var t=_NXM.cfg.tracks[_NXM.idx];
if(!t)return;
try{if(window.MediaMetadata)navigator.mediaSession.metadata=new MediaMetadata({
title:String(t.title||"Nexium"),artist:"Nexium Music",album:"Nexium Client"});}catch(_){}
try{navigator.mediaSession.playbackState=_NXM.playing?"playing":"paused";}catch(_){}
if(_NXM._ms)return;_NXM._ms=true;
var pose=function(k,fn){try{navigator.mediaSession.setActionHandler(k,fn);}catch(_){}};
pose("play",function(){_NXM.toggle();});
pose("pause",function(){_NXM.toggle();});
pose("previoustrack",function(){_NXM.prev();});
pose("nexttrack",function(){_NXM.next();});
pose("seekbackward",function(){try{var a=_NXM.get();a.currentTime=Math.max(0,a.currentTime-10);}catch(_){}});
pose("seekforward",function(){try{var a=_NXM.get();a.currentTime=Math.min(_NXM.dur||0,a.currentTime+10);}catch(_){}});
}catch(_){}};
_NXM.teinte=function(k,alpha){try{
var n=(typeof k==="number"&&k>=0)?k:0;
var h=Math.round(190+n*137.508)%360;
var clair=!!(window._NXpal&&_NXpal.light);
return "hsla("+h+","+(clair?56:62)+"%,"+(clair?38:67)+"%,"+(alpha===undefined?1:alpha)+")";
}catch(_){return "#8a8a92";}};
_NXM.MINUTERIES=[5,15,30,60];
_NXM.dodo=null;
_NXM.minuterie=function(min){try{
if(_NXM._dt){clearTimeout(_NXM._dt);_NXM._dt=null;}
if(!min){_NXM.dodo=null;_NXM.notify();return;}
_NXM.dodo=Date.now()+min*60000;
_NXM._dt=setTimeout(function(){
_NXM._dt=null;_NXM.dodo=null;
try{var a=_NXM.get();if(!a.paused)a.pause();}catch(_){}
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Minuterie ecoulee : lecture arretee."),1);}catch(_){}
_NXM.notify();},min*60000);
_NXM.notify();}catch(_){}};
_NXM.dodoRestant=function(){try{
if(!_NXM.dodo)return 0;
return Math.max(0,Math.round((_NXM.dodo-Date.now())/1000));}catch(_){return 0;}};
_NXM.memoPos=function(){try{
if(!_NXM.cfg.reprise)return;
var a=_NXM.audio;
if(!a||!a.currentTime)return;
_NXM.cfg.pos=Math.floor(a.currentTime);
_NXM.save();}catch(_){}};
_NXM.showUI=function(){_NXM.buildUI();if(_NXM.ui)_NXM.ui.w.style.display="block";};
_NXM.hideUI=function(){if(_NXM.ui)_NXM.ui.w.style.display="none";};
_NXM.appear=function(){if(_NXM.cfg.popup!==false){_NXM.buildUI();_NXM.showUI();}};
_NXM.setPopup=function(on){_NXM.cfg.popup=!!on;_NXM.save();if(on){_NXM.buildUI();_NXM.showUI();}else{_NXM.hideUI();}_NXM.notify();};
// v204 : l identite de chaque piste. Une couleur d etiquette de disque tiree
// du titre -- la meme piste garde toujours la meme pochette, d une ecoute a
// l autre. Huit encres d imprimeur, pas de degrade.
_NXM.ETIQ=["#d9a441","#cf5a3c","#3f8f83","#4a6fb5","#9a8f3a","#a0577f","#d8c9a6","#5e7d4e"];
_NXM.hache=function(t){var h=5381,x=String(t||"");
for(var a=0;a<x.length;a++)h=(((h<<5)+h)^x.charCodeAt(a))|0;
return h>>>0;};
_NXM.etiquette=function(t){try{
var c=_NXM.ETIQ[_NXM.hache(t)%_NXM.ETIQ.length];
var r=parseInt(c.slice(1,3),16),g=parseInt(c.slice(3,5),16),b=parseInt(c.slice(5,7),16);
var lum=(0.2126*r+0.7152*g+0.0722*b)/255;
return {fond:c,encre:lum>0.47?"#17140f":"#f4ede1",r:r,g:g,b:b};}
catch(_){return {fond:"#d8c9a6",encre:"#17140f",r:216,g:201,b:166};}};
_NXM.rgba=function(e,a){return "rgba("+e.r+","+e.g+","+e.b+","+a+")";};
_NXM.decoupe=function(t){var x=String(t||"").trim();var k=x.indexOf(" - ");
if(k>0)return {a:x.slice(0,k).trim(),t:x.slice(k+3).trim()};
return {a:"",t:x};};
// Au-dela de cinq pistes, la collection se lit comme un 33 tours : la moitie
// sur la face A, le reste sur la face B.
_NXM.face=function(k,n){var m=Math.ceil(n/2);
return (n>5&&k>=m)?("B"+(k-m+1)):("A"+(k+1));};
// Ce qui change l affichage de la page, hors position de lecture. La page ne
// se redessine que si cette empreinte bouge ; la position a son propre
// composant, qui seul suit les quatre battements par seconde de l audio.
_NXM.signature=function(){try{
var c=_NXM.cfg,e=0,k;
for(k in _NXM.err)if(_NXM.err[k])e++;
var d=_NXM.dodoRestant();
return [_NXM.idx,_NXM.playing?1:0,e,c.tracks.length,_NXM.remoteBusy?1:0,_NXM.remoteErr?1:0,
_NXM.remoteLoaded?1:0,c.shuffle?1:0,c.repeat?1:0,c.popup?1:0,c.compact?1:0,c.reprise?1:0,
c.medias?1:0,c.opacite,Math.round(c.vol*100),d?Math.ceil(d/60):0,_NXM.dur>0?1:0].join("|");}
catch(_){return String(Date.now());}};
_NXM.STYLE=".nxmu{--c:#efe8dc;--m:#978f83;--f:#5f594f;--l:rgba(239,232,220,.10);--l2:rgba(239,232,220,.2);--c2:rgba(239,232,220,.84);--sel:rgba(239,232,220,.045);"+
"--serif:'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif;color:var(--c);}"+
".nxmu.nxmu-clair{--c:#1d1a16;--m:#6b645a;--f:#9a9388;--l:rgba(29,26,22,.12);--l2:rgba(29,26,22,.24);--c2:rgba(29,26,22,.84);--sel:rgba(29,26,22,.05);}"+
".nxmu-ligne{display:flex;align-items:baseline;gap:12px;padding:8px 10px;margin:0 -10px;border-radius:8px;"+
"cursor:pointer;transition:background-color .18s ease;}"+
".nxmu-ligne:hover{background:rgba(239,232,220,.05);}"+
".nxmu-clair .nxmu-ligne:hover{background:rgba(29,26,22,.05);}"+
".nxmu-ligne:hover .nxmu-titre{color:var(--c);}"+
".nxmu-rond{display:flex;align-items:center;justify-content:center;border-radius:50%;cursor:pointer;"+
"color:var(--m);transition:color .18s ease,background-color .18s ease;}"+
".nxmu-rond:hover{color:var(--c);background:rgba(239,232,220,.06);}"+
".nxmu-texte{cursor:pointer;color:var(--m);transition:color .18s ease;}"+
".nxmu-texte:hover{color:var(--c);}"+
".nxmu-disque{transition:transform 1s cubic-bezier(.2,.8,.2,1);}"+
".nxmu-sillons{animation:nxmu-tourne 1.8s linear infinite;animation-play-state:paused;}"+
".nxmu-joue .nxmu-sillons{animation-play-state:running;}"+
".nxmu-eq{display:inline-flex;align-items:flex-end;gap:2px;height:11px;}"+
".nxmu-eq i{display:block;width:2px;height:11px;background:currentColor;border-radius:1px;"+
"transform-origin:bottom;transform:scaleY(.4);animation:nxmu-eq .9s ease-in-out infinite;animation-play-state:paused;}"+
".nxmu-eq i:nth-child(2){animation-delay:-.3s;}.nxmu-eq i:nth-child(3){animation-delay:-.6s;}"+
".nxmu-joue .nxmu-eq i{animation-play-state:running;}"+
".nxmu-calme .nxmu-sillons,.nxmu-calme .nxmu-eq i{animation:none;}"+
".nxmu-calme .nxmu-disque{transition:none;}"+
".nxmu-bras{transform-origin:12px 12px;transition:transform .9s cubic-bezier(.3,.7,.3,1);}"+
".nxmu-calme .nxmu-bras{transition:none;}"+
".nxed-anim .nxmu-neuve{animation:nxmuNeuve .7s cubic-bezier(.2,.9,.3,1) both;}"+
"@keyframes nxmuNeuve{from{transform:translateX(-26px) rotate(-5deg);opacity:0}to{transform:none;opacity:1}}"+
".nxmu-champ::placeholder{color:var(--f);}"+
"@keyframes nxmu-tourne{to{transform:rotate(360deg)}}"+
"@keyframes nxmu-eq{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}"+
"@media (prefers-reduced-motion: reduce){.nxmu-sillons,.nxmu-eq i{animation:none!important;}.nxmu-disque{transition:none!important;}}";
_NXM.pageStyle=function(){try{
if(typeof document==="undefined"||!document.head||!document.createElement)return false;
if(document.getElementById&&document.getElementById("nx-music-style"))return true;
var s=document.createElement("style");s.id="nx-music-style";s.textContent=_NXM.STYLE;
document.head.appendChild(s);return true;}catch(_){return false;}};
setTimeout(function(){_NXM.loadRemote();},3000);
try{window.addEventListener("beforeunload",function(){try{_NXM.memoPos();}catch(_){}});}catch(_){}
}
