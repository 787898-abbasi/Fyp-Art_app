const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(400).send('cannot find categories in server');
    }
    return res.status(200).send(categories);
  } catch (error) {
    return res.send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    let newCategory = new Category({
      name: req.body.name,
      for: req.body.for,
    });

    newCategory = await newCategory.save();
    if (!newCategory) {
      return res.status(400).send('cannot put this category');
    }
    return res.status(200).send(newCategory);
  } catch (error) {
    return res.send(error.message);
  }
});

module.exports = router;
