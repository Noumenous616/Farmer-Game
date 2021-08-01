

var canvas : any = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const farmerImg = new Image();
const bcg = new Image();
const houseImg = new Image();
const foodImg = new Image();
const foodImg1 = new Image();
const bonusImg = new Image();

const audioPickup = new Audio();
audioPickup.preload = 'auto';
audioPickup.src = './sound/pickup.mp3';
audioPickup.play();

const audioEndGame = new Audio();
audioEndGame.preload = 'auto';
audioEndGame.src = './sound/end.mp3';
audioEndGame.play();

farmerImg.src = './accets/farmer.png';
bcg.src = './accets/bcg.png';
houseImg.src = './accets/house.png';
foodImg.src = './accets/cabbage.png';
foodImg1.src = './accets/carrot.png';
bonusImg.src = './accets/bonus.png';


let box = 100;
let score = 0;
let timer = 20;

const counddownEl : any = document.getElementById('counddown')

setInterval(updateTimer, 1000)

function updateTimer() {
    counddownEl.innerHTML = `${timer}`
    timer--;
}

export class Cell {
    public x: number;
    public y: number;

    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public static createRandom(): Cell {
        return new Cell (
            Math.floor((Math.random() * 3 + 0)) * box,
            Math.floor((Math.random() * 5 + 0)) * box
        )
    }
}

let food = Cell.createRandom();
let food1 = Cell.createRandom();
let bonus = Cell.createRandom();


let house = {
    x: 130,
    y: 420
}

let farmer = {
    x: 130,
    y: 420
};

document.addEventListener('keydown', moveUp);

function moveUp(event : any) {
    if (event.keyCode == 37) {
        farmer.x -= 10;
    }
    if (event.keyCode == 38) {
        farmer.y -= 10;
    }
    if (event.keyCode == 39) {
        farmer.x += 10;
    }
    if (event.keyCode == 40) {
        farmer.y += 10;
    }
}

function draw() {
    ctx.drawImage(bcg, 0, 0);
    ctx.drawImage(houseImg, house.x, house.y);

    ctx.drawImage(farmerImg, farmer.x, farmer.y);
    ctx.drawImage(foodImg, food.x, food.y);
    ctx.drawImage(foodImg1, food1.x, food1.y);
    ctx.drawImage(bonusImg, bonus.x, bonus.y);

    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box * 0.1, box * 0.5);

    if(farmer.x == food.x && farmer.y == food.y) {
        audioPickup.play();
        score++;
        food = Cell.createRandom(); 
    }
    if(farmer.x == food1.x && farmer.y == food1.y) {
        audioPickup.play();
        score++;
        food1 = Cell.createRandom();  
    }
    if(farmer.x == bonus.x && farmer.y == bonus.y) {
        audioPickup.play();
        timer = timer + 5;
        bonus = Cell.createRandom();   
    }
    if (timer === -2) {
        if (farmer.x == house.x && farmer.y == house.y) {
            audioEndGame.play();
            location.reload();
            alert(`Game Over, your Score is: ${score}`);
            return;
        }
        audioEndGame.play();
        location.reload();
        alert(`Game Over, your Lose`);
    }
}

let game = setInterval(draw, 100)


