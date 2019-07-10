/*jshint esversion: 6 */


function Food(x,y) {
  this.x = x;
  this.y = y;
  this.size = 5;
  this.color = undefined;
  this.invColor = undefined;
  this.colorChangeInverval = 200;

  this.init = function() {
    this.changeColor();
  };

  this.changeColor = function() {
    let c = randColor("rgba");
    this.color = c;
    this.invColor = invertRGBAstr(c);
  };

  this.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.invColor;
    // ctx.rect(this.x,this.y,10,10);
    ctx.arc(this.x+5,this.y+5,this.size,0,2 * Math.PI); // x , y , radius, sAngle , eAngle
    ctx.fill();
    // ctx.stroke();
  };

  this.update = function() {
    if ((performance.now() % this.colorChangeInverval) < 16.67) {
      this.changeColor();
    }
  };

}



function FoodEatAnim1(x,y) {
  this.x = x;
  this.y = y;
  this.size = 3;
  this.color = undefined;
  this.invColor = undefined;
  this.morphInterval = 100;
  this.sparks = undefined;
  this.startTime = undefined;
  this.timeToLive = 1200;
  this.flaggedForDeath = false;

  this.init = function() {
    this.startTime = performance.now();
    this.buildSparks();
  };

  this.buildSparks = function() {
    this.sparks = [];
    for (let i = 0; i < 10; i++) {
      let spark = {
        x: (this.x + ( getRandomIntInclusive(10,60) * randSign() )),
        y: (this.y + ( getRandomIntInclusive(10,60) * randSign() )),
        col: randColor("rgba")
      };
      this.sparks.push(spark);
    }
  };

  this.changeColor = function() {
    let c = randColor("rgba");
    this.color = c;
    this.invColor = invertRGBAstr(c);
  };

  this.morph = function() {
    this.sparks = undefined;
    this.buildSparks();
  };

  this.draw = function() {
    for (let i = 0; i < this.sparks.length; i++) {
      ctx.beginPath();
      // ctx.fillStyle = this.color;
      ctx.strokeStyle = this.sparks[i].col;
      ctx.rect(this.sparks[i].x-1,this.sparks[i].y-1,this.size ,this.size );
      // ctx.arc(this.x+5,this.y+5,this.size,0,2 * Math.PI); // x , y , radius, sAngle , eAngle
      // ctx.fill();
      ctx.stroke();
    }
  };

  this.update = function() {
    if ( (performance.now() - this.startTime) > this.timeToLive ) {
      this.flaggedForDeath = true;
    }
    if ((performance.now() % this.morphInterval) < 16.67) {
      this.morph();
    }
  };

}
