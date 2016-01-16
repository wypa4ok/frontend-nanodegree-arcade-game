const X_STEP = 100;
const Y_STEP = 85;
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = -150;
    this.y = 72 * getRandomInt(1,3);
    this.speed = getRandomInt(50,150);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 500){
        this.x+=this.speed*dt;
    } else {
        this.y = 55 +(85 * getRandomInt(0,2));
        this.x = -150;
        this.speed = getRandomInt(50,150);
    }
    //console.log(this.x);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    
    this.x = 200;
    this.y = 300;

    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function(dt){
    //this.checkColisions(allEnemies);
    //this.x*=dt;
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.checkColisions = function(enemies){
    for(enemy in enemies){
        if( this.isAround(enemies[enemy].x, enemies[enemy].y) ){
            this.x = 200;
            this.y = 300;
        }
    }
}

Player.prototype.isAround = function(x,y){
    if(  ((x+40)>this.x && (x-40)<this.x) && ((y-40)<this.y && (y+40)>this.y )  ){
        return true;
    } else return false;
}

Player.prototype.handleInput = function(input){

    switch(input){
        case 'left':
            if(this.x - X_STEP > -100){ this.x-=X_STEP; }
            break;
        case 'right':
            if(this.x + X_STEP < 500){ this.x += X_STEP; }
            break;
        case 'up':
            if(this.y - Y_STEP > -100){ this.y -= Y_STEP; }
            break;
        case 'down':
            if(this.y + Y_STEP < 450){ this.y += Y_STEP; }
            break;
    }

    //console.log("x= " + this.x + ", y= " + this.y);

}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var allEnemies = [];

for(var i=0; i<5; i++){
    allEnemies.push(new Enemy());
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
