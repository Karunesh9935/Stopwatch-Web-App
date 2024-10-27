let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");
const millisecondsElement = document.getElementById("milliseconds");
const lapsElement = document.getElementById("laps");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function updateDisplay() {
    const timeElapsed = Date.now() - startTime + elapsedTime;
    const minutes = Math.floor(timeElapsed / 60000);
    const seconds = Math.floor((timeElapsed % 60000) / 1000);
    const milliseconds = Math.floor((timeElapsed % 1000) / 10);

    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);
    millisecondsElement.textContent = formatTime(milliseconds);
}

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now();
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;

        startBtn.textContent = "Resume";
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        elapsedTime += Date.now() - startTime;
        clearInterval(timerInterval);
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    startTime = 0;
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";
    millisecondsElement.textContent = "00";
    startBtn.textContent = "Start";
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapsElement.innerHTML = "";
}

function addLap() {
    const lapTime = `${minutesElement.textContent}:${secondsElement.textContent}:${millisecondsElement.textContent}`;
    const li = document.createElement("li");
    li.textContent = `Lap ${lapsElement.children.length + 1}: ${lapTime}`;
    lapsElement.appendChild(li);
}

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
resetBtn.addEventListener("click", resetStopwatch);
lapBtn.addEventListener("click", addLap);
