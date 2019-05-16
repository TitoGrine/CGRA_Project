class MyBird extends CGFobject {
	constructor(scene, x, y, z, ang) {
        super(scene);
        this.x_pos = x;
        this.y_pos = y;
        this.z_pos = z;
        this.orientation = ang;
        this.wing_span = 0;
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
    updateWings(){
        this.wing_span = Math.PI/4.0 * Math.sin(time*Math.PI % 360);
    }
    updatePos(time){
        this.y_offset = 2*Math.sin(time*Math.PI % 360);
    }
    update(time){
        this.scene.pushMatrix();
        this.updateWings(time);
        this.updatePos(time);
        this.scene.popMatrix();
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
        this.scene.rotate(this.wing_span, 0.0, 0.0, 1.0);
        this.scene.rotate(Math.PI, 0.0, 1.0, 0.0);
        this.scene.rotate(-Math.PI/2.0, 1.0, 0.0, 0.0);
        this.scene.translate(1.0, 1.0, 0.0);
    }
    setLeftWingPos(){
        this.scene.translate(1.0, 0.0, 1.0);
        this.scene.rotate(this.wing_span, 0.0, 0.0, 1.0);
        this.scene.rotate(-Math.PI/2.0, 1.0, 0.0, 0.0);
        this.scene.translate(1.0, 1.0, 0.0);
    }
    display(){
        this.scene.pushMatrix();

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

        this.scene.translate(this.x_pos, this.y_pos, this.z_pos);
        this.rotate(this.orientation, 0.0, 1.0, 0.0);

        this.scene.popMatrix();
    }
}