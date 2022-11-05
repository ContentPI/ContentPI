import gql from 'graphql-tag'

export default gql`
  type Declaration {
    id: UUID!
    declaration: String!
    icon: String!
    description: String!
    color: String!
    createdAt: Datetime!
    updatedAt: Datetime!
  }

  type Query {
    getDeclarations: [Declaration!]
  }

  type Mutation {
    createDeclaration(input: CreateDeclarationInput): Declaration!
  }

  input CreateDeclarationInput {
    declaration: String!
    icon: String!
    description: String!
    color: String!
  }
`
