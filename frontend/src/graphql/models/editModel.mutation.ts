// Dependencies
import { gql } from '@apollo/client'

export default gql`
  mutation editModel($id: UUID!, $modelName: String!, $identifier: String!, $description: String!) {
    editModel(
      id: $id
      input: { modelName: $modelName, identifier: $identifier, description: $description }
    ) {
      id
      modelName
      identifier
      description
      appId
    }
  }
`
