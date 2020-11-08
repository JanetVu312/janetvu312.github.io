            // Get the WebGL context.

            var canvas = document.getElementById('canvas');

            var gl = canvas.getContext('experimental-webgl');


            // Pipeline setup.

            gl.clearColor(1, 1, 1, 1);

            // Backface culling.

            gl.frontFace(gl.CCW);

            gl.enable(gl.CULL_FACE);

            gl.cullFace(gl.BACK); // or gl.FRONT


            // START EA3

            var vsSource = ''
              +

              'attribute vec3 pos;'
              +

              'attribute vec4 col;'
              +

              'varying vec4 color;'
              +

              'void main(){'
              +

              'color = col;'
              +

              'gl_Position = vec4(pos * 0.3, 0.5);'
              +

              '}';

            // END EA3

            var vs = gl.createShader(gl.VERTEX_SHADER);

            gl.shaderSource(vs, vsSource);

            gl.compileShader(vs);


            // Compile fragment shader.

            fsSouce = 'precision mediump float;'
              +

              'varying vec4 color;'
              +

              'void main() {'
              +

              'gl_FragColor = color;'
              +

              '}';

            var fs = gl.createShader(gl.FRAGMENT_SHADER);

            gl.shaderSource(fs, fsSouce);

            gl.compileShader(fs);


            // Link shader together into a program.

            var prog = gl.createProgram();

            gl.attachShader(prog, vs);

            gl.attachShader(prog, fs);

            gl.linkProgram(prog);

            gl.useProgram(prog);


            // Vertex data.

            // START EA3

            var vertices = new Float32Array([
              0, 0, 0,
              1, 0.5, 0,
              0.5, 0.75, 0, // 2
              1, 1.75, 0, //3
              0, 1.75, 0, // 4.
              -1, 0.5, 0, //5
              -0.5, 0.75, 0, //6
              -1, 1.75, 0, //7
              0, 2.5, 0,

            ]);


            var colors = new Float32Array([
              1, 0, 0, 1, 0, 1, 0, 1,
              0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,
              0, 1, 1, 1,
              1, 0, 1, 1,
            ]);


            var indices = new Uint16Array([

              0, 1, 2,
              0, 2, 3,
              0, 3, 4,
              0, 4, 5,
              0, 5, 6,
              0, 6, 7,
              0, 7, 8,


            ]);

            //END EA3

            // Setup position vertex buffer object.

            var vboPos = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, vboPos);

            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable.

            var posAttrib = gl.getAttribLocation(prog, 'pos');

            gl.vertexAttribPointer(posAttrib, 3, gl.FLOAT, false, 0, 0);

            gl.enableVertexAttribArray(posAttrib);


            // Setup color vertex buffer object.

            var vboCol = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, vboCol);

            gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

            // Bind vertex buffer to attribute variable.

            var colAttrib = gl.getAttribLocation(prog, 'col');

            gl.vertexAttribPointer(colAttrib, 4, gl.FLOAT, false, 0, 0);

            gl.enableVertexAttribArray(colAttrib);


            // Setup index buffer object.

            var ibo = gl.createBuffer();

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices,

              gl.STATIC_DRAW);

            ibo.numerOfEmements = indices.length;


            // Clear framebuffer and render primitives.

            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.drawElements(gl.TRIANGLES, ibo.numerOfEmements,

              gl.UNSIGNED_SHORT, 0);
