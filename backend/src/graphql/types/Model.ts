import gql from 'graphql-tag'

export default gql`
  type Model {
    id: UUID!
    modelName: String!
    identifier: String!
    description: String!
    createdAt: Datetime!
    updatedAt: Datetime!
    appId: UUID!
    fields: [Field!]
  }

  type Query {
    getModels: [Model!]
    getModel(identifier: String!, appId: UUID!): Model!
  }

  type Mutation {
    createModel(input: CreateModelInput): Model!
    deleteModel(id: UUID!): Model!
    editModel(id: UUID!, input: EditModelInput): Model!
  }

  input CreateModelInput {
    modelName: String!
    identifier: String!
    description: String!
    appId: UUID!
  }

  input EditModelInput {
    modelName: String!
    identifier: String!
    description: String!
  }
`
