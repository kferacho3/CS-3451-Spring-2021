// Fragment shader

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_LIGHT_SHADER

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;


void circles(float x, float y, float rad, float s) {
  float x1 = vertTexCoord.x - x;
  float y1 = vertTexCoord.y - y;
  float radd = rad * rad;
  float z = ((x1*x1) + (y1*y1));
  if (z < radd) {
  gl_FragColor = vec4(0.0, 1.0, 1.0, s);
  }
}
void main() {
  float radius = 0.075;
  float x = 0.5;
  float y = 0.5;
  

  //float[][] coords = {{0.5, 0.85, radius, 0}, {0.85, 0.5, radius, 0}, {0.5, 0.15, radius, 0}, {0.15, 0.5, radius, 0}, {x, x, radius, 0}, {x, y, radius, 0}, {y, x, radius, 0}, {y, y, radius, 0}};
  circles(0.5, 0.5, 0.5, 1);
  //for (int i = 0; i < 8; i++) {
    //circles(coords[i][0], coords[i][1], radius, coords[i][3]);
  //}

  circles(x, y + 0.35, radius, 0);
  circles(x + 0.35, y, radius, 0);
  circles(x, y - 0.35, radius, 0);
  circles(x - 0.35, y, radius, 0);
  circles(x - 0.25, y - 0.25, radius, 0);
  circles(x - 0.25, y + 0.25, radius, 0);
  circles(x + 0.25, y - 0.25, radius, 0);
  circles(x + 0.25, y + 0.25, radius, 0);
  float x1 = vertTexCoord.x - 0.5;
  float y1 = vertTexCoord.y - 0.5;
  if (x1 < 0.1 && x1 > - 0.1) {
    if (y1 < 0.1 && y1 > -0.1) {
      gl_FragColor = vec4(0.0, 1.0, 1.0, 0.0);
    }
  }
}

