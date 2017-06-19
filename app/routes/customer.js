
var customer = require('../../app/controllers/customer');
var queryBuilder = require('../../app/helper/queryBuilder');

module.exports = function (app) {
    app.route('/api/customer')
        .post(customer.create);

    app.route('/api/customer/:customerId')
        .get(customer.read)
        .patch(customer.update)
        //.delete(measurement.delete);
        app.route('/api/getDetail/:id')
            .get(queryBuilder.queryBuilder, customer.list)


    app.param('customerId', customer.getById);
}
