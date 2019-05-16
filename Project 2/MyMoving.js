class MyMoving extends CGFobject {
    constructor(scene) {
		super(scene);
		
		this.vel = 0;
		this.direction = 0;
		this.pos = [0, 3, 0];

        this.initBuffers();
        this.initMaterials();

	}
	
    initBuffers(){
        this.cube = new MyUnitCubeQuad(this.scene, 4.0, 4.0, 4.0);
	}
	
    initMaterials(){
        this.redTexture = new CGFappearance(this.scene);
        this.redTexture.setAmbient(1.0, 0.2, 0.2, 0.4);
        this.redTexture.setDiffuse(1.0, 0.2, 0.2, 0.7);
        this.redTexture.setSpecular(1.0, 0.2, 0.2, 0.1);
	}
	
    setPosition(){
		this.scene.translate(this.pos[0], this.pos[1], this.pos[2]);
		this.scene.rotate(this.direction, 0, 1, 0);
        this.scene.scale(4.0, 4.0, 4.0);
	}

	update(){
		var desloc = [Math.cos(-this.direction) * this.vel, 0, Math.sin(-this.direction) * this.vel];
		this.pos[0] += desloc[0];
		this.pos[1] += desloc[1];
		this.pos[2] += desloc[2];
	}

	turn(v){
		this.direction += v;
	}

	accelarate(v){
		if(v > 0)
			this.vel += 0.2;
		else if(v < 0)
			this.vel -= 0.2;	
	}

	reset(){
		this.vel = 0;
		this.direction = 0;
		this.pos = [0, 3, 0];
	}
	
    display(){
        this.scene.pushMatrix();
        this.setPosition();
        this.redTexture.apply();
        this.cube.display();
		this.scene.popMatrix();
		
	}

}