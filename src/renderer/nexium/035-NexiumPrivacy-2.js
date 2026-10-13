function NexiumPrivacyComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _t0=F.useState("tableau");var tab=_t0[0];var setTab=_t0[1];
var _fa=F.useState("tout");var fam=_fa[0];var setFam=_fa[1];
var _q0=F.useState("");var q=_q0[0];var setQ=_q0[1];
F.useEffect(function(){
var vivant=true,att=null;
var maj=function(){try{if(!vivant||att)return;att=setTimeout(function(){att=null;if(vivant)force();},300);}catch(_){}};
var L=[window._NXP,window._NXPRV];
for(var a=0;a<L.length;a++){try{if(L[a]&&L[a].listeners)L[a].listeners.push(maj);}catch(_){}}
var rv=_NXP.rev;
var id=setInterval(function(){try{
if(typeof document!=="undefined"&&document.hidden)return;
if(rv===_NXP.rev)return;
rv=_NXP.rev;maj();}catch(_){}},2500);
return function(){vivant=false;
try{if(att)clearTimeout(att);}catch(_){}
try{clearInterval(id);}catch(_){}
for(var b=0;b<L.length;b++){try{if(L[b]&&L[b].listeners)L[b].listeners=L[b].listeners.filter(function(f){return f!==maj;});}catch(_){}}};},[]);
var monte=_NXmounted(F);
var P=_NXpal,cfg=_NXP.cfg,st=_NXP.stats||{};
var X=window._NXPROT;var PV=window._NXPRV||null;
var an=_NXFX.anime();
try{if(_NXP.reconcilie)_NXP.reconcilie();}catch(_){}
var CAT=_NXPRIVCAT;
var B=X.bilan(CAT);
var semaine=0;try{semaine=_NXP.bilan(7).total||0;}catch(_){}
var brouilles=0;["canvas","webgl","audiofp","screen","plugins","battery","uadata","hardware","rtcip"].forEach(function(k){brouilles+=st[k]||0;});
var cScore=_NXcount(F,B.pct,1100);
var cVues=_NXcount(F,st.seen||0);
var cArr=_NXcount(F,st.blocked||0);
var cSem=_NXcount(F,semaine);
var cBr=_NXcount(F,brouilles);
var scol=B.pct>=80?P.ok:(B.pct>=45?P.info:P.warn);
var titreNiveau=B.pct>=80?_T("Tu passes inapercu"):(B.pct>=45?_T("Discretion partielle"):_T("Ton client parle beaucoup"));
var COUL={info:P.info,warn:P.warn,cyan:P.cyan,ok:P.ok,mauve:P.mauve,rose:P.rose};
function couleurFam(f){for(var a=0;a<_NXPRIVFAM.length;a++)if(_NXPRIVFAM[a][0]===f)return COUL[_NXPRIVFAM[a][3]]||P.info;return P.info;}
function versOffres(){try{if(window._NXCP)_NXCP.ouvrir("equicord_abo","Nexium Abonnement");}catch(_){}}
function pad(n){return (n<10?"0":"")+n;}

var CSS=".nxp-anim .nxp-entre{animation:nxpEntre .55s cubic-bezier(.22,1,.36,1) both}"+
"@keyframes nxpEntre{from{opacity:0;transform:translate3d(0,16px,0) scale(.985)}to{opacity:1;transform:none}}"+
".nxp-carte{transition:transform .28s cubic-bezier(.22,1,.36,1),border-color .28s ease,background .28s ease,box-shadow .28s ease}"+
".nxp-anim .nxp-carte:hover{transform:translate3d(0,-3px,0)}"+
".nxp-anim .nxp-balai{animation:nxpBalai 16s linear infinite}"+
"@keyframes nxpBalai{to{transform:rotate(360deg)}}"+
".nxp-anim .nxp-onde{animation:nxpOnde 7s cubic-bezier(.2,.6,.3,1) infinite}"+
"@keyframes nxpOnde{0%{transform:scale(.62);opacity:.6}100%{transform:scale(1.32);opacity:0}}"+
".nxp-anim .nxp-trace{animation:nxpTrace 1.5s cubic-bezier(.65,0,.35,1) both}"+
".nxp-anim .nxp-coche{animation:nxpTrace .7s cubic-bezier(.65,0,.35,1) 1s both}"+
"@keyframes nxpTrace{from{stroke-dashoffset:100}to{stroke-dashoffset:0}}"+
".nxp-anim .nxp-flotte{animation:nxpFlotte 9s ease-in-out infinite}"+
"@keyframes nxpFlotte{0%,100%{transform:translate3d(0,0,0)}50%{transform:translate3d(0,-4px,0)}}"+
".nxp-anim .nxp-iris{animation:nxpIris 11s ease-in-out infinite;transform-origin:60px 60px}"+
"@keyframes nxpIris{0%,22%,100%{transform:translateX(0)}34%,48%{transform:translateX(-4px)}62%,76%{transform:translateX(4px)}}"+
".nxp-anim .nxp-vif{animation:nxpVif 4.2s ease-in-out infinite}"+
"@keyframes nxpVif{0%,100%{opacity:.35}50%{opacity:1}}"+
".nxp-anim .nxp-lueur{animation:nxpLueur 10s ease-in-out infinite}"+
"@keyframes nxpLueur{0%,100%{opacity:.55;transform:scale(1)}50%{opacity:1;transform:scale(1.08)}}"+
".nxp-anim .nxp-reflet{animation:nxpReflet 9s ease-in-out infinite}"+
"@keyframes nxpReflet{0%{transform:translate3d(-120%,0,0)}35%,100%{transform:translate3d(260%,0,0)}}"+
".nxp-anim .nxp-pousse{animation:nxpPousse .8s cubic-bezier(.22,1,.36,1) both;transform-origin:bottom}"+
"@keyframes nxpPousse{from{transform:scaleY(0)}to{transform:scaleY(1)}}"+
".nxp-bille{transition:transform .32s cubic-bezier(.34,1.56,.64,1),background .25s ease}"+
".nxp-rail{transition:background .25s ease,border-color .25s ease,box-shadow .25s ease}"+
".nxp-jauge{transition:width 1s cubic-bezier(.22,1,.36,1)}"+
".nxp-puce{transition:background .2s ease,border-color .2s ease,color .2s ease}"+
"@media (prefers-reduced-motion:reduce){.nxp-anim *{animation:none!important}}";

function interrupteur(on,col,partiel){
return i("div",{"aria-hidden":"true",className:"nxp-rail",style:{flexShrink:0,width:"40px",height:"23px",borderRadius:"99px",position:"relative",
background:on?col:(partiel?_NXteinte(col,30):"transparent"),border:"1px solid "+(on||partiel?col:P.faint),
boxShadow:on?("0 0 16px "+_NXteinte(col,35)):"none"}},
i("div",{className:"nxp-bille",style:{position:"absolute",top:"3px",left:"3px",width:"15px",height:"15px",borderRadius:"50%",
background:on?P.ink:(partiel?col:P.faint),transform:on?"translateX(17px)":(partiel?"translateX(8px)":"none")}}));}
function chip(txt,col,icone){
return i("span",{style:{display:"inline-flex",alignItems:"center",gap:"5px",padding:"3px 8px",borderRadius:"99px",
fontSize:"10px",fontWeight:"800",letterSpacing:".04em",color:col,background:_NXteinte(col,10),border:"1px solid "+_NXteinte(col,26),whiteSpace:"nowrap"}},
icone?_NXFX.svg(icone,11):null,_NXtr(txt));}
function bouton(t,onClick,o){o=o||{};
return _NXFX.bouton({t:_NXtr(t),onClick:onClick,petit:!o.grand,plein:!!o.plein,creux:!!o.creux,col:o.col||P.pale,icone:o.icone,off:!!o.off});}
function titreSection(icone,col,titre,sous,droite){
return i("div",{style:{display:"flex",alignItems:"center",gap:"13px",margin:"6px 2px 14px"}},
i("div",{style:{width:"38px",height:"38px",borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
background:"linear-gradient(145deg,"+_NXteinte(col,22)+","+_NXteinte(col,6)+")",border:"1px solid "+_NXteinte(col,30),color:col}},_NXFX.svg(icone,19)),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:"17px",fontWeight:"800",color:P.txt,letterSpacing:"-.02em"}},_NXtr(titre)),
sous?i("div",{style:{fontSize:"12px",color:P.dim,marginTop:"2px",lineHeight:1.5}},_NXtr(sous)):null),
_NXtr(droite)||null);}
function radio(on,col){return i("span",{style:{width:"14px",height:"14px",borderRadius:"50%",flexShrink:0,border:"2px solid "+(on?col:P.faint),
boxShadow:on?("inset 0 0 0 3px "+P.bg):"none",background:on?col:"transparent"}});}

// ------------------------------------------------------------ l embleme
function embleme(col){
var z=168;
return i("div",{className:"nxp-flotte",style:{position:"relative",width:z+"px",height:z+"px",flexShrink:0}},
i("div",{className:"nxp-lueur","aria-hidden":"true",style:{position:"absolute",inset:"-18px",borderRadius:"50%",
background:"radial-gradient(circle,"+_NXteinte(col,24)+",transparent 66%)"}}),
[0,1].map(function(k){return i("div",{key:k,className:"nxp-onde","aria-hidden":"true",style:{position:"absolute",inset:"8px",borderRadius:"50%",
border:"1px solid "+_NXteinte(col,45),animationDelay:(k*3.5)+"s"}});}),
i("div",{"aria-hidden":"true",style:{position:"absolute",inset:"16px",borderRadius:"50%",overflow:"hidden",
border:"1px solid "+_NXteinte(col,22),background:_NXteinte(P.bg,60)}},
i("div",{className:"nxp-balai",style:{position:"absolute",inset:0,borderRadius:"50%",
background:"conic-gradient(from 0deg,transparent 0 72%,"+_NXteinte(col,8)+" 86%,"+_NXteinte(col,28)+" 100%)"}})),
i("svg",{viewBox:"0 0 120 120",width:z,height:z,"aria-hidden":"true",style:{position:"absolute",inset:0}},
i("path",{d:"M26 60 C37 43 48 36 60 36 C72 36 83 43 94 60 C83 77 72 84 60 84 C48 84 37 77 26 60 Z",fill:_NXteinte(col,10),stroke:"none"}),
i("path",{className:"nxp-trace",pathLength:100,d:"M26 60 C37 43 48 36 60 36 C72 36 83 43 94 60 C83 77 72 84 60 84 C48 84 37 77 26 60 Z",
fill:"none",stroke:col,strokeWidth:2.6,strokeLinejoin:"round",strokeDasharray:100,strokeDashoffset:0}),
i("g",{className:"nxp-iris"},
i("circle",{cx:60,cy:60,r:11,fill:"none",stroke:col,strokeWidth:2.6}),
i("circle",{cx:60,cy:60,r:3.6,fill:col})),
i("path",{className:"nxp-coche",pathLength:100,d:"M34 88 L86 32",fill:"none",stroke:col,strokeWidth:3.4,strokeLinecap:"round",
strokeDasharray:100,strokeDashoffset:0})));}

// ------------------------------------------------------------ le tableau
function lancerTests(){try{if(!PV||PV.encours)return;PV.lance("privacy",function(){force();});force();}catch(_){}}
function resumeTests(){
if(!PV)return null;
var c=PV.compte("privacy");
if(PV.encours){var pct=PV.total?Math.round(PV.fini*100/PV.total):0;
return i("div",{style:{marginTop:"16px"}},
i("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"11.5px",color:P.sub,marginBottom:"7px"}},
i("span",null,_T("Test en cours, pour de vrai")),i("span",{style:{fontFamily:_NXf.mono}},_NXtr(PV.fini)+" / "+_NXtr(PV.total))),
i("div",{style:{height:"6px",borderRadius:"99px",background:P.line,overflow:"hidden"}},
i("div",{className:"nxp-jauge",style:{height:"100%",width:pct+"%",borderRadius:"99px",background:"linear-gradient(90deg,"+_NXteinte(scol,50)+","+scol+")"}})));}
var fait=c.agit+c.echec+c.coupe+c.na;
if(!fait)return i("div",{style:{marginTop:"14px",fontSize:"12px",color:P.dim,lineHeight:1.6}},
_T("Aucun test lance depuis l ouverture. Un test fait partir une vraie requete de collecte et regarde si elle est arretee."));
return i("div",{style:{marginTop:"14px",display:"flex",gap:"8px",flexWrap:"wrap"}},
_NXtr(chip(c.agit+" "+_T("prouvee(s)"),P.ok,"check")),
c.echec?_NXtr(chip(c.echec+" "+_T("en echec"),P.danger,"croix")):null,
c.coupe?_NXtr(chip(c.coupe+" "+_T("coupee(s)"),P.warn,"pause")):null,
c.na?_NXtr(chip(c.na+" "+_T("sans objet"),P.dim,null)):null);}
function toutActiver(){try{
for(var a=0;a<CAT.length;a++){var it=CAT[a],e=X.etat(it);
if(e.absent||e.toutFerme||e.plein)continue;X.bascule(it);}}catch(_){}}
function hero(){
return i("div",{className:"nxp-entre",style:{position:"relative",overflow:"hidden",borderRadius:"28px",padding:"28px",marginBottom:"16px",
border:"1px solid "+_NXteinte(scol,28),background:"linear-gradient(140deg,"+_NXteinte(scol,10)+" 0%,"+P.panel+" 45%,"+P.bg+" 100%)"}},
i("div",{"aria-hidden":"true",style:{position:"absolute",right:"-120px",top:"-140px",width:"380px",height:"380px",borderRadius:"50%",
background:"radial-gradient(circle,"+_NXteinte(scol,14)+",transparent 68%)",pointerEvents:"none"}}),
i("div",{style:{position:"relative",display:"flex",alignItems:"center",gap:"28px",flexWrap:"wrap"}},
_NXtr(embleme(scol)),
i("div",{style:{flex:"1 1 300px",minWidth:"260px"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}},
i("span",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".2em",textTransform:"uppercase",color:P.faint}},_NXtr("Nexium Privacy")),
i("span",{style:{display:"inline-flex",alignItems:"center",gap:"6px",fontSize:"10.5px",color:P.ok,fontWeight:"700"}},
i("span",{className:"nxp-vif",style:{width:"6px",height:"6px",borderRadius:"50%",background:P.ok}}),_T("interception locale"))),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"31px",fontWeight:"800",color:P.txt,letterSpacing:"-.035em",lineHeight:1.08,marginTop:"10px"}},_NXtr(titreNiveau)),
i("div",{style:{fontSize:"13px",color:P.sub,marginTop:"8px",lineHeight:1.6}},
(_NXtr(Math.round(B.on))+" "+_T("reglage(s) actif(s) sur")+" "+_NXtr(B.acc))+(B.ferme?(" · "+_NXtr(B.ferme)+" "+_T("reserve(s) aux abonnes")):"")),
i("div",{style:{display:"flex",alignItems:"flex-end",gap:"14px",marginTop:"18px",flexWrap:"wrap"}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:"58px",fontWeight:"800",color:scol,letterSpacing:"-.06em",lineHeight:.9,fontVariantNumeric:"tabular-nums"}},
_NXtr(cScore),i("span",{style:{fontSize:"26px",marginLeft:"2px"}},"%")),
i("div",{style:{flex:1,minWidth:"150px",paddingBottom:"8px"}},
i("div",{style:{height:"8px",borderRadius:"99px",background:P.line,overflow:"hidden"}},
i("div",{className:"nxp-jauge",style:{height:"100%",width:(monte?B.pct:0)+"%",borderRadius:"99px",position:"relative",overflow:"hidden",
background:"linear-gradient(90deg,"+_NXteinte(scol,45)+","+scol+")"}},
i("div",{className:"nxp-reflet",style:{position:"absolute",top:0,bottom:0,width:"40%",background:"linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent)"}}))))),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginTop:"18px"}},
PV?_NXtr(bouton(PV.encours?_T("Test en cours..."):_T("Tout tester, pour de vrai"),lancerTests,{plein:true,col:scol,icone:"bouclierOk",off:PV.encours})):null,
_NXtr(bouton(_T("Voir le journal"),function(){setTab("journal");},{creux:true,icone:"liste",col:P.sub})),
B.acc>B.on?_NXtr(bouton(_T("Tout activer"),function(){toutActiver();force();},{creux:true,icone:"eclair",col:P.sub})):null),
_NXtr(resumeTests()))));}
function familles(){
return i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"10px",marginBottom:"16px"}},
_NXPRIVFAM.map(function(f,k){
var col=COUL[f[3]]||P.info,on=0,tot=0,a;
for(a=0;a<CAT.length;a++){var it=CAT[a];if(it.f!==f[0])continue;
var e=X.etat(it);if(e.absent||e.toutFerme)continue;tot++;if(e.plein)on++;}
var pct=tot?Math.round(on*100/tot):0;
return i("div",{key:f[0],className:"nxp-carte nxp-entre nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,"aria-label":_T(f[1])+" "+_NXtr(on)+"/"+_NXtr(tot),
onClick:function(){setFam(f[0]);setTab("reglages");},
style:{cursor:"pointer",padding:"15px 16px",borderRadius:"18px",background:P.inset,border:"1px solid "+P.line,animationDelay:(80+k*55)+"ms"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"10px"}},
i("div",{style:{color:col,display:"flex"}},_NXFX.svg(f[2],17)),
i("div",{style:{flex:1,fontSize:"13px",fontWeight:"800",color:P.txt}},_T(f[1])),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"11.5px",color:on===tot&&tot?col:P.sub}},_NXtr(on)+"/"+_NXtr(tot))),
i("div",{style:{height:"5px",borderRadius:"99px",background:P.line,overflow:"hidden",marginTop:"12px"}},
i("div",{className:"nxp-jauge",style:{height:"100%",width:(monte?pct:0)+"%",borderRadius:"99px",
background:"linear-gradient(90deg,"+_NXteinte(col,40)+","+col+")",transitionDelay:(k*90)+"ms"}})));}));}
function compteurs(){
var T=[[cVues,_T("Requetes interceptees"),P.info,"reseau"],[cArr,_T("Arretees"),P.ok,"bouclierOk"],
[cSem,_T("Arretees cette semaine"),P.mauve,"calendrier"],[cBr,_T("Empreintes brouillees"),P.warn,"cible"]];
return i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"10px",marginBottom:"16px"}},
T.map(function(x,k){return i("div",{key:k,className:"nxp-carte nxp-entre",style:{padding:"16px",borderRadius:"18px",
background:"linear-gradient(160deg,"+_NXteinte(x[2],8)+","+P.inset+")",border:"1px solid "+_NXteinte(x[2],20),animationDelay:(200+k*60)+"ms"}},
i("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".12em",textTransform:"uppercase",color:P.dim}},_NXtr(x[1])),
i("div",{style:{color:_NXteinte(x[2],70),display:"flex"}},_NXFX.svg(x[3],15))),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"28px",fontWeight:"800",color:x[0]?x[2]:P.txt,marginTop:"8px",letterSpacing:"-.04em",fontVariantNumeric:"tabular-nums"}},_NXn(x[0])));}));}
function vingtQuatre(){
var H=[],max=1,maintenant=new Date();
for(var h=23;h>=0;h--){var d=new Date(maintenant.getTime()-h*3600000);
var k=d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate())+"-"+pad(d.getHours());
var e=(st.hours&&st.hours[k])||{seen:0,blocked:0};
H.push({h:d.getHours(),s:e.seen||0,b:e.blocked||0});if(e.seen>max)max=e.seen;}
return _NXcard(i("div",null,
_NXch(_T("Les dernieres 24 heures"),_T("Chaque barre est une heure : en clair ce qui a ete intercepte, en couleur ce qui a ete arrete.")),
i("div",{style:{display:"flex",alignItems:"flex-end",gap:"3px",height:"84px"}},
H.map(function(e,k){var ht=Math.max(3,Math.round(e.s/max*80));var hb=e.s?Math.round(e.b/e.s*ht):0;
return i("div",{key:k,className:"nxp-pousse",title:_NXtr(e.h)+_NXtr(" h · ")+_NXtr(e.s)+" "+_T("interceptees")+" · "+_NXtr(e.b)+" "+_T("arretees"),
style:{flex:1,minWidth:0,height:ht+"px",background:_NXteinte(P.txt,8),borderRadius:"4px 4px 2px 2px",overflow:"hidden",
display:"flex",flexDirection:"column",justifyContent:"flex-end",animationDelay:(k*18)+"ms"}},
hb?i("div",{style:{height:hb+"px",background:"linear-gradient(180deg,"+P.ok+","+_NXteinte(P.ok,45)+")",borderRadius:"4px 4px 2px 2px"}}):null);})),
i("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px",fontFamily:_NXf.mono,fontSize:"10px",color:P.faint}},
i("span",null,_NXtr("-24 h")),i("span",null,_NXtr("-12 h")),i("span",null,_T("maintenant")))),{mb:12});}
function laSemaine(){
var S=null;try{S=_NXP.bilan(7);}catch(_){}
if(!S||!S.total)return null;
var mx=1;for(var a=0;a<S.parJour.length;a++)if(S.parJour[a].n>mx)mx=S.parJour[a].n;
var JJ=[_T("Dim"),_T("Lun"),_T("Mar"),_T("Mer"),_T("Jeu"),_T("Ven"),_T("Sam")];
return _NXcard(i("div",null,
_NXch(_T("Ta semaine"),_T("Ce qui a ete arrete ces sept derniers jours.")),
i("div",{style:{display:"flex",alignItems:"flex-end",gap:"8px",height:"70px"}},
S.parJour.map(function(o,k){var ht=o.n?Math.max(5,Math.round(o.n/mx*64)):3;
return i("div",{key:k,style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"6px"}},
i("div",{className:"nxp-pousse",title:_NXtr(o.n)+" "+_T("arretees"),style:{width:"100%",height:ht+"px",borderRadius:"6px 6px 3px 3px",
background:o.n?("linear-gradient(180deg,"+P.mauve+","+_NXteinte(P.mauve,40)+")"):P.line,animationDelay:(k*60)+"ms"}}));})),
i("div",{style:{display:"flex",gap:"8px",marginTop:"8px"}},
S.parJour.map(function(o,k){return i("div",{key:k,style:{flex:1,textAlign:"center",fontFamily:_NXf.mono,fontSize:"10px",color:P.faint}},_NXtr(JJ[o.j]));}))),{mb:12});}
function quiSort(){
var fams=[];try{for(var k in _NXP.KINDS){var v=st[k]||0;if(v>0)fams.push([k,v]);}fams.sort(function(x,y){return y[1]-x[1];});}catch(_){}
if(!fams.length)return null;
var mx=fams[0][1];
return _NXcard(i("div",null,
_NXch(_T("Ce qui cherche a sortir"),_T("Par famille, depuis l installation.")),
fams.slice(0,8).map(function(o,k,arr){var pct=Math.max(3,Math.round(o[1]/mx*100));
return i("div",{key:o[0],style:{padding:"9px 0",borderBottom:k===arr.length-1?"none":"1px solid "+P.line}},
i("div",{style:{display:"flex",justifyContent:"space-between",gap:"12px",marginBottom:"7px"}},
i("span",{style:{fontSize:"12.5px",color:P.pale}},_T(_NXP.kindFr(o[0]))),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"11.5px",color:P.txt}},_NXn(o[1]))),
i("div",{style:{height:"5px",borderRadius:"99px",background:P.line,overflow:"hidden"}},
i("div",{className:"nxp-jauge",style:{height:"100%",width:(monte?pct:0)+"%",borderRadius:"99px",
background:"linear-gradient(90deg,"+_NXteinte(P.info,40)+","+P.info+")",transitionDelay:(k*70)+"ms"}})));})),{mb:12});}
function profils(){
var profil=_NXP.profilActuel();
return i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))",gap:"12px",marginBottom:"12px"}},
_NXcard(i("div",null,
_NXch(_T("Profil de discretion"),profil==="perso"?_T("Tu as ajuste a ta main : aucun profil ne correspond exactement."):_T("Un reglage d ensemble, a ajuster ensuite carte par carte.")),
i("div",{style:{display:"flex",flexDirection:"column",gap:"7px"}},
[["discret",_T("Discret"),_T("La telemetrie, sans rien changer a ton usage")],["renforce",_T("Renforce"),_T("Aussi les signaux sociaux et l empreinte")],
["maximal",_T("Maximal"),_T("Tout, y compris ce qui retire du confort")]].map(function(p){var on=profil===p[0];
return i("div",{key:p[0],className:"nx-fx nxp-puce",role:"button",tabIndex:0,onKeyDown:_NXkey,"aria-pressed":on?"true":"false",
onClick:function(){_NXP.appliquerProfil(p[0]);force();},
style:{display:"flex",alignItems:"center",gap:"11px",padding:"11px 13px",borderRadius:"13px",cursor:"pointer",
background:on?_NXteinte(scol,9):"transparent",border:"1px solid "+(on?_NXteinte(scol,40):P.line)}},
_NXtr(radio(on,scol)),
i("div",{style:{fontSize:"12.5px",fontWeight:"800",color:on?P.txt:P.sub,minWidth:"72px"}},_NXtr(p[1])),
i("div",{style:{flex:1,fontSize:"11px",color:P.dim,textAlign:"right"}},_NXtr(p[2])));}))),{mb:0}),
_NXcard(i("div",null,
_NXch(_T("Heures discretes"),_T("Sur une plage choisie, tout passe en maximal, puis tes reglages reviennent.")),
i("div",{className:"nx-fx",role:"switch",tabIndex:0,onKeyDown:_NXkey,"aria-checked":cfg.quietOn?"true":"false","aria-label":_T("Heures discretes"),
onClick:function(){cfg.quietOn=!cfg.quietOn;_NXP.saveCfg();try{_NXP.quietTick();}catch(_){}force();},
style:{display:"flex",alignItems:"center",gap:"12px",padding:"11px 13px",borderRadius:"13px",cursor:"pointer",
background:cfg.quietOn?_NXteinte(P.mauve,9):"transparent",border:"1px solid "+(cfg.quietOn?_NXteinte(P.mauve,40):P.line)}},
i("div",{style:{flex:1}},
i("div",{style:{fontSize:"12.5px",fontWeight:"800",color:cfg.quietOn?P.txt:P.sub}},_T("Basculer automatiquement")),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"3px"}},
cfg.quietOn?(_NXP.quietActif()?(_T("En cours jusqu a")+" "+_NXtr(cfg.quietFin)+_NXtr(" h")):(_T("Demarrera a")+" "+_NXtr(cfg.quietDebut)+_NXtr(" h"))):_T("Rien a faire ensuite : la bascule se fait a l heure dite."))),
_NXtr(interrupteur(!!cfg.quietOn,P.mauve,false))),
cfg.quietOn?i("div",{style:{display:"flex",gap:"16px",flexWrap:"wrap",marginTop:"14px"}},
[["quietDebut",_T("Debut")],["quietFin",_T("Fin")]].map(function(o){
return i("div",{key:o[0],style:{flex:1,minWidth:"200px"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".12em",textTransform:"uppercase",color:P.dim,marginBottom:"7px"}},_NXtr(o[1])),
i("div",{style:{display:"flex",gap:"4px",flexWrap:"wrap"}},
[0,2,4,6,8,10,12,14,16,18,20,22].map(function(h){var on=cfg[o[0]]===h;
return i("div",{key:h,className:"nx-fx nxp-puce",role:"button",tabIndex:0,onKeyDown:_NXkey,"aria-pressed":on?"true":"false","aria-label":_NXtr(h)+_NXtr(" h"),
onClick:function(){cfg[o[0]]=h;_NXP.saveCfg();try{_NXP.quietTick();}catch(_){}force();},
style:{padding:"6px 8px",borderRadius:"8px",cursor:"pointer",fontFamily:_NXf.mono,fontSize:"10.5px",
background:on?_NXteinte(P.mauve,14):"transparent",border:"1px solid "+(on?_NXteinte(P.mauve,50):P.line),color:on?P.txt:P.dim}},_NXtr(h)+_NXtr("h"));})));})):null),{mb:0}));}
function transparence(){
return _NXcard(i("div",null,
_NXch(_T("Ce que Nexium envoie, lui"),_T("La liste complete, sans exception.")),
[[_T("Contenu de tes messages"),_T("Jamais transmis, sous aucune condition"),false],
[_T("Jetons et mots de passe"),_T("Jamais lus ni transmis"),false],
[_T("Statistiques d usage Nexium"),_T("Calculees et gardees sur cette machine"),false],
[_T("Base de menaces"),_T("Telechargee depuis le depot Nexium, rien n est envoye en retour"),false],
[_T("Signalements de menaces"),_T("Uniquement si tu cliques sur Signaler : le domaine et ton identifiant Discord"),true]].map(function(r,k,arr){
return i("div",{key:k,style:{display:"flex",alignItems:"flex-start",gap:"12px",padding:"11px 0",borderBottom:k===arr.length-1?"none":"1px solid "+P.line}},
i("div",{style:{color:r[2]?P.warn:P.ok,display:"flex",marginTop:"1px"}},_NXFX.svg(r[2]?"info":"check",15)),
i("div",{style:{flex:1}},
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.txt}},_NXtr(r[0])),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"2px",lineHeight:1.5}},_NXtr(r[1]))));})),{mb:0});}
function vueTableau(){
return i("div",null,_NXtr(hero()),_NXtr(familles()),_NXtr(compteurs()),_NXtr(vingtQuatre()),_NXtr(laSemaine()),_NXtr(quiSort()),_NXtr(profils()),_NXtr(transparence()));}

// ------------------------------------------------------------ les reglages
function correspond(it){var s=(q||"").trim().toLowerCase();
if(fam!=="tout"&&it.f!==fam)return false;
if(!s)return true;
return (_T(it.t)+" "+_T(it.d)+" "+it.t+" "+it.id).toLowerCase().indexOf(s)>=0;}
function carte(it,idx){
var e=X.etat(it);
if(e.absent)return null;
var col=couleurFam(it.f);
var on=e.plein;
var pv=X.preuve(it);
var n=X.compte(it);
var clic=function(){if(e.toutFerme){versOffres();return;}X.bascule(it);force();};
return i("div",{key:it.id,className:"nxp-carte nxp-entre",
style:{position:"relative",overflow:"hidden",borderRadius:"18px",padding:"16px",animationDelay:(Math.min(idx,14)*38)+"ms",
background:on?("linear-gradient(155deg,"+_NXteinte(col,11)+","+P.inset+" 70%)"):P.inset,
border:"1px solid "+(e.toutFerme?_NXteinte(P.warn,24):(on?_NXteinte(col,38):P.line)),
boxShadow:on?("0 12px 32px "+_NXteinte(col,7)):"none",opacity:e.toutFerme?.8:1}},
on?i("div",{"aria-hidden":"true",style:{position:"absolute",left:0,top:"16px",bottom:"16px",width:"3px",borderRadius:"0 3px 3px 0",background:col}}):null,
i("div",{className:"nx-fx",role:"switch",tabIndex:0,onKeyDown:_NXkey,onClick:clic,"aria-checked":on?"true":"false","aria-label":_T(it.t),
style:{display:"flex",alignItems:"flex-start",gap:"12px",cursor:"pointer"}},
i("div",{style:{width:"36px",height:"36px",borderRadius:"11px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",
background:on?_NXteinte(col,16):"transparent",border:"1px solid "+(on?_NXteinte(col,34):P.line),color:on?col:P.faint,transition:"all .25s ease"}},_NXFX.svg(it.ic,18)),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"13.5px",fontWeight:"800",color:on?P.txt:P.pale,letterSpacing:"-.012em"}},_T(it.t)),
i("div",{style:{fontSize:"11.5px",color:P.dim,lineHeight:1.6,marginTop:"5px"}},_T(it.d))),
e.toutFerme?i("div",{style:{flexShrink:0,color:P.warn,display:"flex",marginTop:"2px"}},_NXFX.svg("cadenas",17)):_NXtr(interrupteur(on,col,e.partiel))),
i("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexWrap:"wrap",marginTop:"12px",marginLeft:"48px"}},
e.toutFerme?i("span",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,onClick:versOffres,style:{cursor:"pointer"}},_NXtr(chip(_T("Abonnement Privacy"),P.warn,"cadenas"))):null,
(!e.toutFerme&&e.ferme)?_NXtr(chip(_T("en partie reservee aux abonnes"),P.warn,"cadenas")):null,
e.partiel?_NXtr(chip(_T("en partie active"),P.sub,null)):null,
pv&&pv.etat==="prouvee"?_NXtr(chip(_T("prouvee"),P.ok,"check")):null,
pv&&pv.etat==="echec"?_NXtr(chip(_T("echec au test"),P.danger,"croix")):null,
pv&&pv.etat==="partielle"?_NXtr(chip(_T("en partie prouvee"),P.warn,null)):null,
pv&&pv.etat==="jamais"?_NXtr(chip(_T("testable"),P.dim,"bouclierOk")):null,
(n!==null&&n>0)?_NXtr(chip(_NXn(n)+" "+_T("interception(s)"),col,"pouls")):null));}
function vueReglages(){
var L=CAT.filter(correspond);
var chips=[["tout",_T("Tout"),"grille",P.pale]].concat(_NXPRIVFAM.map(function(f){return [f[0],_T(f[1]),f[2],COUL[f[3]]];}));
var idx=0;
return i("div",null,
i("div",{style:{display:"flex",gap:"10px",alignItems:"center",flexWrap:"wrap",marginBottom:"12px"}},
i("div",{style:{position:"relative",flex:"1 1 240px"}},
i("div",{style:{position:"absolute",left:"13px",top:"11px",color:P.faint,display:"flex",pointerEvents:"none"}},_NXFX.svg("loupe",15)),
i("input",{value:q,onChange:function(ev){setQ(ev.target.value);},placeholder:_T("Chercher un reglage"),spellCheck:false,"aria-label":_T("Chercher un reglage"),
style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,borderRadius:"13px",padding:"11px 13px 11px 36px",color:P.txt,fontSize:"12.5px",outline:"none"}})),
B.acc>B.on?_NXtr(bouton(_T("Tout activer"),function(){toutActiver();force();},{icone:"eclair",col:P.ok})):null,
PV?_NXtr(bouton(PV.encours?(_T("Test")+" "+PV.fini+"/"+PV.total):_T("Tout tester"),lancerTests,{icone:"bouclierOk",creux:true,col:P.sub,off:PV.encours})):null),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap",marginBottom:"18px"}},
chips.map(function(c){var on=fam===c[0];var nb=0;for(var a=0;a<CAT.length;a++)if(c[0]==="tout"||CAT[a].f===c[0])nb++;
return i("div",{key:c[0],className:"nx-fx nxp-puce",role:"tab",tabIndex:0,onKeyDown:_NXkey,"aria-selected":on?"true":"false",onClick:function(){setFam(c[0]);},
style:{display:"inline-flex",alignItems:"center",gap:"7px",padding:"7px 12px",borderRadius:"99px",cursor:"pointer",fontSize:"12px",fontWeight:"700",
color:on?P.txt:P.sub,background:on?_NXteinte(c[3],14):"transparent",border:"1px solid "+(on?_NXteinte(c[3],45):P.line)}},
i("span",{style:{display:"flex",color:on?c[3]:P.faint}},_NXFX.svg(c[2],13)),_NXtr(c[1]),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:on?c[3]:P.faint}},_NXtr(String(nb))));})),
!L.length?_NXcard(_NXFX.vide({icone:"loupe",titre:_T("Aucun reglage ne correspond"),texte:_T("Essaie un autre mot, ou une autre famille.")}),{mb:0}):null,
_NXPRIVFAM.map(function(f){
var LF=L.filter(function(it){return it.f===f[0];});
if(!LF.length)return null;
var col=COUL[f[3]]||P.info,on=0,tot=0;
LF.forEach(function(it){var e=X.etat(it);if(e.absent||e.toutFerme)return;tot++;if(e.plein)on++;});
return i("div",{key:f[0],style:{marginBottom:"22px"}},
_NXtr(titreSection(f[2],col,_T(f[1]),_T(f[4]),i("div",{style:{fontFamily:_NXf.mono,fontSize:"12px",color:on===tot&&tot?col:P.sub}},_NXtr(on)+" / "+_NXtr(tot)))),
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(360px,1fr))",gap:"12px"}},
LF.map(function(it){return carte(it,idx++);})));}));}

// ------------------------------------------------------------ les serveurs
function vueServeurs(){
if(!cfg.quiet)cfg.quiet={};
var mesG=[];
try{var GS=_NXcommon().store("GuildStore");var all=GS&&GS.getGuilds&&GS.getGuilds();
if(all)for(var gid in all)mesG.push({id:gid,name:(all[gid]&&all[gid].name)||gid});
mesG.sort(function(x,y){return String(x.name).localeCompare(String(y.name));});}catch(_){}
var n=0;for(var k in cfg.quiet)if(cfg.quiet[k])n++;
return _NXcard(i("div",null,
_NXtr(titreSection("comptes",P.info,_T("Mode discret par serveur"),_T("La frappe et les accuses de lecture sont coupes dans les serveurs choisis, sans toucher aux autres."),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"12px",color:n?P.info:P.faint}},_NXtr(String(n))))),
!mesG.length?_NXFX.vide({icone:"comptes",titre:_T("Serveurs en chargement"),texte:_T("La liste n est pas encore disponible. Reviens dans quelques secondes.")}):
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:"8px"}},
mesG.map(function(g,k){var on=!!cfg.quiet[g.id];
return i("div",{key:g.id,className:"nx-fx nxp-carte nxp-entre",role:"switch",tabIndex:0,onKeyDown:_NXkey,"aria-checked":on?"true":"false","aria-label":_NXtr(String(g.name)),
onClick:function(){cfg.quiet[g.id]=!on;_NXP.saveCfg();force();},
style:{display:"flex",alignItems:"center",gap:"11px",padding:"11px 13px",borderRadius:"14px",cursor:"pointer",animationDelay:(Math.min(k,20)*25)+"ms",
background:on?_NXteinte(P.info,9):P.inset,border:"1px solid "+(on?_NXteinte(P.info,38):P.line)}},
i("div",{style:{width:"30px",height:"30px",borderRadius:"10px",flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",
background:_NXteinte(on?P.info:P.txt,on?18:6),color:on?P.info:P.sub,fontSize:"12px",fontWeight:"800"}},_NXtr(String(g.name).charAt(0).toUpperCase())),
i("div",{style:{flex:1,minWidth:0,fontSize:"12.5px",fontWeight:on?"700":"500",color:on?P.txt:P.sub,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(String(g.name))),
_NXtr(interrupteur(on,P.info,false)));}))),{mb:0});}

// ------------------------------------------------------------ le journal
function heure(t,sec){try{var d=new Date(t);return pad(d.getHours())+":"+pad(d.getMinutes())+(sec?(":"+pad(d.getSeconds())):"");}catch(_){return "";}}
function vueJournal(){
var BL=Array.isArray(_NXP.blocked)?_NXP.blocked:[];
var LG=_NXP.log||[];
var conn=(window._NXNET&&_NXNET.conn)?_NXNET.conn:[];
return i("div",null,
_NXcard(i("div",null,
_NXch(_T("Compteurs"),_T("Depuis l installation du client.")),
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:"10px"}},
[[_NXn(st.seen||0),_T("interceptees"),P.txt],[_NXn(st.blocked||0),_T("arretees"),P.ok],[_NXn(_NXP.seen||0),_T("cette session"),P.txt],[_NXn(_NXP.nBlocked||0),_T("arretees ici"),P.ok]].map(function(x,k){
return i("div",{key:k,style:{padding:"12px 14px",borderRadius:"14px",background:P.inset,border:"1px solid "+P.line}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:"22px",fontWeight:"800",color:x[2]}},_NXtr(x[0])),
i("div",{style:{fontSize:"10.5px",color:P.dim,marginTop:"3px"}},_NXtr(x[1])));})),
i("div",{style:{display:"flex",gap:"8px",marginTop:"14px",flexWrap:"wrap"}},
_NXtr(bouton(_T("Remettre les compteurs a zero"),function(){if(window.confirm(_T("Remettre tous les compteurs de vie privee a zero ?"))){_NXP.resetStats();force();}},{creux:true,col:P.sub})),
_NXtr(bouton(_T("Effacer les traces maintenant"),function(){var n=_NXP.purgeTraces(true);try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr(n)+" "+_T("trace(s) effacee(s)."),1);}catch(_){}force();},{creux:true,col:P.sub,icone:"poubelle"})))),{mb:12}),
(!BL.length&&!LG.length&&!conn.length)?_NXcard(_NXFX.vide({icone:"liste",titre:_T("Rien d intercepte pour l instant"),
texte:_T("Active des reglages, puis reviens : chaque requete interceptee apparaitra ici, a la seconde pres.")}),{mb:0}):null,
BL.length?_NXcard(i("div",null,
_NXch(_T("Requetes arretees"),_T("Ce qui n a pas quitte cette machine."),bouton(_T("Vider"),function(){_NXP.blocked=[];force();},{creux:true,col:P.sub})),
i("div",{style:{maxHeight:"300px",overflowY:"auto"}},
BL.slice(0,50).map(function(r,k){
return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"10px",padding:"9px 11px",borderRadius:"11px",marginBottom:"5px",
background:P.inset,border:"1px solid "+P.line}},
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint,flexShrink:0}},_NXtr(heure(r.t,true))),
_NXtr(chip(_T(_NXP.kindFr(r.k)),P.ok,null)),
i("span",{style:{flex:1,minWidth:0,fontSize:"11px",color:P.dim,fontFamily:_NXf.mono,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(String(r.h||""))));}))),{mb:12}):null,
LG.length?_NXcard(i("div",null,
_NXch(_T("Flux en direct"),_T("Tout ce qui est intercepte, arrete ou non.")),
i("div",{style:{maxHeight:"240px",overflowY:"auto"}},
LG.slice(0,40).map(function(e,k){
return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 0",borderBottom:"1px solid "+P.line}},
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint,flexShrink:0}},_NXtr(heure(e.t,true))),
i("span",{style:{width:"7px",height:"7px",borderRadius:"50%",flexShrink:0,background:e.b?P.ok:P.warn}}),
i("span",{style:{flex:1,minWidth:0,fontSize:"12px",color:P.sub}},_T(_NXP.kindFr(e.k))),
i("span",{style:{fontSize:"10.5px",color:e.b?P.ok:P.faint,flexShrink:0,fontWeight:"700"}},e.b?_T("arretee"):_T("passee")));}))),{mb:12}):null,
conn.length?_NXcard(i("div",null,
_NXch(_T("Connexions au serveur Discord"),_T("Depuis le demarrage de ce client.")),
conn.slice(0,14).map(function(c,k){
return i("div",{key:k,style:{display:"flex",gap:"10px",padding:"7px 0",borderBottom:"1px solid "+P.line}},
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint,flexShrink:0}},_NXtr(heure(c.t||Date.now()))),
i("span",{style:{fontSize:"12px",color:P.sub}},_NXtr(String(c.k||c.t||""))));})),{mb:0}):null);}

// ------------------------------------------------------------ la page
var TABS=[["tableau",_T("Tableau de bord"),"oeilBarre",""],["reglages",_T("Reglages"),"reglages",Math.round(B.on)+"/"+B.acc],
["serveurs",_T("Serveurs"),"comptes",""],["journal",_T("Journal"),"liste",""],["preuve",_T("Preuve"),"bouclierOk",""]];
var contenu=tab==="tableau"?vueTableau():(tab==="reglages"?vueReglages():(tab==="serveurs"?vueServeurs():
(tab==="journal"?vueJournal():i(NexiumPreuveComp,{g:"privacy"}))));
return i(Kr,null,i("div",{className:an?"nxp-anim":"",style:{maxWidth:"940px",margin:"0 auto"}},
i("style",null,CSS),
_NXFX.onglets(TABS,tab,function(k){if(tab!==k){setTab(k);setQ("");}},{col:scol}),
i("div",{key:tab},_NXtr(contenu)),
_NXfoot(_NXtr("Nexium Privacy · ")+_T("interception locale, rien n est envoye"))));
}

