var ratedHTML = "";
var extraHTML = "";
var session = "";

$(document).ready(function () {

    const urlParams = new URLSearchParams(window.location.search);
    var dataOf = urlParams.get('dataOf');

    session = localStorage.getItem("sessionId");
    console.log(session)

    if ((!dataOf) ||
        ((dataOf) &&
            (dataOf != 'now_playing' && dataOf != 'top_rated' && dataOf != 'popular' && dataOf != 'upcoming' && dataOf != 'watch_list' && dataOf != 'favorite' && dataOf != 'rated'))) {
        $('#content').append('<h1>404 Data Not Found</h1>');
    }

    $(document).on('click', '#watch_list', function(event) {
        event.preventDefault();

        const dataOf = $(this).attr('data-dataof');;
        console.log(dataOf);

        window.location.href = `listMovies.html?dataOf=${encodeURIComponent(dataOf)}`;
    });

    $(document).on('click', '#favorite', function(event) {
        event.preventDefault();

        const dataOf = $(this).attr('data-dataof');;
        console.log(dataOf);

        window.location.href = `listMovies.html?dataOf=${encodeURIComponent(dataOf)}`;
    });

    $(document).on('click', '#rated', function(event) {
        event.preventDefault();

        const dataOf = $(this).attr('data-dataof');;
        console.log(dataOf);

        window.location.href = `listMovies.html?dataOf=${encodeURIComponent(dataOf)}`;
    });

    $(document).on('click', '.movie_info', function(event) {
        event.preventDefault();

        const movieId = $(this).attr('data-movieId');;
        console.log(movieId);

        window.location.href = `movieDetail.html?movieId=${encodeURIComponent(movieId)}`;
    });

    fatchData(dataOf);
});


async function fatchData(dataOf) {
    try {

        var link = "";
        var mainTitle = "";
        if (dataOf == "now_playing") {
            link = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1";
            mainTitle = "🎬 Now Playing 🍿";
        }
        else if (dataOf == "top_rated") {
            link = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
            mainTitle = "🌟 Top Rated 🎥";
        }
        else if (dataOf == "popular") {
            link = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
            mainTitle = "🔥 Popular 🎥"
        }
        else if (dataOf == "upcoming") {
            link = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";
            mainTitle = "📅 Upcoming 🎬"
        }
        else if (dataOf == "watch_list") {
            link = "https://api.themoviedb.org/3/account/21427287/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc&session_id="+session;
            mainTitle = "📋 Watch List 🎬"
        }
        else if (dataOf == "favorite") {
            link = "https://api.themoviedb.org/3/account/21427287/favorite/movies?language=en-US&page=1&sort_by=created_at.asc&session_id="+session;
            mainTitle = "💖 Favorite 🎬"
        }
        else if (dataOf == "rated") {
            link = "https://api.themoviedb.org/3/account/21427287/rated/movies?language=en-US&page=1&sort_by=created_at.asc&session_id="+session;
            mainTitle = "⭐ Rated 🎬"
        }

        const [data] = await Promise.all([
            fetch(link, {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMzUxMTM5Ni45MjMwNDQsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaAYgVhxyHOSwIdztl6s40ZMogAcjqKCleA0VYnyW_w'
                }
            }).then(response => response.json()),
        ]);

        setDataInPage(data, mainTitle, dataOf);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


function setDataInPage(apiData, dataOf, dataId) {

    //console.log(apiData);

    let mainFrameHTML = `
        <h1 class="title">${dataOf}</h1>`;
    if(dataId == "now_playing" || dataId == "upcoming"){
        maxDate = apiData.dates.maximum;
        minDate = apiData.dates.minimum;

        mainFrameHTML += `
        <h2 class="dates">(${minDate} - ${maxDate})</h2>`;

    }

    mainFrameHTML += `
        <div id="movie_name_search_container"><input type="text" id="movie_name_search" placeholder="Search" maxlength="25"></div>
        <div id="movie-list-block">`;

    const result = apiData.results;
    console.log(apiData)
    for (let i = 0; i < result.length; i++) {
        ratedHTML = "";
        extraHTML = "";
        var imageUrl = result[i].poster_path ? `https://image.tmdb.org/t/p/w500${result[i].poster_path}` : 'https://via.placeholder.com/100';
        var title = result[i].title;
        var voteAverage = result[i].vote_average;
        voteAverage = parseFloat(voteAverage).toFixed(1);
        var overview = result[i].overview;

        if(dataId == "rated"){
            var voteRated = result[i].rating;
            voteRated = parseFloat(voteRated).toFixed(1);
            ratedHTML += `
                    <br>
                    <span class="sub-title-small">Your Rating: </span>
                    <br>
                    <meter class="vote_avg" value="${voteRated}" min="0" max="10"></meter>
                    <br>
                    <span class="sub-title-small">${voteRated} out of 10</span>
            `;

            extraHTML += `
                    <br>
                    <span class="sub-title-small">Over All Rating: </span>
                    <br>
            `;
        }

        mainFrameHTML += `
            <div class="movie-list-detail">
                    <div class="movie">
                        <a class="movie_info" data-movieId="${result[i].id}" href="#">
                            <img src="${imageUrl}" class="movieimg" alt="${title}"
                            height="150px" width="100px">
                        </a>
                        <h2 class="sub-title-movie-list">${title}</h2>
                    </div>
                    <div class="review">
                        ${extraHTML}
                        <meter class="vote_avg" value="${voteAverage}" min="0" max="10"></meter>
                        <br>
                        <span class="sub-title-small">${voteAverage} out of 10</span>
                        <br>
                        ${ratedHTML}
                        <p>${overview}</p>
                    </div>
                </div>
                <hr>`;
    }

    mainFrameHTML += `</div>`;

    $("#movielist-main").append(mainFrameHTML);

    $('#movie_name_search').on('input', function () {
        const query = $(this).val().toLowerCase();
        filterMovies(query);
    });
}


function filterMovies(query) {
    $('#movie-list-block .movie-list-detail').each(function () {
        const title = $(this).find('.sub-title-movie-list').text().toLowerCase();
        if (title.includes(query)) {
            $(this).show();
            $(this).next('hr').show();
        } else {
            $(this).hide();
            $(this).next('hr').hide();
        }
    });
}