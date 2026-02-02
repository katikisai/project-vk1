import './style.css';

// Using a cute Owl emoji/SVG as the source for simplicity
// Could also use a GIF URL like 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExM2Q...'
const cuteOwlSrc = "/owl-snowy.gif";
// Or a fallback if that link breaks:
// const cuteOwlSrc = "https://media.tenor.com25/25/sticker-cute.gif"

document.querySelector('#app').innerHTML = `
  <canvas id="confetti-canvas"></canvas>
  
  <div class="container" id="main-card">
    <img src="${cuteOwlSrc}" alt="Cute Owl" class="cute-img" id="hero-img">
    <h1 id="question-text">kalyani will you be my valentine?</h1>
    
    <div class="buttons" id="btn-container">
      <button class="btn-yes" id="yes-btn">Yes 💖</button>
      <button class="btn-no" id="no-btn">No</button>
    </div>
    
    <p class="shy-text" id="shy-text">Try saying "No" 😈</p>

    <!-- Success Message (Hidden Initiall) -->
    <div class="success-message" id="success-msg">
      <h1>YAYYY! 🎉💖</h1>
      <p>Best Decision Ever!</p>
    </div>
  </div>
`;

// Elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const mainCard = document.getElementById('main-card');
const questionText = document.getElementById('question-text');
const shyText = document.getElementById('shy-text');
const btnContainer = document.getElementById('btn-container');
const heroImg = document.getElementById('hero-img');
const successMsg = document.getElementById('success-msg');

// State
let noBtnMoved = false;

// 1. "No" Button Logic (Runaway)
const moveNoButton = () => {
  // Get container dimensions
  // SUPER SAFE ZONES
  // Keep strictly away from edges (max 60%) to avoid rounded corners cutting it off
  const safeZones = [
    { x: 5, y: 5 }, { x: 60, y: 5 },
    { x: 5, y: 60 }, { x: 60, y: 60 },
    { x: 30, y: 30 }, { x: 40, y: 10 },
    { x: 10, y: 40 }, { x: 50, y: 50 }
  ];

  // Pick a random zone
  const randomZone = safeZones[Math.floor(Math.random() * safeZones.length)];

  // Convert % to pixels
  const newX = (mainCard.clientWidth * randomZone.x) / 100;
  const newY = (mainCard.clientHeight * randomZone.y) / 100;

  // Apply absolute positioning
  noBtn.style.position = 'absolute';
  noBtn.style.left = `${newX}px`;
  noBtn.style.top = `${newY}px`;

  // Add styling to show it's "running"
  noBtn.classList.add('running');

  // Update text for fun
  const funnyTexts = ["Really?", "Think again!", "Nope!", "Try Yes!", "Cant catch me!"];
  noBtn.innerText = funnyTexts[Math.floor(Math.random() * funnyTexts.length)];
};

// Events for "No" button
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('click', moveNoButton); // In case mobile user taps it

// 2. "Yes" Button Logic (Success)
yesBtn.addEventListener('click', () => {
  // Hide buttons and question
  btnContainer.style.display = 'none';
  questionText.innerText = "YAYYY! I knew it! 💖";
  shyText.style.display = 'none';

  // Change Image to something celebrating
  // Using a "Happy dance" gif
  heroImg.src = "https://media.giphy.com/media/T86i6yDyOYz7j6fou2/giphy.gif";

  // Trigger Confetti
  if (window.confetti) {
    window.confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff4d6d', '#ff8fa3', '#ffffff']
    });

    // Continuous confetti
    let duration = 3000;
    let end = Date.now() + duration;

    (function frame() {
      // launch a few confetti from the left edge
      window.confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff4d6d', '#ff8fa3']
      });
      // and launch a few from the right edge
      window.confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff4d6d', '#ff8fa3']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  }
});

