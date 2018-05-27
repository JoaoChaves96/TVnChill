const mongoose = require('mongoose');

const ShowScheema = mongoose.Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('Show', ShowScheema);