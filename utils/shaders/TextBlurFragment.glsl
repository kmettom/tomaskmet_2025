// Varyings
varying vec2 vUv;

// Uniforms: Common
uniform float uThreshold;
uniform float uAlphaTest;
uniform vec3 uColor;
uniform sampler2D uMap;

varying float vNoise;

// Generic uniforms
uniform float uTime;
uniform float uHover;
uniform float uAniIn;
uniform float uAniInBlur;
uniform float uDevicePixelRatio;
uniform vec2 uViewport;
uniform vec2 uMouse;
uniform vec2 uMouseMovement;
uniform vec2 uMeshSize;
uniform float devicePixelRatio;

uniform sampler2D gradientMap;

float DISTANCE_COEF = 0.5;
float uBlurStrength;


float median(float r, float g, float b) {
  return max(min(r, g), min(max(r, g), b));
}

float createCircle(float radius) {
  vec2 viewportUv = gl_FragCoord.xy / uViewport / uDevicePixelRatio;
  float viewportAspect = uViewport.x / uViewport.y;

  vec2 mousePoint = vec2(uMouse.x, 1.0 - uMouse.y);

  vec2 shapeUv = viewportUv - mousePoint;
  shapeUv /= vec2(1.0, viewportAspect);
  shapeUv += mousePoint;
  float dist = distance(shapeUv, mousePoint);

  float circleRadius = max(0.0, radius / uViewport.x);

  dist = smoothstep(circleRadius, circleRadius + 0.05, dist);
  return dist;
}

float createOverlayBlur(float activeOverlay) {
  vec2 viewportUv = gl_FragCoord.xy / uViewport / uDevicePixelRatio;
  float progress = smoothstep(
    activeOverlay - 1.0, // -1 0
    activeOverlay, // 0 1
    viewportUv.y - vUv.y
  );
  return progress;
}

float createOverlayOpacity(float activeOverlay) {
//  vec2 viewportUv =
//     uViewport * uDevicePixelRatio * (1.0 - activeOverlay);
  float progress = smoothstep(
    activeOverlay,
    activeOverlay - 1.0,
    -uViewport.y
  );
  return progress;
}

void main() {
  float overlayOpacity = createOverlayOpacity(uHover);
  float circle = createCircle(20.0);

//  uBlurStrength =
//  1.0 * circle * (overlayOpacity * uAniInBlur) ;

  vec3 mySample = texture2D(uMap, vUv).rgb;

  float sigDist = median(mySample.r, mySample.g, mySample.b) - DISTANCE_COEF;
  float fill = clamp(sigDist / fwidth(sigDist) + DISTANCE_COEF, 0.0, 1.0);

  float finalAlpha = fill * uAniIn * overlayOpacity * circle;

  gl_FragColor = vec4(uColor, finalAlpha);
  if (finalAlpha < uAlphaTest) discard;
}
