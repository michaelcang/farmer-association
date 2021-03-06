const express = require('express');
const router = express.Router();
const models = require('./../models');
const sequelize = require('sequelize');
const Op = sequelize.Op;
const checkUsername = require('./../middlewares/checkUsername');

// farmers homepage
router.get('/', function(req, res) {
  if (req.session.username) {
    models
    .Farmer
    .findAll({order: [['id', 'ASC']]})
    .then(farmers => {
      res.render('farmers/home', {farmers, msg: ''});
    })
    .catch(error => {
      console.log(error);
    });
  } else {
    res.render('home', {msg: 'You are not logged in'});
  }
});

// farmers details
router.get('/:id',
  checkUsername,
  function(req, res) {
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
      res.render('farmers/details', {farmer, crops, msg: ''});
    })
    .catch(error => {
      console.log(error);
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
  })
  .catch(error => {
    console.log(error);
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
  })
  .then(() => {
    res.redirect('/farmers');
  })
  .catch(error => {
    console.log(error);
  });
});

// farmer edit crops
router.get('/:id/edit-crops', function(req, res) {
  let id = req.params.id;
  models
  .Farmer
  .findOne({where: {id}})
  .then(farmer => {
    farmer.getCrops({order: [['id', 'ASC']]})
    .then(farmerCrops => {
      let oldCrop = [];
      for (let i = 0; i < farmerCrops.length; i++) {
        oldCrop.push(farmerCrops[i].id);
      }
      models
      .Crop
      .findAll({where: {id: {[Op.notIn]: oldCrop}}})
      .then(newCrops => {
        res.render('farmers/edit-crops', {farmer, farmerCrops, newCrops, msg: ''});
      })
      .catch(error => {
        console.log(error);
      });
    });
  });
});

// farmer edit crops by id
router.get('/:id/edit-crops/:cropId', function(req, res) {
  let farmerId = req.params.id;
  let cropId = req.params.cropId;
  models
  .Farmer
  .findOne({where: {id: farmerId}})
  .then(farmer => {
    models
    .FarmerCrop
    .findOne({
      where: {farmerId, cropId},
      include: [{model: models.Crop}]
    })
    .then(farmerCrop => {
      let crop = farmerCrop.Crop;
      res.render('farmers/edit-a-crop', {farmer, farmerCrop, crop});
    });
  });
});

router.post('/:id/edit-crops/:cropId', function(req, res) {
  let farmerId = req.params.id;
  let cropId = req.params.cropId;
  let newSize = req.body.newSize;
  models
  .Farmer
  .findOne({where: {id: farmerId}})
  .then(farmer => {
    models
    .FarmerCrop
    .findOne({
      where: {farmerId, cropId},
      include: [{model: models.Crop}]
    })
    .then(farmerCrop => {
      let totalSizeChange = farmerCrop.size - newSize;
      let totalMoneyChange = farmerCrop.Crop.cost * totalSizeChange;
      farmerCrop.size = newSize;
      farmer.area += totalSizeChange;
      farmer.money += totalMoneyChange;
      let action = 'Test';
      if (totalSizeChange < 0) {
        action = 'Add';
      } else if (totalSizeChange > 0) {
        action = 'Reduce';
      } else {
        action = 'No change';
      }
      if (farmer.area < 0) {
        farmer
        .getCrops()
        .then(crops => {
          res.render('farmers/details', {farmer, crops, msg: 'You don\'t have sufficient land'});
        });
      } else if (farmer.money < 0) {
        farmer
        .getCrops()
        .then(crops => {
          res.render('farmers/details', {farmer, crops, msg: 'You don\'t have sufficient money'});
        });
      } else {
        farmerCrop.save();
        farmer.save().then(() => {
          models.History.create({
              farmerId,
              cropId,
              date: new Date(),
              action,
              price: farmerCrop.Crop.cost,
              area: Math.abs(totalSizeChange)
            })
            .then(() => {
              res.redirect(`/farmers/${farmerId}/edit-crops`);
            });
        });
      }
    })
    .catch(error => {
      console.log(error);
    });
  });
});

// farmer add crops
router.post('/:id/add-crop', function(req, res) {
  let farmerId = req.params.id;
  let cropId = req.body.cropId;
  let newCropsArea = req.body.size;
  models
  .Farmer
  .findOne({where: {id: farmerId}})
  .then(farmer => {
    models
    .Crop
    .findOne({where: {id: cropId}})
    .then(crop => {
      let newArea = farmer.area - newCropsArea;
      let totalCost = crop.cost * newCropsArea;
      if (newArea >= 0) {
        farmer.area = newArea;
        farmer.money -= totalCost;
        if (farmer.money >= 0) {
          models
          .FarmerCrop
          .create({
            farmerId, cropId, size: newCropsArea
          })
          .then(() => {
            farmer.save();
            models.History.create({
              farmerId,
              cropId,
              date: new Date(),
              action: 'New',
              price: crop.cost,
              area: Math.abs(newCropsArea)
            })
            .then(() => {
              res.redirect(`/farmers/${farmerId}/edit-crops`);
            });
          })
          .catch(error => {
            console.log(error);
          });
        } else { // not enough money
          farmer
          .getCrops()
          .then(crops => {
            res.render('farmers/details', {farmer, crops, msg: 'You don\'t have sufficient money'});
          });
        }
      } else { // not enough land
        farmer
        .getCrops()
        .then(crops => {
          res.render('farmers/details', {farmer, crops, msg: 'You don\'t have sufficient land'});
        });
      }
    });
  });
});

// farmer remove crops
router.get('/:id/remove-crop/:cropId', function(req, res) {
  let farmerId = req.params.id;
  let cropId = req.params.cropId;
  models
  .FarmerCrop
  .find({
    where: {farmerId, cropId},
    include: [{model: models.Crop}]
  })
  .then(farmerCrop => {
    let addedArea = farmerCrop.size;
    let totalAddMoney = farmerCrop.Crop.cost * addedArea;
    models
    .FarmerCrop
    .destroy({where: {farmerId, cropId}})
    .then(() => {
      models
      .Farmer
      .findOne({where: {id: farmerId}})
      .then(farmer => {
        farmer.area += addedArea;
        farmer.money += totalAddMoney;
        farmer.save()
        .then(() => {
          models.History.create({
            farmerId,
            cropId,
            date: new Date(),
            action: 'Remove',
            price: farmerCrop.Crop.cost,
            area: Math.abs(addedArea)
          })
          .then(() => {
            res.redirect(`/farmers/${farmerId}/edit-crops`);
          });
        });
      })
      .catch(error => {
        console.log(error);
      });
    });
  });
});

// farmer history
router.get('/:id/history',
  checkUsername,
  function(req, res) {
  let id = req.params.id;
  models
  .History
  .findAll({
    where: {farmerId: id},
    include: [{model: models.Crop},{model: models.Farmer}]
  })
  .then(historyDetails => {
    res.render('farmers/history', {historyDetails});
  });
});

// farmer delete
router.get('/:id/delete',
  checkUsername,
  function(req, res) {
    let id = req.params.id;
    models.Farmer.destroy({where: {id}})
    .then(() => {
      res.redirect('/farmers');
    });
  });

module.exports = router;
