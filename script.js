const stopwatch = document.querySelector(`.stopwatch`);
const time = document.querySelector(`.time`);
const historyBtn = document.querySelector(`.history`);

const timeList = document.querySelector(`.time-list`);
const startBtn = document.querySelector(`.start`);
const pauseBtn = document.querySelector(`.pause`);
const stopBtn = document.querySelector(`.stop`);
const resetBtn = document.querySelector(`.reset`);

const infoBtn = document.querySelector(`.fa-question`);
const modalShadow = document.querySelector(`.modal-shadow`);
const closeBtn = document.querySelector(`.close`);

const paintBtn = document.querySelector(`.fa-paint-brush`);
const colors = document.querySelector(`.colors`);
const redBtn = document.querySelector(`.c1`);
const greenBtn = document.querySelector(`.c2`);
const blueBtn = document.querySelector(`.c3`);

let root = document.documentElement;

let countTime;
let minutes = 0;
let seconds = 0;
let flag = true;
let timesArr = [];

const handleStart = () => {
	if (flag == true) {
		countTime = setInterval(() => {
			if (seconds < 9) {
				seconds++;
				stopwatch.textContent = `${minutes}:0${seconds}`;
			} else if (seconds >= 9 && seconds < 59) {
				if (minutes == 59 && seconds == 59) {
					return 0;
				}
				seconds++;
				stopwatch.textContent = `${minutes}:${seconds}`;
			} else {
				minutes++;
				seconds = 0;
				stopwatch.textContent = `${minutes}:00`;
			}
		}, 100);
		flag = false;
	}
};

const clear = () => {
	flag = true;
	clearInterval(countTime);
	stopwatch.textContent = `0:00`;
	timeList.textContent = ``;
	seconds = 0;
	minutes = 0;
};

const handlePause = () => {
	flag = true;
	clearInterval(countTime);
};

const handleStop = () => {
	time.innerHTML = `Last time: ${stopwatch.textContent}`;
	if (stopwatch.textContent != `0:00`) {
		time.style.visibility = `visible`;
		timesArr.push(stopwatch.textContent);
	}
	clear();
};

const handleReset = () => {
	time.style.visibility = `hidden`;
	timesArr = [];
	clear();
};

const showHistory = () => {
	timeList.textContent = ``;
	let number = 1;
	timesArr.forEach(time => {
		const newTime = document.createElement(`li`);
		newTime.innerHTML = `record #${number}:<span> ${time}</span>`;
		console.log(newTime.textContent);
		timeList.appendChild(newTime);
		number++;
	});
};

const showModal = () => {
	if (modalShadow.style.display != `block`) {
		modalShadow.style.display = `block`;
	} else {
		modalShadow.style.display = `none`;
	}
	modalShadow.classList.toggle(`modal-animation`);
};

const showColors = () => {
	if (colors.style.display != `block`) {
		colors.style.display = `block`;
	} else {
		colors.style.display = `none`;
	}
	colors.classList.toggle(`modal-animation`);
};

startBtn.addEventListener(`click`, handleStart);
pauseBtn.addEventListener(`click`, handlePause);
stopBtn.addEventListener(`click`, handleStop);
resetBtn.addEventListener(`click`, handleReset);
historyBtn.addEventListener(`click`, showHistory);

infoBtn.addEventListener(`click`, showModal);
closeBtn.addEventListener(`click`, showModal);
window.addEventListener(`click`, e => {
	e.target === modalShadow ? showModal() : false;
});

paintBtn.addEventListener(`click`, showColors);

redBtn.addEventListener(`click`, () => {
	root.style.setProperty(`--first-color`, `#fa1406`);
});
greenBtn.addEventListener(`click`, () => {
	root.style.setProperty(`--first-color`, `#00ff2a`);
});
blueBtn.addEventListener(`click`, () => {
	root.style.setProperty(`--first-color`, `#0033ff`);
});
