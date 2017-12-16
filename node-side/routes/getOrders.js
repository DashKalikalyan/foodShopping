const {Order}=require('../models/order');

const getOrders=(req, res) => {
    Order.find().then((orders) => {
        res.send(orders);
    }, (e) => {
        res.status(400).send(e);
    });
};

module.exports = {getOrders};