canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');

const fps = 30
setInterval(updateAll, 1000 / fps)

let ballX = 600;
let ballY = 600;

let ballSpeedX = 5;
let ballSpeedY = 5;

let paddleX = canvas.width / 2;
let paddleY = canvas.height - 10;
const paddleThickness = 10;
const paddleLength = 60;

function updateAll(){
  ballX += ballSpeedX;
  ballY += ballSpeedY;
// update ball trajectory if it exceeds bounds of the canvas
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
  }

  // background
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0, canvas.width, canvas.height);

  // ball
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
  ctx.fill();
  // handleBall();

  // paddle
  ctx.fillStyle = 'white';
  ctx.fillRect(paddleX, paddleY, paddleLength, paddleThickness);
}

function handlePaddle(e){
  paddleX = e.offsetX - (paddleLength / 2);
}

// function handleBall(e){
//   ctx.fillStyle = 'white';
//   ctx.beginPath();
//   ctx.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
//   ctx.fill();
//
// }

// function showXY(e){
//   console.log(e)
// }

canvas.addEventListener('mousemove', handlePaddle);
// canvas.addEventListener('mousemove', showXY);
