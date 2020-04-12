const mongoose = require('mongoose');
const validator = require('validator')

const connectionUrl = 'mongodb://127.0.0.1:27017/task-manager-api' // connection + name of the db

mongoose.connect(connectionUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const User = mongoose.model('User', {
  name:{
    type: String,
    required: true,
    trim: true
  } ,
  age: {
    type: Number,
    default: 0,
    validate(value){
      if(value <0) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error('Invalid email')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) throw new Error("'password' is a super dumb password, pick another one ")
    }
  }
})

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

// const newUser = new User({ name: '    Boo', email: 'boo@chocolate.com', password: 'ppassword'})
// newUser.save()
// .then( console.log(newUser))
// .catch((error) => console.log('ERROR!', error))


const newTask = new Task({ title: '   Eat soon '})
newTask.save()
.then( console.log(newTask))
.catch((error) => console.log('ERROR!', error))
