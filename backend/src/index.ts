// Dependencies
import { ApolloServer, makeExecutableSchema } from 'apollo-server'

// Data
import { setInitialData } from './data'

// Models
import models from './models'

// Type Definitions & Resolvers
import resolvers from './graphql/resolvers'
import typeDefs from './graphql/types'

// Configuration
import { $server } from '../config'

// Schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

// Apollo Server
const apolloServer = new ApolloServer({
  schema,
  context: {
    models
  }
})

const alter = true
const force = false

models.sequelize.sync({ alter, force }).then(() => {
  apolloServer
    .listen($server.port)
    // eslint-disable-next-line no-console
    .then(({ url }) => {
      // Setting up initial data
      setInitialData()

      // eslint-disable-next-line no-console
      console.log(`Running on ${url}`)
    })
})
