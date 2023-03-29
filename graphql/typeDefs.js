const { gql } = require('apollo-server')

module.exports = gql`
  type User {
    id: ID
    nickname: String
    email: String
    password: String
    token: String
    createdAt: String
  }

  input RegisterInput {
    nickname: String
    email: String
    password: String
  }

  input LoginInput {
    email: String
    password: String
  }

  type Query {
    nickname(email: String!): String
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User!
    loginUser(loginInput: LoginInput): User!
  }
`
