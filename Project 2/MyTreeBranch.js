class MyTreeBranch extends CGFobject {
    constructor(scene) {
		super(scene);
		this.side = 10;
        this.initBuffers();
        
        this.y_pos = 0;

        if(Math.round(this.scene.rand(0, 1))){
			this.x_pos = this.scene.rand(-10.0, 0.0);
			this.z_pos = this.scene.rand(-10.0, 3.0);
		}
		else{
			this.x_pos = this.scene.rand(-6.0, 9.5);
			this.z_pos = this.scene.rand(-4.0, 8.5);
		}

        this.orientation = Math.PI * this.scene.rand(0.0, Math.PI);
	}
	initBuffers() {
		this.wood = new MyCylinder(this.scene, this.side);
	}
    setBranchPos(){
        this.scene.translate(this.x_pos, this.y_pos, this.z_pos);
        this.scene.rotate(Math.PI / 2.0, 1.0, 0.0, 0.0);
        this.scene.rotate(this.orientation, 0.0, 0.0, 1.0);
        this.scene.scale(0.1, 1.5, 0.1);
    }
    display(){
        this.scene.pushMatrix();
        this.scene.woodText.apply();
		this.setBranchPos();
		this.wood.display();
		this.scene.popMatrix();
    }
}