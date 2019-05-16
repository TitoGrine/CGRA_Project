/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
		super.init(application);
		this.fovCam = 0.4;
		this.positionX = -60;
		this.positionY = 30;
		this.positionZ = 40;
		this.targetX = 5;
		this.targetY = 0;
		this.targetZ = 0;
		this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);

        //Objects connected to MyInterface

        //Initialize scene objects
        this.axis = new CGFaxis(this);
		this.small_hill = new MyVoxelHill(this, 3);
		this.medium_hill = new MyVoxelHill(this, 5);
		this.big_hill = new MyVoxelHill(this, 8);
		this.map = new MyCubeMap(this, 'Images/background.png');
        this.house = new MyHouse(this);
		this.grass = new MyQuad(this, 40.0, 40.0);
        this.treeMatrix1 = new MyTreeGroupPatch(this);
        this.treeMatrix2 = new MyTreeGroupPatch(this);
        this.treeMatrix3 = new MyTreeGroupPatch(this);
        this.treeRow1 = new MyTreeRowPatch(this);
        this.treeRow2 = new MyTreeRowPatch(this);
        this.treeRow3 = new MyTreeRowPatch(this);
		this.fire = new MyFire(this, 35);
		this.plane = new MyPlane(this, 25, 40, 40);
		this.plane2 = new MyPlane(this, 20, 2, 3);

        this.birds = false;
        this.view =  0;
        this.iteration = 0;
        this.bird = new MyBird(this);


        // Labels and ID's for object selection on MyInterface
		this.lightMode = { 'Day': 0, 'Night': 1};

		//Other variables connected to MyInterface
		this.displayAxis = true;
		this.selectedLight = 0;
		this.zoomFactor = 0.0;
		this.displayTextures = true;
		
		// this.lightPos = 2;
        //============================================================

        this.defaultTexture = new CGFappearance(this);
        this.defaultTexture.setAmbient(1.0, 1.0, 1.0, 0.9);
        this.defaultTexture.setDiffuse(0.9, 0.9, 0.9, 1);
        this.defaultTexture.setSpecular(0.1, 0.1, 0.1, 1);
        this.defaultTexture.setShininess(10.0);
        this.defaultTexture.loadTexture('Images/default.png');
        this.defaultTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.grassTexture = new CGFappearance(this);
        this.grassTexture.setAmbient(0.33, 0.5, 0.27, 0.7);
        this.grassTexture.setDiffuse(0.33, 0.5, 0.27, 1.0);
        this.grassTexture.setSpecular(0.33, 0.5, 0.27, 0.8);
        this.grassTexture.setShininess(1.0);
        this.grassTexture.loadTexture('Images/grass.png');
		this.grassTexture.setTextureWrap('REPEAT', 'REPEAT');
		
		this.houseWallTexture = new CGFappearance(this);
		this.houseWallTexture.setAmbient(0.918, 0.847, 0.682, 1.0);
        this.houseWallTexture.setDiffuse(0.918, 0.847, 0.682, 1.0);
        this.houseWallTexture.setSpecular(0.918 / 10, 0.847 / 10, 0.682 / 10, 1.0);
        this.houseWallTexture.setShininess(10.0);
        this.houseWallTexture.loadTexture('images/house_wall.jpg');
        this.houseWallTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.enableTextures(true);
    }
    initLights() {
        this.setGlobalAmbientLight(0.3, 0.3, 0.3, 0.2);

		// Sun light
        this.lights[0].setPosition(10.0, 30.0, 10.0, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 0.98, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 0.98, 1.0);
		this.lights[0].enable();
		// this.lights[0].setConstantAttenuation(0.65);
		this.lights[0].setConstantAttenuation(1.0);

        this.lights[0].setVisible(true);
        this.lights[0].update();

		// Moon light
        this.lights[1].setPosition(10.0, 30.0, 10.0, 1.0);
        this.lights[1].setDiffuse(0.144, 0.344, 0.484, 1.0);
        this.lights[1].setSpecular(.144, 0.344, 0.484, 1.0);
		this.lights[1].disable();
		this.lights[1].setConstantAttenuation(1.5);
        this.lights[1].setVisible(true);
		this.lights[1].update();
		
		// House Lantern
		this.lights[2].setPosition(1.5, 1.3, -4.5, 1.0);
		this.lights[2].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[2].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.lights[2].disable();
		this.lights[2].setLinearAttenuation(0.7);
		// this.lights[2].setSpotCutOff(90);
        this.lights[2].setVisible(true);
        this.lights[2].update();

        // Fire
        this.lights[3].setPosition(10.5, 1.0, 5.5, 1.0);
        this.lights[3].setDiffuse(0.8, 0.12, 0.16, 1.0);
        this.lights[3].setSpecular(0.8, 0.12, 0.16, 1.0);
		this.lights[3].disable();
		this.lights[3].setLinearAttenuation(0.1);
        this.lights[3].setVisible(false);
        this.lights[3].update();

    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(-60, 30, 40), vec3.fromValues(5, 0, 0));
	}
	updateLights(){
		if(this.selectedLight == 1){
			// this.map.setCubeMapTexture('Images/background_night.png');
			this.lights[0].disable();
			this.lights[1].enable();
			this.lights[2].enable();
			this.lights[3].enable();
		}
		else{
			// this.map.setCubeMapTexture('Images/background.png');
			this.lights[0].enable();
			this.lights[1].disable();
			this.lights[2].disable();
			this.lights[3].disable();
		}
		// this.lights[2].setPosition(7.3, this.lightPos, -31, 1.0);
	}
	updateCubeMapTexture() {
		if(this.selectedLight == 1)
			this.map.setCubeMapTexture('Images/background_night.png');
		else
			this.map.setCubeMapTexture('Images/background.png');
	}

	updateMode(){
		this.updateLights();
		this.updateCubeMapTexture();
	}
	updateTexturesVisibility(){
		this.enableTextures(this.displayTextures);
	}

    updateCamera(){
        var numbers = [0, 1, 2, 3];
        
        switch(numbers[this.view]){
            case 0:
                this.camera.setPosition(vec3.fromValues(-60, 30, 40));
                this.camera.setTarget(vec3.fromValues(5, 0, 0));
            break;

            case 1:
                this.camera.setPosition(vec3.fromValues(-7, 2, -12));
                this.camera.setTarget(vec3.fromValues(8, 0, 15));
            break;

            case 2:
                this.camera.setPosition(vec3.fromValues(18, 3, 20));
                this.camera.setTarget(vec3.fromValues(7, 2, 2));
            break;

            case 3:
                this.camera.setPosition(vec3.fromValues(0, 100, 0));
                this.camera.setTarget(vec3.fromValues(1, 0, 1));
            break;

        }
    }
    updateBirdPos(height, offset, orientation){

        this.setAmbient(0.3, 0.3, 0.3, 0.6);
        this.setDiffuse(0.3, 0.3, 0.3, 1.0);
        this.setSpecular(0.3, 0.3, 0.3, 0.3);
        this.setShininess(10.0);

        //(orientation: clockwise == 1 ; counter-clockwise == 0)
        this.iteration = this.iteration % 720 + 1;

        var direction = (orientation ? -1 : 1) * this.iteration;

        this.translate(offset, 0.0, -offset);
        this.translate(9*Math.cos(direction * Math.PI/360) + 2*Math.sin(direction * Math.PI/360), height + 2*Math.cos(direction * Math.PI/360), 9*Math.sin(direction * Math.PI/360) + 2*Math.cos(direction * Math.PI/360));
        this.rotate(-direction*Math.PI/360, 0.0, 1.0, 0.0);
        this.rotate(orientation*Math.PI, 0.0, 1.0, 0.0);
	}
    setGrass(){
        this.scale(40.0, 1.0, 40.0);
        this.rotate(-Math.PI/2.0, 1.0, 0.0, 0.0);

        this.setAmbient(0.1, 0.8, 0.4, 1.0);
        this.setDiffuse(0.1, 0.8, 0.4, 1.0);
        this.setSpecular(0.1, 0.8, 0.4, 1.0);
        this.setShininess(10.0);
    }
    setMapPos(){
        this.translate(0.0, 19.0, 0.0);
    }
    setBigHillPos(){
        this.translate(12.5, 0.0, -12.5);
    }
    setMediumHillPos(){
        this.translate(-13.0, 0.0, -12.5);
    }
    setSmallHillPos(){
        this.translate(-10.0, 0.0, 5.0);
    }
    setTreesPos(id){
        switch(id){
            case 1:
            this.translate(-18.0, 0.0, 13.0);
            this.rotate(Math.PI/8, 0.0, 1.0, 0.0);
            break;

            case 2:
            this.translate(-8.0, 0.0, 11.0);
            this.rotate(Math.PI/10, 0.0, 1.0, 0.0);
            break;

            case 3:
            this.translate(-3.0, 0.0, -17.0);
            this.rotate(-Math.PI/12, 0.0, 1.0, 0.0);
            break;

            case 4:
            this.translate(-17.0, 0.0, 2.0);
            this.rotate(Math.PI/5, 0.0, 1.0, 0.0);
            break;

            case 5:
            this.translate(17.0, 0.0, 4.0);
            this.rotate(-Math.PI/2.1, 0.0, 1.0, 0.0);
            break;

            case 6:
            this.translate(6, 0.0, 2.0);
            this.rotate(Math.PI/14, 0.0, 1.0, 0.0);
            break;
        }
    }
    setFirePos(){
        this.translate(10.0, 0.0, 5.0);
        this.scale(0.6, 0.6, 0.6);
	}
	setPlanePos(id){
		switch (id) {
			case 1:
				this.scale(40.0, 1.0, 40.0);
				this.translate(0, 0.01, 0);
				this.rotate(-Math.PI/2.0, 1.0, 0.0, 0.0);
				break;
			case 2:
				this.translate(1.5, 1.39, -2.5);
				this.scale(3.0, 0.4, 5.0);
				this.rotate(Math.PI/2.0, 1.0, 0.0, 0.0);
				break;
			default:
				break;
		}
		
	}
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();
		
		this.lights[0].update();
		this.lights[1].update();
		this.lights[2].update();
		this.lights[3].update();
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        //Apply default appearance
		this.setDefaultAppearance();

		this.camera.zoom(this.zoomFactor);

        // ---- BEGIN Primitive drawing section

        this.pushMatrix();

        this.pushMatrix();
        this.setGrass();
        this.grassTexture.apply();
        this.grass.display();
        this.popMatrix();

        this.pushMatrix();
        this.setMapPos();
        this.map.display();
        this.popMatrix();

		this.pushMatrix();
		this.house.display();
		this.popMatrix();

		this.pushMatrix();
		this.setBigHillPos();
		this.big_hill.display();
		this.popMatrix();

		this.pushMatrix();
		this.setMediumHillPos();
		this.medium_hill.display();
		this.popMatrix();

		this.pushMatrix();
		this.setSmallHillPos();
		this.small_hill.display();
		this.popMatrix();

		this.pushMatrix();
		this.setTreesPos(1);
		this.treeMatrix1.display();
		this.popMatrix();

		this.pushMatrix();
		this.setTreesPos(2);
		this.treeMatrix2.display();
		this.popMatrix();

		this.pushMatrix();
		this.setTreesPos(3);
		this.treeMatrix2.display();
		this.popMatrix();

		this.pushMatrix();
		this.setTreesPos(4);
		this.treeRow1.display();
		this.popMatrix();

		this.pushMatrix();
		this.setTreesPos(5);
		this.treeRow2.display();
		this.popMatrix();

		this.pushMatrix();
		this.setTreesPos(6);
		this.treeRow3.display();
		this.popMatrix();

		if(this.birds == true){
			this.pushMatrix();
			this.updateBirdPos(10.0, 3.0, 0);
			this.bird.updateWings();
			this.bird.display();
			this.popMatrix();

			this.pushMatrix();
			this.updateBirdPos(12.0, -5.0, 1);
			this.bird.updateWings();
			this.bird.display();
			this.popMatrix();
		}

		if(this.selectedLight == 1){
			this.pushMatrix();
			this.setFirePos(6);
			this.fire.display();
			this.popMatrix();

			this.pushMatrix();
			this.setPlanePos(1);
			this.grassTexture.apply();
			this.plane.display();
			this.popMatrix();

			this.pushMatrix();
			this.setPlanePos(2);
			this.houseWallTexture.apply();
			this.plane2.display();
			this.popMatrix();
		}

        this.popMatrix();

        // ---- END Primitive drawing section
    }
}