// Varyings
varying vec2 vUv;

// Uniforms: Common
uniform float uOpacity;
uniform float uThreshold;
uniform float uAlphaTest;
uniform vec3 uColor;
uniform sampler2D uMap;

// Uniforms: Strokes
uniform vec3 uStrokeColor;
uniform float uStrokeOutsetWidth;
uniform float uStrokeInsetWidth;

// Uniforms: Blur
uniform float uBlurIntensity;
uniform vec2 uResolution;

// Generic uniforms
uniform float time;
uniform float hoverState;
uniform float aniIn;

// Utils: Median
float median(float r, float g, float b) {
  return max(min(r, g), min(max(r, g), b));
}

void main() {
  // Common
  // Texture sample
  vec3 s = texture2D(uMap, vUv).rgb;

  // Signed distance
  float normalizedX = vUv.x;
  const float DISTANCE_COEF = 0.5;

  // Variable to represent the normalized position across the screen (0 on the left, 1 on the right)

  float sigDist = median(s.r, s.g, s.b) - DISTANCE_COEF;
  float alpha = clamp(sigDist / fwidth(sigDist), 0.0, 1.0) * (1.0-hoverState);

  // Alpha Test
  if (alpha < uAlphaTest) discard;

  // Some animation
  //   alpha = alpha * normalizedX;

  // Output: Common
  vec4 filledFragColor = vec4(uColor, uOpacity * alpha * aniIn);
  gl_FragColor = filledFragColor;

}
