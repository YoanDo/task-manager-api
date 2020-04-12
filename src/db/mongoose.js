const mongoose = require('mongoose');

const connectionUrl = 'mongodb://127.0.0.1:27017/task-manager-api' // connection + name of the db

mongoose.connect(connectionUrl, {
    useCreateIndex: true,
    useUnifiedTopology: true
  }
);

const User = mongoose.model('User', {
  name:{
    type: String
  } ,
  age: {
    type: Number
  }
})

const Task = mongoose.model('Task', {
  title: {
    type: String
  },
  done: {
    type: Boolean
  }
})

// const newUser = new User({ name: 'Yamcha', age: 27})

// newUser.save()
// .then( console.log(newUser))
// .catch((error) => console.log('ERROR!', error))

// const newTask = new Task({ title: '15min cardio exercise', done: 'false'})

// newTask.save()
// .then( console.log(newTask))
// .catch((error) => console.log('ERROR!', error))
