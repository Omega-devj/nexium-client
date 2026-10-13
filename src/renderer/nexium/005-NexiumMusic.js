var NexiumMusicIcon=function(p){p=p||{};var z=p.width||p.height||20;return (window._NXFX&&_NXFX.svg)?_NXFX.svg("casque",z):null;};
var _NXBoundary=null;
try{if(typeof F!=="undefined"&&F&&F.Component){
_NXBoundary=function(p){F.Component.call(this,p);this.state={err:false,msg:""};};
_NXBoundary.prototype=Object.create(F.Component.prototype);
_NXBoundary.prototype.constructor=_NXBoundary;
_NXBoundary.getDerivedStateFromError=function(e){return {err:true,msg:(e&&(e.message||String(e)))||"erreur inconnue"};};
_NXBoundary.prototype.componentDidCatch=function(e){try{var nm=(this.props&&this.props.nm)||"Nexium";var det=nm+" :: "+((e&&(e.message||String(e)))||"?")+" | "+(((e&&e.stack)||"").split("\n").slice(0,5).join(" | "));this._det=det;if(window._NXERR){_NXERR.push(det);if(_NXERR.length>20)_NXERR.shift();}console.warn("[Nexium] section indisponible:",nm,e);}catch(_){}};
_NXBoundary.prototype.render=function(){try{
if(this.state&&this.state.err){var self=this;var P=_NXpal;
return i("div",{style:{padding:"26px",maxWidth:"640px",margin:"0 auto"}},
i("div",{style:{background:"linear-gradient(168deg,#141013,#0a0a0b)",border:"1px solid #3a2626",borderRadius:"18px",padding:"22px"}},
i("div",{style:{display:"flex",alignItems:"center",gap:"11px",marginBottom:"12px"}},
i("div",{style:{width:"34px",height:"34px",borderRadius:"11px",background:"rgba(214,72,72,.15)",border:"1px solid rgba(214,72,72,.3)",display:"flex",alignItems:"center",justifyContent:"center",color:_NXpal.danger,fontWeight:"800",flexShrink:0}},"!"),
i("div",null,i("div",{style:{fontSize:"10px",fontWeight:"800",letterSpacing:".16em",textTransform:"uppercase",color:P.faint}},_NXtr("Section indisponible")),i("div",{style:{fontSize:"17px",fontWeight:"800",color:P.txt}},(this.props&&_NXtr(this.props.nm))||_NXtr("Nexium")))),
i("div",{style:{fontSize:"12.5px",color:P.sub,lineHeight:1.6,marginBottom:"12px"}},_NXtr("Cette page a rencontre une erreur. Le reste du client fonctionne normalement.")),
i("div",{style:{fontSize:"11px",color:P.dim,fontFamily:_NXf.mono,background:_NXpal.panel,border:"1px solid "+P.line,borderRadius:"9px",padding:"10px 12px",marginBottom:"14px",wordBreak:"break-word"}},String(this.state.msg||"").slice(0,300)),
i("div",{style:{display:"flex",gap:"9px",flexWrap:"wrap"}},
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,onClick:function(){try{self.setState({err:false,msg:""});}catch(_){}},style:{flex:1,minWidth:"120px",textAlign:"center",padding:"11px",borderRadius:"10px",background:P.acc,color:_NXpal.ink,fontSize:"13px",fontWeight:"800",cursor:"pointer"}},_NXtr("Reessayer")),
i("div",{className:"nx-fx",role:"button",tabIndex:0,onKeyDown:_NXkey,onClick:function(){try{DiscordNative.clipboard.copy(self._det||self.state.msg||"");}catch(_){}},style:{flex:1,minWidth:"120px",textAlign:"center",padding:"11px",borderRadius:"10px",background:"transparent",border:"1px solid "+P.line,color:P.sub,fontSize:"13px",fontWeight:"700",cursor:"pointer"}},_NXtr("Copier le detail")))));}
return this.props?this.props.children:null;}catch(_){return null;}};
}}catch(_){}
var _NXsafe=function(Comp,nm){try{if(!_NXBoundary||typeof Comp!=="function")return Comp;return function(p){try{return i(_NXBoundary,{nm:nm},i(Comp,p));}catch(_){return null;}};}catch(_){return Comp;}};
// La position de lecture vit a part : c est le seul affichage qui bouge
// quatre fois par seconde, et il ne doit pas entrainer toute la page avec lui.
