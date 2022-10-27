// This is the starter code for the CS 3451 Ray Tracing Project.
//

function setup() {
  createCanvas(500, 500, P2D);
  scene_01();
}

// test out the different ray tracing scenes
function keyPressed() {
  console.log ("key pressed\n");
  switch(key) {
    case '1':  scene_01(); break;
    case '2':  scene_02(); break;
    case '3':  scene_03(); break;
    case '4':  scene_04(); break;
    case 'q':  debugger; break;
  }
}

// one diffuse red sphere
function scene_01() {
  
  console.log ("start of scene_01\n");
  
  reset_scene();
  set_background (0.4, 0.4, 0.9);
  
  set_fov (60.0);
  set_eye_position (0.0, 0.0, 0.0);
  set_uvw (1, 0, 0,  0, 1, 0,  0, 0, 1);
  
  new_light (1, 1, 1, 7, 4, 5);
  
//  sphere: x,y,z, radius, diff_red, diff_green, diff_blue, k_ambient, k_spec, k_pow
  new_sphere (0, 0, -4,  1, 0.9, 0.0, 0.0, 0.0, 0.0, 1.0);
  
  draw_scene();

  console.log ("end of scene_01\n");
}

// two spheres
function scene_02() {
  
  console.log ("start of scene_02\n");
  
  reset_scene();
  set_background (0.4, 0.4, 0.9);
  
  set_fov (60.0);
  set_eye_position (4.0, 0.0, 0.0);
  set_uvw (0, 0, -1,  0, 1, 0,  1, 0, 0);
  
  new_light (1, 1, 1, 7, 7, -5);
  ambient_light (0.4, 0.4, 0.4);
  
  new_sphere (0, 0, 0,  1, 0, 0.5, 0, 1.0, 0.7, 20);
  new_sphere (1, 0.6, -1,  0.3, 0.6, 0, 0, 0.5, 0, 0);
  
  draw_scene();

  console.log ("end of scene_02\n");
}

// one sphere lit by multiple colored lights
function scene_03() {
  
  console.log ("start of scene_03\n");
  
  reset_scene();
  set_background (0.4, 0.4, 0.9);
  
  set_fov (60.0);
  set_eye_position (0.0, 0.0, 0.0);
  set_uvw (1, 0, 0,  0, 1, 0,  0, 0, 1);
  
  new_light (0.8, 0.2, 0.2, 3, 4, 0);
  new_light (0.2, 0.8, 0.2, -3, 4, 0);
  new_light (0.2, 0.2, 0.8, 0, 4, -5);
  
  ambient_light (0.2, 0.2, 0.2);
  
  new_sphere (0, 0.5, -3, 1, 0.8, 0.8, 0.8, 0.2, 0, 0);
  
  draw_scene();

  console.log ("end of scene_03\n");
}

// several spheres that intersect each other
function scene_04() {
  
  console.log ("start of scene_04\n");
  
  reset_scene();
  set_background (0.4, 0.4, 0.9);
  
  set_fov (60.0);
  set_eye_position (0.0, 0.0, 0.0);
  set_uvw (1, 0, 0,  0, 1, 0,  0, 0, 1);
  
  new_light (1, 1, 1, 2.5, 1, 0);
  
  ambient_light (0.2, 0.2, 0.2);
  
  // body
  new_sphere (0.6, 0, -3, 0.5, 0.8, 0.8, 0.8, 0.2, 0, 0);
  new_sphere (0, 0, -3, 0.45, 0.8, 0.8, 0.8, 0.2, 0, 0);
  new_sphere (-0.6, 0, -3, 0.4, 0.8, 0.8, 0.8, 0.2, 0, 0);
  new_sphere (-1.1, 0, -3, 0.35, 0.8, 0.8, 0.8, 0.2, 0, 0);
  
  // eyes
  new_sphere (0.8, 0.3, -2.65, 0.1, 0.2, 0.2, 0.7, 0.2, 0, 0);
  new_sphere (0.5, 0.3, -2.6, 0.095, 0.2, 0.2, 0.7, 0.2, 0, 0);
  
  // nose
  new_sphere (0.62, 0.1, -2.5, 0.09, 0.2, 0.7, 0.2, 0.2, 0, 0);
  
  draw_scene();

  console.log ("end of scene_04\n");
}

// dummy function, not really used
function draw() {
}
