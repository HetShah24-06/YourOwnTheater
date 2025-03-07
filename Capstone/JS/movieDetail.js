var movieId;
var session = "";

$(document).ready(function () {

  const urlParams = new URLSearchParams(window.location.search);
  movieId = urlParams.get('movieId');
  session = localStorage.getItem("sessionId");
  console.log(session)

  if ((!movieId)) {
    $('#content').append('<h1>404 Data Not Found</h1>');
  }

  $(document).on('click', '.movie_info', function (event) {
    event.preventDefault();

    const movieId = $(this).attr('data-movieId');;
    console.log(movieId);

    window.location.href = `movieDetail.html?movieId=${encodeURIComponent(movieId)}`;
  });

  $(document).on('click', '#watch_list', function (event) {
    event.preventDefault();

    const dataOf = $(this).attr('data-dataof');;
    console.log(dataOf);

    window.location.href = `listMovies.html?dataOf=${encodeURIComponent(dataOf)}`;
  });

  $(document).on('click', '#favorite', function (event) {
    event.preventDefault();

    const dataOf = $(this).attr('data-dataof');;
    console.log(dataOf);

    window.location.href = `listMovies.html?dataOf=${encodeURIComponent(dataOf)}`;
  });

  $(document).on('click', '#rated', function (event) {
    event.preventDefault();

    const dataOf = $(this).attr('data-dataof');;
    console.log(dataOf);

    window.location.href = `listMovies.html?dataOf=${encodeURIComponent(dataOf)}`;
  });

  $(document).on('click', '.rate-movie', function (event) {
    var movieRate = $("#movie_rate_input").val();
    if (movieRate == '') {
      alert("Enter Value Between 0 to 10");
      $("#movie_rate_input").val('');
      return;
    }
    else if (isNaN(movieRate)) {
      alert("Rating Must Be Between 0 to 10");
      $("#movie_rate_input").val('');
      return;
    }
    else if (parseFloat(movieRate) < 0 || parseFloat(movieRate) > 10) {
      alert("Rating Must Be Between 0 to 10");
      $("#movie_rate_input").val('');
      return;
    }
    else if (parseFloat(movieRate) % 0.50 !== 0) {
        alert("Value Invalid: Value must be a multiple of 0.50");
        $("#movie_rate_input").val('');
        return;
    }
    else {
      movieRate = parseFloat(movieRate).toFixed(2);
      addRating(movieId, movieRate);
      $("#movie_rate_input").val('');
      return;
    }
  });


  $(document).on('click', '#add_watchlist', function (event) {
    addToWatchList(movieId);
  });

  $(document).on('click', '#add_favourite', function (event) {
    addToFavourite(movieId);
  });

  $(document).on('click', '#remove_watchlist', function (event) {
    removeWatchList(movieId);
  });

  $(document).on('click', '#remove_favourite', function (event) {
    removeFavourite(movieId);
  });

  fatchData(movieId);
});

function removeWatchList(movieId) {

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMzUxMTM5Ni45MjMwNDQsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaAYgVhxyHOSwIdztl6s40ZMogAcjqKCleA0VYnyW_w'
    },
    body: JSON.stringify({ media_type: 'movie', media_id: movieId, watchlist: false })
  };

  fetch('https://api.themoviedb.org/3/account/21427287/watchlist?session_id='+session, options)
    .then(response => response.json())
    .then(response => { console.log(response); alert('Movie Remove From WatchList Successfully'); })
    .catch(err => console.error(err));

}


function removeFavourite(movieId) {

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMzUxMTM5Ni45MjMwNDQsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaAYgVhxyHOSwIdztl6s40ZMogAcjqKCleA0VYnyW_w'
    },
    body: JSON.stringify({ media_type: 'movie', media_id: movieId, favorite: false })
  };

  fetch('https://api.themoviedb.org/3/account/21427287/favorite?session_id='+session, options)
    .then(response => response.json())
    .then(response => { console.log(response); alert('Movie Remove From Favourite List Successfully'); })
    .catch(err => console.error(err));

}

function addToWatchList(movieId) {

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMzUxMTM5Ni45MjMwNDQsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaAYgVhxyHOSwIdztl6s40ZMogAcjqKCleA0VYnyW_w'
    },
    body: JSON.stringify({ media_type: 'movie', media_id: movieId, watchlist: true })
  };

  fetch('https://api.themoviedb.org/3/account/21427287/watchlist?session_id='+session, options)
    .then(response => response.json())
    .then(response => { console.log(response); alert('Movie Add To WatchList Successfully'); })
    .catch(err => console.error(err));

}

function addToFavourite(movieId) {

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMzUxMTM5Ni45MjMwNDQsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaAYgVhxyHOSwIdztl6s40ZMogAcjqKCleA0VYnyW_w'
    },
    body: JSON.stringify({ media_type: 'movie', media_id: movieId, favorite: true })
  };

  fetch('https://api.themoviedb.org/3/account/21427287/favorite?session_id='+session, options)
    .then(response => response.json())
    .then(response => { console.log(response); alert('Movie Add To Favourite List Successfully'); })
    .catch(err => console.error(err));

}


function addRating(movieId, movieRate) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMzUxMTM5Ni45MjMwNDQsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaAYgVhxyHOSwIdztl6s40ZMogAcjqKCleA0VYnyW_w'
    },
    body: '{"value":' + movieRate + '}'
  };

  fetch('https://api.themoviedb.org/3/movie/' + movieId + '/rating?session_id='+session, options)
    .then(response => response.json())
    .then(response => { console.log(response); alert('Movie Rated Successfully'); })
    .catch(err => console.error(err));
}

async function fatchData(movieId) {
  try {

    const [data1, data2] = await Promise.all([
      fetch('https://api.themoviedb.org/3/movie/' + movieId + '?language=en-US&append_to_response=videos', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMzUxMTM5Ni45MjMwNDQsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaAYgVhxyHOSwIdztl6s40ZMogAcjqKCleA0VYnyW_w'
        }
      }).then(response => response.json()),

      fetch('https://api.themoviedb.org/3/movie/' + movieId + '/recommendations?language=en-US&page=1', {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMzUxMTM5Ni45MjMwNDQsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaAYgVhxyHOSwIdztl6s40ZMogAcjqKCleA0VYnyW_w'
        }
      }).then(response => response.json())
    ]);

    setDataInPage(data1, data2);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}


function setDataInPage(movieDetailData, recommandData) {

  //console.log(movieDetailData);
  // console.log(recommandData);

  recommandFrameHTML = `<div id="recommand-block">`;

  var recommandResult = recommandData.results;
  for (i = 0; i < recommandResult.length; i++) {
    //console.log(recommandResult[i]);

    var recommandVoteAverage = recommandResult[i].vote_average;
    recommandVoteAverage = parseFloat(recommandVoteAverage).toFixed(1);

    var imageRecommandUrl = recommandResult[i].poster_path ? `https://image.tmdb.org/t/p/w500${recommandResult[i].poster_path}` : 'https://via.placeholder.com/100';

    recommandFrameHTML += `
              <div class="recommand-related-detail">
                  <div class="related">
                      <a class="movie_info" data-movieId="${recommandResult[i].id}" href="#">
                        <img src="${imageRecommandUrl}" alt="${recommandResult[i].title}" class="movieimg" height="225px" width="150px">
                      </a>
                      <p>${recommandResult[i].title}</p>
                  </div>
                  <div class="recommand">
                      <div class="vote_avg_container">
                        <span class="sub-title">${recommandVoteAverage} out of 10</span>
                        <br>
                        <meter class="vote_avg" value="${recommandVoteAverage}" min="0" max="10"></meter>
                      </div>
                      <p>${recommandResult[i].overview}</p>
                      
                  </div>
              </div>
              <hr>
    `;
  }

  recommandFrameHTML += `</div>`;

  var imageUrl = movieDetailData.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetailData.poster_path}` : 'https://via.placeholder.com/100';
  var voteAverage = movieDetailData.vote_average;
  voteAverage = parseFloat(voteAverage).toFixed(1);

  var genres = movieDetailData.genres;
  var genreHTML = '';
  $(genres).each(function (index, value) {
    genreHTML += `<span class="miscellaneous-list">&nbsp;${value.name}&nbsp;|</span>`;
  });


  var companies = movieDetailData.production_companies;
  var companiesHTML = '';
  $(companies).each(function (index, value) {
    companiesHTML += `<span class="miscellaneous-list">&nbsp;${value.name}&nbsp;|</span>`;
  });

  var languages = movieDetailData.spoken_languages;
  var languagesHTML = '';
  $(languages).each(function (index, value) {
    languagesHTML += `<span class="miscellaneous-list">&nbsp;${value.english_name}&nbsp;|</span>`;
  });

  var countries = movieDetailData.production_countries;
  var countriesHTML = '';
  $(countries).each(function (index, value) {
    countriesHTML += `<span class="miscellaneous-list">&nbsp;${value.name}&nbsp;|</span>`;
  });

  var videoHTML = '';
  var video = movieDetailData.videos;
  if(video != null && video.results != null && video.results.length > 0){
    video = video.results;
    
    for (let i = 0; i < video.length; i++) {
      if(video[i].official == true && video[i].site == "YouTube"){
        videoHTML += `<div class=center-video><iframe class=video-box src="https://www.youtube.com/embed/${video[i].key}"></iframe></div>`;
        break;
      }
    }

  }

  mainFrameHTML = `
    <div id="movie-detail-main-left">
        <img src="${imageUrl}" class="movieimg" alt="${movieDetailData.title}" height="275px" width="175px">
        
        <div id="movie_rate_container">  
          <input type="text" id="movie_rate_input" placeholder="Rate" maxlength="5">
        </div>  
        
        <a href="#" class="rate-movie">
            Add Rating
        </a>
    </div>
    <div id="movie-detail-main-right">
        <h1 id="movie-detail-title" class="title">
            ${movieDetailData.title}
        </h1>
        <div id="add_button_container">
          <button id="add_watchlist">Add To WatchList</button>
          <button id="add_favourite">Add To Favourite</button>
        </div>
        <br>
        <div id="add_button_container">
          <button id="remove_watchlist">Remove WatchList</button>
          <button id="remove_favourite">Remove Favourite</button>
        </div>
        <h2 class="sub-title-tag-line">
            "${movieDetailData.tagline}"
        </h2>
        <div class="vote_avg_container">
          <span class="sub-title">${voteAverage} out of 10</span>
          <br>
          <meter class="vote_avg" value="${voteAverage}" min="0" max="10"></meter>
        </div>
        <p>
          ${movieDetailData.overview}
        </p>
        <p>
            <span class="miscellaneous">Genre :</span>
            ${genreHTML}
        </p>
        <p>
            <span class="miscellaneous">Production Companies :</span>
            ${companiesHTML}
        </p>
        <p>
            <span class="miscellaneous">Countries :</span>
            ${countriesHTML}
        </p>
        <p>
            <span class="miscellaneous">Languages :</span>
            ${languagesHTML}
        </p>
        <p>
            <span class="subdetail">Home Page : </span>
            <a class="subdetail_link" target="_blank" href='${movieDetailData.homepage}'>${movieDetailData.homepage}</a>
        </p>
        <p>
            <span class="subdetail">IMDB : </span>
            <a class="subdetail_link" target="_blank" href='https://www.imdb.com/title/${movieDetailData.imdb_id}'>https://www.imdb.com/title/${movieDetailData.imdb_id}</a>
        </p>
        <p>
            ${videoHTML}
        </p>
        <hr>

        <h1 id="movie-detail-recommand" class="title">
          Recommandation
        </h1>

        ${recommandFrameHTML}

    </div>
  `;

  $("#movie-detail-main").append(mainFrameHTML);
}