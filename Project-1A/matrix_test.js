// Matrix Command Tests
//
// Open a Javascript console to see the printed results when you run your program

function setup() {
  createCanvas(50, 50, WEBGL);  // not inportant since we won't draw anything
  mat_test();
}

// calls to test your matrix commands
function mat_test() {
  console.log ("Initialize Matrix");
  Init_Matrix();
  Print_Matrix();
    
  console.log ("Translate");
  Init_Matrix();
  Translate (3, 2, 1.5);
  Print_Matrix();
  
  console.log ("Scale");
  Init_Matrix();
  Scale (2, 3, 4);
  Print_Matrix();

  console.log ("Rotate X");
  Init_Matrix();
  RotateX (90);
  Print_Matrix();

  console.log ("Rotate Y");
  Init_Matrix();
  RotateY (-15);
  Print_Matrix();

  console.log ("Rotate Z and Re-initialize");
  Init_Matrix();
  RotateZ (45);
  Print_Matrix();
  Init_Matrix();
  Print_Matrix();

  console.log ("Translate and Scale");
  Init_Matrix();
  Translate (1.5, 2.5, 3.5);
  Scale (2, 2, 2);
  Print_Matrix();

  console.log ("Scale and Translate");
  Init_Matrix();
  Scale (4, 2, 0.5);
  Translate (2, -2, 10);
  Print_Matrix();

  console.log ("Scale and Translate Again");
  Init_Matrix();
  Scale (2, 2, 2);
  Print_Matrix();
  Init_Matrix();
  Translate (3.14159, 2.71828, 1.61803);
  Print_Matrix();

  console.log ("Multiple Scales and Translates");
  Init_Matrix();
  Scale (2, 4, 8);
  Scale (0.5, 0.25, 0.125);
  Print_Matrix();
  Translate (15, -6.5, 42);
  Translate (-15, 6.5, -42);
  Print_Matrix();
}

// not used
function draw() {
}
