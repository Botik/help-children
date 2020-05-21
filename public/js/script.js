$(document).ready(function () {
	var SJ_setiings = {
		options: {
			hlw: true, // Height as width
			wlh: true, // Width as height
			hlt: true, // Width of the target element (target id is the same as for height)
			wlt: true, // Height of the target element (target id is the same as for width)
			alo: true, // All elements as one (height)
		},
		settings: {
			windowResize: true,
			writeHystory: true
		}
	};

	try {
		var sj = new SJ(SJ_setiings);
	} catch (err) {
		//;
	}

	$(".money").each(function () {
		$(this).text($(this).text().replace(/\B(?=(\d{3})+(?!\d))/g, " "));
	});

	var elemtop = $('.kid-cart .push-content').css('top');
	elemtop = parseInt(elemtop);

	$(window).scroll(function () {
		let scrolloffs = (window.innerWidth < 771) ? 120 : 200;

		if ($("#dolgosrochnaya-opeka").length && $("#pjm").length && $("#we-helped").length) {
			if ($(window).scrollTop() >= $("#dolgosrochnaya-opeka").offset().top - scrolloffs && $(window).scrollTop() < $("#pjm").offset().top - scrolloffs) {
				$('.cart-nav>div').each(function () {
					$(this).removeClass("active");
				});
				$('.cart-nav>div:first-child').addClass("active");
			} else if ($(window).scrollTop() >= $("#pjm").offset().top - scrolloffs && $(window).scrollTop() < $("#we-helped").offset().top - scrolloffs) {
				$('.cart-nav>div').each(function () {
					$(this).removeClass("active");
				});
				$('.cart-nav>div:nth-child(2)').addClass("active");
			} else if ($(window).scrollTop() >= $("#we-helped").offset().top - scrolloffs) {
				$('.cart-nav>div').each(function () {
					$(this).removeClass("active");
				});
				$('.cart-nav>div:nth-child(3)').addClass("active");
			}

		}
		if ($(".rep_fin").length && $(".rep_aud").length) {
			if ($(window).scrollTop() >= $(".rep_fin").offset().top - scrolloffs && $(window).scrollTop() < $(".rep_year").offset().top - scrolloffs) {
				$('.cart-nav>div').each(function () {
					$(this).removeClass("active");
				});
				$('.cart-nav>div:first-child').addClass("active");
			} else if ($(window).scrollTop() >= $(".rep_year").offset().top - scrolloffs && $(window).scrollTop() < $(".rep_aud").offset().top - scrolloffs) {
				$('.cart-nav>div').each(function () {
					$(this).removeClass("active");
				});
				$('.cart-nav>div:nth-child(2)').addClass("active");
			} else if ($(window).scrollTop() >= $(".rep_aud").offset().top - scrolloffs) {
				$('.cart-nav>div').each(function () {
					$(this).removeClass("active");
				});
				$('.cart-nav>div:nth-child(3)').addClass("active");
			}

		}
	});


	$('.cart-nav.kid-profile>div').click(function () {
		var scroll = $(window).scrollTop();
		$('.cart-nav>div').each(function () {
			$(this).removeClass("active");
		});
		$('#letter').removeClass('displaytrue');
		$('#needed').removeClass('displaytrue');
		$('#kid-news').removeClass('displaytrue');

		$(this).addClass("active");
		var link = $(this).find('a').attr('href');
		location.hash=link;
		$(link).addClass('displaytrue');

		// $(link)[0].scrollIntoView({block: "center", behavior: "smooth"});

		if (link == "#kid-news") {
			// var SJ_setiings = {
			// 	options: {
			// 			hlw: true, // Height as width
			// 			wlh: true, // Width as height
			// 			hlt: true, // Width of the target element (target id is the same as for height)
			// 			wlt: true, // Height of the target element (target id is the same as for width)
			// 			alo: true, // All elements as one (height)
			// 	},
			// 	settings: {
			// 			windowResize: true,
			// 			writeHystory: true
			// 	}
			// }
			// var sj2 = new SJ(SJ_setiings);
		}
		if (link == "#needed") {
			var galleryThumbs = new Swiper('.gallery-thumbs', {
				spaceBetween: 10,
				slidesPerView: 4,
				freeMode: true,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
			});
			var galleryTop = new Swiper('.gallery-top', {
				spaceBetween: 10,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				thumbs: {
					swiper: galleryThumbs
				}
			});

		}
		// var $page = $('html, body');
		// $page.animate({
		// 	scrollTop: ($('.hr-child.hr-full').offset().top - 80)
		// }, 400);
		// $(window).scrollTop($('.hr-child.hr-full').offset().top - 80);
	});


	$('.cart-nav.kids-page>div').click(function () {
		$('.cart-nav>div').each(function () {
			$(this).removeClass("active");
		});
		var $page = $('html, body');
		$(this).addClass("active");
		var link = $(this).find('a').attr('href');
		$page.animate({
			scrollTop: ($(link).offset().top - ((window.innerWidth < 771) ? 100 : 180))
		}, 400);
	});


	$('.dropdown-link').hover(function () {
		$(this).find('.dropdown-content').stop(true, true).delay(100).fadeIn(300);
	}, function () {
		$(this).find('.dropdown-content').stop(true, true).delay(100).fadeOut(300);
	});


	$('.progressline-block .progress-bar').mouseenter(function () {
		$('.progress-bar').each(function () {
			$(this).removeClass('opened');
			$('.polygon').detach();
		});
		$(this).addClass('opened');

		var progressHeight = $(this).position().top;
		if (progressHeight > 0) {
			$('.aid-card .push-content').css('top', (elemtop + progressHeight) + 'px');
		} else {
			$('.aid-card .push-content').css('top', '-15px');
		}
		var mess = $(this).closest(".progressline-block").find('.push-content');
		var txt = $(this).find('.txt').html();
		mess.html(txt);
		$(this).append('<div class="polygon"></div>').fadeTo(100, 1);
		mess.stop().fadeTo(100, 1);

		// $('.polygon').css('display', 'block');
	});

	$('.progressline-block').mouseleave(function () {
		$('.progress-bar').each(function () {
			$(this).removeClass('opened');
			$('.polygon').detach();
		});
		$('.push-content').hide();
	});

	$('.collected-resources__slider .collected-resources').mouseenter(function () {
		$('.collected-resources').each(function () {
			$(this).removeClass('opened');
		});
		$(this).addClass('opened');
		$('.collected-resources__slider .collected-resources').each(function () {
			$('.polygon').detach();
		});

		var progressHeight = $(this).position().top;
		if (progressHeight > 0) {
			$('.newprogressbarwrapper .push-content').css('top', (elemtop + progressHeight) + 'px');
		} else {
			$('.newprogressbarwrapper .push-content').css('top', '-15px');
		}
		var mess = $(this).closest(".newprogressbarwrapper").find('.push-content');
		var txt = $(this).find('.txt').html();
		mess.html(txt);
		mess.stop().fadeTo(100, 1);
		$(this).append('<div class="polygon"></div>');

		$('.polygon').css('display', 'block');
	});

	$('.newprogressbarwrapper').mouseleave(function () {
		$('.collected-resources').each(function () {
			$(this).removeClass('opened');
		});
		$('.polygon').css('display', 'none');
		$('.newprogressbarwrapper .push-content').hide();

	});

	// if ($('.news').length) {
	//     $('.news').click(function(){
	//         var pagelink = $(this).data('href');
	//         //console.log(pagelink);
	//         location.href = pagelink;
	//     })

	// }

	if ($('.mothersletter').length) {
		var hash = window.location.hash;
		if (hash == "#needed") {
			$('.cart-nav>div').each(function () {
				$(this).removeClass("active");
			});
			$('#letter').removeClass('displaytrue');
			$('#needed').removeClass('displaytrue');
			$('#kid-news').removeClass('displaytrue');

			$('.cart-nav .right').addClass("active");

			$('#needed').addClass('displaytrue');
			var $page = $('html, body');
			$page.animate({
				//scrollTop: ($('.cart-nav').offset().top - 180)
				scrollTop: ($('.hr-child.hr-full').offset().top - 80)
			}, 1000);
		}
		if (hash == "#kid-news") {
			$('.cart-nav>div').each(function () {
				$(this).removeClass("active");
			});
			$('#letter').removeClass('displaytrue');
			$('#needed').removeClass('displaytrue');
			$('#kid-news').removeClass('displaytrue');

			$('.cart-nav .center').addClass("active");

			$('#kid-news').addClass('displaytrue');
			var $page = $('html, body');
			$page.animate({
				//scrollTop: ($('.cart-nav').offset().top - 180)
				scrollTop: ($('.hr-child.hr-full').offset().top - 80)
			}, 1000);
		}
		// if (hash == "#letter") {
		// 	$('.cart-nav>div').each(function() {
		// 			$(this).removeClass("active");
		// 	});
		// 	$('#letter').removeClass('displaytrue');
		// 	$('#needed').removeClass('displaytrue');
		// 	$('#kid-news').removeClass('displaytrue');

		// 	$('.cart-nav .left').addClass("active");

		// 	$('#letter').addClass('displaytrue');
		// 	var $page = $('html, body');
		// 	$page.animate({
		// 			//scrollTop: ($('.cart-nav').offset().top - 180)
		// 			scrollTop: ($('.hr-child.hr-full').offset().top - 80)
		// 	}, 1000);
		// }

		if ($(window).width() <= '768') {
			if ($('.hero-medium__title').text() == "Долгосрочная опека" || $('.hero-medium__title').text() == "Мы помогли") {
				//$('.hero-medium__title').css('margin-top','10px');
			}
		}

		$('.history-link').click(function () {
			event.preventDefault();
			$('.cart-nav>div').each(function () {
				$(this).removeClass("active");
			});
			$('#letter').removeClass('displaytrue');
			$('#needed').removeClass('displaytrue');
			$('#kid-news').removeClass('displaytrue');

			$('.cart-nav .center').addClass("active");

			$('#kid-news').addClass('displaytrue');
			var $page = $('html, body');
			$page.animate({
				//scrollTop: ($('.cart-nav').offset().top - 180)
				scrollTop: ($('.hr-child.hr-full').offset().top - 80)
			}, 1000);
		});

	}

	$(window).resize(function () {
		if ($(window).width() <= '1440') {
			if ($('.hero-medium__title').height() < 50) {
				$('.kids-wrapper').css('top', '-130px');
			}
			if ($('.hero-medium__title').height() > 70) {
				$('.kids-wrapper').css('top', '-100px');
			}
			if ($('.hero-medium__title').height() < 50) {
				$('.kids-wrapper').css('top', '-130px');
			}
			if ($('.hero-medium__title').height() > 70) {
				$('.kids-wrapper').css('top', '-100px');
			}
			if ($('.hero-large .container').height() > 70) {
				$('.online-help-wrapper').css('top', '-460px');
			} else {
				$('.online-help-wrapper').css('top', '-500px');
			}
		} else {
			$('.kids-wrapper').css('top', '-130px');
			$('.online-help-wrapper').css('top', '-500px');
		}
	});

	if ($(window).width() <= '1440') {
		if ($('.hero-medium__title').height() < 50) {
			$('.kids-wrapper').css('top', '-130px');

		}
		if ($('.hero-medium__title').height() > 70) {
			$('.kids-wrapper').css('top', '-100px');
		}
		if ($('.hero-large .container').height() > 70) {
			$('.online-help-wrapper').css('top', '-460px');
		}
	}

	$('.header-mobile .nav-links__item-link, .header-mobile .nav-links-submenu__item').click(function () {
		$('.js-mobile-menu-button').trigger('click');
	});
});


function animateScroll(elem) {
	var $page = $('html, body');
	$page.animate({
		scrollTop: ($(elem).offset().top - ((window.innerWidth < 771) ? 100 : 180))
	}, 400);
}

function locationFunc(link) {
	if ($('.mothersletter').length) {
		var hashpos = link.indexOf('#');
		var hash = link.slice(hashpos, link.length + 1);
		history.replaceState({}, '', hash);
		if (hash == "#needed") {
			$('.cart-nav>div').each(function () {
				$(this).removeClass("active");
			});
			$('#letter').removeClass('displaytrue');
			$('#needed').removeClass('displaytrue');
			$('#kid-news').removeClass('displaytrue');

			$('.cart-nav .right').addClass("active");

			$('#needed').addClass('displaytrue');
			var $page = $('html, body');
			$page.animate({
				scrollTop: ($('.hr-child.hr-full').offset().top - 80)
			}, 1000);

			var galleryThumbs = new Swiper('.gallery-thumbs', {
				spaceBetween: 10,
				slidesPerView: 4,
				freeMode: true,
				watchSlidesVisibility: true,
				watchSlidesProgress: true,
			});
			var galleryTop = new Swiper('.gallery-top', {
				spaceBetween: 10,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				thumbs: {
					swiper: galleryThumbs
				}
			});
		}
		if (hash == "#kid-news") {
			$('.cart-nav>div').each(function () {
				$(this).removeClass("active");
			});
			$('#letter').removeClass('displaytrue');
			$('#needed').removeClass('displaytrue');
			$('#kid-news').removeClass('displaytrue');

			$('.cart-nav .center').addClass("active");

			$('#kid-news').addClass('displaytrue');
			var $page = $('html, body');
			$page.animate({
				scrollTop: ($('.hr-child.hr-full').offset().top - 80)
			}, 1000);
		}

		$('.history-link').click(function (event) {
			event.preventDefault();
			$('.cart-nav>div').each(function () {
				$(this).removeClass("active");
			});
			$('#letter').removeClass('displaytrue');
			$('#needed').removeClass('displaytrue');
			$('#kid-news').removeClass('displaytrue');

			$('.cart-nav .center').addClass("active");

			$('#kid-news').addClass('displaytrue');
			var $page = $('html, body');
			$page.animate({
				scrollTop: ($('.hr-child.hr-full').offset().top - 80)
			}, 1000);
		});
	} else {
		location.href = link;
	}
}
