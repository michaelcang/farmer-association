const models = require('./../models');

module.exports = function(req, res, next) {
  let id = req.params.id;
  models.Farmer.findOne({where: {id}})
  .then(farmer => {
    if (req.session.username === farmer.username) {
      next();
    } else {
      models.Farmer.findAll({order: [['id', 'ASC']]})
      .then(farmers => {
        res.render('farmers/home', {farmers, msg: 'You don\'t have access'});
      });
    }
  });
};
