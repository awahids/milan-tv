'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MovieGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
      
    // }
  };
  MovieGenre.init({
    MovieId: DataTypes.INTEGER,
    GenreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MovieGenre',
  });
  MovieGenre.associate = function(models) {
    MovieGenre.belongsTo(models.Movies, {
      foreignKey: "MovieId"
    });

    MovieGenre.belongsTo(models.Genre, {
      foreignKey: "GenreId"
    });
  }
  return MovieGenre;
};