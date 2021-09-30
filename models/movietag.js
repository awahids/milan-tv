'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieTag extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  };
  MovieTag.init({
    MovieId: DataTypes.INTEGER,
    TagId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MovieTag',
  });
  MovieTag.associate = function(models) {
    MovieTag.belongsTo(models.Movies, {
      foreignKey: "MovieId"
    });

    MovieTag.belongsTo(models.Tag, {
      foreignKey: "TagId"
    });
  }
  return MovieTag;
};