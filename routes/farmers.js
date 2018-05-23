const express = require('express');
const router = express.Router();
const models = require('./../models');

// farmers homepage
router.get('/', function(req, res) {
  if (!req.session.username) {
    models
    .Farmer
    .findAll()
    .then(farmers => {
      res.render('farmers/home', {farmers});
    });
  } else {
    res.render('home', {msg: 'You are not logged in'});
  }
});

// farmers details
router.get('/:id', function(req, res) {
  let id = req.params.id;
  models
  .Farmer
  .findOne({
    where: {id},
  })
  .then(farmer => {
    farmer
    .getCrops()
    .then(crops => {
      res.render('farmers/details', {farmer, crops});
    });
  });
});

// farmers personal edit
router.get('/:id/edit-data', function(req, res) {
  let id = req.params.id;
  models
  .Farmer
  .findOne({where: {id}})
  .then(farmer => {
    res.render('farmers/edit-data', {farmer});
  });
});

router.post('/:id/edit-data', function(req, res) {
  let id = req.params.id;
  let updated = {};
  updated.name = req.body.name;
  updated.area = req.body.area;
  updated.money = req.body.money;
  if (req.body.address !== '') {
    updated.address = req.body.address;
  }
  models
  .Farmer
  .update(updated, {
    where: {id}
  }).then(() => {
    res.redirect('/farmers');
  });
});

module.exports = router;
