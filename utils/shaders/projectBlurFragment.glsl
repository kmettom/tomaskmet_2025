varying float vNoise;
varying vec2 vUv;
uniform sampler2D uImage;

uniform float time;
uniform float uHover;
uniform float uAniIn;
uniform float uImageGallery;
uniform float uImageGalleryActive;

uniform vec2 uMeshSize; // The size of the mesh (width, height)
uniform vec2 uTextureSize; // The size of the texture (width, height)

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

  vec4 texColor = texture2D(uImage, uv);

  gl_FragColor = texColor;
  gl_FragColor.rgb += 0.01 * vec3(vNoise);

}
