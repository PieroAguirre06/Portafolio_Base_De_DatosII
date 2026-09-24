// Minijuego: "Escolta al courier hasta el Ancient"
// Controles: flechas / A-D para moverte, esquiva los creeps.
// Cada ~6 segundos sobrevividos = una línea (unidad) desbloqueada. 5 líneas = victoria.

(function () {
  const canvas = document.getElementById('gameCanvas');
  if (!canvas) return; // esta página no tiene juego
  const ctx = canvas.getContext('2d');

  const startBtn = document.getElementById('startBtn');
  const livesEl = document.getElementById('lives');
  const floorEl = document.getElementById('floor');
  const floorItems = document.querySelectorAll('#floorList li');

  const W = canvas.width, H = canvas.height;
  const TOTAL_FLOORS = 5;
  const SECONDS_PER_FLOOR = 6;

  let player, creeps, keys, lives, floor, running, lastSpawn, floorTimer, lastTime;

  function resetState() {
    player = { x: W / 2 - 16, y: H - 50, w: 32, h: 32, speed: 6 };
    creeps = [];
    keys = {};
    lives = 3;
    floor = 0;
    running = false;
    lastSpawn = 0;
    floorTimer = 0;
    lastTime = 0;
    livesEl.textContent = lives;
    floorEl.textContent = floor;
    floorItems.forEach(li => li.classList.remove('unlocked'));
  }

  resetState();

  window.addEventListener('keydown', (e) => {
    keys[e.key] = true;
  });
  window.addEventListener('keyup', (e) => {
    keys[e.key] = false;
  });

  function spawnCreep() {
    const isDire = Math.random() > 0.5;
    creeps.push({
      x: Math.random() * (W - 26),
      y: -26,
      w: 26,
      h: 26,
      speed: 2.2 + Math.random() * 1.8 + floor * 0.3,
      color: isDire ? '#A63A3A' : '#4E8B4A'
    });
  }

  function update(dt) {
    // movimiento del jugador
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) player.x -= player.speed;
    if (keys['ArrowRight'] || keys['d'] || keys['D']) player.x += player.speed;
    if (keys['ArrowUp'] || keys['w'] || keys['W']) player.y -= player.speed;
    if (keys['ArrowDown'] || keys['s'] || keys['S']) player.y += player.speed;

    player.x = Math.max(0, Math.min(W - player.w, player.x));
    player.y = Math.max(H * 0.45, Math.min(H - player.h, player.y));

    // spawn de creeps
    lastSpawn += dt;
    const spawnRate = Math.max(420, 900 - floor * 90);
    if (lastSpawn > spawnRate) {
      spawnCreep();
      lastSpawn = 0;
    }

    // mover creeps y detectar colisiones
    for (let i = creeps.length - 1; i >= 0; i--) {
      const c = creeps[i];
      c.y += c.speed;

      const hit = c.x < player.x + player.w && c.x + c.w > player.x &&
                  c.y < player.y + player.h && c.y + c.h > player.y;
      if (hit) {
        creeps.splice(i, 1);
        loseLife();
        continue;
      }
      if (c.y > H) creeps.splice(i, 1);
    }

    // progreso de línea
    floorTimer += dt;
    if (floorTimer > SECONDS_PER_FLOOR * 1000) {
      floorTimer = 0;
      advanceFloor();
    }
  }

  function loseLife() {
    lives--;
    livesEl.textContent = lives;
    if (lives <= 0) {
      endGame(false);
    }
  }

  function advanceFloor() {
    floor++;
    floorEl.textContent = floor;
    const li = document.querySelector(`#floorList li[data-floor="${floor}"]`);
    if (li) li.classList.add('unlocked');
    if (floor >= TOTAL_FLOORS) {
      endGame(true);
    }
  }

  function endGame(won) {
    running = false;
    startBtn.textContent = won ? '🏆 ¡Victoria! Reiniciar' : '💀 Derrota — Reintentar';
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // camino (lane) de fondo
    ctx.fillStyle = '#1a1610';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = '#35301F';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, H);
      ctx.stroke();
    }

    // Ancient arriba
    ctx.fillStyle = '#C9A15D';
    ctx.font = '28px serif';
    ctx.fillText('🌳 Ancient', W / 2 - 40, 34);

    // creeps
    creeps.forEach(c => {
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, c.w, c.h);
    });

    // jugador (courier)
    ctx.font = '28px serif';
    ctx.fillText('🐦', player.x, player.y + 26);

    if (!running) {
      ctx.fillStyle = 'rgba(20,17,13,.75)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#EAE2CF';
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      const label = lives <= 0 ? 'Derrota — presiona Iniciar'
        : floor >= TOTAL_FLOORS ? '¡Victoria! Curso completado'
        : 'Presiona Iniciar para jugar';
      ctx.fillText(label, W / 2, H / 2);
      ctx.textAlign = 'left';
    }
  }

  function loop(time) {
    if (!lastTime) lastTime = time;
    const dt = time - lastTime;
    lastTime = time;
    if (running) update(dt);
    draw();
    requestAnimationFrame(loop);
  }

  startBtn.addEventListener('click', () => {
    resetState();
    running = true;
    startBtn.textContent = '▶ Jugando...';
  });

  requestAnimationFrame(loop);
})();
