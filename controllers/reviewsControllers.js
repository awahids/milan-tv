const Reviews = require('../models/review');
const Users = require('../models/users');
const Movies = require('../models/movies')
const Joi = require('joi');

const sequelize = require('sequelize')

module.exports = {
    postReview: async (req, res) => {
        const body = req.bod
        const moviesId = req.params.id
        const user = req.Users

        try {
            const schema = Joi.object({
                rating: Joi.number().min(1).max(5).required(),
                comment: Joi.string(),
                usersId: Joi.number(),
                moviesId: Joi.number()
            })

            const { error } = schema.validate({ ...body }, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    status: "failed",
                    message: "Bad Request",
                    errors: error["details"][0]["message"]
                })
            }

            const checkUsers = await Reviews.findOne({
                where: {
                    usersId: body.usersId,
                    moviesId: body.moviesId
                }
            })

            if (checkUsers) {
                return res.status(200).json({
                    status: "Failed",
                    message: "You already add review"

                });
            } else if (!checkUsers) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Sorry, You Have to Login First",
                })
            }

            const newReview = await Reviews.create({
                rating: body.rating,
                comment: body.comment,
                usersId : user.id,
                moviesId :body.moviesId
            });

            const allRating = await Reviews.findAll({
                where : {
                    moviesId : moviesId
                }
            })

            let ratingAverage = allRating.map(e => {
                return e.dataValues.rating
            })

            ratingAverage.push(body.rating)

            const sum = ratingAverage.reduce((a,b) => a+b)
            const ratingFix = Math.round(sum / ratingAverage.length)

            const newMovie = await Movies.update({
                ...body,
                rating: ratingFix,
            }, {
                where: {
                    moviesId : mov
                }
            })

            if (!newMovie[0]) {
                return res.status(400).json({
                    status: "failed",
                    message: "Unable to update database",
                });
            }

            return res.status(200).json({
                status: "Successs",
                message: " Successfully saved to database",
                data: newReview
            })
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },

    getReviews: async (req, res) => {
        try {
            const content = await Reviews.findAll({
                attributes: {
                    exclude: ["updatedAt", "createAt"]
                },
                // include: [
                //     {
                //         as: "user",
                //         model: Users,
                //         attributes: ['fullname', 'img']
                //     },
                // ],
                // offset: (15 * (page - 1)) + 1,
                // limit: 15
            })
            if (!content) {
                return res.status(200).json({
                    status: "Failed",
                    message: "Data Not Found",
                    data: []
                })
            }

            return res.status(200).json({
                status: "Success",
                message: "Successfully retrieved review",
                data: content
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },

    getReview: async (req, res) => {
        try {
            const content = await Reviews.findOne({
                where: {
                    id: req.params.id
                },
                attributes: {
                    exclude: ["updatedAt", "createAt"]
                },
                // include: [
                //     {
                //         as: "user",
                //         model: Users,
                //         attributes: ['fullname', 'img']
                //     },
                // ],
            })
            if (!content) {
                return res.status(200).json({
                    status: "Failed",
                    message: "Data Not Found",
                    data: []
                })
            }

            return res.status(200).json({
                status: "Success",
                message: "Successfully retrieved review",
                data: content
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            })
        }
    },

    updateReview : async (req, res) => {
        const body = req.body
        const id = req.params.id
        try {
            const schema = Joi.object({
                rating: Joi.number().min(1).max(5).required(),
                comment: Joi.string()
            })

            const {error} = schema.validate({ ...body }, { abortEarly: false });

            if (error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : check.error["details"].map(({ message }) => message )
                })
            }
            
            const reviewUpdate = await Movies.update(
                { where : { id } },

                {
                    rating: body.rating,
                    comment: body.comment
                }
            ); 

            if(!reviewUpdate[0]) {
                return res.status(400).json({
                    status : "failed",
                    message : "You Didn't Change Anything"
                });
            }
            
            return res.status(200).json({
                status : "success",
                message : "Succesfully update the Movie",
                data : data
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    deleteReview: async (req, res) => {
        const id = req.params.id
        try {
            const remove = await Reviews.destroy({
                where: {
                    id
                }
            }
            )
            if (!remove) {
                return res.status(400).json({
                    status: "Failed",
                    message: "Unable to Delete the Data"
                })
            }
            return res.status(200).json({
                status: "Success",
                message: "Deleted to Successfully"
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                status: "Failed",
                message: "Internal Server Error"
            });
        }
    }
}
