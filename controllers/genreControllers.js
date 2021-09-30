const { Genre } = require('../models');

class genresController{

    static async create (req, res, next) {
        let { name } = req.body;
        const genreName  = await Genre.findOne({ where: {name: name}});

        if(!name) {
            res.status(400).json({ 
                status: "failed",
                message: "Please put Genre name",
            });
        }
        if(genreName) {
            res.status(400).json({ 
                status: "failed",
                message: "Genre already been used, please add another Genre",
            });
        };

        
        const createGenre = await Genre.create({
            name: name
        })
        res.status(201).json(createGenre);
    };

    static getAll (req, res, next) {
        Genre.findAll()
        .then(data => {
            res.status(200).json({ 
                Genre: data
            })
        })
        .catch(next)
    };

    static update (req, res, next) {
        let { id } = req.params;
        let { name } = req.body;

        Genre.update({
            name: name
        },{
            where: {
                id: id
            }
        })
        .then(data => {
            if (!data) {
                throw { message: `genres id ${id} is not found `}
            } else {
                res.status(200).json({ message: `genres id ${id} has been updated`})
            };
        });
    };

    static async delete (req, res, next) {
        let { id } = req.params;
        let dataGenre = await Genre.findOne({ where: {id:id}})

        if(!dataGenre) {
            res.status(400).json({ 
                status: "fail",
                message: `genres id ${id} is not found`
            })
        };

        const deleteGenre = await Genre.destroy({
            where : {
                id: id
            }
        });
         res.status(200).json({
             status: "success", 
             message: `genres ${id} has been deleted`
            });
    };    
};

module.exports = genresController;