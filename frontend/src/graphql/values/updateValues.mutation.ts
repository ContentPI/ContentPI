// Dependencies
import { gql } from '@apollo/client'

export default gql`
  mutation updateValues($entry: UUID!, $values: [CreateOrUpdateValueInput!]) {
    updateValues(entry: $entry, input: $values) {
      id
      entry
      value
      fieldIdentifier
    }
  }
`
