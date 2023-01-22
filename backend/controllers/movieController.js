const asyncHandler = require('express-async-handler')
const Movie = require('../models/movieModel')


const getMovie = asyncHandler(async (req, res) => {
    const words = req.params.title.split(" ");
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    req.params.title = words.join(" ")

    const movies = await Movie.find({ title: { $regex: req.params.title } }, {
        title: 1,
        plot: 1,
        poster: 1,
        imdb: 1,
        year: 1,
    }).limit(10)
    res.status(200).json(movies)
})


const getMovieById = asyncHandler(async (req, res) => {
    const movies = await Movie.findById(req.params.id, {
        title: 1,
        plot: 1,
        poster: 1,
        imdb: 1,
        year: 1,
    })
    res.status(200).json(movies)
})

module.exports = {
    getMovie,
    getMovieById
}