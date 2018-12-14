// Util
import { updateSliderHTML, removeCage, updateScoreHTML } from './util.js';

// Components
import { textFlash } from './textFlash.js';
import { addCage } from './cage.js';


const slider = document.querySelector('#speedControl');
const scoreDisplay = document.querySelector('#currentScore');
scoreDisplay.innerHTML = 0;
const startButton = document.querySelector('#startButton');
const resetButton = document.querySelector('#resetButton');

// Global variables
let gameState = {
  currentSpeed: slider.value,
  score: 0,
  isPlaying: false
};
let myInterval;

updateSliderHTML(gameState.currentSpeed);

// Update currentSpeed when slider is adjusted
slider.addEventListener('input', (event) => {
  const { value } = event.target;
  gameState.currentSpeed = value;
  updateSliderHTML(value);
});

// Capture button press
startButton.addEventListener('click', () => {
  const { isPlaying } = gameState;
  gameState.isPlaying = !isPlaying;
  startButton.innerHTML = gameState.isPlaying ? 'Pause' : 'Start';
  // TODO: add icons for pause and play
  textFlash(gameState.isPlaying ? 'play' : 'pause');

  // Add a cage to a random lane every second
  if (gameState.isPlaying) {
    myInterval = setInterval(() => addCage(gameState), 1000);
  } else {
    clearInterval(myInterval);
  }

  // Grab all cages from the dom and pause animation
  const cages = document.querySelectorAll('.imageWrapper');
  cages.forEach((cage) => {
    cage.style.WebkitAnimationPlayState = gameState.isPlaying ? 'running' : 'paused';
  })
})

// Reset game
resetButton.addEventListener('click', () => {
  gameState.score = 0;
  gameState.isPlaying = false;
  updateScoreHTML(0);
  startButton.innerHTML = 'Start';
  textFlash('restart');
  clearInterval(myInterval);

  // Remove all cages from dom
  const cages = document.querySelectorAll('.imageWrapper');
  cages.forEach((cage) => {
    removeCage(cage);
  })
})