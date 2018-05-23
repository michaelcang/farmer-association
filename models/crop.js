'use strict';
module.exports = (sequelize, DataTypes) => {
  var Crop = sequelize.define('Crop', {
    name: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {});
  Crop.associate = function(models) {
    // associations can be defined here
  };
  return Crop;
};