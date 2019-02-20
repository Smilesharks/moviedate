(function () {
	window.tmdb = {
	"api_key": "be7463424e04e25654a938f9a9951509&language=es-US&page=1&region=US&append_to_response=videos",
	"base_uri": "https://api.themoviedb.org/3/movie/",
	"images_uri": "http://image.tmdb.org/t/p",
	"video_uri": "https://api.themoviedb.org/3/movie/",
	"timeout": 5000,
	"size": "/w500",
	call: function(url, params, success, error) {
		var params_str = "api_key=" + tmdb.api_key;
		for (var key in params) {
		if (params.hasOwnProperty(key)) {
			params_str += "&" + key + "=" + encodeURIComponent(params[key]);
		}
		}
		var xhr = new XMLHttpRequest();
		xhr.timeout = tmdb.timeout;
		xhr.ontimeout = function() {
		throw ("Request timed out: " + url + " " + params_str);
		};
		xhr.open("GET", tmdb.base_uri + url + "?" + params_str, true);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.responseType = "text";
		xhr.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status === 200) {
			if (typeof success == "function") {
				success(JSON.parse(this.response));
			} else {
				throw ('No success callback, but the request gave results')
			}
			} else {
			if (typeof error == "function") {
				error(JSON.parse(this.response));
			} else {
				throw ('No error callback')
			}
			}
		}
		};
		xhr.send();
	}
	}
})()



window.addEventListener('keydown', function(e) {
	handleKeyPress(e);
}, false);

var input = document.getElementById('search');
input.addEventListener('click', search, false);

function handleKeyPress(e) {
	var key = e.keyCode || e.which;
	if (key == 13) {
	search();
	}
}

function search() {

	var info = document.getElementById('info');
	info.innerHTML = '';

	var query = document.getElementById('query').value;

	tmdb.call('/search/tv', {
		'query': query,
	},
	function(e) {
		var results = Object.keys(e.results);
		console.log("Success: " + e);

		for (var i = 0; i < e.results.length; i++) {
		// console.log(JSON.stringify(e.results[i]));
		var info = document.getElementById('info')
		var show = document.createElement('div');
		show.setAttribute("class", "col-xl-3 col-sm-6 col-xs-12" );
		show.id = i;
		var json = e.results[i];
		var poster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
		var name = e.results[i].original_name;
		var vote = e.results[i].vote_average;
		var img = new Image();
		// img.src = poster;
		info.appendChild(show);
		// show.appendChild(img);
		if (img.src === 'http://image.tmdb.org/t/p/w500null') {
			img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
		}
		show.innerHTML += '<div class="poster card text-white d-flex"><div class="poster__grad"></div><div class="poster__img" style="filter: grayscale(1);background-image:url('+ poster +')"></div><div class="poster__info align-self-end w-100 p-2"><h3 class="h4 poster__title card-title">'+ name + '</h3><p class="poster__text m-0">Votes:<span>⭐️</span>' + vote + '</p></div></div><div class="poster__footer row mt-2 mb-4"><div class="col-3"><div class="btn btn-secondary"><i class="fas fa-ticket-alt"></i></div></div><div class="col-9"><a id="one" class="button btn btn-primary w-100">Ver Trailer</a></div></div>';

		function click() {
			var display = document.getElementById('display');
			display.innerHTML = '';
			//img.src = '';
			var i = this.id;
			console.log(i);
			var displayPoster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
			img.src = displayPoster;
			if (img.src === 'http://image.tmdb.org/t/p/w500null') {
			img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
			}
			display.appendChild(img);
			display.innerHTML += '<p>Emisión: ' + e.results[i].first_air_date + '</p>';
			display.innerHTML += '<p>Name: ' + e.results[i].original_name + '</p>';
			display.innerHTML += '<p>Description: ' + e.results[i].overview + '</p>';
		};
		show.addEventListener('click', click, false);

		};
	},
	function(e) {
		console.log("Error: " + e)
	}
	)
	tmdb.call('/search/movie', {
		'query': query,
	},
	function(e) {
		var results = Object.keys(e.results);
		console.log("Success: " + e);

		for (var i = 0; i < e.results.length; i++) {
		// console.log(JSON.stringify(e.results[i]));
		var info = document.getElementById('info')
		var show = document.createElement('div');
		show.setAttribute("class", "col-xl-3 col-sm-6 col-xs-12" );
		show.id = i;
		var json = e.results[i];
		var poster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
		var name = e.results[i].title;
		var vote = e.results[i].vote_average;
		var img = new Image();
		// img.src = poster;
		info.appendChild(show);
		// show.appendChild(img);
		if (img.src === 'http://image.tmdb.org/t/p/w500null') {
			img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
		}
		show.innerHTML += '<div class="poster card text-white d-flex"><div class="poster__grad"></div><div class="poster__img" style="filter: grayscale(1);background-image:url('+ poster +')"></div><div class="poster__info align-self-end w-100 p-2"><h3 class="h4 poster__title card-title">'+ name + '</h3><p class="poster__text m-0">Votes:<span>⭐️</span> ' + vote + '</p></div></div><div class="poster__footer row mt-2 mb-4"><div class="col-3"><div class="btn btn-secondary"><i class="fas fa-ticket-alt"></i></div></div><div class="col-9"><a id="one" class="button btn btn-primary w-100">Ver Trailer</a></div></div>';

		function click() {
			var display = document.getElementById('display');
			display.innerHTML = '';
			//img.src = '';
			var i = this.id;
			console.log(i);
			var displayPoster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
			img.src = displayPoster;
			if (img.src === 'http://image.tmdb.org/t/p/w500null') {
			img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
			}
			display.appendChild(img);
			display.innerHTML += '<p>Emisión: ' + e.results[i].release_date + '</p>';
			display.innerHTML += '<p>Name: ' + e.results[i].title + '</p>';
			display.innerHTML += '<p>Description: ' + e.results[i].overview + '</p>';

		};
		$('.button').click(function(){
			var buttonId = $(this).attr('id');
			$('#modal-container').removeAttr('class').addClass(buttonId);
			$('body').addClass('modal-active');
		})

		$('#modal-container').click(function(){
			$(this).addClass('out');
			$('body').removeClass('modal-active');
		});

		$( ".button" ).click(function() {
			console.log( "You clicked a foo!" );
		});
		show.addEventListener('click', click, false);
		};
	},
	/*tmdb.call('/movie/top_rated', {
		},
		function(e) {
		var results = Object.keys(e.results);
		console.log("Success: " + e);
		},*/
	function(e) {
		console.log("Error: " + e)
	}
	)
}; // search() close. below are global.






// topMovies
// function topMovies() {
//   tmdb.call('/movie/top_rated', {},
// 	function(e) {
// 	  var info = document.getElementById('info');
// 	  info.innerHTML = '';
// 	  var results = Object.keys(e.results);
// 	  console.log("Success: " + e);
// 	  console.log(e.results);
// 	  for (var i = 0; i < e.results.length; i++) {
// 		console.log(JSON.stringify(e.results[i]));
// 		var info = document.getElementById('info')
// 		var show = document.createElement('div');
// 		show.setAttribute("class", "col-xl-3 col-sm-6 col-xs-12" );
// 		show.id = i;
// 		var json = e.results[i];
// 		var poster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
// 		var name = e.results[i].title;
// 		var vote = e.results[i].vote_average;
// 		var img = new Image();
// 		// img.src = poster;
// 		info.appendChild(show);
// 		// show.appendChild(img);
// 		if (img.src === 'http://image.tmdb.org/t/p/w500null') {
// 		  img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
// 		}
// 		show.innerHTML += '<div class="poster card text-white d-flex"><span class="w-100 status"><div class="m-2 primary">Estreno</div></span><div class="poster__grad"></div><div class="poster__img" style="filter: grayscale(1);background-image:url('+ poster +')"></div><div class="poster__info align-self-end w-100 p-2"><h3 class="h4 poster__title card-title">'+ e.results[i].title + '</h3><p class="poster__text m-0">' + e.results[i].release_date + '</p></div></div><div class="poster__footer row mt-2 mb-4"><div class="col-3"><div class="btn btn-secondary"><i class="fas fa-ticket-alt"></i></div></div><div class="col-9"><a id="one" class="button btn btn-primary w-100">Ver Trailer</a></div></div>';

// 		function click() {
// 		  var display = document.getElementById('display');
// 		  display.innerHTML = '';
// 		  //img.src = '';
// 		  var i = this.id;
// 		  console.log(i);
// 		  var displayPoster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
// 		  img.src = displayPoster;
// 		  if (img.src === 'http://image.tmdb.org/t/p/w500null') {
// 			img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
// 		  }
// 		  display.appendChild(img);
// 		  display.innerHTML += '<p>Emisión: ' + e.results[i].release_date + '</p>';
// 		  display.innerHTML += '<p>Nombre: ' + e.results[i].title + '</p>';
// 		  display.innerHTML += '<p>Descripción: ' + e.results[i].overview + '</p>';

// 		};
// 		$('.button').click(function(){
// 			var buttonId = $(this).attr('id');
// 			$('#modal-container').removeAttr('class').addClass(buttonId);
// 			$('body').addClass('modal-active');
// 		})

// 		$('#modal-container').click(function(){
// 			$(this).addClass('out');
// 			$('body').removeClass('modal-active');
// 		});

// 		$( ".button" ).click(function() {
// 			console.log( "You clicked a foo!" );
// 		});
// 		show.addEventListener('click', click, false);
// 	  };
// 	},
// 	function(e) {
// 	  console.log("Error: " + e)
// 	}
//   )
// }













// function popular() {
//   tmdb.call('/movie/popular', {},
// 	function(e) {
// 	  var info = document.getElementById('info');
// 	  info.innerHTML = '';
// 	  var results = Object.keys(e.results);
// 	  console.log("Success: " + e);
// 	  console.log(e.results);
// 	  for (var i = 0; i < e.results.length; i++) {
// 		console.log(JSON.stringify(e.results[i]));
// 		var info = document.getElementById('info')
// 		var show = document.createElement('div');
// 		show.setAttribute("class", "col-xl-3 col-sm-6 col-xs-12" );
// 		show.id = i;
// 		var json = e.results[i];
// 		var poster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
// 		var name = e.results[i].title;
// 		var vote = e.results[i].vote_average;
// 		var img = new Image();
// 		// img.src = poster;
// 		info.appendChild(show);
// 		// show.appendChild(img);
// 		if (img.src === 'http://image.tmdb.org/t/p/w500null') {
// 		  img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
// 		}
// 		show.innerHTML += '<div class="poster card text-white d-flex"><span class="w-100 status"><div class="m-2 primary">Estreno</div></span><div class="poster__grad"></div><div class="poster__img" style="filter: grayscale(1);background-image:url('+ poster +')"></div><div class="poster__info align-self-end w-100 p-2"><h3 class="h4 poster__title card-title">'+ e.results[i].title + '</h3><p class="poster__text m-0">' + vote + '</p></div></div><div class="poster__footer row mt-2 mb-4"><div class="col-3"><div class="btn btn-secondary"><i class="fas fa-ticket-alt"></i></div></div><div class="col-9"><a id="one" class="button btn btn-primary w-100">Ver Trailer</a></div></div>';

// 		function click() {
// 		  var display = document.getElementById('display');
// 		  display.innerHTML = '';
// 		  //img.src = '';
// 		  var i = this.id;
// 		  console.log(i);
// 		  var displayPoster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
// 		  img.src = displayPoster;
// 		  if (img.src === 'http://image.tmdb.org/t/p/w500null') {
// 			img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
// 		  }
// 		  display.appendChild(img);
// 		  display.innerHTML += '<p>Emisión: ' + e.results[i].release_date + '</p>';
// 		  display.innerHTML += '<p>Name: ' + e.results[i].title + '</p>';
// 		  display.innerHTML += '<p>Description: ' + e.results[i].overview + '</p>';

// 		};
// 		$('.button').click(function(){
// 			var buttonId = $(this).attr('id');
// 			$('#modal-container').removeAttr('class').addClass(buttonId);
// 			$('body').addClass('modal-active');
// 		})

// 		$('#modal-container').click(function(){
// 			$(this).addClass('out');
// 			$('body').removeClass('modal-active');
// 		});

// 		$( ".button" ).click(function() {
// 			console.log( "You clicked a foo!" );
// 		});
// 		show.addEventListener('click', click, false);
// 	  };
// 	},
// 	function(e) {
// 	  console.log("Error: " + e)
// 	}
//   )
// }

function nowPlaying() {
	tmdb.call('now_playing', {},
	function(e) {
		var info = document.getElementById('info');
		info.innerHTML = '';
		var results = Object.keys(e.results);
		console.log("Success: " + e);
		console.log(e.results);
		for (var i = 0; i < e.results.length; i++) {
		// console.log(JSON.stringify(e.results[i]));
		var info = document.getElementById('info')
		var show = document.createElement('div');
		show.setAttribute("class", "col-xl-3 col-sm-6 col-xs-12" );
		show.id = i;
		var json = e.results[i];
		var poster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
		var name = e.results[i].title;
		var vote = e.results[i].vote_average;
		var img = new Image();
		// img.src = poster;
		info.appendChild(show);
		// show.appendChild(img);
		if (img.src === 'http://image.tmdb.org/t/p/w500null') {
			img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
		}

		show.innerHTML += '<div class="poster card text-white d-flex"><span class="w-100 status"><div class="m-2 primary">Estreno</div></span><div class="poster__grad"></div><div class="poster__img" style="filter: grayscale(1);background-image:url('+ poster +')"></div><div class="poster__info align-self-end w-100 p-2"><h3 class="h4 poster__title card-title">'+ e.results[i].title + '</h3><p class="poster__text m-0">' + e.results[i].release_date + '</p></div></div><div class="poster__footer row mt-2 mb-4"><div class="col-3"><div class="btn btn-secondary"><i class="fas fa-ticket-alt"></i></div></div><div class="col-9"><a id="one" class="button btn btn-primary w-100">Ver Trailer</a></div></div>';

		function click() {
			var display = document.getElementById('display');
			display.innerHTML = '';
			//img.src = '';
			var i = this.id;
			console.log(i);
			var displayPoster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
			img.src = displayPoster;
			if (img.src === 'http://image.tmdb.org/t/p/w500null') {
			img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
			}
			display.appendChild(img);
			display.innerHTML += '<p>Emisión: ' + e.results[i].release_date + '</p>';
			display.innerHTML += '<p>Name: ' + e.results[i].title + '</p>';
			display.innerHTML += '<p>Description: ' + e.results[i].overview + '</p>';

		};
		$('.button').click(function(){
			var buttonId = $(this).attr('id');
			$('#modal-container').removeAttr('class').addClass(buttonId);
			$('body').addClass('modal-active');
		})

		$('#modal-container').click(function(){
			$(this).addClass('out');
			$('body').removeClass('modal-active');
		});

		$( ".button" ).click(function() {
			console.log( "You clicked a foo!" );
		});
		show.addEventListener('click', click, false);
		};
	},
	function(e) {
		console.log("Error: " + e)
	})
}




function upcoming() {
	tmdb.call('upcoming', {},
	function(e) {
		var info = document.getElementById('info');
		info.innerHTML = '';
		var results = Object.keys(e.results);
		// console.log("Success: " + e);
		// console.log(e.results);
		for (var i = 0; i < e.results.length; i++) {
		// console.log(JSON.stringify(e.results[i]));
		var info = document.getElementById('info')
		var show = document.createElement('div');
		show.setAttribute("class", "col-xl-3 col-sm-6 col-xs-12" );
		show.id = i;
		var json = e.results[i];
		var poster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
		// var pathJson = tmdb.video_uri + id + '?api_key=94a2f36cd4e27626b6a7a07766a76196&append_to_response=videos';
		var name = e.results[i].title;
		var vote = e.results[i].vote_average;
		var id = e.results[i].id;
		var video = e.results[i].movie_id;
		var estreno = e.results[i].release_date;
		var img = new Image();



		// function one(){
		// 	$.getJSON( pathJson , function (data) {
		// 		videoid = data.videos.results[0].key;
				// videoid = x.videos.results[0].key;
		// 	});
		// 	function two(){
		// 		// a=10;
		// 	}

		// 	two();
		// }

		// one();
		// console.log("ID: " + videoid);

		(function() {
			flickerAPI = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
			pathJson = tmdb.video_uri + id + '?api_key=94a2f36cd4e27626b6a7a07766a76196&append_to_response=videos'
			// videoId = $.videos.results.[0].key
			$.getJSON( pathJson, function(data) {
				videoId = e.results[i].videos[0].key
				// .result').html('<p>' + data.videos.results.[0].key + '</p>'
				// $('.result').html('<p>' + data.videos.results.[0].key + '</p>'
				// + '<p>' + data.baz[1] + '</p>');
			})
// .done(function( data ) {
// 	$.each( data.items, function( i, item ) {
// 		$( "<img>" ).attr( "src", item.media.m ).appendTo( "#images" );
// 		if ( i === 3 ) {
// 			return false;
// 		}
// 	});
// });
		})();
		console.log("ID: " + pathJson);


		// var spaceData;
		// function setup() {
		// 	loadJSON(pathJson, gotData, 'jsonp');

		// }
		// function gotData(data) {
		// 	videoid = data.videos.results[0].key;
		// 	console.log("ID: " + videoid);

		// 	spaceData = data;
		// }
		// function sep() {
		// 	if (spaceData) {
		// 		console.log("ID: " + videoid);
		// 	}
		// }

		// console.log("ID: " + videoid);




		// $.getJSON( pathJson , function (data) {
		// 	videoid = data.videos.results[0].key;
		// 	console.log("ID: " + videoid);
		// });

		// $(".actualyoutube iframe").remove();
		// $('<iframe width="420" height="315" frameborder="0" allowfullscreen></iframe>')
		// .attr("src", "http://www.youtube.com/embed/" + videoid)
		// .appendTo(".actualyoutube");



		img.src = poster;
		info.appendChild(show);
		// show.appendChild(img);
		if (img.src === 'http://image.tmdb.org/t/p/w500null') {
			img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
		}
		show.innerHTML += '<div  id="one" class="button poster card text-white d-flex"><span class="w-100 status"><div data-countdown="' + estreno + '" class="m-2 primary"></div></span><div class="poster__grad"></div><div class="poster__img" style="filter: grayscale(1);background-image:url('+ poster +')"></div><div class="poster__info align-self-end w-100 p-2"><h3 class="h4 poster__title card-title">'+ e.results[i].title + '</h3><p class="poster__text m-0">' + estreno + '</p></div></div><div class="poster__footer row mt-2 mb-4"><div class="col-3"><div class="button btn btn-secondary"><i class="fas fa-ticket-alt"></i></div></div><div class="col-9"><a class="button btn btn-primary w-100">Ver Trailer</a></div></div><span id="output">' + id + '</span>';

			$('[data-countdown]').each(function() {
				var $this = $(this), finalDate = $(this).data('countdown');
				$this.countdown(finalDate, function(event) {
					$this.html(event.strftime('%D días %H:%M:%S'));
				});
			});

		function click() {
			var display = document.getElementById('display');
			display.innerHTML = '';
			//img.src = '';
			var i = this.id;
			console.log(i);
			var displayPoster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
			img.src = displayPoster;
			if (img.src === 'http://image.tmdb.org/t/p/w500null') {
			img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
			}

			display.appendChild(img);
			display.innerHTML += '<h2>Name: ' + e.results[i].title + '</h2>';
			display.innerHTML += '<div class="actualyoutube"><iframe width="560" height="315" src="http://www.youtube.com/embed/VIDEO_ID_GOES_HERE" frameborder="0" allowfullscreen></iframe></div>';
			display.innerHTML += '<h4>Emisión: ' + e.results[i].release_date + '</h4>';
			display.innerHTML += '<h4  data-countdown=' + estreno + ' ></h4>';
			display.innerHTML += '<p>Description: ' + e.results[i].overview + '</p>';


		};
		$('.button').click(function(){
			var buttonId = $(this).attr('id');
			$('#modal-container').removeAttr('class').addClass(buttonId);
			$('body').addClass('modal-active');
		})

		$('#modal-container').click(function(){
			$(this).addClass('out');
			$('body').removeClass('modal-active');
		});

		$( ".button" ).click(function() {
			console.log( "You clicked a foo!" );
		});

		show.addEventListener('click', click, false);
		};
	},
	function(e) {
		console.log("Error: " + e)
	})
}

// function tvPopular() {
//   tmdb.call('/tv/on_the_air', {},
// 	function(e) {
// 	  var info = document.getElementById('info');
// 	  info.innerHTML = '';
// 	  var results = Object.keys(e.results);
// 	  console.log("Success: " + e);
// 	  console.log(e.results);
// 	  for (var i = 0; i < e.results.length; i++) {
// 		console.log(JSON.stringify(e.results[i]));
// 		var info = document.getElementById('info')
// 		var show = document.createElement('div');
// 		show.setAttribute("class", "col-xl-3 col-sm-6 col-xs-12" );
// 		show.id = i;
// 		var json = e.results[i];
// 		var poster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
// 		var name = e.results[i].original_name;
// 		var vote = e.results[i].vote_average;
// 		var img = new Image();
// 		// img.src = poster;
// 		info.appendChild(show);
// 		// show.appendChild(img);
// 		if (img.src === 'http://image.tmdb.org/t/p/w500null') {
// 		  img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
// 		}
// 		show.innerHTML += '<div class="poster card text-white d-flex"><span class="w-100 status"><div class="m-2 primary">Estreno</div></span><div class="poster__grad"></div><div class="poster__img" style="filter: grayscale(1);background-image:url('+ poster +')"></div><div class="poster__info align-self-end w-100 p-2"><h3 class="h4 poster__title card-title">'+ e.results[i].title + '</h3><p class="poster__text m-0">' + vote + '</p></div></div><div class="poster__footer row mt-2 mb-4"><div class="col-3"><div class="btn btn-secondary"><i class="fas fa-ticket-alt"></i></div></div><div class="col-9"><a id="one" class="button btn btn-primary w-100">Ver Trailer</a></div></div>';

// 		function click() {
// 		  var display = document.getElementById('display');
// 		  display.innerHTML = '';
// 		  //img.src = '';
// 		  var i = this.id;
// 		  console.log(i);
// 		  var displayPoster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
// 		  img.src = displayPoster;
// 		  if (img.src === 'http://image.tmdb.org/t/p/w500null') {
// 			img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
// 		  }
// 		  display.appendChild(img);
// 		  display.innerHTML += '<p>Emisión: ' + e.results[i].first_air_date + '</p>';
// 		  display.innerHTML += '<p>Name: ' + e.results[i].original_name + '</p>';
// 		  display.innerHTML += '<p>Description: ' + e.results[i].overview + '</p>';

// 		};
// 		$('.button').click(function(){
// 			var buttonId = $(this).attr('id');
// 			$('#modal-container').removeAttr('class').addClass(buttonId);
// 			$('body').addClass('modal-active');
// 		})

// 		$('#modal-container').click(function(){
// 			$(this).addClass('out');
// 			$('body').removeClass('modal-active');
// 		});

// 		$( ".button" ).click(function() {
// 			console.log( "You clicked a foo!" );
// 		});
// 		show.addEventListener('click', click, false);
// 	  };
// 	},
// 	function(e) {
// 	  console.log("Error: " + e)
// 	})
// }

// function tvTopRated() {
//   tmdb.call('/tv/top_rated', {},
// 	function(e) {
// 	  var info = document.getElementById('info');
// 	  info.innerHTML = '';
// 	  var results = Object.keys(e.results);
// 	  console.log("Success: " + e);
// 	  console.log(e.results);
// 	  for (var i = 0; i < e.results.length; i++) {
// 		console.log(JSON.stringify(e.results[i]));
// 		var info = document.getElementById('info')
// 		var show = document.createElement('div');
// 		show.setAttribute("class", "col-xl-3 col-sm-6 col-xs-12" );
// 		show.id = i;
// 		var json = e.results[i];
// 		var poster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
// 		var name = e.results[i].original_name;
// 		var vote = e.results[i].vote_average;
// 		var img = new Image();
// 		// img.src = poster;
// 		info.appendChild(show);
// 		// show.appendChild(img);
// 		if (img.src === 'http://image.tmdb.org/t/p/w500null') {
// 		  img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
// 		}
// 		show.innerHTML += '<div class="poster card text-white d-flex"><span class="w-100 status"><div class="m-2 primary">Estreno</div></span><div class="poster__grad"></div><div class="poster__img" style="filter: grayscale(1);background-image:url('+ poster +')"></div><div class="poster__info align-self-end w-100 p-2"><h3 class="h4 poster__title card-title">'+ e.results[i].title + '</h3><p class="poster__text m-0">' + vote + '</p></div></div><div class="poster__footer row mt-2 mb-4"><div class="col-3"><div class="btn btn-secondary"><i class="fas fa-ticket-alt"></i></div></div><div class="col-9"><a id="one" class="button btn btn-primary w-100">Ver Trailer</a></div></div>';

// 		function click() {
// 		  var display = document.getElementById('display');
// 		  display.innerHTML = '';
// 		  //img.src = '';
// 		  var i = this.id;
// 		  console.log(i);
// 		  var displayPoster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
// 		  img.src = displayPoster;
// 		  if (img.src === 'http://image.tmdb.org/t/p/w500null') {
// 			img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
// 		  }
// 		  display.appendChild(img);
// 		  display.innerHTML += '<p>Emisión: ' + e.results[i].first_air_date + '</p>';
// 		  display.innerHTML += '<p>Name: ' + e.results[i].original_name + '</p>';
// 		  display.innerHTML += '<p>Description: ' + e.results[i].overview + '</p>';

// 		};
// 		$('.button').click(function(){
// 			var buttonId = $(this).attr('id');
// 			$('#modal-container').removeAttr('class').addClass(buttonId);
// 			$('body').addClass('modal-active');
// 		})

// 		$('#modal-container').click(function(){
// 			$(this).addClass('out');
// 			$('body').removeClass('modal-active');
// 		});

// 		$( ".button" ).click(function() {
// 			console.log( "You clicked a foo!" );
// 		});
// 		show.addEventListener('click', click, false);
// 	  };
// 	},
// 	function(e) {
// 	  console.log("Error: " + e)
// 	})
// }
