const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let blobs = [];

// Colors: Neon Blue, Dark Purple, Cyan
const colors = ['#00A8FF', '#6c5ce7', '#00d2d3'];

class Blob {
  constructor() {
    this.init();
  }

  init() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.radius = Math.random() * 100 + 50; // Random radius between 50 and 150
    this.vx = (Math.random() - 0.5) * 0.5; // Slow velocity
    this.vy = (Math.random() - 0.5) * 0.5;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.alpha = Math.random() * 0.2 + 0.05; // Low opacity
    this.angle = Math.random() * Math.PI * 2;
    this.angleSpeed = (Math.random() - 0.5) * 0.02;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.angle += this.angleSpeed;

    // Bounce off walls
    if (this.x < -this.radius) this.x = width + this.radius;
    if (this.x > width + this.radius) this.x = -this.radius;
    if (this.y < -this.radius) this.y = height + this.radius;
    if (this.y > height + this.radius) this.y = -this.radius;

    // Mouse interaction
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 200) {
      this.x -= dx * 0.005;
      this.y -= dy * 0.005;
    }
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;

    // Draw an amorphous shape (blob)
    ctx.beginPath();
    ctx.moveTo(this.radius * 0.6, 0);
    ctx.bezierCurveTo(this.radius, this.radius * 0.5, this.radius * 0.5, this.radius, 0, this.radius * 0.8);
    ctx.bezierCurveTo(-this.radius * 0.5, this.radius, -this.radius, this.radius * 0.5, -this.radius * 0.6, 0);
    ctx.bezierCurveTo(-this.radius, -this.radius * 0.5, -this.radius * 0.5, -this.radius, 0, -this.radius * 0.8);
    ctx.bezierCurveTo(this.radius * 0.5, -this.radius, this.radius, -this.radius * 0.5, this.radius * 0.6, 0);
    ctx.fill();

    ctx.restore();
  }
}

const mouse = { x: width / 2, y: height / 2 };

window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  // Re-init blobs on resize if needed, or just keep them
  if (blobs.length === 0) {
    for (let i = 0; i < 15; i++) {
      blobs.push(new Blob());
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  blobs.forEach(blob => {
    blob.update();
    blob.draw();
  });

  requestAnimationFrame(animate);
}

window.addEventListener('resize', resize);
resize();
animate();
