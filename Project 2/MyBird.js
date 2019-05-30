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
        this.wing_rotation = 0;
		this.velocity = 0;
		this.velocity_y = 0;
		this.y_offset = 0;
		this.currentState = stateEnum.NORMAL;
		this.vertical_osc = 0.5;

		this.treeBranch = null;
		
		this.initBuffers();
		this.initMaterials();
    }
    initBuffers(){
		this.body = new MySphere(this.scene, 20, 20, 20);
		this.neck = new MySphere(this.scene, 20, 20, 20);
		this.head = new MySphere(this.scene, 20, 20, 20);
		this.beak = new MyCone(this.scene, 10, 10);
		this.eye = new MySphere(this.scene, 20, 1, 1);
		this.tail = new MyTriangle(this.scene);
		this.upperLeg = new MyCylinder(this.scene, 10);
		this.lowerLeg = new MyCylinder(this.scene, 10);
		this.foot = new MySphere(this.scene, 20, 1, 1);
		this.rightWing = new Wing(this.scene, sideEnum.RIGHT);
		this.leftWing = new Wing(this.scene, sideEnum.LEFT);
	}
	initMaterials(){
		this.orange = new CGFappearance(this.scene);
		this.orange.setAmbient (0.9, 0.9, 0.9, 0.3);
		this.orange.setDiffuse (0.9, 0.9, 0.9,  1.0);
		this.orange.setSpecular(0.9, 0.9, 0.9,  0.1);
		this.orange.setShininess(1);
		this.orange.loadTexture("images/feather_texture2.jpg");
		//this.orange.loadTexture("images/hungary.jpg");
		this.orange.setTextureWrap("REPEAT", "REPEAT");
		
		this.green = new CGFappearance(this.scene);
		this.green.setAmbient (0.1, 0.5, 0.05, 0.3);
		this.green.setDiffuse (0.1, 0.5, 0.05,  1.0);
		this.green.setSpecular(0.1, 0.5, 0.05,  0.1);
		this.green.setShininess(1);

		this.gold = new CGFappearance(this.scene);
		this.gold.setAmbient (0.99, 0.7, 0.05, 0.3);
		this.gold.setDiffuse (0.99, 0.7, 0.05,  1.0);
		this.gold.setSpecular(0.99, 0.7, 0.05,  0.1);
		this.gold.setShininess(1);

		this.blue = new CGFappearance(this.scene);
		this.blue.setAmbient (0.0, 0.6, 0.88, 0.3);
		this.blue.setDiffuse (0.0, 0.6, 0.88,  1.0);
		this.blue.setSpecular(0.0, 0.6, 0.88,  0.1);
		this.blue.setShininess(1);

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

		this.black = new CGFappearance(this.scene);
		this.black.setAmbient (0.1, 0.1, 0.1, 0.3);
		this.black.setDiffuse (0.1, 0.1, 0.1,  1.0);
		this.black.setSpecular(0.1, 0.1, 0.1,  0.1);
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
        if(Math.abs(this.velocity) + value < 200){
            if(value > 0)
            	this.velocity += 0.2 * this.scene.speedFactor;
            else if(value < 0)
            	this.velocity -= 0.2 * this.scene.speedFactor;
        }
        else
            this.velocity = 200;
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
		return ((this.x_pos + 2 > x) && (this.x_pos - 2 < x)) && ((this.z_pos + 2 > z) && (this.z_pos - 2 < z));
	}
	pickUpBranch(){
		console.log("bird: x:" + this.x_pos + "z: " + this.z_pos);

		for(let i = 0; i < this.scene.nBranches; i++){
			console.log("branch: x:" + this.scene.branches[i].x_pos + "z: " + this.scene.branches[i].z_pos);
			if(this.insideBounds(this.scene.branches[i].x_pos, this.scene.branches[i].z_pos)){
				console.log("pick up");
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
		this.treeBranch.y_pos += 1;
		this.treeBranch.x_pos += this.x_pos;
		this.treeBranch.z_pos += this.z_pos;
		this.treeBranch.orientation += this.orientation;
		this.scene.branches.push(this.treeBranch);
		this.scene.nBranches++;
		this.treeBranch = null;
	}
	updateState(pKeyPressed){
		switch(this.currentState){
			case stateEnum.NORMAL:
				if(pKeyPressed){
					this.currentState = stateEnum.DOWN;
					this.velocity_y = -2 * this.y_pos / 40;
				}
				break;
			case stateEnum.DOWN:
				if(this.y_pos <= 1){
					if(this.treeBranch != null)
						this.dropBranch();
					else
						this.pickUpBranch();
					this.currentState = stateEnum.UP;
					this.velocity_y =  -this.velocity_y;
				}
				break;
			case stateEnum.UP:
				if(this.y_pos >= this.y_inicial){
					this.currentState = stateEnum.NORMAL;
					this.velocity_y = 0;
				}
				break;
		}
	}

	updateWithinLimits(){
		if(this.x_pos > 15) this.x_pos = 15;
		if(this.z_pos > 11) this.z_pos = 11;

		if(this.x_pos < -12) this.x_pos = -12;
		if(this.z_pos < -14) this.z_pos = -14;
	}

    update(time){
        this.scene.pushMatrix();
        this.updateWings(time);
        this.updatePos(time);
        this.scene.popMatrix();
		
		// TODO: Por tempo correto na descida e subida
		var desloc = [-Math.sin(this.orientation) * this.velocity, this.velocity_y, Math.cos(this.orientation) * this.velocity];

		this.updateState(false);

		this.x_pos += desloc[0];
		this.y_pos += desloc[1];
		this.z_pos += desloc[2];

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
				this.scene.scale(0.7, 3.0, 3.0);	
				break;
			case tailEnum.MIDDLE:
				this.blue.apply();

				this.scene.translate(0.0, 0.3, -4.4);
				this.scene.rotate(-Math.PI/2.2, 1.0, 0.0, 0.0);
				this.scene.scale(0.9, 3.5, 3.5);	
				break;
			case tailEnum.LOWER:
				this.gold.apply();

				this.scene.translate(0.0, -0.15, -3.7);
				this.scene.rotate(-Math.PI/2.0, 1.0, 0.0, 0.0);
				this.scene.scale(0.7, 3.0, 3.0);
				break;
		}

		this.scene.rotate(Math.PI/4.0, 0.0, 0.0, 1.0);
	}
    display(){
		this.scene.pushMatrix();
		

        //this.scene.translate(this.x_pos, this.y_pos + this.y_offset, this.z_pos);
		this.scene.rotate(-this.orientation, 0.0, 1.0, 0.0);
		
		
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
		
		if(this.treeBranch != null){
			this.treeBranch.display();
		}


		this.scene.popMatrix();
		
		
    }
}