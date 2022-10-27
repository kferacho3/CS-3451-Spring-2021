//Kamal Feracho
//CS 3451
//Project 1A

// Matrix Library (for you to write!)
// You should modify the routines listed below to complete the assignment.
// Feel free to define any classes, global variables and helper routines that you need.
let sin = Math.sin;
let cos = Math.cos;
let ctm = [
    [1.0, 0.0, 0.0, 0.0],
    [0.0, 1.0, 0.0, 0.0],
    [0.0, 0.0, 1.0, 0.0],
    [0.0, 0.0, 0.0, 1.0]
    ];
//let stack =  ArrayList<Matrix>;

function Init_Matrix()
{
  let matrix = [
    [1.0, 0.0, 0.0, 0.0],
    [0.0, 1.0, 0.0, 0.0],
    [0.0, 0.0, 1.0, 0.0],
    [0.0, 0.0, 0.0, 1.0]
    ];
    tempMatr = ctm;
    ctm = matrix;
    return ctm;
    
}


function Translate(x, y, z)
{
let matrix = [
    [1.0, 0.0, 0.0, x],
    [0.0, 1.0, 0.0, y],
    [0.0, 0.0, 1.0, z],
    [0.0, 0.0, 0.0, 1.0]
    ];
  
  tempMatr = ctm;
  tempMatr = MatrixMult(ctm, matrix);
  ctm = tempMatr;
  return ctm;
 
}

function Scale(x, y, z)
{
  let matrix = [
    [x, 0.0, 0.0, 0.0],
    [0.0, y, 0.0, 0.0],
    [0.0, 0.0, z, 0.0],
    [0.0, 0.0, 0.0, 1.0]
    ];
    
  tempMatr = ctm;
  tempMatr = MatrixMult(ctm, matrix);
  ctm = tempMatr;
  return ctm;
}
function degrees_to_radians(degrees)
{
  let pi = Math.PI;
  return degrees * (pi/180);
}

function RotateX(theta)
{
  let matrix = [
    [1.0, 0.0, 0.0, 0.0],
    [0.0, cos(degrees_to_radians(theta)), -Math.sin(degrees_to_radians(theta)), 0.0],
    [0.0, sin(degrees_to_radians(theta)), cos(degrees_to_radians(theta)), 0.0],
    [0.0, 0.0, 0.0, 1.0]
    ];
 
  //simple rotation about X-axis
  tempMatr = ctm;
  tempMatr = MatrixMult(ctm, matrix);
  ctm = tempMatr;
  return ctm;
}

function RotateY(theta)
{
 let matrix = [
    [cos(degrees_to_radians(theta)), 0.0, sin(degrees_to_radians(theta)), 0.0],
    [0.0, 1.0, 0.0, 0.0],
    [-sin(degrees_to_radians(theta)), 0.0, cos(degrees_to_radians(theta)), 0.0],
    [0.0, 0.0, 0.0, 1.0]
    ];
 
  //simple rotation about Y-axis
  tempMatr = ctm;
  tempMatr = MatrixMult(ctm, matrix);
  ctm = tempMatr;
  return ctm;
}

function RotateZ(theta)
{
 let matrix = [
    [cos(degrees_to_radians(theta)), -sin(degrees_to_radians(theta)), 0.0, 0.0],
    [sin(degrees_to_radians(theta)), cos(degrees_to_radians(theta)), 0.0, 0.0],
    [0.0, 0.0, 1.0, 0.0],
    [0.0, 0.0, 0.0, 1.0]
    ];
 
 //simple rotation about Z-axis
  tempMatr = ctm;
  tempMatr = MatrixMult(ctm, matrix);
  ctm = tempMatr;
  return ctm;
}
function MatrixMult(matrix1, matrix2) {
  matrix = new Init_Matrix();
  for (let i = 0; i < 4; ++i) {
    for (let j = 0; j < 4; ++j) {
      matrix[i][j] = 0.0;
      for (let k = 0; k < 4; ++k) {
        matrix[i][j] += (matrix1[i][k]) * (matrix2[k][j]);
      }
    }
  }
  return matrix;
}

function Print_Matrix()
{
  for (let i = 0; i < ctm.length; ++i) {
    console.log(ctm[i]);
  }
}
