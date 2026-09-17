// Pong: move your paddle with the mouse or a finger; the computer tracks the ball.
// Originally written as a standalone page in 2024, ported into the site theme.
(function () {
  const canvas = document.getElementById("pong-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const pauseButton = document.getElementById("pong-pause");
  const W = canvas.width;
  const H = canvas.height;

  const colors = { bg: "#0f130e", paddle: "#e6eae3", ball: "#f095d1", net: "#354032", score: "#768e6f" };

  const paddle = (x) => ({ x, y: H / 2 - 50, width: 12, height: 100, score: 0 });
  const user = paddle(0);
  const com = paddle(W - 12);
  const ball = { x: W / 2, y: H / 2, radius: 9, speed: 6, velocityX: 5, velocityY: 5 };

  let paused = true;
  let started = false;

  function resetBall() {
    ball.x = W / 2;
    ball.y = H / 2;
    ball.speed = 6;
    ball.velocityX = -Math.sign(ball.velocityX || 1) * 5;
    ball.velocityY = (Math.random() > 0.5 ? 1 : -1) * 5;
  }

  function collides(b, p) {
    return p.x < b.x + b.radius && p.y < b.y + b.radius && p.x + p.width > b.x - b.radius && p.y + p.height > b.y - b.radius;
  }

  function update() {
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    if (ball.y + ball.radius > H || ball.y - ball.radius < 0) {
      ball.velocityY = -ball.velocityY;
      ball.y = Math.min(Math.max(ball.y, ball.radius), H - ball.radius);
    }

    const player = ball.x < W / 2 ? user : com;
    if (collides(ball, player)) {
      // Bounce angle depends on where the ball hits the paddle.
      const hit = (ball.y - (player.y + player.height / 2)) / (player.height / 2);
      const angle = (Math.PI / 4) * hit;
      const direction = ball.x < W / 2 ? 1 : -1;
      ball.velocityX = direction * ball.speed * Math.cos(angle);
      ball.velocityY = ball.speed * Math.sin(angle);
      ball.speed += 0.4;
    }

    if (ball.x - ball.radius < 0) {
      com.score++;
      resetBall();
    } else if (ball.x + ball.radius > W) {
      user.score++;
      resetBall();
    }

    com.y += (ball.y - (com.y + com.height / 2)) * 0.09;
  }

  function render() {
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = colors.net;
    for (let y = 0; y < H; y += 20) ctx.fillRect(W / 2 - 1, y, 2, 10);

    ctx.fillStyle = colors.score;
    ctx.font = "600 44px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(user.score, W / 4, 64);
    ctx.fillText(com.score, (3 * W) / 4, 64);

    ctx.fillStyle = colors.paddle;
    ctx.fillRect(user.x, user.y, user.width, user.height);
    ctx.fillRect(com.x, com.y, com.width, com.height);

    ctx.fillStyle = colors.ball;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fill();

    if (paused) {
      ctx.fillStyle = "rgba(15, 19, 14, 0.6)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = colors.paddle;
      ctx.font = "600 26px Inter, system-ui, sans-serif";
      ctx.fillText(started ? "Paused" : "Click or tap to play", W / 2, H / 2 + 9);
    }
  }

  function loop() {
    if (!paused) update();
    render();
    requestAnimationFrame(loop);
  }

  function movePaddle(clientY) {
    const rect = canvas.getBoundingClientRect();
    const y = ((clientY - rect.top) / rect.height) * H;
    user.y = Math.min(Math.max(y - user.height / 2, 0), H - user.height);
  }

  function setPaused(value) {
    paused = value;
    if (!value) started = true;
    if (pauseButton) pauseButton.textContent = paused ? (started ? "Resume" : "Play") : "Pause";
  }

  canvas.addEventListener("mousemove", (e) => movePaddle(e.clientY));
  canvas.addEventListener("touchmove", (e) => { movePaddle(e.touches[0].clientY); e.preventDefault(); }, { passive: false });
  canvas.addEventListener("click", () => { if (paused) setPaused(false); });
  canvas.addEventListener("touchstart", () => { if (paused) setPaused(false); }, { passive: true });
  if (pauseButton) pauseButton.addEventListener("click", () => setPaused(!paused));
  document.addEventListener("visibilitychange", () => { if (document.hidden) setPaused(true); });

  loop();
})();
