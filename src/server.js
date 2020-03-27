
const { ApolloServer } = require('apollo-server')
const jwt = require('jsonwebtoken')
const typeDefs = require('./schema/schema')
const resolvers = require('./resolvers/resolvers')

require('dotenv').config()

const { JWT_SECRET, PORT } = process.env

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, JWT_SECRET)
    }
    return null
  } catch (err) {
    return null
  }
}

const server = new ApolloServer({
  playground: true,
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.get('Authorization') || ''
    return { user: getUser(token.replace('Bearer', '')) }
  },
  introspection: true,
  playground: true
})

server
  .listen(PORT || 4000)
  .then(({ url }) => console.log(`Server is running on ${url}`))


