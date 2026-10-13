var _NXRES_CSS=".nxres-led{position:relative;width:11px;height:11px;border-radius:50%;flex:0 0 auto;}"+
".nxres-led::after{content:'';position:absolute;inset:-6px;border-radius:50%;border:1px solid currentColor;opacity:0;}"+
".nxed-anim .nxres-led::after{animation:nxresLed 2.2s ease-out infinite;}"+
"@keyframes nxresLed{0%{transform:scale(.5);opacity:.8}100%{transform:scale(1.6);opacity:0}}"+
".nxres-aiguille{transform-origin:50% 100%;transition:transform 1.5s cubic-bezier(.34,1.45,.5,1);}"+
".nxres-curseur{transition:transform .5s cubic-bezier(.34,1.3,.64,1);}"+
".nxres-ecran{background-color:#0a0d0c;background-image:repeating-linear-gradient(0deg,rgba(127,211,196,.07) 0 1px,transparent 1px 34px),"+
"repeating-linear-gradient(90deg,rgba(127,211,196,.07) 0 1px,transparent 1px 60px);}"+
".nxres-faisceau{position:absolute;inset:0;pointer-events:none;transform:translate3d(-100%,0,0);"+
"background:linear-gradient(90deg,transparent 0,transparent 82%,rgba(127,211,196,.10) 96%,rgba(127,211,196,.45) 99.6%,transparent 100%);}"+
".nxed-anim .nxres-faisceau{animation:nxresBalaye 3.4s linear infinite;}"+
"@keyframes nxresBalaye{from{transform:translate3d(-100%,0,0)}to{transform:translate3d(0,0,0)}}"+
".nxres-balai{position:absolute;inset:0;border-radius:50%;pointer-events:none;"+
"background:conic-gradient(from 0deg,rgba(127,211,196,0) 0deg,rgba(127,211,196,0) 290deg,rgba(127,211,196,.22) 352deg,rgba(127,211,196,.55) 360deg);}"+
".nxed-anim .nxres-balai{animation:nxresTour 4s linear infinite;}"+
"@keyframes nxresTour{to{transform:rotate(360deg)}}"+
".nxres-point{position:absolute;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;opacity:.4;}"+
".nxed-anim .nxres-point{animation:nxresEclat 4s ease-out infinite;}"+
"@keyframes nxresEclat{0%{opacity:1;transform:scale(1.9)}22%{opacity:.55;transform:scale(1.1)}100%{opacity:.4;transform:scale(1)}}"+
".nxres-volet{display:inline-block;position:relative;min-width:17px;height:26px;line-height:26px;text-align:center;"+
"border-radius:4px;background:#17191c;color:#f4ede1;font-weight:600;margin-right:2px;box-shadow:inset 0 -1px 0 rgba(0,0,0,.6);}"+
".nxres-volet::after{content:'';position:absolute;left:0;right:0;top:50%;height:1px;background:rgba(0,0,0,.65);}"+
".nxed-anim .nxres-volet{animation:nxresVolet .55s cubic-bezier(.3,1.4,.6,1) both;transform-origin:50% 50%;}"+
"@keyframes nxresVolet{from{transform:perspective(200px) rotateX(-92deg)}to{transform:perspective(200px) rotateX(0)}}"+
".nxres-sonar{position:absolute;inset:0;border-radius:50%;border:1px solid currentColor;opacity:0;pointer-events:none;}"+
".nxres-cherche .nxres-sonar{animation:nxresSonar 1.4s ease-out infinite;}"+
".nxres-cherche .nxres-sonar:nth-child(2){animation-delay:.47s}.nxres-cherche .nxres-sonar:nth-child(3){animation-delay:.94s}"+
"@keyframes nxresSonar{0%{transform:scale(1);opacity:.7}100%{transform:scale(2.4);opacity:0}}"+
".nxres-tube{transform-origin:bottom center;transition:transform 1s cubic-bezier(.22,1,.36,1);}";
function NexiumNetworkComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _t0=F.useState("direct");var tab=_t0[0];var setTab=_t0[1];
F.useEffect(function(){
var vivant=true,att=null;
var maj=function(){try{if(!vivant||att)return;att=setTimeout(function(){att=null;if(vivant)force();},450);}catch(_){}};
try{if(window._NXNET)_NXNET.listeners.push(maj);}catch(_){}
try{_NXED.feuille("nx-res-style",_NXRES_CSS);}catch(_){}
var id=setInterval(function(){try{if(typeof document==="undefined"||!document.hidden)maj();}catch(_){}},2000);
return function(){vivant=false;
try{if(att)clearTimeout(att);}catch(_){}
try{clearInterval(id);}catch(_){}
try{if(window._NXNET)_NXNET.listeners=_NXNET.listeners.filter(function(f){return f!==maj;});}catch(_){}};},[]);
var monte=_NXmounted(F);
var P=_NXpal,ACC=P.cyan,AMBRE=P.warn;
var net=window._NXNET;
function entete(droite){
return i("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:"20px",flexWrap:"wrap",marginBottom:"26px"}},
i("div",null,
i("div",{style:{fontSize:"12.5px",color:"var(--m)",letterSpacing:".02em"}},_T("Réseau")),
i("div",{style:{fontFamily:"var(--serif)",fontSize:"36px",lineHeight:1.1,marginTop:"4px",color:"var(--c)"}},"Nexium Réseau"),
i("div",{style:{fontSize:"13.5px",color:"var(--m)",lineHeight:1.6,marginTop:"6px",maxWidth:"520px"}},
_T("La latence est mesurée sur les requêtes que Discord fait déjà. Aucune requête n’est ajoutée, sauf quand tu demandes une mesure."))),
droite||null);}
if(!net||!net.stats)return i(Kr,null,_NXED.racine({acc:ACC,acc2:AMBRE},entete(),
_NXED.vide(_T("Le module réseau n’a pas démarré."),_T("Redémarre Discord : la mesure reprend toute seule au lancement."))));
var S=net.stats();
var ss=net.samples||[];
var seuil=net.cfg.seuil;
function hh(t){var d=new Date(t);return _NXNET.pad2(d.getHours())+":"+_NXNET.pad2(d.getMinutes());}
function teinte(ms){if(!ms)return "var(--f)";return ms<seuil*0.45?P.ok:(ms<seuil?AMBRE:P.danger);}
function qualite(ms){
if(!ms)return {t:_T("En attente"),d:_T("Aucune requête mesurée pour l’instant.")};
if(ms<80)return {t:_T("Liaison excellente"),d:_T("La liaison avec Discord est très bonne.")};
if(ms<160)return {t:_T("Liaison correcte"),d:_T("Latence normale, rien de perceptible.")};
if(ms<seuil)return {t:_T("Liaison moyenne"),d:_T("Les envois peuvent marquer un temps.")};
return {t:_T("Liaison lente"),d:_T("Au-delà de ton seuil : messages et vocal en souffrent.")};}
var Q=qualite(S.avg);
var stab=!S.n?_T("stabilité inconnue"):(S.gigue<30?_T("stable"):(S.gigue<80?_T("variable"):_T("instable")));

// Un cadran : trois zones, onze graduations, une aiguille HTML que le
// compositeur fait tourner. Au montage elle part de zero et va a la mesure.
function cadran(val,max,lab,cle,zg,za){
zg=zg||seuil*0.45;za=za||seuil;
var tv=!val?"var(--f)":(val<zg?P.ok:(val<za?AMBRE:P.danger));
var f=Math.max(0,Math.min(1,(val||0)/max));
var ang=-90+(monte?f:0)*180;
function pt(fr,r){var t=Math.PI*(1-fr);return [(100+r*Math.cos(t)).toFixed(1),(100-r*Math.sin(t)).toFixed(1)];}
function arc(f0,f1,col){var a=pt(f0,84),b=pt(f1,84);
return i("path",{key:f0,d:"M "+a[0]+" "+a[1]+" A 84 84 0 0 1 "+b[0]+" "+b[1],fill:"none",stroke:col,"stroke-width":"7","stroke-linecap":"butt"});}
var g=[];for(var a=0;a<=10;a++){var p1=pt(a/10,72),p2=pt(a/10,a%5===0?62:67);
g.push(i("line",{key:"g"+a,x1:p1[0],y1:p1[1],x2:p2[0],y2:p2[1],stroke:"rgba(239,232,220,.35)","stroke-width":a%5===0?"1.6":"1"}));}
var z1=Math.min(1,zg/max),z2=Math.min(1,za/max);
return i("div",{key:cle,style:{position:"relative",width:"200px",flex:"0 0 auto"}},
i("div",{style:{position:"relative",width:"200px",height:"108px"}},
i("svg",{viewBox:"0 0 200 108",width:200,height:108,"aria-hidden":"true",style:{position:"absolute",left:0,top:0,overflow:"visible"}},
arc(0,z1,_NXED.a(P.ok,0.55)),
arc(z1,z2,_NXED.a(AMBRE,0.55)),
z2<1?arc(z2,1,_NXED.a(P.danger,0.55)):null,
g),
i("div",{className:"nxres-aiguille","aria-hidden":"true",style:{position:"absolute",left:"99px",top:"24px",width:"2px",height:"76px",
borderRadius:"2px",background:"linear-gradient(to top,var(--c),"+tv+")",transform:"rotate("+ang+"deg)"}}),
i("div",{"aria-hidden":"true",style:{position:"absolute",left:"93px",top:"94px",width:"14px",height:"14px",borderRadius:"50%",
background:"#15130f",border:"2px solid var(--c)",boxSizing:"border-box"}})),
i("div",{style:{textAlign:"center",marginTop:"8px"}},
i("div",{style:{fontFamily:"var(--serif)",fontSize:"28px",color:tv,fontVariantNumeric:"tabular-nums"}},val?(_NXtr(val)+" ms"):"—"),
i("div",{style:{fontSize:"12.5px",color:"var(--m)",marginTop:"2px"}},_NXtr(lab))));}

function commutateur(){
var T=[["direct","En direct"],["hotes","Hôtes"],["routes","Routes"],["reglages","Réglages"]];
var k=0;for(var a=0;a<T.length;a++)if(T[a][0]===tab)k=a;
return i("div",{role:"tablist",style:{position:"relative",display:"flex",border:"1px solid var(--l2)",borderRadius:"99px",padding:"4px",
margin:"30px 0 8px",maxWidth:"560px"}},
i("div",{className:"nxres-curseur","aria-hidden":"true",style:{position:"absolute",top:"4px",bottom:"4px",left:"4px",
width:"calc((100% - 8px) / "+T.length+")",borderRadius:"99px",background:ACC,transform:"translateX("+(k*100)+"%)"}}),
T.map(function(t){var on=t[0]===tab;
return i("div",{key:t[0],className:"nx-fx",role:"tab","aria-selected":on?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){if(!on)setTab(t[0]);},
style:{position:"relative",flex:1,textAlign:"center",padding:"8px 0",fontSize:"13px",cursor:"pointer",
color:on?"#0d1513":"var(--m)",fontWeight:on?"600":"400",transition:"color .3s ease"}},_NXtr(t[1]));}));}

function oscillo(){
var vals=ss.slice(-120);
var W=760,H=170;
var corps;
if(vals.length<2)corps=i("div",{style:{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",
fontSize:"13px",color:"rgba(127,211,196,.7)"}},_T("En attente des premières requêtes de Discord."));
else{
var mx=Math.max(S.max||0,seuil,120)*1.1;
var pas=W/(vals.length-1),pts=[];
for(var a=0;a<vals.length;a++)pts.push((a*pas).toFixed(1)+","+(H-Math.max(3,Math.min(H-3,vals[a].ms/mx*H))).toFixed(1));
var yS=(H-Math.min(H-3,seuil/mx*H)).toFixed(1);
var der=vals[vals.length-1];
corps=i("svg",{viewBox:"0 0 "+W+" "+H,preserveAspectRatio:"none",style:{position:"absolute",inset:0,width:"100%",height:"100%"},"aria-hidden":"true"},
i("line",{x1:"0",y1:yS,x2:W,y2:yS,stroke:P.danger,"stroke-width":"1","stroke-dasharray":"5 5","stroke-opacity":".7","vector-effect":"non-scaling-stroke"}),
i("polyline",{points:pts.join(" "),fill:"none",stroke:ACC,"stroke-width":"1.8","stroke-linejoin":"round","vector-effect":"non-scaling-stroke"}),
i("circle",{cx:W,cy:(H-Math.max(3,Math.min(H-3,der.ms/mx*H))).toFixed(1),r:"3.5",fill:teinte(der.ms)}));}
return i("div",{className:"nxres-ecran",style:{position:"relative",height:H+"px",borderRadius:"14px",overflow:"hidden",border:"1px solid rgba(127,211,196,.18)"}},
corps,
i("div",{className:"nxres-faisceau","aria-hidden":"true"}),
i("div",{style:{position:"absolute",left:"12px",top:"10px",fontSize:"11px",color:"rgba(127,211,196,.8)",fontFamily:_NXf.mono}},
_NXtr(S.n||0)+" "+_T("mesures")),
i("div",{style:{position:"absolute",right:"12px",top:"10px",fontSize:"11px",color:P.danger,fontFamily:_NXf.mono,opacity:.85}},
_T("seuil")+" "+_NXtr(seuil)+" ms"));}

function sonar(){
var cherche=!!net.pinging;
return i("div",{style:{display:"flex",alignItems:"center",gap:"22px",flexWrap:"wrap"}},
i("div",{className:"nx-fx"+(cherche?" nxres-cherche":""),role:"button","aria-label":_T("Lancer une mesure"),tabIndex:0,onKeyDown:_NXkey,
onClick:function(){if(!net.pinging)net.ping(function(){force();});force();},
style:{position:"relative",width:"64px",height:"64px",borderRadius:"50%",cursor:"pointer",flex:"0 0 auto",color:ACC,
display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid "+_NXED.a(ACC,0.6),background:_NXED.a(ACC,0.08)}},
i("span",{className:"nxres-sonar"}),i("span",{className:"nxres-sonar"}),i("span",{className:"nxres-sonar"}),
i("span",{style:{width:"12px",height:"12px",borderRadius:"50%",background:ACC}})),
i("div",null,
i("div",{style:{fontFamily:"var(--serif)",fontSize:"34px",fontVariantNumeric:"tabular-nums",color:net.dernierPing?teinte(net.dernierPing):"var(--f)"}},
cherche?_T("Mesure…"):(net.dernierPing?(_NXtr(net.dernierPing)+" ms"):"—")),
i("div",{style:{fontSize:"12.5px",color:"var(--m)",marginTop:"2px"}},
_T("Une requête vers la passerelle Discord, chronométrée de bout en bout."))));}

function direct(){
var Hs=net.heures(24);
var hmax=Math.max(seuil,1);for(var a=0;a<Hs.length;a++)if(Hs[a].moy>hmax)hmax=Hs[a].moy;
var coup=(net.hist&&net.hist.coupures)||[];
return i("div",{className:"nxed-monte"},
_NXED.section(_T("L’oscilloscope"),_T("Chaque point est une requête que Discord a faite, chronométrée au passage."),oscillo(),null,"d1"),
_NXED.section(_T("Mesurer maintenant"),null,sonar(),null,"d2"),
_NXED.section(_T("Les dernières vingt-quatre heures"),_T("Latence moyenne heure par heure, gardée entre les sessions."),
i("div",null,
i("div",{style:{display:"flex",alignItems:"flex-end",gap:"5px",height:"110px"}},Hs.map(function(e,k){
var f=e.moy?Math.max(0.05,e.moy/hmax):0;
return i("div",{key:k,title:e.h+" h · "+(e.n?(_NXtr(e.moy)+" ms, "+_NXtr(e.n)+" "+_T("requêtes")):_T("aucune requête")),
style:{flex:1,minWidth:0,height:"100%",borderRadius:"99px",background:"rgba(239,232,220,.05)",position:"relative",overflow:"hidden"}},
i("div",{className:"nxres-tube",style:{position:"absolute",left:0,right:0,bottom:0,height:"100%",borderRadius:"99px",
background:e.n?"linear-gradient(to top,"+_NXED.a(teinte(e.moy)==="var(--f)"?ACC:teinte(e.moy),0.25)+","+(teinte(e.moy)==="var(--f)"?ACC:teinte(e.moy))+")":"transparent",
transform:"scaleY("+(monte?f:0)+")",transitionDelay:(k*25)+"ms"}}));})),
i("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"8px",fontSize:"11.5px",color:"var(--m)"}},
i("span",null,_T("il y a 24 h")),i("span",null,_T("maintenant")))),null,"d3"),
coup.length?_NXED.section(_T("Coupures"),_T("Plus de deux minutes sans la moindre requête vers Discord."),
_NXED.registre(coup.slice(0,8).map(function(c){var min=Math.round(c.ms/60000);
return {lab:hh(c.t),v:_T("interruption de")+" "+(min>=60?(Math.round(min/60)+" h"):(min+" min")),col:AMBRE};})),null,"d4"):null,
(net.conn&&net.conn.length)?_NXED.section(_T("Journal de connexion"),null,
i("div",{style:{maxHeight:"220px",overflowY:"auto",fontFamily:_NXf.mono,fontSize:"12px"}},net.conn.slice(0,20).map(function(l,k){
var d=new Date(l.t);
return i("div",{key:k,style:{display:"flex",gap:"16px",padding:"5px 0",borderBottom:"1px solid var(--l)"}},
i("span",{style:{color:ACC,flexShrink:0}},_NXNET.pad2(d.getHours())+":"+_NXNET.pad2(d.getMinutes())+":"+_NXNET.pad2(d.getSeconds())),
i("span",{style:{color:"var(--c2)"}},_NXtr(String(l.type||""))));})),null,"d5"):null);}

// Le radar : un hote par point. L angle vient de son nom, toujours le meme ;
// plus il est joint souvent, plus il est pres du centre. Le point s allume
// au moment exact ou le balayage passe dessus.
function radar(L){
var G=window._NXGD,T=4;
return i("div",{style:{position:"relative",width:"300px",height:"300px",flex:"0 0 auto",borderRadius:"50%",overflow:"hidden",
background:"radial-gradient(circle,rgba(127,211,196,.07),rgba(10,13,12,.9) 72%)",border:"1px solid rgba(127,211,196,.28)"}},
[0.25,0.5,0.75].map(function(r,k){return i("div",{key:"r"+k,"aria-hidden":"true",style:{position:"absolute",left:(50-r*50)+"%",top:(50-r*50)+"%",
width:(r*100)+"%",height:(r*100)+"%",borderRadius:"50%",border:"1px solid rgba(127,211,196,.14)"}});}),
i("div",{"aria-hidden":"true",style:{position:"absolute",left:"50%",top:0,bottom:0,width:"1px",background:"rgba(127,211,196,.12)"}}),
i("div",{"aria-hidden":"true",style:{position:"absolute",top:"50%",left:0,right:0,height:"1px",background:"rgba(127,211,196,.12)"}}),
i("div",{className:"nxres-balai","aria-hidden":"true"}),
L.slice(0,28).map(function(o,k){
var connu=true;try{connu=G&&G.connu?G.connu(o.h):true;}catch(_){}
var th=((window._NXM&&_NXM.hache)?_NXM.hache(o.h):k*47)%360;
var r=0.16+0.30*(L.length>1?k/(L.length-1):0);
var x=50+r*100*Math.sin(th*Math.PI/180),y=50-r*100*Math.cos(th*Math.PI/180);
return i("div",{key:o.h,className:"nxres-point",title:o.h+" · "+o.n,style:{left:x+"%",top:y+"%",
background:connu?ACC:AMBRE,boxShadow:"0 0 8px "+(connu?ACC:AMBRE),animationDelay:(th/360*T).toFixed(2)+"s"}});}),
i("div",{"aria-hidden":"true",style:{position:"absolute",left:"50%",top:"50%",width:"6px",height:"6px",margin:"-3px 0 0 -3px",borderRadius:"50%",background:"var(--c)"}}));}

function hotes(){
var L=net.topHotes(30);
var mx=L.length?L[0].n:1;
var G=window._NXGD;
var inconnus=0;
for(var a=0;a<L.length;a++){try{if(G&&G.connu&&!G.connu(L[a].h))inconnus++;}catch(_){}}
if(!L.length)return _NXED.vide(_T("Aucun hôte pour l’instant."),_T("L’inventaire se remplit au fil des requêtes du client."));
return i("div",{className:"nxed-monte",style:{display:"flex",gap:"34px",flexWrap:"wrap",alignItems:"flex-start",paddingTop:"10px"}},
i("div",{style:{flex:"0 0 auto"}},radar(L),
i("div",{style:{display:"flex",gap:"18px",marginTop:"14px",fontSize:"12.5px",color:"var(--m)",justifyContent:"center"}},
i("span",null,i("span",{style:{display:"inline-block",width:"8px",height:"8px",borderRadius:"50%",background:ACC,marginRight:"7px"}}),_T("connu")),
i("span",null,i("span",{style:{display:"inline-block",width:"8px",height:"8px",borderRadius:"50%",background:AMBRE,marginRight:"7px"}}),_T("inconnu des gardes")))),
i("div",{style:{flex:"1 1 300px",minWidth:"260px"}},
i("div",{style:{fontFamily:"var(--serif)",fontSize:"22px",color:"var(--c)"}},_NXtr(L.length)+" "+_T("hôtes contactés")),
i("div",{style:{fontSize:"13px",color:inconnus?AMBRE:"var(--m)",margin:"4px 0 12px"}},
inconnus?(_NXtr(inconnus)+" "+_T("inconnu(s) des gardes de sortie")):_T("Tous reconnus par les gardes de sortie.")),
L.map(function(o){
var connu=true;try{connu=G&&G.connu?G.connu(o.h):true;}catch(_){}
return i("div",{key:o.h,className:"nxed-ligne",style:{display:"flex",alignItems:"center",gap:"12px",padding:"7px 10px",margin:"0 -10px"}},
i("span",{style:{width:"7px",height:"7px",borderRadius:"50%",flexShrink:0,background:connu?ACC:AMBRE}}),
i("span",{style:{flex:1,minWidth:0,fontFamily:_NXf.mono,fontSize:"12.5px",color:connu?"var(--c2)":"var(--c)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(o.h)),
i("div",{style:{width:"70px",flexShrink:0}},_NXED.barre(o.n/mx,connu?_NXED.a(ACC,0.7):AMBRE,3)),
i("span",{style:{width:"46px",textAlign:"right",fontSize:"12.5px",color:"var(--c)",fontVariantNumeric:"tabular-nums"}},_NXED.nombre(o.n)),
(!connu&&G&&G.approuver)?_NXED.lien(_T("Approuver"),function(){G.approuver(o.h);force();},false,"ap"):null);})));}

// Le tableau des departs : chaque chiffre de latence sur son volet, qui
// tourne a l arrivee de la page.
function routes(){
var L=net.topRoutes(14);
if(!L.length)return _NXED.vide(_T("Aucune route mesurée pour l’instant."),null);
return i("div",{className:"nxed-monte",style:{paddingTop:"10px"}},
i("div",{style:{borderRadius:"16px",border:"1px solid var(--l)",background:"#0f1011",padding:"8px 16px"}},
i("div",{style:{display:"flex",gap:"14px",padding:"8px 0 10px",fontSize:"11.5px",color:AMBRE,letterSpacing:".06em",borderBottom:"1px solid var(--l)"}},
i("span",{style:{width:"26px"}},"N°"),i("span",{style:{flex:1}},_T("Route de l’API Discord")),
i("span",{style:{width:"96px",textAlign:"right"}},_T("Latence")),i("span",{style:{width:"110px",textAlign:"right"}},_T("Appels · pic"))),
L.map(function(o,k){
var c=teinte(o.moy),ch=String(o.moy);
return i("div",{key:o.r,style:{display:"flex",alignItems:"center",gap:"14px",padding:"9px 0",borderBottom:k<L.length-1?"1px solid rgba(239,232,220,.05)":"none"}},
i("span",{style:{width:"26px",fontSize:"12.5px",color:"var(--f)",fontVariantNumeric:"tabular-nums"}},("0"+(k+1)).slice(-2)),
i("span",{style:{flex:1,minWidth:0,fontFamily:_NXf.mono,fontSize:"12.5px",color:"var(--c2)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(o.r)),
i("span",{style:{width:"96px",textAlign:"right",fontFamily:_NXf.mono,fontSize:"14px",whiteSpace:"nowrap"}},
ch.split("").map(function(d,n){return i("span",{key:n,className:"nxres-volet",style:{color:c,animationDelay:(k*60+n*70)+"ms"}},d);}),
i("span",{style:{marginLeft:"5px",fontSize:"11.5px",color:"var(--m)"}},"ms")),
i("span",{style:{width:"110px",textAlign:"right",fontSize:"12px",color:"var(--m)",fontVariantNumeric:"tabular-nums"}},
_NXtr("×")+_NXED.nombre(o.n)+" · "+_NXtr(o.max)));})));}

function reglages(){
return i("div",{className:"nxed-monte"},
_NXED.section(_T("Seuil de latence"),_T("Au-delà, une requête compte comme lente et passe en rouge sur les cadrans."),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},[150,250,350,500,800].map(function(v){
return _NXED.choix(v+" ms",seuil===v,function(){net.set("seuil",v);force();},v);})),null,"g1"),
_NXED.section(_T("Comportement"),null,i("div",null,
_NXED.inter(_T("Garder l’historique heure par heure"),_T("Sept jours de latence moyenne, pour retrouver les creux."),!!net.cfg.historique,function(){net.set("historique",!net.cfg.historique);force();},"hi"),
_NXED.inter(_T("Recenser les hôtes contactés"),_T("Chaque serveur joint par le client est noté, sans rien envoyer nulle part."),!!net.cfg.inventaire,function(){net.set("inventaire",!net.cfg.inventaire);force();},"in")),null,"g2"),
_NXED.section(_T("Tes mesures"),_T("Tout est calculé et gardé sur cette machine."),
i("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap"}},
_NXED.bouton(_T("Exporter en CSV"),function(){
var ok=net.exportCsv();
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(ok?_T("Fichier CSV téléchargé."):_T("Copié dans le presse-papiers."),1);}catch(_){}},{fort:true,cle:"x"}),
_NXED.bouton(_T("Effacer l’historique"),function(){
if(window.confirm(_T("Effacer tout l’historique réseau ?"))){net.reset();force();}},{danger:true,cle:"z"})),null,"g3"));}

var etat=i("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"10px 16px",borderRadius:"99px",border:"1px solid var(--l)"}},
i("span",{className:"nxres-led",style:{background:teinte(S.avg),color:teinte(S.avg)}}),
i("div",null,
i("div",{style:{fontSize:"13.5px",color:"var(--c)"}},_NXtr(Q.t)),
i("div",{style:{fontSize:"12px",color:"var(--m)"}},_NXtr(stab)+" · "+_T("gigue")+" "+_NXtr(S.gigue||0)+" ms · "+_NXtr(S.rpm||0)+" "+_T("req./min"))));
var cmax=Math.max(seuil*1.5,(S.max||0)*0.6,200);
return i(Kr,null,_NXED.racine({acc:ACC,acc2:AMBRE,max:820},
entete(etat),
i("div",{style:{display:"flex",justifyContent:"space-between",gap:"18px",flexWrap:"wrap",padding:"22px 10px 10px",
borderTop:"1px solid var(--l)",borderBottom:"1px solid var(--l)"}},
cadran(S.avg,cmax,_T("en moyenne"),"c1"),
cadran(S.p95,cmax,_T("pour 95 % des requêtes"),"c2"),
cadran(S.gigue,150,_T("de gigue"),"c3",30,80)),
commutateur(),
i("div",{key:tab},tab==="direct"?direct():tab==="hotes"?hotes():tab==="routes"?routes():reglages()),
_NXfoot(_NXtr("Nexium Réseau · mesure passive, aucune donnée envoyée"))));
}

