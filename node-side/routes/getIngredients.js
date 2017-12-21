const {Initial}=require('../models/ingredients');

const getIngredients=(req, res) => {
    console.log('inside getIngredients man');
    Initial.find().then((initials) => {
            res.send(initials);
    }, (err) => {
        res.status(400).send(err);
    });
};

module.exports = {getIngredients};