const colorFill = 'black';
const colorGridStroke = 'green';
const strokeGridWeight = 1;

let cellSize;
let cellNum;
let cycles;
let gridWidth;

function initialize() {
    gridWidth = 750;
    cellNum = 15;
    cellSize = gridWidth / cellNum;
    cycles = 4;
}

function setup() {
    initialize();
    createCanvas(gridWidth, gridWidth);
    frameRate(1 / 3);
}

function draw() {
    // if (cycles = 0) { strokeGridWeight = 0; }
    drawGrid(cellSize, cellNum);
    fill('yellow');
    squCtr(0, 0, cellSize, cellNum);
    drawCircle(floor(cellNum / 2), cellSize);
    cellNum = cellNum * 2 + 1;
    cellSize = gridWidth / cellNum;
    cycles--;
    if (cycles < 0) { noloop };
}

function drawCircle(radius, cWidth) {
    fill('red');
    for (let y = -floor(cellNum / 2); y <= floor(cellNum / 2); y++) {
        squCtr(Math.round(Math.sqrt((radius * radius) - (y * y))), y, cellSize, cellNum);
        squCtr(-Math.round(Math.sqrt((radius * radius) - (y * y))), y, cellSize, cellNum);
    };
}

function drawGrid(cWidth, cNum) {
    stroke(colorGridStroke);
    strokeWeight(strokeGridWeight);
    for (let x = 0; x < cNum; x++) {
        for (let y = 0; y < cNum; y++) {
            fill(colorFill);
            square(x * cellSize, y * cellSize, cWidth);
        }
    }
}

function squCtr(x, y, size, num) {
    rect(size * ((floor(num / 2)) + x), size * ((floor(num / 2)) - y), size, size);
}