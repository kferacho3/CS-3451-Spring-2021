
function setup()
{
  createCanvas(800, 800);
}
function draw()
{
  background(255, 0, 255);
  angleMode(DEGREES);
  noStroke();
  fill (255, 204, 0); 


  //let x = width / 2.0;
  //let y = height / 2.0;
  //ellipse(x,y,240.0,240.0);
  //translate(width / 2, height / 2);
  //triangle(300, 240, 240, 360, 360, 360);
  //this.size
  //let tri = new triangle();
  //stroke(12, 123, 123);
  let radius = 160;
  let xc = 0;
  let yc = 0;
  let num = 0;
  let triangles = 0;
  let angle = 0;
  let k = 1/2;
  //original triangle coordinates
  let x1 = (radius * k * cos(240));
  let y1 = (radius * k * sin(240));
  let x2 = (radius * k * cos(120));
  let y2 = (radius * k * sin(120));
  let x3 = (radius * k * cos(360));
  let y3 = (radius * k * sin(360));
  
  translate(400, 400);
  tri(triangles, k, radius * 2, xc, yc);
 //recursive function used for "many triangles"
  function tri(triangles, k, radius, xc, yc) {
    triangles = triangles + 1;
    if (triangles > 1) {
      k = 1 - (mouseY / height);
       
    }
    fill (255, 204, 0);
    triangle(x1,y1,x2,y2,x3,y3);
    if (triangles < 7) {
      //first recursive triangles
      push();
      translate((xc + (radius * k) * cos (240)), (yc + (radius * k) * sin (240)));
      rotate(mouseX / width * 160);
      tri(triangles, k, radius / 2, 0, 0);
      pop();
      //second recursive triangles
      push();
      translate((xc + (radius * k) * cos (120)), (yc + (radius * k)  * sin (120)));
      rotate(mouseX / width * 160);
      tri(triangles, k, radius / 2, 0, 0);
      pop();
      //third recursive triangles
      push();
      translate((xc + (radius * k) * cos (360)), (yc + (radius * k) * sin (360)));
      rotate(mouseX / width * 160);
      tri(triangles, k, radius / 2, 0, 0);
      pop();
    }  
  }
}
