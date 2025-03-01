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

  gl_FragColor = texColor * uAniIn;
  gl_FragColor.rgb += 0.01 * vec3(vNoise);

}

//vec2 onePixel = vec2(1.0, 1.0) / u_textureSize;
//gl_FragColor = (
//texture2D(u_image, textCoord + onePixel * vec2(-1.0, -1.0)) +
//texture2D(u_image, textCoord + onePixel * vec2(0.0, -1.0)) +
//texture2D(u_image, textCoord + onePixel * vec2(1.0, -1.0)) +
//texture2D(u_image, textCoord + onePixel * vec2(-1.0, 0.0)) +
//texture2D(u_image, textCoord + onePixel * vec2(0.0, 0.0)) +
//texture2D(u_image, textCoord + onePixel * vec2(1.0, 0.0)) +
//texture2D(u_image, textCoord + onePixel * vec2(-1.0, 1.0)) +
//texture2D(u_image, textCoord + onePixel * vec2(0.0, 1.0)) +
//texture2D(u_image, textCoord + onePixel * vec2(1.0, 1.0))) / 9.0;
//}
//https://search.brave.com/search?q=webgl+blur+fragment&source=desktop&summary=1&conversation=0d68d9ddb392621c1e7dee

