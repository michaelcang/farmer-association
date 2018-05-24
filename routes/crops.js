const express = require('express');
const router = express.Router();
const models = require('./../models');

// crop list
router.get('/', function(req, res) {
    res.send('crops is in here');
});

module.exports = router;


// crops list page
router.get('/crop', function (req, res) {
    res.render('crop');
  });