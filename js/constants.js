"use strict";

let cc = {
   LEFT : 1,
   RIGHT : 2,

   SHORT_DELAY : 50,    // milliseconds
   TRANSPARENT : 0,
   OPAQUE : 1.0,
      
   BACKGROUND_VELOCITY : 25,
   BACKGROUND_WIDTH : 1300,//1102,
   BACKGROUND_HEIGHT : 400,
   
   PLATFORM_HEIGHT : 8,
   PLATFORM_STROKE_WIDTH : 1,
   PLATFORM_STROKE_STYLE : 'rgb(0,0,0)',   // black
   PLATFORM_VELOCITY_MULTIPLIER : 4.35,
   
   RUNNER_LEFT : 50,
   STARTING_RUNNER_TRACK : 1,
   
   // Track baselines
   TRACK_1_BASELINE : 323,
   TRACK_2_BASELINE : 223,
   TRACK_3_BASELINE : 123,
   
   // Platform scrolling offset (and therefore speed) is
   // PLATFORM_VELOCITY_MULTIPLIER * backgroundOffset: The
   // platforms move PLATFORM_VELOCITY_MULTIPLIER times as
   // fast as the background.
   PLATFORM_VELOCITY_MULTIPLIER : 4.35,
   STARTING_BACKGROUND_VELOCITY : 0,
   STARTING_BACKGROUND_OFFSET : 0,
   STARTING_PLATFORM_OFFSET : 0,
/*
   
   // Time
   lastAnimationFrameTime = 0,
   lastFpsUpdateTime = 0,
   fps = 60,
*/
   fpsElement : null,

   // next line - CANVAS STYLE SETTINGS to center canvas in browser-horizontally with 50px top margin
   centerCanvas: { padding:0, margin:"auto", display:"block", position:"absolute", top:0, bottom:0, left:0, right:0, "border":"1.5px solid blue" },
   alignCanvas: { padding:0, margin:"auto", "margin-top":"65px", display:"block", position:"absolute", top:0, bottom:0, left:0, right:0, "border":"1.5px solid blue" },

   sprites: {
      "background"  : { "path" : "background.png"},
      "runnerImage" : { "path" : "runner.png" },
      "runnerAnimatedGIF" : { "path" : "snail.gif"},
      "spritesheet" : { "path" : "spritesheet.png"}
    }
}
cc.fpsElement = document.getElementById('fps');
// platforms
let platformData = [
   // screen 1
   {
         left:      10,
         width:     230,
         height:    cc.PLATFORM_HEIGHT,
         fillStyle: 'rgb(250,250,0)',
         opacity:   0.5,
         track:     1,
         pulsate:   false
   },

   {
         left:      250,
         width:     100,
         height:    cc.PLATFORM_HEIGHT,
         fillStyle: 'rgb(150,190,255)',
         opacity:   1.0,
         track:     2,
         pulsate:   false
   },

   {
         left:      400,
         width:     125,
         height:    cc.PLATFORM_HEIGHT,
         fillStyle: 'rgb(250,0,0)',
         opacity:   1.0,
         track:     3,
         pulsate:   false
   },

   {
         left:      633,
         width:     100,
         height:    cc.PLATFORM_HEIGHT,
         fillStyle: 'rgb(250,250,0)',
         opacity:   1.0,
         track:     1,
         pulsate:   false
   },
      // Screen 2               
      {  left:      810,
         width:     100,
         height:    cc.PLATFORM_HEIGHT,
         fillStyle: 'rgb(200,200,0)',
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      1025,
         width:     100,
         height:    cc.PLATFORM_HEIGHT,
         fillStyle: 'rgb(80,140,230)',
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      1200,
         width:     125,
         height:    cc.PLATFORM_HEIGHT,
         fillStyle: 'aqua',
         opacity:   1.0,
         track:     3,
         pulsate:   false
      },

      {  left:      1400,
         width:     180,
         height:    cc.PLATFORM_HEIGHT,
         fillStyle: 'rgb(80,140,230)',
         opacity:   1.0,
         track:     1,
         pulsate:   false,
      },
      // Screen 3     
      {  left:      1625,
         width:     100,
         height:    cc.PLATFORM_HEIGHT,
         fillStyle: 'rgb(200,200,0)',
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      1800,
         width:     250,
         height:    cc.PLATFORM_HEIGHT,
         fillStyle: 'rgb(80,140,230)',
         opacity:   1.0,
         track:     1,
         pulsate:   false
      },

      {  left:      2000,
         width:     100,
         height:    cc.PLATFORM_HEIGHT,
         fillStyle: 'rgb(200,200,80)',
         opacity:   1.0,
         track:     2,
         pulsate:   false
      },

      {  left:      2100,
         width:     100,
         height:    cc.PLATFORM_HEIGHT,
         fillStyle: 'aqua',
         opacity:   1.0,
         track:     3,
      },

      // Screen 4
      {  left:      2269,
         width:     200,
         height:    cc.PLATFORM_HEIGHT,
         fillStyle: 'gold',
         opacity:   1.0,
         track:     1,
      },

      {  left:      2500,
         width:     200,
         height:    cc.PLATFORM_HEIGHT,
         fillStyle: '#2b950a',
         opacity:   1.0,
         track:     2,
         snail:     true
      }
]
