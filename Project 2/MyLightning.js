/**
 * MyLightning
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLightning extends MyLSystem {
	constructor(scene) {
		super(scene);
		this.startTime = 0;
		this.depth;
    }

    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": new MyQuad(this.scene, 0.2, 1),
            "X": new MyQuad(this.scene, 0.2, 0.2)
        };
	}
	
	startAnimation(t){
		// TODO: refactor
		this.axiom = "X";
		this.iterate();
		this.startTime = t;
		this.depth = 0;
	}
	update(t){
		let periodicity = 1000 / this.axiom.length;
		this.depth = (t - this.startTime) / periodicity;
	}
	display(){
        this.scene.pushMatrix();
        this.scene.scale(this.scale, this.scale, this.scale);

		var i;
		let primitiveCount = 0;
		let pushCount = 0;

        // percorre a cadeia de caracteres
        for (i=0; i<this.axiom.length && primitiveCount < this.depth; ++i){

            // verifica se sao caracteres especiais
            switch(this.axiom[i]){
                case "+":
                    // roda a esquerda
                    this.scene.rotate(this.angle, 0, 0, 1);
                    break;

                case "-":
                    // roda a direita
                    this.scene.rotate(-this.angle, 0, 0, 1);
                    break;

				case "\\":
                    // roda positivo no x
                    this.scene.rotate(this.angle, 1, 0, 0);
                    break;

                case "/":
                    // roda negativo no x
                    this.scene.rotate(-this.angle, 1, 0, 0);
					break;
					
				case "^":
                    // roda positivo no y
                    this.scene.rotate(this.angle, 0, 1, 0);
                    break;

                case "&":
                    // roda negativo no y
                    this.scene.rotate(-this.angle, 0, 1, 0);
                    break;
	
                case "[":
					// push
					pushCount++;
                    this.scene.pushMatrix();
                    break;

                case "]":
					// pop
					pushCount--;
                    this.scene.popMatrix();
					break;
				

                // processa primitiva definida na gramatica, se existir
                default:
					var primitive=this.grammar[this.axiom[i]];

                    if ( primitive )
                    {
						primitiveCount++;
                        primitive.display();
                        this.scene.translate(0, 1, 0);
					}
                    break;
            }
        }
		this.scene.popMatrix();
		for(let j = 0; j < pushCount; j++)
			this.scene.popMatrix();
    }

}