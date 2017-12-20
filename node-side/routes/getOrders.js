const {Order}=require('../models/order');

const getOrders=(req, res) => {
    Order.find({_creator:req.user._id}).sort({_id: -1}).then((orders) => {
        res.send(orders);
    }, (e) => {
        res.status(400).send(e);
    });
};

module.exports = {getOrders};