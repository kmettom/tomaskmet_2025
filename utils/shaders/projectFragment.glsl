varying float vNoise;
varying vec2 vUv;
uniform sampler2D uImage;

// https://gl-transitions.com/editor/perlin

uniform float time;
uniform float uHover;
uniform float uAniIn;
uniform float uImageGallery;
uniform float uImageGalleryActive;

uniform float scale; // = 4.0
uniform float smoothness; // = 0.01
uniform float seed; // = 12.9898

//TODO: xxxyyy new tests for center and overflow of image
uniform vec2 uMeshSize; // The size of the mesh (width, height)
uniform vec2 uTextureSize; // The size of the texture (width, height)

float random(vec2 co) {
  highp float a = 12.9;
  highp float b = 78.233;
  highp float c = 43758.5453;
  highp float dt = dot(co.xy, vec2(a, b));
  highp float sn = mod(dt, 3.14);
  return fract(sin(sn) * c);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  // Four corners in 2D of a tile
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  // Smooth Interpolation

  // Cubic Hermine Curve.  Same as SmoothStep()
  vec2 u = f * f * (3.0 - 2.0 * f);
  u = smoothstep(0.0, 1.0, f);

  // Mix 4 coorners porcentages
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

vec4 transition(vec2 uv) {
  vec4 from = texture2D(uImage, uv) * vec4(1.0, 1.0, 1.0, 1.0 * uAniIn);
  vec4 to = texture2D(uImage, uv) * vec4(1.0, 1.0, 1.0, 1.0);
  float n = noise(uv * 4.0);

  float smoothness = 0.01;

  float p = mix(-smoothness, 1.0 + smoothness, uAniIn - uHover);
  //  float p = mix(-smoothness, 1.0 + smoothness, 1.0 - uHover);
  float lower = p - smoothness;
  float higher = p + smoothness;

  float q = smoothstep(lower, higher, n);

  return mix(from, to, 1.0 - q);
}

//void main() {
//  gl_FragColor = transition(vUv);
//  gl_FragColor.rgb += 0.01 * vec3(vNoise);
//
//}

void main() {
  // Calculate the aspect ratios
  float meshAspect = uMeshSize.x / uMeshSize.y;
  float textureAspect = uTextureSize.x / uTextureSize.y;

  // Adjust UV coordinates to maintain aspect ratio
  vec2 uv = vUv;
  if (meshAspect > textureAspect) {
    // Mesh is wider than the texture
    float scale = textureAspect / meshAspect;
    uv.y = uv.y * scale + (1.0 - scale) / 2.0; // Center the texture vertically
  } else {
    // Mesh is taller than the texture
    float scale = meshAspect / textureAspect;
    uv.x = uv.x * scale + (1.0 - scale) / 2.0; // Center the texture horizontally
  }

  gl_FragColor = transition(uv);
  gl_FragColor.rgb += 0.01 * vec3(vNoise);

}
