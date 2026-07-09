const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.exploded = false;
    this.particles = [];
    this.lifespan = 100;
  }

  explode() {
    const numParticles = 30;
    for (let i = 0; i < numParticles; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const speed = random(2, 4);
      this.particles.push(
        new Particle(this.x, this.y, angle, speed, this.color)
      );
    }
  }

  update() {
    if (!this.exploded) {
      this.explode();
      this.exploded = true;
    }

    this.particles.forEach((p) => p.update());
    this.particles = this.particles.filter((p) => p.lifespan > 0);
  }

  draw() {
    this.particles.forEach((p) => p.draw());
  }
}

class Particle {
  constructor(x, y, angle, speed, color) {
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.color = color;
    this.lifespan = 100;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05; // Gravity
    this.lifespan -= 1;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, 2 * Math.PI);
    ctx.fill();
  }
}

const fireworks = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.05) {
    fireworks.push(
      new Firework(
        random(0, canvas.width),
        random(0, canvas.height / 2),
        `hsl(${random(0, 360)}, 100%, 60%)`
      )
    );
  }

  fireworks.forEach((f) => {
    f.update();
    f.draw();
  });

  requestAnimationFrame(animate);
}

animate();
