

window.onload = function(){
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  const fps = 30
  setInterval(updateAll, 1000 / fps)
  canvas.addEventListener('mousemove', handlePaddle);
  blockReset();
}


let ballX = 600;
let ballY = 600;

let ballSpeedX = 5;
let ballSpeedY = 10;

const paddleYDistFromEdge = 40;
let paddleX = canvas.width / 2;
let paddleY = canvas.height - paddleYDistFromEdge;
const paddleThickness = 10;
const paddleLength = 100;

// Blocks
const numBlocks = 16;
const blockRows = 8;
const blockHeight = 30;
const blockWidth = 100;
let blockTruth = [...Array(blockRows)].map(e => Array(numBlocks));

//
//
//
//

function blockReset(){
  blockTruth.forEach((row) => {
    for(let i = 0; i < numBlocks; i++){
      row[i] = true;
    }
  });
}

function updateAll(){
  moveAll();
  drawAll();
}



function moveAll(){
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Edge conditions
  if(ballX <= 0){
    ballSpeedX *= -1;
  }
  if(ballX >= canvas.width){
    ballSpeedX *= -1;
  }
  if(ballY <= 0){
    ballSpeedY *= -1;
  }
  if(ballY >= canvas.height){
    ballSpeedY *= -1;
    ballReset();
  }

  let ballBrickCol = Math.floor(ballX / blockWidth);
  let ballBrickRow = Math.floor(ballY / blockHeight);



  // showXY(ballBrickCol + ',' + ballBrickRow, ballX, ballY, 'yellow');

  if(ballBrickCol >= 0 &&
    ballBrickRow < blockRows){
      // deletes block if mouse is hovering on existing block
      if(blockTruth[ballBrickRow][ballBrickCol]){
        blockTruth[ballBrickRow][ballBrickCol] = false

        let lastBallX = ballX - ballSpeedX;
        let lastBallY = ballY - ballSpeedY;
        let prevBlockCol = Math.floor(lastBallX / blockWidth);
        let prevBlokRow = Math.floor(lastBallY / blockWidth);
        if(prevBlockCol != ballBrickCol){
          ballSpeedX *= -1;

        }
        if(prevBlokRow != ballBrickRow){
          ballSpeedY *= -1;
        }
      }
    }

  // reflect ball
  let paddleTopEdgeY = canvas.height - paddleYDistFromEdge;
  let paddleBottomEdgeY = paddleTopEdgeY + paddleThickness;
  let paddleLeftEdgeX = paddleX;
  let paddleRightEdgeX = paddleLeftEdgeX + paddleLength;

  if(ballY >= paddleTopEdgeY && ballY <= paddleBottomEdgeY &&
      ballX >= paddleLeftEdgeX && ballX <= paddleRightEdgeX){
    ballSpeedY *= -1

    let centerOfPaddleX = paddleX - (paddleLength / 2);
    let ballDistanceFromPaddleCenterX = paddleX - paddleLength;
    ballSpeedX = ballDistanceFromPaddleCenterX * 0.025;
  }
}

function ballReset(){
  ballX = 500;
  ballY = 500;
}

function drawAll(){
  // background
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0, canvas.width, canvas.height);

  // ball
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
  ctx.fill();

  // paddle
  ctx.fillStyle = 'yellow';
  ctx.fillRect(paddleX, paddleY, paddleLength, paddleThickness);

// draw blocks
  drawBlocks();
}

function handlePaddle(e){
  paddleX = e.offsetX - (paddleLength / 2);
}

function drawBlocks(){
  let rowNum = 0;
  let blockNum = 0;
  blockTruth.forEach(row => {
    row.forEach(block => {
      if(block){
        ctx.fillStyle = 'blue';
        ctx.fillRect(blockWidth * blockNum, blockHeight * rowNum, blockWidth - 2, blockHeight - 2)
      }
      blockNum++;
    })
    blockNum = 0;
    rowNum++;
  })
}

//
//
//
//
//
let mouseX = 0;
let mouseY = 0;
function handleMousePos(e){
    mouseX = e.offsetX;
    mouseY = e.offsetY;
}

function showXY(words, textX, textY, fillColor){
  ctx.fillStyle = fillColor;
  ctx.fillText(words, textX, textY)
}

canvas.addEventListener('mousemove', handleMousePos);
