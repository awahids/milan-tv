'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    //   // Movies.hasMany(models.Genre);
      
    // }
  };
  Movies.init({
    title: DataTypes.STRING,
    poster: DataTypes.STRING,
    sinopsys: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    trailer: DataTypes.STRING,
    release_date: DataTypes.STRING,
    director: DataTypes.STRING,
    featured_song: DataTypes.STRING,
    budget: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Movies',
  });

  Movies.associate = function(models) {
    Movies.hasMany(models.MovieGenre);
    
    Movies.hasMany(models.MovieTag)
  }
  return Movies;
};