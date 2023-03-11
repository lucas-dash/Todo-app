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

// ! show and hide create task
const addTaskBtn = document.querySelector('#add-task');
addTaskBtn.addEventListener('click', (e) => {
  addTaskBtn.classList.toggle('click');

  const datePick = document.getElementById('date');
  const timePick = document.getElementById('time');

  // ? default date on create
  datePick.addEventListener('click', () => {
    datePick.value = dateNow();
  });
  // ? set date on click time
  timePick.addEventListener('click', () => {
    datePick.value = dateNow();
  });

  // * form animation
  const createTask = document.querySelector('.create-task');
  if (createTask.classList.contains('onBlured')) {
    createTask.classList.add('formOff');
    setTimeout(() => {
      createTask.classList.remove('onBlured');
    }, 490);
  } else {
    createTask.classList.remove('formOff');
    createTask.classList.add('onBlured');
  }

  // * heading move up & down animation
  const heading = document.querySelector('.heading-create-task');
  if (heading.classList.contains('moveUp')) {
    heading.classList.add('moveDown');
    heading.classList.remove('moveUp');
  } else {
    heading.classList.remove('moveDown');
    heading.classList.add('moveUp');
  }

  // ? close to click outside form box
  document.addEventListener('click', function (e) {
    const firstCol = document.querySelector('.first-col-head');
    if (!firstCol.contains(e.target)) {
      createTask.classList.add('formOff');
      setTimeout(() => {
        createTask.classList.remove('onBlured');
      }, 490);

      heading.classList.add('moveDown');
      heading.classList.remove('moveUp');
      addTaskBtn.classList.remove('click');
    }
  });
});

function dateNow() {
  let today = new Date();
  let defaultDate =
    today.getFullYear() +
    '-' +
    ('0' + (today.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + today.getDate()).slice(-2);

  return defaultDate;
}

// ! changing task section in mobile screen
const track = document.querySelector('.all-todo');
const taskSections = document.querySelectorAll('[data-listItem]');

// ? click on heading (dots)
taskSections.forEach((section, index) => {
  section.addEventListener('click', (e) => {
    const containerWidth = track.getBoundingClientRect().width;

    if (e.target === taskSections[index]) {
      track.scrollTo({
        left: Math.round(containerWidth) * index,
        behavior: 'smooth',
      });
    }
  });
});
// ? scrolling lists
track.addEventListener('scroll', (e) => {
  const slides = document.querySelectorAll('[data-slide]');

  taskSections.forEach((section) => {
    section.classList.remove('visible');
  });

  const currentX = track.scrollLeft;
  // ? actual width slide
  const scrolllength = slides[1].offsetLeft - slides[0].offsetLeft;
  //? determine which index is active
  const nthchild = Math.round(currentX / scrolllength);

  taskSections[nthchild].classList.add('visible');
});
