/**
* MySphere
* @constructor
*/
class MySphere extends CGFobject {
    constructor(scene, complexity, x_scale, y_scale) {
        super(scene);
		this.complexity = complexity;
		this.x_scale = x_scale;
		this.y_scale = y_scale;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
		this.normals = [];
		this.texCoords = [];

		var thetaAng = 0;
		var phiAng = 0;
		var thetaInc = 2*Math.PI/this.complexity;
		var phiInc = (Math.PI / 2) / this.complexity;

		for(var j = 0; j <= this.complexity; j++){
			
			for(var i = 0; i <= this.complexity; i++){
		
				this.vertices.push(Math.cos(thetaAng) * Math.cos(phiAng), -Math.sin(phiAng), -Math.cos(phiAng) * Math.sin(thetaAng));
				
				this.normals.push(Math.cos(thetaAng) * Math.cos(phiAng), -Math.sin(phiAng), -Math.cos(phiAng) * Math.sin(thetaAng));
		
				this.texCoords.push( i /this.complexity * this.x_scale, j / this.complexity * this.y_scale);

				thetaAng+=thetaInc;
			}
			phiAng += phiInc;
		}
		

		for(var j = 0; j < this.complexity; j++){
			for (var i = 0; i < this.complexity; i++) {
				
				this.indices.push((i + 1) * (this.complexity + 1) + j, i * (this.complexity + 1) +  1 + j, i * (this.complexity + 1) + j);
				this.indices.push( (i + 1) * (this.complexity + 1) + j , (i + 1) * (this.complexity + 1) + 1 + j , i * (this.complexity + 1) +  1 + j);
				
			}
		}

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