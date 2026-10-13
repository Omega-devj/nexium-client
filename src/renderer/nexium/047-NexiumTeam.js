var NexiumTeamIcon=function(p){p=p||{};var z=p.width||p.height||20;return (window._NXFX&&_NXFX.svg)?_NXFX.svg("equipe",z):null;};
function _NXthemeWrap(Orig){try{
if(!Orig)return Orig;
if(Orig.__nxwrapped)return Orig;
var W=function(props){
var inner=null;
try{inner=i(Orig,props);}catch(_){inner=null;}
var pick=null;
try{pick=i(_NXsafe(NexiumBgPicker,"Couleur des paramètres"),null);}catch(_){pick=null;}
var head=null;
try{head=i(_NXsafe(NexiumThemeHeader,"Apparence"),null);}catch(_){head=null;}
return i("div",null,_NXtr(head),i("div",{style:{marginTop:"6px"}},_NXtr(inner)),_NXtr(pick));};
W.__nxwrapped=true;
return W;}catch(_){return Orig;}}
var NX_PRESETS=[
{k:"encre",n:"Encre",d:"Le noir profond d origine, sans concession.",
c:{variante:"encre",accent:"ivoire",police:"grotesque",coins:"doux",intensite:"affirmee",sobre:false},
p:["#08080a","#0e0e10","#e8e8ea"]},
{k:"graphite",n:"Graphite",d:"Un gris chaud, plus doux pour les longues sessions.",
c:{variante:"graphite",accent:"cendre",police:"defaut",coins:"arrondi",intensite:"discrete",sobre:false},
p:["#17171a","#1e1e22","#c9c9cf"]},
{k:"braise",n:"Braise",d:"Fond sombre, accent chaud. Le plus affirme.",
c:{variante:"encre",accent:"braise",police:"grotesque",coins:"net",intensite:"totale",sobre:true},
p:["#08080a","#1a0f0c","#d97a4a"]},
{k:"papier",n:"Papier",d:"Un theme clair, editorial, pour travailler en plein jour.",
c:{variante:"papier",accent:"cendre",police:"editoriale",coins:"doux",intensite:"discrete",sobre:false},
p:["#f2f3f5","#ffffff","#4e5058"]},
{k:"origine",n:"Discord d origine",d:"Nexium se retire completement.",
c:{variante:"encre",accent:"discord",police:"defaut",coins:"arrondi",intensite:"discrete",sobre:false},
p:["#313338","#2b2d31","#dbdee1"]}];
