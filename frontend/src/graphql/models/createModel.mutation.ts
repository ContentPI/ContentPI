// Dependencies
import { gql } from '@apollo/client'

export default gql`
  mutation createModel(
    $modelName: String!
    $identifier: String!
    $description: String!
    $appId: UUID!
  ) {
    createModel(
      input: {
        modelName: $modelName
        identifier: $identifier
        description: $description
        appId: $appId
      }
    ) {
      id
      modelName
      identifier
      description
      appId
    }
  }
`
