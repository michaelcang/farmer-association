'use strict';
module.exports = (sequelize, DataTypes) => {
  var FarmerCrop = sequelize.define('FarmerCrop', {
    farmerId: DataTypes.INTEGER,
    cropId: DataTypes.INTEGER,
    size: DataTypes.INTEGER,
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
    models.FarmerCrop.belongsTo(models.Crop, {foreignKey: 'cropId'});
  };
  return FarmerCrop;
};
