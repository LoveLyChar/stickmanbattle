import 'phaser';
import getScaleRatioForDevice from '../../FunctionGame/GetScaleFunc';

export default class IngameStuff extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene);
        this.props = {
            scoreNumber: 0,
            widthGame: this.scene.width,
            heightGame: this.scene.height,
            localizedText: config.localizedText,
            textureInstallBtn: config.textureInstallBtn
        }
        switch (config.localizedText) {
            case 0:
                this.props.textScore = "Score: ";
                break;
            case 1:
                this.props.textScore = "スコア: ";
                break;
            case 2:
                this.props.textScore = "득점: ";
                break;
            case 3:
                this.props.textScore = "比分: ";
                break;
            case 4:
                this.props.textScore = "Ponto: ";
                break;
            case 5:
                this.props.textScore = "Puntuación: ";
                break;
            default:
                this.props.textScore = "Score: ";
                break;
        }
        this.createScoreUI(this.props.scoreNumber);
        this.createInstallBtn(this.scene.width,this.scene.height);
        // var _self = this;
        // setTimeout(function () {
        //     _self.createInstallBtn(_self.props.widthGame, _self.props.heightGame);
        // }, 10);
    }
    preload() { }
    create() { }
    update(time) {
    }
    resize(newWidth, newHeight) {
        this.createScoreUI(this.props.scoreNumber);
        this.createInstallBtn(newWidth, newHeight);
    }
    createScoreUI(score) {
        if (this.scoreObj) {
            this.scoreObj.destroy();
            this.scoreBoard.destroy();
        }
        var scoreText = this.props.textScore + score;
        var scaleRatio = getScaleRatioForDevice(this.props.widthGame, this.props.heightGame, 320, 480).scalePrimary;
        if (this.props.localizedText == 5) {
            if (this.scoreWord) {
                this.scoreWord.destroy();
            }
            this.scoreObj = this.scene.add.text(10 * scaleRatio, 3 * scaleRatio, 'Puntuación: ', { fontFamily: 'Arial', fontSize: 10 * scaleRatio, color: '#ffffff' }).setDepth(2);
            this.scoreWord = this.scene.add.text(50 * scaleRatio, 13 * scaleRatio, score, { fontFamily: 'Arial', fontSize: 11 * scaleRatio, color: '#ffffff' }).setDepth(2);
        } else {
            this.scoreObj = this.scene.add.text(12 * scaleRatio, 5 * scaleRatio, scoreText, { fontFamily: 'Arial', fontSize: 12 * scaleRatio, color: '#ffffff' }).setDepth(2);
        }

        this.scoreBoard = this.scene.add.image(45 * scaleRatio, 18 * scaleRatio, this.props.scoreBoardImgKey).setScale(0.3 * scaleRatio).setDepth(1);
    }
    createInstallBtn(widthNow, heightNow) {
        if (this.installBtn) {
            this.installBtn.destroy();
        }
        var ratio = getScaleRatioForDevice(widthNow, heightNow, 320, 480).scalePrimary;
        this.installBtn = this.scene.add.sprite(60 * ratio, heightNow * 9.3 / 10, this.props.textureInstallBtn).setScale(0.2 * ratio);
        this.installBtn.setDepth(2);
        this.installBtn.setInteractive();
        this.installBtn.once('pointerdown', function () {
            this.scene.setUpInstall();
        });
    }
}