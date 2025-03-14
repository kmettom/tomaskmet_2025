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
  vec2 mousePointTrail = vec2(uMouse.x, 1.0 - uMouse.y);

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
    activeOverlay,
    activeOverlay - 1.0,
    viewportUv.x - vUv.x
  );
  return progress;
}

void main() {
  float overlayOpacity = createOverlay(uAniInText);
  float circleTrail = createCircleTrail(1.0);
  vec2 newUv = vUv;

  vec3 mySample = texture2D(uMap, newUv).rgb;
  vec3 mySampleRGB = mySample.rgb;

  float aniInDistance = mix(0.5, 1.0, uAniInText * overlayOpacity);

  float sigDist =
    median(mySampleRGB.r, mySampleRGB.g, mySampleRGB.b) -
    DISTANCE_COEF / aniInDistance / circleTrail;
  float fill = clamp(sigDist / fwidth(sigDist) + DISTANCE_COEF, 0.0, 1.0);

  float finalAlpha = fill * overlayOpacity * circleTrail;

  gl_FragColor = vec4(uColor, finalAlpha);
  if (finalAlpha < uAlphaTest) discard;
}
