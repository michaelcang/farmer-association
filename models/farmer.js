'use strict';
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  var Farmer = sequelize.define('Farmer', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
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
  }, {
    hooks: {
      beforeCreate: (farmer, options) => {
        let salt = bcrypt.genSaltSync(7);
        let hash = bcrypt.hashSync(farmer.password, salt);
        farmer.password = hash;
      }
    }
  });
  Farmer.associate = function(models) {
    // associations can be defined here
  };
  return Farmer;
};
