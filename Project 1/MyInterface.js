/**
* MyInterface
* @constructor
*/
class MyInterface extends CGFinterface {
    constructor() {
        super();
    }

    init(application) {
        // call CGFinterface init
        super.init(application);
        // init GUI. For more information on the methods, check:
        // http://workshop.chromeexperiments.com/examples/gui
        this.gui = new dat.GUI();

        this.gui.add(this.scene, 'displayAxis').name('Display Axis');

		this.gui.add(this.scene, 'zoomFactor', -3.0, 3.0).step(1).name('Zoom');
        this.gui.add(this.scene, 'birds').name('Birds');

		this.gui.add(this.scene, 'selectedLight', this.scene.lightMode).name('Lights').onChange(this.scene.updateMode.bind(this.scene) );
		this.gui.add(this.scene, 'displayTextures').name('Display Textures').onChange(this.scene.updateTexturesVisibility.bind(this.scene));

		this.gui.add(this.scene, 'view', {'General': 0, 'Backyard': 1, 'Fire': 2, 'Aerial': 3}).name('View Points').onChange(this.scene.updateCamera.bind(this.scene));
        
        var obj = this;

        return true;
    }
}