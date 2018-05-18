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

// Find a single note with a noteId
exports.findOne = (req, res) => {
    res.send('oi');
};