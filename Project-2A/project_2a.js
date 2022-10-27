//Kamal Feracho
//CS 3451
//Project 2A
//This is me as a super hero! 

// "The Dreaded Demon"

// Sample code for Project 2
// Draws 3D Primitives (sphere, box, cylinder, cone, torus)

let cos = Math.cos;
let sin = Math.sin;

let time = 0;  // records the passage of time, used to move the objects

// this is called once at the start of the program
function setup() {
  createCanvas(800, 800, WEBGL);
  
  let fov = 60.0;  // 60 degrees field of view
  perspective(PI * fov / 180.0, width / height, 0.1, 2000);
}

// this is called repeatedly to create new per-frame images
function draw() {
  
  background(180, 180, 255);  // light blue background
  
  // set the virtual camera position
  camera(0, 0, 85, 0, 0, 0, 0, 1, 0);  // from, at, up
  
  // include a little bit of light even in shadows
  ambientLight(60, 60, 60);
  
  //lightSpecular(255, 255, 255);
  directionalLight(100, 100, 100, -0.3, 0.5, -1);

  
  // set the light position
  pointLight(255, 255, 255, 100, -100, 300);

  noStroke();  // don't draw polygon outlines
  //pecular(180, 180, 180);
  shininess(59.0);
  
  let delta = 25;
  
  //function to help create various shapes for the parts of the body
  function Cylinder(sides) {
    beginShape();
    for (i = 0; i < sides; i++) {
      let theta = i * 2 * PI / sides;
      let x = cos(theta);
      let y = sin(theta);
      vertex(x, y, -1);
    }
    endShape(CLOSE);
    beginShape();
    for (let i = 0; i < sides; i++) {
      let theta = i * 2 * PI / sides;
      let x = cos(theta);
      let y = sin(theta);
      vertex(x, y, 1);
    }
    endShape(CLOSE);
    let p1 = 1;
    let p2 = 0;
    for (let i = 0; i < sides; i++) {
      let theta = (i + 1) * 2 * PI / sides;
      let p11 = cos(theta);
      let p22 = sin(theta);
      beginShape();
      //normal(p1, p2, 0);
      vertex(p1, p2, 1);
      vertex(p1, p2, -1);
      //normal(p11, p22, 0);
      vertex(p11, p22, -1);
      vertex(p11, p22, 1);
      endShape(CLOSE);
      p1 = p11;
      p2 = p22;
      
    }
  }
  //right foot
  fill(0, 0, 0);
  push();
  translate(4, 46.5, 1.25);
  box(4, 2.5, 2);
  pop();
  
  //left foot
  fill(0, 0, 0);
  push();
  translate(-4, 46.5, 1.25);
  box(4, 2.5, 2);
  pop();
  
  //right leg
  fill(0, 0, 255);
  push();
  translate(4, 30, 0);
  scale(2, 15, 2);
  rotateX(radians(90));
  Cylinder(64);
  pop();
  
  //left leg
  fill(10, 0, 255);
  push();
  translate(-4, 30, 0);
  scale(2, 15, 2);
  rotateX(radians(90));
  Cylinder(64);
  pop();
  
  //hips
  fill(10, 0, 255);
  push();
  translate(0, 16, 0);
  //sphereDetail(mouseX / 4);
  sphere(7.9);
  pop();
  
  //torso
  fill(204, 102, 0);
  push();
  translate(0, 8.5, 0);
  scale(8, 8, 8);
  rotateX(radians(90));
  Cylinder(64);
  pop();
  
  //torso longer
  fill('pink');
  push();
  translate(0, 8.5, 0);
  scale(8, 8, 8);
  rotateX(radians(90));
  Cylinder(64);
  pop();
    
  //right arm
  fill(123, 63, 0);
  push();
  translate(13.25, 10, 0);
  rotateZ(radians(330));
  scale(1.75, 5, 1.75);
  rotateX(radians(90));
  Cylinder(64);
  pop();
  

    
  //left arm
  fill(123, 63, 0);
  push();
  translate(-13.25, 10, 0);
  rotateZ(radians(30));
  scale(1.75, 5, 1.75);
  rotateX(radians(90));
  Cylinder(64);
  pop();
  
  //left sleeve
  fill('pink');
  push();
  translate(-9, 2.5, 0);
  rotateZ(radians(30));
  scale(2, 5, 2);
  rotateX(radians(90));
  Cylinder(64);
  pop();
    
  //right sleeve
  fill('pink');
  push();
  translate(9, 2.5, 0);
  rotateZ(radians(330));
  scale(2, 5, 2);
  rotateX(radians(90));
  Cylinder(64);
  pop();

  //right hand
  fill(123, 63, 0);
  push();
  translate(16.75, 16, 0);
  //sphereDetail(60);
  sphere(2.25);
  pop();
  
  
  //left hand
  fill(123, 63, 0);
  push();
  translate(-16.75, 16, 0);
  //sphereDetail(60);
  sphere(2.25);
  pop();
  
  //neck
  fill(123, 63, 0);
  push();
  translate(0, 0, 0);
  scale(1.75, 5, 1.75);
  rotateX(radians(90));
  Cylinder(64);
  pop();
  
  //head
  fill(123, 63, 0);
  push();
  translate(0, -13, 0);
 // translate (-5.0 * sin(time), 0.0, 0.0);
  //sphereDetail(mouseX / 4);
  //sphereDetail(60);
  sphere(10);
  pop();
  
  //hair
  fill(0, 0, 0);
  push();
  translate(0, -15.5, 0);
  //sphereDetail(mouseX / 4);
  sphere(9);
  pop();
  
  //hair (dread)
  fill(0, 0, 0);
  push();
  translate(0, -28 * (sin (time)), 0);
  scale(-1.75, -5, -1.75);
  rotateX(radians(90));
  Cylinder(20);
  pop();
  
  //hair (dread)
  fill(0, 0, 0);
  push();
  translate(-6* (sin (time)), -25, 0);
  rotateZ(radians(330));
  scale(-1.75, -5, -1.75);
  rotateX(radians(240));
  Cylinder(20);
  pop();
  
  //hair (dread)
  fill(0, 0, 0);
  push();
  translate(6 * (sin (time)), -25, 0);
  rotateZ(radians(-330));
  scale(-1.75, -5, -1.75);
  rotateX(radians(240));
  Cylinder(20);
  pop();
  
  //hair (dread)
  fill(0, 0, 0);
  push();
  translate(-10 * (sin (time)), -21, 0);
  rotateZ(radians(330));
  scale(-1.75, -5, -1.75);
  rotateX(radians(240));
  Cylinder(20);
  pop();
  
  //hair (dread)
  fill(0, 0, 0);
  push();
  translate(10* (sin (time)), -21, 0);
  rotateZ(radians(-330));
  scale(-1.75, -5, -1.75);
  rotateX(radians(240));
  Cylinder(20);
  pop();
  
  //horn 
  fill('red');
  push();
  translate(-10, -21, 0);
  rotateZ(radians(300));
  scale(-1.75, -5, -1.75);
  rotateX(radians(240));
  cone(2, 2);
  pop();
  
  //horn 
  fill('red');
  push();
  translate(10, -21, 0);
  rotateZ(radians(-300));
  scale(-1.75, -5, -1.75);
  rotateX(radians(240));
  cone(2, 2);
  pop();
  
   //horn 
  fill('red');
  push();
  translate(-17, -28, 0);
  rotateZ(radians(350));
  scale(-1.75, -5, -1.75);
  rotateX(radians(240));
  cone(2, 2);
  pop();
  
  //horn 
  fill('red');
  push();
  translate(17, -28, 0);
  rotateZ(radians(-350));
  scale(-1.75, -5, -1.75);
  rotateX(radians(240));
  cone(2, 2);
  pop();
  
  
  //right eye
  fill(255, 255, 255);
  push();
  translate(3, -13, 9);
  //rotateX(time)
  //sphereDetail(60);
  sphere(3);
  pop();
  
  //left eye
  fill(255, 255, 255);
  push();
  translate(-3, -13, 9);
  //rotateX(time)
  //sphereDetail(60);
  sphere(3);
  pop();
    
  //right pupil
  fill(0,0,0);
  push();
  translate(3, -13, 12);
  sphere(0.5);
  pop();
    
  //left pupil
  fill(0,0,0);
  push();
  translate(-3, -13, 12);
  sphere(0.5);
  pop();
    

    
  //mouth
  fill(150,0,0);
  push();
  translate(0, -7.5, 5.75);
  //sphereDetail(60);
  sphere(2.5);
  pop();
    
    
  //fill(250);
  //push();
  //translate(0, 0);
  //translate (-5.0 * sin(time), 0.0, 0.0);
  //sphere(15);
  //pop();
  
  //fill(50, 200, 100);
  //push();
  //translate(-delta, -delta);
  //let box_axis = createVector (0.0, 1.0, 0.0);
  //rotate (-time, box_axis);
  //box(20);
  //pop();
  
 // fill(100, 150, 250);
  //push();
  //translate(-delta, delta);
  //rotateX(PI);
  //let cone_axis = createVector (1.0, 0.0, 0.0);
  //rotate (-time, cone_axis);
  //cone(10, 25);
  //pop();
  
  //fill(250, 50, 100);
  //push();
  //translate(delta, -delta);
  //let cyl_axis = createVector (0.0, 0.0, 1.0);
  //rotate (-time, cyl_axis);
  //cylinder(10, 20);
  //pop();
  
  //fill(150, 0, 150);
  //push();
  //translate(delta, delta);
  //scale (0.3 * (sin (time) + 2.5));
  //torus(12, 6, 32, 20);
  //pop();

  time += 0.03;  // update time
}
