const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Configuration - Tweaked for "Smooth & Minimal" look
const particleCount = 60; // Reduced from 100 for a cleaner look
const connectionDistance = 120;
const mouseDistance = 180;
const particleColor = 'rgba(0, 168, 255, 0.3)'; // More transparent (was 0.5)

// Mouse state
const mouse = { x: null, y: null };

class Particle {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    // Drastically reduced velocity for "floating" effect
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 2 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    // Bounce off edges
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;

    // Mouse interaction: Softened
    if (mouse.x != null) {
      let dx = mouse.x - this.x;
      let dy = mouse.y - this.y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < mouseDistance) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (mouseDistance - distance) / mouseDistance;
        // Reduced force multiplier from 0.6 to 0.2 for gentler interaction
        const directionX = forceDirectionX * force * 0.2;
        const directionY = forceDirectionY * force * 0.2;

        this.vx += directionX;
        this.vy += directionY;
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = particleColor;
    ctx.fill();
  }
}

function init() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();

    // Connect particles
    for (let j = i; j < particles.length; j++) {
      let dx = particles[i].x - particles[j].x;
      let dy = particles[i].y - particles[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);

      let mouseDx = mouse.x - particles[i].x;
      let mouseDy = mouse.y - particles[i].y;
      let distToMouse = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);

      if (distance < connectionDistance) {
        // Base opacity calculation
        let opacity = 1 - (distance / connectionDistance);

        // Further reduced global opacity for subtlety
        opacity *= 0.4;

        if (mouse.x != null && distToMouse < mouseDistance) {
          // Boost opacity slightly near mouse, but keep it smooth
          opacity *= 2.5;
          if (opacity > 0.8) opacity = 0.8; // Cap max opacity

          ctx.strokeStyle = `rgba(0, 168, 255, ${opacity})`;
          ctx.lineWidth = 0.8; // Thinner lines
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        } else {
          // Very faint background connections
          ctx.strokeStyle = `rgba(0, 168, 255, ${opacity * 0.5})`;
          ctx.lineWidth = 0.3;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  requestAnimationFrame(animate);
}

// Event Listeners
window.addEventListener('resize', init);
window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});
window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

init();
animate();
