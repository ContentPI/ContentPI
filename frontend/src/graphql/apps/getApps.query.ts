// Dependencies
import { gql } from '@apollo/client'

export default gql`
  query getApps {
    getApps {
      id
      appName
      identifier
      description
      icon
    }
  }
`
