const {Order}=require('../models/order');

const getOrderDetails=(req, res) => {
    if(req.user.email==="admin@admin.com"){
        Order.findOne({_id:req.params.id}).then((order) => {
            if(!order) {
                res.status(404).send(order);
            } else {
                res.send(order);
            }
        }, (err) => {
            res.status(400).send(err);
        });
    } else {
        Order.findOne({_id:req.params.id, _creator: req.user._id}).then((order) => {
            if(!order) {
                res.status(404).send(order);
            } else {
                res.send(order);
            }
        }, (err) => {
            res.status(400).send(err);
        });
    }
};

module.exports = {getOrderDetails};