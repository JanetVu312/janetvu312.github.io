window.onload = function () {
    var canvas = document.getElementById('canvas');
    var gl = canvas.getContext('experimental-webgl');

    // Pipeline setup.
    //gl.clearColor(0.1, 0.1, 0.6, 0.2);
	 gl.clearColor(0, 0, 0, 0);
	
    // Backface culling.
    gl.frontFace(gl.CCW);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    // Polygon offset of rastered Fragments.
    gl.enable(gl.POLYGON_OFFSET_FILL);
    gl.polygonOffset(1.0, 1.0);

    // Compile vertex shader.
    var vsSource = '' +
        'attribute vec3 pos;' +
        'attribute vec4 col;' +
        'varying vec4 color;' +
        'void main(){' + 'color = vec4(col.x, col.y, col.z, 1);' +
        'gl_Position = vec4(pos, 1.3);' +
        '}';
    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    // Compile fragment shader.
    var fsSource = 'precision mediump float;' +
        'varying vec4 color;' +
        'void main() {' +
        'gl_FragColor = color;' +
        '}';
    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSource);
    gl.compileShader(fs);

    // Link shader together into a program.
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.bindAttribLocation(prog, 0, "pos");
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // Vertex data Helix.
    // Positions, Index data.
    var verticesHelix, normalsHelix, colorsHelix, indicesLinesHelix, indicesTrisHelix;

    // Fill the data arrays.
    createVertexDataHelix();

    // Setup position vertex buffer object.
    var vboPosHelix = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboPosHelix);
    gl.bufferData(gl.ARRAY_BUFFER, verticesHelix, gl.STATIC_DRAW);

    // Bind vertex buffer to attribute variable.
    var posAttribHelix = gl.getAttribLocation(prog, 'pos');
    gl.vertexAttribPointer(posAttribHelix, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttribHelix);
	
	// Setup normal vertex buffer object.
    var vboNormal = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboNormal);
    gl.bufferData(gl.ARRAY_BUFFER,
    normalsHelix, gl.STATIC_DRAW);

    // Bind buffer to attribute variable.
    var colAttrib = gl.getAttribLocation(prog, 'col');
    gl.vertexAttribPointer(colAttrib, 3, gl.FLOAT,
        false, 0, 0);
    gl.enableVertexAttribArray(colAttrib);

    // Setup constant color.
   // var vboColHelix = gl.createBuffer();
   // gl.bindBuffer(gl.ARRAY_BUFFER, vboColHelix);
   // gl.bufferData(gl.ARRAY_BUFFER, colorsHelix, gl.STATIC_DRAW);


    // Setup lines index buffer object.
    var iboLinesHelix = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLinesHelix);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesLinesHelix, gl.STATIC_DRAW);
    iboLinesHelix.numberOfElements = indicesLinesHelix.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    // Setup tris index buffer object.
    var iboTrisHelix = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTrisHelix);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesTrisHelix, gl.STATIC_DRAW);
    iboTrisHelix.numberOfElements = indicesTrisHelix.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    // Clear framebuffer and render primitives.
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Bind vertex buffer to attribute variable.
    var colAttribHelix = gl.getAttribLocation(prog, 'col');

    //START EA4

    // Setup rendering tris.
    //gl.disableVertexAttribArray(colAttrib);
    //gl.vertexAttrib4f(colAttribHelix, 0.2, 0.2, 0.2, 1); //fill color
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTrisHelix);
    gl.drawElements(gl.TRIANGLES, iboTrisHelix.numberOfElements, gl.UNSIGNED_SHORT, 0);

    // Setup rendering lines.
   // gl.vertexAttrib4f(colAttribHelix, 0.5, 0.6, 0.7, 1); //line color
	gl.disableVertexAttribArray(colAttrib);
	gl.vertexAttrib3f(colAttrib, 0.5, 0.6, 0.7, 1);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLinesHelix);
    gl.drawElements(gl.LINES, iboLinesHelix.numberOfElements, gl.UNSIGNED_SHORT, 0);
	

   function createVertexDataHelix() {     // 
            var n = 40;
            var m = 18;
    var a = 0.8; //1
    var b = 3.3; //3.2
    var c = 0.51; //0.51
    var du = 7 * Math.PI / n; //6
    var dv = 4 * Math.PI / m; //4

            // Positions.
            verticesHelix = new Float32Array(3 * (n + 1) * (m + 1));
            // Index data.
            indicesLinesHelix = new Uint16Array(2 * 2 * n * m);
            indicesTrisHelix = new Uint16Array(3 * 2 * n * m);
            // Normals.
            normalsHelix = new Float32Array(3 * (n + 1) * (m + 1));

            // Counter for entries in index array.
            var iLines = 0;
            var iTris = 0;

            // Loop angle t.
            for (var i = 0, u = 0; i <= n; i++, u += du) {
                // Loop height u.
                for (var j = 0, v = 0; j <= m; j++, v += dv) {

                    var iVertex = i * (m + 1) + j;
                    var h = Math.pow(Math.E, u / (6 * Math.PI));
                    var x = (a * (1 - h) * Math.cos(u) * Math.cos(0.5 * v) * Math.cos(0.5 * v)) * c;
                    var y = (1 - Math.pow(Math.E, u / (b * Math.PI)) - Math.sin(v) + h * Math.sin(v)) * c + 1.25;
                    var z = (a * (-1 + h) * Math.sin(u) * Math.cos(0.5 * v) * Math.cos(0.5 * v)) * c;

                    // Set vertex positions.
                    verticesHelix[iVertex * 3] = x;
                    verticesHelix[iVertex * 3 + 1] = y;
                    verticesHelix[iVertex * 3 + 2] = z;
					
					// Calc and set normals.
                    var vertexLength = Math.sqrt(x*x+y*y+z*z);
                    normalsHelix[iVertex * 3] = x/vertexLength;
                    normalsHelix[iVertex * 3 + 2] = y/vertexLength;
                    normalsHelix[iVertex * 3 + 2] = z/vertexLength;

                    // Set index.
                    // Line on beam.
                    if (j > 0 && i > 0) {
                        indicesLinesHelix[iLines++] = iVertex - 1;
                        indicesLinesHelix[iLines++] = iVertex;
                    }
                    // Line on ring.
                    if (j > 0 && i > 0) {
                        indicesLinesHelix[iLines++] = iVertex - (m + 1);
                        indicesLinesHelix[iLines++] = iVertex;
                    }

                    // Set index.
                    // Two Triangles.
                    if (j > 0 && i > 0) {
                        indicesTrisHelix[iTris++] = iVertex;
                        indicesTrisHelix[iTris++] = iVertex - 1;
                        indicesTrisHelix[iTris++] = iVertex - (m + 1);

                        indicesTrisHelix[iTris++] = iVertex - 1;
                        indicesTrisHelix[iTris++] = iVertex - (m + 1) - 1;
                        indicesTrisHelix[iTris++] = iVertex - (m + 1);
                    }
                }
            }
    }

    // Vertex data.
    // Positions, index data.
    var vertices, normals, colors, indicesLines, indicesTris;
    // Fill the data arrays.
    createVertexDataAntisymmetricHelix();

    // Setup position vertex buffer object.
    var vboPos = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Bind vertex buffer to attribute variable.
    var posAttrib = gl.getAttribLocation(prog, 'pos');
    gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(posAttrib);
	
	// Setup normal vertex buffer object.
    var vboNormal = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vboNormal);
    gl.bufferData(gl.ARRAY_BUFFER,
        normals, gl.STATIC_DRAW);
	
	// Bind buffer to attribute variable.
    var colAttrib = gl.getAttribLocation(prog, 'col');
    gl.vertexAttribPointer(colAttrib, 3, gl.FLOAT,
        false, 0, 0);
    gl.enableVertexAttribArray(colAttrib);

    // Setup lines index buffer object.
    var iboLines = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesLines, gl.STATIC_DRAW);
    iboLines.numberOfElements = indicesLines.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    // Setup tris index buffer object.
    var iboTris = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indicesTris, gl.STATIC_DRAW);
    iboTris.numberOfElements = indicesTris.length;
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

    // Setup rendering tris.
    gl.disableVertexAttribArray(colAttrib);
    gl.vertexAttrib4f(colAttrib, 0.23, 1.05, 0.9, 1);
  
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboTris);
    gl.drawElements(gl.TRIANGLES,
        iboTris.numberOfElements, gl.UNSIGNED_SHORT, 0);

    // Setup rendering lines.
    gl.disableVertexAttribArray(colAttrib);
    gl.vertexAttrib4f(colAttrib, 0, 0, 0, 1);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iboLines);
    gl.drawElements(gl.LINES,
        iboLines.numberOfElements, gl.UNSIGNED_SHORT, 0);

	function createVertexDataAntisymmetricHelix() {
        var n = 2;
    var m = 15; //10
    var a = 1.25; //1
    var b = 0.1; //0.1
    var c = 1; //2
    var du = 2 * Math.PI / n;
    var dv = 2.3 * Math.PI / m;

        // Counter for entries in index array.
        var iLines = 0;
        var iTris = 0;

        // Positions.
        vertices = new Float32Array(3 * (n + 1) * (m + 1));
        colors = new Float32Array(3 * (n + 1) * (m + 1));
		
		normals = new Float32Array(3 * (n + 1) * (m + 1));

        // Index data.
        indicesLines = new Uint16Array(2 * 2 * n * m);
        indicesTris = new Uint16Array(3 * 2 * n * m);
		
	

        // Loop angle u.
        for (var i = 0, u = -1; i <= n; i++, u += du) {
            // Loop height v.
            for (var j = 0, v = -1; j <= m; j++, v += dv) {
                var iVertex = i * (m + 1) + j;
                var x = (a + b * Math.cos(v) * (c + Math.sin(u))) * Math.cos(u);
                var z = (a + b * Math.cos(v) * (c + Math.sin(u))) * Math.sin(u);
                var y = b * Math.sin(v) * (c + Math.sin(u));

                // Set vertex positions.
                vertices[iVertex * 3] = x;
                vertices[iVertex * 3 + 1] = y;
                vertices[iVertex * 3 + 2] = z;
				
				// Calc and set normals.
                var vertexLength = Math.sqrt(x*x+y*y+z*z);
                normals[iVertex * 3] = x/vertexLength;
                normals[iVertex * 3 + 1] = y/vertexLength;
                normals[iVertex * 3 + 2] = z/vertexLength;

                // Set index.
                // Line on beam.
                if (j > 0 && i > 0) {
                    indicesLines[iLines++] = iVertex - 1;
                    indicesLines[iLines++] = iVertex;
                }
                // Line on ring.
                if (j > 0 && i > 0) {
                    indicesLines[iLines++] = iVertex - (m + 1);
                    indicesLines[iLines++] = iVertex;
                }

                // Set index.
                // Two Triangles.
                if (j > 0 && i > 0) {
                    indicesTris[iTris++] = iVertex;
                    indicesTris[iTris++] = iVertex - 1;
                    indicesTris[iTris++] = iVertex - (m + 1);
                    //
                    indicesTris[iTris++] = iVertex - 1;
                    indicesTris[iTris++] = iVertex - (m + 1) - 1;
                    indicesTris[iTris++] = iVertex - (m + 1);
                }
            }
        }
    }

    // END
};
