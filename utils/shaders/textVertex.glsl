uniform float time;
uniform vec2 vectorVNoise;
uniform float hoverState;
uniform float aniIn;
varying float vNoise;
varying vec2 vUv;

void main() {
  float distVnoise = distance(uv, vectorVNoise);
  //  vNoise = 2.0 * hoverState * sin(distVnoise * 10.0 - time);

  float distWave = distance(uv, vectorVNoise);

  vec3 newposition = position;

  //  newposition.z += (1.0 - aniIn) * 70.0 * sin(distWave * 333.0 + time);

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newposition, 1.0);

}
