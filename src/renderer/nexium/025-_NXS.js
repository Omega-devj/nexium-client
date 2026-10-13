if(!_NXS.boot){
_NXS.boot=true;
_NXS.KEY="nexium_stats_v1";
_NXS.me=null;
_NXS.STOP={"avec":1,"dans":1,"pour":1,"mais":1,"plus":1,"tout":1,"tous":1,"cette":1,"comme":1,"sans":1,"sont":1,"fait":1,"être":1,"cela":1,"votre":1,"vous":1,"nous":1,"elle":1,"leur":1,"donc":1,"alors":1,"aussi":1,"même":1,"très":1,"déjà":1,"encore":1,"quand":1,"parce":1,"chaque":1,"peut":1,"faire":1,"oui":1,"non":1,"ouais":1,"that":1,"this":1,"with":1,"have":1,"from":1,"your":1,"what":1,"when":1,"will":1,"would":1,"there":1,"their":1,"about":1,"which":1,"because":1,"could":1,"should":1,"think":1,"https":1,"http":1,"com":1};
_NXS.mkHeat=function(){var h=[];for(var a=0;a<7;a++){var r=[];for(var b=0;b<24;b++)r.push(0);h.push(r);}return h;};
_NXS.load=function(){var d;try{var raw=_NXDB.get(_NXS.KEY);d=raw?JSON.parse(raw):null;}catch(e){d=null;}if(!d||typeof d!=="object")d={};if(!d.daily)d.daily={};if(!d.dailyChars)d.dailyChars={};if(!d.guilds)d.guilds={};if(!d.channels)d.channels={};if(!d.heat||d.heat.length!==7)d.heat=_NXS.mkHeat();if(typeof d.given!=="number")d.given=0;if(typeof d.received!=="number")d.received=0;if(typeof d.session!=="number")d.session=0;if(!d.words)d.words={};if(!d.emojis)d.emojis={};if(typeof d.attach!=="number")d.attach=0;if(typeof d.links!=="number")d.links=0;if(typeof d.mentions!=="number")d.mentions=0;if(typeof d.totalChars!=="number")d.totalChars=0;if(typeof d.msgCount!=="number"){var mc=0;for(var kk in d.daily)mc+=d.daily[kk];d.msgCount=mc;}if(typeof d.voice!=="number")d.voice=0;if(!d.voiceDaily)d.voiceDaily={};if(!d.voiceGuilds)d.voiceGuilds={};if(!d.givenDaily)d.givenDaily={};if(!d.recvDaily)d.recvDaily={};if(typeof d.first!=="number")d.first=Date.now();if(typeof d.dm!=="number")d.dm=0;if(typeof d.srv!=="number")d.srv=0;if(typeof d.edited!=="number")d.edited=0;if(typeof d.deleted!=="number")d.deleted=0;if(typeof d.voiceMax!=="number")d.voiceMax=0;if(typeof d.replies!=="number")d.replies=0;if(!d.dmDaily)d.dmDaily={};if(!d.rythme)d.rythme={};if(!d.objectifs||typeof d.objectifs!=="object")d.objectifs={msgJour:0,vocalMin:0};return d;};
_NXS._lazy=null;
try{Object.defineProperty(_NXS,"data",{configurable:true,enumerable:true,
get:function(){if(_NXS._lazy===null)_NXS._lazy=_NXS.load();return _NXS._lazy;},
set:function(v){_NXS._lazy=v;}});}catch(_){_NXS.data=_NXS.load();}
_NXS.merge=function(mine){try{var raw=_NXDB.get(_NXS.KEY);if(!raw)return mine;var other=JSON.parse(raw);if(!other||typeof other!=="object")return mine;var wipedAt=parseInt(_NXDB.get(_NXS.KEY+"_wipe")||"0",10)||0;if(wipedAt&&(!other._at||other._at<wipedAt))return mine;
var NUM=["given","received","session","attach","links","mentions","totalChars","msgCount","voice"];
for(var a=0;a<NUM.length;a++){var k=NUM[a];if(typeof other[k]==="number"&&other[k]>(mine[k]||0))mine[k]=other[k];}
var MAPS=["daily","dailyChars","givenDaily","recvDaily","voiceDaily","guilds","channels","words","emojis","voiceGuilds"];
for(var b=0;b<MAPS.length;b++){var m=MAPS[b];if(other[m]&&typeof other[m]==="object"){if(!mine[m])mine[m]={};for(var kk in other[m]){var ov=other[m][kk];if(typeof ov==="number"&&ov>(mine[m][kk]||0))mine[m][kk]=ov;}}}
if(other.heat&&other.heat.length===7&&mine.heat&&mine.heat.length===7){for(var d=0;d<7;d++)for(var h=0;h<24;h++){if(other.heat[d][h]>mine.heat[d][h])mine.heat[d][h]=other.heat[d][h];}}
if(typeof other.first==="number"&&other.first<mine.first)mine.first=other.first;}catch(_){}return mine;};
_NXS.save=function(){try{_NXS.data=_NXS.merge(_NXS.data);_NXS.data._at=Date.now();_NXDB.set(_NXS.KEY,JSON.stringify(_NXS.data));}catch(_){}};
_NXS.scheduleSave=function(){_NXS.rev=(_NXS.rev||0)+1;if(_NXS.st)return;_NXS.st=setTimeout(function(){_NXS.st=null;_NXPERF.repos(function(){try{_NXS.save();}catch(_){}});},4000);};
_NXS.reset=function(){try{_NXDB.del(_NXS.KEY);}catch(_){}_NXS.data=_NXS.load();_NXS.save();};
_NXS.getMe=function(){if(_NXS.me)return _NXS.me;try{var US=_NXcommon().store("UserStore");var u=US&&US.getCurrentUser&&US.getCurrentUser();if(u&&u.id)_NXS.me=u.id;}catch(_){}return _NXS.me;};
_NXS.dayKey=function(t){var d=new Date(t);var m=d.getMonth()+1,dd=d.getDate();return d.getFullYear()+"-"+(m<10?"0"+m:m)+"-"+(dd<10?"0"+dd:dd);};
_NXS.countWords=function(txt){try{if(!txt)return;var parts=String(txt).toLowerCase().split(/[^0-9a-zà-ÿ]+/);for(var k=0;k<parts.length;k++){var w=parts[k];if(!w||w.length<4)continue;if(_NXS.STOP[w])continue;if(/^\d+$/.test(w))continue;_NXS.data.words[w]=(_NXS.data.words[w]||0)+1;}}catch(_){}};
_NXS.prune=function(){try{var dk=Object.keys(_NXS.data.daily);if(dk.length>400){dk.sort();var cut=dk.length-380;for(var a=0;a<cut;a++){delete _NXS.data.daily[dk[a]];delete _NXS.data.dailyChars[dk[a]];delete _NXS.data.voiceDaily[dk[a]];delete _NXS.data.givenDaily[dk[a]];delete _NXS.data.recvDaily[dk[a]];}}function topTrim(obj,keepN,cap){var ks=Object.keys(obj);if(ks.length>cap){ks.sort(function(x,y){return obj[y]-obj[x];});for(var b=keepN;b<ks.length;b++)delete obj[ks[b]];}}topTrim(_NXS.data.words,230,470);topTrim(_NXS.data.voiceGuilds,40,90);topTrim(_NXS.data.emojis,60,140);topTrim(_NXS.data.channels,40,90);topTrim(_NXS.data.guilds,60,140);}catch(_){}};
_NXS.maybePrune=function(){var n=Date.now();if(!_NXS._pt||n-_NXS._pt>180000){_NXS._pt=n;_NXS.prune();}};
_NXS.onMsg=function(e){try{var m=e&&e.message;if(!m)return;var me=_NXS.getMe();if(!me||!m.author||m.author.id!==me)return;var t=m.timestamp?new Date(m.timestamp).getTime():Date.now();var dk=_NXS.dayKey(t);_NXS.data.daily[dk]=(_NXS.data.daily[dk]||0)+1;_NXS.data.msgCount++;var content=m.content||"";var len=content.length;_NXS.data.totalChars+=len;_NXS.data.dailyChars[dk]=(_NXS.data.dailyChars[dk]||0)+len;var d=new Date(t);var wd=(d.getDay()+6)%7;_NXS.data.heat[wd][d.getHours()]++;var cid=m.channel_id||e.channelId;var gid=_NXguildOf(cid);if(gid){_NXS.data.guilds[gid]=(_NXS.data.guilds[gid]||0)+1;_NXS.data.srv++;}else{_NXS.data.dm++;_NXS.data.dmDaily[dk]=(_NXS.data.dmDaily[dk]||0)+1;}if(cid)_NXS.data.channels[cid]=(_NXS.data.channels[cid]||0)+1;try{if(m.message_reference&&m.message_reference.message_id)_NXS.data.replies++;}catch(_){}try{var mins=d.getHours()*60+d.getMinutes();var ry=_NXS.data.rythme[dk];if(!ry){_NXS.data.rythme[dk]={a:mins,b:mins};}else{if(mins<ry.a)ry.a=mins;if(mins>ry.b)ry.b=mins;}}catch(_){}if(m.attachments&&m.attachments.length)_NXS.data.attach+=m.attachments.length;var lk=content.match(/https?:\/\/\S+/g);if(lk)_NXS.data.links+=lk.length;var mn=content.match(/<@!?\d+>/g);if(mn)_NXS.data.mentions+=mn.length;var ce=content.match(/<a?:\w+:\d+>/g);if(ce)for(var x=0;x<ce.length;x++){var nm=ce[x].replace(/<a?:(\w+):\d+>/,"$1");_NXS.data.emojis[nm]=(_NXS.data.emojis[nm]||0)+1;}_NXS.countWords(content);_NXS.maybePrune();_NXS.scheduleSave();}catch(_){}};
_NXS.onReact=function(e){try{var me=_NXS.getMe();if(!me)return;var uid=e&&e.userId;var aid=e&&e.messageAuthorId;var dk=_NXS.dayKey(Date.now());if(uid===me){_NXS.data.given++;_NXS.data.givenDaily[dk]=(_NXS.data.givenDaily[dk]||0)+1;}if(aid&&aid===me&&uid!==me){_NXS.data.received++;_NXS.data.recvDaily[dk]=(_NXS.data.recvDaily[dk]||0)+1;}_NXS.scheduleSave();}catch(_){}};
_NXS.onVoice=function(e){try{var me=_NXS.getMe();if(!me||!e)return;var arr=e.voiceStates||(e.voiceState?[e.voiceState]:null);if(!arr)return;for(var k=0;k<arr.length;k++){var s=arr[k];if(!s||s.userId!==me)continue;var ch=s.channelId||null;if(ch&&!_NXS.vsess){_NXS.vsess={t:Date.now(),d:Date.now(),g:s.guildId||null};}else if(!ch&&_NXS.vsess){_NXS.creditVoice();_NXS.vsess=null;}else if(ch&&_NXS.vsess&&(s.guildId||null)!==_NXS.vsess.g){_NXS.creditVoice();_NXS.vsess={t:Date.now(),d:Date.now(),g:s.guildId||null};}}}catch(_){}};
_NXS.onEdit=function(e){try{
var m=e&&e.message;if(!m||!m.author)return;
var me=_NXS.getMe();if(!me||m.author.id!==me)return;
if(!m.edited_timestamp)return;
_NXS.data.edited++;_NXS.scheduleSave();}catch(_){}};
_NXS.onDelete=function(e){try{
if(!e||!e.id)return;
var me=_NXS.getMe();if(!me)return;
var MS=_NXcommon().store("MessageStore");
var m=MS&&MS.getMessage&&MS.getMessage(e.channelId,e.id);
if(!m||!m.author||m.author.id!==me)return;
_NXS.data.deleted++;_NXS.scheduleSave();}catch(_){}};
_NXS.pauseMax=function(){try{
var ks=Object.keys(_NXS.data.daily||{}).filter(function(k){return _NXS.data.daily[k]>0;}).sort();
if(ks.length<2)return 0;
var max=0;
for(var a=1;a<ks.length;a++){
var d1=new Date(ks[a-1]+"T00:00:00"),d2=new Date(ks[a]+"T00:00:00");
var j=Math.round((d2-d1)/86400000)-1;
if(j>max)max=j;}
return max;}catch(_){return 0;}};
_NXS.rythmeMoyen=function(){try{
var R2=_NXS.data.rythme||{},n=0,sa=0,sb=0;
for(var k in R2){var e=R2[k];
if(!e||typeof e.a!=="number")continue;
sa+=e.a;sb+=e.b;n++;}
if(!n)return null;
return {debut:Math.round(sa/n),fin:Math.round(sb/n),jours:n};}catch(_){return null;}};
_NXS.hhmm=function(min){try{
var h=Math.floor(min/60),m=Math.round(min%60);
return (h<10?"0":"")+h+"h"+(m<10?"0":"")+m;}catch(_){return "--";}};
_NXS.setObjectif=function(k,v){try{
_NXS.data.objectifs[k]=Math.max(0,parseInt(v,10)||0);
_NXS.saveNow();_NXS.rev=(_NXS.rev||0)+1;}catch(_){}};
_NXS.objectifJour=function(){try{
var o=_NXS.data.objectifs||{};
var dk=_NXS.dayKey(Date.now());
var msg=_NXS.data.daily[dk]||0;
var voc=Math.round((_NXS.data.voiceDaily[dk]||0)/60);
return {msg:msg,msgCible:o.msgJour||0,
vocal:voc,vocalCible:o.vocalMin||0,
msgPct:o.msgJour?Math.min(100,Math.round(msg/o.msgJour*100)):0,
vocalPct:o.vocalMin?Math.min(100,Math.round(voc/o.vocalMin*100)):0};}catch(_){return {msg:0,msgCible:0,vocal:0,vocalCible:0,msgPct:0,vocalPct:0};}};
_NXS.exportCsv=function(){try{
var L=["jour;messages;caracteres;vocal_secondes;messages_prives;reactions_donnees;reactions_recues;premiere_activite;derniere_activite"];
var vus={},k;
for(k in (_NXS.data.daily||{}))vus[k]=1;
for(k in (_NXS.data.voiceDaily||{}))vus[k]=1;
var ks=Object.keys(vus).sort();
for(var a=0;a<ks.length;a++){var j=ks[a];
var ry=(_NXS.data.rythme||{})[j];
L.push(j+";"+((_NXS.data.daily||{})[j]||0)
+";"+((_NXS.data.dailyChars||{})[j]||0)
+";"+((_NXS.data.voiceDaily||{})[j]||0)
+";"+((_NXS.data.dmDaily||{})[j]||0)
+";"+((_NXS.data.givenDaily||{})[j]||0)
+";"+((_NXS.data.recvDaily||{})[j]||0)
+";"+(ry?_NXS.hhmm(ry.a):"")
+";"+(ry?_NXS.hhmm(ry.b):""));}
var txt=L.join("\n");
try{if(typeof Blob!=="undefined"&&typeof URL!=="undefined"&&URL.createObjectURL){
var b=new Blob([txt],{type:"text/csv;charset=utf-8"});
var u=URL.createObjectURL(b);
var el=document.createElement("a");
el.href=u;el.download="nexium-statistiques.csv";
document.body.appendChild(el);el.click();
setTimeout(function(){try{document.body.removeChild(el);URL.revokeObjectURL(u);}catch(_){}},1500);
return true;}}catch(_){}
try{DiscordNative.clipboard.copy(txt);}catch(_){}
return false;}catch(_){return false;}};
_NXS.creditVoice=function(){try{if(!_NXS.vsess)return;var now=Date.now();var sec=Math.floor((now-_NXS.vsess.t)/1000);if(sec<=0)return;
try{var tot=Math.floor((now-(_NXS.vsess.d||_NXS.vsess.t))/1000);if(tot>_NXS.data.voiceMax)_NXS.data.voiceMax=tot;}catch(_){}_NXS.data.voice+=sec;var dk=_NXS.dayKey(now);_NXS.data.voiceDaily[dk]=(_NXS.data.voiceDaily[dk]||0)+sec;if(_NXS.vsess.g)_NXS.data.voiceGuilds[_NXS.vsess.g]=(_NXS.data.voiceGuilds[_NXS.vsess.g]||0)+sec;_NXS.vsess.t=now;_NXS.scheduleSave();}catch(_){}};
_NXS.wire=function(){try{var C=_NXcommon();var FX=C.C.FluxDispatcher||(C.WP.findByProps&&C.WP.findByProps("subscribe","dispatch","_actionHandlers"));if(!FX||!FX.subscribe){_NXS.tries=(_NXS.tries||0)+1;if(_NXS.tries<25)_NXPERF.amorce(_NXS.wire,1500);return;}FX.subscribe("MESSAGE_CREATE",_NXPERF.mesure("Stats : messages",_NXS.onMsg));FX.subscribe("MESSAGE_REACTION_ADD",_NXPERF.mesure("Stats : reactions",_NXS.onReact));FX.subscribe("MESSAGE_UPDATE",_NXPERF.mesure("Stats : modifications",_NXS.onEdit));FX.subscribe("MESSAGE_DELETE",_NXPERF.mesure("Stats : suppressions",_NXS.onDelete));FX.subscribe("VOICE_STATE_UPDATE",_NXPERF.mesure("Stats : vocal",_NXS.onVoice));FX.subscribe("VOICE_STATE_UPDATES",_NXPERF.mesure("Stats : vocal",_NXS.onVoice));}catch(_){}};
_NXS.download=function(){try{var blob=new Blob([JSON.stringify(_NXS.data,null,2)],{type:"application/json"});var url=URL.createObjectURL(blob);var a=document.createElement("a");a.href=url;a.download="nexium-stats.json";document.body.appendChild(a);a.click();setTimeout(function(){try{document.body.removeChild(a);URL.revokeObjectURL(url);}catch(_){}},120);}catch(_){}};
_NXS.beat=setInterval(function(){if(_NXS.eco)return;_NXS.data.session+=15;if(_NXS.vsess)_NXS.creditVoice();_NXS._bt=(_NXS._bt||0)+1;if(_NXS._bt%4===0)_NXS.scheduleSave();},15000);
_NXS.saveNow=function(){try{_NXS.rev=(_NXS.rev||0)+1;if(_NXS.st){clearTimeout(_NXS.st);_NXS.st=null;}if(_NXS.vsess)_NXS.creditVoice();_NXS.save();}catch(_){}};
try{window.addEventListener("beforeunload",_NXS.saveNow);}catch(_){}
try{document.addEventListener("visibilitychange",function(){if(document.hidden)_NXS.saveNow();});}catch(_){}
try{window.addEventListener("beforeunload",function(){_NXS.save();});}catch(_){}
_NXS.wire();
}

