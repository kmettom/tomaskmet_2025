uniform sampler2D tDiffuse;
varying vec2 vUv;
uniform float scrollSpeed;
void main() {
  vec2 newUV = vUv;
//  float area = smoothstep(0.9, 0.0, vUv.y);
//  area = pow(area, 4.0);
//  newUV.x -= (vUv.x - 0.5) * 0.1 * area * scrollSpeed * 0.05;
  gl_FragColor = texture2D(tDiffuse, newUV);
}
