
const bcrypt = require( 'bcryptjs' )
const jsonwebtoken = require( 'jsonwebtoken' )
require( 'dotenv' ).config()
const resolvers = {
    Query: {
        async me ( _, args, { user } ) {
            // make sure user is logged in
            if ( !user ) {
                throw new Error( 'You are not authenticated!' )
            }

            // user is authenticated
            return await models.User.findById( user.id )
        },
        async user ( root, { id }, { models } ) {
            return User.findByPk( id )
        },
        async allPosts ( root, args, { models } ) {
            return models.Post.findAll()
        },
        async allUsers ( root, args, { models } ) {
            return models.User.findAll()
        },
        async post ( root, { id }, { models } ) {
            return models.Post.findByPk( id )
        }
    },
    Mutation: {
        async createUser ( root, { name, email, password }, { models } ) {
            const user = await models.User.create( {
                name,
                email,
                password: await bcrypt.hash( password, 10 )
            } )
            const token = jsonwebtoken.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1y' }
            )

            return {
                token, id: user.id, name: user.name, email: user.email
            }
        },
        async login ( _, { email, password }, { models } ) {
            const user = await models.User.findOne( { where: { email } } )

            if ( !user ) {
                throw new Error( 'No user with that email' )
            }

            const valid = await bcrypt.compare( password, user.password )

            if ( !valid ) {
                throw new Error( 'Incorrect password' )
            }

            // return json web token
            const token =  jsonwebtoken.sign(
                { id: user.id, email: user.email },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            )
            return {
                token, id: user.id, name: user.name, email: user.email
            }
        },
        async createPost ( root, { userId, title, description, body }, { models } ) {
            return models.Post.create( { userId, title, description, body } )
        },
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