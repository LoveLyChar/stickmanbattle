import 'phaser';
import toArrayBuffer from 'to-array-buffer';

import Background from '../ObjectGame/bg/Background';
import SoundManager from '../Config/SoundManager';
import PauseObj from '../ObjectGame/ui/PauseObj';
import EndGameSprite from '../ObjectGame/ui/EndGameSprite';
import IngameStuff from "../ObjectGame/ui/IngameStuff";
import PlayerController from "../ObjectGame/player/PlayerController";

//2 background
import bridgeBg from '../assets/bg/bridge.png';
import skyBg from '../assets/bg/sky.png';
// 9 player
import arm from '../assets/player/arm.png';
import belly from '../assets/player/belly.png';
import chest from '../assets/player/chest.png';
import foot from '../assets/player/foot.png';
import hand from '../assets/player/hand.png';
import head from '../assets/player/head.png';
import leg from '../assets/player/leg.png';
import neck from '../assets/player/neck.png';
import thigh from '../assets/player/thigh.png';
//5 ui
import hand_192x192 from '../assets/ui/hand_192x192.png';
import installBtnIngame from '../assets/ui/installBtnIngame.png';
import joystick1 from '../assets/ui/joystick1.png';
import joystick2 from '../assets/ui/joystick2.png';
import joystick3 from '../assets/ui/joystick3.png';

//----------controll version variable
var localizedText = 0;
/**
 * 0: US,EN
 * 1: JP
 * 2: KR
 * 3: TW
 * 4: PT
 * 5: ES
 */
var nhamang = 1;
/**
 * 1,2:applovin & unity
 * 3: ỉonsource
 * 4: facebook
 */
var isSoundAllowed;
if (nhamang == 4) {
    isSoundAllowed = false;
} else {
    isSoundAllowed = true;
}
var WIDTH_GAME = window.innerWidth,
    HEIGHT_GAME = window.innerHeight,
    resizedWidth = window.innerWidth,
    resizedHeight = window.innerHeight;
var GAME_CANVAS;

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.initializeVariable();
    }
    preload() {
        // this.load.plugin('rexvirtualjoystickplugin', './src/plugin/virtualjoystick-plugin.js', true);
        // var url;
        // url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/plugins/dist/rexvirtualjoystickplugin.min.js';
        // this.rexVirtualJoyStick = this.load.plugin('rexVirtualJoyStick', url, true);
    }
    create() {
        if (isSoundAllowed) {
            var nAssets = 16;
        } else {
            var nAssets = 16;
        }
        var nLoaded = 0;
        //audio
        // if (isSoundAllowed) {
        //     this.cache.json.add('shotting_3', shotting_3Json);
        //     nLoaded++;
        //     var shotting_3AudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        //     shotting_3AudioCtx.decodeAudioData(toArrayBuffer(shotting_3Mp3), (buffer) => {
        //         this.cache.audio.add('shotting_3', buffer);
        //         nLoaded++;
        //         this.checkLoad(this, nLoaded, nAssets);
        //     }, (e) => { console.log("Error with decoding audio data" + e.err); });
        // }

        //bg
        this.textures.addBase64('bridge', bridgeBg);
        nLoaded++;
        this.textures.addBase64('sky', skyBg);
        nLoaded++;
        //player
        this.textures.addBase64('arm', arm);
        nLoaded++;
        this.textures.addBase64('belly', belly);
        nLoaded++;
        this.textures.addBase64('chest', chest);
        nLoaded++;
        this.textures.addBase64('foot', foot);
        nLoaded++;
        this.textures.addBase64('hand', hand);
        nLoaded++;
        this.textures.addBase64('head', head);
        nLoaded++;
        this.textures.addBase64('leg', leg);
        nLoaded++;
        this.textures.addBase64('neck', neck);
        nLoaded++;
        this.textures.addBase64('thigh', thigh);
        nLoaded++;
        //ui
        var hand_192x192IMG = new Image();
        hand_192x192IMG.onload = () => {
            this.textures.addSpriteSheet('hand_192x192', hand_192x192IMG, { frameWidth: 192, frameHeight: 192 });
            nLoaded++;
            this.checkLoad(this, nLoaded, nAssets);
        };
        hand_192x192IMG.src = hand_192x192;
        this.textures.addBase64('installBtnIngame', installBtnIngame);
        nLoaded++;
        this.textures.addBase64('joystick1', joystick1);
        nLoaded++;
        this.textures.addBase64('joystick2', joystick2);
        nLoaded++;
        this.textures.addBase64('joystick3', joystick3);
        nLoaded++;

        this.checkLoad(this, nLoaded, nAssets);
    }
    update(time) {
        if (this.isGameOVer) {
            if (this.endGameSprite) {
                this.endGameSprite.update(time);
            }
        } else {
            if (this.background) { this.background.update(time); }
            if (this.pauseObj) { this.pauseObj.update(time); }
            if (this.playerController) {
                this.playerController.update(time);
            }
        }
    }
    resize(width, height) {
        if (width === undefined) { width = this.sys.game.config.width; }
        if (height === undefined) { height = this.sys.game.config.height; }
        if (resizedWidth != width || resizedHeight != height) {
            this.cameras.resize(width, height);
            WIDTH_GAME = width;
            HEIGHT_GAME = height;
            this.width = width;
            this.height = height;
            //resize here
            if (this.isGameOVer == false) {
                if (this.background) this.background.resize(width, height);
                if (this.pauseObj) this.pauseObj.resize(width, height);
                if (this.ingameStuff) { this.ingameStuff.resize(width, height); }
                if (this.playerController) { this.playerController.resize(width, height); }
            } else {
                if (this.endGameSprite) {
                    this.endGameSprite.resize(width, height);
                }
            }
            resizedWidth = width;
            resizedHeight = height;
        }
    }
    /*------------------------- function for create object-----------------------------------------*/
    initializeVariable() {
        GAME_CANVAS = this;
        this.isPlaying = true;
        this.width = WIDTH_GAME;
        this.height = HEIGHT_GAME;
        this.isGameOVer = false;
        this.isSoundAllowed = isSoundAllowed;
        this.timeExpired = 28500;
    }
    checkLoad(context, nLoaded, nAssets) {
        if (nLoaded >= nAssets) {
            setTimeout(function () {
                var actualCreate = context.createGameObjects.bind(context);
                actualCreate();
            }, 10);
        }
    }

    createGameObjects() {
        document.getElementById('item-loading').style.display = 'none';
        document.getElementById('item-logo').style.display = 'none';
        document.getElementsByTagName('canvas')[0].style.display = 'block';
        this.createAllAnimation();
        this.createGameElement();
    }
    createAllAnimation() {
        this.createPlayerAnimation();
        this.createPauseObjAnimation();
        this.createItemAnimation();
        this.createUIStuffAnimation();
    }
    createPlayerAnimation() {
    }
    createPauseObjAnimation() {
        this.anims.create({
            key: 'hand_idle',
            frames: this.anims.generateFrameNumbers('hand_192x192', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    }
    createItemAnimation() {
    }
    createUIStuffAnimation() {
    }
    createGameElement() {
        /*--------------------Background-------------------------*/
        var bgConfig = {
            scene: GAME_CANVAS,
            widthGame: WIDTH_GAME,
            heightGame: HEIGHT_GAME,
            x: 0,
            y: 0,
            keys: ['sky', 'bridge']
        };
        this.background = new Background(bgConfig);
        /*--------------------UI-------------------------*/
        var uiConfig = {
            scene: GAME_CANVAS,
            localizedText: localizedText,
            textureInstallBtn: 'installBtnIngame',
            // scoreBoardImgKey: 'btn_extra__Xmas_t',
            // playerHeartImgKey: 'icon_life',
            // textureCrossHair: 'cross_hair',

            // textureHealthBarBoss: ['boss_healbar_border', 'boss_healbar_filled'],
            // textureWaveWord: ['1', '2', '3', '4', 'slash'],
            // textureBossWarning: ['bg_boss', 'boss_text', 'incoming', 'warning']
            //no change order
        };
        this.ingameStuff = new IngameStuff(uiConfig);

        this.pauseObj = new PauseObj({
            scene: GAME_CANVAS,
            x: WIDTH_GAME / 2,
            y: HEIGHT_GAME * 8 / 10,
            key: 'pauseObj',
            imageKey: 'hand_192x192',
            animationKey: 'hand_idle',
            pauseTextX: WIDTH_GAME / 2,
            pauseTextY: HEIGHT_GAME / 2,
            widthGame: WIDTH_GAME,
            heightGame: HEIGHT_GAME,
            localizedText: localizedText
        });
        /*--------------------PlayerController-------------------------*/
        var playerControllerConfig = {
            scene: GAME_CANVAS,
            playerJoystickImgs: ['joystick1', 'joystick2', 'joystick3'],
            playerImgs: ['head', 'neck', 'chest', 'belly', 'arm', 'hand', 'thigh', 'leg', 'foot']
        }
        this.playerController = new PlayerController(playerControllerConfig);
        /*--------------------Audio-------------------------*/
        if (this.isSoundAllowed) {
            var soundConfig = {
                scene: GAME_CANVAS,
                // backgroundSound: 'bgMusic',
                // bulletSounds: ['shotting_1', 'shotting_2', 'shotting_3'],
                // enemyDieSound: 'EnemyDie',
                // bossCommingSound: 'BossWarningHoHoHo',
                // bossAndPlayerDie: 'BossAndPlayerDie',
                // getItemSound: 'Item_get2',
                // powerUpSound: 'PowerUp',
                // endGameShowSound: 'DoorBell'
            }
            this.soundManager = new SoundManager(soundConfig);
            this.isBgMusicStart = false;
        }
    }
    /*----------------------EndGame Function---------------------------*/
    setUpEndgame() {
        var endgameConfig = {
            scene: GAME_CANVAS,
            key: 'end_game_sprite',
            x: WIDTH_GAME / 2,
            y: HEIGHT_GAME / 2,
            depth: 5,
            widthGame: WIDTH_GAME,
            heightGame: HEIGHT_GAME,
            textures: ['bg', 'logosprite', 'icon_game3', 'installBtn', 'sock', 'echdo_noel_99x100', 'canh_noel_169x110'],
            animKeys: ['iconlogo_idle', 'installBtn_idle', 'echdo_idle', 'canh_idle']
        }
        this.endGameSprite = new EndGameSprite(endgameConfig);
        this.isGameOVer = true;
        this.clearScreenForEnd();
        if (this.isSoundAllowed && this.soundManager) {
            if (this.soundManager.bg_play) {
                this.soundManager.bg_play.volume = 0.06;
            }
            this.soundManager.playEndGameShowSound();
        }
    }
    clearScreenForEnd() {
        if (this.pauseObj) {
            this.pauseObj.pauseText.destroy();
            this.pauseObj.handControl.destroy();
            this.pauseObj.destroy();
        }
    }
    /*-------------------install----------------------*/
    setUpInstall() {
        switch (nhamang) {
            case 1:
            case 2:
                mraid.open('https://play.google.com/store/apps/details?id=com.os.space.force.galaxy.alien');
                break;
            case 3:
                dapi.openStoreUrl();
                break;
            case 4:
                FbPlayableAd.onCTAClick();
                break;
            default:
                break;
        }
    }
}
