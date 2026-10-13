var _NXSIS=window._NXSIS||(window._NXSIS={});
if(!_NXSIS.boot){try{_NXSIS.boot=true;
// Le sismographe.
//
// Par serveur et par jour : messages, personnes differentes, part de comptes
// neufs. Plus un releve du nombre de membres. Quarante-cinq jours, quarante
// serveurs, et on jette le reste -- une clef de stockage qui grossit sans fin
// finit par couter le demarrage a tout le monde.
_NXSIS.KEY="nexium_sismo";
_NXSIS.JOURS=45;
_NXSIS.MAXG=40;
_NXSIS.NEUF=7*86400000;
_NXSIS.MODID="nx-sis-modal";
_NXSIS.data={v:1,g:{}};
_NXSIS._vus={};
_NXSIS._sale=false;

_NXSIS.jour=function(t){try{return Math.floor((t||Date.now())/86400000);}catch(_){return 0;}};
_NXSIS.load=function(){try{
var r=_NXDB.get(_NXSIS.KEY);
var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object"||!d.g)d={v:1,g:{}};
_NXSIS.data=d;
_NXSIS.oublie();
return d;}catch(_){_NXSIS.data={v:1,g:{}};return _NXSIS.data;}};
_NXSIS.save=function(){try{
_NXSIS._sale=false;
_NXDB.set(_NXSIS.KEY,JSON.stringify(_NXSIS.data));}catch(_){}};
// On n ecrit pas a chaque message : une minute de retard ne coute rien, et
// serialiser quarante serveurs a chaque frappe en couterait beaucoup.
_NXSIS.marque=function(){try{
_NXSIS._sale=true;
if(_NXSIS._t)return;
_NXSIS._t=setTimeout(function(){_NXSIS._t=null;if(_NXSIS._sale)_NXSIS.save();},60000);}catch(_){}};

_NXSIS.oublie=function(){try{
// Aujourd hui compte dans la fenetre : garder JOURS jours, c est jeter
// tout ce qui est plus vieux que JOURS-1 jours.
var limite=_NXSIS.jour()-_NXSIS.JOURS+1,k,q;
var G=_NXSIS.data.g,noms=[];
for(k in G){
var g=G[k];
for(q in g.d)if(parseInt(q,10)<limite)delete g.d[q];
for(q in g.m)if(parseInt(q,10)<limite)delete g.m[q];
var reste=0;for(q in g.d)reste++;
if(!reste){delete G[k];continue;}
noms.push(k);}
if(noms.length>_NXSIS.MAXG){
noms.sort(function(a,b){return (G[b].vu||0)-(G[a].vu||0);});
for(var a=_NXSIS.MAXG;a<noms.length;a++)delete G[noms[a]];}
}catch(_){}};

_NXSIS.serveur=function(gid){try{
var G=_NXSIS.data.g;
if(!G[gid])G[gid]={d:{},m:{},vu:Date.now(),ne:Date.now()};
return G[gid];}catch(_){return null;}};

// Ce que le client voit passer. Pas d appel, pas de requete : ce message est
// deja arrive, on l ajoute a un compteur.
_NXSIS.onMsg=function(e){try{
var m=e&&e.message;
if(!m||!m.author||m.author.bot)return;
var cid=String(m.channel_id||m.channelId||"");
if(!cid)return;
var gid=null;
try{gid=_NXguildOf(cid);}catch(_){}
if(!gid)return;
gid=String(gid);
var g=_NXSIS.serveur(gid);
if(!g)return;
var j=String(_NXSIS.jour());
if(!g.d[j])g.d[j]=[0,0,0];
g.d[j][0]++;
g.vu=Date.now();
var uid=String(m.author.id||"");
var v=_NXSIS._vus[gid];
if(!v||v.j!==j){v={j:j,set:{},n:0};_NXSIS._vus[gid]=v;}
if(uid&&!v.set[uid]){v.set[uid]=1;v.n++;g.d[j][1]=v.n;}
try{
var ne=_NXSIS.ne(uid);
if(ne&&(Date.now()-ne)<_NXSIS.NEUF)g.d[j][2]++;}catch(_){}
_NXSIS.marque();}catch(_){}};

_NXSIS.ne=function(id){try{
var n=parseInt(String(id||""),10);
if(!isFinite(n)||n<=0)return 0;
return Math.floor(n/4194304)+1420070400000;}catch(_){return 0;}};

// Le nombre de membres ne se compte pas, il se lit. Une fois par heure suffit :
// c est une courbe lente.
_NXSIS.releve=function(){try{
var GS=_NXcommon().store("GuildStore");
if(!GS||!GS.getGuild)return 0;
var G=_NXSIS.data.g,j=String(_NXSIS.jour()),n=0,k;
for(k in G){
var g2=null;
try{g2=GS.getGuild(k);}catch(_){}
if(!g2)continue;
var c=g2.memberCount;
if(typeof c!=="number"||!isFinite(c)||c<=0)continue;
G[k].m[j]=c;
if(g2.name)G[k].nom=String(g2.name).slice(0,48);
n++;}
if(n)_NXSIS.marque();
return n;}catch(_){return 0;}};

_NXSIS.branche=function(){try{
if(_NXSIS._branche)return;
if(!window._NXPR||typeof _NXPR.onMsg!=="function"){
_NXSIS._essais=(_NXSIS._essais||0)+1;
if(_NXSIS._essais<25)setTimeout(_NXSIS.branche,1500);
return;}
var avant=_NXPR.onMsg;
_NXPR.onMsg=function(e){
try{avant.apply(_NXPR,arguments);}catch(_){}
try{_NXSIS.onMsg(e);}catch(_){}};
_NXSIS._branche=true;}catch(_){}};

// --- la lecture -------------------------------------------------------------
_NXSIS.serie=function(gid,n){try{
var g=_NXSIS.data.g[String(gid)];
var j0=_NXSIS.jour(),out=[],a;
for(a=n-1;a>=0;a--){
var j=String(j0-a);
var v=(g&&g.d[j])||[0,0,0];
out.push({j:j0-a,msg:v[0]|0,gens:v[1]|0,neufs:v[2]|0,
membres:(g&&g.m[j])||0});}
return out;}catch(_){return [];}};

_NXSIS.somme=function(L,champ,de,a){try{
var n=0,k;
for(k=de;k<a&&k<L.length;k++)if(k>=0)n+=L[k][champ]|0;
return n;}catch(_){return 0;}};

_NXSIS.jours=function(gid){try{
var g=_NXSIS.data.g[String(gid)];
if(!g)return 0;
var n=0,k;
for(k in g.d)n++;
return n;}catch(_){return 0;}};

_NXSIS.lecture=function(gid){try{
var L=_NXSIS.serie(gid,30);
var g=_NXSIS.data.g[String(gid)];
var connus=_NXSIS.jours(gid);
var sept=_NXSIS.somme(L,"msg",23,30);
var avant=_NXSIS.somme(L,"msg",16,23);
var gens7=_NXSIS.somme(L,"gens",23,30);
var gensAv=_NXSIS.somme(L,"gens",16,23);
var neufs7=_NXSIS.somme(L,"neufs",23,30);
var membres=0,membresAv=0,a;
for(a=L.length-1;a>=0;a--)if(L[a].membres){membres=L[a].membres;break;}
for(a=L.length-8;a>=0;a--)if(L[a].membres){membresAv=L[a].membres;break;}
var partNeufs=sept>0?(neufs7/sept):0;
var verdict;
if(connus<8)verdict={k:"jeune",t:"Trop tot pour dire quoi que ce soit",
d:"Il faut une huitaine de jours d observation pour comparer une semaine a la precedente. Il y en a "+connus+"."};
else if(partNeufs>=0.25&&sept>avant*1.4&&sept>40)
verdict={k:"invasion",t:"Afflux inhabituel de comptes neufs",
d:Math.round(partNeufs*100)+" % des messages viennent de comptes crees il y a moins d une semaine, et le volume a bondi. C est la forme d un raid ou d une vague de faux comptes."};
else if(avant>20&&sept<avant*0.5&&gens7<gensAv*0.7)
verdict={k:"meurt",t:"Cette communaute s eteint",
d:"Deux fois moins de messages que la semaine derniere, et moins de monde pour les ecrire. Quand les deux baissent ensemble, ce n est pas un creux."};
else if(membresAv>50&&membres<membresAv*0.9)
verdict={k:"fuite",t:"Le serveur se vide",
d:(membresAv-membres)+" membres de moins en une semaine, soit "+Math.round((1-membres/membresAv)*100)+" %."};
else if(avant>10&&sept>avant*1.4)
verdict={k:"pousse",t:"Ca pousse",
d:Math.round((sept/avant-1)*100)+" % de messages en plus que la semaine derniere, sans afflux de comptes neufs."};
else verdict={k:"stable",t:"Rien d anormal",
d:"Le volume et le nombre de personnes tiennent d une semaine a l autre."};
return {serie:L,connus:connus,nom:(g&&g.nom)||"",
sept:sept,avant:avant,gens7:gens7,gensAv:gensAv,
neufs7:neufs7,partNeufs:partNeufs,
membres:membres,membresAv:membresAv,verdict:verdict};}catch(_){
return {serie:[],connus:0,verdict:{k:"jeune",t:"Rien a montrer",d:""}};}};

// --- la carte ---------------------------------------------------------------
_NXSIS.ferme=function(){try{
var o=document.getElementById(_NXSIS.MODID);
if(o&&o.parentNode)o.parentNode.removeChild(o);}catch(_){}};

// `force` impose l echelle d une autre serie. Sans ca, les messages de
// comptes neufs sont normalises sur leur propre maximum : deux messages
// par jour remplissent la barre, et 3 % du total se lit comme une
// invasion. Une courbe qui ment par son echelle ment quand meme.
_NXSIS.barres=function(L,champ,coul,haut,force){try{
var max=force||0,a;
if(!force)for(a=0;a<L.length;a++)if(L[a][champ]>max)max=L[a][champ];
var h='<div style="display:flex;align-items:flex-end;gap:2px;height:'+haut+'px;">';
for(a=0;a<L.length;a++){
var v=L[a][champ]|0;
var pct=max>0?Math.max(2,Math.round(v*100/max)):2;
h+='<div title="'+v+'" style="flex:1;height:'+pct+'%;border-radius:2px 2px 0 0;background:'+(v>0?coul:"rgba(255,255,255,.05)")+';"></div>';}
return h+"</div>";}catch(_){return "";}};

_NXSIS.carte=function(gid,nom){try{
if(document.getElementById(_NXSIS.MODID))return false;
var P=_NXpal;
var esc=function(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
var r=_NXSIS.lecture(gid);
var coul=r.verdict.k==="invasion"?P.red:r.verdict.k==="meurt"?P.warn:
r.verdict.k==="fuite"?P.warn:r.verdict.k==="pousse"?P.ok:P.sub;
var ov=document.createElement("div");ov.id=_NXSIS.MODID;
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.62);";
var card=document.createElement("div");
card.style.cssText="width:540px;max-width:calc(100vw - 40px);max-height:86vh;overflow-y:auto;background:"+P.panel+";border:1px solid "+P.line+";border-radius:20px;padding:22px;box-shadow:0 30px 80px rgba(0,0,0,.55);";
var pc=function(x){return (x>0?"+":"")+Math.round(x)+" %";};
var delta=r.avant>0?((r.sept/r.avant-1)*100):0;
var h='<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Sismographe</div>'
+'<div style="font-size:20px;font-weight:800;color:'+P.txt+';letter-spacing:-.02em;">'+esc(nom||r.nom||"Ce serveur")+'</div>'
+'<div style="font-size:11px;color:'+P.dim+';margin-top:5px;">Observe depuis '+r.connus+' jour'+(r.connus>1?"s":"")+'. Nexium compte les messages qui arrivent dans ton client, et rien d autre.</div>'
+'<div style="margin-top:14px;padding:14px 15px;border-radius:13px;background:'+P.inset+';border:1px solid '+coul+';">'
+'<div style="font-size:16px;font-weight:800;color:'+coul+';letter-spacing:-.02em;">'+esc(r.verdict.t)+'</div>'
+'<div style="font-size:12px;color:'+P.sub+';margin-top:6px;line-height:1.6;">'+esc(r.verdict.d)+'</div></div>';
h+='<div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:14px;">'
+'<div><div style="font-size:17px;font-weight:800;color:'+P.txt+';">'+r.sept+'</div><div style="font-size:10.5px;color:'+P.dim+';">messages, 7 jours</div></div>'
+'<div><div style="font-size:17px;font-weight:800;color:'+(delta<-20?P.warn:delta>20?P.ok:P.txt)+';">'+pc(delta)+'</div><div style="font-size:10.5px;color:'+P.dim+';">contre la semaine d avant</div></div>'
+'<div><div style="font-size:17px;font-weight:800;color:'+P.txt+';">'+r.gens7+'</div><div style="font-size:10.5px;color:'+P.dim+';">personnes qui ont parle</div></div>'
+'<div><div style="font-size:17px;font-weight:800;color:'+(r.partNeufs>=0.25?P.red:P.txt)+';">'+Math.round(r.partNeufs*100)+' %</div><div style="font-size:10.5px;color:'+P.dim+';">de comptes de moins d une semaine</div></div>'
+(r.membres?('<div><div style="font-size:17px;font-weight:800;color:'+P.txt+';">'+r.membres+'</div><div style="font-size:10.5px;color:'+P.dim+';">membres'+(r.membresAv?(" ("+(r.membres-r.membresAv>=0?"+":"")+(r.membres-r.membresAv)+" en 7 j)"):"")+'</div></div>'):"")
+'</div>';
h+='<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:'+P.faint+';margin:18px 0 7px;">Messages par jour, 30 jours</div>'
+_NXSIS.barres(r.serie,"msg",P.pale,72);
h+='<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:'+P.faint+';margin:16px 0 7px;">Personnes differentes par jour</div>'
+_NXSIS.barres(r.serie,"gens",P.mute,46);
if(r.neufs7)
var maxMsg=0,mm;
for(mm=0;mm<r.serie.length;mm++)if(r.serie[mm].msg>maxMsg)maxMsg=r.serie[mm].msg;
h+='<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:'+P.faint+';margin:16px 0 7px;">Messages de comptes neufs, a la meme echelle</div>'
+_NXSIS.barres(r.serie,"neufs",P.danger,34,maxMsg);
card.innerHTML=_NXtrHtml(h);
var pied=document.createElement("div");
pied.style.cssText="display:flex;gap:8px;align-items:center;margin-top:16px;padding-top:12px;border-top:1px solid "+P.line+";";
var note=document.createElement("div");
note.style.cssText="flex:1 1 auto;font-size:10.5px;color:"+P.faint+";line-height:1.55;";
note.textContent=_NXtr("Tout est compte sur ta machine. Aucune requete n a ete faite pour construire cette page.");
pied.appendChild(note);
var mk=function(txt,style,fn){
var b=document.createElement("div");b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");
b.style.cssText=style;b.textContent=_NXtr(txt);b.onclick=fn;
b.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();fn();}};
return b;};
pied.appendChild(mk("Fermer","flex:0 0 auto;padding:10px 16px;border-radius:10px;background:"+P.acc+";color:"+P.ink+";font-size:12px;font-weight:700;cursor:pointer;",
function(){_NXSIS.ferme();}));
card.appendChild(pied);
ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)_NXSIS.ferme();};
if(document.body)document.body.appendChild(ov);
return true;}catch(_){return false;}};

// --- le clic droit sur un serveur -------------------------------------------
_NXSIS.wireMenu=function(){try{
var V=window.Vencord;
var API=V&&V.Api&&V.Api.ContextMenu;
var Menu=V&&V.Webpack&&V.Webpack.Common&&V.Webpack.Common.Menu;
if(!API||typeof API.addContextMenuPatch!=="function"||!Menu){
if((_NXSIS._menuTry=(_NXSIS._menuTry||0)+1)<12)setTimeout(_NXSIS.wireMenu,4000);
return false;}
if(_NXSIS._menuPose)return true;
var pose=function(enfants,props){
try{
var g=props&&(props.guild||props.guildId);
var gid=String((g&&g.id)||g||"");
if(!gid)return;
var nom=(g&&g.name)?String(g.name):"";
var connus=_NXSIS.jours(gid);
enfants.push(i(Menu.MenuSeparator,{}));
enfants.push(i(Menu.MenuItem,{id:"nx-sis",
label:connus?("Sante du serveur ("+connus+" j observes)"):"Sante du serveur",
action:function(){_NXSIS.carte(gid,nom);}}));
}catch(_){}};
API.addContextMenuPatch("guild-context",pose);
try{API.addContextMenuPatch("guild-header-popout",pose);}catch(_){}
_NXSIS._menuPose=true;
return true;}catch(_){return false;}};

_NXSIS.etat=function(){try{
var n=0,k;
for(k in _NXSIS.data.g)n++;
return {serveurs:n,jours:_NXSIS.JOURS,branche:!!_NXSIS._branche};}catch(_){
return {serveurs:0,jours:_NXSIS.JOURS,branche:false};}};

try{_NXSIS.load();}catch(_){}
try{setTimeout(_NXSIS.branche,7000);
setTimeout(_NXSIS.wireMenu,9800);
setTimeout(_NXSIS.releve,20000);
setInterval(function(){if(!document.hidden)_NXSIS.releve();},3600000);
window.addEventListener("beforeunload",function(){try{if(_NXSIS._sale)_NXSIS.save();}catch(_){}});}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXSIS");if(window._NXERR)_NXERR.push("module _NXSIS :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXSIS desactive:",_nxE);}catch(_){}}
}
