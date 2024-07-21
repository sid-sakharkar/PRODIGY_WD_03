let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;

const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps-list');

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 10);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    hoursElement.textContent = '00';
    minutesElement.textContent = '00';
    secondsElement.textContent = '00';
    millisecondsElement.textContent = '00';
    lapsList.innerHTML = '';
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    let milliseconds = Math.floor((updatedTime % 1000) / 10);
    let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    hoursElement.textContent = pad(hours);
    minutesElement.textContent = pad(minutes);
    secondsElement.textContent = pad(seconds);
    millisecondsElement.textContent = pad(milliseconds);
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function addLap() {
    if (running) {
        const lapTime = `${hoursElement.textContent}:${minutesElement.textContent}:${secondsElement.textContent}:${millisecondsElement.textContent}`;
        const li = document.createElement('li');
        li.textContent = lapTime;
        lapsList.appendChild(li);
    }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', addLap);