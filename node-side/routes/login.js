const {User}=require('../models/user');
const bcrypt=require('bcryptjs');
const _ = require('lodash');

const login=(req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    console.log(body);
    User.findByCredentials(body.email).then((user) => {
        if(!user) {
            res.send('no user present with that id');
        } else {
            bcrypt.compare(body.password,user.password, (err, result) => {
                if(result) {
                    user.generateAuthToken().then((token) => {
                        res.header('x-auth', token).send(user);
                        // res.send(user);
                    });
                } else {
                    console.log('wrong password');
                }
            });
        }
    }).catch((e) => {
        res.send(e);
    });
};

module.exports = {login};