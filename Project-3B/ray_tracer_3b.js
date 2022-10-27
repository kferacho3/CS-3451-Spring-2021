// This is the starter code for the CS 3451 Ray Tracing Project (Part B).
//

function setup() {
  createCanvas(500, 500, P2D);
}

// test out the different ray tracing scenes
function keyPressed() {
  console.log ("key pressed\n");
  reset_scene();
  switch(key) {
    
    // scenes
    case '1':  two_spheres_ambient(); break;
    case '2':  one_disk(); break;
    case '3':  five_disks(); break;
    case '4':  three_intersecting_disks(); break;
    case '5':  worm(); break;
    case '6':  two_spheres_point_light(); break;
    case '7':  two_spheres_area_light(); break;
    case '8':  colored_lights(); break;
    
    // setting the per-pixel sample level (shoot more rays)
    case 'q':  set_sample_level (1); break;
    case 'w':  set_sample_level (2); break;
    case 'e':  set_sample_level (3); break;
    case 'r':  set_sample_level (4); break;
    case 't':  set_sample_level (5); break;
    case 'y':  set_sample_level (6); break;
    
    // turn on or off jittered sanpling
    case 'j':  jitter_on(); break;
    case 'n':  jitter_off(); break;
  }
}

// two red spheres, one with high ambient shading component
function two_spheres_ambient() {
  
  console.log ("start of two_spheres_ambient\n");
  
  set_background (0.4, 0.4, 0.9);
  
  set_fov (60.0);
  set_eye_position (0.0, 0.0, 0.0);
  set_uvw (1, 0, 0,  0, 1, 0,  0, 0, 1);
  
  new_light (1, 1, 1, 7, 7, 5);
  ambient_light (0.4, 0.4, 0.4);
  
  // two spheres, one with high ambient component
  new_sphere (-1.1, 0, -4,  1,  0.9, 0.0, 0.0,  0.0,  0.0, 1.0);
  new_sphere ( 1.1, 0, -4,  1,  0.9, 0.0, 0.0,  0.7,  0.0, 1.0);
  
  draw_scene();

  console.log ("end of two_spheres_ambient\n");
}

// one red disk
function one_disk() {
  
  console.log ("start of one_disk\n");
  
  set_background (0.4, 0.4, 0.9);
  
  set_fov (60.0);
  set_eye_position (0.0, 0.0, 0.0);
  set_uvw (1, 0, 0,  0, 1, 0,  0, 0, 1);
  
  new_light (1, 1, 1,   0, 4, 5);
  
  new_disk (0, 0, -4,  1,  0, 0, 1,  0.9, 0, 0,  0,  0, 1);
  
  draw_scene();

  console.log ("end of one_disk\n");
}

// five disks of different orientations
function five_disks() {
  
  console.log ("start of five_disks\n");
  
  set_background (0.4, 0.4, 0.9);
  
  set_fov (60.0);
  set_eye_position (0, 0, 10);
  set_uvw (1, 0, 0,  0, 1, 0,  0, 0, 1);
  
  new_light (1, 1, 1,   0, 5, 10);
  
  new_disk (-4.4, 0, 0,  1,  0, 1, 0.1,  1, 0, 0,  0,  0, 1);
  new_disk (-2.2, 0, 0,  1,  0, 1, 0.4,  1, 0.6, 0.2,  0,  0, 1);
  new_disk (   0, 0, 0,  1,  0, 1, 0.7,  0.9, 0.9, 0,  0,  0, 1);
  new_disk ( 2.2, 0, 0,  1,  0, 1, 1.4,  0, 1, 0,  0,  0, 1);
  new_disk ( 4.4, 0, 0,  1,  0, 0, 1.0,  0, 1, 1,  0,  0, 1);
  
  draw_scene();

  console.log ("end of five_disks\n");
}

// three intersecting disks
function three_intersecting_disks() {
  
  console.log ("start of three_intersecting_disks\n");
  
  set_background (0.4, 0.4, 0.9);
  
  set_fov (60.0);
  set_eye_position (1.2, 1.3, 3);
  set_uvw (0.9284, 0.0, -0.37139,  -0.13862, 0.92772, -0.34656,  0.344548, 0.373261, 0.861372);
  
  new_light (1.2, 1.2, 1.2,   2, 4, 6);
  ambient_light (1, 1, 1);
  
  new_disk (0, 0, 0,  1,  1, 0, 0,  0.9, 0, 0,  0.2,  0, 1);
  new_disk (0, 0, 0,  1,  0, 1, 0,  0, 0.9, 0,  0.2,  0, 1);
  new_disk (0, 0, 0,  1,  0, 0, 1,  0, 0, 0.9,  0.2,  0, 1);
  
  draw_scene();

  console.log ("end of three_intersecting_disks\n");
}

// several spheres and disks that intersect each other
function worm() {
  
  console.log ("start of worm\n");
  
  set_background (0.4, 0.4, 0.9);
  
  set_fov (60.0);
  set_eye_position (0.0, 0.0, 0.0);
  set_uvw (1, 0, 0,  0, 1, 0,  0, 0, 1);
  
  new_light (1, 1, 1,  1.2, 1, 0);
  
  ambient_light (0.2, 0.2, 0.2);
  
  // body
  new_sphere (0.6, 0, -3, 0.5, 0.8, 0.8, 0.8, 0.2, 0, 0);
  new_sphere (0, -0.3, -3, 0.45, 0.8, 0.8, 0.8, 0.2, 0, 0);
  new_sphere (-0.6, -0.3, -3, 0.4, 0.8, 0.8, 0.8, 0.2, 0, 0);
  new_sphere (-1.1, -0.3, -3, 0.35, 0.8, 0.8, 0.8, 0.2, 0, 0);
  
  // eyes
  new_sphere (0.75, 0.2, -2.6, 0.1, 0.2, 0.2, 0.7, 0.2, 0, 0);
  new_sphere (0.45, 0.2, -2.6, 0.095, 0.2, 0.2, 0.7, 0.2, 0, 0);
  
  // nose
  new_sphere (0.62, 0.0, -2.5, 0.09, 0.2, 0.7, 0.2, 0.2, 0, 0);
  
  // ears
  
  new_disk (0.35, 0.4, -2.7,  0.2,  0, 0, 1,  0.8, 0.2, 0.3,  0.2, 0, 0);
  new_disk (0.85, 0.4, -2.7,  0.2,  0, 0, 1,  0.8, 0.2, 0.3,  0.2, 0, 0);

  draw_scene();

  console.log ("end of worm\n");
}

// two spheres with point light shadows
function two_spheres_point_light() {
  
  console.log ("start of two_spheres_point_light\n");
  
  set_background (0.4, 0.4, 0.9);
  
  set_fov (60.0);
  set_eye_position (4.0, 0.0, 0.0);
  set_uvw (0, 0, -1,  0, 1, 0,  1, 0, 0);
  
  new_light (1, 1, 1, 7, 7, -5);
  ambient_light (0.4, 0.4, 0.4);
  
  new_sphere (0, 0, 0,  1, 0, 0.5, 0, 1.0, 0.7, 20);
  new_sphere (1, 0.6, -1,  0.3, 0.6, 0, 0, 0.5, 0, 0);
  
  draw_scene();

  console.log ("end of two_spheres_point_light\n");
}

// two spheres and an area light source
function two_spheres_area_light() {
  
  console.log ("start of two_spheres_area_light\n");
  
  set_background (0.4, 0.4, 0.9);
  
  set_fov (60.0);
  set_eye_position (4.0, 0.0, 0.0);
  set_uvw (0, 0, -1,  0, 1, 0,  1, 0, 0);
  
  area_light (1, 1, 1,   7, 7, -5,   0, 0, -3,   0, 3, 0);
  ambient_light (0.4, 0.4, 0.4);
  
  new_sphere (0, 0, 0,  1,  0.6, 0, 0,  1.0, 0.7, 20);
  new_sphere (1, 0.6, -1,  0.3,  0, 0.6, 0,  0.5, 0, 0);
  
  draw_scene();

  console.log ("end of two_spheres_area_light\n");
}

// one sphere lit by multiple colored lights, floating above a disk
function colored_lights() {
  
  console.log ("start of colored_lights\n");
  
  set_background (0.4, 0.4, 0.9);
  
  set_fov (60.0);
  set_eye_position (0.0, 0.0, 0.0);
  set_uvw (1, 0, 0,  0, 1, 0,  0, 0, 1);
  
  //new_light (0.8, 0.2, 0.2, 3, 4, 0);
  //new_light (0.2, 0.8, 0.2, -3, 4, 0);
  //new_light (0.2, 0.2, 0.8, 0, 4, -5);
  
  area_light (0.8, 0.2, 0.2,   3, 4,  0,  2, 0, 0,  0, 0, 2);
  area_light (0.2, 0.8, 0.2,  -3, 4,  0,  2, 0, 0,  0, 0, 2);
  area_light (0.2, 0.2, 0.8,   0, 4, -5,  2, 0, 0,  0, 0, 2);
  
  ambient_light (0.2, 0.2, 0.2);
  
  new_sphere (0, 0.5, -3, 1, 0.8, 0.8, 0.8, 0.2, 0, 0);
  
  new_disk (0, -0.8, 0, 7.0, 0, 1, 0, 0.8, 0.8, 0.8, 0.2, 0, 0);
  
  draw_scene();

  console.log ("end of colored_lights\n");
}

// dummy function, not really used
function draw() {
}
