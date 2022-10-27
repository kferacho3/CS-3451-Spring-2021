// routines for creating a ray tracing scene
//let pxColor = [];
//let debug_flag;

//  looked more into syntax usage and processin/javascript programlastg and found a much more simplified 
//  way to create classes for large bunches of distinct data (i.e., the disks class, etc.).

let backgroundColor = [1,1,1]; 
let fov; 

let u;
let v;
let w;

let ambientLight = [1,1,1];
let pointLights = []; 
let spheres = []; 
let disks = []; 
let areaLights = []; 
let sampleLevel;
let jitter;
let eye = {
    x: 0,
    y: 0,
    z: 0,
  }; //global array of xyz position for eye
  
  
// NEW COMMANDS FOR PART B

// create a new disk
function new_disk (xD, yD, zD, radiusD, nxD, nyD, nzD, drD, dgD, dbD, k_ambientD, k_specularD, specular_powD) {
  let disk = {
    x: xD,
    y: yD,
    z: zD,
    radius: radiusD,
    nx: nxD,
    ny: nyD,
    nz: nzD,
    dr: drD,
    dg: dgD,
    db: dbD,
    k_ambient: k_ambientD,
    k_specular: k_specularD,
    specular_pow: specular_powD
  };
  
  disks.push(disk);
}

// create a new area light source
function area_light (r1, g1, b1, x1, y1, z1, ux1, uy1, uz1, vx1, vy1, vz1) {
  let areaL = {
    r: r1,
    g: g1,
    b: b1,
    x: x1,
    y: y1,
    z: z1,
    ux: ux1,
    uy: uy1,
    uz: uz1,
    vx: vx1,
    vy: vy1,
    vz: vz1
  };
  
  areaLights.push(areaL);
}

function set_sample_level (num) {
  sampleLevel = num;
}

function jitter_on() {
  jitter = true;
}

function jitter_off() {
  jitter = false;
}


// OLD COMMANDS FROM PART A (some of which you will still need to modify)


// clear out all scene contents
function reset_scene() {
  backgroundColor = [1,1,1];
  fov = 0;
  let u;
  let v;
  let w;
  ambientLight = [1,1,1];
  pointLights = [];
  spheres = [];
  areaLights = [];
  disks = [];
  eye = {
    x: 0,
    y: 0,
    z: 0,
  };
}

// create a new point light source
function new_light (r1, g1, b1, x1, y1, z1) {
  //creates a pointLight object with necessary variables
  let pointL = {
    x: x1,
    y: y1,
    z: z1,
    r: r1,
    g: g1,
    b: b1
  };
  
  pointLights.push(pointL);
}

// set value of ambient light source
function ambient_light (r, g, b) {
  ambientLight = [r,g,b];
}

// set the background color for the scene
function set_background (r, g, b) {
  backgroundColor = [r,g,b];
}

// set the field of view
function set_fov (theta) {
  fov = radians(theta);
}

// set the position of the virtual camera/eye
function set_eye_position (x, y, z) {
  eye.x = x;
  eye.y = y;
  eye.z = z;
}

// set the virtual camera's viewing direction
function set_uvw(x1,y1, z1, x2, y2, z2, x3, y3, z3) {
  u = createVector(x1,y1,z1).normalize();
  v = createVector(x2,y2,z2).normalize();
  w = createVector(x3,y3,z3).normalize();
}

// create a new sphere
function new_sphere (xS, yS, zS, radiusS, drS, dgS, dbS, k_ambientS, k_specularS, specular_powS) {
  let sphere = {
    x: xS,
    y: yS,
    z: zS,
    radius: radiusS,
    dr: drS,
    dg: dgS,
    db: dbS,
    k_ambient: k_ambientS,
    k_specular: k_specularS,
    specular_pow: specular_powS
  };
  
  spheres.push(sphere);
}

// create an eye ray based on the current pixel's position
function eye_ray_uvw (i, j) {
  //calculates necesary scalars
  let u_u = -1 + (2.0 * i / width);
  let v_v = -1 + (2.0 * (height - j) / height);
  let d_d = 1.0 / (tan(fov / 2.0));
  
  let uu = [u.x * u_u, u.y * u_u, u.z * u_u];
  let vv = [v.x * v_v, v.y * v_v, v.z * v_v];
  let ww = [w.x * (-1) * d_d, w.y * (-1) * d_d, w.z * (-1) * d_d]; 
  
  let dir = [(uu[0] + vv[0] + ww[0]), (uu[1] + vv[1] + ww[1]), (uu[2] + vv[2] + ww[2])];
  let dire = createVector(dir[0], dir[1], dir[2]);
  
  
  let ray = {
   origin: [eye.x, eye.y, eye.z], 
   d: dire
  };
  
  
  return ray;
}

//finds t intersections between ray/sphere using quad formula and returns last t value intersection w/ color 
function sphereInter(ray, sphere, subx, suby) { 

  let a = ray.d.x * ray.d.x + ray.d.y * ray.d.y + ray.d.z * ray.d.z;
  let b = (ray.origin[0] * ray.d.x) + (ray.origin[1] * ray.d.y) + (ray.origin[2] * ray.d.z) -
          (sphere.x * ray.d.x) - (sphere.y * ray.d.y) - (sphere.z * ray.d.z);
  b *= 2;
  let c = (ray.origin[0] * ray.origin[0]) + (ray.origin[1] * ray.origin[1]) + (ray.origin[2] * ray.origin[2]) +
          (sphere.x * sphere.x) + (sphere.y * sphere.y) + (sphere.z * sphere.z) - 
          (2 * sphere.x * ray.origin[0]) - (2 * sphere.y * ray.origin[1]) - (2 * sphere.z * ray.origin[2]) - (sphere.radius * sphere.radius);
            
  if ((b * b - 4 * a * c) < 0) {
   return -1; 
  } 
  else {
    //calculates both t values
    let t1 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    let t2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    let ts;
    if (t1 < 0 && t2 < 0) {
      return -1;
    }
    
    //gets smallest t
    else {
      if (t1 < 0) {
        ts = t2;
      }
      if (t2 < 0) {
        ts = t1;
      }
      if (t1 >= 0 && t2 >= 0) {
        ts = last(t1, t2); 
      }
      
      //calculate normal vector
      let x = (ray.origin[0] + ts * ray.d.x) - sphere.x;
      let y = (ray.origin[1] + ts * ray.d.y) - sphere.y;
      let z = (ray.origin[2] + ts * ray.d.z) - sphere.z;
      let n = createVector(x,y,z).normalize();
      
      
      let ls = []; 
      for (let i = 0; i < pointLights.length; i++) {
       let f = pointLights[i].x - (ray.origin[0] + (ts * ray.d.x));
       let s = pointLights[i].y - (ray.origin[1] + (ts * ray.d.y));
       let t = pointLights[i].z - (ray.origin[2] + (ts * ray.d.z));
       let lig = createVector(f,s,t);
       let ori = {
         origin: [ray.origin[0] + (ts * ray.d.x) + (0.0001 * n.x), 
                  ray.origin[1] + (ts * ray.d.y) + (0.0001 * n.y), 
                  ray.origin[2] + (ts * ray.d.z) + (0.0001 * n.z)],
         d: lig,
       };
       ls.push(ori); //vector at ls[i] corresponds to pointLights[i]
      }
      //for jitter
      let r = 0;
      if (jitter == true) {
        r = Math.random() - 0.5;
      }
      let al = []; //vectors to point lights from point on the surface
      for (let i = 0; i < areaLights.length; i++) {
        //soft shadow calculations
           let uu = createVector(areaLights[i].ux, areaLights[i].uy, areaLights[i].uz);
           let vv = createVector(areaLights[i].vx, areaLights[i].vy, areaLights[i].vz);
           
           subx2 = ((subx + 1 + r) / (sampleLevel + 1)) * 2 - 1;
           suby2 = ((suby + 1 + r) / (sampleLevel + 1)) * 2 - 1;
           uu = p5.Vector.mult(U, subx2);
           vv = p5.Vector.mult(V, suby2);
           let f = areaLights[i].x - (ray.origin[0] + ts * ray.d.x) + uu.x + vv.x; //+ U.x + V.x
           let s = areaLights[i].y - (ray.origin[1] + ts * ray.d.y) + uu.y + vv.y; //U.y...
           let t = areaLights[i].z - (ray.origin[2] + ts * ray.d.z) + uu.z + vv.z; 
           let l = createVector(f,s,t);
         let o = {
           origin: [ray.origin[0] + ts * ray.d.x + 0.0001 * n.x, 
                    ray.origin[1] + ts * ray.d.y + 0.0001 * n.y, 
                    ray.origin[2] + ts * ray.d.z + 0.0001 * n.z],
           d: l,
         };
         al.push(o); //vector at al[i] corresponds to areaLights[i]
      }
      
      //return t value, color data, normal vector, light vectors
      //type 0 = sphere intersection
      let intersection = {
        t: ts,
        type: 0,
        normal: n,
        lights: ls,
        Alights: al,
        dr: sphere.dr,
        dg: sphere.dg,
        db: sphere.db,
        k_ambient: sphere.k_ambient,
        k_specular: sphere.k_specular,
        specular_pow: sphere.specular_pow
      };
      
      return intersection;
    }
  }
}

function diskInter(ray, disk, subx, suby) {
 let ts;
 let d = -((disk.nx * disk.x) + (disk.ny * disk.y) + (disk.nz * disk.z)); 
 let num = -d - ((disk.nx * ray.origin[0]) + (disk.ny * ray.origin[1]) + (disk.nz * ray.origin[2]));
 let den = (ray.d.x * disk.nx) + (ray.d.y*disk.ny) + (ray.d.z*disk.nz);
 
 if (den != 0) {
   ts = num / den;
   if (ts > 0) { 
     let point = [ray.origin[0] + ts * ray.d.x, ray.origin[1] + ts * ray.d.y, ray.origin[2] + ts * ray.d.z]; 
     let dist = sqrt(sq(disk.x - point[0]) + sq(disk.y - point[1]) + sq(disk.z - point[2]));
     
     if (dist <= disk.radius) {
       
       let ls = []; //vectors to point lights from point on the surface
         for (let i = 0; i < pointLights.length; i++) {
           let f = pointLights[i].x - (point[0]);
           let s = pointLights[i].y - (point[1]);
           let t = pointLights[i].z - (point[2]);
           let l = createVector(f,s,t);
           
           let o = {
             origin: [point[0] + 0.0001 * disk.nx, point[1] + 0.0001 * disk.ny, point[2] + 0.0001 * disk.nz],
             d: l
           };
           ls.push(o); //vector at ls[i] corresponds to pointLights[i]
          }
          
          //for jitter
          let r = 0;
          if (jitter == true) {
            r = Math.random() - 0.5;
          }
         //AREA light vectors
         let arealig = []; //vectors to point lights from point on the surface
         for (let i = 0; i < areaLights.length; i++) {
           
           //soft shadow calculations
           let uu = createVector(areaLights[i].ux, areaLights[i].uy, areaLights[i].uz);
           let vv = createVector(areaLights[i].vx, areaLights[i].vy, areaLights[i].vz);
           
           subx2 = ((subx + 1 + r) / (sampleLevel + 1)) * 2 - 1;
           suby2 = ((suby + 1 + r) / (sampleLevel + 1)) * 2 - 1;
           
           uu = p5.Vector.mult(uu, subx2);
           vv = p5.Vector.mult(vv, suby2);
           
           let f = areaLights[i].x - (point[0]) + uu.x + vv.x; //+ U.x + V.x
           let s = areaLights[i].y - (point[1]) + uu.y + vv.y; //U.y...
           let t = areaLights[i].z - (point[2]) + uu.z + vv.z; 
           let lig = createVector(f,s,t);
           let orig = {
             origin: [point[0] + 0.0001 * disk.nx, point[1] + 0.0001 * disk.ny, point[2] + 0.0001 * disk.nz],
             d: lig
           };
           arealig.push(orig); 
          }
          
         //normal vector
         let n = createVector(disk.nx, disk.ny, disk.nz); 
         
         let dis = {
           t: ts,
           type: 1,
           normal: n,
           lights: ls,
           Alights: arealig,
           dr: disk.dr,
           dg: disk.dg,
           db: disk.db,
           k_ambient: disk.k_ambient,
           k_specular: disk.k_specular,
           specular_pow: disk.specular_pow
         };
         return dis;
     } else {
      return -1; 
     }
   } else {
    return -1; 
 }
 } else {
  return -1; 
 }
}

//finds the and returns the intersections and last T-value for spheres and disks 
function findIntersections(ray, subx, suby) {
      let high = 9999;
      let last = null;
      for (let i = 0; i < spheres.length; i++) {
        let inter = sphereInter(ray, spheres[i], subx, suby);
        if (inter != -1) { //intersection found
          if (inter.t < high) { //keeps track of what the first intersection is
            high = inter.t;
            last = inter;
          }
        }
      }
      for (let i = 0; i < disks.length; i++) {
        let inter = diskInter(ray, disks[i], subx, suby);
        if (inter != -1) { //intersection found
          if (inter.t < high) { //keeps track of what the first intersection is
            high = inter.t;
            last = inter;
          }
        }
      }
    return last;
}


// this is the main routse for drawing your ray traced scene
function draw_scene() {
  noStroke();  // so we don't get a border when we draw a tsy rectangle

  // go through all the pixels in the image
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let pxColor = [0, 0, 0];
      //subsampling of pixel (x,y)
      for (let sy = 0; sy < sampleLevel; sy++) {
        for (let sx = 0; sx < sampleLevel; sx++) {
          let subX = x + ((sx + 1) / (sampleLevel + 1)) - 0.5;
          let subY = y + ((sy + 1) / (sampleLevel + 1)) - 0.5;
          // create eye ray
          let ray = eye_ray_uvw (subX, subY);
          // maybe print debug information
          debug_flag = 0;
          //if (x == width / 2 && y == height / 2) { debug_flag = 1;  }  // un-comment to debug center pixel
          
          //if (debug_flag) {
          //  console.log ("debug at: " + x + " " + y);
          //}
         
          
          inters = findIntersections(ray, sx, sy);
          
          if (inters != null) { 
          
            pxColor[0] += inters.k_ambient * inters.dr * ambientLight[0];
            pxColor[1] += inters.k_ambient * inters.dg * ambientLight[1];
            pxColor[2] += inters.k_ambient * inters.db * ambientLight[2];  
            
            for (let i = 0; i < inters.lights.length; i++) { 
              shadow = findIntersections(inters.lights[i], sx, sy);
              if(shadow != null) { 
                if (shadow.t > 0 && shadow.t < 1) {
                  pxColor[0] += 0;
                  pxColor[1] += 0;
                  pxColor[2] += 0;
                }
              } else { 
                 pxColor[0] += inters.dr * pointLights[i].r * max(0, p5.Vector.dot(inters.normal, inters.lights[i].d.normalize()));
                 pxColor[1] += inters.dg * pointLights[i].g * max(0, p5.Vector.dot(inters.normal, inters.lights[i].d.normalize()));
                 pxColor[2] += inters.db * pointLights[i].b * max(0, p5.Vector.dot(inters.normal, inters.lights[i].d.normalize()));
              }
            }
            for (let i = 0; i < inters.Alights.length; i++) { 
              shadow = findIntersections(inters.Alights[i], sx, sy);
              if (shadow != null) { //shadow needs to be cast
                if (shadow.t > 0 && shadow.t < 1) {
                  pxColor[0] += 0;
                  pxColor[1] += 0;
                  pxColor[2] += 0;
                }
              } else { 
                 pxColor[0] += inters.dr * areaLights[i].r * max(0, p5.Vector.dot(inters.normal, inters.Alights[i].d.normalize()));
                 pxColor[1] += inters.dg * areaLights[i].g * max(0, p5.Vector.dot(inters.normal, inters.Alights[i].d.normalize()));
                 pxColor[2] += inters.db * areaLights[i].b * max(0, p5.Vector.dot(inters.normal, inters.Alights[i].d.normalize()));
              }
            }
          } else { 
            pxColor[0] += backgroundColor[0];
            pxColor[1] += backgroundColor[1];
            pxColor[2] += backgroundColor[2]; 
          }
        }
      } 
      pxColor[0] = (pxColor[0] / sq(sampleLevel));
      pxColor[1] = (pxColor[1] / sq(sampleLevel));
      pxColor[2] = (pxColor[2] / sq(sampleLevel));
      //set the pixel color, convertsg values from [0,1] into [0,255]
      fill (255 * pxColor[0], 255 * pxColor[1], 255 * pxColor[2]);
      
      rect (x, y, 1, 1);   // make a little rectangle to fill in the pixel
    }
  } 
}
