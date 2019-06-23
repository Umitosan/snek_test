/*jshint esversion: 6 */


function SnekBW(x,y,bodyLen) {
  this.headX = x;
  this.headY = x;
  this.body = undefined;
  this.bodyPartSize = undefined;
  this.bodyLen = bodyLen;

  this.init = function() {
    console.log('snek init');
    this.bodyPartSize = ((canW / 3) / this.bodyLen);
    console.log('this.bodyPartSize = ', this.bodyPartSize);
    this.body = [];
    for (let i = 0; i < this.bodyLen; i++) {
      let newBodyPart = {
        "x": ( (canW / 3) - (this.bodyPartSize * (i + 1)) ),
        "y": 0,
        "color": randColor("rgba"),
        "vel": this.bodyPartSize
      };
      this.body.push(newBodyPart);
    }
  };

  this.draw = function() {
    for (let i = 0; i < this.bodyLen; i++) {
      ctx.beginPath();
      ctx.fillStyle = this.body[i].color;
      ctx.rect(this.body[i].x,this.body[i].y,this.bodyPartSize,this.bodyPartSize);
      ctx.fill();
    }
  };

  this.update = function() {
    // if ( (performance.now() % 30) <= 17 ) {
      for (let i = 0; i < this.body.length; i++) {
        if ( (this.body[i].x + this.body[i].vel + this.bodyPartSize) > canW ) {
          if (this.body[i].vel > 0) { // right vel
            this.body[i].vel *= -1; // switch vel direction
            this.body[i].y += this.bodyPartSize;
            this.body[i].x = canW - this.bodyPartSize;
          } else if (this.body[i].vel < 0) { // left vel
            this.body[i].vel *= -1; // switch vel direction
            this.body[i].y += this.bodyPartSize;
            this.body[i].x = 0;
          } else {
            console.log('probs');
            myGame.pauseIt();
          }
        } else if ( (this.body[i].x + this.body[i].vel) < 0 ) {
          if (this.body[i].vel > 0) { // right vel
            this.body[i].vel *= -1; // switch vel direction
            this.body[i].y += this.bodyPartSize;
            this.body[i].x = canW - this.bodyPartSize;
          } else if (this.body[i].vel < 0) { // left vel
            this.body[i].vel *= -1; // switch vel direction
            this.body[i].y += this.bodyPartSize;
            this.body[i].x = 0;
          } else {
            console.log('probs');
            myGame.pauseIt();
          }
        } else {
          this.body[i].x += this.body[i].vel;
        }
      }
    // }

  };

}
