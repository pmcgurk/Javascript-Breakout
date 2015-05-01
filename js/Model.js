/*jslint node: true, browser: true */
"use strict";

function Model() {
    var canvas = document.getElementById("gameField"),
        H = canvas.height, 
        W = canvas.width,
        blocksLeft = 0, 
        score = 0,
        blocks = [], 
        sec = 0,
        fps = 0,
        frame = 0,
        gameEnd = false,
        ball = { 
            x: W / 2, 
            y: H / 4, 
            radius: 7, 
            color: "#CC0000", 
            vx: 0, 
            vy: 13
        },
        flipper = { 
            width: 70,
            height: 15,
            x: W / 2 - 35, // minus half of width
            y: H - (H / 10),
            vx: 2,
            direction: 0,
            color: "#9933CC"
    };
   
    this.updateBall = function () {
        if (blocksLeft === 0) {
            gameEnd = true;
        }
        var colFlipper = this.checkFlipperCollision(ball);
        var colBlock = this.checkBlockCollision();
        // if ball hasn't collid with flipper or block,
        if (!colFlipper && !colBlock) {
            // apply normal bountry checks, reflect.
            if(ball.y + ball.radius > H) {
                // hit bottom
                gameEnd = true;
                ball.vy *= -1;
            } else if (ball.y - ball.radius < 0) {
                // hit top
                ball.vy *= -1;
            }
            ball.x += ball.vx;
            if(ball.x + ball.radius > W) {
                // hit left
                ball.vx *= -1;
            } else if (ball.x - ball.radius < 0) {
                // hit right
                ball.vx *= -1;
            }
        } else {
            // flip velocities.
            ball.vy *= -1;
            ball.vx *= -1;
        }
        // add resulting velocities.
        ball.y += ball.vy;
        ball.x += ball.vx;
    };
    
    this.checkFlipperCollision = function (ball) {
        if (ball.x + ball.vx > flipper.x && ball.x + ball.vx < flipper.x + flipper.width) {
            if (ball.y + ball.vy > flipper.y && ball.y + ball.vy < flipper.y + flipper.height) {
                // works out the position on the flipper the ball hits, changes x accordingly.
                var hitpos = ball.x - flipper.x - (flipper.width / 2);
                ball.vx = hitpos / 10 * -1;
                return true;
            }
        }
        return false;
    };
    
    this.checkBlockCollision = function () {
        // loop through array of blocks
        for (var i = 0; i < blocks.length; i++) {
            // check if they are collided
            if (ball.x + ball.radius + ball.vx > blocks[i].x && ball.x - ball.radius + ball.vx < blocks[i].x + blocks[i].width) {
                if (ball.y + ball.radius > blocks[i].y && ball.y + ball.vy + ball.radius < blocks[i].y + blocks[i].width) {
                    // if they have, remove block, decrement blocks left, add to score, return true.
                    blocks[i] = "";
                    blocksLeft--;
                    score += 1;
                    return true;
                }
            }
        }
        return false;
    };
    
    this.updateFlipper = function (direction) {
        if (flipper.x - flipper.vx > 0 && flipper.x + flipper.vx + flipper.width < W) {
            if (direction > 0) {
                flipper.x += flipper.vx;
            } else if (direction < 0) {
                flipper.x -= flipper.vx;
            }
        }
    };

    this.createBlocks = function () {
        var colours = ['#CC0000', '#FF8800', '#669900', '#0099CC'],
            x = 0, 
            y = 0, 
            width = 20, 
            colour = "",
            j = 0,
            gap = 0.5;
        
        for (var i = 0; i < 52; i++) {
            // new row
            if (i % 13 === 0) {
                y = y + width + gap;
                colour = colours[j++];
                x = 0;
            }
            x = x + width + gap;
            blocks[i] = { 
                x: x, 
                y: y, 
                width: width, 
                colour: colour
            };
        }
        blocksLeft = blocks.length;
    };

    this.calcFPS = function () {
        var dt = new Date();
        var nsec = dt.getSeconds();
        if (sec !== nsec) {
            fps = frame;
            sec = nsec;
            frame = 0;
        } else {
            frame++;
        }
    };
    
    this.getDebug = function () {
      return "FPS: " + fps + "++" + 
             "Ball:+Position: (" + Math.round(ball.x) + "," + Math.round(ball.y) + ")+" + 
             "Velocity: (" + Math.round(ball.vx) + "," + Math.round(ball.vy) + ")++" +
             "Flipper:+" +
             "Position: (" + Math.round(flipper.x) + "," + flipper.y + ")+" + 
             "Direction: " + flipper.direction / 150+ "+" +
             "X: " + flipper.x + "++" +  
             "Blocks Left: " + blocksLeft;
    };
    
    this.getScore = function () {
        return score;
    };
    
    this.getBall = function() {
        return ball;
    };
    
    this.getFlipper = function() {
        return flipper;
    };
    
    this.getBlocks = function () {
        return blocks;
    };
    
    this.getFPS = function () {
        return fps;
    };
    
    this.getGameEnd = function () {
        return gameEnd;
    };
}