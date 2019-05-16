/**
 * MyQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene, x_scale, y_scale, z_scale, hill) {
		super(scene);

		this.x_scale = x_scale;
		this.y_scale = y_scale;
		this.z_scale = z_scale;
		this.hill = hill;

		this.initMaterials();
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

	initMaterials() {
		// Texture Appearance
		this.sideText = new CGFappearance(this.scene);
		this.sideText.setAmbient(0.46875, 0.28125, 0.0, 1.0);
        this.sideText.setDiffuse(0.46875, 0.28125, 0.0, 1.0);
        this.sideText.setSpecular(0, 0, 0, 1.0);
        this.sideText.setShininess(10);
		this.sideText.loadTexture('Images/mineSide.png');
		this.sideText.setTextureWrap('REPEAT', 'REPEAT');

		this.bottomText = new CGFappearance(this.scene);
		this.bottomText.setAmbient(0.46875, 0.28125, 0.0, 1.0);
        this.bottomText.setDiffuse(0.46875, 0.28125, 0.0, 1.0);
        this.bottomText.setSpecular(0, 0, 0, 1.0);
        this.bottomText.setShininess(10);
		this.bottomText.loadTexture('Images/mineBottom.png');
		this.bottomText.setTextureWrap('REPEAT', 'REPEAT');

		this.topText = new CGFappearance(this.scene);
		this.topText.setAmbient(0.204, 0.574, 0.176, 1);
        this.topText.setDiffuse(0.204, 0.574, 0.176, 1);
        this.topText.setSpecular(0.204 / 1.1, 0.574 / 1.1, 0.176 / 1.1, 1.0);
		this.topText.setShininess(10.0);
		this.topText.loadTexture('Images/mineTop.png');
		this.topText.setTextureWrap('REPEAT', 'REPEAT');

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
		if(this.hill){
			this.sideText.apply();
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		}

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

		if(this.hill){
			this.topText.apply();
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		}

		this.scene.pushMatrix();
		this.setTopPosition();
		this.top.display();
		this.scene.popMatrix();

		if(this.hill){
			this.bottomText.apply();
			this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
		}

		this.scene.pushMatrix();
		this.setBottomPosition();
		this.bottom.display();
		this.scene.popMatrix();
	}
}
