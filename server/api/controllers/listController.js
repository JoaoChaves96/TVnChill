const Movie = require('../models/listModel.js');

var Trakt = require('trakt-api');
var trakt = Trakt('a92ac06129e8a68fc9c14b1eedcf709925cf8d82b568a127479207d229d78b4b');

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