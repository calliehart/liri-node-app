# liri-node-app

## Description

This Liri app runs on the command line using node. It allows you to search for information about songs, movies, and concerts.

Available searches:

    * concert-this 
        -followed by band name
        -uses the Bands In Town API
        
    * spotify-this-song
        -followed by song name
        -uses the Spotify API
    
    * movie-this
        -followed by movie name
        -uses the OMDB API
        
    * do-what-it-says
        -no additional search parameters
        -reads through a .txt file and pulls song information from it
        -runs search through the Spotify API
        

## Problem:   
Create a javascript app that runs through node, can take in specific search commands, and returns results to the console.

## Solution: 
- Check for which search command is being entered
- Check what song/band/movie name is being entered
- Run API call for JSON data response
- Print specific JSON data to console

### Demo Video:
https://drive.google.com/file/d/1ZIpACZ1IJrcUts2X1mgw80CychjSAqpS/view?usp=sharing

### Author

Callie Hart (https://calliehart.github.io/)



