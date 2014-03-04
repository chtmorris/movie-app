// Generated by CoffeeScript 1.7.1
(function() {
  "use strict";
  $(function() {
    $("input").focus();
    return $("form").on("submit", function(event) {
      var movieData, searchTerm;
      event.preventDefault();
      searchTerm = $("input").val();
      movieData = $.ajax({
        url: "http://www.omdbapi.com",
        method: "get",
        data: {
          s: searchTerm
        },
        dataType: "json"
      });
      movieData.done(function(data) {
        var id, li, movie, _i, _len, _ref, _results;
        $("input").val("");
        $(".result").html("");
        _ref = data["Search"];
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          movie = _ref[_i];
          id = movie.imdbID;
          li = $("<li data-imdb=" + id + ">" + movie.Title + "</li>");
          _results.push($(".result").append(li));
        }
        return _results;
      });
      return $(".result").delegate("li", "click", function(event) {
        var chosenMovieData, movieID;
        event.preventDefault();
        movieID = this.dataset.imdb;
        chosenMovieData = $.ajax({
          url: "http://www.omdbapi.com/",
          method: "get",
          data: {
            i: movieID
          },
          dataType: "json"
        });
        return chosenMovieData.done(function(data) {
          console.log(data.Poster);
          return $('body').css('background-image', 'url(' + data.Poster + ')');
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=app.map