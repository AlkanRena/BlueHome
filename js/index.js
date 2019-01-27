import {LoadScene} from './scenes/LoadScene.js';
import {TitleScene} from './scenes/TitleScene.js';
import {GameScene} from './scenes/GameScene.js';

// let titleScene = new TitleScene();

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [
        LoadScene, TitleScene, GameScene,
    ]
};

let game = new Phaser.Game(config);
// game.scene.add('TitleScene', titleScene);
// game.scene.start('TitleScene');
