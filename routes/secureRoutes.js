const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Movie = require('../models/movie');
const {
    development: {
        jwtSecret
    }
} = require('../config/config');
const secureRouter = express.Router();

//Middleware to check for token
secureRouter.use(async (req, res, next) => {

    let result = {};
    let status = 401;
    let token = "";
    const bearerToken = req.header('authorization');
    if(bearerToken){
        token = bearerToken.split(" ")[1];
        console.log(`Token : ${token}`)
    }
    if (token.indexOf(".") === -1) {
        let err = new Error();
        err.name = 'Unauthorized';
        err.message = 'Token not present!';
        result.status = status;
        result.error = err;
        res.status(result.status).send(result);
    } else {
        const {
            tokenErr,
            username
        } = await verifyToken(token);
        if (!username || tokenErr) {
            result.status = status;
            result.error = tokenErr;
            res.status(result.status).send(result);
        } else {
            User.findOne({
                username: username
            }, function (findError, doc) {
                if (findError) {
                    result.status = status;
                    result.error = findError;
                    res.status(result.status).send(result);
                } else {
                    next();
                }
            });
        }
    }
});

//Create a movie
secureRouter.post('/movie', async (req, res) => {

    let result = {};
    let statusCode = 201;
    const {
        name,
        popularity,
        genre,
        director,
        imdb_score
    } = req.body;
    const bearerToken = req.header('authorization');
    const token = bearerToken.split(" ")[1];
    const {
        username
    } = await verifyToken(token);
    const movie = new Movie({
        name,
        popularity,
        genre,
        director,
        imdb_score,
        username
    });

    movie.save((movieErr, savedMovie) => {

        if (movieErr) {
            statusCode = 406;
            result.status = statusCode;
            result.error = movieErr;
            res.status(result.status).send(result);
        } else {
            result.status = statusCode;
            result.result = savedMovie;
            res.status(result.status).send(result);
        }
    });
});

//Update a movie
secureRouter.put('/movie', async (req, res) => {

    let result = {};
    let statusCode = 200;
    const {
        _id,
        popularity,
        genre,
        director,
        imdb_score
    } = req.body;
    Movie.updateOne({
        _id
    }, {
        popularity,
        genre,
        director,
        imdb_score
    }, (movieErr, writeOpResult) => {

        if (movieErr) {
            statusCode = 404;
            result.status = statusCode;
            result.error = movieErr;
            res.status(result.status).send(result);
        } else {
            result.status = statusCode;
            result.result = writeOpResult;
            res.status(result.status).send(result);
        }
    });
});

//Delete a movie
secureRouter.delete('/movie', async (req, res) => {

    let result = {};
    let statusCode = 200;
    const {
        _id
    } = req.body;
    Movie.deleteOne({
        _id
    }, (movieErr) => {

        if (movieErr) {
            statusCode = 404;
            result.status = statusCode;
            result.error = movieErr;
            res.status(result.status).send(result);
        } else {
            result.status = statusCode;
            res.status(result.status).send(result);
        }

    });

});


//Sign out
secureRouter.get('/signout', async (req, res) => {

    res.clearCookie('token').status(200).send({status:200,message:`Signout successfull`});

});


//Function to verify token
const verifyToken = (token) => {

    let result = {
        err: null,
        username: null
    };
    try {
        const decrypt = jwt.verify(token, jwtSecret);
        const username = decrypt.username;
        result.username = username;
        return result;

    } catch (err) {
        err.name = 'Unauthorized';
        err.message = 'Token invalid!';
        console.log(`Error while verifying token. Invalid token`);
        result.err = err;
        console.log(`@verifyToken - Object sending back : ${JSON.stringify(result)}`);
        return result;
    }
}


module.exports = secureRouter;