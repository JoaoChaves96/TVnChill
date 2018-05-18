const mongoose = require('mongoose');

const MovieSchema = mongoose.Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('Movie', MovieSchema);