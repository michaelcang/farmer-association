const express = require('express');
const router = express.Router();
const models = require('./../models');

// farmers homepage
router.get('/', function(req, res) {
  if (req.session.username) {
    res.send('farmers page');
  } else {
    res.redirect('/');
  }
});

module.exports = router;
