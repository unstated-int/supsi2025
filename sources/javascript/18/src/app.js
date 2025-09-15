//09 - window move horizontal

//container
let container = document.querySelector("#container");

//img
let img = document.querySelector("#img");

let numOfImages = 15;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let screenWidth = screen.width;
let screenHeight = screen.height;
let screenX = screen.screenX;
let screenY = screen.screenY;

//divide the screen
let screenSection = (screenWidth - 500) / numOfImages;

var oldX = window.screenX,
  oldY = window.screenY;

var interval = setInterval(function () {

  // Check if the window has moved
  if (oldX != window.screenX || oldY != window.screenY) {
    const sectionNumber = findImageSection(window.screenX, screenSection);
    img.src = `src/img/${sectionNumber}.png`;
  }
  //get the window width
  oldX = window.screenX;
  oldY = window.screenY;
}, 100);

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
    if (section === numOfImages) {
      return section;
    }
    return findImageSection(windowHeight, screenSection, section + 1);
  }
}
