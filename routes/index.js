const express = require('express');
const router = express.Router();
const models = require('./../models');
const authenticator = require('./../middlewares/authentication');

// homepage
router.get('/', function(req, res) {
  res.render('home');
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
    res.redirect('/login');
  })
  .catch((error) => {
    console.log(error);
    res.redirect('/register');
  });
});

// login
router.get('/login', function(req, res) {
  res.render('login');
});

router.post('/login',
  authenticator,
  function(req, res) {
    res.redirect('/farmers');
  });

module.exports = router;
