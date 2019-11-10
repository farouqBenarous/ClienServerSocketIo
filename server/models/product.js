const Joi = require('joi');
const mongoose = require('mongoose');


// name , type , price , rating , warranty_years , available

// to be added some other Types of products
const productSchema = new mongoose.Schema({
    name: {type: String,  required: true,  minlength: 3,  maxlength: 20, unique: true},
    type : {type : String , enum : ['phone' , 'laptop']} ,
    price: {type : Number , maxlength :1 ,required: true},
    rating : { type : Number , maxlength :10 ,required: true},
    warranty_years : {type : Number , maxlength :10 ,required: true } ,
    available : {type : Boolean , required: true }
});

const Product = mongoose.model('Products', productSchema);


function validateproduct(product) {
    const schema = Joi.object ( {
        name : Joi.string().min(3).max(20).required(),
        price : Joi.number().min(1).required(),
        rating : Joi.number().min(1).max(10).required(),
        warranty_years : Joi.number().min(1).max(10).required(),
        type: Joi.string().valid('phone', 'laptop'),
        available : Joi.boolean().required()

    }) .unknown() ;

    return Joi.validate(product, schema);
}


exports.Product = Product;
exports.validateproduct = validateproduct;
