// Varyings
varying vec2 vUv;

// Uniforms: Common
uniform float uOpacity;
uniform float uThreshold;
uniform float uAlphaTest;
uniform vec3 uColor;
uniform sampler2D uMap;

varying float vNoise;

// Generic uniforms
uniform float time;
uniform float hoverState;
uniform float aniIn;
uniform vec2 viewport;
uniform vec2 uMouse;
uniform float devicePixelRatio;

uniform sampler2D gradientMap;

float DISTANCE_COEF = 0.5;

float WAVE_INTERVAL = 0.1;
float WEVA_APLITUDE = 10.0;

float createWave(vec2 viewportUv) {
  return sin(viewportUv.y * WEVA_APLITUDE + time) * WAVE_INTERVAL;
}

float median(float r, float g, float b) {
  return max(min(r, g), min(max(r, g), b));
}

float createCircle() {
  vec2 viewportUv = gl_FragCoord.xy / viewport / devicePixelRatio;
  float viewportAspect = viewport.x / viewport.y;

  vec2 mousePoint = vec2(uMouse.x, 1.0 - uMouse.y);
//  float wave = sin(viewportUv.y * 10.0 + time) * 2.0;

  float circleRadius = max(0.0, 20.0 / viewport.x) ;

  vec2 shapeUv = viewportUv - mousePoint;
  shapeUv /= vec2(1.0, viewportAspect);
  shapeUv += mousePoint;

  float dist = distance(shapeUv, mousePoint);
  dist = smoothstep(circleRadius, circleRadius + 0.05, dist);
  return dist;
}

float createOverlay() {
  vec2 viewportUv = gl_FragCoord.xy / viewport / devicePixelRatio;
  float wave = createWave(viewportUv);
  float progress = smoothstep(
    aniIn - 1.0 * (1.0 - aniIn),
    aniIn,
    viewportUv.x + wave
  );
  return aniIn == 1.0
    ? 0.0
    : progress;
}

void main() {
  float circle = createCircle();
  float overlay = createOverlay();
  float width = 0.2;
  float lineProgress = 0.3;
  vec3 mySample = texture2D(uMap, vUv).rgb;
  float gr = texture2D(gradientMap, vUv).r;

  float sigDist = median(mySample.r, mySample.g, mySample.b) - DISTANCE_COEF;
  float fill = clamp(sigDist / fwidth(sigDist) + DISTANCE_COEF, 0.0, 1.0);

  //stroke
  float border = fwidth(sigDist);
  float outline = smoothstep(0.0, border, sigDist);
  outline *= smoothstep(width - border, width, sigDist);

  float finalAlpha = fill * (1.0 - overlay) * circle;

  gl_FragColor = vec4(uColor, finalAlpha);
  if (finalAlpha < uAlphaTest) discard;
}

//  //gradient
//  float grgr = fract(3.0 * gr + time / 5.0);
//  float start = smoothstep(0.0, 0.01, grgr);
//  float end = smoothstep(lineProgress, lineProgress - 0.01, grgr);
//  float mask = start * end;
//  mask = max(0.2, mask);

