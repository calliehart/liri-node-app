require("dotenv").config();

const keys = require("./keys.js");
const spotify = new spotify(keys.spotify);
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

    };

    function townArtistEvents() {
        const queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        
        request(queryUrl, function(error, response, body) {

            if (!error && response.statusCode === 200) {

                var jsonData = JSON.parse(body);

                var eventDate = jsonData.datetime;

                var showData = [
                    "Venue: " + jsonData.venue.name,
                    "Location: " + jsonData.venue.city + ", " + jsonData.venue.region,
                    "Date: " + eventDate
                ].join("\n\n");

                fs.appendFile("log.txt", showData + divider, function(err) {
                    if (err) throw err;
                    console.log(showData);
                };

            };
        });
    };

    function OMDBMovie() {
        const queryUrl = "http://www.omdbapi.com/?t=" + searchName + "&y=&plot=short&apikey=trilogy";

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
                    console.log(movieData);
                };
            });
        };

    function readRandom() {
        fs.readFile("random.txt", "utf8", function(error, data) {

            if (error) {
              return console.log(error);
            };
            
            console.log(data);
            var dataArr = data.split(",");
          
            let command = dataArr[0];
            let searchName = dataArr[1];
             
            commandSearch();

          });
    };