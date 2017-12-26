const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
// const _ = require('lodash');

const UserSchema = new Schema ({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        trim:true,
        minlength: 10,
        maxlength:10
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength:6,
    },
    tokens:[{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

// UserSchema.methods.toJSON = function() {
//     const user = this;
//     const userObject = user.toObject();
//     return _.pick(userObject,['_id', 'email', 'firstName', 'lastName', 'phoneNumber','tokens']);
// };

UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch(e) {
        return new Promise ((resolve, reject) => {
            reject('error.test');
        });
    }

    return User.findOne({
        _id: decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

UserSchema.statics.findByCredentials = function (email) {
    const User = this;
    console.log(email);
    return User.findOne({email: email});
};

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access ='auth';
    const token = jwt.sign({_id: user._id, access}, 'abc123').toString();
    user.tokens.push({access: access, token: token});
    return user.save().then((res) => {
        return token;
    });
    // user.save();
    // return token;
};

UserSchema.methods.removeToken = function (token) {
    const user =this;
    return user.update({
        $pull: {
            tokens: {
                token: token
            }
        }
    });
};

const User = mongoose.model('User', UserSchema);

module.exports = {User};

// BASIC PASSWORD STRUCTURE

