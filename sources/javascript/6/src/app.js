//container
let container = document.querySelector("#container");

//container
let containerMouse = document.querySelector("#container-mouse");

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
container.addEventListener('mouseleave', mouseLeaveFn, true);
container.addEventListener('mouseenter', mouseEnterFn, true);

//mouseLeave
function mouseLeaveFn(event) {
	toolsData.innerHTML = `mouseLeave`;
	if (statusImage >=1 && statusImage <= 49) {
		img.src = `src/img/ezgif-frame-0${statusImage}.jpg`;
		statusImage = statusImage + 1;
		console.log(statusImage);
	} else {
		statusImage = 1;
	}
}
//mouseEnter
function mouseEnterFn(event) {
	toolsData.innerHTML = `mouseEnter`;
}

