// Dependencies
import { gql } from '@apollo/client'

export default gql`
  query getDeclarations {
    getDeclarations {
      id
      icon
      declaration
      description
      color
    }
  }
`
