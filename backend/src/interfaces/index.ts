// Types
import {
  App,
  I18n,
  Declaration,
  Enumeration,
  Field,
  Model,
  User,
  Value,
  Sequelize
} from './types'

// Sequelize
export interface iDataTypes {
  UUID: string
  UUIDV4(): string
  STRING: string
  BOOLEAN: boolean
  TEXT: string
  INTEGER: number
  DATE: string
  FLOAT: number
}

// App
export interface iApp extends App, Sequelize {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface iCreateAppInput extends App {}

// I18n
export interface iI18n extends I18n, Sequelize {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface iCreateI18nInput extends Declaration {}

// Declaration
export interface iDeclaration extends Declaration, Sequelize {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface iCreateDeclarationInput extends Declaration {}

// Enumeration
export interface iEnumeration extends Enumeration, Sequelize {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface iCreateOrEditEnumerationInput extends Enumeration {}

// Field
export interface iField extends Field, Sequelize {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface iCreateFieldInput extends Field {}
export interface iReorderFieldInput {
  id: string
  order: string
}

// Value
export interface iValue extends Value, Sequelize {
  id: string
}

export interface iCreateOrUpdateValueInput extends Value {}

export interface iValueInput {
  value: string
}

// Model
export interface iModel extends Model, Sequelize {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface iCreateModelInput extends Model {}
export interface iEditModelInput extends Model {}

// User
export interface iUser extends User, Sequelize {
  id: string
  token?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface iCreateUserInput extends User {}

export interface iLoginInput {
  email: string
  password: string
}

export interface iAuthPayload {
  token: string
}

// Models
export interface iModels {
  App: any
  Declaration: any
  Enumeration: any
  Field: any
  I18n: any
  Model: any
  Reference: any
  User: any
  Value: any
  sequelize: any
}
