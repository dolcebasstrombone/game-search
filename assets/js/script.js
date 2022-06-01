//init function that displays previous searches from local storage
//var savedSearchesObj = JSON.parse(localStorage.getItem("savedSearchesObj")) || [];

$("#game-btn").on("click", gameInputHandler);
$("#genre-btn").on("click", genreInputHandler);

function gameInputHandler() {
  var gameInput = $("#game-input").val().trim();
  if (gameInput === "" || null) {
    //placeholder window alert
    window.alert("Please enter a game.");
    //needs to dynamically display some alert on the page. examples commented out.
    //   var alertContainerEl = $("#alert").text("");
    //   var alertTextEl = $("<p>").text("Please enter a game.");
    //   alertContainerEl.append(alertTextEl);
  } else {
    gameFetchResponse(gameInput);
  }
}

function genreInputHandler() {
  var genreInput = $("#genre-input").val().trim();
  if (genreInput === "" || null) {
    //placeholder window alert
    window.alert("Please enter a genre.");
    //needs to dynamically display some alert on the page. examples commented out.
    //   var alertContainerEl = $("#alert").text("");
    //   var alertTextEl = $("<p>").text("Please enter a genre.");
    //   alertContainerEl.append(alertTextEl);
  } else {
    genreFetchResponse(genreInput);
  }
}

//fetch and response handling for game search (use one API)
function gameFetchResponse(gameInput) {
  var fetchUrl = "https://whatoplay.p.rapidapi.com/search?game=" + gameInput;

  //fetch variables from whattoplay documentation start
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "whatoplay.p.rapidapi.com",
      "X-RapidAPI-Key": "29b518b889msh6fc361b3b9aec26p1e1231jsnc655b8c71d9a",
    },
  };
  //fetch variables from whattoplay documentation end

  fetch(fetchUrl)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err)); //200 error (can't connect)

  //   if response works, gameSearchHandler
  //   if 400 error, gameNotFoundHandler (currently just logs and empty array if game not found)
}

//fetch and response handling for genre search (use a different API, probably gamebomb) (does not currently work)
//my user key for giantbomb: 74396db661dc842e2e30773ee2aa76fbd447cbc1
//----------------------------------------------------------------------------------------
function genreFetchResponse(yearInput) {
  var yearFetchUrl =
    "https://www.giantbomb.com/api/games/?api_key=74396db661dc842e2e30773ee2aa76fbd447cbc1&limit=10&format=json&filter=original_release_date:" + yearInput +"-01-01|" + yearInput + "-12-31"; //url works in browser bar, not in html

$.ajax({
    type: 'GET',
    dataType: 'jsonp',
    crossDomain: true,
    jsonp: 'json_callback',
    url: yearFetchUrl
  })
    .then(function (data) {
      localStorage.setItem('data', JSON.stringify(data));
    })
    .then(function () {
      location.assign("results.html")
    });


  const options = {
    method: "GET",
    headers: {
        "mode": "no-cors",
        'Access-Control-Allow-Origin': '*',
      "GiantBomb-Host": "https://www.giantbomb.com/api/",
      "GiantBomb-Key": "74396db661dc842e2e30773ee2aa76fbd447cbc1",
    },
  };

  fetch(yearFetchUrl, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err)); //200 error (can't connect)

  //if response works, genreSearchHandler
  //if 400, genreNotFoundHandler
}

//----------------------------------------------------------------------------------------

//searchHandler
//save genre or game title to local storage (savedSearchesObj) (wait for an ok response)
//display new saved search to the saved searches buttons
//if saved searha already exists, don't create a new button
//display search results (game list)
//event listener on each of the results (probably an <a> tag) that runs fetchReview

//fetchReview
//fetches reveiw using game title as query (whattoplay API)
//if response works, gameHandler
//if 400, gameErrorHandler
//if 200, gameConnectionErrorHandler

//gameHandler
//save game to local storage (savedGamesObj)
//display new saved game to the saved games buttons
//if saved game already exists, dont create a new button
//display game title
//display game reveiw
