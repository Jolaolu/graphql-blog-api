const { gql } = require( 'apollo-server' )

const typeDefs = gql`
    type User {
        id: Int!
        name: String!
        email: String!
        posts: [Post!]!
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
        post(id: Int!): Post
    }

    type Mutation {
        createUser(name: String!, email: String!, password: String!): User!
        createPost(
          userId: Int!
          title: String!
          description: String!
          body: String!
        ): Post!
    }
`

module.exports = typeDefs