
 var company = require('../../app/controllers/company');
var queryBuilder = require('../../app/helper/queryBuilder');

//var customer = require('../../app/controllers/customer');
module.exports = function (app) {

    app.route('/api/company/:Initial')
        .get(company.getById)

    app.route('/api/company')
            .post(company.create);

//app.param('comapnyId', company.getById);
}
