'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Feeding extends Model {
    static associate(models) { }
  }

  Feeding.init({
    name: DataTypes.STRING,
    meal: {
      type: DataTypes.ENUM("Breakfast", "Lunch", "Dinner"),
      defaultValue: 'Breakfast'
    },
    dogId: {
      type: DataTypes.INTEGER,
			allowNull: false,
      onDelete: 'CASCADE',
      references: {
        model: 'Dogs',
        key: 'id'
      }
    },
  }, {
    sequelize,
    modelName: 'Feeding',
  });

  return Feeding;
};