var _NXST_CSS=".nxst-roue{display:inline-block;height:1em;overflow:hidden;vertical-align:top;}"+
".nxst-ruban{display:flex;flex-direction:column;transition:transform 1.6s cubic-bezier(.16,1,.3,1);}"+
".nxst-ruban span{height:1em;line-height:1em;}"+
".nxed-anim .nxst-trait{stroke-dasharray:1;stroke-dashoffset:1;animation:nxstTrace 2s cubic-bezier(.45,0,.2,1) .2s forwards;}"+
"@keyframes nxstTrace{to{stroke-dashoffset:0}}"+
".nxst-aire{opacity:1;}"+
".nxed-anim .nxst-aire{animation:nxstAire 1.2s ease 1.2s both;}"+
"@keyframes nxstAire{from{opacity:0}to{opacity:1}}"+
".nxst-ici{transform-origin:center;}"+
".nxed-anim .nxst-ici{animation:nxstIci 2s ease-out infinite;}"+
"@keyframes nxstIci{0%{transform:scale(1);opacity:.9}100%{transform:scale(2.6);opacity:0}}"+
".nxst-curseur{transition:transform .55s cubic-bezier(.34,1.3,.64,1);}"+
".nxst-case{transform:scale(1);}"+
".nxed-anim .nxst-case{animation:nxstVague .7s cubic-bezier(.34,1.5,.6,1) both;}"+
"@keyframes nxstVague{from{transform:scale(.2)}to{transform:scale(1)}}"+
".nxst-rayon{transform-origin:50% 100%;transition:transform 1.1s cubic-bezier(.22,1,.36,1);}"+
".nxst-aiguille{transform-origin:50% 100%;transition:transform 1.8s cubic-bezier(.34,1.3,.5,1);}"+
".nxst-marche{transform-origin:bottom center;transition:transform 1.2s cubic-bezier(.34,1.25,.5,1);}"+
".nxst-anneau{transition:stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1);}"+
".nxst-pousse{transform-origin:left center;transition:transform 1.3s cubic-bezier(.22,1,.36,1);}"+
".nxst-colonne{transform-origin:bottom center;transition:transform 1s cubic-bezier(.22,1,.36,1);}";
function NexiumStatsComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _t0=F.useState("apercu");var tab=_t0[0];var setTab=_t0[1];
F.useEffect(function(){
var vivant=true,r=_NXS.rev;
try{_NXED.feuille("nx-st-style",_NXST_CSS);}catch(_){}
var id=setInterval(function(){try{
if((typeof document==="undefined"||!document.hidden)&&r!==_NXS.rev){r=_NXS.rev;if(vivant)force();}}catch(_){}},4000);
return function(){vivant=false;try{clearInterval(id);}catch(_){}};},[]);
var monte=_NXmounted(F);
var P=_NXpal,data=_NXS.data;
var ACC=P.info,ACC2=P.mauve;
var JOURS=["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
var JOURSL=["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"];
var MOIS=["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];
function duree(sec){sec=Math.floor(sec||0);
var h=Math.floor(sec/3600),m=Math.floor((sec%3600)/60);
if(h>=24){var j=Math.floor(h/24);return j+" j "+(h%24)+" h";}
return h>0?(h+" h "+m+" min"):(m+" min");}
function somme(obj,dep,n){var t=0,d=new Date();d.setHours(0,0,0,0);d.setDate(d.getDate()-dep);
for(var a=0;a<n;a++){t+=(obj&&obj[_NXS.dayKey(d.getTime())])||0;d.setDate(d.getDate()-1);}return t;}
function delta(a2,b2){if(b2>0)return Math.round((a2-b2)/b2*100);return a2>0?100:0;}
function jours(n){var out=[],mx=0,now=new Date();
for(var a=n-1;a>=0;a--){
var dt=new Date(now.getFullYear(),now.getMonth(),now.getDate()-a);
var k=_NXS.dayKey(dt.getTime());
var v=(data.daily&&data.daily[k])||0;
if(v>mx)mx=v;
out.push({k:k,d:dt,v:v});}
return {L:out,max:mx||1};}
function date(d){return d.getDate()+" "+MOIS[d.getMonth()];}
var total=data.msgCount||0;
var actifs=0;for(var dd in (data.daily||{}))if(data.daily[dd]>0)actifs++;
var moyJour=actifs>0?Math.round(total/actifs):0;
function serie(){var n=0,d=new Date();
if(((data.daily||{})[_NXS.dayKey(d.getTime())]||0)===0)d.setDate(d.getDate()-1);
while(((data.daily||{})[_NXS.dayKey(d.getTime())]||0)>0){n++;d.setDate(d.getDate()-1);if(n>3650)break;}
return n;}
var strie=serie();
var heures=[],parJour=[0,0,0,0,0,0,0],grand=0,soir=0;
for(var h2=0;h2<24;h2++)heures.push(0);
try{for(var r2=0;r2<7;r2++)for(var c2=0;c2<24;c2++){
var v2=data.heat[r2][c2];heures[c2]+=v2;parJour[r2]+=v2;grand+=v2;
if(c2>=18&&c2<=23)soir+=v2;}}catch(_){}
var picH=0;for(var z=1;z<24;z++)if(heures[z]>heures[picH])picH=z;
var picJ=0;for(var z2=1;z2<7;z2++)if(parJour[z2]>parJour[picJ])picJ=z2;
var longMoy=total>0?Math.round((data.totalChars||0)/total):0;
var mS=somme(data.daily,0,7),mP=somme(data.daily,7,7);
var vS=somme(data.voiceDaily,0,7),vP=somme(data.voiceDaily,7,7);
var rS=somme(data.givenDaily,0,7)+somme(data.recvDaily,0,7);
var rP=somme(data.givenDaily,7,7)+somme(data.recvDaily,7,7);
var ry=_NXS.rythmeMoyen();
var pause=_NXS.pauseMax();
var obj=_NXS.objectifJour();
function classement(obj2,n){
var out=[],t=0;
for(var k in (obj2||{})){t+=obj2[k];out.push({id:k,v:obj2[k]});}
out.sort(function(x,y){return y.v-x.v;});
return {L:out.slice(0,n||8),max:out.length?out[0].v:1,total:t};}
var G=classement(data.guilds,8),C=classement(data.channels,8),V=classement(data.voiceGuilds,6);
var W=classement(data.words,18),E=classement(data.emojis,10);
function rampe(v,mx){if(!v)return "var(--l)";var f=v/(mx||1);return _NXED.a(ACC,f<=0.25?0.28:f<=0.5?0.5:f<=0.75?0.74:1);}

// Le compteur a rouleaux : chaque chiffre est une bande de dix qui defile
// jusqu au bon. Au montage, tout part de zero.
function rouleaux(v,taille){
var s=_NXED.nombre(v);
return i("span",{"aria-label":s,style:{display:"inline-flex",fontSize:taille+"px",lineHeight:1,fontVariantNumeric:"tabular-nums"}},
s.split("").map(function(ch,k){
if(!/[0-9]/.test(ch))return i("span",{key:k,style:{width:".25em"}}," ");
var d=parseInt(ch,10);
return i("span",{key:k,className:"nxst-roue","aria-hidden":"true"},
i("span",{className:"nxst-ruban",style:{transform:"translateY(-"+((monte?d:0)*10)+"%)",transitionDelay:(k*90)+"ms"}},
[0,1,2,3,4,5,6,7,8,9].map(function(n){return i("span",{key:n},String(n));})));}));}

// La riviere : quatre-vingt-dix jours lisses, le trait se dessine, l aire
// arrive apres, et le point d aujourd hui bat.
function riviere(){
var J=jours(90),W2=760,H=150,L=J.L,n=L.length;
var lisse=[];for(var a=0;a<n;a++){var s3=0,c3=0;for(var b=-2;b<=2;b++){var x=L[a+b];if(x){s3+=x.v;c3++;}}lisse.push(s3/c3);}
var mx=1;for(var a2=0;a2<n;a2++)if(lisse[a2]>mx)mx=lisse[a2];
function pt(k){return [(k/(n-1)*W2).toFixed(1),(H-8-lisse[k]/mx*(H-24)).toFixed(1)];}
var d="M "+pt(0).join(" ");
for(var k=1;k<n;k++){var p0=pt(k-1),p1=pt(k),cx=((+p0[0]+ +p1[0])/2).toFixed(1);
d+=" C "+cx+" "+p0[1]+" "+cx+" "+p1[1]+" "+p1[0]+" "+p1[1];}
var aire=d+" L "+W2+" "+H+" L 0 "+H+" Z";
var fin=pt(n-1);
var mois=[];for(var m=1;m<n;m++)if(L[m].d.getDate()===1&&m/(n-1)<0.88)mois.push({x:m/(n-1)*100,t:MOIS[L[m].d.getMonth()]});
return i("div",{style:{position:"relative",marginTop:"18px"}},
i("svg",{viewBox:"0 0 "+W2+" "+H,preserveAspectRatio:"none",style:{width:"100%",height:H+"px",display:"block",overflow:"visible"},"aria-hidden":"true"},
i("defs",null,i("linearGradient",{id:"nxstg",x1:"0",y1:"0",x2:"0",y2:"1"},
i("stop",{offset:"0%","stop-color":ACC,"stop-opacity":".32"}),i("stop",{offset:"100%","stop-color":ACC2,"stop-opacity":"0"}))),
i("path",{className:"nxst-aire",d:aire,fill:"url(#nxstg)"}),
i("path",{className:"nxst-trait",d:d,fill:"none",stroke:ACC,"stroke-width":"2",pathLength:"1"})),
i("div",{"aria-hidden":"true",style:{position:"absolute",right:"-5px",top:(+fin[1]-5)+"px",width:"10px",height:"10px"}},
i("span",{className:"nxst-ici",style:{position:"absolute",inset:0,borderRadius:"50%",border:"1.5px solid "+ACC,boxSizing:"border-box"}}),
i("span",{style:{position:"absolute",inset:"1px",borderRadius:"50%",background:"#f4ede1"}})),
i("div",{style:{position:"relative",height:"18px",marginTop:"6px",borderTop:"1px solid var(--l)"}},
mois.map(function(o,k){return i("span",{key:k,style:{position:"absolute",left:o.x+"%",top:"5px",fontSize:"11.5px",color:"var(--m)",
borderLeft:"1px solid var(--l2)",paddingLeft:"5px"}},o.t);}),
i("span",{style:{position:"absolute",right:0,top:"5px",fontSize:"11.5px",color:"var(--c)"}},_T("aujourd’hui"))));}

// La regle graduee : quatre reperes, et un curseur qui glisse sous le bon.
function regle(){
var T=[["apercu","Aperçu"],["rythme","Rythme"],["classements","Classements"],["objectifs","Objectifs"]];
var k=0;for(var a=0;a<T.length;a++)if(T[a][0]===tab)k=a;
var traits=[];for(var t=0;t<=40;t++)traits.push(i("span",{key:t,style:{position:"absolute",left:(t/40*100)+"%",bottom:0,width:"1px",
height:t%10===0?"12px":(t%5===0?"8px":"5px"),background:t%10===0?"var(--l2)":"var(--l)"}}));
return i("div",{style:{position:"relative",margin:"34px 0 10px",paddingBottom:"16px"}},
i("div",{role:"tablist",style:{display:"flex"}},T.map(function(o){var on=o[0]===tab;
return i("div",{key:o[0],className:"nx-fx nxed-onglet",role:"tab","aria-selected":on?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){if(!on)setTab(o[0]);},
style:{flex:1,textAlign:"center",paddingBottom:"14px",fontSize:on?"15px":"13.5px",fontFamily:on?"var(--serif)":"inherit",color:on?"var(--c)":null,transition:"font-size .2s ease"}},
_NXtr(o[1]));})),
i("div",{"aria-hidden":"true",style:{position:"relative",height:"12px",borderBottom:"1px solid var(--l2)"}},traits),
i("div",{className:"nxst-curseur","aria-hidden":"true",style:{position:"absolute",left:0,bottom:"0",width:"25%",display:"flex",justifyContent:"center",
transform:"translateX("+(k*100)+"%)"}},
i("span",{style:{width:0,height:0,borderLeft:"7px solid transparent",borderRight:"7px solid transparent",borderBottom:"9px solid "+ACC}})));}

function evol(d){if(!d)return {t:"stable",c:"var(--m)"};return {t:(d>0?"+":"−")+Math.abs(d)+" %",c:d>0?P.ok:P.warn};}
function fort(v,mot,ev){return i("span",{style:{whiteSpace:"nowrap"}},
i("span",{style:{fontFamily:"var(--serif)",fontSize:"27px",color:"var(--c)",fontVariantNumeric:"tabular-nums"}},v),
" "+mot,
ev?i("span",{style:{fontFamily:"inherit",fontSize:"13px",color:ev.c,marginLeft:"6px",verticalAlign:"super"}},ev.t):null);}

function calendrier(){
var J=jours(91),sem=[],cur=[];
for(var a=0;a<J.L.length;a++){cur.push(J.L[a]);if(cur.length===7){sem.push(cur);cur=[];}}
if(cur.length)sem.push(cur);
return i("div",{style:{display:"flex",gap:"4px",overflowX:"auto",paddingBottom:"4px"}},
sem.map(function(w,k){
return i("div",{key:k,style:{display:"flex",flexDirection:"column",gap:"4px"}},
w.map(function(d,k2){
return i("div",{key:k2,className:"nxst-case",title:date(d.d)+" · "+_NXtr(d.v)+" "+_T("messages"),
style:{width:"14px",height:"14px",borderRadius:"4px",background:rampe(d.v,J.max),animationDelay:((k+k2)*35)+"ms"}});}));}));}

function apercu(){
var em=evol(delta(mS,mP)),ev=evol(delta(vS,vP)),er=evol(delta(rS,rP));
var dm=data.dm||0,sv=data.srv||0,tdm=dm+sv;
return i("div",{className:"nxed-monte"},
i("div",{style:{fontFamily:"var(--serif)",fontSize:"22px",lineHeight:1.75,color:"var(--c2)",maxWidth:"700px",padding:"10px 0 26px"}},
_T("Cette semaine, tu as envoyé")," ",fort(_NXED.nombre(mS),_T("messages"),em),", ",_T("passé")," ",fort(duree(vS),_T("en vocal"),ev),
" ",_T("et donné ou reçu")," ",fort(_NXED.nombre(rS),_T("réactions"),er),".",
i("span",{style:{display:"block",fontSize:"15px",color:"var(--m)",fontFamily:"inherit",marginTop:"6px",lineHeight:1.6}},
_T("En moyenne")+" "+_NXtr(moyJour)+" "+_T("messages par jour actif, sur")+" "+_NXtr(actifs)+" "+_T("jours actifs. Les écarts comparent aux sept jours d’avant."))),
i("div",{style:{display:"flex",gap:"40px",flexWrap:"wrap",borderTop:"1px solid var(--l)",paddingTop:"24px"}},
i("div",{style:{flex:"0 0 auto"}},
i("div",{style:{fontFamily:"var(--serif)",fontSize:"20px",color:"var(--c)"}},_T("Constance")),
i("div",{style:{fontSize:"12.5px",color:"var(--m)",margin:"4px 0 14px"}},
strie>0?(_T("Tu écris depuis")+" "+_NXtr(strie)+" "+_T(strie>1?"jours d’affilée.":"jour.")):_T("Treize semaines, un carré par jour.")),
calendrier()),
i("div",{style:{flex:"1 1 280px",minWidth:"260px"}},
i("div",{style:{fontFamily:"var(--serif)",fontSize:"20px",color:"var(--c)",marginBottom:"8px"}},_T("Ce que tu écris")),
_NXED.registre([
{lab:_T("Caractères"),v:_NXED.nombre(data.totalChars||0)},
{lab:_T("Longueur moyenne"),v:_NXtr(longMoy)+" "+_T("caractères")},
{lab:_T("Liens partagés"),v:_NXED.nombre(data.links||0)},
{lab:_T("Fichiers envoyés"),v:_NXED.nombre(data.attach||0)},
{lab:_T("Mentions"),v:_NXED.nombre(data.mentions||0)},
{lab:_T("Messages modifiés"),v:_NXED.nombre(data.edited||0)},
{lab:_T("Messages supprimés"),v:_NXED.nombre(data.deleted||0)},
{lab:_T("Plus longue pause"),v:(pause||0)+" j"}]))),
i("div",{style:{borderTop:"1px solid var(--l)",marginTop:"26px",paddingTop:"22px"}},
i("div",{style:{fontFamily:"var(--serif)",fontSize:"20px",color:"var(--c)",marginBottom:"12px"}},_T("Où tu parles")),
tdm?i("div",null,
i("div",{style:{display:"flex",height:"14px",borderRadius:"99px",overflow:"hidden",background:"var(--l)"}},
i("div",{className:"nxst-pousse",style:{width:(sv/tdm*100)+"%",background:ACC,transform:"scaleX("+(monte?1:0)+")"}}),
i("div",{className:"nxst-pousse",style:{width:(dm/tdm*100)+"%",background:ACC2,transform:"scaleX("+(monte?1:0)+")",transitionDelay:".3s"}})),
i("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"10px",fontSize:"13px",color:"var(--c2)"}},
i("span",null,_T("Serveurs")+" · "+_NXED.nombre(sv)+" ("+Math.round(sv/tdm*100)+" %)"),
i("span",{style:{color:ACC2}},_T("Messages privés")+" · "+_NXED.nombre(dm)+" ("+Math.round(dm/tdm*100)+" %)")))
:i("div",{style:{fontSize:"13px",color:"var(--m)"}},_T("Pas encore assez de messages pour trancher."))),
i("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap",alignItems:"center",borderTop:"1px solid var(--l)",marginTop:"26px",paddingTop:"20px"}},
i("span",{style:{fontSize:"13px",color:"var(--m)",marginRight:"8px"}},_T("Tes données restent ici.")),
_NXED.bouton(_T("Exporter en CSV"),function(){
var ok=_NXS.exportCsv();
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(ok?_T("Fichier CSV téléchargé."):_T("Copié dans le presse-papiers."),1);}catch(_){}},{fort:true,cle:"csv"}),
(window._NXRT&&_NXRT.download)?_NXED.bouton(_T("Carte rétro en image"),function(){try{_NXRT.download("mois");}catch(_){}},{cle:"rt"}):null,
_NXED.bouton(_T("Tout effacer"),function(){
if(window.confirm(_T("Effacer toutes les statistiques ? C’est définitif.")))
{try{_NXS.reset();force();}catch(_){}}},{danger:true,cle:"rz"})));}

// L horloge : vingt-quatre rayons, un par heure, qui poussent depuis le
// centre ; l arc de la journee type ; l aiguille sur l heure qu il est.
function horloge(){
var hmax=1;for(var a=0;a<24;a++)if(heures[a]>hmax)hmax=heures[a];
var D=300,R0=56,R1=128;
var maintenant=new Date(),ang=(maintenant.getHours()+maintenant.getMinutes()/60)/24*360;
var arc=null;
if(ry){var a0=ry.debut/1440*360,a1=ry.fin/1440*360;
arc=i("div",{"aria-hidden":"true",style:{position:"absolute",inset:"10px",borderRadius:"50%",
background:"conic-gradient(from "+a0+"deg,"+_NXED.a(ACC2,0.22)+" 0deg "+(a1-a0)+"deg,transparent "+(a1-a0)+"deg 360deg)",
WebkitMaskImage:"radial-gradient(circle,transparent 61%,#000 62%,#000 66%,transparent 67%)",maskImage:"radial-gradient(circle,transparent 61%,#000 62%,#000 66%,transparent 67%)"}});}
return i("div",{style:{position:"relative",width:D+"px",height:D+"px",flex:"0 0 auto"}},
i("div",{"aria-hidden":"true",style:{position:"absolute",inset:0,borderRadius:"50%",border:"1px solid var(--l)"}}),
arc,
heures.map(function(v,k){var f=v/hmax,top=k===picH;
return i("div",{key:k,"aria-hidden":"true",style:{position:"absolute",left:"50%",top:"50%",width:"0",height:"0",transform:"rotate("+(k*15)+"deg)"}},
i("div",{className:"nxst-rayon",title:k+" h · "+v,style:{position:"absolute",left:"-5px",bottom:R0+"px",width:"10px",height:(R1-R0)+"px",borderRadius:"5px",
background:top?ACC:_NXED.a(ACC,0.25+0.5*f),transform:"scaleY("+(monte?Math.max(0.04,f):0)+")",transitionDelay:(k*30)+"ms"}}));}),
[0,6,12,18].map(function(h){var t=h/24*2*Math.PI;return i("span",{key:h,style:{position:"absolute",left:(D/2+(R1+14)*Math.sin(t))+"px",top:(D/2-(R1+14)*Math.cos(t))+"px",
transform:"translate(-50%,-50%)",fontSize:"11.5px",color:"var(--m)",whiteSpace:"nowrap"}},h+" h");}),
i("div",{className:"nxst-aiguille","aria-hidden":"true",title:_T("maintenant"),style:{position:"absolute",left:"149px",top:"0",width:"2px",height:(D/2)+"px",
transform:"rotate("+(monte?ang:0)+"deg)"}},
i("span",{style:{position:"absolute",left:"-5px",top:(D/2-R1-12)+"px",width:"12px",height:"12px",borderRadius:"50%",background:ACC2,
boxShadow:"0 0 0 4px "+_NXED.a(ACC2,0.2)}})),
i("div",{style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",textAlign:"center"}},
i("div",{style:{fontFamily:"var(--serif)",fontSize:"26px",color:"var(--c)"}},picH+" h"),
i("div",{style:{fontSize:"11.5px",color:"var(--m)"}},_T("ton heure"))));}

function rythme(){
var jmax=1;for(var b2=0;b2<7;b2++)if(parJour[b2]>jmax)jmax=parJour[b2];
var cmax=1;try{for(var r3=0;r3<7;r3++)for(var c3=0;c3<24;c3++)if(data.heat[r3][c3]>cmax)cmax=data.heat[r3][c3];}catch(_){}
return i("div",{className:"nxed-monte"},
i("div",{style:{display:"flex",gap:"40px",flexWrap:"wrap",alignItems:"center",padding:"16px 0 26px"}},
horloge(),
i("div",{style:{flex:"1 1 260px",minWidth:"240px"}},
ry?i("div",null,
i("div",{style:{fontSize:"13px",color:"var(--m)"}},_T("Ta journée type, sur")+" "+_NXtr(ry.jours)+" "+_T("jours")),
i("div",{style:{fontFamily:"var(--serif)",fontSize:"38px",color:"var(--c)",marginTop:"4px",fontVariantNumeric:"tabular-nums"}},
_NXS.hhmm(ry.debut)+" → "+_NXS.hhmm(ry.fin)),
i("div",{style:{fontSize:"13px",color:ACC2,marginTop:"2px"}},_NXS.hhmm(ry.fin-ry.debut)+" "+_T("entre ton premier et ton dernier message"))):null,
i("div",{style:{marginTop:"22px"}},_NXED.registre([
{lab:_T("Le soir, de 18 h à 23 h"),v:(grand?Math.round(soir/grand*100):0)+" %"},
{lab:_T("Ton heure de pointe"),v:picH+" h"},
{lab:_T("Ton jour le plus bavard"),v:JOURSL[picJ]},
{lab:_T("Messages datés"),v:_NXED.nombre(grand)}])))),
i("div",{style:{borderTop:"1px solid var(--l)",paddingTop:"22px"}},
i("div",{style:{fontFamily:"var(--serif)",fontSize:"20px",color:"var(--c)",marginBottom:"14px"}},_T("La semaine, heure par heure")),
i("div",{style:{overflowX:"auto"}},i("div",{style:{minWidth:"480px"}},
JOURS.map(function(j,r4){
return i("div",{key:r4,style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"4px"}},
i("span",{style:{width:"34px",flexShrink:0,fontSize:"12px",color:r4===picJ?"var(--c)":"var(--m)"}},j),
i("div",{style:{display:"flex",gap:"3px",flex:1}},(function(){var out=[];
for(var c4=0;c4<24;c4++){var v=0;try{v=data.heat[r4][c4];}catch(_){}
out.push(i("div",{key:c4,className:"nxst-case",title:JOURSL[r4]+" "+c4+" h · "+v,style:{flex:1,height:"16px",borderRadius:"3px",background:rampe(v,cmax),
animationDelay:((r4+c4)*22)+"ms"}}));}return out;})()),
i("span",{style:{width:"52px",textAlign:"right",fontSize:"12px",color:"var(--c2)",fontVariantNumeric:"tabular-nums"}},_NXED.nombre(parJour[r4])));})))));}

// Le podium : les trois premiers montent sur leur marche, la plus haute au
// milieu ; le reste suit en liste.
function podium(C2,nom,fmt,titre,texte){
if(!C2.L.length)return null;
var t3=C2.L.slice(0,3),ordre=t3.length===3?[1,0,2]:(t3.length===2?[1,0]:[0]);
var H=[132,100,78];
return i("div",{style:{borderTop:"1px solid var(--l)",padding:"22px 0 10px"}},
i("div",{style:{fontFamily:"var(--serif)",fontSize:"20px",color:"var(--c)"}},titre),
i("div",{style:{fontSize:"12.5px",color:"var(--m)",margin:"4px 0 18px"}},texte),
i("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"center",gap:"12px",margin:"0 auto"}},
ordre.map(function(ix){var o=t3[ix];var h=H[ix];
return i("div",{key:o.id,style:{flex:"0 1 150px",minWidth:0,textAlign:"center"}},
i("div",{style:{fontSize:"13.5px",color:"var(--c)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",padding:"0 4px"}},_NXtr(nom(o.id))),
i("div",{style:{fontSize:"12.5px",color:"var(--m)",margin:"3px 0 8px",fontVariantNumeric:"tabular-nums"}},fmt?_NXtr(fmt(o.v)):_NXED.nombre(o.v)),
i("div",{className:"nxst-marche",style:{height:h+"px",borderRadius:"10px 10px 0 0",
background:ix===0?"linear-gradient(to top,"+_NXED.a(ACC,0.35)+","+ACC+")":(ix===1?"linear-gradient(to top,"+_NXED.a(ACC2,0.3)+","+_NXED.a(ACC2,0.85)+")":"linear-gradient(to top,rgba(239,232,220,.08),rgba(239,232,220,.3))"),
transform:"scaleY("+(monte?1:0)+")",transitionDelay:(ix===0?0.35:(ix===1?0.15:0))+"s",display:"flex",alignItems:"flex-start",justifyContent:"center"}},
i("span",{style:{fontFamily:"var(--serif)",fontSize:"30px",color:"#16130f",marginTop:"8px"}},_NXtr(ix+1))));})),
C2.L.length>3?i("div",{style:{marginTop:"16px"}},C2.L.slice(3).map(function(o,k){
return i("div",{key:o.id,className:"nxed-ligne",style:{display:"flex",gap:"14px",padding:"7px 10px",margin:"0 -10px"}},
i("span",{style:{width:"22px",fontFamily:"var(--serif)",fontStyle:"italic",color:"var(--f)"}},_NXtr(k+4)),
i("span",{style:{flex:1,minWidth:0,fontSize:"13.5px",color:"var(--c2)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(nom(o.id))),
i("span",{style:{fontSize:"13px",color:"var(--c)",fontVariantNumeric:"tabular-nums"}},fmt?_NXtr(fmt(o.v)):_NXED.nombre(o.v)));})):null);}

function classements(){
var rien=!G.L.length&&!C.L.length&&!W.L.length;
if(rien)return _NXED.vide(_T("Rien à classer pour l’instant."),_T("Écris quelques messages et reviens : les classements se remplissent tout seuls."));
return i("div",{className:"nxed-monte"},
podium(G,function(id){return _NXguildName(id);},null,_T("Tes serveurs"),_T("Là où tu écris le plus.")),
podium(C,function(id){return _NXchanName(id);},null,_T("Tes salons"),_T("Tes salons de prédilection.")),
podium(V,function(id){return _NXguildName(id);},duree,_T("Ton vocal"),_T("Le temps passé en vocal, par serveur.")),
W.L.length?i("div",{style:{borderTop:"1px solid var(--l)",padding:"22px 0 10px"}},
i("div",{style:{fontFamily:"var(--serif)",fontSize:"20px",color:"var(--c)",marginBottom:"14px"}},_T("Tes mots")),
i("div",{style:{display:"flex",flexWrap:"wrap",alignItems:"baseline",gap:"6px 18px"}},W.L.map(function(o,k){
var t=Math.max(14,Math.min(40,14+Math.round(o.v/W.max*26)));
return i("span",{key:o.id,className:"nxst-case",title:_NXtr(o.v)+" "+_T("fois"),style:{fontFamily:"var(--serif)",fontSize:t+"px",lineHeight:1.2,
color:k===0?ACC:(k<4?"var(--c)":(k<10?"var(--c2)":"var(--m)")),animationDelay:(k*60)+"ms",display:"inline-block"}},_NXtr(o.id));}))):null,
E.L.length?i("div",{style:{borderTop:"1px solid var(--l)",padding:"22px 0 10px"}},
i("div",{style:{fontFamily:"var(--serif)",fontSize:"20px",color:"var(--c)",marginBottom:"12px"}},_T("Tes emojis")),
i("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px 22px"}},E.L.map(function(o){
return i("span",{key:o.id,style:{fontSize:"13.5px",color:"var(--c2)"}},":"+_NXtr(o.id)+": ",
i("span",{style:{color:ACC,fontVariantNumeric:"tabular-nums"}},_NXtr(o.v)));}))):null);}

// Un anneau : la part atteinte de l objectif du jour, qui se remplit.
function anneau(titre,unite,val,cur,pct,cle,options){
var fait=pct>=100,R=66,Cc=2*Math.PI*R,f=Math.min(1,(pct||0)/100);
var col=fait?P.ok:ACC;
return i("div",{key:cle,style:{flex:"1 1 260px",minWidth:"240px",display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"10px 0 20px"}},
i("div",{style:{position:"relative",width:"160px",height:"160px"}},
i("svg",{width:160,height:160,viewBox:"0 0 160 160","aria-hidden":"true",style:{transform:"rotate(-90deg)"}},
i("circle",{cx:80,cy:80,r:R,fill:"none",stroke:"rgba(239,232,220,.08)","stroke-width":"10"}),
i("circle",{className:"nxst-anneau",cx:80,cy:80,r:R,fill:"none",stroke:col,"stroke-width":"10","stroke-linecap":"round",
"stroke-dasharray":Cc.toFixed(1),"stroke-dashoffset":(Cc*(1-(monte&&val>0?f:0))).toFixed(1)})),
i("div",{style:{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}},
i("div",{style:{fontFamily:"var(--serif)",fontSize:"38px",color:fait?P.ok:"var(--c)",fontVariantNumeric:"tabular-nums"}},_NXtr(cur)),
i("div",{style:{fontSize:"12px",color:"var(--m)"}},val>0?("/ "+_NXtr(val)+" "+_NXtr(unite)):_NXtr(unite)))),
i("div",{style:{fontFamily:"var(--serif)",fontSize:"19px",color:"var(--c)",marginTop:"12px"}},_NXtr(titre)),
i("div",{style:{display:"flex",gap:"14px",flexWrap:"wrap",justifyContent:"center",marginTop:"12px"}},
options.map(function(v){var on=val===v;
return _NXED.lien(_NXtr(v)+"",function(){_NXS.setObjectif(cle,on?0:v);force();},on,v);})));}

function objectifs(){
return i("div",{className:"nxed-monte"},
i("div",{style:{fontSize:"13.5px",color:"var(--m)",lineHeight:1.65,padding:"10px 0 10px",maxWidth:"560px"}},
_T("Un objectif est une jauge, pas une contrainte. Personne d’autre ne le voit, rien n’est envoyé, et il repart de zéro chaque matin.")),
i("div",{style:{display:"flex",gap:"20px",flexWrap:"wrap"}},
anneau(_T("Messages aujourd’hui"),_T("messages"),obj.msgCible,obj.msg,obj.msgPct,"msgJour",[10,25,50,100,200]),
anneau(_T("Vocal aujourd’hui"),_T("min"),obj.vocalCible,obj.vocal,obj.vocalPct,"vocalMin",[15,30,60,120,240])),
i("div",{style:{borderTop:"1px solid var(--l)",paddingTop:"20px"}},_NXED.registre([
{lab:_T("Caractères écrits aujourd’hui"),v:_NXED.nombre(somme(data.dailyChars,0,1))},
{lab:_T("Messages privés aujourd’hui"),v:_NXED.nombre(somme(data.dmDaily,0,1))}])));}

var premier=null;try{if(data.first)premier=new Date(data.first);}catch(_){}
return i(Kr,null,_NXED.racine({acc:ACC,acc2:ACC2,max:800},
i("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",gap:"18px",flexWrap:"wrap"}},
i("div",null,
i("div",{style:{fontSize:"12.5px",color:"var(--m)"}},_T("Statistiques")),
i("div",{style:{fontFamily:"var(--serif)",fontSize:"36px",lineHeight:1.1,marginTop:"4px",color:"var(--c)"}},"Nexium Stats")),
i("div",{style:{textAlign:"right"}},
i("div",{style:{fontFamily:"var(--serif)",color:"var(--c)"}},rouleaux(total,64)),
i("div",{style:{fontSize:"13px",color:"var(--m)",marginTop:"6px"}},
_T("messages envoyés")+(premier?(" "+_T("depuis le")+" "+date(premier)):"")+(strie>0?(" · "+_NXtr(strie)+" "+_T(strie>1?"jours d’affilée":"jour")):"")))),
riviere(),
regle(),
i("div",{key:tab},tab==="apercu"?apercu():tab==="rythme"?rythme():tab==="classements"?classements():objectifs()),
_NXfoot(_NXtr("Nexium Stats · calcul local, aucune donnée envoyée"))));
}var _NXP=window._NXP||(window._NXP={});
