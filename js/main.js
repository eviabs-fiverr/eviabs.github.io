var types = ["stars", "polygons", "snow", "bubbles2"];
var last_type = 0;

jQuery(document).ready(function( $ ) {

    // Back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function(){
        $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
        return false;
    });

    // Initiate the wowjs animation library
    wow = new WOW(
        {
            boxClass:     'wow',      // default
            animateClass: 'animated', // default
            offset:       0,          // default
            mobile:       false,
            live:         true        // default
        }
    )
    wow.init();

    // Initiate superfish on nav menu
    $('.nav-menu').superfish({
        animation: {
            opacity: 'show'
        },
        speed: 400
    });

    // Mobile Navigation
    if ($('#nav-menu-container').length) {
        var $mobile_nav = $('#nav-menu-container').clone().prop({
            id: 'mobile-nav'
        });
        $mobile_nav.find('> ul').attr({
            'class': '',
            'id': ''
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
        $('body').append('<div id="mobile-body-overly"></div>');
        $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

        $(document).on('click', '.menu-has-children i', function(e) {
            $(this).next().toggleClass('menu-item-active');
            $(this).nextAll('ul').eq(0).slideToggle();
            $(this).toggleClass("fa-chevron-up fa-chevron-down");
        });

        $(document).on('click', '#mobile-nav-toggle', function(e) {
            $('body').toggleClass('mobile-nav-active');
            $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
            $('#mobile-body-overly').toggle();
        });

        $(document).click(function(e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    // Smooth scroll for the menu and links with .scrollto classes
    $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            if (target.length) {
                var top_space = 0;

                if ($('#header').length) {
                    top_space = $('#header').outerHeight();

                    if( ! $('#header').hasClass('header-fixed') ) {
                        top_space = top_space - 20;
                    }
                }

                $('html, body').animate({
                    scrollTop: target.offset().top - top_space
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu').length) {
                    $('.nav-menu .menu-active').removeClass('menu-active');
                    $(this).closest('li').addClass('menu-active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }
                return false;
            }
        }
    });

    // Header scroll class
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#header').addClass('header-scrolled');
        } else {
            $('#header').removeClass('header-scrolled');
        }
    });

    // jQuery counterUp (used in Facts section)
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });

    // Porfolio isotope and filter
    var projectsIsotope = $('.projects-container').isotope({
        itemSelector: '.projects-item',
        layoutMode: 'fitRows'
    });

    $('#projects-flters li').on( 'click', function() {
        $("#projects-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        projectsIsotope.isotope({ filter: $(this).data('filter') });
    });

    // Clients carousel (uses the Owl Carousel library)
    $(".skills-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: false,
        rewind: true,
        responsive: { 0: { items: 3 }, 768: { items: 4 }, 900: { items: 6 }
        }
    });


    /* particlesJS.load(@dom-id, @path-json, @callback (optional));
    * More options: https://vincentgarreau.com/particles.js/#default
    */
    var loadParticlesJS = function(type) {
        if (type === undefined || type === "") {
            last_type = (last_type + 1) % types.length;
            type = types[last_type];
        }

        particlesJS.load('particles-js', 'lib/particles/particlesjs-config-' + type + '.json', function () {
            console.log('callback - particles.js config loaded');
        });
    };

    // Change particles on logo click
    $('#logo a').on('click', function() {
        if ($('#mobile-nav-toggle').css('display') === "none") {
            // loadParticlesJS(types[Math.floor(Math.random()*types.length)]); // for random
            loadParticlesJS();                                                 // for sequential
        }
    });

    loadParticlesJS();

});
