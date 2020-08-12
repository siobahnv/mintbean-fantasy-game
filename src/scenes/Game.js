import Phaser from "phaser";
import mp3 from "../assets/Orbital\ Colossus.mp3";
import background from "../assets/scifi_platform_BG1.jpg";
import tiles from "../assets/scifi_platformTiles_32x32.png";
import star from "../assets/star.png";

import dragon from "../assets/sad-dragon200.png";
import butterfly from "../assets/butterfly.png";
import flashes from "../assets/muzzleflash3.png";
import tears from "../assets/blue.png";

import { accelerate, decelerate } from "../utils";

let dragonbox;
let cursors;
let flames;
// let anim;
let rain;
// let image;

export default new Phaser.Class({
  Extends: Phaser.Scene,
  initialize: function () {
    Phaser.Scene.call(this, { key: 'game' });
    window.GAME = this;
  },
  preload: function preload() {
    this.load.image("background", background);

    this.load.spritesheet('dragon', dragon, {
      frameWidth: 200,
      frameHeight: 231
    });  

    console.log("Tears being defined...");
    // this.load.spritesheet('tears', tears, { frameWidth: 72, frameHeight: 72 });
    this.load.image("tears", tears);
    console.log(tears);
  },

  create: function create() {
    this.add.image(400, 300, "background");
    // this.physics.startSystem(Phaser.Physics.ARCADE);
    // this.world.enableBody = true;
    // this.physics.startSystem(Phaser.Physics.ARCADE);
    // image = this.add.sprite(500, 300, 'tears');
    // this.physics.enable(image, Phaser.Physics.ARCADE);

    cursors = this.input.keyboard.createCursorKeys();

    dragonbox = this.physics.add.image(400, 300, "dragon", 15);
    dragonbox.setBounce(0.2);
    dragonbox.setCollideWorldBounds(true);

    // let config = {
    //   key: 'rain',
    //   frames: this.anims.generateFrameNumbers('tears'),
    //   frameRate: 18,
    //   repeat: -1
    // };

    // anim = this.anims.create(config);

    // var sprite = this.add.sprite(72, 72, 'tears');
    // sprite.animations.add('fall');
    // sprite.animations.play('fall', 50, true);

    console.log("Moar tears: ", tears);
    rain = this.physics.add.sprite('"../assets/bluesprite.png"');

    var particles = this.add.particles(rain);

    var emitter = particles.createEmitter({
      // **basic properties of particles**
      // **initial position**
      x: 0,             // { min, max }, or { min, max, steps }
      y: 0,             // { min, max }, or { min, max, steps }
      // follow: null,
      // followOffset: {
      //    x: 0,
      //    y: 0
      // },
      // **emit zone**
      // emitZone: {
      //     type: 'random',    // 'random', or 'edge'
      //     source: geom,      // Geom like Circle, or a Path or Curve
      //     **type = edge**
      //     quantity: 1,
      //     stepRate: 0,
      //     yoyo: false,
      //     seamless: true
      // },
  
      // **target position**
      // moveToX:          // { min, max }, or { min, max, steps }
      // moveToY:          // { min, max }, or { min, max, steps }
      // **death zone**
      // deathZone: {
      //      type: 'onEnter',  // 'onEnter', or 'onLeave'
      //      source: geom      // Geom like Circle or Rect that supports a 'contains' function
      // }
  
      // **angle**
      // radial: true,
      // angle: { min: 0, max: 360 },  // { start, end, steps }
  
      // **scale**
      // scale: 1,             // { start, end },
      // scaleX: 1,
      // scaleY: 1,
  
      // **render**
      // frame: 0,                // one or more texture frames, or a configuration object.
      // alpha: 1,             // { min, max }
      visible: true,
      // tint: 0xffffffff,     // a number 0xfffffff, or an array [ 0xffff00, 0xff0000, 0x00ff00, 0x0000ff ]
      blendMode: 'ADD',  // Phaser.BlendModes
  
      // delay: 0,
      lifespan: 1000,       // { min, max }, or { min, max, steps }
  
  
      // **physics**
      speed: { min: 400, max: 600 },  // { min, max }, or { min, max, steps }
      // speedX:               // { min, max }, or { min, max, steps }
      // speedY:               // { min, max }, or { min, max, steps }
      // gravityX:
      gravityY: 300,
      // accelerationX:
      // accelerationY:
      // maxVelocityX: 10000,
      // maxVelocityY: 10000,
  
      // **bounce**
      bounce: 0,
      // bounds: nul,           // Phaser.Geom.Rectangle, or { x, y, width, height }
      collideBottom: true,
      // collideTop: true,
      // collideLeft: true,
      // collideRight : true,
  
      // **callback**
      // emitCallback: null,
      // emitCallbackScope: null,
      // deathCallback: null,
      // deathCallbackScope: null,
  
      // **custom particle**
      particleClass: Phaser.GameObjects.Particles.Particle,
  
      // **emitter**
      // name: '',
      // on: true,          // set false to stop emitter
      // active: true,      // set false to pause emitter and particles
      frequency: 0,      // -1 for exploding emitter
      quantity: 1,       // { min, max }
      // maxParticles: 0,
      // rotate: 0,         // { start, end }, or { start, end, ease },
      // timeScale: 1,
  
  });

  },
  update: function () {
    const { velocity } = dragonbox.body;

    if (cursors.space.isDown) {
      const x = decelerate(velocity.x);
      const y = decelerate(velocity.y);
      dragonbox.setVelocity(x, y)
    }

    if (cursors.up.isDown) dragonbox.setVelocityY(accelerate(velocity.y, -1));
    if (cursors.right.isDown) dragonbox.setVelocityX(accelerate(velocity.x, 1));
    if (cursors.down.isDown) dragonbox.setVelocityY(accelerate(velocity.y, 1));
    if (cursors.left.isDown) dragonbox.setVelocityX(accelerate(velocity.x, -1));

    // this.physics.arcade.collide(rain, dragonbox);
  }
});
