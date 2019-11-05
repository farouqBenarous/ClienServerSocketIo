const auth = require('../middleware/auth');
const {Product , validateproduct } = require('../models/product')
const config = require('config');
const bcrypt = require('bcryptjs');
const _ = require('lodash');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');



//Change the product  by specify the name
router.put('/'  ,auth ,async (req , res) => {
    const { error } = validateproduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (!_.isEmpty(req.query.name) ) {
        return es.status(400).send('You have to specify the name if you want to delete ')
    }

    let  result  = await Product.updateOne({name : req.query.name} , {name : req.body.name ,type : req.body.type , price : req.body.price , rating : req.body.rating ,
        warranty_years : req.body.warranty_years ,available :   req.body . available})
        .then((result) => { res.status(200).send('Product Change Sucessfully  new Product ' +result)})
        .catch((err) => { res.status(500).send('Internal server error try later error : '+err)});
} );


// create a product
router.post('/', auth,async (req, res) => {
    const { error } = validateproduct(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let product = new Product(req.body.name ,req.body.type , req.body.price , req.body.rating , req.body.warranty_years , req.body.available)

    await product.save().
    then( (result) => res.status(200).send('The Product has been created') )
        .catch((err) => {res.status(500).send('something faild try later  error : '+err)})
});

// display the products
router.get('/', async (req, res) => {

    // if the filters are empty so return all the products
    if (_.isEmpty(req.query.name) && _.isEmpty(req.query._id) && _.isEmpty(req.query.price) && _.isEmpty(req.query.rating) && _.isEmpty(req.query.warranty_years)
      &&_.isEmpty(req.query.available)) {
        let  products =  await Product.find({})
        return res.status(200).send(products)
    }

    // now filer by each filter
    let  response = [];
    if (!_.isEmpty(req.query.name) ) {
        let products = await Product.find({name : req.query.name})
        response.push(products)}

    if (!_.isEmpty(req.query.type) ) {
        let products = await Product.find({type : req.query.type})
        response.push(products)}

    if (!_.isEmpty(req.query.price) ) {
        let products = await Product.find({price : req.query.price})
        response.push(products)}

    if (!_.isEmpty(req.query.rating) ) {
        let products = await Product.find({rating : req.query.rating})
        response.push(products)}

    if (!_.isEmpty(req.query.warranty_years) ) {
        let products = await Product.find({warranty_years : req.query.warranty_years})
        response.push(products)}

    if (!_.isEmpty(req.query.available) ) {
        let products = await Product.find({available : req.query.available})
        response.push(products)}


    if (_.isEmpty(response) || _.isEmpty(response[0]) ) {
        console.log('no response with the given filteres')
        return res.status(404).send('no Product found with these Filters')}

    response = _.uniqBy (response ,'_id')
    return  res.status(200).send(response)
});

// Delete a product by a given name
router.delete('/' ,auth, async (req , res) => {
    if (!_.isEmpty(req.query.name) ) {
    return res.status(400).send('You have to specify the name if you want to delete ')
    }
    let result  = await Product.deleteOne ({name : req.query.name }).
    then((result) => {res.status(200).send('Product deleted')})
        .catch((err) =>  { res.status(500).send('internal server error try later  error : '+err)})
});

module.exports = router

