/*jshint jquery:true */
// set generate HTML
(function(){
	// generate HTML
	//big Tiles
	const container = $('#container-newsbox');

	container.append(
    $('<section/>', {'class': 'big-tiles'}).append(
        $('<div/>', {'class': 'heading-news-box'}).append(
            $('<div/>', {'class': 'owl-wrapper'}).append(
							$('<div/>', {'class': 'owl-carousel', id: 'main-news', 'data-num': '4'})
						)
        )
    )
	)
		.append(
	    $('<section/>', {'class': 'small-tiles'}).append(
          $('<div/>', {'class': 'owl-wrapper'}).append(
						$('<div/>', {'class': 'owl-carousel', id: 'secondary-news', 'data-num': '5'})
					)
    	)
		);

	$('#container-newsbox .big-tiles').css('background', config.feedColorMain || '#222');
	$('#container-newsbox .small-tiles').css('background', config.feedColorSecondary || '#222');
})()


const data = (async function(){
	const getNews = async () => {
			const id = config.id;

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
		$('.bot-modal').remove();
		return;
	}
	const setDateFormat = (obj) => {
		return new Date(obj.date).toLocaleDateString(config.lang, {day: 'numeric', month: 'long', year: 'numeric'})
	}
	const insertMain = (obj, index) => {
		const date = setDateFormat(obj);
		return `
		<div class="item">
			<div class="news-post image-post">
				<img src="${obj.photo}" alt="">
				<div class="hover-box" onclick="modalController.openModal(${index})">
					<div class="inner-hover">
						<h2><a onclick="modalController.openModal(${index})" href="#">${obj.title}</a></h2>
						<ul class="post-tags">
							<li><i class="fa fa-clock-o"></i>${date}</li>
						</ul>
						<p>${obj.description}</p>
					</div>
				</div>
			</div>
		</div>
		`
	}

	const insertSecondary = (obj, index) => {
		const date = setDateFormat(obj);
		return `
		<div class="item">
			<div class="news-post image-post4">
				<img src="${obj.photo}" style="min-width: 100%; height: 208px; object-fit: cover;" alt="" onclick="modalController.openModal(${index})">
				<div class="hover-box">
					<h2><a onclick="modalController.openModal(${index})">${obj.title}</a></h2>
					<ul class="post-tags">
						<li><i class="fa fa-clock-o"></i>${date}</li>
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
	if(!data) {
		return;
	};
	// Modal controls
	const fillModal = (obj) => {
		return `
		<!-- Modal content -->
			<div class="bot-modal-content">
			  <div class="bot-modal-header" style="background-color: ${config.modalColor || "#222"}">
			    <span class="bot-close" onclick="modalController.closeModal()">&times;</span>
			    <h2>${obj.title}</h2>
			  </div>
			  <div class="bot-modal-body">
					<div class="bot-modal-img" style="background-color: ${config.modalColor || "#222"}">
			    	<img src="${obj.photo}">
					</div>
			    <div class="bot-modal-article">
						${obj.article}
					</div>
			  </div>
			</div>
			`
	}
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == document.querySelector('.bot-modal')) {
	        document.querySelector('.bot-modal').style.display = "none";
	    }
	}
	return data.then(data => {
		data.length < 6 ? $('.small-tiles').hide() : $('.small-tiles').show();
		$('#container-newsbox').show();
		// Open the Modal
		return {
			openModal(n) {
				$('.bot-modal').empty().prepend(fillModal(data[n]))
				document.querySelector('.bot-modal').style.display = "block";
			},
			// Close the Modal
			closeModal() {
				document.querySelector('.bot-modal').style.display = "none";
			}
		}
	})
})(data))
.then(obj => window.modalController=obj);


(function () {

	$(document).ready(function($) {
		"use strict";


		$('#container-newsbox').addClass('active');

	});
})();
