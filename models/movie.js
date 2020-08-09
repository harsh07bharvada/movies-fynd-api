const mongoose = require('mongoose');
const moviesSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
    },
    popularity: {
        type: String,
        required: true,
    },
    genre: {
        type: [String],
        required: true,
    },
    director: {
        type: String,
        required: true,
    },
    imdb_score: {
        type: String,
        required: true
    }
});

const Movie = mongoose.model('Movie', moviesSchema);

module.exports = Movie;