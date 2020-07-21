/*------------------------------------*\
    Variables
\*------------------------------------*/

var mobileBreakpoint = 800;
var isMobile;
var copyBtns = document.querySelectorAll('.crn-copy');
var regBtns = document.querySelectorAll('.crn-register');
var ytIframes = document.querySelectorAll('iframe[src*="youtube.com"]');
var vidContainer = document.querySelectorAll('.vid-container');
var stickyBtns = document.querySelectorAll('.g-sticky-btn');


/*------------------------------------*\
    Functions
\*------------------------------------*/

function resized(){
 if ($(window).width() < mobileBreakpoint) {
       isMobile = true;
       $('body').addClass('isMobile');
       $('body').removeClass('isDesktop');
       $('.hideMobile').css({'display':'none'});
	   $('.logo').hide();
	   $('.logo-sm').show();
	   
    } else {
       isMobile = false;
       $('body').removeClass('g-mobile-nav-open');
       $('.mega-menu').css({'display':'none'});
       $('.mobileNavToggle.ion-chevron-up').toggleClass('ion-chevron-down');
       $('.mobileNavToggle.ion-chevron-up').toggleClass('ion-chevron-up');
       $('body').addClass('isDesktop');
       $('body').removeClass('isMobile');
       $('.hideDesktop').css({'display':'none'});

	   $('.logo-sm').hide();
	   $('.logo').show();
	   
    }
}

//Program page tabs
function showTab(id, el) {
    $('.program-tab').hide();
    $('.g-tabs a').removeClass('g-active');
    $(el).addClass('active');
    $(el).siblings().removeClass('g-show');
    $('html,body').animate({
        scrollTop: $('#g-content').offset().top - 110
    })
}


function showBanner(name, el) {
    if(isMobile === false){
        setTimeout(function(){
            var isHovered = $(el).is(":hover");
            if(isHovered === true){
                $('.banner').hide();
                var id = "#" + name;
                $(id).show();
                $('#hp-banner').attr('class', name);
                $('.banner-nav a').removeClass('g-active');
                $(el).addClass('g-active');  
            }
        }, 300);
    }
}


$(document).ready(function() {
    /*-----------------------------------------*\
                    General JS 
    \*------------------------------------------*/

    $('.g-scroll-up').click(function(e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
    });
   
    //Button Toggle
    $('.g-toggle a').click(function(e) {
        e.preventDefault(); 
        $(this).toggleClass('g-active');
        $(this).siblings().toggleClass('g-active');
    });


    
    //add classes to body for mobile/desktop
    if ($(window).width() < mobileBreakpoint) {
       isMobile = true;
       $('body').addClass('isMobile');
	   
	   $('.logo').hide();
	   
	   $('.logo-sm').css("visibility", "visible");
	   $('.logo-sm').show();
	   
    } else {
       isMobile = false;
       $('body').addClass('isDesktop');
	   
	   $('.logo').show();
	   $('.logo-sm').hide();
	   
    }

    window.addEventListener("resize", resized);


    //Responsive tables - show/hide for tablet/mobile
    $('.g-open-link').click(function() {
        if ($(this).hasClass('ion-plus-circled')) {
            $(this).addClass('ion-minus-circled');
            $(this).removeClass('ion-plus-circled');
            $(this).parent().siblings().css({
                'display': 'block'
            });
        } else {
            $(this).removeClass('ion-minus-circled');
            $(this).addClass('ion-plus-circled');
            $(this).parent().siblings().css({
                'display': 'none'
            });
        }
    });

    $('.g-accord-header').click(function () {
        $(this).next().slideToggle();
        $(this).toggleClass('open');
        var icon = $(this).find('.g-icon')
        icon.toggleClass('ion-plus-round');
        icon.toggleClass('ion-minus-round');
    });

    //basic tabs
    $('a.tabChange').click(function (event) {
        event.preventDefault();
        $(this).addClass('g-active');
        $(this).siblings('.tabChange').removeClass('g-active');
        $('.g-tab-cta').removeClass('g-active');
        var tab = $(this).data('tab');
        $(tab).addClass('g-active');
        $(tab).siblings('.g-tab-content').removeClass('g-active');
        var text = $(this).text();
        if (text === "Brochure") {
            var id_of_frame = "brochure_iframe";
            load_iframe_on_tab_switch(id_of_frame);
        }
        if (text === "Photography") {
            $('#weddings-gallery').slick('refresh');
        }
    });



    
    /*-----------------------------------------*\
                  Global Header
    \*------------------------------------------*/


    //Main navigation hover
    $(".main-menu > li > a").hover(

        function() {
            if(isMobile === false){
                $(this).parent().siblings().removeClass('g-active');
                $(this).parent().addClass('g-active');

                var top = $(".headers-container").height();

                if ($('body.fixed-header').length > 0) {
                    top = 50;
                }else if(top === 103) {
                    var scrollTop     = $(window).scrollTop(),
                        elementOffset = $('.headers-container').offset().top,
                        top      = (elementOffset - scrollTop + 103);
                }

                $('header .mega-menu').css({
                    'top': top
                });

                $('header .logo').removeClass('box-shadow');
            }
        },

        function() {
            // $( this ).find( "span:last" ).remove();
            // $( ".main-menu > li > a" ).removeClass('g-active');
        }
    );

    //Main navigation hide
    $(".main-menu-row").hover(
        function() {
            // $( this ).parent().siblings().children().removeClass('g-active');
            // $( this ).addClass('g-active');
        },
        function() {
            if(isMobile === false){
                $(".main-menu > li").removeClass('g-active');
                $('header .logo').addClass('box-shadow');
            }
        }
    );

    //fixed/smaller header on scroll
    $(window).on("scroll touchmove", function(e) {
        //don't allow scrolling if we have the header search section open - fixes mobile bug
        if($('.search-section').is(":visible") && isMobile === true){
            $('body').css({'overflow' : 'hidden'});
        }else{

            $('body').toggleClass('fixed-header', $(document).scrollTop() > 51);
			
            var headerBreakpoint = 51;
            if ($('#info-banner-top').css("display") == "none")
            {
                headerBreakpoint = headerBreakpoint - 30;
            }

            if ($(document).scrollTop() <= headerBreakpoint)
            {
                if ($('#crisis-level-one').length > 0) {
                    $('header.g-header .mega-menu').css('margin-top', '78px');
                }

				if (isMobile === false)
				{
					$('.logo-sm').hide();
					$('.logo').show();
					
					
				}
			}
			else
            {
                if ($('#crisis-level-one').length > 0) {
                    $('header.g-header .mega-menu').css('margin-top', '0px');
                    $('header.g-header .mega-menu').css('top', '0px');
                }

				if (isMobile === false)
				{
				    //$('.logo').css("display", "none");
					$('.logo-sm').css("visibility", "visible");
					$('.logo-sm').show();

					

					
				}
				
			}
            if ($(document).scrollTop() > 0) {
                $('.search-section').slideUp();
                $(".main-menu > li").removeClass('g-active');
                $('header .logo').addClass('box-shadow');
            }
        }

        //show scroll to top arrow on mobile on longer pages. 
        if(isMobile === true){
            if($(document).scrollTop() > 1500 && $('.g-scroll-up').is(":hidden") ){
                $('.g-scroll-up').fadeIn();
            }else if($(document).scrollTop() <= 1500 && $('.g-scroll-up').is(":visible") ){
                $('.g-scroll-up').fadeOut();
            }
        }
        
    });


    //Hide search and recently viewed when you interact with the site
    $('html').click(function() {
        $('body').css({'overflow' : 'visible'});
        //$('.search-section, .recently-viewed').slideUp();
        $('.search-section').slideUp();
        $(".main-menu > li").removeClass('g-active');
        $('header .logo').addClass('box-shadow');
    });

    $('.headers-container').click(function(event) {
        event.stopPropagation();
    });

    //Main naviation - mobile menu
    $('.navToggle, .g-overlay').click(function(e) {
        e.preventDefault();
        $('body').toggleClass('g-mobile-nav-open');
    });

    $('.mobileNavToggle').click(function(e){
        var ele = $(this);
        if(ele.parent().siblings().children('.ion-chevron-up + .mega-menu').length > 0){
           ele.parent().siblings().children('.ion-chevron-up + .mega-menu').slideUp('fast', function(){
                $(this).prev().toggleClass('ion-chevron-down');
                $(this).prev().toggleClass('ion-chevron-up');
                ele.toggleClass('ion-chevron-down');
                ele.toggleClass('ion-chevron-up');
                ele.next().slideToggle('fast', function() {
                    if(ele.hasClass('ion-chevron-up') === true){
                       $('.main-menu').animate({
                            scrollTop: $(this).offset().top - $(window).scrollTop() - 50
                        }, 100); 
                    }
                });
            }); 
        }else{
            ele.toggleClass('ion-chevron-down');
            ele.toggleClass('ion-chevron-up');
            ele.next().slideToggle('fast', function() {
                if($(this).prev().hasClass('ion-chevron-up') === true){
                   $('.main-menu').animate({
                        scrollTop: $(this).offset().top - $(window).scrollTop() - 50
                    }, 100); 
                }
            });
        }
    });

    //Recently viewed header
    $('.recentlyViewedToggle').click(function(e) {
        e.preventDefault();
        $('.search-section').slideUp();
        $('.recently-viewed').slideToggle();
    });

    //Recently viewed header - buttons
    $('.toggleCheck').click(function(e) {
        e.preventDefault();
        $(this).parent().fadeOut('fast');
    });

    //Recently viewed & search header
    $('.close-btn').click(function(e) {
        e.preventDefault();
        $('.search-section, .recently-viewed').slideUp();
    });




    /*-----------------------------------------*\
                  Program pages
    \*------------------------------------------*/

    if ($('select.g-form-control.g-pull-right')["0"] != undefined) {
        if ($('select.g-form-control.g-pull-right')["0"].options.selectedIndex != 0) {
            $('select.g-form-control.g-pull-right').css("border", "1px solid #A6192E")
        }
    }

    if ($('select.g-icon-clock')["0"] != undefined) {
        if ($('select.g-icon-clock')["0"].options.selectedIndex != 0) {
            $('select.g-icon-clock').css("border", "1px solid #A6192E")

        }
    }

    if ($('select.g-icon-clock')["0"] != undefined) {
        if ($('select.g-icon-clock')["0"].options.selectedIndex != 0) {
            $('select.g-icon-clock').css("border", "1px solid #A6192E")

        }
    }

    if ($('select.g-icon-credential')["0"] != undefined) {
        if ($('select.g-icon-credential')["0"].options.selectedIndex != 0) {
            $('select.g-icon-credential').css("border", "1px solid #A6192E")

        }
    }


    if ($('select.g-icon-arrow')["0"] != undefined) {
        if ($('select.g-icon-arrow')["0"].options.selectedIndex != 0) {
            $('select.g-icon-arrow').css("border", "1px solid #A6192E")

        }
    }


    // fade in the program and course count
    if ($('.program-count') != undefined) {
        $('.program-count').delay(100).fadeTo(200, 1);
    }
    
    if ($('.course-count') != undefined) {
        $('.course-count').delay(100).fadeTo(200, 1);
    }

    //fixed tab nav on scroll - program pages
    if($('.g-tabs-container').length>0){
        $(window).on("scroll touchmove", function() {
            var scrollTop     = $(window).scrollTop(),
            elementOffset = $('.g-tabs-container').offset().top,
            distance      = (elementOffset - 50);
            $('.g-tabs-container').toggleClass('g-fixed', $(document).scrollTop() > distance);
        });  
    }

    //Program page tabs - mobile menu
    $('.g-tab-toggle').click(function(e) {
        e.preventDefault();
        $(this).siblings().toggleClass('g-show');
    });


 

    $('.g-interest-slider .g-interest-slide .g-img').hover(
        function() {
            $(this).parent().addClass('g-open');
        }, function() {
            $(this).parent().removeClass('g-open');
        }
    );





    /*-----------------------------------------*\
                     Sliders
    \*------------------------------------------*/


    //Image Slider
    $('.g-image-slider').slick({
        centerMode: true,
        centerPadding: '330px',
        slidesToShow: 1,
        cssEase: 'linear',
        speed: 700,
        focusOnSelect: true,
        responsive: [{
            breakpoint: 1200,
            settings: {
                centerPadding: '200px',
                slidesToShow: 1
            }
        }, {
            breakpoint: 768,
            settings: {
                centerPadding: '100px',
                slidesToShow: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                centerPadding: '30px',
                slidesToShow: 1
            }
        }]
    });

    $('.g-image-slider-two-column').slick({
        centerMode: true,
        centerPadding: '100px',
        slidesToShow: 1,
        cssEase: 'linear',
        speed: 700,
        focusOnSelect: true,
        responsive: [{
            breakpoint: 1200,
            settings: {
                centerPadding: '200px',
                slidesToShow: 1
            }
        }, {
            breakpoint: 768,
            settings: {
                centerPadding: '100px',
                slidesToShow: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                centerPadding: '30px',
                slidesToShow: 1
            }
        }]
    });


    //card slider - inspiring stories - make it a slider if we have more then one item
    if($('.card-slider-cards .g-slide').length > 1){

        $('.card-slider-cards').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.card-slider-text',
            centerPadding: '65px',
            centerMode: true,
            focusOnSelect: true,
            responsive: [{
                breakpoint: 1100,
                settings: {
                    centerPadding: '30px',
                }
            }, {
                breakpoint: 940,
                settings: {
                    centerPadding: '260px',
                }
            }, {
                breakpoint: 800,
                settings: {
                    centerPadding: '150px',
                }
            }, {
                breakpoint: 700,
                settings: {
                    centerPadding: '110px',
                }
            }, {
                breakpoint: 520,
                settings: {
                    centerPadding: '50px',
                }
            }]
        });

        $('.card-slider-text').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            asNavFor: '.card-slider-cards'
        });

    }


    //Small card slider (campus page)
    $('.g-sm-slider').slick({
        slidesToShow: 3,
        cssEase: 'linear',
        speed: 700,
        focusOnSelect: false,
        swipeToSlide: true,
        touchMove: false,
        responsive: [{
            breakpoint: 1100,
            settings: {
                slidesToShow: 2
            }
        },{
            breakpoint: 940,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 540,
            settings: {
                slidesToShow: 1
            }
        }]
    });

    //-- Staff bios Fancy Slider (text + card slider) (on 'Study Abroad' template)
    if($('.bio-slider-cards .bio-slide').length > 1){
        $('.bio-slider-cards').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            asNavFor: '.bio-slider-text',
            centerPadding: '65px',
            centerMode: true,
            focusOnSelect: true,
            dots: true, 
            appendDots: '.bio-slider-dots',
            responsive: [{
                breakpoint: 1100,
                settings: {
                    centerPadding: '30px',
                }
            }, {
                breakpoint: 941, // "disable" the slider
                settings: {
                    centerMode: false,
                    fade: true,
                    accessibility: false, 
                    adaptiveHeight: true,
                    arrows: false,
                    dots: false,
                    draggable: false,
                    focusOnSelect: false,
                    swipe: false,
                    touchMove: false
                }
            }]
        });

        $('.bio-slider-text').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            asNavFor: '.bio-slider-cards',
            responsive: [{
                breakpoint: 941, // "disable" the slider
                settings: {
                    accessibility: false, 
                    adaptiveHeight: true,
                    arrows: false,
                    dots: false,
                    draggable: false,
                    focusOnSelect: false,
                    swipe: false,
                    touchMove: false

                }
            }]
        });
    }

    //-- Staff bios Basic Slider (Full width card slider) (on 'Student Employment and Careers' template)
    if($('.bio-slider-2 .bio-slide-2').length > 1){
        $('.bio-slider-2').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            fade: true,
            focusOnSelect: true,
            dots: true,
            appendDots: '.bio-slider-2-dots',
            responsive: [{   // "disable" the slider
                breakpoint: 521,
                settings: {
                    accessibility: false, 
                    adaptiveHeight: true,
                    arrows: false,
                    dots: false,
                    draggable: false,
                    focusOnSelect: false,
                    swipe: false,
                    touchMove: false
                }
            }]
        });
    }
    
    /*------------------------------------*\
          Cards
    \*------------------------------------*/

    // Same height for all cards on a page (Note that this will effect previously built cards)
    function sameHeightCards(){
        var cards = $('.g-card.g-card-info');
        if (window.innerWidth > 520) {
            var highestCard = cards.outerHeight();
            var cardCount = cards.length;
            var count = 0;
            cards.each(function(){  
                count ++;
                if($(this).outerHeight() > highestCard){  
                    highestCard = $(this).outerHeight() + 1; //increase by 1 for issues with rounding px
                }   
                if(count === cardCount){
                    highestCard = Math.round(highestCard);
                    cards.css({'min-height':highestCard+'px'}); 
                }
            });   
        }else{
            cards.css({'min-height':0}); 
        }
    }






    $('#privacy-banner-close-btn').click(function () {
        $("#privacy-banner").css("display", "none");
        $("#chat-widget-container").css("display", "block");
        $("#livechat-compact-container").css("display", "block");
    });

    $('.video-slider-div').slick({
        dots: true,
        infinite: true,
        arrows: true,
        swipeToSlide: true
    });

    $('.btn-bio').click(function () {
        var text = $(this).hasClass('ct-bio-expand') ? "SHOW LESS" : "CONTINUE READING";
        var addnewClass = $(this).hasClass('ct-bio-expand') ? "bio-expanded-text" : "bio-text";
        var removeoldClass = $(this).hasClass('ct-bio-expand') > 0 ? "bio-text" : "bio-expanded-text";
        $(this).siblings('.g-ct-desc').addClass(addnewClass).removeClass(removeoldClass);
        $(this).toggleClass('ct-bio-minus');
        $(this).toggleClass('ct-bio-expand');
        $(this).find('.bio-span-text').text(text);
        var icon = $(this).find('.g-icon');
        $(icon).toggleClass('ion-minus-circled');
        $(icon).toggleClass('ion-plus-circled');
    });
    callGoogleTrackEvents();
    automateInfoBanner();

});

$(window).on("load", function () {
    // privacy policy cookie
    var privacyPolicyLastSeenCookie = document.cookie.replace(/(?:(?:^|.*;\s*)privacyPolicyLastSeen\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    if (privacyPolicyLastSeenCookie == "") {

        $("#livechat-compact-container").css("display", "none");
        $("#privacy-banner").css("display", "block");

        var today = new Date();
        var expiryDate = new Date();
        expiryDate.setDate(today.getDate() + 180);

        document.cookie = "privacyPolicyLastSeen=" + "1" + "; expires=" + expiryDate.toUTCString() + "\"";
    }
    else {
        $("#chat-widget-container").css("display", "block");
        $("#livechat-compact-container").css("display", "block");
    }
});




function automateInfoBanner() {
    var parentContainer = document.getElementById("info-ban-anim-menu");
    var childItems = document.getElementsByClassName("menu-session-container");
    $('#info-ban-anim-menu > .menu-session-container:first').css("display", "inline-block");
    if (childItems.length > 1) {
        var count = 0;
        //$('#info-ban-anim-menu > .menu-session-container:first').addClass("visible-menu-on");
        setInterval(function () {
            //$('.menu-session-container').removeClass("visible-menu-on");
            $(".menu-session-container").css("display","none");
            if (count < childItems.length) {
                childItems[0] = childItems[count];
                //childItems[count].style.visibility = "visible";
                childItems[count].style.display = "inline-block";
                //childItems[count].className += " " + "visible-menu-on";
                count++;
                if (count === childItems.length) {
                    count = 0;
                }
            }
        }, 5000);
    }
}


