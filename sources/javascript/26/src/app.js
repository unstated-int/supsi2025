function draw(result) {
  let num = result.length
  document.querySelector("#emotion").innerHTML = num;
  document.querySelector("#emotion").style.display = "block";

  if (num == 2) {
    alert("2!");
  }
}
