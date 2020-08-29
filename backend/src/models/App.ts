// Interface
import { iApp, iModels, iDataTypes } from '../interfaces'

export default (sequelize: any, DataTypes: iDataTypes): iApp => {
  const App = sequelize.define('App', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    appName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    icon: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })

  App.associate = (models: iModels): void => {
    App.hasMany(models.Model, {
      foreignKey: {
        name: 'appId',
        field: 'app_id'
      },
      as: 'models',
      onDelete: 'CASCADE'
    })

    App.hasMany(models.Enumeration, {
      foreignKey: {
        name: 'appId',
        field: 'app_id'
      },
      as: 'enumerations',
      onDelete: 'CASCADE'
    })
  }
  }

  return App
}
