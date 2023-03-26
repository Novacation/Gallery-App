require('dotenv').config()
const { ApolloServer } = require('apollo-server')

const mongoose = require('mongoose')

const DB_CONNECTION = process.env.DB_CONNECTION

const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers
})

mongoose
  .connect(DB_CONNECTION, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected')
    return server.listen({ port: 5000 })
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`)
  })
