/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene, x_scale, y_scale, z_scale) {
		super(scene);

		this.x_scale = x_scale;
		this.y_scale = y_scale;
		this.z_scale = z_scale;

		this.initBuffers();
	}
	
	initBuffers() {
		this.left = new MyQuad(this.scene, this.y_scale, this.z_scale);
		this.right = new MyQuad(this.scene, this.y_scale, this.z_scale);
		this.front = new MyQuad(this.scene, this.y_scale, this.x_scale);
		this.back =new MyQuad(this.scene, this.y_scale, this.x_scale);
		this.top = new MyQuad(this.scene, this.z_scale, this.x_scale);
		this.bottom = new MyQuad(this.scene, this.z_scale, this.x_scale);
	}

	setLeftPosition(){
		this.scene.translate(-0.5, 0, 0);
		this.scene.rotate(-Math.PI / 2, 0, 1, 0);
	}

	setRightPosition(){
		this.scene.translate(0.5, 0, 0);
		this.scene.rotate(Math.PI / 2, 0, 1, 0);
	}

	setBackPosition(){
		this.scene.translate(0, 0, -0.5);
		this.scene.rotate(Math.PI, 0, 1, 0);
	}

	setFrontPosition(){
		this.scene.translate(0, 0, 0.5);
	}
	
	setTopPosition(){
		this.scene.translate(0, 0.5, 0);
		this.scene.rotate(-Math.PI / 2, 1, 0, 0);
	}
	
	setBottomPosition(){
		this.scene.translate(0, -0.5, 0);
		this.scene.rotate(Math.PI / 2, 1, 0, 0);
	}

	display(){

		this.scene.pushMatrix();
		this.setLeftPosition();
		this.left.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setRightPosition();
		this.right.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setFrontPosition();
		this.front.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setBackPosition();
		this.back.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setTopPosition();
		this.top.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setBottomPosition();
		this.bottom.display();
		this.scene.popMatrix();
	}
}
