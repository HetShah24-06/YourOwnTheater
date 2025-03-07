$(document).ready(function () {

    let session = localStorage.getItem("sessionId");
    console.log(session)

    fatchData();

    $(document).on('click', '.more', function(event) {
        event.preventDefault();

        const dataOf = $(this).attr('data-dataof');;
        console.log(dataOf);

        window.location.href = `WebPages/listMovies.html?dataOf=${encodeURIComponent(dataOf)}`;
    });

    $(document).on('click', '#watch_list', function(event) {
        event.preventDefault();

        const dataOf = $(this).attr('data-dataof');;
        console.log(dataOf);

        window.location.href = `WebPages/listMovies.html?dataOf=${encodeURIComponent(dataOf)}`;
    });

    $(document).on('click', '#favorite', function(event) {
        event.preventDefault();

        const dataOf = $(this).attr('data-dataof');;
        console.log(dataOf);

        window.location.href = `WebPages/listMovies.html?dataOf=${encodeURIComponent(dataOf)}`;
    });

    $(document).on('click', '#rated', function(event) {
        event.preventDefault();

        const dataOf = $(this).attr('data-dataof');;
        console.log(dataOf);

        window.location.href = `WebPages/listMovies.html?dataOf=${encodeURIComponent(dataOf)}`;
    });

    $(document).on('click', '.movie_info', function(event) {
        event.preventDefault();

        const movieId = $(this).attr('data-movieId');;
        console.log(movieId);

        window.location.href = `WebPages/movieDetail.html?movieId=${encodeURIComponent(movieId)}`;
    });
    
});



async function fatchData() {
    try {
        const [data1, data2, data3, data4] = await Promise.all([
            fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMzUxMTM5Ni45MjMwNDQsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaAYgVhxyHOSwIdztl6s40ZMogAcjqKCleA0VYnyW_w'
                }
            }).then(response => response.json()),

            fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMzUxMTM5Ni45MjMwNDQsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaAYgVhxyHOSwIdztl6s40ZMogAcjqKCleA0VYnyW_w'
                }
            }).then(response => response.json()),

            fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMzUxMTM5Ni45MjMwNDQsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaAYgVhxyHOSwIdztl6s40ZMogAcjqKCleA0VYnyW_w'
                }
            }).then(response => response.json()),

            fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMzUxMTM5Ni45MjMwNDQsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaAYgVhxyHOSwIdztl6s40ZMogAcjqKCleA0VYnyW_w'
                }
            }).then(response => response.json())
        ]);

        setDataInPage(data1, "🎬 Now Playing 🍿", "now_playing");
        setDataInPage(data2, "🌟 Top Rated 🎥", "top_rated");
        setDataInPage(data3, "🔥 Popular 🎥", "popular");
        setDataInPage(data4, "📅 Upcoming 🎬", "upcoming");

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function setDataInPage(apiData, dataOf, dataId) {
    let mainFrameHTML = `
        <div class="movie-box" id=${dataId}>
        <h1 class="title">${dataOf}</h1>`;
            

    if(dataId == "now_playing" || dataId == "upcoming"){
        maxDate = apiData.dates.maximum;
        minDate = apiData.dates.minimum;

        mainFrameHTML += `
        <h2 class="dates">(${minDate} - ${maxDate})</h2>`;
    }       

    mainFrameHTML += `<a class="sub-title-movie-list more" data-dataOf="${dataId}" href="#">More</a>
            <div class="show-case">`;
            
    const result = apiData.results;
    for (let i = 0; i < 4; i++) {
        var imageUrl = result[i].poster_path ? `https://image.tmdb.org/t/p/w500${result[i].poster_path}` : 'https://via.placeholder.com/100';
        var title = result[i].title;
        var releaseDate = result[i].release_date;
        var voteAverage = result[i].vote_average;
        voteAverage = parseFloat(voteAverage).toFixed(1);

        mainFrameHTML += `
            <div class="shelf">
                <h2 class="sub-title-movie-list">${title}</h2>
                <h2 class="sub-title-small">${releaseDate}</h2>
                <a class="movie_info" data-movieId="${result[i].id}" href="#">
                    <img src="${imageUrl}" alt="${title}" class="movieimg" data-title="${title}">
                </a>
                <div class="vote_avg_container">
                    <meter class="vote_avg" value="${voteAverage}" min="0" max="10"></meter>
                    <br>
                    <span class="sub-title-small">${voteAverage} out of 10</span>
                </div>
            </div>`;
    }

    mainFrameHTML += `</div></div><hr>`;

    $("#movie-main").append(mainFrameHTML);
}
