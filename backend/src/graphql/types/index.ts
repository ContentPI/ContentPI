import { mergeTypeDefs } from '@graphql-tools/merge'
import App from './App'
import Declaration from './Declaration'
import Enumeration from './Enumeration'
import Field from './Field'
import I18n from './I18n'
import Model from './Model'
import Scalar from './Scalar'
import User from './User'
import Value from './Value'

export default mergeTypeDefs([
  App,
  Declaration,
  Enumeration,
  Field,
  I18n,
  Model,
  Scalar,
  User,
  Value
])
