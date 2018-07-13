"use strict";

const player = document.querySelector('.player');
const vid = player.querySelector('.viewer');
const rangeSlide = player.querySelectorAll('input');
const play = player.querySelector('.toggle');
const buttons = player.querySelectorAll('button[data-skip]');
const progressFilled = player.querySelector('.progress__filled');
const progress = player.querySelector('.progress');
let mouseDown = false;

rangeSlide.forEach(but => but.addEventListener('change', updateRange));
rangeSlide.forEach(but => but.addEventListener('mousemove', updateRange));
play.addEventListener('click', togglePlay);
vid.addEventListener('click', togglePlay);
vid.addEventListener('play', updateBut);
vid.addEventListener('pause', updateBut);
vid.addEventListener('timeupdate', handleProgress);
buttons.forEach(but => but.addEventListener('click', skip));
progress.addEventListener('click', updateProgress);
progress.addEventListener('mousemove', updateProgress);
document.addEventListener('mousedown', ()=> mouseDown = true);
document.addEventListener('mouseup', ()=> mouseDown = false);



function updateRange() {
	if(mouseDown) {
		vid[this.name] = this.value;
	}
}

function togglePlay() {
	(vid.paused) ? vid.play() : vid.pause();
}

function skip() {
	vid.currentTime = vid.currentTime + parseFloat(this.dataset.skip);	
}

function updateBut() {
	play.textContent  = (this.paused) ? '►' : '❚ ❚';
}

function handleProgress() {
	const percent = (vid.currentTime / vid.duration) * 100;
	progressFilled.style.flexBasis = `${percent}%`;
}

function updateProgress(e) {
	if(mouseDown) {
		vid.currentTime = (e.offsetX / progress.offsetWidth) * vid.duration;
	}
}
// console.dir(vid);

// console.dir(volSlide);