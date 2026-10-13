var _NXENQ=window._NXENQ||(window._NXENQ={});
if(!_NXENQ.boot){try{_NXENQ.boot=true;
// L enquete.
//
// Ce que fait quelqu un de prudent avant de repondre a un inconnu : regarder
// depuis quand le compte existe, si on a des serveurs en commun, si le
// detecteur a deja tique, ce que valent les liens du message. Ca prend dix
// minutes a la main, donc personne ne le fait jamais.
//
// Tout est calcule ici, sauf une chose : le nombre de gens qui ont signale
// l hote d un lien, qui vient du reseau communautaire. Le reste ne sort pas
// de la machine.
//
// Et surtout : le verdict montre ce qui le CONTREDIT. Un rapport qui n aligne
// que les raisons de s inquieter fabrique de la peur, pas du jugement.
_NXENQ.KEY="nexium_enquete";
_NXENQ.MAX=3;
_NXENQ.FENETRE=172800000;
_NXENQ.MODID="nx-enq-modal";
_NXENQ.hist=[];
_NXENQ.load=function(){try{
var r=_NXDB.get(_NXENQ.KEY);
var d=r?JSON.parse(r):null;
if(!d||!d.length)d=[];
var out=[],a,now=Date.now();
for(a=0;a<d.length;a++){var t=parseInt(d[a],10);
if(isFinite(t)&&t>0&&(now-t)<_NXENQ.FENETRE)out.push(t);}
_NXENQ.hist=out;return out;}catch(_){_NXENQ.hist=[];return [];}};
_NXENQ.save=function(){try{_NXDB.set(_NXENQ.KEY,JSON.stringify(_NXENQ.hist));}catch(_){}};
_NXENQ.reste=function(){try{
_NXENQ.load();
return Math.max(0,_NXENQ.MAX-_NXENQ.hist.length);}catch(_){return 0;}};
// Quand la plus ancienne des trois sortira de la fenetre.
_NXENQ.attente=function(){try{
_NXENQ.load();
if(_NXENQ.hist.length<_NXENQ.MAX)return 0;
var min=_NXENQ.hist[0],a;
for(a=1;a<_NXENQ.hist.length;a++)if(_NXENQ.hist[a]<min)min=_NXENQ.hist[a];
return Math.max(0,(min+_NXENQ.FENETRE)-Date.now());}catch(_){return 0;}};
_NXENQ.duree=function(ms){try{
var h=Math.floor(ms/3600000);
if(h>=24)return Math.floor(h/24)+" jour"+(h>=48?"s":"");
if(h>=1)return h+" heure"+(h>1?"s":"");
return Math.max(1,Math.floor(ms/60000))+" minutes";}catch(_){return "";}};
_NXENQ.consomme=function(){try{
_NXENQ.load();
if(_NXENQ.hist.length>=_NXENQ.MAX)return false;
_NXENQ.hist.push(Date.now());_NXENQ.save();return true;}catch(_){return false;}};

// L identifiant Discord porte sa date de creation. Aucun reseau pour la lire.
_NXENQ.ne=function(id){try{
var n=parseInt(String(id||""),10);
if(!isFinite(n)||n<=0)return 0;
return Math.floor(n/4194304)+1420070400000;}catch(_){return 0;}};
_NXENQ.vieux=function(ms){try{
if(!ms)return "";
var j=Math.floor((Date.now()-ms)/86400000);
if(j<1)return "aujourd hui";
if(j<31)return j+" jour"+(j>1?"s":"");
if(j<365)return Math.floor(j/30)+" mois";
var an=Math.floor(j/365);
return an+" an"+(an>1?"s":"");}catch(_){return "";}};

_NXENQ.communs=function(uid){try{
var C=_NXcommon();
var GS=C.store("GuildStore"),GM=C.store("GuildMemberStore");
if(!GS||!GM||!GM.isMember)return null;
var G=null;
try{G=GS.getGuilds&&GS.getGuilds();}catch(_){}
if(!G)return null;
var noms=[],n=0,k;
for(k in G){
try{if(!GM.isMember(k,String(uid)))continue;}catch(_){continue;}
n++;
if(noms.length<3){var g=G[k];noms.push((g&&g.name)?String(g.name).slice(0,28):"serveur");}}
return {n:n,noms:noms};}catch(_){return null;}};

_NXENQ.sosies=function(auteur){try{
if(!window._NXPR||!_NXPR.friendNames||!_NXPR.norm)return null;
var amis=_NXPR.friendNames()||[];
if(!amis.length)return null;
var uid=String(auteur.id||"");
var nm=_NXPR.norm(auteur.globalName||auteur.global_name||auteur.username||"");
if(nm.length<3)return null;
var a;
for(a=0;a<amis.length;a++){
var f=amis[a];
if(!f||!f.n||f.n.length<3)continue;
if(String(f.id)===uid)return {ami:true};
if(f.n===nm)return {sosie:true,exact:true};
if(f.n.length>=4&&(nm.indexOf(f.n)>=0||f.n.indexOf(nm)>=0))return {sosie:true,exact:false};}
return null;}catch(_){return null;}};

_NXENQ.RXROLE=/(discord|nitro|staff|moder|admin|support|giveaway|officiel|official|system|systeme)/i;
_NXENQ.RXFICHIER=/\.(exe|scr|bat|cmd|com|pif|vbs|js|jar|msi|ps1|apk|dll|lnk|iso|hta)$/i;

// Un fait : signe (+ rassure, - inquiete, = contexte), poids, phrase.
//
// Deux redactions quand elles different : celle de l ecran, ou nommer la
// personne et les serveurs est ce qui rend le fait lisible, et celle qui
// part au relais, ou ca n a rien a faire.
_NXENQ.fait=function(L,signe,poids,texte,ia){try{
L.push({signe:signe,poids:poids|0,texte:String(texte),ia:ia?String(ia):null});}catch(_){}};

_NXENQ.faits=function(msg){try{
var F=[],a;
var au=(msg&&msg.author)||{};
var uid=String(au.id||"");
var cid=String((msg&&(msg.channel_id||msg.channelId))||"");

var ne=_NXENQ.ne(uid);
var jours=ne?Math.floor((Date.now()-ne)/86400000):-1;
if(jours>=0){
if(jours<7)_NXENQ.fait(F,"-",4,"le compte a ete cree il y a "+_NXENQ.vieux(ne));
else if(jours<30)_NXENQ.fait(F,"-",3,"le compte a "+_NXENQ.vieux(ne));
else if(jours<90)_NXENQ.fait(F,"-",1,"le compte a "+_NXENQ.vieux(ne));
else if(jours<730)_NXENQ.fait(F,"=",0,"le compte a "+_NXENQ.vieux(ne));
else _NXENQ.fait(F,"+",2,"le compte a "+_NXENQ.vieux(ne)+", c est ancien");}
else _NXENQ.fait(F,"=",0,"l age du compte n a pas pu etre lu");

if(au.bot)_NXENQ.fait(F,"=",0,"c est un robot declare");
if(!au.avatar)_NXENQ.fait(F,"-",1,"aucune photo de profil");

var rel=-1;
try{if(window._NXMAN&&_NXMAN.relation)rel=_NXMAN.relation(uid);}catch(_){}
if(rel===1)_NXENQ.fait(F,"+",4,"c est un ami, la relation est etablie des deux cotes");
else if(rel===2)_NXENQ.fait(F,"-",5,"tu as bloque ce compte");
else if(rel===3)_NXENQ.fait(F,"=",0,"une demande d ami est en attente");

var so=_NXENQ.sosies(au);
if(so&&so.sosie)_NXENQ.fait(F,"-",5,so.exact?
"son pseudo est exactement celui d un de tes amis, et ce n est pas lui":
"son pseudo ressemble a celui d un de tes amis");

var nom=String(au.globalName||au.global_name||au.username||"");
var mrole=nom.match(_NXENQ.RXROLE);
if(mrole)_NXENQ.fait(F,"-",3,"son pseudo se reclame d un role : "+nom.slice(0,40),
"son pseudo contient le mot "+String(mrole[0]).toLowerCase());

var co=_NXENQ.communs(uid);
if(co){
if(co.n<=0)_NXENQ.fait(F,"-",2,"aucun serveur en commun");
else if(co.n===1)_NXENQ.fait(F,"=",0,"un seul serveur en commun ("+co.noms[0]+")");
else _NXENQ.fait(F,"+",1,co.n+" serveurs en commun, dont "+co.noms.join(", "),
co.n+" serveurs en commun");}

try{
if(window._NXMAN&&_NXMAN.fils&&cid){
var f=_NXMAN.fils[cid];
if(f&&f.score>0){
var noms=[],b;
for(b=0;b<f.tactiques.length&&b<4;b++)noms.push(f.tactiques[b].n);
if(f.score>=_NXMAN.SEUIL)_NXENQ.fait(F,"-",6,
"le detecteur a signale cette conversation ("+f.score+" sur un seuil de "+_NXMAN.SEUIL+") : "+noms.join(", "));
else _NXENQ.fait(F,"-",2,
"le detecteur a releve "+noms.join(", ")+", sous le seuil ("+f.score+" sur "+_NXMAN.SEUIL+")");}
else if(f)_NXENQ.fait(F,"+",1,"le detecteur a lu "+f.n+" message(s) de cette conversation sans rien relever");}}catch(_){}

try{
var gid=null;
try{gid=_NXguildOf(cid);}catch(_){}
if(gid){
var GS=_NXcommon().store("GuildStore");
var g=GS&&GS.getGuild&&GS.getGuild(gid);
if(g){
var gne=_NXENQ.ne(gid);
var gj=gne?Math.floor((Date.now()-gne)/86400000):-1;
if(gj>=0&&gj<30)_NXENQ.fait(F,"-",3,"le serveur lui-meme a ete cree il y a "+_NXENQ.vieux(gne));
else if(gj>=0)_NXENQ.fait(F,"=",0,"le serveur a "+_NXENQ.vieux(gne));
if(String(g.ownerId||"")===uid)_NXENQ.fait(F,"=",0,"il est le proprietaire de ce serveur");
if(typeof g.verificationLevel==="number"&&g.verificationLevel<=0)
_NXENQ.fait(F,"-",1,"le serveur n impose aucune verification a l entree");}}
else _NXENQ.fait(F,"=",0,"message prive : il n y a pas de serveur pour encadrer l echange");}catch(_){}

var liens=[];
try{if(window._NXV&&_NXV.extractUrls)liens=_NXV.extractUrls(msg&&msg.content)||[];}catch(_){}
var hotes=[];
if(!liens.length)_NXENQ.fait(F,"=",0,"le message ne contient aucun lien");
for(a=0;a<liens.length&&a<5;a++){
var cl=null;
try{cl=_NXPR.classify(liens[a]);}catch(_){}
var h=(cl&&cl.host)||"";
if(h&&hotes.indexOf(h)<0)hotes.push(h);
if(!cl){_NXENQ.fait(F,"=",0,"un lien vers "+(h||"un hote illisible"));continue;}
if(cl.kind==="grabber")_NXENQ.fait(F,"-",8,h+" est un voleur de jeton connu");
else if(cl.kind==="phish")_NXENQ.fait(F,"-",7,h+" imite un service officiel");
else if(cl.kind==="punycode")_NXENQ.fait(F,"-",5,h+" utilise un alphabet trompeur");
else if(cl.kind==="suspect")_NXENQ.fait(F,"-",3,h+" sort de l ordinaire ("+((cl.why&&cl.why[0])||"heuristique")+")");
else if(cl.kind==="short")_NXENQ.fait(F,"-",2,h+" est un raccourcisseur : la vraie destination est cachee");
else if(cl.allowed)_NXENQ.fait(F,"+",1,h+" est sur la liste des domaines connus");
else _NXENQ.fait(F,"=",0,"un lien vers "+h+", rien de connu contre lui");}

try{
var pj=(msg&&msg.attachments)||[];
for(a=0;a<pj.length&&a<5;a++){
var nf=String((pj[a]&&(pj[a].filename||pj[a].name))||"");
if(_NXENQ.RXFICHIER.test(nf))_NXENQ.fait(F,"-",6,"piece jointe executable : "+nf.slice(0,48));}}catch(_){}

try{
var inv=String((msg&&msg.content)||"").match(/discord(?:app)?\.com\/invite\/|discord\.gg\//gi);
if(inv&&inv.length)_NXENQ.fait(F,"=",0,inv.length+" invitation(s) de serveur dans le message");}catch(_){}

return {faits:F,hotes:hotes,uid:uid,cid:cid,nom:nom};}catch(_){return {faits:[],hotes:[],uid:"",cid:"",nom:""};}};

_NXENQ.pese=function(F){try{
var n=0,a;
for(a=0;a<F.length;a++){
if(F[a].signe==="-")n-=F[a].poids;
else if(F[a].signe==="+")n+=F[a].poids;}
return n;}catch(_){return 0;}};
_NXENQ.verdict=function(n){try{
if(n<=-8)return {k:"danger",t:"Ne fais pas confiance",d:"Plusieurs signaux lourds pointent dans le meme sens."};
if(n<=-3)return {k:"suspect",t:"Prudence",d:"Il y a de quoi se mefier, sans preuve."};
if(n<=1)return {k:"neutre",t:"Rien de marquant",d:"Ni signal inquietant, ni garantie. Juge sur le contenu."};
return {k:"ok",t:"Rien d inquietant",d:"Les signaux disponibles vont dans le bon sens."};}catch(_){
return {k:"neutre",t:"Rien de marquant",d:""};}};

_NXENQ.lance=function(msg){try{
if(!msg||!msg.author){try{_NXPR.toast(_NXtr("Ce message n a pas d auteur lisible."),1);}catch(_){}return false;}
if(document.getElementById(_NXENQ.MODID))return false;
if(_NXENQ.reste()<=0){
try{_NXPR.toast(_NXtr("Trois enquetes par deux jours. La prochaine dans ")+_NXENQ.duree(_NXENQ.attente())+".",1);}catch(_){}
return false;}
if(!_NXENQ.consomme())return false;
var d=_NXENQ.faits(msg);
_NXENQ.modale(d,msg);
// Le seul morceau qui n est pas local : combien de gens ont signale l hote.
try{
if(window._NXV&&_NXV.askHost&&d.hotes.length){
var a;
for(a=0;a<d.hotes.length&&a<3;a++)(function(h){
_NXV.askHost(h,function(n){try{
if(!n||n<=0)return;
_NXENQ.ajoute({signe:"-",poids:Math.min(6,2+n),
texte:h+" a ete signale par "+n+" utilisateur(s) de Nexium"});}catch(_){}});})(d.hotes[a]);}}catch(_){}
return true;}catch(_){return false;}};

_NXENQ.ajoute=function(f){try{
if(!_NXENQ._d)return;
_NXENQ._d.faits.push(f);
_NXENQ.peint();}catch(_){}};

_NXENQ.texteIA=function(){try{
var d=_NXENQ._d;
if(!d)return "";
var L=[],a;
for(a=0;a<d.faits.length;a++)L.push((d.faits[a].signe==="-"?"- ":d.faits[a].signe==="+"?"+ ":"= ")+
(d.faits[a].ia||d.faits[a].texte));
return "Nexium a enquete sur l auteur d un message. Voici les faits releves, "+
"sans pseudo ni identifiant. Dis-moi en quatre phrases ce que tu en conclus, "+
"et ce que tu ferais a ma place.\n\n"+L.join("\n");}catch(_){return "";}};

_NXENQ.peint=function(){try{
var d=_NXENQ._d;
var corps=document.getElementById(_NXENQ.MODID+"-corps");
if(!d||!corps)return;
var P=_NXpal;
var n=_NXENQ.pese(d.faits);
var v=_NXENQ.verdict(n);
var coul=v.k==="danger"?P.red:v.k==="suspect"?P.warn:v.k==="ok"?P.ok:P.sub;
var esc=function(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
var contre=[],pour=[],ctx=[],a;
for(a=0;a<d.faits.length;a++){
var f=d.faits[a];
if(f.signe==="-")contre.push(f);else if(f.signe==="+")pour.push(f);else ctx.push(f);}
var liste=function(titre,L,c){
if(!L.length)return "";
var h='<div style="font-size:10px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:'+P.faint+';margin:14px 0 7px;">'+titre+'</div>';
var b;
for(b=0;b<L.length;b++){
h+='<div style="display:flex;gap:9px;align-items:flex-start;padding:7px 0;border-top:1px solid '+P.line+';">'
+'<div style="width:5px;height:5px;border-radius:50%;background:'+c+';margin-top:6px;flex:0 0 auto;"></div>'
+'<div style="font-size:12px;color:'+P.mid+';line-height:1.55;">'+esc(L[b].texte)+'</div></div>';}
return h;};
corps.innerHTML=
_NXtrHtml('<div style="padding:14px 15px;border-radius:14px;background:'+P.inset+';border:1px solid '+coul+';margin-bottom:4px;">'
+'<div style="font-size:17px;font-weight:800;color:'+coul+';letter-spacing:-.02em;">'+esc(v.t)+'</div>'
+'<div style="font-size:11.5px;color:'+P.dim+';margin-top:5px;line-height:1.6;">'+esc(v.d)+'</div>'
+'<div style="font-size:10.5px;color:'+P.faint+';margin-top:8px;font-family:'+_NXf.mono+';">balance '+(n>0?"+":"")+n+' sur '+d.faits.length+' fait(s)</div>'
+'</div>'
+liste("Ce qui inquiete",contre,P.red)
+liste("Ce qui rassure",pour,P.ok)
+liste("Contexte",ctx,P.faint));
}catch(_){}};

_NXENQ.ferme=function(){try{
var o=document.getElementById(_NXENQ.MODID);
if(o&&o.parentNode)o.parentNode.removeChild(o);
_NXENQ._d=null;}catch(_){}};

_NXENQ.modale=function(d,msg){try{
_NXENQ._d=d;
var P=_NXpal;
var esc=function(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
var ov=document.createElement("div");ov.id=_NXENQ.MODID;
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.62);";
var card=document.createElement("div");
card.style.cssText="width:520px;max-width:calc(100vw - 40px);max-height:82vh;display:flex;flex-direction:column;background:"+P.panel+";border:1px solid "+P.line+";border-radius:20px;padding:22px;box-shadow:0 30px 80px rgba(0,0,0,.55);";
var tete=document.createElement("div");
tete.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Nexium enquete</div>'
+'<div style="font-size:20px;font-weight:800;color:'+P.txt+';letter-spacing:-.02em;">'+esc(d.nom||"Cet auteur")+'</div>'
+'<div style="font-size:11px;color:'+P.dim+';margin-top:4px;">Tout est calcule sur ta machine, sauf le nombre de signalements d un hote.</div>');
card.appendChild(tete);
var corps=document.createElement("div");
corps.id=_NXENQ.MODID+"-corps";
corps.style.cssText="overflow-y:auto;margin-top:14px;flex:1 1 auto;";
card.appendChild(corps);
var pied=document.createElement("div");
pied.style.cssText="display:flex;gap:8px;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid "+P.line+";";
var reste=document.createElement("div");
reste.style.cssText="flex:1 1 auto;font-size:10.5px;color:"+P.faint+";";
reste.textContent=_NXENQ.reste()+_NXtr(" enquete(s) restante(s) sur ")+_NXtr(_NXENQ.MAX)+_NXtr(", fenetre de deux jours");
pied.appendChild(reste);
if(window._NXIA&&_NXIA.demandeIci){
var bIA=document.createElement("div");
bIA.className="nx-fx";bIA.setAttribute("role","button");bIA.setAttribute("tabindex","0");
bIA.style.cssText="padding:9px 14px;border-radius:10px;border:1px solid "+P.line+";color:"+P.sub+";font-size:12px;font-weight:600;cursor:pointer;";
bIA.textContent=_NXtr("Demander a Nexium IA");
bIA.onclick=function(){try{var t=_NXENQ.texteIA();_NXENQ.ferme();if(t)_NXIA.demandeIci(t);}catch(_){}};
pied.appendChild(bIA);}
var bF=document.createElement("div");
bF.className="nx-fx";bF.setAttribute("role","button");bF.setAttribute("tabindex","0");
bF.style.cssText="padding:9px 16px;border-radius:10px;background:"+P.acc+";color:"+P.ink+";font-size:12px;font-weight:700;cursor:pointer;";
bF.textContent=_NXtr("Fermer");
bF.onclick=function(){_NXENQ.ferme();};
pied.appendChild(bF);
card.appendChild(pied);
ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)_NXENQ.ferme();};
if(document.body)document.body.appendChild(ov);
_NXENQ.peint();
return true;}catch(_){return false;}};

_NXENQ.etat=function(){try{
return {reste:_NXENQ.reste(),max:_NXENQ.MAX,attente:_NXENQ.attente()};}catch(_){return {reste:0,max:_NXENQ.MAX,attente:0};}};
try{_NXENQ.load();}catch(_){}
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXENQ");if(window._NXERR)_NXERR.push("module _NXENQ :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXENQ desactive:",_nxE);}catch(_){}}
}
