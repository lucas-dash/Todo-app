const form = document.querySelector(".create-task");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let color = document.querySelector("#priority");
  console.log(color.value);
});

const nav = document.querySelector("#nav");
const mainContent = document.querySelector(".tabule");
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", (e) => {
  // e.preventDefault();
  hamburger.classList.toggle("is-active");
  nav.classList.toggle("active");
  mainContent.classList.toggle("active");
});
