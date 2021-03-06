'use strict';

class SpriteData {
    constructor() {
        //**************************
        //***** BEGIN bat data *****
        // location of 4 bat images in spritesheet.png -> where to GET the bat images
        this.BAT_CELLS_HEIGHT = 34; // Bat cell width varies; not constant
        this.batCells = [
            { left: 3,   top: 0, width: 36, height: this.BAT_CELLS_HEIGHT },
            { left: 41,  top: 0, width: 46, height: this.BAT_CELLS_HEIGHT },
            { left: 93,  top: 0, width: 36, height: this.BAT_CELLS_HEIGHT },
            { left: 132, top: 0, width: 46, height: this.BAT_CELLS_HEIGHT },
        ];
        // location of 8 bats on the html5 canvas -> where to DRAW the bats
        this.batData = [
            { left: 85,   top: cc.TRACK_2_BASELINE - 1.5*this.BAT_CELLS_HEIGHT },
            { left: 620,  top: cc.TRACK_3_BASELINE },
            { left: 904,  top: cc.TRACK_3_BASELINE - 3*this.BAT_CELLS_HEIGHT },
            { left: 1150, top: cc.TRACK_2_BASELINE - 3*this.BAT_CELLS_HEIGHT },
            { left: 1720, top: cc.TRACK_2_BASELINE - 2*this.BAT_CELLS_HEIGHT },
            { left: 1960, top: cc.TRACK_3_BASELINE - this.BAT_CELLS_HEIGHT },
            { left: 2200, top: cc.TRACK_3_BASELINE - this.BAT_CELLS_HEIGHT },
            { left: 2380, top: cc.TRACK_3_BASELINE - 2*this.BAT_CELLS_HEIGHT }
        ];
        this.BAT_CELLS_WIDTH = this.batCells[1].width;
        //***** END bat data *****
        //************************
        //***** BEGIN bee data *****
        this.BEE_CELLS_HEIGHT = 50;
        this.BEE_CELLS_WIDTH  = 50;

        this.beeCells = [   // where to GET bee images from spritesheet.png
            { left: 5,   top: 234, width: this.BEE_CELLS_WIDTH, height: this.BEE_CELLS_HEIGHT },
            { left: 75,  top: 234, width: this.BEE_CELLS_WIDTH, height: this.BEE_CELLS_HEIGHT },
            { left: 145, top: 234, width: this.BEE_CELLS_WIDTH, height: this.BEE_CELLS_HEIGHT }
        ];  
   
        this.beeData = [    // where to DRAW 10 bees on html5 canvas
            { left: 200,  top: cc.TRACK_1_BASELINE - this.BEE_CELLS_HEIGHT*1.5 },
            { left: 350,  top: cc.TRACK_2_BASELINE - this.BEE_CELLS_HEIGHT*1.5 },
            { left: 550,  top: cc.TRACK_1_BASELINE - this.BEE_CELLS_HEIGHT },
            { left: 750,  top: cc.TRACK_1_BASELINE - this.BEE_CELLS_HEIGHT*1.5 },
            { left: 924,  top: cc.TRACK_2_BASELINE - this.BEE_CELLS_HEIGHT*1.75 },
            { left: 1500, top: 225 },
            { left: 1600, top: 115 },
            { left: 2225, top: 125 },
            { left: 2295, top: 275 },
            { left: 2450, top: 275 }
         ];
        //***** END bee data *****
        //************************
        //***** BEGIN snail data *****
        this.SNAIL_CELLS_HEIGHT = 34;
        this.SNAIL_CELLS_WIDTH  = 64;

        this.snailCells =  [   // where to GET snail images from spritesheet.png
            { left: 142, top: 466, width: this.SNAIL_CELLS_WIDTH, height: this.SNAIL_CELLS_HEIGHT },
            { left: 75,  top: 466, width: this.SNAIL_CELLS_WIDTH, height: this.SNAIL_CELLS_HEIGHT },
            { left: 2,   top: 466, width: this.SNAIL_CELLS_WIDTH, height: this.SNAIL_CELLS_HEIGHT },
        ];
   
        this.snailData = [ { platformIndex: 13 } ]; // where to DRAW 1 snail on html5 canvas
        //***** END snail data *****
        //**************************
        //***** BEGIN runner data *****
        this.RUNNER_CELLS_HEIGHT = 54;
        this.RUNNER_CELLS_WIDTH = 50;

        this.runnerCellsRight = [
            { left: 414, top: 385, width: 47, height: this.RUNNER_CELLS_HEIGHT },
            { left: 362, top: 385, width: 44, height: this.RUNNER_CELLS_HEIGHT },
            { left: 314, top: 385, width: 39, height: this.RUNNER_CELLS_HEIGHT },
            { left: 265, top: 385, width: 46, height: this.RUNNER_CELLS_HEIGHT },
            { left: 205, top: 385, width: 49, height: this.RUNNER_CELLS_HEIGHT },
            { left: 150, top: 385, width: 46, height: this.RUNNER_CELLS_HEIGHT },
            { left: 96,  top: 385, width: 46, height: this.RUNNER_CELLS_HEIGHT },
            { left: 45,  top: 385, width: 35, height: this.RUNNER_CELLS_HEIGHT },
            { left: 0,   top: 385, width: 35, height: this.RUNNER_CELLS_HEIGHT }
         ];
      
         this.runnerCellsLeft = [
            { left: 0,   top: 305, width: 47, height: this.RUNNER_CELLS_HEIGHT },
            { left: 55,  top: 305, width: 44, height: this.RUNNER_CELLS_HEIGHT },
            { left: 107, top: 305, width: 39, height: this.RUNNER_CELLS_HEIGHT },
            { left: 152, top: 305, width: 46, height: this.RUNNER_CELLS_HEIGHT },
            { left: 208, top: 305, width: 49, height: this.RUNNER_CELLS_HEIGHT },
            { left: 265, top: 305, width: 46, height: this.RUNNER_CELLS_HEIGHT },
            { left: 320, top: 305, width: 42, height: this.RUNNER_CELLS_HEIGHT },
            { left: 380, top: 305, width: 35, height: this.RUNNER_CELLS_HEIGHT },
            { left: 425, top: 305, width: 35, height: this.RUNNER_CELLS_HEIGHT },
         ];

        this.runnerData = [
            { left: 50, top: cc.TRACK_1_BASELINE - this.RUNNER_CELLS_HEIGHT }
        ];
        //***** END runner data *****
        //***************************
        //***** BEGIN ruby data *****
        this.RUBY_CELLS_WIDTH = 35;
        this.RUBY_CELLS_HEIGHT = 30;

        this.rubyCells = [
            { left: 3,   top: 138, width: this.RUBY_CELLS_WIDTH, height: this.RUBY_CELLS_HEIGHT },
            { left: 39,  top: 138, width: this.RUBY_CELLS_WIDTH, height: this.RUBY_CELLS_HEIGHT },
            { left: 76,  top: 138, width: this.RUBY_CELLS_WIDTH, height: this.RUBY_CELLS_HEIGHT },
            { left: 112, top: 138, width: this.RUBY_CELLS_WIDTH, height: this.RUBY_CELLS_HEIGHT },
            { left: 148, top: 138, width: this.RUBY_CELLS_WIDTH, height: this.RUBY_CELLS_HEIGHT }
         ];

        this.rubyData = [
            { left: 690, top: cc.TRACK_1_BASELINE - this.RUBY_CELLS_HEIGHT },
            { left: 1700, top: cc.TRACK_2_BASELINE - this.RUBY_CELLS_HEIGHT },
            { left: 2056, top: cc.TRACK_2_BASELINE - this.RUBY_CELLS_HEIGHT },
        ];
        //***** END ruby data *****
        //*************************
        //***** BEGIN sapphire data *****
        this.SAPPHIRE_CELLS_WIDTH = 35;
        this.SAPPHIRE_CELLS_HEIGHT = 30;

        this.sapphireCells = [
            { left: 185, top: 138, width: this.SAPPHIRE_CELLS_WIDTH, height: this.SAPPHIRE_CELLS_HEIGHT },
            { left: 220, top: 138, width: this.SAPPHIRE_CELLS_WIDTH, height: this.SAPPHIRE_CELLS_HEIGHT },
            { left: 258, top: 138, width: this.SAPPHIRE_CELLS_WIDTH, height: this.SAPPHIRE_CELLS_HEIGHT },
            { left: 294, top: 138, width: this.SAPPHIRE_CELLS_WIDTH, height: this.SAPPHIRE_CELLS_HEIGHT },
            { left: 331, top: 138, width: this.SAPPHIRE_CELLS_WIDTH, height: this.SAPPHIRE_CELLS_HEIGHT }
         ];

        this.sapphireData = [
            { left: 140, top: cc.TRACK_1_BASELINE - this.SAPPHIRE_CELLS_HEIGHT },
            { left: 880, top: cc.TRACK_2_BASELINE - this.SAPPHIRE_CELLS_HEIGHT },
            { left: 1100, top: cc.TRACK_2_BASELINE - this.SAPPHIRE_CELLS_HEIGHT }, 
            { left: 1475, top: cc.TRACK_1_BASELINE - this.SAPPHIRE_CELLS_HEIGHT },
            { left: 2400, top: cc.TRACK_1_BASELINE - this.SAPPHIRE_CELLS_HEIGHT },
        ];
        //***** END sapphire data *****
        //*****************************
        //***** BEGIN button data *****
        this.BUTTON_CELLS_WIDTH = 31;
        this.BUTTON_CELLS_HEIGHT = 20;
        
        this.blueButtonCells = [
            { left: 10,   top: 192, width: this.BUTTON_CELLS_WIDTH, height: this.BUTTON_CELLS_HEIGHT },
            { left: 53,  top: 192, width: this.BUTTON_CELLS_WIDTH, height: this.BUTTON_CELLS_HEIGHT }
        ];

        this.goldButtonCells = [
            { left: 90,   top: 190, width: this.BUTTON_CELLS_WIDTH, height: this.BUTTON_CELLS_HEIGHT },
            { left: 132,  top: 190, width: this.BUTTON_CELLS_WIDTH, height: this.BUTTON_CELLS_HEIGHT }
        ];   

        this.buttonData = [
            { platformIndex: 7 },
            { platformIndex: 12 },
        ];      
        //***** END button data *****
        //***************************
        //***** BEGIN coin data *****
        this.COIN_CELLS_WIDTH  = 30;
        this.COIN_CELLS_HEIGHT = 30;

        this.blueCoinCells = [
            { left: 5, top: 540, width: this.COIN_CELLS_WIDTH, height: this.COIN_CELLS_HEIGHT },
            { left: 5 + this.COIN_CELLS_WIDTH, top: 540, width: this.COIN_CELLS_WIDTH, height: this.COIN_CELLS_HEIGHT }
        ];

        this.goldCoinCells = [
            { left: 65, top: 540, width: this.COIN_CELLS_WIDTH, height: this.COIN_CELLS_HEIGHT },
            { left: 96, top: 540, width: this.COIN_CELLS_WIDTH, height: this.COIN_CELLS_HEIGHT },
            { left: 128, top: 540, width: this.COIN_CELLS_WIDTH, height: this.COIN_CELLS_HEIGHT }
        ];

        this.coinData = [
            { left: 270, top: cc.TRACK_2_BASELINE - this.COIN_CELLS_HEIGHT }, 
            { left: 489, top: cc.TRACK_3_BASELINE - this.COIN_CELLS_HEIGHT }, 
            { left: 620, top: cc.TRACK_1_BASELINE - this.COIN_CELLS_HEIGHT }, 
            { left: 833, top: cc.TRACK_2_BASELINE - this.COIN_CELLS_HEIGHT }, 
            { left: 1050, top: cc.TRACK_2_BASELINE - this.COIN_CELLS_HEIGHT }, 
            { left: 1450, top: cc.TRACK_1_BASELINE - this.COIN_CELLS_HEIGHT }, 
            { left: 1670, top: cc.TRACK_2_BASELINE - this.COIN_CELLS_HEIGHT }, 
            { left: 1870, top: cc.TRACK_1_BASELINE - this.COIN_CELLS_HEIGHT }, 
            { left: 1930, top: cc.TRACK_1_BASELINE - this.COIN_CELLS_HEIGHT }, 
            { left: 2200, top: cc.TRACK_2_BASELINE - this.COIN_CELLS_HEIGHT }, 
            { left: 2320, top: cc.TRACK_2_BASELINE - this.COIN_CELLS_HEIGHT }, 
            { left: 2360, top: cc.TRACK_1_BASELINE - this.COIN_CELLS_HEIGHT }, 
        ];  
        //***** END coin data *****
        //***************************
    }
}