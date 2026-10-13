var NexiumIAIcon=function(p){p=p||{};var z=p.width||p.height||20;return (window._NXFX&&_NXFX.svg)?_NXFX.svg("etincelle",z):null;};

// ---------------------------------------------------------------- le chat
// Un seul composant pour les deux emplacements. `compact` resserre la mise
// en page pour le panneau flottant ; tout le reste est identique.
function NexiumIAChat(props){
var compact=!!(props&&props.compact);
var plein=!!(props&&props.plein);
var force=F.useReducer(function(x){return x+1;},0)[1];
var _s0=F.useState("");var saisie=_s0[0];var setSaisie=_s0[1];
var _s1=F.useState(false);var choix=_s1[0];var setChoix=_s1[1];
var _s2=F.useState(false);var mp=_s2[0];var setMp=_s2[1];
var _s3=F.useState(true);var enBas=_s3[0];var setEnBas=_s3[1];
var bas=F.useRef?F.useRef(null):{current:null};
var zone=F.useRef?F.useRef(null):{current:null};
var fil=F.useRef?F.useRef(null):{current:null};
var colle=F.useRef?F.useRef(true):{current:true};
F.useEffect(function(){
_NXIA.listeners.push(force);
return function(){try{_NXIA.listeners=_NXIA.listeners.filter(function(f){return f!==force;});}catch(_){}};},[]);

// Une empreinte de ce qui est affiche : elle ne bouge que si le fil bouge, et
// surtout pas quand on tape dans la zone de saisie.
var _fl=_NXIA.msgs||[];
var _dr=_fl.length?_fl[_fl.length-1]:null;
var etat=_fl.length+"|"+_NXIA.busy+"|"+_NXIA.taches.length+"|"+((_dr&&_dr.content)?_dr.content.length:0);
F.useEffect(function(){try{
var el=fil&&fil.current;
if(!el||!colle.current)return;
// On defile le conteneur du fil, jamais par scrollIntoView : celui-ci remonte
// aussi tous les parents defilables.
el.scrollTop=el.scrollHeight;}catch(_){}},[etat]);

// Si l utilisateur remonte pour relire, on cesse de le ramener en bas, et
// un bouton propose d y revenir.
var suitFil=function(e){try{
var el=e.target;
var proche=(el.scrollHeight-el.scrollTop-el.clientHeight)<48;
colle.current=proche;
if(proche!==enBas)setEnBas(proche);}catch(_){}};
var versLeBas=function(){try{
var el=fil&&fil.current;if(!el)return;
colle.current=true;setEnBas(true);
el.scrollTop=el.scrollHeight;}catch(_){}};
var P=_NXpal;
var M=_NXIA.msgs;
var reste=_NXIA.restant;
var illimite=_NXIA.admin||reste===-2;
var an=_NXFX.anime();

var ajuste=function(el){try{
if(!el)return;
el.style.height="auto";
el.style.height=Math.min(200,Math.max(28,el.scrollHeight))+"px";
el.style.overflowY=el.scrollHeight>200?"auto":"hidden";}catch(_){}};
var envoyer=function(){
var t=saisie.trim();
if(!t||_NXIA.busy)return;
setSaisie("");setMp(false);
colle.current=true;setEnBas(true);
try{if(zone.current){zone.current.style.height="auto";zone.current.style.height="28px";}}catch(_){}
_NXIA.envoyer(t);};
// Discord ecoute le clavier sur le document : sans cela, taper dans le chat
// pilote l application derriere.
var arrete=function(e){try{e.stopPropagation();}catch(_){}};
var touche=function(e){
arrete(e);
if(e.key==="Escape"&&choix){e.preventDefault();setChoix(false);return;}
if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();envoyer();}};

// Le style propre au fil : l entree des messages, le chatoiement de ce qui
// travaille, le point qui clignote en fin de reponse.
var CSS=".nxc-in{animation:nxcIn .28s cubic-bezier(.22,1,.36,1) both}"+
"@keyframes nxcIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}"+
".nxc-chat{background:linear-gradient(90deg,"+P.faint+" 0%,"+P.txt+" 45%,"+P.faint+" 90%);background-size:220% 100%;"+
"-webkit-background-clip:text;background-clip:text;color:transparent;animation:nxcChat 1.8s linear infinite}"+
"@keyframes nxcChat{from{background-position:120% 0}to{background-position:-120% 0}}"+
".nxc-point{display:inline-block;width:9px;height:9px;border-radius:50%;margin-left:4px;vertical-align:middle;"+
"background:"+P.txt+";animation:nxcPoint 1s ease-in-out infinite}"+
"@keyframes nxcPoint{0%,100%{transform:scale(.7);opacity:.55}50%{transform:scale(1);opacity:1}}"+
".nxc-act{opacity:.72;transition:opacity .15s ease,background .15s ease}"+
".nxc-act:hover{opacity:1;background:"+_NXteinte(P.txt,8)+"}"+
".nxc-sug{transition:background .18s ease,border-color .18s ease,transform .18s ease}"+
".nxc-sug:hover{background:"+_NXteinte(P.txt,6)+";border-color:"+P.edge+"}"+
".nxc-defil{scrollbar-width:thin;scrollbar-color:"+_NXteinte(P.txt,16)+" transparent}"+
".nxc-defil::-webkit-scrollbar{width:8px;height:8px}"+
".nxc-defil::-webkit-scrollbar-track{background:transparent}"+
".nxc-defil::-webkit-scrollbar-thumb{background:"+_NXteinte(P.txt,14)+";border-radius:8px;border:2px solid transparent;background-clip:padding-box}"+
".nxc-defil::-webkit-scrollbar-thumb:hover{background:"+_NXteinte(P.txt,24)+";background-clip:padding-box}"+
".nxc-defil::-webkit-scrollbar-corner{background:transparent}"+
"@media (prefers-reduced-motion:reduce){.nxc-in,.nxc-chat,.nxc-point{animation:none!important}.nxc-chat{color:"+P.sub+"}}";

// --- petites pieces communes ----------------------------------------------
var etiquette=function(t,c){
return i("span",{style:{fontSize:"9px",fontWeight:"800",letterSpacing:".15em",
textTransform:"uppercase",color:c||P.faint,whiteSpace:"nowrap"}},_NXtr(t));};
var puce=function(t,c,b){
return i("span",{style:{padding:"2px 8px",borderRadius:"999px",fontFamily:_NXf.mono,
fontSize:"9.5px",whiteSpace:"nowrap",color:c||P.faint,
background:b||"transparent",border:"1px solid "+(b?"transparent":P.line)}},_NXtr(t));};
var icone=function(d,z){return i("svg",{viewBox:"0 0 24 24",width:z||15,height:z||15,fill:"currentColor","aria-hidden":"true"},i("path",{d:d}));};
var D={copie:"M16 1H4a2 2 0 0 0-2 2v14h2V3h12V1zm3 4H8a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 16H8V7h11v14z",
relance:"M17.65 6.35A8 8 0 1 0 19.73 14h-2.08A6 6 0 1 1 12 6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z",
fleche:"M12 4l-7 7 1.4 1.4L11 7.8V20h2V7.8l4.6 4.6L19 11z",
stop:"M7 7h10v10H7z",
bas:"M12 20l7-7-1.4-1.4-4.6 4.6V4h-2v12.2l-4.6-4.6L5 13z",
arobase:"M12 2a10 10 0 1 0 5.3 18.5l-1-1.7A8 8 0 1 1 20 12v1.2c0 .9-.7 1.6-1.5 1.6S17 14.1 17 13.2V12a5 5 0 1 0-1.5 3.6A3.5 3.5 0 0 0 22 13.2V12A10 10 0 0 0 12 2zm0 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
nouveau:"M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25zM20.7 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"};

// Le premier temps du mode profond arrive en lignes courtes : on les empile
// en etapes lisibles plutot qu en pave.
var etapes=function(t){
var L=String(t||"").split(/\n+/),out=[];
for(var a=0;a<L.length;a++){
var x=L[a].replace(/^\s*[-*•\d.)]+\s*/,"").trim();
if(!x)continue;
var m2=x.match(/^([A-Za-zÀ-ÿ' ]{3,28})\s*:\s*(.+)$/);
out.push(i("div",{key:a,style:{display:"flex",gap:"10px",alignItems:"flex-start",padding:"4px 0"}},
i("span",{"aria-hidden":"true",style:{flexShrink:0,width:"5px",height:"5px",borderRadius:"50%",marginTop:"8px",background:P.mute}}),
i("span",{style:{flex:1,minWidth:0}},
m2?i("span",null,i("span",{style:{color:P.sub,fontWeight:"700"}},_NXtr(m2[1].trim())+" · "),i("span",null,_NXtr(m2[2]))):_NXtr(x))));}
return i("div",null,_NXtr(out));};

// D ou vient la reponse : un chiffre sans outil derriere est un chiffre
// invente, le montrer rend l invention visible.
var appuis=function(m,k){
var libre=m.source==="local"?_T("repondu par le client"):m.source==="rappel"?_T("deja repondu, rejoue"):"";
if(!libre&&(!m.outils||!m.outils.length))return null;
return i("div",{key:"ap"+k,style:{display:"flex",gap:"6px",flexWrap:"wrap",alignItems:"center",marginTop:"12px"}},
libre?_NXtr(puce(libre+" · 0 cr",_NXpal.ok,"rgba(143,209,158,.10)")):null,
(m.outils||[]).length?_NXtr(etiquette(_T("d apres"))):null,
(m.outils||[]).map(function(o,z){return i("span",{key:z},_NXtr(puce(o)));}));};

// Le raisonnement se consulte, il ne s impose pas : replie, avec sa longueur.
var pensees=function(m,k){
if(!m.prepare&&!m.pensee)return null;
var ouvert=!!m.__pv;
var lg=(m.prepare||"").length+(m.pensee||"").length;
return i("div",{key:"pv"+k,style:{marginBottom:"12px"}},
i("div",{className:"nx-fx",role:"button","aria-expanded":ouvert?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){m.__pv=!ouvert;_NXIA.notify();},
style:{display:"inline-flex",alignItems:"center",gap:"7px",cursor:"pointer",color:P.dim,fontSize:"12.5px",fontWeight:"600"}},
(m.flux&&!m.content)?i("span",{className:an?"nxc-chat":""},_T("Reflexion en cours")):
i("span",null,_T("Reflexion")+" · "+_NXtr(Math.round(lg/5))+" "+_T("mots")),
i("svg",{viewBox:"0 0 24 24",width:14,height:14,fill:"currentColor","aria-hidden":"true",
style:{transform:ouvert?"rotate(90deg)":"none",transition:"transform .2s ease"}},i("path",{d:"M9 6l6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6z"}))),
ouvert?i("div",{style:{marginTop:"10px",padding:"4px 0 4px 16px",borderLeft:"2px solid "+P.line,
fontSize:"12.5px",color:P.dim,lineHeight:1.7,maxHeight:"360px",overflowY:"auto",overflowX:"hidden",
userSelect:"text",WebkitUserSelect:"text"}},
m.prepare?_NXtr(etapes(m.prepare)):null,
(m.prepare&&m.pensee)?i("div",{"aria-hidden":"true",style:{height:"1px",background:P.line,margin:"11px 0"}}):null,
m.pensee?i("div",{style:{whiteSpace:"pre-wrap",wordBreak:"break-word"}},_NXtr(m.pensee)):null):null);};

// Les actions sous une reponse, en icones : copier, relancer.
var actions=function(m,k){
if(m.flux||!m.content)return null;
var b=function(lab,d,fn){
return i("div",{className:"nx-fx nxc-act",role:"button",tabIndex:0,onKeyDown:_NXkey,
"aria-label":_NXtr(lab),title:_NXtr(lab),onClick:fn,
style:{width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",
borderRadius:"8px",cursor:"pointer",color:P.sub}},_NXtr(icone(d,15)));};
return i("div",{style:{display:"flex",gap:"2px",marginTop:"8px",marginLeft:"-6px"}},
_NXtr(b(_T("Copier"),D.copie,function(){_NXIA.copie(m.content);})),
(k===M.length-1&&!_NXIA.busy)?_NXtr(b(_T("Relancer"),D.relance,function(){_NXIA.relancer();})):null);};

// --- le fil ----------------------------------------------------------------
// Une colonne de lecture fixe au milieu de la largeur, comme on lit un
// document : c est ce qui donne au fil sa regularite.
var COL=compact?"100%":"760px";
var rangee=function(k,dedans){
return i("div",{key:k,className:an?"nxc-in":"",style:{position:"relative",width:"100%"}},
i("div",{style:{maxWidth:COL,margin:"0 auto",padding:compact?"8px 14px":"12px 24px"}},_NXtr(dedans)));};
var tour=function(k,quoi,contenu){
if(quoi==="moi")
return rangee(k,i("div",{style:{display:"flex",justifyContent:"flex-end"}},
i("div",{style:{maxWidth:"72%",padding:"11px 18px",borderRadius:"24px",
background:_NXteinte(P.txt,10),overflowWrap:"anywhere"}},_NXtr(contenu))));
return rangee(k,i("div",{style:{minWidth:0}},_NXtr(contenu)));};
var cadre=function(k,fond,bord,contenu){
return rangee(k,i("div",{style:{padding:"14px 16px",borderRadius:"16px",background:fond,border:"1px solid "+bord}},_NXtr(contenu)));};

var bulle=function(m,k){
if(m.role==="user")
return tour(k,"moi",i("div",{style:{fontSize:"15px",lineHeight:1.6,color:P.txt,whiteSpace:"pre-wrap",
overflowWrap:"anywhere",userSelect:"text",WebkitUserSelect:"text",cursor:"text"}},_NXtr(m.content)));

if(m.role==="envoye")
return cadre(k,"rgba(143,209,158,.06)","rgba(143,209,158,.24)",
i("div",null,
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"7px"}},
i("svg",{viewBox:"0 0 24 24",width:12,height:12,fill:"currentColor","aria-hidden":"true",style:{color:_NXpal.ok,flexShrink:0}},
i("path",{d:"M2 21l21-9L2 3v7l15 2-15 2v7z"})),
_NXtr(etiquette(_T("Message envoye")+(m.ou?(" · "+m.ou):""),_NXpal.ok))),
i("div",{style:{fontSize:"13px",color:P.sub,lineHeight:1.6,overflowWrap:"anywhere"}},_NXtr(m.texte))));

if(m.role==="confirm"){
var rep=m.repondu;
return cadre(k,rep?P.inset:"linear-gradient(158deg,"+_NXteinte(_NXpal.warn,9)+","+P.inset+")",
rep?P.line:_NXteinte(_NXpal.warn,32),
i("div",null,
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"9px"}},
i("svg",{viewBox:"0 0 24 24",width:13,height:13,fill:"currentColor","aria-hidden":"true",style:{color:rep?P.faint:_NXpal.warn,flexShrink:0}},
i("path",{d:"M12 2 4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6l-8-4zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"})),
_NXtr(etiquette(rep==="accepte"?_T("Action autorisee"):rep==="refuse"?_T("Action refusee"):_T("Autoriser cette action ?"),rep?P.faint:_NXpal.warn))),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.6,marginBottom:rep?0:"13px",overflowWrap:"anywhere"}},
i("span",{style:{fontFamily:_NXf.mono,color:P.pale}},_NXtr(m.outil)),
(m.args&&Object.keys(m.args).length)?i("span",{style:{color:P.dim}}," "+JSON.stringify(m.args).slice(0,160)):null),
rep?null:i("div",{style:{display:"flex",gap:"8px"}},
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,onClick:function(){_NXIA.repondre(m.id,true);},
style:{flex:1,textAlign:"center",padding:"10px",borderRadius:"999px",cursor:"pointer",background:P.txt,color:P.bg,fontSize:"12px",fontWeight:"800"}},_T("Autoriser")),
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,onClick:function(){_NXIA.repondre(m.id,false);},
style:{flex:1,textAlign:"center",padding:"10px",borderRadius:"999px",cursor:"pointer",background:"transparent",
border:"1px solid "+P.edge,color:P.sub,fontSize:"12px",fontWeight:"700"}},_T("Refuser")))));}

if(m.role==="etape")
return cadre(k,P.inset,P.line,
i("div",null,
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"9px"}},
i("svg",{viewBox:"0 0 24 24",width:11,height:11,fill:"currentColor","aria-hidden":"true",style:{color:P.mute,flexShrink:0}},
i("path",{d:"M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"})),
_NXtr(etiquette(m.titre||_T("Etape")))),
i("div",{style:{fontSize:"13px",lineHeight:1.7,color:P.sub,overflowWrap:"anywhere",userSelect:"text",WebkitUserSelect:"text"}},_NXIA.riche(m.content))));

if(m.role==="outil"){
var res=m.res||{};
var souci=res.erreur||res.refuse;
var dit=souci?(res.erreur||res.refuse)
:(m.outil==="changer_reglage"&&res.reglage)?(res.reglage+" : "+(res.maintenant?_T("allume"):_T("eteint")))
:(m.outil==="changer_reglage_protect"&&res.reglage)?(res.reglage+" : "+(res.maintenant?_T("allume"):_T("eteint")))
:(m.outil==="appliquer_profil_privacy"&&res.profil)?(_T("profil")+" "+res.profil)
:(m.outil==="musique"&&typeof res.en_lecture==="boolean")?(res.en_lecture?_T("lecture"):_T("pause"))
:_T("consulte");
return rangee(k,i("div",{style:{display:"inline-flex",alignItems:"center",gap:"9px",padding:"6px 13px",borderRadius:"999px",
background:P.inset,border:"1px solid "+P.line,maxWidth:"100%",fontSize:"11px",fontFamily:_NXf.mono}},
i("div",{"aria-hidden":"true",style:{width:"6px",height:"6px",borderRadius:"50%",flexShrink:0,background:souci?_NXpal.warn:_NXpal.ok}}),
i("span",{style:{flexShrink:0,color:souci?_NXpal.warnSoft:P.sub}},_NXtr(m.outil)),
i("span",{style:{flexShrink:0,color:P.faint}},"·"),
i("span",{style:{flex:1,minWidth:0,color:souci?_NXpal.warnSoft:P.dim,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(dit))));}

// Une reponse, avec ses propositions envoyables le cas echeant.
var propositions=null;
if(m.props&&m.props.length&&!m.flux){
var envoyable=_NXIA.accorde("envoi");
propositions=i("div",{style:{display:"flex",flexDirection:"column",gap:"9px",marginTop:"14px"}},
m.props.map(function(pr){
var partie=m.envoyee===pr.rang;
return i("div",{key:pr.rang,style:{padding:"13px 15px",borderRadius:"16px",
background:partie?"rgba(143,209,158,.06)":P.inset,border:"1px solid "+(partie?"rgba(143,209,158,.24)":P.line)}},
i("div",{style:{fontSize:"13.5px",color:P.txt,lineHeight:1.65,overflowWrap:"anywhere"}},_NXtr(pr.texte)),
pr.pourquoi?i("div",{style:{fontSize:"11px",color:P.faint,marginTop:"5px",fontStyle:"italic"}},_NXtr(pr.pourquoi)):null,
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"10px",flexWrap:"wrap"}},
partie?i("span",{style:{fontSize:"11px",fontWeight:"700",color:_NXpal.ok}},_T("Envoye")):
i("div",{className:envoyable?"nx-fx":"",role:"button",tabIndex:envoyable?0:-1,onKeyDown:envoyable?_NXkey:null,
"aria-disabled":envoyable?"false":"true",title:envoyable?"":_T("Accorde l acces d envoi pour utiliser ce bouton"),
onClick:envoyable?function(){_NXIA.envoyerProp(m.salon,pr.texte).then(function(r){if(r&&r.erreur)return;m.envoyee=pr.rang;_NXIA.notify();});}:null,
style:{padding:"6px 14px",borderRadius:"999px",cursor:envoyable?"pointer":"not-allowed",opacity:envoyable?1:.45,
background:P.txt,color:P.bg,fontSize:"11.5px",fontWeight:"800"}},_T("Envoyer")),
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,onClick:function(){_NXIA.copie(pr.texte);},
style:{padding:"6px 14px",borderRadius:"999px",cursor:"pointer",background:"transparent",border:"1px solid "+P.line,
color:P.sub,fontSize:"11.5px",fontWeight:"600"}},_T("Copier"))));}));}

return tour(k,"ia",
i("div",null,
_NXtr(pensees(m,k)),
i("div",{style:{fontSize:"15px",lineHeight:1.75,color:P.txt,overflowWrap:"anywhere",userSelect:"text",WebkitUserSelect:"text",cursor:"text"}},
_NXIA.riche(m.content),
(m.flux&&(m.content||!m.pensee))?i("span",{className:an?"nxc-point":"","aria-hidden":"true",
style:an?null:{display:"inline-block",width:"9px",height:"9px",borderRadius:"50%",marginLeft:"4px",background:P.txt}}):null),
_NXtr(propositions),_NXtr(appuis(m,k)),_NXtr(actions(m,k))));};

// --- choix du modele -------------------------------------------------------
// En haut du fil, comme un titre : le modele en cours, et un menu qui
// s ouvre vers le bas. Dans le panneau flottant, il reste dans le composeur.
var selecteur=function(enHaut){
var courant=_NXIA.info(_NXIA.palier());
var rangCol=function(r){return r==="S+"?"#8ba3e8":r==="S"?_NXpal.warn:(r==="B"||r==="~")?P.sub:_NXpal.ok;};
var rangFond=function(r){return r==="S+"?"rgba(139,163,232,.15)":r==="S"?"rgba(232,196,138,.15)":(r==="B"||r==="~")?"rgba(255,255,255,.05)":"rgba(143,209,158,.12)";};
return i("div",{style:{position:"relative"}},
i("div",{className:"nx-fx",role:"button","aria-haspopup":"listbox","aria-expanded":choix?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){setChoix(!choix);},
style:enHaut?{display:"flex",alignItems:"center",gap:"8px",padding:"8px 12px",borderRadius:"12px",cursor:"pointer",
background:choix?_NXteinte(P.txt,8):"transparent",color:P.txt,fontSize:"16px",fontWeight:"700",letterSpacing:"-.01em"}:
{display:"flex",alignItems:"center",gap:"7px",padding:"6px 10px",borderRadius:"999px",cursor:"pointer",
background:choix?P.raise:"transparent",border:"1px solid "+(choix?P.edge:P.line),color:P.sub,fontSize:"11.5px",fontWeight:"700"}},
enHaut?null:i("span",{style:{fontFamily:_NXf.mono,fontSize:"9px",fontWeight:"800",padding:"1px 5px",borderRadius:"4px",flexShrink:0,
background:rangFond(courant.rang),color:rangCol(courant.rang)}},_NXtr(courant.rang)),
i("span",{style:{whiteSpace:"nowrap"}},_NXtr(courant.nom)),
i("svg",{viewBox:"0 0 24 24",width:enHaut?14:10,height:enHaut?14:10,fill:"currentColor","aria-hidden":"true",
style:{opacity:.6,flexShrink:0,transform:choix?"rotate(180deg)":"none",transition:"transform .18s ease"}},i("path",{d:"M7 10l5 5 5-5z"}))),
choix?i("div",{role:"listbox",style:{position:"absolute",left:0,zIndex:30,
top:enHaut?"calc(100% + 6px)":"auto",bottom:enHaut?"auto":"calc(100% + 8px)",
width:"min(360px,calc(100vw - 60px))",maxHeight:"360px",overflowY:"auto",padding:"6px",borderRadius:"16px",
background:P.panel,border:"1px solid "+P.hair,boxShadow:"0 20px 56px rgba(0,0,0,.6)"}},
_NXIA.paliersVisibles().map(function(p){
var on=_NXIA.palier()===p.k;
var libre=_NXIA.utilisable(p.k);
return i("div",{key:p.k,role:"option","aria-selected":on?"true":"false",className:libre?"nx-fx":"",tabIndex:libre?0:-1,onKeyDown:libre?_NXkey:null,
title:libre?"":_T("Indisponible sur ce compte"),
onClick:libre?function(){_NXIA.setPalier(p.k);setChoix(false);}:function(){try{if(window._NXCP)_NXCP.ouvrir("equicord_abo","Nexium Abonnement");}catch(_){}},
style:{display:"flex",alignItems:"flex-start",gap:"10px",padding:"10px 11px",borderRadius:"11px",cursor:"pointer",
opacity:libre?1:.55,background:on?_NXteinte(P.txt,8):"transparent"}},
i("span",{style:{flexShrink:0,marginTop:"1px",minWidth:"22px",height:"20px",padding:"0 5px",borderRadius:"6px",display:"flex",
alignItems:"center",justifyContent:"center",fontSize:"9px",fontWeight:"800",fontFamily:_NXf.mono,
background:rangFond(p.rang),color:rangCol(p.rang)}},_NXtr(p.rang)),
i("span",{style:{flex:1,minWidth:0}},
i("span",{style:{display:"flex",alignItems:"center",gap:"7px",flexWrap:"wrap"}},
i("span",{style:{fontSize:"13px",fontWeight:"700",color:on?P.txt:P.sub}},_NXtr(p.nom)),
_NXtr(etiquette(_T(p.role)))),
i("span",{style:{display:"block",fontSize:"11px",color:P.dim,marginTop:"3px",lineHeight:1.5}},
libre?_T(p.d):_T("Ouvert avec un abonnement. Clique pour voir les offres."))),
i("span",{style:{flexShrink:0,display:"flex",alignItems:"center",gap:"7px",marginTop:"2px"}},
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10px",color:P.faint}},p.k==="auto"?_T("variable"):(_NXtr(p.base)+_NXtr(" cr"))),
on?i("span",{style:{color:_NXpal.ok,fontSize:"13px"}},"✓"):(libre?null:i("span",{style:{display:"flex",color:P.mauve}},_NXFX.svg("cadenas",12)))));})):null);};

// --- reflexion, mode, plan : des pastilles dans le composeur -----------------
var pastille=function(o){
return i("div",{className:"nx-fx",role:o.role||"button",tabIndex:0,onKeyDown:_NXkey,"aria-checked":o.coche,title:_NXtr(o.titre),
onClick:o.fn,onContextMenu:o.ctx,
style:{display:"flex",alignItems:"center",gap:"6px",padding:"6px 11px",borderRadius:"999px",cursor:"pointer",
fontSize:"12px",fontWeight:"600",background:o.actif?_NXteinte(o.col||P.txt,12):"transparent",
border:"1px solid "+(o.actif?_NXteinte(o.col||P.txt,30):P.line),color:o.actif?(o.col||P.txt):P.sub,
transition:"background .2s ease,border-color .2s ease,color .2s ease"}},
_NXtr(icone(o.d,13)),_NXtr(o.t),o.x?i("span",{style:{fontFamily:_NXf.mono,fontSize:"9.5px",opacity:.75}},_NXtr(o.x)):null);};
var boutonReflexion=function(){
var k=_NXIA.reflexion();
var N=_NXIA.NIVEAUX,ix=0;
for(var q=0;q<N.length;q++)if(N[q].k===k)ix=q;
var cur=N[ix];
return pastille({t:_T(cur.n),x:cur.x,actif:k!=="normal",col:k==="profond"?_NXpal.warn:(k==="rapide"?_NXpal.ok:P.txt),
titre:_T(cur.d)+" "+_T("Cliquer pour changer de niveau."),
d:"M12 2a7 7 0 0 0-4 12.7V17a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-2.3A7 7 0 0 0 12 2zM9 20h6v1a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1z",
fn:function(){_NXIA.setReflexion(N[(ix+1)%N.length].k);}});};
var boutonMode=function(){
var auto=_NXIA.mode()==="auto";
return pastille({t:auto?_T("Auto"):_T("Manuel"),actif:auto,col:_NXpal.ok,role:"switch",coche:auto?"true":"false",
titre:auto?_T("Agit sans demander. Les lectures comme les actions."):_T("Demande avant toute action. Les lectures de ton etat restent libres."),
d:auto?"M12 2 4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6l-8-4zm-1.2 14L7 12.2l1.4-1.4 2.4 2.4 5-5L17.2 9l-6.4 6.9z":"M12 2 4 6v6c0 5 3.4 9.4 8 10 4.6-.6 8-5 8-10V6l-8-4zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
fn:function(){_NXIA.setMode(auto?"manuel":"auto");}});};
var boutonPlan=function(){
var PL=window._NXPLAN;
if(!PL||!PL.boot)return null;
var on=!!PL.cfg.exige;
var q=PL.annulables().length;
return pastille({t:on?_T("Plan"):_T("Sans plan"),actif:on,role:"switch",coche:on?"true":"false",x:q?("↩ "+q):null,
titre:(_NXIA.mode()==="auto")?_T("Sans effet en mode Auto : tu as demande qu il agisse sans rien demander.")
:on?_T("Il ecrit la suite complete et attend ta validation avant de changer quoi que ce soit. Les etapes validees ne redemandent rien.")
:_T("Il agit sans annoncer la suite. Chaque action reste soumise au mode manuel."),
d:"M4 5h10v2H4V5zm0 6h16v2H4v-2zm0 6h10v2H4v-2zm12.5-9L21 9.5 19.5 11 15 6.5 16.5 5z",
fn:function(){PL.set("exige",!on);force();},
ctx:function(e){try{e.preventDefault();PL.modaleAnnuler();}catch(_){}}});};

// Les suggestions regardent l etat reel.
var suggestions=function(){
var L=[];
try{
if(_NXIA.accorde("lecture")){
var sc=window._NXP&&_NXP.score&&_NXP.score();
if(sc&&sc.actifs<sc.total)L.push(["bouclier",_T("Quelles protections me manquent, et lesquelles comptent ?")]);
var bl=window._NXP&&_NXP.blocked;
if(bl&&bl.length)L.push(["oeilBarre",_T("Qui a essaye de me pister recemment ?")]);}
}catch(_){}
if(_NXIA.accorde("actions"))L.push(["lecture",_T("Lance la musique")]);
if(!L.length)L.push(["etincelle",_T("Que sais-tu faire, exactement ?")]);
L.push(["lien",_T("Ce lien est-il une arnaque ?")]);
return L.slice(0,4);};

// --- l accueil du fil vide : un salut, et le composeur au milieu ------------
var prenom=function(){try{var u=_NXcommon().store("UserStore").getCurrentUser();
return (u&&(u.globalName||u.global_name||u.username))||"";}catch(_){return "";}};
var vide=function(){
var nom=prenom();
return i("div",{style:{maxWidth:compact?"100%":"720px",margin:"0 auto",width:"100%",boxSizing:"border-box",textAlign:"center",padding:compact?"8px 16px":"0 24px"}},
i("div",{className:an?"nxc-in":"",style:{fontFamily:_NXf.disp,fontSize:compact?"21px":"30px",fontWeight:"700",color:P.txt,
letterSpacing:"-.025em",marginBottom:compact?"16px":"28px"}},
nom?(_T("Salut")+" "+_NXtr(nom)+", "+_T("on regarde quoi ?")):_T("Comment puis-je t aider ?")),
_NXtr(composeur(true)),
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",justifyContent:"center",marginTop:"16px"}},
suggestions().map(function(sg,k){
return i("div",{key:k,className:"nx-fx nxc-sug",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){setSaisie(sg[1]);try{if(zone.current){zone.current.focus();}}catch(_){}},
style:{display:"flex",alignItems:"center",gap:"8px",padding:"9px 14px",borderRadius:"999px",cursor:"pointer",
border:"1px solid "+P.line,color:P.sub,fontSize:"12.5px",maxWidth:"100%"}},
i("span",{style:{display:"flex",color:P.faint,flexShrink:0}},_NXFX.svg(sg[0],14)),
i("span",{style:{minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(sg[1])));})),
i("div",{style:{fontSize:"11.5px",color:P.faint,marginTop:"18px"}},
_T("Il repond a partir de l etat reel de ton client, pas de suppositions.")));};

// --- la liste des taches ---------------------------------------------------
var taches=function(){
if(!_NXIA.taches.length)return null;
var faits=0;
for(var a=0;a<_NXIA.taches.length;a++)if(_NXIA.taches[a].etat==="fait")faits++;
return i("div",{style:{marginBottom:"8px",padding:"14px 16px",borderRadius:"16px",background:P.inset,border:"1px solid "+P.line}},
i("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:"10px",marginBottom:"10px"}},
_NXtr(etiquette(_T("Travail en cours"))),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10px",color:P.faint}},_NXtr(faits)+"/"+_NXtr(_NXIA.taches.length))),
i("div",{"aria-hidden":"true",style:{height:"3px",borderRadius:"3px",background:P.line,marginBottom:"11px",overflow:"hidden"}},
i("div",{style:{height:"100%",width:Math.round(faits*100/_NXIA.taches.length)+"%",background:_NXpal.ok,transition:"width .5s cubic-bezier(.22,.8,.28,1)"}})),
_NXIA.taches.map(function(x){
var fini=x.etat==="fait",cours=x.etat==="en_cours",laisse=x.etat==="abandonne";
return i("div",{key:x.id,style:{display:"flex",alignItems:"flex-start",gap:"10px",padding:"4px 0",fontSize:"12.5px",lineHeight:1.6,
color:fini?P.dim:(cours?P.txt:P.sub),textDecoration:(fini||laisse)?"line-through":"none",opacity:laisse?.5:1}},
i("span",{style:{flexShrink:0,width:"13px",marginTop:"1px",fontFamily:_NXf.mono,color:fini?_NXpal.ok:(cours?_NXpal.warn:P.faint)}},
fini?"✓":(cours?"›":(laisse?_NXtr("×"):"·"))),
i("span",{style:{flex:1,minWidth:0,overflowWrap:"anywhere"}},_NXtr(x.texte)));}));};

// --- l attente : un mot qui chatoie, et de quoi arreter ---------------------
var attente=function(){
if(!_NXIA.busy)return null;
var dernier=M.length?M[M.length-1]:null;
if(dernier&&dernier.flux&&(dernier.content||dernier.pensee))return null;
var quoi=_NXIA.attentes.length?_T("En attente de ton accord")
:_NXIA.etape==="lecture"?_T("Lecture de la conversation")
:_NXIA.etape==="propositions"?_T("Redaction des propositions")
:(_NXIA.pense?(_T("L assistant reflechit")+(_NXIA.penseeLg>200?(" · "+Math.round(_NXIA.penseeLg/5)+" "+_T("mots")):""))
:_T("L assistant repond"));
return i("div",{style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"}},
i("span",{className:an?"nxc-chat":"",style:{fontSize:"14px",fontWeight:"600",color:an?undefined:P.sub}},_NXtr(quoi)+"…"));};

// --- avis et erreurs -------------------------------------------------------
var avis=function(){
if(!_NXIA.repli)return null;
return i("div",{style:{display:"flex",gap:"9px",alignItems:"flex-start",padding:"10px 14px",borderRadius:"14px",marginBottom:"10px",
background:P.inset,border:"1px solid "+P.line,fontSize:"11.5px",color:_NXpal.warnSoft,lineHeight:1.6}},
i("span",{"aria-hidden":"true",style:{flexShrink:0,marginTop:"6px",width:"5px",height:"5px",borderRadius:"50%",background:_NXpal.warn}}),
i("span",{style:{flex:1,minWidth:0}},_NXtr(_NXIA.repli)));};
var erreur=function(){
if(!_NXIA.erreur)return null;
var credits=/credit/i.test(_NXIA.erreur);
return i("div",{style:{padding:"13px 15px",borderRadius:"16px",marginBottom:"10px",
background:_NXteinte(_NXpal.danger,8),border:"1px solid "+_NXteinte(_NXpal.danger,26)}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"}},
i("svg",{viewBox:"0 0 24 24",width:12,height:12,fill:"currentColor","aria-hidden":"true",style:{color:_NXpal.dangerSoft,flexShrink:0}},
i("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"})),
_NXtr(etiquette(credits?_T("Credits epuises"):_T("L assistant est injoignable"),_NXpal.dangerSoft))),
i("div",{style:{fontSize:"12px",color:P.sub,lineHeight:1.65,overflowWrap:"anywhere"}},_NXtr(_NXIA.erreur)),
credits&&window._NXABO&&!_NXABO.libre()?i("div",{style:{marginTop:"10px"}},
_NXFX.bouton({t:_T("Plus de credits avec un abonnement"),icone:"etoile",petit:true,col:P.mauve,
onClick:function(){try{if(window._NXCP)_NXCP.ouvrir("equicord_abo","Nexium Abonnement");}catch(_){}}})):null);};

// --- la liste des conversations privees ------------------------------------
var listeMP=function(){
if(!mp)return null;
var L=_NXIA.mpOuverts();
var filtre=saisie.slice(1).toLowerCase();
var V=L.filter(function(x){return !filtre||x.nom.toLowerCase().indexOf(filtre)>=0;}).slice(0,6);
var permis=_NXIA.accorde("conversations");
return i("div",{style:{marginBottom:"10px",padding:"7px",borderRadius:"16px",background:P.panel,border:"1px solid "+P.hair,
boxShadow:"0 14px 40px rgba(0,0,0,.45)",textAlign:"left"}},
i("div",{style:{padding:"4px 8px 8px"}},
_NXtr(etiquette(permis?(_T("Analyser une conversation")+" · "+_T("coute deux fois plus")+" · "+_NXIA.plafondMP()+" "+_T("messages lus"))
:_T("Acces aux conversations privees non accorde")))),
permis?(V.length?V.map(function(x){
return i("div",{key:x.id,className:"nx-fx nxc-sug",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){setSaisie("");setMp(false);_NXIA.analyserMP(x.id,x.nom);},
style:{display:"flex",alignItems:"center",gap:"9px",padding:"9px 11px",borderRadius:"11px",cursor:"pointer",fontSize:"13px",color:P.sub}},
i("span",{style:{color:P.faint,fontFamily:_NXf.mono,fontSize:"12px",flexShrink:0}},"@"),
i("span",{style:{flex:1,minWidth:0,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(x.nom)));})
:i("div",{style:{padding:"8px 11px",fontSize:"11.5px",color:P.dim,lineHeight:1.6}},
_T("Aucune conversation privee ouverte. Ouvre-en une dans Discord, puis reessaie.")))
:i("div",{style:{padding:"8px 11px",fontSize:"11.5px",color:P.dim,lineHeight:1.6}},
_T("Cette lecture envoie les derniers messages au relais. Accorde-la dans les reglages si tu le souhaites.")));};

// --- le composeur ----------------------------------------------------------
// Une dalle arrondie : le champ en haut, les pastilles et l envoi en bas.
// L envoi est un rond clair avec une fleche, qui devient un carre pendant
// qu il repond.
var composeur=function(auMilieu){
var pret=!!saisie.trim();
return i("div",{style:{position:"relative",textAlign:"left"}},
_NXtr(listeMP()),
i("div",{style:{borderRadius:"28px",background:_NXteinte(P.txt,6),border:"1px solid "+(pret||_NXIA.busy?P.edge:P.line),
boxShadow:auMilieu?"0 12px 40px rgba(0,0,0,.35)":"0 6px 22px rgba(0,0,0,.25)",transition:"border-color .2s ease"}},
i("textarea",{ref:zone,value:saisie,rows:1,
placeholder:compact?_T("Demande a Nexium IA…"):_T("Demande a Nexium IA, ou @ pour analyser une conversation"),
"aria-label":_T("Message a Nexium IA"),
onChange:function(e){var v=e.target.value;setSaisie(v);setMp(v.charAt(0)==="@");ajuste(e.target);},
onKeyDown:touche,onKeyUp:arrete,onKeyPress:arrete,
className:"nxc-defil",
style:{display:"block",width:"100%",boxSizing:"border-box",minHeight:"28px",maxHeight:"200px",resize:"none",overflowY:"hidden",
padding:"16px 20px 4px",background:"transparent",border:"none",color:P.txt,fontSize:"15px",lineHeight:1.6,fontFamily:"inherit",outline:"none"}}),
i("div",{style:{display:"flex",alignItems:"center",gap:"6px",flexWrap:"wrap",padding:"8px 10px 10px 12px"}},
i("div",{className:"nx-fx nxc-act",role:"button",tabIndex:0,onKeyDown:_NXkey,"aria-label":_T("Analyser une conversation"),title:_T("Analyser une conversation"),
onClick:function(){setSaisie("@");setMp(true);try{if(zone.current)zone.current.focus();}catch(_){}},
style:{width:"34px",height:"34px",borderRadius:"999px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",
border:"1px solid "+P.line,color:P.sub}},_NXtr(icone(D.arobase,16))),
compact?_NXtr(selecteur(false)):null,
_NXtr(boutonReflexion()),_NXtr(boutonMode()),_NXtr(boutonPlan()),
i("div",{style:{flex:1,minWidth:"8px"}}),
pret?i("span",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint,whiteSpace:"nowrap"},title:_T("Cout estime de cette demande")},
"≈ "+_NXIA.cout({caracteres:saisie.length+_NXIA.poids()})+_NXtr(" cr")):null,
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:_NXIA.busy?function(){_NXIA.stop();}:envoyer,"aria-label":_NXIA.busy?_T("Arreter"):_T("Envoyer"),
style:{flexShrink:0,width:"36px",height:"36px",borderRadius:"999px",cursor:(_NXIA.busy||pret)?"pointer":"default",
display:"flex",alignItems:"center",justifyContent:"center",
background:(_NXIA.busy||pret)?P.txt:_NXteinte(P.txt,14),color:(_NXIA.busy||pret)?P.bg:P.faint,
transition:"background .18s ease,color .18s ease"}},
_NXtr(icone(_NXIA.busy?D.stop:D.fleche,_NXIA.busy?14:18))))));};

// --- l assemblage ----------------------------------------------------------
// Une colonne : une barre en haut (le modele, les credits, repartir de zero),
// le fil qui prend la place restante, et le composeur en bas. Quand le fil est
// vide, le composeur monte au milieu, sous le salut.
var hauteur=plein?"100%":(compact?"min(52vh,470px)":"min(74vh,800px)");
var credits=illimite?_T("sans limite"):(reste>=0?(reste+"/"+_NXIA.CREDITS_MAX+" "+_T("credits")):"—");
var creditsCol=illimite?_NXpal.ok:((reste>=0&&reste<=15)?_NXpal.warn:P.dim);
return i("div",{style:{position:"relative",display:"flex",flexDirection:"column",height:hauteur,minHeight:plein?"0":(compact?"280px":"440px"),
background:plein?"transparent":P.bg,borderRadius:plein?0:"20px",border:plein?"none":("1px solid "+P.line),overflow:"hidden"}},
i("style",null,CSS),
compact?null:i("div",{style:{flexShrink:0,display:"flex",alignItems:"center",gap:"10px",padding:"10px 14px",
borderBottom:M.length?"1px solid "+P.line:"1px solid transparent"}},
_NXtr(selecteur(true)),
i("div",{style:{flex:1}}),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:creditsCol,padding:"5px 11px",borderRadius:"999px",border:"1px solid "+P.line},
title:_T("Credits disponibles")},_NXtr(credits)),
M.length?i("div",{className:"nx-fx nxc-act",role:"button",tabIndex:0,onKeyDown:_NXkey,"aria-label":_T("Nouvelle discussion"),title:_T("Nouvelle discussion"),
onClick:function(){if(_NXIA.busy)return;try{_NXIA.effacer();}catch(_){}setSaisie("");},
style:{width:"34px",height:"34px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",cursor:_NXIA.busy?"not-allowed":"pointer",color:P.sub}},
_NXtr(icone(D.nouveau,16))):null),
M.length?i("div",{ref:fil,onScroll:suitFil,className:"nxc-defil",
style:{flex:1,minHeight:0,overflowY:"auto",overflowX:"hidden",overscrollBehavior:"contain",userSelect:"text",WebkitUserSelect:"text",paddingTop:"8px"}},
taches()?i("div",{style:{maxWidth:COL,margin:"0 auto",padding:compact?"8px 14px 0":"12px 24px 0"}},_NXtr(taches())):null,
M.map(bulle),
attente()?i("div",{style:{maxWidth:COL,margin:"0 auto",padding:compact?"4px 14px 12px":"6px 24px 16px"}},_NXtr(attente())):null,
i("div",{ref:bas,style:{height:"16px"}})):
i("div",{className:"nxc-defil",style:{flex:1,minHeight:0,overflowY:"auto",overflowX:"hidden",display:"flex",flexDirection:"column",justifyContent:"center",padding:"18px 0"}},
_NXtr(avis()),_NXtr(erreur()),_NXtr(vide())),
(M.length&&!enBas)?i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,"aria-label":_T("Revenir en bas"),title:_T("Revenir en bas"),
onClick:versLeBas,
style:{position:"absolute",left:"50%",transform:"translateX(-50%)",bottom:compact?"118px":"132px",zIndex:5,
width:"34px",height:"34px",borderRadius:"999px",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",
background:P.panel,border:"1px solid "+P.hair,color:P.sub,boxShadow:"0 8px 22px rgba(0,0,0,.45)"}},_NXtr(icone(D.bas,16))):null,
M.length?i("div",{style:{flexShrink:0,position:"relative",background:"linear-gradient(180deg,transparent,"+P.bg+" 24%)",
padding:compact?"6px 12px 10px":"10px 24px 12px"}},
i("div",{style:{maxWidth:COL,margin:"0 auto"}},
_NXtr(avis()),_NXtr(erreur()),_NXtr(composeur(false)))):null,
i("div",{style:{flexShrink:0,display:"flex",justifyContent:"center",alignItems:"center",gap:"12px",padding:compact?"0 12px 8px":"0 24px 10px",
fontSize:"10.5px",color:P.faint,textAlign:"center"}},
i("span",null,_T("Nexium IA peut se tromper. Verifie ce qui compte.")),
(compact&&!plein&&(illimite||reste>=0))?i("span",{style:{fontFamily:_NXf.mono,color:creditsCol}},_NXtr(credits)):null));
}

// ------------------------------------------------------- panneau flottant
function NexiumIAPanneau(){
var force=F.useReducer(function(x){return x+1;},0)[1];
F.useEffect(function(){
_NXIA.listeners.push(force);
return function(){try{_NXIA.listeners=_NXIA.listeners.filter(function(f){return f!==force;});}catch(_){}};},[]);
var P=_NXpal;
var nCaps=_NXIA.nbCaps();
var boite=F.useRef?F.useRef(null):{current:null};
var dim=F.useState(_NXIA.taillePanneau());
var tire=F.useRef?F.useRef(null):{current:null};

// Etirer : on ecoute sur le document, pas sur la poignee. Sans cela, un
// deplacement rapide sort du curseur et le redimensionnement s arrete net.
var prend=function(e){try{
e.preventDefault();e.stopPropagation();
var d0=dim[0];
tire.current={x:e.clientX,y:e.clientY,l:d0.l,h:d0.h};
var bouge=function(ev){try{
var t=tire.current;if(!t)return;
var l=Math.max(_NXIA.PMIN.l,Math.min(_NXIA.PMAX.l,t.l+(t.x-ev.clientX)));
var h=Math.max(_NXIA.PMIN.h,Math.min(_NXIA.PMAX.h,t.h+(t.y-ev.clientY)));
dim[1]({l:Math.round(l),h:Math.round(h)});}catch(_){}};
var lache=function(){try{
tire.current=null;
document.removeEventListener("mousemove",bouge,true);
document.removeEventListener("mouseup",lache,true);
_NXIA.setTaillePanneau(dim[0]);}catch(_){}};
document.addEventListener("mousemove",bouge,true);
document.addEventListener("mouseup",lache,true);
}catch(_){}};

// La poignee est en haut a gauche : le panneau est ancre en bas a droite,
// donc c est ce coin-la qui commande la taille.
var poignee=function(){
return i("div",{role:"separator","aria-label":_T("Redimensionner le panneau"),
onMouseDown:prend,
title:_T("Etirer pour redimensionner"),
style:{position:"absolute",left:0,top:0,width:"20px",height:"20px",
cursor:"nwse-resize",zIndex:3,display:"flex",alignItems:"center",justifyContent:"center"}},
i("svg",{viewBox:"0 0 12 12",width:11,height:11,"aria-hidden":"true",
style:{color:P.faint,transform:"rotate(180deg)"}},
i("path",{d:"M11 1 1 11M11 5 5 11M11 9 9 11",stroke:"currentColor",strokeWidth:"1.2",
strokeLinecap:"round",fill:"none"})));};

return i("div",{ref:boite,style:{position:"relative",
width:dim[0].l+"px",height:dim[0].h+"px",
maxWidth:"calc(100vw - 32px)",maxHeight:"calc(100vh - 96px)",
borderRadius:"18px",overflow:"hidden",display:"flex",flexDirection:"column",
background:"linear-gradient(160deg,"+P.panel+","+P.bg+")",
border:"1px solid "+(tire.current?P.edge:P.hair),
boxShadow:"0 24px 70px rgba(0,0,0,.62)"}},
_NXtr(poignee()),
i("div",{style:{flexShrink:0,display:"flex",alignItems:"center",gap:"10px",
padding:"13px 14px 13px 26px",borderBottom:"1px solid "+P.line}},
i("span",{style:{color:P.mid,display:"flex"}},i(NexiumIAIcon,{width:15,height:15})),
i("span",{style:{flex:1,minWidth:0,fontSize:"12.5px",fontWeight:"800",color:P.txt}},_NXtr("Nexium IA")),
i("span",{title:_NXtr(nCaps)+" / "+_NXtr(_NXIA.CAPS.length)+" "+_T("acces accordes"),
style:{fontSize:"10.5px",fontFamily:_NXf.mono,padding:"3px 9px",borderRadius:"999px",border:"1px solid "+P.line,
color:(_NXIA.admin||_NXIA.restant===-2)?_NXpal.ok:((_NXIA.restant>=0&&_NXIA.restant<=15)?_NXpal.warn:P.dim)}},
(_NXIA.admin||_NXIA.restant===-2)?_T("sans limite"):(_NXIA.restant>=0?(_NXtr(_NXIA.restant)+" "+_T("credits")):(_NXtr(nCaps)+"/"+_NXtr(_NXIA.CAPS.length)))),
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
"aria-label":_T("Remettre la taille d origine"),title:_T("Taille d origine"),
onClick:function(){var d=_NXIA.PDEF;dim[1]({l:d.l,h:d.h});_NXIA.setTaillePanneau(d);},
style:{width:"24px",height:"24px",borderRadius:"7px",cursor:"pointer",
display:"flex",alignItems:"center",justifyContent:"center",color:P.dim}},
i("svg",{viewBox:"0 0 24 24",width:12,height:12,fill:"currentColor","aria-hidden":"true"},
i("path",{d:"M4 4h6v2H6v4H4V4zm10 0h6v6h-2V6h-4V4zM4 14h2v4h4v2H4v-6zm14 0h2v6h-6v-2h4v-4z"}))),
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
"aria-label":_T("Ouvrir la page complete"),
onClick:function(){_NXIA.fermerPanneau();_NXIA.ouvrePage();},
style:{padding:"5px 9px",borderRadius:"7px",cursor:"pointer",fontSize:"10.5px",
fontWeight:"700",background:"transparent",border:"1px solid "+P.line,color:P.sub}},
_T("Reglages")),
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
"aria-label":_T("Fermer"),onClick:function(){_NXIA.fermerPanneau();},
style:{width:"24px",height:"24px",borderRadius:"7px",cursor:"pointer",
display:"flex",alignItems:"center",justifyContent:"center",color:P.dim,fontSize:"15px"}},
_NXtr("\u00d7"))),
i("div",{style:{flex:1,minHeight:0,display:"flex",flexDirection:"column"}},
nCaps?null:i("div",{style:{flexShrink:0,padding:"9px 11px",borderRadius:"9px",margin:"12px 14px 0",
background:P.inset,border:"1px solid "+P.line,fontSize:"10.5px",color:P.dim,lineHeight:1.6}},
_T("Aucun acces accorde : l assistant ne voit rien de ton client. Ouvre les reglages pour lui en donner.")),
i("div",{style:{flex:1,minHeight:0}},i(NexiumIAChat,{compact:true,plein:true}))));
}

// --------------------------------------------------------------- la page
function NexiumIAComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _t0=F.useState("assistant");var tab=_t0[0];var setTab=_t0[1];
F.useEffect(function(){
_NXIA.listeners.push(force);
// La branche 2.0 et la veille ont leurs propres abonnes. Sans ca, cocher
// une de leurs cases changeait le reglage sans redessiner l ecran.
try{if(window._NXIA2)_NXIA2.listeners.push(force);}catch(_){}
try{if(window._NXVEIL)_NXVEIL.listeners.push(force);}catch(_){}
try{_NXIA.chargeDispo();}catch(_){}
return function(){
try{_NXIA.listeners=_NXIA.listeners.filter(function(f){return f!==force;});}catch(_){}
try{if(window._NXIA2)_NXIA2.listeners=_NXIA2.listeners.filter(function(f){return f!==force;});}catch(_){}
try{if(window._NXVEIL)_NXVEIL.listeners=_NXVEIL.listeners.filter(function(f){return f!==force;});}catch(_){}
};},[]);
var monte=_NXmounted(F);
var P=_NXpal;
var nCaps=_NXIA.nbCaps();
var reste=_NXIA.restant;
var offert=_NXIA.offert||0;
var illimite=_NXIA.admin||reste===-2;
var max=_NXIA.CREDITS_MAX||100;
var utilisable=(reste>=0?reste:max)+offert;
var pct=illimite?100:Math.min(100,Math.round(utilisable*100/max));
var col=illimite?_NXpal.ok:(pct>=50?_NXpal.ok:(pct>=15?_NXpal.warn:_NXpal.danger));

// --- la jauge de credits ---------------------------------------------------
// Vingt segments plutot qu une barre pleine : on lit un reste d un coup d oeil
// sans avoir a comparer deux longueurs.
var jauge=function(){
var n=20,pleins=illimite?n:Math.min(n,Math.round(utilisable/max*n));
var seg=[];
for(var a=0;a<n;a++){
var on=a<pleins;
seg.push(i("div",{key:a,style:{flex:1,height:"100%",borderRadius:"2px",
background:on?col:P.line,opacity:on?(monte?1:0):.55,
transition:"opacity .5s ease,background .3s ease",
transitionDelay:(a*22)+"ms"}}));}
return i("div",{style:{display:"flex",gap:"3px",height:"10px"}},_NXtr(seg));};

var quand=function(){
try{
if(illimite||!_NXIA.reprise)return "";
var d=new Date(_NXIA.reprise);
var min=Math.max(0,Math.round((d.getTime()-Date.now())/60000));
if(!min)return _T("bientot");
if(min<60)return _T("dans")+" "+min+" min";
return _T("dans")+" "+Math.round(min/60)+" h";}catch(_){return "";}};

var hero=function(){
return i("div",{"data-nx-lift":"1",style:{position:"relative",overflow:"hidden",
border:"1px solid "+P.hair,borderRadius:"22px",
background:"linear-gradient(158deg,"+P.panel+","+P.bg+")",
padding:"24px 24px 22px",marginBottom:"14px"}},
i("div",{style:{display:"flex",alignItems:"baseline",justifyContent:"space-between",
gap:"14px",flexWrap:"wrap",marginBottom:"14px"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".16em",
textTransform:"uppercase",color:P.faint}},_T("Credits disponibles")),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:P.dim}},
illimite?_T("compte administrateur")
:(offert?(_T("les credits offerts sont depenses en premier"))
:(quand()?(_T("recharge complete")+" "+_NXtr(quand())):(_T("par tranche de")+" "+_NXtr(max)+_NXtr(" / 7 h")))))),
i("div",{style:{display:"flex",alignItems:"baseline",gap:"12px",flexWrap:"wrap",marginBottom:"14px"}},
i("div",{key:"c"+reste,"data-nx-pop":"1",style:{fontFamily:_NXf.disp,fontSize:"40px",
fontWeight:"800",color:col,letterSpacing:"-.05em",lineHeight:1}},
illimite?_T("Sans limite"):(reste>=0?_NXtr(String(reste)):"\u2014")),
illimite?null:i("div",{style:{fontFamily:_NXf.mono,fontSize:"12px",color:P.faint}},"/ "+_NXtr(max)),
illimite||!offert?null:i("div",{style:{fontFamily:_NXf.mono,fontSize:"12px",color:_NXpal.ok}},
"+ "+_NXtr(offert)+" "+_T("offerts"))),
_NXtr(jauge()),
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",
gap:"14px",marginTop:"22px",paddingTop:"19px",borderTop:"1px solid "+P.line}},
[[_T("Modele"),_NXIA.palierNom(),_NXIA.palier()==="auto"?_T("choisi pour toi"):_T("choisi par toi")],
[_T("Reflexion"),_T(_NXIA.nomNiveau()),_NXIA.reflexion()==="profond"?_T("trois fois le prix")
:(_NXIA.reflexion()==="rapide"?_T("moitie prix"):_T("prix de base"))],
[_T("Mode"),_NXIA.mode()==="auto"?_T("Automatique"):_T("Manuel"),
_NXIA.mode()==="auto"?_T("agit seul"):_T("demande avant d agir")],
[_T("Acces accordes"),nCaps+" / "+_NXIA.CAPS.length,
nCaps?_T("outils executes sur ta machine"):_T("il ne voit rien")]].map(function(x,k){
return i("div",{key:k},
i("div",{style:{fontSize:"9.5px",fontWeight:"800",letterSpacing:".14em",
textTransform:"uppercase",color:P.faint,marginBottom:"5px"}},_NXtr(x[0])),
i("div",{style:{fontSize:"13px",fontWeight:"700",color:P.txt,marginBottom:"2px",
overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(x[1])),
i("div",{style:{fontSize:"10.5px",color:P.dim,lineHeight:1.5}},_NXtr(x[2])));})));};

// --- les acces, en tuiles --------------------------------------------------
var tuileCap=function(c){
var on=_NXIA.accorde(c.k);
var n=0;
for(var a=0;a<_NXIA.OUTILS.length;a++)if(_NXIA.OUTILS[a].cap===c.k)n++;
return i("div",{key:c.k,className:"nx-fx",role:"switch","aria-checked":on?"true":"false",
"aria-label":_T(c.n),tabIndex:0,onKeyDown:_NXkey,
onClick:function(){_NXIA.setCap(c.k,!on);},
style:{position:"relative",overflow:"hidden",cursor:"pointer",padding:"15px 16px",
borderRadius:"16px",background:on?"linear-gradient(158deg,#131316,#0c0c0e)":P.inset,
border:"1px solid "+(on?P.edge:P.line),
transition:"border-color .22s ease,background .22s ease"}},
on?i("div",{"aria-hidden":"true",style:{position:"absolute",left:0,top:0,bottom:0,width:"2px",
background:_NXpal.ok,opacity:.85}}):null,
i("div",{style:{display:"flex",alignItems:"flex-start",gap:"12px"}},
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",marginBottom:"5px"}},
i("div",{style:{fontSize:"12.5px",fontWeight:"700",letterSpacing:"-.01em",
color:on?P.txt:P.sub}},_T(c.n)),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"9.5px",color:P.faint}},
_NXtr(n)+" "+(n>1?_T("outils"):_T("outil")))),
i("div",{style:{fontSize:"11px",color:P.dim,lineHeight:1.6}},_T(c.d))),
i("div",{"data-nx-sw":"1","aria-hidden":"true",style:{flexShrink:0,width:"34px",height:"20px",
borderRadius:"99px",marginTop:"2px",background:on?_NXpal.ok:"transparent",
border:"1px solid "+(on?_NXpal.ok:P.faint),
transition:"background .22s ease,border-color .22s ease"}},
i("div",{style:{width:"13px",height:"13px",borderRadius:"50%",margin:"2.5px",
background:on?_NXpal.ink:P.faint,
transform:on?"translateX(14px)":"none",
transition:"transform .22s cubic-bezier(.4,0,.2,1)"}}))));};

// --- l onglet Service ------------------------------------------------------
var ligneModele=function(p){
var libre=_NXIA.utilisable(p.k);
var on=_NXIA.palier()===p.k;
var rangCol=p.rang==="S+"?"#8ba3e8":p.rang==="S"?_NXpal.warn
:(p.rang==="B"||p.rang==="~")?P.sub:_NXpal.ok;
return i("div",{key:p.k,className:libre?"nx-fx":"",role:"button",
tabIndex:libre?0:-1,onKeyDown:libre?_NXkey:null,
"aria-disabled":libre?"false":"true",
onClick:libre?function(){_NXIA.setPalier(p.k);}:null,
style:{display:"flex",alignItems:"flex-start",gap:"13px",padding:"13px 0",
borderBottom:"1px solid "+P.line,cursor:libre?"pointer":"not-allowed",
opacity:libre?1:.45}},
i("span",{style:{flexShrink:0,marginTop:"1px",minWidth:"26px",height:"22px",padding:"0 6px",
borderRadius:"7px",display:"flex",alignItems:"center",justifyContent:"center",
fontSize:"9.5px",fontWeight:"800",fontFamily:_NXf.mono,
background:"rgba(255,255,255,.045)",color:rangCol}},_NXtr(p.rang)),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"}},
i("div",{style:{fontSize:"13px",fontWeight:"700",color:on?P.txt:P.sub}},_NXtr(p.nom)),
i("span",{style:{fontSize:"9px",fontWeight:"800",letterSpacing:".13em",
textTransform:"uppercase",color:P.faint}},_T(p.role))),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"3px",lineHeight:1.55}},
libre?_T(p.d):_T("Indisponible sur ce compte."))),
i("div",{style:{flexShrink:0,display:"flex",alignItems:"center",gap:"9px",marginTop:"2px"}},
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint}},
p.k==="auto"?_T("variable"):(_NXtr(p.base)+_NXtr(" cr"))),
on?i("span",{style:{color:_NXpal.ok,fontSize:"13px"}},"\u2713")
:i("span",{style:{width:"13px"}},"")));};

var tService=function(){
var V=_NXIA.voies||0;
return i("div",null,
_NXcard(i("div",null,
_NXch(_T("Modeles"),_T("Le palier automatique choisit le moins cher qui tienne la demande. Les autres sont un choix explicite."),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint}},
_NXtr(_NXIA.paliersVisibles().length)+" "+_T("paliers"))),
i("div",null,_NXIA.paliersVisibles().map(ligneModele))),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Le relais"),_T("Il transmet la question au modele, puis oublie. Il ne garde aucune conversation.")),
_NXstrip([
{v:V?String(V):"\u2014",label:_T("Voies de service"),
color:V>1?_NXpal.ok:(V===1?_NXpal.warn:P.txt)},
{v:_NXIA.admin?_T("Oui"):_T("Non"),label:_T("Compte administrateur"),
color:_NXIA.admin?_NXpal.ok:P.txt},
{v:max+" / 7 h",label:_T("Enveloppe de credits")},
{v:_T("Locale"),label:_T("Execution des outils"),color:_NXpal.ok}]),
i("div",{style:{marginTop:"16px",fontSize:"11px",color:P.dim,lineHeight:1.7}},
V>1?_T("Plusieurs voies : la charge se repartit, et une voie saturee ne bloque personne.")
:V===1?_T("Une seule voie configuree : elle sature des que plusieurs personnes ecrivent en meme temps.")
:_T("L etat du service n a pas encore ete lu."))),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Ce qui reste sur ta machine"),
_T("Les outils s executent chez toi. Le relais ne voit que ce qu ils renvoient.")),
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:"12px"}},
[[_T("Aucune conversation gardee"),_T("Ni chez toi, ni sur le serveur. Elle disparait a la fermeture."),_NXpal.ok],
[_T("Adresses et cles retirees"),_T("Ce qui est lu dans une conversation est caviarde avant tout envoi."),_NXpal.ok],
[_T("Un texte lu n est pas un ordre"),_T("Un message qui essaie de donner des consignes est signale, jamais suivi."),_NXpal.ok],
[_T("Seuls tes accords sont gardes"),_T("Et tes preferences, si tu lui en confies."),P.sub]].map(function(x,k){
return i("div",{key:k,style:{padding:"13px 14px",borderRadius:"13px",
background:P.inset,border:"1px solid "+P.line}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"5px"}},
i("span",{"aria-hidden":"true",style:{width:"5px",height:"5px",borderRadius:"50%",
flexShrink:0,background:x[2]}}),
i("div",{style:{fontSize:"12px",fontWeight:"700",color:P.txt}},_NXtr(x[0]))),
i("div",{style:{fontSize:"10.5px",color:P.dim,lineHeight:1.6}},_NXtr(x[1])));}))),{mb:12}));};

// Les acces ne vivent pas seulement dans leur onglet : tant que rien n est
// accorde, ils s affichent au-dessus du chat. Une page dont le sujet est le
// consentement ne doit pas le cacher derriere un onglet.
var carteAcces=function(){return _NXcard(i("div",null,
_NXch(_T("Ce qu il a le droit de voir"),
_T("Chaque acces ouvre un groupe d outils. Un outil dont l acces manque n est meme pas propose au modele, et un second verrou refuse son execution."),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:nCaps?_NXpal.ok:P.faint,
whiteSpace:"nowrap"}},_NXtr(nCaps)+"/"+_NXtr(_NXIA.CAPS.length))),
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(268px,1fr))",gap:"10px"}},
_NXIA.CAPS.map(tuileCap)),
// --- les outils, un par un ---------------------------------------------
// Sept permissions commandaient trente outils, et "Lire l etat du client"
// en ouvrait dix-huit d un coup -- dont le coffre et le journal de traque.
// Une case par outil permet de garder la permission et d en retirer ce
// qu on ne veut pas donner.
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){_NXIA._detail=!_NXIA._detail;_NXIA.notify();},
style:{display:"flex",alignItems:"center",gap:"8px",marginTop:"14px",
padding:"9px 12px",borderRadius:"10px",cursor:"pointer",
border:"1px solid "+P.line,color:P.sub,fontSize:"11.5px",fontWeight:"700"}},
i("svg",{viewBox:"0 0 24 24",width:11,height:11,fill:"currentColor","aria-hidden":"true",
style:{transform:_NXIA._detail?"rotate(180deg)":"none",transition:"transform .2s ease"}},
i("path",{d:"M7 10l5 5 5-5z"})),
_NXIA._detail?_T("Masquer le detail des outils"):_T("Choisir les outils un par un"),
i("span",{style:{marginLeft:"auto",fontFamily:_NXf.mono,fontSize:"10px",color:P.faint}},
_NXtr((function(){var n=0;for(var a=0;a<_NXIA.OUTILS.length;a++)
if(_NXIA.outilAccorde(_NXIA.OUTILS[a].nom))n++;
return n+"/"+_NXIA.OUTILS.length;})()))),
_NXIA._detail?i("div",{style:{marginTop:"10px",display:"flex",
flexDirection:"column",gap:"12px"}},
// Les outils sans permission forment un huitieme groupe. Il n a pas
// d interrupteur au-dessus -- il n y a pas de permission a accorder --
// mais chacun de ses outils a sa case comme les autres.
_NXIA.CAPS.concat([{k:"*",n:"Le fonctionnement de l assistant",
d:"Ses listes de taches, ce qu il retient de tes preferences, et sa facon d aller chercher un outil par son nom."}]).map(function(c){
var ouverte=(c.k==="*")||_NXIA.accorde(c.k);
var L=_NXIA.outilsDe(c.k);
if(!L.length)return null;
var cpt=_NXIA.compteOutils(c.k);
return i("div",{key:"g"+c.k,style:{borderRadius:"12px",
border:"1px solid "+P.line,background:P.inset,overflow:"hidden"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"9px",
padding:"10px 13px",borderBottom:"1px solid "+P.line}},
i("div",{style:{fontSize:"11.5px",fontWeight:"700",
color:ouverte?P.txt:P.faint}},_T(c.n)),
ouverte
?i("span",{style:{fontFamily:_NXf.mono,fontSize:"9.5px",
color:cpt.ouverts?_NXpal.ok:P.faint}},_NXtr(cpt.ouverts)+"/"+_NXtr(cpt.total))
// Le dire, plutot que de laisser croire que les cases sont cassees.
:i("span",{style:{fontSize:"9.5px",color:P.faint}},_T("permission fermee")),
ouverte?i("div",{style:{marginLeft:"auto",display:"flex",gap:"6px"}},
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){for(var a=0;a<L.length;a++)_NXIA.setOutil(L[a].nom,true);},
style:{cursor:"pointer",fontSize:"10px",color:P.dim,padding:"3px 7px",
borderRadius:"7px",border:"1px solid "+P.line}},_T("Tout")),
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){for(var a=0;a<L.length;a++)_NXIA.setOutil(L[a].nom,false);},
style:{cursor:"pointer",fontSize:"10px",color:P.dim,padding:"3px 7px",
borderRadius:"7px",border:"1px solid "+P.line}},_T("Aucun"))):null),
L.map(function(o){
var on=ouverte&&_NXIA.cfg.outils[o.nom]!==false;
return i("div",{key:o.nom,
className:ouverte?"nx-fx":null,
role:ouverte?"checkbox":null,"aria-checked":ouverte?(on?"true":"false"):null,
tabIndex:ouverte?0:-1,onKeyDown:ouverte?_NXkey:null,
onClick:ouverte?function(){_NXIA.setOutil(o.nom,!on);}:null,
style:{display:"flex",alignItems:"flex-start",gap:"10px",
padding:"9px 13px",cursor:ouverte?"pointer":"default",
opacity:ouverte?1:.42}},
// Une case carree, pas un interrupteur : l interrupteur au-dessus dit le
// domaine, la case dit une exception dedans. Deux formes, deux roles.
i("div",{"aria-hidden":"true",style:{flexShrink:0,width:"15px",height:"15px",
marginTop:"1px",borderRadius:"5px",
background:on?_NXpal.ok:"transparent",
border:"1px solid "+(on?_NXpal.ok:P.faint),
display:"flex",alignItems:"center",justifyContent:"center",
transition:"background .18s ease,border-color .18s ease"}},
on?i("svg",{viewBox:"0 0 24 24",width:10,height:10,fill:"none",
stroke:_NXpal.ink,strokeWidth:3.4,strokeLinecap:"round",strokeLinejoin:"round"},
i("path",{d:"M5 12.5l4.5 4.5L19 7"})):null),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontFamily:_NXf.mono,fontSize:"11px",
color:on?P.pale:P.dim,marginBottom:"3px",
overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(o.nom)),
i("div",{style:{fontSize:"10.5px",color:P.dim,lineHeight:1.55}},_T(o.desc))));}));})):null,
i("div",{style:{display:"flex",gap:"8px",marginTop:"16px",flexWrap:"wrap"}},
_NXbtn(_T("Tout accorder"),function(){
for(var a=0;a<_NXIA.CAPS.length;a++)_NXIA.cfg.consent[_NXIA.CAPS[a].k]=true;
_NXIA.cfg.vu=true;_NXIA.save();_NXIA.notify();}),
_NXbtn(_T("Tout refuser"),function(){
for(var a=0;a<_NXIA.CAPS.length;a++)_NXIA.cfg.consent[_NXIA.CAPS[a].k]=false;
_NXIA.cfg.vu=true;_NXIA.save();_NXIA.notify();}))),{mb:12});};

// --- l onglet Nexium IA 2.0 -------------------------------------------------
// La branche d essai n avait aucun ecran : on ne pouvait l activer que par
// l invitation qui apparait quand le detecteur signale une conversation. Une
// fonction qu on ne peut ni trouver ni regler n existe pas vraiment.
//
// Ce panneau montre trois choses, et la troisieme est la plus importante :
// ce qui est ouvert, ce que ca coute, et LE TEXTE EXACT qui partirait. Une
// case "envoyer mon contexte" qu on ne peut pas relire ne se coche pas de
// bonne foi.
var caseLigne=function(cle,on,titre,desc,cout,fn,ferme,geste){
return i("div",{key:cle,className:ferme?null:"nx-fx",
role:ferme?null:"checkbox","aria-checked":ferme?null:(on?"true":"false"),
tabIndex:ferme?-1:0,onKeyDown:ferme?null:_NXkey,
onClick:ferme?null:fn,
style:{display:"flex",alignItems:"flex-start",gap:"11px",
padding:"11px 13px",borderRadius:"11px",
cursor:ferme?"default":"pointer",opacity:ferme?.45:1,
border:"1px solid "+(on?P.edge:P.line),
background:on?P.inset:"transparent",
transition:"border-color .2s ease,background .2s ease"}},
i("div",{"aria-hidden":"true",style:{flexShrink:0,width:"15px",height:"15px",
marginTop:"1px",borderRadius:"5px",
background:on?_NXpal.ok:"transparent",
border:"1px solid "+(on?_NXpal.ok:P.faint),
display:"flex",alignItems:"center",justifyContent:"center",
transition:"background .18s ease,border-color .18s ease"}},
on?i("svg",{viewBox:"0 0 24 24",width:10,height:10,fill:"none",
stroke:_NXpal.ink,strokeWidth:3.4,strokeLinecap:"round",strokeLinejoin:"round"},
i("path",{d:"M5 12.5l4.5 4.5L19 7"})):null),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap",
marginBottom:"3px"}},
i("div",{style:{fontSize:"11.5px",fontWeight:"700",color:on?P.txt:P.sub}},_T(titre)),
// Le cout est ecrit a cote du nom, pas en bas de page. C est la seule
// facon qu il soit lu au moment ou on coche.
cout?i("span",{style:{fontFamily:_NXf.mono,fontSize:"9.5px",
color:cout.indexOf("gratuit")===0?_NXpal.ok:_NXpal.warn}},_NXtr(cout)):null),
i("div",{style:{fontSize:"10.5px",color:P.dim,lineHeight:1.55}},_T(desc)),
// Le cout dit si on peut se le permettre ; le geste dit comment s en
// servir. Sans lui, une fonction cochee reste introuvable.
geste?i("div",{style:{display:"flex",alignItems:"flex-start",gap:"6px",marginTop:"6px",
fontSize:"10px",color:P.sub,lineHeight:1.5}},
i("span",{"aria-hidden":"true",style:{flexShrink:0,color:_NXpal.ok,fontWeight:"800"}},
_NXtr(String.fromCharCode(0x2192))),
i("span",null,_T(geste))):null));};

var tIA2=function(){
var E=null;
try{E=_NXIA2.etat();}catch(_){E=null;}
if(!E)return _NXcard(i("div",{style:{fontSize:"11.5px",color:P.dim}},
_T("La branche 2.0 n a pas demarre sur ce client.")),{mb:12});

// --- le droit d entrer ---------------------------------------------------
if(!E.eligible)
return _NXcard(i("div",null,
_NXch(_T("Nexium IA 2.0"),
_T("Un assistant qui connait ton monde, qui regarde de lui-meme, et qui ecrit dans ton style.")),
i("div",{style:{padding:"14px 15px",borderRadius:"12px",background:P.inset,
border:"1px solid "+P.line}},
i("div",{style:{fontSize:"11.5px",color:P.sub,lineHeight:1.65,marginBottom:"8px"}},
_T("Ces fonctions appellent le relais toutes seules. C est ce qui les rend utiles, "+
"et c est aussi ce qui coute. Elles sont donc reservees au niveau 2 et au-dessus.")),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"11px",color:_NXpal.warn}},
_NXIA2.pourquoiPas()||"")),
// On ne vend rien ici : on dit ou regarder, une fois.
i("div",{style:{marginTop:"12px",fontSize:"10.5px",color:P.faint,lineHeight:1.6}},
_T("Les niveaux se lisent dans l onglet Abonnement."))),{mb:12});

var on=E.actif;
return i("div",null,
// --- 1. la branche -----------------------------------------------------
_NXcard(i("div",null,
_NXch(_T("La branche d essai"),
_T("Elle s allume a la main et elle se referme toute seule si l abonnement s arrete. "+
"Rien ne s active dans ton dos.")),
i("div",{className:"nx-fx",role:"switch","aria-checked":on?"true":"false",
tabIndex:0,onKeyDown:_NXkey,
onClick:function(){_NXIA2.set("actif",!on);},
style:{display:"flex",alignItems:"center",gap:"13px",cursor:"pointer",
padding:"15px 16px",borderRadius:"14px",
background:on?"linear-gradient(158deg,#131316,#0c0c0e)":P.inset,
border:"1px solid "+(on?P.edge:P.line),
transition:"border-color .22s ease,background .22s ease"}},
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"12.5px",fontWeight:"700",
color:on?P.txt:P.sub,marginBottom:"3px"}},
on?_T("Nexium IA 2.0 est active"):_T("Nexium IA 2.0 est fermee")),
i("div",{style:{fontSize:"10.5px",color:P.dim,lineHeight:1.55}},
on?_T("Les fonctions cochees ci-dessous sont en service.")
:_T("Rien de ce qui suit ne tourne tant que cette case est fermee."))),
i("div",{"data-nx-sw":"1","aria-hidden":"true",style:{flexShrink:0,width:"34px",height:"20px",
borderRadius:"99px",background:on?_NXpal.ok:"transparent",
border:"1px solid "+(on?_NXpal.ok:P.faint),
transition:"background .22s ease,border-color .22s ease"}},
i("div",{style:{width:"13px",height:"13px",borderRadius:"50%",margin:"2.5px",
background:on?_NXpal.ink:P.faint,
transform:on?"translateX(14px)":"none",
transition:"transform .22s cubic-bezier(.4,0,.2,1)"}}))),
// Une porte fermee rend la suivante inutile. Et une case cochee qui fait
// apparaitre une carte ailleurs dans la page ne se trouve pas toute seule.
on?i("div",{style:{marginTop:"11px",padding:"11px 13px",borderRadius:"11px",
background:P.inset,border:"1px solid "+P.line,
fontSize:"10.5px",color:P.dim,lineHeight:1.7}},
_T("Coche ensuite les fonctions ci-dessous. Celles marquees ")+
_NXtr(String.fromCharCode(0x201c))+_T("a la demande")+_NXtr(String.fromCharCode(0x201d))+
_T(" ne partent jamais seules : elles font apparaitre leur propre carte plus bas dans cette page, avec le bouton qui les declenche.")):null),{mb:12}),

// --- 2. ce qu elle a le droit de faire ---------------------------------
_NXcard(i("div",null,
_NXch(_T("Ce qu elle a le droit de faire"),
_T("Chaque fonction a sa case, et chaque case dit ce qu elle coute."),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10px",color:P.faint,whiteSpace:"nowrap"}},
_NXtr((function(){var n=0,k;for(k in E.fonctions)if(E.fonctions[k])n++;
return n+"/5";})()))),
i("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}},
_NXtr(caseLigne("f_manip",_NXIA2.cfg.manip,
"Le detecteur de manipulation",
"Il lit la forme d une conversation privee : l urgence fabriquee, l autorite "+
"revendiquee, l isolement. Le score est calcule sur ta machine.",
"gratuit",function(){_NXIA2.set("manip",!_NXIA2.cfg.manip);},!on,
"Rien a faire ensuite : il lit la forme de tes conversations privees en fond, et pose un bandeau quand il trouve. Jamais sur un ami.")),
_NXtr(caseLigne("f_ctx",_NXIA2.cfg.contexte,
"Le contexte",
"L assistant sait quels serveurs tu frequentes, a quelle heure tu vis et de quoi "+
"tu parles, au lieu de repartir de zero a chaque question.",
"gratuit",function(){_NXIA2.set("contexte",!_NXIA2.cfg.contexte);},!on,
"Rien a faire ensuite : ce texte part avec tes questions. Il est affiche en entier au bas de cette page, tel quel.")),
_NXtr(caseLigne("f_veille",_NXIA2.cfg.veille,
"L IA qui veille",
"Elle regarde d elle-meme et ne parle que quand ca compte. Regarder ne coute rien ; "+
"un seul appel par jour au maximum.",
"1 appel/jour",function(){_NXIA2.set("veille",!_NXIA2.cfg.veille);},!on,
"Rien a faire ensuite : elle te parle d elle-meme. Ce qu elle surveille se regle juste en dessous, situation par situation.")),
_NXtr(caseLigne("f_rep",_NXIA2.cfg.repondant,
"Le repondant",
"Il apprend ta facon d ecrire sur tes propres messages et te propose des brouillons "+
"dans ton registre. Tu demandes, il propose, tu envoies.",
"a la demande",function(){_NXIA2.set("repondant",!_NXIA2.cfg.repondant);},!on,
"Coche la case : une carte apparait plus bas et montre ce qu il a appris de ta facon d ecrire. Le brouillon se demande depuis une conversation privee.")),
_NXtr(caseLigne("f_voc",_NXIA2.cfg.vocal,
"Le compte rendu vocal",
"Qui est arrive, qui a parle et combien de temps, et ce qui a ete ECRIT pendant l appel. "+
"Aucune voix n est enregistree ni transcrite.",
"a la demande",function(){_NXIA2.set("vocal",!_NXIA2.cfg.vocal);},!on,
"Coche la case : une carte apparait plus bas dans cette page. Rejoins un salon vocal, puis Demarrer. L annonce part dans le salon avant que le releve commence.")))),{mb:12}),

// --- 3. le budget ------------------------------------------------------
_NXcard(i("div",null,
_NXch(_T("Le budget automatique"),
_T("Ce plafond ne compte QUE les appels que tu n as pas demandes. Poser une question "+
"ou demander un brouillon se paye sur ton quota habituel, comme avant."),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10px",
color:E.reste?_NXpal.ok:_NXpal.warn,whiteSpace:"nowrap"}},
_NXtr(E.depense)+" / "+_NXtr(E.budget)+_T(" aujourd hui"))),
i("div",{style:{display:"flex",gap:"7px",flexWrap:"wrap"}},
[0,4,8,16,24,40].map(function(v){
var actif=E.budget===v;
return i("div",{key:"b"+v,className:on?"nx-fx":null,
role:on?"button":null,tabIndex:on?0:-1,onKeyDown:on?_NXkey:null,
onClick:on?function(){_NXIA2.set("budget",v);}:null,
style:{padding:"8px 14px",borderRadius:"10px",
cursor:on?"pointer":"default",opacity:on?1:.45,
fontFamily:_NXf.mono,fontSize:"11.5px",
color:actif?_NXpal.ink:P.sub,
background:actif?_NXpal.ok:"transparent",
border:"1px solid "+(actif?_NXpal.ok:P.line)}},
v===0?_T("aucun"):_NXtr(String(v)));})),
i("div",{style:{marginTop:"11px",fontSize:"10.5px",color:P.faint,lineHeight:1.6}},
_T("A zero, plus rien ne part tout seul : la veille continue de regarder et de te "+
"prevenir, mais sans jamais appeler le relais."))),{mb:12}),

// --- 4. la veille, dans le detail -------------------------------------
(on&&_NXIA2.cfg.veille&&window._NXVEIL)?_NXcard(i("div",null,
_NXch(_T("Ce que la veille surveille"),
_T("Quatre situations, quatre cases. Trois d entre elles ne coutent rien du tout.")),
i("div",{style:{display:"flex",flexDirection:"column",gap:"8px"}},
_NXtr(caseLigne("v_manip",_NXVEIL.cfg.manip,
"Une conversation signalee a laquelle tu as repondu",
"C est la seule situation ou elle depense son appel du jour : le bandeau est deja "+
"passe et il n a pas suffi.",
"1 appel/jour",function(){_NXVEIL.set("manip",!_NXVEIL.cfg.manip);})),
_NXtr(caseLigne("v_client",_NXVEIL.cfg.client,
"Ton client n est plus protege",
"Version sous le plancher, ou toutes les protections fermees.",
"gratuit",function(){_NXVEIL.set("client",!_NXVEIL.cfg.client);})),
_NXtr(caseLigne("v_tk",_NXVEIL.cfg.tickets,
"Une reponse t attend sur un ticket",
"Personne ne relancera a ta place.",
"gratuit",function(){_NXVEIL.set("tickets",!_NXVEIL.cfg.tickets);})),
_NXtr(caseLigne("v_ryt",_NXVEIL.cfg.rythme,
"Ton rythme a change",
"Elle te fait remarquer que tu vis la nuit. C est une observation, pas un reproche -- "+
"et c est ferme par defaut parce que ca parle de ta vie, pas de ton client.",
"gratuit",function(){_NXVEIL.set("rythme",!_NXVEIL.cfg.rythme);})),
_NXtr(caseLigne("v_rel",_NXVEIL.cfg.relais,
"L autoriser a demander une explication",
"Sans cette case, la veille reste entierement gratuite : elle previent, mais elle "+
"n appelle jamais le relais.",
"gratuit si ferme",function(){_NXVEIL.set("relais",!_NXVEIL.cfg.relais);}))),
_NXVEIL.avis.length?i("div",{style:{marginTop:"14px"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".14em",
textTransform:"uppercase",color:P.faint,marginBottom:"9px"}},
_T("Ce qu elle a remarque")),
_NXVEIL.avis.slice(0,5).map(function(a,x){
return i("div",{key:"av"+x,style:{padding:"10px 12px",borderRadius:"10px",
background:P.inset,border:"1px solid "+P.line,marginBottom:"7px"}},
i("div",{style:{fontSize:"11px",fontWeight:"700",color:P.pale,
marginBottom:"3px"}},_NXtr(a.titre)),
i("div",{style:{fontSize:"10.5px",color:P.dim,lineHeight:1.55}},_NXtr(a.texte)),
a.mot?i("div",{style:{marginTop:"7px",paddingTop:"7px",
borderTop:"1px solid "+P.line,fontSize:"10.5px",color:P.sub,
lineHeight:1.6}},_NXtr(a.mot)):null);})):null),{mb:12}):null,

// --- le repondant -----------------------------------------------------
// Ce qu il croit savoir de toi, en toutes lettres. Une fonction qui apprend
// sans montrer ce qu elle a appris ne merite pas qu on la laisse tourner.
(on&&_NXIA2.cfg.repondant&&window._NXREP)?_NXcard(i("div",null,
_NXch(_T("Ce que le repondant a appris de toi"),
_T("Il compte au fil de l eau, sur les messages que tu ecris. Rien de tout ca ne part avant que tu demandes un brouillon."),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10px",color:P.faint,whiteSpace:"nowrap"}},
_NXtr((function(){try{return _NXREP.profil().messages+_T(" messages lus");}catch(_){return "";}})()))),
_NXtr((function(){try{
if(!_NXREP.assez())
return i("div",{style:{padding:"13px 15px",borderRadius:"11px",background:P.inset,
border:"1px solid "+P.line,fontSize:"11px",color:P.dim,lineHeight:1.65}},
_T("Pas encore assez de matiere. Ecris quelques messages et il saura te relire : ")+
_NXtr(_NXREP.profil().messages)+" / "+_NXtr(_NXREP.MINPOUR)+".");
return i("div",null,
i("div",{style:{padding:"13px 15px",borderRadius:"11px",background:P.inset,
border:"1px solid "+P.line,fontSize:"11.5px",color:P.sub,lineHeight:1.7,
userSelect:"text",WebkitUserSelect:"text"}},_NXREP.decris()),
i("div",{style:{display:"flex",gap:"8px",marginTop:"12px",flexWrap:"wrap"}},
_NXbtn(_T("Tout oublier"),function(){_NXREP.oublie();},"danger")));
}catch(_){return null;}})())),{mb:12}):null,

// --- le compte rendu vocal --------------------------------------------
(on&&_NXIA2.cfg.vocal&&window._NXVOC)?_NXcard(i("div",null,
_NXch(_T("Le compte rendu vocal"),
_T("Il note qui est la, qui parle et ce qui est ecrit dans le salon. Aucune voix n est enregistree ni transcrite : ce serait enregistrer des gens qui n ont rien demande, et aucune machine modeste ne ferait tourner un modele de transcription.")),
_NXtr((function(){try{
var E2=_NXVOC.etat();
return i("div",null,
// On le dit AVANT le bouton, pas apres : c est la condition, pas une note.
i("div",{style:{padding:"12px 14px",borderRadius:"11px",background:P.inset,
border:"1px solid "+P.line,fontSize:"11px",color:P.dim,lineHeight:1.65,
marginBottom:"12px"}},
_T("Demarrer envoie d abord ce message dans le salon : ")+_NXtr(String.fromCharCode(0x201c))+
_NXtr(_NXVOC.ANNONCE)+_NXtr(String.fromCharCode(0x201d))+
_T(" Si l annonce ne part pas, le releve ne commence pas.")),
E2.erreur?i("div",{style:{fontSize:"11px",color:_NXpal.warn,lineHeight:1.6,
marginBottom:"10px"}},_NXtr(E2.erreur)):null,
i("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap"}},
E2.enCours
?_NXbtn(_T("Arreter et etablir le compte rendu"),function(){_NXVOC.arrete();})
:_NXbtn(E2.salon?_T("Demarrer le compte rendu"):_T("Rejoins un salon vocal d abord"),
function(){if(_NXVOC.salon())_NXVOC.demarre();})),
_NXVOC.comptes.length?i("div",{style:{marginTop:"14px"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".14em",
textTransform:"uppercase",color:P.faint,marginBottom:"9px"}},_T("Dernieres seances")),
_NXVOC.comptes.slice(0,3).map(function(f,x){
return i("div",{key:"cr"+x,style:{padding:"11px 13px",borderRadius:"10px",
background:P.inset,border:"1px solid "+P.line,marginBottom:"7px"}},
i("div",{style:{fontSize:"11px",color:P.pale,lineHeight:1.7,
whiteSpace:"pre-wrap",userSelect:"text",WebkitUserSelect:"text"}},
_NXVOC.enClair(f)),
f.resume?i("div",{style:{marginTop:"9px",paddingTop:"9px",
borderTop:"1px solid "+P.line,fontSize:"11px",color:P.sub,lineHeight:1.7,
whiteSpace:"pre-wrap"}},_NXtr(f.resume))
:i("div",{style:{marginTop:"9px",display:"flex",gap:"8px"}},
_NXbtn(_NXVOC.busy?_T("..."):_T("En faire un paragraphe"),
function(){if(!_NXVOC.busy)_NXVOC.resume(f);})));})):null);
}catch(_){return null;}})())),{mb:12}):null,

// --- 5. ce qui part vraiment ------------------------------------------
// La carte de confiance. On ne demande pas de croire sur parole : on montre
// le texte, et on compte ses caracteres.
(on&&_NXIA2.cfg.contexte&&window._NXCTX)?_NXcard(i("div",null,
_NXch(_T("Ce qui part avec tes questions"),
_T("Le texte exact ajoute a la consigne, tel quel. Il est assemble a partir de ce que "+
"Nexium Stats compte deja : aucun observateur supplementaire, et aucun contenu de message."),
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10px",color:P.faint,whiteSpace:"nowrap"}},
_NXtr((function(){try{return _NXCTX.resume().length+" / "+_NXCTX.MAXRESUME;}catch(_){return "";}})()))),
i("div",{style:{padding:"13px 15px",borderRadius:"11px",background:P.inset,
border:"1px solid "+P.line,fontSize:"11px",color:P.sub,lineHeight:1.7,
userSelect:"text",WebkitUserSelect:"text",
whiteSpace:"pre-wrap",overflowWrap:"anywhere"}},
_NXtr((function(){try{return _NXCTX.resume()||_T("Rien pour l instant : Nexium Stats n a pas encore assez compte.");}
catch(_){return "";}})())),
i("div",{style:{marginTop:"10px",fontSize:"10.5px",color:P.faint,lineHeight:1.6}},
_T("Pour l effacer, remets Nexium Stats a zero : cette vue n est qu une lecture de ses compteurs."))),{mb:12}):null);};

// --- les onglets -----------------------------------------------------------
var TABS=[["assistant","Assistant"],["acces","Accès"],["ia2","IA 2.0"],["service","Service"]];
var tabbar=function(){
return i("div",{role:"tablist","aria-label":_T("Sections de Nexium IA"),
style:{display:"flex",borderBottom:"1px solid "+P.line,marginBottom:"18px",
overflowX:"auto",position:"relative"}},
TABS.map(function(t){
var on=tab===t[0];
return i("div",{key:t[0],className:"nx-fx",role:"tab","aria-selected":on?"true":"false",
tabIndex:0,onKeyDown:_NXkey,"data-nx-tab":"1","aria-label":_T(t[1]),
onClick:function(){if(tab!==t[0])setTab(t[0]);},
style:{position:"relative",padding:"12px 15px",cursor:"pointer",fontSize:"10.5px",
fontWeight:"700",letterSpacing:".11em",textTransform:"uppercase",
color:on?P.txt:P.dim,whiteSpace:"nowrap"}},
_T(t[1]),
t[0]==="acces"?i("span",{style:{marginLeft:"7px",fontFamily:_NXf.mono,fontSize:"9.5px",
color:nCaps?_NXpal.ok:P.faint}},_NXtr(nCaps)+"/"+_NXtr(_NXIA.CAPS.length)):null,
i("span",{"aria-hidden":"true",style:{position:"absolute",left:"12px",right:"12px",
bottom:"-1px",height:"2px",borderRadius:"2px",background:P.txt,
transform:on?"scaleX(1)":"scaleX(0)",transformOrigin:"center",
transition:"transform .28s cubic-bezier(.22,.8,.28,1)"}}));}));};

return i(Kr,null,i("div",{style:{maxWidth:"900px",margin:"0 auto",opacity:monte?1:0,
transform:monte?"none":"translateY(6px)",transition:"opacity .32s ease,transform .32s ease"}},
_NXhead(_NXtr("IA"),_NXtr("Nexium IA"),_T("Un assistant qui connait ton client, et rien d autre")),
_NXtr(hero()),
_NXtr(tabbar()),

tab==="assistant"?_NXcard(i("div",null,
_NXch(_T("Conversation"),
_T("Rien n est enregistre : elle disparait quand tu fermes le client."),
_NXIA.msgs.length?i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){_NXIA.effacer();},
style:{padding:"6px 12px",borderRadius:"999px",cursor:"pointer",background:"transparent",
border:"1px solid "+P.line,color:P.sub,fontSize:"11px",fontWeight:"700"}},_T("Effacer")):null),
i(NexiumIAChat,{compact:false})),{mb:14}):null,
(tab==="assistant"&&!nCaps)?_NXtr(carteAcces()):null,

tab==="acces"?i("div",null,
_NXtr(carteAcces()),
_NXcard(i("div",null,
_NXch(_T("Lecture des conversations"),
_T("Combien de messages sont lus au maximum quand tu demandes une analyse. Le chiffre est affiche avant chaque lecture.")),
i("div",{style:{display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap"}},
i("div",{style:{display:"flex",gap:"7px",flexWrap:"wrap"}},
[5,10,15,25,30].map(function(n){
var on=_NXIA.plafondMP()===n;
return i("div",{key:n,className:"nx-fx",role:"button","aria-pressed":on?"true":"false",
tabIndex:0,onKeyDown:_NXkey,
onClick:function(){_NXIA.setPlafondMP(n);},
style:{padding:"7px 14px",borderRadius:"999px",cursor:"pointer",
fontFamily:_NXf.mono,fontSize:"11px",fontWeight:"700",
background:on?P.raise:"transparent",
border:"1px solid "+(on?P.edge:P.line),color:on?P.txt:P.dim}},_NXtr(n));})),
i("span",{style:{fontSize:"11px",color:P.dim}},_T("messages lus au plus")))),{mb:12}),
_NXIA.prefs().length?_NXcard(i("div",null,
_NXch(_T("Ce qu il a retenu de toi"),
_T("Des preferences, pas des conversations. Elles restent sur ta machine et survivent a l effacement du fil."),
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){_NXIA.oubliePref("");},
style:{padding:"6px 12px",borderRadius:"999px",cursor:"pointer",background:"transparent",
border:"1px solid "+P.line,color:P.sub,fontSize:"11px",fontWeight:"700"}},_T("Tout oublier"))),
i("div",{style:{display:"flex",flexDirection:"column",gap:"7px"}},
_NXIA.prefs().map(function(x,k){
return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"10px",
padding:"10px 12px",borderRadius:"11px",background:P.inset,
border:"1px solid "+P.line}},
i("span",{style:{flex:1,minWidth:0,fontSize:"11.5px",color:P.sub,lineHeight:1.6}},_NXtr(x)),
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,
"aria-label":_T("Oublier"),onClick:function(){_NXIA.oubliePref(x);},
style:{flexShrink:0,width:"22px",height:"22px",borderRadius:"7px",cursor:"pointer",
display:"flex",alignItems:"center",justifyContent:"center",
color:P.faint,fontSize:"14px"}},_NXtr("\u00d7")));}))),{mb:12}):null):null,

tab==="ia2"?_NXtr(tIA2()):null,

tab==="service"?_NXtr(tService()):null,

i("div",{style:{fontSize:"10.5px",color:P.faint,lineHeight:1.7,padding:"4px 2px 8px"}},
_T("Le message part vers un relais Nexium qui interroge le modele, puis oublie. Les outils, eux, s executent sur ta machine : ce que tu n accordes pas ne quitte jamais ton client."))));
}

