// Dependencies
import { gql } from '@apollo/client'

export default gql`
  query getModel($identifier: String!, $appId: UUID!) {
    getModel(identifier: $identifier, appId: $appId) {
      id
      appId
      modelName
      identifier
      description
      fields {
        id
        type
        fieldName
        identifier
        order
        defaultValue
        description
        isHide
        isMedia
        isRequired
        isUnique
        isSystem
        isPrimaryKey
      }
    }
  }
`
