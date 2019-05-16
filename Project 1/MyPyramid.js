/**
* MyPyramid
* @constructor
*/
class MyPyramid extends CGFobject {
    constructor(scene, slices,  x_scale, y_scale, z_scale) {
        super(scene);
        this.slices = slices;

        this.x_scale = x_scale;
		this.y_scale = y_scale;
		this.z_scale = z_scale;

        this.initBuffers();
    }
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
		this.texCoords = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < 2*this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0,1,0);
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );

            this.texCoords.push(0.5 * this.x_scale / this.y_scale, 0.5 * this.z_scale / this.y_scale);
            this.texCoords.push(Math.abs(ca/2.0 + 0.5) * this.x_scale / this.y_scale, Math.abs(sa/2.0 - 0.5) * this.z_scale / this.y_scale);
            this.texCoords.push(Math.abs(caa/2.0 + 0.5) * this.x_scale / this.y_scale, Math.abs(saa/2.0 - 0.5) * this.z_scale / this.y_scale);
            

            // Computes base triangle
            i++;

            this.vertices.push(0,0,0);
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            // triangle normal computed by cross product of two edges
            normal= [0.0, -1.0, 0.0];

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push((3*i+2), (3*i+1) , 3*i );

            this.texCoords.push(0.5, 0.5);
            this.texCoords.push(Math.abs(sa/2.0 + 0.5), Math.abs(ca/2.0 - 0.5));
            this.texCoords.push(Math.abs(saa/2.0 + 0.5), Math.abs(caa/2.0 - 0.5));
            
            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}


