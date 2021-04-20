const main = {
  init: function () {
    this.navMenu();
    this.bannerSlide();
    this.tab();
    this.carousel();
    this.load();
  },
  navMenu: function () {
    // variable
    const navBtn = document.querySelector('.head-mobile');
    const menu = document.querySelector('.head-nav');
    const head = document.querySelector('.head');
    const btnSubs = document.querySelectorAll('.nav-plus');
    let height = head.offsetHeight;
    let isPlus = true;
    // event
    navBtn.addEventListener('click', showMenu);
    window.addEventListener('scroll', scrollMenu);
    btnSubs.forEach((btnSub) => {
      btnSub.addEventListener('click', (event) => {
        event.preventDefault();
        isPlus = !isPlus;
        let plus = btnSub.childNodes[0];
        let subMenu = btnSub.parentElement.nextElementSibling;
        subMenu.classList.toggle('sub-menu--active');
        if (isPlus) {
          plus.className = 'fas fa-plus';
        } else {
          plus.className = 'fas fa-minus';
        }
      });
    });
    // function
    function showMenu() {
      menu.classList.toggle('head-nav--active');
    }
    function scrollMenu() {
      let currentY = window.pageYOffset;
      if (currentY > height) {
        head.classList.add('head--active');
      } else {
        head.classList.remove('head--active');
      }
    }
    scrollMenu();
  },
  bannerSlide: function () {
    const banner = document.querySelector('.banner');
    if (banner) {
      const bannerItems = [...document.querySelectorAll('.banner-slides__item')];
      const dots = [...document.querySelectorAll('.banner-slides__dot')];
      function slide() {
        let autoSlide = setInterval(() => {
          let indexSlideShow = 0;
          let currentSlide = document.querySelector('.banner-slides__item--active');
          for (
            indexSlideShow;
            (currentSlide = currentSlide.previousElementSibling);
            indexSlideShow++
          ) {}
          runningSlide(indexSlideShow);
        }, 3000);
        function runningSlide(index) {
          if (index < bannerItems.length - 1) {
            for (let i = 0; i < bannerItems.length; i++) {
              bannerItems[i].classList.remove('banner-slides__item--active');
              dots[i].classList.remove('banner-slides__dot--active');
            }
            bannerItems[index].nextElementSibling.classList.add('banner-slides__item--active');
            dots[index].nextElementSibling.classList.add('banner-slides__dot--active');
          } else {
            for (let i = 0; i < bannerItems.length; i++) {
              bannerItems[i].classList.remove('banner-slides__item--active');
              dots[i].classList.remove('banner-slides__dot--active');
            }
            bannerItems[0].classList.add('banner-slides__item--active');
            dots[0].classList.add('banner-slides__dot--active');
          }
        }
        function dotsClick() {
          dots.forEach((dot) => {
            dot.addEventListener('click', () => {
              clearInterval(autoSlide);
              let index = 0;
              dots.forEach((item) => {
                item.classList.remove('banner-slides__dot--active');
              });
              dot.classList.add('banner-slides__dot--active');
              let dotActive = document.querySelector('.banner-slides__dot--active');
              for (index; (dotActive = dotActive.previousElementSibling); index++) {}
              bannerItems.forEach((item) => {
                item.classList.remove('banner-slides__item--active');
              });
              bannerItems[index].classList.add('banner-slides__item--active');
            });
          });
        }
        dotsClick();
        let btnPrev = document.querySelector('.banner-slides__prev');
        let btnNext = document.querySelector('.banner-slides__next');
        btnPrev.addEventListener('click', clickPrev);
        btnNext.addEventListener('click', clickNext);
        function clickPrev() {
          let index = 0;
          let currentSlide = document.querySelector('.banner-slides__item--active');
          clearInterval(autoSlide);
          for (index; (currentSlide = currentSlide.previousElementSibling); index++) {}
          runningSlide(index);
        }
        function clickNext() {
          let index = 0;
          let currentSlide = document.querySelector('.banner-slides__item--active');
          clearInterval(autoSlide);
          for (index; (currentSlide = currentSlide.previousElementSibling); index++) {}
          runningSlide(index);
        }
      }
      slide();
    } else {
      return;
    }
  },
  tab: function () {
    const tabArea = document.querySelector('.product-area');
    if (tabArea) {
      const buttonTabs = document.querySelectorAll('.tab-list__item');
      buttonTabs.forEach((buttonTab) => {
        buttonTab.addEventListener('click', (e) => {
          document
            .querySelector('.tab-list__link--active')
            .classList.remove('tab-list__link--active');
          e.target.classList.add('tab-list__link--active');
          let buttonTarget = e.target.dataset.tab;
          let tabDisplay = [...document.querySelectorAll('.tab-panel')];
          tabDisplay.forEach((tab) => {
            tab.classList.remove('tab-panel--active');
            if (tab.id === buttonTarget) {
              tab.classList.add('tab-panel--active');
            }
          });
        });
      });
    } else {
      return false;
    }
  },
  carousel: function () {
    let homeDetailSection = document.querySelector('.home-detail');
    let brandSection = document.querySelector('.brand');
    let blogSection = document.querySelector('.blog');
    if (homeDetailSection) {
      $('.home-detail__slide').owlCarousel({
        loop: true,
        margin: 20,
        dots: false,
        nav: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          1000: {
            items: 1,
          },
        },
      });
    } else {
      console.log('Not Section');
    }
    if (brandSection) {
      $('.brand-slide').owlCarousel({
        loop: false,
        margin: 20,
        dots: false,
        nav: false,
        responsive: {
          0: {
            items: 2,
          },
          600: {
            items: 3,
          },
          767: {
            items: 4,
          },
          1000: {
            items: 5,
          },
        },
      });
    } else {
      console.log('Not Section');
    }
    if (blogSection) {
      $('.blog-slide').owlCarousel({
        loop: false,
        margin: 20,
        dots: false,
        nav: true,
        responsive: {
          0: {
            items: 1,
          },
          600: {
            items: 1,
          },
          767: {
            items: 2,
          },
          1000: {
            items: 2,
          },
        },
      });
    } else {
      console.log('Not Section');
    }
  },
  load: function () {
    let loading = document.querySelector('.loading');
    window.addEventListener('load', () => {
      setTimeout(() => {
        loading.classList.add('loading--off');
      }, 1500);
    });
  },
};
main.init();
