/*jshint esversion: 6 */


function SnekBW(x,y,bodySegmentsLen) {
  this.body = undefined;
  this.bodyPartSize = 10;
  this.bodyLen = bodySegmentsLen;
  this.updateInterval = 100;
  this.lastSnekUpdate = undefined;

  this.init = function() {
    console.log('snek init');
    this.body = [];
    let startY =  this.bodyPartSize * 10;
    for (let i = 0; i < this.bodyLen; i++) {
      let newBodyPart = {
        "x": ( (canW / 3) - (this.bodyPartSize * (i + 1)) ),
        "y": startY,
        "color": randColor("rgba"),
        "xVel": this.bodyPartSize,
        "yVel": 0
      };
      this.body.push(newBodyPart);
    }
    this.lastSnekUpdate = performance.now();
  };

  this.changeDir = function(newDir) {
    switch (newDir) {
      case "up":
        this.body[0].xVel = 0;
        this.body[0].yVel = -this.bodyPartSize;
        break;
      case "down":
        this.body[0].xVel = 0;
        this.body[0].yVel = this.bodyPartSize;
        break;
      case "left":
        this.body[0].xVel = -this.bodyPartSize;
        this.body[0].yVel = 0;
        break;
      case "right":
        this.body[0].xVel = this.bodyPartSize;
        this.body[0].yVel = 0;
        break;
      default:
    }
  };

  this.checkBodyCollision = function() {
    let collide = false;


    return collide;
  };

  this.checkBounds = function() {
    if ( ((this.body[0].x + this.bodyPartSize) > CANVAS.width) ||
       ((this.body[0].x - this.bodyPartSize) < 0) ||
       ((this.body[0].y + this.bodyPartSize) > CANVAS.height) ||
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
