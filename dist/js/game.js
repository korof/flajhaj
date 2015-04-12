(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(640, 960, Phaser.AUTO, 'flajhaj');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":3,"./states/gameover":4,"./states/menu":5,"./states/play":6,"./states/preload":7}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize(true);
    
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],4:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],5:[function(require,module,exports){

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

},{}],6:[function(require,module,exports){

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
},{"../prefabs/quad":2}],7:[function(require,module,exports){

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

},{}]},{},[1])