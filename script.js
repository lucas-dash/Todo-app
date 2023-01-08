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
  const heading = document.querySelector(".heading-create-task");

  btn_addTask.classList.toggle("click");

  // ? form box
  if (createTask.classList.contains("onBlured")) {
    createTask.classList.add("formOff");
    setTimeout(() => {
      createTask.classList.remove("onBlured");
    }, 490);
  } else {
    createTask.classList.remove("formOff");
    createTask.classList.add("onBlured");
  }

  // ? heading
  if (heading.classList.contains("moveUp")) {
    heading.classList.add("moveDown");
    heading.classList.remove("moveUp");
  } else {
    heading.classList.remove("moveDown");
    heading.classList.add("moveUp");
  }
});

// ? close to click outside box

// document.addEventListener("click", (e) => {
//   const createTask = document.querySelector(".create-task");

//   if (!addTaskBtn.contains(e.target) && e.target !== createTask) {
//     createTask.classList.add("formOff");
//     setTimeout(() => {
//       createTask.classList.remove("onBlured");
//     }, 490);
//   }
// });

let arr = [1, 3, 5, 6, 6, 9];

let todoLeft = document.querySelector(".complet-icon");
todoLeft.setAttribute("data-complete", arr.length);
