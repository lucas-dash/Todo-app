// ? show and hide navbar
const hamburger = document.querySelector(".hamburger");
hamburger.addEventListener("click", (e) => {
  const nav = document.querySelector(".nav");
  nav.classList.toggle("active");
  hamburger.classList.toggle("is-active");
});

// ! changing task section in mobile screen
const track = document.querySelector(".all-todo");
const taskSections = document.querySelectorAll("[data-listItem]");

// ? click on heading (dots)
taskSections.forEach((section, index) => {
  section.addEventListener("click", (e) => {
    const containerWidth = track.getBoundingClientRect().width;

    if (e.target === taskSections[index]) {
      track.scrollTo({
        left: Math.round(containerWidth) * index,
        behavior: "smooth",
      });
    }
  });
});
// ? scrolling lists
track.addEventListener("scroll", (e) => {
  const slides = document.querySelectorAll("[data-slide]");

  taskSections.forEach((section) => {
    section.classList.remove("visible");
  });

  const currentX = track.scrollLeft;
  // ? actual width slide
  const scrolllength = slides[1].offsetLeft - slides[0].offsetLeft;
  //? determine which index is active
  const nthchild = Math.round(currentX / scrolllength);

  taskSections[nthchild].classList.add("visible");
});

function dateNow() {
  let today = new Date();
  let defaultDate =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);

  return defaultDate;
}

// ? show and hide create task
const addTaskBtn = document.querySelector("#add-task");
addTaskBtn.addEventListener("click", (e) => {
  const createTask = document.querySelector(".create-task");
  const btn_addTask = document.querySelector("#add-task");
  const heading = document.querySelector(".heading-create-task");
  const datePick = document.getElementById("date");
  const timePick = document.getElementById("time");

  // ? default date on create
  datePick.addEventListener("click", () => {
    datePick.value = dateNow();
  });
  // ? set date on click time
  timePick.addEventListener("click", () => {
    datePick.value = dateNow();
  });

  btn_addTask.classList.toggle("click");

  // * form animation
  if (createTask.classList.contains("onBlured")) {
    createTask.classList.add("formOff");
    setTimeout(() => {
      createTask.classList.remove("onBlured");
    }, 490);
  } else {
    createTask.classList.remove("formOff");
    createTask.classList.add("onBlured");
  }

  // * heading move up animation
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
