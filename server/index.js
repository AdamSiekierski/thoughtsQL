const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const { ApolloServer } = require('apollo-server-express')

const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const app = express()

const prepare = async () => {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server
  await nuxt.ready()

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Apollo Server
  const server = new ApolloServer({ typeDefs, resolvers })
  server.applyMiddleware({ app })

  // Listen the server
  app.listen(port, host, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })
}

prepare()
