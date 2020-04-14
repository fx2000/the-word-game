const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: 'http://localhost/avatar.png'
  },
  highScore: {
    type: Number,
    default: 0
  },
  words: {
    type: ObjectId,
    ref: 'Word'
  },
  coins: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User
