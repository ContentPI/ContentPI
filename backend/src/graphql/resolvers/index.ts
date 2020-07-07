import path from 'path'
import { fileLoader, mergeResolvers } from 'merge-graphql-schemas-ts'

const resolversArray = fileLoader(path.join(__dirname, './'))
const resolvers = mergeResolvers(resolversArray, { all: true })

export default resolvers
