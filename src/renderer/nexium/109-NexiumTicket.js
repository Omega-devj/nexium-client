var NexiumTicketIcon=function(p){p=p||{};var z=p.width||p.height||20;return (window._NXFX&&_NXFX.svg)?_NXFX.svg("courrier",z):null;};
function NexiumTicketComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var P=_NXpal;
var T=window._NXTK;
var vue=F.useState((T&&T.pre)?"neuf":"liste");
var cat=F.useState((T&&T.pre&&T.pre.categorie)||"question");
var suj=F.useState((T&&T.pre&&T.pre.sujet)||"");
var msg=F.useState((T&&T.pre&&T.pre.message)||"");
var envoi=F.useState("");
var avis=F.useState(null),setAvis=avis[1];
var offre=F.useState((T&&T.pre&&T.pre.offre)||null);
var fil=F.useRef?F.useRef(null):{current:null};
var colle=F.useRef?F.useRef(true):{current:true};
var an=_NXFX.anime();

F.useEffect(function(){
if(!T)return;
T.listeners.push(force);
T.rafraichis();
// Une demande venue d une autre page ouvre directement le formulaire, deja
// rempli.
if(T.pre){vue[1]("neuf");T.pre=null;}
var iv=setInterval(function(){try{
if(typeof document!=="undefined"&&document.hidden)return;
if(T.filId&&(!T.etatDirect().ouvert))T.lis(T.filId);
else T.rafraichis();}catch(_){}},T.filId?5000:25000);
return function(){
try{T.listeners=T.listeners.filter(function(f){return f!==force;});}catch(_){}
try{clearInterval(iv);}catch(_){}
try{T.ferme();}catch(_){}};},[]);

var etat=(T&&T.fil&&T.fil.messages)||[];
F.useEffect(function(){try{
var el=fil&&fil.current;
if(!el||!colle.current)return;
el.scrollTop=el.scrollHeight;}catch(_){}},[etat.length,vue[0]]);

if(!T)return i(Kr,null,i("div",{style:{maxWidth:"760px",margin:"0 auto"}},
_NXFX.entete({cle:_T("Support"),titre:_NXtr("Nexium Ticket"),icone:"courrier",col:P.info,
texte:_T("Le module de support n a pas demarre sur ce client.")}),
_NXfoot(_NXtr("Nexium Ticket"))));

function dire(e,bon){setAvis(e?{t:e,ko:true}:{t:bon,ko:false});
setTimeout(function(){try{setAvis(null);}catch(_){}},6000);}
function quand(t){try{
if(!t)return "";
var d=Date.now()-(new Date(t)).getTime();
var m=Math.floor(d/60000);
if(m<1)return _T("a l instant");
if(m<60)return m+" min";
var h=Math.floor(m/60);
if(h<48)return h+" h";
return Math.floor(h/24)+" j";}catch(_){return "";}}
function couleurEtat(e){return e==="ouvert"?P.warn:(e==="en_cours"?P.info:(e==="resolu"?P.ok:P.faint));}
function iconeCat(c){return c==="abonnement"?"etoile":(c==="probleme"?"alerte":(c==="signalement"?"bouclier":"question"));}
function couleurCat(c){return c==="abonnement"?P.mauve:(c==="probleme"?P.danger:(c==="signalement"?P.warn:P.info));}
function nouveau(c,modele){cat[1](c);if(modele&&!msg[0].trim())msg[1](modele);vue[1]("neuf");}
function ecrireRyukuro(){try{
var r=_NXcontact("ryukuro");
if(window._NXPR&&_NXPR.toast)_NXPR.toast(r.ouvert?_T("Conversation ouverte."):_T("Pseudo copie : ajoute ryukuro en ami, puis ecris-lui."),1);}catch(_){}}

// Ce qu on attend de chaque motif : une demande complete du premier coup,
// c est une reponse plus rapide.
var DESC={abonnement:_T("Prendre, prolonger ou offrir une offre."),
probleme:_T("Quelque chose ne marche pas comme prevu."),
question:_T("Comment faire, ou pourquoi ca marche ainsi."),
signalement:_T("Un lien, un compte ou un serveur douteux.")};
var MODELES={
probleme:_T("Ce que je faisais :")+"\n\n"+_T("Ce qui s est passe :")+"\n\n"+_T("Ce que j attendais :")+"\n\n"+_T("Version de Nexium :")+" v"+((window._NXUP&&_NXUP.VERSION)||"?"),
question:"",
signalement:_T("Ce que je signale (lien, pseudo ou serveur) :")+"\n\n"+_T("Ou je l ai vu :")+"\n\n"+_T("Pourquoi c est douteux :"),
abonnement:_T("L offre qui m interesse :")+"\n\n"+_T("La duree :")};

var CSS=".nxtk-aurora{position:absolute;inset:-35%;pointer-events:none;"+
"background:radial-gradient(38% 48% at 20% 28%,"+_NXteinte(P.info,30)+",transparent 62%),"+
"radial-gradient(34% 44% at 84% 22%,"+_NXteinte(P.cyan||P.info,22)+",transparent 62%),"+
"radial-gradient(42% 50% at 58% 95%,"+_NXteinte(P.mauve,18)+",transparent 62%)}"+
".nxtk-anim .nxtk-aurora{animation:nxtkDrift 18s ease-in-out infinite alternate}"+
"@keyframes nxtkDrift{0%{transform:translate3d(-3%,-2%,0)}100%{transform:translate3d(4%,3%,0) rotate(5deg)}}"+
".nxtk-card{transition:transform .26s cubic-bezier(.22,1,.36,1),border-color .26s ease,box-shadow .26s ease}"+
".nxtk-anim .nxtk-card:hover{transform:translateY(-3px)}"+
".nxtk-anim .nxtk-in{animation:nxtkIn .32s cubic-bezier(.22,1,.36,1) both}"+
"@keyframes nxtkIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}"+
"@media (prefers-reduced-motion:reduce){.nxtk-aurora,.nxtk-in{animation:none!important}}";

// -------------------------------------------------------------- le heros
var enAttente=T.enAttente();
var nonLus=0;try{nonLus=(T.nonLus?T.nonLus():[]).length;}catch(_){}
function heros(){
var ACTIONS=[
["probleme",_T("Signaler un bug"),_T("Un modele guide ta description."),"alerte",P.danger,function(){nouveau("probleme",MODELES.probleme);}],
["question",_T("Poser une question"),_T("La reponse arrive ici."),"question",P.info,function(){nouveau("question","");}],
["abonnement",_T("Prendre un abonnement"),_T("Essai, offres et avantages."),"etoile",P.mauve,function(){try{if(window._NXCP)_NXCP.ouvrir("equicord_abo","Nexium Abonnement");}catch(_){}}],
["ryukuro",_T("Ecrire a ryukuro"),_T("Bugs et questions, en MP."),"courrier",P.warn,ecrireRyukuro]];
return i("div",{style:{position:"relative",overflow:"hidden",borderRadius:"26px",padding:"28px 26px 24px",marginBottom:"16px",
border:"1px solid "+_NXteinte(P.info,26),background:"linear-gradient(150deg,"+_NXteinte(P.info,9)+","+P.panel+" 55%,"+P.bg+")"}},
i("div",{className:"nxtk-aurora","aria-hidden":"true"}),
i("div",{style:{position:"relative"}},
i("div",{style:{display:"flex",alignItems:"flex-start",gap:"18px",flexWrap:"wrap"}},
i("div",{style:{flex:"1 1 300px"}},
i("div",{style:{display:"inline-flex",alignItems:"center",gap:"8px",padding:"5px 12px",borderRadius:"99px",
background:_NXteinte(P.info,14),border:"1px solid "+_NXteinte(P.info,32),
fontSize:"10px",fontWeight:"900",letterSpacing:".2em",color:P.info,textTransform:"uppercase"}},
_NXFX.svg("courrier",12),_T("Support Nexium")),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"34px",fontWeight:"800",color:P.txt,letterSpacing:"-.04em",lineHeight:1.05,marginTop:"14px"}},
_T("Une vraie personne te repond.")),
i("div",{style:{fontSize:"13.5px",color:P.sub,marginTop:"10px",lineHeight:1.65,maxWidth:"460px"}},
_T("Un fil prive entre toi et l equipe. La reponse arrive ici, dans le client, et le fil s efface quinze jours apres le dernier message."))),
i("div",{style:{display:"flex",gap:"10px"}},
[[_T("Ouverts"),enAttente,enAttente?P.warn:P.faint],[_T("Non lus"),nonLus,nonLus?P.ok:P.faint],[_T("Au total"),(T.liste||[]).length,P.sub]].map(function(c,k){
return i("div",{key:k,style:{minWidth:"74px",padding:"12px 14px",borderRadius:"14px",background:_NXteinte(P.bg,60),
border:"1px solid "+P.line,textAlign:"center"}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:"24px",fontWeight:"800",color:c[2],fontVariantNumeric:"tabular-nums"}},_NXtr(String(c[1]))),
i("div",{style:{fontSize:"10px",color:P.dim,fontWeight:"700",marginTop:"3px"}},_NXtr(c[0])));}))),
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))",gap:"10px",marginTop:"22px"}},
ACTIONS.map(function(a){
return i("div",{key:a[0],className:"nx-fx nxtk-card",role:"button",tabIndex:0,onKeyDown:_NXkey,onClick:a[5],
style:{cursor:"pointer",padding:"15px",borderRadius:"16px",background:_NXteinte(a[4],7),border:"1px solid "+_NXteinte(a[4],24)}},
i("div",{style:{display:"flex",alignItems:"center",gap:"10px"}},
_NXFX.pastille(a[3],{col:a[4],taille:32,halo:a[0]==="abonnement"}),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"13px",fontWeight:"800",color:P.txt}},_NXtr(a[1])),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"2px"}},_NXtr(a[2]))),
_NXFX.ico("chevron",14,{col:P.faint,hv:"pousse"})));}))));}

// ----------------------------------------------------------- le formulaire
function neuf(){
var n=msg[0].length;
return i("div",{className:"nxtk-in"},
_NXcard(i("div",null,
i("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"16px"}},
_NXFX.bouton({t:_T("Retour"),icone:"retour",petit:true,creux:true,col:P.sub,onClick:function(){vue[1]("liste");}}),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"20px",fontWeight:"800",color:P.txt,letterSpacing:"-.02em"}},_T("Nouveau ticket"))),
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".13em",color:P.dim,textTransform:"uppercase",marginBottom:"10px"}},_T("Motif")),
i("div",{role:"radiogroup","aria-label":_T("Motif"),style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"9px",marginBottom:"18px"}},
T.CATS.map(function(c){
var on=cat[0]===c[0],col=couleurCat(c[0]);
return i("div",{key:c[0],className:"nx-fx nxtk-card",role:"radio","aria-checked":on?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){var avant=MODELES[cat[0]]||"";cat[1](c[0]);
if(!msg[0].trim()||msg[0]===avant)msg[1](MODELES[c[0]]||"");},
style:{cursor:"pointer",padding:"13px",borderRadius:"14px",
background:on?_NXteinte(col,12):P.inset,border:"1px solid "+(on?_NXteinte(col,50):P.line),
boxShadow:on?("0 10px 28px "+_NXteinte(col,14)):"none"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px"}},
i("span",{style:{display:"flex",color:on?col:P.faint}},_NXFX.svg(c[2],16)),
i("span",{style:{fontSize:"12.5px",fontWeight:"800",color:on?P.txt:P.sub}},_T(c[1]))),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"6px",lineHeight:1.45}},_NXtr(DESC[c[0]])||""));})),
offre[0]?_NXFX.note({col:P.mauve,icone:"etoile",titre:_T("Demande d abonnement"),
texte:_T("Ce ticket porte sur")+" : "+_NXtr(offre[0])+". "+_T("Un administrateur peut le poser sur ton compte directement depuis le ticket."),
droite:_NXFX.bouton({t:_T("Retirer"),petit:true,creux:true,col:P.faint,onClick:function(){offre[1](null);}})}):null,
_NXFX.champ({k:_T("Sujet"),v:suj[0],ph:_T("en une ligne"),onChange:function(e){suj[1](e.target.value);}}),
_NXFX.champ({k:_T("Ta demande"),multi:true,lignes:7,v:msg[0],
ph:_T("Explique ce dont tu as besoin. Plus c est precis, plus la reponse est rapide."),
onChange:function(e){msg[1](e.target.value);}}),
i("div",{style:{display:"flex",gap:"9px",flexWrap:"wrap",alignItems:"center"}},
_NXFX.bouton({t:T.busy?_T("Envoi…"):_T("Envoyer le ticket"),icone:"envoi",plein:true,col:P.info,off:T.busy||!msg[0].trim(),onClick:function(){
T.ouvre({sujet:suj[0],categorie:cat[0],message:msg[0],offre:offre[0]},function(e,id){
if(e){dire(e);return;}
suj[1]("");msg[1]("");offre[1](null);
T.lis(id,function(){T.suit(id,function(){T.lis(id);});vue[1]("fil");});
dire(null,_T("Ticket ouvert."));});}}),
i("span",{style:{marginLeft:"auto",fontFamily:_NXf.mono,fontSize:"10.5px",color:n>3600?(n>4000?P.danger:P.warn):P.faint}},_NXtr(n)+" / 4000")),
i("div",{style:{marginTop:"14px",display:"flex",gap:"9px",alignItems:"flex-start",fontSize:"11px",color:P.faint,lineHeight:1.6}},
i("span",{style:{display:"flex",marginTop:"1px"}},_NXFX.svg("cadenas",12)),
i("span",null,_T("Ce fil n est lisible que par toi et par l equipe. La preuve d acces est gardee sur cette machine : si tu effaces les donnees du client, tu perds l acces a tes anciens tickets.")))),{mb:0}));}

// ----------------------------------------------------------------- la liste
function liste(){
var L=T.liste||[];
return i("div",{className:"nxtk-in"},
_NXcard(i("div",null,
_NXch(_T("Tes tickets"),L.length?(_NXtr(L.length)+" "+_T("fil(s)")):_T("Aucun ticket pour l instant."),
i("div",{style:{display:"flex",gap:"7px"}},
_NXFX.bouton({t:_T("Nouveau ticket"),icone:"plus",petit:true,plein:true,col:P.info,onClick:function(){nouveau("question","");}}),
_NXFX.bouton({t:_T("Rafraichir"),icone:"maj",hv:"tourne",petit:true,creux:true,col:P.sub,onClick:function(){T.rafraichis();}}))),
L.length?i("div",{style:{display:"flex",flexDirection:"column",gap:"9px",marginTop:"14px"}},L.map(function(t,k){
var c=couleurEtat(t.etat),cc=couleurCat(t.categorie);
var repondu=t.reponses>0;
var neufTk=false;
try{var NL=T.nonLus?T.nonLus():[];for(var z=0;z<NL.length;z++)if(NL[z].id===t.id)neufTk=true;}catch(_){}
return i("div",{key:t.id,className:"nx-fx nxtk-card",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){T.lis(t.id,function(e){
if(e){dire(e);return;}
T.suit(t.id,function(){T.lis(t.id);});
colle.current=true;vue[1]("fil");});},
style:{position:"relative",display:"flex",alignItems:"center",gap:"13px",padding:"15px 16px",borderRadius:"16px",cursor:"pointer",
background:neufTk?_NXteinte(P.ok,6):P.inset,border:"1px solid "+(neufTk?_NXteinte(P.ok,36):P.line),
boxShadow:neufTk?("0 8px 24px "+_NXteinte(P.ok,10)):"none"}},
_NXFX.pastille(iconeCat(t.categorie),{col:cc,taille:36,halo:neufTk}),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",minWidth:0}},
neufTk?i("span",{"aria-label":_T("nouveau"),style:{flexShrink:0,width:"8px",height:"8px",borderRadius:"50%",background:P.ok,
boxShadow:"0 0 10px "+_NXteinte(P.ok,70)}}):null,
i("div",{style:{flex:1,minWidth:0,fontSize:"13.5px",fontWeight:neufTk?"800":"700",color:P.txt,
overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(t.sujet))),
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"6px",flexWrap:"wrap",fontSize:"11px",color:P.dim}},
_NXFX.badge(_NXtr(T.ETATS[t.etat])||_NXtr(t.etat),c,{point:t.etat==="ouvert"}),
i("span",null,_T("mis a jour il y a")+" "+_NXtr(quand(t.maj_le))),
repondu?i("span",{style:{color:P.ok,fontWeight:"700"}},_NXtr(t.reponses)+" "+(t.reponses>1?_T("reponses"):_T("reponse"))):null)),
_NXFX.ico("chevron",15,{col:P.faint,hv:"pousse"}));}))
:i("div",{style:{padding:"34px 14px",textAlign:"center"}},
_NXFX.blason("courrier",P.info,64),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"18px",fontWeight:"800",color:P.txt,marginTop:"14px"}},_T("Aucun ticket")),
i("div",{style:{fontSize:"12.5px",color:P.dim,marginTop:"8px",lineHeight:1.6,maxWidth:"380px",marginLeft:"auto",marginRight:"auto"}},
_T("Une question, un souci, un abonnement a prendre : ouvre un fil, la reponse arrive ici.")),
i("div",{style:{marginTop:"16px"}},_NXFX.bouton({t:_T("Ouvrir un ticket"),icone:"plus",plein:true,col:P.info,onClick:function(){nouveau("question","");}})))),{mb:12}),
L.length?i("div",{style:{display:"flex",alignItems:"center",gap:"8px",fontSize:"11px",color:P.faint,padding:"0 4px"}},
_NXFX.svg("horloge",12),_T("Un ticket disparait quinze jours apres son dernier message. Tant qu il vit, il reste ici.")):null);}

// -------------------------------------------------------------------- le fil
var JOURS=["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
var MOIS=["janvier","fevrier","mars","avril","mai","juin","juillet","aout","septembre","octobre","novembre","decembre"];
function jourDe(t){try{var d=new Date(t);return d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();}catch(_){return "";}}
function jourDit(t){try{
var d=new Date(t),n=new Date();
var ecart=Math.floor((new Date(n.getFullYear(),n.getMonth(),n.getDate())-new Date(d.getFullYear(),d.getMonth(),d.getDate()))/86400000);
if(ecart===0)return _T("aujourd hui");
if(ecart===1)return _T("hier");
if(ecart<7)return _T(JOURS[d.getDay()]);
return d.getDate()+" "+_T(MOIS[d.getMonth()]);}catch(_){return "";}}
function heureDe(t){try{var d=new Date(t);return ("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);}catch(_){return "";}}
function figure(moi){
return i("div",{"aria-hidden":"true",style:{width:"30px",height:"30px",flexShrink:0,borderRadius:"50%",
display:"flex",alignItems:"center",justifyContent:"center",
background:moi?P.raise:("linear-gradient(140deg,"+_NXteinte(P.info,40)+","+_NXteinte(P.mauve,30)+")"),
border:"1px solid "+(moi?P.hair:_NXteinte(P.info,45)),color:moi?P.sub:P.txt}},
moi?_NXFX.svg("comptes",14):
i("svg",{viewBox:"0 0 100 100",width:13,height:13,fill:"none",stroke:"currentColor",strokeWidth:11,strokeLinecap:"square","aria-hidden":"true"},
i("path",{d:"M28 72 V28 L72 72 V28"})));}
function bulle(m,k,prec){
var moi=m.auteur==="client",sys=m.auteur==="systeme";
if(sys)return i("div",{key:k,style:{display:"flex",justifyContent:"center",padding:"8px 4px"}},
i("span",{style:{fontSize:"10.5px",color:P.dim,padding:"4px 12px",borderRadius:"99px",background:P.inset,border:"1px solid "+P.line}},_NXtr(m.contenu)));
var suite=!!(prec&&prec.auteur===m.auteur&&prec.auteur!=="systeme"&&(((new Date(m.a)).getTime()-(new Date(prec.a)).getTime())<300000));
return i("div",{key:k,className:"nxtk-in",style:{display:"flex",gap:"10px",flexDirection:moi?"row-reverse":"row",
marginBottom:suite?"4px":"14px",alignItems:"flex-end"}},
i("div",{style:{width:"30px",flexShrink:0}},suite?null:_NXtr(figure(moi))),
i("div",{style:{maxWidth:"74%",display:"flex",flexDirection:"column",alignItems:moi?"flex-end":"flex-start"}},
suite?null:i("div",{style:{display:"flex",alignItems:"center",gap:"7px",marginBottom:"5px",flexDirection:moi?"row-reverse":"row"}},
i("span",{style:{fontSize:"11px",fontWeight:"800",color:moi?P.sub:P.info}},moi?_T("Toi"):_T("Equipe Nexium")),
moi?null:_NXFX.badge(_T("equipe"),P.info,{}),
i("span",{style:{fontSize:"10px",color:P.faint,fontFamily:_NXf.mono}},_NXtr(heureDe(m.a)))),
i("div",{style:{padding:"12px 15px",
borderRadius:moi?(suite?"18px 6px 6px 18px":"18px 18px 6px 18px"):(suite?"6px 18px 18px 6px":"18px 18px 18px 6px"),
background:moi?("linear-gradient(160deg,"+_NXteinte(P.info,26)+","+_NXteinte(P.info,14)+")"):P.raise,
border:"1px solid "+(moi?_NXteinte(P.info,38):P.hair),
color:P.txt,fontSize:"13.5px",lineHeight:1.65,whiteSpace:"pre-wrap",overflowWrap:"anywhere",
userSelect:"text",WebkitUserSelect:"text"}},_NXtr(m.contenu))));}
function fildeMessages(L){
var out=[],prec=null,jour="";
for(var a=0;a<L.length;a++){
var m=L[a],j=jourDe(m.a);
if(j&&j!==jour){jour=j;
out.push(i("div",{key:"j"+a,style:{display:"flex",alignItems:"center",gap:"10px",padding:"12px 4px 12px"}},
i("div",{style:{flex:1,height:"1px",background:P.line}}),
i("span",{style:{fontSize:"9.5px",color:P.dim,fontFamily:_NXf.mono,letterSpacing:".14em",textTransform:"uppercase",whiteSpace:"nowrap"}},_NXtr(jourDit(m.a))),
i("div",{style:{flex:1,height:"1px",background:P.line}})));
prec=null;}
out.push(bulle(m,a,prec));prec=m;}
return out;}
function envoyer(t){
var v=envoi[0];if(!v.trim())return;
envoi[1]("");colle.current=true;
T.ecrit(t.id,v,function(er){if(er)dire(er);});}
function vueFil(){
var f=T.fil;
if(!f||!f.ticket)return _NXFX.vide({icone:"courrier",titre:_T("Ticket introuvable"),texte:_T("Il a peut-etre expire."),
action:_NXFX.bouton({t:_T("Retour"),petit:true,creux:true,col:P.sub,onClick:function(){vue[1]("liste");}})});
var t=f.ticket,c=couleurEtat(t.etat),d=T.etatDirect();
var jours=Math.max(0,Math.ceil(((new Date(t.expire_le)).getTime()-Date.now())/86400000));
var ferme=(t.etat==="ferme");
return i("div",{className:"nxtk-in",style:{borderRadius:"22px",overflow:"hidden",border:"1px solid "+P.line,background:P.panel}},
i("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"14px 16px",flexWrap:"wrap",
borderBottom:"1px solid "+P.line,background:"linear-gradient(180deg,"+_NXteinte(couleurCat(t.categorie),8)+",transparent)"}},
_NXFX.bouton({t:_T("Retour"),icone:"retour",petit:true,creux:true,col:P.sub,
onClick:function(){T.ferme();T.filId=null;vue[1]("liste");T.rafraichis();}}),
_NXFX.pastille(iconeCat(t.categorie),{col:couleurCat(t.categorie),taille:34}),
i("div",{style:{flex:"1 1 160px",minWidth:0}},
i("div",{style:{fontSize:"14.5px",fontWeight:"800",color:P.txt,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(t.sujet)),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"3px"}},
_T("ouvert il y a")+" "+_NXtr(quand(t.cree_le))+" · "+_T("efface dans")+" "+_NXtr(jours)+" "+_T("jour(s)"))),
_NXFX.badge(_NXtr(T.ETATS[t.etat])||_NXtr(t.etat),c,{point:t.etat==="ouvert",gros:true}),
_NXFX.badge(d.ouvert?_T("en direct"):_T("verifie regulierement"),d.ouvert?P.ok:P.faint,{point:d.ouvert})),
i("div",{ref:fil,onScroll:function(e){try{var el=e.target;colle.current=(el.scrollHeight-el.scrollTop-el.clientHeight)<48;}catch(_){}},
style:{position:"relative",height:"52vh",minHeight:"260px",overflowY:"auto",overflowX:"hidden",padding:"18px 18px 8px",
background:"radial-gradient(90% 60% at 50% 0%,"+_NXteinte(P.info,5)+",transparent 70%),"+P.bg}},
_NXtr(fildeMessages(f.messages||[]))),
ferme?i("div",{style:{padding:"14px 16px",borderTop:"1px solid "+P.line,fontSize:"12px",color:P.dim,display:"flex",gap:"9px",alignItems:"center"}},
_NXFX.svg("cadenas",14),_T("Ce ticket est ferme. Ouvres-en un nouveau si tu as encore besoin d aide.")):
i("div",{style:{padding:"12px 14px 14px",borderTop:"1px solid "+P.line,background:P.panel}},
i("div",{style:{display:"flex",alignItems:"flex-end",gap:"10px",padding:"8px 8px 8px 14px",borderRadius:"18px",
background:P.inset,border:"1px solid "+P.hair}},
i("textarea",{value:envoi[0],rows:2,placeholder:_T("Ecris ta reponse…"),spellCheck:true,
"aria-label":_T("Ta reponse"),
onChange:function(e){envoi[1](e.target.value);},
onKeyDown:function(e){try{e.stopPropagation();
if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();envoyer(t);}}catch(_){}},
style:{flex:1,resize:"none",border:"none",outline:"none",background:"transparent",color:P.txt,
fontSize:"13.5px",lineHeight:1.55,fontFamily:"inherit",padding:"6px 0",maxHeight:"160px"}}),
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,"aria-label":_T("Envoyer"),
onClick:function(){envoyer(t);},
style:{width:"38px",height:"38px",flexShrink:0,borderRadius:"12px",display:"flex",alignItems:"center",justifyContent:"center",
cursor:envoi[0].trim()?"pointer":"default",background:envoi[0].trim()?P.info:P.raise,color:envoi[0].trim()?P.ink:P.faint,
transition:an?"background .2s ease":"none"}},_NXFX.svg("envoi",16))),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"10px",color:P.faint,marginTop:"7px",paddingLeft:"6px"}},
_T("Entree pour envoyer, Maj+Entree pour aller a la ligne"))));}

return i(Kr,null,i("div",{className:an?"nxtk-anim":"",style:{maxWidth:"820px",margin:"0 auto"}},
i("style",null,CSS),
vue[0]==="fil"?null:_NXtr(heros()),
avis[0]?_NXFX.note({col:avis[0].ko?P.danger:P.ok,icone:avis[0].ko?"alerte":"check",texte:_NXtr(avis[0].t)}):null,
vue[0]==="neuf"?_NXtr(neuf()):(vue[0]==="fil"?_NXtr(vueFil()):_NXtr(liste())),
_NXfoot(_NXtr("Nexium Ticket · ")+_T("fil prive, efface quinze jours apres le dernier message"))));
}
