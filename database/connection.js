const mongoose = require('mongoose');
const imdb = require('./imdb.json');
const Movie = require('../models/movie');
const {
    Genre
} = require('../models/genre');
const {
    addGenres,
    addMovies
} = require('../utility/util');
const {
    development: {
        MONGO_URL
    }
} = require('../config/config');

//MongoDB Options
const mongoOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
};

//Connect Method to MongoDBAtlas
const connectToMongoDBAtlas = async () => {
    await mongoose.connect(MONGO_URL, mongoOpts);
    console.log(`MongoDB connected!`);
    const rowsMovie = await Movie.countDocuments({});
    const rowsGenre = await Genre.countDocuments({});
    if (rowsMovie <= 0)
        await addMovies(imdb);
    if (rowsGenre <= 0)
        await addGenres(imdb);


}

module.exports = connectToMongoDBAtlas;