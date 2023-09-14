import * as yatzy from "./yatzy.js"

const dices = document.querySelectorAll(".dice");
const rollButton = document.getElementById("roll-button");
const numberOfRollsSpan = document.getElementById("number-of-rolls"); 

rollButton.addEventListener("click", roll);

function onInitialization() {
  dices.forEach((dice, i) => {
      dice.addEventListener("animationend", () => dice.classList.remove("rolling")); 
      dice.innerHTML = getEyeElements(i + 1);
  });
}

function roll() {
    if (dices[0].classList.contains("rolling")) return;
    if (yatzy.getThrowCount() >= 3) {
        alert("You can not roll again!");
        return;
    }

    yatzy.throwDice([false, false, false, false, false]); // TODO: read holds from dice
    const values = yatzy.getValues();
    dices.forEach((dice, i) => {
    dice.innerHTML = getEyeElements(values[i]);
    dice.classList.add("rolling");
    });

    numberOfRollsSpan.innerText = yatzy.getThrowCount();
}

function getEyeElements(numberOfEyes) {
  let face;
  let dot = `<span class="dot"></span>`;

  switch (numberOfEyes) {
    case 1:
      face = `<div class="face first-face">
                ${dot}
              </div>`;
      break;
    case 2:
      face = `<div class="face second-face">
                ${dot}
                ${dot}
              </div>`;
      break;
    case 3:
      face = `<div class="face third-face">
                ${dot}
                ${dot}
                ${dot}
              </div>`;
      break;
    case 4:
      face = `<div class="face fourth-face">
                <div class="column">
                  ${dot}
                  ${dot}
                </div>
                <div class="column">
                  ${dot}
                  ${dot}
                </div>
              </div>`;
      break;
    case 5:
      face = `<div class="face fifth-face">
                  <div class="column">
                  ${dot}
                  ${dot}
                </div>
                <div class="column">
                  ${dot}
                </div>
                <div class="column">
                  ${dot}
                  ${dot}
                </div>
              </div>`;
      break;
    case 6:
      face = `<div class="face sixth-face">
                <div class="column">
                  ${dot}
                  ${dot}
                  ${dot}
                </div>
                <div class="column">
                  ${dot}
                  ${dot}
                  ${dot}
                </div>
              </div>`;
      break;
  }
  return face;
}

onInitialization();