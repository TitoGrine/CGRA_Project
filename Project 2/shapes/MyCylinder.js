/**
* MyCylinder
* @constructor
*/
class MyCylinder extends CGFobject {
    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
		this.normals = [];
		this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i <= this.slices; i++){

			this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
			this.vertices.push(Math.cos(ang), 1, -Math.sin(ang));
			
			this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
			this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
			// TODO: Verify order
			this.texCoords.push( i /this.slices, 1);
			this.texCoords.push( i /this.slices, 0);
			ang+=alphaAng;
		}
		
		for (var i = 0; i < this.slices; i++) {
			this.indices.push( (2*i+2) , (2*i+1) , (2*i) );
			this.indices.push( (2*i+1) , (2*i+2) , (2*i+3));
		}

		this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}