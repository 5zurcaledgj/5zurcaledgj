const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
  {
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
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

TaskSchema.methods.toJSON = function() {
  const task = this;
  return {
    title: task.title,
    description: task.description,
    isDone: task.isDone
  };
};

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
