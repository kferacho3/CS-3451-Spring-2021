// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

uniform float cx;
uniform float cy;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() {
  vec4 bg = vec4(1, 0, 0, 1);
  vec4 fc = vec4(1, 1, 1, 1);
  float diffuse = clamp(dot(vertNormal, vertLightDir), 0.0, 1.0);
  float zx = (3 * vertTexCoord.x) - 1.5;
  float zy = (3 * vertTexCoord.y) - 1.5;
  
  for (int i = 0; i < 21; i++) {
    float t = (zx * zx) - (zy * zy) + cx;
    zy = 2 * zx * zy + cy;
    zx = t;
  }
  if ((zx * zx) + (zy * zy) < 20) {
    gl_FragColor = vec4(diffuse * fc.rgb, 1.0);
  } else {
    gl_FragColor = vec4(diffuse * bg.rgb, 1.0); 
  }
}

