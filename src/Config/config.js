import 'phaser';
import GameScene from '../Scenes/GameScene'
import VirtualJoyStickPlugin from '../plugin/virtualjoystick-plugin';
var WIDTH_GAME = window.innerWidth,
    HEIGHT_GAME = window.innerHeight;

export default {
    type: Phaser.AUTO,
    width: WIDTH_GAME,
    height: HEIGHT_GAME,
    physics: {
        default: 'matter',
        matter: {
            fps: 60,
            // gravity: { y: 300 },
            debug: true
        }
    },
    scene: [GameScene],
    plugins: {
        global: [{
            key: 'rexVirtualJoyStick',
            plugin: VirtualJoyStickPlugin,
            start: true
        }]
    }
};