// Interface
import { iModel, iModels, iDataTypes } from '../interfaces'

export default (sequelize: any, DataTypes: iDataTypes): iModel => {
  const Model = sequelize.define('Model', {
    id: {
      primaryKey: true,
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4()
    },
    modelName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    identifier: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  })

  Model.associate = (models: iModels): void => {
    Model.hasMany(models.Field, {
      foreignKey: {
        name: 'modelId',
        field: 'model_id'
      },
      as: 'fields',
      onDelete: 'CASCADE'
    })
  }

  return Model
}
