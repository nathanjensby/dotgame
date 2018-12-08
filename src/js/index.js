import { randomNumber } from './util.js';

const slider = document.getElementById('speedControl');
const speedDisplay = document.getElementById('currentSpeed');
speedDisplay.innerHTML = slider.value;
const startButton = document.getElementById('startButton');
const circle = document.getElementsByClassName('testCircle');

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
  console.log('random number 1-10: ', randomNumber(1, 10))
  isPlaying = !isPlaying;
  this.innerHTML = isPlaying ? 'Pause' : 'Start';
}

