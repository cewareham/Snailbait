"use strict";

class Snailbait {
   constructor() {
      this.gameStarted = false;
      this.bg = new Background();
      //this.pf = new Platforms();
      this.sd = new SpriteData();
      this.platformVelocity;
      this.runner;
      this.paused = false;
      this.PAUSED_CHECK_INTERVAL = 200;   // milliseconds
      this.DEFAULT_TOAST_TIME = 3000;     // 3 seconds
      this.windowHasFocus = true;
      this.countdownInProgress = false;
      this.toastElement = select('#toast');
      this.loadingElement = select('#loading');   // loading screen
      this.loadingTitleElement = select('#loading-title');
      this.runnerAnimatedGIFElement = select('#loading-animated-gif');
      this.scoreElement = select('#score');
      this.fpsElement = select('#fps');
      this.soundAndMusicElement = select('#sound-and-music');
      this.instructionsElement = select('#instructions');
      this.copyrightElement = select('#copyright');
      this.STARTING_BACKGROUND_OFFSET = 0;
      this.STARTING_SPRITE_OFFSET = 0;
      // translation offsets
      this.backgroundOffset = this.STARTING_BACKGROUND_OFFSET;
      this.spriteOffset = this.STARTING_SPRITE_OFFSET

      this.sprites = [];   // contains references to all sprites in preceding arrays
      this.createSprites();
  }

  createSprites = () => {
      // order is important as you want runner last so he's drawn in front of all others
      let platforms = new Entities('platform',                   null,         platformData,    null, this.sprites);
      let bats      = new Entities('bat',            this.sd.batCells,      this.sd.batData, this.sd, this.sprites);
      let bees      = new Entities('bee',            this.sd.beeCells,      this.sd.beeData, this.sd, this.sprites);
      let buttons   = new Entities('button',  this.sd.blueButtonCells,   this.sd.buttonData, this.sd, this.sprites);
      let coins     = new Entities('coin',      this.sd.goldCoinCells,     this.sd.coinData, this.sd, this.sprites);
      let rubies    = new Entities('ruby',          this.sd.rubyCells,     this.sd.rubyData, this.sd, this.sprites);
      let sapphires = new Entities('sapphire',  this.sd.sapphireCells, this.sd.sapphireData, this.sd, this.sprites);
      let snail     = new Entities('snail',        this.sd.snailCells,    this.sd.snailData, this.sd, this.sprites);
      let runner    = new Entities('runner', this.sd.runnerCellsRight,   this.sd.runnerData, this.sd, this.sprites);
   }

  update = () => {
      if (this.paused) {
         setTimeout(function() {
            // do nothing, just pause
         }, this.PAUSED_CHECK_INTERVAL);
      } else {
         cc.fpsElement.innerHTML = frameRate().toFixed(0) + ' fps';
         //this.pf.setVelocity();
         this.setPlatformVelocity();
         this.bg.update();    // calls bg class setOffset()
         //this.pf.update();
         //this.runner.update();
         this.updateSprites();
      }
   }

   setPlatformVelocity = () => {
      this.platformVelocity = this.bg.bgVelocity * cc.PLATFORM_VELOCITY_MULTIPLIER;
   }

   draw = () => {
      this.bg.draw();
      //this.pf.draw();
      //this.runner.draw();
      this.drawSprites();
   }

   //*** BEGIN Sprite code ***
   updateSprites = () => {
      for (let ii=0; ii<this.sprites.length; ++ii) {
         this.sprites[ii].update();
      }
   }

   drawSprites = () => {
      for (let ii=0; ii<this.sprites.length; ++ii) {
         this.sprites[ii].draw();
      }
   }
   //*** END Sprite code ***

   // don't use arrow notation here->doesn't have arguments object
   fadeInElements() {
      let args = arguments;

      for (let ii=0; ii < args.length; ++ii) {
         //args[ii].style.display = 'block';
         args[ii].style('display:block');
      }
 
      setTimeout( function () {
         for (let ii=0; ii < args.length; ++ii) {
            args[ii].style('opacity:' + cc.OPAQUE);
         }
      }, cc.SHORT_DELAY);
   }

   // don't use arrow notation here->doesn't have arguments object
   fadeOutElements() {
      let args = arguments,
         fadeDuration = args[args.length-1]; // Last argument

      for (let ii=0; ii < args.length-1; ++ii) {
         args[ii].style('opacity:' + cc.TRANSPARENT);
      }

      setTimeout(function() {
         for (let ii=0; ii < args.length-1; ++ii) {
            args[ii].style('display:none');
         }
      }, fadeDuration);
   }  

   backgroundLoaded = () => {
      let LOADING_SCREEN_TRANSITION_DURATION = 2000;

      this.fadeOutElements(this.loadingElement, 
                           LOADING_SCREEN_TRANSITION_DURATION);

      setTimeout ( function () {
         game.startGame();
         game.gameStarted = true;
      }, LOADING_SCREEN_TRANSITION_DURATION);
   }

   loadingAnimationLoaded = () => {
      if (!this.gameStarted) {
         this.fadeInElements(this.runnerAnimatedGIFElement,
                             this.loadingTitleElement);
         this.backgroundLoaded();
      }
   }

   togglePaused() {
      this.paused = !this.paused;
   }

hideToast = () => {
   let TOAST_TRANSITION_DURATION = 4500;    

   this.fadeOutElements(this.toastElement, TOAST_TRANSITION_DURATION);
}

startToastTransition = (text, duration) => {
   this.toastElement.html(text);
   this.fadeInElements(this.toastElement);
}

revealToast = (text, duration) => {
      let DEFAULT_TOAST_DISPLAY_DURATION = 1000;
      duration = duration || DEFAULT_TOAST_DISPLAY_DURATION;

      this.startToastTransition(text, duration);

      //game.toastElement.style('display', 'block');
      //game.toastElement.html(text);

      setTimeout( function(e) {
         if (game.windowHasFocus) {
            game.hideToast();
         }
      }, duration);
   }

   revealInitialToast() {
      let INITIAL_TOAST_DELAY = 1500,
          INITIAL_TOAST_DURATION = 3000;

      setTimeout( function () {
         game.revealToast('Collide with coins and jewels.</br>' +
                          'Avoid bats and bees.', INITIAL_TOAST_DURATION);
      }, INITIAL_TOAST_DELAY);
  }

   startGame = () => {
      this.revealGame();
      this.revealInitialToast() ;
   }

   dimControls() {
      let FINAL_OPACITY = 0.5;

      game.instructionsElement.style('opacity:' + FINAL_OPACITY);
      game.soundAndMusicElement.style('opacity:' + FINAL_OPACITY);
   }

   revealCanvas() {
      this.fadeInElements(canvas);
   }

   revealBottomChrome() {
      this.fadeInElements(this.soundAndMusicElement,
                          this.instructionsElement,
                          this.copyrightElement);
  }  

   revealGame() {
      let DIM_CONTROLS_DELAY = 5000;

      this.revealTopChromeDimmed();
      this.revealCanvas();
      this.revealBottomChrome();

      setTimeout( function () {
         game.dimControls();
         game.revealTopChrome();
      }, DIM_CONTROLS_DELAY);
  }

   revealTopChrome() {
      this.fadeInElements(this.fpsElement, this.scoreElement);
   }

   revealTopChromeDimmed() {
      let DIM = 0.25;

      this.scoreElement.style('display:block');
      this.fpsElement.style('display:block');

      setTimeout( function () {
         game.scoreElement.style('opacity:' + DIM);
         game.fpsElement.style('opacity:' + DIM);
      }, cc.SHORT_DELAY);
  }

}
