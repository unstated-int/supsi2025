//10 - mouse move vertical 

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
let screenSection = (screenHeight - 350) / numOfImages;

var oldX = window.screenX,
  oldY = window.screenY;

var interval = setInterval(function () {
  //  Check if the window has moved
  if (oldX != window.screenX || oldY != window.screenY) {
    // Find the section of the image
    const sectionNumber = findImageSection(window.screenY, screenSection);
    img.src = `src/img/${sectionNumber}.png`;
  }
  // Update the old values
  oldX = window.screenX;
  oldY = window.screenY;
}, 100);




//this function will find the section of the image
function findImageSection(screenY, screenSection, section = 1) {
  // Check if we are in the first section
  if (section === 1 && screenY < screenSection) {
    return section;
  }
  // Check if we are in the current section
  else if (screenY < screenSection * section) {
    return section;
  }
  // Otherwise, move to the next section
  else {
    if (section === numOfImages) {
      return section;
    }
    return findImageSection(screenY, screenSection, section + 1);
  }
}
