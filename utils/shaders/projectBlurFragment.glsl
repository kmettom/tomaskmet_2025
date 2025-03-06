precision highp float;

varying float vNoise;
varying vec2 vUv;
uniform sampler2D uImage;

uniform float uTime;
uniform float uHover;
uniform vec2 uMouse;
uniform vec2 uMouseMovement;
uniform float uAniIn;
uniform float uAniInBlur;
uniform float uImageGallery;
uniform float uImageGalleryActive;
uniform float uIsHeroSection;

uniform vec2 uMeshSize; // The size of the mesh (width, height)
uniform vec2 uTextureSize; // The size of the texture (width, height)
uniform vec2 uViewport;
uniform float uDevicePixelRatio;

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

float DISTANCE_COEF = 0.5;

float createCircle(float radius) {
  vec2 viewportUv = gl_FragCoord.xy / uViewport / uDevicePixelRatio;
  float viewportAspect = uViewport.x / uViewport.y;

  vec2 mousePoint = vec2(uMouse.x, 1.0 - uMouse.y);

  vec2 shapeUv = viewportUv - mousePoint;
  shapeUv /= vec2(1.0, viewportAspect);
  shapeUv += mousePoint;
  float dist = distance(shapeUv, mousePoint);

  float circleRadius = max(0.0, radius / uViewport.x);

  dist = smoothstep(circleRadius, circleRadius + 0.05, dist);
  return dist;
}

float createOverlayBlur(float activeOverlay) {
  vec2 viewportUv = gl_FragCoord.xy / uViewport / uDevicePixelRatio;
  float progress = smoothstep(
    activeOverlay - 1.0, // -1 0
    activeOverlay, // 0 1
    viewportUv.y - vUv.y
  );
  return progress;
}

float createOverlayOpacity(float activeOverlay) {
  vec2 viewportUv = uMeshSize.xy / uViewport / uDevicePixelRatio;
  float progress = smoothstep(
    activeOverlay - 1.0,
    activeOverlay,
    viewportUv.y - vUv.y
  );
  return progress;
}

void main() {
  float overlayBlur = createOverlayBlur(uHover);
  float circle = createCircle(70.0);

  //  uBlurStrength = 1.0 - uHover - uImageGalleryActive;
  uBlurStrength = 1.0 * circle * (overlayBlur * uAniInBlur);

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

  //NOISE
  //  float t = uTime + 123.0;
  //  float ta = t * 0.654321;
  //  float tb = t * (ta * 0.123456);
  //  vec4 noise = vec4(1.0 - tvNoise(uv, ta, tb));
  //  final = final - noise * 0.05;

  float overlayOpacity = createOverlayOpacity(1.0 - uAniIn);

  vec4 final = vec4(blur(uv, uImage, 0.08), overlayOpacity);

  gl_FragColor = final;

}
