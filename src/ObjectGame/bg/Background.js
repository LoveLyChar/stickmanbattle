import 'phaser';

/*
 * Config:
 *      scene
 *      x
 *      y
 *      keys: Key of all background img
*/
export default class Background extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene);
        this.skyBackground = this.scene.add.tileSprite(this.scene.width / 2, this.scene.height / 2, this.scene.width, this.scene.height, config.keys[0]);
        this.bridgeBackground = this.scene.add.tileSprite(this.scene.width / 2, this.scene.height * 7 / 8, this.scene.width,  480, config.keys[1]);
        this.bridgeBackground.setDepth(2);
        // this.props = {};
        // this.props.speedBackground = 1;
        // this.props.flagHighSpeed = true;
        // this.createBgBoard();
    }
    preload() { }
    create() { }
    update(time) {
        // if (this.props.flagHighSpeed) {
        //     this.skyBackground.tilePositionY -= 20 * this.props.speedBackground;
        // } else {
        //     this.skyBackground.tilePositionY -= 1 * this.props.speedBackground;
        // }
    }
    resize(newWidth, newHeight) {
        this.skyBackground.setPosition(newWidth / 2, newHeight / 2);
        this.skyBackground.setSize(newWidth, newHeight);

        this.bridgeBackground.setPosition(newWidth / 2, newHeight * 7 / 8);
        this.bridgeBackground.setSize(newWidth, 480);

        // this.waterBackground.setPosition(newWidth / 2, newHeight * 9 / 8);
        // this.waterBackground.setSize(newWidth, newHeight / 2);
        // this.createBgBoard();
    }
    // createBgBoard() {
    //     if (this.graphics) {
    //         this.graphics.destroy();
    //     }
    //     this.graphics = this.scene.add.graphics().fillStyle(0x7CA19C, 0.4).fillRect(this.scene.width / 2, this.scene.height * 3 / 4, this.scene.width, this.scene.height / 2);
    //     this.graphics.fillPath();
    // }
}