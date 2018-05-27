const Show = require('../models/showModel');

var Trakt = require('trakt-api');
var trakt = Trakt('a92ac06129e8a68fc9c14b1eedcf709925cf8d82b568a127479207d229d78b4b');
const MovieDB = require('moviedb')('5f4f5bf0923e4341b72f977947303d01');

exports.searchShow = (req, res) => {
  
    trakt.searchShow(req.params.Term).then(function(show) {
        
        res.send(show)
      }).catch(function(err) {
        console.warn('oh noes', err);
      });
};


exports.getShowImage = (req, res) => {
    MovieDB.tvImages({ id: req.params.tmdbId}, (err, response) => {
      //console.log(response);
       if(response == null) {
        var noImg = 'noImg';
        res.send(noImg);
      }
      else {  
        res.send(response.posters[0]);
      } 
    });
};

exports.getRating = (req,res) => {
    trakt.showRatings(req.params.ShowId).then(function (response) {
        //console.log(response.rating);
        res.send(response);
    }).catch(function (err) {
        console.warn('oh noes', err);
    });
};

exports.getShowFromId = (req, res) => {
  
    trakt.shows(req.params.id).then(function(show) {
      //console.log(show);
        res.send(show)
      }).catch(function(err) {
        console.warn('oh noes', err);
      });
  };
