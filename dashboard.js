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
