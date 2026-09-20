// DOM Element References
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");
const musicIcon = document.getElementById("musicIcon");

let scaleFactor = 1;
let isPlaying = false;

// 1. Background Music Toggle System
musicToggle.addEventListener("click", () => {
  if (isPlaying) {
    bgMusic.pause();
    musicIcon.textContent = "🎵";
  } else {
    bgMusic.play();
    musicIcon.textContent = "🔊";
  }
  isPlaying = !isPlaying;
});

// 2. Typewriter Effect
const textToType = "Hey Beautiful, Will You Marry Me?";
const targetHeading = document.getElementById("typewriterText");
let charIndex = 0;

function typeEffect() {
  if (charIndex < textToType.length) {
    targetHeading.textContent += textToType.charAt(charIndex);
    charIndex++;
    setTimeout(typeEffect, 70);
  }
}
window.addEventListener("DOMContentLoaded", typeEffect);

// 3. Runaway "No" Button Effect
function moveNoButton() {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth - 40);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight - 40);

  noBtn.style.position = "fixed";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  scaleFactor += 0.15;
  yesBtn.style.transform = `scale(${scaleFactor})`;
}

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("click", moveNoButton);

// 4. Modal Handlers
yesBtn.addEventListener("click", () => {
  document.getElementById("celebrationModal").classList.add("active");
  startConfetti();
});

function openLetter() {
  document.getElementById("letterModal").classList.add("active");
}

function closeModal(id) {
  document.getElementById(id).classList.remove("active");
}

// 5. Floating Ambient Hearts Canvas Effect
const heartsCanvas = document.getElementById("hearts-canvas");
const hCtx = heartsCanvas.getContext("2d");

heartsCanvas.width = window.innerWidth;
heartsCanvas.height = window.innerHeight;

let heartsArray = [];

class Heart {
  constructor() {
    this.x = Math.random() * heartsCanvas.width;
    this.y = heartsCanvas.height + Math.random() * 100;
    this.size = Math.random() * 15 + 10;
    this.speedY = Math.random() * 1.5 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.3;
  }
  update() {
    this.y -= this.speedY;
    if (this.y < -20) {
      this.y = heartsCanvas.height + 20;
      this.x = Math.random() * heartsCanvas.width;
    }
  }
  draw() {
    hCtx.globalAlpha = this.opacity;
    hCtx.fillStyle = "#ff3366";
    hCtx.font = `${this.size}px serif`;
    hCtx.fillText("❤️", this.x, this.y);
  }
}

function initHearts() {
  heartsArray = [];
  for (let i = 0; i < 25; i++) {
    heartsArray.push(new Heart());
  }
}

function animateHearts() {
  hCtx.clearRect(0, 0, heartsCanvas.width, heartsCanvas.height);
  heartsArray.forEach(h => {
    h.update();
    h.draw();
  });
  requestAnimationFrame(animateHearts);
}

initHearts();
animateHearts();

// 6. Confetti Particle Canvas
const confettiCanvas = document.getElementById("confetti-canvas");
const cCtx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let particles = [];

function startConfetti() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1
    });
  }
  animateConfetti();
}

function animateConfetti() {
  cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  particles.forEach((p) => {
    p.y += p.speedY;
    p.x += p.speedX;
    cCtx.fillStyle = p.color;
    cCtx.beginPath();
    cCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    cCtx.fill();
  });
  if (particles.some(p => p.y < confettiCanvas.height)) {
    requestAnimationFrame(animateConfetti);
  }
}

window.addEventListener("resize", () => {
  heartsCanvas.width = window.innerWidth;
  heartsCanvas.height = window.innerHeight;
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
});