export type App = {
  appName: string
  identifier: string
  icon: string
  description: string
}

export type I18n = {
  key: string
  value: string
  language: string
}

export type Declaration = {
  declaration: string
  icon: string
  description: string
}

export type Enumeration = {
  enumerationName: string
  identifier: string
  description: string
  values: string
}

export type Field = {
  type: string
  fieldName: string
  identifier: string
  order: string
  defaultValue: string
  description: string
  isMedia: boolean
  isRequired: boolean
  isUnique: boolean
  isHide: boolean
  isSystem: boolean
  isPrimaryKey: boolean
  modelId: string
  modelName: string
}

export type Value = {
  entry: string
  value: string
}

export type Model = {
  modelName: string
  identifier: string
  description: string
}

export type User = {
  username: string
  password: string
  email: string
  privilege: string
  active: boolean
}

export type Sequelize = {
  _defaults?: any
  name?: string
  options?: any
  associate?: any
}
