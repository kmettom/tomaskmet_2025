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
uniform float uAniInText;
uniform float uDevicePixelRatio;
uniform vec2 uViewport;
uniform vec2 uMouse;
uniform vec2 uMouseMovement;
uniform vec2 uFooterGameBall;
uniform vec2 uMeshSize;
uniform float devicePixelRatio;

uniform sampler2D gradientMap;

float DISTANCE_COEF = 0.5;
float uBlurStrength;

float median(float r, float g, float b) {
  return max(min(r, g), min(max(r, g), b));
}

float createCircleTrail(float radius, vec2 mousePoint) {
  vec2 viewportUv = gl_FragCoord.xy / uViewport / uDevicePixelRatio;
  float viewportAspect = uViewport.x / uViewport.y;

  vec2 shapeUvTrail = viewportUv - mousePoint;
  shapeUvTrail /= vec2(1.0, viewportAspect);
  shapeUvTrail += mousePoint;
  float distTail = distance(shapeUvTrail, mousePoint);

  float circleRadius = max(0.0, radius / uViewport.x);
  float dist = smoothstep(circleRadius, circleRadius + 0.05, distTail);
  return dist;
}

float createOverlay(float activeOverlay) {
  vec2 viewportUv =
    gl_FragCoord.xy / uViewport * uDevicePixelRatio * (1.0 - activeOverlay);
  float progress = smoothstep(
    activeOverlay,
    activeOverlay - 1.0,
    viewportUv.x - vUv.x
  );
  return progress;
}

void main() {
  vec2 mousePoint = vec2(uMouse.x, 1.0 - uMouse.y);
  vec2 ballPoint = vec2(uFooterGameBall.x, 1.0 - uFooterGameBall.y);

  float circleTrail = createCircleTrail(1.0, mousePoint);
  float ballTrail = createCircleTrail(10.0, ballPoint);

  //  vec2 mouseMovePoint = uMouse - ( uMouseMovement * 5.0);
  //  vec2 mousePos = vec2(mouseMovePoint.x , 1.0 - mouseMovePoint.y);
  //  float rawCircleTrail = createCircleTrail(1.0, mousePos);
  //  float circleTrail = smoothstep(0.0, 1.0, rawCircleTrail);

  float overlayOpacity = createOverlay(uAniInText);
  vec2 newUv = vUv;

  vec3 mySample = texture2D(uMap, newUv).rgb;
  vec3 mySampleRGB = mySample.rgb;

  float aniInDistance = mix(0.5, 1.0, uAniInText * overlayOpacity);

  float sigDist =
    median(mySampleRGB.r, mySampleRGB.g, mySampleRGB.b) -
    DISTANCE_COEF / aniInDistance / circleTrail / ballTrail;
  float fill = clamp(sigDist / fwidth(sigDist) + DISTANCE_COEF, 0.0, 1.0);

  float finalAlpha = fill * overlayOpacity * circleTrail * ballTrail;

  gl_FragColor = vec4(uColor, finalAlpha);
  if (finalAlpha < uAlphaTest) discard;
}
