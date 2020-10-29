window.onload = function () {
  var canvas = document.getElementById('canvas');
  var gl = canvas.getContext('experimental-webgl');
	

  // START EA 2
  var vsSource = 'attribute vec2 pos;'
    + 'void main(){ gl_Position = vec4(pos *  0.85, 0, 3);'
    + 'gl_PointSize = 10.0; }';
	
	gl.clearColor(1, 1, 1, 1); //2, 3, 0, 1

  var vs = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vs, vsSource);
  gl.compileShader(vs);
  // END EA 2

  // START EA 2 - Color
  var fsSource = 'void main() { gl_FragColor = vec4(3, 0.51, 0.77, 5); }'; 
  // END EA 2

  var fs = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fs, fsSource);
  gl.compileShader(fs);

  // Link together into a program
  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  gl.useProgram(prog);

  // START
  // Load vertex data into a buffer


  var vertices = new Float32Array([
    0, 0, 
    3, 0,          
    0, 3, 
    3, 3, 
    1.5, 6, 
    0, 3, 
    0, 0, 
    3, 3, 
    3, 0,
    
    
    
    1, 1,
    1.5, 1.5,
    2, 2,
    0, 2,
    2, 0,
    0, 3,
    3, 0,

    -1, -1,
    -1.5, -1.5,
    -2, -2,
    -0, -2,
    -2, -0,
    -0, -3,
    -3, -0,

    1, -1,
    1.5, -1.5,
    2, -2,
    0, -2,
    2, -0,
    0, -3,
    3, -0,

    -1, 1,
    -1.5, 1.5,
    -2, 2,
    -0, 2,
    -2, 0,
    -0, 3,
    -3, 0


  ]);


  //var vertices = new Float32Array([1, 1, -1, 1, -1, -1, 1, -1]);

  // END EA 2
  var vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  // Bind vertex buffer to attribute variable
  var posAttrib = gl.getAttribLocation(prog, 'pos');
  gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(posAttrib);

  // Clear framebuffer and render primitives
  gl.clear(gl.COLOR_BUFFER_BIT);
  // START
  gl.drawArrays(gl.LINE_LOOP, 0, 28);
  // END EA 2
};
