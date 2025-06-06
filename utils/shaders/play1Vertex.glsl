uniform float uTime;
uniform float uHover;
uniform float uAniIn;
varying float vNoise;
varying vec2 vUv;

void main() {
  vUv = uv; // Capture UV
  vec3 newposition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newposition, 1.0);

//  vUv = uv + vec2(uTime * 0.05, 0.0); // adjust speed
//  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

