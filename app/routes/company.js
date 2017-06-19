
 var company = require('../../app/controllers/company');
var queryBuilder = require('../../app/helper/queryBuilder');

//var customer = require('../../app/controllers/customer');
module.exports = function (app) {
    app.route('/api/company/:id')
        .get(company.getById);

//app.param('comapnyId', company.getById);
}
