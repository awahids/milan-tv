const { MovieTag, Tag, Movies } = require('../models');


class MoviesTagsControllers {
    static async create (req, res, next) {
        let { MovieId, TagId } = req.body;
        const dataMovieTag = await MovieTag.findOne({
            where: {
                MovieId: MovieId,
                TagId: TagId
            }
        });

        if(dataMovieTag) {
            res.status(400).json({
                status: "failed",
                message: "Movie have already the Tag, please input another"
            })
        } else {const createTagMovie = await MovieTag.create({
            MovieId: MovieId,
            TagId: TagId
        })}
        res.status(201).json({
            status: "success",
            message: 'movies tags models has been created'
        });
        
    };

    static async getAllMoviesByTags(req, res, next) {
        let { page } = req.query;

        if(!page) {
            page = 1
        }
        const allMovies = await Movies.findAll({
                include: [
                    {
                        model: MovieTag,
                        include: [{
                            model: Tag,
                            attributes: ["name"]
                        }],
                    }
                ],
                offset: 15*(page-1),
                limit: 15
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
                                model: MovieTag,
                                attributes : { exclude : ["id", "MovieId", "updatedAt", "createdAt"]},
                                where: {
                                    TagId: TagId
                                }, include: Tag,
                            }
                        ],
                offset: 15*(page-1),
                limit: 15
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
                                model: MovieTag,
                                where: {
                                    MovieId: MovieId
                                }, include: Tag,
                            }
                        ],
                offset: 15*(page-1),
                limit: 15
            });
        res.status(200).json(dataTagMovie)
    }; 

    static async update (req, res, next){
        let { id } = req.params;
        let { MovieId, TagId } = req.body;
        const dataMovieTag = await MovieTag.findOne({where: {id: id}});

        if(!dataMovieTag || dataMovieTag == undefined) {
            res.status(400).json({
                status: "failed",
                message: `Movies tags id ${id} has not found`
            })
        } else if (!MovieId || !TagId) {
            res.status(400).json ({
                status: "failed",
                message: "Please input the required"
            })
        } else {
            const createUpdateTag = await MovieTag.update({
                MovieId: MovieId,
                TagId: TagId
            }, {
                where: {
                    id: id
                }
            })
        }
        res.status(200).json({
            status: "Success",
            message: `Movie id ${MovieId} has been updated`
        })
    };
        
    

    static async delete (req, res, next) {
        let { id } = req.params;
        const idMovieTag = await MovieTag.findOne({where: {id:id}});

        if(!idMovieTag) {
            res.status(400).json({
                status: "failed",
                message: `Movies tags id ${id} has not found`
            })
        } else {
            MovieTag.destroy({
                where : {
                    id: id
                }
            })
        }
        res.status(200).json({ 
            status: "success",
            message: `Movies tags id ${id} has been deleted`
        })
    };
}

module.exports = MoviesTagsControllers;