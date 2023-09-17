import * as yatzy from "./yatzy.js";

const dices = document.querySelectorAll(".dice");
const rollButton = document.getElementById("roll-button");
const numberOfRollsSpan = document.getElementById("number-of-rolls");
const pointInputs = document.querySelectorAll("input:not([id])");
const sumInput = document.getElementById("sum-value");
const bonusInput = document.getElementById("bonus-value");
const totalInput = document.getElementById("total-value");

function initialize() {
	dices.forEach((dice, i) => {
		dice.addEventListener("animationend", () => dice.classList.remove("rolling"));
		dice.innerHTML = getEyeElements(i + 1);
	});

	rollButton.addEventListener("click", roll);

	pointInputs.forEach(input => {
		input.addEventListener("click", handlePointSelection);
		input.value = "0";
	});
}

function roll() {
	yatzy.throwDice([false, false, false, false, false]); // TODO: read holds from dice
	updateAfterRoll();
}

function updateAfterRoll() {
	const values = yatzy.getValues();
	dices.forEach((dice, i) => {
		dice.innerHTML = getEyeElements(values[i]);
		dice.classList.add("rolling");
	});

	numberOfRollsSpan.innerText = yatzy.getThrowCount();

	const results = yatzy.getResults();
	pointInputs.forEach((input, i) => input.value = results[i]);
	
	if (yatzy.getThrowCount() === 3) {
		rollButton.disabled = true;
	}
}

function handlePointSelection(event) {
	if (yatzy.getThrowCount() === 0) {
		return;
	}

	const input = event.target;
	input.classList.add("currently-selected");
	if (Array.prototype.indexOf.call(pointInputs, input) < 6) { // Ones to Sixes
		const sum = parseInt(sumInput.value) + parseInt(input.value);
		sumInput.value = sum;

		if (sum >= 63 && bonusInput.value === "") {
			bonusInput.value = 50;
			totalInput.value = parseInt(totalInput.value) + 50;
		}
	}
	totalInput.value = parseInt(totalInput.value) + parseInt(input.value);
	
	
	// input.disabled = true; do this at a later point
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

initialize();