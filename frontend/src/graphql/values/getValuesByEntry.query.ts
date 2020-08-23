// Dependencies
import { gql } from '@apollo/client'

export default gql`
  query getValuesByEntry($entry: UUID!) {
    getValuesByEntry(entry: $entry) {
      id
      entry
      value
      fieldIdentifier
      fieldId
    }
  }
`
