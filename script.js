let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.style.position = "absolute";
handleResize();

let slider = document.getElementById("zigzagSlider");
let speedSlider = document.getElementById("speedSlider");
let stepsLabel = document.getElementById("stepsLabel");
let speedLabel = document.getElementById("speedLabel");

// let stopWidths = [];
// let stopHeights = [];

let animationFrameId = null;

redrawCanvas();
adjustRedrawSpeed();

// canvas.style.border = "solid 1px black";


function redrawCanvas() {
    drawCanvas(parseInt(slider.value));
}


function drawCanvas(zigzagSteps) {
    canvas.width = canvas.width;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    xOffset = canvas.width / 30;
    yOffset = canvas.height / 30;
    
    endPoint = rngHeight();
    startPoint = rngHeight();
    
    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 5;
    ctx.fillStyle = 'aqua';
    ctx.beginPath();
    ctx.moveTo(canvas.width - xOffset, endPoint);
    ctx.lineTo(canvas.width - xOffset, yOffset);
    ctx.lineTo(xOffset, yOffset);
    ctx.lineTo(xOffset, startPoint);
    drawZigzag(zigzagSteps);
    ctx.lineTo(canvas.width - xOffset, endPoint);
    ctx.stroke();
    ctx.fill();
    
    ctx.strokeStyle = 'aqua';
    ctx.lineWidth = 5;
    ctx.fillStyle = 'orange';
    ctx.beginPath();
    ctx.moveTo(canvas.width - xOffset, endPoint + xOffset);
    ctx.lineTo(canvas.width - xOffset, canvas.height - yOffset);
    ctx.lineTo(xOffset, canvas.height - yOffset);
    ctx.lineTo(xOffset, startPoint + xOffset);
    drawSecondZigzag();
    ctx.lineTo(canvas.width - xOffset, endPoint + xOffset);
    ctx.stroke();
    ctx.fill();
}

function adjustRedrawSpeed() {
    clearInterval(animationFrameId);
    let speed = parseInt(speedSlider.value);
    if (speed > 0) {
        let interval = 1000 / speed;
        animationFrameId = setInterval(() => {
            redrawCanvas();
        }, interval);
    } else {
        redrawCanvas();
    }
}

// loop();
// function loop(){
//     requestAnimationFrame(loop);
// }
function drawZigzag(stops){
    stops += 1;
    stopWidths = [];
    stopHeights = [];
    for(let i = 0; i < stops - 1; i++){
        stopWidths.push(xOffset + (((canvas.width - 2 * xOffset) / stops) * (i+1)));
        stopHeights.push(rngHeight());
        ctx.lineTo(stopWidths[i], stopHeights[i]);
    }
}

function drawSecondZigzag(){
    for(let i = 0; i < stopHeights.length; i++){
        ctx.lineTo(stopWidths[i], stopHeights[i] + xOffset);
    }
}

window.addEventListener('resize', handleResize);
function handleResize(){
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    const leftC = (window.innerWidth - canvas.width) / 2;
    const topC = (window.innerHeight - canvas.height) / 2;
    canvas.style.left = leftC + "px";
    canvas.style.top = topC + "px";
    
    drawCanvas(parseInt(document.getElementById("zigzagSlider").value));
}

function rngHeight(){
    return rng(canvas.height / 3, canvas.height - canvas.height / 3 - yOffset);
}

function rng(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

slider.oninput = function() {
    stepsLabel.textContent = this.value;
    redrawCanvas();
};

speedSlider.oninput = function() {
    speedLabel.textContent = this.value;
    adjustRedrawSpeed();
};