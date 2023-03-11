//? show and hide navbar
const openSide = document.querySelector('.open-side');
openSide.addEventListener('click', (e) => {
  const navbar = document.querySelector('.navbar-content');
  const arrow = document.querySelector('.arrow');

  if (navbar.classList.contains('active')) {
    navbar.parentElement.classList.add('active-width');
    setTimeout(() => {
      navbar.classList.remove('active');
      arrow.classList.add('rotate');
      navbar.classList.add('mobile-width');
    }, 350);
  } else {
    navbar.parentElement.classList.remove('active-width');
    setTimeout(() => {
      navbar.classList.add('active');
      arrow.classList.remove('rotate');
      navbar.classList.remove('mobile-width');
    }, 200);
  }

  //? hide if user click outside
  document.addEventListener('click', function (e) {
    const sidebarContainer = document.querySelector('.nav');
    if (!sidebarContainer.contains(e.target)) {
      navbar.parentElement.classList.remove('active-width');
      setTimeout(() => {
        navbar.classList.add('active');
        arrow.classList.remove('rotate');
        navbar.classList.remove('mobile-width');
      }, 200);
    }
  });
});

// ! task info to display

// ? json data
const todo = JSON.parse(localStorage.getItem('todo')) || [];
const inProgress = JSON.parse(localStorage.getItem('progress')) || [];
const completeTask = JSON.parse(localStorage.getItem('complete')) || [];

// ? sidebar count task
const sideBarCount = document.getElementById('count_task_side');
sideBarCount.textContent = todo.length;

// const allTask = [...todo, ...inProgress, ...completeTask];

const tasksProgress = document.querySelector('#task-progress');
tasksProgress.textContent = inProgress.length;

// ? taks in today
const taskToday_el = document.querySelector('#today-task');
taskToday_el.textContent = 0;
let todayTask = [];

const date = new Date();
const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);

todo.forEach((task) => {
  if (task._date === formattedDate) {
    todayTask.push(task);
  }
});
taskToday_el.textContent = todayTask.length;

//? date now
const dateNow = document.querySelector('#date-now');
dateNow.textContent = formattedDate;

// ? time now and welcome text
const welcomeText = document.querySelector('#welcome-text');

const timeNow = new Date().getHours();

if (timeNow <= 11 && timeNow >= 6) {
  welcomeText.textContent = 'Good Morning!';
} else if (timeNow > 11 && timeNow <= 18) {
  welcomeText.textContent = 'Good Afternoon!';
} else if (timeNow > 18 && timeNow <= 24) {
  welcomeText.textContent = 'Good Evening!';
} else if (timeNow >= 0 && timeNow <= 5) {
  welcomeText.textContent = 'Good night!';
} else {
  welcomeText.textContent = 'Have a Nice Day!';
}

// ? motivation quote API
const quote = document.querySelector('#quote');
const author = document.querySelector('#quote-author');

async function getQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    quote.textContent = data.content;
    author.textContent = `- "${data.author}"`;
  } catch (e) {
    console.log(e);
  }
}

getQuote();
