// Shader de la matière : un seul nuage de points qui passe d'une formation à l'autre.
// Chaque point porte sa position de départ (aFrom) et d'arrivée (aTo) ; uMix, piloté
// par le scroll, décide où il se trouve entre les deux. Rien n'avance tout seul :
// seule une légère respiration (uAmbient) s'ajoute quand le mouvement est permis.
//
// aFrom.w et aTo.w encodent la taille et deux drapeaux :
//   w = taille (0 → 1.5) + 10 si accent vermillon + 20 si point posé sur une lettre.

import { dissolveField, simplex3 } from './noise'

export const matterVertex = /* glsl */ `
attribute vec4 aFrom;
attribute vec4 aTo;
attribute vec4 aSeed;
attribute vec4 aGroup;

uniform float uMix;
uniform float uTime;
uniform float uSpread;
uniform float uFlight;
uniform float uLift;
uniform float uSweep;
uniform vec3 uFromAnchor;
uniform vec3 uToAnchor;
uniform float uGateFrom;
uniform float uGateTo;
uniform float uDissolveFrom;
uniform float uDissolveTo;
uniform vec2 uPointer;
uniform float uPointerStrength;
uniform float uAspect;
uniform float uSize;
uniform float uScale;
uniform float uAmbient;
uniform float uHiTech;
uniform float uHiTechW;
uniform float uHiGraph;
uniform float uHiGraphW;
uniform vec3 uPulseOrigin;
uniform float uPulseAge;
uniform float uFogNear;
uniform float uFogFar;
uniform float uMaxPoint;

varying float vAlpha;
varying float vAccent;
varying float vFog;

${simplex3}
${dissolveField}

void decode(float w, out float size, out float accent, out float surface) {
  surface = step(19.5, w);
  float r = w - surface * 20.0;
  accent = step(9.5, r);
  size = r - accent * 10.0;
}

float isGroup(vec2 g, float id) {
  return id < -0.5 ? 0.0 : max(1.0 - step(0.5, abs(g.x - id)), 1.0 - step(0.5, abs(g.y - id)));
}

void main() {
  float sF, aF, suF, sT, aT, suT;
  decode(aFrom.w, sF, aF, suF);
  decode(aTo.w, sT, aT, suT);

  float fieldF = 0.0;
  float fieldT = 0.0;
  if (uGateFrom > 0.5 || uSweep > 0.5) fieldF = dissolveField(aFrom.xyz - uFromAnchor);
  if (uGateTo > 0.5) fieldT = dissolveField(aTo.xyz - uToAnchor);

  // Chaque point part à son heure : au hasard, ou quand sa lettre se dissout.
  float delay = mix(aSeed.x, fieldF, uSweep);
  float m = clamp(uMix * (1.0 + uSpread) - delay * uSpread, 0.0, 1.0);
  m = m * m * m * (m * (m * 6.0 - 15.0) + 10.0);

  vec3 pos = mix(aFrom.xyz, aTo.xyz, m);

  // En vol, la trajectoire se courbe dans un champ de bruit.
  float fl = sin(3.14159265 * m);
  if (fl > 0.001) {
    vec3 q = pos * 0.11 + aSeed.xyz * 5.0;
    vec3 off = vec3(snoise(q), snoise(q + 17.13), snoise(q + 31.71));
    pos += off * uFlight * fl;
    pos.y += uLift * fl * (0.35 + aSeed.y);
  }

  // Respiration : quelques centièmes d'unité, jamais plus.
  pos += vec3(
    sin(uTime * 0.71 + aSeed.x * 6.2831),
    cos(uTime * 0.53 + aSeed.y * 6.2831),
    sin(uTime * 0.47 + aSeed.z * 6.2831)
  ) * uAmbient * (0.4 + aSeed.w);

  // Onde déclenchée par le survol d'un lien, à la fin du parcours.
  if (uPulseAge >= 0.0 && uPulseAge < 3.0) {
    vec3 dir = pos - uPulseOrigin;
    float pd = length(dir);
    float front = pd - uPulseAge * 11.0;
    float wave = exp(-front * front * 0.6) * exp(-uPulseAge * 1.2);
    pos += dir / max(pd, 0.001) * wave * 0.45;
  }

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vec4 clip = projectionMatrix * mv;

  // Le pointeur écarte la matière, à l'écran, d'une amplitude constante.
  vec2 ndc = clip.xy / max(clip.w, 0.0001);
  vec2 d = (ndc - uPointer) * vec2(uAspect, 1.0);
  float dl = length(d);
  float push = (1.0 - smoothstep(0.0, 0.3, dl)) * uPointerStrength;
  mv.xy += (d / max(dl, 0.001)) * push * 0.05 * -mv.z;
  gl_Position = projectionMatrix * mv;

  float size = mix(sF, sT, m) * uSize * (0.62 + 0.76 * aSeed.w);
  float px = size * uScale / max(-mv.z, 0.05);
  gl_PointSize = clamp(px, 0.0, uMaxPoint);

  float gF = (uGateFrom > 0.5 && suF > 0.5) ? smoothstep(fieldF - 0.035, fieldF, uDissolveFrom) : 1.0;
  float gT = (uGateTo > 0.5 && suT > 0.5) ? smoothstep(fieldT - 0.035, fieldT, uDissolveTo) : 1.0;
  float gate = mix(gF, gT, m);

  float hiT = isGroup(aGroup.xy, uHiTech) * uHiTechW;
  float hiG = isGroup(aGroup.zw, uHiGraph) * uHiGraphW;
  float hi = max(hiT, hiG);
  float dimming = max(uHiTech > -0.5 ? uHiTechW : 0.0, uHiGraph > -0.5 ? uHiGraphW : 0.0);

  vAccent = max(mix(aF, aT, m), hi);
  // Trop près de l'objectif, un point s'efface au lieu de devenir une tache.
  float near = smoothstep(0.35, 2.6, -mv.z);
  vAlpha = gate * near * step(0.0001, size) * clamp(px / 1.4, 0.0, 1.0) * mix(1.0, 0.32, dimming * (1.0 - hi));
  vFog = smoothstep(uFogNear, uFogFar, -mv.z);
}
`

export const matterFragment = /* glsl */ `
uniform vec3 uInk;
uniform vec3 uAccent;
uniform vec3 uFogColor;
uniform float uOpacity;

varying float vAlpha;
varying float vAccent;
varying float vFog;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float r = length(c);
  float a = smoothstep(0.5, 0.34, r) * vAlpha * uOpacity * (1.0 - vFog);
  if (a < 0.01) discard;
  vec3 col = mix(uInk, uAccent, vAccent);
  col = mix(col, uFogColor, vFog * 0.6);
  gl_FragColor = vec4(col, a);
  #include <colorspace_fragment>
}
`
