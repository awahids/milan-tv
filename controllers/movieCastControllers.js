const { MoviesCast, Movies, Artists, Genres } = require('../models');


class MoviesCastControllers {
    static postMovieCast (req, res, next) {
        let { MovieId, ArtistId } = req.body;
        const data = await MoviesCast.findOne({
            where : {
                MovieId : MovieId,
                ArtistId : ArtistId
            }
        })

        if(data) {
            res.status(400).json({
                status: "Failed",
                message: 'Movies characters already'
        })
    } else {
        MoviesCast.create({
        MovieId: MovieId,
        ArtistId: ArtistId
    })}
    res.status(201).json({ message: 'Movies characters models has been created'})
        .catch(next);
    };

    static getAllMoviesByCharacters(req, res, next) {
        let { page } = req.query;

        if(!page) {
            page = 1
        }
       const movies = await Movies.findAll({
            include: [
                {
                    model: MoviesCast,
                    include: [{
                        model: Artists,
                        model: Genres
                    }]
                },
            ],
            offset: 15*(page-1),
            limit: 15
        });
        res.status(200).json(movies)
    };
    

    static getMoviesByCharacters(req, res, next) {
        let { ArtistId, page } = req.query;

        if(!page) {
            page = 1
        }

        const moviesByArtist = await.Movies.findAll({
            include: [ 
                { 
                    model: MovieCast,
                    attributes : { exclude : ["id", "MovieId", "updatedAt", "createdAt"]},
                    where: {
                        ArtistId: ArtistId
                    }, include: Artists,
                }
            ],

            offset: (15*(page-1))+1,
            limit: 15
        });
        res.status(200).json(moviesByArtist)
    };

    static getCharactersByMovies(req, res, next) {
        let { MovieId, page } = req.query;

        if(!page) {
            page = 1
        }

        const artistMovie = await Movies.findAll({
            include: [ 
                { 
                    model: MovieGenre,
                    where: {
                        MovieId: MovieId
                    }, 
                    include: Artists,
                }
            ],

            offset: 15*(page-1),
                limit: 15
        });
        res.status(200).json(artistMovie)
    };

    static movieCastUpdate (req, res, next){
        let { id } = req.params;
        let { MovieId, ArtistId } = req.body;
        const movieCast = await MovieCast.findOne({
            where: {
                id: id
            }
        });

        if(!movieCast ) {
            res.status(400).json({
                status: "failed",
                message: `Movies Artist id ${id} has not found`
            })
        } else if (!MovieId || !ArtistId) {
            res.status(400).json({
                status: "Failed",
                message: "Bad Request"
            })
        } else {
            MoviesCast.update({
            MovieId: MovieId,
            ArtistId: ArtistId
        }, {
            where: {
                id: id
            }
        })};
        res.status(200).json({ message: `Artist id ${ArtistId} has been updated`})
            
    };

    static movieCastDelete (res, res, next) {
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
