import gql from 'graphql-tag'

export default gql`
  type I18n {
    id: UUID!
    key: String!
    value: String!
    language: String!
    createdAt: Datetime!
    updatedAt: Datetime!
  }

  type Query {
    getI18n: [I18n!]
  }

  input CreateI18nInput {
    key: String!
    value: String!
    language: String!
  }
`
