// Varyings
varying vec2 vUv;
uniform vec2 hover;

//generic unifiorms
uniform float time;
uniform float hoverState;
uniform float aniIn;

void main() {
  float normalizedX = vUv.x;

  // Output
  vec4 mvPosition = vec4(position, 1.0);
  //  mvPosition = modelViewMatrix * mvPosition;
  //    gl_Position = projectionMatrix * mvPosition;

  vec3 newposition = position;
  //  gl_Position = projectionMatrix * modelViewMatrix * vec4(newposition, 1.0);

  // Varyings
  //  vUv.x = uv.x * (1.0-aniIn/100.0);
  //  vUv.y = uv.y;

  float dist = distance(uv, hover);

  newposition.z +=
    (hoverState + (1.0 - aniIn)) * 10.0 * sin(dist * 10.0 + time);
  //  newposition.x +=  (hoverState + (1.0 - aniIn)) * 10.0 * sin(dist * 10.0 + time);
  //  newposition.y +=  (hoverState + (1.0 - aniIn)) * 10.0 * sin(dist * 10.0 + time);

  //  vNoise = (hoverState + (1.0 - aniIn)) * sin(dist * 10.0 - time);
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newposition, 1.0);
}
