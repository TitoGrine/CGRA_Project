/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTriangle extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-1, 1, 0,	//0
			-1, -1, 0,	//1
			1, -1, 0,	//2

			-1, 1, 0,	//0
			-1, -1, 0,	//1
			1, -1, 0,	//2
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2, 
			2, 1, 0
		];
		
		this.normals = [];

		var pos_norm = [-2*0 - 0*0, 0*2 - 0*0, 0*0 - -2*2];
		var neg_norm = [0*0 - 0*-2, 0*0 - 2*0, 2*-2 - 0*0];

		var norm_size = Math.sqrt(pos_norm[0]*pos_norm[0] + pos_norm[1]*pos_norm[1] + pos_norm[2]*pos_norm[2])

		for(var i = 0; i < 3; i++){
			pos_norm[i] /= norm_size;
			neg_norm[i] /= norm_size;
		}

		this.normals.push(...pos_norm);
		this.normals.push(...pos_norm);
		this.normals.push(...pos_norm);

		this.normals.push(...neg_norm);
		this.normals.push(...neg_norm);
		this.normals.push(...neg_norm);
        
		/*
		Texture coords (s,t)
		+----------> s
        |
        |
		|
		v
        t
        */

	   this.texCoords = [
		0.0, 0.5,
		0.0, 1.0,
		0.0, 0.5
	]

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	updateTexCoords(coords) {
		this.texCoords = [...coords];
		this.updateTexCoordsGLBuffers();
	}
}