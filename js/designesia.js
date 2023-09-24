// © Copyright 2023 - Archi 5.8 by Designesia 

jQuery(document).ready(function() {
    'use strict'; // use strict mode

    var preloader = 1; // 1 - enable, 0 - disable
    var smooth_scroll = 0; // 1 - enable, 0 - disable
    var de_header_style = 1; // 1 - solid, 2 - transparent
    var de_header_layout = 1; // 1 - default, 2 - extended
    var de_header_color = 1; // 1 - default, 2 - light style
    var de_header_sticky = 1; // 1 - sticky, 2 - scroll
    var de_header_mobile_sticky = 2; // 1 - sticky, 2 - scroll
    var de_menu_separator = 1; // 1 - dotted, 2 - border, 3 - circle, 4 - square, 5 - plus, 6 - strip, 0 - none
    var de_color_style = 1; // 1 - default, 2 - light style
    var de_font_style = 1; // 1 - default, 2 - alternate font style
    var de_force_mobile_menu = 0; // 1 - yes, 0 - no

    // init
    var mobile_menu_show = 0;
    var grid_size = 10;
    var col = 4;
    var tmp_col = col;
    var sr = 466 / 700;
    var $container = jQuery('#gallery');
    var v_count = '0';

    
    // zoom gallery
    jQuery('.zoom-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        image: {
            verticalFit: true,
            titleSrc: function(item) {
                return item.el.attr('title');
                //return item.el.attr('title') + ' &middot; <a class="image-source-link" href="'+item.el.attr('data-source')+'" target="_blank">image source</a>';
            }
        },
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }

    });

    
    /* --------------------------------------------------
     * custom background
     * --------------------------------------------------*/
    function custom_bg() {
        $("*").css('background-color', function() {
            return jQuery(this).data('bgcolor');
        });
        $("body,div,section,span").css('background', function() {
            return jQuery(this).data('bgimage');
        });
        $("div,section").css('background-size', function() {
            return 'cover';
        });
    }

    // progress bar //
    function de_progress() {
        jQuery('.de-progress').each(function() {
            var pos_y = jQuery(this).offset().top;
            var value = jQuery(this).find(".progress-bar").attr('data-value');
            var topOfWindow = jQuery(window).scrollTop();
            if (pos_y < topOfWindow + 550) {
                jQuery(this).find(".progress-bar").animate({
                    'width': value
                }, "slow");
            }

            jQuery(this).find('.value').text(jQuery(this).find('.progress-bar').attr('data-value'));
        });
    }

    // wow jquery

    new WOW().init();

    // --------------------------------------------------
    // init
    // --------------------------------------------------
    function init_de() {

        enquire.register("screen and (max-width: 993px)", {
            match: function() {
                $('header').addClass("header-mobile");
            },
            unmatch: function() {
                $('header').removeClass("header-mobile");
            }
        });

        var $window = jQuery(window);
        jQuery('section[data-type="background"]').each(function() {
            var $bgobj = jQuery(this); // assigning the object

            jQuery(window).scroll(function() {

                enquire.register("screen and (min-width: 993px)", {
                    match: function() {
                        var yPos = -($window.scrollTop() / $bgobj.data('speed'));
                        var coords = '50% ' + yPos + 'px';
                        $bgobj.css({
                            backgroundPosition: coords
                        });
                    }
                });
            });
            document.createElement("article");
            document.createElement("section");
        });

        jQuery('.grid.border').css('padding-top', grid_size);
        jQuery('.grid.border').css('padding-left', grid_size);
    }

    function grid_gallery() {
        jQuery('.grid-item').each(function() {
            var this_col = Number(jQuery(this).parent().attr('data-col'));
            var this_gridspace = Number(jQuery(this).parent().attr('data-gridspace'));
            var this_ratio = eval($(this).parent().attr('data-ratio'));
            jQuery(this).parent().css('padding-left', this_gridspace);
            var w = (($(document).width() - (this_gridspace * this_col + 1)) / this_col) - (this_gridspace / this_col);
            var gi = $(this);
            var h = w * this_ratio;
            gi.css('width', w);
            gi.css('height', h);
            gi.find(".pf_title").css('margin-top', (h / 2) - 10);
            gi.css('margin-right', this_gridspace);
            gi.css('margin-bottom', this_gridspace);
            if (gi.hasClass('large')) {
                $(this).css('width', (w * 2) + this_gridspace);
                $(this).css('height', (h * 2) + this_gridspace);
            }
            if (gi.hasClass('large-width')) {
                $(this).css('width', (w * 2) + this_gridspace);
                $(this).css('height', h);
            }
            if (gi.hasClass('large-height')) {
                $(this).css('height', (h * 2) + this_gridspace);
                gi.find(".pf_title").css('margin-top', (h) - 20);
            }
        });
    }


    init_de();
    de_progress();
    grid_gallery();
    centery();


    // --------------------------------------------------
    // preloader
    // --------------------------------------------------

    if (preloader == 1) {
        //calling jPreLoader function with properties
        jQuery('body').jpreLoader({
            splashID: "#jSplash",
            splashFunction: function() { //passing Splash Screen script to jPreLoader
                jQuery('#jSplash').children('section').not('.selected').hide();
                jQuery('#jSplash').hide().fadeIn(800);
                init_de();
                var timer = setInterval(function() {
                    splashRotator();
                }, 1500);
            }
        }, function() { //jPreLoader callback function
            clearInterval();

            jQuery(function() {
                var v_url = document.URL;

                if (v_url.indexOf('#') != -1) {
                    var v_hash = v_url.substring(v_url.indexOf("#") + 1);


                    jQuery('html, body').animate({
                        scrollTop: jQuery('#' + v_hash).offset().top - 70
                    }, 200);
                    return false;
                }
            });


        });

        // End of jPreLoader script

        function splashRotator() {
            var cur = jQuery('#jSplash').children('.selected');
            var next = jQuery(cur).next();

            if (jQuery(next).length != 0) {
                jQuery(next).addClass('selected');
            } else {
                jQuery('#jSplash').children('section:first-child').addClass('selected');
                next = jQuery('#jSplash').children('section:first-child');
            }

            jQuery(cur).removeClass('selected').fadeOut(100, function() {
                jQuery(next).fadeIn(100);
            });
        }
    } else {
        $('body').css("display", "block");
    }


    // --------------------------------------------------
    // function
    // --------------------------------------------------

    function video_autosize() {
        jQuery('.de-video-container').each(function() {
            var height_1 = jQuery(this).css("height");
            var height_2 = jQuery(this).find(".de-video-content").css("height");
            var newheight = (height_1.substring(0, height_1.length - 2) - height_2.substring(0, height_2.length - 2)) / 2;
            jQuery(this).find('.de-video-overlay').css("height", height_1);
            jQuery(this).find(".de-video-content").animate({
                'margin-top': newheight
            }, 'fast');
        });
    }

    window.onresize = function(event) {

        enquire.register("screen and (min-width: 993px)", {
            match: function() {
                jQuery('#mainmenu').show();
                jQuery('header').removeClass('height-auto');
                mobile_menu_show = 1;
                col = tmp_col;
            },
            unmatch: function() {
                jQuery('#mainmenu').hide();
                mobile_menu_show = 0;
                jQuery("#menu-btn").show();
                col = 2;
            }
        });

        // header bottom setting begin
        var mq = window.matchMedia("(max-width: 993px)");
        if (mq.matches) {
            jQuery('.header-bottom,.header-center').css("display", "block");
            jQuery('.header-bottom,.header-center').css("top", "0");
        }
        // header bottom setting close

        init();
        video_autosize();
        centery();

        $('header').removeClass('smaller');
        $('header').removeClass('logo-smaller');
        $('header').removeClass('clone');
        jQuery('#menu-btn').removeClass("clicked");
        jQuery('#menu-btn').addClass("unclick");

        grid_gallery();
        owlnavcenter();

    };


    function init() {

        var sh = jQuery('#de-sidebar').css("height");
        var dh = jQuery(window).innerHeight();
        var h = parseInt(sh) - parseInt(dh);
        var header_height = parseInt(jQuery('header').height(), 10);
        var screen_height = parseInt(jQuery(window).height(), 10);
        var header_mt = screen_height - header_height;
        var mq = window.matchMedia("(min-width: 993px)");
        var ms = window.matchMedia("(min-width: 768px)");

        window.addEventListener('scroll', function(e) {

            if (mq.matches) {
                var distanceY = window.pageYOffset || document.documentElement.scrollTop,
                    shrinkOn = 100,
                    header = document.querySelector("header");
                if (distanceY > shrinkOn) {
                    classie.add(header, "smaller");
                } else {
                    if (classie.has(header, "smaller")) {
                        classie.remove(header, "smaller");
                    }

                }
            }

            if (mq.matches) {
                jQuery("header").addClass("clone", 1000, "easeOutBounce");

                // header autoshow on scroll begin
                var $document = $(document);
                var vscroll = 0;

                if ($document.scrollTop() >= 50 && vscroll == 0) {
                    jQuery("header.autoshow").removeClass("scrollOff");
                    jQuery("header.autoshow").addClass("scrollOn");
                    vscroll = 1;
                } else {
                    jQuery("header.autoshow").removeClass("scrollOn");
                    jQuery("header.autoshow").addClass("scrollOff");
                    vscroll = 0;
                }
                // header autoshow on scroll close


                // header bottom on scroll begin
                var header_height = parseInt(jQuery('header').height(), 10);
                var screen_height = parseInt(jQuery(window).height(), 10);
                var header_mt = screen_height - header_height;
                var header_mt_half = header_mt / 2;

                if ($document.scrollTop() >= header_mt) {
                    jQuery('.header-bottom').css("position", "fixed");
                    jQuery('.header-bottom').css("top", "0");
                } else if ($document.scrollTop() <= header_mt) {
                    jQuery('.header-bottom').css("position", "absolute");
                    jQuery('.header-bottom').css("top", header_mt);
                }

                if ($document.scrollTop() >= header_mt_half) {
                    jQuery('.header-center').css("position", "fixed");
                    jQuery('.header-center').css("top", "0");
                } else if ($document.scrollTop() <= header_mt_half) {
                    jQuery('.header-center').css("position", "absolute");
                    jQuery('.header-center').css("top", header_mt_half);
                }
                // header bottom on scroll close


                // side header on scroll begin
                if (jQuery("header").hasClass("side-header")) {
                    if (jQuery(document).scrollTop() >= h) {
                        jQuery('#de-sidebar').css("position", "fixed");
                        if (parseInt(sh) > parseInt(dh)) {
                            jQuery('#de-sidebar').css("top", -h);
                        }
                        jQuery('#main').addClass("col-md-offset-3");
                    } else {
                        jQuery('#de-sidebar').css("position", "absolute ");
                        if (parseInt(sh) > parseInt(dh)) {
                            jQuery('#de-sidebar').css("top", 0);
                        }
                        jQuery('#main').removeClass("col-md-offset-3");
                    }
                }
                // side header on scroll close
            }
        });


        if (mq.matches) {
            jQuery('.header-bottom,.header-center').css('position', 'absolute');
            jQuery('.header-bottom,.header-center').css('top', header_mt);
        }


    }
    window.onload = init();


    // --------------------------------------------------
    // owlCarousel
    // --------------------------------------------------

    jQuery("#carousel-products").owlCarousel({
        center: false,
        items: 1,
        loop: true,
        dots: true,
        margin: 0,
        responsive: {
            1000: {
                items: 1
            },
            600: {
                items: 1
            },
            0: {
                items: 1
            }
        }
    });

    jQuery("#gallery-carousel-2").owlCarousel({
        center: false,
        items: 2,
        loop: true,
        dots: false,
        margin: 0,
        responsive: {
            1000: {
                items: 2
            },
            600: {
                items: 2
            },
            0: {
                items: 1
            }
        }
    });

    jQuery("#carousel-single-dots").owlCarousel({
        single: true,
        items: 1,
        loop: true,
        dots: true,
        margin: 0,
    });

    var bigimage = $(".p-carousel");
    var thumbs = $(".p-carousel-thumb");
    //var totalslides = 10;
    var syncedSecondary = true;

    bigimage
        .owlCarousel({
            items: 1,
            slideSpeed: 2000,
            nav: false,
            // autoplay: true,
            dots: false,
            loop: true,
            responsiveRefreshRate: 200,
            navText: [
                '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
                '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
            ]
        })
        .on("changed.owl.carousel", syncPosition);

    thumbs
        .on("initialized.owl.carousel", function() {
            thumbs
                .find(".owl-item")
                .eq(0)
                .addClass("current");
        })
        .owlCarousel({
            items: 4,
            dots: false,
            nav: false,
            navText: [
                '<i class="fa fa-arrow-left" aria-hidden="true"></i>',
                '<i class="fa fa-arrow-right" aria-hidden="true"></i>'
            ],
            margin: 15,
            smartSpeed: 200,
            slideSpeed: 500,
            slideBy: 4,
            responsiveRefreshRate: 100
        })
        .on("changed.owl.carousel", syncPosition2);

    function syncPosition(el) {
        //if loop is set to false, then you have to uncomment the next line
        //var current = el.item.index;

        //to disable loop, comment this block
        console.log(el);
        var count = el.item.count - 1;
        var current = Math.round(el.item.index - el.item.count / 2 - 0.5);

        if (current < 0) {
            current = count;
        }
        if (current > count) {
            current = 0;
        }
        //to this
        thumbs
            .find(".owl-item")
            .removeClass("current")
            .eq(current)
            .addClass("current");
        var onscreen = thumbs.find(".owl-item.active").length - 1;
        console.log(onscreen)
        var start = thumbs
            .find(".owl-item.active")
            .first()
            .index();
        var end = thumbs
            .find(".owl-item.active")
            .last()
            .index();
        console.log(end);
        if (current > end) {
            thumbs.data("owl.carousel").to(current, 100, true);
        }
        if (current < start) {
            thumbs.data("owl.carousel").to(current - onscreen, 100, true);
        }
    }

    function syncPosition2(el) {
        if (syncedSecondary) {
            var number = el.item.index;
            bigimage.data("owl.carousel").to(number, 100, true);
        }
    }

    thumbs.on("click", ".owl-item", function(e) {
        e.preventDefault();
        var number = $(this).index();
        bigimage.data("owl.carousel").to(number, 300, true);
    });

    jQuery("#owl-logo").owlCarousel({
        center: false,
        items: 4,
        loop: true,
        dots: false,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 2000,
        responsive: {
            1000: {
                items: 6
            },
            600: {
                items: 4
            },
            0: {
                items: 3
            }
        }
    });

    jQuery("#gallery-carousel-3").owlCarousel({
        center: false,
        items: 3,
        loop: true,
        dots: false,
        margin: 0,
        responsive: {
            1000: {
                items: 3
            },
            600: {
                items: 2
            },
            0: {
                items: 1
            }
        }
    });

    jQuery("#gallery-carousel-4").owlCarousel({
        center: false,
        items: 4,
        loop: true,
        dots: false,
        margin: 0,
        responsive: {
            1000: {
                items: 4
            },
            600: {
                items: 2
            },
            0: {
                items: 1
            }
        }
    });


    jQuery(".carousel-gallery").owlCarousel({
        items: 4,
        navigation: false,
        pagination: false
    });

    jQuery("#blog-carousel").owlCarousel({
        center: false,
        items: 2,
        loop: true,
        dots: true,
        margin: 30,
        responsive: {
            1000: {
                items: 2
            },
            600: {
                items: 1
            },
            0: {
                items: 1
            }
        }
    });

    jQuery(".carousel-4-center-dots").owlCarousel({
        center: true,
        items: 4,
        loop: true,
        dots: true,
        margin: 30,
        responsive: {
            1000: {
                items: 4
            },
            600: {
                items: 2
            },
            0: {
                items: 1
            }
        }
    });

    jQuery("#testimonial-carousel").owlCarousel({
        center: false,
        items: 2,
        loop: true,
        dots: true,
        margin: 30,
        responsive: {
            1000: {
                items: 2
            },
            600: {
                items: 1
            },
            0: {
                items: 1
            }
        }
    });
    jQuery("#testimonial-carousel-3-cols").owlCarousel({
        center: false,
        items: 3,
        loop: true,
        dots: true,
        margin: 30,
        responsive: {
            1000: {
                items: 3
            },
            600: {
                items: 1
            },
            0: {
                items: 1
            }
        }
    });

    jQuery("#testimonial-carousel-single").owlCarousel({
        items: 1,
        autoplay: true,
        autoplayTimeout: 6000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        loop: true,
        dots: true,
        mouseDrag: false,
        touchDrag: false,
        margin: 0,
    });

    jQuery("#logo-carousel").owlCarousel({
        items: 6,
        loop: true,
        dots: false,
        autoPlay: true,
        responsive: {
            1000: {
                items: 6
            },
            600: {
                items: 4
            },
            0: {
                items: 1
            }
        }
    });

    jQuery("#contact-carousel").owlCarousel({
        items: 1,
        singleItem: true,
        navigation: false,
        pagination: false,
        autoPlay: true
    });


    jQuery("#text-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        autoplayTimeout: 4000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        loop: true,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        margin: 0,
    });


    jQuery("#single-carousel").owlCarousel({
        items: 1,
        autoplay: true,
        autoplayTimeout: 4000,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        loop: true,
        dots: false,
        mouseDrag: false,
        touchDrag: false,
        margin: 0,
    });


    jQuery(".carousel-single-navi").owlCarousel({
        items: 1,
        singleItem: true,
        navigation: true,
        pagination: false,
        mouseDrag: false,
        touchDrag: false,
        transitionStyle: "fade"
    });

    jQuery(".blog-slide").owlCarousel({
        items: 1,
        singleItem: true,
        navigation: false,
        pagination: false,
        autoPlay: false
    });

    jQuery("#photo-carousel").owlCarousel({
        center: false,
        items: 4,
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        autoHeight: true,
        responsive: {
            1000: {
                items: 4
            },
            992: {
                items: 3
            },
            600: {
                items: 2
            },
            0: {
                items: 1
            }
        }
    });

    jQuery(".carousel-cat-3").owlCarousel({
        center: false,
        items: 3,
        loop: true,
        dots: false,
        margin: 30,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            1000: {
                items: 3
            },
            600: {
                items: 2
            },
            0: {
                items: 1
            }
        }
    });

    jQuery(".carousel-cat-3-a").owlCarousel({
        center: false,
        items: 3,
        loop: true,
        dots: false,
        margin: 10,
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        responsive: {
            1000: {
                items: 3
            },
            600: {
                items: 2
            },
            0: {
                items: 1
            }
        }
    });

    jQuery("#carousel-single").owlCarousel({
        singleItem: true,
        items: 1,
        loop: true,
        dots: false,
        margin: 0,
        autoplay: true,
        autoplayTimeout: 4000,
    });

    // Custom Navigation owlCarousel
    $(".next").on("click", function() {
        $(this).parent().parent().find('.blog-slide').trigger('owl.next');
    });
    $(".prev").on("click", function() {
        $(this).parent().parent().find('.blog-slide').trigger('owl.prev');
    });

    function owlnavcenter() {
        jQuery('.owl-custom-nav').each(function() {
            var owl = $('.owl-custom-nav').next();
            var ow = parseInt(owl.css("height"), 10);
            $(this).css("margin-top", (ow / 2) - 10);

            owl.owlCarousel();

            // Custom Navigation Events
            $(".btn-next").on("click", function() {
                owl.trigger('next.owl.carousel');
            });
            $(".btn-prev").on("click", function() {
                owl.trigger('prev.owl.carousel');
            });
        });
    }

    owlnavcenter();

    // ecommerce
    jQuery(".de__pcard .atr__colors div").on("click", function() {
        var img_url = jQuery(this).attr('data-image');
        var sc = jQuery(this).parent().parent().parent().find(".atr__image-main");
        sc.attr('src', img_url);
        jQuery(this).parent().find("div").removeClass("active");
        jQuery(this).addClass("active");
    });


    // --------------------------------------------------
    // custom positiion
    // --------------------------------------------------

    function centery() {
        var mi = window.matchMedia("(min-width: 768px)");
        var ma = window.matchMedia("(max-width: 768px)");


        if (mi.matches) {
            var $doc_height = jQuery(window).innerHeight();
            jQuery('#homepage #content.content-overlay').css("margin-top", $doc_height);
            jQuery('.full-height').css("height", $doc_height);
            var picheight = jQuery('.center-y').css("height");
            picheight = parseInt(picheight, 10);
            jQuery('.center-y').css('margin-top', (($doc_height - picheight) / 2) - 90);
            jQuery('.full-height .de-video-container').css("height", $doc_height);
        }

        if (ma.matches) {
            jQuery('.full-height').css("max-height", '100%');
        }
    }
})