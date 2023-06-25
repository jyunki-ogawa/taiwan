new MobileMenuDrop();
new PageTopBtn();

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

const modal1 = new Modal('.modal1', '.modal1__cover', '.modal1__trigger', '.modal1__close', 'modal1-open');
const modal2 = new Modal('.modal2', '.modal2__cover', '.modal2__trigger', '.modal2__close', 'modal2-open');
const modal3 = new Modal('.modal3', '.modal3__cover', '.modal3__trigger', '.modal3__close', 'modal3-open');
const modal4 = new Modal('.modal4', '.modal4__cover', '.modal4__trigger', '.modal4__close', 'modal4-open');

window.onload = () => {
  const loader = document.getElementById('loader');
  loader.classList.add('loaded');
}