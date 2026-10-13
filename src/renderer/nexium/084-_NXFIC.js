var _NXFIC=window._NXFIC||(window._NXFIC={});
if(!_NXFIC.boot){try{_NXFIC.boot=true;
// Les gros fichiers.
_NXFIC.KEY="nexium_fichiers";
_NXFIC.MODID="nx-fic-modal";
_NXFIC.MARGE=0.92;
_NXFIC.LIMITES={0:10485760,1:10485760,2:52428800,3:104857600};
_NXFIC.cfg={on:true,qualite:"bonne",garde:false};
_NXFIC.dernier=null;
_NXFIC.load=function(){try{
var r=_NXDB.get(_NXFIC.KEY);
var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")d={};
if(typeof d.on!=="boolean")d.on=true;
if(d.qualite!=="petite"&&d.qualite!=="bonne"&&d.qualite!=="max")d.qualite="bonne";
if(typeof d.garde!=="boolean")d.garde=false;
_NXFIC.cfg=d;return d;}catch(_){return _NXFIC.cfg;}};
_NXFIC.save=function(){try{_NXDB.set(_NXFIC.KEY,JSON.stringify(_NXFIC.cfg));}catch(_){}};
_NXFIC.set=function(k,v){try{_NXFIC.cfg[k]=v;_NXFIC.save();}catch(_){}};

// premiumType : 0 rien, 1 Nitro Classic, 2 Nitro, 3 Nitro Basic.
_NXFIC.nitro=function(){try{
var US=_NXcommon().store("UserStore");
var u=US&&US.getCurrentUser&&US.getCurrentUser();
var p=u&&u.premiumType;
return (typeof p==="number")&&p>0;}catch(_){return false;}};

_NXFIC.dispo=function(){try{
if(!_NXFIC.cfg.on)return false;
if(_NXFIC.nitro())return false;
return true;}catch(_){return false;}};

// La limite depend du niveau d amelioration du serveur. Un message prive
// retombe sur la limite de base.
_NXFIC.limite=function(salon){try{
var tier=0;
try{
var gid=salon&&(salon.guild_id||salon.guildId);
if(gid){
var GS=_NXcommon().store("GuildStore");
var g=GS&&GS.getGuild&&GS.getGuild(String(gid));
if(g&&typeof g.premiumTier==="number")tier=g.premiumTier;}}catch(_){}
return _NXFIC.LIMITES[tier]||_NXFIC.LIMITES[0];}catch(_){return _NXFIC.LIMITES[0];}};

_NXFIC.poids=function(n){try{
if(n>=1048576)return (Math.round(n/104857.6)/10)+" Mo";
if(n>=1024)return Math.round(n/1024)+" ko";
return n+" o";}catch(_){return "";}};

_NXFIC.RXIMG=/^image\/(png|jpe?g|webp|bmp|avif)$/i;
_NXFIC.RXVID=/^video\//i;
_NXFIC.RXSON=/^audio\//i;
_NXFIC.genre=function(f){try{
var t=String((f&&f.type)||"");
if(_NXFIC.RXIMG.test(t))return "image";
if(_NXFIC.RXVID.test(t))return "video";
if(_NXFIC.RXSON.test(t))return "audio";
return "";}catch(_){return "";}};

_NXFIC.QUAL={petite:{img:0.62,vid:0.45,px:1280},
bonne:{img:0.78,vid:0.72,px:1600},
max:{img:0.9,vid:0.9,px:1920}};
_NXFIC.reglage=function(){try{
return _NXFIC.QUAL[_NXFIC.cfg.qualite]||_NXFIC.QUAL.bonne;}catch(_){return _NXFIC.QUAL.bonne;}};

// --- images -----------------------------------------------------------------
// On cherche la plus grande image qui tienne : on baisse la qualite d abord,
// la taille ensuite. Une photo floue mais grande est pire qu une photo nette
// un peu plus petite.
_NXFIC.image=function(f,cible){try{
return new Promise(function(res,rej){
var url=URL.createObjectURL(f);
var img=new Image();
img.onload=function(){try{
var Q=_NXFIC.reglage();
var maxc=Q.px;
var essai=function(largeur,q,reste){
var ech=Math.min(1,largeur/img.width);
var w=Math.max(16,Math.round(img.width*ech));
var h=Math.max(16,Math.round(img.height*ech));
var c=document.createElement("canvas");
c.width=w;c.height=h;
var ctx=c.getContext("2d");
ctx.drawImage(img,0,0,w,h);
c.toBlob(function(b){
if(!b){rej(new Error("le navigateur n a pas su reencoder l image"));return;}
if(b.size<=cible||reste<=0){
try{URL.revokeObjectURL(url);}catch(_){}
res(new File([b],_NXFIC.nom(f,"webp"),{type:"image/webp",lastModified:Date.now()}));
return;}
if(q>0.45)essai(largeur,q-0.12,reste-1);
else essai(Math.round(largeur*0.75),0.8,reste-1);},"image/webp",q);};
essai(Math.min(maxc,img.width),Q.img,10);}catch(e){rej(e);}};
img.onerror=function(){try{URL.revokeObjectURL(url);}catch(_){}rej(new Error("image illisible"));};
img.src=url;});}catch(e){return Promise.reject(e);}};

_NXFIC.nom=function(f,ext){try{
var n=String((f&&f.name)||"fichier");
var p=n.lastIndexOf(".");
if(p>0)n=n.slice(0,p);
return n.slice(0,60)+"."+ext;}catch(_){return "fichier."+ext;}};

// --- video ------------------------------------------------------------------
// Le navigateur sait deja decoder et reencoder : on rejoue la video dans un
// canvas et on enregistre la sortie au debit voulu. C est du temps reel -- une
// video de trois minutes prend trois minutes -- donc la carte le dit et
// laisse annuler.
_NXFIC.video=function(f,cible,prog,annule){try{
return new Promise(function(res,rej){
if(typeof MediaRecorder!=="function"){rej(new Error("ce client ne sait pas reencoder une video"));return;}
var Q=_NXFIC.reglage();
var url=URL.createObjectURL(f);
var v=document.createElement("video");
v.muted=true;v.playsInline=true;v.preload="auto";v.src=url;
var nettoie=function(){try{URL.revokeObjectURL(url);}catch(_){}try{v.pause();}catch(_){}};
v.onerror=function(){nettoie();rej(new Error("video illisible"));};
v.onloadedmetadata=function(){try{
var dur=v.duration;
if(!isFinite(dur)||dur<=0){nettoie();rej(new Error("duree inconnue"));return;}
// Le debit total qui tient dans la cible, moins ce qu on reserve au son.
var sonKbps=96;
var total=Math.floor(cible*8/dur);
var videoBps=Math.max(120000,total-sonKbps*1000);
var ech=Math.min(1,Q.px/Math.max(1,v.videoWidth));
var w=Math.max(160,Math.round(v.videoWidth*ech/2)*2);
var h=Math.max(90,Math.round(v.videoHeight*ech/2)*2);
var c=document.createElement("canvas");c.width=w;c.height=h;
var ctx=c.getContext("2d");
var flux=c.captureStream(30);
try{
var src=v.captureStream?v.captureStream():null;
var at=src&&src.getAudioTracks?src.getAudioTracks():[];
if(at&&at.length)flux.addTrack(at[0]);}catch(_){}
var types=["video/webm;codecs=vp9,opus","video/webm;codecs=vp8,opus","video/webm"];
var mime="";
for(var a=0;a<types.length;a++){
try{if(MediaRecorder.isTypeSupported(types[a])){mime=types[a];break;}}catch(_){}}
var rec=new MediaRecorder(flux,mime?{mimeType:mime,videoBitsPerSecond:videoBps,
audioBitsPerSecond:sonKbps*1000}:{videoBitsPerSecond:videoBps});
var bouts=[];
rec.ondataavailable=function(e){if(e.data&&e.data.size)bouts.push(e.data);};
rec.onerror=function(){nettoie();rej(new Error("l enregistrement a echoue"));};
rec.onstop=function(){try{
nettoie();
var b=new Blob(bouts,{type:"video/webm"});
res(new File([b],_NXFIC.nom(f,"webm"),{type:"video/webm",lastModified:Date.now()}));}catch(e2){rej(e2);}};
var fini=false;
var peindre=function(){
if(fini)return;
try{ctx.drawImage(v,0,0,w,h);}catch(_){}
try{if(prog&&dur)prog(Math.min(0.99,v.currentTime/dur));}catch(_){}
if(annule&&annule()){fini=true;try{rec.stop();}catch(_){}return;}
requestAnimationFrame(peindre);};
v.onended=function(){fini=true;try{rec.stop();}catch(_){}};
v.muted=true;
var p=v.play();
if(p&&p.catch)p.catch(function(e3){nettoie();rej(e3);});
rec.start(1000);
requestAnimationFrame(peindre);}catch(e4){nettoie();rej(e4);}};
});}catch(e){return Promise.reject(e);}};

// --- son --------------------------------------------------------------------
_NXFIC.son=function(f,cible,prog,annule){try{
return new Promise(function(res,rej){
if(typeof MediaRecorder!=="function"){rej(new Error("ce client ne sait pas reencoder un son"));return;}
var url=URL.createObjectURL(f);
var a=document.createElement("audio");
a.src=url;a.preload="auto";
var nettoie=function(){try{URL.revokeObjectURL(url);}catch(_){}try{a.pause();}catch(_){}};
a.onerror=function(){nettoie();rej(new Error("son illisible"));};
a.onloadedmetadata=function(){try{
var dur=a.duration;
if(!isFinite(dur)||dur<=0){nettoie();rej(new Error("duree inconnue"));return;}
var bps=Math.max(24000,Math.min(192000,Math.floor(cible*8/dur)));
var flux=a.captureStream?a.captureStream():null;
if(!flux){nettoie();rej(new Error("flux audio indisponible"));return;}
var rec=new MediaRecorder(flux,{mimeType:"audio/webm",audioBitsPerSecond:bps});
var bouts=[];
rec.ondataavailable=function(e){if(e.data&&e.data.size)bouts.push(e.data);};
rec.onstop=function(){try{
nettoie();
var b=new Blob(bouts,{type:"audio/webm"});
res(new File([b],_NXFIC.nom(f,"webm"),{type:"audio/webm",lastModified:Date.now()}));}catch(e2){rej(e2);}};
var t=setInterval(function(){
try{if(prog&&dur)prog(Math.min(0.99,a.currentTime/dur));}catch(_){}
if(annule&&annule()){clearInterval(t);try{rec.stop();}catch(_){}}},400);
a.onended=function(){clearInterval(t);try{rec.stop();}catch(_){}};
a.play();
rec.start(1000);}catch(e3){nettoie();rej(e3);}};
});}catch(e){return Promise.reject(e);}};

_NXFIC.compresse=function(f,cible,prog,annule){try{
var g=_NXFIC.genre(f);
if(g==="image")return _NXFIC.image(f,cible);
if(g==="video")return _NXFIC.video(f,cible,prog,annule);
if(g==="audio")return _NXFIC.son(f,cible,prog,annule);
return Promise.reject(new Error("rien a faire sur ce type de fichier"));}catch(e){
return Promise.reject(e);}};

// --- la carte ---------------------------------------------------------------
_NXFIC.ferme=function(){try{
var o=document.getElementById(_NXFIC.MODID);
if(o&&o.parentNode)o.parentNode.removeChild(o);}catch(_){}};
_NXFIC.carte=function(f,cible,surAnnule){try{
_NXFIC.ferme();
var P=_NXpal;
var esc=function(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
var g=_NXFIC.genre(f);
var ov=document.createElement("div");ov.id=_NXFIC.MODID;
ov.style.cssText="position:fixed;right:18px;bottom:18px;z-index:99998;width:330px;max-width:calc(100vw - 36px);"
+"background:"+P.panel+";border:1px solid "+P.line+";border-radius:16px;padding:16px 17px;box-shadow:0 22px 60px rgba(0,0,0,.55);";
ov.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:5px;">Nexium</div>'
+'<div style="font-size:14px;font-weight:800;color:'+P.txt+';letter-spacing:-.01em;">Ton fichier est trop gros. Je le reduis.</div>'
+'<div style="font-size:11.5px;color:'+P.dim+';margin-top:6px;line-height:1.55;word-break:break-all;">'
+esc(String(f.name).slice(0,60))+' &middot; '+_NXFIC.poids(f.size)+' vers '+_NXFIC.poids(cible)+'</div>'
+(g!=="image"?('<div style="font-size:11px;color:'+P.faint+';margin-top:6px;line-height:1.5;">Ca prend le temps du fichier : il est rejoue en entier. Tu peux continuer a taper.</div>'):"")
+'<div id="'+_NXFIC.MODID+'-bar" style="height:5px;border-radius:99px;background:'+P.line+';margin-top:12px;overflow:hidden;">'
+'<div id="'+_NXFIC.MODID+'-fill" style="height:100%;width:4%;background:'+P.acc+';border-radius:99px;transition:width .3s ease;"></div></div>');
var b=document.createElement("div");
b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");
b.style.cssText="margin-top:12px;text-align:center;padding:9px;border-radius:10px;border:1px solid "+P.line+";color:"+P.sub+";font-size:12px;font-weight:600;cursor:pointer;";
b.textContent=_NXtr("Annuler");
b.onclick=function(){try{surAnnule&&surAnnule();}catch(_){}_NXFIC.ferme();};
ov.appendChild(b);
if(document.body)document.body.appendChild(ov);
return true;}catch(_){return false;}};
_NXFIC.avance=function(p){try{
var el=document.getElementById(_NXFIC.MODID+"-fill");
if(el)el.style.width=Math.max(4,Math.round(p*100))+"%";}catch(_){}};

// --- l hameon ---------------------------------------------------------------
_NXFIC.module=function(){try{
var WP=_NXcommon().WP;
if(!WP||!WP.findByProps)return null;
return WP.findByProps("promptToUpload")||null;}catch(_){return null;}};

_NXFIC.wire=function(){try{
if(_NXFIC._wire)return true;
var M=_NXFIC.module();
if(!M||typeof M.promptToUpload!=="function"){
_NXFIC._essais=(_NXFIC._essais||0)+1;
if(_NXFIC._essais<25)setTimeout(_NXFIC.wire,3000);
return false;}
if(M.promptToUpload.__nxfic){_NXFIC._wire=true;return true;}
var orig=M.promptToUpload.bind(M);
var pose=function(fichiers,salon,type){
try{
if(!_NXFIC.dispo())return orig(fichiers,salon,type);
var L=[];
try{L=Array.prototype.slice.call(fichiers||[]);}catch(_){L=[];}
if(!L.length)return orig(fichiers,salon,type);
var cible=Math.floor(_NXFIC.limite(salon)*_NXFIC.MARGE);
var gros=null,a;
for(a=0;a<L.length;a++){
if(L[a]&&L[a].size>cible&&_NXFIC.genre(L[a])){gros=L[a];break;}}
if(!gros)return orig(fichiers,salon,type);
var stop=false;
_NXFIC.carte(gros,cible,function(){stop=true;});
_NXFIC.compresse(gros,cible,_NXFIC.avance,function(){return stop;})
.then(function(petit){
_NXFIC.ferme();
if(stop)return;
if(!petit||petit.size>=gros.size){
try{_NXPR.toast(_NXtr("Ce fichier ne se comprime pas assez. Il part tel quel."),2);}catch(_){}
orig(fichiers,salon,type);return;}
_NXFIC.dernier={nom:gros.name,avant:gros.size,apres:petit.size,quand:Date.now()};
var neuf=[],b;
for(b=0;b<L.length;b++)neuf.push(L[b]===gros?petit:L[b]);
try{_NXPR.toast(_NXFIC.poids(gros.size)+_NXtr(" reduits a ")+_NXFIC.poids(petit.size)+_NXtr(". C est parti."),1);}catch(_){}
orig(neuf,salon,type);})
.catch(function(e){
_NXFIC.ferme();
if(stop)return;
try{_NXPR.toast(_NXtr("Reduction impossible : ")+((e&&_NXtr(e.message))||_NXtr("erreur"))+_NXtr(". Le fichier part tel quel."),2);}catch(_){}
orig(fichiers,salon,type);});
return undefined;}catch(_){}
return orig(fichiers,salon,type);};
pose.__nxfic=true;
M.promptToUpload=pose;
_NXFIC._wire=true;
return true;}catch(_){return false;}};

_NXFIC.etat=function(){try{
return {actif:_NXFIC.dispo(),nitro:_NXFIC.nitro(),
branche:!!_NXFIC._wire,qualite:_NXFIC.cfg.qualite,
limite:_NXFIC.LIMITES[0],dernier:_NXFIC.dernier};}catch(_){return {actif:false};}};

try{_NXFIC.load();}catch(_){}
try{setTimeout(_NXFIC.wire,11000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXFIC");if(window._NXERR)_NXERR.push("module _NXFIC :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXFIC desactive:",_nxE);}catch(_){}}
}
