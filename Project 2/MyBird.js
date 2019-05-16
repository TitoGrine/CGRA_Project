class MyBird extends CGFobject {
	constructor(scene) {
        super(scene);
		this.initBuffers();
    }
    initBuffers(){
        this.body = new MyUnitCubeQuad(this.scene, 1.0, 1.0, 1.0, false);
        
    }
    turn(value){

    }
    accelerate(value){

    }
}