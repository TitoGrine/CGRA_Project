/**
 * MyTree
 * @constructor
 * @param scene - Reference to MyScene object
 * @param trunkHeight - Height of the Trunk
 * @param trunkRadius  - Radius of the Trunk
 * @param treeTopHeight - Height of the Top part of the Tree
 * @param treeTopRadius - Radius of the Top part of the Tree
 * @param trunkTexture - Texture of the Trunk
 * @param treeTopTexture - Texture of the Top part of the Tree
 */
class MyTree extends CGFobject {
	constructor(scene, trunkHeight, trunkRadius, treeTopHeight, treeTopRadius, trunkTexture, treeTopTexture) {
		super(scene);
		this.side = 10;
		this.trunkHeight = trunkHeight;
		this.trunkRadius = trunkRadius;
		this.treeTopHeight = treeTopHeight;
		this.treeTopRadius = treeTopRadius;
		this.trunkTexture = trunkTexture;
		this.treeTopTexture = treeTopTexture;
		this.initMaterials();
		this.initBuffers();
		
	}
	initBuffers() {
		this.trunk = new MyCylinder(this.scene, this.side);
		this.treeTop = new MyCone(this.scene, this.side, 1);
	}

	initMaterials() {

		// Texture Appearance
		this.wood = new CGFappearance(this.scene);
		this.wood.setAmbient(0.625, 0.32, 0.18, 0.6);
        this.wood.setDiffuse(0.625, 0.32, 0.18, 1.0);
        this.wood.setSpecular(0, 0, 0, 0.2);
		this.wood.setShininess(10.0);
		this.wood.loadTexture(this.trunkTexture);
		this.wood.setTextureWrap('REPEAT', 'REPEAT');

		this.leaf = new CGFappearance(this.scene);
		this.leaf.setAmbient(0.204, 0.574, 0.176, 0.3);
        this.leaf.setDiffuse(0.204, 0.574, 0.176, 0.6);
        this.leaf.setSpecular(0.204 / 2, 0.574 / 2, 0.176 / 2, 0.6);
		this.leaf.setShininess(10.0);
		this.leaf.loadTexture(this.treeTopTexture);
		this.leaf.setTextureWrap('REPEAT', 'REPEAT');
	}
	
	setTrunkPosition() {
		this.scene.scale(this.trunkRadius, this.trunkHeight, this.trunkRadius);
	}
	
	setTreeTopPosition() {
		this.scene.translate(0, this.trunkHeight, 0);
		this.scene.scale(this.treeTopRadius, this.treeTopHeight, this.treeTopRadius);
	}

	enableNormalViz(){
		this.trunk.enableNormalViz();
		this.treeTop.enableNormalViz();
	}

	disableNormalViz(){
		this.trunk.disableNormalViz();
		this.treeTop.disableNormalViz();
	}

	display(){
		this.scene.pushMatrix();
		this.setTrunkPosition();
		this.wood.apply();
		this.trunk.display();
		this.scene.popMatrix();

		this.scene.pushMatrix();
		this.setTreeTopPosition();
		// this.neutral.setTexture(this.texture1);
		this.leaf.apply();
		this.treeTop.display();
		this.scene.popMatrix();
	}
}