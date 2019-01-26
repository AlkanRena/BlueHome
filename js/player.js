import Phaser from "phaser";

/**
 * A class that wraps up our 2D platforming player logic. It creates, animates and moves a sprite in
 * response to WASD/arrow keys. Call its update method from the scene's update and call its destroy
 * method when you're done with the player.
 */
export default class Player {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create the animations we need from the player spritesheet
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

    this.player = scene.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player", "player-still");
    this.physics.add.collider(player, Wall);
  }

  update() {
    const speed = 30;
    const prevVelocity = player.body.velocity.clone();

  // Stop any previous movement from the last frame
  player.body.setVelocity(0);

  // Horizontal movement
  if (cursors.left.isDown) {
    player.body.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(speed);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    player.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(speed);
  }

  // Normalize and scale the velocity so that player can't move faster along a diagonal
  player.body.velocity.normalize().scale(speed);

  // // Update the animation last and give left/right animations precedence over up/down animations
  if (cursors.left.isDown) {
    player.anims.play("player-left", true);
  } else if (cursors.right.isDown) {
    player.anims.play("player-right", true);
  } else if (cursors.up.isDown) {
    player.anims.play("player-up", true);
  } else if (cursors.down.isDown) {
    player.anims.play("player-down", true);
  } else {
    player.anims.play("player-still", true);
  }
    }

}
