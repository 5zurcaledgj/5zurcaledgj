const express = require('express');
const router = new express.Router();
const authMiddleWare = require('../middleware/auth');

const Task = require('../models/task');

router.post('/tasks', authMiddleWare, async (req, res) => {
  const task = new Task({ ...req.body, owner: req.user._id });

  try {
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/tasks', authMiddleWare, async (req, res) => {
  try {
    //const tasks = await Task.find({ owner: req.user._id });
    await req.user.populate('tasks').execPopulate();
    res.send(req.user.tasks);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/tasks/:id', authMiddleWare, async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id
    });

    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.patch('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/tasks/:id', async (req, res) => {
  try {
    const user = await Task.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});
module.exports = router;
