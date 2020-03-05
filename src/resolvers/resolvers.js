
const bcrypt = require( 'bcryptjs' )
const resolvers = {
    Query: {
        async user ( root, { id }, { models } ) {
            return models.User.findById( id )
        },
        async allPosts ( root, args, { models } ) {
            return models.Post.findAll()
        },
        async post ( root, { id }, { models } ) {
            return models.Post.findById( id )
        }
    },
    Mutation: {
        async createUser ( root, { name, email, password }, { models } ) {
            return models.User.create( {
                name,
                email,
                password: await bcrypt.hash( password, 10 )
            } )
        },
        async createPost ( root, { userId, title, description, body }, { models } ) {
            return models.Post.create( { userId, title, description, body } )
        }
    },
    User: {
        async posts ( user ) {
            return user.getPosts()
        }
    },
    Post: {
        async user ( post ) {
            return post.getUser()
        }
    }
}

module.exports = resolvers