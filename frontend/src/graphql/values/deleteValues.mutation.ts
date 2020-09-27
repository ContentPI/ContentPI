// Dependencies
import { gql } from '@apollo/client'

export default gql`
  mutation deleteValues($entries: [EntriesInput]) {
    deleteValues(entries: $entries) {
      entryId
    }
  }
`
