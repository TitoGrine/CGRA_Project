class MyBird extends CGFobject {
	constructor(scene, x, y, z, ang) {
        super(scene);
        this.x_pos = x;
        this.y_pos = y;
        this.z_pos = z;
        this.orientation = ang;
        this.wing_rotation = 0;
        this.velocity = 0;
        this.y_offset = 0;
		this.initBuffers();
    }
    initBuffers(){
        this.body = new MyUnitCubeQuad(this.scene, 2.0, 2.0, 2.0, false);
        this.head = new MyUnitCubeQuad(this.scene, 1.0, 1.0, 1.0, false);
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
        this.y_pos = 3.0;
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
        this.wing_rotation = Math.PI/4.0 * Math.cos(((1.0+Math.abs(this.velocity))*time/360.0)*2.0*Math.PI);
		//console.log(this.wing_rotation);    
    }
    updatePos(time){
        this.y_offset = 0.5* Math.cos((time/360)*2*Math.PI);
    }
    update(time){
        this.scene.pushMatrix();
        this.updateWings(time);
        this.updatePos(time);
        this.scene.popMatrix();

        var desloc = [Math.cos(this.orientation) * this.velocity, 0, -Math.sin(this.orientation) * this.velocity];
		this.x_pos += desloc[0];
		this.y_pos += desloc[1];
        this.z_pos += desloc[2];        
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
        this.scene.rotate(this.orientation, 0.0, 1.0, 0.0);

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

        this.scene.popMatrix();
    }
}