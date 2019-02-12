(function() {
  function createNode(element) {
    return document.createElement(element);
  }
  function append(parent, el) {
    return parent.appendChild(el);
  }

  const ul = document.getElementById("favMovies");

  var autorizationbear =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYmYiOjE1MTYyMzE5NDcsInN1YiI6IjU4NzQyZTgzYzNhMzY4MTc0YzAxNWVkYyIsImp0aSI6IjY0MTA4NCIsImF1ZCI6IjUxNmFkZjFlMTU2NzA1OGY4ZWNiZjMwYmYyZWI5Mzc4Iiwic2NvcGVzIjpbImFwaV9yZWFkIiwiYXBpX3dyaXRlIl0sInZlcnNpb24iOjF9.LJ1zRyHicf-7xQhZVGRbYmCSA26Rdt7Vvk6jsEB9rmA";
  //var apikey =
  $.ajax({
    url:
      "https://api.themoviedb.org/4/account/58742e83c3a368174c015edc/movie/favorites?&page=1&language=en-US&sort_by=release_date.asc",
    type: "GET",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    beforeSend: function(request) {
      request.setRequestHeader("Authorization", autorizationbear);
    },
    
    success: function(data) {
      let movies = data.results;

      let total_pages = data.total_pages;
      console.log(total_pages);
      let j = 1;
      for (let i = 0; i <= total_pages; i++) {
        $.ajax({
          url:
            "https://api.themoviedb.org/4/account/58742e83c3a368174c015edc/movie/favorites?&page=" +
            i +
            "&language=en-US&sort_by=release_date.asc",
          type: "GET",
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          beforeSend: function(request) {
            request.setRequestHeader("Authorization", autorizationbear);
          },

          success: function(data) {
            let favMovies = data.results;
            //favMovies= favMovies.sort();
            favMovies = favMovies.sort(function(a, b) {
              var dateA = new Date(a.release_date),
                dateB = new Date(b.release_date);
              return dateA - dateB;
            });

            return favMovies.map(function(favMovies) {
              let li = createNode("li"),
                img = createNode("img"),
                gene = createNode("div"),
                tagline = createNode("div"),
                span = createNode("span");
              date = createNode("span");
              img.src =
                "https://image.tmdb.org/t/p/original" + favMovies.poster_path;
              //img.title = favMovies.overview;
              let urlv3MovieDetails =
                "https://api.themoviedb.org/3/movie/" +
                favMovies.id +
                "?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=en-US";
              $.ajax({
                url: urlv3MovieDetails,
                type: "GET",
                dataType: "jsonp",
                contentType: "application/json; charset=utf-8",

                success: function(data) {
                  for (var gen of data.genres) {
                    gene.innerHTML += gen.name + ", ";
                  }
                  gene.innerHTML = gene.innerHTML.slice(0, -2);

                  tagline.innerHTML = data.tagline;
                }
              });

              gene.id = "genere";
              //div.innerHTML=favMovies.overview;
              //div.style.display='none';
              span.innerHTML = `[${j}] ${favMovies.title}`;
              date.innerHTML = `${favMovies.release_date}`;
              date.id = "dater";
              append(li, img);
              //append(li, gene);
              //append(li, tagline);
              append(li, span);

              append(li, date);
              append(ul, li);
              j++;
            });
          }
        });
      }
    }
  });
})();
