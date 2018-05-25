const express = require('express');
const router = express.Router();
const models = require('./../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;

// Crops list
router.get('/', function(req, res) {
      models.Crop.findAll({order: [['id', 'ASC']]})
      .then(crops => {
        res.render('crops/index', {crops});
      })
      .catch(error => {
        console.log(error);
      });
  });

// crop adding
router.post('/:id/crops', function (req, res) {
    
})

// crop edit price
router.get('/:id/editprice', function(req, res) {
    let id = req.params.id
    models
    .Crop
    .findOne({
      where: {id}
    })
    .then(crop => {
      res.render('crops/editprice',{crop})
    })
    .catch(function error () {
      console.log(error)
    })
})

router.post('/:id/editprice', function(req, res) {
  let id = req.params.id
    models
    .Crop
    .update(req.body, {
      where: {id}
    })
    .then(() => {
      res.redirect('/crops')
    })
    .catch(function error () {
      console.log(error)
    })
})

// crops removal
router.get('/:id/delete', function(req, res) {
    let id = req.params.id;
    models.Crop.destroy({where: {id}})
    .then(() => {
      res.redirect('/crops');
    });
  });


module.exports = router;