export const addCircle = () => {
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
};

const addCircleToScore = (circleComponent) => {
  updateScore(circleComponent.dataset.pointvalue);
  removeCircle(circleComponent);
};

const removeCircle = (circleComponent) => {
  circleComponent.removeEventListener("animationend", removeCircle);
  circleComponent.parentNode.removeChild(circleComponent);
};