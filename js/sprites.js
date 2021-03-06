"use strict";

class PlatformArtist {
   draw = (sprite) => {
      let pfTop = calculatePFTop(sprite.track);

      strokeWeight(cc.PLATFORM_STROKE_WIDTH);   // width of border
      stroke(cc.PLATFORM_STROKE_STYLE);         // color of border
      let clr = color(sprite.fillStyle);
      clr.setAlpha(sprite.opacity*255);
      fill(clr);                                // fill color
      rect(sprite.left, pfTop, sprite.width, sprite.height);
   }
}

class SpriteSheetArtist {
   constructor(spritesheet, cells) {
       this.cells = cells;
       this.spritesheet = spritesheet;
       this.cellIndex = 0;
   }

   draw(sprite) {
       let cell = this.cells[this.cellIndex];
       // p5.js image(image, dx,dy,dWidth,dHeight, sx,sy,sWidth,sHeight) ->
       //  destination rectangle (on the canvas), then source rectangle (from the spritesheet)
       //  JUST THE OPPOSITE OF html5's ctx.drawImage(..)a!
       image(this.spritesheet, sprite.left, sprite.top, cell.width, cell.height,
                               cell.left,   cell.top,   cell.width, cell.height);
   }

   advance() {
       if (this.cellIndex === this.cells.length-1) this.cellIndex = 0;
       else this.cellIndex++;
   }
}

class Sprite {
   constructor(type, artist, behaviors) {
      let DEFAULT_WIDTH = 10,
          DEFAULT_HEIGHT = 10,
          DEFAULT_OPACITY = 1.0;

      this.artist    = artist;
      this.type      = type;
      this.behaviors = behaviors || [];

      this.hOffset   = 0;    // horizontal offset
      this.left      = 0;
      this.top       = 0;
      this.width     = DEFAULT_WIDTH;
      this.height    = DEFAULT_HEIGHT;
      this.velocityX = 0;
      this.velocityY = 0;
      this.opacity   = DEFAULT_OPACITY;
      this.visible   = true;
   }

   draw = () => {
      let context = drawingContext;
      //this.setOffset();

      context.save();
      context.globalAlpha = this.opacity;

      if (this.visible && this.inView() && this.artist) {
         translate(-this.hOffset, 0);
         this.artist.draw(this);
         translate(this.hOffset, 0);
      }

      // Restore globalAlpha & any other changes
      // the artist may have made to the context
      // in the artist's draw() method.
      context.restore();
   }

   update = (now, fps, lastAnimationFrameTime) => {
      this.setOffset();
      if (this.visible && this.inView()) {
         for (let ii=0; ii<this.behaviors.length; ++ii) {
            this.behaviors[ii].execute(this, now, fps, lastAnimationFrameTime);
         }
      }
   }

   setOffset = () => {
      let offset = this.hOffset;
      //offset += game.pf.pfVelocity * deltaTime / 1000;
      offset += game.platformVelocity * deltaTime / 1000;
      if (this.type != 'runner') this.hOffset = offset;
      if (this.type == 'platform') {
         if (this.hOffset > 2*cc.BACKGROUND_WIDTH) game.bg.turnLeft();
         else if (this.hOffset < 0) game.bg.turnRight();
      }
   }

   inView() {
      return this.left + this.width > this.hOffset &&
             this.left < this.hOffset + width;
  }
}
