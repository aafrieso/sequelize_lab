'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Dog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Dog.init({
    name: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Dog',
  });
  return Dog;
};

class Dog extends Model {
  static associate(models) {

    // define association here
    Dog.hasMany(models.Feeding, {
      foreignKey: 'dogId',
      as: 'feedings'
    })

  }
}

class Feeding extends Model {
  static associate(models) {
    
    // define association here
    Feeding.belongsTo(models.Dog, {
      foreignKey: 'dogId',
    })

  }
}