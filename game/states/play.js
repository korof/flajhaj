
  'use strict';
  var Quad = require('../prefabs/quad');

  function Play() {}
  Play.prototype = {

    create: function() {
      var centerX = this.game.width/2;  
      var centerY = this.game.height/2; 

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 960;

      this.background = this.game.add.sprite(0,0,'bg_menu');

      this.quad = new Quad(this.game, centerX, centerY);
      
      this.game.add.existing(this.quad);


      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT]);
      this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.RIGHT]);

      // add keyboard controls
      var flyKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      flyKey.onDown.add(this.quad.fly, this.quad);

      var leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      leftKey.onDown.add(this.quad.left, this.quad);

      var rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      rightKey.onDown.add(this.quad.right, this.quad);


      // add mouse/touch controls
      this.input.onDown.add(this.quad.fly, this.quad);


    },
    update: function() {

    }
  };
  
  module.exports = Play;