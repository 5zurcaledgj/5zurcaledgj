const express = require('express');
const router = new express.Router();

const User = require('../models/user');

// Routes for Users
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    res.send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch('/users/:id', async (req, res) => {
  const fields = ['name', 'email', 'password', 'age'];
  const isFieldsValid = Object.keys(req.body).every(field =>
    fields.includes(field)
  );

  if (!isFieldsValid) {
    return res.status(400).send('Invalid field');
  }

  try {
    const user = await User.findById(req.params.id);
    Object.keys(req.body).forEach(field => {
      user[field] = req.body[field];
    });

    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
