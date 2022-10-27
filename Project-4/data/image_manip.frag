// Fragment shader
// The fragment shader is run once for every pixel
// It can change the color and transparency of the fragment.

#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

#define PROCESSING_TEXLIGHT_SHADER

// Set in Processing
uniform sampler2D my_texture;
uniform sampler2D other_texture;

// These values come from the vertex shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;

void main() { 
  
  float blurInt = 5;
  //float redBlur = floor(blurInt / 2);
  //float offset = 4 * (1.0 / 450.0);
  //float offset = 4 * (1.0 / 350.0);
  float offset = 4 * (1.0 / 250.0);

  float s = 0.2;
  vec4 total;
  vec4 diff;
  for (float i = -2; i < 2; i++) {
    for (float j = -2; j < 2; j++) {
      vec2 coord = (vec2(i * offset, j * offset) + vertTexCoord.st);
      vec4 tex = texture2D(my_texture, coord);
      total += tex;
    }
  }
  diff = total / 25;
  //handles texture for doge and eliminates green
  if (vertTexCoord.y < 1 && vertTexCoord.y < 1) {
    vec2 vertTexCoord = vec2(vertTexCoord.x - 0.6, vertTexCoord.y);
    if (vertTexCoord.y / s < 1) {
      vec4 colors = texture2D(other_texture, vertTexCoord.xy / s);
      //vec4 colors = texture2D(other_texture, vertTexCoord.xy / s);
      if ((colors.b > 0.6 && colors.r > 0.6) || colors.g < 0.8) {
        diff = texture2D(other_texture, vertTexCoord.xy / s);
        
      }
    }
  }


  //vec4 diffuse_color = texture2D(my_texture, vertTexCoord.xy);

  //if (vertTexCoord.s < 0.5)
    //diffuse_color = texture2D(other_texture, vertTexCoord.xy);

float diffuse = clamp(dot (vertNormal, vertLightDir),0.0,1.0);
gl_FragColor = vec4(diffuse * diff.rgb, 1.0);
}
