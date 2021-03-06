'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var Farmer = sequelize.define('Farmer', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please fill the username'
        },
        isUserUnique: (username, callback) => {
          Farmer.findOne({
            where: {username}
          }).then(farmer => {
            if (farmer) {
              callback('Username is used');
            } else {
              callback();
            }
          });
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please fill the password'
        },
        len: {
          args: [8],
          msg: 'Password minimum 8 characters'
        }
      }
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    area: DataTypes.INTEGER,
    money: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {});
  Farmer.associate = function(models) {
    models.Farmer
    .belongsToMany(
      models.Crop, {
        through: 'FarmerCrop',
        foreignKey: {
          name: 'farmerId',
          unique: false}});
    models.Farmer.hasMany(models.History, {foreignKey: {name: 'farmerId', unique: false}});
  };
  Farmer.beforeCreate((farmer, options) => {
    let salt = bcrypt.genSaltSync(7);
    let hash = bcrypt.hashSync(farmer.password, salt);
    farmer.password = hash;
  });
  Farmer.prototype.nameWithFarmer = function(){
    return 'Farmer ' + this.name;
  };
  return Farmer;
};
