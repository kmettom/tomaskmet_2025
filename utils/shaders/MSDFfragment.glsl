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

// Utils: Blur
vec3 blur(sampler2D image, vec2 uv, vec2 resolution, float radius) {
    const int samples = 10;
    vec3 color = vec3(0.0);
    vec2 step = radius / resolution;

    for (int i = -samples; i <= samples; ++i) {
        for (int j = -samples; j <= samples; ++j) {
            vec2 offset = vec2(float(i), float(j)) * step;
            color += texture2D(image, uv + offset).rgb;
        }
    }

    return color / float((samples * 2 + 1) * (samples * 2 + 1));
}

void main() {
    // Common
    // Texture sample
    vec3 s = texture2D(uMap, vUv).rgb;

    // Signed distance
    float normalizedX = vUv.x;
    const float DISTANCE_COEF = 0.5;

    // Variable to represent the normalized position across the screen (0 on the left, 1 on the right)

    float sigDist = median(s.r, s.g, s.b) - DISTANCE_COEF - (0.25 * hoverState) - (DISTANCE_COEF * (1.0 - aniIn));
    float alpha = clamp(sigDist / fwidth(sigDist) , 0.0, 1.0);

    // Alpha Test
    if (alpha < uAlphaTest) discard;

    // Some animation
    alpha *= normalizedX  * aniIn;

    // Output: Common
    vec4 filledFragColor = vec4(uColor, uOpacity*alpha*aniIn);
    gl_FragColor = filledFragColor;

}