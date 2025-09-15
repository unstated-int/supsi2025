function draw(result) {
  document.querySelector("#emotion").innerHTML = result;
  document.querySelector("#emotion").style.display = "block";

  if(result === 'happy') {
   alert('You are happy!');
  }
}
