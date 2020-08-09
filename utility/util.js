const {
    Genre
} = require('../models/genre');
const Movie = require('../models/movie');

const addGenres = async data => {

    //Fetch genres array from the JSON file
    let genres = data.map(d => d["genre"]);

    //Flatten the genres array
    genres = [].concat(...genres);

    //Remove duplicates and create Genre model object to save in bulk
    genres = genres.map(g => g.trim()).filter((d, index) => genres.indexOf(d) === index).map(g => (new Genre({
        name: g
    })));

    //Bulk insert to Genre Collection
    await Genre.insertMany(genres);
}

const addMovies = async data => {

    //Create movies list
    const movies = data.map(d => (new Movie({
        popularity: d["99popularity"],
        genre: d["genre"].map(g => g.trim()),
        name: d["name"],
        director: d["director"],
        imdb_score: d["imdb_score"]
    })));

    //Bulk insert to Movies Collection
    await Movie.insertMany(movies);
}

module.exports = {
    addGenres,
    addMovies
};