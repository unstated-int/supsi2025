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
let windowHeight = window.innerHeight;
let mouseX, mouseY;

//events
container.addEventListener("click", mouseClickFn);
container.addEventListener("mousemove", mouseMoveFn);
container.addEventListener("dblclick", mouseDblClickFn);
container.addEventListener("mouseleave", mouseLeaveFn);
container.addEventListener("mouseenter", mouseEnterFn);

window.addEventListener("keypress", keyPressFn);
window.addEventListener("resize", resizeFn);

//mouseClick
function mouseClickFn(event) {
  container.classList.remove("dblclickColor");
  container.classList.add("clickColor");
}

//mouseDblClick
function mouseDblClickFn(event) {
  container.classList.remove("clickColor");
  container.classList.add("dblclickColor");
}

//mouseMove
function mouseMoveFn(event) {
  toolsData.innerHTML = `X: ${event.pageX}, Y: ${event.pageY}`;
  containerMouse.style.top = `${event.pageY}px`;
  containerMouse.style.left = `${event.pageX}px`;
}

//mouseLeave
function mouseLeaveFn(event) {
  toolsData.innerHTML = `mouseLeave`;
}

//mouseEnter
function mouseEnterFn(event) {
  toolsData.innerHTML = `mouseEnter`;
}

//keyPress
function keyPressFn(event) {
  toolsData.innerHTML = `KEY: ${event.key}`;
}

let timeout = null;
//resize
function resizeFn(event) {
  clearTimeout(timeout);
  toolsData.innerHTML = "Resizing...";
  timeout = setTimeout(() => {
    toolsData.innerHTML = `width: ${window.innerWidth}, height: ${window.innerHeight}`;
  }, 500);
}
