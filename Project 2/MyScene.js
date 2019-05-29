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
		this.sphere = new MySphere(this, 20, 20);

		this.y_0 = -6;

        this.bird = new MyBird(this, 0.0, 10.0, 0.0, 0.0);
	   
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
		//this.ruleX1 = "F[-X][X]+X";
		this.ruleX1 = "X+[X]-X-[X]"
		this.ruleX2 = "XX[F[/X][X]F[\\X]+XF-[F[/X][X]F[\\X]+XF-[/X][X]+X]+XX";
		//this.ruleX2 = "F[+X]-X";
		// TODO: adicionar regras
		
        this.angle = 25.0;
        this.iterations = 3;
        this.scaleFactor = 0.5;
		this.lightning = new MyLightning(this);
		this.activeLightning = false;

        this.doGenerate = function () {
            this.lightning.generate(
                this.axiom,
                {
					"F": [ this.ruleF ],
					"X": [ this.ruleX,
						   this.ruleX1,
						   this.ruleX2 ]
                },
                this.angle,
                this.iterations,
                this.scaleFactor
            );
        }

        // do initial generation
        this.doGenerate();

		
		this.setUpdatePeriod(50);

    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(45, 45, 45), vec3.fromValues(0, 0, 0));
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
		
		if(this.activeLightning){
			if(this.lightning.startTime == 0)
				this.lightning.startAnimation(t);
			if(t - this.lightning.startTime <= 1000){
				this.lightning.update(t);
			}
			else{
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
		this.axis.display();
		
		var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
					0.0, this.scaleFactor, 0.0, 0.0,
					0.0, 0.0, this.scaleFactor, 0.0,
					0.0, 0.0, 0.0, 1.0];
		
			this.multMatrix(sca);


        //Apply default appearance
		this.setDefaultAppearance();
		//this.sphere.display();
		
		this.bird.display();
		
		if(this.activeLightning)
			this.lightning.display();

        for(var i = 0; i < this.branches.length; i++)
            this.branches[i].display();
		
		

        // ---- BEGIN Primitive drawing section
		this.pushMatrix();
		this.translate(0, this.y_0, 0);
        this.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scale(60, 60, 1);
        this.terrain.display();        
		this.popMatrix();
        // ---- END Primitive drawing section

    }
}