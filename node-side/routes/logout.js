const {User}=require('../models/user');
const bcrypt=require('bcryptjs');
const _ = require('lodash');

const logout= (req,res)=>{
    req.user.removeToken(req.token).then((doc) => {
        res.status(200).send(doc);
    });
};

module.exports = {logout};