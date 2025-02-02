const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const { ApolloServer } = require('apollo-server-express')

const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const app = express()

// Apollo Server
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

// Nuxt
const prepare = async () => {
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server
  await nuxt.ready()

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(nuxt.render)

  app.listen(port, host, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}. GraphQL Endpoint: ${server.graphqlPath}`,
      badge: true
    })
  })
}

prepare()
