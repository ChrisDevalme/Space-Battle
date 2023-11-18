//Class for all the ships
class Ship {
    constructor(hull, firepower, accuracy) {
        this.hull = hull
        this.firepower = firepower
        this.accuracy = accuracy
        // this.attack = this.attack.bind(this);
    }
    //Include methods below
    attack(target) {
        if (Math.random() < this.accuracy) {
            target.hull -= this.firepower;
            return "Direct Hit!";
        }
        else {
            return "Too slow, Joe!";
        }
     }

     flee(Player, enemy, action) {
        displayText1(Player, enemy, action)
        return "You gave up! But kept your life in the process! GAME OVER. Final Score: " + scoreTally(Player, enemyShips)
     }
}

class PlayerShip extends Ship {
    constructor(hull, firepower, accuracy) {
        super(hull, firepower, accuracy)
    }
}

class EnemyShip extends Ship { //Getting negative numbers needs adressing
    constructor() {
        super(Math.floor(Math.random() * 4) + 3, Math.floor(Math.random() * 2) + 2, (Math.floor(Math.random() * 3) + 6)/10)
    }
}

///Loop to create alien ships 
const enemyShips = []

for (let i = 0; i < 6; i++){
    let newAlienShip = new EnemyShip()
    enemyShips.push(newAlienShip)
}

//Funtion to get final game score
function scoreTally(Player, arr){
    let finalScore = 50
    if (Player.hull < 0){
        finalScore -= 20
    }else{
    let deduction = 20 - Player.hull
    finalScore -= deduction; 
    }
    if (arr.length > 0) {
        finalScore -= (arr.length * 5);
    }
    return finalScore;
}
//Game text 
const displayText = document.getElementById("display-text");

function displayText1(Player, Enemy, action) {
    if(action === "atkBtn") {
        displayText.innerHTML = `
        <h2>Space Battle Status</h2>
        <h4>The enemy ship has been destroyed. Another one approaches!</h4>
        <h4>Player Ship Integrity: ${Player.hull}.</h4>
        <h4>There are ${enemyShips.length} enemy ships remaining</h4>
        <h4>Do you wish to stand your ground or flee ?</h4>
        `
    } else if (action === "fleeBtn") {
        displayText.innerHTML = `
        <h4>You gave up! But kept your life in the process! GAME OVER. Final Score: ${scoreTally(Player, enemyShips)}</h4>
        <a href="javascript: location. reload();"><button class="restart">RETRY</button></a>
        `
    } else if (action === "win") {
        displayText.innerHTML = `
        <h4>Your ship has destroyed all the invaders! Final Score: ${scoreTally(Player, enemyShips)}</h4>
        <a href="javascript: location. reload();"><button class="restart">RETRY</button></a>
        `
    } else if (action === "loss") {
        displayText.innerHTML = `
        <h4>Your ship has been destroyed! Final Score: ${scoreTally(Player, enemyShips)}</h4>
        <a href="javascript: location. reload();"><button class="restart">RETRY</button></a>
        `
    }
}
//Function to display damage upon hit
function flashRed(image) {
    image.style.backgroundColor = 'red'; // Change background to red
    setTimeout(() => {
      image.style.backgroundColor = ''; // Revert back to original background
    }, 125); // Duration for the red flash in milliseconds (e.g., 500ms)
  }
//Function to commence the battle 
function battle(Player, Enemy, action) {
    while (Player.hull > 0 && Enemy.hull > 0){
        Player.attack(Enemy);
        setInterval(flashRed(enemyImg), 50);
        if (enemyShips.length > 0){
            if(Enemy.hull >= 1) {
                Enemy.attack(Player);
                setInterval(flashRed(playerImg), 150);
            } 
            displayText1(Player, Enemy, action)
        }
        if(Enemy.hull <= 0) {
            enemyShips.shift();
            displayText1(Player, Enemy, action)
        }

        if(Player.hull <= 0) {
            displayText1(Player, Enemy, "loss");
            break;
        }

        if (enemyShips.length === 0){
            displayText1(Player, Enemy, "win")
        }
    }
}


///BUTTONS AND STYLES 
const USSAssembly = new PlayerShip(20, 5, .7)
const enemyImg = document.getElementById("enemy-img");
const playerImg = document.getElementById("player-img");
const atkBtn = document.getElementById("atk__btn");
const fleeBtn = document.getElementById("flee__btn");

atkBtn.addEventListener("click" , (e) => {
    battle(USSAssembly, enemyShips[0], "atkBtn");
    const audio = document.getElementById('audioPlayer');
    if (audio.paused) {
        audio.play();
    } else {
        audio.currentTime = 0; // Optional: Restart the audio from the beginning
    }
});

fleeBtn.addEventListener("click", (e) => {
    USSAssembly.flee(USSAssembly, enemyShips[0], "fleeBtn");
});
