// Varyings
varying vec2 vUv;

// Uniforms: Common
 float uOpacity = 0.5;
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

////**********************************
float uBlurAmount = 1.0; // New uniform for controlling blur strength

// Pre-computed Gaussian weights for a 5-tap kernel
float weights[5] = float[](
0.20755374, 0.18915723, 0.14689464, 0.09754491, 0.05540637
);


float DISTANCE_COEF = 0.5;


float median(float r, float g, float b) {
  return max(min(r, g), min(max(r, g), b));
}

void main() {
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

  float finalAlpha = fill * uAniIn;

  gl_FragColor = vec4(uColor, finalAlpha);
  if (finalAlpha < uAlphaTest) discard;
}


// Function to apply Gaussian blur in a given direction
vec4 applyGaussianBlur(sampler2D tex, vec2 uv, vec2 direction) {
  vec4 color = texture(tex, uv) * weights[0];

  // Blur radius scales with uBlurAmount
  float pixelStep = uBlurAmount / 100.0;

  // Two-sided blur using weights
  for (int i = 1; i < 5; i++) {
    vec2 offset = direction * float(i) * pixelStep;
    color += texture(tex, uv + offset) * weights[i];
    color += texture(tex, uv - offset) * weights[i];
  }

  return color;
}

//void main() {
//  // Apply horizontal and vertical blur
//  vec4 blurredH = applyGaussianBlur(uMap, vUv, vec2(1.0, 0.0));
//  vec4 blurredV = applyGaussianBlur(uMap, vUv, vec2(0.0, 1.0));
//
//  // Combine horizontal and vertical blur
//  vec4 blurred = (blurredH + blurredV) * 0.5;
//
//  // Calculate signed distance using the blurred texture
//  float sigDist = median(blurred.r, blurred.g, blurred.b) - 0.5;
//  float fill = clamp(sigDist / fwidth(sigDist) + 0.5, 0.0, 1.0);
//
//  // Apply threshold and alpha test
//  float finalAlpha = fill * uOpacity;
//  if (finalAlpha < uAlphaTest) discard;
//
//
//    gl_FragColor = vec4(uColor, finalAlpha);
////    if (finalAlpha < uAlphaTest) discard;
////  outColor = vec4(uColor, finalAlpha);
//}

