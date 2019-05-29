// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x=x;
    this.y=y;
    this.speed=Math.floor(Math.random() * 300 + 100);

};

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
     if (this.x <= 505)
    this.x += this.speed* dt;
  else
    this.x = 0;
};

var gems=function(x,y){
    this.x=x;
    this.y=y;
    this.sprite='images/Gem.png';
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
gems.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-princess-girl.png';
};

Player.prototype.update=function(){

}
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
///////////////////////////////////////////////////////////////////////
Player.prototype.handleInput = window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
    }
    switch (event.keyCode) {
        case 37:
            player.x-=50;
            break;
        case 39:
            player.x+=50;
            break;
        case 38:
            player.y-=50;
            break;
        case 40:
            player.y+=50;
            break;
        default:
            return; // Quit when this doesn't handle the key event.
    }
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
}, true);
///////////////////////////////////////////////////////////////////
var modal = document.getElementById('myModal');
var close = document.getElementsByClassName("close")[0];
function winning(){
    modal.style.display = "block";

    close.onclick = function() {
        modal.style.display = "none";
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

///////////////////////////////////////////////////////////////////
function checkCollisions(){
    // check for collision between enemy and player
    var playerX=player.x ;
    var playerY=player.y;

    allEnemies.forEach(function(enemy) {
      if ( playerX + 50 >= enemy.x && playerX - 50 <= enemy.x && playerY + 50 >= enemy.y && playerY- 50 <= enemy.y) {
          player.x = 200;
          player.y = 400;
      }
    });
    //if the player reached the gem he wins the game
    if ( playerX + 50>= gem.x && playerX - 50 <= gem.x && playerY + 50 >= gem.y && playerY - 50 <= gem.y) {
          winning();
          player.x = 200;
          player.y = 400;
      };
    //if the player reached the top of the canvas reset player position
    if (playerY<=1) {
        player.x=200;
        player.y=400;
    }
    

    //if the player tries to pass the canvas
    if (playerY > 400) {
        player.y = 400;
    } else if (playerX > 400) {
        player.x = 400;
    } else if (playerX < 1) {
        player.x= 1;
    }
}
///////////////////////////////////////////////////////////////////
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
//var width = 110,height = 80;
var enemies = [50, 140, 220];
var startPosition = enemies[Math.floor(Math.random() * enemies.length)]; 
// create set of enemies
for (var i = 0; i < 3; i++) {
    enemy = new Enemy(
        Math.floor(Math.random() * ((-300) - (-150) + 1) + -150),
        enemies[i],
        (Math.random() * (300 - 200) + 200) 
    );
    allEnemies.push(enemy);
}

let player = new Player(200, 400, 50);
let gem=new gems(300,50);