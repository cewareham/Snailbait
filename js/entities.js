'use strict';

class Entities {
    constructor(type, spriteCells, spriteData, allSpriteData, gameSprites) {
        this.type = type;               // type of entity -> 'bat', 'bee', 'snail', 'runner', etc.
        this.cells = spriteCells;       // where to GET sprite images from spritesheet.png
        this.data = spriteData;         // where to DRAW sprites of type (eg. bats) on html5 canvas
        this.sd = allSpriteData;        // reference to all sprites in spriteData.js
        this.gameSprites = gameSprites; // overall game sprites array
        this.sprites = [];
        this.artist = null;
        if (type != 'button' && type != 'coin' && type != 'platform')
            this.artist = new SpriteSheetArtist(cc.spritesheet, this.cells);
        this.createSprites();
    }

    createArtist(type, ii) {
        this.cells = null;
        switch (type) {
            case 'button':
                if (ii !== this.data.length-1) this.cells = this.sd.blueButtonCells;
                else this.cells = this.sd.goldButtonCells;
                break;
            case 'coin':
                if (ii % 2 === 0) this.cells = this.sd.goldCoinCells;
                else this.cells = this.sd.blueCoinCells;
                break;
        }
        if (this.cells) this.artist = new SpriteSheetArtist(cc.spritesheet, this.cells);
    }

    createSprites() {
        let sprite;

        // this.data -> where to DRAW the sprites on the html5 canvas
        for (let ii=0; ii<this.data.length; ++ii) {
            if (this.type == 'button' || this.type == 'coin')
                this.createArtist(this.type, ii);
            else if (this.type == 'platform') this.artist = new PlatformArtist();

            sprite = new Sprite(this.type, this.artist);

            switch (this.type) {
                case 'platform':
                    let pd = this.data[ii];

                    sprite.left = pd.left;
                    sprite.width = pd.width;
                    sprite.height = pd.height;
                    sprite.fillStyle = pd.fillStyle;
                    sprite.opacity = pd.opacity;
                    sprite.track = pd.track;
                    sprite.button = pd.button;
                    sprite.pulsate = pd.pulsate;

                    sprite.top = calculatePFTop(pd.track);
                    break;
                case 'bat':
                    // bat cell width varies, batCells[1] is widest
                    sprite.width = this.cells[1].width;
                    sprite.height = this.sd.BAT_CELLS_HEIGHT
                    break;
                case 'bee':
                    sprite.width = this.sd.BEE_CELLS_WIDTH;
                    sprite.height = this.sd.BEE_CELLS_HEIGHT;
                    break;
                case 'snail':
                    sprite.width = this.sd.SNAIL_CELLS_WIDTH;
                    sprite.height = this.sd.SNAIL_CELLS_HEIGHT;
                    break;
                case 'runner':
                    let RUNNER_LEFT = 50,
                        RUNNER_HEIGHT = 55,
                        STARTING_RUNNER_TRACK = 1;
                    sprite.track = STARTING_RUNNER_TRACK;
                    sprite.left = RUNNER_LEFT;
                    sprite.top = this.calculatePFTop(sprite.track) - RUNNER_HEIGHT;
                    break;
                case 'ruby':
                    sprite.width = this.sd.RUBY_CELLS_WIDTH;
                    sprite.height = this.sd.RUBY_CELLS_HEIGHT;
                    sprite.value = 200;              
                    break;
                case 'sapphire':
                    sprite.width = this.sd.SAPPHIRE_CELLS_WIDTH;
                    sprite.height = this.sd.SAPPHIRE_CELLS_HEIGHT;
                    sprite.value = 100;              
                    break;
                case 'button':
                    sprite.width = this.sd.BUTTON_CELLS_WIDTH;
                    sprite.height = this.sd.BUTTON_CELLS_HEIGHT;
                    break;
                case 'coin':
                    sprite.width = this.sd.COIN_CELLS_WIDTH;
                    sprite.height = this.sd.COIN_CELLS_HEIGHT;
                    sprite.value = 50;
                    break;
            }
            this.sprites.push(sprite);
            // positionSprites() -> set sprite position acc to data values
            if (this.data[ii].platformIndex) {
                this.putSpriteOnPlatform(sprite,
                    platformData[this.data[ii].platformIndex]);     // platformData is global obj
            } else {
                sprite.top = this.data[ii].top;
                sprite.left = this.data[ii].left;
            }
            // addToGameSpriteArray() -> add sprite to overall game sprites array
            this.gameSprites.push(sprite);
        }
    }

    putSpriteOnPlatform(sprite, platform) {
        sprite.top = this.calculatePFTop(platform.track) - sprite.height;
        sprite.left = platform.left;
        sprite.platform = platform;  
    }

    // this function also in platforms.js but can't access from here
    //  (even though pfs is global object)
    calculatePFTop(track) {
        if      (track === 1) { return cc.TRACK_1_BASELINE; }   // 323 pixels
        else if (track === 2) { return cc.TRACK_2_BASELINE; }   // 223 pixels
        else if (track === 3) { return cc.TRACK_3_BASELINE; }   // 123 pixels
    }
}
