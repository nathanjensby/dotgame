const randomNumber = (min, max) => Math.floor(Math.random() * (max - min)) + min;

const determineAnimationTime = (desiredFallRate) => {
  const windowHeight = window.innerHeight;
  return windowHeight / desiredFallRate;
}

const updateScoreHTML = (newScore) => document.querySelector('#currentScore').innerHTML = newScore;

const updateSliderHTML = (newValue) => document.querySelector('#currentSpeed').innerHTML = `${newValue} px/s`;

const updateSliderHeight = () => {
  const sliderContainer = document.querySelector('.sliderContainer');
  const slider = document.querySelector('.slider');
  const newHeight = sliderContainer.getBoundingClientRect().height;
  slider.setAttribute('style', `
    width: ${newHeight}px;
    transform-origin: ${newHeight / 2}px ${newHeight / 2}px
  `);
};

const determinePosition = (imageWidth) => {
  const maxWidth = document.querySelector('.gameBoard').clientWidth;
  return randomNumber(0 + (imageWidth / 2), maxWidth - (imageWidth / 2));
}

const removeCage = (imageWrapper) => {
  imageWrapper.removeEventListener("animationend", removeCage);
  imageWrapper.parentNode.removeChild(imageWrapper);
}

const addPointValueToScore = (state, imageWrapper) => {
  if (state.isPlaying) {
    updateScore(state, imageWrapper.dataset.pointvalue);
    removeCage(imageWrapper);
  }
}

const updateScore = (state, amtToAdd) => {
  state.score += +amtToAdd;
 document.querySelector('#currentScore').innerHTML = state.score;
}

export {
  randomNumber,
  determineAnimationTime,
  determinePosition,
  updateScoreHTML,
  updateSliderHTML,
  removeCage,
  addPointValueToScore,
  updateScore,
  updateSliderHeight
};