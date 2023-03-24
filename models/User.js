const { model, Schema } = require('mongoose')

const userSchema = new Schema({
  nickname: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  createdAt: String
})
