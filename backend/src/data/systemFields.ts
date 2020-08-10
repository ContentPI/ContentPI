export default (newModel: any) => [
  {
    modelId: newModel.id,
    fieldName: 'ID',
    identifier: 'id',
    type: 'ID',
    isHide: false,
    isMedia: false,
    isUnique: true,
    isRequired: true,
    isPrimaryKey: true,
    isSystem: true,
    description: 'The unique identifier',
    order: '-1'
  },
  {
    modelId: newModel.id,
    fieldName: 'Created At',
    identifier: 'createdAt',
    type: 'DateTime',
    isHide: true,
    isMedia: false,
    isUnique: false,
    isRequired: true,
    isPrimaryKey: false,
    isSystem: true,
    description: 'The time the record was created',
    order: '-2'
  },
  {
    modelId: newModel.id,
    fieldName: 'Updated At',
    identifier: 'updatedAt',
    type: 'DateTime',
    isHide: true,
    isMedia: false,
    isUnique: false,
    isRequired: true,
    isPrimaryKey: false,
    isSystem: true,
    description: 'The time the record was updated',
    order: '-3'
  },
  {
    modelId: newModel.id,
    fieldName: 'Status',
    identifier: 'status',
    type: 'Status',
    isHide: false,
    isMedia: false,
    isUnique: false,
    isRequired: true,
    isPrimaryKey: false,
    isSystem: true,
    description: 'The status of the record',
    defaultValue: 'draft',
    order: '-4'
  }
]
