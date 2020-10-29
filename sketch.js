const colorFill = 'black';
const colorGridStroke = 'white';
let strokeGridWeight, gridWidth, cellNum, cellSize, cycles, pieDiv;

function initialize() {
    strokeGridWeight = 1;
    gridWidth = 750;
    cellNum = 15;
    cellSize = gridWidth / cellNum; //force canvas to stay the same size
    cycles = 5;
    pieDiv = createDiv().style('font-size', '14pt');
}

function setup() {
    initialize();
    createCanvas(gridWidth, gridWidth);
    frameRate(1 / 3);
}

function draw() {
    if (cycles < 1) {
        strokeGridWeight = 0;
        noLoop();
    }
    drawGrid(cellSize, cellNum);
    fill('yellow');
    squCtr(0, 0, cellSize, cellNum);
    drawCircle(cellNum, cellSize);
    cellNum = cellNum * 2 + 1;
    cellSize = gridWidth / cellNum;
    output();
    cycles--;
}

function drawCircle(cNum, cWidth) {
    let radius = floor(cNum / 2);
    fill('red');

    for (let x = 0; x <= floor(cNum / 2); x++) {
        let y = round(sqrt((radius * radius) - (x * x)));
        squCtr(x, y, cWidth, cNum); // UR
        squCtr(x, -y, cWidth, cNum); // lR
        squCtr(-x, y, cWidth, cNum); // UR
        squCtr(-x, -y, cWidth, cNum); // LL
    };

    for (let y = 0; y <= floor(cNum / 2); y++) {
        let x = round(sqrt((radius * radius) - (y * y)));
        squCtr(x, y, cWidth, cNum); // UR
        squCtr(-x, y, cWidth, cNum); // UL
        squCtr(x, -y, cWidth, cNum); // LR
        squCtr(-x, -y, cWidth, cNum); // LL
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

function output() {
    pieDiv.html(`Diameter: ${cellNum} - Cell Size: ${nf(cellSize,0,4)}`);
}