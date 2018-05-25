const express = require('express');
const router = express.Router();
const models = require('./../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

// Crops list
router.get('/', function(req, res) {
      models
      .Crop
      .findAll({order: [['id', 'ASC']]})
      .then(crops => {
        res.render('crops', {crops});
      })
      .catch(error => {
        console.log(error);
      });
  });
  

module.exports = router;