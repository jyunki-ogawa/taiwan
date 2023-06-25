new MobileMenuDrop();
new PageTopBtn();
const hero = new HeroSlider('.swiper');
hero.start();

const header = document.querySelector('.header');
const pageTopBtn = document.querySelector('.page-top-btn');
const _navAnimation = function (el, inview) {
  if (inview) {
    header.classList.remove('triggered');
    pageTopBtn.classList.remove('triggered');
  } else {
    header.classList.add('triggered');
    pageTopBtn.classList.add('triggered');
  }
}
const so1 = new ScrollObserver('.nav-trigger', _navAnimation, { once: false, rootMargin: "280px" });

window.onload = () => {
  const loader = document.getElementById('loader');
  loader.classList.add('loaded');
}