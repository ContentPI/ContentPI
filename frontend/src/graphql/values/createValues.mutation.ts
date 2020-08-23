// Dependencies
import { gql } from '@apollo/client'

export default gql`
  mutation createValues($values: [CreateOrUpdateValueInput!]) {
    createValues(input: $values) {
      id
      entry
      value
      fieldIdentifier
    }
  }
`
