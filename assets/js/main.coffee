App =
    init: () ->
        @tmdb =
            api_key: 'be7463424e04e25654a938f9a9951509'
            query_params: 'language=es-US&page=1&region=US&append_to_response=videos'
            base_uri: 'https://api.themoviedb.org/3/'
            images_uri: 'http://image.tmdb.org/t/p'
            timeout: 5000
            image_size: '/w500'
        @set_handlers()
        @load_upcoming()

    set_handlers: () ->
        $('body').on 'click', '.movie-card', (e) =>
            @load_movie_info $(e.currentTarget).attr('data-movie-id')
        # Link Trailer
        $('body').on 'click', '.trailer', (e) =>
            @load_movie_info $(e.currentTarget).attr('href', '#{data.video_link}').attr('data-lity', '')
        # Link Google calenda
        $('body').on 'click', '.trailer', (e) =>
            @load_movie_info $(e.currentTarget).attr('src', '#{data.video_link}')

        $('body').on 'click', '#modal-container', (e) =>
            $(e.currentTarget).addClass('out')
            $('body').removeClass('modal-active')

        $('body').on 'click', '[data-action="nowplaying"]', (e) =>
            @load_nowplaying()

        $('body').on 'click', '[data-action="upcoming"]', (e) =>
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
            @load_movies data.results, false

    load_movies: (movies, show_countdown) ->
        $('#info').empty()
        for movie in movies
            if movie.poster_path?
                poster_url = "#{@tmdb.images_uri}#{@tmdb.image_size}#{movie.poster_path}"
            else
                poster_url = 'http://lorempixel.com/output/animals-q-c-640-480-10.jpg'
            date_reminder = 'http://www.google.com/calendar/event?action=TEMPLATE&dates=#{release_date}%#{release_date}&text=#{title}&location=&details='
            movie_item = $('<div/>').addClass('col-sm-12 col-xs-12 col-md-6 col-xl-3 movie-item')
            movie_item_inner = $('<div/>').addClass('button poster card text-white d-flex movie-card').attr('data-movie-id', movie.id)
            if show_countdown is true then movie_item_inner.append $('<span/>').addClass('w-100 status').append $('<div/>').attr('data-countdown', movie.release_date).addClass('m-2 primary')
            movie_item_inner.append $('<div/>').addClass('poster__grad')
            movie_item_inner.append $('<div/>').addClass('poster__img').attr('style', "filter: grayscale(1);background-image:url(#{poster_url})")
            poster_info =  $('<div/>').addClass('poster__info align-self-end w-100 p-2')
            poster_info.append $('<h3/>').addClass('h4 poster__title card-title').text movie.title
            poster_info.append $('<p/>').addClass('poster__text m-0').text movie.release_date
            movie_item_inner.append poster_info
            poster_footer = $('<div/>').addClass('poster__footer poster__footer row mt-2 mb-4')
            # poster_footer.append $('<div/>').addClass('col-3').append $('<div/>').addClass('button btn btn-secondary').append $('<i/>').addClass('fas fa-calendar-plus')
            poster_footer.append $('<div/>').addClass('col-3').append $('<div/>').addClass('button btn btn-secondary').append $('<i/>').addClass('fas fa-ticket-alt')
            poster_footer.append $('<div/>').addClass('col-9').append $('<a/>').addClass('trailer button btn btn-primary w-100').text 'Trailer'
            movie_item.append movie_item_inner
            movie_item.append poster_footer
            $('#info').append movie_item
            @load_countdown()

    load_movie_info: (movie_id) ->
        $('#display').empty()
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
                poster_url = "#{@tmdb.images_uri}#{@tmdb.image_size}#{data.poster_path}"
                # $('.trailer').addClass('bingo').attr('data-lity','#{video_link}')
            else
                poster_url = 'http://lorempixel.com/output/animals-q-c-640-480-10.jpg'
            image = $('<div/>').append $('<img/>').addClass('mr-3').attr('src', poster_url)
            $('#display').append image.addClass('mr-3')
            info = $('<div/>').addClass('media-body')
            info.append $('<div/>').addClass('actualyoutube').html("<iframe width='560' height='315' src='#{video_link}' frameborder='0' allowfullscreen></iframe>")
            $('.trailer').addClass('bingo').attr('data-lity', '').attr('href', video_link)
            info.append $('<h2/>').addClass('mt-5').text "#{data.title}"
            info.append $('<h4/>').addClass('bingo').text "Release date: #{data.release_date}"
            info.append $('<h5/>').attr('data-countdown', data.release_date)
            info.append $('<p/>').addClass('bingo').text "Description: #{data.overview}"
            # info.append $('<a/>').addClass('btn btn-primary').attr('href', video_link).text "Trailer"
            $('#display').append info
            $('#modal-container').removeAttr('class').addClass('one')
            $('body').addClass('modal-active')

            poster_footer.append $('<a/>').attr('src', video_link)

    load_countdown: () ->
        for element in $('[data-countdown]')
            final_date = $(element).attr('data-countdown')
            $(element).countdown final_date, (event) ->
                $(element).html event.strftime('%D Days %H:%M:%S')

$ ->
  App.init()
