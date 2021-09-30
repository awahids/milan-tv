//const { check } = require('express-validator');
const { Movies } = require('../models')
require('dotenv').config();
const Joi = require('joi').extend(require('@joi/date'))
const sequelize = require('sequelize')

module.exports = {
    postMovie : async (req, res) => {            //<---- Register data movies include nge create data nya ke Table
        const body = req.body
        const file = (req.file) ? req.file : ""
        const {title} = req.body
        try {
            const schema = Joi.object({
                title : Joi.string().required(),
                poster : Joi.string(),
                sinopsys : Joi.string().required(),
                rating : Joi.number().max(5),
                trailer : Joi.string(),
                release_date : Joi.date().format("YYYY-M-D"),
                director : Joi.string(),
                budget : Joi.number()
            })

            const check = schema.validate({
                ...body,
                }, { abortEarly : false });

            if (check.error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : check.error["details"].map(({ message }) => message )
                })
            }
            
            const checkmovie = await Movies.findOne({
                where: {
                    title: title
                }
            })

            if(checkmovie) {
                return res.status(400).json({
                    status: "fail",
                    message: "Cant post same movie",
                });
            }

            const dataMovie = await Movies.create({
                title : body.title,
                poster : file.path,
                sinopsys : body.sinopsys,
                rating : body.rating,
                trailer : body.trailer,
                release_date : body.release_date,
                director : body.director,
                budget : body.budget + " USD"
            });

            return res.status(200).json({
                        status: "success",
                        message: "Succesfully input new Movie",
                        data : dataMovie
                    });
            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
            status: "failed",
            message: "Internal Server Error",
            });
        }
    },

    getOneMovie : async (req, res) => {
        const id = req.params.id
        try {
            const moviesData = await Movies.findOne({ where : { id } }); 
            
            //check jika data admin yang dicari sesuai Id ada nilai nya atau tidak
            if(!moviesData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved data Movie",
                data: moviesData
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    getAllmovies : async (req, res) => {
        const limit = 15;
        const page = parseInt(req.params.page);
        const offset = limit * (page - 1);

        try {
            const moviesData = await Movies.findAll({
                limit : limit,
                offset : offset,
                order : [["createdAt", "DESC"]]
            }); 
            
            //check jika data admin sudah ada nilai/isi nya di table
            if(!moviesData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }

            const count = await Movies.count({ distinct: true });
            let next = page + 1;
            if (page * limit >= count) {
                next = 0;
            }

            return res.status(200).json({
                status : "success",
                message : "Succesfully retrieved All data movies",
                data: moviesData,
                meta : {
                    page: page,
                    next: next,
                    total: count
                }
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    updateMovies : async (req, res) => {
        const body = req.body
        const id = req.params.id
        try {
            const schema = Joi.object({
                title : Joi.string(),
                poster : Joi.string(),
                sinopsys : Joi.string(),
                trailer : Joi.string(),
                release_date : Joi.date().format("YYYY-M-D"),
                director : Joi.string(),
                budget : Joi.number()
            })

            const { error } = schema.validate(
                {
                    ...body
                },
                { abortEarly : false }
            )

            if (error) {
                return res.status(400).json({
                    status : "failed",
                    message : "Bad Request",
                    errors : error["details"].map(({ message }) => message )
                })
            }

            if(body.title) {
                const checktitle = await Movies.findOne({where : {title : body.title}})
                if(checktitle) {
                        return res.status(400).json({
                            status : "failed",
                            message : "Unable to input data"
                        });
                }
            }
            
            const moviesUpdate = await Movies.update(
                {
                    ...body,
                    [req.file ? "poster" : null]: req.file ? req.file.path : null,
                    budget : body.budget + " USD"
                },
                { where : { id } }
            ); 

            if(!moviesUpdate[0]) {
                return res.status(400).json({
                    status : "failed",
                    message : "Unable to input data"
                });
            }

            //ngambil data yang telah di update supaya muncul datanya di postman
            const data = await Movies.findOne({
                where : { id }
            })
            
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

    deletemovies : async (req, res) => {
        const id = req.params.id
        try {
            const moviesData = await Movies.destroy({ where : { id } }); 
            if(!moviesData) {
                return res.status(400).json({
                    status : "failed",
                    message : "Data not found"
                });
            }
            return res.status(200).json({
                status : "success",
                message : "Deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    },

    searchMovies : async (req, res) => {
        const keywords = req.params.keyword
        try {
            const datamovie = await Movies.findAll({
                where : {
                    title : {
                        [sequelize.Op.iLike] : "%" + keywords + "%"
                    } 
                },
                limit : 10
            })

            return res.status(200).json({
                status : "success",
                messsage : "Successfully retrieve data movie",
                result : datamovie
            })
        } catch (error) {
            return res.status(500).json({
                status : "failed",
                message : "Internal Server Error"
            })
        }
    }
}