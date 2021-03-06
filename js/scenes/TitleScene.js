import {LoadScene} from './LoadScene.js';
import {GameScene} from './GameScene.js';

export class TitleScene extends Phaser.Scene {
    constructor() {
        super({key: 'TitleScene'});
    }
    init(){}
    preload () {
        
        
    }

    create () {
        let background = this.add.sprite(0, 0, 'background_image');
        background.setOrigin(0,0);

        let title = this.add.sprite(0, 0, 'title');
        title.setOrigin(0,0);

        let PlayGame = this.add.sprite(400, 300, 'start');
        PlayGame.setOrigin(0,0);

        PlayGame.setInteractive();
        let Scenes = this.scene

        PlayGame.on('pointerdown', function () {
            
            Scenes.start('GameScene')

        })
    }
}
