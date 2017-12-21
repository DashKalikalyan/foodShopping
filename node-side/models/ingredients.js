const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const postcode = require('postcode-validator');

const InitialSchema=new Schema({
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

});

const Initial = mongoose.model('Initial', InitialSchema);

module.exports = {Initial};