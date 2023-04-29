'use strict';

// Define a model for role table
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('role', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    },
    modified: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false
    }
  }, {
    tableName: 'role'
  });
  // Adding a class level method.
  Model.associate = function (models) {
    this.employee = this.hasMany(models.employee);
  };
  return Model;
};