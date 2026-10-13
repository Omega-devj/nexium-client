var NexiumAutoIcon=function(p){p=p||{};var z=p.width||p.height||20;return (window._NXFX&&_NXFX.svg)?_NXFX.svg("baguette",z):null;};
function NexiumAutoComp(){
var force=F.useReducer(function(x){return x+1;},0)[1];
var _t0=F.useState("taches");var tab=_t0[0];var setTab=_t0[1];
var _e0=F.useState(null);var form=_e0[0];var setForm=_e0[1];
var _q0=F.useState("");var q=_q0[0];var setQ=_q0[1];
F.useEffect(function(){
if(!window._NXAU)return;
_NXAU.listeners.push(force);
try{if(window._NXFO)_NXFO.listeners.push(force);}catch(_){}
return function(){try{_NXAU.listeners=_NXAU.listeners.filter(function(f){return f!==force;});}catch(_){}
try{if(window._NXFO)_NXFO.listeners=_NXFO.listeners.filter(function(f){return f!==force;});}catch(_){}};},[]);
// Cherche le peripherique de bouclage des l ouverture de l onglet, pour que
// la page dise ce qu elle a trouve au lieu de rendre une erreur apres coup.
var _b0=F.useState(undefined);var boucl=_b0[0];var setBoucl=_b0[1];
var _d0=F.useState(null);var diag=_d0[0];var setDiag=_d0[1];
F.useEffect(function(){
if(tab!=="vocal")return;
if(boucl!==undefined)return;
try{
if(window._NXBEST&&_NXBEST.bouclage)
_NXBEST.bouclage().then(function(b){setBoucl(b||null);},function(){setBoucl(null);});
else setBoucl(null);}catch(_){setBoucl(null);}},[tab]);
var monte=_NXmounted(F);
var P=_NXpal;
var A=window._NXAU||null;
var GRPA={
"Presence":{c:P.ok,p:"M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z"},
"Prevenir":{c:P.warn,p:"M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4a1.5 1.5 0 0 0-3 0v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"},
"Texte":{c:P.mauve,p:"M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zM7 9h10v2H7V9zm7 5H7v-2h7v2z"},
"Vocal":{c:P.info,p:"M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z"},
"Donnees":{c:P.sub,p:"M12 2C7 2 3 3.6 3 5.5v13C3 20.4 7 22 12 22s9-1.6 9-3.5v-13C21 3.6 17 2 12 2zm0 2c4.4 0 7 1.3 7 1.5S16.4 7 12 7 5 5.7 5 5.5 7.6 4 12 4z"},
"Memoire":{c:P.lime,p:"M17 3H7a2 2 0 0 0-2 2v16l7-3 7 3V5a2 2 0 0 0-2-2z"},
"Bilan":{c:P.cyan,p:"M5 9h3v11H5V9zm5.5-5h3v16h-3V4zM16 13h3v7h-3v-7z"},
"Enchainement":{c:P.rose,p:"M3.9 12a3.1 3.1 0 0 1 3.1-3.1h4V7H7a5 5 0 0 0 0 10h4v-1.9H7A3.1 3.1 0 0 1 3.9 12zM8 13h8v-2H8v2zm9-6h-4v1.9h4a3.1 3.1 0 0 1 0 6.2h-4V17h4a5 5 0 0 0 0-10z"},
"Autre":{c:P.sub,p:"M12 2 4 6v6c0 5 3.4 9.7 8 10.9 4.6-1.2 8-5.9 8-10.9V6l-8-4z"}};
function grpDe(t){try{var d=A.actDef(t&&t.act&&t.act.k);return (d&&d.g)||"Autre";}catch(_){return "Autre";}}
function grpGlyphe(g,taille){var d=GRPA[g]||GRPA.Autre;var z=taille||24;
return i("div",{"aria-hidden":"true",style:{width:z+"px",height:z+"px",borderRadius:"8px",flexShrink:0,
background:_NXteinte(d.c,13),border:"1px solid "+_NXteinte(d.c,26),color:d.c,
display:"flex",alignItems:"center",justifyContent:"center"}},
i("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:Math.round(z*0.58),height:Math.round(z*0.58)},i("path",{d:d.p})));}
var st=(A&&A.status)?A.status():{taches:0,actives:0,declencheurs:0,actions:0,modeles:0,compteurs:0};
var cDec=_NXcount(F,st.declencheurs);
var cAct=_NXcount(F,st.actions);
var cMod=_NXcount(F,st.modeles);
var cCpt=_NXcount(F,st.compteurs);

function pill(txt,tone){return i("span",{style:{display:"inline-block",fontSize:"9.5px",fontWeight:"800",letterSpacing:".08em",textTransform:"uppercase",padding:"3px 8px",borderRadius:"99px",border:"1px solid "+(tone||P.line),color:tone||P.dim,whiteSpace:"nowrap"}},_NXtr(txt));}
function btn(label,onClick,strong){return i("div",{className:"nx-fx",role:"button","aria-label":_NXtr(label),tabIndex:0,onKeyDown:_NXkey,onClick:onClick,style:{display:"inline-block",padding:strong?"11px 20px":"7px 12px",borderRadius:"10px",border:"1px solid "+P.line,background:strong?P.acc:"transparent",color:strong?_NXpal.ink:P.sub,fontSize:strong?"12.5px":"11px",fontWeight:"700",cursor:"pointer",whiteSpace:"nowrap"}},_NXtr(label));}
function sw(on){return i("div",{style:{width:"38px",height:"22px",borderRadius:"11px",background:on?P.txt:"transparent",border:"1px solid "+(on?P.txt:P.faint),position:"relative",flexShrink:0,transition:"background .18s ease, border-color .18s ease"}},i("div",{style:{position:"absolute",top:"3px",left:on?"19px":"3px",width:"14px",height:"14px",borderRadius:"50%",background:on?P.panel:P.faint,transition:"left .18s ease, background .18s ease"}}));}
function label(t){return i("div",{style:{fontSize:"10.5px",fontWeight:"700",letterSpacing:".08em",textTransform:"uppercase",color:P.dim,marginBottom:"7px"}},_NXtr(t));}
function field(lab,value,onChange,ph,mono){return i("div",{style:{marginBottom:"12px"}},_NXtr(label(lab)),
i("input",{value:value||"",onChange:onChange,placeholder:_NXtr(ph)||"",spellCheck:false,"aria-label":_NXtr(lab),style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,borderRadius:"10px",padding:"10px 12px",color:P.txt,fontSize:"12.5px",fontFamily:mono?_NXf.mono:"inherit",outline:"none"}}));}
function chip(lab,on,onClick,dim){return i("div",{key:lab,className:"nx-fx",role:"button","aria-label":_NXtr(lab),"aria-pressed":on?"true":"false",tabIndex:0,onKeyDown:_NXkey,onClick:onClick,
style:{padding:"7px 11px",borderRadius:"9px",cursor:dim?"not-allowed":"pointer",fontSize:"11.5px",fontWeight:"600",
background:on?P.inset:"transparent",border:"1px solid "+(on?P.sub:P.line),color:dim?P.faint:(on?P.txt:P.sub),opacity:dim?.5:1}},_NXtr(lab));}
function grouped(lab,list,cur,onPick,availOf){
var gs=A.groups(list);
return i("div",{style:{marginBottom:"14px"}},_NXtr(label(lab)),
gs.map(function(g){
return i("div",{key:g,style:{marginBottom:"9px"}},
i("div",{style:{fontSize:"10px",color:P.faint,marginBottom:"5px",letterSpacing:".06em"}},_NXtr(g)),
i("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px"}},
list.filter(function(x){return (x.g||"Autre")===g;}).map(function(x){
var av=availOf?availOf(x):true;
return chip(x.n,cur===x.k,function(){if(av)onPick(x.k);},!av);})));}));}
var DAYS=[["0","lun"],["1","mar"],["2","mer"],["3","jeu"],["4","ven"],["5","sam"],["6","dim"]];
function trigLabel(t){try{
var d=A.trigDef(t.trig&&t.trig.k);if(!d)return "?";
var v=(t.trig&&t.trig.v)||"";
if(d.k==="time")return "chaque jour a "+(v||"—");
if(d.k==="every"){var m=parseInt(v,10)||0;return m>=1440?("tous les "+Math.round(m/1440)+" jour(s)"):("toutes les "+m+" min");}
if(d.k==="keyword")return 'mot-cle "'+v+'"';
if(d.k==="from")return "message de "+v;
if(d.k==="idle")return "apres "+v+" min d inactivite";
if(d.k==="stat")return v+" messages envoyes dans la journee";
return d.n.toLowerCase();}catch(_){return "?";}}
function actLabel(t){try{
var d=A.actDef(t.act&&t.act.k);if(!d)return "?";
var v=(t.act&&t.act.v)||"";
if(d.k==="status"){for(var a=0;a<A.STATUS.length;a++)if(A.STATUS[a][0]===v)return "statut : "+A.STATUS[a][1];return d.n;}
if(d.k==="purge")return "purger au-dela de "+(v||90)+" jours";
if(d.k==="counter")return "compteur "+(v||"?")+" +1";
if(d.k==="resetCounter")return "compteur "+(v||"?")+" a zero";
if(d.k==="chain")return "enchainer vers "+(v||"?");
if(d.k==="toggleTask")return "basculer "+(v||"?");
if(d.k==="snooze"){var sp=A.splitArg(v);return "mettre "+(sp.a||"?")+" en veille "+(sp.b||30)+" min";}
return d.n.toLowerCase();}catch(_){return "?";}}
function condLabel(t){try{
var c=t.cond||{};var out=[];
if(Array.isArray(c.days)&&c.days.length&&c.days.length<7)out.push(c.days.map(function(d){return DAYS[d]?DAYS[d][1]:d;}).join(" "));
if(c.from&&c.to)out.push(c.from+"–"+c.to);
if(c.dmOnly)out.push("MP seulement");
if(c.guild)out.push("serveur "+c.guild);
if(c.notDnd)out.push("sauf en ne pas deranger");
if(c.voice==="in")out.push("en vocal");
if(c.voice==="out")out.push("hors vocal");
if(c.gap)out.push("1 fois / "+c.gap+" min");
if(c.maxDay)out.push("max "+c.maxDay+"/jour");
if(c.counter&&c.counter.n){var op=c.counter.op||">=";var w=op===">="?"au moins":op==="<="?"au plus":"exactement";
out.push("compteur "+c.counter.n+" "+w+" "+c.counter.v);}
return out.join(" · ");}catch(_){return "";}}
function blank(){return {name:"",trig:{k:"time",v:"09:00"},act:{k:"toast",v:""},
cond:{days:[],from:"",to:"",dmOnly:false,guild:"",notDnd:false,voice:"",gap:"",maxDay:"",counter:{n:"",op:">=",v:""}},id:null};}
function normCond(c){c=c||{};return {days:c.days||[],from:c.from||"",to:c.to||"",dmOnly:!!c.dmOnly,guild:c.guild||"",
notDnd:!!c.notDnd,voice:c.voice||"",gap:c.gap||"",maxDay:c.maxDay||"",
counter:{n:(c.counter&&c.counter.n)||"",op:(c.counter&&c.counter.op)||">=",v:(c.counter&&c.counter.v)||""}};}
function edit(t){setForm({name:t.name,trig:{k:t.trig.k,v:t.trig.v||""},act:{k:t.act.k,v:t.act.v||""},cond:normCond(t.cond),id:t.id});setTab("editeur");}
function saveForm(){try{
var f=form;if(!f)return;
var c=f.cond,cond={};
if(c.days&&c.days.length&&c.days.length<7)cond.days=c.days.slice();
if(c.from&&c.to){cond.from=c.from;cond.to=c.to;}
if(c.dmOnly)cond.dmOnly=true;
if(c.guild)cond.guild=c.guild;
if(c.notDnd)cond.notDnd=true;
if(c.voice)cond.voice=c.voice;
if(c.gap)cond.gap=c.gap;
if(c.maxDay)cond.maxDay=c.maxDay;
if(c.counter&&c.counter.n&&c.counter.v)cond.counter={n:c.counter.n,op:c.counter.op||">=",v:c.counter.v};
var payload={name:f.name||"Tache sans nom",trig:{k:f.trig.k,v:f.trig.v||""},act:{k:f.act.k,v:f.act.v||""},cond:cond};
if(f.id)A.update(f.id,payload);else A.add(payload);
setForm(null);setTab("taches");force();}catch(_){}}
if(!A)return i(Kr,null,i("div",{style:{maxWidth:"640px",margin:"0 auto"}},
_NXhead(_T("Automatisation"),_NXtr("Nexium Auto"),_T("Le moteur d automatisation n a pas demarre sur ce client.")),
_NXcard(i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.6}},_T("Redemarre Discord. Si le probleme persiste, le module _NXAU a ete desactive par une erreur au chargement.")),{mb:0})));
var TABS=[["taches",_T("Taches"),"eclair",_NXAU.data.tasks.length||""],
["modeles",_T("Modeles"),"couches",""],
["editeur",_T("Editeur"),"crayon",""],
["envoi",_T("Envoi"),"envoi",_NXAU.envoiPret()?_T("ouvert"):""],
["focus",_T("Focus"),"cible",""],
["vocal",_T("Vocal"),"micro",(window._NXBEST&&_NXBEST.moments.length)?String(_NXBEST.moments.length):""],
["memoire",_T("Memoire"),"base",""],
["journal",_T("Journal"),"liste",""]];
function tabbar(){return _NXFX.onglets(TABS,tab,function(k){if(k==="editeur"&&!form)setForm(blank());setTab(k);setQ("");},{col:_NXpal.warn});}
function chiffreA(v,lab,c){return i("div",{style:{flex:1,minWidth:"84px"}},
i("div",{style:{fontFamily:_NXf.disp,fontSize:"24px",fontWeight:"800",
color:c||P.txt,letterSpacing:"-.038em",lineHeight:1,fontVariantNumeric:"tabular-nums"}},_NXtr(v)),
i("div",{style:{fontSize:"10.5px",color:P.dim,marginTop:"6px",lineHeight:1.4}},_NXtr(lab)));}
function flux(){
var col=st.moteur?P.ok:P.dim;
var etape=function(lab,txt,c){return i("div",{style:{flex:"1 1 130px",minWidth:"120px"}},
i("div",{style:{fontSize:"9px",fontWeight:"800",letterSpacing:".15em",textTransform:"uppercase",color:c}},_NXtr(lab)),
i("div",{style:{fontSize:"11.5px",color:P.sub,marginTop:"5px",lineHeight:1.5}},_NXtr(txt)));};
var rail=function(k){return i("div",{key:"r"+k,"aria-hidden":"true",style:{position:"relative",width:"46px",height:"2px",
borderRadius:"2px",background:P.line,flexShrink:0,alignSelf:"center",marginTop:"6px"}},
i("span",{"data-nx-run":st.moteur?"1":null,style:{position:"absolute",left:0,top:"-2px",width:"6px",height:"6px",
borderRadius:"50%",background:col,opacity:st.moteur?1:0}}));};
return i("div",{style:{position:"relative",display:"flex",alignItems:"flex-start",gap:"8px",flexWrap:"wrap",
marginTop:"20px",paddingTop:"17px",borderTop:"1px solid "+P.line}},
_NXtr(etape(_T("Quand"),_T("un declencheur se produit"),P.info)),_NXtr(rail(1)),
_NXtr(etape(_T("Seulement si"),_T("les conditions sont reunies"),P.warn)),_NXtr(rail(2)),
_NXtr(etape(_T("Alors"),_T("l action part, en local"),P.ok)));}
function head(){
var vivant=!!st.moteur;
var col=vivant?_NXpal.ok:P.dim;
var pct=st.taches?Math.round((st.actives/st.taches)*100):0;
return i("div",{"data-nx-lift":"1",style:{position:"relative",overflow:"hidden",
border:"1px solid "+(vivant?_NXteinte(col,24):P.hair),
borderRadius:"22px",background:"linear-gradient(158deg,"+P.panel+","+P.bg+")",padding:"25px 24px",marginBottom:"14px"}},
vivant?i("div",{"data-nx-halo":"1","aria-hidden":"true",style:{position:"absolute",right:"-80px",top:"-100px",
width:"260px",height:"260px",borderRadius:"50%",
background:"radial-gradient(circle,"+_NXteinte(col,22)+",transparent 70%)",pointerEvents:"none"}}):null,
vivant?_NXscan(_NXteinte(col,7)):null,
i("div",{style:{position:"relative",display:"flex",alignItems:"center",gap:"20px",flexWrap:"wrap"}},
_NXring(st.taches?pct:0,col,86,""+(st.actives||0),_T("actives")),
i("div",{style:{flex:1,minWidth:"180px"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"9px",marginBottom:"9px",flexWrap:"wrap"}},
i("span",{"data-nx-dot":vivant?"1":null,"aria-hidden":"true",style:{width:"7px",height:"7px",
borderRadius:"50%",background:col,flexShrink:0}}),
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".16em",textTransform:"uppercase",color:P.faint}},_T("Moteur"))),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"29px",fontWeight:"800",
color:vivant?P.txt:P.dim,letterSpacing:"-.042em",lineHeight:1.1}},
vivant?_T("En marche"):_T("A l arret")),
i("div",{style:{fontSize:"12.5px",color:P.sub,marginTop:"8px",lineHeight:1.55}},
st.taches?(_NXtr(st.actives)+" "+_T("regle(s) active(s) sur")+" "+_NXtr(st.taches)+(st.enVeille?(" · "+_NXtr(st.enVeille)+" "+_T("en veille")):""))
:_T("Aucune regle pour l instant."))),
i("div",{className:"nx-fx",role:"button","aria-label":_T("Activer le moteur"),"aria-pressed":st.moteur?"true":"false",tabIndex:0,onKeyDown:_NXkey,onClick:function(){A.setOn(!A.data.on);force();},style:{cursor:"pointer"}},_NXtr(sw(st.moteur)))),
_NXtr(flux()),
i("div",{style:{position:"relative",display:"flex",gap:"16px",flexWrap:"wrap",marginTop:"20px",
paddingTop:"17px",borderTop:"1px solid "+P.line}},
_NXtr(chiffreA(cDec,_T("Declencheurs"),P.info)),
_NXtr(chiffreA(cAct,_T("Actions"),P.ok)),
_NXtr(chiffreA(cMod,_T("Modeles"),P.mauve)),
_NXtr(chiffreA(cCpt,_T("Compteurs"),P.lime))),
i("div",{style:{position:"relative",marginTop:"16px",display:"flex",gap:"6px",flexWrap:"wrap"}},
_NXtr(pill(st.branche?_T("evenements branches"):_T("evenements non branches"),st.branche?_NXpal.ok:_NXpal.warn)),
_NXtr(pill(st.menaces?_T("menaces branchees"):_T("menaces non branchees"),st.menaces?_NXpal.ok:_NXpal.warn)),
(st.indisponibles&&st.indisponibles.length)?_NXtr(pill(st.indisponibles.length+" "+_T("action(s) indisponible(s)"),_NXpal.warn)):_NXtr(pill(_T("toutes les actions disponibles"),_NXpal.ok))));}
function grille(enfants){return i("div",{style:{display:"grid",
gridTemplateColumns:"repeat(auto-fill,minmax(316px,1fr))",gap:"10px",alignItems:"start"}},_NXtr(enfants));}
function taskCard(t,idx){
var av=A.probe(t.act&&t.act.k);
var slept=!!(t.snoozeUntil&&Date.now()<t.snoozeUntil);
var g=grpDe(t);
var etat=!t.on?P.faint:(slept?P.warn:(av?P.ok:P.danger));
return i("div",_NXMO.merge({key:t.id,"data-nx-tile":"1",style:{position:"relative",overflow:"hidden",
background:P.panel,border:"1px solid "+P.line,borderRadius:"15px",padding:"15px 16px 13px 18px"}},
_NXMO.rise((idx%6)+1)),
i("div",{"aria-hidden":"true",style:{position:"absolute",left:0,top:0,bottom:0,width:"3px",
background:etat,opacity:t.on?0.9:0.45}}),
i("div",{style:{display:"flex",alignItems:"flex-start",gap:"11px"}},
_NXtr(grpGlyphe(g,26)),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"13.5px",fontWeight:"700",color:t.on?P.txt:P.dim,letterSpacing:"-.012em"}},_NXtr(t.name)),
i("div",{style:{fontSize:"11px",color:P.sub,marginTop:"6px",lineHeight:1.55}},_T("Quand")+" : "+_NXtr(trigLabel(t))),
i("div",{style:{fontSize:"11px",color:P.sub,lineHeight:1.55}},_T("Alors")+" : "+_NXtr(actLabel(t))),
condLabel(t)?i("div",{style:{fontSize:"10.5px",color:P.faint,marginTop:"2px",lineHeight:1.5}},_T("Seulement")+" : "+_NXtr(condLabel(t))):null),
i("div",{className:"nx-fx",role:"button","aria-label":_T("Activer")+" "+_NXtr(t.name),"aria-pressed":t.on?"true":"false",tabIndex:0,onKeyDown:_NXkey,onClick:function(){A.toggle(t.id);force();},style:{cursor:"pointer",marginTop:"2px"}},_NXtr(sw(t.on)))),
i("div",{style:{marginTop:"12px",paddingTop:"11px",borderTop:"1px solid "+P.line,display:"flex",gap:"5px",flexWrap:"wrap",alignItems:"center"}},
_NXtr(btn(_T("Tester"),function(){A.testRun(t.id);force();})),
_NXtr(btn(_T("Editer"),function(){edit(t);})),
_NXtr(btn(_T("Dupliquer"),function(){A.duplicate(t.id);force();})),
_NXtr(btn(_T("Supprimer"),function(){if(window.confirm(_T("Supprimer cette tache ?"))){A.remove(t.id);force();}})),
i("div",{style:{flex:1}}),
slept?_NXtr(pill(_T("en veille"),_NXpal.warn)):null,
av?null:_NXtr(pill(_T("action indisponible"),_NXpal.warn)),
i("span",{style:{fontSize:"10.5px",color:P.faint,fontFamily:_NXf.mono}},(_NXtr(t.runs)||0)+_NXtr("×"))));}
function chercheur(ph){return i("input",{value:q,onChange:function(e){setQ(e.target.value);},
placeholder:_NXtr(ph),spellCheck:false,"aria-label":_NXtr(ph),
style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,borderRadius:"12px",
padding:"11px 13px",color:P.txt,fontSize:"12.5px",outline:"none",marginBottom:"12px"}});}
function tTaches(){
var L=A.data.tasks||[];
if(!L.length)return _NXcard(i("div",null,
i("div",{style:{fontSize:"13.5px",fontWeight:"700",color:P.txt,marginBottom:"7px"}},_T("Aucune tache pour l instant")),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.6,marginBottom:"14px"}},_T("Pars d un modele pret a l emploi, ou compose ta propre regle : un declencheur, des conditions, une action.")),
i("div",{style:{display:"flex",gap:"7px",flexWrap:"wrap"}},
_NXtr(btn(_T("Voir les modeles"),function(){setTab("modeles");},true)),
_NXtr(btn(_T("Composer une regle"),function(){setForm(blank());setTab("editeur");})))),{mb:0});
var s=(q||"").trim().toLowerCase();
var F2=s?L.filter(function(t){return (t.name+" "+trigLabel(t)+" "+actLabel(t)).toLowerCase().indexOf(s)>=0;}):L;
return i("div",null,
_NXtr(chercheur(_T("Rechercher une tache…"))),
F2.length?_NXtr(grille(F2.map(function(t,k){return taskCard(t,k);}))):_NXcard(i("div",{style:{fontSize:"12.5px",color:P.dim}},_T("Aucune tache ne correspond.")),{mb:0}));}
function tplCard(o,g,idx){
var tp=o.tp;var av=A.probe(tp.act.k);var d=GRPA[g]||GRPA.Autre;
return i("div",_NXMO.merge({key:"tpl"+o.k,className:"nx-fx","data-nx-tile":"1",role:"button",tabIndex:0,onKeyDown:_NXkey,
"aria-label":(av?_T("Ajouter"):_T("Indisponible"))+" "+tp.name,
onClick:function(){if(!av){try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_T("Cette regle a besoin d une fonction que Discord n expose pas dans cette version : ")+_NXtr(actLabel(tp))+_T(". Elle ne peut pas etre ajoutee."),2);}catch(_){}return;}A.addTemplate(o.k);setQ("");setTab("taches");force();},
style:{position:"relative",overflow:"hidden",cursor:av?"pointer":"not-allowed",opacity:av?1:0.5,
background:P.panel,border:"1px solid "+P.line,borderRadius:"14px",padding:"14px 15px 12px 17px"}},
_NXMO.rise((idx%6)+1)),
i("div",{"aria-hidden":"true",style:{position:"absolute",left:0,top:0,bottom:0,width:"3px",background:d.c,opacity:0.7}}),
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.txt,letterSpacing:"-.012em",marginBottom:"7px"}},_NXtr(tp.name)),
i("div",{style:{fontSize:"11px",color:P.sub,lineHeight:1.55}},_T("Quand")+" : "+_NXtr(trigLabel(tp))),
i("div",{style:{fontSize:"11px",color:P.sub,lineHeight:1.55}},_T("Alors")+" : "+_NXtr(actLabel(tp))),
condLabel(tp)?i("div",{style:{fontSize:"10.5px",color:P.faint,marginTop:"2px",lineHeight:1.5}},_T("Seulement")+" : "+_NXtr(condLabel(tp))):null,
i("div",{style:{marginTop:"10px",fontSize:"9.5px",fontWeight:"800",letterSpacing:".12em",
textTransform:"uppercase",color:av?d.c:P.faint}},av?_T("Ajouter"):_T("indisponible dans cette version de Discord")));}
function tModeles(){
var s=(q||"").trim().toLowerCase();
var L=A.TPL.map(function(tp,k){return {tp:tp,k:k};});
if(s)L=L.filter(function(o){return (o.tp.name+" "+trigLabel(o.tp)+" "+actLabel(o.tp)).toLowerCase().indexOf(s)>=0;});
var par={},ordre=[];
for(var a0=0;a0<L.length;a0++){var g0=grpDe(L[a0].tp);
if(!par[g0]){par[g0]=[];ordre.push(g0);}par[g0].push(L[a0]);}
return i("div",null,
_NXcard(i("div",null,_NXch(_T("Taches intelligentes"),_NXtr(A.TPL.length)+" "+_T("regles pretes a l emploi, rangees par famille. Un clic les ajoute, tu peux ensuite les ajuster."))),{mb:12}),
_NXtr(chercheur(_T("Rechercher un modele…"))),
ordre.length?ordre.map(function(g,gi){
return i("div",{key:"grp"+g,style:{marginBottom:"20px"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"9px",marginBottom:"10px"}},
_NXtr(grpGlyphe(g,22)),
i("div",{style:{fontSize:"10.5px",fontWeight:"800",letterSpacing:".13em",textTransform:"uppercase",
color:(GRPA[g]||GRPA.Autre).c}},_NXtr(g)),
i("div",{style:{flex:1,height:"1px",background:P.line}}),
i("div",{style:{fontFamily:_NXf.mono,fontSize:"10.5px",color:P.faint}},_NXtr(par[g].length))),
i("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"10px",alignItems:"start"}},
par[g].map(function(o,k2){return tplCard(o,g,k2);})));}):
_NXcard(i("div",{style:{fontSize:"12.5px",color:P.dim}},_T("Aucun modele ne correspond.")),{mb:0}));}
function tEditeur(){
var f=form||blank();
var tdef=A.trigDef(f.trig.k)||{};
var adef=A.actDef(f.act.k)||{};
function upd(patch){var n=JSON.parse(JSON.stringify(f));for(var k in patch)n[k]=patch[k];setForm(n);}
function updCond(patch){var c=JSON.parse(JSON.stringify(f.cond));for(var k in patch)c[k]=patch[k];upd({cond:c});}
var taskNames=A.data.tasks.filter(function(t){return t.id!==f.id;});
return i("div",null,
_NXcard(i("div",null,_NXch(f.id?_T("Modifier la tache"):_T("Composer une regle"),_T("Un declencheur, des conditions facultatives, une action.")),
_NXtr(field(_T("Nom"),f.name,function(e){upd({name:e.target.value});},_T("Rappel du soir"))),
_NXtr(grouped(_T("Quand"),A.TRIG,f.trig.k,function(k){upd({trig:{k:k,v:""}});})),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"-8px",marginBottom:"12px",lineHeight:1.55}},_NXtr(tdef.d)||""),
tdef.arg?_NXtr(field(tdef.arg==="time"?_T("Heure (HH:MM)"):tdef.arg==="num"?_T("Nombre"):_T("Valeur"),f.trig.v,function(e){upd({trig:{k:f.trig.k,v:e.target.value}});},tdef.ph,tdef.arg!=="text")):null),{mb:12}),
_NXcard(i("div",null,_NXch(_T("Alors")),
_NXtr(grouped(_T("Action"),A.ACT,f.act.k,function(k){upd({act:{k:k,v:k==="status"?"dnd":k==="purge"?"90":""}});},function(x){return A.probe(x.k);})),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"-8px",marginBottom:"12px",lineHeight:1.55}},_NXtr(adef.d)||""),
A.probe(f.act.k)?null:i("div",{style:{fontSize:"11.5px",color:_NXpal.warn,marginBottom:"12px",lineHeight:1.55}},_T("Cette action n est pas disponible sur ce client : elle ne s executera pas.")),
(f.act.k==="status")?i("div",{style:{marginBottom:"12px"}},_NXtr(label(_T("Statut a appliquer"))),
i("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px"}},A.STATUS.map(function(s2){return chip(s2[1],f.act.v===s2[0],function(){upd({act:{k:"status",v:s2[0]}});});}))):
(adef.arg==="task")?i("div",{style:{marginBottom:"12px"}},_NXtr(label(_T("Tache visee"))),
taskNames.length?i("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px"}},taskNames.map(function(t2){return chip(t2.name,f.act.v===t2.name,function(){upd({act:{k:f.act.k,v:t2.name}});});})):
i("div",{style:{fontSize:"11.5px",color:P.dim}},_T("Cree d abord une autre tache pour pouvoir l enchainer."))):
(adef.arg==="tasknum")?i("div",null,
i("div",{style:{marginBottom:"12px"}},_NXtr(label(_T("Tache a mettre en veille"))),
taskNames.length?i("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px"}},taskNames.map(function(t2){
var sp=A.splitArg(f.act.v);
return chip(t2.name,sp.a===t2.name,function(){upd({act:{k:"snooze",v:t2.name+":"+(sp.b||"30")}});});})):
i("div",{style:{fontSize:"11.5px",color:P.dim}},_T("Cree d abord une autre tache."))),
_NXtr(field(_T("Minutes de veille"),A.splitArg(f.act.v).b,function(e){var sp=A.splitArg(f.act.v);upd({act:{k:"snooze",v:(sp.a||"")+":"+e.target.value}});},"30",true))):
(adef.arg?_NXtr(field(adef.arg==="num"?_T("Nombre de jours"):_T("Texte"),f.act.v,function(e){upd({act:{k:f.act.k,v:e.target.value}});},adef.ph)):null),
(adef.arg==="text")?i("div",{style:{fontSize:"11px",color:P.faint,marginTop:"-6px",marginBottom:"4px",lineHeight:1.6}},
_T("Variables : {heure} {date} {tache} {auteur} {contenu} {salon} {serveur} {lien} {compteur:nom}")):null),{mb:12}),
_NXcard(i("div",null,_NXch(_T("Seulement si"),_T("Laisse vide pour ne poser aucune condition.")),
_NXtr(label(_T("Jours"))),
i("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}},DAYS.map(function(d,k){
var on=(f.cond.days||[]).indexOf(k)>=0;
return chip(d[1],on,function(){var L2=(f.cond.days||[]).slice();var idx=L2.indexOf(k);if(idx>=0)L2.splice(idx,1);else L2.push(k);L2.sort();updCond({days:L2});});})),
i("div",{style:{display:"flex",gap:"10px"}},
i("div",{style:{flex:1}},_NXtr(field(_T("A partir de"),f.cond.from,function(e){updCond({from:e.target.value});},"20:00",true))),
i("div",{style:{flex:1}},_NXtr(field(_T("Jusqu a"),f.cond.to,function(e){updCond({to:e.target.value});},"08:00",true)))),
i("div",{style:{display:"flex",gap:"10px"}},
i("div",{style:{flex:1}},_NXtr(field(_T("Pas plus d une fois toutes les (min)"),f.cond.gap,function(e){updCond({gap:e.target.value});},"5",true))),
i("div",{style:{flex:1}},_NXtr(field(_T("Maximum par jour"),f.cond.maxDay,function(e){updCond({maxDay:e.target.value});},"3",true)))),
_NXtr(field(_T("Nom du serveur contient"),f.cond.guild,function(e){updCond({guild:e.target.value});},_T("mon serveur"))),
_NXtr(label(_T("Vocal"))),
i("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}},
_NXtr(chip(_T("peu importe"),!f.cond.voice,function(){updCond({voice:""});})),
_NXtr(chip(_T("en vocal"),f.cond.voice==="in",function(){updCond({voice:"in"});})),
_NXtr(chip(_T("hors vocal"),f.cond.voice==="out",function(){updCond({voice:"out"});}))),
_NXtr(label(_T("Compteur"))),
i("div",{style:{display:"flex",gap:"10px",marginBottom:"4px"}},
i("div",{style:{flex:2}},_NXtr(field(_T("Nom du compteur"),f.cond.counter.n,function(e){var c=JSON.parse(JSON.stringify(f.cond));c.counter.n=e.target.value;upd({cond:c});},"mp_recus",true))),
i("div",{style:{flex:1}},_NXtr(field(_T("Seuil"),f.cond.counter.v,function(e){var c=JSON.parse(JSON.stringify(f.cond));c.counter.v=e.target.value;upd({cond:c});},"10",true)))),
i("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px",marginBottom:"14px"}},A.OPS.map(function(o){
return chip(o[1],(f.cond.counter.op||">=")===o[0],function(){var c=JSON.parse(JSON.stringify(f.cond));c.counter.op=o[0];upd({cond:c});});})),
i("div",{className:"nx-fx",role:"button","aria-label":_T("Messages prives uniquement"),"aria-pressed":f.cond.dmOnly?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){updCond({dmOnly:!f.cond.dmOnly});},
style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px 0",borderTop:"1px solid "+P.line,cursor:"pointer"}},
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"13px",fontWeight:"600",color:f.cond.dmOnly?P.txt:P.sub}},_T("Messages prives uniquement")),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"3px",lineHeight:1.5}},_T("Ignore tout ce qui arrive dans un serveur."))),
_NXtr(sw(f.cond.dmOnly))),
i("div",{className:"nx-fx",role:"button","aria-label":_T("Pas en ne pas deranger"),"aria-pressed":f.cond.notDnd?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){updCond({notDnd:!f.cond.notDnd});},
style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px 0",borderTop:"1px solid "+P.line,cursor:"pointer"}},
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"13px",fontWeight:"600",color:f.cond.notDnd?P.txt:P.sub}},_T("Pas en ne pas deranger")),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"3px",lineHeight:1.5}},_T("La tache se tait quand ton statut est ne pas deranger."))),
_NXtr(sw(f.cond.notDnd)))),{mb:12}),
_NXcard(i("div",{style:{display:"flex",gap:"7px",flexWrap:"wrap"}},
_NXtr(btn(f.id?_T("Enregistrer"):_T("Creer la tache"),saveForm,true)),
_NXtr(btn(_T("Annuler"),function(){setForm(null);setTab("taches");}))),{mb:0}));}
function tMemoire(){
var cs=Object.keys(A.data.counters||{});
var ns=A.data.notes||[];
return i("div",null,
_NXcard(i("div",null,_NXch(_T("Compteurs"),_T("Des valeurs que tes taches font monter, et que d autres taches peuvent tester.")),
cs.length?cs.map(function(k,idx){
return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"11px",padding:"11px 0",borderBottom:idx===cs.length-1?"none":"1px solid "+P.line}},
i("div",{style:{flex:1,minWidth:0,fontSize:"12.5px",fontFamily:_NXf.mono,color:P.sub,overflow:"hidden",textOverflow:"ellipsis"}},_NXtr(k)),
i("div",{style:{fontFamily:_NXf.disp,fontSize:"17px",fontWeight:"800",color:P.txt}},_NXtr(A.data.counters[k])),
_NXtr(btn(_T("Zero"),function(){A.setCounter(k,0);force();})),
_NXtr(btn(_T("Retirer"),function(){A.delCounter(k);force();})));}):
i("div",{style:{fontSize:"12.5px",color:P.dim,lineHeight:1.6}},_T("Aucun compteur. Ajoute une tache avec l action « Incrementer un compteur »."))),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Carnet"),_NXtr(ns.length)+" "+_T("memo(s) enregistre(s)."),ns.length?i("div",{style:{display:"flex",gap:"6px"}},
_NXtr(btn(_T("Copier"),function(){A.perform({name:"Carnet",act:{k:"notes",v:""}},{},0);force();})),
_NXtr(btn(_T("Tout vider"),function(){if(window.confirm(_T("Vider le carnet ?"))){A.clearNotes();force();}}))):null),
ns.length?ns.slice(0,20).map(function(n,k,arr){
var d=new Date(n.t);
return i("div",{key:k,style:{display:"flex",alignItems:"flex-start",gap:"11px",padding:"11px 0",borderBottom:k===arr.length-1?"none":"1px solid "+P.line}},
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10px",color:P.faint,flexShrink:0,marginTop:"2px"}},("0"+d.getDate()).slice(-2)+"/"+("0"+(d.getMonth()+1)).slice(-2)+" "+("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2)),
i("div",{style:{flex:1,minWidth:0,fontSize:"12px",color:P.sub,lineHeight:1.6,wordBreak:"break-word"}},_NXtr(n.m)),
i("div",{className:"nx-fx",role:"button","aria-label":_T("Retirer ce memo"),tabIndex:0,onKeyDown:_NXkey,onClick:function(){A.delNote(k);force();},style:{flexShrink:0,color:P.faint,cursor:"pointer",padding:"2px 5px",lineHeight:1}},_NXtr("×")));}):
i("div",{style:{fontSize:"12.5px",color:P.dim,lineHeight:1.6}},_T("Aucun memo. Utilise l action « Enregistrer un memo » dans une tache."))),{mb:0}));}
function tVocal(){
var B=window._NXBEST,S2=window._NXSON,PO=window._NXPOP;
function ligne(lab,desc,on,fn,last){
return i("div",{className:"nx-fx",role:"button","aria-label":_NXtr(lab),"aria-pressed":on?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:fn,
style:{display:"flex",alignItems:"center",gap:"12px",padding:"13px 0",
borderBottom:last?"none":"1px solid "+P.line,cursor:"pointer"}},
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"13px",fontWeight:"600",color:on?P.txt:P.sub}},_NXtr(lab)),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"3px",lineHeight:1.5}},_NXtr(desc))),
_NXtr(sw(on)));}
function etatLigne(txt,col){
return i("div",{style:{fontSize:"11.5px",color:col||P.dim,lineHeight:1.6,marginTop:"10px"}},_NXtr(txt));}

var carteBest=!B?_NXcard(i("div",{style:{fontSize:"12.5px",color:P.dim,lineHeight:1.6}},
_T("Le best-of n a pas demarre sur ce client.")),{mb:12}):
(function(){
var e=B.etat();
var voie=B.voieDe(B.cfg.voie||"")||null;
return _NXcard(i("div",null,
_NXch(_T("Best-of du vocal"),
_T("Pendant un appel, il garde les trois dernieres minutes en memoire vive. Quand un moment fort arrive, il decoupe autour. Rien n est envoye nulle part.")),
_NXtr(ligne(_T("Ecouter des que je rejoins un vocal"),
_T("Sinon, il faut le demarrer a la main depuis la carte."),
!!B.cfg.on,function(){B.set("on",!B.cfg.on);force();})),
i("div",{style:{marginTop:"14px"}},
_NXtr(label(_T("A quelle frequence il garde un moment"))),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"}},
[["basse",_T("Rare")],["normale",_T("Normal")],["haute",_T("Souvent")]].map(function(o){
return chip(o[1],B.cfg.sensible===o[0],function(){B.set("sensible",o[0]);force();});}))),
i("div",{style:{marginTop:"14px"}},
_NXtr(label(_T("Ce qu il ecoute"))),
i("div",{style:{display:"flex",gap:"6px",flexWrap:"wrap"}},
B.VOIES.map(function(V){
return chip(V.n,(B.cfg.voie||"")===V.k,function(){
if(B.suspecte===V.k){B.pardonne();force();return;}
B.set("voie",V.k);force();},B.suspecte===V.k);})),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"8px",lineHeight:1.6}},
voie?_NXtr(voie.d):_T("Sans choix, il prend toutes les voix si c est possible, et ton micro sinon."))),
// Ce que la page a trouve, dit avant d essayer.
boucl===undefined?_NXtr(etatLigne(_T("Recherche d un peripherique de bouclage..."))):
boucl?i("div",{style:{marginTop:"12px",padding:"12px 13px",borderRadius:"12px",
background:P.inset,border:"1px solid "+_NXteinte(_NXpal.ok,30)}},
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:_NXpal.ok}},
_T("Toutes les voix de l appel seront enregistrees")),
i("div",{style:{fontSize:"11.5px",color:P.sub,marginTop:"4px",lineHeight:1.6}},
_T("Par")+" "+_NXtr(boucl.nom)+" : "+_NXtr(boucl.note)+"."),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"4px",lineHeight:1.6}},
_T("Ton micro est melange par-dessus, pour que ta voix y soit aussi."))):
i("div",{style:{marginTop:"12px",padding:"12px 13px",borderRadius:"12px",
background:P.inset,border:"1px solid "+P.line}},
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:P.txt}},
_T("Pour l instant, le clip ne contiendra que ta voix")),
i("div",{style:{fontSize:"11.5px",color:P.sub,marginTop:"5px",lineHeight:1.65}},
_NXtr(B.COMMENT)),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"6px",lineHeight:1.6}},
_T("Les moments a plusieurs sont quand meme reperes : Discord dit qui parle, ca ne vient pas du son.")),
i("div",{style:{display:"flex",gap:"8px",marginTop:"10px",flexWrap:"wrap"}},
_NXtr(btn(_T("Rechercher a nouveau"),function(){setBoucl(undefined);setDiag(null);force();})),
_NXtr(btn(_T("Qu est-ce qu il peut entendre ici ?"),function(){
try{B.diagnostic().then(function(d){setDiag(d);force();},function(){setDiag({erreur:1});force();});}
catch(_){setDiag({erreur:1});force();}})))),
// Trois lignes, une par voie, avec ce qu elle donnerait maintenant.
diag?i("div",{style:{marginTop:"12px",padding:"12px 13px",borderRadius:"12px",
background:P.inset,border:"1px solid "+P.line}},
i("div",{style:{fontSize:"10.5px",fontWeight:"700",letterSpacing:".08em",
textTransform:"uppercase",color:P.dim,marginBottom:"8px"}},_T("Ce qu il peut entendre, maintenant")),
diag.erreur?i("div",{style:{fontSize:"12px",color:P.dim}},_T("Le diagnostic n a pas abouti.")):
i("div",null,
[[_T("les voix jouees par la page"),diag.page&&diag.page.n>0,diag.page&&diag.page.texte],
[_T("le bouclage"),diag.bouclage&&diag.bouclage.ok,diag.bouclage&&diag.bouclage.texte],
[_T("ton micro"),true,diag.micro&&diag.micro.texte]].map(function(L,k){
return i("div",{key:k,style:{display:"flex",gap:"9px",alignItems:"flex-start",
padding:"6px 0",borderTop:k?("1px solid "+P.line):"none"}},
i("div",{style:{flex:"0 0 auto",width:"6px",height:"6px",borderRadius:"50%",marginTop:"6px",
background:L[1]?_NXpal.ok:P.faint}}),
i("div",{style:{flex:"1 1 auto",minWidth:0}},
i("div",{style:{fontSize:"12px",fontWeight:"600",color:L[1]?P.txt:P.sub}},_NXtr(L[0])),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"2px",lineHeight:1.5}},_NXtr(L[2])||"")));}))):null,
B.suspecte?_NXtr(etatLigne(_T("La derniere fois, cette source a fait tomber le client. Elle est mise de cote : clique dessus pour la remettre en jeu."),_NXpal.danger)):null,
// L erreur brute ne sert a rien quand le bloc ci-dessus dit deja tout.
(B.erreur&&!/bouclage/.test(B.erreur))?_NXtr(etatLigne(B.erreur,_NXpal.warn)):null,
_NXtr(etatLigne(e.actif?(_T("En ecoute, source :")+" "+(B.VOIETXT[e.voie]||e.voie)
+((e.voie==="appel"&&B.bouclageNom)?(" ("+B.bouclageNom+")"):"")+". "+e.moments+" "+_T("moment(s) garde(s).")):
(e.moments?(e.moments+" "+_T("moment(s) de la derniere session.")):_T("En veille. Rien n est enregistre.")))),
i("div",{style:{display:"flex",gap:"8px",marginTop:"14px",flexWrap:"wrap"}},
_NXtr(btn(_T("Ouvrir le best-of"),function(){B.carte();},true)),
_NXtr(btn(e.actif?_T("Arreter"):_T("Demarrer maintenant"),function(){
if(B.session){B.arrete();force();}
else B.demarre(B.cfg.voie||null).then(function(){force();});})))),{mb:12});})();

var carteSon=!S2?null:(function(){
var e=S2.etat();
var p=S2.voie||null;
var dit=p?(p.voie==="cable"?_T("Un cable audio virtuel est en place : les autres n entendront que le son."):
p.voie==="mixage"?_T("Le mixage stereo est actif : ca marche, mais il renvoie tout ce qui sort de ta machine."):
_T("Aucun peripherique de bouclage : pour l instant, tu es le seul a entendre.")):
_T("Etat inconnu : clique sur Reverifier.");
return _NXcard(i("div",null,
_NXch(_T("Soundboard"),
_T("Tes sons dans n importe quel vocal, sans Nitro. Le son entre par le micro, pas par le soundboard de Discord.")),
_NXtr(etatLigne(dit,p&&p.voie==="cable"?_NXpal.ok:p&&p.voie==="mixage"?_NXpal.warn:P.dim)),
_NXtr(etatLigne(e.sons+" "+_T("son(s) sur")+" "+e.max+". "+_T("Les neuf premiers repondent a Ctrl+Maj+1 a 9."))),
_NXtr(ligne(_T("Raccourcis clavier"),
_T("Jamais quand le curseur est dans un champ de saisie."),
!!S2.cfg.touches,function(){S2.set("touches",!S2.cfg.touches);force();},true)),
i("div",{style:{display:"flex",gap:"8px",marginTop:"14px",flexWrap:"wrap"}},
_NXtr(btn(_T("Ouvrir le soundboard"),function(){S2.carte();},true)),
_NXtr(btn(_T("Reverifier le peripherique"),function(){S2.verifie().then(function(){force();});})))),{mb:12});})();

var carteAnn=!PO?null:_NXcard(i("div",null,
_NXch(_T("Les annonces"),
_T("Une nouveaute est annoncee une fois, au moment ou elle a un sens -- jamais au demarrage.")),
_NXtr(etatLigne(PO.etat().enAttente?(PO.etat().enAttente+" "+_T("annonce(s) pas encore vue(s)."))
:_T("Tout a ete vu."))),
i("div",{style:{display:"flex",gap:"8px",marginTop:"14px",flexWrap:"wrap"}},
_NXtr(btn(_T("Revoir l annonce"),function(){
try{PO.vus={};PO.save();PO.montre(PO.ANNONCES[0]);force();}catch(_){}},true)))),{mb:0});

return i("div",null,_NXtr(carteBest),_NXtr(carteSon),_NXtr(carteAnn));}
function tFocus(){
var O=window._NXFO;
if(!O)return _NXcard(i("div",{style:{fontSize:"12.5px",color:P.dim,lineHeight:1.6}},_T("Le mode concentration n est pas disponible : le module n a pas demarre.")),{mb:0});
var fs=O.status(),c=O.cfg;
function num(lab,key,ph){return i("div",{style:{flex:1,minWidth:"110px"}},
_NXtr(label(lab)),
i("input",{value:String(c[key]),onChange:function(e){var v=parseInt(e.target.value,10);O.set(key,(v>0&&v<600)?v:c[key]);},
placeholder:_NXtr(ph),spellCheck:false,"aria-label":_NXtr(lab),
style:{width:"100%",boxSizing:"border-box",background:P.inset,border:"1px solid "+P.line,borderRadius:"10px",padding:"10px 12px",color:P.txt,fontSize:"12.5px",fontFamily:_NXf.mono,outline:"none"}}));}
function opt(lab,desc,key){var on=!!c[key];
return i("div",{className:"nx-fx",role:"button","aria-label":_NXtr(lab),"aria-pressed":on?"true":"false",tabIndex:0,onKeyDown:_NXkey,
onClick:function(){O.set(key,!c[key]);},
style:{display:"flex",alignItems:"center",gap:"12px",padding:"13px 0",borderBottom:"1px solid "+P.line,cursor:"pointer"}},
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"13px",fontWeight:"600",color:on?P.txt:P.sub}},_NXtr(lab)),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"3px",lineHeight:1.5}},_NXtr(desc))),
_NXtr(sw(on)));}
var guilds=c.hideGuilds?O.myGuilds():[];
return i("div",null,
i("div",{style:{border:"1px solid "+(fs.actif?P.sub:P.line),borderRadius:"20px",background:P.panel,padding:"24px",marginBottom:"14px"}},
i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".16em",textTransform:"uppercase",color:P.faint,marginBottom:"10px"}},
fs.actif?(fs.phase==="pause"?_T("Pause"):_T("Concentration")):_T("Mode concentration")),
fs.actif?i("div",null,
i("div",{style:{fontFamily:_NXf.disp,fontSize:"58px",fontWeight:"800",color:P.txt,letterSpacing:"-.04em",lineHeight:1}},_NXtr(fs.restant)),
i("div",{style:{fontSize:"12px",color:P.dim,marginTop:"8px"}},_T("cycle")+" "+_NXtr(fs.cycle)+" / "+_NXtr(fs.cycles))):
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.6}},
_T("Masque ce qui distrait, coupe les notifications et minute tes sessions.")),
i("div",{style:{marginTop:"18px",display:"flex",gap:"7px",flexWrap:"wrap"}},
fs.actif?_NXtr(btn(_T("Arreter"),function(){O.stop(true);force();},true)):_NXtr(btn(_T("Demarrer une session"),function(){O.start();force();},true)),
i("div",{style:{flex:1}}),
i("span",{style:{fontSize:"11px",color:P.faint,alignSelf:"center"}},_NXtr(fs.minutesDuJour)+" "+_T("min aujourd hui")))),
_NXcard(i("div",null,_NXch(_T("Rythme"),_T("Cycles de travail et de pause, facon pomodoro.")),
i("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap"}},
_NXtr(num(_T("Travail (min)"),"travail","25")),
_NXtr(num(_T("Pause (min)"),"pause","5")),
_NXtr(num(_T("Cycles"),"cycles","4")))),{mb:12}),
_NXcard(i("div",null,_NXch(_T("Ce qui est masque pendant la session"),_T("Uniquement de l affichage : rien n est modifie sur ton compte.")),
_NXtr(opt(_T("Masquer les pastilles de notification"),_T("Les compteurs rouges qui attirent l oeil."),"hideBadges")),
_NXtr(opt(_T("Masquer les images et les videos"),_T("Les apercus dans les messages ne sont plus charges a l ecran."),"hideMedia")),
_NXtr(opt(_T("Masquer la liste des membres"),_T("Recupere de la largeur et enleve une distraction."),"hideMembers")),
_NXtr(opt(_T("Masquer les serveurs"),_T("Ne garde que ceux que tu autorises ci-dessous."),"hideGuilds")),
_NXtr(opt(_T("Ne pas deranger pendant la session"),_T("Ton statut repasse en ligne a la fin."),"dnd")),
_NXtr(opt(_T("Couper les messages Nexium"),_T("Aucun bandeau Nexium pendant que tu travailles."),"quiet"))),{mb:12}),
c.hideGuilds?_NXcard(i("div",null,_NXch(_T("Serveurs autorises"),_T("Ceux-la restent visibles, les autres disparaissent."),
c.allow.length?i("span",{style:{fontSize:"11px",color:P.faint}},_NXtr(c.allow.length)+" "+_T("autorise(s)")):null),
c.allow.length?i("div",{style:{display:"flex",flexWrap:"wrap",gap:"7px",marginBottom:"12px"}},c.allow.map(function(id){
var nm=id;for(var a=0;a<guilds.length;a++)if(guilds[a].id===id)nm=guilds[a].name;
return i("div",{key:id,style:{display:"flex",alignItems:"center",gap:"8px",padding:"6px 10px",background:P.inset,border:"1px solid "+P.line,borderRadius:"99px"}},
i("span",{style:{fontSize:"11px",color:P.sub}},_NXtr(nm)),
i("span",{className:"nx-fx",role:"button","aria-label":_T("Retirer")+" "+_NXtr(nm),tabIndex:0,onKeyDown:_NXkey,onClick:function(){O.delGuild(id);force();},
style:{cursor:"pointer",color:P.faint,fontSize:"13px",lineHeight:1}},_NXtr("\u00d7")));})):null,
guilds.length?i("div",{style:{display:"flex",flexWrap:"wrap",gap:"6px"}},guilds.filter(function(g2){return c.allow.indexOf(g2.id)<0;}).slice(0,24).map(function(g2){
return chip(g2.name.slice(0,22),false,function(){O.addGuild(g2.id);force();});})):
i("div",{style:{fontSize:"12px",color:P.dim}},_T("Liste des serveurs indisponible sur ce client."))),{mb:12}):null,
_NXcard(i("div",null,_NXch(_T("Verification"),_T("Ce que les selecteurs trouvent reellement dans ta fenetre Discord.")),
i("div",{style:{display:"flex",gap:"18px",flexWrap:"wrap"}},
[[_T("serveurs"),fs.cibles.serveurs],[_T("pastilles"),fs.cibles.pastilles],[_T("medias"),fs.cibles.medias],[_T("liste membres"),fs.cibles.membres]].map(function(x,k){
return i("div",{key:k},
i("div",{style:{fontFamily:_NXf.disp,fontSize:"20px",fontWeight:"800",color:x[1]?P.txt:_NXpal.warn}},_NXtr(x[1])),
i("div",{style:{fontSize:"11px",color:P.dim}},_NXtr(x[0])));})),
i("div",{style:{fontSize:"11.5px",color:P.dim,marginTop:"12px",lineHeight:1.6}},
_T("Un zero signifie que Discord a change ses noms de classes : l option correspondante n aura aucun effet."))),{mb:12}),
(c.log&&c.log.length)?_NXcard(i("div",null,_NXch(_T("Sessions"),_T("Historique local.")),
c.log.slice(0,12).map(function(e,k,arr){
var d=new Date(e.t);
return i("div",{key:k,style:{display:"flex",gap:"11px",padding:"10px 0",borderBottom:k===arr.length-1?"none":"1px solid "+P.line}},
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10px",color:P.faint,flexShrink:0}},("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2)),
i("span",{style:{flex:1,minWidth:0,fontSize:"11.5px",color:P.sub}},_NXtr(e.m)));})),{mb:0}):null);}
function tJournal(){
var L=A.data.log||[];
if(!L.length)return _NXcard(i("div",{style:{fontSize:"12.5px",color:P.dim,lineHeight:1.6}},_T("Aucune execution enregistree pour le moment.")),{mb:0});
return _NXcard(i("div",null,
_NXch(_T("Journal d execution"),_T("Les dernieres actions declenchees par le moteur."),btn(_T("Tout vider"),function(){A.clearLog();force();})),
L.slice(0,40).map(function(e,k,arr){
var d=new Date(e.t);var hh=("0"+d.getHours()).slice(-2)+":"+("0"+d.getMinutes()).slice(-2);
return i("div",{key:k,style:{display:"flex",alignItems:"center",gap:"11px",padding:"11px 0",borderBottom:k===arr.length-1?"none":"1px solid "+P.line}},
i("span",{style:{fontFamily:_NXf.mono,fontSize:"10px",color:P.faint,flexShrink:0}},_NXtr(hh)),
i("div",{style:{flex:1,minWidth:0}},
i("div",{style:{fontSize:"12.5px",fontWeight:"700",color:e.e?_NXpal.danger:P.txt}},_NXtr(e.n)||"—"),
i("div",{style:{fontSize:"11px",color:P.dim,marginTop:"2px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}},_NXtr(e.m))),
e.e?_NXtr(pill(_T("echec"),_NXpal.danger)):null);})),{mb:0});}
// ------------------------------------------------------------ l onglet Envoi
function tEnvoi(){
var E=_NXAU.data.envoi;
var pret=_NXAU.envoiPret();
var dispo=!!(window._NXIA&&_NXIA.envoiReel);
var faits=(E.faits||[]).filter(function(t){return (Date.now()-t)<3600000;}).length;
var regles=[];
for(var z=0;z<_NXAU.data.tasks.length;z++){
var tk=_NXAU.data.tasks[z];
if(tk.act&&_NXAU.estEnvoi(tk.act.k))regles.push(tk);}
function nb(cle,val,mini,maxi,lab,aide){
return i("div",{style:{flex:"1 1 180px",minWidth:"168px"}},
_NXFX.champ({k:_NXtr(lab),mono:true,serre:true,v:String(val),aide:_NXtr(aide),
onChange:function(e){
var n=parseInt(e.target.value,10);
if(!isFinite(n))return;
E[cle]=Math.max(mini,Math.min(maxi,n));_NXAU.save();_NXAU.notify();}}));}
return i("div",null,
_NXFX.note({col:pret?_NXpal.warn:_NXpal.info,icone:pret?"alerte":"info",
titre:pret?_T("Le moteur peut ecrire en ton nom"):_T("Le moteur n ecrit a personne"),
texte:pret?_T("Trois actions peuvent envoyer un message : repondre dans le salon declencheur, ecrire dans un salon nomme, ou envoyer un message prive. Chaque envoi est plafonne et inscrit au journal.")
:_T("Tant que cette porte reste fermee, aucune regle ne peut envoyer quoi que ce soit : l action est refusee et notee au journal.")}),
_NXcard(i("div",null,
_NXch(_T("Autoriser l envoi de messages"),
dispo?_T("A n ouvrir que si tu sais ce que tes regles envoient. Un message automatique mal regle peut te faire exclure d un serveur.")
:_T("Le module d envoi de Nexium IA n a pas demarre : l envoi restera indisponible."),
_NXtoggle(pret,function(){
if(!dispo)return;
E.on=!E.on;_NXAU.save();_NXAU.notify();},true)),
dispo?i("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap",marginTop:"6px"}},
_NXtr(nb("parHeure",E.parHeure,1,30,_T("Envois par heure"),_T("Au-dela, l action est refusee."))),
_NXtr(nb("mini",E.mini,5,600,_T("Secondes entre deux"),_T("Deux envois colles ressemblent a du pourriel.")))):null,
i("div",{style:{display:"flex",gap:"26px",flexWrap:"wrap",marginTop:"14px",
paddingTop:"16px",borderTop:"1px solid "+P.line}},
_NXFX.chiffre({k:_T("Cette heure"),v:faits+" / "+E.parHeure,
col:faits>=E.parHeure?_NXpal.warn:P.txt,rang:1}),
_NXFX.chiffre({k:_T("Regles qui envoient"),v:regles.length,
col:regles.length?_NXpal.warn:P.faint,rang:2}),
_NXFX.chiffre({k:_T("Etat"),v:pret?_T("ouvert"):_T("ferme"),
col:pret?_NXpal.warn:_NXpal.ok,rang:3}))),{mb:12}),
_NXcard(i("div",null,
_NXch(_T("Comment ecrire la cible"),_T("Les trois actions d envoi prennent leur destinataire dans le champ.")),
_NXFX.grille([
_NXFX.tuile({key:"r",icone:"envoi",col:_NXpal.info,rang:1,hv:"pousse",
titre:_T("Repondre dans le salon"),sous:_NXtr("reply"),
texte:_T("Le champ ne contient que le texte. Le salon est celui qui a declenche la regle.")}),
_NXFX.tuile({key:"s",icone:"grille",col:_NXpal.cyan,rang:2,hv:"penche",
titre:_T("Envoyer dans un salon"),sous:_NXtr("send"),
texte:_T("Ecris : identifiant du salon, une barre verticale, puis le texte.")}),
_NXFX.tuile({key:"d",icone:"courrier",col:_NXpal.mauve,rang:3,hv:"saute",
titre:_T("Message prive"),sous:_NXtr("dm"),
texte:_T("Ecris : identifiant du compte, une barre verticale, puis le texte. La conversation est ouverte si elle n existe pas.")})],228)),{mb:12}),
regles.length?_NXcard(i("div",null,
_NXch(_T("Les regles concernees"),_NXtr(regles.length)+" "+_T("regle(s) peuvent envoyer un message.")),
regles.map(function(tk,k){
var def=_NXAU.actDef(tk.act.k)||{};
return _NXFX.rangee({key:tk.id,premier:k===0,rang:Math.min(6,k+1),
icone:tk.act.k==="dm"?"courrier":"envoi",
col:tk.on?_NXpal.warn:P.faint,
titre:_NXtr(tk.name)||_T("Regle sans nom"),
texte:(_NXtr(def.n)||_NXtr(tk.act.k))+" \u00b7 "+String(tk.act.v||"").slice(0,70),
droite:_NXFX.badge(tk.on?_T("active"):_T("coupee"),tk.on?_NXpal.warn:P.faint,{point:tk.on})});})),{mb:0}):null);}

return i(Kr,null,i("div",{style:{maxWidth:"660px",margin:"0 auto"}},
_NXhead(_T("Automatisation"),_NXtr("Nexium Auto"),
_NXAU.envoiPret()
?_T("Des regles simples qui travaillent pour toi : un declencheur, des conditions, une action. L envoi de messages est ouvert : le moteur peut ecrire en ton nom, dans les limites que tu as posees.")
:_T("Des regles simples qui travaillent pour toi : un declencheur, des conditions, une action. Tout s execute localement, et aucun message n est envoye tant que tu ne l as pas autorise.")),
_NXtr(head()),
_NXtr(tabbar()),
i("div",{key:tab,"data-nx-panel":"1"},
tab==="taches"?_NXtr(tTaches()):tab==="modeles"?_NXtr(tModeles()):tab==="editeur"?_NXtr(tEditeur()):
tab==="envoi"?_NXtr(tEnvoi()):tab==="focus"?_NXtr(tFocus()):tab==="vocal"?_NXtr(tVocal()):
tab==="memoire"?_NXtr(tMemoire()):_NXtr(tJournal())),
_NXfoot(_NXtr("Nexium Auto \u00b7 ")+(_NXAU.envoiPret()
?_T("envoi autorise, plafonne et journalise")
:_T("execution locale, aucun envoi de message")))));
}
