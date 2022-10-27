// polygon mesh routines that you should write
let vList = [];
let pList = [];
let ang = 0;
let tn = 0.05;
let tA = [];

function init_polys()
{
  vList = [];
  pList = [];
}

function new_vertex (x1, y1, z1, nx1, ny1, nz1)
{
  let vert = {
    x: x1, y: y1, z: z1, nx: nx1, ny: ny1, nz: nz1
  };
  vList.push(vert);
}

function new_quad (i11, i22, i33, i44)
{
  let quad = {
    i1: i11, i2: i22, i3: i33, i4: i44
  };
  pList.push(quad);
 
}

function draw_polys() {
  if (show_vertices_flag) {
    for (let i = 0; i < vList.length; i++) {
      //let r = pList[i];
      beginShape();
      push();
      translate(vList[i].x, vList[i].y, vList[i].z);
      sphere(0.75);
      pop();
      endShape(CLOSE);
    }
  } else if(normal_flag) {
    for (let i = 0; i < pList.length; i++) {
      let r = pList[i];
      
      normalMaterial();
      beginShape();
      push();
      
      
      vertexNormal (vList[r.i1].nx, vList[r.i1].ny, vList[r.i1].nz);
      vertex(vList[r.i1].x, vList[r.i1].y, vList[r.i1].z);
      
      normalMaterial();
      vertexNormal (vList[r.i2].nx, vList[r.i2].ny, vList[r.i2].nz); 
      vertex(vList[r.i2].x, vList[r.i2].y, vList[r.i2].z);
      
      normalMaterial();
      vertexNormal (vList[r.i3].nx, vList[r.i3].ny, vList[r.i3].nz);
      vertex(vList[r.i3].x, vList[r.i3].y, vList[r.i3].z);
      
      normalMaterial();
      vertexNormal (vList[r.i4].nx, vList[r.i4].ny, vList[r.i4].nz); 
      vertex(vList[r.i4].x, vList[r.i4].y, vList[r.i4].z);
      
      pop();
      endShape(CLOSE);
    }
  } else if (!normal_flag && !show_vertices_flag) {
        for (let i = 0; i < pList.length; i++) {
      let r = pList[i];
      beginShape();
      push();
      vertexNormal (vList[r.i1].nx, vList[r.i1].ny, vList[r.i1].nz);
      vertex(vList[r.i1].x, vList[r.i1].y, vList[r.i1].z);
      vertexNormal (vList[r.i2].nx, vList[r.i2].ny, vList[r.i2].nz);
      vertex(vList[r.i2].x, vList[r.i2].y, vList[r.i2].z);
      vertexNormal (vList[r.i3].nx, vList[r.i3].ny, vList[r.i3].nz);
      vertex(vList[r.i3].x, vList[r.i3].y, vList[r.i3].z);
      vertexNormal (vList[r.i4].nx, vList[r.i4].ny, vList[r.i4].nz);
      vertex(vList[r.i4].x, vList[r.i4].y, vList[r.i4].z);
      pop();
      endShape(CLOSE);
  }
}
}
function create_cylinder(rad,x1,y1,z1,x2,y2,z2)
{
  
  let v1 = createVector(x1, y1, z1);
  let v2 = createVector(x2, y2, z2);
  let t = p5.Vector.sub(v2, v1).normalize();
  let uP = createVector(1, 0, 0);
  
  //confirms it is perpendicular
  if (p5.Vector.dot(uP, t) != 0) {
    uP = createVector(0, 1, 0);
  }
  //two perpendicular vectors
  
  let u = p5.Vector.cross(t, uP).normalize();
  let v = p5.Vector.cross(t, u).normalize();

  //u = p5.Vector.mult();
  for (let i = 0; i < 16; i++) {
    ang = (22.5 * i);
    let vU = p5.Vector.mult(u, rad * cos(radians(ang)));
    let vV = p5.Vector.mult(v, rad * sin(radians(ang)));
    let norm = p5.Vector.add(vU, vV);
    let vert = p5.Vector.add(p5.Vector.add(vU, vV), v2);
    new_vertex(vert.x, vert.y, vert.z, norm.x, norm.y, norm.z);

}
ang = 0;
for (let i = 0; i < 16; i++) {
    ang = (22.5 * i);
    //let u1 = p5.Vector.mult(p5.Vector.add(p5.Vector.mult(u, sin(ang), p5.Vector.mult(v, cos(ang)))), rad);
    let vU = p5.Vector.mult(u, rad * cos(radians(ang)));
    let vV = p5.Vector.mult(v, rad * sin(radians(ang)));
    let norm = p5.Vector.add(vU, vV);
    let vert = p5.Vector.add(p5.Vector.add(vU, vV), v1);
    new_vertex(vert.x, vert.y, vert.z, norm.x, norm.y, norm.z);
}
ang = 0;
for (let i = 0; i < 15; i++) {
  new_quad(0 + i, 16 + i, 17 + i, 1 + i);
}
//handles wrap around
new_quad((vList.length / 2) - 1, vList.length - 1, vList.length / 2, 0);

}



function bezier_tube(x1,y1,z1, x2,y2,z2, x3,y3,z3, x4,y4,z4, rad, num_around, num_length, nx, ny, nz)
{
  let p1 = createVector(x1, y1, z1);
  let p2 = createVector(x2, y2, z2);
  let p3 = createVector(x3, y3, z3);
  let p4 = createVector(x4, y4, z4);
  let u = createVector(nx, ny, nz);
  let t = 0;
  let cp = [];
  let len = vList.length;
  
  for (let i = 0; i <= num_length; i++) {
    t = i / num_length;
    // c point funct : dP(t)/dt of :(1-t)^3*p1 + 3t(1-t)^2*p2 + (1-t)t^2*p3 + t^3*p4. Came out to

    let x = (pow(1.0 - t, 3) * p1.x) + (pow(1.0 - t, 2) * 3 * t * p2.x) + (pow(t, 2) * (1-t) * 3 * p3.x) + (pow(t, 3) * p4.x);
    let y = (pow(1.0 - t, 3) * p1.y) + (pow(1.0 - t, 2) * 3 * t * p2.y) + (pow(t, 2) * (1-t) * 3 * p3.y) + (pow(t, 3) * p4.y);
    let z = (pow(1.0 - t, 3) * p1.z) + (pow(1.0 - t, 2) * 3 * t * p2.z) + (pow(t, 2) * (1-t) * 3 * p3.z) + (pow(t, 3) * p4.z);
    
    //let tanX = (-3 * pow(1 - t, 2) * p1.x) + 3 * pow((1 - t), 2) * p2.x - (6 * t *(1 - t)  * p2.x) - (pow(-3 * t, 2) * p3.x) + 6 * t *(1 - t) * p3.x + pow(3 * t, 2) * p4.x;
    
    
    //let tanY = (-3 * pow(1 - t, 2) * p1.y) + 3 * pow((1 - t), 2) * p2.y - (6 * t *(1 - t)  * p2.y) - (pow(-3 * t, 2) * p3.y) + 6 * t *(1 - t) * p3.y + pow(3 * t, 2) * p4.y;
    //let tanZ = (-3 * pow(1 - t, 2) * p1.z) + 3 * pow((1 - t), 2) * p2.z - (6 * t *(1 - t)  * p2.z) - (pow(-3 * t, 2) * p3.z) + 6 * t *(1 - t) * p3.z + pow(3 * t, 2) * p4.z;
    //  dP(t) / dt =  -3(1-t)^2*p1 + 3(1-t)^2*p2-6t(1-t)*p2 -3t^2*p3+6t(1-t)*p3 + 3t^2*p4
    let tanW = p5.Vector.mult(p1, -3 * pow((1 - t), 2));
    let tanX = p5.Vector.add(p5.Vector.mult(p2, 3 * pow((1-t),2)), p5.Vector.mult(p2,(-6 * t * (1 - t))));
    let tanY = p5.Vector.add(p5.Vector.mult(p3,-3*pow(t,2)), p5.Vector.mult(p3, (6 * t * (1 - t))));
    let tanZ = p5.Vector.mult(p4, 3 * pow(t , 2)); 
    let t11 = p5.Vector.add(tanW, tanX);
    let t111 = p5.Vector.add(t11, tanY);
    let t1111 = p5.Vector.add(t111, tanZ);
    t1111 = t1111.normalize();

    //tA.push(z1111);
    let cpVect = createVector(x, y, z);
    //cp.push(createVector(x, y, z));
    let norm = [];
    //let v1 = createVector(cpVect.x, cpVect.y, cpVect[.z);
   // if (cp.length > 1) {
    //let v2 = createVector(cp[i + 1].x, cp[i + 1].y, cp[i + 1].z);
    //}
    
    //let t = p5.Vector.sub(v2, v1).normalize();
    //let ta = tA[i];
    
    let v = p5.Vector.cross(t1111, u).normalize();
    u = p5.Vector.cross(v, t1111).normalize();
    for (let j = 0; j < (PI * 2);) {
      ang = (j);
      let vUU = p5.Vector.mult(u, rad * cos(ang));
      let vVV = p5.Vector.mult(v, rad * sin(ang));
      let norm = p5.Vector.add(vUU, vVV);
      let vert = p5.Vector.add(p5.Vector.add(vUU, vVV), cpVect);
      new_vertex(vert.x, vert.y, vert.z, norm.x, norm.y, norm.z);
      j = j + (PI * 2) / num_around;
      //console.log(vList);
      //ang = 0;
      }
    }
    for (let i = 0; i < num_length; i++) {
      for (let j = len; j < num_around + len; j++) {
        let i1 = j;
        let i2 = j + num_around;
        let i3 = j + num_around + 1;
        let i4 = j + 1;
        if (j == (num_around + len - 1)) {
          i3 = len + num_around;
          i4 = len;
          }
      new_quad(i1, i2, i3, i4);
    }
    len += num_around;
   }
  return u;
}
