let k = 1/2;

function setup() {
  createCanvas(600, 600);
  angleMode(DEGREES);
}

function draw() {
  background(0,0,0);
 
  let diameter = (600/5) * 2;
  let xCoor = 0;
  let yCoor = 0;
  
  translate(300, 300);
  drawLayers(xCoor, yCoor, 0, diameter, k);
 
  function drawLayers(xCoor, yCoor, count, radius, k) {
    count++;
    
    if (count > 1) {
      k = 1 - (mouseY/height);
    }
  
    fill("blue");
    triangle((xCoor + (radius*k) * cos (360-120)), (yCoor + (radius*k) * sin (360-120)), (xCoor + (radius*k) * cos (360-240)), (yCoor + (radius*k)  * sin (360-240)), (xCoor + (radius*k) * cos (360-0)), (yCoor + (radius*k) * sin (360-0)));
    
    if (count < 7) {
      push();
      translate((xCoor + (radius*k) * cos (360-120)), (yCoor + (radius*k) * sin (360-120)));
      rotate(mouseX/width*120);
      drawLayers (0, 0, count, radius/2, k);
      pop();
      
      push();
      translate((xCoor + (radius*k) * cos (360-240)), (yCoor + (radius*k)  * sin (360-240)));
      rotate(mouseX/width*120);
      drawLayers (0, 0, count, radius/2, k);
      pop();
      
      push();
      translate((xCoor + (radius*k) * cos (360-0)), (yCoor + (radius*k) * sin (360-0)));
      rotate(mouseX/width*120);
      drawLayers (xCoor, yCoor, count, radius/2, k);
      pop();
    }  
  }
}


