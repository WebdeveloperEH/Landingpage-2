/*----------------------------------------------
*
* [Main Scripts]
*
* Theme    : sApp
* Version  : 3.0
* Author   : Themeland
* Support  : hridoy1272@gmail.com
* 
----------------------------------------------*/

/*----------------------------------------------

[ALL CONTENTS]

1. Preloader
2. Responsive Menu
3. Navigation
4. Slides
5. Features Slides
6. counterUp
7. AOS
8. Wow JS
9. Contact Form

/*----------------------------------------------
1. Preloader
----------------------------------------------*/
(function ($) {
  "use strict";

  $(window).on("load", function () {
    $(".preloader-wapper").addClass("loaded");

    if ($(".preloader-wapper").hasClass("loaded")) {
      $(".preloader-main")
        .delay(1200)
        .queue(function () {
          $(this).remove();
        });
    }
  });
})(jQuery);

/*----------------------------------------------
2. Responsive Menu
----------------------------------------------*/
(function ($) {
  "use strict";

  // Clone the navbar for the responsive menu
  function navResponsive() {
    let navbar = $(".navbar .items");
    let menu = $("#menu .items");

    menu.html("");
    navbar.clone().appendTo(menu);

    $(".menu .icon-arrow-right")
      .removeClass("icon-arrow-right")
      .addClass("icon-arrow-down");
  }

  navResponsive();

  // Re-trigger cloning on window resize
  $(window).on("resize", function () {
    navResponsive();
  });

  // Add a class for dropdowns based on the number of child items
  $(".menu .dropdown-menu").each(function () {
    var children = $(this).children(".dropdown").length;
    $(this).addClass("children-" + children);
  });

  // Add 'prevent' class to nav items with dropdowns
  $(".menu .nav-item.dropdown").each(function () {
    var children = $(this).children(".nav-link");
    children.addClass("prevent");
  });

  // Toggle dropdown menu and rotate icon-arrow-down
  $(document).on("click", "#menu .nav-item .nav-link", function (event) {
    if ($(this).hasClass("prevent")) {
      event.preventDefault();
    }

    var nav_link = $(this);
    var parentNav = nav_link.closest(".nav-item"); // Get the parent nav-item
    var currentDropdown = nav_link.next(".dropdown-menu"); // Get the current dropdown
    var arrowIcon = nav_link.find(".icon-arrow-down"); // Get the arrow icon

    // Close sibling dropdowns and reset their arrow icons
    parentNav
      .siblings()
      .find(".dropdown-menu.show")
      .slideUp(300)
      .removeClass("show");
    parentNav.siblings().find(".icon-arrow-down").removeClass("rotate-arrow"); // Reset arrow rotation

    // Toggle the current dropdown and rotate the arrow icon
    currentDropdown.slideToggle(300).toggleClass("show");
    arrowIcon.toggleClass("rotate-arrow"); // Add rotation class to arrow icon

    if (nav_link.hasClass("smooth-anchor")) {
      $("#menu").modal("hide");
    }
  });
})(jQuery);

/*----------------------------------------------
3. Navigation
----------------------------------------------*/
(function ($) {
  "use strict";

  var position = $(window).scrollTop();
  var navbar = $(".navbar");
  var toTop = $("#scroll-to-top");

  // Hide navbar initially if scroll position > 0
  $(document).ready(function () {
    if (position > 0) {
      navbar.hide();
    }
  });

  toTop.hide();

  // Sticky and fade behavior when scrolling
  $(window).scroll(function () {
    let scroll = $(window).scrollTop();
    let navbar = $(".navbar");

    if (!navbar.hasClass("relative")) {
      if (scroll > position) {
        if (window.screen.width >= 767) {
          navbar.fadeOut("fast");
        } else {
          navbar.addClass("navbar-sticky");
        }
        toTop.fadeOut("fast");
      } else {
        if (position < 76) {
          navbar.slideDown("fast").removeClass("navbar-sticky");
        } else {
          navbar.slideDown("fast").addClass("navbar-sticky");
        }

        if (position > 1023) {
          if (window.screen.width >= 767) {
            toTop.fadeIn("fast");
          }
        } else {
          toTop.fadeOut("fast");
        }
      }
      position = scroll;
    }
  });

  // Smooth scrolling for internal links
  $(".nav-link").each(function () {
    let href = $(this).attr("href");
    if (href.length > 1 && href.indexOf("#") != -1) {
      $(this).addClass("smooth-anchor");
    }
  });

  // Smooth scroll on click
  $(document).on("click", ".smooth-anchor", function (event) {
    event.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($.attr(this, "href")).offset().top,
      },
      500
    );
  });

  // Prevent default action for empty anchor links
  $(document).on("click", 'a[href="#"]', function (event) {
    event.preventDefault();
  });

  // Dropdown hover effect for desktop
  $(".dropdown-menu").each(function () {
    let dropdown = $(this);
    dropdown.hover(
      function () {
        dropdown.parent().find(".nav-link").first().addClass("active");
      },
      function () {
        dropdown.parent().find(".nav-link").first().removeClass("active");
      }
    );
  });
})(jQuery);

/*----------------------------------------------
4. Slides
----------------------------------------------*/
(function ($) {
  "use strict";

  var midSlider = new Swiper(".slider-mid", {
    autoplay: true,
    loop: true,
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1023: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var brandSlider = new Swiper(".slider-brand", {
    autoplay: true,
    loop: true,
    slidesPerView: 2,
    spaceBetween: 20,
    breakpoints: {
      767: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1023: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  var minSlider = new Swiper(".slider-min", {
    autoplay: true,
    loop: true,
    slidesPerView: 1,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  minSlider.on("slideChangeTransitionStart", function () {
    $(".testimonials .item img, .testimonials .review-icon")
      .removeClass("animated zoomIn")
      .css("opacity", "0");
  });

  minSlider.on("slideChangeTransitionEnd", function () {
    $(".testimonials .item img, .testimonials .review-icon")
      .addClass("animated zoomIn")
      .css("opacity", "1");
  });
})(jQuery);

/*----------------------------------------------
5. Features Slides
----------------------------------------------*/
(function ($) {
  "use strict";

  $(".features-slider.owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    nav: false,
    dots: true,
    smartSpeed: 1500,
    autoplay: true,
    autoplayTimeout: 6000,
    dotsContainer: ".features-content",
  });
})(jQuery);

/*----------------------------------------------
6. counterUp
----------------------------------------------*/
(function ($) {
  "use strict";

  const counterUp = window.counterUp.default;

  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting && !el.classList.contains("is-visible")) {
        counterUp(el, {
          duration: 1000,
          delay: 10,
        });
        el.classList.add("is-visible");
      }
    });
  };

  const IO = new IntersectionObserver(callback, { threshold: 1 });

  // Use querySelectorAll and loop through each '.counter' element
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => IO.observe(counter));
})(jQuery);

/*----------------------------------------------
7. AOS
----------------------------------------------*/
(function ($) {
  "use strict";

  AOS.init();
})(jQuery);

/*----------------------------------------------
8. Wow JS
----------------------------------------------*/
(function ($) {
  "use strict";

  new WOW().init();
})(jQuery);

/*----------------------------------------------
9. Contact Form
----------------------------------------------*/
(function ($) {
  "use strict";

  // Get the form.
  var form = $("#contact-form");
  // Get the messages div.
  var formMessages = $(".form-message");
  // Set up an event listener for the contact form.
  $(form).submit(function (e) {
    // Stop the browser from submitting the form.
    e.preventDefault();
    // Serialize the form data.
    var formData = $(form).serialize();
    // Submit the form using AJAX.
    $.ajax({
      type: "POST",
      url: $(form).attr("action"),
      data: formData,
    })
      .done(function (response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass("error");
        $(formMessages).addClass("success");

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $("#contact-form input, #contact-form textarea").val("");
      })
      .fail(function (data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass("success");
        $(formMessages).addClass("error");

        // Set the message text.
        if (data.responseText !== "") {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text(
            "Oops! An error occured and your message could not be sent."
          );
        }
      });
  });
})(jQuery);
