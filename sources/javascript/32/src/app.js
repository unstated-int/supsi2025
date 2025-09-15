let label = document.getElementById("label");
let body = document.getElementById("body");
let movie = document.getElementById("movie");

function drawResult(result) {
  if (Object.keys(result).length > 1) {
    movie.style.display = "block";
    label.innerHTML = result;
  }

  if (result == "sedia") {
    movie.muted = false;
    movie.play();
  } else if (result == "empty") {
    movie.pause();
  } 
  else if (result == "cover") {
    movie.style.display = "none";
  } 
  
  else {
    movie.muted = true;
    movie.pause();
  }
}
