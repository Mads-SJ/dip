import * as yatzy from "./yatzy.js";

let points = 0;

const dices = document.querySelectorAll(".dice");
const rollButton = document.getElementById("roll-button");
const numberOfRollsSpan = document.getElementById("number-of-rolls");
const inputs = document.querySelectorAll("input");
const sumValue = document.getElementById("sum-value");
const bonusValue = document.getElementById("bonus-value");
const totalValue = document.getElementById("total-value");

rollButton.addEventListener("click", roll);

function onInitialization() {
	dices.forEach((dice, i) => {
		dice.addEventListener("animationend", () => dice.classList.remove("rolling"));
		dice.innerHTML = getEyeElements(i + 1);
	});

	for (let i = 0; i < 15; i++) {
		inputs[i].addEventListener("click", handlePointSelection);
	}
}

function roll() {
	if (dices[0].classList.contains("rolling")) return;
	if (yatzy.getThrowCount() === 2) {
		rollButton.disabled = true;
	}

	yatzy.throwDice([false, false, false, false, false]); // TODO: read holds from dice
	const values = yatzy.getValues();
	dices.forEach((dice, i) => {
		dice.innerHTML = getEyeElements(values[i]);
		dice.classList.add("rolling");
	});

	numberOfRollsSpan.innerText = yatzy.getThrowCount();
	fillResults();
}

function fillResults() {
	const results = yatzy.getResults();
	for (let i = 0; i < 15; i++) {
		inputs[i].value = results[i];
	}
	// TODO: fill rest of inputs
}

function handlePointSelection(event) {
	const input = event.target;
	input.disabled = true;
	points += parseInt(input.value);
	sumValue.value = points;

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