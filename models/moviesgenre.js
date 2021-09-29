'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MoviesGenre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  MoviesGenre.init({
    GenreId: DataTypes.INTEGER,
    movieId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MoviesGenre',
  });
  MoviesGenre.associate = function(models) {
    MoviesGenre.belongsTo(models.movies, {
      foreignKey: "movieId"
    });

    MoviesGenre.belongsTo(models.Genre, {
      foreignKey: "GenreId"
    })
  };
  return MoviesGenre
};