import Phaser from "phaser";
import Player from "./player.js";

/**
 * A class that extends Phaser.Scene and wraps up the core logic for the platformer level.
 */
export default class PlatformerScene extends Phaser.Scene {
  preload() {
    // Runs once, loads up assets like images and audio
    this.load.image("tiles", "../assets/images/tileset.png");
    this.load.tilemapTiledJSON("map", "../assets/images/level_1.json");
    this.load.atlas("player", "assets/images/player.png", "assets/images/player.json");
  }

  create() {
    // Runs once, after all assets in preload are loaded
    const map = this.make.tilemap({key: "map"});

    const tileset = map.addTilesetImage("leveltileset", "tiles");

    const Floor = map.createStaticLayer("Floor", tileset, 0, 0);
    const Wall = map.createStaticLayer("Wall", tileset, 0, 0);

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    Wall.setCollisionByProperty({ collides: true });
    const anims = this.anims;
    this.anims.create({
      key: 'player-left',
      frames: this.anims.generateFrameNames('player', { prefix: "player-left.", start: 0, end: 4, zeroPad: 3 }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'player-right',
      frames: this.anims.generateFrameNames('player', { prefix: "player-right.", start: 0, end: 4, zeroPad: 3 }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'player-up',
      frames: this.anims.generateFrameNames('player', { prefix: "player-up.", start: 0, end: 4, zeroPad: 3 }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'player-down',
      frames: this.anims.generateFrameNames('player', { prefix: "player-down.", start: 0, end: 44, zeroPad: 3 }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'player-still',
      frames: this.anims.generateFrameNames('player', { prefix: "player-still.", start: 0, end: 4, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    });

    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player", "player-still");

    this.physics.add.collider(player, Wall);

    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, 400, 400);

    cursors = this.input.keyboard.createCursorKeys();

    // Wall.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });
  }

  update(time, delta) {
    // Allow the player to respond to key presses and move itself
    this.player.update();

  }
}
