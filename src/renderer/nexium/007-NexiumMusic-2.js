function NexiumMusicComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _t0=F.useState("ecoute");var tab=_t0[0];var setTab=_t0[1];
var _q0=F.useState("");var q=_q0[0];var setQ=_q0[1];
var _g0=F.useState(false);var glisseVol=_g0[0];var setGlisseVol=_g0[1];
var _m0=F.useState(null);var avantMuet=_m0[0];var setAvantMuet=_m0[1];
F.useEffect(function(){
var vivant=true,sig=_NXM.signature();
var maj=function(){if(!vivant)return;var s=_NXM.signature();if(s===sig)return;sig=s;force();};
_NXM.listeners.push(maj);
try{_NXM.pageStyle();}catch(_){}
try{if(!_NXM.remoteLoaded&&!_NXM.remoteBusy)_NXM.loadRemote();}catch(_){}
return function(){vivant=false;
try{_NXM.listeners=_NXM.listeners.filter(function(f){return f!==maj;});}catch(_){}};},[]);
F.useEffect(function(){
if(!glisseVol)return;
var bouge=function(e){try{var el=document.getElementById("nx-m-vol");if(!el)return;
var r=el.getBoundingClientRect();if(!r.width)return;
var f=(e.clientX-r.left)/r.width;_NXM.setVol(f<0?0:(f>1?1:f));setAvantMuet(null);}catch(_){}};
var fin=function(){setGlisseVol(false);};
try{window.addEventListener("mousemove",bouge);window.addEventListener("mouseup",fin);}catch(_){}
return function(){try{window.removeEventListener("mousemove",bouge);window.removeEventListener("mouseup",fin);}catch(_){}};},[glisseVol]);
F.useEffect(function(){try{
var el=document.getElementById("nx-m-actif");
if(el&&el.scrollIntoView)el.scrollIntoView({block:"nearest"});}catch(_){}},[_NXM.idx]);

var P=_NXpal,cfg=_NXM.cfg,clair=!!P.light;
var pistes=cfg.tracks||[];
var n=pistes.length;
var cur=pistes[_NXM.idx]||{title:"—",url:""};
var D=_NXM.decoupe(cur.title);
var E=_NXM.etiquette(cur.title);
var mort=!!_NXM.err[_NXM.idx];
var calme=!(window._NXMO&&_NXMO.actif&&_NXMO.actif());
var accent=mort?_NXpal.danger:E.fond;
var serif="var(--serif)";

function ico(d,z){return i("svg",{viewBox:"0 0 24 24",width:z||18,height:z||18,fill:"currentColor","aria-hidden":"true"},i("path",{d:d}));}
function rond(d,lab,onClick,z,plein){
return i("div",{className:plein?"nx-fx":"nx-fx nxmu-rond",role:"button","aria-label":_NXtr(lab),tabIndex:0,onKeyDown:_NXkey,onClick:onClick,
style:plein?{width:z+"px",height:z+"px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",
cursor:"pointer",background:"var(--c)",color:clair?"#f6f1e8":"#17140f",flexShrink:0}
:{width:z+"px",height:z+"px",flexShrink:0}},ico(d,plein?22:19));}
function bascule(lab,on,onClick){
return i("div",{className:"nx-fx nxmu-texte",role:"button","aria-label":_NXtr(lab),"aria-pressed":on?"true":"false",
tabIndex:0,onKeyDown:_NXkey,onClick:onClick,
style:{display:"inline-flex",alignItems:"center",gap:"7px",fontSize:"12.5px",color:on?"var(--c)":null}},
i("span",{"aria-hidden":"true",style:{width:"6px",height:"6px",borderRadius:"50%",flexShrink:0,
background:on?accent:"transparent",border:"1px solid "+(on?accent:"var(--f)")}}),_NXtr(lab));}

// La pochette : une etiquette d imprimeur, et le disque qui en sort quand
// la piste joue. Il y rentre a la pause, et s arrete de tourner la ou il est.
function pochette(){
var z=212;
return i("div",{style:{position:"relative",width:z+"px",height:z+"px",flexShrink:0,marginRight:"140px",marginTop:"14px"}},
i("div",{className:"nxmu-disque","aria-hidden":"true",style:{position:"absolute",top:"8px",left:"8px",
width:(z-16)+"px",height:(z-16)+"px",transform:"translateX("+(_NXM.playing?"42%":"7%")+")"}},
i("div",{className:"nxmu-sillons",style:{position:"relative",width:"100%",height:"100%",borderRadius:"50%",
background:"repeating-radial-gradient(circle at 50% 50%,#141210 0 1.4px,#24211d 1.4px 2.8px)",
boxShadow:"0 10px 30px rgba(0,0,0,.5), inset 0 0 0 1px rgba(239,232,220,.16), inset 0 0 0 7px #121110, inset 0 0 0 8px rgba(239,232,220,.08)"}},
i("div",{style:{position:"absolute",left:"50%",top:"50%",width:"36%",height:"36%",marginLeft:"-18%",marginTop:"-18%",
borderRadius:"50%",background:accent,boxShadow:"inset 0 0 0 5px "+_NXM.rgba(E,0.55)}}),
i("div",{style:{position:"absolute",left:"50%",top:"50%",width:"7px",height:"7px",marginLeft:"-3.5px",marginTop:"-3.5px",
borderRadius:"50%",background:"#0f0e0c"}}),
i("div",{style:{position:"absolute",left:"20%",top:"10%",width:"30%",height:"18%",borderRadius:"50%",
background:"linear-gradient(160deg,rgba(255,255,255,.10),transparent)",transform:"rotate(-24deg)"}}))),
i("div",{key:"s"+_NXM.idx,className:"nxmu-neuve",style:{position:"absolute",inset:0,background:mort?"#3a2a2a":E.fond,color:mort?"#f4ede1":E.encre,
padding:"16px 16px 15px",boxSizing:"border-box",display:"flex",flexDirection:"column",
boxShadow:"0 24px 50px rgba(0,0,0,.42), inset 0 0 0 1px rgba(0,0,0,.08)"}},
i("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"baseline",fontSize:"11px",fontWeight:"700"}},
i("span",{style:{fontVariantNumeric:"tabular-nums"}},_NXM.face(_NXM.idx,n)),
i("span",{style:{fontWeight:"600",opacity:.7}},"Nexium")),
i("div",{style:{flex:1}}),
i("div",{key:"p"+_NXM.idx,"data-nx-rise":"1",style:{fontSize:"22px",fontWeight:"800",lineHeight:1.02,
textTransform:"uppercase",letterSpacing:"-.01em",wordBreak:"break-word",
display:"-webkit-box",WebkitLineClamp:4,WebkitBoxOrient:"vertical",overflow:"hidden"}},_NXtr(D.t)),
D.a?i("div",{style:{fontSize:"11.5px",fontWeight:"600",marginTop:"7px",opacity:.78,
overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(D.a)):null),
i(_NXMusicBras,null));}

function volume(){
var v=cfg.vol,sourd=v===0;
return i("div",{style:{display:"flex",alignItems:"center",gap:"9px",marginLeft:"auto"}},
i("div",{className:"nx-fx nxmu-rond",role:"button","aria-label":sourd?_T("Retablir le son"):_T("Couper le son"),
"aria-pressed":sourd?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){try{if(sourd){_NXM.setVol(avantMuet||0.7);setAvantMuet(null);}
else{setAvantMuet(v);_NXM.setVol(0);}}catch(_){}},
style:{width:"28px",height:"28px",color:sourd?_NXpal.warn:null}},
ico(sourd?"M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.8 8.8 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"
:"M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z",16)),
i("div",{id:"nx-m-vol",className:"nx-fx",role:"slider","aria-label":_T("Volume"),"aria-valuemin":0,"aria-valuemax":100,
"aria-valuenow":Math.round(v*100),tabIndex:0,
onKeyDown:function(e){try{
if(e.key==="ArrowRight"){e.preventDefault();_NXM.setVol(v+0.05);setAvantMuet(null);}
if(e.key==="ArrowLeft"){e.preventDefault();_NXM.setVol(v-0.05);setAvantMuet(null);}}catch(_){}},
onMouseDown:function(e){try{var r=e.currentTarget.getBoundingClientRect();
_NXM.setVol((e.clientX-r.left)/r.width);setAvantMuet(null);setGlisseVol(true);}catch(_){}},
style:{position:"relative",width:"104px",height:"18px",display:"flex",alignItems:"center",
cursor:glisseVol?"grabbing":"pointer",userSelect:"none"}},
i("div",{style:{position:"absolute",left:0,right:0,height:"2px",background:"var(--l2)"}}),
i("div",{style:{position:"absolute",left:0,height:"2px",width:(v*100)+"%",background:sourd?"var(--f)":"var(--c)"}})),
i("span",{style:{fontSize:"11.5px",color:"var(--m)",width:"26px",textAlign:"right",fontVariantNumeric:"tabular-nums"}},
_NXtr(Math.round(v*100))));}

function platine(){
var apres=null;
if(n&&!cfg.repeat&&!cfg.shuffle)apres=pistes[(_NXM.idx+1)%n];
var dodo=_NXM.dodoRestant();
var etat=mort?_T("Source injoignable"):(_NXM.playing?_T("En lecture"):_T("En pause"));
return i("div",{className:"nxmu-scene"+(_NXM.playing?" nxmu-joue":""),
style:{display:"flex",alignItems:"center",gap:"40px",flexWrap:"wrap",padding:"4px 0 34px"}},
pochette(),
i("div",{style:{flex:"1 1 260px",minWidth:"240px"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"9px",fontSize:"12.5px",color:mort?_NXpal.danger:"var(--m)"}},
mort?null:i("span",{className:"nxmu-eq","aria-hidden":"true",style:{color:accent}},i("i"),i("i"),i("i")),
i("span",null,etat),
i("span",{style:{color:"var(--f)"}},"·"),
i("span",{style:{fontVariantNumeric:"tabular-nums"}},_T("Face")+" "+_NXM.face(_NXM.idx,n).charAt(0)+", "+_NXtr(_NXM.idx+1)+" "+_T("sur")+" "+_NXtr(n))),
i("div",{key:"t"+_NXM.idx,"data-nx-rise":"1",style:{fontFamily:serif,fontSize:"40px",lineHeight:1.04,
fontWeight:"400",letterSpacing:"-.015em",marginTop:"12px",wordBreak:"break-word",color:"var(--c)"}},_NXtr(D.t)),
D.a?i("div",{style:{fontSize:"15px",fontWeight:"500",color:"var(--m)",marginTop:"8px"}},_NXtr(D.a)):null,
i(_NXMusicTemps,{e:E,mort:mort}),
i("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginTop:"14px"}},
rond(_NXM.SVG.prev,_T("Piste precedente"),function(){_NXM.prev();},38),
rond(_NXM.playing?_NXM.SVG.pause:_NXM.SVG.play,_NXM.playing?_T("Pause"):_T("Lecture"),function(){_NXM.toggle();},52,true),
rond(_NXM.SVG.next,_T("Piste suivante"),function(){_NXM.next();},38)),
i("div",{style:{display:"flex",alignItems:"center",gap:"18px",marginTop:"14px",flexWrap:"wrap"}},
bascule(_T("Aléatoire"),cfg.shuffle,function(){_NXM.setFlag("shuffle");}),
bascule(_T("Boucle"),cfg.repeat,function(){_NXM.setFlag("repeat");}),
volume()),
(apres||dodo)?i("div",{style:{marginTop:"16px",fontSize:"12.5px",color:"var(--m)",display:"flex",gap:"14px",flexWrap:"wrap"}},
apres?i("span",{style:{minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:"320px"}},
_T("Ensuite")+" : ",i("span",{style:{color:"var(--c)"}},_NXtr(_NXM.decoupe(apres.title).t))):null,
dodo?i("span",{style:{color:_NXpal.warn}},_T("Arrêt dans")+" "+_NXtr(Math.ceil(dodo/60))+" min"):null):null));}

function ligne(k){
var t=pistes[k],d=_NXM.decoupe(t.title),actif=k===_NXM.idx,ko=!!_NXM.err[k];
var et=_NXM.etiquette(t.title);
return i("div",{key:k,id:actif?"nx-m-actif":null,className:"nx-fx nxmu-ligne",role:"button",
"aria-label":_NXtr(t.title),"aria-current":actif?"true":null,tabIndex:0,onKeyDown:_NXkey,
onClick:function(){if(actif)_NXM.toggle();else _NXM.load(k);},
style:{background:actif?"var(--sel)":null}},
i("span",{style:{width:"24px",flexShrink:0,fontSize:"11.5px",fontVariantNumeric:"tabular-nums",
color:actif?et.fond:"var(--f)",display:"inline-flex",alignItems:"center"}},
actif&&!ko?i("span",{className:"nxmu-eq","aria-hidden":"true",style:{height:"10px"}},i("i"),i("i"),i("i"))
:_NXM.face(k,n)),
i("span",{"aria-hidden":"true",style:{width:"8px",height:"8px",flexShrink:0,alignSelf:"center",
background:ko?"transparent":et.fond,border:ko?"1px solid "+_NXpal.danger:"none"}}),
i("span",{style:{flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},
i("span",{className:"nxmu-titre",style:{fontSize:"14px",color:ko?"var(--f)":(actif?"var(--c)":"var(--c2)"),
fontWeight:actif?"600":"400",textDecoration:ko?"line-through":"none"}},_NXtr(d.t)),
d.a?i("span",{style:{fontSize:"12.5px",color:"var(--m)"}}," — "+_NXtr(d.a)):null),
ko?i("span",{style:{fontSize:"11.5px",color:_NXpal.danger,flexShrink:0}},_T("injoignable")):null);}

function faces(L){
if(n<=5||L.length<n)return i("div",null,L.map(ligne));
var m=Math.ceil(n/2),A=[],B=[];
for(var a=0;a<L.length;a++)(L[a]<m?A:B).push(L[a]);
function colonne(nom,K){return i("div",{style:{flex:"1 1 300px",minWidth:"260px"}},
i("div",{style:{display:"flex",alignItems:"baseline",justifyContent:"space-between",paddingBottom:"8px",
marginBottom:"6px",borderBottom:"1px solid var(--l)"}},
i("span",{style:{fontFamily:serif,fontStyle:"italic",fontSize:"17px",color:"var(--c)"}},_T("Face")+" "+nom),
i("span",{style:{fontSize:"11.5px",color:"var(--f)"}},_NXtr(K.length)+" "+_T("titres"))),
K.map(ligne));}
return i("div",{style:{display:"flex",gap:"36px",flexWrap:"wrap"}},colonne("A",A),colonne("B",B));}

function etatVide(titre,texte,ton){
return i("div",{style:{padding:"40px 0 30px",maxWidth:"460px"}},
i("div",{style:{fontFamily:serif,fontSize:"30px",lineHeight:1.15,color:ton||"var(--c)"}},_NXtr(titre)),
i("div",{style:{fontSize:"13.5px",color:"var(--m)",lineHeight:1.65,marginTop:"12px"}},_NXtr(texte)),
i("div",{className:"nx-fx",role:"button","aria-label":_NXM.remoteBusy?_T("Chargement"):_T("Recharger la collection"),
tabIndex:0,onKeyDown:_NXkey,onClick:function(){if(_NXM.remoteBusy)return;_NXM.remoteLoaded=false;_NXM.loadRemote();},
style:{display:"inline-flex",marginTop:"20px",padding:"10px 18px",borderRadius:"99px",cursor:"pointer",
background:"var(--c)",color:clair?"#f6f1e8":"#17140f",fontSize:"13px",fontWeight:"600"}},
_NXM.remoteBusy?_T("Chargement en cours"):_T("Recharger la collection")));}

function ecoute(){
if(!n){
if(_NXM.remoteBusy&&!_NXM.remoteLoaded)return etatVide(_T("La collection arrive."),
_T("Nexium lit la liste des titres sur le dépôt. Ca prend une seconde."));
if(_NXM.remoteErr)return etatVide(_T("Collection injoignable"),
_T("La liste des titres n a pas pu être lue sur le dépôt. Vérifie ta connexion puis recharge : rien n est perdu."),_NXpal.warn);
return etatVide(_T("Aucun titre pour l instant."),
_T("Le fichier du dépôt est vide. Les titres apparaîtront ici dès qu ils y seront ajoutés."));}
var v=(q||"").trim().toLowerCase();
var L=[];for(var a=0;a<n;a++){if(!v||String(pistes[a].title||"").toLowerCase().indexOf(v)>=0)L.push(a);}
var casses=0;for(var z=0;z<n;z++)if(_NXM.err[z])casses++;
return i("div",null,
platine(),
i("div",{style:{display:"flex",alignItems:"center",gap:"18px",flexWrap:"wrap",padding:"14px 0",
borderTop:"1px solid var(--l)",marginBottom:"12px"}},
i("div",{className:"nx-fx"+(_NXM.playing?"":" nxed-pouls"),role:"button","aria-label":_T("Tout lire"),tabIndex:0,onKeyDown:_NXkey,
onClick:function(){try{if(cfg.shuffle)_NXM.setFlag("shuffle");_NXM.load(0);}catch(_){}},
style:{display:"inline-flex",alignItems:"center",gap:"7px",padding:"8px 16px",borderRadius:"99px",cursor:"pointer",
background:"var(--c)",color:clair?"#f6f1e8":"#17140f",fontSize:"12.5px",fontWeight:"600"}},ico(_NXM.SVG.play,14),_T("Tout lire")),
i("div",{className:"nx-fx nxmu-texte",role:"button","aria-label":cfg.shuffle?_T("Ordre d origine"):_T("Mélanger"),
tabIndex:0,onKeyDown:_NXkey,onClick:function(){try{_NXM.setFlag("shuffle");if(_NXM.cfg.shuffle)_NXM.next();}catch(_){}},
style:{fontSize:"12.5px"}},cfg.shuffle?_T("Ordre d origine"):_T("Mélanger")),
i("div",{className:"nx-fx nxmu-texte",role:"button","aria-label":_T("Mini-lecteur"),"aria-pressed":cfg.popup?"true":"false",
tabIndex:0,onKeyDown:_NXkey,onClick:function(){_NXM.setPopup(!cfg.popup);},
style:{fontSize:"12.5px",color:cfg.popup?"var(--c)":null}},cfg.popup?_T("Mini-lecteur affiché"):_T("Mini-lecteur")),
i("div",{style:{flex:1}}),
casses?i("span",{style:{fontSize:"12px",color:_NXpal.warn}},_NXtr(casses)+" "+_T("titre(s) injoignable(s)")):null,
i("div",{className:"nx-fx nxmu-rond",role:"button","aria-label":_T("Recharger la collection"),tabIndex:0,onKeyDown:_NXkey,
onClick:function(){if(_NXM.remoteBusy)return;_NXM.remoteLoaded=false;_NXM.loadRemote();},
style:{width:"30px",height:"30px"}},ico("M17.65 6.35A8 8 0 1 0 19.73 14h-2.08A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",15))),
n>7?i("input",{className:"nxmu-champ",value:q,onChange:function(e){setQ(e.target.value);},
placeholder:_T("Chercher un titre ou un artiste"),spellCheck:false,"aria-label":_T("Chercher un titre ou un artiste"),
style:{width:"100%",boxSizing:"border-box",background:"transparent",border:"none",borderBottom:"1px solid var(--l)",
padding:"9px 0",marginBottom:"14px",color:"var(--c)",fontSize:"13.5px",outline:"none",fontFamily:"inherit"}}):null,
L.length?faces(L):i("div",{style:{fontSize:"13px",color:"var(--m)",padding:"10px 0"}},_T("Aucun titre ne correspond.")));}

function reglages(){
var dodo=_NXM.dodoRestant();
function section(titre,texte,corps){
return i("div",{style:{padding:"22px 0",borderTop:"1px solid var(--l)"}},
i("div",{style:{fontFamily:serif,fontSize:"20px",color:"var(--c)"}},_NXtr(titre)),
texte?i("div",{style:{fontSize:"13px",color:"var(--m)",lineHeight:1.6,marginTop:"6px",maxWidth:"520px"}},_NXtr(texte)):null,
i("div",{style:{marginTop:"14px"}},corps));}
function inter(lab,desc,on,onClick){
return i("div",{className:"nx-fx",role:"button","aria-label":_NXtr(lab),"aria-pressed":on?"true":"false",
tabIndex:0,onKeyDown:_NXkey,onClick:onClick,
style:{display:"flex",alignItems:"flex-start",gap:"16px",padding:"10px 0",cursor:"pointer"}},
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"14px",color:on?"var(--c)":"var(--m)"}},_NXtr(lab)),
i("div",{style:{fontSize:"12.5px",color:"var(--f)",marginTop:"3px",lineHeight:1.55}},_NXtr(desc))),
i("div",{"aria-hidden":"true",style:{width:"34px",height:"20px",borderRadius:"10px",flexShrink:0,marginTop:"1px",
background:on?"var(--c)":"transparent",border:"1px solid "+(on?"var(--c)":"var(--f)"),transition:"background-color .2s ease"}},
i("div",{style:{width:"14px",height:"14px",borderRadius:"50%",margin:"2px",background:on?(clair?"#f6f1e8":"#17140f"):"var(--f)",
transform:on?"translateX(14px)":"none",transition:"transform .2s cubic-bezier(.2,.8,.2,1)"}})));}
function choix(lab,on,onClick,cle){
return i("div",{key:cle,className:"nx-fx",role:"button","aria-label":_NXtr(lab),"aria-pressed":on?"true":"false",
tabIndex:0,onKeyDown:_NXkey,onClick:onClick,
style:{padding:"7px 14px",borderRadius:"99px",cursor:"pointer",fontSize:"12.5px",fontVariantNumeric:"tabular-nums",
background:on?"var(--c)":"transparent",color:on?(clair?"#f6f1e8":"#17140f"):"var(--m)",
border:"1px solid "+(on?"var(--c)":"var(--l2)")}},_NXtr(lab));}
return i("div",null,
section(_T("Minuterie d arrêt"),dodo?(_T("La lecture s arrêtera dans")+" "+Math.ceil(dodo/60)+" min. "+_T("Choisis une autre durée pour la repousser."))
:_T("La lecture s arrête toute seule au bout du temps choisi."),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},
_NXM.MINUTERIES.map(function(m){var on=dodo>0&&Math.abs(dodo-m*60)<90;
return choix(m+" min",on,function(){_NXM.minuterie(m);},m);}),
dodo?choix(_T("Annuler"),false,function(){_NXM.minuterie(0);},"x"):null)),
section(_T("Lecture"),null,i("div",null,
inter(_T("Reprendre où je m étais arrêté"),_T("La position dans le titre est gardée, même après avoir fermé Discord."),
cfg.reprise,function(){_NXM.setFlag("reprise");}),
inter(_T("Touches média du clavier"),_T("Lecture, pause et titre suivant au clavier, et le titre s affiche dans le panneau de Windows."),
cfg.medias,function(){_NXM.setFlag("medias");try{_NXM.mediaSession();}catch(_){}}),
inter(_T("Lecture aléatoire"),_T("Chaque titre passe une fois avant qu un autre ne repasse."),
cfg.shuffle,function(){_NXM.setFlag("shuffle");}),
inter(_T("Répéter le titre"),_T("Le titre en cours recommence indéfiniment."),
cfg.repeat,function(){_NXM.setFlag("repeat");}))),
section(_T("Mini-lecteur"),_T("Une petite fenêtre qui reste par-dessus Discord. Elle se déplace à la souris."),i("div",null,
inter(_T("Afficher le mini-lecteur"),_T("Il apparaît dès qu un titre démarre."),
cfg.popup,function(){_NXM.setPopup(!cfg.popup);}),
inter(_T("Mode compact"),_T("Seulement le titre, la lecture et le titre suivant."),
cfg.compact,function(){_NXM.setFlag("compact");try{if(_NXM.ui&&_NXM.ui.w){_NXM.ui=null;
var el=document.getElementById("nx-miniplayer");if(el&&el.parentNode)el.parentNode.removeChild(el);
if(cfg.popup){_NXM.buildUI();_NXM.showUI();}}}catch(_){}}),
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",marginTop:"12px"}},
i("span",{style:{fontSize:"13px",color:"var(--m)",marginRight:"6px"}},_T("Opacité")),
[0.5,0.7,0.85,1].map(function(o){var on=Math.abs(cfg.opacite-o)<0.02;
return choix(Math.round(o*100)+" %",on,function(){cfg.opacite=o;_NXM.save();
try{if(_NXM.ui&&_NXM.ui.w)_NXM.ui.w.style.opacity=String(o);}catch(_){}_NXM.notify();},o);}),
i("div",{className:"nx-fx nxmu-texte",role:"button","aria-label":_T("Recentrer la fenêtre"),tabIndex:0,onKeyDown:_NXkey,
onClick:function(){try{_NXM.resetPos();}catch(_){}},style:{fontSize:"12.5px",marginLeft:"10px"}},_T("Recentrer la fenêtre"))))),
i("div",{style:{padding:"20px 0 0",borderTop:"1px solid var(--l)",fontSize:"12.5px",color:"var(--f)",lineHeight:1.65,maxWidth:"560px"}},
_T("La lecture se fait en direct depuis les adresses de la liste. Rien n est téléversé ni envoyé : le volume, la position et tes choix restent sur cette machine.")));}

function onglet(k,lab){var on=tab===k;
return i("div",{key:k,className:"nx-fx nxmu-texte",role:"tab","aria-selected":on?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){if(!on){setTab(k);setQ("");}},
style:{fontSize:"13.5px",paddingBottom:"6px",color:on?"var(--c)":null,borderBottom:"1px solid "+(on?"var(--c)":"transparent")}},_NXtr(lab));}

var aide=null;try{if(_NXFX.Aide&&window._NXAIDES&&_NXAIDES["Nexium Music"])aide=i(_NXFX.Aide,{aide:_NXtr(_NXAIDES["Nexium Music"]),col:accent});}catch(_){}
function onglet(k,lab){var on=tab===k;
return i("div",{key:k,className:"nx-fx nxmu-texte",role:"tab","aria-selected":on?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){if(!on){setTab(k);setQ("");}},
style:{fontSize:"13.5px",paddingBottom:"6px",color:on?"var(--c)":null,borderBottom:"2px solid "+(on?accent:"transparent")}},_NXtr(lab));}
return i(Kr,null,_NXED.racine({acc:accent,max:820},
i("div",{className:"nxmu"+(clair?" nxmu-clair":"")+(calme?" nxmu-calme":"")},
i("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:"18px",flexWrap:"wrap",
paddingBottom:"14px",borderBottom:"1px solid var(--l)",marginBottom:"30px"}},
i("div",null,
i("div",{style:{fontSize:"12.5px",color:"var(--m)"}},_T("Lecteur")),
i("div",{style:{fontFamily:serif,fontSize:"36px",lineHeight:1.1,marginTop:"4px",color:"var(--c)"}},_NXtr("Nexium Music")),
i("div",{style:{fontSize:"13px",color:"var(--m)",marginTop:"6px"}},
n?(_NXtr(n)+" "+_T("titres, lus en direct depuis le dépôt. Rien n’est téléversé ni envoyé.")):_T("Les titres sont lus en direct depuis le dépôt.")),
aide?i("div",{style:{marginTop:"12px"}},aide):null),
i("div",{role:"tablist",style:{display:"flex",gap:"22px",alignItems:"flex-end"}},
onglet("ecoute",_T("Écoute")),onglet("reglages",_T("Réglages")))),
i("div",{key:tab},tab==="ecoute"?ecoute():reglages()),
_NXfoot(_NXtr("Nexium Music · lecture directe, aucune donnée envoyée")))));
}

var _NXcommon=function(){var V=window.Vencord||{},WP=V.Webpack||{},C=WP.Common||{};if(_NXcommon._c&&_NXcommon._wp===WP)return _NXcommon._c;var sc={};var o={WP:WP,C:C,store:function(n){try{if(sc[n]!==undefined)return sc[n];var s=C[n]||(WP.findStore&&WP.findStore(n))||null;if(s)sc[n]=s;return s;}catch(_){return null;}}};_NXcommon._wp=WP;_NXcommon._c=o;return o;};
// Copier, pour de vrai.
//
// navigator.clipboard.writeText echoue dans ce client : Electron refuse la
// permission presse-papier du web sans gestionnaire explicite, et l appel
// reste en attente sans jamais lever. Le pont de Discord est la seule voie
// fiable ; le champ cache n est qu un dernier recours.
//
// La promesse rend un booleen : l interface ne doit pas annoncer une copie
// qui n a pas eu lieu.
var _NXpresseSecours=function(x){try{
if(typeof document==="undefined"||!document.body)return false;
var z=document.createElement("textarea");
z.value=x;
z.setAttribute("readonly","");
z.style.cssText="position:fixed;left:-9999px;top:0;opacity:0;";
document.body.appendChild(z);
try{z.select();z.setSelectionRange(0,x.length);}catch(_){}
var ok=false;
try{ok=!!document.execCommand("copy");}catch(_){ok=false;}
try{document.body.removeChild(z);}catch(_){}
return ok;}catch(_){return false;}};

var _NXpresse=function(t){try{
var x=String(t==null?"":t);
if(!x)return Promise.resolve(false);
try{if(window.DiscordNative&&DiscordNative.clipboard&&DiscordNative.clipboard.copy){
DiscordNative.clipboard.copy(x);
return Promise.resolve(true);}}catch(_){}
try{if(navigator.clipboard&&navigator.clipboard.writeText)
return navigator.clipboard.writeText(x).then(function(){return true;},
function(){return _NXpresseSecours(x);});}catch(_){}
return Promise.resolve(_NXpresseSecours(x));}catch(_){return Promise.resolve(false);}};

// Ecrire a quelqu un par son pseudo.
//
// Discord n ouvre une conversation qu a partir d un identifiant. On cherche
// donc le compte parmi ceux que le client connait deja. S il n y est pas, on
// ne fait pas semblant : on copie le pseudo et on dit quoi faire.
var _NXcontact=function(pseudo){try{
var p=String(pseudo||"").toLowerCase();
var C=_NXcommon();
var U=C.store("UserStore");
var id=null;
try{
var tous=(U&&U.getUsers)?U.getUsers():{};
for(var k in tous){var u=tous[k];
if(u&&String(u.username||"").toLowerCase()===p){id=u.id;break;}}}catch(_){}
if(id){
var A=C.WP&&C.WP.findByProps&&C.WP.findByProps("openPrivateChannel");
if(A&&A.openPrivateChannel){A.openPrivateChannel(id);return {ok:true,ouvert:true};}}
_NXpresse(pseudo);
return {ok:true,ouvert:false};}catch(_){return {ok:false};}};

var _NXguildOf=function(cid){try{if(!cid)return null;var CS=_NXcommon().store("ChannelStore");var ch=CS&&CS.getChannel&&CS.getChannel(cid);return ch&&ch.guild_id?ch.guild_id:null;}catch(_){return null;}};
var _NXguildName=function(gid){try{if(!gid)return"Inconnu";var GS=_NXcommon().store("GuildStore");var g=GS&&GS.getGuild&&GS.getGuild(gid);return g&&g.name?g.name:"Serveur "+String(gid).slice(0,6);}catch(_){return"Serveur";}};
var _NXchanName=function(cid){try{if(!cid)return"Salon";var CS=_NXcommon().store("ChannelStore");var ch=CS&&CS.getChannel&&CS.getChannel(cid);if(!ch)return"Salon "+String(cid).slice(0,6);if(ch.guild_id)return"#"+(ch.name||String(cid).slice(0,6));return ch.name||"Message privé";}catch(_){return"Salon";}};

var _NXf={disp:"var(--font-display),'Bricolage Grotesque','gg sans',sans-serif",mono:"var(--font-code),'JetBrains Mono','SF Mono',ui-monospace,monospace"};
var _NXpal={bg:"#08080a",panel:"#0b0b0c",inset:"#0e0e10",raise:"#141416",line:"#161618",hair:"#212125",edge:"#2a2a30",faint:"#34343a",mute:"#4a4a52",dim:"#5b5b63",soft:"#6c6c74",sub:"#8a8a92",mid:"#a6a6ac",pale:"#c9c9d2",txt:"#f4f4f5",acc:"#e8e8ea",ink:"#0a0a0a",ok:"#8fd19e",okSoft:"#a9cdb4",warn:"#e6c48a",warnSoft:"#d8d2a8",danger:"#e79a9a",dangerSoft:"#d6aeae",red:"#d6484a",info:"#8fb4ea",mauve:"#c7a2ee",cyan:"#7fd3c4",lime:"#c3d98a",rose:"#e9a3c1",light:false};
try{window._NXpal=_NXpal;}catch(_){}
var _NXtype={xs:"10px",sm:"11.5px",md:"12.5px",lg:"14px",xl:"17px",h2:"22px",h1:"30px"};
var _NXrad={sm:"9px",md:"12px",lg:"18px",pill:"99px"};
var _NXsp={0:"0",1:"4px",2:"8px",3:"12px",4:"16px",5:"20px",6:"24px",8:"32px"};
try{window._NXtype=_NXtype;window._NXrad=_NXrad;window._NXsp=_NXsp;}catch(_){}
