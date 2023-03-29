const { ApolloError } = require('apollo-server-errors')
const { hash, compare } = require('bcryptjs')

const { sign } = require('jsonwebtoken')
const User = require('../../models/User')

module.exports = {
  Mutation: {
    async registerUser(_, { registerInput: { nickname, email, password } }) {
      //search for an old user with same email
      const oldUser = await User.findOne({ email })

      //throw error if that user exists
      if (oldUser) {
        throw new ApolloError(
          `A user is already registered with the email ${email}`,
          'USER_ALREADY_EXISTS'
        )
      }

      //encrypt password
      const encryptedPassword = await hash(password, 10)

      //build out mongoose model
      const newUser = new User({
        nickname,
        email: email.toLowerCase(),
        password: encryptedPassword,
        createdAt: new Date().toISOString()
      })

      //create jwt and attatch to the model built
      const token = sign(
        {
          user_id: newUser._id,
          email
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      )

      newUser.token = token

      //save the user in mongodb

      const res = await newUser.save()

      return {
        id: res.id,
        ...res._doc
      }
    },

    async loginUser(_, { loginInput: { email, password } }) {
      const oldUser = await User.findOne({ email })

      if (!oldUser) {
        throw new ApolloError(
          `User with the email "${email}" doesn't exists!`,
          'USER_DOESNT_EXISTS'
        )
      }

      const encryptedPassword = oldUser.password
      const comparisonResult = await compare(password, encryptedPassword)

      if (!comparisonResult) {
        throw new ApolloError(`Invalid credentials`, 'INVALID_CREDENTIALS')
      }

      //create jwt and attatch to the model built
      const token = sign(
        {
          user_id: oldUser._id,
          email
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      )

      await User.updateOne({ email }, { token })

      return {
        id: oldUser.id,
        ...oldUser._doc
      }
    }
  },

  Query: {}
}
