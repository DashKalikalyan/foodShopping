const {User}=require('../models/user');
const _ = require('lodash');
const bcrypt = require ('bcryptjs');

const signup=(req, res) => {
    const body = _.pick(req.body, [ 'firstName', 'lastName', 'phoneNumber', 'email','password']);
    bcrypt.hash(body.password, 10, (err, hash) => {
        if (err) {
            console.log('Not hashed properly');
        } else {
            body.password =hash;
            const user = new User (body);
            user.save().then((user) => {
                // console.log('Here is the user1',user);
                return user.generateAuthToken();
            }).then((token) => {
                // console.log('Here is the user2',user);
                res.header('x-auth', token).send(user);
            }).catch((e) => {
                res.status(400).send(e);
            });
        }

    });
};

module.exports = {signup};