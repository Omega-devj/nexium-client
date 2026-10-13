var _NXLEC=window._NXLEC||(window._NXLEC={});
if(!_NXLEC.boot){try{_NXLEC.boot=true;
// La lecture consentie.
//
// Un jeton, un salon, une minute, un usage. L outil de l assistant n a aucun
// parametre : il ne peut pas designer un salon, seulement prendre celui que
// l utilisateur vient de lui tendre.
_NXLEC.PLAFOND=50;
_NXLEC.VIE=60000;
_NXLEC.MODID="nx-lec-modal";
_NXLEC.jeton=null;
_NXLEC.dernier=null;
_NXLEC.INTENTS=[
{k:"resume",n:"Resumer ce salon",
 q:"Resume-moi ce salon : les sujets, qui a decide quoi, et ce qui attend une reponse de moi."},
{k:"rate",n:"Qu est-ce que j ai rate ?",
 q:"Dis-moi ce que j ai rate dans ce salon : l essentiel en quelques points, et ce qui me concerne directement."},
{k:"lien",n:"Retrouver un lien ou un fichier",
 q:"Retrouve dans ce salon les liens et les fichiers partages, avec qui les a envoyes et a quel propos."},
{k:"ton",n:"Comment tourne la discussion ?",
 q:"Comment tourne cette discussion ? Dis-moi si le ton monte, qui parle a qui, et s il y a un desaccord qui traine."}];

_NXLEC.nom=function(cid){try{
var n="";
try{n=_NXchanName(cid);}catch(_){}
return n||("le salon "+String(cid).slice(0,8));}catch(_){return "ce salon";}};

// Les memes messages que ceux affiches a l ecran, caviardes par les motifs de
// Protect. Aucune requete : c est ce que Discord a deja charge.
_NXLEC.lit=function(cid,combien){try{
var C=_NXcommon();
var MS=C.store("MessageStore"),US=C.store("UserStore");
if(!MS)return [];
var moi=null;try{moi=US&&US.getCurrentUser&&US.getCurrentUser();}catch(_){}
var col=null;try{col=MS.getMessages&&MS.getMessages(cid);}catch(_){}
var A=[];
try{A=(col&&col.toArray)?col.toArray():((col&&col._array)||[]);}catch(_){A=[];}
var max=Math.max(1,Math.min(_NXLEC.PLAFOND,combien||_NXLEC.PLAFOND));
var out=[],a;
for(a=Math.max(0,A.length-max);a<A.length;a++){
var m=A[a];
if(!m||!m.content)continue;
var mien=!!(moi&&m.author&&String(m.author.id)===String(moi.id));
var qui=mien?"moi":((m.author&&(m.author.globalName||m.author.global_name||m.author.username))||"quelqu un");
var txt=String(m.content).slice(0,400);
try{if(window._NXIA&&_NXIA.caviarde)txt=_NXIA.caviarde(txt);}catch(_){}
out.push({de:qui,moi:mien,texte:txt});}
return out;}catch(_){return [];}};

// Les pseudos des autres ne sont pas les miens a donner. Par defaut ils
// deviennent des lettres, stables dans la charge, et la fenetre montre le
// resultat : on voit exactement ce qui partira.
_NXLEC.anonyme=function(L){try{
var carte={},suite=0,out=[],a;
var lettre=function(n){
var s2="";
do{s2=String.fromCharCode(65+(n%26))+s2;n=Math.floor(n/26)-1;}while(n>=0);
return s2;};
for(a=0;a<L.length;a++){
var q=L[a].de;
if(L[a].moi){out.push({de:"moi",moi:true,texte:L[a].texte});continue;}
if(carte[q]===undefined){carte[q]=lettre(suite);suite++;}
out.push({de:carte[q],moi:false,texte:L[a].texte});}
return out;}catch(_){return L;}};

_NXLEC.charge=function(cid,anon){try{
var L=_NXLEC.lit(cid,_NXLEC.PLAFOND);
if(anon)L=_NXLEC.anonyme(L);
var n=0,a;
for(a=0;a<L.length;a++)n+=L[a].de.length+2+L[a].texte.length;
return {cid:String(cid),nom:_NXLEC.nom(cid),msgs:L,anon:!!anon,chars:n};}catch(_){
return {cid:String(cid),nom:"",msgs:[],anon:!!anon,chars:0};}};

_NXLEC.pose=function(ch){try{
_NXLEC.jeton={cid:ch.cid,nom:ch.nom,msgs:ch.msgs,anon:ch.anon,
chars:ch.chars,expire:Date.now()+_NXLEC.VIE};
return true;}catch(_){return false;}};

// Usage unique. Un jeton perime ou deja pris ne rend rien, et le dit.
_NXLEC.consomme=function(){try{
var j=_NXLEC.jeton;
if(!j)return {erreur:"aucune lecture autorisee",
detail:"L utilisateur n a pas ouvert la fenetre de lecture. Dis-lui de faire un clic droit sur un message du salon, puis Lire ce salon avec Nexium IA. Tu ne peux pas lire un salon de ta propre initiative."};
_NXLEC.jeton=null;
if(Date.now()>j.expire)return {erreur:"autorisation expiree",
detail:"L accord ne vaut qu une minute. Demande-lui de recommencer."};
_NXLEC.dernier={quand:Date.now(),nom:j.nom,n:j.msgs.length,chars:j.chars,anon:j.anon};
try{if(window._NXPR&&_NXPR.logThreat)_NXPR.logThreat("lecture",j.nom+" : "+j.msgs.length+" messages lus avec accord");}catch(_){}
return {salon:j.nom,nombre:j.msgs.length,
pseudos:j.anon?"remplaces par des lettres":"tels qu affiches",
messages:j.msgs};}catch(_){return {erreur:"lecture impossible"};}};

_NXLEC.ferme=function(){try{
var o=document.getElementById(_NXLEC.MODID);
if(o&&o.parentNode)o.parentNode.removeChild(o);}catch(_){}};

_NXLEC.apercu=function(ch){try{
var P=_NXpal;
var esc=function(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
if(!ch.msgs.length)
return '<div style="padding:18px 4px;font-size:12.5px;color:'+P.dim+';line-height:1.6;">Aucun message lisible dans ce salon. Fais-le defiler une fois dans Discord, puis recommence.</div>';
var h='',a;
for(a=0;a<ch.msgs.length;a++)
h+='<div style="display:flex;gap:9px;padding:5px 0;border-top:1px solid '+P.line+';font-size:11.5px;line-height:1.55;">'
+'<div style="flex:0 0 82px;color:'+(ch.msgs[a].moi?P.sub:P.faint)+';font-weight:700;word-break:break-word;">'+esc(ch.msgs[a].de)+'</div>'
+'<div style="flex:1 1 auto;color:'+P.mid+';word-break:break-word;white-space:pre-wrap;">'+esc(ch.msgs[a].texte)+'</div></div>';
return h;}catch(_){return "";}};

_NXLEC.demande=function(cid,k){try{
if(!cid)return false;
if(!window._NXIA||!_NXIA.boot){try{_NXPR.toast(_NXtr("Nexium IA n est pas demarre."),1);}catch(_){}return false;}
if(document.getElementById(_NXLEC.MODID))return false;
var I=null,a;
for(a=0;a<_NXLEC.INTENTS.length;a++)if(_NXLEC.INTENTS[a].k===k)I=_NXLEC.INTENTS[a];
if(!I)I=_NXLEC.INTENTS[0];
if(!_NXIA.accorde("salons")){
_NXLEC.permission(cid,I);
return true;}
_NXLEC.modale(cid,I,true);
return true;}catch(_){return false;}};

// La permission n est pas accordee : on ne la coche pas a sa place, on
// explique ce qu elle ouvre et on laisse le geste.
_NXLEC.permission=function(cid,I){try{
var P=_NXpal;
var ov=document.createElement("div");ov.id=_NXLEC.MODID;
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.62);";
var card=document.createElement("div");
card.style.cssText="width:430px;max-width:calc(100vw - 40px);background:"+P.panel+";border:1px solid "+P.line+";border-radius:20px;padding:24px;";
card.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Nexium IA</div>'
+'<div style="font-size:19px;font-weight:800;color:'+P.txt+';margin-bottom:10px;">Lire un salon n est pas encore autorise</div>'
+'<div style="font-size:12.5px;color:'+P.sub+';line-height:1.65;">Cette permission ne fait rien toute seule. Elle ouvre la possibilite : ensuite, chaque lecture te montre les messages exacts qui partiront et attend ton accord. Rien ne part sans cette fenetre.</div>');
var row=document.createElement("div");row.style.cssText="display:flex;gap:8px;margin-top:18px;";
var mk=function(txt,style,fn){
var b=document.createElement("div");b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");
b.style.cssText=style;b.textContent=_NXtr(txt);b.onclick=fn;
b.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();fn();}};
return b;};
row.appendChild(mk("Plus tard","flex:1;text-align:center;padding:12px;border-radius:11px;border:1px solid "+P.line+";color:"+P.sub+";font-size:12.5px;font-weight:600;cursor:pointer;",
function(){_NXLEC.ferme();}));
row.appendChild(mk("Autoriser","flex:1;text-align:center;padding:12px;border-radius:11px;background:"+P.acc+";color:"+P.ink+";font-size:12.5px;font-weight:800;cursor:pointer;",
function(){_NXLEC.ferme();try{_NXIA.setCap("salons",true);}catch(_){}setTimeout(function(){_NXLEC.modale(cid,I,true);},120);}));
card.appendChild(row);ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)_NXLEC.ferme();};
if(document.body)document.body.appendChild(ov);
return true;}catch(_){return false;}};

_NXLEC.modale=function(cid,I,anon){try{
_NXLEC.ferme();
var ch=_NXLEC.charge(cid,anon);
var P=_NXpal;
var esc=function(x){return String(x||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");};
var cout=1;
try{cout=_NXIA.cout({caracteres:ch.chars});}catch(_){}
var ov=document.createElement("div");ov.id=_NXLEC.MODID;
ov.style.cssText="position:fixed;inset:0;z-index:99999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.62);";
var card=document.createElement("div");
card.style.cssText="width:560px;max-width:calc(100vw - 40px);max-height:86vh;display:flex;flex-direction:column;background:"+P.panel+";border:1px solid "+P.line+";border-radius:20px;padding:22px;box-shadow:0 30px 80px rgba(0,0,0,.55);";
var tete=document.createElement("div");
tete.innerHTML=_NXtrHtml('<div style="font-size:10px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:'+P.faint+';margin-bottom:6px;">Nexium IA</div>'
+'<div style="font-size:20px;font-weight:800;color:'+P.txt+';letter-spacing:-.02em;">'+esc(I.n)+'</div>'
+'<div style="font-size:12px;color:'+P.sub+';margin-top:6px;line-height:1.6;">Voici <b style="color:'+P.txt+';">exactement</b> ce qui partira au relais si tu acceptes. Rien d autre. Les secrets reconnus par Protect sont deja remplaces.</div>');
card.appendChild(tete);
var barre=document.createElement("div");
barre.style.cssText="display:flex;gap:14px;flex-wrap:wrap;margin-top:12px;padding:11px 13px;border-radius:11px;background:"+P.inset+";border:1px solid "+P.line+";";
barre.innerHTML=_NXtrHtml('<div><div style="font-size:15px;font-weight:800;color:'+P.txt+';">'+ch.msgs.length+'</div><div style="font-size:10.5px;color:'+P.dim+';">messages</div></div>'
+'<div><div style="font-size:15px;font-weight:800;color:'+P.txt+';">'+ch.chars+'</div><div style="font-size:10.5px;color:'+P.dim+';">caracteres</div></div>'
+'<div><div style="font-size:15px;font-weight:800;color:'+P.txt+';">'+cout+'</div><div style="font-size:10.5px;color:'+P.dim+';">credits estimes</div></div>'
+'<div style="flex:1 1 auto;min-width:120px;text-align:right;"><div style="font-size:12.5px;font-weight:700;color:'+P.sub+';word-break:break-word;">'+esc(ch.nom)+'</div><div style="font-size:10.5px;color:'+P.dim+';">salon lu</div></div>');
card.appendChild(barre);
var bascule=document.createElement("div");
bascule.className="nx-fx";bascule.setAttribute("role","button");bascule.setAttribute("tabindex","0");
bascule.setAttribute("aria-pressed",anon?"true":"false");
bascule.style.cssText="display:flex;align-items:center;gap:10px;margin-top:10px;padding:10px 12px;border-radius:11px;border:1px solid "+P.line+";cursor:pointer;";
bascule.innerHTML=_NXtrHtml('<div style="width:30px;height:18px;border-radius:99px;background:'+(anon?P.acc:P.inset)+';border:1px solid '+(anon?P.acc:P.line)+';position:relative;flex:0 0 auto;">'
+'<div style="position:absolute;top:2px;left:'+(anon?"14px":"2px")+';width:12px;height:12px;border-radius:50%;background:'+(anon?P.ink:P.faint)+';"></div></div>'
+'<div style="flex:1 1 auto;"><div style="font-size:12.5px;font-weight:700;color:'+(anon?P.txt:P.sub)+';">Remplacer les pseudos par des lettres</div>'
+'<div style="font-size:11px;color:'+P.dim+';margin-top:2px;line-height:1.5;">Les autres n ont rien demande. Le sens de la conversation est garde, les noms ne partent pas.</div></div>');
bascule.onclick=function(){_NXLEC.modale(cid,I,!anon);};
bascule.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();_NXLEC.modale(cid,I,!anon);}};
card.appendChild(bascule);
var corps=document.createElement("div");
corps.style.cssText="overflow-y:auto;margin-top:12px;flex:1 1 auto;padding-right:4px;";
corps.innerHTML=_NXtrHtml(_NXLEC.apercu(ch));
card.appendChild(corps);
var pied=document.createElement("div");
pied.style.cssText="display:flex;gap:8px;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid "+P.line+";";
var note=document.createElement("div");
note.style.cssText="flex:1 1 auto;font-size:10.5px;color:"+P.faint+";line-height:1.55;";
note.textContent=_NXtr("L accord vaut une minute, pour ce salon, et une seule lecture.");
pied.appendChild(note);
var mk=function(txt,style,fn){
var b=document.createElement("div");b.className="nx-fx";b.setAttribute("role","button");b.setAttribute("tabindex","0");
b.style.cssText=style;b.textContent=_NXtr(txt);b.onclick=fn;
b.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();fn();}};
return b;};
pied.appendChild(mk("Annuler","flex:0 0 auto;padding:10px 16px;border-radius:10px;border:1px solid "+P.line+";color:"+P.sub+";font-size:12px;font-weight:600;cursor:pointer;",
function(){_NXLEC.ferme();}));
if(ch.msgs.length)
pied.appendChild(mk("Envoyer ces "+ch.msgs.length+" messages","flex:0 0 auto;padding:10px 16px;border-radius:10px;background:"+P.acc+";color:"+P.ink+";font-size:12px;font-weight:800;cursor:pointer;",
function(){
_NXLEC.pose(ch);
_NXLEC.ferme();
try{_NXIA.demandeIci(I.q+"\n\nAppelle d abord lire_salon : je viens d autoriser la lecture de ce salon.",cid);}catch(_){}}));
card.appendChild(pied);
ov.appendChild(card);
ov.onclick=function(e){if(e.target===ov)_NXLEC.ferme();};
if(document.body)document.body.appendChild(ov);
return true;}catch(_){return false;}};

_NXLEC.etat=function(){try{
return {plafond:_NXLEC.PLAFOND,vie:_NXLEC.VIE,
enAttente:!!(_NXLEC.jeton&&Date.now()<=_NXLEC.jeton.expire),
dernier:_NXLEC.dernier};}catch(_){return {plafond:_NXLEC.PLAFOND};}};
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXLEC");if(window._NXERR)_NXERR.push("module _NXLEC :: "+((_nxE&&_nxE.message)||"erreur"));console.warn("[Nexium] _NXLEC desactive:",_nxE);}catch(_){}}
}
