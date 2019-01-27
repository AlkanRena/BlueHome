import { TitleScene } from "./TitleScene.js";
import {GameScene} from './GameScene.js';

export class LoadScene extends Phaser.Scene{
    constructor () {
        super({key: "LoadScene"});
    }
    init() {

    }
    
    preload () {
        // Runs once, loads up assets like images and audio
        this.load.image("tiles", "../assets/images/tileset.png");
    
        this.load.tilemapTiledJSON("map", "../assets/images/level_1.json");
    
        this.load.atlas("player", "assets/images/player.png", "assets/images/player.json");
    
        this.load.atlas("enemy", "assets/images/enemy.png", "assets/images/enemy.json");
     
        this.load.image("cheese", "../assets/images/cheese.png");
    

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff                
            }
        })

        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0, this.game.renderer.height / 2, this.game.renderer.width * percent, 50);
            console.log(percent);
        })
    }
    create() {
        this.scene.start('TitleScene')
    }
}
