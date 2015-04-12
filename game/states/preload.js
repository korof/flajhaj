
'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);

    this.load.image('bg_menu', 'assets/bg_menu.jpg');
    this.load.spritesheet('quad', 'assets/quad.png', 192, 103, 2, 0, 0);
    this.load.image('startButton', 'assets/btn_graj.png');
    this.load.image('title', 'assets/claim.png');
    this.load.image('instrukcja', 'assets/instr.png');
    this.load.atlasJSONHash('chmurki', 'assets/chmurki/chmurki.png', 'assets/chmurki/chmurki.json');

  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('menu');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
