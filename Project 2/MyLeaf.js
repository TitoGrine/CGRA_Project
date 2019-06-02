/**
 * MyLeaf
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeaf extends CGFobject {
	constructor(scene) {
		super(scene);

		this.initBuffers();
		this.initMaterials();
	}
	initBuffers() {

		
		this.vertices = [
			1, 1, 0.4,	//0
			0, 1.6, 0,	//1
			0, -2, 0, 	//2
			1, -1, 0.2, 	//3
			

			1, 1, 0.4,	//0
			0, 1.6, 0,	//1
			0, -2, 0, 	//2
			1, -1, 0.2, 	//3
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			0, 1, 2,
			2, 3, 0,
			2, 1, 0,
			0, 3, 2
		];

		this.normals = [
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1
		];

		this.texCoords = [
			0, 1.0,
			1.0 , 1.0,
			0, 0,
			1.0, 0
		]

		this.caule = new MyCylinder(this.scene, 6);
		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
		
	}
	initMaterials(){
		this.caule_apperance = new CGFappearance(this.scene);
        this.caule_apperance.setAmbient (0.4, 0.7, 0.4, 0.7);
        this.caule_apperance.setDiffuse (0.4, 0.7, 0.4, 0.8);
        this.caule_apperance.setSpecular(0.4, 0.7, 0.4, 0.6);
        this.caule_apperance.setShininess(10.0);
	}
	setDefaultAppearance(){
		this.scene.setAmbient(0.3, 0.7, 0.1, 1.0);
        this.scene.setDiffuse(0.3, 0.7, 0.1, 1.0);
        this.scene.setSpecular(0.3, 0.7, 0.1, 1.0);
		this.scene.setShininess(10.0);
	}
	setCaulePos(){
		this.scene.scale(0.05, 3, 0.05);
		this.scene.translate(0, -0.9, 0);
	}


	display(){
		//this.setDefaultAppearance();
		//this.drawElements(this.scene.gl.TRIANGLES);
		//super.display();
		this.scene.pushMatrix();
		this.scene.scale(-2.5,2.5, 2.5);
		this.scene.leaf_apperance.apply();
		super.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setCaulePos();
		this.caule_apperance.apply();
		this.caule.display();
		this.scene.popMatrix();

	}
}