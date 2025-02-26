// Varyings
varying vec2 vUv;
uniform vec2 hover;

//generic unifiorms
uniform float time;
uniform float hoverState;
uniform float aniIn;
uniform vec2 viewport;
uniform vec2 uMouse;
uniform vec2 uMouseMovement;

float createCircle() {
  //TODO: finish mouse interaction with destortion
  vec2 mousePoint = vec2(uMouse.x, 1.0 - uMouse.y);

  vec2 viewportUv = gl_Position.xy / gl_Position.w;
  float viewportAspect = viewport.x / viewport.y;
  vec2 shapeUv = viewportUv - mousePoint;
  shapeUv /= vec2(1.0, viewportAspect);
  shapeUv += mousePoint;

  float circleRadius = max(0.0, 20.0 / viewport.x);
  float dist = distance(shapeUv, mousePoint);
  dist = smoothstep(circleRadius, circleRadius + 0.05, dist);
  return dist;
}

void main() {
  float circle = createCircle();

  float normalizedX = vUv.x;
  vec4 mvPosition = vec4(position, 1.0);
  vec3 newposition = position;
  float dist = distance(uv, hover);

  //  newposition.z += (1.0 - aniIn) * 20.0 * sin(dist * 20.0 + time / 2.0);
  //  newposition.z += circle * hoverState;

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newposition, 1.0);
}
