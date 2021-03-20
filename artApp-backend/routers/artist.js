const express = require('express');
const { Artist } = require('../models/artist');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find();
    if (!artists) {
      return res.status(400).json({ message: 'empty list' });
    }
    return res.status(200).send(artists);
  } catch (error) {
    return res.send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, username, password } = req.body;

    let newArtist = new Artist({
      name,
      username,
      password,
    });
    console.log(name);
    console.log(username);
    console.log(password);
    const check = await Artist.find({ username });
    if (check.length !== 0) {
      return res.status(409).send({ message: 'username already exists' });
    }

    newArtist = await newArtist.save();
    console.log('here');

    if (!newArtist) {
      return res.send({ message: 'cannot post user' });
    }
    return res.status(200).json(newArtist);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const artist = await Artist.findOne(req.body.username);

    if (artist && req.body.username.password == artist.password) {
      return res.send(artist);
    }
    return res.json({ message: 'invalid username or password' });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
