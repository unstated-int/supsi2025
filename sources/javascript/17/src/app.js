//08 - Resize vertical + scale

//container
let container = document.querySelector("#container");

//img
let img = document.querySelector("#img");

let numOfImages = 10;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let screenWidth = screen.width;
let screenHeight = screen.height;

//divide the screen
let screenSection = screenHeight / numOfImages;
//events
window.addEventListener("resize", resizeFn, true);

function resizeFn() {
  windowHeight = window.innerHeight;
  const sectionNumber = findImageSection(windowHeight, screenSection);
  img.style.opacity = 1;
  img.src = `src/img/${sectionNumber}.png`;
  img.style.transform = `scale(${sectionNumber / 6})`;
}

//this function will find the section of the image
function findImageSection(windowHeight, screenSection, section = 1) {
  // Check if we are in the first section
  if (section === 1 && windowHeight < screenSection) {
    return section;
  }
  // Check if we are in the current section
  else if (windowHeight < screenSection * section) {
    return section;
  }
  // Otherwise, move to the next section
  else {
    return findImageSection(windowHeight, screenSection, section + 1);
  }
}
