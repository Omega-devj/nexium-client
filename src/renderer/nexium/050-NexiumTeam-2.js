function NexiumTeamComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
F.useEffect(function(){
_NXLY.listeners.push(force);_NXLY.start();
return function(){
try{_NXLY.listeners=_NXLY.listeners.filter(function(f){return f!==force;});}catch(_){}
try{_NXLY.stop();}catch(_){}};},[]);
var monte=_NXmounted(F);
var P=_NXpal;
var d=_NXLY.data;
var du=d&&d.discord_user;
var nom=(du&&(du.global_name||du.username))||"5dj0";
var pseudo=du&&du.username?"@"+du.username:null;
var sm=_NXLY.statusMeta();
var perso=_NXLY.customStatus();
// Ce qu il ecoute ne regarde personne : Spotify est retire de l affichage,
// et seulement Spotify -- les autres activites restent visibles.
var acts=(_NXLY.acts()||[]).filter(function(x){return !x.spotify;});
var live=!!d&&!_NXLY.err;
var an=_NXFX.anime();
var CONTRIB=[
{n:"kikou",r:_T("Developpeur"),s:_T("C++ · Lua · Luau"),ic:"code",c:P.info},
{n:"elias.qsd7",r:_T("Contributeur"),s:_T("Idees et retours"),ic:"baguette",c:P.mauve},
{n:"ryukuro",r:_T("Communication, support et QA"),s:_T("Bugs et questions : ecris-lui en MP"),ic:"courrier",c:P.warn,contact:true}];
function ms(x){var t=Math.max(0,Math.floor(x/1000));var m=Math.floor(t/60);var r=t%60;return m+":"+(r<10?"0":"")+r;}
function ecrire(pseudo){try{
var r=_NXcontact(pseudo);
if(window._NXPR&&_NXPR.toast)_NXPR.toast(r.ouvert?_T("Conversation ouverte."):
_T("Pseudo copie : ajoute")+" "+_NXtr(pseudo)+" "+_T("en ami, puis ecris-lui."),1);}catch(_){}}

function anneau(){
var taille=118,r=taille/2-6,c=2*Math.PI*r;
return i("div",{style:{position:"relative",width:taille+"px",height:taille+"px",flexShrink:0}},
an&&live?i("div",{"data-nx-halo":"1","aria-hidden":"true",style:{position:"absolute",inset:"-18%",
borderRadius:"50%",background:"radial-gradient(circle,"+_NXteinte(sm.c,28)+",transparent 68%)",
pointerEvents:"none"}}):null,
i("svg",{width:taille,height:taille,viewBox:"0 0 "+taille+" "+taille,
style:{transform:"rotate(-90deg)",display:"block",position:"relative"},"aria-hidden":"true"},
i("circle",{cx:taille/2,cy:taille/2,r:r,fill:"none",stroke:P.line,strokeWidth:"3"}),
i("circle",_NXFX.fusion({cx:taille/2,cy:taille/2,r:r,fill:"none",stroke:sm.c,
strokeWidth:"3",strokeLinecap:"round",strokeDasharray:c.toFixed(1),
strokeDashoffset:(monte?(live?0:c*0.72):c).toFixed(1)},an?{"data-nx-ring":"1"}:{}))),
i("div",{style:{position:"absolute",left:"13px",top:"13px",width:"92px",height:"92px",
borderRadius:"50%",overflow:"hidden",background:P.inset,border:"1px solid "+P.hair}},
i("img",{src:_NXLY.avatar(),alt:_NXtr(nom),
style:{width:"100%",height:"100%",objectFit:"cover",display:"block"}})),
i("div",_NXFX.fusion({"aria-hidden":"true",
style:{position:"absolute",right:"4px",bottom:"4px",width:"22px",height:"22px",borderRadius:"50%",
background:sm.c,border:"3px solid "+P.panel}},(an&&live)?{"data-nx-dot":"1"}:{})));}

function carteActivite(x,k){
var prog=null,cur="",tot="";
if(x.start&&x.end&&x.end>x.start){
var now=Date.now();
var p=Math.min(1,Math.max(0,(now-x.start)/(x.end-x.start)));
prog=Math.round(p*100);cur=ms(now-x.start);tot=ms(x.end-x.start);}
return i("div",_NXFX.fusion({key:k,style:{padding:"15px",borderRadius:"15px",marginBottom:"9px",
background:P.inset,border:"1px solid "+P.line}},
_NXFX.a({"data-nx-tile":"1","data-nx-rise":String(Math.min(6,k+1))})),
i("div",{style:{display:"flex",alignItems:"center",gap:"14px"}},
i("div",{style:{position:"relative",flexShrink:0,width:"54px",height:"54px"}},
x.img?i("img",{src:x.img,alt:"",
style:{width:"54px",height:"54px",borderRadius:"13px",objectFit:"cover",
background:P.panel,border:"1px solid "+P.hair,display:"block"}})
:i("div",{style:{width:"54px",height:"54px",borderRadius:"13px",background:P.panel,
border:"1px solid "+P.hair,display:"flex",alignItems:"center",justifyContent:"center",color:P.faint}},
_NXFX.svg("lecture",20)),
x.imgSmall?i("img",{src:x.imgSmall,alt:"",
style:{position:"absolute",right:"-5px",bottom:"-5px",width:"21px",height:"21px",
borderRadius:"50%",border:"2px solid "+P.panel,display:"block"}}):null),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"9.5px",textTransform:"uppercase",letterSpacing:".1em",fontWeight:"800",
color:P.faint,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},
_NXtr(x.type)||_T("Activite")),
i("div",{style:{fontSize:"14px",fontWeight:"700",color:P.txt,marginTop:"4px",
letterSpacing:"-.012em",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(x.name)||""),
x.sub?i("div",{style:{fontSize:"12px",color:P.sub,marginTop:"2px",
overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(x.sub)):null,
x.sub2?i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"2px",
overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(x.sub2)):null,
(!prog&&x.elapsed)?i("div",{style:{fontFamily:_NXf.mono,fontSize:"10px",color:P.faint,marginTop:"5px"}},
_NXtr(x.elapsed)):null)),
prog!=null?i("div",{style:{marginTop:"13px"}},
_NXFX.barre(monte?prog:0,P.acc,4),
i("div",{style:{display:"flex",justifyContent:"space-between",marginTop:"6px",
fontFamily:_NXf.mono,fontSize:"9.5px",color:P.faint}},
i("span",null,_NXtr(cur)),i("span",null,_NXtr(tot)))):null);}

var sante=(window._NXDATA&&_NXDATA.sante)?_NXDATA.sante():{total:0,vivants:0};
var nProt=0;
try{nProt=(SH_LIENS.length+SH_CONTENU.length+SH_AVANCE.length+SH_PIEGES.length+SH_SORTIE.length);}catch(_){}
var ver=(window._NXUP&&_NXUP.VERSION)||"?";

var LIENS=[
{t:_T("Site officiel"),u:"https://nexium-client.netlify.app/",ic:"globe",c:P.acc,fort:true,
d:_T("La presentation publique du client.")},
{t:_T("Depot du client"),u:"https://github.com/Omega-devj/nexium-client",ic:"code",c:P.info,
d:_T("Tout le code, lisible par n importe qui.")},
{t:_T("Base de menaces"),u:"https://github.com/Omega-devj/blacklist-url-nexium-client",ic:"bouclier",c:P.danger,
d:_T("La liste des liens dangereux, ouverte aussi.")}];

return i(Kr,null,i("div",{style:{maxWidth:"700px",margin:"0 auto"}},
_NXFX.entete({cle:_T("L equipe"),titre:_NXtr("Nexium Team"),icone:"equipe",col:P.acc,
texte:_T("Le client est concu et developpe par 5dj0. Sa presence Discord est lue en direct tant que cette page reste ouverte, et nulle part ailleurs."),
marque:live?_T("en direct"):_T("hors ligne"),
chiffres:[{k:_T("Version"),v:"v"+ver},
{k:_T("Protections"),v:nProt||"—",col:P.danger},
{k:_T("Modules"),v:sante.total?(sante.vivants+"/"+sante.total):"—",col:P.ok},
{k:_T("Personnes"),v:CONTRIB.length+1,col:P.info}]}),

i("div",_NXFX.a({"data-nx-panel":"1"}),i("div",null,
i("div",_NXFX.fusion({style:{position:"relative",overflow:"hidden",border:"1px solid "+P.hair,
borderRadius:"24px",background:"linear-gradient(158deg,"+P.panel+","+P.bg+")",
padding:"26px 24px",marginBottom:"14px"}},_NXFX.a({"data-nx-carte":"1"})),
live&&an?i("div",{"data-nx-breathe":"1","aria-hidden":"true",
style:{position:"absolute",left:"-70px",top:"-90px",width:"280px",height:"280px",borderRadius:"50%",
background:"radial-gradient(circle,"+_NXteinte(sm.c,14)+",transparent 70%)",pointerEvents:"none"}}):null,
i("div",{style:{position:"relative",display:"flex",alignItems:"center",gap:"22px",flexWrap:"wrap"}},
_NXtr(anneau()),
i("div",{style:{flex:1,minWidth:"180px"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".18em",textTransform:"uppercase",
color:P.faint,marginBottom:"8px"}},_T("Createur du client")),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"30px",fontWeight:"800",color:P.txt,
letterSpacing:"-.04em",lineHeight:1.1}},_NXtr(nom)),
pseudo?i("div",{style:{fontFamily:_NXf.mono,fontSize:"11.5px",color:P.dim,marginTop:"6px"}},_NXtr(pseudo)):null,
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"12px",flexWrap:"wrap"}},
_NXFX.badge(_NXtr(sm.t)+(live?"":" · "+_T("hors ligne")),sm.c,{point:live}),
_NXFX.badge(_T("Ecoute masquee"),P.faint,{icone:"oeilBarre"})))),
perso?i("div",{style:{position:"relative",marginTop:"18px",padding:"13px 15px",
background:P.inset,borderRadius:"13px",border:"1px solid "+P.line,
fontSize:"12.5px",color:P.sub,lineHeight:1.6}},_NXtr(perso)):null),

acts.length?_NXcard(i("div",null,
_NXch(_T("En ce moment"),_T("Ce que Discord annonce publiquement de son activite. La musique n est pas affichee.")),
acts.map(carteActivite)),{mb:12}):null,

_NXcard(i("div",null,
_NXch(_T("Contributeurs"),_T("Ceux qui font avancer le client autrement qu en ecrivant du code.")),
_NXFX.grille(CONTRIB.map(function(m,k){
return _NXFX.tuile({key:m.n,icone:m.ic,col:m.c,rang:k+1,hv:"secoue",halo:true,
titre:_NXtr(m.n),sous:_NXtr(m.r),texte:_NXtr(m.s),
onClick:m.contact?function(){ecrire(m.n);}:undefined});}),200)),{mb:12}),

_NXcard(i("div",null,
_NXch(_T("Un bug ? Une question ?"),_T("C est ryukuro qui s en occupe : communication, support et tests.")),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.7,marginBottom:"13px"}},
_T("Ecris-lui en message prive sur Discord. Decris ce que tu faisais, ce que tu attendais, et ce qui s est passe : une capture aide toujours.")),
i("div",{style:{display:"flex",gap:"9px",flexWrap:"wrap"}},
i("div",null,_NXFX.bouton({t:_T("Ecrire a ryukuro"),icone:"courrier",col:P.warn,plein:true,
onClick:function(){ecrire("ryukuro");}})),
i("div",null,_NXFX.bouton({t:_T("Ouvrir un ticket"),icone:"liste",col:P.sub,creux:true,
onClick:function(){try{_NXCP.ouvrir("equicord_ticket","Nexium Ticket");}catch(_){}}})))),{mb:12}),

_NXcard(i("div",null,
_NXch(_T("Le projet"),_T("Tout est ouvert : le code, les listes de menaces, le journal des versions.")),
_NXFX.grille(LIENS.map(function(l,k){
return _NXFX.tuile({key:l.u,icone:l.ic,col:l.c,rang:k+1,hv:"pousse",plein:l.fort,
titre:_NXtr(l.t),texte:_NXtr(l.d),
droite:_NXFX.ico("externe",13,{col:P.faint}),
onClick:function(){try{_NXP.open(l.u);}catch(_){}}});}),210)),{mb:0}))),
_NXfoot(_NXtr("Nexium Team · ")+_T("presence lue en direct, uniquement sur cette page"))));
}
