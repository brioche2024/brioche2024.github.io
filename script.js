function moveRandomEl(elm) {
  elm.style.position = "absolute";
  elm.style.top = Math.floor(Math.random() * 80 + 10) + "%";
  elm.style.left = Math.floor(Math.random() * 80 + 10) + "%";
}

const moveRandom = document.querySelector("#move-random");

let count = 4;

moveRandom.addEventListener("pointerover", function (e) {
  if (count > 0) {
    moveRandomEl(e.target); 
    count--;
  }

  if (count === 0) {
    moveRandom.style.display = "none";
  }
});