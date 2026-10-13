var _NXQ=window._NXQ||(window._NXQ={});
if(!_NXQ.boot){try{_NXQ.boot=true;
// L arbitre des ecrans pleins.
//
// Il ne decide pas quoi montrer : il dit seulement si la place est prise.
// Chaque module garde sa propre logique de declenchement et ajoute une
// ligne -- "si ce n est pas libre, je repasse plus tard".
_NXQ.VOILES=["nx-boot","nx-accueil","nx-newgen","nx-annonce",
"nx-version-screen","nx-fete","nx-maj"];
_NXQ.pris=null;
_NXQ.prisA=0;
// Un voile est-il affiche ? On regarde le document, pas un drapeau : un
// module qui plante en cours de route ne doit pas bloquer les autres pour
// toujours.
_NXQ.affiche=function(){try{
for(var a=0;a<_NXQ.VOILES.length;a++)
if(document.getElementById(_NXQ.VOILES[a]))return _NXQ.VOILES[a];
return null;}catch(_){return null;}};
// Un repos apres la fermeture d un voile : deux ecrans qui se succedent sans
// respirer se lisent comme un seul ecran qui clignote.
_NXQ.REPOS=2500;
_NXQ.libre=function(){try{
if(_NXQ.affiche())return false;
if(_NXQ.prisA&&(Date.now()-_NXQ.prisA)<_NXQ.REPOS)return false;
return true;}catch(_){return true;}};
// Retenir la place. Le nom ne sert qu au journal : c est le document qui
// fait foi.
_NXQ.reserve=function(nom){try{
if(!_NXQ.libre())return false;
_NXQ.pris=nom||"?";_NXQ.prisA=Date.now();
return true;}catch(_){return true;}};
// A la premiere ouverture, on ne raconte pas le passe.
_NXQ.KEY="nexium_q_installe";
_NXQ.premiereFois=function(){try{
return _NXDB.get(_NXQ.KEY)!=="1";}catch(_){return false;}};
_NXQ.marquePasse=function(){try{
if(!_NXQ.premiereFois())return false;
_NXDB.set(_NXQ.KEY,"1");
// Tout ce qui raconte une version anterieure est considere comme lu : la
// personne vient de tout recevoir d un coup, elle n a rien manque.
try{if(window._NXNG&&_NXNG.KEY)_NXDB.set(_NXNG.KEY,"1");}catch(_){}
try{if(window._NXANN&&_NXANN.KEY&&_NXANN.VER)_NXDB.set(_NXANN.KEY,_NXANN.VER);}catch(_){}
return true;}catch(_){return false;}};
}catch(_nxE){try{window._NXFAIL=window._NXFAIL||[];_NXFAIL.push("_NXQ");
if(window._NXERR)_NXERR.push("module _NXQ :: "+((_nxE&&_nxE.message)||"erreur"));}catch(_){}}
}
var _NXPALD={bg:"#08080a",panel:"#0b0b0c",inset:"#0e0e10",raise:"#141416",line:"#161618",hair:"#212125",edge:"#2a2a30",faint:"#34343a",mute:"#4a4a52",dim:"#5b5b63",soft:"#6c6c74",sub:"#8a8a92",mid:"#a6a6ac",pale:"#c9c9d2",txt:"#f4f4f5",acc:"#e8e8ea",ink:"#0a0a0a",ok:"#8fd19e",okSoft:"#a9cdb4",warn:"#e6c48a",warnSoft:"#d8d2a8",danger:"#e79a9a",dangerSoft:"#d6aeae",red:"#d6484a",info:"#8fb4ea",mauve:"#c7a2ee",cyan:"#7fd3c4",lime:"#c3d98a",rose:"#e9a3c1",light:false};
var _NXPALL={bg:"#f2f3f5",panel:"#ffffff",inset:"#f6f6f7",raise:"#eceef1",line:"#e3e5e8",hair:"#dcdee1",edge:"#cfcfd2",faint:"#b5bac1",mute:"#9a9aa0",dim:"#6d6f78",soft:"#5a5a60",sub:"#4e5058",mid:"#42424a",pale:"#2a2a30",txt:"#111214",acc:"#1a1a1e",ink:"#ffffff",ok:"#248046",okSoft:"#5a6a5e",warn:"#8a6a2a",warnSoft:"#6a6650",danger:"#9a3a3a",dangerSoft:"#6a5050",red:"#d6484a",info:"#2f5aa8",mauve:"#6a3fa0",cyan:"#1f7a6a",lime:"#5a6f22",rose:"#9a3f6a",light:true};
var _NXisLight=function(){try{
var el=document.documentElement,bd=document.body;
var cn=((el&&el.className)||"")+" "+((bd&&bd.className)||"");
if(/theme-light/.test(cn))return true;
if(/theme-dark|theme-darker|theme-midnight/.test(cn))return false;
try{var v=getComputedStyle(el).getPropertyValue("--background-primary")||"";v=v.trim();
if(/^#/.test(v)){var n=parseInt(v.slice(1,7),16);if(!isNaN(n)){var r=(n>>16)&255,g=(n>>8)&255,b=n&255;return (r*299+g*587+b*114)/1000>140;}}}catch(_){}
}catch(_){}return false;};
var _NXreadVar=function(cs,name,fb){try{var v=cs.getPropertyValue(name);if(v){v=v.trim();if(v)return v;}}catch(_){}return fb;};
var _NXthemeVars=function(base){try{
if(typeof getComputedStyle!=="function"||!document.documentElement)return base;
var cs=getComputedStyle(document.documentElement);
var o={};for(var k in base)o[k]=base[k];
o.txt=_NXreadVar(cs,"--header-primary",base.txt);
o.sub=_NXreadVar(cs,"--text-muted",base.sub);
o.dim=_NXreadVar(cs,"--interactive-normal",base.dim);
o.faint=_NXreadVar(cs,"--interactive-muted",base.faint);
o.line=_NXreadVar(cs,"--background-modifier-accent",base.line);
o.hair=_NXreadVar(cs,"--background-modifier-hover",base.hair);
o.panel=_NXreadVar(cs,"--background-secondary",base.panel);
o.inset=_NXreadVar(cs,"--background-secondary-alt",_NXreadVar(cs,"--background-tertiary",base.inset));
return o;}catch(_){return base;}};
var _NXsyncPal=function(force){try{
var base=_NXisLight()?_NXPALL:_NXPALD;
var want=_NXthemeVars(base);
var sig=want.txt+"|"+want.panel+"|"+want.inset+"|"+want.line+"|"+base.light;
if(!force&&_NXpal._sig===sig)return false;
_NXpal._sig=sig;
for(var k in want)_NXpal[k]=want[k];
_NXpal.light=base.light;
try{if(window._NXthemeCB)for(var a=0;a<_NXthemeCB.length;a++)_NXthemeCB[a]();}catch(_){}
try{var MM=["_NXM","_NXS","_NXP","_NXNET","_NXCL","_NXUP","_NXLY","_NXPR","_NXSP"];for(var b=0;b<MM.length;b++){var mo=window[MM[b]];if(mo&&mo.notify)mo.notify();}}catch(_){}
return true;}catch(_){return false;}};
