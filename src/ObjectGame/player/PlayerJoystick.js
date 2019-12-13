import 'phaser';
import getScalePlayerForDevice from '../../FunctionGame/GetScaleFunc';
/*
 * Config:
 *      scene,
 *      x,y :position
 *      playerJoystickImgs,
 *      depth
*/
export default class PlayerJoystick extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene);
        this.props = {
            playerJoystickImgs: config.playerJoystickImgs
        }
        this.setDepth(config.depth);
        this.outerJoystick = this.scene.add.image(this.scene.width * 3.2 / 4, this.scene.height * 7 / 8, this.props.playerJoystickImgs[1])
            .setDepth(config.depth)
            .setAlpha(0)
            .setScale(0.8 * getScalePlayerForDevice(this.scene.width, this.scene.height, 320, 480).scalePrimary);
        this.innerJoystick = this.scene.add.image(this.scene.width * 3.2 / 4, this.scene.height * 7 / 8, this.props.playerJoystickImgs[0])
            .setDepth(config.depth + 1)
            .setAlpha(0)
            .setScale(0.3 * getScalePlayerForDevice(this.scene.width, this.scene.height, 320, 480).scalePrimary);
        // this.innerJoystick.setInteractive();
        // this.scene.input.setDraggable(this.innerJoystick);
        // this.scene.input.on('dragstart', function (pointer, innerJoystick) {
        //     this.scene.children.bringToTop(innerJoystick);
        // }, this.scene);

        // this.scene.input.on('drag', function (pointer, innerJoystick, dragX, dragY) {
        //     if (innerJoystick.x > dragX) {
        //         innerJoystick.play('movingLeft', true);
        //     } else if (innerJoystick.x < dragX) {
        //         innerJoystick.play('movingRight', true);
        //     } else {
        //         innerJoystick.play('movingVertical', true);
        //     }
        //     innerJoystick.x = dragX;
        //     innerJoystick.y = dragY;

        // });
        // this.scene.input.on('dragend', function (pointer, gameObject) {
        //     this.scene.children.bringToTop(gameObject);
        //     innerJoystick.play('movingVertical', true);
        // }, this.scene);
    }
    preload() { }
    create() { }
    createJoystick() {
        this.joyStick = this.scene.plugins.get('rexVirtualJoyStick').add(this.scene, {
            x: this.scene.width * 1 / 4,
            y: this.scene.height * 2 / 8,
            radius: 35,
            base: this.outerJoystick.setAlpha(0.5).setPosition(this.scene.width * 1 / 4, this.scene.height * 2 / 8),
            thumb: this.innerJoystick.setAlpha(0.8).setPosition(this.scene.width * 1 / 4, this.scene.height * 2 / 8),
            // dir: '8dir',   // 'up&down'|0|'left&right'|1|'4dir'|2|'8dir'|3
            // forceMin: 16,
            // enable: true
        })
            .on('update', function () {
                var cursorKeys = this.playerController.playerJoystick.joyStick.createCursorKeys();
                var s = 'Key down: ';
                for (var name in cursorKeys) {
                    if (cursorKeys[name].isDown) {
                        s += name + ' ';
                    }
                }
                s += '\n';
                s += ('Force: ' + Math.floor(this.playerController.playerJoystick.joyStick.force * 100) / 100 + '\n');
                s += ('Angle: ' + Math.floor(this.playerController.playerJoystick.joyStick.angle * 100) / 100 + '\n');
                this.playerController.playerJoystick.text.setText(s);
            }, this.scene);
        this.text = this.scene.add.text(0, 0);
    }
    update(time) {
    }
    resize(newWidth, newHeight) {
        if (this.joyStick) {
            this.outerJoystick
                .setScale(0.8 * getScalePlayerForDevice(newWidth, newHeight, 320, 480).scalePrimary)
                .setPosition(newWidth * 3.2 / 4, newHeight * 7 / 8);
            this.innerJoystick
                .setScale(0.3 * getScalePlayerForDevice(newWidth, newHeight, 320, 480).scalePrimary)
                .setPosition(newWidth * 3.2 / 4, newHeight * 7 / 8);
            this.joyStick.setPosition(newWidth * 3.2 / 4, newHeight * 7 / 8);
        }
    }
}
