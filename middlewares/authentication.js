const bcrypt = require('bcrypt');
const models = require('./../models');

module.exports = function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  models.Farmer
  .findOne({where: {username}})
  .then(farmer => {
    if (farmer) {
      let isCorrect = bcrypt.compareSync(password, farmer.password);
      if (isCorrect) {
        req.session.username = username;
        next();
      } else {
        res.render('login', {msg: 'Username / password wrong'});
      }
    } else {
      res.render('login', {msg: 'Username / password wrong'});
    }
  });
};
