module.exports = (app) => {
    const movies = require('../controllers/listController.js');
    const shows = require('../controllers/showController');

    // Retrieve all Movies
    app.get('/movies', movies.findAll)

    // Retrieve movies with search term
    app.get('/movies/:Term', movies.searchMovie);

    //Retrieve movie image with tmdb id
    app.get('/movies/getImage/:tmdbId' , movies.getMovieImage);

    app.get('/movies/getMovieFromId/:id', movies.getMovieFromId);

    app.get('/movies/getRating/:MovieId', movies.getRating);

    app.get('/shows/:Term', shows.searchShow);

    app.get('/shows/getImage/:tmdbId', shows.getShowImage);

    app.get('/shows/getRating/:ShowId', shows.getRating);

    app.get('/shows/getShowFromId/:id',shows.getShowFromId);
}