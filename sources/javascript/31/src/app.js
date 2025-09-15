let label = document.getElementById("label");
let body = document.getElementById("body");
function drawResult(result) {
  console.log("->" + result.className);
  label.innerHTML = result.className;

  if (result.className == "t") {
    body.style.backgroundColor = "red";
  } else {
    body.style.backgroundColor = "white";
  }
}
