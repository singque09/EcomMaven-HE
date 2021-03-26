// NOTICE!! THIS IS REQUIRED TO MAKE YOUR NETO SHOPPING CART WORK
// DO NOT REMOVE UNLESS YOU REALLY KNOW WHAT YOU ARE DOING

/*// lazyload Ei compatible */
// $(document).ready(function() {

// const images = document.querySelectorAll(".lazy_load");


//     function preloadImage(img){
//         var src = img.getAttribute("data-src");
//         var imgClass = img.classList.add("loaded");
//         if(!src){
//            return;
//         }
//         img.src = src;
//         img.removeAttr('style');
//         imgClass;

//     }

//     const imgObserver = new IntersectionObserver((entries, imgObserver) =>{ 
//         entries.forEach(entry =>{
//             if(!entries.isIntersecting){
//                  preloadImage(entry.target);
//              }else{
//                 preloadImage(entry.target);
//                 imgObserver.unobserve(entry.target);
//             }
//         })
//     });

//     images.forEach(image =>{
//         imgObserver.observe(image);
//     });
// });
// $(document).ready(function() {

var loadImage = function (img) {
	if (img.classList.contains('lazy_load')) {
		img.src = img.dataset.src;
		img.classList.remove('lazy_load');
		img.classList.add('loaded');
	}
}

var myImgObserver = new IntersectionObserver(function (entries, imgObserver) {
	for (i = 0; i < entries.length; i++) {
		var entry = entries[i];
		if (entry.isIntersecting) {
			var img = entry.target;
			loadImage(img);
			imgObserver.unobserve(img);
		}
	}
}, { threshold: 0.8 });

document.addEventListener("DOMContentLoaded", function () {
	var images = document.querySelectorAll(".lazy_load");
	for (i = 0; i < images.length; i++) {
		myImgObserver.observe(images[i]);
	}
});

(function ($) {
	$.extend({
		initPageFuncs: function () {
			// Ajax Wish List
			$.addToWishList({
				'class': 'wishlist_toggle',
				'textclass': 'wishlist_text',
				'htmlon': '<i class="fa fa-star" aria-hidden="true" title="Remove from Wishlist"></i>',
				'htmloff': '<i class="fa fa-star-o" aria-hidden="true" title="Add to Wishlist"></i>',
				'tooltip_css': 'whltooltips'
			});
			// Ajax Add To Cart
			$.addToCartInit({
				'async': true,
				'cart_id': 'cartcontents',
				'target_id': 'cartcontentsheader',
				'image_rel': 'itmimg',
				'cart': {
					'footer': '</ul> <br> Total Item(s): <b>##item_count##</b><br />Sub Total: <b>##CURRENCY:product_total##</b><br/> ##IF:product_discount##Discount: <b>##CURRENCY:product_discount##</b><br/>##END IF:product_discount## <button class="viewcart btn btn-default" type="button" onclick="window.location=\'##checkouturl##\';" title="View Shopping Cart">View Cart</button> <button class="checkout btn btn-success" type="button" onclick="window.location=\'##checkouturl##&fn=payment\';" title="Checkout">Checkout</button><button class="edit-message btn btn-default" onclick="window.location=\'##checkouturl##&fn=upsell\';">Edit Card Message</button>'
				}
			});

			$(".disp_ajax_templ").unbind();
			$(".disp_ajax_templ").change(function () {
				var sku = $(this).val();
				var rel = $(this).attr('rel');
				$.load_ajax_template(rel, { 'sku': sku, 'showloading': true, 'procdata': 'n' }, { onLoad: function () { $.initPageFuncs(); } });
			});
			// This renders the instant search results - edit design of ajax results here
			$.initSearchField({
				'result_header': '<ul class="nav nav-list">',
				'result_body': '<li><a href="javascript:void(0);" search-keyword="##keyword##"><img border="0" src="##thumb##" width="36" height="36"/><span class="title">##model##</span></a></li>',
				'result_footer': '</ul>',
				'category_header': '<ul class="nav nav-list">',
				'category_body': '<li><a href="##url##"><span class="thumb"><img border="0" src="##thumb##" width="36" height="36"/></span><span class="title">##fullname##</span> <span class="label label-default">##typename##</span></a></li>',
				'category_footer': '</ul>'
			});
		},

		// For child product multi-add to cart function
		checkValidQty: function () {
			var found = 0;
			$("#multiitemadd :input").each(function () {
				if ($(this).attr('id').match(/^qty/)) {
					if ($(this).val() > 0) {
						found = 1;
					}
				}
			});
			if (found == 0) {
				$.fancybox("Please specify a quantity before adding to cart");
				return false;
			}
			return true;
		},

		modQtyByMulti: function (obj, act) {
			var mul = 1;
			var maxm;
			var minm = 0;
			var objid = obj.replace(/^qty/, '');
			if ($('#qty' + objid).length > 0) {
				if ($('#multiplier_qty' + objid).length > 0) {
					mul = $('#multiplier_qty' + objid).val();
				}
				if ($('#min_qty' + objid).length > 0) {
					minm = $('#min_qty' + objid).val();
				}
				if ($('#max_qty' + objid).length > 0) {
					maxm = $('#max_qty' + objid).val();
				}

				var cur = $('#' + obj).val();
				if (isNaN(cur)) {
					cur = 0;
				}

				if (act == 'add') {
					cur = parseInt(cur) + parseInt(mul);
					if (!isNaN(maxm) && cur > maxm) {
						cur = maxm;
					}
				}
				else if (act == 'subtract') {
					cur = parseInt(cur) - parseInt(mul);
					if (cur < minm) {
						cur = minm;
					}
				}

				$('#qty' + objid).val(cur);
			}
		}
	});
})(jQuery);

$(document).ready(function () {
	// Popup Credit Card CCV Description At Checkout
	$("#card_ccv").fancybox();

	// Popup Terms At Checkout
	$("#terms").fancybox({
		'width': 850,
		'height': 650
	});

	// Jquery Ui Date Picker
	$(".datepicker").datepicker({ dateFormat: "dd/mm/yy" });
	$.initPageFuncs();

	// Carousel
	//$('.carousel').carousel();

	$('.details').each(function () {
		mystring = $(this).text();
		mystring = mystring.replace(/;/g, ";<span>");
		mystring = mystring.replace(/:/g, ":</span>");
		mystring = '<span>' + mystring;
		mystring = mystring.slice(0, -7);
		$(this).text('');
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
		openEffect: 'none',
		closeEffect: 'none',
		scrolling: 'auto',

	});


	if ($(document.body).find('.jcarousel-featured2').length > 0) {

		$('.jcarousel-featured2 .slider').slick({
			dots: false,
			infinite: true,
			arrows: true,
			speed: 500,
			autoplay: true,
			autoplaySpeed: 1000,
			slidesToShow: 4,
			slidesToScroll: 1,
			lazyLoad: 'progressive',
			responsive: [
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,

					}
				}, , {
					breakpoint: 520,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,

					}
				},]
		});
	}

	/*if($(document.body).find('.top-featured-categories').length > 0){
		$('.top-featured-categories .lazy_load').each(function(){
			var img = $(this).data('src');
			$(this).attr('src',img);
			$(this).addClass('loaded').removeAttr('style');
			
		});
		
	}*/


	if ($(document.body).attr('id') != 'n_home') {
		$(document.body).addClass('inner_pages');
	}
});

// Tooltip
$('.tipsy').tooltip({ trigger: 'hover', placement: 'bottom' });

// Who needs AddThis?
function windowPopup(url, width, height) {
	// Calculate the position of the popup so
	// it’s centered on the screen.
	var left = (screen.width / 2) - (width / 2),
		top = (screen.height / 2) - (height / 2);
	window.open(url, "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left);
}
$(".js-social-share").on("click", function (e) {
	e.preventDefault();
	windowPopup($(this).attr("href"), 500, 300);
});

$('.nToggleMenu').click(function () {
	var wWidth = $(window).width();
	if (wWidth > 1201) {
		var toggleTarget = $(this).attr('data-target')
		$(toggleTarget).slideToggle();
		$(toggleTarget).attr('style', 'display: block !important').delay(400);
	} else {
		$('.navbar-collapse-bg').toggleClass('shown');
	}
});

/*// JCarousel
function mycarousel_initCallback(carousel) {
	// Disable autoscrolling if the user clicks the prev or next button.
	carousel.buttonNext.bind('click', function() {
		carousel.startAuto(0);
	});

	carousel.buttonPrev.bind('click', function() {
		carousel.startAuto(0);
	});

	// Pause autoscrolling if the user moves with the cursor over the clip.
	carousel.clip.hover(function() {
		carousel.stopAuto();
	}, function() {
		carousel.startAuto();
	});
}
function jcarousel(selector, breakpoints, thumb_widths){
   $(selector)
    .on('jcarousel:create jcarousel:reload', function() {
        var wrapper_width = $('.jcarousel-wrapper').width();
        switch(true){
            case(wrapper_width >= breakpoints[0]):
               thumb_width = Math.round((breakpoints[0]/100)*thumb_widths[0]);
                $(this).css('width', breakpoints[0]);
                $(this).jcarousel('items').css('width', thumb_width + 'px');
            break;
            case(wrapper_width >= breakpoints[1] && wrapper_width < breakpoints[0]):
                thumb_width = Math.round((breakpoints[1]/100)*thumb_widths[1]);
                $(this).css('width', breakpoints[1]);
                $(this).jcarousel('items').css('width', thumb_width + 'px');
            break;
            case(wrapper_width >= breakpoints[2] && wrapper_width < breakpoints[1]):
                thumb_width = Math.round((breakpoints[2]/100)*thumb_widths[2]);
                $(this).css('width', breakpoints[2]);
                $(this).jcarousel('items').css('width', thumb_width + 'px');
            break;
			case(wrapper_width >= breakpoints[3] && wrapper_width < breakpoints[2]):
                thumb_width = Math.round((breakpoints[3]/100)*thumb_widths[3]);
                $(this).css('width', breakpoints[3]);
                $(this).jcarousel('items').css('width', thumb_width + 'px');
            break;
			case(wrapper_width >= breakpoints[4] && wrapper_width < breakpoints[3]):
                thumb_width = Math.round((breakpoints[4]/100)*thumb_widths[4]);
                $(this).css('width', breakpoints[4]);
                $(this).jcarousel('items').css('width', thumb_width + 'px');
            break;
            case(wrapper_width <= breakpoints[4]):
                $(this).css('width', wrapper_width + 'px');
                $(this).jcarousel('items').css('width', wrapper_width + 'px');
        }
   })
   .jcarousel({
       wrap:'circular',
	   animation: 800
    })
    .jcarouselAutoscroll({
       interval: 3000,
       autostart: true
   });
   $(selector).next().children('.jcarousel-prev').jcarouselControl({
       target: '-=1'
   });

   $(selector).next().children('.jcarousel-next').jcarouselControl({
       target: '+=1'
   });

   $(selector).next().children('.jcarousel-pagination')
   .on('jcarouselpagination:active', 'li', function() {
       $(this).addClass('active');
   })
   .on('jcarouselpagination:inactive', 'li', function() {
       $(this).removeClass('active');
   })
   .jcarouselPagination({
       perPage: 1,
       item: function(page) {
           return '<li><a href="#' + page + '">' + page + '</a></li>';
       }
   });
}*/

if ($(window).width() < 768) {
	$('.footer-menu-title').click(function () {
		$(this).toggleClass('clicked');
		$(this).next().toggle();
	});
}

// Cookie functions
function createCookie(name, value, days) {
	var expires;
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toGMTString();
	} else {
		expires = "";
	}
	document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + expires + "; path=/";
}
function readCookie(name) {
	var nameEQ = encodeURIComponent(name) + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) === ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
	}
	return null;
}
function eraseCookie(name) {
	createCookie(name, "", -1);
}

/* wrapp phone number into anchor on mobile (click to call)*/
if ($(window).width() < 768) {
	$('.phone .fa').wrap('<a href="tel:1300459452"></a>');
	$('.phone span').wrap('<a href="tel:1300459452"></a>');
	$('.phone-num').wrap('<a href="tel:1300459452"></a>');
}

/*schema decode */
$(document).ready(function() { 

function decodeHtml(html) {
    return $('.schemaHolder').html(html).text();
}


 });

/* schema decode - end */

/* reviews slick slider */



 $('.reviewSlider').slick({
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
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});
/* reviews slick slider - end */
/* ponting slick slider */



 $('.productSlider3').slick({
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
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

 $('.pontingImgCarousel').slick({
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
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});

$('#pontingCarousel').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
});
	

/* ponting slick slider - end */
/* about us scroll */
$(".joinUs-au, .downArrowHolderInner").click(function() {
    $('html, body').animate({
        scrollTop: $("#weBelieve").offset().top
    }, 1000);
});
/* about us scroll - end */