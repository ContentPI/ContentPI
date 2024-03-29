import gql from 'graphql-tag'

export default gql`
  type Enumeration {
    id: UUID!
    enumerationName: String!
    identifier: String!
    description: String!
    values: String
    createdAt: Datetime!
    updatedAt: Datetime!
    appId: UUID!
  }

  type Query {
    getEnumerationsByAppId(appId: UUID!): [Enumeration!]
  }

  type Mutation {
    createEnumeration(input: CreateOrEditEnumerationInput): Enumeration!
    deleteEnumeration(id: UUID!): Enumeration!
    editEnumeration(
      id: UUID!
      input: CreateOrEditEnumerationInput
    ): Enumeration!
  }

  input CreateOrEditEnumerationInput {
    enumerationName: String!
    identifier: String!
    description: String!
    values: String!
    appId: UUID!
  }
`
