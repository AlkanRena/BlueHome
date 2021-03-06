var config = {
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
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// import config from './config/config.js';

const game = new Phaser.Game(config);
let cursors;
let player;
let cheese;
let cat_1;
let cat_2;
let cat_3;
let rat_1;
let rat_2;
let rat_3;
let ball_1;
let ball_2;
let ball_3;
let scoreText;
let scoreCheese;
let scoreLife;
let block_movement = true;
let showDebug = false;


function preload() {
    // Runs once, loads up assets like images and audio
    this.load.image("tiles", "../assets/images/tileset.png");

    this.load.tilemapTiledJSON("map", "../assets/images/level_1.json");

    this.load.atlas("player", "assets/images/player.png", "assets/images/player.json");

    this.load.atlas("enemy", "assets/images/enemy.png", "assets/images/enemy.json");
 
    this.load.image("cheese", "../assets/images/cheese.png");
  }
  
  function create() {
    // Runs once, after all assets in preload are loaded
    const map = this.make.tilemap({key: "map"});

    const tileset = map.addTilesetImage("leveltileset", "tiles");

    const Floor = map.createStaticLayer("Floor", tileset, 0, 0);
    const Wall = map.createStaticLayer("Wall", tileset, 0, 0);
  
    cheese = this.physics.add.sprite(170, 150, 'cheese');
    // Store the score in a variable, initialized at 0

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
      frames: this.anims.generateFrameNames('player', { prefix: "player-down.", start: 0, end: 4, zeroPad: 3 }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'player-still',
      frames: this.anims.generateFrameNames('player', { prefix: "player-still.", start: 0, end: 4, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    });


    this.anims.create({
      key: 'cat-left',
      frames: this.anims.generateFrameNames('enemy', { prefix: "cat-left.", start: 0, end: 4, zeroPad: 3 }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'cat-right',
      frames: this.anims.generateFrameNames('enemy', { prefix: "cat-right.", start: 0, end: 4, zeroPad: 3 }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'rat-left',
      frames: this.anims.generateFrameNames('enemy', { prefix: "rat-left.", start: 0, end: 4, zeroPad: 3 }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'rat-right',
      frames: this.anims.generateFrameNames('enemy', { prefix: "rat-right.", start: 0, end: 4, zeroPad: 3 }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: 'ball',
      frames: this.anims.generateFrameNames('enemy', { prefix: "ball.", start: 0, end: 4, zeroPad: 3 }),
      frameRate: 10,
      repeat: -1
    });

    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");

    const spawnPoint_cat_1 = map.findObject("Objects", obj => obj.name === "Spawn Cat_1");
    const spawnPoint_cat_2 = map.findObject("Objects", obj => obj.name === "Spawn Cat_2");
    const spawnPoint_cat_3 = map.findObject("Objects", obj => obj.name === "Spawn Cat_3");

    const spawnPoint_rat_1 = map.findObject("Objects", obj => obj.name === "Spawn Rat_1");
    const spawnPoint_rat_2 = map.findObject("Objects", obj => obj.name === "Spawn Rat_2");
    const spawnPoint_rat_3 = map.findObject("Objects", obj => obj.name === "Spawn Rat_3");

    const spawnPoint_ball_1 = map.findObject("Objects", obj => obj.name === "Spawn Ball_1");
    const spawnPoint_ball_2 = map.findObject("Objects", obj => obj.name === "Spawn Ball_2");
    const spawnPoint_ball_3 = map.findObject("Objects", obj => obj.name === "Spawn Ball_3");

    player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "player", "player-still");

    cat_1 = this.physics.add.sprite(spawnPoint_cat_1.x, spawnPoint_cat_1.y, "enemy", "cat-left");
    cat_2 = this.physics.add.sprite(spawnPoint_cat_2.x, spawnPoint_cat_2.y, "enemy", "cat-left");
    cat_3 = this.physics.add.sprite(spawnPoint_cat_3.x, spawnPoint_cat_3.y, "enemy", "cat-left");

    rat_1 = this.physics.add.sprite(spawnPoint_rat_1.x, spawnPoint_rat_1.y, "enemy", "rat-left");
    rat_2 = this.physics.add.sprite(spawnPoint_rat_2.x, spawnPoint_rat_2.y, "enemy", "rat-left");
    rat_3 = this.physics.add.sprite(spawnPoint_rat_3.x, spawnPoint_rat_3.y, "enemy", "rat-left");

    ball_1 = this.physics.add.sprite(spawnPoint_ball_1.x, spawnPoint_ball_1.y, "enemy", "ball");
    ball_2 = this.physics.add.sprite(spawnPoint_ball_2.x, spawnPoint_ball_2.y, "enemy", "ball");
    ball_3 = this.physics.add.sprite(spawnPoint_ball_3.x, spawnPoint_ball_3.y, "enemy", "ball");

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '16px', fill: '#fff' });
    scoreCheese = this.add.text(16, 32, 'Cheese: 0', { fontSize: '16px', fill: '#fff' });
    scoreLife = this.add.text(16, 48, 'Life: 3', { fontSize: '16px', fill: '#fff' });

    this.physics.add.collider(player, Wall);
    this.physics.add.collider(cheese, Wall);
    this.physics.add.collider(cat_1, Wall);
    this.physics.add.collider(cat_2, Wall);
    this.physics.add.collider(cat_3, Wall);
    this.physics.add.collider(rat_1, Wall);
    this.physics.add.collider(rat_1, Wall);
    this.physics.add.collider(rat_2, Wall);
    this.physics.add.collider(rat_3, Wall);
    this.physics.add.collider(ball_1, Wall);
    this.physics.add.collider(ball_2, Wall);
    this.physics.add.collider(ball_3, Wall);

    this.physics.add.overlap(player, cheese, hitCheese, null, this);

    this.physics.add.overlap(player, cat_1, hitCat, null, this);
    this.physics.add.overlap(player, cat_2, hitCat, null, this);
    this.physics.add.overlap(player, cat_3, hitCat, null, this);

    this.physics.add.overlap(player, rat_1, hitDog, null, this);
    this.physics.add.overlap(player, rat_2, hitDog, null, this);
    this.physics.add.overlap(player, rat_3, hitDog, null, this);
    
    this.physics.add.overlap(player, ball_1, hitBall, null, this);
    this.physics.add.overlap(player, ball_2, hitBall, null, this);
    this.physics.add.overlap(player, ball_3, hitBall, null, this);

    cheese.body.setVelocity(20, 30).setBounce(1, 1)
    cat_1.body.setVelocity(15, 20).setBounce(1, 1)
    cat_2.body.setVelocity(14, 22).setBounce(1, 1)
    cat_3.body.setVelocity(12, 24).setBounce(1, 1)

    rat_1.body.setVelocity(20, 30).setBounce(1, 1)
    rat_2.body.setVelocity(20, 30).setBounce(1, 1)
    rat_3.body.setVelocity(20, 30).setBounce(1, 1)

    ball_1.body.setVelocity(20, 30).setBounce(1, 1)
    ball_2.body.setVelocity(20, 30).setBounce(1, 1)
    ball_3.body.setVelocity(20, 30).setBounce(1, 1)

    ball_1.anims.play('ball', true);
    ball_2.anims.play('ball', true);
    ball_3.anims.play('ball', true);

    const camera = this.cameras.main;
    camera.startFollow(player);
    camera.setBounds(0, 0, 800, 800);

    cursors = this.input.keyboard.createCursorKeys();

    // Wall.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });
  }
  
  function update(time, delta) {
    const speed = 90;
    const prevVelocity = player.body.velocity.clone();
  // Stop any previous movement from the last frame
  if (block_movement) {
    player.body.setVelocity(0);
  }
  
  

  // Horizontal movement
  if (cursors.left.isDown && block_movement) {
    player.body.setVelocityX(-speed);
  } else if (cursors.right.isDown && block_movement) {
    player.body.setVelocityX(speed);
  }

  // Vertical movement
  if (cursors.up.isDown && block_movement) {
    player.body.setVelocityY(-speed);
  } else if (cursors.down.isDown && block_movement) {
    player.body.setVelocityY(speed);
  }
  // Normalize and scale the velocity so that player can't move faster along a diagonal
  player.body.velocity.normalize().scale(speed);

  // // Update the animation last and give left/right animations precedence over up/down animations
  if (cursors.left.isDown && block_movement) {
    player.anims.play("player-left", true);
  } else if (cursors.right.isDown && block_movement) {
    player.anims.play("player-right", true);
  } else if (cursors.up.isDown && block_movement) {
    player.anims.play("player-up", true);
  } else if (cursors.down.isDown && block_movement) {
    player.anims.play("player-down", true);
  } else if (block_movement) {
    player.anims.play("player-still", true);
  }
  if (cat_1.body.velocity.x > 0) {
    cat_1.anims.play('cat-right', true);
  } else {
    cat_1.anims.play('cat-left', true);
  }

  if (cat_2.body.velocity.x > 0) {
    cat_2.anims.play('cat-right', true);
  } else {
    cat_2.anims.play('cat-left', true);
  }

  if (cat_3.body.velocity.x > 0) {
    cat_3.anims.play('cat-right', true);
  } else {
    cat_3.anims.play('cat-left', true);
  }
 
  if (rat_1.body.velocity.x > 0) {
    rat_1.anims.play('rat-right', true);
  } else {
    rat_1.anims.play('rat-left', true);
  }

  if (rat_2.body.velocity.x > 0) {
    rat_2.anims.play('rat-right', true);
  } else {
    rat_2.anims.play('rat-left', true);
  }

  if (rat_3.body.velocity.x > 0) {
    rat_3.anims.play('rat-right', true);
  } else {
    rat_3.anims.play('rat-left', true);
  }

  }

  function hitCheese() {
    // Change the position x and y of the coin randomly
    let cheesePosition = add_random_cheese();
    cheese.x = cheesePosition.x;
    cheese.y = cheesePosition.y;
    // Increment the score by 10
    gameScore[0].score += 10;
    gameScore[0].cheese += 1;
    updateText(gameScore[0].score,gameScore[0].cheese,gameScore[0].life);
  }

  function hitCat() {
    block_movement = false;
    let valX = -1 * player.body.velocity.x;
    let valY = -1 * player.body.velocity.y;
    player.body.setVelocity(valX, valY).setBounce(1, 1)
    player.anims.play("player-still", true);    
    timedEvent = this.time.delayedCall(500, blockMovement, [], this);
    gameScore[0].life -= 1;      
    updateText(gameScore[0].score,gameScore[0].cheese,gameScore[0].life);
  }

  function hitDog() {
    block_movement = false;
    let valX = -1 * player.body.velocity.x;
    let valY = -1 * player.body.velocity.y;
    player.body.setVelocity(valX, valY).setBounce(1, 1)
    player.anims.play("player-still", true);    
    timedEvent = this.time.delayedCall(500, blockMovement, [], this);
    if (gameScore[0].cheese != 0) {
      gameScore[0].cheese -= 1;
    } else {
      gameScore[0].life -= 1;      
    }
    updateText(gameScore[0].score,gameScore[0].cheese,gameScore[0].life);
  }

  function hitBall() {
    block_movement = false;
    let valX = -1 * player.body.velocity.x;
    let valY = -1 * player.body.velocity.y;
    player.body.setVelocity(valX, valY).setBounce(1, 1)
    player.anims.play("player-still", true);    
    timedEvent = this.time.delayedCall(500, blockMovement, [], this);
  }

  function add_random_cheese () {
    let cheesePlace = [
      { x: 64, y: 64 },
      { x: 64, y: 150 },
      { x: 64, y: 300 },
      { x: 64, y: 400 },
      { x: 170, y: 150 },
      { x: 170, y: 300 },
      { x: 170, y: 400 },
      { x: 250, y: 64 },
      { x: 400, y: 250 },
      { x: 400, y: 400 },
      { x: 500, y: 64 },
      { x: 500, y: 250 },
      { x: 624, y: 32 },
      { x: 624, y: 150 },
      { x: 624, y: 250 },
      { x: 624, y: 400 },

    ];
    let positionCheese = Math.floor(Math.random()*cheesePlace.length);
    
    return cheesePlace[positionCheese];
 
  }

  function blockMovement () {
    block_movement = true;
  }

  function updateText (score, cheese, life) {
    scoreText.setText('Score: ' + score);
    scoreCheese.setText('Cheese: ' + cheese);
    scoreLife.setText('Life: ' + life);
  }
