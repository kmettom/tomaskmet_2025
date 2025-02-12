
// Varyings
varying vec2 vUv;

//generic unifiorms
uniform float time;
uniform float hoverState;
uniform float aniIn;

void main() {
  float normalizedX = vUv.x;

  // Output
  vec4 mvPosition = vec4(position, 1.0);
  mvPosition = modelViewMatrix * mvPosition;
  //  gl_Position = projectionMatrix * mvPosition;

  vec3 newposition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newposition, 1.0);

  // Varyings
  vUv.x = uv.x * (1.0-hoverState/100.0);
  vUv.y = uv.y;
}
