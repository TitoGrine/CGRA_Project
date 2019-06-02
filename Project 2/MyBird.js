const stateEnum = { "DOWN": 1, "UP": 2, "NORMAL": 3};
const sideEnum = { "RIGHT": 1, "LEFT": -1};
const tailEnum = { "UPPER": 1, "MIDDLE": 2, "LOWER": 3};

class MyBird extends CGFobject {
	constructor(scene, x, y, z, ang) {
        super(scene);
        this.x_pos = x;
		this.y_pos = y;
		this.y_inicial = y;
        this.z_pos = z;
		this.orientation = ang;
		this.tilt = 0;
        this.wing_rotation = 0;
		this.velocity = 0;
		this.velocity_y = 0;
		this.previous_t = 0;
		this.y_offset = 0;
		this.currentState = stateEnum.NORMAL;
		this.vertical_osc = 0.5;
        this.scaleFactor = 1;

		this.treeBranch = null;
		
		this.initBuffers();
		this.initMaterials();
    }
    initBuffers(){
		this.body = new MySphere(this.scene, 10, 10, 10);
		this.neck = new MySphere(this.scene, 10, 10, 10);
		this.head = new MySphere(this.scene, 10, 10, 10);
		this.beak = new MyCone(this.scene, 10, 10);
		this.eye = new MySphere(this.scene, 10, 1, 1);
		this.tail = new MyTriangle(this.scene);
		this.upperLeg = new MyCylinder(this.scene, 5);
		this.lowerLeg = new MyCylinder(this.scene, 5);
		this.foot = new MySphere(this.scene, 10, 1, 1);
		this.rightWing = new Wing(this.scene, sideEnum.RIGHT);
		this.leftWing = new Wing(this.scene, sideEnum.LEFT);
	}
	initMaterials(){
		this.orange = new CGFappearance(this.scene);
		this.orange.setAmbient (0.7, 0.25, 0.1, 0.3);
		this.orange.setDiffuse (0.7, 0.25, 0.1,  1.0);
		this.orange.setSpecular(0.7, 0.25, 0.1,  0.1);
		this.orange.setShininess(1);
		this.orange.loadTexture("images/feather_texture.jpg");
		this.orange.setTextureWrap("REPEAT", "REPEAT");
		
		this.green = new CGFappearance(this.scene);
		this.green.setAmbient (0.1, 0.5, 0.05, 0.3);
		this.green.setDiffuse (0.1, 0.5, 0.05,  1.0);
		this.green.setSpecular(0.1, 0.5, 0.05,  0.1);
		this.green.setShininess(1);
		this.green.loadTexture("images/feather_texture.jpg");
		this.green.setTextureWrap("REPEAT", "REPEAT");

		this.yellow = new CGFappearance(this.scene);
		this.yellow.setAmbient (0.99, 0.7, 0.05, 0.3);
		this.yellow.setDiffuse (0.99, 0.7, 0.05,  1.0);
		this.yellow.setSpecular(0.99, 0.7, 0.05,  0.1);
		this.yellow.setShininess(1);
		this.yellow.loadTexture("images/feather_texture.jpg");
		this.yellow.setTextureWrap("REPEAT", "REPEAT");

		this.gold = new CGFappearance(this.scene);
		this.gold.setAmbient (0.85, 0.6, 0.05, 0.3);
		this.gold.setDiffuse (0.85, 0.6, 0.05,  1.0);
		this.gold.setSpecular(0.85, 0.6, 0.05,  0.1);
		this.gold.setShininess(1);

		this.blue = new CGFappearance(this.scene);
		this.blue.setAmbient (0.0, 0.6, 0.88, 0.3);
		this.blue.setDiffuse (0.0, 0.6, 0.88,  1.0);
		this.blue.setSpecular(0.0, 0.6, 0.88,  0.1);
		this.blue.setShininess(1);
		this.blue.loadTexture("images/feather_texture.jpg");
		this.blue.setTextureWrap("REPEAT", "REPEAT");

		this.brown = new CGFappearance(this.scene);
		this.brown.setAmbient (0.2, 0.0, 0.05, 0.3);
		this.brown.setDiffuse (0.2, 0.0, 0.05,  1.0);
		this.brown.setSpecular(0.2, 0.0, 0.05,  0.1);
		this.brown.setShininess(1);

		this.red = new CGFappearance(this.scene);
		this.red.setAmbient (0.7, 0.0, 0.0, 0.3);
		this.red.setDiffuse (0.7, 0.0, 0.0,  1.0);
		this.red.setSpecular(0.7, 0.0, 0.0,  0.1);
		this.red.setShininess(1);
		this.red.loadTexture("images/feather_texture.jpg");
		this.red.setTextureWrap("REPEAT", "REPEAT");

		this.black = new CGFappearance(this.scene);
		this.black.setAmbient (0.2, 0.2, 0.2, 0.3);
		this.black.setDiffuse (0.2, 0.2, 0.2,  1.0);
		this.black.setSpecular(0.2, 0.2, 0.2,  0.1);
		this.black.setShininess(1);
	}
    turn(value){
		this.orientation -= value  * this.scene.speedFactor;
    }
	reset(){
		this.velocity = 0;
        this.orientation = 0;
        this.x_pos = 0;
        this.y_pos = this.y_inicial;
        this.z_pos = 0;
	}
	accelarate(value){
        if(Math.abs(this.velocity) + value < 100){
            if(value > 0)
            	this.velocity += 0.1 * this.scene.speedFactor;
            else if(value < 0)
            	this.velocity -= 0.1 * this.scene.speedFactor;
        }
        else
            this.velocity = 100;
	}
    updateWings(time){        
		this.rightWing.updateWingSpan(time);
		this.leftWing.updateWingSpan(time);
    }
    updatePos(time){
		if(this.currentState == stateEnum.NORMAL)
			this.y_offset = this.vertical_osc * Math.cos(Math.PI * 2 * time / 1000);
		else
			this.y_offset = 0;
	}
	insideBounds(x, z){
		// TODO: ver limites
		return ((this.x_pos + 1 > x) && (this.x_pos - 1 < x)) && ((this.z_pos + 1 > z) && (this.z_pos - 1 < z));
	}
	pickUpBranch(){

		for(let i = 0; i < this.scene.nBranches; i++){
			if(this.insideBounds(this.scene.branches[i].x_pos, this.scene.branches[i].z_pos)){
				this.treeBranch = this.scene.branches[i];
				this.scene.branches.splice(i, 1);
				this.scene.nBranches--;
				// TODO: ver melhor
				this.treeBranch.y_pos -= 1;
				this.treeBranch.x_pos = 0;
				this.treeBranch.z_pos = 0;
				this.treeBranch.orientation -= this.orientation;
				break;
			}
		}
	}
	dropBranch(){

		if(!this.insideBounds(this.scene.nest.x_pos, this.scene.nest.z_pos))
			return;

		this.treeBranch.x_pos = 0.0;
		this.treeBranch.y_pos = -0.3;
		this.treeBranch.z_pos = 0;
		this.treeBranch.orientation += this.orientation;
		this.scene.nest.twigs_caught.push(this.treeBranch);
		this.treeBranch = null;
	}
	updateState(pKeyPressed){
		switch(this.currentState){
			case stateEnum.NORMAL:
				if(pKeyPressed){
					this.currentState = stateEnum.DOWN;
					this.velocity_y = -this.y_pos / 1000;
				}
				this.tilt = 0;
				break;
			case stateEnum.DOWN:
				if(this.y_pos <= 1){
					if(this.treeBranch != null)
						this.dropBranch();
					else
						this.pickUpBranch();
					this.currentState = stateEnum.UP;
					this.velocity_y =  -this.velocity_y;
					this.tilt = 0;
				}

				if(this.velocity != 0)
					this.tilt = -Math.PI/14.0 + Math.acos(Math.pow(Math.abs(this.velocity), 2.0)/(0.01 + Math.pow(Math.abs(this.velocity), 2.0) + Math.pow(Math.abs(this.velocity_y), 2.0)));
				break;
			case stateEnum.UP:
				if(this.y_pos >= this.y_inicial){
					this.currentState = stateEnum.NORMAL;
					this.velocity_y = 0;
				}

				if(this.velocity != 0)
					this.tilt = 2.0 * Math.PI/14.0 - Math.acos(Math.pow(Math.abs(this.velocity), 2.0)/(0.01 + Math.pow(Math.abs(this.velocity), 2.0) + Math.pow(Math.abs(this.velocity_y), 2.0)));				
				break;
		}
	}
	updateWithinLimits(){
		if(this.x_pos > 10) this.x_pos = 10;
		if(this.z_pos > 10) this.z_pos = 10;

		if(this.x_pos < -10) this.x_pos = -10;
		if(this.z_pos < -10) this.z_pos = -10;
	}
    update(time){
        this.scene.pushMatrix();
        this.updateWings(time);
        this.updatePos(time);
        this.scene.popMatrix();
				
		var desloc = [-Math.sin(this.orientation) * this.velocity, this.velocity_y, Math.cos(this.orientation) * this.velocity];

		this.updateState(false);

		this.x_pos += desloc[0];
		this.y_pos += desloc[1] * (time - this.previous_t);
		this.z_pos += desloc[2];

		this.previous_t = time;

		this.updateWithinLimits();
	}
    setHeadPos(){
		this.orange.apply();

		this.scene.translate(0.0, 0.8, 2.0);
        this.scene.rotate(Math.PI/4.0, 1.0, 0.0, 0.0);
		this.scene.scale(0.5, 0.4, 0.6);
    }
    setBodyPos(){
		this.orange.apply();

		this.scene.rotate(-Math.PI/14.0, 1.0, 0.0, 0.0);
        this.scene.scale(1.0, 0.7, 1.8);
	}
	setNeckPos(){
		this.orange.apply();

		this.scene.translate(0.0, 0.5, 1.4);
        this.scene.rotate(-Math.PI/3.5, 1.0, 0.0, 0.0);
		this.scene.scale(0.45, 0.45, 0.8);
	}
	setBeakPos(){
		this.gold.apply();

		this.scene.translate(0.0, 0.55, 2.38);
        this.scene.rotate(3.7/5.0 * Math.PI, 1.0, 0.0, 0.0);
		this.scene.scale(0.25, 0.65, 0.15);
	}
	setEyePos(side){
		this.black.apply();

		switch(side){
			case sideEnum.RIGHT:
				this.scene.translate(0.35, 0.85, 2.3);
				this.scene.rotate(-Math.PI/10.0, 0.0, 0.0, 1.0);
				break;
			case sideEnum.LEFT:
				this.scene.translate(-0.35, 0.85, 2.3);
				this.scene.rotate(Math.PI/10.0, 0.0, 0.0, 1.0);				
				break;
		}

		this.scene.rotate(Math.PI / 3.2, 1.0, 0.0, 0.0);
		this.scene.scale(0.08, 0.08, 0.15);
	}
	setUpperLegPos(side){
		this.brown.apply();

		switch(side){
			case sideEnum.RIGHT:
				this.scene.translate(0.3, -1.0, 0.0);
				break;
			case sideEnum.LEFT:
				this.scene.translate(-0.3, -1.0, 0.0);				
				break;
		}

		this.scene.rotate(-Math.PI/6.5, 1.0, 0.0, 0.0);
		this.scene.scale(0.09, 0.4, 0.09);
	}
	setLowerLegPos(side){
		this.brown.apply();

		switch(side){
			case sideEnum.RIGHT:
				this.scene.translate(0.3, -1.275, -0.185);
				break;
			case sideEnum.LEFT:
				this.scene.translate(-0.3, -1.275, -0.185);				
				break;
		}

		this.scene.rotate(Math.PI/6.5, 1.0, 0.0, 0.0);
		this.scene.scale(0.09, 0.4, 0.09);
	}
	setFootPos(side){
		this.brown.apply();

		switch(side){
			case sideEnum.RIGHT:
				this.scene.translate(0.3, -1.35, -0.15);
				this.scene.rotate(-Math.PI/15.0, 0.0, 0.0, 1.0);
				break;
			case sideEnum.LEFT:
				this.scene.translate(-0.3, -1.35, -0.15);
				this.scene.rotate(Math.PI/15.0, 0.0, 0.0, 1.0);				
				break;
		}

		this.scene.rotate(Math.PI/2.8, 1.0, 0.0, 0.0);
		this.scene.scale(0.11, 0.08, 0.21);
	}
    setWingPos(side){
		this.red.apply();

		switch(side){
			case sideEnum.RIGHT:
				this.scene.translate(0.7, -0.0, 0.0);
				break;
			case sideEnum.LEFT:
				this.scene.translate(-0.7, -0.0, 0.0);
				break;
		}

		this.scene.rotate(-Math.PI/10.0, 1.0, 0.0, 0.0);
		this.scene.scale(1.25, 1.0, 1.5);
    }
	setTailPos(position){

		switch(position){
			case tailEnum.UPPER:
				this.green.apply();
		
				this.scene.translate(0.0, 0.6, -3.9);
				this.scene.rotate(-Math.PI/2.4, 1.0, 0.0, 0.0);
				this.scene.scale(1.0, 3.0, 3.0);	
				break;
			case tailEnum.MIDDLE:
				this.blue.apply();

				this.scene.translate(0.0, 0.3, -4.4);
				this.scene.rotate(-Math.PI/2.2, 1.0, 0.0, 0.0);
				this.scene.scale(1.0, 3.5, 3.5);	
				break;
			case tailEnum.LOWER:
				this.yellow.apply();

				this.scene.translate(0.0, -0.15, -3.7);
				this.scene.rotate(-Math.PI/2.0, 1.0, 0.0, 0.0);
				this.scene.scale(1.0, 3.0, 3.0);
				break;
		}

		this.scene.rotate(Math.PI/4.0, 0.0, 0.0, 1.0);
	}
	setBranchPos(){
		this.treeBranch.x_pos = 0.75;
		this.treeBranch.y_pos = -0.35 * this.scaleFactor;
		this.treeBranch.z_pos = -0.15;
		this.treeBranch.orientation = Math.PI/2.0;
	}
    display(){
		this.scene.pushMatrix();

        this.scene.translate(this.x_pos, this.y_pos + this.y_offset, this.z_pos);
		this.scene.rotate(-this.orientation, 0.0, 1.0, 0.0);
		this.scene.rotate(this.tilt, 1.0, 0.0, 0.0);

		if(this.treeBranch != null){
			this.scene.pushMatrix();
			this.setBranchPos();			
			this.treeBranch.display();
			this.scene.popMatrix();
		}

		this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
		this.scene.scale(0.25, 0.25, 0.25);
		
        this.scene.pushMatrix();
        this.setBodyPos();
        this.body.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
        this.setNeckPos();
        this.neck.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setHeadPos();
        this.head.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
        this.setBeakPos();
        this.beak.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
        this.setEyePos(sideEnum.RIGHT);
        this.eye.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
        this.setEyePos(sideEnum.LEFT);
        this.eye.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
        this.setTailPos(tailEnum.UPPER);
        this.tail.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
        this.setTailPos(tailEnum.MIDDLE);
        this.tail.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
        this.setTailPos(tailEnum.LOWER);
        this.tail.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
        this.setUpperLegPos(sideEnum.RIGHT);
        this.upperLeg.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
        this.setUpperLegPos(sideEnum.LEFT);
        this.upperLeg.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
        this.setLowerLegPos(sideEnum.RIGHT);
        this.lowerLeg.display();
		this.scene.popMatrix();
		
		this.scene.pushMatrix();
        this.setLowerLegPos(sideEnum.LEFT);
        this.lowerLeg.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
        this.setFootPos(sideEnum.RIGHT);
        this.foot.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
        this.setFootPos(sideEnum.LEFT);
        this.foot.display();
		this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setWingPos(sideEnum.RIGHT);
        this.rightWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setWingPos(sideEnum.LEFT);
        this.leftWing.display();
		this.scene.popMatrix();
		
		this.scene.popMatrix();
    }
}