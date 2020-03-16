const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const models = require('../models')

require('dotenv').config()

const resolvers = {
    Query: {
        async me(_, args, { user }) {
            // make sure user is logged in
            if (!user) throw new Error('You are not authenticated!')

            // user is authenticated
            return await models.User.findByPk(user.id)
        },
        async user(root, { id }, { user }) {
            try {
                if (!user) throw new Error('You are not authenticated!')
                return models.User.findByPk(id)
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async allPosts(root, args, { user }) {
            try {
                if (!user) throw new Error('You are not authenticated!')
                return models.Post.findAll()
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async allUsers(root, args, { user }) {
            try {
                if (!user) throw new Error('You are not authenticated!')
                return models.User.findAll()
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async post(root, { id }, { user }) {
            try {
                if (!user) throw new Error('You are not authenticated!')
                return models.Post.findByPk(id)
            } catch (error) {
                throw new Error(error.message)
            }
        }
    },
    Mutation: {
        async createUser(root, { name, email, password }) {
            try {
                const user = await models.User.create({
                    name,
                    email,
                    password: await bcrypt.hash(password, 10)
                })
                const token = jsonwebtoken.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1y' }
                )

                return {
                    token, id: user.id, name: user.name, email: user.email
                }
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async login(_, { email, password }) {
            try {
                const user = await models.User.findOne({ where: { email } })

                if (!user) {
                    throw new Error('No user with that email')
                }

                const valid = await bcrypt.compare(password, user.password)
                if (!valid) {
                    throw new Error('Incorrect password')
                }

                // return json web token
                const token = jsonwebtoken.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                )
                return {
                    token, user
                }
            } catch (error) {
                throw new Error(error.message)
            }
        },
        async createPost(root, { userId, title, description, body }, { user }) {
            try {
                if (!user) throw new Error('You are not authenticated!')
                return models.Post.create({ userId, title, description, body })
            } catch (error) {
                throw new Error(error.message)
            }
        },
    },
    User: {
        async posts(user) {
            return user.getPosts()
        }
    },
    Post: {
        async user(post) {
            return post.getUser()
        }
    }
}

module.exports = resolvers