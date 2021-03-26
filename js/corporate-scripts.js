$('.search i.click').click(function() {
    $('.search form').toggle();
});
$('.corporate-menu-expander').click(function() {
    $(this).next('.corporate-list-mobile').toggleClass('corporate-list-mobile-expanded');
    $(this).find('.fa-angle-down').toggleClass('fa-angle-up');
});
/* change track order anchor in footer if user logged */
if ($(".track-order-user")[0]){
    $('.footer-menu-holder .footer-menu:first-child ul li:nth-child(3) a').attr('href', 'https://www.thehamperemporium.com.au/_myacct#orders');
}

$(document).ready(function() {

    // Slider initiations

    $('.gold-ribbon__slick').slick({
      lazyLoad: 'anticipated',
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      dots: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: false,
            infinite: false,
            slidesToShow: 1.2,
            slidesToScroll: 1
          }
        }
      ],
    });

    $('.silver-ribbon__slick').slick({
      lazyLoad: 'anticipated',
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      dots: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: false,
            infinite: false,
            slidesToShow: 1.2,
            slidesToScroll: 1
          }
        }
      ],
    });

    $('.gift-card__slick').slick({
      lazyLoad: 'anticipated',
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 4,
      dots: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: false,
            infinite: false,
            slidesToShow: 1.2,
            slidesToScroll: 1
          }
        }
      ],
    });

    $('.testimonials__slick').slick({
      lazyLoad: 'anticipated',
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            slidesToShow: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: false,
            dots: false,
            slidesToShow: 1,
          }
        }
      ],
    });
});
