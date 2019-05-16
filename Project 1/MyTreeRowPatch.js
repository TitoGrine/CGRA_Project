/**
 * MyTree
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTreeRowPatch extends CGFobject {
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
		
		this.variations = [];
		for(let i = 0; i < 12; i++)
			this.variations.push(this.randomNumber(-0.45, 0.45));
	}
	
	setTree1Position() {
		this.scene.translate(0 - this.variations[0], 0, 0 - this.variations[1]);
	}

	setTree2Position() {
		this.scene.translate(2.5 - this.variations[2], 0, 0 - this.variations[3]);
	}

	setTree3Position() {
		this.scene.translate(5 - this.variations[4], 0, 0 - this.variations[5]);
	}

	setTree4Position() {
		this.scene.translate(7.5 - this.variations[6], 0, 0 - this.variations[7]);
	}

	setTree5Position() {
		this.scene.translate(10 - this.variations[8], 0, 0 - this.variations[9]);
	}

	setTree6Position() {
		this.scene.translate(12.5 - this.variations[10], 0, 0 - this.variations[11]);
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
	}
}