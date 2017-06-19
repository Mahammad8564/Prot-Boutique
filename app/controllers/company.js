var models = require('../models');
var Company = models.Company;
var Customer = models.Customer;
//var User = models.User;
//var CustomerMeasurement = models.CustomerMeasurement;
var Sequelize = require('sequelize');
var _ = require('underscore');
//get Error Message Consized
var getErrorMessage = function (err) {
    if (err.errors) {
        for (var errorName in err.errors) {
            if (err.errors[errorName].message) {
                return err.errors[errorName].message;
            }
        }
    } else {
        return 'Unknown Server Error';
    }
}



exports.getById = function (req,res,next) {

  console.log("jljljsldjlkjlj::::::");
  Company.findOne({
      where: { id: req.params.id },
  }).then(function(obj){
    console.log(obj);
  })

  .catch(function (err) {
        console.log(err);
        res.status(400).send({ message: getErrorMessage(err) });
    });
}
