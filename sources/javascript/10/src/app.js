let container = document.querySelector("#container");
let img = document.querySelector("#img");
let numOfImages = 10;
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
let mouseX, mouseY;
let screenSection = windowWidth / numOfImages;

container.addEventListener("mousemove", mouseMoveFn);

function mouseMoveFn(event) {
  mouseX = event.clientX;
  mouseY = event.clientY;
  const sectionNumber = findImageSection(mouseX, screenSection);
  img.src = `src/img/${sectionNumber}.png`;
}

//this function will find the section of the image
function findImageSection(mouseX, screenSection, section = 1) {
  // Check if we are in the first section
  if (section === 1 && mouseX < screenSection) {
    return section;
  }
  // Check if we are in the current section
  else if (mouseX < screenSection * section) {
    return section;
  }
  // Otherwise, move to the next section
  else {
    if (section === numOfImages) {
      return section;
    }
    return findImageSection(mouseX, screenSection, section + 1);
  }
}
