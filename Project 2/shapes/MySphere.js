/**
* MySphere
* @constructor
*/
class MySphere extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
		this.slices = slices;
		this.stacks = stacks;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var thetaAng = 0;
		var phiAng = 0;
		var thetaInc = 2*Math.PI/this.slices;
		var phiInc = (Math.PI / 2) / this.stacks;

		for(var j = 0; j <= this.stacks; j++){
			
			for(var i = 0; i <= this.slices; i++){

				this.vertices.push(Math.cos(thetaAng) * Math.cos(phiAng), Math.sin(thetaAng) * Math.cos(phiAng),-Math.sin(phiAng));
				
				this.normals.push(Math.cos(thetaAng) * Math.cos(phiAng), Math.sin(thetaAng) * Math.cos(phiAng),- Math.sin(phiAng));

				this.texCoords.push( i /this.slices, j / this.stacks);

				thetaAng+=thetaInc;
			}
			phiAng += phiInc;
		}
		/*
		var thetaAng = 0;
		var phiAng = 0;

		for(var j = 0; j <= this.stacks; j++){
			
			for(var i = 0; i <= this.slices; i++){

				this.vertices.push(-Math.cos(thetaAng) * Math.cos(phiAng), Math.sin(thetaAng) * Math.cos(phiAng), Math.sin(phiAng));
				
				this.normals.push(-Math.cos(thetaAng) * Math.cos(phiAng), Math.sin(thetaAng) * Math.cos(phiAng), Math.sin(phiAng));

				this.texCoords.push( i /this.slices, j / this.stacks);

				thetaAng+=thetaInc;
			}
			phiAng += phiInc;
		}
*/
		

		for(var j = 0; j < this.stacks; j++){
			for (var i = 0; i < this.slices; i++) {
				
				this.indices.push((i + 1) * (this.slices + 1) + j, i * (this.slices + 1) +  1 + j, i * (this.slices + 1) + j);
				this.indices.push( (i + 1) * (this.slices + 1) + j , (i + 1) * (this.slices + 1) + 1 + j , i * (this.slices + 1) +  1 + j);
				
			}
		}
/*
		for(var j = this.stacks; j <= this.stacks * 2 ; j++){
			for (var i = this.slices; i <= this.slices * 2; i++) {
				this.indices.push((i + 1) * (this.slices + 1) + j, i * (this.slices + 1) +  1 + j, i * (this.slices + 1) + j);
				this.indices.push( (i + 1) * (this.slices + 1) + j , (i + 1) * (this.slices + 1) + 1 + j , i * (this.slices + 1) +  1 + j);
			}
		}
*/
		this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
	}

	display(){
		super.display();
		this.scene.pushMatrix();
		this.scene.rotate(Math.PI,1,0,0);
		super.display();		
		this.scene.popMatrix();
	}
}