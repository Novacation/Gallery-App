const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    unique: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  token: {
    type: String,
    required: true
  },

  createdAt: {
    type: String,
    required: true
  }
})

module.exports = model('Users', userSchema)
