(($) => {
  // 判斷是否為行動裝置
  const isTouchDevice = navigator.userAgent.match(
    /(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/
  );

  const initSwiper = () => {
    new Swiper(".hero .swiper", {
      speed: 1000,
      loop: $(".hero .swiper-slide").length > 1,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  };

  const initAOS = () => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  };

  const toggleMenu = () => {
    $("#siteHeaderBurger").on("click", function () {
      $(this).toggleClass("is-active");
      $("#siteNav").toggleClass("is-open");
    });
  };

  const scrollWindow = () => {
    function checkWindowPosition() {
      const scrollTop = $(window).scrollTop();
      if (scrollTop > 0) {
        $("#siteHeader").addClass("is-scroll");
      } else {
        $("#siteHeader").removeClass("is-scroll");
      }
    }
    checkWindowPosition();
    $(window).on("scroll", checkWindowPosition);
  };

  const goAnchor = () => {
    $("[data-href]").on("click", function () {
      const target = $(this).data("href");
      const targetPosition = $(target).offset().top;
      $("html,body").stop().animate(
        {
          scrollTop: targetPosition,
        },
        800
      );
    });
  };

  const goTop = () => {
    $(".go-top").on("click", function () {
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        750
      );
    });
  };

  $(() => {
    initSwiper();
    initAOS();
    toggleMenu();
    scrollWindow();
    goAnchor();
    goTop();
  });
})(jQuery);
