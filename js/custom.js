// NOTICE!! THIS IS REQUIRED TO MAKE YOUR NETO SHOPPING CART WORK
// DO NOT REMOVE UNLESS YOU REALLY KNOW WHAT YOU ARE DOING

var nCustom = {
  vars: {
    focused: $("body"),
    lastFocused: $("body"),
  },
  funcs: {
    initPageFuncs: function () {
      // Ajax Wish List
      $.addToWishList({
        class: "wishlist_toggle",
        textclass: "wishlist_text",
        htmlon: '<i class="fas fa-star" aria-hidden="true"></i>',
        htmloff: '<i class="far fa-star" aria-hidden="true"></i> Wishlist',
        tooltip_css: "whltooltips",
        imageon: "",
        imageoff: "",
      });
      // Ajax Add To Cart
      $.addToCartInit({
        cart_id: "cartcontents",
        target_id: "cartcontentsheader",
        image_rel: "itmimg",
      });
      // Renders the instant search results - edit design of ajax results here
      $.initSearchField({
        result_header: '<ul class="nav nav-list">',
        result_body:
          '<li><a href="##url##" search-keyword="##keyword##"><img border="0" src="##thumb##" width="36" height="36"/><span class="title">##model##</span></a></li>',
        result_footer: "</ul>",
        category_header: '<ul class="nav nav-list">',
        category_body:
          '<li><a href="##url##"><span class="thumb"><img border="0" src="##thumb##" width="36" height="36"/></span><span class="title">##fullname##</span> <span class="label label-default">##typename##</span></a></li>',
        category_footer: "</ul>",
      });
    },
    // For child product multi-add to cart function
    checkValidQty: function () {
      var found = 0;
      $("#multiitemadd :input").each(function () {
        if ($(this).attr("id").match(/^qty/)) {
          if ($(this).val() > 0) {
            found = 1;
          }
        }
      });
      if (found == 0) {
        $.nPopupBox("Please specify a quantity before adding to cart");
        return false;
      }
      return true;
    },
    // Capture the last item focused
    updateFocused: function () {
      nCustom.vars.lastFocused = nCustom.vars.focused;
    },
    // Place focus on popup
    popupFocus: function () {
      var popUp = document.getElementById("npopupDesc");
      // Configures the observer
      var config = { childList: true };
      // Create an observer instance
      var popUpObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          // Initial observer
          if (mutation.addedNodes["0"]) {
            nCustom.funcs.updateFocused();
            // focus on the popup
            $(popUp).attr("tabindex", "-1").trigger("focus");
          } else {
            $(popUp).attr("tabindex", "").trigger("focus");
            // Observer closing popup
            $(nCustom.vars.lastFocused).trigger("focus");
          }
        });
      });
      // Pass in the target node, as well as the observer options
      if (popUp) {
        popUpObserver.observe(popUp, config);
      }
    },
    buttonLoading: function () {
      var loadingText = $(this).attr("data-loading-text");
      var originalText = $(this).html();
      $(this).html(loadingText).addClass("disabled").prop("disabled", true);
      var pendingButton = this;
      setTimeout(function () {
        $(pendingButton)
          .html(originalText)
          .removeClass("disabled")
          .prop("disabled", false);
      }, 3000);
    },
    windowPopup: function (url, width, height) {
      // Calculate the position of the popup so it’s centered on the screen.
      var left = screen.width / 2 - width / 2,
        top = screen.height / 2 - height / 2;
      window.open(
        url,
        "",
        "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" +
          width +
          ",height=" +
          height +
          ",top=" +
          top +
          ",left=" +
          left
      );
    },
    // Will remove/add class from element
    classToggle: function (element, css, type) {
      if (type) {
        type == "add" ? $(element).addClass(css) : $(element).removeClass(css);
      }
    },
  },
};

$(document).ready(function () {
  // Neto functionalty
  nCustom.funcs.initPageFuncs();
  nCustom.funcs.popupFocus();
  // Jquery Ui Date Picker
  $(".datepicker").datepicker({ dateFormat: "dd/mm/yy" });
  // Carousel
  $(".carousel").carousel();
  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();
});
// Capture the current element the user focused in
$(document).on("focusin", function () {
  nCustom.vars.focused = document.activeElement;
});
// Btn loading state
$(document).on("click", ".btn-loads", nCustom.funcs.buttonLoading);
// Social media share
$(".js-social-share").on("click", function (e) {
  e.preventDefault();
  nCustom.funcs.windowPopup($(this).attr("href"), 500, 300);
});
// Mobile menu
$(".nToggleMenu").on("click", function () {
  var toggleTarget = $(this).attr("data-target");
  $(toggleTarget).slideToggle();
});
// Invoice page
$("#cart_items").on("click", "[data-body-add]", function (e) {
  e.preventDefault();
  nCustom.funcs.classToggle("body", $(this).attr("data-body-add"), "add");
});
$("#cart_items").on("click", "[data-body-remove]", function (e) {
  e.preventDefault();
  nCustom.funcs.classToggle("body", $(this).attr("data-body-remove"), "remove");
});
$("#_jstl__buying_options").on(
  "click",
  ".js-notifymodal-in-stock",
  function (e) {
    e.preventDefault();
    // Get values
    var sku = $(this).attr("data-sku");
    var $wrapper = $("#notifymodal .checkbox");
    var $terms = $("#notifymodal .terms_box");
    var $helpText = $("#notifymodal .checkbox .help-block");
    // Validate form
    if (!$.isChecked($terms)) {
      $wrapper.addClass("has-error");
      $helpText.removeClass("hidden");
      return false;
    } else {
      $wrapper.removeClass("has-error");
      $helpText.addClass("hidden");
      // Dismiss modal
      $("#notifymodal").modal("hide");
      // Send information
      $.addNotifyBackInStock(sku, "");
      $terms.attr("checked", false);
      return true;
    }
  }
);
// Multi add child products
$(".multi-add").on("click", function () {
  if (nCustom.funcs.checkValidQty()) {
    $.addMultipleCartItems("multiitemadd");
    return false;
  }
});

var loadImage = function (img) {
  if (img.classList.contains("lazy_load")) {
    img.src = img.dataset.src;
    img.classList.remove("lazy_load");
    img.classList.add("loaded");
  }
};

var myImgObserver = new IntersectionObserver(
  function (entries, imgObserver) {
    for (i = 0; i < entries.length; i++) {
      var entry = entries[i];
      if (entry.isIntersecting) {
        var img = entry.target;
        loadImage(img);
        imgObserver.unobserve(img);
      }
    }
  },
  { threshold: 0.8 }
);

document.addEventListener("DOMContentLoaded", function () {
  var images = document.querySelectorAll(".lazy_load");
  for (i = 0; i < images.length; i++) {
    myImgObserver.observe(images[i]);
  }
});

$(document).ready(function () {
  // Popup Credit Card CCV Description At Checkout
  $("#card_ccv").fancybox();

  // Popup Terms At Checkout
  $("#terms").fancybox({
    width: 850,
    height: 650,
  });

  // Jquery Ui Date Picker
  $(".datepicker").datepicker({ dateFormat: "dd/mm/yy" });
  $.initPageFuncs();

  // Carousel
  //$('.carousel').carousel();

  $(".details").each(function () {
    mystring = $(this).text();
    mystring = mystring.replace(/;/g, ";<span>");
    mystring = mystring.replace(/:/g, ":</span>");
    mystring = "<span>" + mystring;
    mystring = mystring.slice(0, -7);
    $(this).text("");
    $(this).append(mystring);
  });

  /* $('#header-cart').hover(function() {
		$(this).find('.dropdown-menu').toggle();
	}); */
});

$(".btn-loads").click(function () {
  $(this).button("loading");
  var pendingbutton = this;
  setTimeout(function () {
    $(pendingbutton).button("reset");
  }, 3000);
});

// Fancybox
$(document).ready(function () {
  $(".fancybox").fancybox();
  $(".contentrev-pop").fancybox({
    maxWidth: 300,
    maxHeight: 452,
    fitToView: false,
    width: 300,
    height: 452,
    autoSize: false,
    closeClick: false,
    openEffect: "none",
    closeEffect: "none",
    scrolling: "auto",
  });

  if ($(document.body).find(".jcarousel-featured2").length > 0) {
    $(".jcarousel-featured2 .slider").slick({
      dots: false,
      infinite: true,
      arrows: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 1000,
      slidesToShow: 4,
      slidesToScroll: 1,
      lazyLoad: "progressive",
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        ,
        {
          breakpoint: 520,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  }

  /*if($(document.body).find('.top-featured-categories').length > 0){
		$('.top-featured-categories .lazy_load').each(function(){
			var img = $(this).data('src');
			$(this).attr('src',img);
			$(this).addClass('loaded').removeAttr('style');
			
		});
		
	}*/

  if ($(document.body).attr("id") != "n_home") {
    $(document.body).addClass("inner_pages");
  }
});

// Tooltip
$(".tipsy").tooltip({ trigger: "hover", placement: "bottom" });

// Who needs AddThis?
function windowPopup(url, width, height) {
  // Calculate the position of the popup so
  // it’s centered on the screen.
  var left = screen.width / 2 - width / 2,
    top = screen.height / 2 - height / 2;
  window.open(
    url,
    "",
    "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" +
      width +
      ",height=" +
      height +
      ",top=" +
      top +
      ",left=" +
      left
  );
}
$(".js-social-share").on("click", function (e) {
  e.preventDefault();
  windowPopup($(this).attr("href"), 500, 300);
});

$(".nToggleMenu").click(function () {
  var wWidth = $(window).width();
  if (wWidth > 1201) {
    var toggleTarget = $(this).attr("data-target");
    $(toggleTarget).slideToggle();
    $(toggleTarget).attr("style", "display: block !important").delay(400);
  } else {
    $(".navbar-collapse-bg").toggleClass("shown");
  }
});

if ($(window).width() < 768) {
  $(".footer-menu-title").click(function () {
    $(this).toggleClass("clicked");
    $(this).next().toggle();
  });
}

// Cookie functions
function createCookie(name, value, days) {
  var expires;
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  document.cookie =
    encodeURIComponent(name) +
    "=" +
    encodeURIComponent(value) +
    expires +
    "; path=/";
}
function readCookie(name) {
  var nameEQ = encodeURIComponent(name) + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0)
      return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}
function eraseCookie(name) {
  createCookie(name, "", -1);
}

/* wrapp phone number into anchor on mobile (click to call)*/
if ($(window).width() < 768) {
  $(".phone .fa").wrap('<a href="tel:1300459452"></a>');
  $(".phone span").wrap('<a href="tel:1300459452"></a>');
  $(".phone-num").wrap('<a href="tel:1300459452"></a>');
}

/*schema decode */
$(document).ready(function () {
  function decodeHtml(html) {
    return $(".schemaHolder").html(html).text();
  }
});

/* schema decode - end */

/* reviews slick slider */

$(".reviewSlider").slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 2,
  centerMode: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});
/* reviews slick slider - end */
/* ponting slick slider */

$(".productSlider3").slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});

$(".pontingImgCarousel").slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ],
});

$("#pontingCarousel").slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
});

/* ponting slick slider - end */
/* about us scroll */
$(".joinUs-au, .downArrowHolderInner").click(function () {
  $("html, body").animate(
    {
      scrollTop: $("#weBelieve").offset().top,
    },
    1000
  );
});
/* about us scroll - end */
