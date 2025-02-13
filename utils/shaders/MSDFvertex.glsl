// Varyings
varying vec2 vUv;
uniform vec2 hover;

//generic unifiorms
uniform float time;
uniform float hoverState;
uniform float aniIn;

void main() {
  float normalizedX = vUv.x;

  vec4 mvPosition = vec4(position, 1.0);

  vec3 newposition = position;

  float dist = distance(uv, hover);

  newposition.z += (1.0 - aniIn) * 20.0 * sin(dist * 20.0 + time);

  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newposition, 1.0);
}
