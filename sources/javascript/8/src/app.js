//container
let container = document.querySelector("#container");

//tools-data
let toolsData = document.querySelector("#tools-data");

//sound and play
let sound = document.querySelector("#sound");
let play = document.querySelector("#container-play");

//other variables
let statusImage = 1;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let mouseX, mouseY;

//events
play.addEventListener("mouseleave", mouseLeaveFn, true);
play.addEventListener("mouseenter", mouseEnterFn, true);

//mouseLeave
function mouseLeaveFn(event) {
  toolsData.innerHTML = `mouseLeave`;
  sound.pause();
}

//mouseEnter
function mouseEnterFn(event) {
  toolsData.innerHTML = `mouseEnter`;
  sound.play();
}
