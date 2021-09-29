const { MoviesGenre, Genre, movies } = require('../models');


class MoviesGenresControllers {
    static create (req, res, next) {
        let { movieId, GenreId } = req.body;

        MoviesGenre.create({
            movieId: movieId,
            GenreId: GenreId
        })
        .then(data => {
            res.status(201).json({ message: 'movies genre models has been created'})
        })
        .catch(next);
    };

    static getAllMoviesByGenre(req, res, next) {
        let { page } = req.params;
        let { GenreId } = req.params;

        if(!page) {
            page = 1
        }
        const allMovies = movies.findAll({
                include: [
                    {
                        model: MoviesGenre,
                        include: Genre,
                        where : {
                            GenreId : GenreId
                        },
                    }
                ],
                offset: (15*(page-1))+1,
                limit: 15
            });
        res.status(200).json(allMovies)
    };

    static async getMoviesByGenre(req, res, next) {
        let { GenreId, page } = req.params;

        const findGenreByMovie = await MoviesGenre.findAndCountAll({
            where: { 
                GenreId: GenreId
            },
            include: [
                {
                    model: movies
                },
                {
                    model: Genre
                } 
            ],
            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(findGenreByMovie)
    };

    static getGenresByMovie(req, res, next) {
        let { movieId } = req.params;

        MoviesGenre.findAll({
            where: { 
                movieId: movieId
            },
            include: [
                {
                    model: movies
                },
                {
                    model: Genre
                } 
            ],
        });
        res.status(200).json(MoviesGenre)
    }; 

    static update (req, res, next){
        let { id } = req.params;
        let { movieId, GenreId } = req.body;

        MoviesGenre.update({
            movieId: movieId,
            GenreId: GenreId
        }, {
            where: {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                    throw { message: `Movies Genres id ${id} has not found`}
                } else {
                    res.status(200).json({ message: `Movie id ${moviesId} with Genres id ${id} has been updated`})
            }
        });
    };

    static delete (req, res, next) {
        let { id } = req.params;

        MoviesGenre.destroy({
            where : {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                throw { message: `Movies Genres id ${id} has not found`}
            } else {
                res.status(200).json({ message: `Movies Genres id ${id} has been deleted`})
            };
        });
    };

}

module.exports = MoviesGenresControllers;