'use strict';

class Background {
   constructor() {
      this.bgOffset = cc.STARTING_BACKGROUND_OFFSET;
      this.bgVelocity = cc.STARTING_BACKGROUND_VELOCITY;
   }

   update = () => {
      this.setOffset();
   }

   draw = () => {
      translate(-this.bgOffset, 0);
      image(cc.background, 0, 0);                     // initially onscreen
      image(cc.background, cc.background.width, 0);   // initially offscreen
      translate(this.bgOffset, 0);
   }

   setOffset(/*now*/) {
      // p5.js->The system variable deltaTime contains the time difference
      // between the beginning of the previous frame and the beginning
      // of the current frame in milliseconds.
      // This variable is useful for creating time sensitive animation or
      // physics calculation that should stay constant regardless of frame rate.
      // SO->p5.js deltaTime = (now - lastAnimationFrameTime) in Geary's book!
      this.bgOffset += this.bgVelocity * deltaTime / 1000;
          //this.bgVelocity * (now - lastAnimationFrameTime) / 1000;

      if (this.bgOffset < 0 || this.bgOffset > cc.background.width) {
          this.bgOffset = 0;
      }
  }

  turnLeft() { this.bgVelocity = -cc.BACKGROUND_VELOCITY; }
  turnRight() { this.bgVelocity = cc.BACKGROUND_VELOCITY; }
}
