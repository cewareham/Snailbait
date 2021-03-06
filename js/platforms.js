'use strict';

class Platforms {
   constructor() {
      this.pfOffset = cc.STARTING_PLATFORM_OFFSET;
      this.pfVelocity = 0;
   }

   update = () => {
      this.setOffset();
   }

   draw = () => {
      translate(-this.pfOffset, 0);
      for (let ii=0; ii<platformData.length; ii++) {
          this.drawPlatform(platformData[ii]);
      }
      translate(this.pfOffset, 0);
   }

   drawPlatform(data) {
      let pfTop = this.calculatePFTop(data.track);

      strokeWeight(cc.PLATFORM_STROKE_WIDTH);   // width of border
      stroke(cc.PLATFORM_STROKE_STYLE);         // color of border
      let clr = color(data.fillStyle);
      clr.setAlpha(data.opacity*255);
      fill(clr);                                // fill color
      rect(data.left, pfTop, data.width, data.height);
   }

   calculatePFTop(track) {
      if      (track === 1) { return cc.TRACK_1_BASELINE; }   // 323 pixels
      else if (track === 2) { return cc.TRACK_2_BASELINE; }   // 223 pixels
      else if (track === 3) { return cc.TRACK_3_BASELINE; }   // 123 pixels
   }

   setVelocity() {
      this.pfVelocity = game.bg.bgVelocity * cc.PLATFORM_VELOCITY_MULTIPLIER;
   }

   setOffset(/*now*/) {
      this.pfOffset += this.pfVelocity * deltaTime / 1000;
         //this.pfVelocity * (now - lastAnimationFrameTime) / 1000;

      //if (this.pfOffset > 2*bg.bgImg.width) bg.turnLeft();
      if (this.pfOffset > 2*cc.background.width) game.bg.turnLeft();
      else if (this.pfOffset < 0)                game.bg.turnRight();
   }
}
