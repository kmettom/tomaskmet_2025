// Varyings
varying vec2 vUv;

// Uniforms: Common
uniform float uThreshold;
uniform float uAlphaTest;
uniform vec3 uColor;
uniform sampler2D uMap;

varying float vNoise;

// Generic uniforms
uniform float time;
uniform float uHover;
uniform float uAniIn;
uniform vec2 viewport;
uniform vec2 uMouse;
uniform vec2 uMouseMovement;
uniform float devicePixelRatio;

uniform sampler2D gradientMap;

float DISTANCE_COEF = 0.5;

float median(float r, float g, float b) {
  return max(min(r, g), min(max(r, g), b));
}

void main() {
  vec3 mySample = texture2D(uMap, vUv).rgb;

  float sigDist = median(mySample.r, mySample.g, mySample.b) - DISTANCE_COEF;
  float fill = clamp(sigDist / fwidth(sigDist) + DISTANCE_COEF, 0.0, 1.0);

  float finalAlpha = fill * uAniIn;

  gl_FragColor = vec4(uColor, finalAlpha);
  if (finalAlpha < uAlphaTest) discard;
}
