/**
 * MyFire
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFire extends CGFobject {
	constructor(scene, number_blaze) {
		super(scene);
		this.side = 10;
		this.n_blaze = number_blaze;
		this.initMaterials();
		this.initBuffers();
		
	}
	initBuffers() {
		this.wood = new MyCylinder(this.scene, this.side);
		this.blaze = new MyCone(this.scene, this.side, 1);

		this.trans = [];
		this.rot = [];
		this.sca = [];
		for(var i = 0; i < this.n_blaze; i++){
			this.trans.push(this.randomNumber(-0.3, 0.3), this.randomNumber(0, 0.22), this.randomNumber(-0.3, 0.3));
			// Mexer no 7 para cima para por mais para cima
			this.rot.push(this.randomNumber(3, 7), this.randomNumber(-1, 1), this.randomNumber(-1, 1), this.randomNumber(-1, 1));
			this.sca.push(this.randomNumber(-0.05, 0.05), this.randomNumber(0.8, 2), this.randomNumber(-0.05, 0.05));
		}
	}

	initMaterials() {

		// Texture Appearance
		this.woodText = new CGFappearance(this.scene);
		this.woodText.setAmbient(0.713, 0.6078, 0.298, 0.6);
        this.woodText.setDiffuse(0.713, 0.6078, 0.298, 1.0);
        this.woodText.setSpecular(0, 0, 0, 0.1);
		this.woodText.setShininess(10.0);
		this.woodText.loadTexture("Images/trunk_texture.png");
		this.woodText.setTextureWrap('REPEAT', 'REPEAT');

		this.fireText = new CGFappearance(this.scene);
		this.fireText.setAmbient(0.886, 0.345, 0.133, 1.0);
        this.fireText.setDiffuse(0.886, 0.345, 0.133, 0.5);
        this.fireText.setSpecular(1.0, 0.9098, 0.0314, 1.0);
		this.fireText.setShininess(10.0);
		this.fireText.loadTexture("Images/blaze.jpg");
		this.fireText.setTextureWrap('REPEAT', 'REPEAT');
	}
	
	setWood1Position() {
		this.scene.translate(0, 0.22, 0);
		this.scene.rotate(-Math.PI / 4, 0, 1, 0);
		this.scene.rotate(-Math.PI / 2, 0, 0, 1);
		this.scene.scale(0.2, 2, 0.2);
	}

	setWood2Position() {
		this.scene.translate(0, 0.22, Math.sqrt(2));
		this.scene.rotate(Math.PI / 4, 0, 1, 0);
		this.scene.rotate(-Math.PI / 2, 0, 0, 1);
		this.scene.scale(0.22, 2, 0.22);
	}

	randomNumber(min, max) {
		return Math.random() * (max - min) + min;
	}
	
	setBlazePosition(transX, transY, transZ, rotG, rotX, rotY, rotZ, scaX, scaY, scaZ) {
		this.scene.translate(Math.sqrt(2) / 2 - transX, 0 + transY, Math.sqrt(2) / 2 - transZ);
		this.scene.rotate(Math.PI / rotG, Math.round(rotX), Math.round(rotY), Math.round(rotZ));
		this.scene.scale(0.22 - scaX, scaY, 0.22 - scaZ);
	}

	display(){
		this.woodText.apply();

		this.scene.pushMatrix();
		this.setWood1Position();
		this.wood.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setWood2Position();
		this.wood.display();
		this.scene.popMatrix();

		this.fireText.apply();
		for(var i = 0; i < this.n_blaze; i++){
			this.scene.pushMatrix();
			this.setBlazePosition(this.trans[i * 3], this.trans[i * 3 + 1], this.trans[i * 3 + 2], this.rot[i * 4], this.rot[i * 4 + 1], this.rot[i * 4 + 2], this.rot[i * 4 + 3], this.sca[i * 3], this.sca[i * 3 + 1], this.sca[i * 3 + 2]);
			this.blaze.display();
			this.scene.popMatrix();
		}
	}
}