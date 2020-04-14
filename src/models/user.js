const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid email')
      }
    }
  },
  password: {
    minlength: 7,
    required: true,
    trim: true,
    type: String,
    validate(value) {
      if (value.toLowerCase().includes('password')) throw new Error("'password' is a super dumb password, pick another one ")
    }
  },
  tokens: [{
    token:{
      type: String,
      required: true,
    }
  }]
})


userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({_id: user._id.toString()}, 'thisisatest')

  user.tokens = user.tokens.concat({token})
  await user.save()
  return token
}

// method to hide sensitive data
userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email: email})
  if (!user) throw newError('Unable to login')
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) throw new Error('Unable to login')

  return user
}

//hash the plain text password before saving
userSchema.pre('save', async function(next){ // mean it will be run before 'pre' the saving
  const user = this
  if(user.isModified('password')) user.password = await bcrypt.hash(user.password, 8) //encrypt password
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
