const {Order}=require('../models/order');


const updateOrder=(req,res) => {
    const body = req.body;
    Order.findOneAndUpdate({_id:req.params.id, _creator: req.user._id}, {$set: body}, {new: true}).then((doc) => {
        console.log('updating now',doc);
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
};

module.exports = {updateOrder};