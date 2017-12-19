const {Order}=require('../models/order');


const addOrder=(req,res) => {
    console.log(req.body);
    let order = new Order({
        orderData:{
            name:req.body.orderData.name,
            street:req.body.orderData.street,
            zipCode:req.body.orderData.zipCode,
            country:req.body.orderData.country,
            email:req.body.orderData.email,
            deliveryMethod:req.body.orderData.deliveryMethod
        },
        ingredients:{
            salad:req.body.ingredients.salad,
            bacon:req.body.ingredients.bacon,
            cheese:req.body.ingredients.cheese,
            meat:req.body.ingredients.meat
        },
        _creator: req.user._id
    });
    order.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
};

module.exports = {addOrder};