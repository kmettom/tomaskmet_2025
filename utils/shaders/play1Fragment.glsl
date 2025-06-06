varying float vNoise;
varying vec2 vUv;
uniform sampler2D uImage;

uniform float uTime;
uniform float uHover;
uniform float uAniIn;
uniform float uImageGallery;
uniform float uImageGalleryActive;

uniform float scale;// = 4.0
uniform float smoothness;// = 0.01
uniform float seed;// = 12.9898

uniform vec2 uMeshSize;// The size of the mesh (width, height)
uniform vec2 uTextureSize;// The size of the texture (width, height)

void main() {


    float meshAspect = uMeshSize.x / uMeshSize.y;
    float textureAspect = uTextureSize.x / uTextureSize.y;
    //
    // Adjust UV coordinates to maintain aspect ratio
    vec2 uv = vUv;
    if (meshAspect > textureAspect) {
        // Mesh is wider than the texture
        float scale = textureAspect / meshAspect;
        uv.y = uv.y * scale + (1.0 - scale) / 2.0;// Center the texture vertically
    } else {
        // Mesh is taller than the texture
        float scale = meshAspect / textureAspect;
        uv.x = uv.x * scale + (1.0 - scale) / 2.0;// Center the texture horizontally
    }
    //
    //  gl_FragColor = texture2D(uImage, vUv);

    //  vec2 uv = vUv;
    //  uv.x = fract(uv.x + uTime * 0.05); // wrap horizontally
    //  if (uv.x < 0.25 || uv.x > 0.75) discard;
    gl_FragColor = texture2D(uImage, uv);
}
