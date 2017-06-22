
 var company = require('../../app/controllers/company');
var queryBuilder = require('../../app/helper/queryBuilder');

//var customer = require('../../app/controllers/customer');
module.exports = function (app) {

  app.route('/api/company')
  .get(company.getData)
  .post(company.create);

  app.route('/api/company/:Initial')
  .get(company.getById)
//app.param('comapnyId', company.getById);
}
