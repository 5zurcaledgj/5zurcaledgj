const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes for Users
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const users = await User.findById(req.params.id);
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.get('/tasks/:id', async (req, res) => {
  console.log('nani');
  try {
    const task = await Task.findById(req.params.id);
    res.send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.patch('/tasks/:id', async (req, res) => {
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

app.delete('/tasks/:id', async (req, res) => {
  try {
    const user = await Task.findByIdAndDelete(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.listen(port, () => {
  console.log('Server is up on port' + port);
});
