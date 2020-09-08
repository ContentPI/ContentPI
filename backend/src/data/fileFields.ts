export default (newModel: any) => {
  const defaultFields = {
    defaultValue: '',
    description: '',
    isHide: false,
    isMedia: false,
    isPrimaryKey: false,
    isRequired: true,
    isSystem: false,
    isUnique: false,
    type: 'String',
    modelId: newModel.id,
    modelName: newModel.modelName
  }

  const fields = [
    {
      ...defaultFields,
      fieldName: 'File',
      identifier: 'file',
      type: 'File',
      order: '1'
    },
    {
      ...defaultFields,
      fieldName: 'Filename',
      identifier: 'fileName',
      order: '2'
    },
    {
      ...defaultFields,
      fieldName: 'FileUrl',
      identifier: 'fileUrl',
      order: '3'
    },
    {
      ...defaultFields,
      fieldName: 'Size',
      identifier: 'size',
      order: '4'
    },
    {
      ...defaultFields,
      fieldName: 'Information',
      identifier: 'information',
      isRequired: false,
      order: '5'
    }
  ]

  return fields
}
