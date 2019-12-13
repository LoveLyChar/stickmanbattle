import 'phaser';

export default class EndGameSprite extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        this.props = {
            widthGame: config.widthGame,
            heightGame: config.heightGame,
            textures: config.textures,
            animKeys: config.animKeys
        }
        this.depth = config.depth;
        var ratio = getScaleRatioForDevice(this.props.widthGame, this.props.heightGame, 320, 480);
        this.endgameBg = this.scene.add.tileSprite(0, 0, this.props.widthGame, this.props.heightGame, this.props.textures[0]);
        this.endgameBg.setSize(this.props.widthGame, this.props.heightGame);
        this.endgameBg.setPosition(this.props.widthGame / 2, this.props.heightGame / 2);
        this.endgameBg.setDepth(this.depth);

        this.iconlogo = this.scene.add.sprite(this.props.widthGame * 1 / 2, this.props.heightGame / 5, this.props.textures[1]);
        this.iconlogo.setScale(0.5 * ratio);
        this.iconlogo.play('iconlogo_idle');
        this.iconlogo.setDepth(this.depth);

        this.screenshot = this.scene.add.image(this.props.widthGame / 2, this.iconlogo.y, this.props.textures[2]);
        this.screenshot.setDepth(this.depth);
        this.screenshot.setScale(0.3 * ratio);

        this.installbtn = this.scene.add.sprite(this.props.widthGame / 2, this.screenshot.y + this.screenshot.height, this.props.textures[3]);
        this.installbtn.setScale(0.5 * ratio);
        this.installbtn.anims.play(this.props.animKeys[1]);
        this.installbtn.setDepth(this.depth);

        this.sock = this.scene.add.image(this.props.widthGame / 2, this.iconlogo.y, this.props.textures[4])
            .setDepth(this.depth + 2)
            .setScale(0)
            .setAngle(-45);
        this.sock.props = {
            scaleIndex: 0,
            scalePrimary: 0.3 * ratio
        }
        this.crepBoss = this.scene.add.sprite(this.props.widthGame / 2, this.screenshot.y + this.screenshot.height, this.props.textures[5])
            .setFrame(0)
            .setScale(0)
            .setAngle(-45)
            .anims.play(this.props.animKeys[2])
            .setDepth(this.depth + 1);
        this.crepBossWing = this.scene.add.sprite(this.props.widthGame / 2, this.screenshot.y + this.screenshot.height, this.props.textures[6])
            .setFrame(0)
            .setScale(0)
            .setAngle(-45)
            .anims.play(this.props.animKeys[3])
            .setDepth(this.depth + 1);

        this.crepBoss.props = {
            scaleIndex: 0,
            scalePrimary: 0.4 * ratio
        }

        this.setPositionforEndGameObject(this.props.widthGame, this.props.heightGame);
        
        this.installbtn.setInteractive();
        this.installbtn.once('pointerdown', function () {
            this.scene.setUpInstall();
        });
        this.endgameBg.setInteractive();
        this.endgameBg.once('pointerdown', function () {
            this.scene.setUpInstall();
        });
        this.iconlogo.setInteractive();
        this.iconlogo.once('pointerdown', function () {
            this.scene.setUpInstall();
        });
        this.screenshot.setInteractive();
        this.screenshot.once('pointerdown', function () {
            this.scene.setUpInstall();
        });
    }
    update(time) {
        if (this.sock && this.sock.props.scaleIndex < this.sock.props.scalePrimary) {
            var ratio = getScaleRatioForDevice(this.props.widthGame, this.props.heightGame, 320, 480);
            this.sock.props.scaleIndex += 0.01 * ratio;
            this.sock.setScale(this.sock.props.scaleIndex);
        }
        if (this.crepBoss && this.crepBoss.props.scaleIndex < this.crepBoss.props.scalePrimary) {
            var ratio = getScaleRatioForDevice(this.props.widthGame, this.props.heightGame, 320, 480);
            this.crepBoss.props.scaleIndex += 0.012 * ratio;
            this.crepBoss.setScale(this.crepBoss.props.scaleIndex);
            this.crepBossWing.setScale(this.crepBoss.props.scaleIndex);
        }

    }
    resize(width, height) {
        this.props.widthGame = width;
        this.props.heightGame = height;
        this.setPositionforEndGameObject(width, height, 0);
    }
    setPositionforEndGameObject(widthNew, heightNew) {
        if (widthNew <= heightNew) {
            this.iconlogo.setPosition(widthNew / 2, heightNew * 1 / 6);
            this.screenshot.setPosition(this.iconlogo.x, heightNew * 2.7 / 5);
            this.installbtn.setPosition(this.iconlogo.x + 15, heightNew * 6.9 / 8);
        } else {
            this.screenshot.setPosition(widthNew * 1 / 4, heightNew * 1 / 2);
            this.iconlogo.setPosition(widthNew * 2.8 / 4, heightNew * 1.8 / 5);
            var ratio = getScaleRatioForDevice(widthNew, heightNew, 320, 480);
            this.installbtn.setPosition(this.iconlogo.x + 15 * ratio, heightNew * 3.3 / 5);
        }
        var ratio = getScaleRatioForDevice(this.props.widthGame, this.props.heightGame, 320, 480);
        this.sock.setPosition(this.screenshot.x - 70 * ratio, this.screenshot.y + 60 * ratio);
        this.crepBoss.setPosition(this.sock.x - 15 * ratio, this.sock.y - 30 * ratio);
        this.crepBossWing.setPosition(this.crepBoss.x, this.crepBoss.y);

        this.endgameBg.setSize(widthNew, heightNew);
        this.endgameBg.setPosition(widthNew / 2, heightNew / 2);
        this.iconlogo.setScale(0.5 * ratio);
        this.screenshot.setScale(0.3 * ratio);
        this.installbtn.setScale(0.5 * ratio);
        this.sock.setScale(0.3 * ratio);
        this.crepBoss.setScale(0.4 * ratio);
        this.crepBossWing.setScale(0.4 * ratio);
    }
}

function getScaleRatioForDevice(widthNow, heightNow, oldWidth, oldHeight) {
    var scalePrimary;
    if (widthNow == oldHeight || heightNow == oldWidth) {
        scalePrimary = 1;
    }
    var beforeWidth, afterWidth;
    if (oldWidth > oldHeight) {
        beforeWidth = oldHeight;
    } else {
        beforeWidth = oldWidth;
    }
    if (widthNow > heightNow) {
        afterWidth = heightNow;
    } else {
        afterWidth = widthNow;
    }
    scalePrimary = afterWidth / beforeWidth;
    return scalePrimary;
}