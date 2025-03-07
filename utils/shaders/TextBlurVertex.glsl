// Varyings
varying vec2 vUv;
uniform vec2 hover;

//generic unifiorms
uniform float uTime;
uniform float uHover;
uniform float uAniIn;
uniform vec2 uViewport;
uniform vec2 uMouse;
uniform vec2 uMousePrev;
uniform vec2 uMouseMovement;
uniform float uDevicePixelRatio;

float createCircle() {
  //TODO: finish mouse interaction with destortion
  vec2 mousePoint = vec2(uMousePrev.x, 1.0 - uMousePrev.y);

  vec2 viewportUv = gl_Position.xy / uViewport / uDevicePixelRatio;
  float viewportAspect = uViewport.x / uViewport.y;

  vec2 shapeUv = viewportUv - mousePoint;
  shapeUv /= vec2(1.0, viewportAspect);
  shapeUv += mousePoint;

  float circleRadius = max(0.0, 20.0 / uViewport.x);
  float dist = distance(shapeUv, mousePoint);
  dist = smoothstep(circleRadius, circleRadius + 0.05, dist);
  return dist;
}

void main() {
  //    float circle = createCircle();

  //  float normalizedX = vUv.x;
  //  vec4 mvPosition = vec4(position, 1.0);
  //  vec3 newposition = position;
  //  float dist = distance(uv, hover);

  //  vec3 newPosition = position;
  //  newPosition.z += circle * 100.;

  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
