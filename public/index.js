const slider = document.getElementById('speedControl');
const speedDisplay = document.getElementById('currentSpeed');
speedDisplay.innerHTML = slider.value;
const startButton = document.getElementById('startButton');

// Global variables
let currentSpeed = slider.value;
let score;
let isPlaying = false;


// Update currentSpeed when slider is adjusted
slider.oninput = function() {
  currentSpeed = this.value;
  speedDisplay.innerHTML = currentSpeed;
}

// Capture button press
startButton.onclick = function() {
  isPlaying = !isPlaying;
  this.innerHTML = isPlaying ? 'Pause' : 'Start';
}