precision highp float;

varying float vNoise;
varying vec2 vUv;
uniform sampler2D uImage;

uniform float uTime;
uniform float uHover;
uniform float uAniIn;
uniform float uImageGallery;
uniform float uImageGalleryActive;

uniform vec2 uMeshSize; // The size of the mesh (width, height)
uniform vec2 uTextureSize; // The size of the texture (width, height)
uniform vec2 uViewport;

vec2 uImageSize;
vec2 uPlaneSize;
float uBlurStrength;
//sampler2D tMap;

float tvNoise(vec2 p, float ta, float tb) {
  return fract(sin(p.x * ta + p.y * tb) * 5678.0);
}
vec3 draw(sampler2D image, vec2 uv) {
  return texture2D(image, vec2(uv.x, uv.y)).rgb;
}
float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

vec3 blur(vec2 uv, sampler2D image, float blurAmount) {
  vec3 blurredImage = vec3(0.0);
  float gradient =
    smoothstep(0.8, 0.0, 3.4 - gl_FragCoord.y / uViewport.y / uViewport.y) *
      uBlurStrength +
    smoothstep(0.8, 0.0, gl_FragCoord.y / uViewport.y / uViewport.y) *
      uBlurStrength;
  #define repeats (40.0)
  for (float i = 0.0; i < repeats; i++) {
    vec2 q =
      vec2(
        cos(degrees(i / repeats * 360.0)),
        sin(degrees(i / repeats * 360.0))
      ) *
      (rand(vec2(i, uv.x + uv.y)) + blurAmount);
    vec2 uv2 = uv + q * blurAmount * gradient;
    blurredImage += draw(image, uv2) / 2.0;
    q =
      vec2(
        cos(degrees(i / repeats * 360.0)),
        sin(degrees(i / repeats * 360.0))
      ) *
      (rand(vec2(i + 2.0, uv.x + uv.y + 24.0)) + blurAmount);
    uv2 = uv + q * blurAmount * gradient;
    blurredImage += draw(image, uv2) / 2.0;
  }
  return blurredImage / repeats;
}

void main() {
  uImageSize = uMeshSize;
  uPlaneSize = uViewport;
  uBlurStrength = 1.0;

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

  //  vec4 texColor = texture2D(uImage, uv);

  float t = uTime + 123.0;
  float ta = t * 0.654321;
  float tb = t * (ta * 0.123456);
  vec4 noise = vec4(1.0 - tvNoise(uv, ta, tb));

  vec4 final = vec4(blur(uv, uImage, 0.08), uAniIn);

  final = final - noise * 0.05;

  gl_FragColor = final;

  //  gl_FragColor = texColor * uAniIn;
  //  gl_FragColor.rgb += 0.01 * vec3(vNoise);

}

//void main() {
//  vec2 ratio = vec2(
//  min(uPlaneSize.x / uPlaneSize.y / (uImageSize.x / uImageSize.y), 1.0),
//  min(uPlaneSize.y / uPlaneSize.x / (uImageSize.y / uImageSize.x), 1.0)
//  );
//
//  vec2 uv = vec2(
//  vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
//  vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
//  );
//
//  float t = uTime + 123.0;
//  float ta = t * 0.654321;
//  float tb = t * (ta * 0.123456);
//  vec4 noise = vec4(1.0 - tvNoise(uv, ta, tb));
//
//  vec4 final = vec4(blur(uv, tMap, 0.08), 1.0);
//
//  final = final - noise * 0.08;
//
//  gl_FragColor = final;
//}

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

