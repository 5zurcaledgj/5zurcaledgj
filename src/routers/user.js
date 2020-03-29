const express = require('express');
const router = new express.Router();
const authMiddleWare = require('../middleware/auth');

const User = require('../models/user');

// Routes for Users
router.post('/users', async (req, res) => {
  const user = new User(req.body);

  try {
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/users/me', authMiddleWare, async (req, res) => {
  res.send(req.user);
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/users/logout', authMiddleWare, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(
      token => token.token !== req.token
    );

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', authMiddleWare, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/users/me', authMiddleWare, async (req, res) => {
  const fields = ['name', 'email', 'password', 'age'];
  const isFieldsValid = Object.keys(req.body).every(field =>
    fields.includes(field)
  );

  if (!isFieldsValid) {
    return res.status(400).send('Invalid field');
  }

  try {
    const user = req.user;
    Object.keys(req.body).forEach(field => {
      user[field] = req.body[field];
    });

    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/users/me', authMiddleWare, async (req, res) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
