const bcrypt = require('bcryptjs');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {User ,validatelogin , validatesignup} = require('../models/user') ;

// signup
router.post('/signup', async (req, res) => {

    const { error } = validatesignup(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let exist = await User.findOne({ email: req.body.email });
    if (exist) return res.status(400).send('email already registered.');

    let user  = new User ({email: req.body.email   , firstname : req.body.firstname  ,lastname: req.body.lasname  , password : req.body.password   })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    return  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'firstname', 'email']))  ;
});


// Login
router.post('/login', async (req, res) => {
    const { error } = validatelogin(req.body);
    if (error) {return res.status(400).send(error.details[0].message)}

    let user = await User.findOne({ email: req.body.email });
    if (_.isEmpty(user)) {return res.status(400).send('Invalid email .')}

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {return res.status(400).send('Invalid  password.')}

    const token = user.generateAuthToken();
    return res.send(token);
});


module.exports = router

