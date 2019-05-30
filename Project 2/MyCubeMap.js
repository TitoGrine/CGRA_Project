/**
 * MyCubeMap
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyCubeMap extends CGFobject {
	constructor(scene, cubeMapTexture) {
		super(scene);
		this.margem = 0.0005;
		this.cubeMapTexture = cubeMapTexture;
        this.initBuffers();
        this.initMaterial();
	}
	initBuffers() {
		this.vertices = [
            30.0, -30.0, 30.0,	    //0
            30.0, 30.0, 30.0,  	    //1
			30.0, -30.0, -30.0,	    //2
            30.0, 30.0, -30.0, 	    //3
            -30.0, -30.0, 30.0,	    //4
            -30.0, 30.0, 30.0,	    //5
            -30.0, -30.0, -30.0,	//6
            -30.0, 30.0, -30.0, 	//7

            30.0, -30.0, 30.0,      //8
            30.0, 30.0, 30.0,  	    //9
			30.0, -30.0, -30.0,	    //10
            30.0, 30.0, -30.0, 	    //11
            -30.0, -30.0, 30.0,	    //12
            -30.0, 30.0, 30.0,	    //13
            -30.0, -30.0, -30.0,	//14
            -30.0, 30.0, -30.0,	    //15

            30.0, -30.0, 30.0,	    //16
            30.0, 30.0, 30.0,  	    //17
			30.0, -30.0, -30.0,	    //18
            30.0, 30.0, -30.0, 	    //19
            -30.0, -30.0, 30.0,	    //20
            -30.0, 30.0, 30.0,	    //21
            -30.0, -30.0, -30.0,	//22
            -30.0, 30.0, -30.0,	    //23
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            // Face [0, 1, 2, 3] - RIGHT
            0, 3, 2,
            0, 1, 3,

            // Face [4, 5, 6, 7] - LEFT
            4, 7, 5,
            4, 6, 7,

            // Face [0, 1, 4, 5] - FRONT
            12, 9, 8,
            12, 13, 9,
 
            // Face [2, 3, 6, 7] - BACK
            14, 10, 11,
            14, 11, 15,

            // Face [1, 3, 5, 7] - TOP
            19, 17, 21,
            19, 21, 23,

            // Face [0, 2, 4, 6] - BOTTOM
            18, 22, 20,
            18, 20, 16,
		];

        this.normals = [
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            -1.0, 0.0, 0.0,
            
            0.0, -1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, 1.0, 0.0,
            0.0, -1.0, 0.0,
            0.0, 1.0, 0.0,

            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, -1.0,
            0.0, 0.0, -1.0,
        ];

        this.texCoords=[
            1.0, 0.5,            //
            1.0, 0.0,            //
            2.0/3.0 + this.margem, 0.5,        //
            2.0/3.0 + this.margem, 0.0,        //
            2.0/3.0 + this.margem, 1.0,
            2.0/3.0 + this.margem, 0.5,
            1.0, 1.0,
            1.0, 0.5,

            1.0/3.0 + this.margem, 0.5,        //
            1.0/3.0 + this.margem, 0.0,        //
            2.0/3.0 - this.margem, 1.0,
            2.0/3.0 - this.margem, 0.5,
            2.0/3.0 - this.margem, 0.5,        //
            2.0/3.0 - this.margem, 0.0,        //
            1.0/3.0 + this.margem, 1.0,
            1.0/3.0 + this.margem, 0.5, 

            1.0/3.0 - this.margem, 0.5, 
            1.0/3.0 - this.margem, 0.5,        //
            0.0, 0.5,
            0.0, 0.5,            //
            1.0/3.0 - this.margem, 1.0, 
            1.0/3.0 - this.margem, 0.0,        //
            0.0, 1.0,
            0.0, 0.0,            //
        ]

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
    }
    initMaterial() {
        this.background = new CGFappearance(this.scene);
        this.background.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.background.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.background.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.background.setShininess(1.0);
        this.background.loadTexture(this.cubeMapTexture);
        this.background.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
	}
	setCubeMapTexture(cubeMapTexture){
		this.background.loadTexture(cubeMapTexture);
	}
    display(){
        this.scene.pushMatrix();
        this.background.apply();
        this.drawElements(this.primitiveType);
        this.scene.popMatrix();
    }
}
