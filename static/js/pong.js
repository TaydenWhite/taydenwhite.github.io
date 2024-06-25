// static/js/pong.js
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('pongCanvas');
  const ctx = canvas.getContext('2d');

  // Set canvas size
  canvas.width = 800;
  canvas.height = 600;

  // Paddle and ball initial positions
  let paddleWidth = 10;
  let paddleHeight = 100;
  let paddleSpeed = 8;
  let paddle1Y = (canvas.height - paddleHeight) / 2;
  let paddle2Y = (canvas.height - paddleHeight) / 2;
  let ballSize = 10;
  let ballSpeedX = 5;
  let ballSpeedY = 5;
  let ballX = canvas.width / 2 - ballSize / 2;
  let ballY = canvas.height / 2 - ballSize / 2;

  function drawCanvas() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw paddles
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(10, paddle1Y, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - paddleWidth - 10, paddle2Y, paddleWidth, paddleHeight);

    // Draw ball
    ctx.fillRect(ballX, ballY, ballSize, ballSize);

    // Update ball position
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with walls
    if (ballY <= 0 || ballY + ballSize >= canvas.height) {
      ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    if (ballX <= paddleWidth + 10 && ballY + ballSize >= paddle1Y && ballY <= paddle1Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    }
    if (ballX + ballSize >= canvas.width - paddleWidth - 10 && ballY + ballSize >= paddle2Y && ballY <= paddle2Y + paddleHeight) {
      ballSpeedX = -ballSpeedX;
    }

    // Reset ball position if it goes off-screen
    if (ballX < 0 || ballX > canvas.width) {
      ballX = canvas.width / 2 - ballSize / 2;
      ballY = canvas.height / 2 - ballSize / 2;
      ballSpeedX = -ballSpeedX;
    }

    requestAnimationFrame(drawCanvas);
  }

  // Control paddles with arrow keys
  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && paddle2Y > 0) {
      paddle2Y -= paddleSpeed;
    }
    if (event.key === 'ArrowDown' && paddle2Y + paddleHeight < canvas.height) {
      paddle2Y += paddleSpeed;
    }
    if (event.key === 'w' && paddle1Y > 0) {
      paddle1Y -= paddleSpeed;
    }
    if (event.key === 's' && paddle1Y + paddleHeight < canvas.height) {
      paddle1Y += paddleSpeed;
    }
  });

  drawCanvas();
});