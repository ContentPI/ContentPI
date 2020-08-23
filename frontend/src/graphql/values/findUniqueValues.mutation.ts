// Dependencies
import { gql } from '@apollo/client'

export default gql`
  mutation findUniqueValues($input: [ValueInput]) {
    findUniqueValues(input: $input) {
      id
      entry
      value
      fieldIdentifier
    }
  }
`
