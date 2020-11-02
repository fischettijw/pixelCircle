const colorFill = 'black';
const colorGridStroke = 'white';
const colorCenter = 'yellow';
const colorCircumference = 'red';

let strokeGridWeight, gridWidth, cellNum, cellSize, cycles, pieDiv;
let btnArray, btnLabels, btnFontSize, btnFontWidth, currentButton;

function initialize() {
    strokeGridWeight = 1;
    gridWidth = 1024;
    cellNum = 15;
    cellSize = gridWidth / cellNum; //force canvas to stay the same size
    pieDiv = createDiv().style('font-size', '18pt');
    btnArray = [];
    btnLabels = ['15 (~0.06 sec)', '31 (~0.12 sec)', '63 (~0.25 sec)',
        '127 (~0.5 sec)', '255 (~1 sec)', '511 (~2 sec)', '1023 (~6 sec)'
    ];
    currentButton = 0;
    document.title = btnLabels[currentButton];
    btnFontSize = 18;
    btnFontWidth = null;

    createButtons(btnArray, btnLabels, btnFontSize, btnFontWidth); // 'btnFontWidth' optional
}

function createButtons(btns, btnText, fntSz, fntWidth) {
    let spacing = 5;
    if (fntWidth == null) { fntWidth = 10 * fntSz } // fntWidth OPTIONAL
    for (i = 0; i < btnText.length; i++) {
        let y = i * ((2 * fntSz) + spacing); //i * 40;
        btns[i] = createButton(btnText[i]);
        btns[i].position(gridWidth + spacing, y + spacing);
        btns[i].style(`font-size:${fntSz}pt`);
        btns[i].style(`width: ${fntWidth}px; height: ${2*fntSz}px`);
        btns[i].id(i);
        let btnID = i; // IMPORTANT TO BE HERE WITH 'LET'
        document.getElementById(i).onclick = function() { btnClicked(btnID); }
    }
}

function btnClicked(buttonNumber) {
    cellNum = 2 ** (buttonNumber + 4) - 1;
    cellSize = gridWidth / cellNum;
    if (cellNum > 500) {
        strokeGridWeight = 0;
    } else {
        strokeGridWeight = 1;
    }
    currentButton = buttonNumber;
    document.title = btnLabels[currentButton];
    loop();
}

function setup() {
    initialize();
    // createCanvas(gridWidth, gridWidth);
    createCanvas(gridWidth, gridWidth).position(0, (1080 - 1024) / 2); // 1080 screen vertical pixels - 1024 caanvas height
    window.parent.document.body.style.zoom = 0.89; // zoom to fit
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