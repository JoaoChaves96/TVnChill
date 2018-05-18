module.exports = (app) => {
    const movies = require('../controllers/listController.js');

    // Retrieve all Movies
    app.get('/movies', movies.findAll)

    // Retrieve a single Movie with movieId
    app.get('/movies/:MovieId', movies.searchMovie);
}