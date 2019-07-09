/*jshint esversion: 6 */


function SnekBW(x,y,bodySegmentsLen) {
  this.body = undefined;
  this.bodyPartSize = 10;
  this.bodyLen = bodySegmentsLen;
  this.updateInterval = 30;
  this.lastSnekUpdate = undefined;
  this.dir = 'right';

  this.init = function() {
    console.log('snek init');
    this.body = [];
    let startY =  this.bodyPartSize * 10;
    for (let i = 0; i < this.bodyLen; i++) {
      let col;
      let rn = getRandomIntInclusive(1,3);
      if ( (rn === 1) || (i == 0) ) {
        col = "rgba(232, 140, 4, 1)";
      } else if (rn === 2) {
        col = "rgba(200, 10, 10, 1)";
      } else {
        col = "rgba(50, 50, 50, 1)";
      }
      let newBodyPart = {
        "x": ( Math.floor(canW / 3) - (this.bodyPartSize * (i + 1)) ),
        "y": startY,
        "color": col,
        "xVel": this.bodyPartSize,
        "yVel": 0
      };
      this.body.push(newBodyPart);
    }
    this.body[0].color = "rgba(0,200,200,1)";
    this.lastSnekUpdate = performance.now();
  };

  this.changeDir = function(newDir) {
    switch (newDir) {
      case "up":
        if (this.dir !== "down") {
          this.body[0].xVel = 0;
          this.body[0].yVel = -this.bodyPartSize;
          this.dir = 'up';
        }
        break;
      case "down":
        if (this.dir !== "up") {
          this.body[0].xVel = 0;
          this.body[0].yVel = this.bodyPartSize;
          this.dir = 'down';
        }
        break;
      case "left":
        if (this.dir !== "right") {
          this.body[0].xVel = -this.bodyPartSize;
          this.body[0].yVel = 0;
          this.dir = 'left';
        }
        break;
      case "right":
        if (this.dir !== "right") {
        this.body[0].xVel = this.bodyPartSize;
        this.body[0].yVel = 0;
        this.dir = 'right';
        }
        break;
      default:
        console.log('changeDir probs: not a dir');
    }
  };

  this.checkBodyCollision = function() {
    let collide = false;
    switch (this.dir) {
      case "up":
        for (let i = 3; i < (this.body.length - 3); i++) {  // first 3 segments dont' need to be checked, not possible to collide
          if (this.body[i].y < this.body[0].y) {  // skip segements obviously out of range
            if ( (Math.abs(this.body[0].x - this.body[i].x) <= 3) &&
                 (Math.abs(this.body[0].y - this.body[i].y) <= (this.bodyPartSize + 1)) ) {
              collide = true;
              console.log("this.body[0] x,y = " + this.body[0].x + "," + this.body[0].y);
              console.log("this.body[i] x,y = " + "[" + i + "]" + this.body[i].x + "," + this.body[i].y);
              break;
            }
          }
        }
        break;
      case "down":
        for (let i = 3; i < (this.body.length - 3); i++) {  // first 3 segments dont' need to be checked, not possible to collide
          if (this.body[i].y > this.body[0].y) {  // skip segements obviously out of range
            if ( (Math.abs(this.body[0].x - this.body[i].x) <= 3) &&
                 (Math.abs(this.body[0].y - this.body[i].y) <= (this.bodyPartSize + 1)) ) {
              collide = true;
              console.log("this.body[0] x,y = " + this.body[0].x + "," + this.body[0].y);
              console.log("this.body[i] x,y = " + "[" + i + "]" + this.body[i].x + "," + this.body[i].y);
              break;
            }
          }
        }
        break;
      case "left":
        for (let i = 3; i < (this.body.length - 3); i++) {  // first 3 segments dont' need to be checked, not possible to collide
          if (this.body[i].x < this.body[0].x) {  // skip segements obviously out of range
            if ( (Math.abs(this.body[0].y - this.body[i].y) <= 3) &&
                 (Math.abs(this.body[0].x - this.body[i].x) <= (this.bodyPartSize + 1)) ) {
              collide = true;
              console.log("this.body[0] x,y = " + this.body[0].x + "," + this.body[0].y);
              console.log("this.body[i] x,y = " + "[" + i + "]" + this.body[i].x + "," + this.body[i].y);
              break;
            }
          }
        }
        break;
      case "right":
        for (let i = 3; i < (this.body.length - 3); i++) {  // first 3 segments dont' need to be checked, not possible to collide
          if (this.body[i].x > this.body[0].x) {  // skip segements obviously out of range
            if ( (Math.abs(this.body[0].y - this.body[i].y) <= 3) &&
                 (Math.abs(this.body[0].x - this.body[i].x) <= (this.bodyPartSize + 1)) ) {
              collide = true;
              console.log("this.body[0] x,y = " + this.body[0].x + "," + this.body[0].y);
              console.log("this.body[i] x,y = " + "[" + i + "]" + this.body[i].x + "," + this.body[i].y);
              break;
            }
          }
        }
        break;
      default:
        console.log('checkBodyCollision probs: not a dir');
    }
    return collide;
  };

  this.checkBounds = function() {
    if (this.checkBodyCollision()) myGame.pauseIt();
    if ( ((this.body[0].x + this.bodyPartSize) > (CANVAS.width - this.bodyPartSize)) ||
       ((this.body[0].x - this.bodyPartSize) < 0) ||
       ((this.body[0].y + this.bodyPartSize) > (CANVAS.height - this.bodyPartSize)) ||
       ((this.body[0].y - this.bodyPartSize) < 0)
       ) {
      myGame.pauseIt();
    }
  };

  this.draw = function() {
    for (let i = 0; i < this.bodyLen; i++) {
      ctx.beginPath();
      ctx.fillStyle = this.body[i].color;
      ctx.rect(this.body[i].x,this.body[i].y,this.bodyPartSize,this.bodyPartSize);
      ctx.fill();
    }
  }; // draw

  this.updatePosAndVel = function() {
    for (let j = 0; j < this.body.length; j++) {
      this.body[j].x += this.body[j].xVel;
      this.body[j].y += this.body[j].yVel;
    }
    for (let i = (this.body.length-1); i > 0; i--) { // skip head
        this.body[i].xVel = this.body[i-1].xVel;
        this.body[i].yVel = this.body[i-1].yVel;
    }
  };

  this.update = function() {
    if ( (performance.now() - this.lastSnekUpdate) > this.updateInterval) {
      this.updatePosAndVel();
      this.checkBounds();
      this.lastSnekUpdate = performance.now();
    }
  };  // update

}
