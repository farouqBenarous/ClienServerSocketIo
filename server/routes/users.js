const bcrypt = require('bcryptjs');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const {User ,validateUserSignup , validateUserLogin} = require('../models/user') ;
var auth = require('../middleware/auth')


// signup
router.post('/signup', async (req, res) => {
    const { error } = validateUserSignup(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let exist = await User.findOne({ email: req.body.email });
    if (exist) return res.status(400).send('email already registered.');

    let user  = new User ({email: req.body.email   , firstname : req.body.firstname  ,lastname: req.body.lastname  , password : req.body.password   })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const token = user.generateAuthToken();

    await user.save().then( (result) =>  {res.status(200).header('x-auth-token', token).json({'token' :token}).send()}  )
    .catch( (err) => {res.status(500).send('something faild '+err)}   );

});


// Login
router.post('/login', async (req, res) => {
    const { error } = validateUserLogin(req.body);
    if (error) {return res.status(400).send(error.details[0].message)}

    let user = await User.findOne({ email: req.body.email });
    if (_.isEmpty(user)) {return res.status(400).send('Invalid email .')}

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {return res.status(400).send('Invalid  password.')}

    const token = user.generateAuthToken();
    return res.status(200).header('x-auth-token', token).json({'token' :token}).send();
});

// check token
router.get('/token', auth, (req, res) => {
    res.sendStatus(200);
} );

module.exports = router

