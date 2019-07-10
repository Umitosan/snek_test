/*jshint esversion: 6 */


function Game(updateDur) {
  this.timeGap = 0;
  this.lastUpdate = 0;
  this.lastDirKeyX = undefined;
  this.lastDirKeyY = undefined;
  this.updateDuration = updateDur; // milliseconds duration between update()
  this.paused = false;
  this.bg = new Image();
  this.pausedTxt = undefined;
  this.mode = 'init';
  this.snek = undefined;
  this.food = undefined;
  this.foodAnim = undefined;
  this.gridOn = false;

  this.init = function() {
    this.bg.src = 'bg1.png';
    this.snek = new SnekBW(50,50,50);
    this.snek.init();
    this.makeFood(1);
    this.lastUpdate = performance.now();
  };

  this.makeFood = function(quantity) {
    let x = getRandomIntInclusive(1,78);
    let y = getRandomIntInclusive(1,78);
    this.food = new Food(x*this.snek.bodyPartSize,y*this.snek.bodyPartSize);
    this.food.init();
  };

  this.checkFoodCollision = function() {
    let collide = false;
    switch (this.snek.dir) {
      case "up":
        if ( (Math.abs(this.snek.body[0].x - this.food.x) <= 1) &&
             (Math.abs(this.snek.body[0].y - this.food.y) <= 10) ) {
          console.log('collide food up');
          collide = true;
        }
        break;
      case "down":
        if ( (Math.abs(this.snek.body[0].x - this.food.x) <= 1) &&
             (Math.abs(this.snek.body[0].y - this.food.y) <= 10) ) {
          console.log('collide food down');
          collide = true;
        }
        break;
      case "left":
        if ( (Math.abs(this.snek.body[0].x - this.food.x) <= 10) &&
             (Math.abs(this.snek.body[0].y - this.food.y) <= 1) ) {
          console.log('collide food left');
          collide = true;
        }
        break;
      case "right":
        if ( (Math.abs(this.snek.body[0].x - this.food.x) <= 10) &&
             (Math.abs(this.snek.body[0].y - this.food.y) <= 1) ) {
          console.log('collide food right');
          collide = true;
        }
        break;
      default:
        // not collide
    }
    return collide;
  };

  this.eatFood = function() {
    let newX,newY,newC,newxVel,newyVel;
    if ( (this.snek.body[this.snek.bodyLen - 1].xVel === 0) &&
         (this.snek.body[this.snek.bodyLen - 1].yVel === -this.snek.bodyPartSize) ) { // UP
      newX = this.snek.body[this.snek.bodyLen - 1].x;
      newY = this.snek.body[this.snek.bodyLen - 1].y + this.snek.bodyPartSize;
      newxVel = 0;
      newyVel = -this.snek.bodyPartSize;
    } else if ( (this.snek.body[this.snek.bodyLen - 1].xVel === 0) &&
         (this.snek.body[this.snek.bodyLen - 1].yVel === this.snek.bodyPartSize) ) { // DOWN
      newX = this.snek.body[this.snek.bodyLen - 1].x;
      newY = this.snek.body[this.snek.bodyLen - 1].y - this.snek.bodyPartSize;
      newxVel = 0;
      newyVel = this.snek.bodyPartSize;
    } else if ( (this.snek.body[this.snek.bodyLen - 1].xVel === -this.snek.bodyPartSize) &&
         (this.snek.body[this.snek.bodyLen - 1].yVel === 0) ) { // LEFT
      newX = this.snek.body[this.snek.bodyLen - 1].x + this.snek.bodyPartSize;
      newY = this.snek.body[this.snek.bodyLen - 1].y;
      newxVel = -this.snek.bodyPartSize;
      newyVel = 0;
    } else if ( (this.snek.body[this.snek.bodyLen - 1].xVel === this.snek.bodyPartSize) &&
         (this.snek.body[this.snek.bodyLen - 1].yVel === 0) ) { // RIGHT
      newX = this.snek.body[this.snek.bodyLen - 1].x - this.snek.bodyPartSize;
      newY = this.snek.body[this.snek.bodyLen - 1].y;
      newxVel = this.snek.bodyPartSize;
      newyVel = 0;
    } else {
      console.log('eatFood probs: snek direction');
    }
    newC = this.food.color;
    let newBodyPart = {
      "x": newX,
      "y": newY,
      "color": newC,
      "xVel": newxVel,
      "yVel": newyVel
    };
    this.snek.body.push(newBodyPart);
    this.snek.bodyLen += 1;
    this.foodAnim = new FoodEatAnim1(this.food.x, this.food.y);
    this.foodAnim.init();
    this.food = undefined;
    this.makeFood(1);
  };

  this.pauseIt = function() {
    myGame.paused = true;
  };
  this.unpauseIt = function() {
    myGame.paused = false;
    this.lastUpdate = performance.now();
    this.timeGap = 0;
  };

  this.drawGrid = function() {
    for (let i = 0; i < (canW / 10) ; i++) {
      ctx.save();
      ctx.translate(-0.5,-0.5);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(0,100,0,1)";
      ctx.moveTo(0,i*10);
      ctx.lineTo(canW,i*10);
      ctx.moveTo(i*10,0);
      ctx.lineTo(i*10,canH);
      ctx.stroke();
      ctx.restore();
    }
  };

  this.drawBG = function() { // display background over canvas
    ctx.imageSmoothingEnabled = false;  // turns off AntiAliasing
    ctx.drawImage(this.bg,0,0,CANVAS.width,CANVAS.height);
  };

  this.draw = function() {  // draw everything!
    this.snek.draw();
    if (this.food) { this.food.draw(); }
    if (this.gridOn) { this.drawGrid(); }
    if (this.foodAnim) { this.foodAnim.draw(); }
  }; // end draw

  this.update = function() {
      if (this.paused === false) { // performance based update: myGame.update() runs every myGame.updateDuration milliseconds
            this.timeGap = performance.now() - this.lastUpdate;

            if ( this.timeGap >= this.updateDuration ) { // this update is restricted to updateDuration
              let timesToUpdate = this.timeGap / this.updateDuration;
              for (let i=1; i < timesToUpdate; i++) { // update children objects
                // if (timesToUpdate > 2) {
                //   console.log('timesToUpdate = ', timesToUpdate);
                // }
                // general update area
                this.snek.update();
                if (this.food) { this.food.update(); }
                if (this.checkFoodCollision()) this.eatFood();
                if (this.foodAnim) {
                  this.foodAnim.update();
                  if (this.foodAnim.flaggedForDeath === true) { this.foodAnim = undefined; }
                }
              }
              this.lastUpdate = performance.now();
            } // end if

            // if (this.mode === "draw") { // run this every update cycle regardless of timing
            //   // general draw area
            // } else {
            //   // mode is none
            // }

      } else if (this.paused === true) {
        // PAUSED! do nothin
      } else {
        console.log('game pause issue');
      }

  }; // end update

} // end myGame
