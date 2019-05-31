class MyNest extends CGFobject {
    constructor(scene, x, z) {
        super(scene);
        this.slices = 30;

        this.x_pos = x;
        this.z_pos = z;
        this.twigs_caught = [];

        this.initMaterials();
        this.initBuffers();

    }
    initBuffers() {
        this.twig = new MyCylinder(this.scene, 10);
        this.egg = new MySphere(this.scene, 20, 1, 1);

        this.randomAngs1 = [];
        this.randomAngs2 = [];

        for(var i = 0; i < this.slices; i++){
            this.randomAngs1.push(this.rand(0.0, Math.PI));
            this.randomAngs2.push(this.rand(0.0, Math.PI));
        }
    }
    initMaterials(){
        // Texture Appearance
        this.eggTexture = new CGFappearance(this.scene);
        this.eggTexture.setAmbient(1.0, 1.0, 1.0, 0.6);
        this.eggTexture.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.eggTexture.setSpecular(1, 1, 1, 0.1);
        this.eggTexture.setShininess(10.0);
        this.eggTexture.loadTexture("images/egg_texture.jpg");
        this.eggTexture.setTextureWrap('REPEAT', 'REPEAT');
    }
    setEggPos1(){
        this.scene.translate(0.8, -0.5, 0.0);
        this.scene.rotate(-Math.PI / 3.0, 0.0 , 0.0, 1.0);
        this.scene.scale(0.3, 0.5, 0.3);
    }
    setEggPos2(){
        this.scene.translate(-0.5, -0.5, -0.5);
        this.scene.rotate(-Math.PI / 3.0, 1.0 , 0.0, -1.0);
        this.scene.scale(0.4, 0.5, 0.4);
    }
    setEggPos3(){
        this.scene.translate(0.1, -0.5, 0.7);
        this.scene.rotate(Math.PI / 3.0, 1.0 , 0.0, 0.0);
        this.scene.scale(0.35, 0.5, 0.35);
    }
    rand(min, max) {
		return Math.random() * (max - min) + min;
	}
    display(){
        var thetaAng = 0;
		var phiAng = 0;
		var thetaInc = 2.0 * Math.PI / this.slices;
        var phiInc = (Math.PI / 2.0) / this.slices;
        
        this.scene.translate(this.x_pos, 0.0, this.z_pos);

		for(var j = 0; j <= this.slices; j++){
			for(var i = 0; i <= this.slices; i++){

                this.scene.pushMatrix();
                this.scene.translate(1.5 * Math.cos(thetaAng) * Math.cos(phiAng), -Math.sin(phiAng), 1.5 * -Math.cos(phiAng) * Math.sin(thetaAng));
				this.scene.rotate(thetaAng, 0.0, 1.0, 0.0);
				this.scene.rotate(-phiAng, 0.0, 0.0, 1.0);
                this.scene.rotate(this.randomAngs1[i] + this.randomAngs2[j], 1.0, 0.0, 0.0);
                this.scene.scale(0.03, 0.5, 0.03);
                this.scene.woodText.apply();
                this.twig.display();
                this.scene.popMatrix();
                
                this.scene.pushMatrix();
                this.scene.translate(1.4 * Math.cos(thetaAng) * Math.cos(phiAng), 0.9 * -Math.sin(phiAng), 1.4 * -Math.cos(phiAng) * Math.sin(thetaAng));
				this.scene.rotate(thetaAng, 0.0, 1.0, 0.0);
				this.scene.rotate(-phiAng, 0.0, 0.0, 1.0);
                this.scene.rotate(this.randomAngs1[j] + this.randomAngs2[i], 1.0, 0.0, 0.0);
                this.scene.scale(0.02, 0.5, 0.02);
                this.scene.woodText.apply();
                this.twig.display();
                this.scene.popMatrix();
                
				thetaAng+=thetaInc;
			}
			phiAng += phiInc;
        }
        
        this.eggTexture.apply();

        this.scene.pushMatrix();
        this.setEggPos1();
        this.egg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setEggPos2();
        this.egg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setEggPos3();
        this.egg.display();
        this.scene.popMatrix();
    }
}