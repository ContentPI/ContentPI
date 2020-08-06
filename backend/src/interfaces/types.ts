export type App = {
  appName: string
  identifier: string
  icon: string
  description: string
}

export type Declaration = {
  declaration: string
  icon: string
  description: string
}

export type Field = {
  type: string
  fieldName: string
  identifier: string
  description: string
  isRequired: boolean
  isUnique: boolean
  isHide: boolean
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
