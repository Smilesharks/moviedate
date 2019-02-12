(function() {	
  window.tmdb = {
	"api_key": "a0a7e40dc8162ed7e37aa2fc97db5654",
	"base_uri": "https://api.themoviedb.org/3",
	"images_uri": "http://image.tmdb.org/t/p",
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
		console.log(JSON.stringify(e.results[i]));
		var info = document.getElementById('info')
		var show = document.createElement('div');
		show.setAttribute("class", "col-3" );
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
		show.innerHTML += '<p>' + name + '</p>';
		show.innerHTML += '<p>Emisión: ' + e.results[i].release_date + '</p>';

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
		console.log(JSON.stringify(e.results[i]));
		var show = document.createElement('div');
		show.id = i;
		var json = e.results[i];
		var poster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
		var name = e.results[i].title;
		var img = new Image();
		img.src = poster;
		info.appendChild(show);
		show.appendChild(img);
		if (img.src === 'http://image.tmdb.org/t/p/w500null') {
		  img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
		}
		show.innerHTML += '<p>' + name + '</p>';
		show.innerHTML += '<p>Emisión: ' + e.results[i].release_date + '</p>';

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
function topMovies() {
  tmdb.call('/movie/top_rated', {},
	function(e) {
	  var info = document.getElementById('info');
	  info.innerHTML = '';
	  var results = Object.keys(e.results);
	  console.log("Success: " + e);
	  console.log(e.results);
	  for (var i = 0; i < e.results.length; i++) {
		console.log(JSON.stringify(e.results[i]));
		var info = document.getElementById('info')
		var show = document.createElement('div');
		show.setAttribute("class", "col-3" );
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
		//Titulo del preview
		// show.innerHTML += '<h3 class="h4 poster__title card-title">' + name + '</h3>';
		// show.innerHTML += '<p class="poster__text m-0">Emisión: ' + e.results[i].release_date + '</p>';
		// show.innerHTML += '<div class="poster__footer row mt-2"><div class="col-3"><a class="btn btn-secondary"><i class="fas fa-ticket-alt"></i></a></div><div class="col-9"><a class="btn btn-primary w-100">Ver Trailer</a></div></div>';


		show.innerHTML += '<div class="poster card text-white d-flex"><span class="w-100 status"><div class="m-2 primary">Estreno</div></span><div class="poster__grad"></div><div class="poster__img" style="filter: grayscale(1);background-image:url('+ poster +')"></div><div class="poster__info align-self-end w-100 p-2"><h3 class="h4 poster__title card-title">'+ e.results[i].title + '</h3><p class="poster__text m-0">' + e.results[i].release_date + '</p></div></div><div class="poster__footer row mt-2 mb-4"><div class="col-3"><a class="btn btn-secondary"><i class="fas fa-ticket-alt"></i></a></div><div class="col-9"><a class="btn btn-primary w-100">Ver Trailer</a></div></div>';





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
		  display.innerHTML += '<p>Nombre: ' + e.results[i].title + '</p>';
		  display.innerHTML += '<p>Descripción: ' + e.results[i].overview + '</p>';

		};
		show.addEventListener('click', click, false);
	  };
	},
	function(e) {
	  console.log("Error: " + e)
	}
  )










 //  function topMovies() {
	// tmdb.call('/movie/top_rated', {},
	//   function(e) {
	// 	var info = document.getElementById('info');
	// 	info.innerHTML = '';
	// 	var results = Object.keys(e.results);
	// 	// console.log("Success: " + e);
	// 	// console.log(e.results);
	// 	for (var i = 0; i < e.results.length; i++) {
	// 	  console.log(JSON.stringify(e.results[i]));
	// 	  var show = document.createElement('div');
	// 	  show.id = i;
	// 	  var json = e.results[i];
	// 	  var poster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
	// 	  var name = e.results[i].title;
	// 	  var name = e.results[i].release_date;
	// 	  var vote = e.results[i].vote_average;
	// 	  var img = new Image();
	// 	  img.src = poster;
	// 	  info.appendChild(show);
	// 	  show.appendChild(img);
	// 	  if (img.src === 'http://image.tmdb.org/t/p/w500null') {
	// 		img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
	// 	  }
	// 	  show.innerHTML += '<p>' + name + '</p>';
	// 	  show.innerHTML += '<p>Emisión: ' + e.results[i].release_date + '</p>';
	// 	  show.innerHTML += '<p>' + release_date + '</p>';
	// 	  show.innerHTML += '<p>' + vote + '</p>';

	// 	  function click() {
	// 		var display = document.getElementById('display');
	// 		display.innerHTML = '';
	// 		//img.src = '';
	// 		var i = this.id;
	// 		console.log(i);
	// 		var displayPoster = tmdb.images_uri + tmdb.size + e.results[i].poster_path;
	// 		img.src = displayPoster;
	// 		if (img.src === 'http://image.tmdb.org/t/p/w500null') {
	// 		  img.src = 'http://colouringbook.org/SVG/2011/COLOURINGBOOK.ORG/cartoon_tv_black_white_line_art_scalable_vector_graphics_svg_inkscape_adobe_illustrator_clip_art_clipart_coloring_book_colouring-1331px.png';
	// 		}
	// 		display.appendChild(img);
	// 		display.innerHTML += '<p>Emisión: ' + e.results[i].release_date + '</p>';
	// 		display.innerHTML += '<p>Name: ' + e.results[i].title + '</p>';
	// 		display.innerHTML += '<p>Description: ' + e.results[i].overview + '</p>';

	// 	  };
	// 	  show.addEventListener('click', click, false);
	// 	};
	//   },
	//   function(e) {
	// 	console.log("Error: " + e)
	//   })
 //  }
}

function popular() {
  tmdb.call('/movie/popular', {},
	function(e) {
	  var info = document.getElementById('info');
	  info.innerHTML = '';
	  var results = Object.keys(e.results);
	  console.log("Success: " + e);
	  console.log(e.results);
	  for (var i = 0; i < e.results.length; i++) {
		console.log(JSON.stringify(e.results[i]));
		var info = document.getElementById('info')
		var show = document.createElement('div');
		show.setAttribute("class", "col-3" );
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
		show.innerHTML += '<div class="poster card text-white d-flex"><span class="w-100 status"><div class="m-2 primary">Estreno</div></span><div class="poster__grad"></div><div class="poster__img" style="filter: grayscale(1);background-image:url('+ poster +')"></div><div class="poster__info align-self-end w-100 p-2"><h3 class="h4 poster__title card-title">'+ e.results[i].title + '</h3><p class="poster__text m-0">' + vote + '</p></div></div><div class="poster__footer row mt-2 mb-4"><div class="col-3"><a class="btn btn-secondary"><i class="fas fa-ticket-alt"></i></a></div><div class="col-9"><a class="btn btn-primary w-100">Ver Trailer</a></div></div>';

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
		show.addEventListener('click', click, false);
	  };
	},
	function(e) {
	  console.log("Error: " + e)
	}
  )
}

function nowPlaying() {
  tmdb.call('/movie/now_playing', {},
	function(e) {
	  var info = document.getElementById('info');
	  info.innerHTML = '';
	  var results = Object.keys(e.results);
	  console.log("Success: " + e);
	  console.log(e.results);
	  for (var i = 0; i < e.results.length; i++) {
		console.log(JSON.stringify(e.results[i]));
		var info = document.getElementById('info')
		var show = document.createElement('div');
		show.setAttribute("class", "col-3" );
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
		
		show.innerHTML += '<div class="poster card text-white d-flex"><span class="w-100 status"><div class="m-2 primary">Estreno</div></span><div class="poster__grad"></div><div class="poster__img" style="filter: grayscale(1);background-image:url('+ poster +')"></div><div class="poster__info align-self-end w-100 p-2"><h3 class="h4 poster__title card-title">'+ e.results[i].title + '</h3><p class="poster__text m-0">' + e.results[i].release_date + '</p></div></div><div class="poster__footer row mt-2 mb-4"><div class="col-3"><a class="btn btn-secondary"><i class="fas fa-ticket-alt"></i></a></div><div class="col-9"><a class="btn btn-primary w-100">Ver Trailer</a></div></div>';

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
		show.addEventListener('click', click, false);
	  };
	},
	function(e) {
	  console.log("Error: " + e)
	})
}

function upcoming() {
  tmdb.call('/movie/upcoming', {},
	function(e) {
	  var info = document.getElementById('info');
	  info.innerHTML = '';
	  var results = Object.keys(e.results);
	  console.log("Success: " + e);
	  console.log(e.results);
	  for (var i = 0; i < e.results.length; i++) {
		console.log(JSON.stringify(e.results[i]));
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
		show.innerHTML += '<div class="poster card text-white d-flex"><span class="w-100 status"><div class="m-2 primary">Estreno</div></span><div class="poster__grad"></div><div class="poster__img" style="filter: grayscale(1);background-image:url('+ poster +')"></div><div class="poster__info align-self-end w-100 p-2"><h3 class="h4 poster__title card-title">'+ e.results[i].title + '</h3><p class="poster__text m-0">' + e.results[i].release_date + '</p></div></div><div class="poster__footer row mt-2 mb-4"><div class="col-3"><div id="one" class="button btn btn-secondary"><i class="fas fa-ticket-alt"></i></div></div><div class="col-9"><a class="btn btn-primary w-100">Ver Trailer</a></div></div>';

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
		  display.innerHTML += '<h4>Emisión: ' + e.results[i].release_date + '</h4>';
		  display.innerHTML += '<p>Description: ' + e.results[i].overview + '</p>';

		};
		show.addEventListener('click', click, false);
	  };
	},
	function(e) {
	  console.log("Error: " + e)
	})
}

function tvPopular() {
  tmdb.call('/tv/popular', {},
	function(e) {
	  var info = document.getElementById('info');
	  info.innerHTML = '';
	  var results = Object.keys(e.results);
	  console.log("Success: " + e);
	  console.log(e.results);
	  for (var i = 0; i < e.results.length; i++) {
		console.log(JSON.stringify(e.results[i]));
		var info = document.getElementById('info')
		var show = document.createElement('div');
		show.setAttribute("class", "col-3" );
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
		show.innerHTML += '<div class="poster card text-white d-flex"><span class="w-100 status"><div class="m-2 primary">Estreno</div></span><div class="poster__grad"></div><div class="poster__img" style="filter: grayscale(1);background-image:url('+ poster +')"></div><div class="poster__info align-self-end w-100 p-2"><h3 class="h4 poster__title card-title">'+ name + '</h3><p class="poster__text m-0">' + e.results[i].vote_average + '</p></div></div><div class="poster__footer row mt-2 mb-4"><div class="col-3"><a class="btn btn-secondary"><i class="fas fa-ticket-alt"></i></a></div><div class="col-9"><a class="btn btn-primary w-100">Ver Trailer</a></div></div>';

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
	})
}

function tvTopRated() {
  tmdb.call('/tv/top_rated', {},
	function(e) {
	  var info = document.getElementById('info');
	  info.innerHTML = '';
	  var results = Object.keys(e.results);
	  console.log("Success: " + e);
	  console.log(e.results);
	  for (var i = 0; i < e.results.length; i++) {
		console.log(JSON.stringify(e.results[i]));
		var info = document.getElementById('info')
		var show = document.createElement('div');
		show.setAttribute("class", "col-3" );
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
		show.innerHTML += '<div class="poster card text-white d-flex"><span class="w-100 status"><div class="m-2 primary">Estreno</div></span><div class="poster__grad"></div><div class="poster__img" style="filter: grayscale(1);background-image:url('+ poster +')"></div><div class="poster__info align-self-end w-100 p-2"><h3 class="h4 poster__title card-title">'+ name + '</h3><p class="poster__text m-0">' + vote + '</p></div></div><div class="poster__footer row mt-2 mb-4"><div class="col-3"><a class="btn btn-secondary"><i class="fas fa-ticket-alt"></i></a></div><div class="col-9"><a class="btn btn-primary w-100">Ver Trailer</a></div></div>';

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
	})
}
