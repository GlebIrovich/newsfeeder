/*jshint jquery:true */
// set colors
(function(){
	$('#container-newsbox section').css('background', '#222');
})()


const data = (async function(){
	const getNews = async () => {
			const id = 401714040;
			const url = `https://newsboxbot.herokuapp.com/moduleaccess/${id}/`;

			try {
				const response = await fetch(url);
				return response.json();

			} catch(e) {
				console.log(e);
				return [];
			}
	};
	const data = await getNews();

	// remove if array is empty
	if(data.length === 0) {
		$('#container-newsbox').remove();
		$('#myModal').remove();
		return;
	}

	const insertMain = (obj, index) => {
		return `
		<div class="item">
			<div class="news-post image-post">
				<img src="${obj.photo}" alt="">
				<div class="hover-box">
					<div class="inner-hover">
						<h2><a onclick="modalController.openModal(${index})" href="#">${obj.title}</a></h2>
						<ul class="post-tags">
							<li><i class="fa fa-clock-o"></i>${new Date(obj.date).toDateString()}</li>
						</ul>
						<p>${obj.description}</p>
					</div>
				</div>
			</div>
		</div>
		`
	}

	const insertSecondary = (obj, index) => {
		return `
		<div class="item">
			<div class="news-post image-post4" style="height: 208px;">
				<img src="${obj.photo}" style="min-width: 100%;" alt="">
				<div class="hover-box">
					<h2><a onclick="modalController.openModal(${index})">${obj.title}</a></h2>
					<ul class="post-tags">
						<li><i class="fa fa-clock-o"></i>${new Date(obj.date).toDateString()}</li>
					</ul>
				</div>
			</div>
		</div>
		`
	}

	const main = $('#main-news');
	const secondary = $('#secondary-news');
	const mainTiles = data.map((el, index) => {
		return insertMain(el, index);
	})
	const secTiles = data.map((el, index) => {
		return insertSecondary(el, index);
	})
	main.prepend(mainTiles.reverse().slice(0,6).join('\n'));
	secondary.prepend(secTiles.reverse().slice(6).join('\n'));

	/*-------------------------------------------------*/
	/* =  OWL carousell - featured post, video post, gallery posts
	/*-------------------------------------------------*/
	try {
		var owlWrap = $('.owl-wrapper');
		if (owlWrap.length > 0) {
				owlWrap.each(function(){

					var carousel= $(this).find('.owl-carousel'),
						dataNum = $(this).find('.owl-carousel').attr('data-num'),
						dataNum2,
						dataNum3;

					if ( dataNum == 1 ) {
						dataNum2 = 1;
						dataNum3 = 1;
					} else if ( dataNum == 2 ) {
						dataNum2 = 2;
						dataNum3 = dataNum - 1;
					} else {
						dataNum2 = dataNum - 1;
						dataNum3 = dataNum - 2;
					}

					carousel.owlCarousel({
						autoPlay: 10000,
						navigation : true,
						items : dataNum,
						itemsDesktop : [1199,dataNum2],
						itemsDesktopSmall : [979,dataNum3],
						mouseDrag: false
					});

				});
		}

	} catch(err) {
	}
	return data;
})();


((function(data){
	// skip if no news
	if(!data) return;
	// Modal controls
	const fillModal = (obj) => {
		return `
			<!-- <div class="share-post-box">
				<h3>${obj.title}</h3>
			</div> -->

			<div class="article-inpost">
				<div class="row">
					<div class="col-md-6">
						<div class="image-content">
							<div class="image-place">
								<img src="${obj.photo}" style="box-shadow: 0 0 15px rgba(0,0,0,0.7); margin-bottom:30px;" alt="">
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="post-content">
				<h1>${obj.title}</h1>
				${obj.article}
			</div>
			`
	}
	return data.then(data => {
		// Open the Modal
		return {
			openModal(n) {
				$('#modalPost').empty().prepend(fillModal(data[n]))
				document.getElementById('myModal').style.display = "block";
			},
			// Close the Modal
			closeModal() {
				document.getElementById('myModal').style.display = "none";
			}
		}
	})
})(data))
.then(obj => window.modalController=obj);


(function () {

	$(document).ready(function($) {
		"use strict";

		/* global google: false */
		/*jshint -W018 */

		/*-------------------------------------------------*/
		/* =  portfolio isotope
		/*-------------------------------------------------*/

		// var winDow = $(window);
		// 	// Needed variables
		// 	var $container=$('.iso-call');
		// 	var $filter=$('.filter');
		//
		// 	try{
		// 		$container.imagesLoaded( function(){
		// 			// init
		// 			winDow.trigger('resize');
		// 			$container.isotope({
		// 				filter:'*',
		// 				layoutMode:'masonry',
		// 				itemSelector: '.iso-call > div',
		// 				masonry: {
		// 				    columnWidth: '.default-size'
		// 				},
		// 				animationOptions:{
		// 					duration:750,
		// 					easing:'linear'
		// 				}
		// 			});
		// 		});
		// 	} catch(err) {
		// 	}
		//
		// 	winDow.on('resize', function(){
		// 		var selector = $filter.find('a.active').attr('data-filter');
		//
		// 		try {
		// 			$container.isotope({
		// 				filter	: selector,
		// 				animationOptions: {
		// 					duration: 750,
		// 					easing	: 'linear',
		// 					queue	: false,
		// 				}
		// 			});
		// 		} catch(err) {
		// 		}
		// 		return false;
		// 	});
		//
		// 	// Isotope Filter
		// 	$filter.find('a').on('click', function(){
		// 		var selector = $(this).attr('data-filter');
		//
		// 		try {
		// 			$container.isotope({
		// 				filter	: selector,
		// 				animationOptions: {
		// 					duration: 750,
		// 					easing	: 'linear',
		// 					queue	: false,
		// 				}
		// 			});
		// 		} catch(err) {
		//
		// 		}
		// 		return false;
		// 	});
		//
		//
		// var filterItemA	= $('.filter li a');
		//
		// 	filterItemA.on('click', function(){
		// 		var $this = $(this);
		// 		if ( !$this.hasClass('active')) {
		// 			filterItemA.removeClass('active');
		// 			$this.addClass('active');
		// 		}
		// 	});

		$('#container-newsbox').addClass('active');
		// $('.iso-call').css('opacity', 0);
		// $('.iso-call').imagesLoaded( function(){
		// 	$('.iso-call').css('opacity', 1);
		// });

		/*-------------------------------------------------*/
		/* = ticker news
		/*-------------------------------------------------*/

		try{
			$('#js-news').ticker({
				speed: 0.20,			// The speed of the reveal
				controls: true,			// Whether or not to show the jQuery News Ticker controls
				titleText: '',	// To remove the title set this to an empty String
				displayType: 'reveal',	// Animation type - current options are 'reveal' or 'fade'
				direction: 'ltr',		// Ticker direction - current options are 'ltr' or 'rtl'
				pauseOnItems: 2000,		// The pause on a news item before being replaced
				fadeInSpeed: 600,		// Speed of fade in animation
				fadeOutSpeed: 300		// Speed of fade out animation
			});
		} catch(err) {
		}

		/* ---------------------------------------------------------------------- */
		/*	Header animate after scroll
		/* ---------------------------------------------------------------------- */

		(function() {

			var docElem = document.documentElement,
				didScroll = false,
				changeHeaderOn = 300;
				document.querySelector( 'header' );
			function init() {
				window.addEventListener( 'scroll', function() {
					if( !didScroll ) {
						didScroll = true;
						setTimeout( scrollPage, 100 );
					}
				}, false );
			}

			function scrollPage() {
				var sy = scrollY();
				if ( sy >= changeHeaderOn ) {
					$( 'header' ).addClass('active');
				}
				else {
					$( 'header' ).removeClass('active');
				}
				didScroll = false;
			}

			function scrollY() {
				return window.pageYOffset || docElem.scrollTop;
			}

			init();

		})();

	});
})();
