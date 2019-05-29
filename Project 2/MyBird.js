const stateEnum = { "DOWN": 1, "UP": 2, "NORMAL": 3};

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
    }
    initBuffers(){
        this.body = new MyUnitCubeQuad(this.scene, 3.0, 3.0, 3.0);
        this.head = new MyUnitCubeQuad(this.scene, 1.0, 1.0, 1.0);
        this.rightWing = new MyTriangle(this.scene);
        this.leftWing = new MyTriangle(this.scene);
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
		this.wing_rotation = Math.cos(time / 250 * this.scene.speedFactor) * (Math.PI / 4.0 );
        //this.wing_rotation = Math.PI/4.0 * Math.cos(((1.0+Math.abs(this.velocity))*time/250.0)*2.0*Math.PI);
		//console.log(this.wing_rotation);    
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
        this.scene.translate(0.0, 1.0, 1.5);
        this.scene.rotate(Math.PI/4.0, 0.0, 0.0, 1.0);
    }
    setBodyPos(){
        this.scene.scale(2.0, 2.0, 2.0);
    }
    setRightWingPos(){
        this.scene.translate(-1.0, 0.0, -1.0);
        this.scene.rotate(-this.wing_rotation, 0.0, 0.0, 1.0);
        this.scene.rotate(Math.PI, 0.0, 1.0, 0.0);
        this.scene.rotate(-Math.PI/2.0, 1.0, 0.0, 0.0);
        this.scene.translate(1.0, 1.0, 0.0);
    }
    setLeftWingPos(){
        this.scene.translate(1.0, 0.0, 1.0);
        this.scene.rotate(this.wing_rotation, 0.0, 0.0, 1.0);
        this.scene.rotate(-Math.PI/2.0, 1.0, 0.0, 0.0);
        this.scene.translate(1.0, 1.0, 0.0);
    }
    display(){
        this.scene.pushMatrix();

        this.scene.translate(this.x_pos, this.y_pos + this.y_offset, this.z_pos);
		this.scene.rotate(-this.orientation, 0.0, 1.0, 0.0);
		
		
        this.scene.pushMatrix();
        this.setBodyPos();
        this.body.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setHeadPos();
        this.head.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setRightWingPos();
        this.rightWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setLeftWingPos();
        this.leftWing.display();
		this.scene.popMatrix();
		
		if(this.treeBranch != null){
			this.treeBranch.display();
		}


		this.scene.popMatrix();
		
		
    }
}