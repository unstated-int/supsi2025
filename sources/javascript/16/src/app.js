//01 - Resize horizontal + scale

//container
let container = document.querySelector("#container");

//img
let img = document.querySelector("#img");

let numOfImages = 15;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let screenWidth = screen.width;
let screenHeight = screen.height;

//divide the screen
let screenSection = screenWidth / numOfImages;
//events
window.addEventListener("resize", resizeFn, true);

function resizeFn() {
  //get the window width
  windowWidth = window.innerWidth ;
  const sectionNumber = findImageSection(windowWidth, screenSection);
  img.src = `src/img/${sectionNumber}.png`;
  // img.style.transform = `scale(${sectionNumber / 6})`;
}

//this function will find the section of the image
function findImageSection(windowWidth, screenSection, section = 1) {
  // Check if we are in the first section
  if (section === 1 && windowWidth < screenSection) {
    return section;
  }
  // Check if we are in the current section
  else if (windowWidth < screenSection * section) {
    return section;
  }
  // Otherwise, move to the next section
  else {
    if (section === numOfImages) {
      return section;
    }
    return findImageSection(windowWidth, screenSection, section + 1);
  }
}
