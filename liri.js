require("dotenv").config();

var keys = require("./keys.js");
var request = require("request");
var moment = require("moment");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
const fs = require("fs");

let command = process.argv[2];
let searchName = process.argv.slice(3).join(" ");

var divider =
    "\n------------------------------------------------------------\n\n";


function commandSearch() {
    switch (command) {
        case "spotify-this-song":
        spotifySong();
        break;
        
        case "concert-this":
        townArtistEvents();
        break;
        
        case "movie-this":
        OMDBMovie();
        break;
        
        case "do-what-it-says":
        readRandom();
        break;
    };
};

commandSearch();

    function spotifySong() {

        if (!searchName) {
            searchName = "The Sign";
         };

        spotify
        .search({ type: 'track', query: searchName })
        .then(function(response) {

          var jsonData = response.tracks.items[0];
            //console.log(jsonData);
          var songData = [
              "Artist: " + jsonData.artists[0].name,
              "Song: " + jsonData.name,
              "Preview: " + jsonData.preview_url,
              "Album: " + jsonData.album.name
          ].join("\n\n");

          fs.appendFile("log.txt", songData + divider, function(err) {
            if (err) throw err;
            console.log("\n" + songData + "\n");
            });
        })
        .catch(function(err) {
          console.log(err);
        });

        


    };

    function townArtistEvents() {
        var queryUrl = "https://rest.bandsintown.com/artists/" + searchName + "/events?app_id=codingbootcamp";
        
        request(queryUrl, function(error, response, body) {

            if (!error && response.statusCode === 200) {

                var jsonData = JSON.parse(body)[0];

                var eventDate = moment(jsonData.datetime).format("MM/DD/YYYY");

                var showData = [
                    "Venue: " + jsonData.venue.name,
                    "Location: " + jsonData.venue.city + ", " + jsonData.venue.region,
                    "Date: " + eventDate
                ].join("\n\n");

                fs.appendFile("log.txt", showData + divider, function(err) {
                    if (err) throw err;
                    console.log("\n" + showData + "\n");
                });

            };
        });
    };

    function OMDBMovie() {
        var queryUrl = "http://www.omdbapi.com/?t=" + searchName + "&y=&plot=short&apikey=trilogy";

        request(queryUrl, function(error, response, body) {

            if (!error && response.statusCode === 200) {
          
                var jsonData = JSON.parse(body);
          
                var movieData = [
                    "Title: " + jsonData.Title,
                    "Year: " + jsonData.Year,
                    "IMDB Rating: " + jsonData.imdbRating,
                    "Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value,
                    "Country: " + jsonData.Country,
                    "Language: " + jsonData.Language,
                    "Plot: " + jsonData.Plot,
                    "Actors: " + jsonData.Actors
                ].join("\n\n");
            
                
                fs.appendFile("log.txt", movieData + divider, function(err) {
                    if (err) throw err;
                    console.log("\n" + movieData + "\n");
                });
            };
        });
    };

    function readRandom() {
        fs.readFile("random.txt", "utf8", function(error, data) {

            if (error) {
              return console.log(error);
            };
            
            //console.log(data);
            var dataArr = data.split(",");
          
            command = dataArr[0];
            searchName = dataArr[1];

            //console.log(command);
            //console.log(searchName);
            commandSearch();
            
            });
            
    };