import 'phaser';

export default class PauseObj extends Phaser.Physics.Arcade.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);

        switch (config.localizedText) {
            case 0:
                this.pauseText = this.scene.add.text(config.pauseTextX, config.pauseTextY, "Tap and hold to play", { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' }).setDepth(5);
                break;
            case 1:
                this.pauseText = this.scene.add.text(config.pauseTextX, config.pauseTextY, "タップ＆長押しでプレイ", { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' }).setDepth(5);
                break;
            case 2:
                this.pauseText = this.scene.add.text(config.pauseTextX, config.pauseTextY, "재생하려면 길게 누릅니다", { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' }).setDepth(5);
                break;
            case 3:
                this.pauseText = this.scene.add.text(config.pauseTextX, config.pauseTextY, "點 按 並 按 住 即 可 播 放", { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' }).setDepth(5);
                break;
            case 4:
                this.pauseText = this.scene.add.text(config.pauseTextX, config.pauseTextY, "Toque e segure para jogar", { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' }).setDepth(5);
                break;
            case 5:
                this.pauseText = this.scene.add.text(config.pauseTextX, config.pauseTextY, "Toca y mantén presionado para jugar", { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' }).setDepth(5);
                break;
            default:
                this.pauseText = this.scene.add.text(config.pauseTextX, config.pauseTextY, "Tap and hold to play", { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' }).setDepth(5);
                break;
        }

        this.pauseText.setOrigin(0.5);
        this.pauseText.props = {
            alphaDirection: 1
        }

        this.handControl = this.scene.add.sprite(config.x + 15, config.y, config.imageKey).setDepth(5);
        this.handControl.props = {
            scaleRadioOrigin: 0.3,
            direction: 1,
            originalXPosition: config.x + 15
        }
        this.sceneWidth = config.widthGame;
        this.sceneHeight = config.heightGame;

        this.setPauseOnResize();

        if (config.animationKey) this.handControl.play(config.animationKey);
    }
    update(time) {
        if (this.handControl.x >= this.handControl.props.originalXPosition + 10) {
            this.handControl.props.direction = -1;
        } else if (this.handControl.x <= this.handControl.props.originalXPosition - 25) {
            this.handControl.props.direction = 1;
        }
        this.handControl.x = this.handControl.x + this.handControl.props.direction * 0.5;

        if (this.pauseText.alpha >= 1) {
            this.pauseText.props.alphaDirection = -1;
        } else if (this.pauseText.alpha <= 0) {
            this.pauseText.props.alphaDirection = 1;
        }
        this.pauseText.alpha = this.pauseText.alpha + this.pauseText.props.alphaDirection * 0.04;
    }
    resize(widthNew, heightNew) {
        this.pauseText.x = widthNew / 2;
        this.pauseText.y = heightNew / 2;
        this.handControl.props.originalXPosition = widthNew / 2 + 15;
        this.handControl.x = widthNew / 2 + 15;
        this.handControl.y = heightNew * 8 / 10;
        this.sceneWidth = widthNew;
        this.sceneHeight = heightNew;
        this.setPauseOnResize();
    }
    setPauseOnResize() {
        if (1024 <= this.sceneWidth && 1024 <= this.sceneHeight) {
            this.pauseText.setFontSize(50);
            this.handControl.props.scaleRadioOrigin = 0.9;
        } else if (600 <= this.sceneWidth && this.sceneWidth <= 1024 && 600 <= this.sceneHeight && this.sceneHeight <= 1024) {
            this.pauseText.setFontSize(40);
            this.handControl.props.scaleRadioOrigin = 0.7;
        } else {
            this.pauseText.setFontSize(18);
            this.handControl.props.scaleRadioOrigin = 0.3;
        }
        this.handControl.setScale(this.handControl.props.scaleRadioOrigin);
    }
}