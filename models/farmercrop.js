'use strict';
module.exports = (sequelize, DataTypes) => {
  var FarmerCrop = sequelize.define('FarmerCrop', {
    farmerId: DataTypes.INTEGER,
    cropId: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {});
  FarmerCrop.associate = function(models) {
    // associations can be defined here
  };
  return FarmerCrop;
};