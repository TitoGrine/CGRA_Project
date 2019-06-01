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
        this.initCameras();
		this.initLights();
		this.initMaterials();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.enableTextures(true);
        this.setUpdatePeriod(50);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
		this.terrain = new MyTerrain(this, 128);
		this.map = new MyCubeMap(this, 'images/background.png');
		this.house = new MyHouse(this);

		this.y_0 = -6;

		this.bird = new MyBird(this, 0.0, 5.0, 0.0, 0.0);
		this.nest = new MyNest(this, -8.0, 0.5, 6.0, 0.5);
		this.snow = new MySnow(this);
	   
		this.nBranches = 5;
		this.branches = [];

		for(let i = 0; i < this.nBranches; i++)
			this.branches.push(new MyTreeBranch(this));
		
		//Objects connected to MyInterface
		this.scaleFactor = 1;
		this.speedFactor = 1;

		// Lightning
		this.axiom = "X"; //
		this.ruleF = "FF";
        this.ruleX = "F[-X][X]F[-X]+FX";
        this.ruleX1 = "F[-X][X]+X";
        this.ruleX2 = "F[+X]-X";
        this.ruleX3 = "F[/X][X]F[\\X]+X";
        this.ruleX4 = "F[\X][X]/X";
        this.ruleX5 = "F[/X]\X";
        this.ruleX6 = "F[^X][X]F[&X]^X";
        this.ruleX7 = "F[^X]&X";
		this.ruleX8 = "F[&X]^X";
		
		
		
		//this.ruleX2 = "F[+X]-X";
		// TODO: adicionar regras
		
        this.angle = 25.0;
        this.iterations = 3;
		this.lightning = new MyLightning(this);
		this.activeLightning = false;

        this.doGenerate = function () {
            this.lightning.generate(
                this.axiom,
                {
					"F": [ this.ruleF ],
					"X": [ this.ruleX, 
						   this.ruleX3,
						   this.ruleX6,
						   "F[X]XF+[\\X]",
					       "F[X[X]+F]"
						]
                },
                this.angle,
                this.iterations,
                this.scaleFactor
            );
		}
		
		this.doGenerate();


        this.angle = 40.0;
        this.iterations = 5;
        this.scaleFactor = 0.55;

		this.trees = [];
		this.numberTrees = 25;
		for(let i = 0; i < this.numberTrees; i++){
			this.trees[i] = new MyLPlant(this);
			this.doGenerate = function () {
				this.trees[i].generate(
					this.axiom,
					{
						"F": [ this.ruleF ],
						"X": [ this.ruleX, 
							this.ruleX9, 
							this.ruleX10,
							this.ruleX3,
							this.ruleX4,
							this.ruleX5,
							this.ruleX6,
							this.ruleX7,
							this.ruleX8
							]
					},
					this.angle,
					this.iterations,
					this.scaleFactor
				);
			}
			// do initial generation
			this.doGenerate();
		}

        
		this.isSnowing = false;
		
		this.setUpdatePeriod(50);

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
		this.lights[0].update();
		this.lights[1].setPosition(15, 2, 5, 1);
		this.lights[1].setDiffuse(0.68, 0.85, 0.9, 1.0);
		this.lights[1].setSpecular(0.68, 0.85, 0.9, 1.0);
        this.lights[1].disable();
        this.lights[1].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
        //this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(10, 10, 10), vec3.fromValues(0, 0, 0));
    }
	initMaterials(){
		this.woodText = new CGFappearance(this);
		this.woodText.setAmbient(0.713, 0.6078, 0.298, 0.6);
        this.woodText.setDiffuse(0.713, 0.6078, 0.298, 1.0);
        this.woodText.setSpecular(0, 0, 0, 0.1);
		this.woodText.setShininess(10.0);
		this.woodText.loadTexture("images/trunk_texture.jpg");
		this.woodText.setTextureWrap('REPEAT', 'REPEAT');
	}
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
	}

	setRedAppearance(){
		this.setAmbient(1.0, 0.4, 0.2, 1.0);
        this.setDiffuse(1.0, 0.4, 0.2, 1.0);
        this.setSpecular(1.0, 0.4, 0.2, 1.0);
        this.setShininess(10.0);
	}

	setCubeMapPos(){
		this.translate(0, 20, 0);
	}

	setTerrainPos(){
		this.translate(0, this.y_0, 0);
        this.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scale(60, 60, 1);
	}

	setHousePos(){
		this.translate(4, 0, -6);
		this.scale(1/3, 1/3, 1/3);
	}

	rand(min, max) {
		return Math.random() * (max - min) + min;
	}

	checkKeys()  {
		var text="Keys pressed: ";
		var keysPressed=false;
		
		// Check for key codes e.g. in ​https://keycode.info/
		if (this.gui.isKeyPressed("KeyW")) {
			text+=" W ";
			keysPressed=true;
			this.bird.accelarate(0.1);
		}

		if (this.gui.isKeyPressed("KeyS")){
			text+=" S ";
			keysPressed=true;
			this.bird.accelarate(-0.1);

		}

		if (this.gui.isKeyPressed("KeyA")) {
			text+=" A ";
			keysPressed=true;
			this.bird.turn(0.1);
		}

		if (this.gui.isKeyPressed("KeyD")){
			text+=" D ";
			keysPressed=true;
			this.bird.turn(-0.1);
		}

		if (this.gui.isKeyPressed("KeyR")){
			text+=" R ";
			keysPressed=true;
			this.bird.reset();
		}

		if (this.gui.isKeyPressed("KeyP")){
			text+=" P ";
			keysPressed=true;
			this.bird.updateState(true);
		}

		if (this.gui.isKeyPressed("KeyL")){
			text+=" L ";
			keysPressed=true;
			this.activeLightning = true;
		}
		
		if (keysPressed)
			console.log(text);

	}

    update(t){
		this.checkKeys();
		this.bird.update(t);
		this.snow.update(t);
		
		if(this.activeLightning){
			if(this.lightning.startTime == 0){
				this.lightning.startAnimation(t);
				this.lights[1].setPosition(this.lightning.x_pos, this.lightning.y_pos, this.lightning.z_pos);
				this.lights[1].enable();
				this.lights[1].update();
			}
			if(t - this.lightning.startTime <= 1000){
				this.lightning.update(t);
			}
			else{
				this.lights[1].disable();
				this.lights[1].update();
				this.activeLightning = false;
				this.lightning.startTime = 0;
			}
		}
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

        // Draw axis
		//this.axis.display();

        //Apply default appearance
		this.setDefaultAppearance();
		
		this.bird.display();

		if(this.activeLightning)
			this.lightning.display();

        for(var i = 0; i < this.branches.length; i++)
            this.branches[i].display();
		
		for(let i = 0; i < this.trees.length; i++)
			this.trees[i].display();

		
		this.pushMatrix();
		this.nest.display();
		this.popMatrix();

		// ---- BEGIN Primitive drawing section
		this.pushMatrix();
		this.setCubeMapPos();
		this.map.display();
		this.popMatrix();

		this.pushMatrix();
		this.setTerrainPos();
        this.terrain.display();        
		this.popMatrix();

		this.pushMatrix();
		this.setHousePos();
		this.house.display();
		this.popMatrix();
		
		if(this.isSnowing)
			this.snow.display();

        // ---- END Primitive drawing section

    }
}