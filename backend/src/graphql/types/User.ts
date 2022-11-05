import gql from 'graphql-tag'

export default gql`
  type User {
    id: UUID!
    username: String!
    password: String!
    email: String!
    privilege: String!
    active: Boolean!
    createdAt: Datetime!
    updatedAt: Datetime!
    apps: [App!]
    _DEBUG: JSON
  }

  type Query {
    getUsers: [User!]
    getUserData(at: String!): User!
  }

  type Mutation {
    createUser(input: CreateUserInput): User!
    login(input: LoginInput): AuthPayload!
  }

  input CreateUserInput {
    username: String!
    password: String!
    email: String!
    privilege: String!
    active: Boolean!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
  }
`
