$(document).ready(function () {

    let session = localStorage.getItem("sessionId");
    console.log(session)

    fatchData();

    $(document).on('click', '#logout', function(event) {
        event.preventDefault();
        logout(session);
    });    
});


function logout(sessionId) {
    const options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjVkYjUzY2JmNjllZGIzNTA3ZTU2NWE1Y2I3NDlkMSIsIm5iZiI6MTcyMzUxMTM5Ni45MjMwNDQsInN1YiI6IjY2YjI5MTdjNGEzN2I2NTQzY2EwZmI1ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zaAYgVhxyHOSwIdztl6s40ZMogAcjqKCleA0VYnyW_w'
      }
    };
  
    // Replace 'session' with your variable that holds the current session_id.
    fetch(`https://api.themoviedb.org/3/authentication/session?session_id=${sessionId}`, options)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          console.log("Logged out successfully!");
          alert("Logged out successfully!");
          localStorage.setItem("loggedOut", "true");

          const currentUrl = document.URL;

          if (currentUrl.includes("WebPages")) {
              window.location.replace("../index.html");
          }
          else{
                window.location.replace("index.html");
          }
        } else {
          console.error("Logout failed:", data.status_message);
          alert("Logout failed: " + data.status_message);
        }
      })
      .catch(err => console.error("Error logging out:", err));
  }


window.addEventListener('pageshow', function(event) {
    if (localStorage.getItem("loggedOut") === "true") {
        if (event.persisted || (window.performance && window.performance.navigation.type === 2)) {
            const currentUrl = document.URL;

            if (currentUrl.includes("WebPages")) {
                window.location.replace("../index.html");
            }
            else{
                  window.location.replace("index.html");
            }
        }
      }
  });