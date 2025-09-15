//container
let container = document.querySelector("#container");

//container
let containerMouse = document.querySelector("#container-mouse");

//tools
let tools = document.querySelector("#tools");

//tools-data
let toolsData = document.querySelector("#tools-data");

//other variables
let windowWidth = window.innerWidth;
let mouseX = 0;
let mouseY = 0;
let videoLoaded = false;

//video
let video = document.querySelector("#video");


//events
container.addEventListener('mousemove', mouseMoveFn, true);

//mouseMove
function mouseMoveFn(event) {
	toolsData.innerHTML = `X: ${event.pageX}, Y: ${event.pageY}`;
	containerMouse.style.top = `${event.pageY}px`;
	containerMouse.style.left = `${event.pageX}px`;
	mouseX = event.pageX;
	mouseY = event.pageY;

	video.playbackRate = mouseY / 100;

	if(mouseX > windowWidth/2) {
		video.play();
	}
	else {
		video.pause();	
	}
}


video.addEventListener('loadeddata', (e) => {
	if (video.readyState === 4) {
		videoLoaded = true;
	}
});

