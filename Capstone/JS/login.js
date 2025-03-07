$(document).ready(function() {
    $("#loginForm").submit(function(event) {
        event.preventDefault();
        let username = $("#username").val();
        let password = $("#password").val();
        fetchData(username , password);
    });
});


async function fetchData(user, pwd) {
    try {
        var reqToken = "";
        var sessionId = "";
        const response1 = await fetch('https://api.themoviedb.org/3/authentication/token/new', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMjk3ODY4NC41NTUsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8zTB4FLm3yLFryTdaGpsskY54F2SOpnFwAn6khPYjsQ'
            }
        });

        const data1 = await response1.json();
        if(data1.success == true){
            reqToken = data1.request_token;
        }else{
            throw new Error(data1.status_message);
        }        

        const response2 = await fetch('https://api.themoviedb.org/3/authentication/token/validate_with_login', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMjk3ODY4NC41NTUsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8zTB4FLm3yLFryTdaGpsskY54F2SOpnFwAn6khPYjsQ'
            },
            body: JSON.stringify({
                username: user,
                password: pwd,
                request_token: reqToken
            })
        });

        const data2 = await response2.json();
        if(data2.success == true){
            reqToken = data2.request_token;
        }else{
            throw new Error(data2.status_message);
        }

        const response3 = await fetch('https://api.themoviedb.org/3/authentication/session/new', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMjk3ODY4NC41NTUsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8zTB4FLm3yLFryTdaGpsskY54F2SOpnFwAn6khPYjsQ'
            },
            body: JSON.stringify({
                "request_token": reqToken
            })
        });

        const data3 = await response3.json();
        if(data3.success == true){
            sessionId = data3.session_id;
            localStorage.setItem("sessionId", sessionId);
            console.log(sessionId)
        }else{
            throw new Error(data3.status_message);
        }

        if(sessionId != ""){
            window.location.href = `index.html`;
        }else{
            throw new Error("Something went wrong!");
        }

    } catch (error) {
        alert(error);
    }
}
