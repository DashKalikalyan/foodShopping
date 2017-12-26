const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const postcode = require('postcode-validator');

const OrderSchema=new Schema({
    orderData: {
        name:{
            type: String,
            required: true
        },
        street:{
            type: String,
            required: true
        },
        zipCode:{
            type:String,
            required:true,
        },
        country:{
            type: String,
            required:true
        },
        email:{
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
        deliveryMethod:{
            type: String,
            required: true
        },
        phoneNumber:{
            type:String,
            required:true,
            minlength:1,
            maxlength:12
        },
        city:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true
        },
    },
    ingredients:{
        salad:{
            type:Number
        },
        bacon:{
            type:Number
        },
        cheese:{
            type:Number
        },
        meat:{
            type:Number
        }
    },
    isDispatched:{
        type:Boolean,
        required:true
    },
    isDelivered:{
        type:Boolean,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    _creator: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
    }
    });

const Order = mongoose.model('Order', OrderSchema);

module.exports = {Order};