var _NXED=window._NXED||(window._NXED={});
if(!_NXED.boot){try{_NXED.boot=true;
// v204 : la mise en page commune de Music, Stats, Reseau et Outils. Des titres
// en serif, des filets fins plutot que des boites, des chiffres alignes -- et
// le mouvement de la page Abonnement : une aurore qui derive dans le bandeau,
// un objet qui flotte et qu un reflet traverse, des cartes qui se levent au
// survol, une action principale qui bat doucement. Tout ce qui bouge est une
// transformation composee, et rien ne bouge si les animations sont coupees.
_NXED.SERIF="'Palatino Linotype','Book Antiqua',Palatino,Georgia,serif";
_NXED.CSS=".nxed{--c:#efe8dc;--m:#978f83;--f:#5f594f;--l:rgba(239,232,220,.10);--l2:rgba(239,232,220,.2);"+
"--c2:rgba(239,232,220,.84);--sel:rgba(239,232,220,.05);--fond:rgba(239,232,220,.025);"+
"--serif:"+_NXED.SERIF+";position:relative;color:var(--c);}"+
".nxed.nxed-clair{--c:#1d1a16;--m:#6b645a;--f:#9a9388;--l:rgba(29,26,22,.12);--l2:rgba(29,26,22,.24);"+
"--c2:rgba(29,26,22,.84);--sel:rgba(29,26,22,.05);--fond:rgba(29,26,22,.03);}"+
".nxed-hero{position:relative;overflow:hidden;border-radius:26px;border:1px solid var(--l);"+
"background:linear-gradient(160deg,var(--fond),transparent 70%);padding:28px 30px 0;margin-bottom:30px;}"+
".nxed-aurore{position:absolute;inset:-35%;pointer-events:none;will-change:transform;}"+
".nxed-anim .nxed-aurore{animation:nxedDerive 16s ease-in-out infinite alternate;}"+
"@keyframes nxedDerive{0%{transform:translate3d(-4%,-2%,0) rotate(0deg)}100%{transform:translate3d(4%,3%,0) rotate(7deg)}}"+
".nxed-reflet{position:absolute;inset:0;overflow:hidden;pointer-events:none;border-radius:inherit;}"+
".nxed-reflet::after{content:'';position:absolute;top:-10%;bottom:-10%;left:0;width:46%;"+
"background:linear-gradient(112deg,transparent,rgba(255,255,255,.17),transparent);transform:translate3d(-130%,0,0);}"+
".nxed-anim .nxed-reflet::after{animation:nxedReflet 6s ease-in-out infinite;}"+
"@keyframes nxedReflet{0%{transform:translate3d(-130%,0,0)}55%,100%{transform:translate3d(280%,0,0)}}"+
".nxed-anim .nxed-flotte{animation:nxedFlotte 7s ease-in-out infinite;}"+
"@keyframes nxedFlotte{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-9px) rotate(-2deg)}}"+
".nxed-degrade{background:linear-gradient(92deg,var(--c) 12%,var(--acc) 58%,var(--acc2));"+
"-webkit-background-clip:text;background-clip:text;color:transparent;}"+
".nxed-carte{transition:transform .28s cubic-bezier(.22,1,.36,1),border-color .28s ease,background-color .28s ease;}"+
".nxed-anim .nxed-carte:hover{transform:translateY(-4px);border-color:var(--l2);}"+
".nxed-anim .nxed-pouls{animation:nxedPouls 2.4s ease-in-out infinite;}"+
"@keyframes nxedPouls{0%,100%{box-shadow:0 0 0 0 var(--acc-ombre)}50%{box-shadow:0 0 0 8px transparent}}"+
".nxed-anim .nxed-monte>*{animation:nxedMonte .62s cubic-bezier(.22,1,.36,1) both;}"+
".nxed-anim .nxed-monte>*:nth-child(2){animation-delay:.05s}.nxed-anim .nxed-monte>*:nth-child(3){animation-delay:.1s}"+
".nxed-anim .nxed-monte>*:nth-child(4){animation-delay:.15s}.nxed-anim .nxed-monte>*:nth-child(5){animation-delay:.2s}"+
".nxed-anim .nxed-monte>*:nth-child(6){animation-delay:.25s}.nxed-anim .nxed-monte>*:nth-child(n+7){animation-delay:.3s}"+
"@keyframes nxedMonte{from{transform:translateY(12px);opacity:0}to{transform:none;opacity:1}}"+
".nxed-ligne{transition:background-color .18s ease,transform .2s cubic-bezier(.22,1,.36,1);border-radius:10px;}"+
".nxed-ligne:hover{background:var(--sel);}"+
".nxed-anim .nxed-ligne:hover{transform:translateX(3px);}"+
".nxed-lien{cursor:pointer;color:var(--m);transition:color .18s ease;}"+
".nxed-lien:hover{color:var(--c);}"+
".nxed-onglet{cursor:pointer;color:var(--m);transition:color .18s ease;}"+
".nxed-onglet:hover{color:var(--c);}"+
".nxed-barre{transform-origin:left center;transition:transform .8s cubic-bezier(.22,1,.36,1);}"+
".nxed-champ::placeholder{color:var(--f);}"+
"@media (prefers-reduced-motion: reduce){.nxed *{animation:none!important;transition:none!important;}}";
_NXED.style=function(){try{
if(typeof document==="undefined"||!document.head||!document.createElement)return false;
if(document.getElementById&&document.getElementById("nx-ed-style"))return true;
var s=document.createElement("style");s.id="nx-ed-style";s.textContent=_NXED.CSS;
document.head.appendChild(s);return true;}catch(_){return false;}};
// Une feuille de style propre a une page, posee une seule fois.
_NXED.feuille=function(id,css){try{
if(typeof document==="undefined"||!document.head||!document.createElement)return false;
if(document.getElementById&&document.getElementById(id))return true;
var s=document.createElement("style");s.id=id;s.textContent=css;document.head.appendChild(s);return true;}catch(_){return false;}};
_NXED.anime=function(){try{return !!(window._NXMO&&_NXMO.actif&&_NXMO.actif());}catch(_){return false;}};
_NXED.rgb=function(c){try{
var m=String(c).match(/^#([0-9a-f]{6})$/i);
if(!m)return [200,190,255];
var n=parseInt(m[1],16);return [(n>>16)&255,(n>>8)&255,n&255];}catch(_){return [200,190,255];}};
_NXED.a=function(c,a){var r=_NXED.rgb(c);return "rgba("+r[0]+","+r[1]+","+r[2]+","+a+")";};
// La racine d une page : ses couleurs, et la classe qui autorise le mouvement.
_NXED.racine=function(o){
var enfants=Array.prototype.slice.call(arguments,1);
try{_NXED.style();}catch(_){}
var acc=o.acc||"#bda9ff",acc2=o.acc2||acc;
var st={maxWidth:(o.max||780)+"px",margin:"0 auto"};
st["--acc"]=acc;st["--acc2"]=acc2;st["--acc-ombre"]=_NXED.a(acc,0.4);
return i.apply(null,["div",{className:"nxed"+((_NXpal&&_NXpal.light)?" nxed-clair":"")+(_NXED.anime()?" nxed-anim":""),style:st}].concat(enfants));};
// Le bandeau : l aurore aux couleurs de la page, le titre, l aide, les onglets,
// et a droite l objet qui flotte -- toujours fait de chiffres reels.
_NXED.tete=function(o){
var acc=o.acc||"#bda9ff",acc2=o.acc2||acc;
var aide=null;
try{if(_NXFX.Aide&&window._NXAIDES&&_NXAIDES[o.titre])aide=i(_NXFX.Aide,{aide:_NXtr(_NXAIDES[o.titre]),col:acc});}catch(_){}
return i("div",{className:"nxed-hero"},
i("div",{className:"nxed-aurore","aria-hidden":"true",style:{background:
"radial-gradient(38% 48% at 18% 30%,"+_NXED.a(acc,0.34)+",transparent 62%),"+
"radial-gradient(34% 44% at 82% 18%,"+_NXED.a(acc2,0.28)+",transparent 62%),"+
"radial-gradient(44% 52% at 62% 92%,"+_NXED.a(acc,0.16)+",transparent 62%)"}}),
i("div",{style:{position:"relative",display:"flex",gap:"24px",alignItems:"center",flexWrap:"wrap"}},
i("div",{style:{flex:"1 1 320px",minWidth:"260px",paddingBottom:"6px"}},
i("div",{style:{fontSize:"12.5px",color:"var(--m)",display:"flex",alignItems:"center",gap:"8px"}},
i("span",{"aria-hidden":"true",style:{width:"7px",height:"7px",borderRadius:"50%",background:acc}}),_NXtr(o.surtitre||"")),
i("div",{className:"nxed-degrade",style:{fontFamily:"var(--serif)",fontSize:"40px",lineHeight:1.08,marginTop:"8px",
paddingBottom:"4px",letterSpacing:"-.01em"}},_NXtr(o.titre)),
o.texte?i("div",{style:{fontSize:"13.5px",color:"var(--m)",lineHeight:1.65,marginTop:"8px",maxWidth:"470px"}},_NXtr(o.texte)):null,
aide?i("div",{style:{marginTop:"14px"}},aide):null),
o.objet?i("div",{style:{flex:"0 0 auto",padding:"6px 6px 20px"}},o.objet):null),
o.onglets?i("div",{role:"tablist",style:{position:"relative",display:"flex",gap:"26px",flexWrap:"wrap",marginTop:"20px"}},
o.onglets.map(function(t){var on=o.tab===t[0];
return i("div",{key:t[0],className:"nx-fx nxed-onglet",role:"tab","aria-selected":on?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){if(!on&&o.setTab)o.setTab(t[0]);},
style:{fontSize:"13.5px",padding:"0 0 13px",color:on?"var(--c)":null,borderBottom:"2px solid "+(on?acc:"transparent")}},
_NXtr(t[1]),t[2]?i("span",{style:{marginLeft:"7px",fontSize:"11.5px",color:on?acc:"var(--f)",fontVariantNumeric:"tabular-nums"}},_NXtr(t[2])):null);}))
:i("div",{style:{height:"22px"}}));};
// L objet flottant : une carte inclinee, un reflet qui la traverse.
_NXED.objet=function(o){
var acc=o.acc||"#bda9ff";
return i("div",{className:"nxed-flotte",style:{position:"relative",width:(o.l||250)+"px",maxWidth:"100%",borderRadius:"18px",
padding:"18px 20px",boxSizing:"border-box",transform:"rotate(-4deg)",
background:"linear-gradient(150deg,"+_NXED.a(acc,0.16)+",rgba(20,18,16,.92) 58%)",
border:"1px solid "+_NXED.a(acc,0.32),boxShadow:"0 24px 50px rgba(0,0,0,.42)"}},
i("div",{className:"nxed-reflet","aria-hidden":"true"}),
i("div",{style:{position:"relative"}},
i("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",fontSize:"11px",color:"rgba(239,232,220,.62)"}},
i("span",{style:{fontWeight:"700",letterSpacing:".04em"}},"Nexium"),i("span",null,_NXtr(o.coin||""))),
i("div",{style:{fontFamily:"var(--serif)",fontSize:"34px",lineHeight:1.05,color:"#f4ede1",marginTop:"16px",
fontVariantNumeric:"tabular-nums"}},_NXtr(o.valeur)),
i("div",{style:{fontSize:"12.5px",color:"rgba(239,232,220,.72)",marginTop:"4px"}},_NXtr(o.libelle)),
o.pied?i("div",{style:{display:"flex",justifyContent:"space-between",gap:"10px",marginTop:"16px",paddingTop:"10px",
borderTop:"1px solid rgba(239,232,220,.14)",fontSize:"11.5px",color:"rgba(239,232,220,.62)"}},
o.pied.map(function(p,k){return i("span",{key:k},_NXtr(p));})):null));};
_NXED.section=function(titre,texte,corps,droite,cle){
return i("div",{key:cle,style:{padding:"24px 0 6px",borderTop:"1px solid var(--l)"}},
i("div",{style:{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:"14px",flexWrap:"wrap"}},
i("div",{style:{fontFamily:"var(--serif)",fontSize:"22px",color:"var(--c)"}},_NXtr(titre)),
droite||null),
texte?i("div",{style:{fontSize:"13px",color:"var(--m)",lineHeight:1.6,marginTop:"6px",maxWidth:"560px"}},_NXtr(texte)):null,
i("div",{style:{marginTop:"16px",marginBottom:"18px"}},corps));};
// Des chiffres en colonnes, separes par des filets verticaux.
_NXED.chiffres=function(L){
return i("div",{style:{display:"flex",flexWrap:"wrap"}},
L.map(function(o,k){
return i("div",{key:k,style:{flex:"1 1 120px",minWidth:"110px",padding:"4px 18px 8px",
borderLeft:k?"1px solid var(--l)":"none",paddingLeft:k?"18px":"0"}},
i("div",{style:{fontFamily:"var(--serif)",fontSize:o.gros?"40px":"30px",lineHeight:1.05,
color:o.col||"var(--c)",fontVariantNumeric:"tabular-nums"}},_NXtr(o.v)),
i("div",{style:{fontSize:"12.5px",color:"var(--m)",marginTop:"6px"}},_NXtr(o.lab)),
o.sous?i("div",{style:{fontSize:"11.5px",color:o.sousCol||"var(--f)",marginTop:"2px"}},_NXtr(o.sous)):null);}));};
_NXED.nombre=function(v){try{return String(Math.round(v||0)).replace(/\B(?=(\d{3})+(?!\d))/g," ");}catch(_){return String(v);}};
// Le registre : un libelle, des points de conduite, une valeur.
_NXED.registre=function(L){
return i("div",null,L.map(function(o,k){
return i("div",{key:k,style:{display:"flex",alignItems:"baseline",gap:"8px",padding:"7px 0"}},
i("span",{style:{fontSize:"13.5px",color:"var(--c2)",flexShrink:0}},_NXtr(o.lab)),
i("span",{"aria-hidden":"true",style:{flex:1,minWidth:"20px",borderBottom:"1px dotted var(--l2)",transform:"translateY(-4px)"}}),
i("span",{style:{fontSize:"13.5px",color:o.col||"var(--c)",fontVariantNumeric:"tabular-nums",flexShrink:0}},_NXtr(o.v)),
o.sous?i("span",{style:{fontSize:"11.5px",color:"var(--f)",flexShrink:0}},_NXtr(o.sous)):null);}));};
_NXED.lien=function(lab,onClick,on,cle){
return i("div",{key:cle,className:"nx-fx nxed-lien",role:"button","aria-label":_NXtr(lab),
"aria-pressed":on===undefined?null:(on?"true":"false"),tabIndex:0,onKeyDown:_NXkey,onClick:onClick,
style:{fontSize:"12.5px",color:on?"var(--c)":null,borderBottom:on?"1px solid var(--acc)":"1px solid transparent",paddingBottom:"2px"}},_NXtr(lab));};
_NXED.bouton=function(lab,onClick,o){o=o||{};
var fort=!!o.fort;
return i("div",{key:o.cle,className:"nx-fx"+(o.pouls?" nxed-pouls":""),role:"button","aria-label":_NXtr(lab),tabIndex:0,onKeyDown:_NXkey,onClick:onClick,
style:{display:"inline-flex",alignItems:"center",gap:"7px",padding:"9px 17px",borderRadius:"99px",cursor:"pointer",
fontSize:"12.5px",fontWeight:"600",whiteSpace:"nowrap",
background:fort?"var(--acc)":"transparent",color:fort?"#16130f":(o.danger?_NXpal.danger:"var(--c)"),
border:"1px solid "+(fort?"transparent":(o.danger?_NXED.a(_NXpal.danger,0.45):"var(--l2)"))}},_NXtr(lab));};
_NXED.carte=function(corps,o){o=o||{};
return i("div",{key:o.cle,className:"nxed-carte",style:{position:"relative",overflow:"hidden",borderRadius:"18px",
border:"1px solid "+(o.vif?_NXED.a(o.vif,0.4):"var(--l)"),background:o.vif?("linear-gradient(160deg,"+_NXED.a(o.vif,0.09)+",transparent 70%)"):"var(--fond)",
padding:o.pad||"18px 20px",flex:o.flex||null,minWidth:o.min||null}},corps);};
// Une jauge horizontale : une echelle, jamais une largeur.
_NXED.barre=function(f,col,h){f=Math.max(0,Math.min(1,f||0));
return i("div",{style:{height:(h||3)+"px",background:"var(--l)",borderRadius:"99px",overflow:"hidden"}},
i("div",{className:"nxed-barre",style:{height:"100%",background:col||"var(--acc)",borderRadius:"99px",transform:"scaleX("+f+")"}}));};
_NXED.vide=function(titre,texte,action){
return i("div",{style:{padding:"30px 0 22px",maxWidth:"480px"}},
i("div",{style:{fontFamily:"var(--serif)",fontSize:"26px",lineHeight:1.2,color:"var(--c)"}},_NXtr(titre)),
texte?i("div",{style:{fontSize:"13.5px",color:"var(--m)",lineHeight:1.65,marginTop:"10px"}},_NXtr(texte)):null,
action?i("div",{style:{marginTop:"18px"}},action):null);};
// Un interrupteur sur une ligne : le libelle, une phrase, la bascule.
_NXED.inter=function(lab,desc,on,onClick,cle){
return i("div",{key:cle,className:"nx-fx nxed-ligne",role:"button","aria-label":_NXtr(lab),"aria-pressed":on?"true":"false",
tabIndex:0,onKeyDown:_NXkey,onClick:onClick,
style:{display:"flex",alignItems:"flex-start",gap:"16px",padding:"11px 10px",margin:"0 -10px",cursor:"pointer"}},
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"14px",color:on?"var(--c)":"var(--m)"}},_NXtr(lab)),
desc?i("div",{style:{fontSize:"12.5px",color:"var(--f)",marginTop:"3px",lineHeight:1.55}},_NXtr(desc)):null),
i("div",{"aria-hidden":"true",style:{width:"34px",height:"20px",borderRadius:"10px",flexShrink:0,marginTop:"1px",boxSizing:"border-box",
background:on?"var(--acc)":"transparent",border:"1px solid "+(on?"var(--acc)":"var(--f)"),transition:"background-color .2s ease"}},
i("div",{style:{width:"14px",height:"14px",borderRadius:"50%",margin:"2px",background:on?"#16130f":"var(--f)",
transform:on?"translateX(14px)":"none",transition:"transform .2s cubic-bezier(.2,.8,.2,1)"}})));};
// Une pastille de choix, pleine quand elle est retenue.
_NXED.choix=function(lab,on,onClick,cle){
return i("div",{key:cle,className:"nx-fx nxed-carte",role:"button","aria-label":_NXtr(lab),"aria-pressed":on?"true":"false",
tabIndex:0,onKeyDown:_NXkey,onClick:onClick,
style:{padding:"8px 15px",borderRadius:"99px",cursor:"pointer",fontSize:"12.5px",fontVariantNumeric:"tabular-nums",
background:on?"var(--acc)":"transparent",color:on?"#16130f":"var(--m)",border:"1px solid "+(on?"var(--acc)":"var(--l2)")}},_NXtr(lab));};
// Des colonnes : chaque valeur est une echelle verticale, la plus haute est
// chiffree, la moyenne est un filet pointille. o.col(d,k) choisit la teinte.
_NXED.colonnes=function(L,o){o=o||{};
var haut=o.haut||110,max=o.max||1,pic=o.pic,moy=0,nb=0,a;
for(a=0;a<L.length;a++){if(L[a].v){moy+=L[a].v;nb++;}}moy=nb?moy/nb:0;
return i("div",{style:{position:"relative",display:"flex",alignItems:"flex-end",gap:L.length>40?"2px":"4px",height:haut+"px"}},
(o.moyenne!==false&&moy)?i("div",{"aria-hidden":"true",style:{position:"absolute",left:0,right:0,bottom:Math.round(Math.min(1,moy/max)*haut)+"px",
borderTop:"1px dashed var(--l2)",pointerEvents:"none"}},
i("span",{style:{position:"absolute",right:0,bottom:"3px",fontSize:"11px",color:"var(--m)"}},
_NXtr(o.libMoy||"moyenne")+" "+_NXtr(Math.round(moy))+(o.unite||""))):null,
(o.seuil&&o.seuil<max)?i("div",{"aria-hidden":"true",style:{position:"absolute",left:0,right:0,bottom:Math.round(o.seuil/max*haut)+"px",
borderTop:"1px dashed "+_NXED.a(_NXpal.warn,0.6),pointerEvents:"none"}},
i("span",{style:{position:"absolute",left:0,bottom:"3px",fontSize:"11px",color:_NXpal.warn}},_NXtr(o.libSeuil||"seuil"))):null,
L.map(function(d,k){
var top=k===pic;
var col=o.col?o.col(d,k):(top?"var(--acc)":_NXED.a("#bda9ff",0.4));
return i("div",{key:k,title:o.titre?o.titre(d,k):_NXtr(d.v),style:{position:"relative",flex:1,minWidth:0,height:"100%",
display:"flex",alignItems:"flex-end"}},
i("div",{className:"nxed-barre",style:{width:"100%",height:"100%",borderRadius:"3px 3px 0 0",background:d.v?col:"var(--l)",
transformOrigin:"bottom center",transform:"scaleY("+(d.v?Math.max(0.03,Math.min(1,d.v/max)):0.02)+")"}}),
(top&&d.v)?i("span",{style:{position:"absolute",bottom:(Math.round(Math.min(1,d.v/max)*haut)+6)+"px",left:"50%",transform:"translateX(-50%)",
fontSize:"11.5px",color:"var(--c)",whiteSpace:"nowrap",fontVariantNumeric:"tabular-nums"}},_NXtr(d.v)+(o.unite||"")):null);}));};
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXED");if(window._NXERR)_NXERR.push("module _NXED :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXED desactive:",_nxE);}catch(_){}}
}
var _NXMusicTemps=function(props){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _g0=F.useState(false);var glisse=_g0[0];var setGlisse=_g0[1];
var _s0=F.useState(-1);var survol=_s0[0];var setSurvol=_s0[1];
F.useEffect(function(){
var vivant=true;
var maj=function(){if(vivant)force();};
_NXM.listeners.push(maj);
return function(){vivant=false;
try{_NXM.listeners=_NXM.listeners.filter(function(f){return f!==maj;});}catch(_){}};},[]);
F.useEffect(function(){
if(!glisse)return;
var bouge=function(e){try{var el=document.getElementById("nx-m-onde");if(!el)return;
var r=el.getBoundingClientRect();if(!r.width)return;
var f=(e.clientX-r.left)/r.width;_NXM.seek(f<0?0:(f>1?1:f));}catch(_){}};
var fin=function(){setGlisse(false);};
try{window.addEventListener("mousemove",bouge);window.addEventListener("mouseup",fin);}catch(_){}
return function(){try{window.removeEventListener("mousemove",bouge);window.removeEventListener("mouseup",fin);}catch(_){}};},[glisse]);
var e=props.e,mort=props.mort;
var pct=_NXM.dur>0?Math.min(100,_NXM.progress/_NXM.dur*100):0;
var teinte=mort?_NXpal.danger:e.fond;
return i("div",{style:{marginTop:"22px"}},
i("div",{id:"nx-m-onde",className:"nx-fx",role:"slider","aria-label":_T("Position dans la piste"),
"aria-valuemin":0,"aria-valuemax":100,"aria-valuenow":Math.round(pct),tabIndex:0,
onKeyDown:function(ev){try{
if(ev.key==="ArrowRight"){ev.preventDefault();_NXM.seek(Math.min(1,pct/100+0.05));}
if(ev.key==="ArrowLeft"){ev.preventDefault();_NXM.seek(Math.max(0,pct/100-0.05));}}catch(_){}},
onMouseDown:function(ev){try{var r=ev.currentTarget.getBoundingClientRect();
_NXM.seek((ev.clientX-r.left)/r.width);setGlisse(true);}catch(_){}},
onMouseMove:function(ev){try{var r=ev.currentTarget.getBoundingClientRect();
var f=(ev.clientX-r.left)/r.width;setSurvol(f<0?0:(f>1?1:f));}catch(_){}},
onMouseLeave:function(){setSurvol(-1);},
style:{position:"relative",height:"18px",display:"flex",alignItems:"center",
cursor:glisse?"grabbing":"pointer",userSelect:"none"}},
i("div",{style:{position:"absolute",left:0,right:0,height:"2px",background:"var(--l2)"}}),
i("div",{style:{position:"absolute",left:0,height:"2px",width:pct+"%",background:teinte,
transition:glisse?"none":"width .25s linear"}}),
i("div",{"aria-hidden":"true",style:{position:"absolute",left:pct+"%",width:"10px",height:"10px",
marginLeft:"-5px",borderRadius:"50%",background:"var(--c)",
transform:(glisse||survol>=0)?"scale(1)":"scale(.6)",transition:"transform .18s ease"+(glisse?"":",left .25s linear")}}),
(survol>=0&&_NXM.dur>0)?i("div",{"aria-hidden":"true",style:{position:"absolute",bottom:"18px",left:(survol*100)+"%",
transform:"translateX(-50%)",fontSize:"11px",color:"var(--c)",fontVariantNumeric:"tabular-nums",
pointerEvents:"none",whiteSpace:"nowrap"}},_NXM.fmt(survol*_NXM.dur)):null),
i("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"6px",fontSize:"11.5px",
color:"var(--m)",fontVariantNumeric:"tabular-nums"}},
i("span",null,_NXM.fmt(_NXM.progress)),
i("span",null,_NXM.dur>0?("−"+_NXM.fmt(Math.max(0,_NXM.dur-_NXM.progress))):"—")));};

// Le bras de lecture. Au repos, il attend a cote du disque ; quand la piste
// joue, il se pose sur le sillon exterieur et avance vers le centre au rythme
// de la vraie position de lecture -- comme sur une platine.
var _NXMusicBras=function(){
var force=F.useReducer(function(x){return x+1;},0)[1];
F.useEffect(function(){
var vivant=true;
var maj=function(){if(vivant)force();};
_NXM.listeners.push(maj);
return function(){vivant=false;
try{_NXM.listeners=_NXM.listeners.filter(function(f){return f!==maj;});}catch(_){}};},[]);
var f=_NXM.dur>0?Math.max(0,Math.min(1,_NXM.progress/_NXM.dur)):0;
var ang=_NXM.playing?(22.5+f*14.3):4;
return i("div",{"aria-hidden":"true",style:{position:"absolute",left:"318px",top:"-16px",width:"24px",height:"24px",pointerEvents:"none"}},
i("div",{style:{position:"absolute",inset:"-8px",borderRadius:"50%",background:"#1c1a17",boxShadow:"0 6px 16px rgba(0,0,0,.5), inset 0 0 0 1px rgba(239,232,220,.12)"}}),
i("div",{className:"nxmu-bras",style:{position:"absolute",left:0,top:0,width:"24px",height:"24px",transform:"rotate("+ang+"deg)"}},
i("div",{style:{position:"absolute",left:"7px",top:"-22px",width:"10px",height:"18px",borderRadius:"3px",background:"#3a3631",boxShadow:"inset 0 0 0 1px rgba(239,232,220,.1)"}}),
i("div",{style:{position:"absolute",left:"10.5px",top:"10px",width:"3px",height:"150px",borderRadius:"2px",background:"linear-gradient(90deg,#9d958a,#e8e1d6,#9d958a)"}}),
i("div",{style:{position:"absolute",left:"5px",top:"156px",width:"14px",height:"24px",borderRadius:"3px",background:"#d9d1c4",transform:"rotate(18deg)",
boxShadow:"0 4px 10px rgba(0,0,0,.45)"}})),
i("div",{style:{position:"absolute",left:"6px",top:"6px",width:"12px",height:"12px",borderRadius:"50%",background:"#cfc6b8",boxShadow:"inset 0 0 0 3px #2a2723"}}));};
