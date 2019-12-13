import 'phaser';
import config from './Config/config'

window.game = new Phaser.Game(config);
window.addEventListener('resize', function (event) {
  game.scene.scenes.forEach(element => {
    element.resize(window.innerWidth, window.innerHeight);
  });
  game.scale.resize(window.innerWidth, window.innerHeight);
}, false);
