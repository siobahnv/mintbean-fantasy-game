import Phaser from "phaser";
import mp3 from "../assets/Orbital\ Colossus.mp3";
import background from "../assets/scifi_platform_BG1.jpg";
import tiles from "../assets/scifi_platformTiles_32x32.png";
import star from "../assets/star.png";

import dragon from "../assets/sad-dragon200.png";
import butterfly from "../assets/butterfly.png";
import fire from "../assets/flames.png";

import { accelerate, decelerate } from "../utils";

let dragonbox;
let cursors;
let flames;

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

    this.load.image("fire", fire);
  },

  create: function create() {
    this.add.image(400, 300, "background");

    cursors = this.input.keyboard.createCursorKeys();

    flames = this.physics.add.image(400, 200, "fire");

    dragonbox = this.physics.add.image(400, 300, "dragon", 15);
    dragonbox.setBounce(0.2);
    dragonbox.setCollideWorldBounds(true);

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
  }
});