//container
let container = document.querySelector("#container");

//tools-data
let toolsData = document.querySelector("#tools-data");

//letter
let letter = document.querySelector("#container-letter");

//other variables
let statusSpeed = 0;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let videoLoaded = false;
let mouseX, mouseY;

//events
window.addEventListener('keypress', keyPressFn, true); 
container.addEventListener('mousemove', mouseMoveFn, true);

//mouseMove
function mouseMoveFn(event) {
	toolsData.innerHTML = `X: ${event.pageX}, Y: ${event.pageY}`;
	mouseX = event.pageX;
	mouseY = event.pageY;
	letter.style['font-variation-settings'] = `"wght" ${mapRange(mouseY, 0, windowHeight, 100, 900)}, "wdth" ${mapRange(mouseX, 0, windowWidth, 100,200)}`;

}

//keyPress
function keyPressFn(event) {
	toolsData.innerHTML = `KEY: ${event.key}`;
	letter.innerHTML = event.key;
}

//map range
//linearly maps value from the range (a..b) to (c..d)
function mapRange (value, a, b, c, d) {
    value = (value - a) / (b - a);
    return c + value * (d - c);
}

