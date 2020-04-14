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
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' //ref creates link
  }
})

module.exports = Task
