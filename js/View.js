/*jslint node: true, browser: true */
"use strict";

function View() {
    var canvas = document.getElementById("gameField"),
        gcx = canvas.getContext("2d"), 
        H = canvas.height, 
        W = canvas.width;
    
    canvas.style.background = 'BLACK';
    
    this.updateDisplay = function (ball, flipper, blocks, score, debug) {
        this.clearCanvas();
        this.drawBall(ball);
        this.drawFlipper(flipper);
        this.drawBlocks(blocks);
        this.drawDebug(debug);
        this.drawScore(score);
    };
    
    this.fitToContainer = function (main, canvas){
        canvas.width  = main.offsetWidth;
        canvas.height = main.offsetHeight;
    };
    
    this.drawEndScreen = function (score) {
        this.clearCanvas();
        gcx.fillStyle = "white";
        gcx.fillText("Score: " + score, W / 2 - 20, H / 2); 
    };
    
    this.drawBall = function (ball) {
        gcx.beginPath();
        gcx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2, false);
        gcx.fillStyle = ball.color;
        gcx.fill();
        gcx.closePath();
    };
    
    this.drawFlipper = function (flipper) {
	   gcx.beginPath();
       gcx.rect(flipper.x, flipper.y, 
       flipper.width, flipper.height);
       gcx.fillStyle = flipper.color;
       gcx.fill();
       gcx.closePath();
    };
    
    this.drawBlock = function (block) {
        gcx.beginPath();
        gcx.rect(block.x, block.y, 
        block.width, block.width);
        gcx.fillStyle = block.color;
        gcx.fill();
        gcx.closePath();
    };
    
    this.drawBlocks = function (blocks) {
       var border = 1;
       for (var i = 0; i < blocks.length; i++) {
            gcx.beginPath();
            gcx.rect(blocks[i].x, blocks[i].y, 
            blocks[i].width, blocks[i].width);
            gcx.fillStyle = blocks[i].colour;
            gcx.fill();
            gcx.closePath();
       }
    };
    
    this.drawScore = function (score) {
        gcx.fillStyle = "white";
        gcx.fillText("Score: " + score, W - 50, H - 10); 
    };
    
    this.drawDebug = function (debug) {
        var textArray = debug.split("+");
        gcx.fillStyle = "white";
        gcx.strokeStyle = "black";
        gcx.font = '8pt Arial';
        for (var i = 0; i < textArray.length; i++) {
            gcx.strokeText(textArray[i], 5, (i * 9) + 9);
            gcx.fillText(textArray[i], 5, (i * 9) + 9); 
        }
    };
    
    this.clearCanvas = function () {
        gcx.clearRect(0, 0, W, H);
    };
}