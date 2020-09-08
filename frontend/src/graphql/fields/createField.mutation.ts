// Dependencies
import { gql } from '@apollo/client'

export default gql`
  mutation createField(
    $modelId: UUID!
    $modelName: String!
    $fieldName: String!
    $identifier: String!
    $order: String!
    $type: String!
    $defaultValue: String!
    $description: String!
    $isHide: Boolean!
    $isMedia: Boolean!
    $isUnique: Boolean!
    $isRequired: Boolean!
    $isSystem: Boolean!
    $isPrimaryKey: Boolean!
  ) {
    createField(
      input: {
        modelId: $modelId
        modelName: $modelName
        fieldName: $fieldName
        identifier: $identifier
        order: $order
        type: $type
        defaultValue: $defaultValue
        description: $description
        isHide: $isHide
        isMedia: $isMedia
        isUnique: $isUnique
        isRequired: $isRequired
        isSystem: $isSystem
        isPrimaryKey: $isPrimaryKey
      }
    ) {
      id
      modelId
      modelName
      fieldName
      identifier
      order
      type
      defaultValue
      description
      isHide
      isMedia
      isUnique
      isRequired
      isSystem
      isPrimaryKey
    }
  }
`
