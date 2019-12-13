import 'phaser';
import getScalePlayerForDevice from '../../FunctionGame/GetScaleFunc';
/*
 * Config:
 *      scene
 *      x,y : position of player at start
 *      playerImgs: ['head', 'neck', 'chest', 'belly', 'arm', 'hand', 'thigh', 'leg', 'foot']
 *      playerAnimationStr
 *      depth
*/
export default class Player extends Phaser.Physics.Matter.Sprite {
    constructor(config) {
        super(config.scene.matter.world);
        this.scene = config.scene;
        this.setDepth(config.depth);
        this.props = {
            playerImgs: config.playerImgs,
            depth: config.depth
        }
        this.createPlayer(config.x, config.y);
        // this.props = { 
        //     playerAnimation: config.playerAnimationStr,
        // };
        this.hitPoint = 3;
        this.MAXHITPOINT = 3;
    }
    preload() { }
    create() { }
    update(time) {
    }
    resize(newWidth, newHeight) {
        var scaleObj = getScalePlayerForDevice(newWidth, newHeight, this.props.widthGame, this.props.heightGame);
        this.playerHead.primaryScale = this.playerHead.primaryScale * scaleObj.scalePrimary;
        this.playerHead.setScale(this.playerHead.primaryScale);
        this.props.widthGame = newWidth;
        this.props.heightGame = newHeight;
        // this.playerHead.setPosition(this.playerHead.x * ratioX, this.playerHead.y * ratioY);
    }
    createPlayer(x, y) {
        var ratio = getScalePlayerForDevice(this.scene.width, this.scene.height, 320, 480);
        console.log(this.world)
        this.playerHead = this.scene.physics.add.image(x, y, this.props.playerImgs[0]).setDepth(this.props.depth + 1);
        this.playerHead.primaryScale = 0.15 * ratio.scalePrimary;
        this.playerHead.setScale(this.playerHead.primaryScale);
        // this.playerHead.parentOfThis = this;
        this.playerHead.body.setSize(this.playerHead.width * 0.7, this.playerHead.height * 0.7, true).setOffset(this.playerHead.width * 0.15, this.playerHead.height * 0.25);
        this.scene.physics.world.setBounds(0, 0, this.scene.width, this.scene.height * 7 / 8);
        this.playerHead
            .setCollideWorldBounds(true)
            .setDamping(true)
            .setDrag(0.96)
            .setMaxVelocity(400);


        this.playerNeck = this.scene.physics.add.image(this.playerHead.x + 1 * ratio.scalePrimary, this.playerHead.y + 22 * ratio.scalePrimary, this.props.playerImgs[1])
            .setDepth(this.props.depth)
            .setScale(0.15 * ratio.scalePrimary);
        this.playerChest = this.scene.physics.add.image(this.playerNeck.x + 1 * ratio.scalePrimary, this.playerNeck.y + 18 * ratio.scalePrimary, this.props.playerImgs[2])
            .setDepth(this.props.depth + 1)
            .setScale(0.15 * ratio.scalePrimary);
        this.playerBelly = this.scene.physics.add.image(this.playerChest.x - 1 * ratio.scalePrimary, this.playerChest.y + 20 * ratio.scalePrimary, this.props.playerImgs[3])
            .setDepth(this.props.depth + 1)
            .setScale(0.15 * ratio.scalePrimary);
        this.playerLeftArm = this.scene.physics.add.image(this.playerChest.x - 18 * ratio.scalePrimary, this.playerChest.y - 5 * ratio.scalePrimary, this.props.playerImgs[4])
            .setDepth(this.props.depth)
            .setScale(0.15 * ratio.scalePrimary);
        this.playerLeftHand = this.scene.physics.add.image(this.playerLeftArm.x - 22 * ratio.scalePrimary, this.playerLeftArm.y + 2 * ratio.scalePrimary, this.props.playerImgs[5])
            .setDepth(this.props.depth + 1)
            .setScale(0.15 * ratio.scalePrimary)
            .setAngle(-10);
        this.playerRightArm = this.scene.physics.add.image(this.playerChest.x + 18 * ratio.scalePrimary, this.playerChest.y - 5 * ratio.scalePrimary, this.props.playerImgs[4])
            .setDepth(this.props.depth)
            .setScale(0.15 * ratio.scalePrimary);
        this.playerRightHand = this.scene.physics.add.image(this.playerRightArm.x + 22 * ratio.scalePrimary, this.playerRightArm.y - 2 * ratio.scalePrimary, this.props.playerImgs[5])
            .setDepth(this.props.depth + 1)
            .setScale(0.15 * ratio.scalePrimary)
            .setAngle(170);
        this.playerLeftThigh = this.scene.physics.add.image(this.playerBelly.x - 10 * ratio.scalePrimary, this.playerBelly.y + 20 * ratio.scalePrimary, this.props.playerImgs[4])
            .setDepth(this.props.depth)
            .setScale(0.15 * ratio.scalePrimary)
            .setRotation(30)
            .body.setAngle(30);
        // this.playerLeftLeg = this.scene.physics.add.image(this.playerLeftThigh.x - 9 * ratio.scalePrimary, this.playerLeftThigh.y + 22 * ratio.scalePrimary, this.props.playerImgs[5])
        //     .setDepth(this.props.depth)
        //     .setScale(0.15 * ratio.scalePrimary)
        //     .setAngle(50);
        // this.playerRightThigh = this.scene.physics.add.image(this.playerBelly.x + 10 * ratio.scalePrimary, this.playerBelly.y + 20 * ratio.scalePrimary, this.props.playerImgs[4])
        //     .setDepth(this.props.depth)
        //     .setScale(0.15 * ratio.scalePrimary)
        //     .setAngle(0);
        // this.playerRightLeg = this.scene.physics.add.image(this.playerRightThigh.x - 11 * ratio.scalePrimary, this.playerRightThigh.y + 20 * ratio.scalePrimary, this.props.playerImgs[5])
        //     .setDepth(this.props.depth)
        //     .setScale(0.15 * ratio.scalePrimary)
        //     .setAngle(70);
        // this.cursors = this.scene.input.keyboard.createCursorKeys();
    }
    takeDamage() {
        //todo: 
    }
    setMovementPlayer(caseMovement) {
        /**
         * caseMovement: {isMoveUp, isLeft, isRight}
         */

        if (caseMovement.isMoveUp) {
            this.scene.physics.velocityFromRotation(this.playerHead.rotation, 600, this.playerHead.body.acceleration);
        }
        else {
            this.playerHead.setAcceleration(0);
        }

        if (caseMovement.isLeft) {
            this.playerHead.setAngularVelocity(-200);
        } else if (caseMovement.isRight) {
            this.playerHead.setAngularVelocity(200);
        }
        else {
            this.playerHead.setAngularVelocity(0);
        }
    }
}

// function getScalePlayerForDevice(widthNow, heightNow, oldWidth, oldHeight) {
//     var scalePrimary;
//     if (widthNow == oldHeight || heightNow == oldWidth) {
//         scalePrimary = 1;
//     }
//     var beforeWidth, afterWidth;
//     if (oldWidth > oldHeight) {
//         beforeWidth = oldHeight;
//     } else {
//         beforeWidth = oldWidth;
//     }
//     if (widthNow > heightNow) {
//         afterWidth = heightNow;
//     } else {
//         afterWidth = widthNow;
//     }
//     scalePrimary = afterWidth / beforeWidth;
//     return scalePrimary;
// }
