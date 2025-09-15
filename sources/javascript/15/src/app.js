//06 - Mouse Hover Vertical Move and show vertical items + scale

//container
let container = document.querySelector("#container");

//img
let img = document.querySelector("#img");

let numOfImages = 5;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let mouseX, mouseY;

//divide the screen
let screenSection = windowHeight / numOfImages;

//events
container.addEventListener("mousemove", mouseMoveFn, true);

function mouseMoveFn(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;

  //hide all the images and show element image with the same section number
  document.querySelectorAll('img').forEach((image) => {
    image.style.opacity = "0";
    image.style.transform = "scale(1)";
  });

  const sectionNumber = findImageSection(mouseY, screenSection);
  document.querySelector(`#img${sectionNumber}`).style.opacity = "1";
  document.querySelector(`#img${sectionNumber}`).style.transform = "scale(1.5) rotate(360deg)";
}

//this function will find the section of the image
function findImageSection(mouseY, screenSection, section = 1) {
  // Check if we are in the first section
  if (section === 1 && mouseY < screenSection) {
    return section;
  }
  // Check if we are in the current section
  else if (mouseY < screenSection * section) {
    return section;
  }
  // Otherwise, move to the next section
  else {
    if (section === numOfImages) {
      return section;
    }
    return findImageSection(mouseY, screenSection, section + 1);
  }
}
