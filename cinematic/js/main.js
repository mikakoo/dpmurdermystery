/*
Theme Name: Yose
Description: Coming Soon
Author: Bluminethemes
Theme URI: http://bluminethemes.com/preview/themeforest/html/yose/
Author URI: http://themeforest.net/user/Bluminethemes
Version: 1.2
*/

(function($) {
	"use strict";

	// BOOTSTRAP FIX FOR WINPHONE 8 AND IE10
	if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
		var msViewportStyle = document.createElement('style')
		msViewportStyle.appendChild(
			document.createTextNode(
				'@-ms-viewport{width:auto!important}'
			)
		)
		document.getElementsByTagName("head")[0].appendChild(msViewportStyle)
	}

	$.browser.chrome = $.browser.webkit && !!window.chrome;
	$.browser.safari = $.browser.webkit && !window.chrome;

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		$('body').addClass('mobile');
	}

	if ($.browser.chrome) {
		$('body').addClass('chrome');
	}

	if ($.browser.safari) {
		$('body').addClass('safari');
	}

	function detectIE() {
		if ($.browser.msie && $.browser.version == 9) {
			return true;
		}
		if ($.browser.msie && $.browser.version == 8) {
			return true;
		}
		return false;
	}

	function getWindowWidth() {
		return Math.max( $(window).width(), window.innerWidth);
	}

	function getWindowHeight() {
		return Math.max( $(window).height(), window.innerHeight);
	}


	// IOS
	function iosdetect() {
		var deviceAgent = navigator.userAgent.toLowerCase();
		var $iOS = deviceAgent.match(/(iphone|ipod|ipad)/);

		if ($iOS) {
			var vid = $('#video_background');
			var h = window.innerHeight;
			vid.css({ 'display': 'none'});
			$(window).resize(function() {
				var h = window.innerHeight;
			});

			// use fancy CSS3 for hardware acceleration
		}
	};


	// PRELOADER
	function initPreloader() {
		var preloaderDelay = 350;
		var	preloaderFadeOutTime = 800;

		function hidePreloader() {
			var loadingAnimation = $('#loading-animation');
			var	preloader = $('#preloader');

			loadingAnimation.fadeOut();
			preloader.delay(preloaderDelay).fadeOut(preloaderFadeOutTime);
		}

		hidePreloader();
	};


	// ANIMATED ELEMENTS
	function initAnimations() {
		if( !$('body').hasClass('mobile') ) {

			$('.animated').appear();

			if( detectIE() ) {
				$('.animated').css({
					'display':'block',
					'visibility': 'visible'
				});
			} else {
				$('.animated').on('appear', function() {
					var elem = $(this);
					var animation = elem.data('animation');
					if ( !elem.hasClass('visible') ) {
						var animationDelay = elem.data('animation-delay');
						if ( animationDelay ) {
							setTimeout(function(){
								elem.addClass( animation + ' visible' );
							}, animationDelay);
						} else {
							elem.addClass( animation + ' visible' );
						}
					}
				});
			};	
		};
	};

	function initOnLoadAnimations() {
		if( !$('body').hasClass('mobile') ) {

			$('.animated').appear();

			if( detectIE() ) {
				$('.animated').css({
					'display':'block',
					'visibility': 'visible'
				});
			} else {			
				// Starting Animation on Load
				$('.onstart').each( function() {
					var elem = $(this);
					if ( !elem.hasClass('visible') ) {
						var animationDelay = elem.data('animation-delay');
						var animation = elem.data('animation');
						if ( animationDelay ) {
							setTimeout(function(){
								elem.addClass( animation + ' visible' );
							}, animationDelay);
						} else {
							elem.addClass( animation + ' visible' );
						}
					}
				});				
			};
		};
	};


	// SECTION HEIGHT
	function initSectionHeight() {
		var section = $('section');

		if ( section.hasClass('fullscreen') ) {
			$('section.fullscreen').css( 'min-height', getWindowHeight() );
		}
	};


	// NAV
	function initNavigation() {

		$('.menu-icon').tooltip({
			placement: 'right'
		});

		$('.nav-toggle').on( 'click', function() {
			var elem = $(this);

			elem.toggleClass('nav-close');
			elem.toggleClass('nav-open');

			if($('.nav-toggle').hasClass('nav-open')){
				var menuIcon = $('.menu-icon');
				menuIcon.addClass('icon-show');
				$.each($('.menu-icon'), function(i, el){
					$(el).css({'opacity':0});
					setTimeout(function(){
						$(el).css(
							'opacity','1.0'
						);
					},70 + ( i * 70 ));
				});
			} else if($('.nav-toggle').hasClass('nav-close')){
				var menuIcon = $('.menu-icon');
				var menuIconElements = $('.menu-icon').length;
				$.each($('.menu-icon'), function(i, el){
					$(el).css({'opacity':1});
					setTimeout(function(){
						$(el).css(
							'opacity','0.0'
						);
					}, ( menuIconElements * 70 ) + ( i *= -1 * 100 ));
				});
				setTimeout(function(){
					menuIcon.removeClass('icon-show');
				}, 140 + (menuIconElements * 70));
			};
		});

	};


	// PAGE BACKGROUND
	function initPageBackground() {
		if($('.page-header').hasClass('image-background')) {

			// IMAGE BACKGROUND
			$('.page-header').backstretch([
				"http://placehold.it/1920x1080.jpg/09f/fff&text=1920x1080"
			]);

		} else if( $('.page-header').hasClass('slideshow-background') ) {

			// SLIDESHOW BACKGROUND
			$('.page-header').backstretch([
				"http://placehold.it/1920x1080.jpg/09f/fff&text=1920x1080",
				"http://placehold.it/1920x1080.jpg/09f/fff&text=1920x1080",
				"http://placehold.it/1920x1080.jpg/09f/fff&text=1920x1080"
			], {duration: 3000, fade: 1200});

		} else if( $('.page-header').hasClass('kenburns-background') ) {

			// KENBURNS BACKGROUND
			var displayBackdrops = false;
			var backgrounds = [
				{ src: 'http://placehold.it/1920x1080.jpg/09f/fff&text=1920x1080', valign: 'top' },
				{ src: 'http://placehold.it/1920x1080.jpg/09f/fff&text=1920x1080', valign: 'top' },
				{ src: 'http://placehold.it/1920x1080.jpg/09f/fff&text=1920x1080', valign: 'top' }
			];

			$('body').vegas({
				preload: true,
				transition: 'swirlLeft2',
				transitionDuration: 4000,
				timer: false,
				delay: 10000,
				slides: backgrounds,
				walk: function (nb) {
					if (displayBackdrops === true) {
						var backdrop;

						backdrop = backdrops[nb];
						backdrop.animation  = 'kenburns';
						backdrop.animationDuration = 20000;
						backdrop.transition = 'fade';
						backdrop.transitionDuration = 1000;

						$('body')
							.vegas('options', 'slides', [ backdrop ])
							.vegas('next');
					}
				}
			});

		} else if($('body').hasClass('youtube-background')) {

			// YOUTUBE VIDEO BACKGROUND
			if($('body').hasClass('mobile')) {

				// Default background on mobile devices
				$('body').backstretch([
					"http://placehold.it/1920x1080.jpg/09f/fff&text=1920x1080"
				]);

			} else {
				$(".player").each(function() {
					$(".player").mb_YTPlayer();
				});
			};

		} else if($('body').hasClass('youtube-list-background')) {

			// YOUTUBE LIST VIDEOS BACKGROUND
			if($('body').hasClass('mobile')) {

				// Default background on mobile devices
				$("body").backstretch([
					"http://placehold.it/1920x1080.jpg/09f/fff&text=1920x1080"
				]);

			} else {

				// Youtube Videos
				var videos = [
					{videoURL: "0pXYp72dwl0",containment:'body',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:true},
					{videoURL: "9d8wWcJLnFI",containment:'body',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:false},
					{videoURL: "nam90gorcPs",containment:'body',autoPlay:true, mute:true, startAt:0,opacity:1, loop:false, ratio:"4/3", addRaster:true}
				];

				$(".player").YTPlaylist(videos, true);

			};

		} else if($('body').hasClass('mobile')) {
			
			// MOBILE BACKGROUND - Image background instead of video on mobile devices
			if($('body').hasClass('video-background')) {
				
				//alert('replacing with bg image');
				//	ditch the video section
				$('#vid_container').empty();

				// Default background on mobile devices
				$('body').backstretch([
					"/images/video-bg.jpg"
				]);
				
				
				
			};
			
		};
	};


	// SMOOTH SCROLL
	function initSmothScroll() {

		var scrollAnimationTime = 1000;
		var	scrollAnimation = 'easeInOutExpo';

		$('a.scrollto').bind('click.smoothscroll',function (event) {
			event.preventDefault();

			var target = this.hash;

			$('html, body').stop().animate({
				'scrollTop': $(target).offset().top
			}, scrollAnimationTime, scrollAnimation, function () {
				window.location.hash = target;
			});

		});
	};


	// PARALLAX BACKGROUND
	function initParallaxBackground() {
		$(window).stellar({ 
			horizontalScrolling: false,
			verticalOffset: 0,
			responsive: true
		});
	};


	// PARALLAX SCROLL
	function initParallaxScroll() {
		if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
			// some code..
		} else {
			var $window = $(window);		//Window object

			var scrollTime = 0.7;			//Scroll time
			var scrollDistance = 210;		//Distance. Use smaller value for shorter scroll and greater value for longer scroll

			$window.on('mousewheel DOMMouseScroll', function(event){

				event.preventDefault();	
						
				var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
				var scrollTop = $window.scrollTop();
				var finalScroll = scrollTop - parseInt(delta*scrollDistance);

				TweenMax.to($window, scrollTime, {
					scrollTo : { y: finalScroll, autoKill:true },
					ease: Power1.easeOut,	//For more easing functions see http://api.greensock.com/js/com/greensock/easing/package-detail.html
					autoKill: true,
					overwrite: 5						
				});		
			});
		};
	};


	// COUNTER
	function initCountdown() {
		$('#clock').countdown('2015/10/1 12:00:00').on('update.countdown', function(event) {
			var $this = $(this).html(event.strftime(''
				+ '<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div>'
				+ '<div class="counter-box"><div class="number">%H</div><span>Hours</span></div>'
				+ '<div class="counter-box"><div class="number">%M</div><span>Minutes</span></div>'
				+ '<div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'
			));
		});
	};
	

	function initPlugins() {

		// RESPONSIVE VIDEO - FITVIDS
		$(".video-container").fitVids();

		// PLACEHOLDER
		$('input, textarea').placeholder();

		// TEXTSLIDER - FLEXSLIDER
		$('.textslider').flexslider({
			animation: "fade",
			animationLoop: true,
			slideshowSpeed: 7000,
			animationSpeed: 600,

			controlNav: false,
			directionNav: false,

			keyboard: false,

			start: function(slider){
				$('body').removeClass('loading');
			}
		});

		// IMAGESLIDER - FLEXSLIDER
		$('.imageslider').flexslider({
			animation: "fade",
			animationLoop: true,
			slideshowSpeed: 7000,
			animationSpeed: 600,

			controlNav: false,
			directionNav: true,

			prevText: "",
			nextText: "",

			keyboard: false,

			start: function(slider){
				$('body').removeClass('loading');
			}
		});
		

		
/*
		// MAILCHIMP
		$('.mailchimp').ajaxChimp({
			callback: mailchimpCallback,
			url: "mailchimp-post-url" //Replace this with your own mailchimp post URL. Don't remove the "". Just paste the url inside "".  
		});

		function mailchimpCallback(resp) {
			 if (resp.result === 'success') {
				$('.success-message').html(resp.msg).fadeIn(1000);
				$('.error-message').fadeOut(500);

			} else if(resp.result === 'error') {
				$('.error-message').html(resp.msg).fadeIn(1000);
			}  
		}
*/


		$('#subscriber-email').focus(function(){
			$('#error-message').fadeOut();
			$('#success-message').fadeOut();
		});

		$('#subscriber-email').keydown(function(){
			$('#error-message').fadeOut();
			$('#success-message').fadeOut();
		});

		$("#subscriber-email").click(function() {
			$("#subscriber-email").val('');
		});
		

		//	Subscribe to PDF brochure
		$("#subscribebtn").click(function() {

            //  get values from inputs
            var email_input = $('#subscriber_email');

			if( email_input.val() == "" ) {
				email_input.addClass('input-error');
				return false;
			} else {
				email_input.removeClass('input-error');
			}

            var email = email_input.val();
            var email_not = $('#subscriber_email_not').val();


			if ( !validateEmail( email ) ) {
				email_input.addClass('input-error');
				return false;
			}


			var dataString = '&reg_email=' + email + '&reg_email_not=' + email_not;

			$.ajax({
				type: "POST",
				url: "/send-brochure.php",
				data: dataString,
				success: function(responseData, textStatus, jqXHR) {
					$('.success-message').html('Your PDF brochure should be on its way to you via email.<br/>Check your Spam folder just in case.').fadeIn(1000);
					$('.error-message').fadeOut(500);
					$('#reg-form').fadeOut(1500);
				},
				error: function(jqXHR, textStatus, errorThrown) {
                 	$('.error-message').html(textStatus).fadeIn(1000);
                    console.log(textStatus);
				}
			});

			return false;
		});

	};




	function validateEmail(email) { 
		var exp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return exp.test(email);
	}

	// CONTACT FORM
	function initContactForm() {

		var scrollElement = $('html,body');
		var	contactForm = $('.contact-form');
		var	form_msg_timeout;

		contactForm.on( 'submit', function() {

			var requiredFields = $(this).find('.required');
			var	formFields = $(this).find('input, textarea');
			var	formData = contactForm.serialize();
			var	formAction = $(this).attr('action');
			var	formSubmitMessage = $('.response-message');

			requiredFields.each(function() {

				if( $(this).val() == "" ) {
					$(this).addClass('input-error');
				} else {
					$(this).removeClass('input-error');
				}

			});


			var emailField = $('.contact-form-email');

			if( !validateEmail(emailField.val()) ) {
				emailField.addClass('input-error');
			}

			if ( $('.contact-form :input').hasClass('input-error') ) {
				return false;
			} else {

				clearTimeout(form_msg_timeout);

				$.post(formAction, formData, function(data) {
					
					formSubmitMessage.text(data);

					formFields.val('');
					
					$('.contact-form').fadeOut(1500);
					
					formSubmitMessage.slideUp();
					
/*
					form_msg_timeout = setTimeout(function() {
						formSubmitMessage.slideUp();
					}, 5000);
*/
				});

			}

			return false;

		});

	};





	// WINDOW.LOAD FUNCTION
	$(window).on('load', function () { 
		initPreloader();
		initOnLoadAnimations();
	});
	

	// DOCUMENT.READY FUNCTION
	jQuery(function(){
		iosdetect();
		initAnimations();
		initSectionHeight();
		initNavigation();
		initPageBackground();
		initSmothScroll();
		initParallaxBackground();
		initParallaxScroll();
		initCountdown();
		initPlugins();
		initContactForm();
	});	

	
	// WINDOW.RESIZE FUNCTION
	$(window).on('resize', function () { 
		initSectionHeight();       
	});

})(jQuery);