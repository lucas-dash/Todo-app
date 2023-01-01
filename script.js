const form = document.querySelector(".create-task");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let color = document.querySelector("#priority");
  console.log(color.value);
});
