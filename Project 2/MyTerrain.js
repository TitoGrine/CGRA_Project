class MyTerrain extends CGFobject{
	constructor(scene, nrDivs) {
        super(scene);
        this.initBuffers(nrDivs);
    }
    initBuffers(nrDivs){
        this.plane = new Plane(this.scene, nrDivs);

        this.terrainTexture = new CGFtexture(this.scene, "images/terrain.jpg");
        this.heightTexture = new CGFtexture(this.scene, "images/altered_heightmap.jpg");
        this.gradientTexture = new CGFtexture(this.scene, "images/altimetry.png");
        
        this.appearance = new CGFappearance(this.scene);
		this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
		this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
		this.appearance.setSpecular(0.0, 0.0, 0.0, 1);
        this.appearance.setShininess(1);
        
        this.appearance.setTexture(this.terrainTexture);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        
        this.shader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

        this.shader.setUniformsValues({ terrainTex: 1, terrainMap: 2, colorGradient: 3});

        // shader code panels references
		this.scene.shadersDiv = document.getElementById("shaders");
		this.scene.vShaderDiv = document.getElementById("vshader");
        this.scene.fShaderDiv = document.getElementById("fshader");
    }
    display(){

        this.scene.pushMatrix();

        this.appearance.apply();

        this.scene.setActiveShader(this.shader);
        
        this.terrainTexture.bind(1);
        this.heightTexture.bind(2);
        this.gradientTexture.bind(3);

        this.plane.display();

        this.scene.setActiveShader(this.scene.defaultShader);

        this.scene.popMatrix();
    }
}