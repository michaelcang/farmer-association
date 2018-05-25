'use strict';
module.exports = (sequelize, DataTypes) => {
  var History = sequelize.define('History', {
    farmerId: DataTypes.INTEGER,
    cropId: DataTypes.INTEGER,
    action: DataTypes.STRING,
    date: DataTypes.DATE,
    area: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
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
    models.History.belongsTo(models.Farmer, {foreignKey: 'farmerId', unique: false});
    models.History.belongsTo(models.Crop, {foreignKey: 'cropId', unique: false});
  };
  return History;
};