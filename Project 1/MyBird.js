class MyBird extends CGFobject {
	constructor(scene) {
        super(scene);
        this.z = 0.5;
        this.increment = 0.02;
		this.initBuffers();
    }
    initBuffers(){
        this.vertices = [
			0.0, 0.0, 0.0,	//0
			0.0, 0.0, 0.5,	//1
			this.z, 1 - this.z, 0.75,	//2
            -this.z, 1 - this.z, 0.75,	//3
            
            0.0, 0.0, 0.0,	//0
			0.0, 0.0, 0.5,	//1
        ];

        var normal= [
            1 - this.z,
            this.z, 
            0,
        ];

        var nsize=Math.sqrt(
            normal[0]*normal[0]+
            normal[1]*normal[1]+
            normal[2]*normal[2]
            );
        normal[0]/=nsize;
        normal[1]/=nsize;
        normal[2]/=nsize;

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
            0, 1, 3,
            0, 2, 1,
            0, 3, 1
		];

		//Facing Z positive
		this.normals = [
			-normal[0], normal[1], normal[2],
            normal[0], normal[1], normal[2],
			-normal[0], normal[1], normal[2],
            normal[0], normal[1], normal[2],
            
            normal[0], normal[1], normal[2],
			-normal[0], normal[1], normal[2]
		];
	
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
    updateWings(){
        if(this.z > 1.0)
            this.increment = -0.02;
        else if (this.z < 0.5)
            this.increment = 0.05;

        this.z += this.increment;
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}