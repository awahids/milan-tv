const { MovieGenre, Genre, Movies } = require('../models');


class MoviesGenresControllers {
    static create (req, res, next) {
        let { MovieId, GenreId } = req.body;

        MovieGenre.create({
            MovieId: MovieId,
            GenreId: GenreId
        })
        .then(data => {
            res.status(201).json({ message: 'movies genres models has been created'})
        })
        .catch(next);
    };

    static async getAllMoviesByGenres(req, res, next) {
        console.log(req.query)
        let { page } = req.query;

        if(!page) {
            page = 1
        }
        const allMovies = await Movies.findAll({
                include: [
                    {
                        model: MovieGenre,
                        include: [{
                            model: Genre,
                            attributes: ["name"]
                        }],
                    }
                ],
                // offset: (15*(page-1))+1,
                // limit: 15
            });
        res.status(200).json(allMovies)
    };

    static async getMovieByGenreId(req, res) {
        let { page } = req.query;
        let { GenreId } = req.query;

        if(!page) {
            page = 1
        }
        const moviesByGenre = await Movies.findAll({
                        include: [ 
                            { 
                                model: MovieGenre,
                                attributes : { exclude : ["id", "MovieId", "updatedAt", "createdAt"]},
                                where: {
                                    GenreId: GenreId
                                }, include: Genre,
                            }
                        ],
                // offset: (15*(page-1))+1,
                // limit: 15
            });
        res.status(200).json(moviesByGenre)
    };


    static async getGenresByMovie(req, res, next) {
        let { page } = req.query;
        let { MovieId } = req.query;

        if(!page) {
            page = 1
        }
        const dataGenreMovie = await Movies.findAll({
                        include: [ 
                            { 
                                model: MovieGenre,
                                where: {
                                    MovieId: MovieId
                                }, include: Genre,
                            }
                        ],
                // offset: (15*(page-1))+1,
                // limit: 15
            });
        res.status(200).json(dataGenreMovie)
    }; 

    static update (req, res, next){
        let { id } = req.params;
        let { MovieId, GenreId } = req.body;

        MovieGenre.update({
            MovieId: MovieId,
            GenreId: GenreId
        }, {
            where: {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                    throw { message: `Movies genress id ${id} has not found`}
                } else {
                    res.status(200).json({ message: `Movie id ${MovieId} with genress id ${id} has been updated`})
            }
        });
    };

    static delete (req, res, next) {
        let { id } = req.params;

        MovieGenre.destroy({
            where : {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                throw { message: `Movies genress id ${id} has not found`}
            } else {
                res.status(200).json({ message: `Movies genress id ${id} has been deleted`})
            };
        });
    };

}

module.exports = MoviesGenresControllers;