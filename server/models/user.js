const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const  _ = require('lodash')

// email , username , password
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 55,
        unique: true
    },
    username : {
     type : String,
     required : true ,
     minlength: 5,
     maxlength: 50,
     unique : true

    } ,
    password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
});

userSchema.methods.generateAuthToken = function() { 
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
  return token;
}

const User = mongoose.model('Users', userSchema);

function validateUserSignup(user) {
  const schema = Joi.object ( {
      email: Joi.string().min(5).max(55).required().email(),
      username : Joi.string().min(5).max(55).required(),
      password: Joi.string().min(5).max(255).required()

  }) .unknown() ;

  return Joi.validate(user, schema);
}
function validateUserLogin(user) {
    const schema = {
        email: Joi.string().min(5).max(55).required().email(),
        password: Joi.string().min(5).max(255).required()
    };

    return Joi.validate(user, schema);
}


exports.User = User;
exports.validatesignup = validateUserSignup;
exports.validatelogin = validateUserLogin;
