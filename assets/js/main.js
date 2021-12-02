/*
	Strata by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$footer = $('#footer'),
		$main = $('#main'),
		settings = {

			// Parallax background effect?
				parallax: true,

			// Parallax factor (lower = more intense, higher = less intense).
				parallaxFactor: 20

		};

	// Breakpoints.
		breakpoints({
			xlarge:  [ '1281px',  '1800px' ],
			large:   [ '981px',   '1280px' ],
			medium:  [ '737px',   '980px'  ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile) {

			// Turn on touch mode.
				$body.addClass('is-touch');

			// Height fix (mostly for iOS).
				window.setTimeout(function() {
					$window.scrollTop($window.scrollTop() + 1);
				}, 0);

		}

	// Footer.
		breakpoints.on('<=medium', function() {
			$footer.insertAfter($main);
		});

		breakpoints.on('>medium', function() {
			$footer.appendTo($header);
		});

	// Header.

		// Parallax background.

			// Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
				if (browser.name == 'ie'
				||	browser.mobile)
					settings.parallax = false;

			if (settings.parallax) {

				breakpoints.on('<=medium', function() {

					$window.off('scroll.strata_parallax');
					$header.css('background-position', '');

				});

				breakpoints.on('>medium', function() {

					$header.css('background-position', 'left 0px');

					$window.on('scroll.strata_parallax', function() {
						$header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
					});

				});

				$window.on('load', function() {
					$window.triggerHandler('scroll');
				});

			}

	// Main Sections: Two.

		// Lightbox gallery.
			// $window.on('load', function() {

			// 	$('#two').poptrox({
			// 		caption: function($a) { return $a.next('h3').text(); },
			// 		overlayColor: '#2c2c2c',
			// 		overlayOpacity: 0.85,
			// 		popupCloserText: '',
			// 		popupLoaderText: '',
			// 		selector: '.work-item a.image',
			// 		usePopupCaption: true,
			// 		usePopupDefaultStyling: false,
			// 		usePopupEasyClose: false,
			// 		usePopupNav: true,
			// 		windowMargin: (breakpoints.active('<=small') ? 0 : 50)
			// 	});

			// });

		// Modals
			$window.on('load',function(){
				let companyList = ['xenith','ford-direct','infoready','great-taste','sapiens','etx'];

				companyList.forEach((company)=>{
					new jBox('Modal', {
						attach: '.'+company+'-exp-link',
						content: $('#'+company+'-exp-modal'),
						maxWidth: 1600
					});
				})
			})

		// Cookie notification
		$window.on('load',function(){
			new jBox('Notice', {
				content: $('#cookie-popup-content'),
				closeOnClick:true,
				closeOnEsc:true,
				closeOnMouseLeave:false,
				autoClose:false,
				delayOpen:500,
				closeButton:true,
				onClose:function(){
					console.log("Cookies Accepted!");
					if(location.hostname === 'www.natevory.com'){
						gtag('consent', 'update', {
							'analytics_storage': 'granted'
						});
					} else {
						console.log("pretending to add cookies");
					}

				},
				animation:{
					open:'pulse',
					close:'flip'
				}
			});
			
		})
		


	// ---- SMOOTH SCROLL ------
		// Select all links with hashes
		$('a[href*="#"]')
		// Remove links that don't actually link to anything
		// .not('[href="#"]')
		.not('[href="#0"]')
		.click(function(event) {
		// On-page links
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
			&& 
			location.hostname == this.hostname
		) {
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
			// Only prevent default if animation is actually gonna happen
			event.preventDefault();
			$('html, body').animate({
				scrollTop: target.offset().top
			}, 1000, function() {
				// Callback after animation
				// Must change focus!
				var $target = $(target);
				$target.focus();
				if ($target.is(":focus")) { // Checking if the target was focused
				return false;
				} else {
				$target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
				$target.focus(); // Set focus again
				};
			});
			}
		}
		});

})(jQuery);