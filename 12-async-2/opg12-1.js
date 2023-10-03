const startStopButton = document.querySelector("#startStopButton");
const timer = document.querySelector("#timer");
let startTime;
let intervalId;

function startTimer() {
    let count = 0;
    const intervalId = setInterval(() => {
        count++;
        timer.textContent = count;
    }, 1000);
    return intervalId;
}

function updateTimer() {
    const currentTime = new Date();
    const elapsedMillis = currentTime.getTime() - startTime.getTime();
    const formattedTime = formatTime(elapsedMillis);
    timer.textContent = formattedTime;
}

// function to format time in milliseconds to a string with format mm:ss:ms
function formatTime(time) {
    const date = new Date(time);
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const milliseconds = date.getMilliseconds().toString().padStart(3, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
}

startStopButton.addEventListener("click", () => {
    startStopButton.classList.toggle("started");
    const started = startStopButton.classList.contains("started");
    if (!started) {
        startStopButton.textContent = "Stop";
        startTime = new Date();
        console.log("Timer started!");
        intervalId = setInterval(updateTimer, 10);
    }
    else {
        startStopButton.textContent = "Start";
        clearInterval(intervalId);
    }
});