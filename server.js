
const { ApolloServer } = require('apollo-server')
const typeDefs = require('./src/schema/schema')
const resolvers = require('./src/resolvers/resolvers')
const models = require('./src/models')

const server = new ApolloServer( {
  playground: true,
  typeDefs,
  resolvers,
  context: { models }
})

server
  .listen()
    .then( ( { url } ) => console.log( 'Server is running on localhost:4000' ) )
  

