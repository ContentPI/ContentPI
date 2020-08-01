// Dependencies
import { gql } from '@apollo/client'

export default gql`
  mutation createApp(
    $appName: String!
    $identifier: String!
    $icon: String!
    $description: String!
    $userId: UUID!
  ) {
    createApp(
      input: {
        appName: $appName
        identifier: $identifier
        icon: $icon
        description: $description
        userId: $userId
      }
    ) {
      id
      appName
      identifier
      icon
      description
      userId
    }
  }
`
