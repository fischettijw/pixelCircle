const colorGridStroke = 'black';
const strokeGridWeight = 0;

let cellSize;
let cellNum;
let cycles;

function initialize() {
    cellSize = 60;
    cellNum = 15;
    cycles = 6;
}

function setup() {
    initialize();
    createCanvas(cellSize * cellNum * 1.2, cellSize * cellNum * 1.2);
    frameRate(1 / 3);
    // createCanvas(cellSize * cellNum, cellSize * cellNum);
    // background(0);
    // drawGrid(cellSize, cellNum);
    // fill('yellow');
    // squCtr(0, 0, cellSize, cellNum);
    // drawCircle(floor(cellNum / 2), cellSize);
}

function draw() {
    // if (cycles = 0) { strokeGridWeight = 0; }
    drawGrid(cellSize, cellNum);
    fill('yellow');
    squCtr(0, 0, cellSize, cellNum);
    drawCircle(floor(cellNum / 2), cellSize);
    cellSize /= 2;
    cellNum = cellNum * 2 + 1;
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
            fill('black');
            square(x * cellSize, y * cellSize, cWidth);
        }
    }
}

function squCtr(x, y, size, num) {
    rect(size * ((floor(num / 2)) + x), size * ((floor(num / 2)) - y), size, size);
}