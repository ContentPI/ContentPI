// Dependencies
import { gql } from '@apollo/client'

export default gql`
  mutation editEnumeration(
    $id: UUID!
    $enumerationName: String!
    $identifier: String!
    $description: String!
    $values: String!
    $appId: UUID!
  ) {
    editEnumeration(
      id: $id
      input: {
        enumerationName: $enumerationName
        identifier: $identifier
        description: $description
        values: $values
        appId: $appId
      }
    ) {
      id
      enumerationName
      identifier
      description
      values
      appId
    }
  }
`
