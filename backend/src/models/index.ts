// Dependencies
import { Sequelize } from 'sequelize'

// Utils
import { hasKey, keys } from '@contentpi/utils'

// Configuration
import { $db } from '../../config'

// Interfaces
import { iModels } from '../interfaces'

// Db Connection
const { dialect, port, host, database, username, password } = $db

const uri = `${dialect}://${username}:${password}@${host}:${port}/${database}`
const sequelize = new Sequelize(uri)

// Models
const models: iModels = {
  App: require('./App').default(sequelize, Sequelize),
  Declaration: require('./Declaration').default(sequelize, Sequelize),
  Enumeration: require('./Enumeration').default(sequelize, Sequelize),
  Field: require('./Field').default(sequelize, Sequelize),
  I18n: require('./I18n').default(sequelize, Sequelize),
  Model: require('./Model').default(sequelize, Sequelize),
  Reference: require('./Reference').default(sequelize, Sequelize),
  User: require('./User').default(sequelize, Sequelize),
  Value: require('./Value').default(sequelize, Sequelize),
  sequelize
}

// Relationships
keys(models).forEach((modelName: string) => {
  if (hasKey(models, modelName)) {
    if (models[modelName].associate) {
      models[modelName].associate(models)
    }
  }
})

export default models
