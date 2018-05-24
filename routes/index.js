const express = require('express');
const router = express.Router();
const models = require('./../models');
const authenticator = require('./../middlewares/authentication');

// homepage
router.get('/', function(req, res) {
  res.render('home', {msg: ''});
});

// register
router.get('/register', function(req, res) {
  res.render('register', {
    msg: ''
  });
});

router.post('/register', function(req, res) {
  models
  .Farmer
  .create(req.body)
  .then(() => {
    res.redirect('/');
  })
  .catch((error) => {
    console.log(error);
    res.render('register', {msg: error});
  });
});

// login
router.get('/login', function(req, res) {
  res.render('login', {msg: ''});
});

router.post('/login',
  authenticator,
  function(req, res) {
    res.redirect('/farmers');
  });

// temp crops table
router.get('/crops', function(req, res) {
  models.Crop.findAll()
  .then(crops => {
    res.render('crops', {crops});
  });
});

module.exports = router;
