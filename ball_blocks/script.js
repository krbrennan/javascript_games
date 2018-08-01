canvas = document.getElementById('canvas');
ctx = canvas.getContext('2d');


const fps = 30
setInterval(updateAll, 1000 / fps)

let ballX = 100;
let ballY = 100;

let paddleX = canvas.width / 2;
let paddleY = canvas.height - 10;
const paddleThickness = 10;
const paddleLength = 60;

function updateAll(){
  ballX++;
  ballY++;
  // background
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0, canvas.width, canvas.height);

  // ball
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
  ctx.fill();

  // paddle
  ctx.fillStyle = 'white';
  ctx.fillRect(paddleX, paddleY, paddleLength, paddleThickness);
}

function handlePaddle(e){
  console.log(e)
}

// canvas.addEventListener('mouseover', handlePaddle);
canvas.addEventListener('mousemove', handlePaddle);
