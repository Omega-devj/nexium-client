var _NXULTRA=window._NXULTRA||(window._NXULTRA={});
if(!_NXULTRA.boot){try{_NXULTRA.boot=true;
// Nexium Ultra Fast, cote page. Le lanceur a deja pose ce qui ne se regle
// qu avant Chromium (carte graphique dediee, rasterisation, priorite). Ici :
// l isolation des zones de Discord, un pilote qui n allege que si des images
// bloquent vraiment, la liberation de memoire en arriere-plan, et deux
// mesures reelles -- les images par seconde, et le delai de chaque touche.
_NXULTRA.DEF={actif:true,gpuDedie:true,raster:true,priorite:true,isolation:true,pilote:true,memoire:true};
_NXULTRA.AU_DEMARRAGE={actif:1,gpuDedie:1,raster:1,priorite:1};
_NXULTRA.listeners=[];
_NXULTRA.notify=function(){for(var a=0;a<_NXULTRA.listeners.length;a++){try{_NXULTRA.listeners[a]();}catch(_){}}};
_NXULTRA.brut=function(){try{var S=_NXPERF.reglages();return (S&&S.plugins&&S.plugins.NexiumUltra)||null;}catch(_){return null;}};
_NXULTRA.cfg=function(){var c=_NXULTRA.brut()||{},o={},k;
for(k in _NXULTRA.DEF)o[k]=(typeof c[k]==="boolean")?c[k]:_NXULTRA.DEF[k];return o;};
_NXULTRA.etat=function(){var c=_NXULTRA.brut();return (c&&c.etat)||null;};
_NXULTRA.set=function(k,v){try{
var c=_NXULTRA.brut()||{},n={},x;for(x in c)n[x]=c[x];n[k]=!!v;
var fait=false;
try{if(window.Vencord&&Vencord.Settings&&Vencord.Settings.plugins){Vencord.Settings.plugins.NexiumUltra=n;fait=true;}}catch(_){}
if(!fait){try{if(window.VencordNative&&VencordNative.settings&&VencordNative.settings.get){
var s2=VencordNative.settings.get();if(s2&&typeof s2==="object"){if(!s2.plugins)s2.plugins={};s2.plugins.NexiumUltra=n;VencordNative.settings.set(s2);}}}catch(_){}}
if(_NXULTRA.AU_DEMARRAGE[k])_NXULTRA.aRedemarrer=true;
_NXULTRA.applique();_NXULTRA.notify();return true;}catch(_){return false;}};

// --- l isolation et les paliers -----------------------------------------
// Palier 0, toujours : les colonnes fixes de Discord ne recalculent plus leur
// mise en page quand la discussion bouge. Palier 1 : plus aucun flou
// d arriere-plan, ce qui coute le plus a une petite carte graphique.
// Le pilote ne touche jamais aux animations : les raccourcir a 0,01 ms
// faisait tourner les animations en boucle des milliers de fois par seconde
// (la carte de l abonnement, le bouclier, l oeil). Il ne touche pas non plus
// a la liste des messages, dont Discord calcule lui-meme les hauteurs.
_NXULTRA.CSS_ISO='nav[class*="guilds_"],[class*="membersWrap_"],section[class*="panels_"],[class*="privateChannels_"]{contain:layout style;}';
_NXULTRA.CSS_N1='*{-webkit-backdrop-filter:none!important;backdrop-filter:none!important;}';
_NXULTRA.MAX=1;
_NXULTRA.niveau=0;
_NXULTRA.applique=function(){try{
if(typeof document==="undefined"||!document.head)return false;
var c=_NXULTRA.cfg(),css="";
if(c.actif&&c.isolation)css+=_NXULTRA.CSS_ISO;
if(c.actif&&_NXULTRA.niveau>=1)css+=_NXULTRA.CSS_N1;
var el=document.getElementById("nx-ultra-style");
if(!css){if(el&&el.parentNode)el.parentNode.removeChild(el);return true;}
if(!el){el=document.createElement("style");el.id="nx-ultra-style";document.head.appendChild(el);}
if(el.textContent!==css)el.textContent=css;
return true;}catch(_){return false;}};

// --- le pilote ----------------------------------------------------------
// Il ne mesure rien lui-meme : il lit les images que Chromium declare
// bloquees, ce qui ne coute rien. Une image compte quand une tache y a bloque
// la page plus de 50 ms -- pas quand elle a seulement ete longue a peindre,
// sinon les pages animees de Nexium declenchaient le pilote a elles seules.
// Il monte au palier 1 quand ca rame vraiment, et redescend apres trois
// minutes calmes.
_NXULTRA.journal=[];
_NXULTRA._calme=0;
_NXULTRA.taux=function(fen){try{
var now=Date.now(),n=0,a;
var L=(_NXPERF._obs==="loaf")?(_NXPERF.cadres||[]):(_NXPERF.longues||[]);
var loaf=(_NXPERF._obs==="loaf");
for(a=0;a<L.length;a++)if(now-L[a].t<fen&&(loaf?(L[a].b||0)>0:L[a].d>=50))n++;
return n/(fen/60000);}catch(_){return 0;}};
_NXULTRA.ronde=function(){try{
_NXULTRA.veilleMemoire();
var c=_NXULTRA.cfg();
if(!c.actif||!c.pilote){if(_NXULTRA.niveau){_NXULTRA.niveau=0;_NXULTRA.applique();_NXULTRA.notify();}return;}
if(typeof document!=="undefined"&&document.hidden)return;
var t=_NXULTRA.taux(120000);
_NXULTRA.dernierTaux=Math.round(t*10)/10;
var avant=_NXULTRA.niveau;
if(_NXULTRA.niveau>_NXULTRA.MAX)_NXULTRA.niveau=_NXULTRA.MAX;
if(t>=10&&_NXULTRA.niveau<1){_NXULTRA.niveau=1;_NXULTRA._calme=0;}
else if(t<2){_NXULTRA._calme++;if(_NXULTRA._calme>=6&&_NXULTRA.niveau>0){_NXULTRA.niveau--;_NXULTRA._calme=0;}}
else _NXULTRA._calme=0;
if(avant!==_NXULTRA.niveau){
_NXULTRA.journal.unshift({t:Date.now(),de:avant,a:_NXULTRA.niveau,taux:_NXULTRA.dernierTaux});
_NXULTRA.journal=_NXULTRA.journal.slice(0,20);
_NXULTRA.applique();}
_NXULTRA.notify();}catch(_){}};

// --- la memoire ---------------------------------------------------------
// Fenetre cachee depuis dix minutes : Discord rend la memoire qu il garde en
// cache. Une fois par absence, jamais pendant qu on s en sert.
_NXULTRA.memoire={n:0,dispo:null,der:0};
_NXULTRA._cache=0;_NXULTRA._purge=false;
_NXULTRA.veilleMemoire=function(){try{
var c=_NXULTRA.cfg();
var P=window.DiscordNative&&DiscordNative.processUtils;
_NXULTRA.memoire.dispo=!!(P&&typeof P.purgeMemory==="function");
if(!c.actif||!c.memoire||!_NXULTRA.memoire.dispo)return;
if(document.hidden){
if(!_NXULTRA._cache)_NXULTRA._cache=Date.now();
else if(!_NXULTRA._purge&&Date.now()-_NXULTRA._cache>600000){
_NXULTRA._purge=true;P.purgeMemory();_NXULTRA.memoire.n++;_NXULTRA.memoire.der=Date.now();}}
else{_NXULTRA._cache=0;_NXULTRA._purge=false;}}catch(_){}};

// --- la frappe ----------------------------------------------------------
// Chaque touche lente (plus de 16 ms jusqu a l image qui l affiche) est
// declaree par Chromium, avec ses trois temps : l attente avant que la page
// ne la traite, le traitement, puis l affichage. C est ce qui dit d ou vient
// le delai, au lieu de le supposer.
_NXULTRA.touches={n:0,lentes:[],suivi:false,depuis:Date.now()};
_NXULTRA.ecoute=function(){try{
if(_NXULTRA._ecoute)return;_NXULTRA._ecoute=true;
try{document.addEventListener("keydown",function(){_NXULTRA.touches.n++;},{capture:true,passive:true});}catch(_){}
if(typeof PerformanceObserver!=="function")return;
var types=PerformanceObserver.supportedEntryTypes||[];
if(types.indexOf("event")<0)return;
new PerformanceObserver(function(l){try{var E=l.getEntries();
for(var a=0;a<E.length;a++){var e=E[a];
if(e.name!=="keydown")continue;
var att=Math.max(0,(e.processingStart||0)-(e.startTime||0));
var tra=Math.max(0,(e.processingEnd||0)-(e.processingStart||0));
var aff=Math.max(0,(e.duration||0)-att-tra);
_NXULTRA.touches.lentes.push({t:Date.now(),d:Math.round(e.duration||0),attente:Math.round(att),traitement:Math.round(tra),affichage:Math.round(aff)});
if(_NXULTRA.touches.lentes.length>300)_NXULTRA.touches.lentes.shift();}}catch(_){}})
.observe({type:"event",durationThreshold:16,buffered:true});
_NXULTRA.touches.suivi=true;}catch(_){}};
_NXULTRA.bilanFrappe=function(){try{
var T=_NXULTRA.touches,L=T.lentes,n=L.length;
if(!n)return {suivi:T.suivi,touches:T.n,lentes:0};
var d=L.map(function(x){return x.d;}).sort(function(a,b){return a-b;});
var sa=0,st=0,sf=0;for(var a=0;a<n;a++){sa+=L[a].attente;st+=L[a].traitement;sf+=L[a].affichage;}
var cause=(st>=sa&&st>=sf)?"traitement":((sa>=sf)?"attente":"affichage");
return {suivi:T.suivi,touches:T.n,lentes:n,part:T.n?Math.round(n/T.n*100):null,
mediane:d[Math.floor(n/2)],pire:d[n-1],attente:Math.round(sa/n),traitement:Math.round(st/n),affichage:Math.round(sf/n),cause:cause};}catch(_){return {suivi:false,touches:0,lentes:0};}};

// --- la mesure des images -----------------------------------------------
_NXULTRA.HKEY="nexium_ultra_mesures";
_NXULTRA.historique=function(){try{var h=JSON.parse(_NXDB.get(_NXULTRA.HKEY)||"[]");return Array.isArray(h)?h:[];}catch(_){return [];}};
_NXULTRA.mesurer=function(ms,surImage,fin){try{
if(_NXULTRA._mes)return false;
var raf=window.requestAnimationFrame;
if(typeof raf!=="function")return false;
_NXULTRA._mes=true;
var t0=_NXPERF.horloge(),der=t0,dts=[],premier=true,serie=[];
var pas=function(){try{
var t=_NXPERF.horloge(),d=t-der;der=t;
if(premier)premier=false;else{dts.push(d);serie.push([Math.round((t-t0)*10)/10,Math.round(d*10)/10]);if(surImage)surImage(d,t-t0,ms);}
if(t-t0<ms){raf(pas);return;}
_NXULTRA._mes=false;
_NXULTRA.serie={ms:ms,img:serie};
var tri=dts.slice().sort(function(a,b){return a-b;}),n=tri.length;
var med=n?tri[Math.floor(n/2)]:0,p95=n?tri[Math.min(n-1,Math.floor(n*0.95))]:0,pire=n?tri[n-1]:0;
var lents=0;for(var a=0;a<n;a++)if(tri[a]>Math.max(med*1.6,20))lents++;
var c=_NXULTRA.cfg();
var r={quand:Date.now(),ips:Math.round(n*1000/Math.max(1,t-t0)),mediane:Math.round(med*10)/10,p95:Math.round(p95*10)/10,
pire:Math.round(pire),lents:lents,cachee:!!document.hidden,ultra:!!c.actif,niveau:_NXULTRA.niveau,
gpu:(_NXPERF.gpu?_NXPERF.gpu().active:null)};
var H=_NXULTRA.historique();H.unshift(r);
try{_NXDB.set(_NXULTRA.HKEY,JSON.stringify(H.slice(0,12)));}catch(_){}
try{_NXPERF.derniere={ips:r.ips,lents:r.lents,pire:r.pire,cachee:r.cachee,quand:r.quand};}catch(_){}
if(fin)fin(r);}catch(_){_NXULTRA._mes=false;}};
raf(pas);
return true;}catch(_){_NXULTRA._mes=false;return false;}};

// --- la carte graphique, telle que la page la voit ------------------------
_NXULTRA.genre=function(rendu){try{
var r=String(rendu||"");
if(/swiftshader|llvmpipe|software|basic render/i.test(r))return "logiciel";
if(/nvidia|geforce|rtx|gtx|quadro|radeon\s*rx|radeon\s*pro|arc\s*a\d/i.test(r))return "dediee";
if(/intel|uhd|iris|radeon\(tm\)\s*graphics|vega|adreno|mali/i.test(r))return "integree";
return "inconnue";}catch(_){return "inconnue";}};

_NXULTRA.ecoute();
try{setTimeout(_NXULTRA.applique,1200);}catch(_){}
try{setInterval(_NXULTRA.ronde,30000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXULTRA");if(window._NXERR)_NXERR.push("module _NXULTRA :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXULTRA desactive:",_nxE);}catch(_){}}
}
