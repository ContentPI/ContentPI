// Dependencies
import { gql } from '@apollo/client'

export default gql`
  mutation publishOrUnpublishEntries($entries: [EntriesInput], $action: String!) {
    publishOrUnpublishEntries(entries: $entries, action: $action) {
      entryId
    }
  }
`
