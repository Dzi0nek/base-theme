AOS.init();

document.addEventListener("DOMContentLoaded", () => {
  //  Sticky Nav
  let nav = document.getElementById('logoAndNav');
  const scroll = 100;
  const windowScroll = window.addEventListener('scroll', function () {
    let p = window.scrollY;
    if (p > scroll) {
      nav.classList.add("sticky");
    } else {
      nav.classList.remove('sticky');
    }
  });
  const slider = new Swiper('.slider', {
    speed: 800,
    duration: 2000,
    spaceBetween: 30,
    centeredSlides: false,
    centerInsufficientSlides: true,
    slidesPerView: 2,
    mode: 'horizontal',
    grabCursor: true,
    loop: true,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
      },
      // when window width is >= 480px
      720: {
        slidesPerView: 2,
      },
      // when window width is >= 640px
      840: {
        slidesPerView: 3,
      },
      1280: {
        slidesPerView: 3,
      },
    },
  });

  // Mobile Menu
  const iconWrap = document.querySelector('.mobile-icon-wrapper');
  // toggleClassFunction
  function tC(e,c){
    e.classList.toggle(c);
  }
  // Main icon click
  iconWrap.addEventListener('click', function () {
    // Grabbing elements
    const menuWrap = document.querySelector('.mobile-menu-wrap');
    const navi = document.querySelector('.nav');
    const mobileIcon = document.querySelector('.mobile-icon');
    const iconDropdown = document.querySelector('.icon-dropdown');
    const dropMenu = document.querySelector('.drop-menu');
    const submenuBack = document.querySelector('.submenu-wrapper');
    const body = document.querySelector('body');
    const html = document.querySelector('html');

    tC(menuWrap,'show');
    tC(mobileIcon,'active');
    tC(body,'mobile-menu-opened');
    tC(html,'mobile-menu-opened');

    // Submenu show
    iconDropdown.addEventListener("click", function (){
      tC(dropMenu,'slide')
      tC(navi,'slide-back')
    });
    // Submenu hide
    submenuBack.addEventListener("click", function (){
      tC(dropMenu,'slide')
      tC(navi,'slide-back')
    });
  });


  // SVG img parsing to code
  const convertImages = (query, callback) => {
    const images = document.querySelectorAll(query);

    images.forEach(image => {
      fetch(image.src)
        .then(res => res.text())
        .then(data => {
          const parser = new DOMParser();
          const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');

          if (image.id) svg.id = image.id;
          if (image.className) svg.classList = image.classList;

          image.parentNode.replaceChild(svg, image);
        })
        .then(callback)
        .catch(error => console.error(error))
    });
  }

  convertImages('img.injectable');

}); //document is ready end