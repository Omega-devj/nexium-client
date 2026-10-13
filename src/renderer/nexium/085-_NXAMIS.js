var _NXAMIS=window._NXAMIS||(window._NXAMIS={});
if(!_NXAMIS.boot){try{_NXAMIS.boot=true;
_NXAMIS.KEY="nexium_amis";
_NXAMIS.MODID="nx-amis-modal";
_NXAMIS.MAXP=60;
_NXAMIS.MAXN=8;
_NXAMIS.MAXG=400;
_NXAMIS.data={v:1,amis:{},partis:[],noms:{},vu:0};

_NXAMIS.load=function(){try{
var r=_NXDB.get(_NXAMIS.KEY);
var d=r?JSON.parse(r):null;
if(!d||typeof d!=="object")d={};
if(!d.amis||typeof d.amis!=="object")d.amis={};
if(!d.partis||!d.partis.length)d.partis=[];
if(!d.noms||typeof d.noms!=="object")d.noms={};
if(typeof d.vu!=="number")d.vu=0;
d.v=1;
_NXAMIS.data=d;return d;}catch(_){return _NXAMIS.data;}};
_NXAMIS.save=function(){try{_NXDB.set(_NXAMIS.KEY,JSON.stringify(_NXAMIS.data));}catch(_){}};

_NXAMIS.nom=function(id){try{
var US=_NXcommon().store("UserStore");
var u=US&&US.getUser&&US.getUser(String(id));
return (u&&(u.globalName||u.global_name||u.username))||"";}catch(_){return "";}};

// La liste des amis, telle que Discord la tient. Type 1 = ami.
_NXAMIS.liste=function(){try{
var RS=_NXcommon().store("RelationshipStore");
if(!RS)return null;
var m=null;
try{m=RS.getRelationships&&RS.getRelationships();}catch(_){}
if(!m||typeof m!=="object")return null;
var out={},k;
for(k in m){if(!m.hasOwnProperty(k))continue;
if((m[k]|0)===1)out[String(k)]=1;}
return out;}catch(_){return null;}};

// Un nom vu, avec sa date. On ne garde que les changements, pas les passages.
_NXAMIS.noteNom=function(id,nom){try{
if(!id||!nom)return false;
var N=_NXAMIS.data.noms;
if(!N[id])N[id]=[];
var L=N[id];
if(L.length&&L[L.length-1].n===nom)return false;
L.push({n:String(nom).slice(0,40),quand:Date.now()});
while(L.length>_NXAMIS.MAXN)L.shift();
return true;}catch(_){return false;}};

_NXAMIS.oublie=function(){try{
var N=_NXAMIS.data.noms,ids=[],k;
for(k in N)ids.push(k);
if(ids.length>_NXAMIS.MAXG){
ids.sort(function(a,b){
var x=N[a][N[a].length-1],y=N[b][N[b].length-1];
return (y?y.quand:0)-(x?x.quand:0);});
for(var a=_NXAMIS.MAXG;a<ids.length;a++)delete N[ids[a]];}
while(_NXAMIS.data.partis.length>_NXAMIS.MAXP)_NXAMIS.data.partis.shift();}catch(_){}};

// Le coeur : comparer la liste d aujourd hui a celle d hier.
_NXAMIS.scan=function(){try{
var L=_NXAMIS.liste();
if(!L)return null;
var D=_NXAMIS.data;
var neuf=[],partis=[],k,change=false;
var premier=!D.vu;
for(k in L){
if(!D.amis[k]){
D.amis[k]={depuis:Date.now(),nom:_NXAMIS.nom(k)};
if(!premier)neuf.push(k);
change=true;}
else{
var n2=_NXAMIS.nom(k);
if(n2&&n2!==D.amis[k].nom){
if(_NXAMIS.noteNom(k,n2))change=true;
D.amis[k].nom=n2;change=true;}}}
for(k in D.amis){
if(L[k])continue;
// Discord ne dit pas QUI a retire qui. On ne l invente pas : on garde la
// date, qui est la seule chose qu on sait et la seule qui manquait.
partis.push({id:k,nom:D.amis[k].nom||_NXAMIS.nom(k)||k,
depuis:D.amis[k].depuis||0,quand:Date.now()});
delete D.amis[k];change=true;}
if(partis.length&&!premier){
for(var a=0;a<partis.length;a++)D.partis.push(partis[a]);}
D.vu=Date.now();
_NXAMIS.oublie();
if(change||partis.length)_NXAMIS.save();
return {neuf:neuf.length,partis:premier?0:partis.length,amis:_NXAMIS.combien()};}catch(_){return null;}};

_NXAMIS.combien=function(){try{
var n=0,k;
for(k in _NXAMIS.data.amis)n++;
return n;}catch(_){return 0;}};

_NXAMIS.renommes=function(jours){try{
var lim=Date.now()-(jours||30)*86400000;
var N=_NXAMIS.data.noms,out=[],k;
for(k in N){
var L=N[k];
if(!L||L.length<2)continue;
var recents=0,a;
for(a=0;a<L.length;a++)if(L[a].quand>=lim)recents++;
if(!recents)continue;
out.push({id:k,noms:L.slice(),n:recents,dernier:L[L.length-1]});}
out.sort(function(x,y){return y.dernier.quand-x.dernier.quand;});
return out;}catch(_){return [];}};

_NXAMIS.quand=function(t){try{
if(!t)return "";
var j=Math.floor((Date.now()-t)/86400000);
if(j<1)return "aujourd hui";
if(j===1)return "hier";
if(j<31)return "il y a "+j+" jours";
if(j<365)return "il y a "+Math.floor(j/30)+" mois";
var an=Math.floor(j/365);
return "il y a "+an+" an"+(an>1?"s":"");}catch(_){return "";}};

_NXAMIS.ferme=function(){try{
var o=document.getElementById(_NXAMIS.MODID);
if(o&&o.parentNode)o.parentNode.removeChild(o);}catch(_){}};

_NXAMIS.carte=function(){try{
_NXAMIS.ferme();
_NXAMIS.scan();
var P=_NXpal;
var esc=function(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
var ov=document.createElement("div");ov.id=_NXAMIS.MODID;
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.62);";
var card=document.createElement("div");
card.style.cssText="width:520px;max-width:calc(100vw - 40px);max-height:84vh;display:flex;flex-direction:column;background:"+P.panel+";border:1px solid "+P.line+";border-radius:20px;padding:22px;box-shadow:0 30px 80px rgba(0,0,0,.55);";
var D=_NXAMIS.data;
var partis=D.partis.slice().reverse();
var ren=_NXAMIS.renommes(60);
var h='<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Nexium</div>'
+'<div style="font-size:20px;font-weight:800;color:'+P.txt+';letter-spacing:-.02em;">Tes amis, et ce qui a bouge</div>'
+'<div style="font-size:11.5px;color:'+P.sub+';margin-top:6px;line-height:1.6;">'
+_NXAMIS.combien()+' ami(s) suivis. Tout est compare sur ta machine, rien n est demande a Discord.</div>';
if(!D.vu||(!partis.length&&!ren.length))
h+='<div style="margin-top:16px;padding:14px 15px;border-radius:13px;background:'+P.inset+';border:1px solid '+P.line+';font-size:12.5px;color:'+P.dim+';line-height:1.6;">'
+'La premiere visite ne fait qu enregistrer l etat actuel : il n y a rien a comparer. '
+'Reviens dans quelques jours -- a partir de maintenant, chaque depart et chaque changement de pseudo est note avec sa date.</div>';
h+='<div style="overflow-y:auto;margin-top:14px;flex:1 1 auto;">';
if(partis.length){
h+='<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:'+P.faint+';margin:6px 0 7px;">Ne sont plus dans tes amis</div>';
var a;
for(a=0;a<partis.length&&a<25;a++){
var p=partis[a];
h+='<div style="display:flex;gap:11px;align-items:baseline;padding:8px 0;border-top:1px solid '+P.line+';">'
+'<div style="flex:1 1 auto;min-width:0;font-size:12.5px;font-weight:600;color:'+P.txt+';overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+esc(p.nom)+'</div>'
+'<div style="flex:0 0 auto;font-size:11px;color:'+P.dim+';">'+esc(_NXAMIS.quand(p.quand))+'</div></div>';}
h+='<div style="font-size:10.5px;color:'+P.faint+';margin-top:8px;line-height:1.6;">'
+'Discord ne dit pas qui a retire qui : il ne le sait pas non plus de ton cote. La date, elle, est sure.</div>';}
if(ren.length){
h+='<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:'+P.faint+';margin:16px 0 7px;">Ont change de pseudo</div>';
var b;
for(b=0;b<ren.length&&b<25;b++){
var r=ren[b];
var suite=[],c;
for(c=0;c<r.noms.length;c++)suite.push(esc(r.noms[c].n));
h+='<div style="padding:8px 0;border-top:1px solid '+P.line+';">'
+'<div style="font-size:12.5px;color:'+P.txt+';line-height:1.55;word-break:break-word;">'+suite.join(' <span style="color:'+P.faint+';">&rarr;</span> ')+'</div>'
+'<div style="font-size:10.5px;color:'+P.dim+';margin-top:3px;">'+r.n+' changement(s), le dernier '+esc(_NXAMIS.quand(r.dernier.quand))+'</div></div>';}}
h+='</div>';
card.innerHTML=_NXtrHtml(h);
var pied=document.createElement("div");
pied.style.cssText="display:flex;gap:8px;justify-content:flex-end;margin-top:14px;padding-top:12px;border-top:1px solid "+P.line+";";
var b2=document.createElement("div");
b2.className="nx-fx";b2.setAttribute("role","button");b2.setAttribute("tabindex","0");
b2.style.cssText="padding:10px 16px;border-radius:10px;background:"+P.acc+";color:"+P.ink+";font-size:12px;font-weight:700;cursor:pointer;";
b2.textContent=_NXtr("Fermer");
b2.onclick=function(){_NXAMIS.ferme();};
pied.appendChild(b2);
card.appendChild(pied);
ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)_NXAMIS.ferme();};
if(document.body)document.body.appendChild(ov);
return true;}catch(_){return false;}};

_NXAMIS.etat=function(){try{
return {amis:_NXAMIS.combien(),partis:_NXAMIS.data.partis.length,
renommes:_NXAMIS.renommes(60).length,premier:!_NXAMIS.data.vu};}catch(_){return {amis:0};}};

try{_NXAMIS.load();
setTimeout(function(){_NXAMIS.scan();},16000);
setInterval(function(){if(!document.hidden)_NXAMIS.scan();},300000);}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXAMIS");if(window._NXERR)_NXERR.push("module _NXAMIS :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXAMIS desactive:",_nxE);}catch(_){}}
}
