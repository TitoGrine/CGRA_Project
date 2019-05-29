class MyTreeBranch extends CGFobject {
    constructor(scene) {
		super(scene);
		this.side = 10;
        this.initBuffers();
        
        this.x_pos = this.scene.rand(-10.0, 10.0);
        this.y_pos = 0;
        this.z_pos = this.scene.rand(-10.0, 10.0);

        this.orientation = Math.PI * this.scene.rand(0.0, 360.0) / 180.0;
	}
	initBuffers() {
		this.wood = new MyCylinder(this.scene, this.side);
	}
    setBranchPos(){
        this.scene.translate(this.x_pos, this.y_pos, this.z_pos);
        this.scene.rotate(Math.PI / 2.0, 1.0, 0.0, 0.0);
        this.scene.rotate(this.orientation, 0.0, 0.0, 1.0);
        this.scene.scale(0.2, 2.0, 0.2);
    }
    display(){
        this.scene.pushMatrix();
        this.scene.woodText.apply();
		this.setBranchPos();
		this.wood.display();
		this.scene.popMatrix();
    }
}