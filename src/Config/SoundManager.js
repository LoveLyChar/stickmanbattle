
export default class SoundManager {
    constructor(config) {
        this.props = {
            scene: config.scene,
            // backgroundSound: config.backgroundSound,
            // bulletSounds: config.bulletSounds,
            // enemyDieSound: config.enemyDieSound,
            // bossCommingSound: config.bossCommingSound,
            // getItemSound: config.getItemSound,
            // powerUpSound: config.powerUpSound,
            // endGameShowSound: config.endGameShowSound,
            // bossAndPlayerDie: config.bossAndPlayerDie
        }
    }
    // playBackground() {
    //     this.bg_play = this.props.scene.sound.add(this.props.backgroundSound);
    //     if (!this.bg_play) return;
    //     this.bg_play.play();
    //     this.bg_play.setLoop(true);
    //     this.bg_play.volume = 0.15;
    // }

    // playEnemyDie() {
    //     this.enemy_die = this.props.scene.sound.add(this.props.enemyDieSound);
    //     if (!this.enemy_die) return;
    //     this.enemy_die.play();
    //     this.enemy_die.volume = 0.3;
    // }

    // playBulletFire(typeBullet) {
    //     this.damage_sound = this.props.scene.sound.add(this.props.bulletSounds[typeBullet - 1]);
    //     if (!this.damage_sound) return;
    //     this.damage_sound.play();
    //     switch (typeBullet) {
    //         case 1:
    //             this.damage_sound.volume = 1;
    //             break;
    //         case 2:
    //             this.damage_sound.volume = 0.2;
    //             break;
    //         case 3:
    //             this.damage_sound.volume = 0.8;
    //             break;
    //         default:
    //             break;
    //     }
    // }

    // playGetItemSound() {
    //     this.get_item = this.props.scene.sound.add(this.props.getItemSound);
    //     if (!this.get_item) return;
    //     this.get_item.play();
    //     this.get_item.volume = 1;
    // }

    // playPowerUpSound() {
    //     this.power_up = this.props.scene.sound.add(this.props.powerUpSound);
    //     if (!this.power_up) return;
    //     this.power_up.play();
    //     this.power_up.volume = 1;
    // }
    // playBossCommingSound() {
    //     this.boss_coming = this.props.scene.sound.add(this.props.bossCommingSound);
    //     if (!this.boss_coming) return;
    //     this.boss_coming.play();
    //     this.boss_coming.volume = 0.8;
    // }
    // playEndGameShowSound() {
    //     this.end_show = this.props.scene.sound.add(this.props.endGameShowSound);
    //     if (!this.end_show) return;
    //     this.end_show.play();
    //     this.end_show.volume = 1;
    // }
    // playBossAndPlayerDie() {
    //     this.boss_player_die = this.props.scene.sound.add(this.props.bossAndPlayerDie);
    //     if (!this.boss_player_die) return;
    //     this.boss_player_die.play();
    //     this.boss_player_die.volume = 1;
    // }
}
