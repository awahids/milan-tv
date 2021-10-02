const { MoviesCast, Movies, Artists, Genres } = require('../models');


class MoviesCastControllers {
    static create (req, res, next) {
        let { movieId, ArtistId } = req.body;

        MoviesCast.create({
            movieId: movieId,
            ArtistId: ArtistId
        })
        .then(data => {
            res.status(201).json({ message: 'movies characters models has been created'})
        })
        .catch(next);
    };

    static getAllMoviesByCharacters(req, res, next) {
        let { page } = req.params;

        if(!page) {
            page = 1
        }
        MoviesCast.findAll({
            include: [
                {
                    model: Movies
                },
                {
                    model: Artists
                },
                {
                    model: Genres
                }
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(MoviesCast)
    };
    

    static getMoviesByCharacters(req, res, next) {
        let { movieId, page } = req.params;

        MoviesCast.findAndCountAll({
            where: { 
                movieId: movieId
            },
            include: [
                {
                    model: Movies
                },
                {
                    model: Artists
                },
                {
                    model: Genres
                }
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(MoviesCast)
    };

    static getCharactersByMovies(req, res, next) {
        let { ArtistId } = req.params;

        MoviesCast.findAll({
            where: { 
                ArtistId: ArtistId
            },
            include: [
                {
                    model: Movies
                },
                {
                    model: Artists
                },
                {
                    model: Genres
                }
            ],
        });
        res.status(200).json(MoviesCast)
    };

    static update (req, res, next){
        let { id } = req.params;
        let { movieId, ArtistId } = req.body;

        MoviesCast.update({
            movieId: movieId,
            ArtistId: ArtistId
        }, {
            where: {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                    throw { message: `Characters id ${id} has not found`}
                } else {
                    res.status(200).json({ message: `Characters id ${id} has been updated`})
            }
        });
    };

    static delete (res, res, next) {
        let { id } = req.params;

        MoviesCast.destroy({
            where : {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                throw { message: `Character id ${id} not found`}
            } else {
                res.status(200).json({ message: `Character id ${id} has been deleted`})
            };
        });
    };

}

module.exports = MoviesCastControllers;
