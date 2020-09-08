// Dependencies
import { Sequelize } from 'sequelize'

// Utils
import { hasKey, keys } from 'fogg-utils'

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
  App: sequelize.import('./App'),
  Declaration: sequelize.import('./Declaration'),
  Enumeration: sequelize.import('./Enumeration'),
  Field: sequelize.import('./Field'),
  Value: sequelize.import('./Value'),
  Model: sequelize.import('./Model'),
  Reference: sequelize.import('./Reference'),
  User: sequelize.import('./User'),
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
