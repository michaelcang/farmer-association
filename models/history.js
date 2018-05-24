'use strict';
module.exports = (sequelize, DataTypes) => {
  var History = sequelize.define('History', {
    farmerId: DataTypes.INTEGER,
    cropId: DataTypes.INTEGER,
    action: DataTypes.STRING,
    date: DataTypes.DATE,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {});
  History.associate = function(models) {
    // associations can be defined here
  };
  return History;
};