class MyPlane extends CGFobject {
    constructor(scene, nDivs, x_scale, y_scale) {
        super(scene);
        nDivs = typeof nDivs !== 'undefined' ? nDivs : 1;

        this.nDivs = nDivs;
		this.patchLength = 1.0 / nDivs;

		this.x_scale = x_scale;
		this.y_scale = y_scale;

		this.initBuffers();
    }

    initBuffers() {
        /* example for nDivs = 3 :
        (numbers represent index of point in array)
        ('x's represent vertices which are drawn but not stored

        y
        ^
        |
        0    2    4    6    
        |
        1    3    5    7
        |
        x	 x	  x    x
        |
        x----x----x----x---> x
        */

        // Generate vertices
		this.vertices = [];
		this.texCoords = [];
		this.incr = 1/this.nDivs;
        var xCoord = -0.5;
        for (var i = 0; i <= this.nDivs; i++) {
            this.vertices.push(xCoord, 0.5, 0);
			this.vertices.push(xCoord, 0.5 - this.patchLength, 0);
			this.texCoords.push((i / this.nDivs) * this.y_scale, (1) * this.x_scale);
			this.texCoords.push((i / this.nDivs) * this.y_scale, (1 - this.incr) * this.x_scale);
            xCoord += this.patchLength;
		}
		this.iniTexCoords = this.texCoords;
		this.currTexCoords = this.texCoords;
/*
		this.texCoords = [
			0, this.x_scale,
			this.y_scale, this.x_scale,
			0, 0,
			this.y_scale, 0
		]*/


        // Generating indices
        /* for nDivs = 3 output will be [0, 1, 2, 3, 4, 5, 6, 7].
        Interpreting this index list as a TRIANGLE_STRIP will draw a row of the plane. */
        this.indices = [];
        for (var i = 0; i <= 2 * this.nDivs + 1; i++) {
            this.indices.push(i);
        }

        // Generating normals
        /*
        As this plane is being drawn on the xy plane, the normal to the plane will be along the positive z axis.
        So all the vertices will have the same normal, (0, 0, 1).
        */
        this.normals = [];
        for (var i = 0; i <= 2 * this.nDivs + 1; i++) {
            this.normals.push(0, 0, 1);
		}
		

        this.primitiveType = this.scene.gl.TRIANGLE_STRIP;
        this.initGLBuffers();
	}
	

    // Drawing the plane
    /*
    To draw the plane we need to draw the row we defined, nDivs times.
    Each row must be drawn patchLength lower than the one before it.
    To draw each row, the drawElements() function is used. This function draws the geometry defined in initBuffers();
    */
	updateTexCoords(){
		for (var i = 1; i < this.currTexCoords.length; i += 2)
			this.currTexCoords[i] -= (this.incr * this.x_scale);
	}

    display() {
		this.scene.pushMatrix();
		this.currTexCoords = this.iniTexCoords;
		this.texCoords = this.currTexCoords;
		this.updateTexCoordsGLBuffers();

        for (var i = 0; i < this.nDivs; i++) {
            super.display();
			this.scene.translate(0, -this.patchLength, 0);
			this.updateTexCoords();
			this.texCoords = this.currTexCoords;
			this.updateTexCoordsGLBuffers();
		}
        this.scene.popMatrix();
    }

    updateBuffers(complexity){
        this.nDivs = 1 +  Math.round(9 * complexity); //complexity varies 0-1, so nDivs varies 1-10
        this.patchLength = 1.0 / this. nDivs;

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}