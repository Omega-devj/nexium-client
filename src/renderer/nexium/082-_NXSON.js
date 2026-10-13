var _NXSON=window._NXSON||(window._NXSON={});
if(!_NXSON.boot){try{_NXSON.boot=true;
// Le soundboard.
_NXSON.KEY="nexium_sons";
_NXSON.MODID="nx-son-modal";
_NXSON.MAX=24;
_NXSON.MAXO=3145728;
_NXSON.cfg={volume:0.8,touches:true,sortie:"",entree:""};
_NXSON.index=[];
_NXSON.etatVoie="";
_NXSON._ecoute=[];

_NXSON.load=function(){try{
var r=_NXDB.get(_NXSON.KEY);
var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")d={};
if(!d.cfg||typeof d.cfg!=="object")d.cfg={};
if(typeof d.cfg.volume!=="number"||!(d.cfg.volume>=0&&d.cfg.volume<=1))d.cfg.volume=0.8;
if(typeof d.cfg.touches!=="boolean")d.cfg.touches=true;
if(typeof d.cfg.sortie!=="string")d.cfg.sortie="";
if(typeof d.cfg.entree!=="string")d.cfg.entree="";
if(!d.index||!d.index.length)d.index=[];
_NXSON.cfg=d.cfg;_NXSON.index=d.index;
return d;}catch(_){return null;}};
_NXSON.save=function(){try{
_NXDB.set(_NXSON.KEY,JSON.stringify({cfg:_NXSON.cfg,index:_NXSON.index}));}catch(_){}};
_NXSON.set=function(k,v){try{_NXSON.cfg[k]=v;_NXSON.save();_NXSON.notify();}catch(_){}};
_NXSON.notify=function(){try{
for(var a=0;a<_NXSON._ecoute.length;a++){try{_NXSON._ecoute[a]();}catch(_){}}}catch(_){}};

// --- les peripheriques ------------------------------------------------------
_NXSON.RXCABLE=/(cable|voicemeeter|vb-audio|vb audio|virtual audio|virtual cable|blackhole|soundflower)/i;
_NXSON.RXMIX=/(mixage st[eé]r[eé]o|stereo ?mix|what ?u ?hear|wave ?out|st[eé]r[eé]o mix|loopback|bouclage)/i;

_NXSON.appareils=function(){try{
if(!navigator.mediaDevices||!navigator.mediaDevices.enumerateDevices)
return Promise.resolve({entrees:[],sorties:[]});
return navigator.mediaDevices.enumerateDevices().then(function(L){
var e=[],s2=[],a;
for(a=0;a<L.length;a++){
var d=L[a];
if(!d||!d.deviceId)continue;
if(d.kind==="audioinput")e.push({id:d.deviceId,nom:String(d.label||"")});
else if(d.kind==="audiooutput")s2.push({id:d.deviceId,nom:String(d.label||"")});}
return {entrees:e,sorties:s2};},function(){return {entrees:[],sorties:[]};});}catch(_){
return Promise.resolve({entrees:[],sorties:[]});}};

// La meilleure paire disponible. Un cable virtuel se reconnait a ce qu il
// expose une entree ET une sortie du meme nom : c est exactement ce qu on
// cherche.
_NXSON.paire=function(){try{
return _NXSON.appareils().then(function(A){
var a,b;
for(a=0;a<A.entrees.length;a++){
if(!_NXSON.RXCABLE.test(A.entrees[a].nom))continue;
for(b=0;b<A.sorties.length;b++){
if(_NXSON.RXCABLE.test(A.sorties[b].nom))
return {voie:"cable",entree:A.entrees[a],sortie:A.sorties[b],
note:"Les autres n entendront que le son."};}}
for(a=0;a<A.entrees.length;a++){
if(_NXSON.RXMIX.test(A.entrees[a].nom))
return {voie:"mixage",entree:A.entrees[a],sortie:null,
note:"Le mixage renvoie tout ce qui sort de ta machine : si l appel sort sur le meme peripherique, les autres s entendront eux-memes. Un casque suffit a l eviter."};}
return {voie:"aucun",entree:null,sortie:null,
note:"Aucun peripherique de bouclage. Le son ne jouera que pour toi."};});}catch(_){
return Promise.resolve({voie:"aucun",entree:null,sortie:null,note:""});}};

_NXSON.verifie=function(){try{
return _NXSON.paire().then(function(p){
_NXSON.voie=p;
_NXSON.etatVoie=p.voie;
_NXSON.notify();
return p;});}catch(_){return Promise.resolve(null);}};

// --- le moteur de Discord ---------------------------------------------------
_NXSON.moteur=function(){try{
var ME=_NXcommon().store("MediaEngineStore");
if(!ME||typeof ME.getMediaEngine!=="function")return null;
return ME.getMediaEngine()||null;}catch(_){return null;}};
_NXSON.entreeCourante=function(){try{
var ME=_NXcommon().store("MediaEngineStore");
if(ME&&typeof ME.getInputDeviceId==="function")return String(ME.getInputDeviceId()||"");
return "";}catch(_){return "";}};
_NXSON.bascule=function(id){try{
var M=_NXSON.moteur();
if(!M||typeof M.setInputDevice!=="function")return false;
M.setInputDevice(String(id),function(){});
return true;}catch(_){return false;}};

_NXSON.enVocal=function(){try{
var SC=_NXcommon().store("SelectedChannelStore");
return !!(SC&&SC.getVoiceChannelId&&SC.getVoiceChannelId());}catch(_){return false;}};

// --- la bibliotheque --------------------------------------------------------
_NXSON.cle=function(id){return "son:"+id;};
_NXSON.neuf=function(){try{
return "s"+Date.now().toString(36)+Math.floor(Math.random()*1296).toString(36);}catch(_){return "s"+Date.now();}};

_NXSON.ajoute=function(f){try{
if(!f)return Promise.resolve({erreur:"aucun fichier"});
if(_NXSON.index.length>=_NXSON.MAX)
return Promise.resolve({erreur:"la bibliotheque est pleine ("+_NXSON.MAX+" sons)"});
if(f.size>_NXSON.MAXO)
return Promise.resolve({erreur:"ce son depasse "+Math.round(_NXSON.MAXO/1048576)+" Mo"});
if(!/^audio\//i.test(String(f.type||"")))
return Promise.resolve({erreur:"ce n est pas un fichier son"});
return f.arrayBuffer().then(function(buf){
var id=_NXSON.neuf();
try{_NXPR.idbEcrit(_NXSON.cle(id),{nom:f.name,type:f.type,buf:buf});}catch(_){}
_NXSON.index.push({id:id,nom:String(f.name).replace(/\.[a-z0-9]+$/i,"").slice(0,28),
taille:f.size,quand:Date.now()});
_NXSON.save();_NXSON.notify();
return {id:id};});}catch(e){return Promise.resolve({erreur:String(e&&e.message)});}};

_NXSON.retire=function(id){try{
var a;
for(a=0;a<_NXSON.index.length;a++){
if(_NXSON.index[a].id!==id)continue;
_NXSON.index.splice(a,1);
try{_NXPR.idbEcrit(_NXSON.cle(id),null);}catch(_){}
_NXSON.save();_NXSON.notify();
return true;}
return false;}catch(_){return false;}};

_NXSON.renomme=function(id,nom){try{
var a;
for(a=0;a<_NXSON.index.length;a++){
if(_NXSON.index[a].id!==id)continue;
_NXSON.index[a].nom=String(nom||"").slice(0,28)||_NXSON.index[a].nom;
_NXSON.save();_NXSON.notify();return true;}
return false;}catch(_){return false;}};

// --- jouer ------------------------------------------------------------------
// Deux lectures en parallele : une pour toi sur ta sortie habituelle, une
// dans le cable pour les autres. Le micro de Discord bascule le temps du son,
// puis revient exactement ou il etait.
_NXSON.joue=function(id){try{
var e=null,a;
for(a=0;a<_NXSON.index.length;a++)if(_NXSON.index[a].id===id)e=_NXSON.index[a];
if(!e)return Promise.resolve(false);
return new Promise(function(res){
_NXPR.idbLit(_NXSON.cle(id),function(d){try{
if(!d||!d.buf){res(false);return;}
var blob=new Blob([d.buf],{type:d.type||"audio/mpeg"});
var url=URL.createObjectURL(blob);
var moi=new Audio(url);
moi.volume=_NXSON.cfg.volume;
var fini=function(){try{URL.revokeObjectURL(url);}catch(_){}};
var p=_NXSON.voie;
if(!p||p.voie==="aucun"||!_NXSON.enVocal()){
moi.onended=fini;moi.play();res(true);return;}
var avant=_NXSON.entreeCourante();
var eux=new Audio(url);
eux.volume=1;
var lance=function(){
try{_NXSON.bascule(p.entree.id);}catch(_){}
_NXSON._enCours=true;
eux.play();
moi.play();};
var rendre=function(){
if(!_NXSON._enCours)return;
_NXSON._enCours=false;
setTimeout(function(){try{if(avant)_NXSON.bascule(avant);}catch(_){}fini();},260);};
eux.onended=rendre;
eux.onerror=rendre;
setTimeout(rendre,45000);
if(p.voie==="cable"&&p.sortie&&eux.setSinkId){
eux.setSinkId(p.sortie.id).then(lance,lance);}
else lance();
res(true);}catch(_){res(false);}});});}catch(_){return Promise.resolve(false);}};

_NXSON.stop=function(){try{
_NXSON._enCours=false;
return true;}catch(_){return false;}};

// --- les raccourcis ---------------------------------------------------------
// Ctrl+Maj+1 a 9. On ne capte rien quand le curseur est dans un champ : un
// raccourci qui mange la frappe est un raccourci qu on desactive.
_NXSON.dansChamp=function(){try{
var el=document.activeElement;
if(!el)return false;
var t=String(el.tagName||"").toLowerCase();
if(t==="input"||t==="textarea")return true;
return !!el.isContentEditable;}catch(_){return false;}};
_NXSON.wireTouches=function(){try{
if(_NXSON._touches)return;
_NXSON._touches=true;
document.addEventListener("keydown",function(e){try{
if(!_NXSON.cfg.touches)return;
if(!e.ctrlKey||!e.shiftKey||e.altKey)return;
if(_NXSON.dansChamp())return;
var n=parseInt(e.key,10);
if(!isFinite(n)||n<1||n>9)return;
var s2=_NXSON.index[n-1];
if(!s2)return;
e.preventDefault();e.stopPropagation();
_NXSON.joue(s2.id);}catch(_){}},true);}catch(_){}};


// --- la carte ---------------------------------------------------------------
_NXSON.ferme=function(){try{
var o=document.getElementById(_NXSON.MODID);
if(o&&o.parentNode)o.parentNode.removeChild(o);}catch(_){}};

_NXSON.AIDE={
cable:"Un cable audio virtuel est installe. C est la meilleure situation.",
mixage:"Le mixage stereo de Windows est actif. Ca marche.",
aucun:"Pour que les autres entendent, il faut un peripherique de bouclage. Deux facons : activer le Mixage stereo dans les parametres de son de Windows (onglet Enregistrement, clic droit, Afficher les peripheriques desactives), ou installer VB-CABLE, qui est gratuit et plus propre. Ensuite, reviens ici et clique sur Reverifier."};

_NXSON.carte=function(){try{
_NXSON.ferme();
var P=_NXpal;
var ov=document.createElement("div");ov.id=_NXSON.MODID;
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.62);";
var card=document.createElement("div");
card.style.cssText="width:520px;max-width:calc(100vw - 40px);max-height:84vh;display:flex;flex-direction:column;background:"+P.panel+";border:1px solid "+P.line+";border-radius:20px;padding:22px;box-shadow:0 30px 80px rgba(0,0,0,.55);";
card.innerHTML=_NXtrHtml('<div id="'+_NXSON.MODID+'-tete"></div>'
+'<div id="'+_NXSON.MODID+'-corps" style="overflow-y:auto;margin-top:14px;flex:1 1 auto;"></div>');
var pied=document.createElement("div");
pied.style.cssText="display:flex;gap:8px;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid "+P.line+";";
var mk=function(txt,style,fn){
var b=document.createElement("div");b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");
b.style.cssText=style;b.textContent=_NXtr(txt);b.onclick=fn;
b.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();fn();}};
return b;};
var champ=document.createElement("input");
champ.type="file";champ.accept="audio/*";champ.multiple=true;
champ.style.cssText="display:none;";
champ.onchange=function(){try{
var L=champ.files,a,suite=Promise.resolve();
for(a=0;a<L.length;a++)(function(f){
suite=suite.then(function(){return _NXSON.ajoute(f).then(function(r){
if(r&&r.erreur){try{_NXPR.toast(_NXtr(r.erreur),2);}catch(_){}}});});})(L[a]);
suite.then(function(){_NXSON.peint();});}catch(_){}};
card.appendChild(champ);
pied.appendChild(mk("Ajouter un son","flex:0 0 auto;padding:10px 14px;border-radius:10px;border:1px solid "+P.line+";color:"+P.sub+";font-size:12px;font-weight:700;cursor:pointer;",
function(){champ.click();}));
pied.appendChild(mk("Reverifier","flex:0 0 auto;padding:10px 14px;border-radius:10px;border:1px solid "+P.line+";color:"+P.sub+";font-size:12px;font-weight:600;cursor:pointer;",
function(){_NXSON.verifie().then(function(){_NXSON.peint();});}));
var esp=document.createElement("div");esp.style.cssText="flex:1 1 auto;";
pied.appendChild(esp);
pied.appendChild(mk("Fermer","flex:0 0 auto;padding:10px 16px;border-radius:10px;background:"+P.acc+";color:"+P.ink+";font-size:12px;font-weight:700;cursor:pointer;",
function(){_NXSON.ferme();}));
card.appendChild(pied);
ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)_NXSON.ferme();};
if(document.body)document.body.appendChild(ov);
if(!_NXSON.voie)_NXSON.verifie().then(function(){_NXSON.peint();});
_NXSON.peint();
return true;}catch(_){return false;}};

_NXSON.peint=function(){try{
var tete=document.getElementById(_NXSON.MODID+"-tete");
var corps=document.getElementById(_NXSON.MODID+"-corps");
if(!tete||!corps)return;
var P=_NXpal;
var esc=function(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
var p=_NXSON.voie||{voie:"aucun",note:""};
var coul=p.voie==="cable"?P.ok:p.voie==="mixage"?P.warn:P.faint;
var titre=p.voie==="cable"?"Les autres t entendront":
p.voie==="mixage"?"Les autres t entendront, avec une reserve":
"Pour l instant, tu es le seul a entendre";
tete.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Nexium soundboard</div>'
+'<div style="font-size:20px;font-weight:800;color:'+P.txt+';letter-spacing:-.02em;">Tes sons, dans n importe quel vocal</div>'
+'<div style="font-size:11.5px;color:'+P.sub+';margin-top:6px;line-height:1.6;">Sans Nitro, sans passer par le soundboard de Discord : le son entre par le micro.</div>'
+'<div style="margin-top:12px;padding:12px 13px;border-radius:12px;background:'+P.inset+';border:1px solid '+coul+';">'
+'<div style="font-size:13.5px;font-weight:800;color:'+coul+';">'+esc(titre)+'</div>'
+'<div style="font-size:11.5px;color:'+P.sub+';margin-top:5px;line-height:1.6;">'
+esc((_NXSON.AIDE[p.voie]||"")+" "+(p.note||""))+'</div>'
+((p.entree&&p.entree.nom)?('<div style="font-size:10.5px;color:'+P.faint+';margin-top:6px;font-family:'+_NXf.mono+';">'+esc(p.entree.nom)+'</div>'):"")
+'</div>');
var L=_NXSON.index;
if(!L.length){
corps.innerHTML=_NXtrHtml('<div style="padding:22px 4px;font-size:12.5px;color:'+P.dim+';line-height:1.6;">Aucun son. Ajoute des fichiers : ils restent sur ta machine, et les neuf premiers repondent a Ctrl+Maj+1 jusqu a 9.</div>');
return;}
var h='',a;
for(a=0;a<L.length;a++){
h+='<div style="display:flex;gap:11px;align-items:center;padding:9px 0;border-top:1px solid '+P.line+';">'
+'<div style="flex:0 0 46px;font-family:'+_NXf.mono+';font-size:10.5px;color:'+P.faint+';">'
+(a<9?("Ctrl+&#8679;+"+(a+1)):"")+'</div>'
+'<div style="flex:1 1 auto;min-width:0;font-size:12.5px;font-weight:600;color:'+P.txt+';overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+esc(L[a].nom)+'</div>'
+'<div class="nx-fx nx-son-go" data-id="'+esc(L[a].id)+'" role="button" tabindex="0" style="flex:0 0 auto;padding:6px 13px;border-radius:9px;background:'+P.acc+';color:'+P.ink+';font-size:11.5px;font-weight:800;cursor:pointer;">Jouer</div>'
+'<div class="nx-fx nx-son-rm" data-id="'+esc(L[a].id)+'" role="button" tabindex="0" style="flex:0 0 auto;padding:6px 10px;border-radius:9px;border:1px solid '+P.line+';color:'+P.faint+';font-size:11.5px;cursor:pointer;">Retirer</div>'
+'</div>';}
corps.innerHTML=_NXtrHtml(h);
var gos=corps.querySelectorAll(".nx-son-go"),b;
for(b=0;b<gos.length;b++)(function(el){
el.onclick=function(){_NXSON.joue(el.getAttribute("data-id"));};})(gos[b]);
var rms=corps.querySelectorAll(".nx-son-rm"),c;
for(c=0;c<rms.length;c++)(function(el){
el.onclick=function(){_NXSON.retire(el.getAttribute("data-id"));_NXSON.peint();};})(rms[c]);
}catch(_){}};

_NXSON.etat=function(){try{
return {sons:_NXSON.index.length,max:_NXSON.MAX,
voie:_NXSON.etatVoie||"inconnue",
enVocal:_NXSON.enVocal(),volume:_NXSON.cfg.volume};}catch(_){return {sons:0};}};

try{_NXSON.load();}catch(_){}
try{setTimeout(function(){_NXSON.verifie();},13000);
setTimeout(_NXSON.wireTouches,6000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXSON");if(window._NXERR)_NXERR.push("module _NXSON :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXSON desactive:",_nxE);}catch(_){}}
}
