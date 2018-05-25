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

// crops list page
router.get('/crop', function (req, res) {
  res.render('crop', {msg: ''});
});

router.post('/crop', function (req, res) {
  res.render('crop', {msg: ''});
});

module.exports = router;
