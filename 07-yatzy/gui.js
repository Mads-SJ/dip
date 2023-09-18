import * as yatzy from "./yatzy.js";
import { getEyeElements } from "./dice-gui.js";

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
		dice.addEventListener("click", () => {
			if (yatzy.getThrowCount() !== 0) {
				dice.classList.toggle("hold");
			}
		});
		dice.innerHTML = getEyeElements(i + 1);
	});

	rollButton.addEventListener("click", roll);

	pointInputs.forEach(input => {
		input.addEventListener("click", handlePointSelection);
		input.value = "0";
	});
}

function roll() {
	const holds = getHolds();
	yatzy.throwDice(holds);
	updateAfterRoll();
}

function updateAfterRoll() {
	const values = yatzy.getValues();
	dices.forEach((dice, i) => {
		if (!dice.classList.contains("hold")) {
			dice.innerHTML = getEyeElements(values[i]);
			dice.classList.add("rolling");
		}
	});

	numberOfRollsSpan.innerText = yatzy.getThrowCount();

	const results = yatzy.getResults();
	pointInputs.forEach((input, i) => {
		if (input.disabled === false) {
			input.value = results[i];
		}
	});

	if (yatzy.getThrowCount() === 3) {
		rollButton.disabled = true;
	}
}

function handlePointSelection(event) {
	if (yatzy.getThrowCount() === 0) {
		return;
	}

	const input = event.target;
	input.disabled = true;
	updateTotals(input);

	pointInputs.forEach(input => {
		if (input.disabled === false) {
			input.value = "0";
		}
	});
	yatzy.resetThrowCount();
	numberOfRollsSpan.innerText = yatzy.getThrowCount();
	rollButton.disabled = false;
	dices.forEach(dice => dice.classList.remove("hold"));
}

function updateTotals(input) {
	if (Array.prototype.indexOf.call(pointInputs, input) < 6) { // Ones to Sixes
		const sum = parseInt(sumInput.value) + parseInt(input.value);
		sumInput.value = sum;

		if (sum >= 63 && bonusInput.value === "") {
			bonusInput.value = 50;
			totalInput.value = parseInt(totalInput.value) + 50;
		}
	}
	totalInput.value = parseInt(totalInput.value) + parseInt(input.value);
}

function getHolds() {
	const holds = [];
	dices.forEach(dice => {
		holds.push(dice.classList.contains("hold"));
	});
	return holds;
}

initialize();