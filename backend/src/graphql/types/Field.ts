import gql from 'graphql-tag'

export default gql`
  type Field {
    id: UUID!
    type: String!
    fieldName: String!
    identifier: String!
    order: String!
    description: String!
    defaultValue: String!
    isMedia: Boolean!
    isRequired: Boolean!
    isUnique: Boolean!
    isHide: Boolean!
    isSystem: Boolean!
    isPrimaryKey: Boolean!
    createdAt: Datetime!
    updatedAt: Datetime!
    modelId: UUID!
    modelName: String!
    values: [Value!]
  }

  type Mutation {
    createField(input: CreateFieldInput): Field!
    deleteField(id: UUID!): Field!
    editField(id: UUID!, input: UpdateFieldInput): Field!
  }

  input CreateFieldInput {
    type: String!
    fieldName: String!
    identifier: String!
    order: String!
    description: String!
    defaultValue: String!
    isMedia: Boolean!
    isRequired: Boolean!
    isUnique: Boolean!
    isHide: Boolean!
    isSystem: Boolean!
    isPrimaryKey: Boolean!
    modelId: UUID!
    modelName: String!
  }

  input UpdateFieldInput {
    type: String!
    fieldName: String!
    identifier: String!
    order: String!
    description: String!
    isMedia: Boolean!
    isRequired: Boolean!
    isUnique: Boolean!
    isHide: Boolean!
    isSystem: Boolean!
    isPrimaryKey: Boolean!
  }
`
