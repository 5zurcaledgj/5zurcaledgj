const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = mongoose.model(
  'Task',
  new Schema({
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    isDone: {
      type: Boolean,
      default: false
    }
  })
);

module.exports = Task;
