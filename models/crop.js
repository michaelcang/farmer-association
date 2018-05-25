'use strict';
module.exports = (sequelize, DataTypes) => {
  var Crop = sequelize.define('Crop', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please enter a crop name'
        },
        isCropUnique: (name, cb) => {
          Crop.findOne({
            where: {title: 'name'}
          }).then(crop => {
            if (crop) {
              cb ('We already have that crop in our database')
            } else {
              cb ()
            }
          }) 
        }
      }
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Input a value (number) greater than 0 to assign this crop's price"
        },
        min: {
          args: 1,
          msg: 'Price of this crop must be greater than 0'
        }
      }
    },
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
    models.Crop.
    belongsToMany(
      models.Farmer, {
        through: 'FarmerCrop',
        foreignKey: {
          name: 'cropId',
          unique: false}});
    models.Crop.hasMany(models.FarmerCrop, {foreignKey: {name: 'cropId'}});
    models.Crop.hasMany(models.History, {foreignKey: {name: 'cropId', unique: false}});
  };
  return Crop;
};
