/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeaf extends CGFobject {
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

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
		];

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

	setDefaultAppearance(){
		this.scene.setAmbient(0.3, 0.7, 0.1, 1.0);
        this.scene.setDiffuse(0.3, 0.7, 0.1, 1.0);
        this.scene.setSpecular(0.3, 0.7, 0.1, 1.0);
        this.scene.setShininess(10.0);
	}


	display(){
		this.setDefaultAppearance();
		this.drawElements(this.scene.gl.TRIANGLES);
	}
}