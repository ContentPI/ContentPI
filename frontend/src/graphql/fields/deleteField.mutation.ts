// Dependencies
import { gql } from '@apollo/client'

export default gql`
  mutation deleteField($id: UUID!) {
    deleteField(id: $id) {
      id
      fieldName
    }
  }
`
