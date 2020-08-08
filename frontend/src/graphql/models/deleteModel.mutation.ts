// Dependencies
import { gql } from '@apollo/client'

export default gql`
  mutation deleteModel($id: UUID!) {
    deleteModel(id: $id) {
      id
      modelName
      appId
    }
  }
`
