class Wing extends CGFobject {
	constructor(scene, orientation){
        super(scene);
        this.initBuffers();
        this.initMaterials();
        this.orientation = orientation; // 1 == right | -1 == left
    }
    initBuffers(){
        this.wingbase = new MyQuad(this.scene);
        this.wingtip = new MyTriangle(this.scene);
    }
    initMaterials(){
		this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.75, 0.45, 0.25, 1);
		this.appearance.setDiffuse(0.75, 0.45, 0.25, 1);
		this.appearance.setSpecular(0.75, 0.45, 0.25, 0.3);
        this.appearance.setShininess(1);
    }
    updateWingSpan(time){
        
    }
    setBasePos(){
        this.scene.rotate(this.orientation*Math.PI/4.0, 0.0, 0.0, 1.0);
        this.scene.scale(this.orientation, this.orientation, this.orientation);
        this.scene.translate(1.0, 0.0, 0.0);
        this.scene.rotate(-this.orientation*Math.PI/2.0, 1.0, 0.0, 0.0);
        this.scene.scale(2.0, 1.5, 1.5);
    }
    setTipPos(){
        this.scene.scale(this.orientation, this.orientation, this.orientation);
        this.scene.translate(3.0 * Math.cos(Math.PI/4.0), this.orientation * Math.sin(Math.PI/4.0), 0.0);
        this.scene.scale(1.0, -1.0, 1.5/2.0);
        this.scene.rotate(this.orientation*Math.PI/4.0, 0.0, 0.0, 1.0);
        this.scene.rotate(this.orientation*Math.PI/2.0, 1.0, 0.0, 0.0);
    }
    display(){
        this.scene.pushMatrix();
        this.setBasePos();
        this.wingbase.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.setTipPos();
        this.wingtip.display();
		this.scene.popMatrix();
    }
}