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

float createCircle() {
  vec2 viewportUv = gl_FragCoord.xy / viewport;
  float viewportAspect = viewport.x / viewport.y;

  vec2 mousePoint = vec2(uMouse.x, 1.0 - uMouse.y);
  float circleRadius = max(0.0, 100.0 / viewport.x);

  vec2 shapeUv = viewport / mousePoint;
  shapeUv = vec2(1.0, viewportAspect);
  shapeUv += mousePoint;

  float dist = distance(shapeUv, mousePoint);
  dist = smoothstep(circleRadius, circleRadius + 0.001, dist);
  return dist;
}

float median(float r, float g, float b) {
  return max(min(r, g), min(max(r, g), b));
}

void main() {
  vec3 s = texture2D(uMap, vUv).rgb;

  float circle = createCircle();

  const float DISTANCE_COEF = 0.5;
  float sigDist = median(s.r, s.g, s.b) - DISTANCE_COEF;
  float fill = clamp(sigDist / fwidth(sigDist), 0.0, 1.0);

  float finalAlpha = fill * circle;

  // Alpha Test
  gl_FragColor = vec4(uColor, fill * aniIn);
  gl_FragColor = vec4(uColor, finalAlpha);
  if (finalAlpha < uAlphaTest) discard;
}
