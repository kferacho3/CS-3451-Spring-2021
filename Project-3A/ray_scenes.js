// routines for creating a ray tracing scene
//import from processing.core.PVector;
let lights = [];
let pxColor = [];
let debug_flag;
//class Light {
  //let lights = [];
  //constructor(light) {
   // this.light = light;
  //}
   // addLight(r, g, b, x, y, z) {
   // let light = [r, g, b, x, y, z];
   // lights.push(light);
 // }
//}



class Ray {
  constructor(orig, dir) {
    this.orig = orig;
    this.dir = dir;
  }
  get direction() {
    return this.dir;
  }
  set direction(dir) {
    this.dir = dir;
}
  get origin() {
    return this.orig;
  }
  set origin(orig) {
    this.orig = orig;
  }
}
class Surface {
  constructor(dR, dG, dB) {
    this.dR = dR;
    this.dG = dG;
    this.dB = dB;
  }

  set dRcol(dR) {
    this.dR = dR;
  }
  get dRcol() {
    return this.dR;
  }
  
  set dGcol(dG) {
    this.dG = dG;
  }
  get dGcol() {
    return this.dG;
  }
  set dBcol(dB) {
    this.dB = dB;
  }
  get dBcol() {
    return this.dB;
  }
}

class Sphere {
  constructor(x, y, z, radius, vec, surface, kAmb) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.radius = radius;
    this.vec = vec;
    this.surface = surface;
    this.kAmb = kAmb;
    //this.surface = surface;
  }
  get xS() {
    return this.x;
  }
  set xS(x) {
    this.x = x;
  }
  get yS() {
    return this.y;
  }
  set yS(y) {
    this.y = y;
  }
  get zS() {
    return this.z;
  }
  set zS(z) {
    this.z = z;
  }
  get vect() {
    return this.vec;
  }
  set vect(vec) {
    this.vect = vec;
  }
  get radiusS() {
    return this.radius;
  }
  set radiusS(radi) {
    this.radius = radi;
  }
  assignSurface(surface) {
    this.surface = surface;
  }
  get surfaceS() {
    return this.surface;
  }
  set surfaceS(surf) {
    this.surface = surf;
  }
  get kambS() {
    return this.kAmb;
  }
  set kambS(kAmbb) {
    this.kAmb = kAmbb;
  }
}
class Hit {
  constructor(t, pos, obj) {
    this.t = t;
    this.pos = pos;
    this.obj = obj;
  }
  get tS() {
    return this.t;
  }
  set tS(num) {
  this.t = num;
}
  get posS() {
    return this.pos;
  }
  
  set posS(num) {
    this.pos = num;
  }
  get objS() {
    return this.obj;
  }
  set objS(object) {
    this.obj = object;
  }
}
let red = 0.0;
let green = 0.0;
let blue = 0.0;

let aRed = 0.0;
let aGreen = 0.0;
let aBlue = 0.0;

let eyeX = 0.0;
let eyeY = 0.0;
let eyeZ = 0.0;

let fov = 0.0;

let uX = 0.0;
let uY = 0.0;
let uZ = 0.0;
let vX = 0.0;
let vY = 0.0;
let vZ = 0.0;
let wX = 0.0;
let wY = 0.0;
let wZ = 0.0;
let u_u, v_v, d_d;
let r;
let sX;
let sY;
let sZ;
let surf = new Surface();
let amb;
//let cam = createCamera();
//let bg = Background(0, 0, 0);
let k = 0.0;
//let lights =  new Light();
let shapes = [];
let surfaces = [];
//let pixCol = createVector(0, 0, 0);



//let scn = Scene(background, lights, shapes, k);
// clear out all scene contents
function reset_scene() {
    //red = 0.0;
    //green = 0.0;
    //blue = 0.0;
    aRed = 0;
    aBlue = 0;
    aGreen = 0;

    //pxColor = [];
    //let eye = createVector(0, 0, 0);
    eyeX = 0.0;
    eyeY = 0.0;
    eyeZ = 0.0;

    fov = 0.0;
    uX = 0.0;
    uY = 0.0;
    uZ = 0.0;
    vX = 0.0;
    vY = 0.0;
    vZ = 0.0;
    wX = 0.0;
    wY = 0.0;
    wZ = 0.0;
    
    u_u = 0;
    v_v = 0;
    d_d = 0;
    r = 0;
    sX = 0;
    sY = 0;
    sZ = 0;
    surf = new Surface();
    amb = 0;
    //let pixCol = createVector(0, 0, 0);
    
    //let bg = new PVector(0, 0, 0);
    light = [];
    lights = [];
    shapes = [];
    surfaces = [];
    //let colors = new Colors(0, 0, 0);
}



// create a new point light source
function new_light (r, g, b, x, y, z) {
    light = [r, g, b, x, y, z];
    lights.push(light);
    //lights.push(light);
}

// set value of ambient light source
function ambient_light (r, g, b) {
    aRed = r;
    aGreen = g;
    aBlue = b;
}

// set the background color for the scene
function set_background (r, g, b) {
    red = r;
    green = g;
    blue = b;
  
}

// set the field of view
function set_fov (theta) {
  fov = theta;
}

// set the position of the virtual camera/eye
function set_eye_position (x, y, z) {
    eyeX = x;
    eyeY = y;
    eyeZ = z;
    //let eye = createVector(x, y, z);
    //camera(x, y, z, 0, 0, 0, 0, 0, 0);
   // cam.setPosition(x, y, z);
}

// set the virtual camera's viewing direction
function set_uvw(x1, y1, z1, x2, y2, z2, x3, y3, z3) {
    //camera(x1, y1, z1, x2, y2, z2, x3, y3, z3);
    uX = x1;
    uY = y1;
    uZ = z1;
    vX = x2;
    vY = y2;
    vZ = z2;
    wX = x3;
    wY = y3;
    wZ = z3;
    //let u = createVector(x1, y1, z1);
    //let v = createVector(x2, y2, z2);
    //let w = createVector(x3, y3, z3);
    
}

// create a new sphere
function new_sphere (x, y, z, radius, dr, dg, db, k_ambient, k_specular, specular_pow) {
    r = radius;
    sX = x;
    sY = y;
    sZ = z;
    surf = new Surface(dr, dg, db);
    amb = k_ambient;
    
    let vec = createVector(x, y, z);
    let sphere = new Sphere(sX, sY, sZ, r, vec, surf, amb);
    
    sphere.assignSurface(surf);
    surf = [dr, dg, db];
    surfaces.push(surf);
    //let colors = new Color(dr, dg, db);
    shapes.push(sphere);
}

// create an eye ray based on the current pixel's position
function eye_ray_uvw (i, j) {
  u_u = -1 + (2.0 * i / width);
  v_v = -1 + (2.0 * (height - j) / height);
  d_d = 1.0 / (tan(radians(fov / 2.0)));
  
  let orig = createVector(eyeX, eyeY, eyeZ);
  
  
  let u = [uX * u_u, uY * u_u, uZ * u_u];
  let v = [vX * v_v, vY * v_v, vZ * v_v];
  let w = [wX * (-1) * d_d, wY * (-1) * d_d, wZ * (-1) * d_d]; 
  let dir = [(u[0] + v[0] + w[0]), (u[1] + v[1] + w[1]), (u[2] + v[2] + w[2])];
  let dire = createVector(dir[0], dir[1], dir[2]);
  

  let ray = new Ray(orig, dire);
  return ray;
}

function intersect(ray, object) {
    //object as sphere
    
    let dX = ray.direction.x - ray.origin.x;
    let dY = ray.direction.y - ray.origin.y;
    let dZ = ray.direction.z - ray.origin.z;

    
    let dx = ray.direction.x;
    let dy = ray.direction.y;
    let dz = ray.direction.z;
    let radius = object.radiusS;
    let a = p5.Vector.dot(ray.direction, ray.direction);
    let diff = p5.Vector.sub(ray.origin, object.vect);
    let dot = p5.Vector.dot(ray.direction, diff);
    let b = 2 * dot;
    let c = p5.Vector.dot(diff, diff) - (radius * radius);  

      let d = (b * b) - (4 * a * c);
    
    if (d < 0) {
        return 0;
    } else {
        let t1 = (-b - sqrt(( b * b) - (4 * a * c))) / (2 * a);
        let t2 = (-b + sqrt(( b * b) - (4 * a * c))) / (2 * a);
        if (t1 < 0 && t2 < 0) {
          return 0;
        } else if (t1 < 0) {
          t = t2;
        } else if (t2 < 0) {
          t = t1;
        } else {
          t = min(t1, t2);
        }
    }

        //console.log(t);
        //console.log(ray.origin.x);
        
        //console.log(dX);
        let intX = ray.origin.x + (t * dX);
        let intY = ray.origin.y + (t * dY);
        let intZ = ray.origin.z + (t * dZ);
        
        let inter = createVector(intX, intY, intZ);
        
        hitO = new Hit(t, inter, object);
        return hitO;
} 
// this is the main routine for drawing your ray traced scene
function draw_scene() {

  noStroke();  // so we don't get a border when we draw a tiny rectangle

  // go through all the pixels in the image
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      
      // create eye ray
      let ray = eye_ray_uvw(x, y);
 
      //let pxColor = [0.0, 0.0, 0.0];
      //eye_ray_uvw(x, y);
      
      
      
      let high = 9999;
      let last;
      let hit = []; 
      let su;
      for (let i = 0; i < shapes.length; i++) {
          let object = shapes[i];
          //console.log(shapes);
          //let ray = Ray(Vertex(0, 0, 0), Vertex(xP, yP, zP));
            hit.push(intersect(ray, object));
         
      }
      
      for (let i = 0; i < hit.length; i++) {
        let hi = hit[i];
        su = surfaces[i];
        //console.log(su);
        //console.log(hi);
        if (hi != null) {
          if (hi.tS < high && hi.tS >= 0) {
            last = hi;
            high = hi.tS;
          }
       }
    }
    
    if (last != null) { 
      let eyeR = p5.Vector.mult(ray.direction, high);
      let hitP = p5.Vector.add(ray.origin, eyeR);
      let normal = createVector(hitP.x - last.objS.x, hitP.y - last.objS.y, hitP.z - last.objS.z);
      normal.normalize();
      for (let j = 0; j < lights.length; j++) {
        let light1 = lights[j];
        let lPos = createVector((light1[3] - (eyeR.x)), (light1[4] - (eyeR.y)), (light1[5] - (eyeR.z)));
        lPos.normalize();
        let lCol = [light1[0], light1[1], light1[2]];
        if (lights.length == 1) {
        pxColor[0] = (lCol[0] * max(0, p5.Vector.dot(normal, lPos)));
        pxColor[1] = (lCol[1] * max(0, p5.Vector.dot(normal, lPos)));
        pxColor[2] = (lCol[2] * max(0, p5.Vector.dot(normal, lPos)));
        } else {
        pxColor[0] += (aRed * lCol[0] * max(0, p5.Vector.dot(normal, lPos)));
        pxColor[1] += (aBlue * lCol[1] * max(0, p5.Vector.dot(normal, lPos)));
        pxColor[2] += (aGreen * lCol[2] * max(0, p5.Vector.dot(normal, lPos)));
        }        
      }
        if (lights.length == 1) {
          pxColor[0] *= last.objS.surfaceS.dRcol;
          pxColor[1] *= last.objS.surfaceS.dGcol;
          pxColor[2] *= last.objS.surfaceS.dBcol;
        } else { 
          //pxColor[0] *= aRed;
          //pxColor[1] *= aBlue;
          //pxColor[2] *= aGreen;
          pxColor[0] *= last.objS.surfaceS.dRcol;
          pxColor[1] *= last.objS.surfaceS.dGcol;
          pxColor[2] *= last.objS.surfaceS.dBcol;         
        }        
    } else {      
      pxColor = [red, green, blue];
    }
    
  
      // maybe print debug information
      debug_flag = 0;
      if (x == width / 2 && y == height / 2) { debug_flag = 1;  }  // un-comment to debug center pixel
      
      if (debug_flag) {
        console.log ("debug at: " + x + " " + y);
      }
      
      
      // set the pixel color, converting values from [0,1] into [0,255]
      fill (255 * pxColor[0], 255 * pxColor[1], 255 * pxColor[2]);

      rect (x, y, 1, 1);   // make a little rectangle to fill in the pixel
    }
  } 
}


/*
function draw_scene() {

  noStroke();  // so we don't get a border when we draw a tiny rectangle

  // go through all the pixels in the image
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let pxColor = [0.0, 0.0, 0.0];
      
      let theta = 2 * PI * fov / float(360);
      let k = tan(theta / 2);
      
      let u = -1 + (2 * x/float(width));
      let v =  -(-1 + (2 * y/float(height)));
      //let d = 1.0/tan(radians(fov)/2.0);
      
      let orig = createVector(eyeX, eyeY, eyeZ);
      
      
      let xprime = u * uX + v * vX - k * wX;
      let yprime = u * uY + v * vY - k * wY;
      let zprime = u * uZ + v * vZ - k * wZ;
      let eyeRayDir = createVector(xprime, yprime, zprime);
      //r.direction(xprime, yprime, zprime);
      
      //eyeRayDir = eyeRayDir.normalize();
      let ray = new Ray(orig, eyeRayDir);
     // ray.origin(orig);
      //ray.direction(eyeRayDir);
      
      let high = 9999;
      let last = null;
      let hit = []; 
      for (let i = 0; i < shapes.length; i++) {
          let object = shapes[i];
          //console.log(shapes);
          //let ray = Ray(Vertex(0, 0, 0), Vertex(xP, yP, zP));
            hit.push(intersect(ray, object));
      }
      
      for (let i = 0; i < hit.length; i++) {
        let hi = hit[i];
        //console.log(hi);
        if (hi != null) {
          if (hi.tS < high && hi.tS >= 0) {
            last = hi;
            high = hi.tS;
          }
       }
    }
    let eyeDir = createVector(eyeRayDir.x * high, eyeRayDir.y * high, eyeRayDir.z * high);
    eyeDir = createVector(eyeDir.x + ray.origin.x, eyeDir.y + ray.origin.y, eyeDir.z + ray.origin.z);
    if (last == null || last.objS.surfaceS == null) {
      pxColor[0] = red;
      pxColor[1] = green;
      pxColor[2] = blue;
    } else {
      let blee = p5.Vector.mult(ray.direction, high);
      let hitPos = p5.Vector.add(ray.origin, blee);
      //let norm = hitPos.normalize();
      let normal = 
      for (i = 0; i < lights.length; i++) {
         let l = lights[i];
         let lightPos = createVector(l[3] - hitPos.x, l[4] - hitPos.y, l[5] - hitPos.z).normalize();
         pxColor[0] += l[0] * max(0, p5.Vector.dot(norm, lightPos));
         pxColor[1] += l[1] * max(0, p5.Vector.dot(norm, lightPos));
         pxColor[2] += l[2] * max(0, p5.Vector.dot(norm, lightPos));
      }
         pxColor[0] += aRed;
         pxColor[1] += aGreen;
         pxColor[2] += aBlue;
         
         pxColor[0] *= last.objS.surfaceS.drCol;
         pxColor[1] *= last.objS.surfaceS.drCol;
         pxColor[2] *= last.objS.surfaceS.drCol;
    }
    //fill(x, y, pix_color);
      
      // create eye ray
      //let ray = eye_ray_uvw (x, y);
      
      // maybe print debug information
      debug_flag = 0;
      //if (x == width / 2 && y == height / 2) { debug_flag = 1;  }  // un-comment to debug center pixel
      
      if (debug_flag) {
        console.log ("debug at: " + x + " " + y);
      }
      
      // Figure out the pixel's color here (FOR YOU TO WRITE!!!)
      
      let r,g,b;  // placeholders to store the pixel's color

      // set the pixel color, converting values from [0,1] into [0,255]
      fill (255 * pxColor[0], 255 * pxColor[1], 255 * pxColor[2]);
      
      rect (x, y, 1, 1);   // make a little rectangle to fill in the pixel
    }
  }
  
}
*/
