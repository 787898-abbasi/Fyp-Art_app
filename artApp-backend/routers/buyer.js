const express = require('express');
const { Buyer } = require('../models/buyer');
const bcrypt = require('bcrypt');
const { Artist } = require('../models/artist');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const buyers = await Buyer.find();
    if (!buyers) {
      return res.status(400).send({ message: 'no user present' });
    }
    return res.send(buyers);
  } catch (error) {
    return res.send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('here 123');
    let newBuyer = new Buyer({
      name: req.body.bname,
      username: req.body.busername,
      password: req.body.bpassword,
      email: req.body.email,
      city: req.body.city,
      country: req.body.country,
      zip: req.body.zip,
      phone: req.body.phone,
      shippingAddress: req.body.shippingAddress,
    });
    console.log(newBuyer);
    const check = await Buyer.find({ username: req.body.busername });
    if (check.length > 0) {
      return res.send({ message: 'email already exists' });
    }

    newBuyer = await newBuyer.save();
    if (!newBuyer) {
      return res.send({ message: 'cannot sign up' });
    }
    return res.send(newBuyer);
  } catch (error) {
    console.log(error);
    console.log('here');
    return res.send(error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.body.username);

    const buyer = await Buyer.findOne(req.body.username);
    console.log('here efg');
    if (buyer && req.body.username.password === buyer.password) {
      return res.send(buyer);
    }
    return res.send({ message: 'invalid username or password' });
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = router;
