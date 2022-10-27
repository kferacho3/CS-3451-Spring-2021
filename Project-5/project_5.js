// Provided code for Project 5

let pi = 3.1415926535;

let animate_flag = 1;
let show_vertices_flag = 0;
let normal_flag = 0;

let time = 0;  // records the passage of time, used to move the objects

// this is called once at the start of the program
function setup() {
  createCanvas(600, 600, WEBGL);
  
  let fov = 60.0;  // 60 degrees field of view
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
  
  polygon_example_1();
}

// this is called repeatedly to create new per-frame images
function draw() {
  
  background(180, 180, 255);  // light blue background
  
  // set the virtual camera position
  camera(0, 0, 85, 0, 0, 0, 0, 1, 0);  // from, at, up
  
  // include a little bit of light even in shadows
  ambientLight(40, 40, 40);
  
  // set the light position
  pointLight(255, 255, 255, 100, -100, 300);

  noStroke();  // don't draw polygon outlines
  
  fill (255, 255, 255);
  
  push();
  let mesh_axis = createVector (0, 1, 0);
  rotate (-time, mesh_axis);
  
  /* example of drawing a quad with normals 
  // (remove these lines)
  beginShape();
  vertexNormal (0, 0, 1);
  vertex (-25, -25, 0);
  vertexNormal (0, 0, 1);
  vertex (-25, 25, 0);
  vertexNormal (0, 0, 1);
  vertex (25, 25, 0);
  vertexNormal (0, 0, 1);
  vertex (25, -25, 0);
  endShape (CLOSE);
  // (remove these lines)
  
  */ //this is where you should draw your collection of polygons
  draw_polys();
  
  pop();
  
  // maybe update time
  if (animate_flag)
    time += 0.02;
}

function keyPressed() {
  console.log ("key pressed\n");
  switch(key) {
    case ' ':  animate_flag = 1 - animate_flag; break;
    case '1':  polygon_example_1(); break;
    case '2':  polygon_example_2(); break;
    case '3':  cylinder_example_1(); break;
    case '4':  cylinder_example_2(); break;
    case '5':  bezier_example_1(); break;
    case '6':  bezier_example_2(); break;
    case '7':  bezier_example_3(); break;
    case '8':  knot(); break;
    case 'v':  show_vertices_flag = 1 - show_vertices_flag; break;
    case 'n':  normal_flag = 1 - normal_flag; break;
    case 'q':  debugger; break;
  }
}

// one polygon
function polygon_example_1()
{
  init_polys();
  
  new_vertex (-20, -20, 0, 0, 0, 1);
  new_vertex (-20, 20, 0, 0, 0, 1);
  new_vertex (20, 20, 0, 0, 0, 1);
  new_vertex (20, -20, 0, 0, 0, 1);
  
  new_quad (0, 1, 2, 3);
}

// two polygons that share two vertices
function polygon_example_2()
{
  init_polys();
  
  new_vertex (-20, -20, 0, 0, 0.5, 0.5);
  new_vertex (-20, 0, 5, 0, 0, 1);
  new_vertex (20, 0, 5, 0, 0, 1);
  new_vertex (20, -20, 0, 0, 0.5, 0.5);
  
  new_vertex (20, 20, 0, 0, -0.5, 0.5);
  new_vertex (-20, 20, 0, 0, -0.5, 0.5);
  
  new_quad (0, 1, 2, 3);
  new_quad (1, 2, 4, 5);
}

// one cylinder along the z-axis
function cylinder_example_1()
{
  init_polys();
  create_cylinder(10, 0, 0, -10, 0, 0, 10);
}

// a cylinder at a diagonal orientation
function cylinder_example_2()
{
  init_polys();
  create_cylinder(5, -10, -10, 0, 10, 10, 0);
}

// a straight bezier tube
function bezier_example_1()
{
  init_polys();
  
  bezier_tube (
    0, 0, -30,
    0, 0, -10,
    0, 0, 10,
    0, 0, 30,
    5, 16, 32,
    1, 0, 0);
}

// a curved bezier tube
function bezier_example_2()
{
  init_polys();
  let s = 25;
  
  bezier_tube (
    -s, -s, 0,
    -s, s, 0,
    s, -s, 0,
    s, s, 0,
    5, 16, 32,
    1, 0, 0);
}

// two bezier tubes that together make a closed oval
function bezier_example_3()
{
  init_polys();
  
  let u = bezier_tube (
    -20, 0, 0,
    -20, 20, 0,
    20, 20, 0,
    20, 0, 0,
    5, 12, 24,
    0, 0, 1);
  
  bezier_tube (
    20, 0, 0,
    20, -20, 0,
    -20, -20, 0,
    -20, 0, 0,
    5, 12, 24, u.x, u.y, u.z);
}

// create a trefoil knot out of bezier tubes
function knot()
{
  init_polys();
  
  let s = 15;
  let rad = 4;
  
  let num_around = 8;
  let num_along = 12;
  
  let r = 4 / sqrt (3);
  let u = createVector (0, 0, 1);
    
  for (let off = 0; off < 360; off += 120) {
  
    let p1 = polar_to_xy (off + 150, s);
    let p2 = polar_to_xy (off + 90, 2*s);
    let p3 = polar_to_xy (off + 60, r*s);
    let p4 = polar_to_xy (off + 30, 2*s);
    let p5 = polar_to_xy (off + 0, r*s);
    let p6 = polar_to_xy (off - 30, 2*s);
    let p7 = polar_to_xy (off - 90, s);
    
    let d = 10;
    p2.z += d;
    p6.z -= d;
    
    u = bezier_tube (
      p1.x, p1.y, p1.z,
      p2.x, p2.y, p2.z,
      p3.x, p3.y, p3.z,
      p4.x, p4.y, p4.z,
      rad, num_around, num_along,
      u.x, u.y, u.z);
    
    u = bezier_tube (
      p4.x, p4.y, p4.z,
      p5.x, p5.y, p5.z,
      p6.x, p6.y, p6.z,
      p7.x, p7.y, p7.z,
      rad, num_around, num_along,
      u.x, u.y, u.z);
      
  }
}

// return the xy position of a polar coordinate position (uses degrees)
function polar_to_xy (angle, distance)
{
  angle = pi * angle / 180;  // convert to radians
  let p = createVector (distance * cos(angle), distance * sin(angle), 0);
  return (p);
}
