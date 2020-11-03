// Dependencies
import { gql } from '@apollo/client'

export default gql`
  query getI18n {
    getI18n {
      id
      key
      value
      language
    }
  }
`
