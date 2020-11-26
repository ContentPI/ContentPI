// Dependencies
import { gql } from '@apollo/client'

export default gql`
  mutation deleteEnumeration($id: UUID!) {
    deleteEnumeration(id: $id) {
      id
      enumerationName
      appId
      identifier
    }
  }
`
