const colorFill = 'black';
const colorGridStroke = 'white';
let strokeGridWeight, gridWidth, cellNum, cellSize, cycles, pieDiv;

function initialize() {
    strokeGridWeight = 1;
    gridWidth = 750;
    cellNum = 15;
    cellSize = gridWidth / cellNum; //force canvas to stay the same size
    cycles = 0;
    pieDiv = createDiv().style('font-size', '14pt');
}

function setup() {
    initialize();
    createCanvas(gridWidth, gridWidth);
    frameRate(1 / 3);
}

function draw() {
    if (cycles < 1) {
        // strokeGridWeight = 0;
        strokeGridWeight = 1;
        noLoop();
    }
    drawGrid(cellSize, cellNum);
    fill('yellow');
    squCtr(0, 0, cellSize, cellNum);
    drawCircle(floor(cellNum / 2), cellSize);
    cellNum = cellNum * 2 + 1;
    cellSize = gridWidth / cellNum;
    output();
    cycles--;
}

function drawCircle(radius, cWidth) {
    fill('red');
    for (let y = -floor(cellNum / 2); y <= floor(cellNum / 2); y++) {
        squCtr(Math.round(Math.sqrt((radius * radius) - (y * y))), y, cWidth, cellNum);
        squCtr(-Math.round(Math.sqrt((radius * radius) - (y * y))), y, cWidth, cellNum);
    };

    if (cellSize > 25) { // fudge
        squCtr(1, 7, cWidth, cellNum);
        squCtr(1, -7, cWidth, cellNum);
        squCtr(2, 7, cWidth, cellNum);
        squCtr(2, -7, cWidth, cellNum);
        squCtr(3, 6, cWidth, cellNum);
        squCtr(3, -6, cWidth, cellNum);
        squCtr(-1, 7, cWidth, cellNum);
        squCtr(-1, -7, cWidth, cellNum);
        squCtr(-2, 7, cWidth, cellNum);
        squCtr(-2, -7, cWidth, cellNum);
        squCtr(-3, 6, cWidth, cellNum);
        squCtr(-3, -6, cWidth, cellNum);
    }
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

function output() {
    pieDiv.html(`Cycles: ${cycles} - Size: ${nf(cellSize,0,4)}`);
}