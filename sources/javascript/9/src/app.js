//container
let container = document.querySelector("#container");

//tools
let tools = document.querySelector("#tools");

//tools-data
let toolsData = document.querySelector("#tools-data");

//img
let img = document.querySelector("#img");

//other variables
let statusImage = 1;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let videoLoaded = false;
let mouseX, mouseY;

//events
container.addEventListener('click', mouseClickFn, true);
container.addEventListener('mouseenter', mouseEnterFn, true);
container.addEventListener('mouseleave', mouseLeaveFn, true);

//mouseClick
function mouseClickFn(event) {
	toolsData.innerHTML = `click`;
	if (statusImage >=1 && statusImage <= 49) {
		img.src = `src/img/ezgif-frame-0${statusImage}.jpg`;
		statusImage = statusImage + 1;
	} else {
		statusImage = 1;
	}
}
//mouseEnter
function mouseEnterFn(event) {
	toolsData.innerHTML = `mouseEnter`;
}

//mouseEnter
function mouseLeaveFn(event) {
	toolsData.innerHTML = `mouseLeave`;
}