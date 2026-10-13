var _NXRT=window._NXRT||(window._NXRT={});
if(!_NXRT.boot){try{_NXRT.boot=true;
_NXRT.W=1080;_NXRT.H=1350;
_NXRT.PERIODS=[["mois","Ce mois-ci"],["j30","30 derniers jours"],["annee","Cette annee"],["tout","Depuis le debut"]];
_NXRT.dayKey=function(t){var d=new Date(t);var m=d.getMonth()+1,j=d.getDate();return d.getFullYear()+"-"+(m<10?"0"+m:m)+"-"+(j<10?"0"+j:j);};
_NXRT.range=function(kind){try{
var now=new Date(),from,label;
if(kind==="mois"){from=new Date(now.getFullYear(),now.getMonth(),1);
label=["janvier","fevrier","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","decembre"][now.getMonth()]+" "+now.getFullYear();}
else if(kind==="annee"){from=new Date(now.getFullYear(),0,1);label="annee "+now.getFullYear();}
else if(kind==="tout"){from=new Date(2015,0,1);label="depuis le debut";}
else{from=new Date(now.getTime()-29*86400000);label="30 derniers jours";}
return {from:_NXRT.dayKey(from),to:_NXRT.dayKey(now),label:label};}catch(_){return {from:"0000-00-00",to:"9999-99-99",label:""};}};
_NXRT.sumRange=function(map,r){try{
var t=0,n=0,best=null,bestV=0;
for(var k in map){if(k<r.from||k>r.to)continue;
var v=map[k]||0;t+=v;if(v>0)n++;
if(v>bestV){bestV=v;best=k;}}
return {total:t,days:n,bestDay:best,bestVal:bestV};}catch(_){return {total:0,days:0,bestDay:null,bestVal:0};}};
_NXRT.top=function(map,n){try{
var ks=Object.keys(map||{});
ks.sort(function(a,b){return (map[b]||0)-(map[a]||0);});
return ks.slice(0,n||5).map(function(k){return {k:k,v:map[k]||0};});}catch(_){return [];}};
_NXRT.streak=function(map,r){try{
var d=new Date(),n=0;
for(var a=0;a<400;a++){
var key=_NXRT.dayKey(d.getTime()-a*86400000);
if(key<r.from)break;
if((map[key]||0)>0)n++;else if(a>0)break;}
return n;}catch(_){return 0;}};
_NXRT.compute=function(kind){try{
var S=window._NXS;if(!S||!S.data)return null;
var d=S.data,r=_NXRT.range(kind);
var msg=_NXRT.sumRange(d.daily||{},r);
var chars=_NXRT.sumRange(d.dailyChars||{},r);
var voice=_NXRT.sumRange(d.voiceDaily||{},r);
var given=_NXRT.sumRange(d.givenDaily||{},r);
var recv=_NXRT.sumRange(d.recvDaily||{},r);
var heat=(d.heat&&d.heat.length===7)?d.heat:null;
var peak={h:0,v:0};
if(heat){for(var a=0;a<7;a++)for(var b=0;b<24;b++){if(heat[a][b]>peak.v){peak={h:b,v:heat[a][b],d:a};}}}
return {
kind:kind,label:r.label,
messages:msg.total,jours:msg.days,
bestDay:msg.bestDay,bestVal:msg.bestVal,
chars:chars.total,
voiceMin:Math.round(voice.total/60),
given:given.total,recv:recv.total,
mots:_NXRT.top(d.words,5),
emojis:_NXRT.top(d.emojis,5),
heat:heat,peak:peak,
serie:_NXRT.streak(d.daily||{},r),
moyenne:msg.days?Math.round(msg.total/msg.days):0
};}catch(_){return null;}};
_NXRT.fmt=function(v){try{
v=v||0;
if(v>=1000000)return (v/1000000).toFixed(1).replace(/\.0$/,"")+"M";
if(v>=1000)return (v/1000).toFixed(1).replace(/\.0$/,"")+"k";
return String(v);}catch(_){return "0";}};
_NXRT.dayName=function(k){try{
if(!k)return "";
var p=k.split("-");var d=new Date(+p[0],+p[1]-1,+p[2]);
var j=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"][d.getDay()];
return j+" "+(+p[2])+"/"+(+p[1]);}catch(_){return k||"";}};
_NXRT.F=function(w,size){return w+" "+size+'px "Segoe UI", system-ui, -apple-system, sans-serif';};
_NXRT.num=function(v){try{
v=Math.round(v||0);
var t=String(v),out="",n=0;
for(var a=t.length-1;a>=0;a--){out=t.charAt(a)+out;n++;if(n%3===0&&a>0)out="\u202f"+out;}
return out;}catch(_){return String(v||0);}};
_NXRT.draw=function(kind){try{
var st=_NXRT.compute(kind);if(!st)return null;
var W=_NXRT.W,H=_NXRT.H,M=88;
var c=document.createElement("canvas");c.width=W;c.height=H;
var g=c.getContext("2d");if(!g)return null;
var TXT=_NXpal.txt,SUB=_NXpal.sub,DIM=_NXpal.dim,LINE=_NXpal.line;
g.fillStyle=_NXpal.bg;g.fillRect(0,0,W,H);
try{var grd=g.createRadialGradient(W*0.85,-80,0,W*0.85,-80,760);
grd.addColorStop(0,"rgba(255,255,255,.055)");grd.addColorStop(1,"rgba(255,255,255,0)");
g.fillStyle=grd;g.fillRect(0,0,W,H);}catch(_){}
var y=0;
var rule=function(gap){y+=gap;g.fillStyle=LINE;g.fillRect(M,y,W-M*2,1);y+=gap;};
g.textBaseline="alphabetic";
y=118;
g.fillStyle=DIM;g.font=_NXRT.F(800,21);
try{g.letterSpacing="7px";}catch(_){}
g.fillText("NEXIUM",M,y);
try{g.letterSpacing="0px";}catch(_){}
y+=76;
g.fillStyle=TXT;g.font=_NXRT.F(800,64);
g.fillText("R\u00e9trospective",M,y);
y+=44;
g.fillStyle=SUB;g.font=_NXRT.F(500,28);
g.fillText(st.label,M,y);
rule(30);
y+=118;
g.fillStyle=TXT;g.font=_NXRT.F(800,132);
var head=_NXRT.num(st.messages);
g.fillText(head,M,y);
var wHead=g.measureText(head).width;
g.fillStyle=SUB;g.font=_NXRT.F(600,28);
g.fillText("messages envoy\u00e9s",M+wHead+20,y-6);
y+=42;
g.fillStyle=DIM;g.font=_NXRT.F(500,25);
g.fillText(st.jours+" jours actifs  \u00b7  "+st.moyenne+" par jour en moyenne",M,y);
rule(28);
var cells=[
[_NXRT.fmt(st.chars),"caract\u00e8res"],
[_NXRT.fmt(st.voiceMin)+" min","en vocal"],
[_NXRT.num(st.given),"r\u00e9actions donn\u00e9es"],
[_NXRT.num(st.recv),"r\u00e9actions re\u00e7ues"]
];
var cw=(W-M*2)/2,top=y+56;
for(var a=0;a<cells.length;a++){
var cx=M+(a%2)*cw,cy=top+Math.floor(a/2)*112;
g.fillStyle=TXT;g.font=_NXRT.F(800,52);g.fillText(cells[a][0],cx,cy);
g.fillStyle=DIM;g.font=_NXRT.F(500,24);g.fillText(cells[a][1],cx,cy+34);}
y=top+112+40;
rule(26);
if(st.heat){
y+=34;
g.fillStyle=DIM;g.font=_NXRT.F(700,21);
g.fillText("TES HABITUDES  \u00b7  7 JOURS \u00d7 24 HEURES",M,y);
y+=18;
var gw=(W-M*2),cwid=gw/24,chh=12,gapv=4;
for(var d2=0;d2<7;d2++)for(var h=0;h<24;h++){
var v=st.heat[d2][h]||0;
var alpha=st.peak.v?Math.min(1,v/st.peak.v):0;
g.fillStyle="rgba(244,244,245,"+(0.05+alpha*0.9).toFixed(3)+")";
g.fillRect(M+h*cwid+1,y+d2*(chh+gapv),cwid-2,chh);}
y+=7*(chh+gapv)+26;
g.fillStyle=DIM;g.font=_NXRT.F(500,21);
g.fillText("pic d\u2019activit\u00e9 vers "+st.peak.h+"h",M,y);
rule(24);}
y+=34;
g.fillStyle=DIM;g.font=_NXRT.F(700,21);
g.fillText("MOTS LES PLUS UTILIS\u00c9S",M,y);
g.fillText("EMOJIS",M+(W-M*2)/2,y);
g.font=_NXRT.F(600,25);
for(var b=0;b<5;b++){
var ly=y+40+b*33;
var mot=st.mots[b],emo=st.emojis[b];
g.fillStyle=mot?TXT:LINE;
g.fillText(mot?(String(mot.k).slice(0,18)+"   "+_NXRT.num(mot.v)):"\u2014",M,ly);
g.fillStyle=emo?TXT:LINE;
g.fillText(emo?(":"+String(emo.k).slice(0,16)+":   "+_NXRT.num(emo.v)):"\u2014",M+(W-M*2)/2,ly);}
y=y+40+4*33;
var pied="nexium client";
if(st.bestDay)pied+="   \u00b7   meilleur jour : "+_NXRT.dayName(st.bestDay)+" ("+_NXRT.num(st.bestVal)+")";
if(st.serie>1)pied+="   \u00b7   s\u00e9rie de "+st.serie+" jours";
var py=H-52;
g.fillStyle=LINE;g.fillRect(M,py-34,W-M*2,1);
g.fillStyle=DIM;g.font=_NXRT.F(500,21);
g.fillText(pied,M,py);
_NXRT.lastY=y;_NXRT.footY=py-34;
return c;}catch(_){return null;}};
_NXRT.rev=function(){try{return String((window._NXS&&_NXS.rev)||0);}catch(_){return "0";}};
_NXRT.dataUrl=function(kind){try{
var key=String(kind||"")+"|"+_NXRT.rev();
if(_NXRT._imgKey===key&&_NXRT._img)return _NXRT._img;
var c=_NXRT.draw(kind);if(!c)return null;
_NXRT._img=c.toDataURL("image/png");_NXRT._imgKey=key;
return _NXRT._img;}catch(_){return null;}};
_NXRT.secDataUrlCached=function(kind){try{
var key="s"+String(kind||"")+"|"+_NXRT.rev();
if(_NXRT._simgKey===key&&_NXRT._simg)return _NXRT._simg;
var c=_NXRT.drawSecurity(kind);if(!c)return null;
_NXRT._simg=c.toDataURL("image/png");_NXRT._simgKey=key;
return _NXRT._simg;}catch(_){return null;}};
_NXRT.canCopy=function(){try{
return !!(window.DiscordNative&&DiscordNative.clipboard&&typeof DiscordNative.clipboard.copyImage==="function");}catch(_){return false;}};
_NXRT.copy=function(kind){try{
if(!_NXRT.canCopy())return false;
var c=_NXRT.draw(kind);if(!c)return false;
var url=c.toDataURL("image/png");
var b64=url.split(",")[1];
var bin=atob(b64),n=bin.length,arr=new Uint8Array(n);
for(var a=0;a<n;a++)arr[a]=bin.charCodeAt(a);
DiscordNative.clipboard.copyImage(arr,"nexium-retro.png");
return true;}catch(_){return false;}};
_NXRT.download=function(kind){try{
var c=_NXRT.draw(kind);if(!c)return false;
if(c.toBlob){c.toBlob(function(blob){try{
var url=URL.createObjectURL(blob);
var a=document.createElement("a");a.href=url;a.download="nexium-retro-"+(kind||"mois")+".png";
if(document.body)document.body.appendChild(a);a.click();
setTimeout(function(){try{if(a.parentNode)a.parentNode.removeChild(a);URL.revokeObjectURL(url);}catch(_){}},150);}catch(_){}},"image/png");
return true;}
var u=c.toDataURL("image/png");
var a2=document.createElement("a");a2.href=u;a2.download="nexium-retro.png";
if(document.body)document.body.appendChild(a2);a2.click();
setTimeout(function(){try{if(a2.parentNode)a2.parentNode.removeChild(a2);}catch(_){}},150);
return true;}catch(_){return false;}};
_NXRT.secCompute=function(kind){try{
var st=(window._NXPR&&_NXPR.stats)||null;
if(!st)return null;
var r=_NXRT.range(kind);
var par={},total=0;
var L=st.recent||[];
for(var a=0;a<L.length;a++){var e=L[a];
if(!e||!e.t)continue;
var k=_NXRT.dayKey(e.t);
if(k<r.from||k>r.to)continue;
total++;par[e.k]=(par[e.k]||0)+1;}
var V=window._NXV;
var coffre=(V&&V.stats&&V.stats.blocked)||0;
var top=_NXRT.top(par,5);
return {label:r.label,
bloquees:st.blocked||0,analyses:st.scanned||0,arnaques:st.scams||0,surs:st.safe||0,
exfil:coffre,periode:total,types:top,
base:(_NXPR.remote&&_NXPR.remote.n)||0};}catch(_){return null;}};
_NXRT.kindFr=function(k){
return k==="grabber"?"loggers d’IP":k==="phish"?"hameçonnage":k==="punycode"?"domaines trompeurs":
k==="scam"?"arnaques":k==="oauth"?"autorisations":k==="scheme"?"schemas executables":
k==="bidi"?"textes trompeurs":k==="rawip"?"adresses IP brutes":k==="code"?"demandes de code":
k==="download"?"téléchargements":k==="short"?"liens raccourcis":k==="exif"?"métadonnées":
k==="guild"?"serveurs piégés":k==="sandbox"?"pages inspectées":k;};
_NXRT.drawSecurity=function(kind){try{
var st=_NXRT.secCompute(kind);if(!st)return null;
var W=_NXRT.W,H=_NXRT.H,M=88;
var c=document.createElement("canvas");c.width=W;c.height=H;
var g=c.getContext("2d");if(!g)return null;
var TXT=_NXpal.txt,SUB=_NXpal.sub,DIM=_NXpal.dim,LINE=_NXpal.line;
g.fillStyle=_NXpal.bg;g.fillRect(0,0,W,H);
try{var grd=g.createRadialGradient(W*0.85,-80,0,W*0.85,-80,760);
grd.addColorStop(0,"rgba(255,255,255,.055)");grd.addColorStop(1,"rgba(255,255,255,0)");
g.fillStyle=grd;g.fillRect(0,0,W,H);}catch(_){}
var y=118;
var rule=function(gap){y+=gap;g.fillStyle=LINE;g.fillRect(M,y,W-M*2,1);y+=gap;};
g.textBaseline="alphabetic";
g.fillStyle=DIM;g.font=_NXRT.F(800,21);
try{g.letterSpacing="7px";}catch(_){}
g.fillText("NEXIUM PROTECT",M,y);
try{g.letterSpacing="0px";}catch(_){}
y+=76;
g.fillStyle=TXT;g.font=_NXRT.F(800,64);
g.fillText("Bilan de s\u00e9curit\u00e9",M,y);
y+=44;
g.fillStyle=SUB;g.font=_NXRT.F(500,28);
g.fillText(st.label,M,y);
rule(30);
y+=118;
g.fillStyle=TXT;g.font=_NXRT.F(800,132);
var head=_NXRT.num(st.bloquees);
g.fillText(head,M,y);
var wHead=g.measureText(head).width;
g.fillStyle=SUB;g.font=_NXRT.F(600,28);
g.fillText("menaces bloqu\u00e9es",M+wHead+20,y-6);
y+=42;
g.fillStyle=DIM;g.font=_NXRT.F(500,25);
g.fillText(_NXRT.num(st.analyses)+" liens analys\u00e9s  \u00b7  "+_NXRT.num(st.surs)+" confirm\u00e9s s\u00fbrs",M,y);
rule(28);
var cells=[
[_NXRT.num(st.arnaques),"arnaques rep\u00e9r\u00e9es"],
[_NXRT.num(st.exfil),"exfiltrations bloqu\u00e9es"],
[_NXRT.fmt(st.base),"domaines surveill\u00e9s"],
[_NXRT.num(st.periode),"alertes sur la p\u00e9riode"]
];
var cw=(W-M*2)/2,top=y+56;
for(var a=0;a<cells.length;a++){
var cx=M+(a%2)*cw,cy=top+Math.floor(a/2)*112;
g.fillStyle=TXT;g.font=_NXRT.F(800,52);g.fillText(cells[a][0],cx,cy);
g.fillStyle=DIM;g.font=_NXRT.F(500,24);g.fillText(cells[a][1],cx,cy+34);}
y=top+112+40;
rule(26);
y+=34;
g.fillStyle=DIM;g.font=_NXRT.F(700,21);
g.fillText("CE QUI A \u00c9T\u00c9 ARR\u00caT\u00c9",M,y);
y+=16;
var maxV=st.types.length?st.types[0].v:0;
for(var b=0;b<5;b++){
var it=st.types[b];
var ly=y+34+b*46;
g.fillStyle=it?SUB:LINE;g.font=_NXRT.F(600,24);
g.fillText(it?_NXRT.kindFr(it.k):"\u2014",M,ly);
if(it&&maxV>0){
var bw=(W-M*2-260);
g.fillStyle=_NXpal.line;g.fillRect(M+260,ly-14,bw,10);
g.fillStyle=_NXpal.warn;g.fillRect(M+260,ly-14,Math.max(4,bw*(it.v/maxV)),10);
g.fillStyle=TXT;g.font=_NXRT.F(700,22);
g.fillText(String(it.v),M+260+bw+14,ly);}}
y=y+34+4*46;
var py=H-52;
g.fillStyle=LINE;g.fillRect(M,py-34,W-M*2,1);
g.fillStyle=DIM;g.font=_NXRT.F(500,21);
g.fillText("nexium client  \u00b7  analyse 100% locale, aucune donn\u00e9e envoy\u00e9e",M,py);
_NXRT.lastY=y;_NXRT.footY=py-34;
return c;}catch(_){return null;}};
_NXRT.secDownload=function(kind){try{
var c=_NXRT.drawSecurity(kind);if(!c)return false;
if(c.toBlob){c.toBlob(function(blob){try{
var url=URL.createObjectURL(blob);
var a=document.createElement("a");a.href=url;a.download="nexium-securite-"+(kind||"mois")+".png";
if(document.body)document.body.appendChild(a);a.click();
setTimeout(function(){try{if(a.parentNode)a.parentNode.removeChild(a);URL.revokeObjectURL(url);}catch(_){}},150);}catch(_){}},"image/png");
return true;}
return false;}catch(_){return false;}};
_NXRT.secDataUrl=function(kind){try{
var c=_NXRT.drawSecurity(kind);return c?c.toDataURL("image/png"):null;}catch(_){return null;}};
_NXRT.status=function(){try{
var st=_NXRT.compute("mois");
return {pret:!!st,periodes:_NXRT.PERIODS.length,copieImage:_NXRT.canCopy(),messages:st?st.messages:0};}catch(_){return {pret:false};}};
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXRT");if(window._NXERR)_NXERR.push("module _NXRT :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXRT desactive:",_nxE);}catch(_){}}
}
// La ligne de vie : un compteur a rouleaux, la courbe des quatre-vingt-dix
// derniers jours qui se trace d elle-meme, une regle graduee pour naviguer,
// une horloge de vingt-quatre heures, un podium et des anneaux. Tout ce qui
// bouge part de la vraie valeur et y arrive.
