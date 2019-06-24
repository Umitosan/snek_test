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
    ctx.arc(this.x,this.y,this.size,0,2 * Math.PI); // x , y , radius, sAngle , eAngle
    ctx.fill();
    ctx.stroke();
  };

  this.update = function() {
    if ((performance.now() % this.colorChangeInverval) < 16.67) {
      this.changeColor();
    }
  };

}
