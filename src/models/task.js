const mongoose = require('mongoose');

const Task = mongoose.model('Task', {
  title: {
    type: String,
    trim: true,
    required: true,
  },
  done: {
    type: Boolean,
    default: false
  }
})

module.exports = Task
