// Dependencies
import { gql } from '@apollo/client'

export default gql`
  query getEnumerationsByAppId($appId: UUID!) {
    getEnumerationsByAppId(appId: $appId) {
      id
      enumerationName
      identifier
      description
      values
      appId
    }
  }
`
