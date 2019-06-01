/**
 * MyLSPlant
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLPlant extends MyLSystem {
	constructor(scene) {
		super(scene);

		if(Math.round(this.scene.rand(0, 1))){
			this.x_pos = this.scene.rand(-10.0, 0.0);
			this.z_pos = this.scene.rand(-10.0, 3.5);
		}
		else{
			this.x_pos = this.scene.rand(-6.0, 9.5);
			this.z_pos = this.scene.rand(-4.0, 8.5);
		}
    }

    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": new MyBranch(this.scene),
            "X": new MyLeaf(this.scene)
        };
	}
	
	display(){
		this.scene.pushMatrix();
		this.scene.translate(this.x_pos, 0, this.z_pos);
		super.display();
		this.scene.popMatrix();
	}

}