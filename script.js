// ? show and hide navbar
const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", (e) => {
  const nav = document.querySelector("#nav");
  const mainContent = document.querySelector(".tabule");

  hamburger.classList.toggle("is-active");
  nav.classList.toggle("active");
  mainContent.classList.toggle("active");
});

// ? show and hide create task
const addTaskBtn = document.querySelector("#add-task");
addTaskBtn.addEventListener("click", (e) => {
  const createTask = document.querySelector(".create-task");
  const btn_addTask = document.querySelector("#add-task");
  createTask.classList.toggle("onBlured");
  btn_addTask.classList.toggle("click");
  btn_addTask.parentNode.parentElement.classList.toggle("moveUp");
});
