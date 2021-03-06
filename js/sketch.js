"use strict";

let game, canvas;

function preload() {
  // load all images in cc.sprites array giving them the name of their first property
  for (const property in cc.sprites) {
    cc[property] = loadImage("assets/" + cc.sprites[property]["path"]);
  }
  // load all sounds in cc.sounds array giving them the name of their first property
  //for (const property in cc.sounds) {
  //  cc[property] = loadSound("sounds/" + cc.sounds[property]["path"]);
  //}
}

function setup() {
  canvas = createCanvas(800, 400);
  //can.parent('container');              // put canvas in div
  styleCanvas();
  addChrome(canvas.position());
  //can.style('border: 1.5px solid blue');  // border around canvas
  canvas.style('opacity: 0; display: none;');

  game = new Snailbait();
  // setTimeout( function(e) {
  //   game.bg.turnRight();             // set init bg velocity
  // }, 1000);
  let rag = select('#loading-animated-gif').elt;
  rag.src = "assets/snail.gif";
  rag.onload = game.loadingAnimationLoaded();
  //game.backgroundLoaded();
}

function addChrome(pos) {
  // sound & music checkboxes
  let yy = pos.y + height + 10;
  let sm = select('#sound-and-music');
  sm.position(pos.x, yy);

  // instructions
  let ins = select('#instructions');
  ins.position(pos.x, yy);
  
  // copyright
  let copyright = select('#copyright');
  // this same styling doesn't work right when putting it inline with html
  //copyright.style('font-size: 0.85em; color: blue; text-shadow: 1px 1px 1px rgba(255,255,255,0.5);');
  let copyWidth = drawingContext.measureText(copyright.html()).width;
  copyright.position(pos.x+width-copyWidth, yy);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    game.bg.turnLeft();
  } else if (keyCode === RIGHT_ARROW) {
    game.bg.turnRight();   
  } else if (keyCode === 80) {    // 'p' pressed
    game.togglePaused();
  }
}

function draw() {
  game.update();
  game.draw();
  //background(220);
  //image(cc.background, 0, 0);
  //image(cc.runnerImage, 50, 280);
}

function styleCanvas() {
  // center the canvas in the browser
  setStyle(drawingContext.canvas, cc.alignCanvas);
}

// call using setStyle("color", "red"); -OR-
// call using object--setStyle({ color: red, backgroundcolor: "white" });    
// VIP! don't use this to set width,height,x,y->these need this.width etc.
// so instead use setSize(), setPos() or setSizePos() for these!
function setStyle(canvas, css, value) {
  let style = canvas.style,
      cssType = typeof css,
      valueType = typeof value;

  if (cssType !== "undefined" && valueType === "undefined") {
    if (cssType === "object") {
      for (var prop in css) {
        if (css.hasOwnProperty(prop)) {
          style[prop] = css[prop];
        }
      }
    }
  } else if (cssType === "string" && valueType === "string") {
    style[css] = value;
    // equiv calls->style.color="red"; -or- style["color"]="red";   
  } else {
    throw { message: "Invalid parameters passed to setStyle()" };
  }
}

function calculatePFTop(track) {
  if      (track === 1) { return cc.TRACK_1_BASELINE; }   // 323 pixels
  else if (track === 2) { return cc.TRACK_2_BASELINE; }   // 223 pixels
  else if (track === 3) { return cc.TRACK_3_BASELINE; }   // 123 pixels
}
