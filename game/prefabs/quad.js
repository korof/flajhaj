'use strict';

var Quad = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'quad', frame);

  this.anchor.setTo(0.5, 0.5);

  this.animations.add('fly');
  this.animations.play('fly', 2, true);
  // this.game.add.tween(this).to({y: y+20}, 800, Phaser.Easing.Linear.None, true, 0, -1, true); 

  this.game.physics.arcade.enableBody(this);
  this.body.allowGravity = false;
  
};

Quad.prototype = Object.create(Phaser.Sprite.prototype);
Quad.prototype.constructor = Quad;

Quad.prototype.update = function() {
  
  // write your prefab's specific update code here
  
};

Quad.prototype.fly = function() {
    this.body.velocity.y = -400;
};

Quad.prototype.left = function() {
    this.body.velocity.x = -400;

    this.game.add.tween(this).to({angle: -10}, 100).start();
};

Quad.prototype.right = function() {
    this.body.velocity.x = 400;

    this.game.add.tween(this).to({angle: 10}, 100).start();
};


module.exports = Quad;
