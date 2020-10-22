const cellSize = 7;
const cellNum = 109;
const colorGridStroke = 'black';
const strokeGridWeight = 1;

let cX;
let cY;

function initialize() {
    cX = floor(cellNum / 2);
    cY = floor(cellNum / 2);
}

function setup() {
    initialize();
    createCanvas(cellSize * cellNum, cellSize * cellNum);
    background(0);
    drawGrid(cellSize, cellNum);
    fill('yellow');
    squCtr(0, 0, cellSize, cellNum);
    drawCircle(floor(cellNum / 2), cellSize);
}

function draw() {

}

function drawCircle(radius, cWidth) {
    fill('red');
    // square(0 * cWidth, radius * cWidth, cWidth)
    // square(radius * cWidth, 0 * cWidth, cWidth)
    // square(2 * radius * cWidth, radius * cWidth, cWidth)
    // square(radius * cWidth, 2 * radius * cWidth, cWidth)
    for (let y = -floor(cellNum / 2); y < floor(cellNum / 2); y++) {
        squCtr(Math.round(Math.sqrt((radius * radius) - (y * y))), y, cellSize, cellNum);
    };

}

function drawGrid(cWidth, cNum) {
    stroke(colorGridStroke);
    strokeWeight(strokeGridWeight);
    for (let x = 0; x < cNum; x++) {
        for (let y = 0; y < cNum; y++) {
            fill('green');
            square(x * cellSize, y * cellSize, cWidth);
        }
    }
}

function squCtr(x, y, size, num) {
    rect(size * ((floor(num / 2)) + x), size * ((floor(num / 2)) - y), size, size);
}