const {Order}=require('../models/order');

const getOrders=(req, res) => {
    if(req.user.email==="admin@admin.com"){
        Order.find().sort({_id: -1}).then((orders) => {
            console.log('inside admin');
            res.send(orders);
        }, (e) => {
            res.status(400).send(e);
        })
    } else {
        Order.find({_creator:req.user._id}).sort({_id: -1}).then((orders) => {
            res.send(orders);
        }, (e) => {
            res.status(400).send(e);
        });
    }
};

module.exports = {getOrders};