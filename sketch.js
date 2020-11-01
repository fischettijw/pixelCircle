const colorFill = 'black';
const colorGridStroke = 'white';
const colorCenter = 'yellow';
const colorCircumference = 'red';

let strokeGridWeight, gridWidth, cellNum, cellSize, cycles, pieDiv;
let btnArray, btnLabels, btnFontSize, btnFontWidth;

function initialize() {
    strokeGridWeight = 1;
    gridWidth = 1024;
    cellNum = 15;
    cellSize = gridWidth / cellNum; //force canvas to stay the same size
    pieDiv = createDiv().style('font-size', '18pt');
    btnArray = [];
    createButtons();
}

function createButtons() {
    const btnNames = ['15 (~0.06 sec)', '31 (~0.12 sec)', '63 (~0.25 sec)',
        '127 (~0.5 sec)', '255 (~1 sec)', '511 (~2 sec)', '1023 (~4 sec)'
    ]; // does not need to be 15, 31, ...
    const btnSpacing = 5;
    const canvasMargin = 10;
    const fntSize = 18; // 12 to 36
    const btnWidth = fntSize * 10;
    const btnHeight = 2 * fntSize;
    const numButtons = btnNames.length;

    for (let btnNum = 0; btnNum < numButtons; btnNum++) {
        btnArray[btnNum] = createButton(btnNames[btnNum])
            .position(gridWidth + btnSpacing + canvasMargin,
                (2 * btnNum * fntSize) + ((btnNum + 1) * btnSpacing) + canvasMargin)
            .style(`font-size:${fntSize}pt;width: ${btnWidth}px; height: ${btnHeight}px;`);
        btnArray[btnNum].id(btnNames[btnNum]);
    }

    document.addEventListener('click', (e) => {
        let x = e.pageX;
        let y = e.pageY;
        if ((x > gridWidth + btnSpacing) && (x < gridWidth + btnSpacing + btnWidth)) {
            if ((y > btnSpacing) && (y < (numButtons * (btnSpacing + btnHeight)))) {
                let buttonNumber = floor(y / (btnHeight + btnSpacing));
                console.log(btnNames[buttonNumber]);
                // console.log(btns[buttonNumber].id());
                cellNum = 2 ** (buttonNumber + 4) - 1;
                cellSize = gridWidth / cellNum;
                if (cellNum > 500) {
                    strokeGridWeight = 0;
                } else {
                    strokeGridWeight = 1;
                }
                loop();
            }
        }
    });
}

function setup() {
    initialize();
    createCanvas(gridWidth, gridWidth);
    frameRate();
}

function draw() {
    drawGrid(cellSize, cellNum);
    fill(colorCenter);
    squCtr(0, 0, cellSize, cellNum);
    drawCircle(cellNum, cellSize);
    output();
    cellNum = (cellNum * 2) + 1;
    cellSize = gridWidth / cellNum;
    noLoop();
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
    pieDiv.html(`${sp(54)}Diameter: ${cellNum} - Cell/Pixel Ratio: ${nf(cellSize,0,2)}`);
}

function sp(n) {
    let htmlSpace = '&nbsp';
    let ss = "";
    for (i = 0; i < n; i++) {
        ss += htmlSpace
    }
    return ss;
}