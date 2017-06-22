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

  console.log("jljljsldjlkjlj::::::"+req.params.Initial);
  Company.findOne({
    where:{InitialName:req.params.Initial}
  }).then(function(obj){
    // res.json(obj);
    return res.json(obj);
    //    console.log(obj);
  })

  .catch(function (err) {
        console.log(err);
        res.status(400).send({ message: getErrorMessage(err) });
    });
}

exports.getData = function (req,res,next) {

  Company.findAll({

  }).then(function(obj){
    // res.json(obj);

    return res.json(obj);
    //    console.log(obj);
  })

  .catch(function (err) {
        console.log(err);
        res.status(400).send({ message: getErrorMessage(err) });
    });
}

exports.create = function (req, res) {
        Company.create(req.body).then(function (obj) {
        if (!obj) {
            return res.send({ message: "Error Occured while updataing" });
        }
        var objData = obj.get({
            plain: true
        });
        return res.json(objData);
    }).catch(function (error) {
        console.log(error);
        res.status(400).send({ message: getErrorMessage(error) });
    });
}
