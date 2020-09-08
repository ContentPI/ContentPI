// Dependencies
import { gql } from '@apollo/client'

export default gql`
  query getEntriesByModelId($modelId: UUID!) {
    getEntriesByModelId(modelId: $modelId) {
      entries
    }
  }
`
