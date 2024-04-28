let menu = document.querySelector(".header__hamburger");
let header = document.querySelector(".header");
let navBar = document.querySelector(".header__list");
let backTop = document.querySelector(".back-top");

window.addEventListener("scroll", function () {
  showBackTop();
  showHeaderShrink();
});

menu.addEventListener("click", function () {
  navBar.classList.toggle("header__show__list");
});

function showBackTop() {
  if (scrollY > 100) {
    backTop.classList.add("show__back-top");
  } else {
    backTop.classList.remove("show__back-top");
  }
}
function showHeaderShrink() {
  if (scrollY > 0) {
    header.classList.add("show__header__shrink");
  } else {
    header.classList.remove("show__header__shrink");
  }
}
