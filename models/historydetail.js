'use strict';
module.exports = (sequelize, DataTypes) => {
  var HistoryDetail = sequelize.define('HistoryDetail', {
    historyId: DataTypes.INTEGER,
    cropId: DataTypes.INTEGER,
    action: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    }
  }, {});
  HistoryDetail.associate = function(models) {
    // associations can be defined here
  };
  return HistoryDetail;
};