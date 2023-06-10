"use strict";

(function ($) {
  // 判斷是否為行動裝置
  var isTouchDevice = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/);

  var initSwiper = function initSwiper() {
    new Swiper("#hero .swiper", {
      speed: 1000,
      loop: $("#hero .swiper-slide").length > 1,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      }
    });
  };

  var initAOS = function initAOS() {
    AOS.init({
      duration: 1000,
      once: true
    });
  };

  var toggleMenu = function toggleMenu() {
    $("#siteHeaderBurger").on("click", function () {
      $(this).toggleClass("is-active");
      $("#siteNav").toggleClass("is-open");
    });
  };

  var scrollWindow = function scrollWindow() {
    function checkWindowPosition() {
      var scrollTop = $(window).scrollTop();
      if (scrollTop > 0) {
        $("#siteHeader").addClass("is-scroll");
      } else {
        $("#siteHeader").removeClass("is-scroll");
      }
    }
    checkWindowPosition();
    $(window).on("scroll", checkWindowPosition);
  };

  var goAnchor = function goAnchor() {
    $("[data-href]").on("click", function () {
      var target = $(this).data("href");
      var targetPosition = $(target).offset().top;
      $("html,body").stop().animate({
        scrollTop: targetPosition
      }, 800);
    });
  };

  var goTop = function goTop() {
    $(".go-top").on("click", function () {
      $("html, body").animate({
        scrollTop: 0
      }, 750);
    });
  };

  $(function () {
    initSwiper();
    initAOS();
    toggleMenu();
    scrollWindow();
    goAnchor();
    goTop();
  });
})(jQuery);