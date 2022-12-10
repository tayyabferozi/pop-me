const gameMain = document.querySelector(".game-main");
const mainContent = document.querySelector(".main-content");
const prodEmpty = document.querySelector(".prod-empty");
const prodFilled = document.querySelector(".prod-filled");
const prodLost = document.querySelector(".prod-lost");
const tangkep = document.querySelector(".tangkep");
const cobaLagai = document.querySelector(".lost-coba-lagi");

const popup = document.querySelector(".popup");
const closePopup = popup.querySelector(".close");
const popupTitle = popup.querySelector(".title .text");
const overlay = document.querySelector(".overlay");

let dir = 1;
let inter;

function startAnim() {
  clearInterval(inter);
  inter = setInterval(function () {
    let newLeft = (parseInt(prodFilled.style.left) || 0) + dir;
    if (newLeft >= mainContent.clientWidth - prodFilled.clientWidth) {
      dir = -1;
    } else if (newLeft <= 0) {
      dir = +1;
    }
    prodFilled.style.left = newLeft + "px";
  }, 4);
}

function evalResult() {
  clearInterval(inter);

  const filledLeft = parseInt(prodFilled.style.left) || 0;
  const emptyLeft =
    prodEmpty.getBoundingClientRect().left -
      mainContent.getBoundingClientRect().left || 0;

  const offset = Math.abs(filledLeft - emptyLeft);

  if (offset <= 10) {
    prodFilled.style.left = emptyLeft + "px";
    winGame();
  } else {
    loseGame();
  }
}

function startGame() {
  gameMain.classList.add("running");
  gameMain.classList.remove("lost");
  gameMain.classList.remove("won");
  startAnim();
  popup.classList.add("hide");
}

function loseGame() {
  gameMain.classList.add("lost");
  gameMain.classList.remove("won");
  gameMain.classList.remove("running");
  popup.classList.add("lost");
  popup.classList.remove("won");
  popupTitle.innerHTML = "Try Again!";
  popup.classList.remove("hide");
}

function winGame() {
  gameMain.classList.add("won");
  gameMain.classList.remove("running");
  gameMain.classList.remove("lost");
  popup.classList.add("won");
  popup.classList.remove("lost");
  popupTitle.innerHTML = "Congratulations";
  popup.classList.remove("hide");
}

startGame();

tangkep.addEventListener("click", function () {
  evalResult();
});

prodLost.addEventListener("click", function () {
  startGame();
});

cobaLagai.addEventListener("click", function () {
  startGame();
});

closePopup.addEventListener("click", function () {
  popup.classList.add("hide");
  overlay.classList.add("hide");
});
