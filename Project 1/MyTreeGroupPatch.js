/**
 * MyTree
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeGroupPatch extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	randomNumber(min, max) {
		return Math.random() * (max - min) + min;
	}

	initBuffers() {
		this.tree1 = new MyTree(this.scene, this.randomNumber(1.5, 3.0), this.randomNumber(0.25, 0.45), this.randomNumber(3.0, 5.0), this.randomNumber(0.7, 1.3), 'Images/trunk_texture.jpg', 'Images/TreeTop3.jpg');
		this.tree2 = new MyTree(this.scene, this.randomNumber(1.5, 3.0), this.randomNumber(0.25, 0.45), this.randomNumber(3.0, 5.0), this.randomNumber(0.7, 1.3), 'Images/trunk_texture.jpg', 'Images/TreeTop3.jpg');
		this.tree3 = new MyTree(this.scene, this.randomNumber(1.5, 3.0), this.randomNumber(0.25, 0.45), this.randomNumber(3.0, 5.0), this.randomNumber(0.7, 1.3), 'Images/trunk_texture.jpg', 'Images/TreeTop3.jpg');
		this.tree4 = new MyTree(this.scene, this.randomNumber(1.5, 3.0), this.randomNumber(0.25, 0.45), this.randomNumber(3.0, 5.0), this.randomNumber(0.7, 1.3), 'Images/trunk_texture.jpg', 'Images/TreeTop3.jpg');
		this.tree5 = new MyTree(this.scene, this.randomNumber(1.5, 3.0), this.randomNumber(0.25, 0.45), this.randomNumber(3.0, 5.0), this.randomNumber(0.7, 1.3), 'Images/trunk_texture.jpg', 'Images/TreeTop3.jpg');
		this.tree6 = new MyTree(this.scene, this.randomNumber(1.5, 3.0), this.randomNumber(0.25, 0.45), this.randomNumber(3.0, 5.0), this.randomNumber(0.7, 1.3), 'Images/trunk_texture.jpg', 'Images/TreeTop3.jpg');
		this.tree7 = new MyTree(this.scene, this.randomNumber(1.5, 3.0), this.randomNumber(0.25, 0.45), this.randomNumber(3.0, 5.0), this.randomNumber(0.7, 1.3), 'Images/trunk_texture.jpg', 'Images/TreeTop3.jpg');
		this.tree8 = new MyTree(this.scene, this.randomNumber(1.5, 3.0), this.randomNumber(0.25, 0.45), this.randomNumber(3.0, 5.0), this.randomNumber(0.7, 1.3), 'Images/trunk_texture.jpg', 'Images/TreeTop3.jpg');
		this.tree9 = new MyTree(this.scene, this.randomNumber(1.5, 3.0), this.randomNumber(0.25, 0.45), this.randomNumber(3.0, 5.0), this.randomNumber(0.7, 1.3), 'Images/trunk_texture.jpg', 'Images/TreeTop3.jpg');
		
		this.variations = [];
		for(let i = 0; i < 18; i++)
			this.variations.push(this.randomNumber(-0.5, 0.5));
	}
	
	setTree1Position() {
		this.scene.translate(0 - this.variations[0], 0, 0 - this.variations[1]);
	}

	setTree2Position() {
		this.scene.translate(0 - this.variations[2], 0, 3.0 - this.variations[3]);
	}

	setTree3Position() {
		this.scene.translate(0 - this.variations[4], 0, 6 - this.variations[5]);
	}

	setTree4Position() {
		this.scene.translate(3.0 - this.variations[6], 0, 0 - this.variations[7]);
	}

	setTree5Position() {
		this.scene.translate(3.0 - this.variations[8], 0, 3.0 - this.variations[9]);
	}

	setTree6Position() {
		this.scene.translate(3.0 - this.variations[10], 0, 6 - this.variations[11]);
	}

	setTree7Position() {
		this.scene.translate(6 - this.variations[12], 0, 0 - this.variations[13]);
	}

	setTree8Position() {
		this.scene.translate(6 - this.variations[14], 0, 3.0 - this.variations[15]);
	}

	setTree9Position() {
		this.scene.translate(6 - this.variations[16], 0, 6 - this.variations[17]);
	}

	display(){
		this.scene.pushMatrix();
		this.setTree1Position();
		this.tree1.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setTree2Position();
		this.tree2.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setTree3Position();
		this.tree3.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setTree4Position();
		this.tree4.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setTree5Position();
		this.tree5.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setTree6Position();
		this.tree6.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setTree7Position();
		this.tree7.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setTree8Position();
		this.tree8.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setTree9Position();
		this.tree9.display();
		this.scene.popMatrix();
	}
}