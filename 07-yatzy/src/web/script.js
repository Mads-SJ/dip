import * as yatzy from "../model/yatzy.js";

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
		input.readOnly = true;
		input.value = "0";
	});
}

function roll() {
	const holds = getHolds();
	yatzy.throwDice(holds);
	updateDices();
	updateResults();
}

function updateDices() {
	const values = yatzy.getValues();
	for (let i = 0; i < dices.length; i++) {
		const dice = dices[i];
		if (!dice.classList.contains("hold")) {
			dice.innerHTML = getEyeElements(values[i]);
			dice.classList.add("rolling");
		}
	}

	const throwCount = yatzy.getThrowCount();
	numberOfRollsSpan.innerText = throwCount;
	if (throwCount === 3) {
		rollButton.disabled = true;
	}
}

function updateResults() {
	const results = yatzy.getResults();
	for (let i = 0; i < pointInputs.length; i++) {
		const input = pointInputs[i];
		if (input.disabled === false) {
			input.value = results[i];
		}
	}
}

function handlePointSelection(event) {
	if (yatzy.getThrowCount() === 0) { return; }

	const input = event.target;
	input.disabled = true;
	updateTotals(input);
	resetForNextTurn();
	if (isGameOver()) {
		handleGameOver();
	}
}

function updateTotals(input) {
	let value = parseInt(input.value);
	if (indexOf(pointInputs, input) < 6) {
		const oldSum = parseInt(sumInput.value);
		const newSum = oldSum + value;
		sumInput.value = newSum;

		if (newSum >= 63 && bonusInput.value === "0") {
			bonusInput.value = 50;
			value += 50;
		}
	}
	const oldTotal = parseInt(totalInput.value);
	totalInput.value = oldTotal + value;
}

function resetForNextTurn() {
	dices.forEach(dice => dice.classList.remove("hold"));

	yatzy.resetThrowCount();
	numberOfRollsSpan.innerText = yatzy.getThrowCount();
	rollButton.disabled = false;

	pointInputs.forEach(input => {
		if (input.disabled === false) {
			input.value = "0";
		}
	});
}

function handleGameOver() {
	const jsConfetti = new JSConfetti();
	jsConfetti.addConfetti({
		confettiNumber: 500,
	});
	rollButton.removeEventListener("click", roll);
	rollButton.innerText = "New game";
	rollButton.disabled = false;
	rollButton.addEventListener("click", resetForNewGame);
}

function resetForNewGame() {
	dices.forEach(dice => dice.classList.remove("hold"));
	yatzy.resetThrowCount();
	numberOfRollsSpan.innerText = yatzy.getThrowCount();

	pointInputs.forEach(input => {
		input.disabled = false;
		input.value = "0";
	});
	sumInput.value = "0";
	bonusInput.value = "0";
	totalInput.value = "0";

	rollButton.innerText = "Roll";
	rollButton.removeEventListener("click", resetForNewGame);
	rollButton.addEventListener("click", roll);
	roll();
}

function getHolds() {
	const holds = [];
	dices.forEach(dice => {
		holds.push(dice.classList.contains("hold"));
	});
	return holds;
}

function isGameOver() {
	for (let i = 0; i < pointInputs.length; i++) {
		if (pointInputs[i].disabled === false) {
			return false;
		}
	}
	return true;
}

function indexOf(list, element) {
    for (let i = 0; i < list.length; i++) {
        if (list[i] == element) {
            return i;
        }
    }
    return -1;
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