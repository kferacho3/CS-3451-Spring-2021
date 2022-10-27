//Kamal Feracho
//CS 3451
//Project 1B

// Matrix and Drawing Library

// Begin by using the matrix transformation routines from part A of this project.
// You should modify the new routines listed below to complete the assignment.
// Feel free to define any classes, global variables and helper routines that you need.
let sin = Math.sin;
let cos = Math.cos;
let tan = Math.tan;

let vertices = [];
let ortho = [];
let persp = [];
let orthgonal = false;
let perspective = false;

let ctm = [
    [1.0, 0.0, 0.0, 0.0],
    [0.0, 1.0, 0.0, 0.0],
    [0.0, 0.0, 1.0, 0.0],
    [0.0, 0.0, 0.0, 1.0]
    ];
   

function BeginShape() {
  vertices = [];
}

function EndShape() {
 vertices = [];
}

function Vertex(x, y, z) {
    let ver1 = [x, y, z];

    let ver2 = [0.0, 0.0, 0.0];
  //vertex = MatrixVerMult(ctm, vertex);
    //vertices.push(vertex);
    if (vertices.length != 0) {
      ver2 = vertices.pop();
      let start = [0.0, 0.0, 0.0, 0.0];
      let end = [0.0, 0.0, 0.0, 0.0];
      start = MatrixVerMult(ctm, ver1);
      end = MatrixVerMult(ctm, ver2);
      let xy1 = [0.0, 0.0];
      let xy2 = [0.0, 0.0];
      if (perspective) {
         let k = tan(persp[0] / 2.0);
         xy1[0] = (start[0] / abs(start[2]) + k) * (width / (2 * k));
         xy1[1] = (start[1] / abs(start[2]) + k) * (height / (2 * k));
         xy1[1] = height - xy1[1];
        
         xy2[0] = (end[0] / abs(end[2]) + k) * (width / (2 * k));
         xy2[1] = (end[1] / abs(end[2]) + k) * (height / (2 * k));
         xy2[1] = height - xy2[1];
         
      } else if (orthogonal) {
 
         xy1[0] = (start[0] - ortho[0]) * (width / (ortho[1] - ortho[0]));
         xy1[1] = (start[1] - ortho[2]) * (height / (ortho[3] - ortho[2]));
         xy1[1] = height - xy1[1];
         
         xy2[0] = (end[0] - ortho[0]) * (width / (ortho[1] - ortho[0]));
         xy2[1] = (end[1] - ortho[2]) * (height / (ortho[3] - ortho[2]));
         xy2[1] = height - xy2[1];
      } else {
        xy1[0] = x;
        xy1[1] = y;
        xy2[1] = ver2[1];
        xy2[0] = ver2[0];
      }
      line(xy1[0], xy1[1], xy2[0], xy2[1]);
    } else {
    vertices.push(ver1);
    }
}

function Perspective(field_of_view, near, far) {
  perspective = true;
  persp = [degrees_to_radians(field_of_view), near, far];
  return persp;
}

function Ortho (left, right, bottom, top, near, far) {
  orthogonal = true;
  ortho = [left, right, bottom, top, near, far];
  return ortho;
}

function Init_Matrix()
{
  //initializes Identity matrix and resets ctm
  let matrix = [
    [1.0, 0.0, 0.0, 0.0],
    [0.0, 1.0, 0.0, 0.0],
    [0.0, 0.0, 1.0, 0.0],
    [0.0, 0.0, 0.0, 1.0]
    ];
    tempMatr = ctm;
    ctm = matrix;
    ind = "";
    return ctm;
    
}

//translates matrix using passed in coordinates and mult function
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
//scales matrix using passed in coordinates and mult function
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
//function used to convert degrees to radians for rotations
function degrees_to_radians(degrees)
{
  let pi = Math.PI;
  return degrees * (pi/180);
}
//simple rotation about X-axis
function RotateX(theta)
{
  let matrix = [
    [1.0, 0.0, 0.0, 0.0],
    [0.0, cos(degrees_to_radians(theta)), -sin(degrees_to_radians(theta)), 0.0],
    [0.0, sin(degrees_to_radians(theta)), cos(degrees_to_radians(theta)), 0.0],
    [0.0, 0.0, 0.0, 1.0]
    ];
 
  
  tempMatr = ctm;
  tempMatr = MatrixMult(ctm, matrix);
  ctm = tempMatr;
  return ctm;
}
//simple rotation about Y-axis
function RotateY(theta)
{
 let matrix = [
    [cos(degrees_to_radians(theta)), 0.0, sin(degrees_to_radians(theta)), 0.0],
    [0.0, 1.0, 0.0, 0.0],
    [-sin(degrees_to_radians(theta)), 0.0, cos(degrees_to_radians(theta)), 0.0],
    [0.0, 0.0, 0.0, 1.0]
    ];
 
  
  tempMatr = ctm;
  tempMatr = MatrixMult(ctm, matrix);
  ctm = tempMatr;
  return ctm;
}
//simple rotation about Z-axis
function RotateZ(theta)
{
 let matrix = [
    [cos(degrees_to_radians(theta)), -sin(degrees_to_radians(theta)), 0.0, 0.0],
    [sin(degrees_to_radians(theta)), cos(degrees_to_radians(theta)), 0.0, 0.0],
    [0.0, 0.0, 1.0, 0.0],
    [0.0, 0.0, 0.0, 1.0]
    ];
 
 
  tempMatr = ctm;
  tempMatr = MatrixMult(ctm, matrix);
  ctm = tempMatr;
  return ctm;
}
//matrix multiplecation routine used to apply matrix transformations to our ctm
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

function MatrixVerMult(matrix1, vertex) {
  let matrix = [0.0, 0.0, 0.0, 0.0];
  let mat = [vertex[0], vertex[1], vertex[2], 1.0];
  
  for (let i = 0; i < 4; ++i) {
    matrix[i] = 0.0;
    for (let j = 0; j < 4; ++j) {
      matrix[i] += matrix1[i][j] * mat[j];
    }
  }
  return matrix;
}
//prints out matrix in a readable fashion
function Print_Matrix()
{
  for (let i = 0; i < ctm.length; ++i) {
    console.log(ctm[i]);
  }
  console.log("\n");
}
