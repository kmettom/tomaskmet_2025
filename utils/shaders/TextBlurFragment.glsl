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
uniform vec2 uMousePrev;
uniform vec2 uMouseMovement;
uniform vec2 uMeshSize;
uniform float devicePixelRatio;

uniform sampler2D gradientMap;

float DISTANCE_COEF = 0.5;
float uBlurStrength;

float median(float r, float g, float b) {
  return max(min(r, g), min(max(r, g), b));
}

float createCircleTrail(float radius) {
  vec2 viewportUv = gl_FragCoord.xy / uViewport / uDevicePixelRatio;
  float viewportAspect = uViewport.x / uViewport.y;

  //  vec2 mousePoint = vec2(uMouse.x, 1.0 - uMouse.y);
  vec2 mousePointTrail = vec2(uMousePrev.x, 1.0 - uMousePrev.y);

  vec2 shapeUvTrail = viewportUv - mousePointTrail;
  shapeUvTrail /= vec2(1.0, viewportAspect);
  shapeUvTrail += mousePointTrail;
  float distTail = distance(shapeUvTrail, mousePointTrail);

  //  float circleRadius = max(0.0, radius / uViewport.x);
  float circleRadiusTail = max(0.0, radius / uViewport.x);

  //  return max(circleHead, circleTrail * (1.0 - tailLength));
  float dist = smoothstep(circleRadiusTail, circleRadiusTail + 0.05, distTail);
  //    dist += smoothstep(circleRadius, circleRadius + 0.05, distHead);
  return dist;
}

float createOverlay(float activeOverlay) {
  vec2 viewportUv =
    gl_FragCoord.xy / uViewport * uDevicePixelRatio * (1.0 - activeOverlay);
  float progress = smoothstep(
    activeOverlay, // 0 1
    activeOverlay - 1.0, // 0 1
    viewportUv.x - vUv.x
  );
  return progress;
}

void main() {
  //  vec2 gridUV = floor(vUv *vec2(40.0,40.0))/ vec2(40.0,40.0);
  //  vec2 centerOfPixel = gridUV + vec2(1.0/40.0,1.0/40.0);
  //
  //  vec2 mouseDirection = uMouse - uMousePrev;
  //
  //  vec2 pixelToMouseDirection = centerOfPixel - uMouse;
  //  float pixelDistanceToMouse = length(pixelToMouseDirection);
  //  float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);
  //
  //  vec2 uvOffset = strength * -mouseDirection *0.3;
  //  vec2 uv = vUv - uvOffset;

  //  vec4 color = texture2D()

  float overlayOpacity = createOverlay(uAniIn);
  float circleTrail = createCircleTrail(10.0);

  vec3 mySample = texture2D(uMap, vUv).rgb;

  float sigDist = median(mySample.r, mySample.g, mySample.b) - DISTANCE_COEF;
  float fill = clamp(sigDist / fwidth(sigDist) + DISTANCE_COEF, 0.0, 1.0);

  //  float finalAlpha = fill * overlayOpacity * circleTrail;
  float finalAlpha = fill * overlayOpacity;

  gl_FragColor = vec4(uColor, finalAlpha);
  if (finalAlpha < uAlphaTest) discard;
}
