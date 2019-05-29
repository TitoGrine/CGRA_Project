class MySnow extends CGFobject {
	constructor(scene, x, y, z, ang) {
        super(scene);
      
		this.snow = new MySphere(this.scene, 20, 20);
		this.positions = [];
		this.velocity = [];
		
		this.initBuffers();
		this.initAppearance();
    }
    initBuffers(){
		for(let i = 0; i < 75; i++)
			this.initSnow();
	}

	initSnow(){
		this.positions.push(this.scene.rand(-23, 23), this.scene.rand(40, 50), this.scene.rand(-23, -10));
		this.velocity.push(this.scene.rand(0.1, 1.5));
	}

    update(time){
		for(let i = 0; i < this.velocity.length; i++){
			this.positions[1 + i * 3] -= this.velocity[i];
			if(this.positions[1 + i* 3] < 5){
				this.velocity.splice(i, 1);
				this.positions.splice(i, 3);
				this.initSnow();
			}
		}
	}

    setLeftWingPos(){
        this.scene.translate(1.0, 0.0, 1.0);
        this.scene.rotate(this.wing_rotation, 0.0, 0.0, 1.0);
        this.scene.rotate(-Math.PI/2.0, 1.0, 0.0, 0.0);
        this.scene.translate(1.0, 1.0, 0.0);
	}
	initAppearance(){
		this.snowAppearance = new CGFappearance(this.scene);
        this.snowAppearance.setAmbient(0.9, 0.9, 0.9, 0.4);
        this.snowAppearance.setDiffuse(0.9, 0.9, 0.9, 0.4);
        this.snowAppearance.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.snowAppearance.setShininess(10.0);
	}
    display(){
		this.snowAppearance.apply();
		for(let i = 0; i < this.velocity.length; i++){
			this.scene.pushMatrix();
			this.scene.translate(this.positions[i * 3], this.positions[i * 3 + 1], this.positions[i * 3 + 2]);
			this.scene.scale(0.1, 0.1, 0.1);
			this.snow.display();
			this.scene.popMatrix();
		}
		
		
		
    }
}