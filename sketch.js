const colorFill = 'black';
const colorGridStroke = 'white';
const colorCenter = 'yellow';
const colorCircumference = 'red';
const btnHeight = 50;
const btnSpacing = 20;
// const btnSpaceV = 40;
let strokeGridWeight, gridWidth, cellNum, cellSize, cycles, pieDiv;
let btns;

function initialize() {
    strokeGridWeight = 1;
    gridWidth = 900;
    cellNum = 15;
    cellSize = gridWidth / cellNum; //force canvas to stay the same size
    pieDiv = createDiv().style('font-size', '18pt');
    btns = [];
    createButtons(btns);
}

function createButtons(myButtons) {
    let fntSize = 18;
    let btnWidth = 150;

    for (let btnNum = 0; btnNum < 6; btnNum++) {
        myButtons[btnNum] = createButton("button " + btnNum)
            .position(gridWidth + btnSpacing,
                (2 * btnNum * btnHeight) + ((btnNum + 1) * btnSpacing))
            .style(`font-size:${fntSize}pt;width: ${btnWidth}px;`);
    }

    document.addEventListener('click', (e) => {
        let x = e.pageX;
        let y = e.pageY;

        console.log(`X: ${e.x} - Y: ${e.y}`);
    });
}

function setup() {
    initialize();
    createCanvas(gridWidth, gridWidth);
    frameRate(1 / 5);
    noLoop();

}

function draw() {
    if (cellNum > 500) {
        strokeGridWeight = 0;
        noLoop();
    }
    drawGrid(cellSize, cellNum);
    fill(colorCenter);
    squCtr(0, 0, cellSize, cellNum);
    drawCircle(cellNum, cellSize);
    output();
    cellNum = (cellNum * 2) + 1;
    cellSize = gridWidth / cellNum;
}

function drawCircle(cNum, cWidth) {
    let radius = floor(cNum / 2);
    fill(colorCircumference);

    for (let x = -floor(cNum / 2); x <= floor(cNum / 2); x++) {
        let y = round(sqrt((radius * radius) - (x * x)));
        squCtr(x, y, cWidth, cNum); // Upper
        squCtr(x, -y, cWidth, cNum); // lower
    };

    for (let y = -floor(cNum / 2); y <= floor(cNum / 2); y++) {
        let x = round(sqrt((radius * radius) - (y * y)));
        squCtr(x, y, cWidth, cNum); // Right
        squCtr(-x, y, cWidth, cNum); // Left
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
    pieDiv.html(`${sp(43)}Diameter: ${cellNum} - Cell/Pixel Ratio: ${nf(cellSize,0,2)}`);
}

function sp(n) {
    let htmlSpace = '&nbsp';
    let ss = "";
    for (i = 0; i < n; i++) {
        ss += htmlSpace
    }
    return ss;
}