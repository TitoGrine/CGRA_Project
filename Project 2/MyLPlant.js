/**
 * MyLSPlant
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLPlant extends MyLSystem {
	constructor(scene) {
		super(scene);
		this.x_pos = this.scene.rand(-10.0, 10.0);
		this.z_pos = this.scene.rand(-10.0, 10.0);
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