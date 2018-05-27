const Movie = require('../models/listModel.js');

var Trakt = require('trakt-api');
var trakt = Trakt('a92ac06129e8a68fc9c14b1eedcf709925cf8d82b568a127479207d229d78b4b');
const MovieDB = require('moviedb')('5f4f5bf0923e4341b72f977947303d01');



// Retrieve and return all movies from the database.
exports.findAll = (req, res) => {
    trakt.show('manhattan', { extended : 'full' }).then(function(show) {
        res.send(show)
      }).catch(function(err) {
        console.warn('oh noes', err);
      });
};


exports.searchMovie = (req, res) => {
  
    trakt.searchMovie(req.params.MovieId).then(function(show) {
     
        res.send(show)
      }).catch(function(err) {
        console.warn('oh noes', err);
      });
};

exports.getRating = (req,res) => {
    trakt.movieRatings(req.params.MovieId).then(function (response) {
        //console.log(response.rating);
        res.send(response);
    }).catch(function (err) {
        console.warn('oh noes', err);
    });
};

exports.getMovieImage = (req, res) => {
  MovieDB.movieImages({ id: req.params.tmdbId}, (err, response) => {
    
     if(response == null) {
     
      var noImg = 'noImg';
      res.send(noImg);
    }
    else {
      
      res.send(response.posters[0]);
    } 
    
    
  });
}

exports.getShowImage = (req, res) => {

  MovieDB.tvInfo({ id: req.params.tmdbId}, (err, response) => {
    console.log(response.backdrop_path);
    //res.send(response.backdrop_path);

  });
  
}

exports.getMovieFromId = (req, res) => {
  
  trakt.movie(req.params.id).then(function(show) {
    //console.log(show);
      res.send(show)
    }).catch(function(err) {
      console.warn('oh noes', err);
    });
};