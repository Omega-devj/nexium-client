var _NXANN=window._NXANN||(window._NXANN={});
if(!_NXANN.boot){try{_NXANN.boot=true;
// L annonce de version.
//
// Elle passe une fois, apres quoi elle se tait. Meme regle que l ecran
// d ouverture : rien n est cache par une animation -- une image figee reste
// entierement lisible -- et tout ce qui bouge le fait en transform, pour ne
// pas dependre du fil principal pendant que Discord travaille.
_NXANN.KEY="nexium_annonce";
_NXANN.VER="192";
_NXANN.ID="nx-annonce";
_NXANN.el=null;_NXANN.page=0;
_NXANN.vu=function(){try{return _NXDB.get(_NXANN.KEY)===_NXANN.VER;}catch(_){return false;}};
_NXANN.marque=function(){try{_NXDB.set(_NXANN.KEY,_NXANN.VER);}catch(_){}};

_NXANN.PAGES=[
{c:"Nouveau",t:"Il repere les arnaques qui n ont pas de lien",
d:"Protect examinait des adresses. Il ne voyait rien quand quelqu un manipule en francais correct sans jamais coller de lien -- et c est la plupart des arnaques qui font mal.",
l:["Onze procedes reconnus : urgence fabriquee, autorite revendiquee, isolement, chantage","Le calcul est local : des expressions et des compteurs, aucune requete, aucun cout","Il n examine que les messages prives, et jamais ceux d un ami"],
ic:"M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8M9.6 9.6a2.4 2.4 0 1 1 3.3 2.2c-.6.3-.9.8-.9 1.4v.6M12 16.8h.01"},
{c:"Nouveau",t:"Nexium IA 2.0, en essai",
d:"Un assistant qui connait tes serveurs, tes horaires et l etat de ton client, qui regarde de lui-meme, et qui ecrit dans ta facon d ecrire.",
l:["Chaque fonction a sa case, et chaque case dit ce qu elle coute","Un plafond quotidien pour ce qui part tout seul, reglable jusqu a zero","Reserve au niveau 2, et elle se referme d elle-meme si l abonnement s arrete"],
ic:"M3.6 7.8 12 12.2l8.4-4.4M12 12.2v8.4M12 3.4 20.4 7.8v8.4L12 20.6 3.6 16.2V7.8Z"},
{c:"Refait",t:"Le fil de conversation",
d:"Chaque message etait une bande pleine largeur separee par un filet : on lisait un journal d evenements, pas une conversation.",
l:["Ta question part a droite dans une bulle, la reponse reste a gauche sans bulle","La reponse recupere toute la largeur de lecture : c est elle qu on lit longtemps","Plus de nom repete a chaque tour -- la place du message dit deja qui parle"],
ic:"M4.6 10.8h14.8v9.2H4.6Z M3.6 7.4h16.8v3.4H3.6Z M12 7.4v12.6"},
{c:"Nouveau",t:"Une case par outil, pas sept cases pour trente-sept",
d:"Accorder Lire l etat du client ouvrait dix-huit outils d un coup, dont le coffre de comptes et le journal de traque.",
l:["Les trente-sept outils sont listes, chacun avec sa case","Decocher interdit vraiment : l outil ne part meme pas au modele","Moins d outils proposes, c est aussi une demande plus petite a chaque question"],
ic:"M9 6.8h10.4M9 12h10.4M9 17.2h10.4M4.8 6.8h.01M4.8 12h.01M4.8 17.2h.01"},
{c:"Nouveau",t:"Le repondant, et le compte rendu vocal",
d:"Le premier apprend ta facon d ecrire sur tes propres messages. Le second dit ce qui s est passe dans une vocale que tu as ratee.",
l:["Le profil de style se construit tout seul, sur ta machine, sans rien envoyer","Le compte rendu n enregistre aucune voix et ne transcrit rien : il compte les presences","Il s annonce dans le salon avant de commencer, sinon il ne commence pas"],
ic:"M3.2 5.6 10 4.6v6.6H3.2ZM11.4 4.4 20.8 3v8.2h-9.4ZM3.2 12.8H10v6.6l-6.8-1ZM11.4 12.8h9.4V21l-9.4-1.4Z"},
{c:"Corrige",t:"Les couleurs du client etaient invisibles",
d:"Quatre-vingt-six teintes d accent s affichaient au centieme de leur opacite a cause d une virgule : trois millemes au lieu de trente pour cent.",
l:["Les anneaux, les bordures et les pastilles teintees reapparaissent","Mesure dans le navigateur, pas suppose : la bordure sortait a 0,4 % d opacite","Meme jeu de valeurs que les appels deja corrects, donc une faute d ecriture, pas un choix"],
ic:"M4.6 4.6h6v6h-6ZM13.4 4.6h6v6h-6ZM4.6 13.4h6v6h-6ZM13.4 13.4h6v6h-6Z"},
{c:"Corrige",t:"Une seule fenetre a la fois",
d:"A la premiere ouverture, six ecrans pouvaient s afficher ensemble : accueil, annonce, version, mise a jour. On fermait tout sans rien lire.",
l:["Un arbitre laisse passer un ecran, puis deux secondes et demie de repos","A la premiere ouverture, seul l ecran de bienvenue reste","Les annonces des versions precedentes ne remontent plus"],
ic:"M12 3.6a8.4 8.4 0 1 0 0 16.8 8.4 8.4 0 0 0 0-16.8M12 7.4V12l3 2"},
{c:"Plus rapide",t:"Ce qui regarde ne coute rien",
d:"Le detecteur, la carte du contexte et la veille lisent des compteurs que le client tient deja. Aucun observateur de plus sur tes messages.",
l:["La veille ne depense un appel que pour une conversation a laquelle tu as repondu","Un appel par jour au maximum, et jamais sur ton quota de questions","Le score d une conversation se calcule hors ligne, gratuitement, pour tout le monde"],
ic:"M13.6 3.2 6.4 13.2h5L10.4 20.8 17.6 10.8h-5Z"}
];
_NXANN.css=function(){return ""+
"#nx-annonce{position:fixed;inset:0;z-index:2147483000;background:rgba(6,6,9,.86);"+
"display:flex;align-items:center;justify-content:center;padding:24px;"+
"font-family:'gg sans','Noto Sans',Helvetica,Arial,sans-serif;color:#f4f4f5;"+
"opacity:1;transition:opacity .32s ease;}"+
"#nx-annonce.nxa-part{opacity:0;pointer-events:none;}"+
"#nx-annonce .nxa-boite{position:relative;width:min(720px,100%);max-height:min(86vh,720px);"+
"display:flex;flex-direction:column;overflow:hidden;border-radius:24px;"+
"background:linear-gradient(158deg,#111114,#08080a);border:1px solid #24242a;"+
"box-shadow:0 40px 120px rgba(0,0,0,.7);transform:translateZ(0);}"+
"#nx-annonce .nxa-lueur{position:absolute;left:-15%;top:-30%;width:70%;height:70%;"+
"pointer-events:none;border-radius:50%;"+
"background:radial-gradient(circle,rgba(255,255,255,.07),transparent 66%);}"+
"#nx-annonce .nxa-tete{position:relative;display:flex;align-items:center;gap:13px;"+
"padding:22px 24px 0;}"+
"#nx-annonce .nxa-marque{width:34px;height:34px;border-radius:11px;flex-shrink:0;"+
"border:1px solid #2c2c34;display:flex;align-items:center;justify-content:center;"+
"background:rgba(255,255,255,.04);}"+
"#nx-annonce .nxa-ver{font-family:'JetBrains Mono',ui-monospace,monospace;font-size:10px;"+
"letter-spacing:.2em;text-transform:uppercase;color:#6c6c78;}"+
"#nx-annonce .nxa-x{margin-left:auto;width:28px;height:28px;border-radius:9px;cursor:pointer;"+
"display:flex;align-items:center;justify-content:center;color:#6c6c78;font-size:17px;"+
"transition:background-color .16s,color .16s;}"+
"#nx-annonce .nxa-x:hover{background:rgba(255,255,255,.07);color:#f4f4f5;}"+
"#nx-annonce .nxa-corps{position:relative;flex:1;min-height:0;overflow-y:auto;padding:20px 24px 4px;}"+
"#nx-annonce .nxa-ico{width:52px;height:52px;border-radius:17px;margin-bottom:18px;"+
"border:1px solid #2c2c34;background:rgba(255,255,255,.04);color:#e8e8ea;"+
"display:flex;align-items:center;justify-content:center;}"+
"#nx-annonce .nxa-cat{display:inline-block;font-size:9px;font-weight:900;letter-spacing:.16em;"+
"text-transform:uppercase;color:#0a0a0a;background:#e8e8ea;border-radius:99px;"+
"padding:3px 10px;margin-bottom:13px;}"+
"#nx-annonce .nxa-t{font-family:var(--font-display),'Bricolage Grotesque','gg sans',sans-serif;"+
"font-size:27px;font-weight:800;letter-spacing:-.035em;line-height:1.1;margin-bottom:13px;}"+
"#nx-annonce .nxa-d{font-size:14px;color:#a6a6ac;line-height:1.7;margin-bottom:20px;}"+
"#nx-annonce .nxa-l{list-style:none;margin:0;padding:0;}"+
"#nx-annonce .nxa-l li{display:flex;gap:11px;align-items:flex-start;padding:9px 0;"+
"border-top:1px solid #1a1a1e;font-size:13px;color:#c9c9d2;line-height:1.6;}"+
"#nx-annonce .nxa-l li:first-child{border-top:none;}"+
"#nx-annonce .nxa-p{flex-shrink:0;width:5px;height:5px;border-radius:50%;margin-top:8px;"+
"background:#4a4a52;}"+
"#nx-annonce .nxa-pied{position:relative;display:flex;align-items:center;gap:12px;"+
"padding:16px 24px 20px;border-top:1px solid #1a1a1e;}"+
"#nx-annonce .nxa-pts{display:flex;gap:6px;flex:1;}"+
"#nx-annonce .nxa-pts i{width:20px;height:3px;border-radius:99px;background:rgba(255,255,255,.12);"+
"cursor:pointer;transition:background-color .3s,transform .3s;transform-origin:center;}"+
"#nx-annonce .nxa-pts i.on{background:#e8e8ea;transform:scaleY(1.7);}"+
"#nx-annonce .nxa-pts i.faite{background:rgba(255,255,255,.34);}"+
"#nx-annonce .nxa-b{height:36px;padding:0 18px;border-radius:11px;font-size:12.5px;"+
"font-weight:800;border:1px solid transparent;cursor:pointer;font-family:inherit;"+
"display:inline-flex;align-items:center;gap:7px;"+
"transition:transform .15s cubic-bezier(.22,.8,.28,1),background-color .15s;}"+
"#nx-annonce .nxa-b:hover{transform:translateY(-1px);}"+
"#nx-annonce .nxa-b1{background:#e8e8ea;color:#0a0a0a;}"+
"#nx-annonce .nxa-b2{background:transparent;color:#8a8a92;border-color:#24242a;}"+
"#nx-annonce .nxa-b2:hover{color:#f4f4f5;}"+
"#nx-annonce.nxa-vif .nxa-boite{animation:nxann-entre .5s cubic-bezier(.2,.9,.3,1) both;}"+
"#nx-annonce.nxa-vif .nxa-page > *{animation:nxann-monte .45s cubic-bezier(.2,.9,.3,1) both;}"+
"#nx-annonce.nxa-vif .nxa-page > *:nth-child(1){animation-delay:.02s}"+
"#nx-annonce.nxa-vif .nxa-page > *:nth-child(2){animation-delay:.06s}"+
"#nx-annonce.nxa-vif .nxa-page > *:nth-child(3){animation-delay:.1s}"+
"#nx-annonce.nxa-vif .nxa-page > *:nth-child(4){animation-delay:.14s}"+
"#nx-annonce.nxa-vif .nxa-page > *:nth-child(5){animation-delay:.18s}"+
"@keyframes nxann-entre{from{transform:translateY(16px) scale(.985)}to{transform:none}}"+
"@keyframes nxann-monte{from{transform:translateY(10px)}to{transform:none}}"+
"@media (prefers-reduced-motion: reduce){#nx-annonce *{animation:none!important;}}";};

_NXANN.dessine=function(){try{
if(!_NXANN.el)return;
var p=_NXANN.PAGES[_NXANN.page];
var c=_NXANN.el.querySelector(".nxa-page");
if(!c)return;
while(c.firstChild)c.removeChild(c.firstChild);
var el=function(t,cl,tx){var e=document.createElement(t);if(cl)e.className=cl;if(tx!=null)e.textContent=_NXtr(tx);return e;};
var ico=el("div","nxa-ico");
try{
var NS="http://www.w3.org/2000/svg";
var sv=document.createElementNS(NS,"svg");
sv.setAttribute("viewBox","0 0 24 24");sv.setAttribute("width","24");sv.setAttribute("height","24");
sv.setAttribute("fill","none");sv.setAttribute("stroke","currentColor");
sv.setAttribute("stroke-width","1.6");sv.setAttribute("stroke-linecap","round");
sv.setAttribute("stroke-linejoin","round");
var pa=document.createElementNS(NS,"path");pa.setAttribute("d",p.ic);
sv.appendChild(pa);ico.appendChild(sv);}catch(_){}
c.appendChild(ico);
c.appendChild(el("div","nxa-cat",p.c));
c.appendChild(el("div","nxa-t",p.t));
c.appendChild(el("div","nxa-d",p.d));
var ul=el("ul","nxa-l");
for(var a=0;a<p.l.length;a++){
var li=el("li");
li.appendChild(el("span","nxa-p"));
li.appendChild(el("span",null,p.l[a]));
ul.appendChild(li);}
c.appendChild(ul);
// Les jalons, et le libelle du bouton principal.
var pts=_NXANN.el.querySelector(".nxa-pts");
if(pts){while(pts.firstChild)pts.removeChild(pts.firstChild);
for(var b=0;b<_NXANN.PAGES.length;b++){
var d=el("i");
d.className=(b===_NXANN.page)?"on":(b<_NXANN.page?"faite":"");
(function(k){d.onclick=function(){_NXANN.va(k);};})(b);
pts.appendChild(d);}}
var b1=_NXANN.el.querySelector(".nxa-b1");
if(b1)b1.textContent=(_NXANN.page>=_NXANN.PAGES.length-1)?_NXtr("Terminer"):_NXtr("Suivant");
var b2=_NXANN.el.querySelector(".nxa-b2");
if(b2)b2.style.visibility=_NXANN.page?"visible":"hidden";
var corps=_NXANN.el.querySelector(".nxa-corps");
if(corps)corps.scrollTop=0;
// Relancer l entree de la page : on retire la classe puis on la remet au
// battement suivant, sinon l animation ne repart pas.
try{if(_NXANN.vif&&typeof requestAnimationFrame==="function"){
_NXANN.el.className="";
requestAnimationFrame(function(){try{if(_NXANN.el)_NXANN.el.className="nxa-vif";}catch(_){}});}}catch(_){}
}catch(_){}};

_NXANN.va=function(k){try{
if(k<0)return;
if(k>=_NXANN.PAGES.length){_NXANN.ferme();return;}
_NXANN.page=k;_NXANN.dessine();}catch(_){}};

_NXANN.ferme=function(){try{
_NXANN.marque();
var d=_NXANN.el;
if(!d)return;
_NXANN.el=null;
try{d.className="nxa-part";}catch(_){}
try{if(_NXANN._clav){document.removeEventListener("keydown",_NXANN._clav,true);_NXANN._clav=null;}}catch(_){}
setTimeout(function(){try{
if(d&&d.parentNode)d.parentNode.removeChild(d);
var st=document.getElementById("nx-annonce-style");
if(st&&st.parentNode)st.parentNode.removeChild(st);}catch(_){}},340);}catch(_){}};

_NXANN.montre=function(force){try{
if(_NXANN.el)return true;
if(!force&&_NXANN.vu())return false;
if(!force&&window._NXQ&&!_NXQ.reserve("annonce"))return false;
if(!document.body)return false;
try{if(String(location.pathname||"").indexOf("popout")>=0)return false;}catch(_){}
var st=document.createElement("style");
st.id="nx-annonce-style";st.textContent=_NXANN.css();
(document.head||document.documentElement).appendChild(st);
var d=document.createElement("div");
d.id=_NXANN.ID;
d.setAttribute("role","dialog");
d.setAttribute("aria-label",_NXtr("Nouveautes de Nexium Client"));
var ver=(window._NXUP&&_NXUP.VERSION)?("v"+_NXUP.VERSION):("v"+_NXANN.VER);
d.innerHTML=
_NXtrHtml('<div class="nxa-boite"><div class="nxa-lueur"></div>'+
'<div class="nxa-tete">'+
'<div class="nxa-marque"><svg viewBox="0 0 100 100" width="18" height="18" fill="none" '+
'stroke="#f4f4f5" stroke-width="9" stroke-linecap="square"><path d="M28 72 V28 L72 72 V28"/></svg></div>'+
'<div><div style="font-size:13.5px;font-weight:800;letter-spacing:-.01em;">Nexium Client</div>'+
'<div class="nxa-ver">'+ver+' &middot; nouveautes</div></div>'+
'<div class="nxa-x" role="button" aria-label="Fermer">&times;</div></div>'+
'<div class="nxa-corps"><div class="nxa-page"></div></div>'+
'<div class="nxa-pied"><div class="nxa-pts"></div>'+
'<button type="button" class="nxa-b nxa-b2">Precedent</button>'+
'<button type="button" class="nxa-b nxa-b1">Suivant</button></div></div>');
document.body.appendChild(d);
_NXANN.el=d;_NXANN.page=0;
try{
d.querySelector(".nxa-x").onclick=function(){_NXANN.ferme();};
d.querySelector(".nxa-b1").onclick=function(){_NXANN.va(_NXANN.page+1);};
d.querySelector(".nxa-b2").onclick=function(){_NXANN.va(_NXANN.page-1);};
d.onclick=function(e){try{if(e.target===d)_NXANN.ferme();}catch(_){}};
_NXANN._clav=function(e){try{
if(e.key==="Escape"){e.preventDefault();e.stopPropagation();_NXANN.ferme();return;}
if(e.key==="ArrowRight"){e.preventDefault();_NXANN.va(_NXANN.page+1);}
if(e.key==="ArrowLeft"){e.preventDefault();_NXANN.va(_NXANN.page-1);}}catch(_){}};
document.addEventListener("keydown",_NXANN._clav,true);}catch(_){}
_NXANN.dessine();
// Le mouvement n arrive qu a la premiere image peinte : fige, l annonce
// reste entierement lisible.
try{if(typeof requestAnimationFrame==="function")
requestAnimationFrame(function(){requestAnimationFrame(function(){try{
_NXANN.vif=true;if(_NXANN.el)_NXANN.el.className="nxa-vif";}catch(_){}});});
else{_NXANN.vif=true;d.className="nxa-vif";}}catch(_){}
return true;}catch(_){return false;}};

// On attend que le client soit reellement la : une annonce posee sur un
// ecran de chargement ne se lit pas.
try{setTimeout(function(){try{
if(_NXANN.vu())return;
var essais=0;
var voir=function(){try{
essais++;
var m=document.getElementById("app-mount");
var pret=!!(m&&m.firstElementChild&&!m.querySelector('[class*="loadingScreen"]'));
var voile=!!document.getElementById("nx-boot");
if(pret&&!voile){_NXANN.montre();return;}
if(essais<60)setTimeout(voir,1000);}catch(_){}};
voir();}catch(_){}},6000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXANN");if(window._NXERR)_NXERR.push("module _NXANN :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXANN desactive:",_nxE);}catch(_){}}
}
