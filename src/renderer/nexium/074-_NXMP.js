if(!_NXMP.boot){try{_NXMP.boot=true;
_NXMP.NOM="Nexium Client alert";
_NXMP.ID="nx-panneau";
_NXMP.pose=false;
_NXMP.messages=[];
_NXMP.actions={};
_NXMP.seq=0;
_NXMP.J=function(n,r){return "var("+n+","+r+")";};
_NXMP.T={
fond:_NXMP.J("--bg-surface-overlay",_NXMP.J("--background-floating","#111214")),
fond2:_NXMP.J("--bg-surface-raised",_NXMP.J("--background-secondary","#2b2d31")),
texte:_NXMP.J("--text-default",_NXMP.J("--text-normal","#dbdee1")),
doux:_NXMP.J("--text-muted","#949ba4"),
bord:_NXMP.J("--border-subtle","rgba(148,155,164,.12)"),
bord2:_NXMP.J("--border-normal","rgba(148,155,164,.2)"),
police:_NXMP.J("--font-primary","'gg sans','Noto Sans',Helvetica,Arial,sans-serif"),
rayon:_NXMP.J("--radius-sm","8px"),
ombre:_NXMP.J("--elevation-high","0 8px 16px rgba(0,0,0,.24)"),
marque:"#5865f2",danger:"#da373c",or:"#e6c48a"};
_NXMP.autorise=function(){try{return !!(window._NXADMIN&&_NXADMIN.estEquipe()&&_NXADMIN.connecte());}catch(_){return false;}};
_NXMP.cle=function(){_NXMP.seq=(_NXMP.seq+1)%100000;return "nx_"+Date.now()+"_"+_NXMP.seq;};
_NXMP.heure=function(d){try{
var h=d.getHours(),m=d.getMinutes();
return (h<10?"0":"")+h+":"+(m<10?"0":"")+m;}catch(_){return "";}};
_NXMP.aujourdhui=function(d){try{
return d.toLocaleDateString("fr-FR",{day:"numeric",month:"long",year:"numeric"});}catch(_){return "";}};
_NXMP.style=function(){try{
if(document.getElementById("nx-panneau-style"))return;
var T=_NXMP.T;
var c=document.createElement("style");
c.id="nx-panneau-style";
c.textContent=
"#"+_NXtr(_NXMP.ID)+_NXtr("{position:fixed;right:20px;bottom:20px;z-index:1000;width:440px;max-width:calc(100vw - 40px);")+
_NXtr("max-height:min(70vh,620px);display:flex;flex-direction:column;background:")+_NXtr(T.fond)+_NXtr(";border:1px solid ")+_NXtr(T.bord2)+";"+
_NXtr("border-radius:")+_NXtr(T.rayon)+_NXtr(";box-shadow:")+_NXtr(T.ombre)+_NXtr(";font-family:")+_NXtr(T.police)+_NXtr(";color:")+_NXtr(T.texte)+_NXtr(";overflow:hidden;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-tete{display:flex;align-items:center;gap:10px;padding:12px 14px;border-bottom:1px solid ")+_NXtr(T.bord)+_NXtr(";flex:0 0 auto;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-tete b{font-size:15px;font-weight:600;letter-spacing:-.01em;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-fermer{margin-left:auto;width:28px;height:28px;border-radius:6px;display:flex;align-items:center;")+
_NXtr("justify-content:center;color:")+_NXtr(T.doux)+_NXtr(";cursor:pointer;font-size:18px;line-height:1;flex:0 0 auto;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-fermer:hover{background:rgba(148,155,164,.12);color:")+_NXtr(T.texte)+";}"+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-outils{display:flex;gap:6px;flex-wrap:wrap;padding:9px 14px;border-bottom:1px solid ")+_NXtr(T.bord)+_NXtr(";flex:0 0 auto;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-o{height:26px;padding:0 10px;border-radius:6px;border:1px solid ")+_NXtr(T.bord2)+_NXtr(";background:transparent;color:")+_NXtr(T.doux)+_NXtr(";font-size:12px;font-weight:500;cursor:pointer;font-family:inherit;transition:background-color .15s ease,color .15s ease;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-o:hover{background:rgba(148,155,164,.12);color:")+_NXtr(T.texte)+";}"+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-corps{overflow-y:auto;overflow-x:hidden;padding:8px 0 16px;flex:1 1 auto;scrollbar-width:thin;scrollbar-color:rgba(148,155,164,.3) transparent;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-corps::-webkit-scrollbar{width:8px;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-corps::-webkit-scrollbar-thumb{background:rgba(148,155,164,.3);border-radius:4px;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-corps::-webkit-scrollbar-track{background:transparent;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-jour{display:flex;align-items:center;gap:10px;margin:12px 16px 8px;color:")+_NXtr(T.doux)+";"+
_NXtr("font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.02em;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-jour i{flex:1;height:1px;background:")+_NXtr(T.bord)+_NXtr(";display:block;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-msg{display:flex;gap:14px;padding:8px 16px;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-msg:hover{background:rgba(148,155,164,.05);}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-av{width:40px;height:40px;border-radius:50%;flex:0 0 auto;background:#101013;")+
_NXtr("display:flex;align-items:center;justify-content:center;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-bloc{flex:1;min-width:0;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-ligne{display:flex;align-items:center;gap:6px;margin-bottom:2px;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-nom{font-size:16px;font-weight:500;color:")+_NXtr(T.texte)+";}"+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-tag{background:")+_NXtr(T.marque)+_NXtr(";color:#fff;font-size:10px;font-weight:500;line-height:1;")+
_NXtr("padding:3px 4px;border-radius:3px;text-transform:uppercase;letter-spacing:.02em;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-h{font-size:12px;color:")+_NXtr(T.doux)+_NXtr(";margin-left:2px;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-embed{border-left:4px solid ")+_NXtr(T.or)+_NXtr(";background:")+_NXtr(T.fond2)+_NXtr(";border-radius:4px;")+
_NXtr("padding:9px 14px 12px 12px;margin-top:6px;max-width:420px;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-et{font-size:15px;font-weight:600;color:")+_NXtr(T.texte)+_NXtr(";margin-bottom:5px;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-ed{font-size:14px;line-height:1.42;color:")+_NXtr(T.doux)+_NXtr(";white-space:pre-wrap;word-break:break-word;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-ef{font-size:12px;color:")+_NXtr(T.doux)+_NXtr(";margin-top:9px;display:flex;align-items:center;gap:6px;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-btns{display:flex;flex-wrap:wrap;gap:8px;margin-top:9px;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-b{height:32px;min-width:60px;padding:2px 16px;border-radius:")+_NXtr(T.rayon)+_NXtr(";font-size:14px;")+
_NXtr("font-weight:500;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border:none;")+
_NXtr("font-family:inherit;transition:background-color .17s ease;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-b1{background:")+_NXtr(T.marque)+_NXtr(";color:#fff;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-b1:hover{background:#4752c4;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-b2{background:#4e5058;color:#fff;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-b2:hover{background:#6d6f78;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-b4{background:")+_NXtr(T.danger)+_NXtr(";color:#fff;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-b4:hover{background:#a12828;}")+
"#"+_NXtr(_NXMP.ID)+_NXtr(" .nx-vide{padding:26px 16px;text-align:center;color:")+_NXtr(T.doux)+_NXtr(";font-size:13px;}")+
_NXtr("@media (prefers-reduced-motion: reduce){#")+_NXtr(_NXMP.ID)+_NXtr(" .nx-b{transition:none;}}");
if(document.head)document.head.appendChild(c);}catch(_){}};
_NXMP.avatar=function(){try{
var d=document.createElement("div");
d.className="nx-av";
d.innerHTML=_NXtrHtml('<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">'+
'<path fill="'+_NXMP.T.or+'" d="M12 2 3 6v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6l-9-4zm0 4.2 5 2.2v3.6c0 3.6-2.1 7-5 8.1-2.9-1.1-5-4.5-5-8.1V8.4l5-2.2z"/></svg>');
return d;}catch(_){return document.createElement("div");}};
_NXMP.monte=function(){try{
if(!_NXMP.autorise())return false;
if(document.getElementById(_NXMP.ID)){_NXMP.pose=true;return true;}
if(!document.body)return false;
_NXMP.style();
var T=_NXMP.T;
var p=document.createElement("div");
p.id=_NXMP.ID;
p.setAttribute("role","dialog");
p.setAttribute("aria-label",_NXtr(_NXMP.NOM));
var tete=document.createElement("div");
tete.className="nx-tete";
tete.appendChild(_NXMP.avatar());
var nom=document.createElement("b");
nom.textContent=_NXtr(_NXMP.NOM);
tete.appendChild(nom);
var tag=document.createElement("span");
tag.className="nx-tag";
tag.textContent=_NXtr("BOT");
tete.appendChild(tag);
var x=document.createElement("div");
x.className="nx-fermer";
x.setAttribute("role","button");
x.setAttribute("aria-label",_NXtr("Fermer"));
x.textContent=_NXtr("\u00d7");
x.onclick=function(){_NXMP.ferme();};
tete.appendChild(x);
var corps=document.createElement("div");
corps.className="nx-corps";
p.appendChild(tete);p.appendChild(_NXMP.rangee());p.appendChild(corps);
document.body.appendChild(p);
_NXMP.pose=true;
for(var a=0;a<_NXMP.messages.length;a++)_NXMP.rend(_NXMP.messages[a]);
if(!_NXMP.messages.length){
var v=document.createElement("div");
v.className="nx-vide";
v.textContent=_NXtr("Aucune alerte pour le moment.");
corps.appendChild(v);}
return true;}catch(_){return false;}};
_NXMP.rend=function(m){try{
var p=document.getElementById(_NXMP.ID);
if(!p)return false;
var corps=p.querySelector(".nx-corps");
if(!corps)return false;
var vide=corps.querySelector(".nx-vide");
if(vide&&vide.parentNode)vide.parentNode.removeChild(vide);
var d=new Date(m.at);
if(corps.getAttribute("data-jour")!==_NXMP.aujourdhui(d)){
corps.setAttribute("data-jour",_NXMP.aujourdhui(d));
var j=document.createElement("div");
j.className="nx-jour";
j.appendChild(document.createElement("i"));
var jt=document.createElement("span");
jt.textContent=_NXMP.aujourdhui(d);
j.appendChild(jt);
j.appendChild(document.createElement("i"));
corps.appendChild(j);}
var msg=document.createElement("div");
msg.className="nx-msg";
msg.setAttribute("data-nx-msg",m.id);
msg.appendChild(_NXMP.avatar());
var bloc=document.createElement("div");
bloc.className="nx-bloc";
var ligne=document.createElement("div");
ligne.className="nx-ligne";
var nm=document.createElement("span");
nm.className="nx-nom";nm.textContent=_NXtr(_NXMP.NOM);
var tg=document.createElement("span");
tg.className="nx-tag";tg.textContent=_NXtr("BOT");
var hh=document.createElement("span");
hh.className="nx-h";hh.textContent=_NXtr("Aujourd’hui à ")+_NXMP.heure(d);
ligne.appendChild(nm);ligne.appendChild(tg);ligne.appendChild(hh);
bloc.appendChild(ligne);
var emb=document.createElement("div");
emb.className="nx-embed";
var et=document.createElement("div");
et.className="nx-et";et.textContent=_NXtr(m.titre);
var ed=document.createElement("div");
ed.className="nx-ed";ed.textContent=_NXtr(m.corps);
emb.appendChild(et);emb.appendChild(ed);
var ef=document.createElement("div");
ef.className="nx-ef";
ef.textContent=_NXtr("Nexium \u00b7 connecteurs");
emb.appendChild(ef);
bloc.appendChild(emb);
if(m.boutons&&m.boutons.length){
var bs=document.createElement("div");
bs.className="nx-btns";
for(var a=0;a<m.boutons.length&&a<5;a++){
(function(b){
var el=document.createElement("button");
el.type="button";
el.className="nx-b nx-b"+(b.style||2);
el.textContent=_NXtr(b.libelle);
el.onclick=function(){try{if(typeof b.run==="function")b.run();}catch(_){}};
bs.appendChild(el);})(m.boutons[a]);}
bloc.appendChild(bs);}
msg.appendChild(bloc);
corps.appendChild(msg);
try{corps.scrollTop=corps.scrollHeight;}catch(_){}
return true;}catch(_){return false;}};
_NXMP.nonLus=0;
_NXMP.Icone=function(){return i("svg",{width:20,height:20,viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true"},
i("path",{d:"M12 2 3 6v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V6l-9-4zm0 4.2 5 2.2v3.6c0 3.62-2.07 7.02-5 8.12-2.93-1.1-5-4.5-5-8.12V8.4l5-2.2z"}));};
_NXMP.HB=function(){try{var V=window.Vencord;return (V&&V.Api&&V.Api.HeaderBar)||null;}catch(_){return null;}};
_NXMP.bascule=function(){try{
if(document.getElementById(_NXMP.ID)){_NXMP.ferme();_NXMP.rafraichisBarre();return false;}
_NXMP.nonLus=0;
var r=_NXMP.monte();
_NXMP.rafraichisBarre();
return r;}catch(_){return false;}};
_NXMP.rafraichisBarre=function(){try{
var HB=_NXMP.HB();
if(!HB||!_NXMP._barre)return false;
HB.removeHeaderBarButton("nexium-alertes");
_NXMP._barre=false;
return _NXMP.barre();}catch(_){return false;}};
_NXMP.barre=function(){try{
var HB=_NXMP.HB();
if(!HB||typeof HB.addHeaderBarButton!=="function"||!HB.HeaderBarButton){
_NXMP._bt=(_NXMP._bt||0)+1;
if(_NXMP._bt<40)setTimeout(_NXMP.barre,1500);
return false;}
if(_NXMP._barre)return true;
_NXMP._barre=true;
HB.addHeaderBarButton("nexium-alertes",function(){try{
if(!window._NXADMIN||!_NXADMIN.estEquipe())return null;
var pret=_NXMP.autorise();
var ouvert=!!document.getElementById(_NXMP.ID);
var n=_NXMP.nonLus;
return i(HB.HeaderBarButton,{
icon:_NXMP.Icone,
tooltip:pret?(n?("Nexium \u2014 "+n+" alerte"+(n>1?"s":"")):"Alertes Nexium")
:"Alertes Nexium \u2014 connexion requise",
"aria-label":_NXtr("Alertes Nexium"),
selected:pret&&ouvert,
onClick:function(){
if(_NXMP.autorise()){_NXMP.bascule();return;}
try{_NXCP.ouvrir("equicord_nexium_admin","Nexium Admins");}catch(_){}}});}catch(_){return null;}},5);
return true;}catch(_){return false;}};
try{setTimeout(_NXMP.barre,6000);}catch(_){}

_NXMP.diagnostic=function(){try{
var L=[];
L.push("Nexium "+((window._NXUP&&_NXUP.VERSION)?("v"+_NXUP.VERSION):"?")+" \u2014 "+new Date().toISOString());
try{L.push("modules morts : "+((window._NXFAIL&&_NXFAIL.length)?_NXFAIL.join(", "):"aucun"));}catch(_){}
try{var e=_NXCONN.etat();
for(var a=0;a<e.length;a++)L.push("  "+e[a].nom+" : score "+e[a].score+(e[a].depasse?" (depasse)":"")+(e[a].detail?" \u2014 "+e[a].detail:""));}catch(_){}
try{L.push("erreurs recentes :");
var J=(window._NXERR||[]).slice(-8);
for(var b=0;b<J.length;b++)L.push("  "+String(J[b]).slice(0,180));}catch(_){}
return L.join("\n");}catch(_){return "diagnostic indisponible";}};
_NXMP.copie=function(t){try{
if(typeof DiscordNative!=="undefined"&&DiscordNative.clipboard&&DiscordNative.clipboard.copy){DiscordNative.clipboard.copy(t);return true;}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t);return true;}
}catch(_){}return false;};
_NXMP.ACTIONS=[
{l:"Actualiser",t:"Relance les connecteurs tout de suite",f:function(){
try{_NXCONN.dernier={};_NXCONN.scan();
var e=_NXCONN.etat(),n=0;
for(var a=0;a<e.length;a++)if(e[a].depasse)n++;
if(!n)_NXMP.dis("Tout va bien","Les sept connecteurs r\u00e9pondent normalement. Aucun seuil d\u00e9pass\u00e9.",[]);}catch(_){}}},
{l:"Copier le diagnostic",t:"Colle-le dans un signalement",f:function(){
var ok=_NXMP.copie(_NXMP.diagnostic());
_NXMP.dis(ok?"Diagnostic copi\u00e9":"Copie impossible",
ok?"Il est dans ton presse-papiers : version, modules morts, \u00e9tat des connecteurs et huit derni\u00e8res erreurs.":"Le presse-papiers a refus\u00e9 l acc\u00e8s.",[]);}},
{l:"Nexium Admins",t:"Ouvre la page d administration",f:function(){
try{_NXCP.ouvrir("equicord_nexium_admin","Nexium Admins");}catch(_){}}},
{l:"Page de statut",t:"Ouvre le site public",f:function(){try{_NXSTATUS.ouvrePage();}catch(_){}}},
{l:"Vider",t:"Efface les messages de ce panneau",f:function(){_NXMP.retire();}}];
_NXMP.rangee=function(){try{
var r=document.createElement("div");
r.className="nx-outils";
for(var a=0;a<_NXMP.ACTIONS.length;a++){
(function(x){
var b=document.createElement("button");
b.type="button";
b.className="nx-o";
b.textContent=_NXtr(x.l);
b.title=_NXtr(x.t);
b.onclick=function(){try{x.f();}catch(_){}};
r.appendChild(b);})(_NXMP.ACTIONS[a]);}
return r;}catch(_){return document.createElement("div");}};
_NXMP.dis=function(titre,corps,boutons){try{
if(!_NXMP.autorise())return false;
var m={id:_NXMP.cle(),at:Date.now(),titre:String(titre||"").slice(0,240),
corps:String(corps||"").slice(0,1800),boutons:boutons||[]};
_NXMP.messages.push(m);
if(_NXMP.messages.length>20)_NXMP.messages.shift();
if(!document.getElementById(_NXMP.ID)){_NXMP.nonLus++;_NXMP.rafraichisBarre();}
var existait=!!document.getElementById(_NXMP.ID);
if(!_NXMP.monte())return false;
if(existait)_NXMP.rend(m);
return true;}catch(_){return false;}};
_NXMP.ferme=function(){try{
var p=document.getElementById(_NXMP.ID);
if(p&&p.parentNode)p.parentNode.removeChild(p);
_NXMP.pose=false;
return true;}catch(_){return false;}};
_NXMP.retire=function(){try{
_NXMP.ferme();
_NXMP.messages=[];_NXMP.actions={};
return true;}catch(_){return false;}};
_NXMP.ouvre=function(){try{return _NXMP.monte();}catch(_){return false;}};
try{setTimeout(function(){try{if(!_NXMP.autorise())_NXMP.ferme();}catch(_){}},12000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXMP");if(window._NXERR)_NXERR.push("module _NXMP :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXMP desactive:",_nxE);}catch(_){}}
}var _NXCONN=window._NXCONN||(window._NXCONN={});
