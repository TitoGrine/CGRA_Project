class MyTreeBranch extends CGFobject {
    constructor(scene) {
		super(scene);
		this.side = 10;
		this.initMaterials();
        this.initBuffers();
        
        this.x_pos = this.scene.rand(-10.0, 10.0);
        this.y_pos = 0;
        this.z_pos = this.scene.rand(-10.0, 10.0);

        this.orientation = Math.PI * this.scene.rand(0.0, 360.0) / 180.0;
	}
	initBuffers() {
		this.wood = new MyCylinder(this.scene, this.side);
	}
	initMaterials(){
        // Texture Appearance
		this.woodText = new CGFappearance(this.scene);
		this.woodText.setAmbient(0.713, 0.6078, 0.298, 0.6);
        this.woodText.setDiffuse(0.713, 0.6078, 0.298, 1.0);
        this.woodText.setSpecular(0, 0, 0, 0.1);
		this.woodText.setShininess(10.0);
		this.woodText.loadTexture("Images/trunk_texture.png");
		this.woodText.setTextureWrap('REPEAT', 'REPEAT');
    }
    setBranchPos(){
        this.scene.translate(this.x_pos, this.y_pos, this.z_pos);
        this.scene.rotate(Math.PI / 2.0, 1.0, 0.0, 0.0);
        this.scene.rotate(this.orientation, 0.0, 0.0, 1.0);
        this.scene.scale(0.2, 2.0, 0.2);
    }
    display(){
        this.scene.pushMatrix();
        this.woodText.apply();
		this.setBranchPos();
		this.wood.display();
		this.scene.popMatrix();
    }
}