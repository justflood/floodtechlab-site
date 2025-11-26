// Konami Code Sequence
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a"
];

let konamiIndex = 0;

// Listen for keydown events
document.addEventListener("keydown", (e) => {
  // Check if the key matches the current step in the sequence
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;

    // If the full code is entered
    if (konamiIndex === konamiCode.length) {
      activateMatrixEffect();
      konamiIndex = 0; // Reset index
    }
  } else {
    konamiIndex = 0; // Reset if a wrong key is pressed
  }
});

function activateMatrixEffect() {
  console.log("Access Granted: Matrix Mode Activated");

  // Create Canvas Overlay
  const canvas = document.createElement("canvas");
  canvas.id = "matrix-canvas";
  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");

  // Set canvas to full screen
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Matrix Characters
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+";
  const charArray = chars.split("");

  const fontSize = 16;
  const columns = canvas.width / fontSize;

  // Array of drops - one per column
  const drops = [];
  for (let x = 0; x < columns; x++) {
    drops[x] = 1;
  }

  // Drawing the characters
  function draw() {
    // Black BG for the canvas
    // Translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0"; // Green text
    ctx.font = fontSize + "px monospace";

    // Looping over drops
    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      // Sending the drop back to the top randomly after it has crossed the screen
      // Adding a randomness to the reset to make the drops scattered on the Y axis
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }

      // Incrementing Y coordinate
      drops[i]++;
    }
  }

  const interval = setInterval(draw, 33);

  // Close on Click
  canvas.addEventListener("click", () => {
    clearInterval(interval);
    document.body.removeChild(canvas);
  });

  // Auto Close after 10 seconds
  setTimeout(() => {
    if (document.body.contains(canvas)) {
      clearInterval(interval);
      document.body.removeChild(canvas);
    }
  }, 10000);
}
