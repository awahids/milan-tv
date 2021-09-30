const { Tag } = require('../models');

class tagsController{

    static async create (req, res, next) {
        let { name } = req.body;
        const tagName  = await Tag.findOne({ where: {name: name}});

        if(!name) {
            res.status(400).json({ 
                status: "failed",
                message: "Please put Tag name",
            });
        }
        if(tagName) {
            res.status(400).json({ 
                status: "failed",
                message: "Tag already been used, please add another Tag",
            });
        };

    const createTag = Tag.create({
            name: name
        })
        .then(data => {
            res.status(201).json(createTag);
        })
        .catch(next);
    };

    static getAll (req, res, next) {
        Tag.findAll()
        .then(data => {
            res.status(200).json({ 
                Tag: data
            })
        })
        .catch(next)
    };

    static update (req, res, next) {
        let { id } = req.params;
        let { name } = req.body;

        Tag.update({
            name: name
        },{
            where: {
                id: id
            }
        })
        .then(data => {
            if (!data) {
                throw { message: `Tag id ${id} is not found `}
            } else {
                res.status(200).json({ message: `Tag id ${id} has been updated`})
            };
        });
    };

    static delete (req, res, next) {
        let { id } = req.params;

        Tag.destroy({
            where : {
                id: id
            }
        })
        .then(data=> {
            if (!data) {
                throw { message: `Tag id ${id} is not found` }
            } else {
                res.status(200).json({ message: `Tag ${id} has been deleted`})
            };
        });
    };
}

module.exports = tagsController;