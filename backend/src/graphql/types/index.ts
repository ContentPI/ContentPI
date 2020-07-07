import path from 'path'
import { fileLoader, mergeTypes } from 'merge-graphql-schemas-ts'

const typesArray = fileLoader(path.join(__dirname, './'))

export default mergeTypes(typesArray, { all: true })
