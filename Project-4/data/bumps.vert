// Vertex shader
// The vertex shader is run once for every vertex
// It can change the (x,y,z) of the vertex, as well as its normal for lighting.

// Our shader uses both processing's texture and light variables
#define PROCESSING_TEXLIGHT_SHADER

// Set automatically by Processing
uniform mat4 transform;
uniform mat3 normalMatrix;
uniform vec3 lightNormal;
uniform mat4 texMatrix;
uniform sampler2D texture;

// Come from the geometry/material of the object
attribute vec4 vertex;
attribute vec4 color;
attribute vec3 normal;
attribute vec2 texCoord;

// These values will be sent to the fragment shader
varying vec4 vertColor;
varying vec3 vertNormal;
varying vec3 vertLightDir;
varying vec4 vertTexCoord;
varying vec4 vertTexCoordR;
varying vec4 vertTexCoordL;


void main() {

  // provided
  vertColor = color;
  vertTexCoord = texMatrix * vec4(texCoord, 1.0, 1.0);

 vertNormal = normalize(normalMatrix * normal);
 float n = 0.05;
 
  //vec4 ver;

  vec2 center = vec2(0.5, 0.5);
  float offs = (sin(40 * distance(center, vertTexCoord.xy)));
  offs = offs * 0.5 * 40;
  vec4 vertex = vec4(offs * normal, 0.0) + vertex;
  gl_Position = transform * vertex; 

  vec2 t = vec2(vertTexCoord.x, vertTexCoord.y + n);
  vec2 b = vec2(vertTexCoord.x, vertTexCoord.y - n);
  vec2 r = vec2(vertTexCoord.x + n, vertTexCoord.y);
  vec2 l = vec2(vertTexCoord.x - n, vertTexCoord.y);

  //get topside val
  float ts = 0.5 * sin(distance(center, t) * 40);
  //get bottomside val
  float bs = 0.5 * sin(distance(center, b) * 40);
  //get rightside val
  float rs = 0.5 * sin(distance(center, r) * 40);
  //get leftside val
  float ls = 0.5 * sin(distance(center, l) * 40);

  //calculating the new normal vec tor normalize bumps
  vec3 normalized = normal;
  normalized.x -= ts;
  normalized.x -= rs;
  normalized.y -= bs;
  normalized.y -= ts;
  vertNormal = normalize(-normalized * normalMatrix);

  vertLightDir = normalize(-lightNormal);


}
