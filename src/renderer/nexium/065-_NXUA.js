var _NXUA=window._NXUA||(window._NXUA={});
if(!_NXUA.boot){try{_NXUA.boot=true;
_NXUA.KEY="nexium_restore_icons";_NXUA.root=null;_NXUA.fails=0;
_NXUA._en=null;
// Deux choses distinctes, et on ne les melange plus :
//   - _en : le choix de l utilisateur, le seul ecrit sur le disque ;
//   - _coupe : une coupure automatique, qui ne vaut que pour la session.
// Avant, les coupures automatiques ecrivaient sur le disque, et rien ne les
// defaisait : un seul incident faisait disparaitre les icones pour toujours.
_NXUA._coupe="";
_NXUA.pause=0;
_NXUA.raison="";
_NXUA.MIGRE="nexium_icones_migre_203";
_NXUA.migre=function(){try{
if(_NXDB.get(_NXUA.MIGRE)==="1")return false;
_NXDB.set(_NXUA.MIGRE,"1");
// Un "0" ecrit avant cette version vient presque toujours d une coupure
// automatique, pas d un choix : on remet en marche, une seule fois.
if(_NXDB.get(_NXUA.KEY)==="0"){_NXDB.set(_NXUA.KEY,"1");_NXUA._en=null;return true;}
return false;}catch(_){return false;}};
try{_NXUA.migre();}catch(_){}
_NXUA.choix=function(){try{if(_NXUA._en!==null)return _NXUA._en;var v=_NXDB.get(_NXUA.KEY);_NXUA._en=(v===null||v===undefined)?true:(v==="1");return _NXUA._en;}catch(_){return true;}};
_NXUA.enabled=function(){try{return _NXUA.choix()&&!_NXUA._coupe;}catch(_){return true;}};
// Couper pour la session seulement : le prochain demarrage reessaie.
_NXUA.coupe=function(why){try{
_NXUA._coupe=String(why||"coupure automatique");
_NXUA.raison=_NXUA._coupe;
try{_NXUA.unmount();}catch(_){}}catch(_){}};
_NXUA.revive=function(){try{
if(!_NXUA.iv)_NXUA.iv=setInterval(function(){_NXUA.tick();},4000);
}catch(_){}};
_NXUA.setEnabled=function(v){_NXUA._en=!!v;try{_NXDB.set(_NXUA.KEY,v?"1":"0");}catch(_){}
if(v){_NXUA._coupe="";_NXUA.fails=0;_NXUA.pause=0;_NXUA.raison="";_NXUA._panicked=false;
_NXUA.MODE="rangee";_NXUA.vuSection=1;
_NXUA.revive();_NXUA.tick();_NXUA.mount();}
else _NXUA.unmount();};

// Un echec ne fait plus abandonner : il repousse la tentative suivante,
// de 15 s a 5 min. Un montage qui tient une minute efface l ardoise.
_NXUA.echec=function(why){try{
_NXUA.fails=(_NXUA.fails||0)+1;
_NXUA.raison=String(why||"echec");
_NXUA.pause=Date.now()+Math.min(300000,15000*Math.pow(2,Math.min(5,_NXUA.fails-1)));
try{if(window._NXERR){_NXERR.push("icones :: "+_NXUA.raison);if(_NXERR.length>20)_NXERR.shift();}}catch(_){}
}catch(_){}};

// Tout remettre d aplomb, a la demande : c est le bouton de la page Reglages.
_NXUA.repare=function(){try{
_NXUA._coupe="";_NXUA.fails=0;_NXUA.pause=0;_NXUA.raison="";_NXUA._panicked=false;
_NXUA._sec=null;_NXUA.MODE="rangee";_NXUA.vuSection=1;
try{_NXUA.unmount();}catch(_){}
if(!_NXUA.choix())_NXUA.setEnabled(true);
_NXUA.revive();_NXUA.mount();
return _NXUA.status();}catch(_){return null;}};

// La frontiere d erreur : une erreur n est imputee aux icones que si elle
// vient de leur propre rendu. Avant, n importe quelle erreur de la page
// suffisait a tout couper.
_NXUA.Garde=null;
try{if(typeof F!=="undefined"&&F&&F.Component){
_NXUA.Garde=function(p){F.Component.call(this,p);this.state={err:false};};
_NXUA.Garde.prototype=Object.create(F.Component.prototype);
_NXUA.Garde.prototype.constructor=_NXUA.Garde;
_NXUA.Garde.getDerivedStateFromError=function(){return {err:true};};
_NXUA.Garde.prototype.componentDidCatch=function(e){try{
_NXUA.echec("rendu des boutons : "+((e&&e.message)||"erreur"));
setTimeout(function(){try{_NXUA.unmount();}catch(_){}},0);}catch(_){}};
_NXUA.Garde.prototype.render=function(){return (this.state&&this.state.err)?null:this.props.children;};}}catch(_){}
_NXUA.api=function(){try{return (window.Vencord&&Vencord.Api&&Vencord.Api.UserArea)||null;}catch(_){return null;}};
_NXUA.count=function(){try{var a=_NXUA.api();return (a&&a.buttons&&typeof a.buttons.size==="number")?a.buttons.size:0;}catch(_){return 0;}};
_NXUA.iconFg=function(){try{var W=window.Vencord&&Vencord.Webpack;if(!W||!W.findByProps)return "";
var m=W.findByProps("iconForeground","accountPopoutButtonWrapper")||W.findByProps("iconForeground");
return (m&&m.iconForeground)||"";}catch(_){return "";}};
// ------------------------------------------------------------ le rendu natif
// Le correctif d Equicord (UserAreaAPI) dessine ces boutons lui-meme quand il
// s applique a la version de Discord. Il passe alors par renderButtons : on
// ecoute ce passage. S il a lieu, Nexium ne dessine rien -- jamais deux fois
// les memes boutons.
_NXUA.natifAt=0;
_NXUA.guetteNatif=function(){try{
var P=window.Vencord&&Vencord.Plugins&&Vencord.Plugins.plugins&&Vencord.Plugins.plugins.UserAreaAPI;
if(!P||typeof P.renderButtons!=="function"||P.renderButtons.__nx)return !!P;
var orig=P.renderButtons;
var w=function(){try{_NXUA.natifAt=Date.now();}catch(_){}return orig.apply(this,arguments);};
w.__nx=true;
P.renderButtons=w;
return true;}catch(_){return false;}};
_NXUA.natif=function(){return !!_NXUA.natifAt;};

// ------------------------------------------------------------ la place
// Trois places, toutes dans le flux de Discord, essayees dans l ordre :
//   rangee : une rangee a part, sous le compte ;
//   ligne  : a cote du micro, si le pseudo garde de la place ;
//   menu   : un seul bouton a cote du micro, qui ouvre les icones.
// Chacune est jugee sur ce que l ecran montre vraiment. Si aucune ne tient
// sans recouvrement, rien n est affiche, et la raison est donnee.
_NXUA.MODES=["rangee","ligne","menu"];
_NXUA.MODE="rangee";
_NXUA.style=function(){try{
var css="[data-nx-ua]{display:flex;align-items:center;flex-wrap:wrap;gap:2px;min-width:0;box-sizing:border-box;}"+
"[data-nx-ua]:empty{display:none!important;}"+
"[data-nx-ua=\"rangee\"]{width:100%;flex:0 0 auto;padding:0 8px 6px;justify-content:flex-start;}"+
"[data-nx-ua=\"ligne\"]{flex:0 0 auto;flex-wrap:nowrap;}"+
"[data-nx-ua=\"menu\"]{max-width:236px;}"+
"[data-nx-ua]>*{flex:0 0 auto;}"+
"#nx-ua-pop{position:fixed;z-index:1003;display:none;padding:6px;border-radius:10px;"+
"background:var(--background-floating,#111214);border:1px solid var(--border-subtle,rgba(255,255,255,.08));"+
"box-shadow:0 12px 32px rgba(0,0,0,.45);}"+
"#nx-ua-pop[data-ouvert=\"1\"]{display:block;}"+
"[data-nx-ua-menu]{width:32px;height:32px;flex:0 0 auto;display:flex;align-items:center;justify-content:center;"+
"border-radius:6px;cursor:pointer;color:var(--interactive-normal,#b5bac1);}"+
"[data-nx-ua-menu]:hover,[data-nx-ua-menu][aria-expanded=\"true\"]{background:var(--background-modifier-hover,rgba(255,255,255,.06));"+
"color:var(--interactive-hover,#dbdee1);}";
var el=document.getElementById("nx-ua-style");
if(el){if(el.textContent!==css)el.textContent=_NXtr(css);return;}
el=document.createElement("style");el.id="nx-ua-style";el.textContent=_NXtr(css);
if(document.head)document.head.appendChild(el);}catch(_){}};
_NXUA.sectionEl=function(){
try{var c=_NXUA._sec;
if(c&&((typeof c.isConnected==="boolean")?c.isConnected:!!c.parentNode))return c;}catch(_){}
_NXUA._sec=null;
var sels=['section[class*="panels_"]','section[class*="panels"]'];
for(var a=0;a<sels.length;a++){try{var e=document.querySelector(sels[a]);if(e){_NXUA._sec=e;return e;}}catch(_){}}
return null;};
// La rangee de boutons du compte : la derniere du panneau qui contient de
// vrais boutons (le vocal, au-dessus, a les siens).
_NXUA.rangeeCompte=function(sec){try{
var L=sec.querySelectorAll('div[class*="buttons_"]');
for(var a=L.length-1;a>=0;a--){var e=L[a];
if(e.getAttribute&&e.getAttribute("data-nx-ua"))continue;
if(e.closest&&e.closest("[data-nx-ua]"))continue;
if(e.querySelector&&e.querySelector("button,[role=switch],[role=button]"))return e;}
return null;}catch(_){return null;}};
_NXUA.cible=function(){try{
var sec=_NXUA.sectionEl();if(!sec)return null;
if(_NXUA.MODE==="rangee")return {mode:"rangee",sec:sec,parent:sec};
var r=_NXUA.rangeeCompte(sec);if(!r)return null;
return {mode:_NXUA.MODE,sec:sec,parent:r};}catch(_){return null;}};

// Le bouton du menu, et le menu lui-meme. Le menu est une fenetre qu on
// ouvre : il peut passer devant le reste, comme tout menu, et se ferme au
// premier clic ailleurs.
_NXUA.menuBtn=null;_NXUA.pop=null;
_NXUA.bouton=function(){try{
if(_NXUA.menuBtn)return _NXUA.menuBtn;
var b=document.createElement("div");
b.setAttribute("data-nx-ua-menu","1");b.setAttribute("role","button");b.setAttribute("tabindex","0");
b.setAttribute("aria-haspopup","menu");b.setAttribute("aria-expanded","false");
var lib="Boutons des plugins";try{if(typeof _NXtr==="function")lib=_NXtr(lib);}catch(_){}
b.setAttribute("aria-label",_NXtr(lib));b.title=_NXtr(lib);
b.innerHTML=_NXtrHtml('<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">'+
'<rect x="4" y="4" width="7" height="7" rx="1.6"/><rect x="13" y="4" width="7" height="7" rx="1.6"/>'+
'<rect x="4" y="13" width="7" height="7" rx="1.6"/><rect x="13" y="13" width="7" height="7" rx="1.6"/></svg>');
b.onclick=function(e){try{if(e&&e.stopPropagation)e.stopPropagation();_NXUA.bascule();}catch(_){}};
b.onkeydown=function(e){try{if(e&&(e.key==="Enter"||e.key===" ")){e.preventDefault();_NXUA.bascule();}}catch(_){}};
_NXUA.menuBtn=b;return b;}catch(_){return null;}};
_NXUA.popEl=function(){try{
if(_NXUA.pop&&_NXUA.pop.parentNode)return _NXUA.pop;
var p=document.createElement("div");p.id="nx-ua-pop";p.setAttribute("role","menu");p.setAttribute("data-ouvert","0");
if(document.body)document.body.appendChild(p);
_NXUA.pop=p;
if(!_NXUA._fermeur){_NXUA._fermeur=true;
document.addEventListener("mousedown",function(e){try{var P=_NXUA.pop;
if(!P||P.getAttribute("data-ouvert")!=="1")return;
if(P.contains(e.target)||(_NXUA.menuBtn&&_NXUA.menuBtn.contains(e.target)))return;
_NXUA.ferme();}catch(_){}},true);
document.addEventListener("keydown",function(e){try{if(e&&e.key==="Escape")_NXUA.ferme();}catch(_){}},true);
window.addEventListener("resize",function(){try{_NXUA.ferme();}catch(_){}},{passive:true});}
return p;}catch(_){return null;}};
_NXUA.bascule=function(){try{
var P=_NXUA.popEl();if(!P)return;
if(P.getAttribute("data-ouvert")==="1")_NXUA.ferme();else _NXUA.ouvre();}catch(_){}};
_NXUA.ouvre=function(){try{
var P=_NXUA.popEl(),b=_NXUA.menuBtn;if(!P||!b)return;
P.setAttribute("data-ouvert","1");b.setAttribute("aria-expanded","true");
var r=b.getBoundingClientRect(),q=P.getBoundingClientRect();
var vw=window.innerWidth||0,vh=window.innerHeight||0;
var left=Math.max(8,Math.min(r.left+r.width/2-q.width/2,vw-q.width-8));
var top=r.top-q.height-8;
if(top<8)top=Math.max(8,Math.min(vh-q.height-8,r.bottom+8));
P.style.left=Math.round(left)+"px";P.style.top=Math.round(top)+"px";}catch(_){}};
_NXUA.ferme=function(){try{
if(_NXUA.pop)_NXUA.pop.setAttribute("data-ouvert","0");
if(_NXUA.menuBtn)_NXUA.menuBtn.setAttribute("aria-expanded","false");}catch(_){}};

_NXUA.place=function(){try{
var box=_NXUA.box;if(!box)return;
if(_NXUA.natif()){_NXUA.unmount();_NXUA.raison="affichees par Equicord lui-meme";return;}
var c=_NXUA.cible();
if(!c){_NXUA.retire();return;}
if(box.getAttribute("data-nx-ua")!==c.mode)box.setAttribute("data-nx-ua",c.mode);
var bouge=false;
if(c.mode==="menu"){
var b=_NXUA.bouton(),P=_NXUA.popEl();
if(!b||!P)return;
if(box.parentNode!==P){P.appendChild(box);bouge=true;}
if(b.parentNode!==c.parent||c.parent.firstChild!==b){c.parent.insertBefore(b,c.parent.firstChild);bouge=true;}}
else{
if(_NXUA.menuBtn&&_NXUA.menuBtn.parentNode){try{_NXUA.menuBtn.parentNode.removeChild(_NXUA.menuBtn);}catch(_){}}
_NXUA.ferme();
var bon=(box.parentNode===c.parent)&&
(c.mode==="ligne"?(c.parent.firstChild===box):(c.parent.lastElementChild===box));
if(!bon){
if(c.mode==="ligne")c.parent.insertBefore(box,c.parent.firstChild);
else c.parent.appendChild(box);
bouge=true;}}
if(!bouge)return;
_NXUA.suit(c.parent);
// Les boutons arrivent au rendu suivant : on juge la place un peu apres.
try{setTimeout(_NXUA.verifie,350);setTimeout(_NXUA.verifie,1500);}catch(_){}
}catch(_){}};
// Sortir du panneau sans rien casser, quand il n y a plus de panneau.
_NXUA.retire=function(){try{
var box=_NXUA.box;
if(box&&box.parentNode&&box.parentNode!==_NXUA.pop)box.parentNode.removeChild(box);
if(_NXUA.menuBtn&&_NXUA.menuBtn.parentNode)_NXUA.menuBtn.parentNode.removeChild(_NXUA.menuBtn);
_NXUA.ferme();}catch(_){}};
// Suivre le parent : si Discord ajoute un panneau apres nous, ou nous retire,
// on se remet en place au prochain battement de rendu.
_NXUA.suit=function(p){try{
if(_NXUA._obsP===p)return;
if(_NXUA._obs){try{_NXUA._obs.disconnect();}catch(_){}}
_NXUA._obs=null;_NXUA._obsP=p;
if(typeof MutationObserver!=="function")return;
_NXUA._obs=new MutationObserver(function(){try{
if(_NXUA._planifie)return;_NXUA._planifie=true;
setTimeout(function(){_NXUA._planifie=false;_NXUA.place();},60);}catch(_){}});
_NXUA._obs.observe(p,{childList:true});}catch(_){}};

// Le controle qui manquait : ce que Nexium pose ne doit toucher aucun contenu
// visible du panneau -- pseudo, avatar, pastille, bouton -- ni en sortir.
// Seuls comptent les elements qui se voient : les feuilles, les images, les
// boutons, et ce qui porte du texte. Les calques de decor (en position
// absolue et qui ne prennent pas les clics) ne comptent pas.
_NXUA.decor=function(e,sec){try{
for(var x=e;x&&x!==sec;x=x.parentElement){
var st=getComputedStyle(x);
if(st.pointerEvents==="none"&&(st.position==="absolute"||st.position==="fixed"))return true;}
return false;}catch(_){return false;}};
// Ce qui se voit vraiment d un element : son cadre, rogne par chaque
// parent qui coupe ce qui depasse. Un texte deja coupe par son conteneur ne
// recouvre rien, meme si son cadre theorique deborde.
_NXUA.vu=function(e,sec){try{
var r=e.getBoundingClientRect();
var l=r.left,t=r.top,d=r.right,b=r.bottom;
for(var x=e.parentElement;x;x=x.parentElement){
var st=getComputedStyle(x);
if(st.overflowX!=="visible"||st.overflowY!=="visible"){
var q=x.getBoundingClientRect();
if(st.overflowX!=="visible"){l=Math.max(l,q.left);d=Math.min(d,q.right);}
if(st.overflowY!=="visible"){t=Math.max(t,q.top);b=Math.min(b,q.bottom);}}
if(x===sec)break;}
if(d-l<=0||b-t<=0)return null;
return {left:l,top:t,right:d,bottom:b,width:d-l,height:b-t};}catch(_){return null;}};
_NXUA.contenu=function(sec,moi){
var out=[];try{
var L=sec.querySelectorAll("*");
for(var a=0;a<L.length&&out.length<400;a++){var e=L[a];
if(e===moi||moi.contains(e)||e.contains(moi))continue;
if(e.closest&&(e.closest("[data-nx-ua]")||e.closest("[data-nx-ua-menu]")))continue;
var tag=String(e.tagName||"").toLowerCase();
if(tag!=="svg"&&e.closest&&e.closest("svg"))continue;
var atome=(tag==="button"||tag==="img"||tag==="svg"||tag==="canvas"||tag==="video");
var feuille=!e.firstElementChild;
var texte=false;
if(!atome&&!feuille){for(var n=e.firstChild;n;n=n.nextSibling){
if(n.nodeType===3&&/\S/.test(n.nodeValue||"")){texte=true;break;}}}
if(atome||feuille||texte)out.push(e);}}catch(_){}
return out;};
_NXUA.chevauche=function(){try{
var moi=(_NXUA.MODE==="menu")?_NXUA.menuBtn:_NXUA.box;
var sec=_NXUA.sectionEl();
if(!moi||!moi.parentNode||!sec)return null;
var b=moi.getBoundingClientRect();
if(!b.width||!b.height)return null;
var sr=sec.getBoundingClientRect();
var dehors=function(r){return r.bottom>sr.bottom+1||r.top<sr.top-1||r.right>sr.right+1||r.left<sr.left-1;};
if(dehors(b))return "deborde du panneau";
var vh=window.innerHeight||0,vw=window.innerWidth||0;
if((vh&&b.bottom>vh+1)||(vw&&b.right>vw+1))return "sort de l ecran";
if(_NXUA.MODE!=="menu"){var K=moi.children;
for(var k=0;k<K.length;k++){var kr=K[k].getBoundingClientRect();
if(kr.width&&kr.height&&dehors(kr))return "une icone sort du panneau";}}
// A cote du micro, le pseudo doit garder de quoi se lire.
if(_NXUA.MODE==="ligne"){var voisin=moi.parentNode&&moi.parentNode.previousElementSibling;
if(voisin){var vr=voisin.getBoundingClientRect();if(vr.width<90)return "le pseudo n aurait plus de place";}}
var L=_NXUA.contenu(sec,moi);
for(var a=0;a<L.length;a++){var e=L[a];
var r=_NXUA.vu(e,sec);if(!r)continue;
var ix=Math.min(b.right,r.right)-Math.max(b.left,r.left);
var iy=Math.min(b.bottom,r.bottom)-Math.max(b.top,r.top);
if(ix<=2||iy<=2)continue;
var st=null;try{st=getComputedStyle(e);}catch(_){}
if(st&&(st.display==="none"||st.visibility==="hidden"||st.opacity==="0"))continue;
if(_NXUA.decor(e,sec))continue;
return "chevauche "+String((typeof e.className==="string"&&e.className)||e.tagName).slice(0,40);}
return "";}catch(_){return null;}};
_NXUA.verifie=function(){try{
if(!_NXUA.box)return true;
var v=_NXUA.chevauche();
if(!v)return true;
var k=_NXUA.MODES.indexOf(_NXUA.MODE);
if(k>=0&&k<_NXUA.MODES.length-1){
var suiv=_NXUA.MODES[k+1];
_NXUA.raison=_NXUA.MODE+" impossible ("+v+")";
_NXUA.MODE=suiv;_NXUA.place();return false;}
_NXUA.coupe("aucune place sans recouvrement ("+v+")");
return false;}catch(_){return true;}};
_NXUA.probe=function(){try{
var sec=_NXUA.sectionEl(),box=_NXUA.box;
var rc=function(e){try{var q=e.getBoundingClientRect();return {t:Math.round(q.top),b:Math.round(q.bottom),l:Math.round(q.left),w:Math.round(q.width),h:Math.round(q.height)};}catch(_){return null;}};
return {mode:_NXUA.MODE,natif:_NXUA.natif(),raison:_NXUA.raison,
section:sec?{cls:String(sec.className).slice(0,90),rect:rc(sec),enfants:sec.children.length}:null,
compte:(sec&&_NXUA.rangeeCompte(sec))?rc(_NXUA.rangeeCompte(sec)):null,
boite:box?{rect:rc(box),parent:box.parentNode?String(box.parentNode.className||box.parentNode.id||box.parentNode.tagName).slice(0,60):null}:null,
menu:_NXUA.menuBtn&&_NXUA.menuBtn.parentNode?rc(_NXUA.menuBtn):null,
verdict:_NXUA.chevauche()};
}catch(e){return {erreur:String(e&&e.message)};}};

// ------------------------------------------------------------ montage
_NXUA.vuSection=0;
_NXUA.mount=function(){try{
if(!_NXUA.enabled())return;
if(_NXUA.pause&&Date.now()<_NXUA.pause)return;
_NXUA.guetteNatif();
if(_NXUA.natif())return;
var api=_NXUA.api();if(!api||typeof api._renderButtons!=="function")return;
if(!_NXUA.count())return;
if(!_NXUA.sectionEl())return;
// Laisser d abord au rendu natif le temps de se manifester.
if(!_NXUA.vuSection){_NXUA.vuSection=Date.now();return;}
if(Date.now()-_NXUA.vuSection<4000)return;
if(_NXUA.box&&_NXUA.root){_NXUA.place();return;}
var C=(window.Vencord&&Vencord.Webpack&&Vencord.Webpack.Common)||{};
_NXUA.style();
var box=document.createElement("div");
box.id="nx-ua";
box.setAttribute("data-nx-ua",_NXUA.MODE);
var els=null;
try{els=api._renderButtons({nameplate:null,iconForeground:_NXUA.iconFg(),hideTooltips:false});}catch(e){_NXUA.echec("preparation : "+((e&&e.message)||"erreur"));return;}
var node=els;
try{if(F&&F.Fragment)node=i(F.Fragment,null,_NXtr(els));}catch(_){node=els;}
try{if(_NXUA.Garde)node=i(_NXUA.Garde,null,_NXtr(node));}catch(_){}
try{
if(typeof C.createRoot==="function"){_NXUA.root=C.createRoot(box);_NXUA.root.render(node);}
else if(C.ReactDOM&&typeof C.ReactDOM.createRoot==="function"){_NXUA.root=C.ReactDOM.createRoot(box);_NXUA.root.render(node);}
else if(C.ReactDOM&&typeof C.ReactDOM.render==="function"){C.ReactDOM.render(node,box);_NXUA.root={legacy:true,el:box};}
else {_NXUA.echec("aucun moteur de rendu");return;}
}catch(e2){_NXUA.echec("montage : "+((e2&&e2.message)||"erreur"));return;}
_NXUA.box=box;_NXUA.mounted=true;_NXUA.at=Date.now();
_NXUA.place();
}catch(_){}};
_NXUA.unmount=function(){try{
if(_NXUA._obs){try{_NXUA._obs.disconnect();}catch(_){}}
_NXUA._obs=null;_NXUA._obsP=null;
if(_NXUA.root&&typeof _NXUA.root.unmount==="function"){try{_NXUA.root.unmount();}catch(_){}}
else if(_NXUA.root&&_NXUA.root.legacy){try{var C=Vencord.Webpack.Common;if(C.ReactDOM&&C.ReactDOM.unmountComponentAtNode)C.ReactDOM.unmountComponentAtNode(_NXUA.root.el);}catch(_){}}
_NXUA.root=null;_NXUA.mounted=false;
var kill=function(el){if(!el)return;
try{el.style.display="none";}catch(_){}
try{if(el.parentNode&&el.parentNode.removeChild)el.parentNode.removeChild(el);}catch(_){}};
try{kill(_NXUA.box);}catch(_){}_NXUA.box=null;
try{kill(_NXUA.menuBtn);}catch(_){}_NXUA.menuBtn=null;
try{kill(_NXUA.pop);}catch(_){}_NXUA.pop=null;
try{var all=document.querySelectorAll?document.querySelectorAll("[data-nx-ua],[data-nx-ua-menu],#nx-ua-pop,#nx-ua-float"):[];for(var a=0;a<all.length;a++)kill(all[a]);}catch(_){}
// Les restes de l ancienne boite flottante, si la session l a connue.
try{var d=document.documentElement;if(d&&d.style&&d.style.removeProperty)d.style.removeProperty("--nx-ua-h");}catch(_){}
}catch(_){}};
_NXUA.panic=function(why){try{
if(_NXUA._panicked)return;_NXUA._panicked=true;
_NXUA._coupe="panique : "+String(why||"?");_NXUA.raison=_NXUA._coupe;
try{if(_NXUA.iv)clearInterval(_NXUA.iv);}catch(_){}_NXUA.iv=null;
try{_NXUA.unmount();}catch(_){}
try{if(window._NXERR){_NXERR.push("icones :: desactivees automatiquement ("+why+")");if(_NXERR.length>20)_NXERR.shift();}}catch(_){}
try{if(window._NXPR&&_NXPR.toast)_NXPR.toast(_NXtr("Icones des plugins suspendues pour cette session. Elles reviendront au prochain demarrage."),0);}catch(_){}
}catch(_){}};
_NXUA.watchCrash=function(){try{
if(_NXUA._watch)return;_NXUA._watch=true;
var bad=/removeChild|insertBefore|NotFoundError|not a child|Minified React error #(3[0-9]{2}|1[0-9]{2})/i;
var handler=function(msg){try{if(!msg)return;if(bad.test(String(msg))){try{if(window._NXBADGE)_NXBADGE.kill("erreur DOM/React");}catch(_){}}}catch(_){}};
if(window.addEventListener){
window.addEventListener("error",function(ev){try{handler((ev&&(ev.message||(ev.error&&ev.error.message)))||"");}catch(_){}},true);
window.addEventListener("unhandledrejection",function(ev){try{var r=ev&&ev.reason;handler((r&&(r.message||r))||"");}catch(_){}},true);}
}catch(_){}};
try{_NXUA.watchCrash();}catch(_){}
_NXUA.tick=function(){try{
if(document.hidden)return;
if(!_NXUA.enabled())return;
_NXUA.guetteNatif();
if(_NXUA.natif()){if(_NXUA.mounted){_NXUA.unmount();_NXUA.raison="affichees par Equicord lui-meme";}return;}
if(_NXUA.box&&_NXUA.root){
_NXUA.place();
if(_NXUA.fails&&_NXUA.at&&(Date.now()-_NXUA.at)>60000){_NXUA.fails=0;_NXUA.raison="";}
return;}
_NXUA.mount();
}catch(_){}};
_NXUA.status=function(){
var vis=false;try{var moi=(_NXUA.MODE==="menu")?_NXUA.menuBtn:_NXUA.box;var bb=moi&&moi.parentNode?moi.getBoundingClientRect():null;vis=!!(bb&&bb.width&&bb.height);}catch(_){}
return {enabled:_NXUA.enabled(),choix:_NXUA.choix(),coupe:_NXUA._coupe||"",
registered:_NXUA.count(),mounted:!!_NXUA.mounted,visible:vis,mode:_NXUA.MODE,natif:_NXUA.natif(),
fails:_NXUA.fails||0,
failed:!!(_NXUA.pause&&Date.now()<_NXUA.pause),
reprise:(_NXUA.pause&&Date.now()<_NXUA.pause)?Math.round((_NXUA.pause-Date.now())/1000):0,
raison:_NXUA.raison||""};};
// Poser l ecoute du natif le plus tot possible : le premier rendu du
// panneau arrive vite apres le chargement.
try{(function(){var g=0;var gi=setInterval(function(){try{
g++;if(_NXUA.guetteNatif()||g>80)clearInterval(gi);}catch(_){clearInterval(gi);}},250);})();}catch(_){}
try{setTimeout(_NXUA.tick,5000);setTimeout(_NXUA.tick,9000);if(!_NXUA.iv)_NXUA.iv=setInterval(function(){_NXUA.tick();},4000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXUA");if(window._NXERR)_NXERR.push("module _NXUA :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXUA desactive:",_nxE);}catch(_){}}
}var _NXBAN=window._NXBAN||(window._NXBAN={});
