module.exports = (app) => {
    const movies = require('../controllers/listController.js');

    // Retrieve all Movies
    app.get('/movies', movies.findAll)

    // Retrieve a single Movie with movieId
    app.get('/movies/:MovieId', movies.searchMovie);

    //Retrieve movie image with tmdb id
    app.get('/movies/getImage/:tmdbId' , movies.getMovieImage);

    app.get('/movies/getMovieFromId/:id', movies.getMovieFromId);
}