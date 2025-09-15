let variabilerettangolo = document.querySelector("#rettangolo");

//buttons
let btnChangeColor = document.querySelector("#change-color");
let btnBorderRadius = document.querySelector("#border-radius");
let btnMarginTop = document.querySelector("#margin-top");

btnChangeColor.addEventListener("click", () => {
  variabilerettangolo.classList.toggle("blue");
});

btnBorderRadius.addEventListener("dblclick", () => {
  variabilerettangolo.classList.toggle("border");
});

btnMarginTop.addEventListener("mouseenter", () => {
  variabilerettangolo.classList.add("marginTop");
});

btnMarginTop.addEventListener("mouseleave", () => {
  variabilerettangolo.classList.remove("marginTop");
});
