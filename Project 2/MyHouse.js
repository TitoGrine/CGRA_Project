class MyHouse extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.initMaterials();

    }
    initBuffers(){
        this.window = new MyQuad(this.scene, 1.0, 1.0);
        this.door = new MyQuad(this.scene, 1.0, 1.0);
        this.glassDoor = new MyQuad(this.scene, 1.0, 1.0);
        this.sideWindow = new MyQuad(this.scene, 1.0, 1.0);
        this.pool = new MyQuad(this.scene, 1.0, 1.0);

        this.entranceRoof = new MyPyramid(this.scene, 4, 1.7, 0.5, 1.2);        
        this.dogHouseRoof = new MyPyramid(this.scene, 4, 0.4, 0.3, 0.5);
        this.dogHouseEntrance = new MyQuad(this.scene, 0.5, 0.4);

        this.supportCollum1 = new MyPrism(this.scene, 5);
        this.supportCollum2 = new MyPrism(this.scene, 5);
        this.lampPost = new MyCylinder(this.scene, 10);

        this.chimney = new MyPrism(this.scene, 6);
        
        this.mainBlock = new MyUnitCubeQuad(this.scene, 3.0, 4.0, 3.0);
        this.sideBlock = new MyUnitCubeQuad(this.scene, 4.0, 2.0, 2.0);
        this.balconyBlock = new MyUnitCubeQuad(this.scene, 3.0, 0.4, 5.0);
        this.entranceBlock = new MyUnitCubeQuad(this.scene, 2.0, 1.5, 1.5);
        this.entranceRoofSupport = new MyUnitCubeQuad(this.scene, 2.4, 0.1, 1.9);
        this.poolEntrance = new MyUnitCubeQuad(this.scene, 2.0, 1.4, 1.0);
        this.ceillingBlockMain = new MyUnitCubeQuad(this.scene, 3.4, 0.4, 3.4);
        this.ceillingBlockSide = new MyUnitCubeQuad(this.scene, 4.3, 0.4, 2.4);
        this.poolBlock = new MyUnitCubeQuad(this.scene, 2.6, 0.1, 3.9);
        this.dogHouse = new MyUnitCubeQuad(this.scene, 0.5, 0.4, 0.6);
    }
    initMaterials(){
        this.doorTexture = new CGFappearance(this.scene);
        this.doorTexture.setAmbient(1.0, 1.0, 1.0, 0.4);
        this.doorTexture.setDiffuse(1.0, 1.0, 1.0, 0.7);
        this.doorTexture.setSpecular(1.0, 1.0, 1.0, 0.1);
        this.doorTexture.setShininess(1.0);
        this.doorTexture.loadTexture('images/door.jpg');
        this.doorTexture.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.glassDoorTexture = new CGFappearance(this.scene);
        this.glassDoorTexture.setAmbient(0.9, 0.9, 0.9, 0.6);
        this.glassDoorTexture.setDiffuse(0.9, 0.9, 0.9, 0.6);
        this.glassDoorTexture.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.glassDoorTexture.setShininess(1.0);
        this.glassDoorTexture.loadTexture('images/porch_door.png');
        this.glassDoorTexture.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.sideWindowTexture = new CGFappearance(this.scene);
        this.sideWindowTexture.setAmbient(0.9, 0.9, 0.9, 0.6);
        this.sideWindowTexture.setDiffuse(0.9, 0.9, 0.9, 0.6);
        this.sideWindowTexture.setSpecular(0.9, 0.9, 0.9, 1.0);
        this.sideWindowTexture.setShininess(1.0);
        this.sideWindowTexture.loadTexture('images/porch_window.png');
        this.sideWindowTexture.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.poolWaterTexture = new CGFappearance(this.scene);
        this.poolWaterTexture.setAmbient(0.461, 0.965, 0.926, 1.0);
        this.poolWaterTexture.setDiffuse(0, 0, 0, 0.2);
        this.poolWaterTexture.setSpecular(0.461, 0.965, 0.926, 1.0);
        this.poolWaterTexture.setShininess(4.0);
        this.poolWaterTexture.loadTexture('images/pool_water.jpg');
        this.poolWaterTexture.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        this.houseRoofTexture = new CGFappearance(this.scene);
		this.houseRoofTexture.setAmbient(0.6, 0.6, 0.6, 1.0);
        this.houseRoofTexture.setDiffuse(0.6, 0.6, 0.6, 1.0);
        this.houseRoofTexture.setSpecular(0.6 / 10, 0.6  / 10, 0.6  / 10, 1.0);
        this.houseRoofTexture.setShininess(10.0);
        this.houseRoofTexture.loadTexture('images/house_roof.jpg');
        this.houseRoofTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.dogHouseRoofTexture = new CGFappearance(this.scene);
        this.dogHouseRoofTexture.setAmbient(0.72, 0.26, 0.6, 0.4);
        this.dogHouseRoofTexture.setDiffuse(0.72, 0.26, 0.6, 0.7);
        this.dogHouseRoofTexture.setSpecular(0.72, 0.26, 0.6, 0.1);
        this.dogHouseRoofTexture.setShininess(1.0);
        this.dogHouseRoofTexture.loadTexture('images/dog_roof.jpg');
        this.dogHouseRoofTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.dogHouseEntranceTexture = new CGFappearance(this.scene);
        this.dogHouseEntranceTexture.setAmbient(0.45, 0.32, 0.22, 0.4);
        this.dogHouseEntranceTexture.setDiffuse(0.45, 0.32, 0.22, 0.7);
        this.dogHouseEntranceTexture.setSpecular(0.45, 0.32, 0.22, 0.1);
        this.dogHouseEntranceTexture.setShininess(1.0);
        this.dogHouseEntranceTexture.loadTexture('images/dog_entrance.jpg');
        this.dogHouseEntranceTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.houseWallTexture = new CGFappearance(this.scene);
		this.houseWallTexture.setAmbient(0.918, 0.847, 0.682, 1.0);
        this.houseWallTexture.setDiffuse(0.918, 0.847, 0.682, 1.0);
        this.houseWallTexture.setSpecular(0.918 / 10, 0.847 / 10, 0.682 / 10, 1.0);
        this.houseWallTexture.setShininess(10.0);
        this.houseWallTexture.loadTexture('images/house_wall.jpg');
        this.houseWallTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.dogHouseWallTexture = new CGFappearance(this.scene);
        this.dogHouseWallTexture.setAmbient(0.45, 0.32, 0.22, 0.4);
        this.dogHouseWallTexture.setDiffuse(0.45, 0.32, 0.22, 0.7);
        this.dogHouseWallTexture.setSpecular(0.45, 0.32, 0.22, 0.1);
        this.dogHouseWallTexture.setShininess(1.0);
        this.dogHouseWallTexture.loadTexture('images/dog_wall.jpg');
        this.dogHouseWallTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.concreteTexture = new CGFappearance(this.scene);
        this.concreteTexture.setAmbient(0.7, 0.7, 0.7, 0.8);
        this.concreteTexture.setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.concreteTexture.setSpecular(0, 0, 0, 0.1);
        this.concreteTexture.setShininess(1.0);
        this.concreteTexture.loadTexture('images/concrete.jpg');
        this.concreteTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.graniteTexture = new CGFappearance(this.scene);
        this.graniteTexture.setAmbient(0.9, 0.9, 0.9, 0.5);
        this.graniteTexture.setDiffuse(0.9, 0.9, 0.9, 0.7);
        this.graniteTexture.setSpecular(1.0, 1.0, 1.0, 0.7);
        this.graniteTexture.setShininess(10.0);
        this.graniteTexture.setShininess(1.0);
        this.graniteTexture.loadTexture('images/granite.jpg');
        this.graniteTexture.setTextureWrap('REPEAT', 'REPEAT');

        this.windowTexture = new CGFappearance(this.scene);
        this.windowTexture.setAmbient(0.7, 0.95, 1.0, 0.8);
        this.windowTexture.setDiffuse(0, 0, 0, 0.1);
        this.windowTexture.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.windowTexture.setShininess(2.0);
        this.windowTexture.loadTexture('images/window.jpg');
        this.windowTexture.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }
    setMainBlockPos(){
        this.scene.translate(1.5, 2.0, 1.5);
        this.scene.scale(3.0, 4.0, 3.0);
    }
    setWindowPos(){
        this.scene.translate(3.01, 2.9, 1.5);
        this.scene.scale(1.0, 1.0, 1.5);
        this.scene.rotate(Math.PI/2.0, 0.0, 1.0, 0.0);
    }
    setDoorPos(){
        this.scene.translate(1.5, 0.35, 4.501);
        this.scene.scale(0.4, 0.7, 1.0);
    }
    setSideBlockPos(){
        this.scene.translate(-2.0, 1.0, 1.0);
        this.scene.scale(4.0, 2.0, 2.0);
    }
    setSideWindowPos(){
        this.scene.translate(-2.0, 0.9, -0.01);
        this.scene.scale(3.5, 1.8, 1.0);
        this.scene.rotate(Math.PI, 0.0, 1.0, 0.0);
    }
    setEntranceBlockPos(){
        this.scene.translate(1.5, 0.75, 3.75);
        this.scene.scale(2.0, 1.5, 1.5);
    }
    setEntranceRoofPos(){
        this.scene.translate(1.5, 1.6, 3.0 + 1.2*Math.sqrt(2.0)/2.0);
        this.scene.scale(1.7, 0.5, 1.2);
        this.scene.rotate(Math.PI/4.0, 0.0, 1.0, 0.0);
    }
    setEntranceRoofSupportPos(){
        this.scene.translate(1.5, 1.55, 3.75);
        this.scene.scale(2.4, 0.1, 1.9);
        this.scene.rotate(Math.PI/2.0, 0.0, 1.0, 0.0);
    }
    setPoolEntrancePos(){
        this.scene.translate(1.5, 0.7, -0.5);
        this.scene.scale(2.0, 1.4, 1.0);
    }
    setGlassDoorPos(){
        this.scene.translate(1.5, 0.55, -1.01);
        this.scene.scale(1.5, 1.1, 1.0);
        this.scene.rotate(Math.PI, 0.0, 1.0, 0.0);
    }
    setBalconyBlockPos(){
        this.scene.translate(1.5, 1.6, -2.5);
        this.scene.scale(3.0, 0.4, 5.0);
    }
    setCeillingBlockMainPos(){
        this.scene.translate(1.5, 4.2, 1.5);
        this.scene.scale(3.4, 0.4, 3.4);
    }
    setCeillingBlockSidePos(){
        this.scene.translate(-2.15, 2.2, 1.0);
        this.scene.scale(4.3, 0.4, 2.4);
    }
    setChimneyPos(){
        this.scene.translate(-3.5, 2.4, 0.75);
        this.scene.scale(0.2, 0.4, 0.2);
    }
    setPoolBlockPos(){
        this.scene.translate(-1.9, 0.05, -2.5);
        this.scene.scale(2.6, 0.1, 3.9);
    }
    setPoolPos(){
        this.scene.translate(-1.9, 0.105, -2.5);
        this.scene.scale(2.2, 1.0, 3.5);
        this.scene.rotate(-Math.PI/2.0, 1.0, 0.0, 0.0);
    }
    setLampPostPos(){
        this.scene.translate(1.5, 1.225, -4.5);
        this.scene.scale(0.05, 0.175, 0.05);
    }
    setDogHousePos(){
        this.scene.translate(-4.4, 0.2, 0.3);
        this.scene.scale(0.5, 0.4, 0.6);
    }
    setDogHouseRoofPos(){
        this.scene.translate(-4.4, 0.4, 0.3);
        this.scene.scale(0.4, 0.3, 0.5);
        this.scene.rotate(Math.PI/4.0, 0.0, 1.0, 0.0);
    }
    setDogHouseEntrancePos(){
        this.scene.translate(-4.4, 0.2, -0.01);
        this.scene.scale(0.5, 0.4, 1.0);
        this.scene.rotate(Math.PI, 0.0, 1.0, 0.0);
    }
    setSupportCollumPos(ID){
        switch(ID){
            case 1:
                this.scene.translate(0.5, 0.0, -4.5);
                this.scene.scale(0.2, 1.4, 0.2);
                break;
            case 2:
                this.scene.translate(2.5, 0.0, -4.5);
                this.scene.scale(0.2, 1.4, 0.2);
                break;
        }
    }
    setDefaultAppearance() {
        this.scene.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.scene.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.scene.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.scene.setShininess(1.0);
    }
    display(){

        this.scene.pushMatrix();
        this.setMainBlockPos();
        this.houseWallTexture.apply();
        this.mainBlock.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setWindowPos();
        this.windowTexture.apply();
        this.window.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setSideBlockPos();
        this.houseWallTexture.apply();
        this.sideBlock.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setSideWindowPos();
        this.sideWindowTexture.apply();
        this.sideWindow.display();
        this.setDefaultAppearance();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setCeillingBlockMainPos();
        this.houseRoofTexture.apply();
        this.ceillingBlockMain.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setCeillingBlockSidePos();
        this.houseRoofTexture.apply();
        this.ceillingBlockSide.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setPoolEntrancePos();
        this.houseWallTexture.apply();
        this.poolEntrance.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setEntranceBlockPos();
        this.houseWallTexture.apply();
        this.entranceBlock.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setDoorPos();
        this.doorTexture.apply();
        this.door.display();
        this.setDefaultAppearance();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setEntranceRoofPos();
        this.houseRoofTexture.apply();
        this.entranceRoof.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setEntranceRoofSupportPos();
        this.houseRoofTexture.apply();
        this.entranceRoofSupport.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setBalconyBlockPos();
        this.houseWallTexture.apply();
        this.balconyBlock.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setSupportCollumPos(1);
        this.graniteTexture.apply();
        this.supportCollum1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setSupportCollumPos(2);
        this.graniteTexture.apply();
        this.supportCollum2.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setChimneyPos();
        this.concreteTexture.apply();
        this.chimney.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setLampPostPos();
        this.lampPost.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setDogHousePos();
        this.dogHouseWallTexture.apply();
        this.dogHouse.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setDogHouseRoofPos();
        this.dogHouseRoofTexture.apply();
        this.dogHouseRoof.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setDogHouseEntrancePos();
        this.dogHouseEntranceTexture.apply();
        this.dogHouseEntrance.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setPoolBlockPos();
        this.concreteTexture.apply();
        this.poolBlock.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setGlassDoorPos();
        this.glassDoorTexture.apply();
        this.glassDoor.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.setPoolPos();
        this.poolWaterTexture.apply();
        this.pool.display();
        this.scene.popMatrix();
    }

}