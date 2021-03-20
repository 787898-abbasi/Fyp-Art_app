const express = require('express');
const { Artist } = require('../models/artist');
const { Product } = require('../models/product');
const { Order } = require('../models/order');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    if (orders.length === 0) {
      return res.status(400).send({ message: 'not orders are found' });
    }
    return res.send(orders);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // console.log(req.params);
    const orders = await Order.find({ artist: req.params.id });
    if (orders.length === 0) {
      return res.status(400).send({ message: 'no orders found' });
    }
    return res.send(orders);
  } catch (error) {
    return res.send({ error: error.message, success: false });
  }
});

router.get('/buyer/:id', async (req, res) => {
  try {
    console.log('qqqq');
    console.log(req.params.id);
    const orders = await Order.find({ buyer: req.params.id });
    if (orders.length === 0) {
      return res.send({ message: 'no products ordered' });
    }
    return res.send(orders);
  } catch (error) {
    return res.send(error.message);
  }
});
router.get('/artist/:id', async (req, res) => {
  try {
    console.log('qqqq');
    console.log(req.params.id);
    const orders = await Order.find({ artist: req.params.id });
    if (orders.length === 0) {
      return res.send({ message: 'no products ordered' });
    }
    return res.send(orders);
  } catch (error) {
    return res.send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    let newOrder = new Order({
      buyer: req.body.buyer,
      product: req.body.product,
      artist: req.body.artist,
      shippingAddress: req.body.shippingAddress,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      email: req.body.email,
    });
    console.log(newOrder);

    newOrder = await newOrder.save();
    if (!newOrder) {
      return res.status(400).send({ message: 'cannot post' });
    }
    return res.status(200).send(newOrder);
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = router;
