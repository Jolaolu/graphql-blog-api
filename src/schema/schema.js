const { gql } = require( 'apollo-server' )
// const { makeExecutableSchema } = require( 'graphql-tools' )

const typeDefs = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        posts: [Post]!
      }

      type NewUser {
          token: String!
          id: ID!
          email: String!
          name: String!
      }

    type Post {
        id: Int!
        title: String!
        description: String!
        body: String!
        user: User!
    }

    type Query {
        user(id: Int!): User
        allPosts: [Post!]!
        allUsers: [User!]!
        post(id: Int!): Post
        me: User
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): NewUser!
        login (email: String!, password: String!): User!
        createPost(
          userId: Int!
          title: String!
          description: String!
          body: String!
        ): Post!
       
    }
`

module.exports = typeDefs