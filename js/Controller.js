function Controller() {
    var canvas = document.getElementById("gameField"),
        fps = 30, 
        H = 450, 
        W = 300, 
        interval, 
        g = 0;

    var model = new Model(),
        view = new View();
    
    this.init = function () {
        canvas.height = H; 
        canvas.width = W;
        this.startGame();
        
        if(window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', function(event) {
                g = Math.round(event.gamma);
            });
        }
    };

    this.startGame = function () {
        clearInterval(interval);
        model = new Model();
        view = new View();
        model.createBlocks();
        interval = setInterval(this.updateGame, 1000/fps);
    };
    
    this.updateGame = function () {
        if (!model.getGameEnd()) {
            document.body.onkeydown = function(e){
                var key = 0.0;
                switch (e.keyCode) {
                    case 37: key = -100;
                        break;
                    case 39: key = 100;
                }
                model.updateFlipper(key);
            };
            model.updateFlipper(g);
            model.updateBall();
            model.calcFPS();
            view.updateDisplay(model.getBall(), model.getFlipper(), model.getBlocks(), model.getScore(), model.getDebug());
        } else {
            view.drawEndScreen(model.getScore());
        }
    };
}

var Controller = new Controller();
window.addEventListener("load", Controller.init(), false);