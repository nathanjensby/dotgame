import { randomNumber } from './util.js';

const slider = document.querySelector('#speedControl');
const scoreDisplay = document.querySelector('#currentScore');
scoreDisplay.innerHTML = 0;
const startButton = document.querySelector('#startButton');
const lanes = document.querySelectorAll('.dropLane');

// Global variables
const gameState = {
  currentSpeed: slider.value,
  score: 0,
  isPlaying: false
};
let myInterval;

const addCircle = () => {
  const circlePointData = randomNumber(1, 11);
  const circleData = {
    lane: lanes[randomNumber(0, 8)],
    size: `${circlePointData * 10}px`,
    pointValue: 11 - circlePointData
  };

  const circleComponent = document.createElement('div');
  circleComponent.classList.add('testCircle');
  circleComponent.setAttribute("style", `height: ${circleData.size}; width: ${circleData.size}; animation: slideDown ${determineAnimationTime()}s linear`);
  circleComponent.setAttribute("data-pointValue", `${circleData.pointValue}`);
  circleComponent.addEventListener("click", () => addCircleToScore(circleComponent));
  circleComponent.addEventListener("animationend", () => removeCircle(circleComponent));

  circleData.lane.appendChild(circleComponent)
}

const updateScore = (amtToAdd) => {
  gameState.score += +amtToAdd;
  scoreDisplay.innerHTML = gameState.score;
}

const determineAnimationTime = () => {
  const windowHeight = window.innerHeight;
  const desiredFallRate = gameState.currentSpeed;
  return windowHeight / desiredFallRate;
}

const addCircleToScore = (circleComponent) => {
  if (gameState.isPlaying) {
    updateScore(circleComponent.dataset.pointvalue);
    removeCircle(circleComponent);
  }
}

const removeCircle = (circleComponent) => {
  circleComponent.removeEventListener("animationend", removeCircle);
  circleComponent.parentNode.removeChild(circleComponent);
}

const updateSliderDisplay = (newValue) => {
  document.querySelector('#currentSpeed').innerHTML = newValue;
}

// Update currentSpeed when slider is adjusted
slider.addEventListener('input', (event) => {
  const { value } = event.target;
  gameState.currentSpeed = value;
  updateSliderDisplay(value);
});

// Capture button press
startButton.addEventListener('click', () => {
  const { isPlaying } = gameState;
  gameState.isPlaying = !isPlaying;
  startButton.innerHTML = gameState.isPlaying ? 'Pause' : 'Start';

  // Add a circle to a random lane every second
  if (gameState.isPlaying) {
    myInterval = setInterval(addCircle, 1000);
  } else {
    clearInterval(myInterval);
  }

  // Grab all circles from the dom and pause animation
  const circles = document.querySelectorAll('.testCircle');
  circles.forEach((circle) => {
    circle.style.WebkitAnimationPlayState = gameState.isPlaying ? 'running' : 'paused';
  })
})