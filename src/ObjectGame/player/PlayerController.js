import Player from './Player';
import PlayerJoystick from './PlayerJoystick';
/*
 * Config:
 *      scene
 *      playerJoystickImgs
 *      playerImgs
*/
export default class PlayerController {
    constructor(config) {
        this.scene = config.scene;
        this.props = {
            playerJoystickImgs: config.playerJoystickImgs,
            playerImgs: config.playerImgs
        }
        this.create();
    }
    create() {
        var playerConfig = {
            scene: this.scene,
            x: this.scene.width / 4,
            y: this.scene.height / 2,
            playerImgs: this.props.playerImgs,
            playerAnimationStr: [],
            depth: 2
        }
        // this.player = new Player(playerConfig);
        var joystickConfig = {
            scene: this.scene,
            playerJoystickImgs: this.props.playerJoystickImgs,
            depth: 2
        }
        this.playerJoystick = new PlayerJoystick(joystickConfig);
        this.playerJoystick.createJoystick();
    }
    update(time) {
        if (this.player) { this.player.update(time) };
        if (this.playerJoystick) { this.playerJoystick.update(time) };
    }
    resize(newWidth, newHeight) {
        if (this.player) { this.player.resize(newWidth, newHeight); };
        if (this.playerJoystick) { this.playerJoystick.resize(newWidth, newHeight); };
    }
}
