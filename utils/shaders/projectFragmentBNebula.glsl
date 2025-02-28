varying float vNoise;
varying vec2 vUv;
uniform sampler2D uImage;

uniform float time;
uniform float uHover;
uniform float uAniIn;
uniform float uImageGallery;
uniform float uImageGalleryActive;

uniform float scale; // = 4.0
uniform float smoothness; // = 0.01
uniform float seed; // = 12.9898

uniform vec2 uMeshSize; // The size of the mesh (width, height)
uniform vec2 uTextureSize; // The size of the texture (width, height)

// Hash function for 2D coordinates
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

// 2D Noise function
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Fractal Brownian Motion for rich noise detail
float fbm(vec2 p) {
  float f = 0.0;
  float w = 0.5;
  for (int i = 0; i < 5; i++) {
    f += w * noise(p);
    p *= 2.0;
    w *= 0.5;
  }
  return f;
}

//void main() {
//  // Normalize coordinates to [-1,1] and preserve aspect ratio
////  vec2 uv = gl_fragCoord.xy / uMeshSize.xy * 2.0 - 1.0;
////  uv.x *= uMeshSize.x / uMeshSize.y;


//  vec2 uv = vUv;
//
//  // Time factor for animation
//  float t = time * 0.2;
//
//  // Convert to polar coordinates
//  float angle = atan(uv.y, uv.x);
//  float radius = length(uv);
//
//  // Apply a swirling distortion using fractal noise
//  angle += fbm(uv * 3.0 + t);
//  vec2 swirled = vec2(cos(angle), sin(angle)) * radius;
//
//  // Compute fractal noise pattern for the nebula texture
//  float n = fbm(swirled * 2.0 + vec2(t, t));
//
//  // Create a blooming nebula effect using smooth thresholding
//  float nebula = smoothstep(0.3, 0.6, n);
//
//  // Define a rich, cosmic color palette
//  vec3 col1 = vec3(0.1, 0.0, 0.3); // deep cosmic purple
//  vec3 col2 = vec3(0.8, 0.3, 0.9); // vibrant magenta
//  vec3 col3 = vec3(0.0, 0.7, 0.9); // cool turquoise
//
//  // Blend colors based on the noise value
//  vec3 color = mix(col1, col2, n);
//  color = mix(color, col3, smoothstep(0.2, 0.4, n));
//
//  // Enhance vibrancy with gamma correction
//  color = pow(color, vec3(1.5));
//
//  // Final color output modulated by the nebula bloom effect
//  gl_fragColor = vec4(color * nebula, 1.0);
////  gl_fragColor = vUv;
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

    float t = time * 0.12;
    // Convert to polar coordinates
    float angle = atan(uv.y, uv.x);
    float radius = length(uv);
    // Apply a swirling distortion using fractal noise
    angle += fbm(uv * 3.0 + t);
    vec2 swirled = vec2(cos(angle), sin(angle)) * radius;
    // Compute fractal noise pattern for the nebula texture
  // Sample the texture using the provided texture coordinates
  vec4 texColor = texture2D(uImage, swirled);


//  float n = fbm(swirled * 2.0 + vec2(t, t));
//  float nebula = smoothstep(0.3, 0.6, n);
//    // Define a rich, cosmic color palette
//    vec3 col1 = vec3(0.1, 0.0, 0.3); // deep cosmic purple
//    vec3 col2 = vec3(0.8, 0.3, 0.9); // vibrant magenta
//    vec3 col3 = vec3(0.0, 0.7, 0.9); // cool turquoise
//
//    // Blend colors based on the noise value
//    vec4 color = mix(col1, col2, col3, n);
//    color = mix(color, col3, smoothstep(0.2, 0.4, n));

    // Enhance vibrancy with gamma correction
//    color = pow(color, vec3(1.5));
//  vec4 combinedColor = mix(texColor, nebula, 0.5);


  // Output the final color
//    gl_fragColor = vec4(color * nebula, 1.0);
  gl_FragColor = texColor;
//  gl_FragColor = combinedColor;
}
