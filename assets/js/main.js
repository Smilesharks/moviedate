(function(){var t;t={init:function(){return this.tmdb={api_key:"be7463424e04e25654a938f9a9951509",query_params:"language=es-US&page=1&region=US&append_to_response=videos",base_uri:"https://api.themoviedb.org/3/",images_uri:"http://image.tmdb.org/t/p",timeout:5e3,image_size:"/w500"},this.set_handlers(),this.load_upcoming()},set_handlers:function(){var e,a,i,s,n;return $("body").on("click",".movie-card",(e=this,function(t){return e.load_movie_info($(t.currentTarget).attr("data-movie-id"))})),$("body").on("click","#modal-container",function(t){return $(t.currentTarget).addClass("out"),$("body").removeClass("modal-active")}),$("body").on("click",'[data-action="nowplaying"]',(a=this,function(t){return a.load_nowplaying()})),$("body").on("click",'[data-action="upcoming"]',(i=this,function(t){return i.load_upcoming()})),$("#search").click((s=this,function(t){return s.search()})),$("#query").keydown((n=this,function(t){if(13===t.keyCode)return n.search()}))},api_call:function(t,e,a,i){var s;return(s={}).api_key=this.tmdb.api_key,s.language="en-US",s.region="US",s.append_to_response="videos",""!==a&&(s.query=a),$.getJSON(""+t+e,s,function(t){return i(t)})},load_upcoming:function(){return this.api_call(this.tmdb.base_uri,"movie/upcoming","",(a=this,function(t){var e;return 0<(null!=(e=t.results)?e.length:void 0)?a.load_movies(t.results,!0):alert("No results")}));var a},load_nowplaying:function(){return this.api_call(this.tmdb.base_uri,"movie/now_playing","",(a=this,function(t){var e;return 0<(null!=(e=t.results)?e.length:void 0)?a.load_movies(t.results,!1):alert("No results")}));var a},search:function(){return this.api_call(this.tmdb.base_uri,"search/movie",$("#query").val(),(e=this,function(t){return e.load_movies(t.results,!1)}));var e},load_movies:function(t,r){var e,a,i,l,s;for($("#info").empty(),s=[],a=0,i=t.length;a<i;a++)l=t[a],(e={}).api_key=this.tmdb.api_key,e.language="es-US",e.region="US",e.append_to_response="videos",s.push(this.api_call(this.tmdb.base_uri,"movie/"+l.id,e,function(o){return function(t){var e,a,i,s,n,d;return d=0<t.videos.results.length&&"YouTube"===t.videos.results[0].site?"https://www.youtube.com/embed/"+t.videos.results[0].key:"",n=null!=l.poster_path?""+o.tmdb.images_uri+o.tmdb.image_size+t.poster_path:"http://lorempixel.com/output/animals-q-c-640-480-10.jpg",e=$("<div/>").addClass("col-sm-12 col-xs-12 col-md-6 col-xl-3 movie-item"),a=$("<div/>").addClass("button poster card text-white d-flex movie-card").attr("data-movie-id",t.id),!0===r&&a.append($("<span/>").addClass("w-100 status").append($("<div/>").attr("data-countdown",t.release_date).addClass("m-2 primary"))),a.append($("<div/>").addClass("poster__grad")),a.append($("<div/>").addClass("poster__img").attr("style","filter: grayscale(1);background-image:url("+n+")")),(s=$("<div/>").addClass("poster__info align-self-end w-100 p-2")).append($("<h3/>").addClass("h4 poster__title card-title").text(t.title)),s.append($("<p/>").addClass("poster__text m-0").text(t.release_date)),a.append(s),(i=$("<div/>").addClass("poster__footer poster__footer row mt-2 mb-4")).append($("<div/>").addClass("col-3").append($("<div/>").addClass("button btn btn-secondary").append($("<i/>").addClass("fas fa-ticket-alt")))),i.append($("<div/>").addClass("col-9").append($("<a/>").addClass("trailer button btn btn-primary w-100").attr("data-lity","").attr("href",d).text("Trailer"))),e.append(a),e.append(i),$("#info").append(e),o.load_countdown()}}(this)));return s},load_movie_info:function(t){var e,n;return $("#display").empty(),(e={}).api_key=this.tmdb.api_key,e.language="es-US",e.region="US",e.append_to_response="videos",this.api_call(this.tmdb.base_uri,"movie/"+t,e,(n=this,function(t){var e,a,i,s;return s=0<t.videos.results.length&&"YouTube"===t.videos.results[0].site?"https://www.youtube.com/embed/"+t.videos.results[0].key:"",i=null!=t.poster_path?""+n.tmdb.images_uri+n.tmdb.image_size+t.poster_path:"http://lorempixel.com/output/animals-q-c-640-480-10.jpg",e=$("<div/>").append($("<img/>").addClass("mr-3").attr("src",i)),$("#display").append(e.addClass("mr-3")),(a=$("<div/>").addClass("media-body")).append($("<div/>").addClass("actualyoutube").html("<iframe width='560' height='315' src='"+s+"' frameborder='0' allowfullscreen></iframe>")),$(".trailer").addClass("bingo").attr("data-lity","").attr("href",s),a.append($("<h2/>").addClass("mt-5").text(""+t.title)),a.append($("<h4/>").addClass("bingo").text("Release date: "+t.release_date)),a.append($("<h5/>").attr("data-countdown",t.release_date)),a.append($("<p/>").addClass("bingo").text("Description: "+t.overview)),$("#display").append(a),$("#modal-container").removeAttr("class").addClass("one"),$("body").addClass("modal-active")}))},load_countdown:function(){var e,t,a,i,s,n;for(n=[],a=0,i=(s=$("[data-countdown]")).length;a<i;a++)e=s[a],t=$(e).attr("data-countdown"),n.push($(e).countdown(t,function(t){return $(e).html(t.strftime("%D Days %H:%M:%S"))}));return n}},$(function(){return t.init()})}).call(this);