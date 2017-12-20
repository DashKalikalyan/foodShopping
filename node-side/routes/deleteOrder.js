const {Order}=require('../models/order');


const deleteOrder=(req,res) => {
    Order.findOneAndRemove({_id:req.params.id, _creator: req.user._id}).then((doc) => {
        if(!doc) {
            res.status(404).send(doc);
        } else {
            res.send(doc);
        }
    }, (err) => {
        res.status(400).send(err);
    });
};

module.exports = {deleteOrder};