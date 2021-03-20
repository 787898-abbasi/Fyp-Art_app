const express = require('express');
const { Product } = require('../models/product');
const { Category } = require('../models/category');
const { Artist } = require('../models/artist');
const multer = require('multer');
const cloudinary = require('../utils/cloudinary');

const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('invalid image type');
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, 'public/uploads');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    console.log('123');
    const products = await Product.find().populate('author');
    console.log('345');
    console.log(products[0]);
    if (products.length === 0) {
      return res.status(400).send({ message: 'no products found' });
    }
    console.log(678);
    return res.send(products);
  } catch (error) {
    return res.send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    // console.log(req.params);
    const products = await Product.find({ artist: req.params.id });
    if (products.length === 0) {
      return res.status(400).send({ message: 'no orders found' });
    }
    return res.send(products);
  } catch (error) {
    return res.send({ error: error.message, success: false });
  }
});

router.get('/category', async (req, res) => {
  try {
    const product = await Product.find({
      category: req.query.categories,
    }).populate('category ');

    if (!product) {
      return res.status(500).send({ message: 'no Product found' });
    }
    console.log(product.length);
    return res.send(product);
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.post('/', uploadOptions.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log('here abc');
    // let newCategory = [];
    // req.body.category.map((category) => {
    //   newCategory.push(category);
    // });

    let newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      image: result.secure_url,
      price: req.body.price,
      artist: req.body.artist,
      // category: newCategory,
      isFeatured: req.body.isFeatured,
    });

    newProduct = await newProduct.save();
    console.log('here 123');
    console.log(newProduct);
    if (!newProduct) {
      return res.status(400).send({ message: 'cannot add the product' });
    }
    return res.status(200).send(newProduct);
  } catch (error) {
    return res.send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res.status(200).send({ message: 'deleted successfully!' });
      } else {
        return res.status(400).send({ message: 'product not found' });
      }
    })
    .catch((err) => {
      return res.status(err.message);
    });
});

module.exports = router;
