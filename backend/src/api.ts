// Dependencies
import { ApolloServer } from 'apollo-server'
import { importSchema } from 'graphql-import'

// Apollo Server
const resolvers = {
  Query: {
    getAllPosts: (): any => {
      return [
        {
          id: '7a99ff36-6b39-4cd6-a4a4-83b6660fe881',
          title: 'Test',
          slug: 'test',
          content: '<p>Content</p>',
          status: 'published'
        }
      ]
    }
  }
}

const apolloServer = new ApolloServer({
  typeDefs: importSchema('src/schemas/schema.graphql'),
  resolvers
})

apolloServer
  .listen(4000)
  // eslint-disable-next-line no-console
  .then(({ url }) => {
    // eslint-disable-next-line no-console
    console.log(`Running on ${url}`)
  })
