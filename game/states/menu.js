
'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var centerX = this.game.width/2;  
    var centerY = this.game.height/2; 


    this.background = this.game.add.sprite(0, 0, 'bg_menu');

    this.chmurka1 = this.game.add.sprite(70, 150, 'chmurki', '1.png');
    this.chmurka2 = this.game.add.sprite(450, 0, 'chmurki', '2.png');
    this.chmurka3 = this.game.add.sprite(500, 400, 'chmurki', '3.png');
    this.claim = this.game.add.sprite(50, 200, 'title');
    this.instrukcja = this.game.add.sprite(50, 450, 'instrukcja');
    // this.chmurka4 = this.game.add.sprite(300, 300, 'chmurki', '4.png');
    // this.chmurka5 = this.game.add.sprite(400, 400, 'chmurki', '5.png');
    // this.ptaszki = this.game.add.sprite(150, 150, 'chmurki', 'ptaszki.png');

    // this.ground = this.game.add.tileSprite(0, 0, 640, 960, 'bg_menu');
    // this.chmurka1.autoScroll(0, -200);
    // 
    // 
    this.quad = this.game.add.sprite(centerX, 100,'quad');
    this.quad.anchor.setTo(0.5,0.5);  

    this.quad.animations.add('fly');
    this.quad.animations.play('fly', 2, true);

    this.game.add.tween(this.quad).to({y: 150}, 800, Phaser.Easing.Linear.None, true, 0, -1, true); 

    this.startButton = this.game.add.button(centerX, 800, 'startButton', this.startClick, this);
    this.startButton.anchor.setTo(0.5,0.5);

  },
  startClick: function() {  
      this.game.state.start('play');
  },
  update: function() {

  }
};

module.exports = Menu;
