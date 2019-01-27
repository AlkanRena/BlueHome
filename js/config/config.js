export default {
    type: Phaser.AUTO,
    width: 400,
    height: 300,
    parent: "game-container",
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    }
};