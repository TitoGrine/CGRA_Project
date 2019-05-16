
class MyVoxelHill extends CGFobject {
    constructor(scene, levels) {
        super(scene);

        this.levels = levels;
		this.cube = new MyUnitCubeQuad(this.scene, 1, 1, 1, true);
	}
	
    setHillColor(){
        this.scene.setAmbient(0.46875, 0.28125, 0.0, 0.6);
        this.scene.setDiffuse(0.46875, 0.28125, 0.0, 1.0);
        this.scene.setSpecular(0, 0, 0, 0.1);
        this.scene.setShininess(10);
	}

    display(){
        this.setHillColor();

        this.coords = [0.0, this.levels - 0.5, 0.0];

        this.scene.pushMatrix();
		this.scene.translate(this.coords[0], this.coords[1], this.coords[2]);
		this.cube.display();
        this.scene.popMatrix();

        for(var i = 2; i <= this.levels; i++){
            var exteriorBlocks = Math.pow(2*i - 1, 2) - Math.pow(2*i - 3, 2)

            this.coords[0] += 1.0;
            this.coords[1] -= 1.0;
            this.coords[2] = -i + 1.0;

            for(var n = 0; n < exteriorBlocks; n++){
                this.scene.pushMatrix();
				this.scene.translate(this.coords[0], this.coords[1], this.coords[2]);
                this.cube.display();
                this.scene.popMatrix();

                if(this.coords[2] == i - 1.0){
                    this.scene.rotate(-Math.PI/2.0, 0.0, 1.0, 0.0);
                    this.coords[2] = -i + 2.0;
                }
                else
                    this.coords[2] += 1.0;

            }
        }
    }
}