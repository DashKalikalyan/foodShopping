const {Order}=require('../models/order');

const getOrderDetails=(req, res) => {
    Order.findOne({_id:req.params.id}).then((order) => {
        if(!order) {
            res.status(404).send(order);
        } else {
            res.send(order);
        }
    }, (err) => {
        res.status(400).send(err);
    });
};

module.exports = {getOrderDetails};