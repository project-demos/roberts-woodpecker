var keyLeft;
var mapRight;


$( document ).ready(function() {
	fontResize();

	var headTextTween = TweenMax.fromTo("#head-text", 1, 
		{x: ($('#head-text').width() + 100)*-1, opacity:1},
		{x: 0, opacity:1, ease:Quad.easeInOut}
	);

	var headImgTween = TweenMax.fromTo("#head-img", 1, 
		{x: ($('#head-img').width() + 100), opacity:0},
		{x: 0, opacity:1, ease:Quad.easeInOut}
	);

	$('header').css('visibility','visible');
	headTextTween.play();
	headImgTween.play();

	getMapDistances();


	var controller = new ScrollMagic();
 
	var keyTween = TweenMax.fromTo("#map-key", .75, 
		{x: (keyLeft*-1), opacity:0},
		{x: 0, opacity:1, ease:Quad.easeInOut}
	);

	var mapTween = TweenMax.fromTo("#map", .75, 
		{x: (mapRight), opacity:0},
		{x: 0, opacity:1, ease:Quad.easeInOut}
	);

	var vidTween = TweenMax.fromTo("#pecker-vid", .75, 
		{x: ($('#pecker-vid').width() + 100)*-1, opacity:0},
		{x: 0, opacity:1, ease:Quad.easeInOut}
	);

	var birdTween = TweenMax.fromTo("#bird", .75, 
		{y: $('#bird-container').height() + 100, opacity:0},
		{y: 0, opacity:1, ease:Quad.easeInOut}
	);

	var outlineTween = TweenMax.fromTo("#bird-outline", .75, 
		{opacity:1},
		{opacity:0, ease:Quad.easeInOut}
	)
	.delay(.75);

	var playTween = TweenMax.fromTo("#play", .75, 
		{scale: .5, opacity:0},
		{scale: 1, opacity:1, ease:Quad.easeInOut}
	);

	var mapScene = new ScrollScene({triggerElement: "#map-trigger"})
						.setTween(mapTween);

	var keyScene = new ScrollScene({triggerElement: "#map-trigger"})
						.setTween(keyTween);

	var vidScene = new ScrollScene({triggerElement: "#video-trigger"})
						.setTween(vidTween);

	var birdScene = new ScrollScene({triggerElement: "#bird-container"})
						.setTween(birdTween);

	var outlineScene = new ScrollScene({triggerElement: "#bird-container"})
						.setTween(outlineTween);

	var playScene = new ScrollScene({triggerElement: "#play-trigger"})
						.setTween(playTween);

	controller.addScene([
		mapScene,
		keyScene,
		vidScene,
		birdScene,
		outlineScene,
		playScene
	]);

	$('#play-bird').on('click', function(){
		$('#pecker-audio').get(0).play();
		$('#stop-bird').toggle();
		$('#play-bird').toggleClass('invisible');
	});

	$('#stop-bird').on('click', function(){
		$('#pecker-audio').get(0).pause();
		$('#stop-bird').toggle();
		$('#play-bird').toggleClass('invisible');
	});

	$('#pecker-audio').on('ended', function(){
		$('#stop-bird').toggle();
		$('#play-bird').toggleClass('invisible');
	});

	$(window).on('resize', function(){
		fontResize();
	});

});

function fontResize(){
	var headWidth = $("header").width(); 
	var newSize = Math.ceil(parseInt(headWidth)/18.5);

	var els = [
		{"selector" : "#head-text h1", "scale" : 16, "min" : 0},
		{"selector" : "#head-text .title", "scale" : 8.14, "min" : 42},
		{"selector" : "#head-text .author", "scale" : 30, "min" : 13}
	];
	
	for (var i in els){
		var el = els[i];
		var newSize = Math.ceil(parseInt(headWidth)/el.scale);

		if (newSize < el.min){
			newSize = el.min;
		}

		$(el.selector).css('font-size', newSize+"px");

	}
}

function getMapDistances(){
	var key = $('#map-key').offset();
	var extraInfo = $('#extra-info').offset();
	keyLeft = key.left - extraInfo.left;

	var map = $(window).width() - ($('#map').offset().left + ($('#map').outerWidth()));
	var extraInfoRight = $(window).width() - ($('#extra-info').offset().left + ($('#extra-info').outerWidth()));;

	mapRight = map - extraInfoRight;
}