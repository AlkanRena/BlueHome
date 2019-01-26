const config2 = {
    type: Phaser.AUTO,
    width: 800,
    height: 100,
    parent: "index",
    pixelArt: true,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const index = new Phaser.Game(config2);
let text1;
let text2;
let text3;
let gamescore;
let gamecheese;
let gamelife;
function preload() {

};
function create() {
     gamescore = gameScore[0].score;
     gamecheese = gameScore[0].cheese;
     gamelife = gameScore[0].life;
    text1 = this.add.text(0, 0, 'Score:'+ gamescore +' ').setFontSize(24);
    text2 = this.add.text(100, 0, 'Cheese:'+ gamescore +' ').setFontSize(24);
    text3 = this.add.text(300, 0, 'Life:'+ gamescore +' ').setFontSize(24);
};
function update() {
    gamescore = gameScore[0].score;
     gamecheese = gameScore[0].cheese;
     gamelife = gameScore[0].life;
};
