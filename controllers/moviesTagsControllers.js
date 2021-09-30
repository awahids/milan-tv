const { MovieTag, Tag, Movies } = require('../models');


class MoviesTagsControllers {
    static create (req, res, next) {
        let { MovieId, TagId } = req.body;

        MovieTag.create({
            MovieId: MovieId,
            TagId: TagId
        })
        .then(data => {
            res.status(201).json({ message: 'movies tags models has been created'})
        })
        .catch(next);
    };

    static async getAllMoviesByTags(req, res, next) {
        let { page } = req.query;

        if(!page) {
            page = 1
        }
        const allMovies = await Movies.findAll({
                include: [
                    {
                        model: MovieGenre,
                        include: [{
                            model: Tag,
                            attributes: ["name"]
                        }],
                    }
                ],
                // offset: (15*(page-1))+1,
                // limit: 15
            });
        res.status(200).json(allMovies)
    };

    static async getMovieByTagId(req, res) {
        let { page } = req.query;
        let { TagId } = req.query;

        if(!page) {
            page = 1
        }
        const moviesByTag = await Movies.findAll({
                        include: [ 
                            { 
                                model: MovieGenre,
                                attributes : { exclude : ["id", "MovieId", "updatedAt", "createdAt"]},
                                where: {
                                    TagId: TagId
                                }, include: Tag,
                            }
                        ],
                // offset: (15*(page-1))+1,
                // limit: 15
            });
        res.status(200).json(moviesByTag)
    };


    static async getTagsByMovie(req, res, next) {
        let { page } = req.query;
        let { MovieId } = req.query;

        if(!page) {
            page = 1
        }
        const dataTagMovie = await Movies.findAll({
                        include: [ 
                            { 
                                model: MovieGenre,
                                where: {
                                    MovieId: MovieId
                                }, include: Tag,
                            }
                        ],
                // offset: (15*(page-1))+1,
                // limit: 15
            });
        res.status(200).json(dataTagMovie)
    }; 

    static update (req, res, next){
        let { id } = req.params;
        let { MovieId, TagId } = req.body;

        MovieTag.update({
            MovieId: MovieId,
            TagId: TagId
        }, {
            where: {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                    throw { message: `Movies tags id ${id} has not found`}
                } else {
                    res.status(200).json({ message: `Movie id ${MovieId} with tags id ${id} has been updated`})
            }
        });
    };

    static delete (req, res, next) {
        let { id } = req.params;

        MovieTag.destroy({
            where : {
                id: id
            }
        })
        .then(data => {
            if(!data) {
                throw { message: `Movies tags id ${id} has not found`}
            } else {
                res.status(200).json({ message: `Movies tags id ${id} has been deleted`})
            };
        });
    };

}

module.exports = MoviesTagsControllers;