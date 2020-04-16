const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
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
},{
  timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task
