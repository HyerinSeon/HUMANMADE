document.addEventListener(`DOMContentLoaded`, function () {
  const windowWidth = window.innerWidth;

  // swiper
  let swiper = undefined;
  function initSwiper() {
    const windowWidth = window.innerWidth;
    if (windowWidth >= 960 && swiper == undefined) {
      swiper = new Swiper(".mySwiper", {
        loop: true,
        slidesPerView: 3,
        centeredSlides: true,
        initialSlide: 0,
        spaceBetween: 50,
      },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    } else if (windowWidth < 960 && swiper != undefined) {
      swiper.destroy();
      swiper = undefined;
    }
  }

  initSwiper();

  // scroll 고정
  let scrollHandler = null;

  function scrollFixed() {
    const windowWidth = window.innerWidth;
    const section3 = document.querySelector(`.sec_3`);
    const section4 = document.querySelector(`.sec_4`);

    // 기존 scroll 이벤트 리스너 제거
    if (scrollHandler !== null) {
      window.removeEventListener(`scroll`, scrollHandler);
      scrollHandler = null;
    }

    if (windowWidth >= 1450) {
      scrollHandler = function () {
        const scrollHeight = window.scrollY;
        const sec3Top = section3.offsetTop;
        const sec4Top = section4.offsetTop;

        if (scrollHeight >= sec3Top && scrollHeight < sec4Top - 120) {
          section3.classList.add(`active`);
        } else {
          section3.classList.remove(`active`);
        }
      };

      window.addEventListener(`scroll`, scrollHandler);
    } else {
      // 1450px 미만일 때 section3에서 active 제거
      section3.classList.remove(`active`);
    }
  }

  scrollFixed();

  // 윈도우가 리사이즈 될 때 자동 반응 하도록 설정
  window.addEventListener(`resize`, function () {
    initSwiper();
    scrollFixed();
  });

  // header scroll event
  window.addEventListener(`wheel`, (event) => {
    const headerArea = document.querySelector(`.header`);
    if (event.deltaY > 0) {
      // wheel down
      headerArea.classList.remove(`scroll`);
    } else {
      //wheel up
      headerArea.classList.add(`scroll`);
    }
  });

  // language
  const lan = document.querySelector(`.lan`);
  const languageSubMenu = document.querySelector(`.language_sub_menu`);
  lan.addEventListener(`click`, function () {
    languageSubMenu.classList.toggle(`click`);
  });

  // main menu
  const menuList = document.querySelectorAll(`.menu_list`);

  for (const mainMenu of menuList) {
    mainMenu.addEventListener(`mouseenter`, function () {
      const subMenu = this.querySelector(`.sub_menu`);
      subMenu.classList.add(`on`);
    });

    mainMenu.addEventListener(`mouseleave`, function () {
      const subMenuAll = document.querySelectorAll(`.sub_menu`);
      for (const subMenuBox of subMenuAll) {
        subMenuBox.classList.remove(`on`);
      }
    });
  }

  // hamburger button
  const hamburgerBtn = document.getElementById(`hamburger`);
  const mainMenuOn = document.querySelector(`.main_menu`);

  hamburgerBtn.addEventListener(`click`, function () {
    this.classList.toggle(`click`);

    const btnOn = this.classList.contains(`click`);
    if (btnOn) {
      mainMenuOn.classList.add(`on`);
    } else {
      mainMenuOn.classList.remove(`on`);
    }
  });
});
