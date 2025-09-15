let sound = document.querySelector("#sound");
function draw(detections) {
  //check if in detecions array there is one face happy and one face surprise
  let happy = false;
  let neutral = false;

  detections.forEach((face) => {
    if (face.expressions.happy > 0.5) {
      happy = true;
    }
    if (face.expressions.neutral > 0.5) {
      neutral = true;
    }
  });

  if (happy && neutral) {
    document.querySelector("#toggle1").checked = true;
    sound.play();
  } else {
    document.querySelector("#toggle1").checked = false;
    sound.pause();
  }
}
