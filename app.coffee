"use strict"

$ ->

  $("input").focus()

  $("form").on "submit", (event) ->
    event.preventDefault()
    searchTerm = $("input").val()

    movieData = $.ajax
      url: "http://www.omdbapi.com"
      method: "get"
      data: {s: searchTerm}
      dataType: "json"

    movieData.done (data) ->
      $("input").val("")
      $(".result").html("")

      for movie in data["Search"]
        id = movie.imdbID
        li = $ "<li data-imdb=" + id + ">" + movie.Title + "</li>"
        $(".result").append(li)

    $(".result").delegate "li", "click", (event) ->
      event.preventDefault()
      movieID = @.dataset.imdb

      chosenMovieData = $.ajax
        url: "http://www.omdbapi.com/"
        method: "get"
        data: {i: movieID}
        dataType: "json"

      chosenMovieData.done (data) ->
        console.log data.Poster

        $('body').css('background-image', 'url(' + data.Poster + ')')
