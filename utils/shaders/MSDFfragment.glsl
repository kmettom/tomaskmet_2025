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
uniform vec2 uMouseMovement;
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

  vec2 shapeUv = viewportUv - mousePoint;
  //TODO: add uMouseMovement
  shapeUv /= vec2(1.0, viewportAspect);
  shapeUv += mousePoint;
  float dist = distance(shapeUv, mousePoint);


//  vec2 randomCoefficients = vec2(13.0, 80.);
//  float randomMultiplier = 100.;
//  float wave = createWave(vUv);
//  float randomValue = fract(sin(dot(gl_FragCoord.xy + time + wave, randomCoefficients)) * randomMultiplier);
//  float randomSmooth = smoothstep(randomValue , randomValue * wave , dist);

//  float circleRadius = max(0.0, 10/ viewport.x);
  float circleRadius = max(0.0, 20.0 / viewport.x);

//  circleRadius = smoothstep(circleRadius, circleRadius, 0.1);


  dist = smoothstep(circleRadius, circleRadius + 0.05, dist);
  return dist;
}

float createOverlay() {
  vec2 viewportUv = gl_FragCoord.xy / viewport / devicePixelRatio;
  float wave = createWave(viewportUv);
  float leftPadding = 0.1;
  float progress = smoothstep(
    aniIn - 1.0 * (1.0 - aniIn),
    aniIn,
    viewportUv.x - vUv.x + leftPadding + wave
  );
  return progress;
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

