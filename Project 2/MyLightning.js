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
		this.x_pos;
		this.z_pos;

		this.initAppearance();
    }

    // cria o lexico da gramática
    initGrammar(){
        this.grammar = {
            "F": new MyQuad(this.scene, 1, 1),
            "X": new MyQuad(this.scene, 1, 1)
        };
	}

	// gera o sistema L com os par�metros atuais da cena
    generate(_axiom, _productions, _angle, _iterations, _scale){
        // copia o axioma da cena para iniciar a sequência de desenvolvimento
        this.axiom = _axiom;

        // cria as producoes
        this.productions=_productions;

        // angulo de rotacao
        this.angle = _angle * Math.PI / 180.0;

        // numero de iteracoes
        this.iterations = _iterations;

        // escalamento dos elementos dependente do numero de iteracoes
        this.scale = Math.pow(_scale, this.iterations-1);
     }
	
	startAnimation(t){
		// TODO: refactor
		this.axiom = "X";
		this.x_pos = this.scene.rand(-15, 15);
		this.z_pos = this.scene.rand(-15, 15);
		this.iterate();
		this.startTime = t;
		this.depth = 0;
	}
	update(t){
		let periodicity = 1000 / this.axiom.length;
		this.depth = (t - this.startTime) / periodicity;
	}
	initAppearance(){
		this.lightningAppearance = new CGFappearance(this.scene);
        this.lightningAppearance.setAmbient(0.68, 0.85, 0.9, 0.4);
        this.lightningAppearance.setDiffuse(0.68, 0.85, 0.9, 0.4);
        this.lightningAppearance.setSpecular(0.68, 0.85, 0.9, 1.0);
        this.lightningAppearance.setShininess(10.0);
	}
	display(){
		this.scene.pushMatrix();
		
		this.scene.translate(this.x_pos, 30, this.z_pos);
		this.scene.rotate(Math.PI, 0, 0, 1);


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
						this.scene.pushMatrix();
						this.scene.scale(0.2, 1, 1);
						this.lightningAppearance.apply();
						primitive.display();
						this.scene.popMatrix();
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