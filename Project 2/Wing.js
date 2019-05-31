class Wing extends CGFobject {
	constructor(scene, orientation){
        super(scene);
        this.initBuffers();
        this.initMaterials();
        this.orientation = orientation; // 1 == right | -1 == left
        this.wing_rotation = 0;
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
		this.inner_wing_rotation = Math.cos((time / 250.0) * this.scene.speedFactor) * (Math.PI / 5.0);

        this.outter_wing_rotation =  Math.cos(((time - 100.0) / 250.0) * this.scene.speedFactor) * (Math.PI / 4.0);
    }
    setBasePos(){
        this.scene.rotate(this.orientation * this.inner_wing_rotation, 0.0, 0.0, 1.0);
        this.scene.rotate(this.orientation * (Math.PI/6.0 - Math.PI/10.0), 0.0, 0.0, 1.0);
        this.scene.scale(this.orientation, this.orientation, this.orientation);
        this.scene.translate(1.0, 0.0, 0.0);
        this.scene.rotate(-this.orientation * Math.PI/2.0, 1.0, 0.0, 0.0);
        this.scene.scale(2.0, 1.5, 1.5);
    }
    setTipPos(){
        this.scene.translate(this.orientation * 2.0 * Math.cos(this.inner_wing_rotation + (Math.PI/6.0 - Math.PI/10.0)), 2.0 * Math.sin(this.inner_wing_rotation + (Math.PI/6.0 - Math.PI/10.0)), 0.0);
        this.scene.rotate(-this.orientation * (- 6.5 * this.outter_wing_rotation + Math.PI/6.0)/ 5.0, 0.0, 0.0, 1.0);
        this.scene.translate(this.orientation * 1.5 , 0.0, 0.0);
        this.scene.scale(this.orientation * 1.5,  -1.0, 3.0/4.0);
        this.scene.rotate( Math.PI/2.0, 1.0, 0.0, 0.0);

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