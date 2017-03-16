
var order = require('../../app/controllers/order');
var queryBuilder = require('../../app/helper/queryBuilder');

module.exports = function (app) {
    app.route('/api/order')
        .get(queryBuilder.queryBuilder, order.list)
        .post(order.create);

    app.route('/api/order/:orderId')
        .get(order.read)
        .patch(order.update)
        //.delete(measurement.delete);

    app.param('orderId', order.getById);
}