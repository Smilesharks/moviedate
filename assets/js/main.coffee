App =
    init: () ->
        @tmdb =
            api_key: 'be7463424e04e25654a938f9a9951509'
            query_params: 'language=es-US&page=1&region=US&append_to_response=videos'
            base_uri: 'https://api.themoviedb.org/3/'
            images_uri: 'http://image.tmdb.org/t/p'
            timeout: 5000
            image_size: '/w342'
            backdrop_size: '/w780'
            no_api: 'http://lorempixel.com/output/animals-q-c-640-480-10.jpg'
        @set_handlers()
        @load_upcoming()

    set_handlers: () ->
        $('body').on 'touch click', '.movie-card', (e) =>
            @load_movie_info $(e.currentTarget).attr('data-movie-id')
        $('body').on 'touch click', '#modal-container', (e) =>
            $(e.currentTarget).addClass('out')
            $('body').removeClass('modal-active')

        $('body').on 'touch click', '[data-action="nowplaying"]', (e) =>
            @load_nowplaying()

        $('body').on 'touch click', '[data-action="upcoming"]', (e) =>
            @load_upcoming()

        $('#search').click (e) => @search()

        $('#query').keydown (e) => @search() if e.keyCode is 13

    api_call: (url, method, query, cb) ->
        api_call_params = {}
        api_call_params.api_key = @tmdb.api_key
        api_call_params.language = 'en-US'
        api_call_params.region = 'US'
        api_call_params.append_to_response = 'videos'
        if query isnt '' then api_call_params.query = query
        $.getJSON "#{url}#{method}", api_call_params, (data) -> cb data

    load_upcoming: () ->
        @api_call @tmdb.base_uri, 'movie/upcoming', '', (data) =>
            if data.results?.length > 0
                @load_movies data.results, true
            else
                alert 'No results'

    load_nowplaying: () ->
        @api_call @tmdb.base_uri, 'movie/now_playing', '', (data) =>
            if data.results?.length > 0
                @load_movies data.results, false
            else
                alert 'No results'

    search: () ->
        @api_call @tmdb.base_uri, 'search/movie', $('#query').val(), (data) =>
            @load_movies_search data.results, false

    load_movies: (movies, show_countdown) ->
        $('#info').empty()
        for movie in movies
            api_call_params = {}
            api_call_params.api_key = @tmdb.api_key
            api_call_params.language = 'es-US'
            api_call_params.region = 'US'
            api_call_params.append_to_response = 'videos'
            @api_call @tmdb.base_uri , "movie/#{movie.id}", api_call_params, (data) =>
                if data.videos.results.length > 0 and data.videos.results[0].site is 'YouTube'
                    video_link = "https://www.youtube.com/embed/#{data.videos.results[0].key}"
                else
                    video_link = ''
                if movie.poster_path?
                    poster_url = "#{@tmdb.images_uri}#{@tmdb.image_size}#{data.poster_path}"
                    # poster_url = "http://lorempixel.com/output/animals-q-c-640-480-10.jpg"
                else
                    poster_url = 'http://lorempixel.com/output/animals-q-c-640-480-10.jpg'
                movie_item = $('<div/>').addClass('col-sm-12 col-xs-12 col-md-6 col-xl-3 movie-item')
                movie_item_inner = $('<div/>').addClass('button poster card text-white d-flex movie-card').attr('data-movie-id', data.id)
                if show_countdown is true then movie_item_inner.append $('<span/>').addClass('w-100 status').append $('<div/>').attr('data-countdown', data.release_date).addClass('m-2 primary')
                movie_item_inner.append $('<div/>').addClass('poster__grad')
                movie_item_inner.append $('<div/>').addClass('poster__img').attr('style', "filter: grayscale(1);background-image:url(#{poster_url})")
                poster_info =  $('<div/>').addClass('poster__info align-self-end w-100 p-2')
                poster_info.append $('<h3/>').addClass('h4 poster__title card-title').text data.title
                poster_info.append $('<p/>').addClass('poster__text m-0').text data.release_date
                movie_item_inner.append poster_info
                poster_footer = $('<div/>').addClass('poster__footer poster__footer row mt-2 mb-4')
                fecha_release = data.release_date.replace /\-/g, ""
                reminder = "http://www.google.com/calendar/event?action=TEMPLATE&dates=#{fecha_release}T010000Z%2F#{fecha_release}T010000Z&text=#{data.title}%20%2D%20Movie%20Premiere&location=http%3A%2F%2Fmoviedates.info&details=This%20reminder%20was%20created%20through%20http%3A%2F%2Fmoviedates.info"
                poster_footer.append $('<div/>').addClass('col-3').append $('<a/>').addClass('button btn btn-secondary').attr('href', reminder).attr('target', '_blank').append $('<i/>').addClass('far fa-calendar-plus')
                poster_footer.append $('<div/>').addClass('col-9').append $('<a/>').addClass('trailer button btn btn-primary w-100').attr('data-lity', '').attr('href', video_link).text 'Trailer'
                movie_item.append movie_item_inner
                movie_item.append poster_footer
                $('#info').append movie_item
                @load_countdown()

    load_movies_search: (movies, show_countdown) ->
        $('#info').empty()
        for movie in movies
            api_call_params = {}
            api_call_params.api_key = @tmdb.api_key
            api_call_params.language = 'es-US'
            api_call_params.region = 'US'
            api_call_params.append_to_response = 'videos'
            @api_call @tmdb.base_uri , "movie/#{movie.id}", api_call_params, (data) =>
                if data.videos.results.length > 0 and data.videos.results[0].site is 'YouTube'
                    video_link = "https://www.youtube.com/embed/#{data.videos.results[0].key}"
                else
                    video_link = ''
                if movie.poster_path?
                    poster_url = "#{@tmdb.images_uri}#{@tmdb.image_size}#{data.poster_path}"
                    # poster_url = "http://lorempixel.com/output/animals-q-c-640-480-10.jpg"
                else
                    poster_url = 'http://lorempixel.com/output/animals-q-c-640-480-10.jpg'
                movie_item = $('<div/>').addClass('col-sm-12 col-xs-12 col-md-6 col-xl-3 movie-item')
                movie_item_inner = $('<div/>').addClass('button poster card text-white d-flex movie-card').attr('data-movie-id', data.id)
                if show_countdown is true then movie_item_inner.append $('<span/>').addClass('w-100 status').append $('<div/>').attr('data-countdown', data.release_date).addClass('m-2 primary')
                movie_item_inner.append $('<div/>').addClass('poster__grad')
                movie_item_inner.append $('<div/>').addClass('poster__img').attr('style', "filter: grayscale(1);background-image:url(#{poster_url})")
                poster_info =  $('<div/>').addClass('poster__info align-self-end w-100 p-2')
                poster_info.append $('<h3/>').addClass('h4 poster__title card-title').text data.title
                poster_info.append $('<p/>').addClass('poster__text m-0').text "User Score: #{data.vote_average}"
                movie_item_inner.append poster_info
                poster_footer = $('<div/>').addClass('poster__footer poster__footer row mt-2 mb-4')
                fecha_release = data.release_date.replace /\-/g, ""
                # fecha_release.replace /\-/g, ""
                reminder = "http://www.google.com/calendar/event?action=TEMPLATE&dates=#{fecha_release}T010000Z%2F#{fecha_release}T010000Z&text=#{data.title}%20%2D%20Movie%20Premiere&location=http%3A%2F%2Fmoviedates.info&details=This%20reminder%20was%20created%20through%20http%3A%2F%2Fmoviedates.info"
                # poster_footer.append $('<div/>').addClass('col-3').append $('<a/>').addClass('button btn btn-secondary').attr('href', reminder).attr('target', '_blank').append $('<i/>').addClass('far fa-calendar-plus')
                poster_footer.append $('<div/>').addClass('col-12').append $('<a/>').addClass('trailer button btn btn-primary w-100').attr('data-lity', '').attr('href', video_link).text 'Trailer'
                movie_item.append movie_item_inner
                movie_item.append poster_footer
                $('#info').append movie_item
                @load_countdown()

    load_movie_info: (movie_id) ->
        $('#display').empty()
        $('#cover').empty()
        api_call_params = {}
        api_call_params.api_key = @tmdb.api_key
        api_call_params.language = 'es-US'
        api_call_params.region = 'US'
        api_call_params.append_to_response = 'videos'
        @api_call @tmdb.base_uri , "movie/#{movie_id}", api_call_params, (data) =>
            if data.videos.results.length > 0 and data.videos.results[0].site is 'YouTube'
                video_link = "https://www.youtube.com/embed/#{data.videos.results[0].key}"
            else
                video_link = ''
            if data.poster_path?
                backdrop_path = "#{@tmdb.images_uri}#{@tmdb.backdrop_size}#{data.backdrop_path}"
            else
                poster_url = 'http://lorempixel.com/output/animals-q-c-640-480-10.jpg'
            image = $('<div/>').append $('<img/>').addClass('image').attr('src', backdrop_path)
            info = $('<div/>').addClass('media-body')
            info.append $('<h2/>').addClass('title pt-3').text "#{data.title}"
            info.append $('<div/>').addClass('tagline').text "#{data.tagline}"
            info.append $('<div/>').addClass('info').text "Popularity:"
            info.append $('<div/>').addClass('popularity').text "#{data.popularity}"
            info.append $('<div/>').addClass('info').text "Release date:"
            info.append $('<div/>').addClass('release').text "#{data.release_date}"
            info.append $('<div/>').addClass('info').text "Runtime:"
            info.append $('<div/>').addClass('runtime').text "#{data.runtime} min"
            info.append $('<p/>').addClass('overview').text "Overview: #{data.overview}"
            # $('#cover').append $('<button/>').addClass('close mr-2 mt-2').attr('data-dismiss', 'modal').attr('aria-label', 'Close')
            # $('.close').append $('<i/>').addClass('fas fa-times-circle')
            $('#cover').attr('style', "background-image:url(#{backdrop_path})")
            $('#display').append info
            $('#modal-container').removeAttr('class').addClass('two')
            $('body').addClass('modal-active')


    load_countdown: () ->
        for element in $('[data-countdown]')
            final_date = $(element).attr('data-countdown')
            $(element).countdown final_date, (event) ->
                $(element).html event.strftime('%D Days %H:%M:%S')

$ ->
  App.init()
